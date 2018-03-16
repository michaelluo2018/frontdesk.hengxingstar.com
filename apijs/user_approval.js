$(document).ready(function() {
	function getCookie(str) {
		var tmp, reg = new RegExp("(^|)" + str + "=([^;]*)(;|$)", "gi");
		if(tmp = reg.exec(document.cookie)) return(tmp[2]);
		return null;
	};
	var _token = getCookie("token");
		
	//翻页 和 搜索
	$("body").on("click", ".page-link,#search", function() {
		$(".list").html("");
		var pageNum = $(this).html();
		if(pageNum == '搜索'){
			pageNum = 1;
		}
		
		//搜索信息组合
		var userId='',email='',phone='',realName='';
		var keyword = $.trim($("#keyword").val());
		var search_type = $("#type").val();
		if(search_type == "userId"){
			userId = keyword;	
		}
		if(search_type == "email"){
			email = keyword;	
		}
		if(search_type == "phone"){
			phone = keyword;	
		}
		if(search_type == "realName"){
			realName = keyword;	
		}		
		
		
		$.ajax({
		type: "GET",
		url: "http://47.52.128.11:8090/anbi/backmgr/user/getWaitPassUser.do",
		data: {
			"token": _token,
			"pageSize": 10,
			"pageNum":pageNum,
			"userId": userId,
			"email": email,
			"phone": phone,
			"realName": realName
		},	
		async: true,
		dataType: "json",
		success: function(data) {
			var result_data = data.result.pageData;
			var len = result_data.list.length;
			$(".list2").html("");
			if(result_data.lastPage < 2) {
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
				var result = '',status='实名认证待审核';
				
				//审核状态 
				//身份证前面  cardFrontAudit  背面 cardBackAudit
				//身份证认证模块 1表示通过，2表示待审核 0表示审核不通过
				//高级认证模块 antiMoneyAudit
				//1表示通过，2表示待审核0表示审核不通过
				//实名认证
				if(result_data.list[i].cardFrontAudit == 0 || result_data.list[i].cardBackAudit == 0){
					status = "实名认证不通过";	
				}
				if(result_data.list[i].cardFrontAudit == 1 && result_data.list[i].cardBackAudit == 1){
					status = "";	
				}	
				
				//高级认证
				if(status == ''){		
					status += " - ";
					//高级认证
					if(result_data.list[i].antiMoneyAudit == 0 ){
						status += "高级认证不通过";	
					}
					if(result_data.list[i].antiMoneyAudit == 1){
						status += "高级认证通过";	
					}	
					if(result_data.list[i].antiMoneyAudit == 2){
						status += "高级认证待审核";	
					}	
				}
				
				
				result += '<tr><td>' + result_data.list[i].userId + '</td><td>' + result_data.list[i].realName + '</td><td>' + result_data.list[i].phone + '</td><td>' + status + '</td><td>' + result_data.list[i].auditUserName + '</td><td>' + result_data.list[i].registTime + '</td><td><a href="user_approval_detail.html?userId=' + result_data.list[i].userId + '" class="btn btn-secondary btn-sm">查看详情</a></td></tr>';
				$(".list").append(result)				
			}
		}
	});
	})
	$.ajax({
		type: "GET",
		url: "http://47.52.128.11:8090/anbi/backmgr/user/getWaitPassUser.do",
		data: {
			"token": _token,
			"pageSize": 10,
			"userId": ''
		},
		async: true,
		dataType: "json",
		success: function(data) {
			if(data.code=='40008'){
				alert("身份过期，请重新登录！");
				location.href='login.html';	
				return false;
			}
			//console.log(data);
			var result_data = data.result.pageData;
			var len = result_data.list.length;
			
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
				var result = '',status='实名认证待审核';
				
				//审核状态 
				//身份证前面  cardFrontAudit  背面 cardBackAudit
				//身份证认证模块 1表示通过，2表示待审核 0表示审核不通过
				//高级认证模块 antiMoneyAudit
				//1表示通过，2表示待审核0表示审核不通过
				//实名认证
				if(result_data.list[i].cardFrontAudit == 0 || result_data.list[i].cardBackAudit == 0){
					status = "实名认证不通过";	
				}
				if(result_data.list[i].cardFrontAudit == 1 && result_data.list[i].cardBackAudit == 1){
					status = "";	
				}	
				
				//高级认证
				if(status == ''){		
					status += " - ";
					//高级认证
					if(result_data.list[i].antiMoneyAudit == 0 ){
						status += "高级认证不通过";	
					}
					if(result_data.list[i].antiMoneyAudit == 1){
						status += "高级认证通过";	
					}	
					if(result_data.list[i].antiMoneyAudit == 2){
						status += "高级认证待审核";	
					}	
				}
				
				
				result += '<tr><td>' + result_data.list[i].userId + '</td><td>' + result_data.list[i].realName + '</td><td>' + result_data.list[i].phone + '</td><td>' + status + '</td><td>' + result_data.list[i].auditUserName + '</td><td>' + result_data.list[i].registTime + '</td><td><a href="user_approval_detail.html?userId=' + result_data.list[i].userId + '" class="btn btn-secondary btn-sm">查看详情</a></td></tr>';
				$(".list").append(result)
			}
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
	
});

