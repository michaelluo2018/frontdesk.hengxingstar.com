function getParam(paramName) {
	paramValue = "", isFound = !1;
	if(this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) {
		arrSource = unescape(this.location.search).substring(1, this.location.search.length).split("&"), i = 0;
		while(i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++
	}
	return paramValue == "" && (paramValue = null), paramValue
}
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
		var result = '',
			result2 = '';
		result += '<tr>' +
			' <td>订单号：' + data.result.list[0].tradeId + '</td>' +
			'  <td>用户id：' + data.result.list[0].userId + '</td>  ' +
			'  <td>身份：' + data.result.list[0].isBuyer + '</td>   ' +
			' </tr>   ' +
			' <tr>' +
			'    <td>付款参考号：' + data.result.list[0].referNo + '</td>' +
			'    <td>申诉对接口令：' + data.result.list[0].code + '</td>   ' +
			'    <td>交易金额：' + data.result.list[0].money + '</td> ' +
			' </tr> ' +
			' <tr>' +
			'     <td>数量：' + data.result.list[0].amount + '</td>' +
			'     <td>价格：' + data.result.list[0].price + '</td> ' +
			'     <td>单位：安币</td>   ' +
			'</tr> ' +
			' <tr>' +
			'     <td>支付宝：</td>' +
			'     <td>微信：</td>   ' +
			'     <td>银行：</td>   ' +
			'</tr>    ';
		result2 += '<tr>' +
			'<td>' + data.result.list[0].proofImg + '</td>   ' +
			' <td>' + data.result.list[0].appealType + '</td>' +
			' <td>' + data.result.list[0].proofTxt + '</td>' +
			' </tr>';
		$(".buylist").append(result);
		$(".buylist2").append(result2)
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
		var result3 = '',
			result4 = '';
			if(data.result.list[0].wecharAccount == null){
				data.result.list[0].wecharAccount='';
			}
		result3 += '<tr>' +
			' <td>订单号：' + data.result.list[0].tradeId + '</td>' +
			'  <td>用户id：' + data.result.list[0].userId + '</td>  ' +
			'  <td>身份：' + data.result.list[0].isBuyer + '</td>   ' +
			' </tr>   ' +
			' <tr>' +
			'    <td>付款参考号：' + data.result.list[0].referNo + '</td>' +
			'    <td>申诉对接口令：' + data.result.list[0].code + '</td>   ' +
			'    <td>交易金额：' + data.result.list[0].money + '</td> ' +
			' </tr> ' +
			' <tr>' +
			'     <td>数量：</td>' +
			'     <td>价格：</td> ' +
			'     <td>单位：安币</td>   ' +
			'</tr> ' +
			' <tr>' +
			'     <td>支付宝：' + data.result.list[0].alipayAccount + '</td>' +
			'     <td>微信：' + data.result.list[0].wecharAccount + '</td>   ' +
			'     <td>银行：' + data.result.list[0].bankAccount + '</td>   ' +
			'</tr>    ';
		result4 += '<tr>' +
			'<td>' + data.result.list[0].proofImg + '</td>   ' +
			' <td>' + data.result.list[0].appealType + '</td>' +
			' <td>' + data.result.list[0].proofTxt + '</td>' +
			' </tr>';
		$(".salelist").append(result3);
		$(".salelist2").append(result4)
	}
});
$(".btn-block").click(function() {
	var myselect = document.getElementById("country");
	var index=myselect.selectedIndex ;
	console.log(myselect.options[index].text);
	if(myselect.options[index].text == "不处理"){
		//console.log("不处理此项")
	}else{
		alert("开始处理问题")
	}
})