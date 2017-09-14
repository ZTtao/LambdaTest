/**
 * @author 张镇涛
 */
function login(){
	var cip = returnCitySN["cip"];
	var cid = returnCitySN["cid"];
	var cname = returnCitySN["cname"];
	var baseInfo = {
			token:"",
			cip:cip,
			cid:cid,
			cname:cname
	};
	$("#process").show();
	$("#errorTip").hide();
	var userName = $("#username").val();
	var password = $("#password").val();
	var param = {
			baseInfo:baseInfo,
			userName:userName,
			password:password
	};
	$.ajax({
		url:'https://u1frree29c.execute-api.ap-northeast-2.amazonaws.com/beta1/login',
		type:'post',
		data:JSON.stringify(param),
		contentType:'application/json',
		success:function(data){
			$("#process").hide();
			data = $.parseJSON(data);
			if(data.success){
				$("#resultDiv").hide();
				$("#pwdResultDiv").hide();
				$("#errorTip").html("登录成功");
				$("#errorTip").show();
				$("#errorTip").removeClass("HTooltip shake animated alert alert-danger");
				$("#errorTip").addClass("HTooltip bounceInDown animated alert alert-success");
				document.cookie="myToken="+data.token;
				var iv = setInterval(function(){
					$("#errorTip").hide();
					clearInterval(iv);
					//登录成功，跳转页面
					window.location.href="index.html";
				},2000);
			}else{
				$("#errorTip").html("用户名或密码错误");
				$("#errorTip").show();
				$("#errorTip").removeClass("HTooltip bounceInDown animated alert alert-success");
				$("#errorTip").addClass("HTooltip shake animated alert alert-danger");
			}
		},
		error:function(){
			alert("error");
		}
	});
}

