/**
 * 사용자데이터 관리
 * @Page : userDataMgmt.jsp
 */

var gvTotalCnt = 0;
var gvCurrIdx = 1;

var dataSet = {};

/**
 * Application Ready
 */
$(document).ready(function(){
	
	initEvent();
	
	setGridMain();
	
	setGridDetail();
	
});


//------------------------------------------------------------------------------------------
// CALLBACK	
//------------------------------------------------------------------------------------------
/**
 * callback 함수
 * @param svcId
 * @param result
 * @returns
 */
function serviceCallback(svcId, result){
	if(result.ERR_CD != '0'){
		return;
	}
	
	
	switch(svcId){		
		case "gridUserDataDetail":
			var table = $('#gridUserDataDetail').DataTable();
			table.rows().remove().draw();
			table.rows.add(result.data).draw();

			print_bigcenmed(result);

			$('#totalSize').html(numberWithCommas(result.data[0].TOTAL_TABLE_SIZE) + '&nbsp;MB');
			
			var dlg = $('#modalMyData').modal({
				handle: ".modal-header",
		        backdrop:'static'
			});
			
			dlg.modal('show');
			
			break;
			
		case "removeUserDataList":
			gvCurrIdx++;
			
			if(gvCurrIdx <= gvTotalCnt){
				removeUserData(gvCurrIdx);	
			}
			
			
			console.log(gvTotalCnt + "===>" + gvCurrIdx)
			
		//	완료	
			if(gvCurrIdx > gvTotalCnt){
				showAlert(null,'사용자 데이터가' + COM_0003,function(e){
					$('#select-all').iCheck('uncheck');
					$('#modalDataDel').modal('hide');
					gvCurrIdx = 0;
					gvTotalCnt = 0;
					percentage=0;
					
					$("#progress-bar").css("width", percentage + "%");
					$("#progress-bar").attr("aria-valuenow", percentage + "%");
					
					getData();
				});
				
				
				return;
			}
			
			break;
			
		default:
			break;
	
	}
}



//------------------------------------------------------------------------------------------
//	TRANSACTION	
//------------------------------------------------------------------------------------------
/**
 * 
 * @returns
 */
function getData(){
	var start = '';
	var end = '';
	
	start = $('#vStartDate').val();
	end = $('#vEndDate').val();
	
	if(!validateStartEndDate(start,end)){
		showAlert(null,COM_0044,null);
		return;
	}
	
	
	var table = $('#gridUserDataList').DataTable();
	table.search('').draw();
}


/**
 * 
 * @param idx
 * @returns
 */
function removeUserData(idx){
	var dataSet = {};
	var dsList = [];
	
	var table = $('#gridUserDataList').DataTable();
	
	table.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
		var data = this.data();
		var node = this.node();
		
		$(node).find("td input").each(function (){
			if(this.name.indexOf('chkDATA_SEQ') >= 0){
				if($(this).prop('checked')){
					dsList.push(data);
				}
			}
			
		});
		
	});
	
	gvTotalCnt = dsList.length; 		//$('input[name="chkDATA_SEQ"]:checked').length;
	
	if( idx == 1){
		showProgress('modalDataDel', 'Y', 'progress-bar', gvTotalCnt, idx);
	}else{
		showProgress('modalDataDel', 'N', 'progress-bar', gvTotalCnt, idx);
	}
	
	dataSet = dsList[idx-1];
	dataSet.totalCnt = gvTotalCnt;
	dataSet.currIdx = gvCurrIdx;
	
	callService("removeUserDataList", 
			"admin/userDataMgmt/removeUserDataList", 
			dataSet, 
			"serviceCallback");
	
}


function showProgress(dlgId, showYn, progressbarId, totalCnt, currIdx){
	var percentage = 0.0;
	
	percentage = (currIdx / totalCnt) * 100;
	percentage = percentage.toFixed(0);
	
	
	$("#" + progressbarId).css("width", percentage + "%");
	$("#" + progressbarId).attr("aria-valuenow", percentage + "%");
	
	$("#" + progressbarId).html(percentage + "%&nbsp;" + "Complete");
	
	$('#delCount').html(currIdx + '&nbsp;/&nbsp;' + totalCnt);
	
	if(showYn == 'Y'){
		var dlg = $('#' + dlgId).modal({
			handle: ".modal-header",
	        backdrop:'static'
		});
	}
	
}

/**
 * 
 * @returns
 */
function getUserTableSize(tableId){
	var url = gvSERVER + gvCONTEXT + "/admin/userDataMgmt/getUserDataTableSize";
	var table = $('#' + tableId).DataTable();
	var dsList = [];
	
	var totSize = 0;
	
	table.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
		var data = this.data();
		var node = this.node();
		var cell = null;
		
		cell = node.cells[3];
		
		/*if(tableId === 'gridUserDataList'){
			cell = node.cells[6];
		}else{
			cell = node.cells[3];
		}*/
		
		var dataSet = {};
		dataSet.TABLE_ID = data.TABLE_ID;
		dsList.push(dataSet);
		console.log(dataSet);
		
		$.ajax({
			type: 'POST',	
			url: url,
			dataType: 'json',
			contentType: "application/json", 
			data: JSON.stringify(dataSet), 
			async: true,
			beforeSend : function(xhr){
				xhr.setRequestHeader("isAjax", "true");
				xhr.setRequestHeader("PER_CODE", $.session.get("PER_CODE"));
				
			},
			success : function(result,status, xhr){
				console.log(result);
				if(result.ERR_CD == 0){
					if(!isNull(result.TABLE_SIZE)){
						$(cell).html(number_to_human_size(result.TABLE_SIZE[0].USED_COMPRESSED_MB));
						totSize += result.TABLE_SIZE[0].USED_COMPRESSED_MB;
						
						if(tableId === 'gridUserDataDetail'){
							$('#totalSize').html(number_to_human_size(totSize));
							
						}
					}else{
						$(cell).html('N/A');
					}
				}
				
			},
			error:function(request,status,error){
				console.log(status);
		    }
		});
	});
}

function getUserTableSizeForBtn(thisVal, tableid){
	console.log(thisVal);
	
	var url = gvSERVER + gvCONTEXT + "/admin/userDataMgmt/getUserDataTableSize";
	var thisSize = 0;
	
	var dataSet = {};
	dataSet.TABLE_ID = tableid;
	
	$.ajax({
		type: 'POST',	
		url: url,
		dataType: 'json',
		contentType: "application/json", 
		data: JSON.stringify(dataSet), 
		async: false,
		beforeSend : function(xhr){
			xhr.setRequestHeader("isAjax", "true");
			xhr.setRequestHeader("PER_CODE", $.session.get("PER_CODE"));
			
		},
		success : function(result,status, xhr){
			console.log(result);
			if(result.ERR_CD == 0){
				if(!isNull(result.TABLE_SIZE)){
					//$(thisVal).html(number_to_human_size(result.TABLE_SIZE[0].USED_COMPRESSED_MB));
					thisSize = number_to_human_size(result.TABLE_SIZE[0].USED_COMPRESSED_MB);
				}else{
					//$(thisVal).html('N/A');
					thisSize = 'N/A';
				}
				
				$(thisVal).parent().html(thisSize);
			}
			
		},
		error:function(request,status,error){
			console.log(status);
	    }
	});
}




//------------------------------------------------------------------------------------------
//USER FUNCTION	
//------------------------------------------------------------------------------------------
function setGridMain()
{
	var tableOption = {
			searching:false,
			ordering:false,
			paging:true,
			bPaginate:true,
			processing: true,
			serverSide: true,
			drawCallback: function( settings ) {
				makeiCheck('.chkData');
				//getUserTableSize('gridUserDataList');
		    },
		    rowCallback: function ( row, data ) {
		    	//console.log(row);

		    	
		    	//alert(row);
		    	
	        }
	};
	
	var tableColumns = [];
	var tableColumnDef = [];
	
	
	tableColumns = [
		{ 
			data:"CONT_SEQ",
			orderable:false,
			render:function(data,type,row,meta){
				var html = '';
				
				html = '<input type="checkbox" class="chkData" name="chkDATA_SEQ" id="" value="'+row.DATA_SEQ+'">';
				
				return html;
			}
		},
		{ 
			data:"METH_NM",
			orderable:false
		},
		{ 
			data:"PER_NAME",
			orderable:false,
			render:function(data,type,row,meta){
				var html = '';
				
				html = '<div class="btnViewMyData pointer font-color-primary" mySize="'+row.TABLE_SIZE+'" myName="'+row.PER_NAME+'">';
				html += row.PER_NAME;
				html += '</div>';
				
				return html;
			}
		},
		{ 
			data:"CONDT_NM", 
			orderable:false
		},
		{ 
			data:"DATA_NM",
			orderable:false
		},
		{ 
			data:"TABLE_CNT",
			orderable:false,
			render:function(data,type,row,meta){
				var html = '';
				html = numberWithCommas(row.TABLE_CNT);
				return html;
			}
		},
		{ 
			data:"TABLE_SIZE",
			orderable:false,
			render:function(data,type,row,meta){
				var html = '';
				console.log(row);
				
				html = '<button class="btn btn-info btn-xs btnSize" tableid="'+row.TABLE_ID+'">용량확인</button>';
				
				return html;
			}
		},
		{ 
			data:"MON_DIFF",
			orderable:true,
			render:function(data,type,row,meta){
				var html = '';
				var badge_color = 'bg-blue';
				
				if(row.MON_DIFF >= 3){
					badge_color = 'bg-red';
					
				}else{
					badge_color = 'bg-blue';
					
				}
				
				html = '<span class="badge '+badge_color+'">'+row.MON_DIFF+'&nbsp;개월</span>';
				
				return html;
			}
		},
		{ 
			data:"UDT_DT",
			"type": "date",
			"dateFormat": "yy-mm-dd",
			orderable:false
		}
	];
	
	
	tableColumnDef = [
	    {	width:50,targets:[0],className:"dt-body-center"	},
	    {	width:130,targets:[1,2],className:"dt-body-center"	},
	    {	width:100,targets:[5],className:"dt-body-right" },
	    {	width:100,targets:[6],className:"dt-body-center" },
	    {	width:80,targets:[7],className:"dt-body-center"	},
	    {	width:180,targets:[8],className:"dt-body-center"	}
	    
	];

	callServiceDataTables( 'gridUserDataList',
							tableOption, 
							tableColumns, 
							tableColumnDef, 
							'/admin/userDataMgmt/getUserDataList');

	
}



function setGridDetail()
{
	var table = $('#gridUserDataDetail').DataTable({
		searching:false,
		paging:false,
		pagingType: "full_numbers",
		deferLoading: 57,
		info:false,
		processing: false,
		thema:'bootstrap',
		ordering: false,
		fixedHeader: true,
		paging: false,
	    autowidth:false,
		language:{ 
	       "loadingRecords": "&nbsp;",
	       "processing": "Loading..."
	    },
	    drawCallback: function( settings ) {
	    	getUserTableSize('gridUserDataDetail');
	    },
	    data: null,
		columns: [
			{ 
				data:"NUM",
				defaultContent: "",
				"ordering": false,
				render:function(data,type,row,meta){
					var html = '';
					
					html = (meta.row + 1);
					
					return html;
				}
			},{ 
				data:"DATA_NM",
				defaultContent: ""
			},{ 	
				data:"TABLE_CNT",
				defaultContent: "",
				orderable:false,
				render:function(data,type,row,meta){
					var html = '';
					
					if(row.TABLE_CNT === '-'){
						html = row.TABLE_CNT;
					}else{
						html = numberWithCommas(row.TABLE_CNT);
					}
					
					return html;
				}
			},{ 	
				data:"TABLE_SIZE",
				defaultContent: "",
				orderable:false,
				render:function(data,type,row,meta){
					var html = '';
					
					html = '<div style="text-align:center;">';
					html += '<img src="../../images/ajax-loader.gif">';
					html += '</div>';
					
					return html;
					
				}
			}
		],
		"columnDefs": [
			{	width:50,targets:[0],className:"dt-body-center"	},
			{	width:500,targets:[1]	},
			{	width:80,targets:[2],className:"dt-body-right"	},
			{	width:80,targets:[3],className:"dt-body-right"	}
		]
	});

	
}


//------------------------------------------------------------------------------------------
//	EVENT	
//------------------------------------------------------------------------------------------
/**
 * 이벤트 초기화
 * @returns
 */
function initEvent(){
	//날짜inpur mask
	$('.maskDateInput').on('focus',function(){
		$(this).mask('0000-00-00');
		$(this).select();
	});
	
	//날짜
	getDateForMonth('vStartDate',12,'month');
	getDateForMonth('vEndDate',0,'month');
	
	//체크박스 세팅
	makeiCheck('.chkData, .chkDataAll');
	
	//체크박스 전체체크
	$('#select-all').on('ifChecked', function(){
		$('.chkData').each(function(){
			$(this).iCheck('check');
		});
	});
	
	//체크박스 전체해제
	$('#select-all').on('ifUnchecked', function(){
		$('.chkData').each(function(){
			$(this).iCheck('uncheck');
		});
	});
	
	//초기화
	$('#btnReset').on('click', function(){
		getDateForMonth('vStartDate',12,'month');
		getDateForMonth('vEndDate',0,'month');
		
		$('#searchVal').val('');
		$('#searchKey').val('0');
	});
	
	
	//조회
	$('#searchVal').on('keypress', function(e){
		if(e.keyCode == 13){
			getData();
		}
		
	});
	
	//조회
	$('#btnSearch').on('click',function(e){
		getData();
		
	});
	
	
	//데이터삭제
	$('#btnDataDelete').on('click', function(){
		var chkCnt = $('input[name="chkDATA_SEQ"]:checked').length;
		
		if(chkCnt < 1){
			showAlert(null,COM_0015,null);
			return;
		}
		
		showConfirm(null,COM_0005,function(e){
			if(e){
				removeUserData(1);
			}
		});
	});
	
	
	
}

$(document).on('click','#gridUserDataList tbody td',function(e){
	var dataSet = {};
	
	var table 	= $('#gridUserDataList').DataTable();
	
	var cells 	= table.cell(this);
	var nodes 	= table.row($(this).parents('tr')).node();
	var rows 	= table.row($(this).parents('tr'));
	
	var cellIdx	= cells[0][0].column;
	var currRow	= cells[0][0].row;
	
	if(cellIdx != 2){
		return;
	}
	
	var data = table.row(nodes).data();
	
	dataSet.SEARCH_PER_CODE = data.PER_CODE;
	
	callService("gridUserDataDetail"
				,"admin/userDataMgmt/getUserDataList"
				,dataSet
				,"serviceCallback");
	
});

//용량확인 이벤트
$(document).on('click', '.btnSize', function(){

	$(this).html('<i class="fa fa-repeat fa-spin" aria-hidden="true"></i>');
	$(this).prop('disabled', true);
	
	var tableid = $(this).attr('tableid');
	
	getUserTableSizeForBtn(this, tableid);
});





