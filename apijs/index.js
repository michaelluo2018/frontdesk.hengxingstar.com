$(document).ready(function() {
	function getCookie(str) {
		var tmp, reg = new RegExp("(^|)" + str + "=([^;]*)(;|$)", "gi");
		if(tmp = reg.exec(document.cookie)) return(tmp[2]);
		return null;
	};
	var _token = getCookie("token");
	
	//翻页
	$("body").on("click", ".page-link,#search", function() {
		$(".list").html("");
		
		var pageNum = $(this).html();
		if(pageNum == "搜索") pageNum = 1;
		
		var appealStatus=$("#appealStatus").val();
		var tradeId=$("#keyword").val();
		
		$.ajax({
		type: "GET",
		url: "http://47.52.128.11:8090/anbi/backmgr/appeal/infoShortList.do",
		data: {
			"token": _token,
			"pageSize": 10,
			"pageNum":pageNum,
			"appealStatus":appealStatus,
			"tradeId":tradeId			
		},
		async: true,
		dataType: "json",
		success: function(data) {
			var len = data.result.list.length;
			//console.log(data.result.lastPage);
			$(".list2").html("");
			if(data.result.lastPage < 2) {
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
				var result = '',isBuyer="买家",appealType="";
				if(data.result.list[i].isBuyer==0)
					isBuyer="买家"
				switch(parseInt(data.result.list[i].appealType)){
					case 0:	appealType="其他";break;
					case 1:	appealType="对方未付款";break;
					case 2:	appealType="对方未放行";break;
					case 3:	appealType="对方无应答";break;
					case 4:	appealType="对方有欺诈行为";break;
				}
				result += '<tr><td>' + data.result.list[i].tradeId + '</td><td>' + data.result.list[i].userId + '</td><td>' + appealType + '</td><td>' + isBuyer + '</td><td>' + data.result.list[i].referNo + '</td><td>' + data.result.list[i].appealId + '</td> <td><a href="appeal_detail.html?tradeId=' + data.result.list[i].tradeId + '&appealId=' + data.result.list[i].appealId + '" class="btn btn-secondary btn-sm">查看详情</a></td></tr>';
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
	
	$.ajax({
		type: "GET",
		url: "http://47.52.128.11:8090/anbi/backmgr/appeal/infoShortList.do",
		data: {
			"token": _token,
			"pageSize": 10,
			"appealStatus":0
		},
		async: true,
		dataType: "json",
		success: function(data) {
			//console.log(data);
			if(data.code=='40008'){
				alert(data.msg);
				location.href='login.html';	
				return false;
			}
			
			var len = data.result.list.length;
			//console.log(data.result.lastPage);
			if(data.result.lastPage < 2) {
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
			}
			for(var i = 0; i < len; i++) {
				//console.log(data.result.list[i])
				var result = '',isBuyer="买家",appealType="";
				if(data.result.list[i].isBuyer==0)
					isBuyer="买家"
				switch(parseInt(data.result.list[i].appealType)){
					case 0:	appealType="其他";break;
					case 1:	appealType="对方未付款";break;
					case 2:	appealType="对方未放行";break;
					case 3:	appealType="对方无应答";break;
					case 4:	appealType="对方有欺诈行为";break;
				}
				
				result += '<tr><td>' + data.result.list[i].tradeId + '</td><td>' + data.result.list[i].userId + '</td><td>' + appealType + '</td><td>' + isBuyer + '</td><td>' + data.result.list[i].referNo + '</td><td>' + data.result.list[i].appealId + '</td> <td><a href="appeal_detail.html?tradeId=' + data.result.list[i].tradeId + '&appealId=' + data.result.list[i].appealId + '" class="btn btn-secondary btn-sm">查看详情</a></td></tr>';
				$(".list").append(result)
			}
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			alert("接口数据错误");
			window.location.href='login.html';				
			return false;
			/*// 状态码
			console.log(XMLHttpRequest.status);
			// 状态
			console.log(XMLHttpRequest.readyState);
			// 错误信息   
			console.log(textStatus);*/
		}
		
	});
	
	
});
