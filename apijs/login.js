$(".btn-block").click(function() {
	var user_code = $("#user_code").val(),
		user_name = $("#user_name").val(),
		user_pwd = $("#user_pwd").val();
	if(user_code == '') {
		$("#user_code").focus();
		$("#user_code").parent().find(".message").show();
	} else if(user_name == '') {
		$("#user_name").focus();
		$("#user_name").parent().find(".message").show();
	} else if(user_pwd == '') {
		$("#user_pwd").focus();
		$("#user_pwd").parent().find(".message").show();
	} else {
		var hash = hex_md5(user_pwd);
		/*$.get("http://47.52.128.11:8090/anbi/backmgr/sysuser/open/login.do", {
				id: user_code,
				name: user_name,
				md5Pwd: hash
			},
			function(data) {
				console.log(data)
			});*/
		$.ajax({
			type: "GET",
			url: "http://47.52.128.11:8090/anbi/backmgr/sysuser/open/login.do",
			async: true,
			dataType: "json",
			data: {
				"id": user_code,
				"name": user_name,
				"md5Pwd": hash
			},
			success: function(data) {
				//console.log(data.result.token)
				var date = new Date();
				date.setTime(date.getTime() + +60 * 60 * 1000*24*30*6); //设置date为当前时间：1小时（60*60*1000=1个小时）
				document.cookie = "token" + "=" + escape(data.result.token) + ";expires=" + date.toGMTString(); //将date赋值给expires
				window.location.href = 'index.html'
			}
		});
	}

});
setInterval(function() {
	var user_code = $("#user_code").val(),
		user_name = $("#user_name").val(),
		user_pwd = $("#user_pwd").val();
	if(user_code != '') {
		$("#user_code").parent().find(".message").hide();
	}
	if(user_name != '') {
		$("#user_name").parent().find(".message").hide();
	}
	if(user_pwd != '') {
		$("#user_pwd").parent().find(".message").hide();
	}
}, 100);
$(document).ready(function(){
	function getCookie(str) {
	var tmp, reg = new RegExp("(^|)" + str + "=([^;]*)(;|$)", "gi");
	if(tmp = reg.exec(document.cookie)) return(tmp[2]);
	return null;
};
var _token = getCookie("token");
if(_token!=null){
	//console.log(_token)
	//window.location.href='index.html'
}
})