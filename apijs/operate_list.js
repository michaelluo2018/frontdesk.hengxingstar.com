$(document).ready(function() {
	function getCookie(str) {
		var tmp, reg = new RegExp("(^|)" + str + "=([^;]*)(;|$)", "gi");
		if(tmp = reg.exec(document.cookie)) return(tmp[2]);
		return null;
	};
	var _token = getCookie("token");
	
	//翻页
	$("body").on("click", ".page-link", function() {
		$(".list").html("");
		var pageNum = $(this).html();
		$.ajax({
		type: "GET",
		url: "http://47.52.128.11:8090/anbi/backmgr/appeal/infoShortList.do",
		data: {
			"token": _token,
			"pageSize": 10,
			"pageNum":pageNum
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
				for(var inab = 1; inab < data.result.lastPage + 1; inab++) {
					var page = '';
					var cur = '';	
					if(pageNum == inab) cur = ' active';				
					page += '<li class="page-item'+ cur +'"><a class="page-link" href="#">' + inab + '</a></li>';
					$(".list2").append(page)
				}
			}
			
			for(var i = 0; i < len; i++) {
				//console.log(data.result.list[i])
				var result = '';
				result += '<tr><td>' + data.result.list[i].tradeId + '</td><td>' + data.result.list[i].userId + '</td><td>' + data.result.list[i].appealType + '</td><td>' + data.result.list[i].isBuyer + '</td><td>' + data.result.list[i].referNo + '</td><td>' + data.result.list[i].appealId + '</td> <td><a href="appeal_detail.html?tradeId=' + data.result.list[i].tradeId + '&appealId=' + data.result.list[i].appealId + '" class="btn btn-secondary btn-sm">查看详情</a></td></tr>';
				
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
		url: "http://47.52.128.11:8090/anbi/backmgr/sysuser/appealRecdOperHistory.do",
		data: {
			"token": _token,
			"pageSize": 10
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
				/*
				"sysUserName": "", 
        "TradeId": "662959609514815488", 
        "appealResult": "申诉中", 
        "slaveUserId": "200012", 
        "isBuyer": "未知", 
        "referNo": "578286", 
        "appealReason": "", 
        "masterUserId": "200000", 
        "appealType": "对方未付款", 
        "buyerResult": "正常状态", 
        "createTime": "2018-03-05 10:05:26", 
        "salerResult": "正常状态", 
        "sysUserId": ""
				*/
				
				result += '<tr><td>' + data.result.list[i].TradeId + '</td>'+
						'<td>' + data.result.list[i].masterUserId + '</td>'+
						'<td>' + data.result.list[i].isBuyer + '</td>'+
						'<td>' + data.result.list[i].appealType + '</td>'+
						'<td>' + data.result.list[i].slaveUserId + '</td>'+
						'<td>' + data.result.list[i].referNo + '</td>'+
						'<td>' + data.result.list[i].appealResult + '</td>'+
						'<td>' + data.result.list[i].buyerResult + '</td>'+
						'<td>' + data.result.list[i].salerResult + '</td>'+
						'<td>' + data.result.list[i].sysUserId + '</td>'+
						'<td>' + data.result.list[i].sysUserName + '</td>'+						
						'</tr>';
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
