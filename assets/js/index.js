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
				$("#navul").html('<li class="dropdown user-dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-user"></i>&nbsp;&nbsp; '+data.userName+' &nbsp;&nbsp;<b class="caret"></b></a>'
				+'<ul class="dropdown-menu">'
						+'<li><a href="#" onclick="logout()"><i class="fa fa-power-off"></i> Log Out</a></li></ul></li>');
			}else{
				$("#navul").html('<li><a href="login.html"><i class="fa fa-hand-o-right"></i> Log In &nbsp;&nbsp;&nbsp;&nbsp;</a></li>');
			}
		},
		error:function(){
			
		}
	});
	var url = location.search;
	if(url.indexOf("?")!=-1){
		var str = url.substr(1);
		$("#inner").attr("data",str.split("=")[1]);
	}else{
		$("#inner").attr("data","welcome.html");
	}
});
function logout(){
	document.cookie="myToken=";
	window.location.href="index.html";
}