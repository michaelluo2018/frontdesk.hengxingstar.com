$(document).ready(function() {
	
	function getCookie(str) {
		var tmp, reg = new RegExp("(^|)" + str + "=([^;]*)(;|$)", "gi");
		if(tmp = reg.exec(document.cookie)) return(tmp[2]);
		return null;
	};
	//删除cookie 
	function delCookie(name)
	{
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var cval=getCookie(name);
		if(cval!=null)
		document.cookie= name + "="+cval+";expires="+exp.toGMTString();
	}
	
	var _token = getCookie("token");
	if(_token==null || _token==''){
		window.location.href='login.html';	
	}
	//时间格式化
	function date_Format(DateIn) {  
		 var Year = 0;  
		 var Month = 0;  
		 var Day = 0;  
		 var CurrentDate = "";  
		 //初始化时间  
		 Year = DateIn.getYear();  
		 Month = DateIn.getMonth()+1;  
		 Day = DateIn.getDate();  
		 Year = (Year < 1900 ? (1900 + Year) : Year);  
		 CurrentDate = Year + "-";  
		 if (Month >= 10) {  
			 CurrentDate = CurrentDate + Month + "-";  
		 }  
		 else {  
			 CurrentDate = CurrentDate + "0" + Month + "-";  
		 }  
		 if (Day >= 10) {  
			 CurrentDate = CurrentDate + Day;  
		 }  
		 else {  
			 CurrentDate = CurrentDate + "0" + Day;  
		 }  
		 return CurrentDate;  
	}  
	
	var startDate = $.trim($('#stime').val());//开始时间
	var endDate =  $.trim($('#etime').val());//结束时间
	
	/*if(startDate == '')
	{
		var dateStart = new Date((new Date().getTime()-1000*60*60*24*30));  //29       
           startDate=date_Format(dateStart);   	
	}*/
	
	if(endDate == '')
	{
		var dateStart = new Date();  
        endDate=date_Format(dateStart);   	
	}
	
	//下载excel
	$("body").on("click", "#download", function() {
				
		//搜索信息组合
		var stime = $.trim($('#stime').val());//开始时间
		var etime = $.trim($('#etime').val());//结束时间
		var userId = $.trim($('#uid').val());//用户id
		if(stime != ''){
			startDate = stime;
		}
		
		if(etime != ''){
			endDate = etime;
		}		
		
		if(userId != ''){
			userId = parseInt(userId);
		}	
		
		window.open("http://47.52.128.11:8090/anbi/backmgr/trade/exportExcel.do?token="+_token+"&startDate="+startDate+"&endDate="+endDate+"&userId="+userId);
		
		
	});
	
	
	//翻页 和 搜索
	$("body").on("click", ".page-link,#search", function() {
		$(".list").html("");
		var pageNum = $(this).html();
		if(pageNum == '搜索'){
			pageNum = 1;	
		}
		
		//搜索信息组合
		var stime = $.trim($('#stime').val());//开始时间
		var etime = $.trim($('#etime').val());//结束时间
		var userId = $.trim($('#uid').val());//用户id
		if(stime != ''){
			startDate = stime;
		}
		
		if(etime != ''){
			endDate = etime;
		}		
		
		if(userId != ''){
			userId = parseInt(userId);
		}	
		
		$.ajax({
		type: "GET",
		url: "http://47.52.128.11:8090/anbi/backmgr/trade/getTradeList.do",
		data: {
			"token": _token,
			"pageSize": 10,
			"pageNum":pageNum,
			"startDate": startDate,
			"endDate": endDate,
			"userId": userId
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
				var result = '',tradeType;
				if(data.result.list[i].tradeType == "1")
					tradeType = "出售";
				else
					tradeType = "求购";
				result += '<tr><td>' + data.result.list[i].userId + '</td><td>' + data.result.list[i].realName + '</td><td>' + data.result.list[i].tradeTime + '</td><td>' + tradeType + '</td><td>' + data.result.list[i].tradeId + '</td><td>' + data.result.list[i].amount + '</td><td>' + data.result.list[i].counts + '</td><td>' + data.result.list[i].price + '</td></tr>';
				$(".list").append(result)
			}
		}
	});
	})
	$.ajax({
		type: "GET",
		url: "http://47.52.128.11:8090/anbi/backmgr/trade/getTradeList.do",
		data: {
			"token": _token,
			"pageSize": 10,
			"startDate": startDate,
			"endDate": endDate
		},
		async: true,
		dataType: "json",
		success: function(data) {
			if(data.code=='40008'){
				alert("身份过期，请重新登录！");
				location.href='login.html';	
			}
			//console.log(data);
			var len = data.result.list.length;
			
			if(data.result.lastPage < 2) {
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
				var result = '',tradeType;
				if(data.result.list[i].tradeType == "1")
					tradeType = "出售";
				else
					tradeType = "求购";
				result += '<tr><td>' + data.result.list[i].userId + '</td><td>' + data.result.list[i].realName + '</td><td>' + data.result.list[i].tradeTime + '</td><td>' + tradeType + '</td><td>' + data.result.list[i].tradeId + '</td><td>' + data.result.list[i].amount + '</td><td>' + data.result.list[i].counts + '</td><td>' + data.result.list[i].price + '</td> </tr>';
				$(".list").append(result)
			}
		}
	});
	
});

