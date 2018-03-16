$(document).ready(function() {
	function getCookie(str) {
		var tmp, reg = new RegExp("(^|)" + str + "=([^;]*)(;|$)", "gi");
		if(tmp = reg.exec(document.cookie)) return(tmp[2]);
		return null;
	};
	
	var _token = getCookie("token");	
	
	//新增公告
	$("body").on("click", "#submit_placard", function() {		
		var title = $.trim($("#placard-title").val());
		var content = UE.getEditor('editor').getContent();
		//alert(UE.getEditor('editor').getContent());
		if(title == ''){
			alert("请输入公告标题");	
			$("#placard-title").focus();
			return false;
		}
		if(content == ''){
			alert("请输入公告内容");	
			$("#placard-content").focus();
			return false;
		}
		
		$.ajax({
			type: "POST",
			url: "http://47.52.128.11:8090/anbi/backmgr/notice/addNotice.do",
			data: {
				"token": _token,
				"title": title,
				"content":content
			},
			async: true,
			dataType: "json",
			success: function(data) {
				//console.log(data);
				if(data.code==200){
					alert("发布成功");
					location.reload();
				}else{
					alert(data.msg);
					location.reload();
				}
			}
		});
	})
	
	//公告列表翻页
	$("body").on("click", ".page-link", function() {
		$(".list").html("");
		var pageNum = $(this).html();
		
		$.ajax({
			type: "GET",
			url: "http://47.52.128.11:8090/anbi/backmgr/notice/open/noticeList.do",
			data: {
				"token": _token,
				"pageSize": 10,
				"pageNum":pageNum
			},
			async: true,
			dataType: "json",
			success: function(data) {
				var result_data = data.result.pageData;
				var len = result_data.list.length;
				$(".list2").html("");
				if(result_data.lastPage < 1) {
					$("#page").hide()
				} else {
					$("#page").show();	
						
					$.each(data.result.navigatepageNums,function(index,value){
						var page = '';
						var cur = '';	
						if(pageNum == value) cur = ' active';				
						page += '<li class="page-item'+ cur +'"><a class="page-link" href="#">' + value + '</a></li>';
						$(".list2").append(page)
					});					
					$(".list2").append('<li class="page-item"><span class="btn">总记录' + data.result.total + '条 '+ data.result.pages+'页</span></li>')
					
				}
				for(var i = 0; i < len; i++) {
					//console.log(data.result.list[i])
					var result = '';
					result += '<tr><td>' + result_data.list[i].createTime + '</td><td>' + result_data.list[i].title + '</td><td>' + result_data.list[i].content + '</td><td>' + result_data.list[i].creater + '</td><td>' + result_data.list[i].createrName + '</td><td><a href="appeal_detail.html" onclick="return confirm(\'确认删除吗？\')" class="btn btn-danger btn-sm placard_del">删除</a></td></tr>';
					$(".list").append(result)
				}
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				if(textStatus == "error"){
					alert("接口数据错误");
				}
				/*// 状态码
				console.log(XMLHttpRequest.status);
				// 状态
				console.log(XMLHttpRequest.readyState);
				// 错误信息   
				console.log(textStatus);*/
			}
		});
	})
	
	
	//获取公告列表
	$.ajax({
		type: "GET",
		url: "http://47.52.128.11:8090/anbi/backmgr/notice/open/noticeList.do",
		data: {
			"token": _token,
			"pageNum":1,
			"pageSize": 10
		},
		async: true,
		dataType: "json",
		success: function(data) {
			//console.log(data);
			var result_data = data.result.pageData;
			var len = result_data.list.length;
			//console.log(data.result.lastPage);
			if(result_data.lastPage < 2) {
				$("#page").hide()
			} else {
				$("#page").show();
				$.each(data.result.navigatepageNums,function(index,value){
					var page = '';	
					var cur = '';	
					if(index == 0) cur = ' active';								
					page += '<li class="page-item'+cur+'"><a class="page-link" href="#">' + value + '</a></li>';
					$(".list2").append(page)
				});
				$(".list2").append('<li class="page-item"><span class="btn">总记录' + data.result.total + '条 '+ data.result.pages+'页</span></li>')
			}
			for(var i = 0; i < len; i++) {
				//console.log(data.result.list[i])
				var result = '';
				content = result_data.list[i].content.substr(0,30);
				result += '<tr><td>' + result_data.list[i].createTime + '</td><td class="placard_detail">' + result_data.list[i].title + '</td><td class="nowrap">' + content + '</td><td>' + result_data.list[i].creater + '</td><td>' + result_data.list[i].createrName + '</td><td><button date-id="'+result_data.list[i].id+'" class="btn btn-danger btn-sm placard_del">删除</button></td></tr>';
				
				$(".list").append(result);
				
				
			}
			
			$(".placard_del").click(function(){				
								
				if(!confirm('确认删除吗')) {					
					return false;
				}
				
				var id =$(this).attr("date-id");

				//删除公告
				$.ajax({	
					type: "GET",
					url: "http://47.52.128.11:8090/anbi/backmgr/notice/delNotice.do",
					data: {
						"token": _token,
						"id":id						
					},
					async: false,
					dataType: "json",
					success: function(data) {
						if(data.code==200){
							alert("删除成功");
							location.reload();
						}else{
							alert("删除失败");
							location.reload();
						}
					}
				});
			});
			
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			if(textStatus == "error"){
				alert("接口数据错误");
			}
			/*// 状态码
			console.log(XMLHttpRequest.status);
			// 状态
			console.log(XMLHttpRequest.readyState);
			// 错误信息   
			console.log(textStatus);*/
		}
	});
	
	
});