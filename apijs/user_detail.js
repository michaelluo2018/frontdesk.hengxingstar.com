$(document).ready(function() {
	function getCookie(str) {
		var tmp, reg = new RegExp("(^|)" + str + "=([^;]*)(;|$)", "gi");
		if(tmp = reg.exec(document.cookie)) return(tmp[2]);
		return null;
	};
	var _token = getCookie("token");
	
	function getParam(paramName) {
		paramValue = "", isFound = !1;
		if(this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) {
			arrSource = unescape(this.location.search).substring(1, this.location.search.length).split("&"), i = 0;
			while(i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++
		}
		return paramValue == "" && (paramValue = null), paramValue
	}
	
	var userId = getParam("userId");
	
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
			"pageNum":pageNum,
			"userId":userId,
			"appealStatus":2
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
				var result = '',appealType,isBuyer,appealResult,sellerResult,buyerResult;			
				
				switch(parseInt(data.result.list[i].appealType)){
					case 1:appealType = "对方未付款";break;
					case 2:appealType = "对方未放行";break;
					case 3:appealType = "对方无应答";break;
					case 4:appealType = "对方有欺诈行为";break;
					default:appealType = "其他";break;			
				}
				switch(parseInt(data.result.list[i].isBuyer)){
					case 0:isBuyer = "卖家";break;
					case 1:isBuyer = "买家";break;				
					default:isBuyer = "其他";break;
				}
				//申诉处理 0-未确定,1-胜诉,2-败诉,3-取消
				switch(parseInt(data.result.list[i].appealResult)){
					case 0:appealResult = "未确定";break;
					case 1:appealResult = "胜诉";break;
					case 2:appealResult = "败诉";break;
					case 3:appealResult = "取消";break;
					default:appealResult = "其他";break;			
				}
				//卖家处理 0-不惩罚   1-24之内不能交易    2-永远不能交易
				switch(parseInt(data.result.list[i].sellerResult)){
					case 0:sellerResult = "不惩罚";break;
					case 1:sellerResult = "24之内不能交易";break;
					case 2:sellerResult = "永远不能交易";break;
					default:sellerResult = "其他";break;			
				}
				//买家处理 0-不惩罚   1-24之内不能交易    2-永远不能交易
				switch(parseInt(data.result.list[i].buyerResult)){
					case 0:buyerResult = "不惩罚";break;
					case 1:buyerResult = "24之内不能交易";break;
					case 2:buyerResult = "永远不能交易";break;
					default:buyerResult = "其他";break;			
				}
				
				result += '<tr><td>' + data.result.list[i].tradeId + '</td>'+
						'<td>' + data.result.list[i].userId + '</td>'+
						'<td>' + isBuyer + '</td>'+
						'<td>' + appealType + '</td>'+
						'<td>' + data.result.list[i].appealId + '</td>'+
						'<td>' + appealResult + '</td>'+
						'<td>' + sellerResult + '</td>'+
						'<td>' + buyerResult + '</td>'+
						'<td>' + data.result.list[i].referNo + '</td>'+
						'</tr>';
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
			"userId":userId,
			"appealStatus":2
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
				var result = '',appealType,isBuyer,appealResult,sellerResult,buyerResult;			
				
				switch(parseInt(data.result.list[i].appealType)){
					case 1:appealType = "对方未付款";break;
					case 2:appealType = "对方未放行";break;
					case 3:appealType = "对方无应答";break;
					case 4:appealType = "对方有欺诈行为";break;
					default:appealType = "其他";break;			
				}
				switch(parseInt(data.result.list[i].isBuyer)){
					case 0:isBuyer = "卖家";break;
					case 1:isBuyer = "买家";break;				
					default:isBuyer = "其他";break;
				}
				//申诉处理 0-未确定,1-胜诉,2-败诉,3-取消
				switch(parseInt(data.result.list[i].appealResult)){
					case 0:appealResult = "未确定";break;
					case 1:appealResult = "胜诉";break;
					case 2:appealResult = "败诉";break;
					case 3:appealResult = "取消";break;
					default:appealResult = "其他";break;			
				}
				//卖家处理 0-不惩罚   1-24之内不能交易    2-永远不能交易
				switch(parseInt(data.result.list[i].sellerResult)){
					case 0:sellerResult = "不惩罚";break;
					case 1:sellerResult = "24之内不能交易";break;
					case 2:sellerResult = "永远不能交易";break;
					default:sellerResult = "其他";break;			
				}
				//买家处理 0-不惩罚   1-24之内不能交易    2-永远不能交易
				switch(parseInt(data.result.list[i].buyerResult)){
					case 0:buyerResult = "不惩罚";break;
					case 1:buyerResult = "24之内不能交易";break;
					case 2:buyerResult = "永远不能交易";break;
					default:buyerResult = "其他";break;			
				}
				
				result += '<tr><td>' + data.result.list[i].tradeId + '</td>'+
						'<td>' + data.result.list[i].userId + '</td>'+
						'<td>' + isBuyer + '</td>'+
						'<td>' + appealType + '</td>'+
						'<td>' + data.result.list[i].appealId + '</td>'+
						'<td>' + appealResult + '</td>'+
						'<td>' + sellerResult + '</td>'+
						'<td>' + buyerResult + '</td>'+
						'<td>' + data.result.list[i].referNo + '</td>'+
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
