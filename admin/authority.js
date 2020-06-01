/**
 * 권한관리
 * @Page : authority.jsp
 */


var gvCommand = 'C';

var gvAutinxList 	= [];
var gvPerAuthList 	= [];
var gvPerinxList 	= [];

var gvDataSourceAutinx;
var gvDataSourcePerAuth;
var gvDataSourcePerinx;

var gvDataAdapterAutinx;
var gvDataAdapterPerAuth;
var gvDataAdapterPerinx;


var gvAddedPerAuth;
var gvDeletedPerAuth;


//------------------------------------------------------------------------------------------
// PAGE INIT	
//------------------------------------------------------------------------------------------
$(document).ready(function(){
	init();
	
	setGrid();	
	
	initEvent();
	
	getData();
	
	//메뉴고정
	menuFix('admin_auth_main');
	
	
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
		case "getData":
			gvDataSourceAutinx.localdata = result.dsAutinxList;
			gvDataSourcePerinx.localdata = result.dsPerinxList;
			
			$("#jqxAuthList").jqxGrid('clear');			
			$("#jqxAuthList").jqxGrid('updatebounddata', 'cells');
			
			$("#jqxUserList").jqxGrid('clear');			
			$("#jqxUserList").jqxGrid('updatebounddata', 'cells');
			
			
			$('#jqxAuthList').jqxGrid('selectrow', 0);
			
			
			break;
			
		case "getPerAuthData":
			gvDataSourcePerAuth.localdata = result.dsPerAuthList;

			$("#jqxAuthUserList").jqxGrid('clear');			
			$("#jqxAuthUserList").jqxGrid('updatebounddata', 'cells');
			
			break;
			
		case "createData":
			showAlert('권한저장',COM_0001,function(e){
				$('#btnClose').trigger('click');
			});
			
			getData();
	        			
			break;
			
		case "updateData":
			showAlert('권한저장',COM_0002,function(e){
				$('#btnClose').trigger('click');
			});
			
			getData();
	        			
			break;
			
		case "deleteAutinx":
			showAlert('권한저장',COM_0003,function(e){
				$('#btnClose').trigger('click');
				getData();
			});
			
			
			
			break;
			
		case "savePerAuth":
			showAlert('권한저장',COM_0001,function(e){
				$('#btnClose').trigger('click');
				getPerAuthData();
			});
			
			
			break;
			
		case "deletePerAuth":
			showAlert('권한저장',COM_0003,function(e){
				$('#btnClose').trigger('click');
				
				getPerAuthData();
				
			});
			
			break;
			
			
		default:
			break;
	}
	
}

//------------------------------------------------------------------------------------------
//	TRANSACTION	
//------------------------------------------------------------------------------------------
/**
 * 권한목록조회
 * @returns
 */
function getData(){
	var dataSet = {
			
	};
	
	callService("getData"
				,"admin/auth/selectAutinxList"
				,dataSet
				,"serviceCallback");
}

/**
 * 사용자별권한데이터 조회
 * @returns
 */
function getPerAuthData()
{
	var idx = $('#jqxAuthList').jqxGrid('getselectedrowindex');
	var dataAutinx = $('#jqxAuthList').jqxGrid('getrowdata', idx);
	
	var dataSet = {
		SEARCH_AUT_CODE:dataAutinx.AUT_CODE
	};
	
	callService("getPerAuthData"
				,"admin/auth/selectPerAuthList"
				,dataSet
				,"serviceCallback");
	
}


/**
 * 권한정보 저장
 * @returns
 */
function saveAutinx(){
	var dataSet = {};
	
	
//	신규저장	
	if(gvCommand === 'C'){
		dataSet = {
			AUT_CODE:$('#txtAUT_CODE').val(),
			AUT_NAME:$('#txtAUT_NAME').val(),
			CRT_ID:$.session.get('PER_CODE'),
			UDT_ID:$.session.get('PER_CODE')
		};
		
		callService("createData"
					,"admin/auth/insertAutinx"
					,dataSet
					,"serviceCallback");
		
//	수정		
	}else if(gvCommand === 'U'){
		dataSet = {
			AUT_CODE:$('#txtAUT_CODE').val(),
			AUT_NAME:$('#txtAUT_NAME').val(),
			UDT_ID:$.session.get('PER_CODE')
		};
		

		callService("updateData"
					,"admin/auth/updateAutinx"
					,dataSet
					,"serviceCallback");
		
	}else if(gvCommand === 'D'){
		var rowindex = $('#jqxAuthList').jqxGrid('getselectedrowindex');
		var data = $('#jqxAuthList').jqxGrid('getrowdata', rowindex);
		
		dataSet = {
				AUT_CODE:data.AUT_CODE
		};
		
		
		//return;
		
		callService("deleteAutinx"
					,"admin/auth/deleteAutinx"
					,dataSet
					,"serviceCallback");
	}
	
	
}



//------------------------------------------------------------------------------------------
//USER FUNCTION	
//------------------------------------------------------------------------------------------

function init()
{
	
}




/**
 * grid setting
 * @returns
 */
function setGrid()
{
//	---------------------------------------------------
//	권한목록	
	gvDataSourceAutinx = {
	    datatype: "json",
	    datafields: [
	    	{ name: 'AUT_CODE'},
	        { name: 'AUT_NAME'}
	    ],
	    cache: false,
	    localdata: gvAutinxList
	};
	
	
	gvDataAdapterAutinx = new $.jqx.dataAdapter(gvDataSourceAutinx, {
		loadError: function(xhr, status, error){
			alert(error);
		}
	});
	
	$("#jqxAuthList").jqxGrid({
	    source: gvDataAdapterAutinx,
	    theme: 'bootstrap',
	    width: '100%',
		height: '100%',
	    columns: [
	    	{ text: '권한코드', datafield: 'AUT_CODE', width: "40%"},
	        { text: '권한명', datafield: 'AUT_NAME', width: "60%"}
	    ]
	}); 
	
//	---------------------------------------------------
//	사용자 - 권한 매핑목록
	gvDataSourcePerAuth = {
	    datatype: "json",
	    datafields: [
	    	{ name: 'ROW_STATE'},
	    	{ name: 'AUT_CODE'},
	    	{ name: 'PER_CODE', type:'string'},
	        { name: 'PER_NAME'},
	        { name: 'INSTCD'}
	    ],
	    cache: false,
	    localdata: gvPerAuthList
	}
	
	gvDataAdapterPerAuth = new $.jqx.dataAdapter(gvDataSourcePerAuth, {
		loadError: function(xhr, status, error){
			alert(error);
		}
	});
	
	var dsColumnPerAuthList = [
		{ 	
			text: '병원구분', datafield: 'INSTCD', width: '20%', align: 'center', cellsalign: 'center',
			cellsrenderer:function (row, column, value) {
				var html = '';
				var text = '';
				
				if(value === '031'){
					text = '본원';
					
				}else if(value === '032'){
					text = '칠곡';
					
				}else{
					text = '';
				}
				html = '<div style="width:100%;text-align:center;margin:auto;margin-top:4px;">'+text+'</div>';
				
				return html;
			}	
		},
		{ text: 'ID', datafield: 'PER_CODE', width: "30%"},
	    { text: '사용자명', datafield: 'PER_NAME', width: "40%"}
	];
	
	if(gvINSTCD_YN === 'N'){
		dsColumnPerAuthList = [
			{ 	
				text: '병원구분', datafield: 'INSTCD', width: '20%', align: 'center', cellsalign: 'center',
				hidden: true
			},
			{ text: 'ID', datafield: 'PER_CODE', width: "30%"},
		    { text: '사용자명', datafield: 'PER_NAME', width: "40%"}
		];
		
	}
	
	
	$("#jqxAuthUserList").jqxGrid({
	    source: gvDataAdapterPerAuth,
	    theme: 'bootstrap',
	    width: '100%',
		height: '100%',
		sortable: true,
		showfilterrow: true,
		filterable: true,
	    columns: dsColumnPerAuthList
	}); 
	

	
//	----------------------------------------------------	
//	사용자목록	
	var dsColumnPerinxList = [
		{ 
			text: '병원구분', datafield: 'INSTCD', width: '20%', align: 'center', cellsalign: 'center',
			cellsrenderer:function (row, column, value) {
				var html = '';
				var text = '';
				
				if(value === '031'){
					text = '삼덕';
					
				}else if(value === '032'){
					text = '칠곡';
					
				}else{
					text = '';
				}
				html = '<div style="width:100%;text-align:center;margin:auto;margin-top:4px;">'+text+'</div>';
				
				return html;
			}	
		},
    	{ text: 'ID', datafield: 'PER_CODE', width: '15%', align: 'center', cellsalign: 'center' },
    	{ text: '사용자명', datafield: 'PER_NAME', width: '30%', align: 'center', cellsalign: 'center' },
    	{ text: '부서명', datafield: 'DEPT_NAME', width: '30%', align: 'center', cellsalign: 'center'},
    	{ text: '직책명', datafield: 'LOCT_NAME', width: '10%', align: 'center', cellsalign: 'center'}
    ];
	
	
	if(gvINSTCD_YN === 'N'){
		dsColumnPerinxList = [
			{ 
				text: '병원구분', datafield: 'INSTCD', width: '20%', align: 'center', cellsalign: 'center',
				hidden: true
			},
	    	{ text: 'ID', datafield: 'PER_CODE', width: '15%', align: 'center', cellsalign: 'center' },
	    	{ text: '사용자명', datafield: 'PER_NAME', width: '30%', align: 'center', cellsalign: 'center' },
	    	{ text: '부서명', datafield: 'DEPT_NAME', width: '30%', align: 'center', cellsalign: 'center'},
	    	{ text: '직책명', datafield: 'LOCT_NAME', width: '10%', align: 'center', cellsalign: 'center'}
	    ];
		
	}
	
	
	gvDataSourcePerinx = {
	    datatype: "json",
	    datafields: [
	    	{ name: 'PER_CODE', type: 'string'},
	        { name: 'PER_NAME'},
	        { name: 'DEPT_NAME'},
	        { name: 'LOCT_NAME'},
	        { name: 'INSTCD'}
	    ],
	    cache: false,
	    localdata: gvAutinxList
	};
	
	gvDataAdapterPerinx = new $.jqx.dataAdapter(gvDataSourcePerinx, {
		loadError: function(xhr, status, error){
			alert(error);
		}
	});
	
	$('#jqxUserList').jqxGrid({
		source: gvDataAdapterPerinx,
	    theme: 'bootstrap',
	    width: '100%',
		height: '100%',
		columnsresize: true,
		selectionmode: 'checkbox',
		sortable: true,
		showfilterrow: true,
		filterable: true,
		columns: dsColumnPerinxList
		
	});
}


function isPerAuthDuplicate(perCode)
{
	var ret = false;
	
	
	return ret;
	
}




//------------------------------------------------------------------------------------------
//	EVENT	
//------------------------------------------------------------------------------------------
/**
 * 이벤트 초기화
 * @returns
 */
function initEvent(){
	
//	권한추가	
	$('#btnAuthAdd').on('click',function(e){
		gvCommand = 'C';
		
		$('#exampleModalLabel').text('권한등록');
		
		$('#txtAUT_CODE').attr("disabled",false);
		$('#txtAUT_CODE').val("");
		$('#txtAUT_NAME').val("");
		$("#authorityModal").modal({
			
		});
		
		
	});
	
//	권한수정	
	$('#btnAuthUpd').on('click',function(e){
		gvCommand = 'U';
		
		$('#exampleModalLabel').text('권한수정');
		
		var rowindex = $('#jqxAuthList').jqxGrid('getselectedrowindex');
		var data = $('#jqxAuthList').jqxGrid('getrowdata', rowindex);
		
		$('#txtAUT_CODE').val(data.AUT_CODE);
		$('#txtAUT_NAME').val(data.AUT_NAME);
		
		$('#txtAUT_CODE').attr("disabled",true);

		
		$("#authorityModal").modal();
		
	});
	
//	권한삭제	
	$('#btnAuthDel').on('click',function(e){
		
		gvCommand = 'D';
		
		showConfirm('권한삭제',COM_0005, function(result){
			if(!result){
				return;
			}
			saveAutinx();
		});
	});	
	
	
//	권한정보저장	
	$('#btnSave').on('click',function(e){
		showConfirm('권한저장',COM_0004, function(result){
			if(!result){
				return;
			}
			saveAutinx();
		});
	});
	
	
//	권한그리드 클릭
	$('#jqxAuthList').on('rowselect', function (event){
		var args = event.args;
		var rowBoundIndex = args.rowindex;
		var rowData = args.row;
		
		if(rowData.AUT_CODE === 'ALL'){
			$('#btnAuthDel').attr('disabled',true);
			$('#btnAuthUpd').attr('disabled',true);
			$('#btnPerAuthAdd').attr('disabled',true);
			$('#btnPerAuthDel').attr('disabled',true);
			
		}else{
			$('#btnAuthDel').attr('disabled',false);
			$('#btnAuthUpd').attr('disabled',false);
			$('#btnPerAuthAdd').attr('disabled',false);
			$('#btnPerAuthDel').attr('disabled',false);
		}
		
		
		
		var dataSet = {
			SEARCH_AUT_CODE:rowData.AUT_CODE
		};
		
		callService("getPerAuthData"
					,"admin/auth/selectPerAuthList"
					,dataSet
					,"serviceCallback");
	
		
		
	});

	
	
//	사용자-권한 추가	
	$('#btnPerAuthAdd').on('click', function(){
		var selPerinxRows 	= $('#jqxUserList').jqxGrid('getselectedrowindexes');		//사용자목록
		var selPerAuthRows 	= $('#jqxAuthUserList').jqxGrid('getrows');					//사용자-권한 목록
		
		for(var i=0; i< selPerinxRows.length; i++){
			var dsPerinx = $('#jqxUserList').jqxGrid('getrowdata', selPerinxRows[i]);	//selPerinxRows[i] 선택된 로우의 index
			
			
		//	중복체크	
			for(var j=0; j < selPerAuthRows.length; j++){
				var dsPerAuth = selPerAuthRows[j];				
				
				if(dsPerAuth.PER_CODE === dsPerinx.PER_CODE && dsPerAuth.INSTCD === dsPerinx.INSTCD){					
					alert(dsPerinx.PER_NAME + '는 이미 추가된 사용자입니다...');
					$('#jqxUserList').jqxGrid('clearselection');
					$("#jqxUserList").jqxGrid('clear');			
					$("#jqxUserList").jqxGrid('updatebounddata', 'cells');
					return;
				}
    		}
			
			dsPerinx.ROW_STATE = 'C';
			
			$("#jqxAuthUserList").jqxGrid('addrow', null, dsPerinx);
			
		}
		
		$('#jqxUserList').jqxGrid('clearselection');
		$("#jqxUserList").jqxGrid('clear');			
		$("#jqxUserList").jqxGrid('updatebounddata', 'cells');

		
	});	
	
	
//	권한별 사용자 삭제	
	$('#btnPerAuthDel').on('click',function(e){
		showConfirm('권한별 사용자 삭제',COM_0005, function(result){
			if(!result){
				return;
			}
			
			var selectedrowindex = $("#jqxAuthUserList").jqxGrid('getselectedrowindex');
            var dsPerAuth = $('#jqxAuthUserList').jqxGrid('getrowdata', selectedrowindex);
    		
    	//	추가된 Row	
    		if(dsPerAuth.ROW_STATE === 'C'){
    			showConfirm('권한별 사용자 삭제','저장되지 않은 사용자 입니다.<br>계속 진행하시겠습니까?', function(result){
    				if(!result) {
    	                return;
    	            }
    				
    				var id = $("#jqxAuthUserList").jqxGrid('getrowid', selectedrowindex);
        			
    				$("#jqxAuthUserList").jqxGrid('deleterow', id);
    			});
    			
    		}else{
    			var dataSet = {
        				PER_CODE:dsPerAuth.PER_CODE,
        				AUT_CODE:dsPerAuth.AUT_CODE
        		};
    			
    			dataSet.PER_CODE = dsPerAuth.PER_CODE;
    			dataSet.AUT_CODE = dsPerAuth.AUT_CODE;
    			dataSet.INSTCD = dsPerAuth.INSTCD;
    			
    			callService("deletePerAuth"
        					,"admin/auth/deletePerAuth"
        					,dataSet
        					,"serviceCallback");
    		}
			
		});
		
		
	});
	
//	사용자 권한 저장	
	$('#btnPerAuthSave').on('click',function(){
		showConfirm('권한별사용자저장',COM_0004, function(result){
			if(!result){
				return;
			}
			var selPerAuthRows 	= $('#jqxAuthUserList').jqxGrid('getrows');	//사용자-권한 목록
    		var selAutinxRow 	= $('#jqxAuthList').jqxGrid('getselectedrowindex');			//권한목록
    		var dataAutinx = $('#jqxAuthList').jqxGrid('getrowdata', selAutinxRow);
    		
    		var dsAddedList = [];
    		
    	//	추가된 건만
    		for(var i=0; i< selPerAuthRows.length; i++){
    			var dsPerAuth = $('#jqxAuthUserList').jqxGrid('getrowdata', i);
    			
    			if( dsPerAuth.ROW_STATE === 'C'){
    				dsAddedList.push(dsPerAuth);
    				
    			}
    		}
    		
    		var dataSet = {};
    		
    		dataSet.CRT_ID = $.session.get('PER_CODE');
    		dataSet.UDT_ID = $.session.get('PER_CODE');
    		dataSet.AUT_CODE = dataAutinx.AUT_CODE;
    	//	dataSet.dsPerAuthList = $('#jqxAuthUserList').jqxGrid('getrows');
    		dataSet.dsPerAuthList = dsAddedList;
    		
    		callService("savePerAuth"
    					,"admin/auth/savePerAuth"
    					,dataSet
    					,"serviceCallback");
			
		});
		
	});
	
}

