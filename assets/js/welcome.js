/**
 * @author 张镇涛
 */
$(function(){
	var token = "";
	var cookies = document.cookie.split(";");
	$.each(cookies,function(index,value){
		var temp = value.split("=");
		if(temp[0] == "myToken"){
			token = temp[1];
			return false;
		}
	});
	var cip = returnCitySN["cip"];
	var cid = returnCitySN["cid"];
	var cname = returnCitySN["cname"];
	var baseInfo = {
			token:token,
			cip:cip,
			cid:cid,
			cname:cname
	};
	$.ajax({
		type:'POST',
		url:'https://u1frree29c.execute-api.ap-northeast-2.amazonaws.com/beta1/checklogin',
		data:JSON.stringify(baseInfo),
		contentType:'application/json',
		success:function(data){
			data = $.parseJSON(data);
			if(data.success){
				$("#h1").html('Welcome,&nbsp;&nbsp;'+data.userName);
			}
		},
		error:function(){
			
		}
	});
})