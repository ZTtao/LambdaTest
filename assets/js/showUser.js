/**
 * @author 张镇涛
 */
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
	$("#inputName").blur(function(){
		if($("#inputName").val().trim() == ""){
			$("#errorName").addClass("HTooltip shake animated");
			$("#errorName").show();
		}
	});
	$("#inputPassword").blur(function(){
		if($("#inputPassword").val().trim() == ""){
			$("#errorPassword").addClass("HTooltip shake animated");
			$("#errorPassword").show();
		}
	});
	$("#inputName").focus(function(){
		$("#errorName").hide();
	})
	$("#inputPassword").focus(function(){
		$("#errorPassword").hide();
	})
	$("#editDiv").on('hidden.bs.modal',function(e){
		$("#errorName").hide();
		$("#errorPassword").hide();
		$("#inputId").val("0");
	})
	$("#btnSubmit").click(function(){
		if($("#inputName").val().trim() != "" && $("#inputPassword").val().trim() != null){
			$("#editDiv").hide();
			var userId = $("#inputId").val().trim();
			var userName = $("#inputName").val().trim();
			var userInfo = $("#inputInfo").val().trim();
			var password = $("#inputPassword").val().trim();
			var param = {
				userId:userId,
				userName:userName,
				userInfo:userInfo,
				password:password,
				baseInfo:baseInfo
			};

			$.ajax({
				url:'https://u1frree29c.execute-api.ap-northeast-2.amazonaws.com/beta1/updateuser',
				type:'post',
				data:JSON.stringify(param),
				contentType:'application/json',
				success:function(data){
					data = $.parseJSON(data);
					if(data.success){
						$.tooltip('OK, 操作成功！', 2500, true);
						$('#table').bootstrapTable('refresh', null);
						$("#formEdit")[0].reset();
					}else{
						$.tooltip(data.message);
					}
				},
				error:function(){
					$.tooltip("出错了！！！");
				}
			});
		}
	});
	$("#table").bootstrapTable({
		columns:[{
			field:'state',
			checkbox:'true'
		},{
			field:'userId',
			title:'User ID',
			sortable:'true'
		},{
			field:'userName',
			title:'Name',
			sortable:'true'
		},{
			field:'userInfo',
			title:'Info',
			sortable:'true'
		},{
			field:'password',
			title:'Password'
		}],
		search:'true',	//启用搜索框
		url:'https://u1frree29c.execute-api.ap-northeast-2.amazonaws.com/beta1/showusers',	//服务器url
		method:'post',
		queryParams:function(params){
			params.baseInfo = baseInfo;
			return params;
		},
		responseHandler:function(res){
			res = $.parseJSON(res);
			return res;
		},
		pagination:'true',	//启用分页
		sortName:'userId',	//默认排序字段
		sidePagination:'server',	//服务器分页
		pageList:[10,20,50],	//可选择的每页记录数量
		showColumns:'true',
		showRefresh:'true',
		showToggle:'true',
		clickToSelect:'true',
		striped:'true'
	});
	window.operateEvents = {
		'click .edit':function(e,value,row){
			$("#inputId").val(row.userId);
			$("#inputName").val(row.userName);
			$("#inputInfo").val(row.userInfo);
			$("#inputPassword").val(row.password);
		}
	};
	function operateFormatter(value,row,index){
		return [
		        '<div class="text-center">',
		        '<a class="edit" href="javascript:void(0)" title="Edit" data-toggle="modal" data-target="#editDiv">',
		        '<i class="glyphicon glyphicon-pencil"></i>',
		        '</a>',
		        '</div>'
		        ].join('');
	}
	var $table = $('#table'),$remove = $('#delete'),$edit = $('#edit'),$add = $('#add');
	$(function(){
		$table.on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table',function(){
			$remove.prop('disabled',!$table.bootstrapTable('getSelections').length);
			$edit.prop('disabled',$table.bootstrapTable('getSelections').length != 1);
		});
		$add.click(function(){
			$("#inputId").val('0');
			$("#inputName").val('');
			$("#inputInfo").val('');
			$("#inputPassword").val('');
		});
		$edit.click(function(){
			var row = $table.bootstrapTable('getSelections')[0];
			$("#inputId").val(row.userId);
			$("#inputName").val(row.userName);
			$("#inputInfo").val(row.userInfo);
			$("#inputPassword").val(row.password);
		});
		$remove.click(function(){
			$.dialog('confirm','提示','确定删除？',0,function(){
				$.closeDialog(); 
				var ids = $.map($table.bootstrapTable('getSelections'),function(row){
					return row.userId;
				});
				var params = {
					baseInfo:baseInfo,
					ids:ids
				};
				$.ajax({
					url:'https://u1frree29c.execute-api.ap-northeast-2.amazonaws.com/beta1/deleteuser',
					data:JSON.stringify(params),
					contentType:'application/json',
					type:'post',
					success:function(data){
						data = $.parseJSON(data);
						if(data.success){
							$.tooltip('OK, 操作成功！', 2500, true);
							$table.bootstrapTable('remove',{
								field:'userId',
								values:ids
							});
							$remove.prop('disabled',true);
						}else{
							$.tooltip(data.message);
						}
					},
					error:function(){
						$.tooltip('My God, 出错啦！！！');
					}
				});
			});
		});
	});