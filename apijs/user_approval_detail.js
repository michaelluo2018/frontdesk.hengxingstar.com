$(document).ready(function() {	

	function getParam(paramName) {
		paramValue = "", isFound = !1;
		if(this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) {
			arrSource = unescape(this.location.search).substring(1, this.location.search.length).split("&"), i = 0;
			while(i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++
		}
		return paramValue == "" && (paramValue = null), paramValue
	}
	var userId = getParam("userId")
	
	function getCookie(str) {
		var tmp, reg = new RegExp("(^|)" + str + "=([^;]*)(;|$)", "gi");
		if(tmp = reg.exec(document.cookie)) return(tmp[2]);
		return null;
	};
	
	var _token = getCookie("token");


	//console.log(userId);

	//显示客户信息
	$.ajax({
		type: "GET",
		url: "http://47.52.128.11:8090/anbi/backmgr/user/getWaittingAuditUser.do",
		data: {
			"token": _token,			
			"userId": userId			
		},
		async: true,
		dataType: "json",
		success: function(data) {
			if(data.code=='40008'){
				alert("身份过期，请重新登录！");
				location.href='login.html';	
			}
			if(data.code!='200'){
				alert(data.msg);
				return false;
			}
			
			//用户信息
			/*
			  <li class="list-group-item active">用户基础资料</li>
			  <li class="list-group-item">用户ID ：3496894</li>
			  <li class="list-group-item">用户名 ：张三</li>
			  <li class="list-group-item">手机号：1739858456</li>
			  <li class="list-group-item">邮箱：1739858456@139.com</li>
			  <li class="list-group-item">注册时间：2018-03-05 10:34:07</li> 
			  <li class="list-group-item">用户类型：买方</li> 
			  <li class="list-group-item list-group-item-success">实名认证<span class="badge badge-success float-right">已通过</span></li>
			  <li class="list-group-item list-group-item-warning">绑定银行卡<span class="badge badge-danger float-right">待审批</span></li>
			  <li class="list-group-item list-group-item-info">高级认证审批<span class="badge badge-secondary float-right">未提交</span></li>
			*/
			var result_user_data = data.result.user;
			//认证状态
			var antiMoneyAudit,user_info,user_smrz,user_gjrz,cardAudit="待审核",card_btn_color="danger",antiMoney_btn_color;
			
			//审核状态 
			//身份证前面  cardFrontAudit  背面 cardBackAudit
			//身份证认证模块 1表示通过，2表示待审核 0表示审核不通过
			//高级认证模块 antiMoneyAudit
			//1表示通过，2表示待审核0表示审核不通过
			//实名认证
			
			//实名认证
			if(result_user_data.cardFrontAudit == 0 || result_user_data.cardBackAudit == 0){
				cardAudit = "不通过";	
				card_btn_color = "secondary";
			}
			if(result_user_data.cardFrontAudit == 1 && result_user_data.cardBackAudit == 1){
				cardAudit = "通过";	
				card_btn_color = "success";
			}	
			
			//实名认证 - 前面
			switch(parseInt(result_user_data.cardFrontAudit)){
				case 0:cardFrontAudit = "不通过";break;	
				case 1:cardFrontAudit = "通过";break;	
				case 2:cardFrontAudit = "待审核";break;	
				default:cardFrontAudit = "其他";break;	
			}
			
			//实名认证 - 后面
			switch(parseInt(result_user_data.cardBackAudit)){
				case 0:cardBackAudit = "不通过";break;	
				case 1:cardBackAudit = "通过";break;	
				case 2:cardBackAudit = "待审核";break;	
				default:cardBackAudit = "其他";break;	
			}
			
			
			//高级认证
			switch(parseInt(result_user_data.antiMoneyAudit)){
				case 0:antiMoneyAudit = "不通过";antiMoney_btn_color="secondary";break;	
				case 1:antiMoneyAudit = "通过";antiMoney_btn_color="success";break;	
				case 2:antiMoneyAudit = "待审核";antiMoney_btn_color="danger";break;	
				default:antiMoneyAudit = "其他";antiMoney_btn_color="secondary";break;	
			}
			
			user_info = '<li class="list-group-item active">用户基础资料</li>'+
			  '<li class="list-group-item">用户ID ：<span id="userid">'+ result_user_data.userId +'</span></li>'+
			  '<li class="list-group-item">用户名 ：'+ result_user_data.realName +'</li>'+
			  '<li class="list-group-item">手机号：'+ result_user_data.phone +'</li>'+
			  '<li class="list-group-item">邮箱：'+ result_user_data.email +'</li>'+
			  '<li class="list-group-item">注册时间：'+ result_user_data.registTime +'</li> '+			  
			  '<li class="list-group-item list-group-item-success">实名认证<span class="badge badge-'+card_btn_color+' float-right">'+cardAudit+'</span></li>'+
			  //'<li class="list-group-item list-group-item-warning">绑定银行卡<span class="badge badge-danger float-right">待审批</span></li>'+
			  '<li class="list-group-item list-group-item-info">高级认证审批<span class="badge badge-'+antiMoney_btn_color+' float-right">'+antiMoneyAudit+'</span></li>';
			
			
			//console.log(user_info);
			$("#user_info").html(user_info);
			
			
			//实名认证审批
			user_smrz = '<li class="list-group-item">真实姓名 ：'+ result_user_data.realName +'</li>'+
          				'<li class="list-group-item">身份证号码：'+ result_user_data.cardNo +'</li>'+
						'<li class="list-group-item">身份证（正面）【'+cardFrontAudit+'】 ：<a href="http://47.52.128.11:8090'+result_user_data.cardFrontUrl+'" data-title="身份证（正面）"  data-lightbox="example-1"><img src="http://47.52.128.11:8090'+result_user_data.cardFrontUrl+'_small.png"  class="card_img" /></a></li>'+
					  	'<li class="list-group-item">身份证（背面）【'+cardBackAudit+'】 ：<a href="http://47.52.128.11:8090'+result_user_data.cardBackUrl+'" data-title="身份证（背面）" data-lightbox="example-1"><img src="http://47.52.128.11:8090'+result_user_data.cardBackUrl+'_small.png"  class="card_img" /></a></li>';
			$(".user_smrz").html(user_smrz);
			
			
			//高级认证审批
			user_gjrz = '<li class="list-group-item">手持身份证【'+antiMoneyAudit+'】 ：<a href="http://47.52.128.11:8090'+result_user_data.antiMoneyUrl+'" data-title="手持身份证" data-lightbox="example-1"><img src="http://47.52.128.11:8090'+result_user_data.antiMoneyUrl+'"  class="card_img" /></a></li>';
			$(".user_gjrz").html(user_gjrz);
			
			
			/*var len = data.result.list.length;
			
			if(data.result.lastPage < 2) {
				$("#page").hide()
			} else {
				$("#page").show();
				for(var inab = 1; inab < data.result.lastPage + 1; inab++) {
					var page = '';
					var cur = '';	
					if(inab == 1) cur = ' active';
					page += '<li class="page-item'+ cur +'"><a class="page-link" href="#">' + inab + '</a></li>';
					$(".list2").append(page)
				}
			}
			for(var i = 0; i < len; i++) {
				//console.log(data.result.list[i])
				var result = '';
				result += '<tr><td>' + data.result.list[i].ueseId + '</td><td>' + data.result.list[i].realName + '</td><td>' + data.result.list[i].tradeTime + '</td><td>' + data.result.list[i].tradeType + '</td><td>' + data.result.list[i].amount + '</td><td>' + data.result.list[i].counts + '</td><td>' + data.result.list[i].price + '</td> <td><a href="appeal_detail.html?tradeId=' + data.result.list[i].tradeId + '&appealId=' + data.result.list[i].appealId + '" class="btn btn-secondary btn-sm">查看详情</a></td></tr>';
				$(".list").append(result)
			}*/
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
	
	
	//通过实名认证
	$(".smrz_tg").click(function(){
		var userid = $("#userid").html();
		$.ajax({
			type: "POST",
			url: "http://47.52.128.11:8090/anbi/backmgr/user/updateAuditStatus.do",
			data: {
				"token": _token,			
				"userId": userId,	
				"auditType": 1,	
				"status": 1,
				"remark":'实名认证成功'			
			},
			async: false,
			dataType: "json",
			success: function(data) {
				if(data.code=='40008'){
					alert("身份过期，请重新登录！");
					location.href='login.html';	
					return false;
				}
				
				if(data.code=='200'){
					alert("提交成功");	
				}else{
					alert(data.msg);					
				}
			}
		});
	});
	
	//拒绝实名认证
	$(".smrz_jj").click(function(){
		var userid = $("#userid").html();
		var smrz_jjyy_select = $("#smrz_jjyy_select").val();
		var smrz_jjyy = $("#smrz_jjyy").val();//其他拒绝原因
		$.ajax({
			type: "POST",
			url: "http://47.52.128.11:8090/anbi/backmgr/user/updateAuditStatus.do",
			data: {
				"token": _token,			
				"userId": userId,	
				"auditType": 1,	
				"status": 0,
				"remark":smrz_jjyy_select+" "+smrz_jjyy		
			},
			async: true,
			dataType: "json",
			success: function(data) {
				if(data.code=='40008'){
					alert("身份过期，请重新登录！");
					location.href='login.html';	
					return false;
				}
				
				if(data.code=='200'){
					alert("提交成功");	
				}else{
					alert(data.msg);					
				}
				return true;
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				if(textStatus == "error"){
					alert("接口数据错误");
					return false;
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
	
	
	//通过高级认证
	$(".gjrz_tg").click(function(){
		var userid = $("#userid").html();
		
		$.ajax({
			type: "POST",
			url: "http://47.52.128.11:8090/anbi/backmgr/user/updateAuditStatus.do",
			data: {
				"token": _token,			
				"userId": userId,	
				"auditType": 2,	
				"status": 1,
				"remark":'高级认证成功'			
			},
			async: true,
			dataType: "json",
			success: function(data) {
				if(data.code=='40008'){
					alert("身份过期，请重新登录！");
					location.href='login.html';	
					return false;
				}
				
				if(data.code=='200'){
					alert("提交成功");	
				}else{
					alert(data.msg);					
				}
				return true;
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				if(textStatus == "error"){
					alert("接口数据错误");
					return false;
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
	
	//拒绝高级认证
	$(".gjrz_jj").click(function(){
		var userid = $("#userid").html();
		var gjrz_jjyy_select = $("#gjrz_jjyy_select").val();
		var gjrz_jjyy = $("#gjrz_jjyy").val();//其他拒绝原因		
		$.ajax({
			type: "POST",
			url: "http://47.52.128.11:8090/anbi/backmgr/user/updateAuditStatus.do",
			data: {
				"token": _token,			
				"userId": userId,	
				"auditType": 2,	
				"status": 0,
				"remark":gjrz_jjyy_select+" "+gjrz_jjyy		
			},
			async: false,
			dataType: "json",
			success: function(data) {
				if(data.code=='40008'){
					alert("身份过期，请重新登录！");
					location.href='login.html';	
					return false;
				}
				
				if(data.code=='200'){
					alert("提交成功");	
				}else{
					alert(data.msg);					
				}
				//return true;
			}
		});
	});
	
	
	
	
	
});

