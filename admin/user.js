/**
 * 사용자관리
 * @Page : user.jsp
 */

var gvPageNo = 1;
var gvPageSize = 20;
var gvRecordsTotal = 0;

var gvResult = {
		"dsUserList": []
	};

var gvUserList = [];



/**
 * Application Ready
 */
$(document).ready(function(){
	setGrid();
	
	initEvent();
	
	//getData();
	

	//메뉴고정
	menuFix('admin_user_main');
	
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
	switch(svcId){
		case "changePassword":
			alert("비밀번호가 변경되었습니다.");
			$('#btnPasswordClose').trigger('click');
			getData();
			break;
			
		case "getData":
			//printJSON(result);
			/*if(typeof result.dsUserList === 'undefined'){
				return;
			}
			*/
			/*if(result.dsUserList.length < 1){
				$('#gridUserList').dataTable().fnClearTable();
				return;
			}*/
			/*gvRecordsTotal = result.recordsTotal;
			gvUserList = result.data;
			
			printJSON(result);
			
			setGrid();*/
			
			break;
			
		case "initPassword":
			showAlert(null,'비밀번호가 초기화 되었습니다.',null)
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
	/*var dataSet = {
			SEARCH_KEY:$('#searchKey').val(),
			SEARCH_VAL:$('#searchVal').val(),
			PAGE_NO:gvPageNo,
			PAGE_PER_COUNT:gvPageSize
	};
	//alertJSON(dataSet);
	
	callService("getData", "admin/user/userList", dataSet, "serviceCallback");*/
	var table = $('#gridUserList').DataTable();
	table.draw();
}


/**
 * 비밀번호 변경
 * @returns
 */
function changePassword2()
{
	var dataSet = {};
	
	dataSet.PER_CODE=$(".modal-dialog #txtPerCode").val();
	dataSet.PER_PASS=$(".modal-dialog #txtChangePerPass").val();
	dataSet.UDT_ID=$.session.get('PER_CODE');
	
	if(gvINSTCD_YN === 'Y'){
		dataSet.ADMIN_YN = 'Y';
		dataSet.INSTCD=$(".modal-dialog #txtInstcd").val();
	}
	
	
	console.log(dataSet)
	
	callService("changePassword", "admin/user/changePassword", dataSet, "serviceCallback");
}


//------------------------------------------------------------------------------------------
//USER FUNCTION	
//------------------------------------------------------------------------------------------

function setGrid()
{
	
	var tableOption = {
			searching:false,
			ordering:false,
			paging:true,
			bPaginate:true,
			processing: true,
			serverSide: true
	};
	

	var tableColumns = [];
	var tableColumnDef = [];
	
	if(gvINSTCD_YN === 'Y'){
		tableColumns = [
			{ data:"NUM"			},
			{ data:"INSTCD"	,
				defaultContent: ""	,
				render:function(data,type,row,meta){
					var html = '';
					
					if(row.INSTCD === '031'){
						html = '삼덕';
					}else if(row.INSTCD === '032'){
						html = '칠곡';
					}
					
					
					return html;
				}	
			},
			{ data:"PER_CODE"			},
			{ data:"PER_NAME" 		},
			{ data:"DEPT_NAME",defaultContent: ""},
			{ data:"LOCT_NAME",defaultContent: ""},
			{ data:"PER_PASS",
				orderable:false,
				render:function(data,type,row,meta){
					var html = '';
					
					html = '<button type="button" ';
					html += ' id="btnChangePassword_"' + row + "'";
					html += ' class="btn btn-success btn-sm btnChangePassword"';
					html += ' data-toggle="modal"';
					html += ' data-target="#passwordModal" ';
					html += ' style="text-align:center;"> ';
					html += '<i class="ion ion-key"></i>';
					html += '</button> ';
					
					return html;
				}
			}
		];
		
		
		tableColumnDef = [
  		    { 
		    	className: "dt-body-center", 
		    	targets: [ 0,1,2,4,6 ] 
		    },
		    { width: 80, targets: [0,5] },
		    { width: 150, targets: [1,2,4] },
		    { width: 80, targets: [6] }
		]
	}else{
		tableColumns = [
			{ data:"NUM"			},
			{ data:"PER_CODE"			},
			{ data:"PER_NAME" 		},
			{ data:"DEPT_NAME",defaultContent: ""},
			{ data:"LOCT_NAME",defaultContent: ""}
			/*비밀번호 번경
			 * ,
			{ data:"PER_PASS",
				orderable:false,
				render:function(data,type,row,meta){
					var html = '';
					
					html = '<button type="button" ';
					html += ' id="btnChangePassword_"' + row + "'";
					html += ' class="btn btn-success btn-sm btnChangePassword"';
					html += ' data-toggle="modal"';
					html += ' data-target="#passwordModal" ';
					html += ' style="text-align:center;"> ';
					html += '<i class="ion ion-key"></i>';
					html += '</button> ';
					
					return html;
				}
			}*/
		];
		
		tableColumnDef = [
  		    { 
		    	className: "dt-body-center", 
		    	targets: [ 0,1,2,4 ] 
		    },
		    { width: 80, targets: [0] },
		    { width: 150, targets: [1,2,4] }
		]
	}
	
	
	
	
	
	
	callServiceDataTables('gridUserList', tableOption, tableColumns, tableColumnDef, '/admin/user/userList');
	
}


//------------------------------------------------------------------------------------------
//	EVENT	
//------------------------------------------------------------------------------------------
/**
 * 이벤트 초기화
 * @returns
 */
function initEvent(){
	var table = $('#gridUserList').DataTable();
	
	$('#btnSearch').on('click',function(e){
		/*if(isNullOrEmpty($('#searchVal').val())){
			alert('검색어를 입력하세요.');
			return;
			
		}*/
		
		table.search('').draw();
		
		
		
	});
	
	$('#searchVal').on('keypress',function(e){
		if(e.keyCode === 13){
			/*if(isNullOrEmpty($('#searchVal').val())){
				alert('검색어를 입력하세요.');
				return;
				
			}*/
			
			table.search('').draw();
			
		}
	});
	
	
	/*
	$('#example_paginate').click(function () {
	      $('.tag').tooltip();
	      var info = oTable.page.info();
	      console.log('Showing page: ' + info.page + ' of ' + info.pages);
	  });*/
	
	/**/
	
	
	$('#gridUserList tbody').on( 'click','tr',function() {
		if ($(this).hasClass('selected') ) {
			$(this).removeClass('selected');
		}
		else {
			table.$('tr.selected').removeClass('selected');
			$(this).addClass('selected');
		}
	});
	
	$('#gridUserList tbody').on( 'click','td',function() {
		var cell = table.cell(this);
		var cellInfo = cell[0];
		var columnIdx = "";
		var rowIdx = "";
		var data = {};
		
		
		columnIdx = cellInfo[0].column;
		rowIdx = cellInfo[0].row;
		
		var rows = table.rows(rowIdx).data();
		
		data = rows[0];
		
		
		if(columnIdx != 5 && columnIdx != 6){
			return;
		}
		
		
		$(".modal-dialog #passwordModalId").val(data.PER_CODE);
		$(".modal-dialog #txtPerCode").val( data.PER_CODE );
		$(".modal-dialog #txtInstcd").val( nvl(data.INSTCD,'') );
		$(".modal-dialog #txtChangePerPass").val('');		
	});
	
	
	$('#btnChangePassword').on('click',function(e){
		
//		Confirm	
		if(!confirm("비밀번호를 변경하시겠습니까?")){
			return;
			
		}
		
		changePassword2();
		
		
	});
	
	
	/**
	 * 비밀번호 전체 초기화
	 */
	$('#btnInitPassword').on('click',function(e){
		var dataSet = {};
		
		dataSet.UDT_ID=$.session.get('PER_CODE');
		
		callService("initPassword", "admin/user/initPassword", dataSet, "serviceCallback");
		
	});
	
	
	
	
}
