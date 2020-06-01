var gvOverlay ;
var gvOverlayModal ;
var gvLoadingTitle = 'Loading';

var gvOpts = {
		lines: 13, // The number of lines to draw
		length: 11, // The length of each line
		width: 5, // The line thickness
		radius: 17, // The radius of the inner circle
		corners: 1, // Corner roundness (0..1)
		rotate: 0, // The rotation offset
		color: '#FFF', // #rgb or #rrggbb
		speed: 1, // Rounds per second
		trail: 60, // Afterglow percentage
		shadow: false, // Whether to render a shadow
		hwaccel: false, // Whether to use hardware acceleration
		className: 'spinner', // The CSS class to assign to the spinner
		zIndex: 2e9, // The z-index (defaults to 2000000000)
		top: 'auto', // Top position relative to parent in px
		left: 'auto' // Left position relative to parent in px
};

var gvTarget = document.createElement("div");
var gvTargetModal = document.createElement("div");

/**
 * Transaction Common Function
 * @param svcId
 * @param requestUrl
 * @param paramData
 * @param callback
 * @returns
 */


$(document).ready(function(){
	if(isNull(gvTarget)){
		document.body.appendChild(gvTarget);	
	}		
	
	if(isNull(gvTargetModal)){
		document.body.appendChild(gvTargetModal);	
	}		
	
	
});


function gvSpinnerOpen(callback){
	var strMsg = 'Loading....';
	var spinner = new Spinner(gvOpts).spin(gvTargetModal);
	
	var callback_func = eval(callback);
	
	if(isNullOrEmpty(gvOverlayModal) || gvOverlayModal == null){
		gvOverlayModal = iosOverlay({
			text: strMsg,
			spinner: spinner
		});
	}
	
	
}

function gvSpinnerClose(){
	if(!isNull(gvOverlayModal) && !isNullOrEmpty(gvOverlayModal)){
		gvOverlayModal.hide();
		gvOverlayModal = null;
		
	}
	
}

function callServiceSpinnerClose(svcId, requestUrl, paramData, callback){
	var url = gvSERVER + gvCONTEXT + "/" + requestUrl;
	var strMsg = '';
	var callback_func = eval(callback);
	
	
//	loading 추가	20170602
	var pattern1 = /get|select/;
	var pattern2 = /save|insert|update|delete/;
	var strMsg = 'Loading....';
	if(pattern2.test(requestUrl)){
		strMsg = 'Processing...';
	}

	if(requestUrl.indexOf("research") >= 0 || requestUrl.indexOf("psnldta") >= 0 || requestUrl.indexOf("modal") >= 0){
		var spinner = new Spinner(gvOpts).spin(gvTarget);
		
		if(isNullOrEmpty(gvOverlay) || gvOverlay == null){
			gvOverlay = iosOverlay({
				text: strMsg,
				spinner: spinner
			});
		}
	}
	
	
//	-----------------------------------------------------
	
	$.ajax({
		type: 'POST',
		url: url,
		dataType: 'json',
		contentType: "application/json", 
		data: JSON.stringify(paramData), 
		beforeSend : function(xhr){
			xhr.setRequestHeader("isAjax", "true");
			xhr.setRequestHeader("PER_CODE", $.session.get("PER_CODE"));
			
		},
		success : function(data,status, xhr){
			if(!isNull(gvOverlay) && !isNullOrEmpty(gvOverlay)){
				gvOverlay.hide();
				gvOverlay = null;
				
			}
			
			
			
		//	SESSION ERROR	
			/*if(xhr.getResponseHeader("REQUIRED_AUTH") == "-1"){
				showAlert('서버연결 오류',COM_0026,function(e){
					location.href = gvSERVER + gvCONTEXT + "/" + "login";
				});
			}*/
			

		//	Application ERROR	
			if(data.ERR_CD === '-1'){
				showAlertError('Application Error : ',data.ERR_MSG,null);
				return;
				
			}	
			
			
		//	DB ERROR	
			if(data.ERR_CD === '900'){
				showAlertError('DataAccessException',data.ERR_MSG,null);
				return;
				
			}
			
			callback_func(svcId, data);
			
			gvSpinnerClose();
			
			clearTimer();
			
		},
		error:function(request,status,error){
			//showDialog(BootstrapDialog.DANGER, "SERVER ERROR",request.responseText,'');
			showAlertError('DataAccessException',request.responseText,null);
			
			if(isNull(gvOverlay) || isNullOrEmpty(gvOverlay)){
				return;
				
			}
			
			gvOverlay.hide();
			gvOverlay = null;
			
			clearTimer();
	    }
	});
}


function callService(svcId, requestUrl, paramData, callback){
	var url = gvSERVER + gvCONTEXT + "/" + requestUrl;
	var strMsg = '';
	var callback_func = eval(callback);
	
	
//	loading 추가	20170602
	var pattern1 = /get|select/;
	var pattern2 = /save|insert|update|delete/;
	var strMsg = 'Loading....';
	if(pattern2.test(requestUrl)){
		strMsg = 'Processing...';
	}
	
	if(requestUrl.indexOf("research") >= 0 || requestUrl.indexOf("search") >= 0 || requestUrl.indexOf("psnldta") >= 0){
		var spinner = new Spinner(gvOpts).spin(gvTarget);
		
		if(isNullOrEmpty(gvOverlay) || gvOverlay == null){
			gvOverlay = iosOverlay({
				text: strMsg,
				spinner: spinner
			});
		}
	}
	
	
//	-----------------------------------------------------
	
	$.ajax({
		type: 'POST',
		url: url,
		dataType: 'json',
		contentType: "application/json", 
		data: JSON.stringify(paramData), 
		beforeSend : function(xhr){
			xhr.setRequestHeader("isAjax", "true");
			xhr.setRequestHeader("PER_CODE", $.session.get("PER_CODE"));
			
		},
		success : function(data,status, xhr){
			if(!isNull(gvOverlay) && !isNullOrEmpty(gvOverlay)){
				gvOverlay.hide();
				gvOverlay = null;
				
			}
			
			
			
		//	SESSION ERROR	
			/*if(xhr.getResponseHeader("REQUIRED_AUTH") == "-1"){
				showAlert('서버연결 오류',COM_0026,function(e){
					location.href = gvSERVER + gvCONTEXT + "/" + "login";
				});
			}*/
			

		//	Application ERROR	
			if(data.ERR_CD === '-1'){
				gvSpinnerClose();
				
				showAlertError('Application Error : ',data.ERR_MSG,null);
				return;
				
			}	
			
			
		//	DB ERROR	
			if(data.ERR_CD === '900'){
				showAlertError('DataAccessException',data.ERR_MSG,null);
				return;
				
			}
			
			// R 2018-09-17 에러메시지 추가
			if(data.ERR_CD === '100'){
				showAlert(null , "[ " + data.ERR_TEXT + " ] \n grouping factor must have exactly 2 levels \n 데이터 형식이 맞지 않습니다. 데이터 형식을 확인해 주세요.",null);
				
				$(".overlay").hide();
				return;
				
			}
			
			if(data.ERR_CD === '200'){
				showAlert(null , "[ " + data.ERR_TEXT + " ] \n RenjinException : " + data.ERR_MSG,null);
				
				$(".overlay").hide();
				return;
				
			}
			
			callback_func(svcId, data);
			
			clearTimer();
			
		},
		error:function(request,status,error){
			//showDialog(BootstrapDialog.DANGER, "SERVER ERROR",request.responseText,'');
			showAlertError('DataAccessException',request.responseText,null);
			
			if(isNull(gvOverlay) || isNullOrEmpty(gvOverlay)){
				return;
				
			}
			
			gvOverlay.hide();
			gvOverlay = null;
			
			clearTimer();
	    }
	});
}


/**
 * 
 * @param svcId
 * @param requestUrl
 * @param paramData
 * @param callback
 * @returns
 */
function callServiceSync(svcId, requestUrl, paramData, callback){
	var url = gvSERVER + gvCONTEXT + "/" + requestUrl;
	var strMsg = '';
	var callback_func = eval(callback);

//	loading 추가	20170602
	var pattern1 = /get|select/;
	var pattern2 = /save|insert|update|delete/;
	var strMsg = 'Loading....';
	if(pattern2.test(requestUrl)){
		strMsg = 'Processing...';
	}
	
	
	if(requestUrl.indexOf("research") >= 0 || requestUrl.indexOf("userList") >= 0 ){
		var spinner = new Spinner(gvOpts).spin(gvTarget);
		
		if(isNullOrEmpty(gvOverlay) || gvOverlay == null){
			gvOverlay = iosOverlay({
				text: strMsg,
				spinner: spinner
			});
		}
	}
	
	$.ajax({
		type: 'POST',
		url: url,
		dataType: 'json',
		contentType: "application/json", 
		data: JSON.stringify(paramData), 
		async: false,
		beforeSend : function(xhr){
			xhr.setRequestHeader("isAjax", "true");
			xhr.setRequestHeader("PER_CODE", $.session.get("PER_CODE"));
			
		},
		success : function(data,status, xhr){
			if(!isNull(gvOverlay) && !isNullOrEmpty(gvOverlay)){
				gvOverlay.hide();
				gvOverlay = null;
				
			}
			
			
			
		//	SESSION ERROR	
			/*if(xhr.getResponseHeader("REQUIRED_AUTH") == "-1"){
				showAlert('서버연결 오류',COM_0026,function(e){
					location.href = gvSERVER + gvCONTEXT + "/" + "login";
				});
			}*/
			

			
		//	Application ERROR	
			if(data.ERR_CD === '-1'){
				showAlertError('Application Error : ',data.ERR_MSG,null);
				return;
				
			}	
			
			
		//	DB ERROR	
			if(data.ERR_CD === '900'){
				showAlertError('DataAccessException',data.ERR_MSG,null);
				return;
				
			}
			
			callback_func(svcId, data);
			
			clearTimer();
			
		},
		error:function(request,status,error){
			showAlertError('Application ERROR : ',request.responseText,null);
			
			
			if(isNull(gvOverlay) || isNullOrEmpty(gvOverlay)){
				return;
				
			}
			
			gvOverlay.hide();
			gvOverlay = null;
			
			clearTimer();
	    }
	});
}




function callServiceForm(svcId, requestUrl, paramData, callback){
	clearTimer();
	
	var url = gvSERVER + gvCONTEXT + "/" + requestUrl;
	var strMsg = '';
	var callback_func = eval(callback);
	
//	loading 추가	20170602
	var pattern1 = /get|select/;
	var pattern2 = /save|insert|update|delete/;
	var strMsg = 'Loading....';
	if(pattern2.test(requestUrl)){
		strMsg = 'Processing...';
	}

	if(requestUrl.indexOf("research") >= 0  || requestUrl.indexOf("common/modal") >= 0){
		var spinner = new Spinner(gvOpts).spin(gvTarget);
		 
		if(isNullOrEmpty(gvOverlay) || gvOverlay == null){
			gvOverlay = iosOverlay({
				text: strMsg,
				spinner: spinner
			});
		}
	}
	
	
//	-----------------------------------------------------
	
	$.ajax({ 
		type: 'POST',
		url: url,
		contentType: false,
		processData: false,
		data: paramData, 
		beforeSend : function(xhr){
			xhr.setRequestHeader("isAjax", "true");
			xhr.setRequestHeader("PER_CODE", $.session.get("PER_CODE"));
			
		},
		success : function(data){
		//	-----------------------------------------------------
			if(!isNullOrEmpty(gvOverlay) && gvOverlay != null){
				window.setTimeout(function() {
					gvOverlay.update({
						icon: "../../js/plugins/ios-overlay-loading/img/check.png",
						text: "Success"
					});
				}, 0);
				
				window.setTimeout(function() {
					gvOverlay.hide();
					gvOverlay = null;
					
				}, 0);
				
				
			}
			
		//	-----------------------------------------------------	
			callback_func(svcId, data);
		},
		error:function(request,status,error){
//			-----------------------------------------------------
			window.setTimeout(function() {
				gvOverlay.update({
					icon: "../../js/plugins/ios-overlay-loading/img/cross.png",
					text: "Error"
				});
			}, 0);
			
			window.setTimeout(function() {
				gvOverlay.hide();
				gvOverlay = null;
			}, 0);
			
		//	-----------------------------------------------------	
			
			strMsg = '';
			strMsg += '오류가 발생했습니다.';
			strMsg += '<br>';
			strMsg += '오류내용 : ';
			strMsg += '<br>';
			strMsg += request.responseText;
			
			BootstrapDialog.show({
				type:'DANGER',
	            title: '<span style="text-weight:bold;color:black;">서버오류</span>',
	            message: '<div style="height:400px;overflow-y:scroll;"><p>' + strMsg + '</p></div>',
	            buttons: [{
	                label: '닫기',
	                action: function(dialog) {
	                	dialog.close();
	                }
	            }]
	        });
	    }
	});
}




function printJSON(data)
{
	console.log(JSON.stringify(data));
}

function alertJSON(data)
{
	alert(JSON.stringify(data));
	
}


//datatables 공통함수
var callServiceDataTables = function(id, tableOption, tableColumns, tableColumnDef, ajaxURL){
	clearTimer();
	
	tableOption.data = [];
	tableOption.pageLength = 10;
	tableOption.pagingType = "full_numbers";
	tableOption.deferLoading = 57;
	tableOption.lengthMenu = [10,20,30,40,50,60];
	tableOption.language = { 
       "loadingRecords": "&nbsp;",
       "processing": "Loading...."
    };
	tableOption.ajax = {
		url:gvSERVER + gvCONTEXT + ajaxURL,
		type:"POST",
		data:function(data){
			if($('#searchKey').val() != '' && $('#searchKey').val() != undefined){
				data.SEARCH_KEY=$('#searchKey').val();
			}
			if($('#searchVal').val() != '' && $('#searchVal').val() != undefined){
				data.SEARCH_VAL=$('#searchVal').val();
			}
			
			if($('#dateVal').text() != '' && $('#dateVal').text() != undefined){	//로그관리용 param
				//console.log($("input:checkbox[name=dateType]").prop("checked"));
				console.log(myType);
				if(myType == false){
					var dateVal = $('#dateVal').text();
					var dateValSplit = dateVal.split('~');
					data.SEARCH_START_DATE = dateValSplit[0]+" 00:00:00";
					data.SEARCH_END_DATE = dateValSplit[1]+" 23:59:59";
				}
			}
			if($('#iCheckVal').val() != '' && $('#iCheckVal').val() != undefined){	//웹로그관리 radio용
				data.SEARCH_VAL = $('#iCheckVal').val();				
			}
			
			if($('#iCheckValSiteCd').val() != '' && $('#iCheckValSiteCd').val() != undefined){	//웹로그관리 radio용
				data.SITE_CD = $('#iCheckValSiteCd').val();				
			}
			
			if($('#boardSeq').val() != '' && $('#boardSeq').val() != undefined){	//대쉬보드 게시판용
				data.BOARD_SEQ = $('#boardSeq').val();
			}
			
			
		//	사용자데이터 관리
			
			if(!isNull($('#vStartDate').val()) && !isNull($('#vEndDate').val())){
				data.SEARCH_START_DATE = $('#vStartDate').val();
				data.SEARCH_END_DATE = $('#vEndDate').val();
			}
			
			if(!isNull($('#QUERY').text()) && !isNull($('.ui-tabs-active>a>span').text())){
				data.QUERY = $('#QUERY').text();
				data.gene = $('.ui-tabs-active>a>span').text();
			}
			
			console.log(data);
			
			return JSON.stringify(data);
		},
		dataType:'json',
		headers: { 
			'Accept': 'application/json',
		    'Content-Type': 'application/json' 
		},beforeSend : function(xhr){
			xhr.setRequestHeader("isAjax", "true");
			xhr.setRequestHeader("PER_CODE", $.session.get("PER_CODE"));
			
		}
	};
	tableOption.columnDefs = tableColumnDef;
	tableOption.columns = tableColumns;
	
	var drawTable = $('#'+id).DataTable(
			tableOption
		).draw();
	
	drawTable.on('page.dt', function (e,settings) {
		var info = drawTable.page.info();
	    var page = info.page+1;
	    //alert('changed - page '+page+' out of '+info.pages+' is clicked');
		
	});
};

//datatables 공통함수
var callServiceDataTablesWithJson = function(id, tableOption, tableColumns, tableColumnDef, ajaxURL, jsonData){
	clearTimer();
	
	tableOption.data = [];
	tableOption.pagingType = "full_numbers";
	tableOption.deferLoading = 57;
	tableOption.language = { 
       "loadingRecords": "&nbsp;",
       "processing": "Loading...."
    };
	tableOption.ajax = {
		url:gvSERVER + gvCONTEXT + ajaxURL,
		type:"POST",
		async:false,
		data:function(data){		
			var dataVal = $.extend(true, jsonData, data);
			console.log(dataVal);
			console.log(gvSERVER + gvCONTEXT + ajaxURL);

			return JSON.stringify(dataVal);
		},
		dataType:'json',
		headers: { 
			'Accept': 'application/json',
		    'Content-Type': 'application/json' 
		}
	};
	tableOption.columnDefs = tableColumnDef;
	tableOption.columns = tableColumns;
	
	var drawTable = $('#'+id).DataTable(
			tableOption
		).draw();
	
	drawTable.on('page.dt', function (e,settings) {
		var info = drawTable.page.info();
	    var page = info.page+1;
	    
	});
};


function httpChart(requestUrl, method, sync, params){
	var url = gvSERVER + gvCONTEXT + "/" + requestUrl;
	var strMsg = '';
	
//	loading 추가	20170602
	var pattern1 = /get|select/;
	var pattern2 = /save|insert|update|delete/;
	var strMsg = 'Loading....';
	
	if( pattern2.test(requestUrl)){
		strMsg = 'Processing...';
	}
	
	var spinner = new Spinner(gvOpts).spin(gvTarget);
	
	if(isNullOrEmpty(gvOverlay) || gvOverlay == null){
		gvOverlay = iosOverlay({
			text: strMsg,
			spinner: spinner
		});
	}
	
	
	var promise = $.ajax({
		type: method,
		url: url,
		async:sync,
		dataType: 'json',
		contentType: "application/json", 
		data: JSON.stringify(params), 
		beforeSend : function(xhr){
			xhr.setRequestHeader("isAjax", "true");
			xhr.setRequestHeader("PER_CODE", $.session.get("PER_CODE"));
			
		}
	});
	
	promise.then(function(response){
		if(!isNull(gvOverlay) && !isNullOrEmpty(gvOverlay)){
			gvOverlay.hide();
			gvOverlay = null;
		}
	});
	
	promise.fail(function(result){
		console.log(result);
		
		window.setTimeout(function() {
			if(!isNull(gvOverlay) && !isNullOrEmpty(gvOverlay)){
				gvOverlay.hide();
				gvOverlay = null;
			}
		}, 0);
	});
	
	return promise;
}


/*function callServicePromise(requestUrl, bsync, paramData){*/
function http(requestUrl, method, sync, params){
	var url = gvSERVER + gvCONTEXT + "/" + requestUrl;
	var strMsg = '';
	
//	loading 추가	20170602
	var pattern1 = /get|select/;
	var pattern2 = /save|insert|update|delete/;
	var strMsg = 'Loading....';
	
	if( pattern2.test(requestUrl)){
		strMsg = 'Processing...';
	}
	
	var spinner = new Spinner(gvOpts).spin(gvTarget);
	
	if(isNullOrEmpty(gvOverlay) || gvOverlay == null){
		gvOverlay = iosOverlay({
			text: strMsg,
			spinner: spinner
		});
	}
	
	
	var promise = $.ajax({
		type: method,
		url: url,
		async:sync,
		dataType: 'json',
		contentType: "application/json", 
		data: JSON.stringify(params), 
		beforeSend : function(xhr){
			xhr.setRequestHeader("isAjax", "true");
			xhr.setRequestHeader("PER_CODE", $.session.get("PER_CODE"));
			
		}
	});
	
	promise.then(function(response){
		if(!isNull(gvOverlay) && !isNullOrEmpty(gvOverlay)){
			gvOverlay.hide();
			gvOverlay = null;
		}
	});
	
	promise.fail(function(result){
		window.setTimeout(function() {
			if(!isNull(gvOverlay) && !isNullOrEmpty(gvOverlay)){
				gvOverlay.update({
					icon: "/pmp/js/plugins/ios-overlay-loading/img/cross.png",
					text: "Error"
				});
			}
		}, 0);
		
		window.setTimeout(function() {
			if(!isNull(gvOverlay) && !isNullOrEmpty(gvOverlay)){
				gvOverlay.hide();
				gvOverlay = null;
			}
		}, 0);
		
		
		strMsg = '';
		strMsg += '오류내용 : ';
		strMsg += '<br>';
		strMsg += result.responseText;
		
		showAlertError(null, strMsg, function(){
			return;
		});
	});
	
	return promise;
}

function httpOut(requestUrl, method, sync, params){
	var url = requestUrl;
	var strMsg = '';
	
//	loading 추가	20170602
	var pattern1 = /get|select/;
	var pattern2 = /save|insert|update|delete/;
	var strMsg = 'Loading....';
	
	if( pattern2.test(requestUrl)){
		strMsg = 'Processing...';
	}
	
	var spinner = new Spinner(gvOpts).spin(gvTarget);
	
	if(isNullOrEmpty(gvOverlay) || gvOverlay == null){
		gvOverlay = iosOverlay({
			text: strMsg,
			spinner: spinner
		});
	}
	
	
	var promise = $.ajax({
		type: method,
		url: url,
		async:sync,
		//crossOrigin : true,
		dataType: 'json',
		contentType: "application/json", 
		data: JSON.stringify(params), 
		//crossOrigin : true,
		beforeSend : function(xhr){
			xhr.setRequestHeader("isAjax", "true");
			xhr.setRequestHeader("PER_CODE", $.session.get("PER_CODE"));
			
		}
	});
	
	promise.then(function(response){
		if(!isNull(gvOverlay) && !isNullOrEmpty(gvOverlay)){
			gvOverlay.hide();
			gvOverlay = null;
		}
	});
	
	promise.fail(function(result){
		window.setTimeout(function() {
			gvOverlay.update({
				icon: "/pmp/js/plugins/ios-overlay-loading/img/cross.png",
				text: "Error"
			});
		}, 0);
		
		window.setTimeout(function() {
			gvOverlay.hide();
			gvOverlay = null;
		}, 0);
		
		
		strMsg = '';
		strMsg += '오류내용 : ';
		strMsg += '<br>';
		strMsg += result.responseText;
		
		showAlertError(null, strMsg, function(){
			return;
		});
	});
	
	return promise;
}


