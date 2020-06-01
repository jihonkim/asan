/**
 * 권한관리
 * @Page : authority.jsp
 */


var gvCommand = 'C';

var gvAutinxList = [];
var gvMenuList 	 = [];

var gvDataSourceAutinx;
var gvDataSourceMenu;

var gvDataAdapterAutinx;
var gvDataAdapterMenu;

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
			
			$("#jqxAuthList").jqxGrid('clear');			
			$("#jqxAuthList").jqxGrid('updatebounddata', 'cells');
			$('#jqxAuthList').jqxGrid('selectrow', 0);
			
			
			//getMenuAuthList();
			
			
			break;
			
		case "getMenuAuthList":
			
			gvDataSourceMenu.localdata = result.dsMenuAuthList;
			
			$("#jqxMenuList").jqxGrid('clear');			
			$("#jqxMenuList").jqxGrid('updatebounddata', 'cells');
			
			break;
			
		case "upsertMenuAuth":
			showAlert('메뉴 권한 관리',COM_0001,null);
			getMenuAuthList();
			
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
function getMenuAuthList()
{
	var idx = $('#jqxAuthList').jqxGrid('getselectedrowindex');
	var dataAutinx = $('#jqxAuthList').jqxGrid('getrowdata', idx);
	
	var dataSet = {
			SEARCH_AUT_CODE:"'"+dataAutinx.AUT_CODE+"'"
	};
	
	callService("getMenuAuthList"
			,"admin/auth/selectMenuAuthList"
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
//	--------------------------------------------------------------------------------	
//	권한목록
//	--------------------------------------------------------------------------------	
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
			showAlert('메뉴 권한 관리',error,null);
		}
	});
	
	$("#jqxAuthList").jqxGrid({
	    source: gvDataAdapterAutinx,
	    theme: 'bootstrap',
	    width: '100%',
		height: '200',
	    columns: [
	    	{ text: '권한코드', datafield: 'AUT_CODE', width: "40%"},
	        { text: '권한명', datafield: 'AUT_NAME', width: "60%"}
	    ]
	}); 
	
	
//	--------------------------------------------------------------------------------	
//	메뉴목록
//	--------------------------------------------------------------------------------	
	gvDataSourceMenu = {
	    datatype: "json",
	    datafields: [
	    	
	    	{ name: 'CHKVAL',type: 'bool'},
	    	{ name: 'SEQ'},
	    	{ name: 'MENU_GBN_CD'},
	    	{ name: 'MENU_GBN_NM'},
	        { name: 'MENU_NM'},
	        { name: 'MENU_URL'},
	        { name: 'SORT'},
	        { name: 'USE_YN'},
	    ],
	    cache: false,
	    localdata: gvMenuList
	};
	
	
	gvDataAdapterMenu = new $.jqx.dataAdapter(gvDataSourceMenu, {
		loadError: function(xhr, status, error){
			showAlert('메뉴 권한 관리',error,null);
		}
	});
	
	$("#jqxMenuList").jqxGrid({
	    source: gvDataAdapterMenu,
	    theme: 'bootstrap',
	    width: '100%',
		height: '500',
		selectionmode: 'none',
		editable: true,
		columnsresize: true,
		selectionmode: 'multiplecellsadvanced',
	    columns: [
	    	{ text: '선택', datafield: 'CHKVAL', width: "10%", columntype:"checkbox", threestatecheckbox: false},
	    	{ text: '메뉴구분코드', datafield: 'MENU_GBN_CD', width: "10%", cellsalign:'center',editable: false},
	        { text: '메뉴구분명', datafield: 'MENU_GBN_NM', width: "10%", cellsalign:'center',editable: false},
	        { text: '메뉴명', datafield: 'MENU_NM', width: "20%",editable: false},
	        { text: 'URL', datafield: 'MENU_URL', width: "40%",editable: false},
	        { text: '순서', datafield: 'SORT', width: "10%", cellsalign:'center',editable: false}
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
function initEvent()
{
	
//	권한그리드 클릭
	$('#jqxAuthList').on('rowselect', function (event){
		
		var dataAutinx = $('#jqxAuthList').jqxGrid('getrowdata', event.args.rowindex);

		var dataSet = {
			SEARCH_AUT_CODE:"'"+dataAutinx.AUT_CODE+"'"
		};
		
		callService("getMenuAuthList"
				,"admin/auth/selectMenuAuthList"
				,dataSet
				,"serviceCallback");
	});
	
	
	$('#jqxMenuList').on('rowselect', function (event){
		
	});
	
	
	
//	저장
	$('#btnSave').on('click',function(e){
		
		showConfirm('메뉴 권한 관리',COM_0004, function(result){
			if(!result){
				return;
			}
			
			var idxAuth = $('#jqxAuthList').jqxGrid('getselectedrowindex');

			var dsAuth = $('#jqxAuthList').jqxGrid('getrowdata', idxAuth);
			var dsMenuRows = $('#jqxMenuList').jqxGrid('getrows');
			
			var dsMenuAuthList = [];
			
			for(var i=0; i < dsMenuRows.length; i++){
				if(dsMenuRows[i].CHKVAL){
					var dsTmp = {};
					
					dsTmp.AUT_CODE = dsAuth.AUT_CODE;
					dsTmp.MENU_SEQ = dsMenuRows[i].SEQ;
					dsTmp.CRT_ID = $.session.get('PER_CODE');
					dsTmp.UDT_ID = $.session.get('PER_CODE');
					
					dsMenuAuthList.push(dsTmp);
				}
				
			}
			console.log(JSON.stringify(dsMenuAuthList)); 
			
			var dataSet = {};
			
			dataSet.AUT_CODE = dsAuth.AUT_CODE;
			dataSet.MENU_AUTH_LIST = dsMenuAuthList;
			
			callService("upsertMenuAuth"
					,"admin/auth/upsertMenuAuth"
					,dataSet
					,"serviceCallback");
			
		});
		
	});
	

	
	
}

