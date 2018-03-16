// JavaScript Document
$(document).ready(function() {
//退出登录
function getCookie(str) {
	var tmp, reg = new RegExp("(^|)" + str + "=([^;]*)(;|$)", "gi");
	if(tmp = reg.exec(document.cookie)) return(tmp[2]);
	return null;
};
var _token = getCookie("token");


if(_token==null || _token==''){
	window.location.href='login.html';	
}
$(".user_logout").click(function() {	
	if(!confirm("确定退出吗？")) return false;
	$.ajax({
		type: "GET",
		url: "http://47.52.128.11:8090/anbi/backmgr/sysuser/logout.do",
		data: {
			"token": _token			
		},
		async: true,
		dataType: "json",
		success: function(data) {
			if(data.code=='40008'){
				alert("身份过期，请重新登录！");
				location.href='login.html';	
				return false;
			}
			
			if(data.code == 200){
				//删除cookie
				var exp = new Date();
				exp.setTime(exp.getTime() - 1);
				var cval=getCookie(name);
				if(cval!=null)
				document.cookie= name + "="+cval+";expires="+exp.toGMTString();
				//document.cookie = "token" + "='';expires=-1"; //将date赋值给expires
				window.location.href='login.html';
				return false;
			}else{
				alert("退出失败");	
			}
			return true;
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

});

