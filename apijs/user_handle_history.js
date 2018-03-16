function getCookie(str) {
	var tmp, reg = new RegExp("(^|)" + str + "=([^;]*)(;|$)", "gi");
	if(tmp = reg.exec(document.cookie)) return(tmp[2]);
	return null;
};
var _token = getCookie("token");

//用户列表
$.ajax({
	type: "GET",
	url: "http://47.52.128.11:8090/anbi/backmgr/sysuser/customInfoOperHistory.do",
	data: {
		"token": _token,
		"pageSize": 10
	},
	async: true,
	dataType: "json",
	success: function(data) {
		
		if(data.code=='40008'){
			alert("身份过期，请重新登录！");
			location.href='login.html';	
		}
		
		var len = data.result.list.length;
		//console.log(data.result.lastPage);
		if(data.result.lastPage < 2) {
			$("#page").hide()
		} else {
			$("#page").show();
			/*for(var inab = 1; inab < data.result.lastPage + 1; inab++) {
				var page = '';
				var cur = '';	
				if(inab == 1) cur = ' active';
				page += '<li class="page-item'+ cur +'"><a class="page-link" href="#">' + inab + '</a></li>';
				$(".list2").append(page)
			}*/
			
			
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
			
			result += '<tr><td class="uid">' + data.result.list[i].userId + '</td><td>' + data.result.list[i].userName + '</td><td class="reason">' + data.result.list[i].result + '</td><td>' + data.result.list[i].sysUserName + '</td><td>' + data.result.list[i].sysUserId + '</td><td>' + data.result.list[i].createTime + '</td></tr>';
			$(".list").append(result);		
			
		}
		//改版状态时 改变修改按钮颜色
		$(".change_action").change(function() {
			var change_action_old = $(this).parent().find(".change_action_old").val();
			var change_action_new = $(this).val();
			if(change_action_old != change_action_new){
				$(this).parent().parent().find(".update_user").addClass('btn-info');
				//$(this).parent().parent().find(".update_user").addClass('do_update_user');
				
				
				//翻页
				$("body").on("click", ".btn-info", function() {						
					var userId = $(this).parent().parent().find(".uid").html();//获取用户id
					var reason = $(this).parent().parent().find(".change_action").val();//修改状态
					var status='';
					switch(reason){
						case "正常状态":status=0;break;
						case "24小时冻结":status=1;break;
						case "永远冻结":status=2;break;
					}
					
					
					var this_html = $(this).parent().parent();
					
					//console.log(userId+"=="+reason);
					$.ajax({
						type: "GET",
						url: "http://47.52.128.11:8090/anbi/backmgr/sysuser/setCustomStatus.do",
						data: {
							"token": _token,
							"userId":userId,
							"reason":reason,
							"status":status
						},
						async: true,
						dataType: "json",
						success: function(data) {					
							if(data.code=='40008'){
								alert("身份过期，请重新登录！");
								location.href='login.html';	
							}
							if(data.code=='200'){
								this_html.find(".reason").html(this_html.find(".change_action").val());//修改状态		
								this_html.find(".btn-info").html("修改成功");
								this_html.find(".update_user").removeClass('btn-info');	
							}	
									
							
						}
					});
				});
				
			}else{
				$(this).parent().parent().find(".update_user").removeClass('btn-info');	
				//$(this).parent().parent().find(".update_user").removeClass('do_update_user');	
			}	
		});
	},
	error: function (XMLHttpRequest, textStatus, errorThrown) {
		
			//alert("接口数据错误");
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

//翻页
$("body").on("click", ".page-link,#search", function() {
	$(".list").html("");
	var pageNum = $(this).html();
	if(pageNum == "搜索") pageNum = 1;
	var userId='',tradeId='';
	var keyword = $.trim($("#keyword").val());
	var search_type = $("#type").val();
	if(search_type == "uid"){
		userId = keyword;	
	}
	if(search_type == "oid"){
		tradeId = keyword;	
	}
	
	$.ajax({
		type: "GET",
		url: "http://47.52.128.11:8090/anbi/backmgr/sysuser/customInfoOperHistory.do",
		data: {
			"token": _token,
			"pageSize": 10,
			"pageNum":pageNum,
			"userId":userId,
			"tradeId":tradeId,
		},
		async: true,
		dataType: "json",
		success: function(data) {
			
			$(".list2").html("");
			if(data.code=='40008'){
			alert("身份过期，请重新登录！");
			location.href='login.html';	
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
				if(pageNum == value) cur = ' active';				
				page += '<li class="page-item'+ cur +'"><a class="page-link" href="#">' + value + '</a></li>';
				$(".list2").append(page)
			});
			
			$(".list2").append('<li class="page-item"><span class="btn">总记录' + data.result.total + '条 '+ data.result.pages+'页</span></li>')
			
			/*for(var inab = 1; inab < data.result.lastPage + 1; inab++) {
				var page = '';
				var cur = '';	
				if(pageNum == inab) cur = ' active';				
				page += '<li class="page-item'+ cur +'"><a class="page-link" href="#">' + inab + '</a></li>';
				$(".list2").append(page)
			}*/
		}
		for(var i = 0; i < len; i++) {
			//console.log(data.result.list[i])
			var result = '';
			var status1='',status2='',status3='',status_value;
			if(data.result.list[i].reason == "正常状态"){
				status1 = ' selected="selected"';	
				status_value = "正常状态";
			}
			if(data.result.list[i].reason == "24小时冻结"){
				status2 = ' selected="selected"';	
				status_value = "24小时冻结";
			}
			if(data.result.list[i].reason == "永远冻结"){
				status3 = ' selected="selected"';	
				status_value = "永远冻结";
			}
			result += '<tr><td class="uid">' + data.result.list[i].userId + '</td><td>' + data.result.list[i].userName + '</td><td class="reason">' + data.result.list[i].result + '</td><td>' + data.result.list[i].sysUserName + '</td><td>' + data.result.list[i].sysUserId + '</td><td>' + data.result.list[i].createTime + '</td></tr>';
			$(".list").append(result);		
			
		}
		//改版状态时 改变修改按钮颜色
		$(".change_action").change(function() {
			var change_action_old = $(this).parent().find(".change_action_old").val();
			var change_action_new = $(this).val();
			if(change_action_old != change_action_new){
				$(this).parent().parent().find(".update_user").addClass('btn-info');
				//$(this).parent().parent().find(".update_user").addClass('do_update_user');
				
				
				//翻页
				$("body").on("click", ".btn-info", function() {						
					var userId = $(this).parent().parent().find(".uid").html();//获取用户id
					var reason = $(this).parent().parent().find(".change_action").val();//修改状态
					var status='';
					switch(reason){
						case "正常状态":status=0;break;
						case "24小时冻结":status=1;break;
						case "永远冻结":status=2;break;
					}
					
					
					var this_html = $(this).parent().parent();
					
					//console.log(userId+"=="+reason);
					$.ajax({
						type: "GET",
						url: "http://47.52.128.11:8090/anbi/backmgr/sysuser/setCustomStatus.do",
						data: {
							"token": _token,
							"userId":userId,
							"reason":reason,
							"status":status
						},
						async: true,
						dataType: "json",
						success: function(data) {					
							if(data.code=='40008'){
								alert("身份过期，请重新登录！");
								location.href='login.html';	
							}
							if(data.code=='200'){
								this_html.find(".reason").html(this_html.find(".change_action").val());//修改状态		
								this_html.find(".btn-info").html("修改成功");
								this_html.find(".update_user").removeClass('btn-info');	
							}	
									
							
						}
					});
				});
				
			}else{
				$(this).parent().parent().find(".update_user").removeClass('btn-info');	
				//$(this).parent().parent().find(".update_user").removeClass('do_update_user');	
			}	
		});			
		
		}
	});
})

