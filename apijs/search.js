//function getCookie(str) {
//		var tmp, reg = new RegExp("(^|)" + str + "=([^;]*)(;|$)", "gi");
//		if(tmp = reg.exec(document.cookie)) return(tmp[2]);
//		return null;
//	};
//	var _token = getCookie("token");
//$("#search").click(function(){
//	$(".list").html("");
//	var keyword=document.getElementById("keyword").value;
//		$.ajax({
//		type: "GET",
//		url: "http://47.52.128.11:8090/anbi/backmgr/appeal/infoShortList.do",
//		data: {
//			"token": _token,
//			"tradeId":keyword
//		},
//		async: true,
//		dataType: "json",
//		success: function(data) {
//			var len = data.result.list.length;
//			console.log(len)
//			for(var i = 0; i < len; i++) {
//				//console.log(data.result.list[i])
//				var result = '';
//				result += '<tr><td>' + data.result.list[i].tradeId + '</td><td>' + data.result.list[i].userId + '</td><td>' + data.result.list[i].appealType + '</td><td>' + data.result.list[i].isBuyer + '</td><td>' + data.result.list[i].referNo + '</td><td>' + data.result.list[i].appealId + '</td> <td><a href="appeal_detail.html?tradeId=' + data.result.list[i].tradeId + '&appealId=' + data.result.list[i].appealId + '" class="btn btn-secondary btn-sm">查看详情</a></td></tr>';
//				$(".list").append(result)
//			}
//		}
//	});
//})