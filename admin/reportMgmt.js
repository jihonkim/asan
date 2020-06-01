/**
 * 정형보고서 관리
 * @Page : reportMgmt.jsp
 */


var gvDataSourceReportCate;
var gvDataSourceReportPage;

var gvDataAdapterReportCate;
var gvDataAdapterReportPage;

var gvReportCateList = [];
var gvReportPageList = [];

var gvReportCateIdx = 0;
var gvReportPageIdx = 0;

var gvPageScrollXPos = 0;
var gvPageScrollYPos = 0;


var gvAutinxList 	= [];

/**
 * Application Ready
 */
$(document).ready(function(){
//	권한데이터
	getAutinxList();
	
	init();
	
	setGrid();
	
	initEvent();
	
	getReportCateList();
	
	menuFix('admin_menu_menuMain');
	
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
	if(result.ERR_CD != "0"){
		alert(result.ERR_MSG);
		return;
	}
	
	
	switch(svcId){
		case "getAutinxList":
			gvAutinxList = result.dsAutinxList;
			break;
		
		case "saveReportCate":
			BootstrapDialog.alert(COM_0001, function(e){
				$('#btnCloseCategory').trigger('click');
				getReportCateList();
				
			});
			
			break;
			
		case "saveReportCateUpdown":
			getReportCateList();
			break;
			
		case "saveReportPage":
			BootstrapDialog.alert(COM_0001, function(e){
				$('#btnCloseReportPage').trigger('click');
				getReportPageList();
				
			});
			
			break;
			
		case "saveReportPageDown":
			getReportPageList();
			break;
			
		case "getReportCateList":
			gvDataSourceReportCate.localdata = result.dsReportCateList;
			
			$("#jqxReportCateList").jqxGrid('clear');			
			$("#jqxReportCateList").jqxGrid('updatebounddata', 'cells');
			
			if(gvReportCateIdx < 0){
				$("#jqxReportCateList").jqxGrid('selectrow', 0);	
			}else{
				$("#jqxReportCateList").jqxGrid('selectrow', gvReportCateIdx);
			}
			
			
			getReportPageList();
			
			
			break;
			
		case "getReportPageList":
			gvDataSourceReportPage.localdata = result.dsReportPageList;
			
			$("#jqxReportPageList").jqxGrid('clear');			
			$("#jqxReportPageList").jqxGrid('updatebounddata', 'cells');
			
			$("#jqxReportPageList").jqxGrid('selectrow', 0);
			
			if(gvReportPageIdx < 0){
				$("#jqxReportPageList").jqxGrid('selectrow', 0);	
				
			}else{
				if(gvPageScrollYPos != 0){
					$("#jqxReportPageList").jqxGrid('scrolloffset',gvPageScrollYPos,gvPageScrollXPos);
				}
				
				$("#jqxReportPageList").jqxGrid('selectrow', gvReportPageIdx);
			}
			
			break;
			
			
	//	보고서분류 삭제		
		case "deleteReportCate":
			BootstrapDialog.alert(COM_0003, function(e){
				getReportCateList();
				
			});
			
			break;
			

	//	보고서페이지 삭제		
		case "deleteReportPage":
			BootstrapDialog.alert(COM_0003, function(e){
				getReportPageList();
				
			});
			
			break;
			
		default:
			break;
	}
}

//------------------------------------------------------------------------------------------
//	TRANSACTION	
//------------------------------------------------------------------------------------------
function getAutinxList()
{
	var dataSet = {
			
	};

	callServiceSync("getAutinxList"
					,"admin/auth/selectAutinxList"
					,dataSet
					,"serviceCallback");
	
	setComboList('selAUT_CODE', gvAutinxList, 'AUT_CODE', 'AUT_NAME','','선택');
}





/**
 * 보고서분류정보 조회
 * @returns
 */
function getReportCateList()
{
	var dataSet = {};
	
	callService("getReportCateList"
				,"admin/report/selectReportCateList"
				,dataSet
				,"serviceCallback");
}

/**
 * 보고서목록조회
 * @returns
 */
function getReportPageList()
{
	var dataSet = {};
	
	var idx = $('#jqxReportCateList').jqxGrid('getselectedrowindex');
	var data = $('#jqxReportCateList').jqxGrid('getrowdata', idx);
	
	if(idx < 0){
		return;
	}
	dataSet.SEARCH_CATE_CODE = data.SEQ;
	
	callService("getReportPageList"
				,"admin/report/selectReportPageList"
				,dataSet
				,"serviceCallback");
}


//------------------------------------------------------------------------------------------
//USER FUNCTION	
//------------------------------------------------------------------------------------------
/**
 * 컴포넌트 및 데이터 초기화
 * @returns
 */
function init()
{
	makeiCheck('.chkSHOW_YN, .chkSHOW_YN_PAGE');
	
}



/**
 * setGrid
 * @returns
 */
function setGrid()
{	
	
//	보고서 분류 그리드	
	gvDataSourceReportCate = {
	    datatype: "json",
	    datafields : [ 
	    	{
				name : 'SEQ',
				type : 'string'
			}, 
	    	{
				name : 'NAME',
				type : 'string'
			}, {
				name : 'ICON_PATH',
				type : 'string'
			}, {
				name : 'SHOW_YN',
				type : 'string'
			}, {
				name : 'ORDER',
				type : 'string'
			}, {
				name : 'UDT_DT',
				type : 'date'
			} , {
				name : 'SHOW_DASHBOARD_GBN',
				type : 'string'
			} 
		],
	    cache: false,
	    localdata: gvReportCateList,
	    processdata: function(data){
	    	
	    },
	    updaterow: function (rowid, newdata, commit) {
	    	commit(true);
	    	
	    	newdata.UDT_ID = $.session.get('PER_CODE');
	    	newdata.CRT_ID = $.session.get('PER_CODE');
			
			callService("saveReportCateUpdown"
						,"admin/report/saveReportCate"
						,newdata
						,"serviceCallback");
            

        }
	};
	
	gvDataAdapterReportCate = new $.jqx.dataAdapter(gvDataSourceReportCate, {
		loadError: function(xhr, status, error){
			alert(error);
		}
	});
	
	$("#jqxReportCateList").jqxGrid({
		width:'100%',
		height:'100%',
		source : gvDataAdapterReportCate,
		autoheight : false,
		sortable : true,
		altrows : true,
		enabletooltips : false,
		editable : false,
		showfilterrow : false,
		filterable : false,
		selectionmode : 'singlerow',
		columnsresize: true,
		theme: 'bootstrap',
		pageable: false,
		columns : [
			{ 	text : '번호', 		datafield : 'SEQ', 				renderer : columnsrenderer, width : '10%'	},
			{ 	text : '이름', 		datafield : 'NAME', 			renderer : columnsrenderer, width : '20%', 	cellclassname:'gridCellLink'},
			{ 	text : '아이콘경로', 	datafield : 'ICON_PATH',		renderer : columnsrenderer, width : '20%' 	},
			{ 	text : '구분', 		datafield : 'SHOW_DASHBOARD_GBN',renderer : columnsrenderer, width : '20%' 	},
			{ 	text : '표시', 		datafield : 'SHOW_YN', 			renderer : columnsrenderer, width : '10%'},
			{ 
				text : '순서', 	datafield : 'ORDER', 	width : '20%' ,	cellsalign:'center',
				cellsrenderer:function (row, column, value) {
					var html = '';
					
					html += '<div style="margin-top:3px;text-align:center;">';
					html += '<button class="btn btn-primary btnOrderUp btn-xs" seq="" val="" index=""><i class="ion ion-arrow-up-c"></i></button>&nbsp;';
					html += '<button class="btn btn-warning btnOrderDown btn-xs" seq="" val="" index=""><i class="ion ion-arrow-down-c"></i></button>&nbsp;';
					html += '</div>';
					
					return html;
				}
				
			}
		]
	});
	
	
	var gvSequence = 0;
	
	
//	보고서 목록 그리드	
	gvDataSourceReportPage = {
	    datatype: "json",
	    datafields : [ 
	    	{
				name : 'SEQ',
				type : 'string'
			}, {
				name : 'CATE_CODE',
				type : 'string'
			}, {
				name : 'CATE_NM',
				type : 'string'
			}, {
				name : 'TITLE',
				type : 'string'
			}, {
				name : 'URL',
				type : 'string'
			}, {
				name : 'USER_ID',
				type : 'string'
			}, {
				name : 'TARGET_ID',
				type : 'string'
			}, {
				name : 'AUT_CODE',
				type : 'string'
			}, {
				name : 'AUT_NAME',
				type : 'string'
			}, {
				name : 'SHOW_YN',
				type : 'string'
			}, {
				name : 'ORDER',
				type : 'string'
			}, {
				name : 'UDT_DT',
				type : 'date'
			} 
		],
	    cache: false,
	    localdata: gvReportPageList,
	    processdata: function(data){
	    	
	    },
	    updaterow: function (rowid, newdata, commit) {
	    	newdata.UDT_ID = $.session.get('PER_CODE');
	    	newdata.CRT_ID = $.session.get('PER_CODE');
			
			callService("saveReportPageDown"
						,"admin/report/saveReportPage"
						,newdata
						,"serviceCallback");
			commit(true);
	    	
	    	
        }
	};
	
	gvDataAdapterReportPage = new $.jqx.dataAdapter(gvDataSourceReportPage, {
		loadError: function(xhr, status, error){
			alert(error);
		}
	});
	
	
	$("#jqxReportPageList").jqxGrid({
		width:'100%',
		height:'600px',
		source : gvDataAdapterReportPage,
		autoheight : false,
		sortable : true,
		altrows : true,
		enabletooltips : false,
		editable : false,
		showfilterrow : false,
		filterable : false,
		selectionmode : 'singlerow',
		columnsresize: true,
		theme: 'bootstrap',
		pageable: false,
		columns : [
			{ 	text : '번호', 			datafield : 'SEQ', 		renderer:columnsrenderer, width : '10%'},
			{ 	text : '분류코드', 		datafield : 'CATE_CODE',renderer:columnsrenderer, width : '10%', cennrenderer:''},
			{ 	text : '분류명', 		datafield : 'CATE_NM',renderer:columnsrenderer, width : '10%', cennrenderer:''},
			{ 
				text : '순서', 	datafield : 'ORDER', 	width : '80px' ,	cellsalign:'center',
				cellsrenderer:function (row, column, value) {
					var html = '';
					
					html += '<div style="margin-top:3px;text-align:center;">';
					html += '<button class="btn btn-primary btnPageOrderUp btn-xs" seq="" val="" index=""><i class="ion ion-arrow-up-c"></i></button>&nbsp;';
					html += '<button class="btn btn-warning btnPageOrderDown btn-xs" seq="" val="" index=""><i class="ion ion-arrow-down-c"></i></button>&nbsp;';
					html += '</div>';
					
					return html;
				}
				
			},
			{ 	text : '제목', 			datafield : 'TITLE', 	renderer:columnsrenderer, width : '150px', 	cellclassname:'gridCellLink'},
			{ 	text : 'URL', 			datafield : 'URL',		renderer:columnsrenderer, width : '150px'},
			{ 	text : '사용자ID', 		datafield : 'USER_ID', 	renderer:columnsrenderer, width : '80px'},
			{ 	text : 'TARGET', 		datafield : 'TARGET_ID',renderer:columnsrenderer, width : '80px'},
			{ 	text : '권한코드', 		datafield : 'AUT_CODE', renderer:columnsrenderer, width : '80px'},
			{ 	text : '권한명', 			datafield : 'AUT_NAME', renderer:columnsrenderer, width : '80px'},
			{ 	text : '표시', 			datafield : 'SHOW_YN', 	renderer:columnsrenderer, width : '80px'}
			
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
	$('#btnAddCategory').on('click', function(e){
		$('#txtNAME').val('');
		$('#txtSEQ').val('');
		$('#txtICON_PATH').val('');
		$('#txtORDER').val('');
		
		$('#chkSHOW_YN').iCheck('uncheck');
		
		$('input:radio[name="SHOW_GUN"][value="CDW"]').iCheck('check');
		
		var dlg = $('#modalCategory').modal();
		dlg.find('.modal-title').text('정형보고서 분류 등록');
		dlg.modal('show');	
		
		
		
	});
	
	$('#btnUpdCategory').on('click', function(e){
		var idx = $('#jqxReportCateList').jqxGrid('getselectedrowindex');
		var data = $('#jqxReportCateList').jqxGrid('getrowdata', idx);
		
		if(idx < 0){
			return;
		}
		$('#txtSEQ').val(data.SEQ);
		$('#txtNAME').val(data.NAME);
		$('#txtICON_PATH').val(data.ICON_PATH);
		$('#txtORDER').val(data.ORDER);
		$('#chkSHOW_YN').iCheck(iif(data.SHOW_YN == 'Y','check','uncheck'));
		$('#chkSHOW_GUN_CDW').iCheck(iif(data.SHOW_DASHBOARD_GBN == 'CDW','check','uncheck'));
		$('#chkSHOW_GUN_RG').iCheck(iif(data.SHOW_DASHBOARD_GBN == 'RG','check','uncheck'));
		
		var dlg = $('#modalCategory').modal();
		dlg.find('.modal-title').text('정형보고서 분류 수정');
		dlg.modal('show');	
		
	});
	
	$('#btnDelCategory').on('click',function(e){
		var idx = $('#jqxReportCateList').jqxGrid('getselectedrowindex');
		var data = $('#jqxReportCateList').jqxGrid('getrowdata', idx);
		
		
		var dataSet = {};
		
		dataSet.CATE_CODE = data.SEQ;
		
		
		callService("deleteReportCate"
					,"admin/report/deleteReportCate"
					,dataSet
					,"serviceCallback");
		
	});
	
	
	$('#btnDelReportPage').on('click',function(e){
		var idx = $('#jqxReportPageList').jqxGrid('getselectedrowindex');
		var data = $('#jqxReportPageList').jqxGrid('getrowdata', idx);
		
		
		var dataSet = {};
		
		dataSet.SEQ = data.SEQ;
		
		
		
		callService("deleteReportPage"
				,"admin/report/deleteReportPage"
				,dataSet
				,"serviceCallback");
		
		
	})
	
	
	$('#btnAddReportPage').on('click', function(e){
		var idx = $('#jqxReportCateList').jqxGrid('getselectedrowindex');
		var data = $('#jqxReportCateList').jqxGrid('getrowdata', idx);
		
		if(idx < 0){
			return;
		}
		
		var dataSet = {
			TITLE:'',
			URL:'',
			USER_ID:'',
			TARGET_ID:'',
			AUT_CODE:'',
			SHOW_YN:'N'	,
			ORDER:'',
			SEQ:''
		};
		
		$('#frmReportPage').JsonToForm(dataSet);
		$('#selAUT_CODE').val('');
		$('#chkSHOW_YN_PAGE').iCheck(iif(dataSet.SHOW_YN == 'Y','check','uncheck'));
		
		$('#txtCATE_CODE').val(data.SEQ);
		$('#txtCATE_NM').val(data.NAME);
		
		
		var dlg = $('#modalReportPage').modal();
		dlg.find('.modal-title').text('정형보고서 페이지 등록');
		dlg.find('.modal-dialog').draggable({
            handle: ".modal-header"
        });
		dlg.modal('show');	
		
		
		
	});
	
	
	$('#btnUpdReportPage').on('click',function(e){
		var idx = $('#jqxReportPageList').jqxGrid('getselectedrowindex');
		var data = $('#jqxReportPageList').jqxGrid('getrowdata', idx);
		
		if(idx < 0){
			return;
		}

		$('#frmReportPage').JsonToForm(data);
		
		$('#selAUT_CODE').val(data.AUT_CODE);
		
		$('#chkSHOW_YN_PAGE').iCheck(iif(data.SHOW_YN == 'Y','check','uncheck'));
		
		var dlg = $('#modalReportPage').modal();
		dlg.find('.modal-title').text('정형보고서 페이지 수정');
		dlg.find('.modal-dialog').draggable({
            handle: ".modal-header"
        });
		dlg.modal('show');	
		
		
		
	});
	
	
	$('#jqxReportPageList').on('cellclick',function(event){
		var args = event.args;
	    var rowBoundIndex = args.rowindex;
	    var columnindex = args.columnindex;
	    var dataField = args.datafield;
	    var value = args.value;
	    
	    var data = $('#jqxReportPageList').jqxGrid('getrowdata', rowBoundIndex);
	    
	    if(rowBoundIndex < 0){
			return;
		}
		
	    
	    if(dataField != 'TITLE'){
	    	return;
	    	
	    }
	    
	    
		
	    if(data.AUT_CODE){
	    	$('#selAUT_CODE').val(data.AUT_CODE);
	    }
	    
		$('#frmReportPage').JsonToForm(data);
		
		$('#chkSHOW_YN_PAGE').iCheck(iif(data.SHOW_YN == 'Y','check','uncheck'));
		
		$('#chkSHOW_GUN_PAGE_CDW').iCheck(iif(data.SHOW_DASHBOARD_GBN == 'CDW','check','uncheck'));
		$('#chkSHOW_GUN_PAGE_RG').iCheck(iif(data.SHOW_DASHBOARD_GBN == 'RG','check','uncheck'));
		
		var dlg = $('#modalReportPage').modal();
		dlg.find('.modal-title').text('정형보고서 페이지 수정');
		dlg.find('.modal-dialog').draggable({
            handle: ".modal-header"
        });
		dlg.modal('show');	
	    
	    
		
	});
	
	/**
	 * 분류저장
	 */
	$('#btnSaveCategory').on('click',function(e){
		
		if(isNullOrEmpty($('#txtNAME').val())){
			alert('분류명은 필수항목 입니다.');
			return;
			
		}
		
		var dataSet = $('#frmCategory').formToJson();
		
		if($("#chkSHOW_YN").is(":checked")){
			dataSet.SHOW_YN = 'Y';
		}else{
			dataSet.SHOW_YN = 'N';
		}
		
		dataSet.SHOW_DASHBOARD_GBN = $(":input:radio[name=SHOW_GUN]:checked").val()
		
		dataSet.UDT_ID = $.session.get('PER_CODE');
		dataSet.CRT_ID = $.session.get('PER_CODE');
		
		printJSON(dataSet);
		
		callService("saveReportCate"
					,"admin/report/saveReportCate"
					,dataSet
					,"serviceCallback");
		
	
		
	});
	
	
	/**
	 * 보고서저장
	 */
	$('#btnSaveReportPage').on('click',function(e){
		
		var dataSet = $('#frmReportPage').formToJson();
		
		if($("#chkSHOW_YN_PAGE").is(":checked")){
			dataSet.SHOW_YN = 'Y';
			
		}else{
			dataSet.SHOW_YN = 'N';
			
		}
		
		dataSet.SHOW_DASHBOARD_GBN = $(":input:radio[name=SHOW_PAGE_GUN]:checked").val()
		
		dataSet.UDT_ID = $.session.get('PER_CODE');
		dataSet.CRT_ID = $.session.get('PER_CODE');
		
		
		printJSON(dataSet);
		
		
		callService("saveReportPage"
					,"admin/report/saveReportPage"
					,dataSet
					,"serviceCallback");
	});
	
	
	$("#jqxReportCateList").on('rowselect',function(e){
		var args = e.args;
		var idx = args.rowindex;
		var data = $('#jqxReportCateList').jqxGrid('getrowdata', idx);
		var dataSet = {};
		
		if(idx < 0){
			return;
		}
		dataSet.SEARCH_CATE_CODE = data.SEQ;
		
		callService("getReportPageList"
					,"admin/report/selectReportPageList"
					,dataSet
					,"serviceCallback");
		
	});
	

	$(document).on('click','.btnOrderUp',function(){
		gvReportCateIdx = $("#jqxReportCateList").upRow();
		
	});

	$(document).on('click','.btnOrderDown',function(){
		gvReportCateIdx = $("#jqxReportCateList").downRow();
		
	});
	
	

	//정형보고서목록
	$(document).on('click','.btnPageOrderUp',function(){
		var position = $("#jqxReportPageList").jqxGrid('scrollposition');
		
		gvPageScrollXPos = position.left;
		gvPageScrollYPos = position.top;
		
		gvReportPageIdx = $("#jqxReportPageList").upRow();
		
	});

	$(document).on('click','.btnPageOrderDown',function(){
		var position = $("#jqxReportPageList").jqxGrid('scrollposition');
		
		gvPageScrollXPos = position.left;
		gvPageScrollYPos = position.top;
		
		gvReportPageIdx = $("#jqxReportPageList").downRow();
		
	});

	
}
