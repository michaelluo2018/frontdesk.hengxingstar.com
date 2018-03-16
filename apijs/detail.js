function getParam(paramName) {
	paramValue = "", isFound = !1;
	if(this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) {
		arrSource = unescape(this.location.search).substring(1, this.location.search.length).split("&"), i = 0;
		while(i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++
	}
	return paramValue == "" && (paramValue = null), paramValue
}
var appealId = getParam("appealId")
var appealId = getParam("appealId")

function getCookie(str) {
	var tmp, reg = new RegExp("(^|)" + str + "=([^;]*)(;|$)", "gi");
	if(tmp = reg.exec(document.cookie)) return(tmp[2]);
	return null;
};

var _token = getCookie("token");
//买方
$.ajax({
	type: "GET",
	url: "http://47.52.128.11:8090/anbi/backmgr/appeal/infoBuyList.do",
	data: {
		"token": _token,
		"appealId": appealId
	},
	async: true,
	dataType: "json",
	success: function(data) {
		var len = data.result.list.length;
		//console.log(data.result.list[0].tradeId)
		var result = '',result2 = '',isBuyer,appealType;
		//申诉类型 appealType 0-其他、1-对方未付款、2-对方未放行、3-对方无应答、4-对方有欺诈行为
		//isBuyer 0-卖家 1-买家
		switch(parseInt(data.result.list[0].isBuyer)){
			case 0:isBuyer = "卖家";break;
			case 1:isBuyer = "买家";break;				
			default:isBuyer = "其他";break;
		}
		
		switch(parseInt(data.result.list[0].appealType)){
			case 1:appealType = "对方未付款";break;
			case 2:appealType = "对方未放行";break;
			case 3:appealType = "对方无应答";break;
			case 4:appealType = "对方有欺诈行为";break;
			default:appealType = "其他";break;			
		}
		
		$(".buyer_btn").attr("href","user_detail.html?userId="+data.result.list[0].userId);
		
			
		result += '<tr>' +
			' <td>订单号：' + data.result.list[0].tradeId + '</td>' +
			'  <td>用户id：' + data.result.list[0].userId + '</td>  ' +
			'  <td>身份：' + isBuyer + '</td>   ' +
			' </tr>   ' +
			' <tr>' +
			'    <td>付款参考号：' + data.result.list[0].referNo + '</td>' +
			'    <td>申诉对接口令：' + data.result.list[0].code + '</td>   ' +
			'    <td>投诉类型：' + appealType + '</td> ' +
			' </tr> ' +
			' <tr>' +
			'     <td>交易金额：' + data.result.list[0].money + '</td>   ' +
			'     <td>数量：' + data.result.list[0].amount + '</td>' +
			'     <td>价格：' + data.result.list[0].price + '</td> ' +
			'</tr> ';
		/*result2 += '<tr>' +
			'<td>' + data.result.list[0].proofImg + '</td>   ' +
			' <td>' + data.result.list[0].appealType + '</td>' +
			' <td>' + data.result.list[0].proofTxt + '</td>' +
			' </tr>';*/
		$(".buylist").append(result);
		//$(".buylist2").append(result2)
		
		
		//买方证据
		$.ajax({
			type: "GET",
			url: "http://47.52.128.11:8090/anbi/backmgr/appeal/proofInfo.do",
			data: {
				"token": _token,
				"appealId": appealId,
				"userId": data.result.list[0].userId
			},
			async: true,
			dataType: "json",
			success: function(data) {
				var len = data.result.length;
				//console.log(data.result.list[0].tradeId)
				var result2 = '';				
				result2 += '<tr>' +
					' <td><a href="http://47.52.128.11:8090/' + data.result[0].proofImg + '"  data-lightbox="example-1"  data-title="买方证据" ><img src="http://47.52.128.11:8090/' + data.result[0].proofImg + '" class="doom_img"></a></td>   ' +
					' <td>' + data.result[0].proofTxt + '</td>' +
					' <td>' + data.result[0].createTime + '</td>' +
					' </tr>';
				//$(".buylist").append(result);
				$(".buylist2").append(result2)
			}
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



//卖方
$.ajax({
	type: "GET",
	url: "http://47.52.128.11:8090/anbi/backmgr/appeal/infoSaleList.do",
	data: {
		"token": _token,
		"appealId": appealId
	},
	async: true,
	dataType: "json",
	success: function(data) {
		var len = data.result.list.length;
		//console.log(data.result.list[0].tradeId)
		var result3 = '',result4 = '',appealType='',isBuyer='';
			if(data.result.list[0].wecharAccount == null){
				data.result.list[0].wecharAccount='';
			}
			
			$(".sale_btn").attr("href","user_detail.html?userId="+data.result.list[0].userId);
			//申诉类型 appealType 0-其他、1-对方未付款、2-对方未放行、3-对方无应答、4-对方有欺诈行为
			//isBuyer 0-卖家 1-买家
			switch(parseInt(data.result.list[0].isBuyer)){
				case 0:isBuyer = "卖家";break;
				case 1:isBuyer = "买家";break;				
			}
			
			switch(parseInt(data.result.list[0].appealType)){
				case 1:appealType = "对方未付款";break;
				case 2:appealType = "对方未放行";break;
				case 3:appealType = "对方无应答";break;
				case 4:appealType = "对方有欺诈行为";break;
				default:appealType = "其他";break;
			}
			
			
		result3 += '<tr>' +
			' <td>订单号：' + data.result.list[0].tradeId + '</td>' +
			'  <td>用户id：' + data.result.list[0].userId + '</td>  ' +
			'  <td>身份：' + isBuyer + '</td>   ' +
			' </tr>   ' +
			' <tr>' +
			'    <td>付款参考号：' + data.result.list[0].referNo + '</td>' +
			'    <td>申诉对接口令：' + data.result.list[0].code + '</td>   ' +
			'    <td>投诉类型：' + appealType + '</td> ' +
			' </tr> ' +			
			' <tr>' +
			'     <td>支付宝：' + data.result.list[0].alipayAccount + '</td> ' +
			'     <td>微信：' + data.result.list[0].wecharAccount + '</td>' +
			'     <td>银行：' + data.result.list[0].bankAccount + '</td>   ' +
			
			'</tr>    ';
		/*result4 += '<tr>' +
			'<td>' + data.result.list[0].proofImg + '</td>   ' +
			' <td>' + data.result.list[0].appealType + '</td>' +
			' <td>' + data.result.list[0].proofTxt + '</td>' +
			' </tr>';*/
		$(".salelist").append(result3);
		//$(".salelist2").append(result4)
		
		//卖方证据
		$.ajax({
			type: "GET",
			url: "http://47.52.128.11:8090/anbi/backmgr/appeal/proofInfo.do",
			data: {
				"token": _token,
				"appealId": appealId,
				"userId": data.result.list[0].userId
			},
			async: true,
			dataType: "json",
			success: function(data) {
				var len = data.result.length;
				//console.log(data.result.list[0].tradeId)
				var result4 = '';				
				result4 += '<tr>' +
					' <td><a href="http://47.52.128.11:8090/' + data.result[0].proofImg + '"  data-lightbox="example-2" data-title="卖方证据" ><img src="http://47.52.128.11:8090/' + data.result[0].proofImg + '" class="doom_img"></a></td>   ' +
					' <td>' + data.result[0].proofTxt + '</td>' +
					' <td>' + data.result[0].createTime + '</td>' +
					' </tr>';
				//$(".buylist").append(result);
				$(".salelist2").append(result4)
			}
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

//进行判决
$("#submit_doom").click(function() {
	/*var myselect = document.getElementById("country");
	var index=myselect.selectedIndex ;
	console.log(myselect.options[index].text);*/
	
	var doom_win = $("#doom_win").val();//判断输赢
	var doom_clbuy = $("#doom_clbuy").val();//处理买方
	var doom_clsale = $.trim($("#doom_clsale").val());//处理卖方
	var doom_info = $("#doom_info").val();//备注
	
	//判断输赢		
	$.ajax({
		type: "GET",
		url: "http://47.52.128.11:8090/anbi/backmgr/appeal/adjustAppeal.do",
		data: {
			"token": _token,
			"appealId": appealId,
			"appealResult": doom_win,
			"buyerResult": doom_clbuy,
			"salerResult": doom_clsale,
			"appealRemark": doom_info
		},
		async: true,
		dataType: "json",
		success: function(data) {			
			if(data.code == 200){
				alert("操作成功");
				console.log(data);		
			}else{
				alert(data.msg);
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