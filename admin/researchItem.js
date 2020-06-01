/**
 * 연구항목관리
 * @Page : researchItem.jsp
 */


var gvResearchItemList 	= [];

var gvSchemaList 		= [];		//스키마목록
var gvTableList 		= [];		//테이블목록

var gvItemCateList  	= [];		//대분류
var gvItemCateDetlList 	= [];		//중분류목록
var gvColumnList 		= [];
var gvItemMgmtList  	= [];
var gvColumnDateList 	= [];		//컬럼목록(Date 타입만)

var gvDataSourceItemMgmt;
var gvDataAdapterItemMgmt;


var gvItemMgmtTableList = [];
var gvItemMgmtColumnList = [];

var gvPageScrollXPos = 0;
var gvPageScrollYPos = 0;
var gvItemMgmtSeq = 0;


var gvItemTypeCdList = [];
var gvChartTypeCdList = [];

var gvCommonCode = [
	{'SEARCH_COMM_GRP_ID':'CDW_ITEM_TYPE_CD','DATA_SET':'gvItemTypeCdList'},
	{'SEARCH_COMM_GRP_ID':'CHART_TYPE_CD','DATA_SET':'gvChartTypeCdList'}	
];



/**
 * Application Ready
 */
$(document).ready(function(){
	getItemCateList();
	getCommonCodeList();
	
	init();
	
	setGrid();
	
	initEvent();
	
	//메뉴고정
	menuFix('admin_researchItem_researchItemMain');
	
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
		case "getCommonCodeList":
			for(var i=0; i < gvCommonCode.length; i++){
				var dsCommonCode = gvCommonCode[i];
				
				if(result.commonCodeGrpId === dsCommonCode.SEARCH_COMM_GRP_ID){
					eval(dsCommonCode.DATA_SET + "=result.dsCommonCodeList;");
					break;
				}
			}
			
			break;
		case "getItemCateList":
			gvItemCateList = result.dsItemCateList;
			
			if(typeof gvItemCateList === 'undefined'){
				return;
			}
			
			break;
			
		case "getItemCateDetlList":
			gvItemCateDetlList = result.dsItemCateDetlList;
			
			if(typeof gvItemCateDetlList === 'undefined'){
				return;
			}
			
			setComboList('selItemCateDetlList', gvItemCateDetlList ,'SEQ', 'CATE_NM','','전체');
			
			break;
			
		case "getItemCateDetlAddList":
			if(typeof result.dsItemCateDetlList === 'undefined'){
				return;
			}
			
			setComboList('selItemCateDetl', result.dsItemCateDetlList ,'SEQ', 'CATE_NM','','선택');
			break;
	
		case "getSchemaList":
			gvSchemaList = result.dsSchemaList;
			
			break;
			
		case "getTableList":
			gvTableList = result.dsTableList;
			
			break;
			
		case "getColumnList":
			gvColumnList = result.dsColumnList;
			
			setComboList('selColumnList', gvColumnList, 'COLUMN', 'COLUMN','','선택');
			
			break;
			
			
		case "insertItemMgmt":
			showAlert('항목저장',COM_0001,function(e){
				$('#btnItemMgmtClose').trigger('click');
				getItemMgmtList();				
			});
			break;
			
		case "getItemMgmtList":
			gvDataSourceItemMgmt.localdata = result.dsItemMgmtList;
			
			$("#jqxResearchItemList").jqxGrid('clear');			
			$("#jqxResearchItemList").jqxGrid('updatebounddata', 'cells');
			
			if( gvItemMgmtSeq > 0){
				if(gvPageScrollYPos != 0){
					$("#jqxResearchItemList").jqxGrid('scrolloffset',gvPageScrollYPos,gvPageScrollXPos);
				}
				
				$("#jqxResearchItemList").jqxGrid('selectrow', gvItemMgmtSeq);
				
			}else{
				$("#jqxResearchItemList").jqxGrid('selectrow', 0);
			}
			
			break;
			
			
		case "selectItemMgmtView":
			var data = result.dsItemMgmtView;
			
//			console.log(data); ITEM_CATE_SEQ=4;
			
		//	연구항목컬럼상세
			$('#txtITEM_CATE_FULL').html(data.ITEM_CATE_NM + ' > ' + data.ITEM_CATE_DETL_NM);
			$('#txtITEM_ID').html(data.ITEM_ID);
			$('#txtITEM_NM').val(data.ITEM_NM);
			$('#txtITEM_DESC').val(data.ITEM_DESC);
			$('#txtUDT_DT').html(data.UDT_DT);
//			$('#chkSEARCH_YN').iCheck(iif(data.SEARCH_YN == 'Y','check','uncheck'));
			$('#chkDEFAULT_YN').iCheck(iif(data.DEFAULT_YN == 'Y','check','uncheck'));
			$('#txtSEQ').val(data.SEQ);	//hidden value
			
			console.log(data.ITEM_CATE_ID);
			if(data.ITEM_CATE_ID=='MAIN'){
				$('#option_for_dashboard_item').show();
				
				$('#selITEM_TYPE').val(data.ITEM_TYPE);
				$('#selCHART_TYPE').val(data.CHART_TYPE);
				$('#txtFREQ').val(data.FREQ);
				$('#txtITEM_COLUMN').val(data.ITEM_COLUMN);
				$('#txtITEM_LABEL').val(data.ITEM_LABEL);
				$('#txtEXEC_SQL').val(data.EXEC_SQL);
				$('#txtORIGINAL_SQL').val(data.ORIGINAL_SQL);
			}else{
				$('#option_for_dashboard_item').hide();
			}

			break;
			
		case "updateItemMgmt":
			showAlert('항목저장',COM_0002,function(e){
				$('#btnCloseItemMgmt').trigger('click');
				getItemMgmtList();
				
			});
			break;
			
		case "deleteItemMgmt":
			showAlert('항목저장',COM_0003,function(e){
				$('#btnCloseItemMgmt').trigger('click');
				getItemMgmtList();
				
			});
			break;
			
		case "updateItemCateDetl":
			break;
			
		case "getColumnDateList":
			var dsDateList = [];
			
			gvColumnDateList = result.dsColumnDateList;
			
			for(var i=0; i < gvColumnDateList.length; i++){
				var dsDate = gvColumnDateList[i];
				
			//	Timestamp사용여부	
				if(gvBASE_DT_TIMESTAMP_YN === 'Y'){
					dsDateList.push(dsDate);
					
				}else{
					if(dsDate.DATA_TYPE === 'date'){
						dsDateList.push(dsDate);
					}
				}
			}
			
			setComboList('selBASE_DT_COLUMN', dsDateList, 'COLUMN', 'COLUMN','0000','선택');
			
			break;
			
			
		case "updateItemMgmtOrder":
			getItemMgmtList();
			break;
			
			
		case "getItemMgmtTableList":
			gvItemMgmtTableList = result.dsItemMgmtTableList;
			break;
			
		case "getItemMgmtColumnList":
			gvItemMgmtColumnList = result.dsItemMgmtColumnList;
			setComboList('selUPPER_COLUMN',gvItemMgmtColumnList,'VALUE','VALUE','','선택');
			
			break;
			
				
		default:
			break;
	
	}
}

//------------------------------------------------------------------------------------------
//	TRANSACTION	
//------------------------------------------------------------------------------------------
function getCommonCodeList(){
	for(var i=0; i < gvCommonCode.length; i++){
		var ds = gvCommonCode[i];
		var dataSet = {};
		dataSet.SEARCH_COMM_GRP_ID = ds.SEARCH_COMM_GRP_ID;
		callServiceSync("getCommonCodeList"
					,"common/sys/getCommonCodeList"
					,dataSet
					,"serviceCallback");
		
	}
	
}

function getItemCateList()
{
	var dataSet = {};
	
	callServiceSync("getItemCateList", 
				"admin/researchItem/selectItemCateList", 
				dataSet, 
				"serviceCallback");
}


function getItemCateDetlList()
{

	var dataSet = {};
	
	dataSet.SEARCH_ITEM_CATE_SEQ = $('#selItemCateList').val();
	
	
	callServiceSync("getItemCateDetlList", 
				"admin/researchItem/selectItemCateDetlList", 
				dataSet, 
				"serviceCallback");
	
}


function getItemCateDetlAddList()
{

	var dataSet = {};
	
	dataSet.SEARCH_ITEM_CATE_SEQ = $('#selItemCate').val();
	
	callServiceSync("getItemCateDetlAddList", 
				"admin/researchItem/selectItemCateDetlList", 
				dataSet, 
				"serviceCallback");
	
}

function getSchemaList()
{
	var dataSet = {};
	
	callServiceSync("getSchemaList"
					,"admin/researchItem/selectCatalogSchemaList"
					,dataSet
					,"serviceCallback");
}


/**
 * 
 * @returns
 */
function getTableList()
{
	var dataSet = {
			
	};
	
	callServiceSync("getTableList"
					,"admin/researchItem/selectCatalogTableList"
					,dataSet
					,"serviceCallback");
}





function getItemMgmtTableList(){
	var dataSet = {};
	callServiceSync("getItemMgmtTableList"
					,"admin/researchItem/selectItemMgmtTableList"
					,dataSet
					,"serviceCallback");
}


function getItemMgmtColumnList(){
	var dataSet = {};
	
	dataSet.SEARCH_TABLE = $('#selUPPER_TABLE').val();
	
	callServiceSync("getItemMgmtColumnList"
					,"admin/researchItem/selectItemMgmtColumnList"
					,dataSet
					,"serviceCallback");
}


/**
 * 연구항목조회
 * @returns
 */
function getItemMgmtList()
{
	
	var tmpCheckYn = '';
	
	var sqlWhere = '';
	
	if(!$('#chkSEARCH_ALL_YN').prop('checked')){
		$('input[name=chkSEARCH_GBN_YN]:checkbox').each(function(idx){
			if($(this).prop('checked')){
				if(isNullOrEmpty(sqlWhere)){
					sqlWhere = ' AND ';
					sqlWhere += ' (';
					sqlWhere += $(this).val() + " = 'Y' ";
					
				}else{
					sqlWhere += ' OR ';
					sqlWhere += $(this).val() + " = 'Y' ";
				}
			}
			
		});
		
		if(!isNullOrEmpty(sqlWhere)){
			sqlWhere += ')';
		}
	}
	
	
	
	var dataSet = {
		SEARCH_ITEM_CATE_SEQ:$('#selItemCateList').val(),
		SEARCH_ITEM_CATE_DETL_SEQ:$('#selItemCateDetlList').val(),
		SEARCH_YN:sqlWhere
	};	
	
	
	callService("getItemMgmtList"
				,"admin/researchItem/selectItemMgmtList"
				,dataSet
				,"serviceCallback");
}

/**
 * 
 * @returns
 */
function getColumnList()
{
	var dataSet = {
			SEARCH_SCHEMA:$('#selAddSchemaList').val(),
			SEARCH_TABLE:$('#selAddTableList').val()
			
	};
	
	callService("getColumnList"
				,"admin/researchItem/selectCatalogColumnList"
				,dataSet
				,"serviceCallback");
}



/**
 * 
 * @returns
 */
function getItemMgmtView()
{
	var dataSet = {
		
			
	};	
	callService("getItemMgmtList"
				,"admin/researchItem/selectItemMgmtList"
				,dataSet
				,"serviceCallback");
}


/**
 * 연구항목수정
 * @returns
 */
function updateItemMgmt()
{
}



//------------------------------------------------------------------------------------------
//USER FUNCTION	
//------------------------------------------------------------------------------------------
function init()
{
	setComboList('selItemCate', gvItemCateList, 'SEQ', 'CATE_NM','','선택');
	setComboList('selItemCateDetl', gvItemCateDetlList, 'SEQ', 'CATE_NM','','선택');
	setComboList('selItemCateList', gvItemCateList, 'SEQ', 'CATE_NM','','전체');
	setComboList('selItemCateDetlList', gvItemCateDetlList, 'SEQ', 'CATE_NM','','전체');
	setComboList('selITEM_TYPE'			,gvItemTypeCdList	,'VALUE'	,'TEXT'		,'','선택');	//항목선택
	setComboList('selCHART_TYPE'			,gvChartTypeCdList	,'VALUE'	,'TEXT'		,'','선택');	//항목선택
	
	$('#txtORDER').inputmask({
		mask:'99999',
		placeholder: ' ',
        showMaskOnHover: false,
        showMaskOnFocus: false
	});   
	
	
//	var value = $('#selSchemaList').val();
	
//	var expr = 'jObj.SCHEMA === "' + value + '"';
	
//	optionFilter('selTableList', gvTableList, expr, 'TABLE', 'TABLE_COMMENT_ID','','전체');
	
	getItemMgmtList();
	
//	$('#chkSEARCH_ALL_YN').iCheck('check');
//	$('#chkSEARCH_SEARCH_YN').iCheck('check');
//	$('#chkSEARCH_GMEC_YN').iCheck('check');
//	$('#chkSEARCH_HCC_YN').iCheck('check');
//	$('#chkSEARCH_SYNONYM_YN').iCheck('check');
}

function setGrid()
{	
	
//	연구항목 그리드	
	gvDataSourceItemMgmt = {
	    datatype: "json",
	    datafields : [ 
	    	{
				name : 'SEQ',
				type : 'string'
			}, {
				name : 'ITEM_CATE_SEQ',
				type : 'string'
			}, { 
				name : 'ITEM_CATE_DETL_SEQ',
				type : 'string'
			}, {
				name : 'ITEM_CATE_NM',
				type : 'string'
			}, { 
				name : 'ITEM_CATE_DETL_NM',
				type : 'string'
			}, {
				name : 'ITEM_ID',//'ordinal_position',
				type : 'string'
			}, {
				name : 'ITEM_NM',
				type : 'string'
			}, {
				name : 'ITEM_DESC',
				type : 'string'
			}, {
				name : 'ORDER',
				type : 'string'
			}, {
				name : 'DEFAULT_YN',
				type : 'string'
			}, {
				name : 'ITEM_TYPE',
				type : 'string'
			}, {
				name : 'CHART_TYPE',
				type : 'string'
			}, {
				name : 'FREQ',
				type : 'string'
			}, {
				name : 'ITEM_COLUMN',
				type : 'string'
			}, {
				name : 'ITEM_LABEL',
				type : 'string'
			}, {
				name : 'ORIGIN_SQL',
				type : 'string'
			}, {
				name : 'EXEC_SQL',
				type : 'string'
			}, {
				name : 'UDT_DT',
				type : 'date'
			} 
		],
	    cache: false,
	    localdata: gvResearchItemList,
	    updaterow: function (rowid, newdata, commit) {
	    	newdata.UDT_ID = $.session.get('PER_CODE');
	    	
	    	commit(true);
	    	
			callService("updateItemMgmtOrder" 
						,"admin/researchItem/updateItemMgmt"
						,newdata
						,"serviceCallback");
        },
	    processdata: function(data){
	    }
	};
	
	gvDataAdapterItemMgmt = new $.jqx.dataAdapter(gvDataSourceItemMgmt, {
		loadError: function(xhr, status, error){
			alert(error);
		}
	});
	
	
	$("#jqxResearchItemList").jqxGrid({
		width : '100%',
		height : 500,
		source : gvDataAdapterItemMgmt,
		autoheight : false,
		sortable : true,
		altrows : true,
		enabletooltips : false,
		editable : false,
		showfilterrow : true,
		filterable : true,
		selectionmode : 'singlerow',
		columnsresize: true,
		theme: 'bootstrap',
		pageable: true,
		pagesize: 100,
		pagesizeoptions: ['10', '20', '30', '50', '100'], 
		columns : [
			{ 	text : '대분류', 	datafield : 'ITEM_CATE_NM', 	width : '15%'},
			{ 	text : '중분류', 	datafield : 'ITEM_CATE_DETL_NM', 	width : '15%'},
			{ 	text : '아이템ID', 		datafield : 'ITEM_ID', 	width : '20%', 	cellclassname:'gridCellLink'},
			{ 	text : '아이템명', 	datafield : 'ITEM_NM', 	width : '20%'},
//			{ 	text : '아이템타입', 	datafield : 'ITEM_TYPE', 	width : '8%'},
//			{ 	text : '차트타입', 	datafield : 'CHART_TYPE', 	width : '8%'},
			{ 	text : "수정일자", 	datafield : 'UDT_DT', 	cellsformat:'yyyy-MM-dd',	cellsalign:'center', 	width : '12%' 	 },
			{ 	text : '기본여부', 	datafield : 'DEFAULT_YN', 	width : '8%' ,	cellsalign:'center',
				cellclassname:function(row, columnfield, value){
					if(value === 'Y'){
						return "green";
					}else{
						return "background-color:#c0c0c0;";
					}
				}
			},{ 	text : '표시순서', 	datafield : 'ORDER', 	width : '10%' ,	cellsalign:'center',
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
}

$(document).on('click','.btnOrderUp',function(){
	if(isNull($('#selItemCateList').val())){
		showAlert('항목 순서변경','표시순서 변경전에 대분류를 선택하시기 바랍니다.',null);
		return;
	}
	
	console.log($('#selItemCateList').val());
	
	if($('#selItemCateList').val() == '4'){
		if(!isNull($('#selItemCateDetlList').val())){
			showAlert('항목 순서변경','대분류가 Dashboard Chart일 경우에는 대분류에서만 표시순서를 변경할 수 있습니다.',null);
			return;
		}
	}else {
		if(isNull($('#selItemCateDetlList').val())){
			showAlert('항목 순서변경','표시순서 변경전에 대분류, 중분류를 선택하시기 바랍니다.',null);
			return;
		}
	}
	
	var position = $("#jqxResearchItemList").jqxGrid('scrollposition');
	
	gvPageScrollXPos = position.left;
	gvPageScrollYPos = position.top;
	
	gvItemMgmtSeq = $("#jqxResearchItemList").upRow();
	
	
	
});

$(document).on('click','.btnOrderDown',function(){
	if(isNull($('#selItemCateList').val())){
		showAlert('항목 순서변경','표시순서 변경전에 대분류를 선택하시기 바랍니다.',null);
		return;
	}
	
	console.log($('#selItemCateList').val());
	
	if($('#selItemCateList').val() == '4'){
		if(!isNull($('#selItemCateDetlList').val())){
			showAlert('항목 순서변경','대분류가 Dashboard Chart일 경우에는  대분류에서만 표시순서를 변경할 수 있습니다.',null);
			return;
		}
	}else {
		if(isNull($('#selItemCateDetlList').val())){
			showAlert('항목 순서변경','표시순서 변경전에 대분류, 중분류를 선택하시기 바랍니다.',null);
			return;
		}
	}
	
	var position = $("#jqxResearchItemList").jqxGrid('scrollposition');
	
	gvPageScrollXPos = position.left;
	gvPageScrollYPos = position.top;
	
	
	gvItemMgmtSeq = $("#jqxResearchItemList").downRow();
});

function optionFilter(elem, dataSet, expr, value, text, defaultValue, defaultText)
{
	var optionList = [];
	
	$.each(dataSet, function(key,jObj){
		if(eval(expr)){
			var ds = {};
			
			ds.VALUE 	= jObj.TABLE;
			ds.TEXT 	= jObj.TABLE_COMMENT_ID;
			
			optionList.push(ds);
		}
	});
	
	setComboList(elem, optionList, 'VALUE', 'TEXT', defaultValue, defaultText);
	
}

var changeSelITEM_TYPE = function(val){
	if(val == "TEX"){	//텍스트일 경우
		$('#chkPOPUP_YN').iCheck('enable');										//팝업여부 enable
		$('#chkPOPUP_YN').iCheck('uncheck');									//팝업여부 해제
		$('#selPOPUP_PROGRAM_ID option:eq(0)').prop('selected','selected');		//팝업선택 초기화
		$('#selPOPUP_PROGRAM_ID').prop('disabled', true);						//팝업선택 disable
		$('#selUPPER_TABLE option:eq(0)').prop('selected','selected');			//상위테이블 초기화
		$('#selUPPER_TABLE').prop('disabled', true);							//상위테이블 disable
		$('#selUPPER_COLUMN option').remove();									//상위컬럼 초기화
		$('#selUPPER_COLUMN').append('<option>선택</option>');
		$('#selUPPER_COLUMN').prop('disabled', true);							//상위컬럼 disable
		$('#rdoCODE_TYPE_SQL').iCheck('uncheck');								//기준코드SQL 해제
		$('#rdoCODE_TYPE_JSN').iCheck('uncheck');								//기준코드JSON 해제
		$('#rdoCODE_TYPE_NON').iCheck('uncheck');								//기준코드직접입력 해제
		$('#rdoCODE_TYPE_SQL').iCheck('disable');								//기준코드SQL disable
		$('#rdoCODE_TYPE_JSN').iCheck('disable');								//기준코드JSON disable
		$('#rdoCODE_TYPE_NON').iCheck('disable');								//기준코드직접입력 disable
		$('#txtCODE_SET').val('');												//코드관리 초기화
		$('#txtCODE_SET').prop('placeholder','');								//코드관리placeholder 초기화
		$('#txtCODE_SET').prop('disabled', true);								//코드관리 disable
		$('#txtPOPUP_COLUMN').val('');											//코드컬럼 초기화
		$('#txtPOPUP_COLUMN').prop('disabled', true);							//코드컬럼 disable
	}else if(val == "NUM" || val == "DAT"){	//숫자,날짜일 경우
		$('#chkPOPUP_YN').iCheck('disable');									//팝업여부 disable
		$('#chkPOPUP_YN').iCheck('uncheck');									//팝업여부 해제
		$('#selPOPUP_PROGRAM_ID option:eq(0)').prop('selected','selected');		//팝업선택 초기화
		$('#selPOPUP_PROGRAM_ID').prop('disabled', true);						//팝업선택 disable
		$('#selUPPER_TABLE option:eq(0)').prop('selected','selected');			//상위테이블 초기화
		$('#selUPPER_TABLE').prop('disabled', true);							//상위테이블 disable
		$('#selUPPER_COLUMN option').remove();									//상위컬럼 초기화
		$('#selUPPER_COLUMN').append('<option>선택</option>');
		$('#selUPPER_COLUMN').prop('disabled', true);							//상위컬럼 disable
		$('#rdoCODE_TYPE_SQL').iCheck('uncheck');								//기준코드SQL 해제
		$('#rdoCODE_TYPE_JSN').iCheck('uncheck');								//기준코드JSON 해제
		$('#rdoCODE_TYPE_NON').iCheck('uncheck');								//기준코드직접입력 해제
		$('#rdoCODE_TYPE_SQL').iCheck('disable');								//기준코드SQL disable
		$('#rdoCODE_TYPE_JSN').iCheck('disable');								//기준코드JSON disable
		$('#rdoCODE_TYPE_NON').iCheck('disable');								//기준코드직접입력 disable
		$('#txtCODE_SET').val('');												//코드관리 초기화
		$('#txtCODE_SET').prop('placeholder','');								//코드관리placeholder 초기화
		$('#txtCODE_SET').prop('disabled', true);								//코드관리 disable
		$('#txtPOPUP_COLUMN').val('');											//코드컬럼 초기화
		$('#txtPOPUP_COLUMN').prop('disabled', true);							//코드컬럼 disable
	}else if(val == "COD"){								//코드일 경우
		$('#chkPOPUP_YN').iCheck('enable');										//팝업여부 enable
		$('#chkPOPUP_YN').iCheck('uncheck');									//팝업여부 해제
		$('#selPOPUP_PROGRAM_ID option:eq(0)').prop('selected','selected');		//팝업선택 초기화
		$('#selPOPUP_PROGRAM_ID').prop('disabled', true);						//팝업선택 disable
		$('#selUPPER_TABLE option:eq(0)').prop('selected','selected');			//상위테이블 초기화
		$('#selUPPER_TABLE').prop('disabled', true);							//상위테이블 disable
		$('#selUPPER_COLUMN option').remove();									//상위컬럼 초기화
		$('#selUPPER_COLUMN').append('<option>선택</option>');
		$('#selUPPER_COLUMN').prop('disabled', true);							//상위컬럼 disable
		$('#rdoCODE_TYPE_SQL').iCheck('uncheck');								//기준코드SQL 해제
		$('#rdoCODE_TYPE_JSN').iCheck('check');									//기준코드JSON 해제
		$('#rdoCODE_TYPE_NON').iCheck('uncheck');								//기준코드직접입력 해제
		$('#rdoCODE_TYPE_SQL').iCheck('disable');								//기준코드SQL disable
		$('#rdoCODE_TYPE_JSN').iCheck('enable');								//기준코드JSON enable
		$('#rdoCODE_TYPE_NON').iCheck('enable');								//기준코드직접입력 enable
		$('#txtCODE_SET').val('');												//코드관리 초기화
		//$('#txtCODE_SET').prop('placeholder','');								//코드관리placeholder 초기화
		$('#txtCODE_SET').prop('disabled', false);								//코드관리 enable
		$('#txtPOPUP_COLUMN').val('');											//코드컬럼 초기화
		$('#txtPOPUP_COLUMN').prop('disabled', true);							//코드컬럼 disable
	}else{				//선택 일 경우
		$('#chkPOPUP_YN').iCheck('enable');										//팝업여부 enable
		$('#chkPOPUP_YN').iCheck('uncheck');									//팝업여부 해제
		$('#selPOPUP_PROGRAM_ID option:eq(0)').prop('selected','selected');		//팝업선택 초기화
		$('#selPOPUP_PROGRAM_ID').prop('disabled', false);						//팝업선택 enable
		$('#selUPPER_TABLE option:eq(0)').prop('selected','selected');			//상위테이블 초기화
		$('#selUPPER_TABLE').prop('disabled', false);							//상위테이블 enable
		$('#selUPPER_COLUMN option').remove();									//상위컬럼 초기화
		$('#selUPPER_COLUMN').append('<option>선택</option>');
		$('#selUPPER_COLUMN').prop('disabled', false);							//상위컬럼 enable
		$('#rdoCODE_TYPE_SQL').iCheck('uncheck');								//기준코드SQL 해제
		$('#rdoCODE_TYPE_JSN').iCheck('uncheck');								//기준코드JSON 해제
		$('#rdoCODE_TYPE_NON').iCheck('uncheck');								//기준코드직접입력 해제
		$('#rdoCODE_TYPE_SQL').iCheck('enable');								//기준코드SQL enable
		$('#rdoCODE_TYPE_JSN').iCheck('enable');								//기준코드JSON enable
		$('#rdoCODE_TYPE_NON').iCheck('enable');								//기준코드직접입력 enable
		$('#txtCODE_SET').val('');												//코드관리 초기화
		$('#txtCODE_SET').prop('placeholder','');								//코드관리placeholder 초기화
		$('#txtCODE_SET').prop('disabled', false);								//코드관리 enable
		$('#txtPOPUP_COLUMN').val('');											//코드컬럼 초기화
		$('#txtPOPUP_COLUMN').prop('disabled', false);							//코드컬럼 enable
	}
}

var changeChkPOPUP_TYPE = function(val){
	if(val == "TEX"){	//텍스트일 경우
		$('#selPOPUP_PROGRAM_ID option[value=P_SYNONYM]').prop('selected','selected');		//팝업선택 P_SYNONYM
		$('#selPOPUP_PROGRAM_ID').prop('disabled', true);						//팝업선택 disable
		$('#selUPPER_TABLE option:eq(0)').prop('selected','selected');			//상위테이블 초기화
		$('#selUPPER_TABLE').prop('disabled', true);							//상위테이블 disable
		$('#selUPPER_COLUMN option').remove();									//상위컬럼 초기화
		$('#selUPPER_COLUMN').append('<option>선택</option>');
		$('#selUPPER_COLUMN').prop('disabled', true);							//상위컬럼 disable
		$('#rdoCODE_TYPE_SQL').iCheck('uncheck');								//기준코드SQL 해제
		$('#rdoCODE_TYPE_JSN').iCheck('uncheck');								//기준코드JSON 해제
		$('#rdoCODE_TYPE_NON').iCheck('uncheck');								//기준코드직접입력 해제
		$('#rdoCODE_TYPE_SQL').iCheck('disable');								//기준코드SQL disable
		$('#rdoCODE_TYPE_JSN').iCheck('disable');								//기준코드JSON disable
		$('#rdoCODE_TYPE_NON').iCheck('disable');								//기준코드직접입력 disable
		$('#txtCODE_SET').val('');												//코드관리 초기화
		$('#txtCODE_SET').prop('placeholder','');								//코드관리placeholder 초기화
		$('#txtCODE_SET').prop('disabled', true);								//코드관리 disable
		$('#txtPOPUP_COLUMN').val('');											//코드컬럼 초기화
		$('#txtPOPUP_COLUMN').prop('disabled', true);							//코드컬럼 disable
	}else if(val == "COD"){								//코드일 경우
		$('#selPOPUP_PROGRAM_ID option:eq(0)').prop('selected','selected');		//팝업선택 초기화
		$('#selPOPUP_PROGRAM_ID').prop('disabled', false);						//팝업선택 enable
		$('#selUPPER_TABLE option:eq(0)').prop('selected','selected');			//상위테이블 초기화
		$('#selUPPER_TABLE').prop('disabled', true);							//상위테이블 disable
		$('#selUPPER_COLUMN option').remove();									//상위컬럼 초기화
		$('#selUPPER_COLUMN').append('<option>선택</option>');
		$('#selUPPER_COLUMN').prop('disabled', true);							//상위컬럼 disable
		$('#rdoCODE_TYPE_SQL').iCheck('uncheck');								//기준코드SQL 해제
		$('#rdoCODE_TYPE_JSN').iCheck('check');									//기준코드JSON 해제
		$('#rdoCODE_TYPE_NON').iCheck('uncheck');								//기준코드직접입력 해제
		$('#rdoCODE_TYPE_SQL').iCheck('disable');								//기준코드SQL disable
		$('#rdoCODE_TYPE_JSN').iCheck('enable');								//기준코드JSON enable
		$('#rdoCODE_TYPE_NON').iCheck('enable');								//기준코드직접입력 enable
		$('#txtCODE_SET').val('');												//코드관리 초기화
		//$('#txtCODE_SET').prop('placeholder','');								//코드관리placeholder 초기화
		$('#txtCODE_SET').prop('disabled', false);								//코드관리 enable
		$('#txtPOPUP_COLUMN').val('');											//코드컬럼 초기화
		$('#txtPOPUP_COLUMN').prop('disabled', true);							//코드컬럼 disable
	}
}

var changeUnChkPOPUP_TYPE = function(val){
	if(val == "TEX"){	//텍스트일 경우
		$('#selPOPUP_PROGRAM_ID option:eq(0)').prop('selected','selected');		//팝업선택 초기화
		$('#selPOPUP_PROGRAM_ID').prop('disabled', true);						//팝업선택 disable
		$('#selUPPER_TABLE option:eq(0)').prop('selected','selected');			//상위테이블 초기화
		$('#selUPPER_TABLE').prop('disabled', true);							//상위테이블 disable
		$('#selUPPER_COLUMN option').remove();									//상위컬럼 초기화
		$('#selUPPER_COLUMN').append('<option>선택</option>');
		$('#selUPPER_COLUMN').prop('disabled', true);							//상위컬럼 disable
		$('#rdoCODE_TYPE_SQL').iCheck('uncheck');								//기준코드SQL 해제
		$('#rdoCODE_TYPE_JSN').iCheck('uncheck');								//기준코드JSON 해제
		$('#rdoCODE_TYPE_NON').iCheck('uncheck');								//기준코드직접입력 해제
		$('#rdoCODE_TYPE_SQL').iCheck('disable');								//기준코드SQL disable
		$('#rdoCODE_TYPE_JSN').iCheck('disable');								//기준코드JSON disable
		$('#rdoCODE_TYPE_NON').iCheck('disable');								//기준코드직접입력 disable
		$('#txtCODE_SET').val('');												//코드관리 초기화
		$('#txtCODE_SET').prop('placeholder','');								//코드관리placeholder 초기화
		$('#txtCODE_SET').prop('disabled', true);								//코드관리 disable
		$('#txtPOPUP_COLUMN').val('');											//코드컬럼 초기화
		$('#txtPOPUP_COLUMN').prop('disabled', true);							//코드컬럼 disable
	}else if(val == "COD"){								//코드일 경우
		$('#selPOPUP_PROGRAM_ID option:eq(0)').prop('selected','selected');		//팝업선택 초기화
		$('#selPOPUP_PROGRAM_ID').prop('disabled', true);						//팝업선택 disable
		$('#selUPPER_TABLE option:eq(0)').prop('selected','selected');			//상위테이블 초기화
		$('#selUPPER_TABLE').prop('disabled', true);							//상위테이블 disable
		$('#selUPPER_COLUMN option').remove();									//상위컬럼 초기화
		$('#selUPPER_COLUMN').append('<option>선택</option>');
		$('#selUPPER_COLUMN').prop('disabled', true);							//상위컬럼 disable
		$('#rdoCODE_TYPE_SQL').iCheck('uncheck');								//기준코드SQL 해제
		$('#rdoCODE_TYPE_JSN').iCheck('check');									//기준코드JSON 해제
		$('#rdoCODE_TYPE_NON').iCheck('uncheck');								//기준코드직접입력 해제
		$('#rdoCODE_TYPE_SQL').iCheck('disable');								//기준코드SQL disable
		$('#rdoCODE_TYPE_JSN').iCheck('enable');								//기준코드JSON enable
		$('#rdoCODE_TYPE_NON').iCheck('enable');								//기준코드직접입력 enable
		$('#txtCODE_SET').val('');												//코드관리 초기화
		//$('#txtCODE_SET').prop('placeholder','');								//코드관리placeholder 초기화
		$('#txtCODE_SET').prop('disabled', false);								//코드관리 enable
		$('#txtPOPUP_COLUMN').val('');											//코드컬럼 초기화
		$('#txtPOPUP_COLUMN').prop('disabled', true);							//코드컬럼 disable
	}
}

var changeSelPopupPROGRAM_TYPE = function(val){
	if(val == "P_COMMON_CODE" || val == "P_COMMON_CODE_KEY" || val == "P_COMMON_CODE_1H" || val == "P_COMMON_CODE_1HT" || val == "P_COMMON_CODE_1HT_MR"){								//코드일 경우
		$('#selUPPER_TABLE option:eq(0)').prop('selected','selected');			//상위테이블 초기화
		$('#selUPPER_TABLE').prop('disabled', true);							//상위테이블 disable
		$('#selUPPER_COLUMN option').remove();									//상위컬럼 초기화
		$('#selUPPER_COLUMN').append('<option>선택</option>');
		$('#selUPPER_COLUMN').prop('disabled', true);							//상위컬럼 disable
		$('#rdoCODE_TYPE_SQL').iCheck('check');									//기준코드SQL 해제
		$('#rdoCODE_TYPE_JSN').iCheck('uncheck');								//기준코드JSON 해제
		$('#rdoCODE_TYPE_NON').iCheck('uncheck');								//기준코드직접입력 해제
		$('#rdoCODE_TYPE_SQL').iCheck('enable');								//기준코드SQL enable
		$('#rdoCODE_TYPE_JSN').iCheck('disable');								//기준코드JSON enable
		$('#rdoCODE_TYPE_NON').iCheck('disable');								//기준코드직접입력 enable
		$('#txtCODE_SET').val('');												//코드관리 초기화
		//$('#txtCODE_SET').prop('placeholder','');								//코드관리placeholder 초기화
		$('#txtCODE_SET').prop('disabled', false);								//코드관리 enable
		$('#txtPOPUP_COLUMN').val('');											//코드컬럼 초기화
		$('#txtPOPUP_COLUMN').prop('disabled', false);							//코드컬럼 enable
	}else if(val == "P_COMMON_CODE_2H" || val == "P_COMMON_CODE_3H" || val == "P_COMMON_CODE_2HT" || val == "P_COMMON_CODE_3HT" || val == "P_COMMON_CODE_2HT_MR"){
		$('#selUPPER_TABLE option:eq(0)').prop('selected','selected');			//상위테이블 초기화
		$('#selUPPER_TABLE').prop('disabled', false);							//상위테이블 enable
		$('#selUPPER_COLUMN option').remove();									//상위컬럼 초기화
		$('#selUPPER_COLUMN').append('<option>선택</option>');
		$('#selUPPER_COLUMN').prop('disabled', false);							//상위컬럼 enable
		$('#rdoCODE_TYPE_SQL').iCheck('check');									//기준코드SQL 해제
		$('#rdoCODE_TYPE_JSN').iCheck('uncheck');								//기준코드JSON 해제
		$('#rdoCODE_TYPE_NON').iCheck('uncheck');								//기준코드직접입력 해제
		$('#rdoCODE_TYPE_SQL').iCheck('enable');								//기준코드SQL enable
		$('#rdoCODE_TYPE_JSN').iCheck('disable');								//기준코드JSON enable
		$('#rdoCODE_TYPE_NON').iCheck('disable');								//기준코드직접입력 enable
		$('#txtCODE_SET').val('');												//코드관리 초기화
		//$('#txtCODE_SET').prop('placeholder','');								//코드관리placeholder 초기화
		$('#txtCODE_SET').prop('disabled', false);								//코드관리 enable
		$('#txtPOPUP_COLUMN').val('');											//코드컬럼 초기화
		$('#txtPOPUP_COLUMN').prop('disabled', false);							//코드컬럼 enable
	}else if(val == "P_COMMON_CODE_3HT_MR"){
		$('#selUPPER_TABLE option:eq(0)').prop('selected','selected');			//상위테이블 초기화
		$('#selUPPER_TABLE').prop('disabled', false);							//상위테이블 enable
		$('#selUPPER_COLUMN option').remove();									//상위컬럼 초기화
		$('#selUPPER_COLUMN').append('<option>선택</option>');
		$('#selUPPER_COLUMN').prop('disabled', false);							//상위컬럼 enable
		$('#rdoCODE_TYPE_SQL').iCheck('uncheck');								//기준코드SQL 해제
		$('#rdoCODE_TYPE_JSN').iCheck('uncheck');								//기준코드JSON 해제
		$('#rdoCODE_TYPE_NON').iCheck('uncheck');								//기준코드직접입력 해제
		$('#rdoCODE_TYPE_SQL').iCheck('disable');								//기준코드SQL disable
		$('#rdoCODE_TYPE_JSN').iCheck('disable');								//기준코드JSON disable
		$('#rdoCODE_TYPE_NON').iCheck('disable');								//기준코드직접입력 disable
		$('#txtCODE_SET').val('');												//코드관리 초기화
		$('#txtCODE_SET').prop('placeholder','');								//코드관리placeholder 초기화
		$('#txtCODE_SET').prop('disabled', true);								//코드관리 disable
		$('#txtPOPUP_COLUMN').val('');											//코드컬럼 초기화
		$('#txtPOPUP_COLUMN').prop('disabled', true);							//코드컬럼 disable
	}else if(val == "P_ORDR_CODE" || val == "P_DISINX" || val == "P_SYNONYM"){
		$('#selUPPER_TABLE option:eq(0)').prop('selected','selected');			//상위테이블 초기화
		$('#selUPPER_TABLE').prop('disabled', true);							//상위테이블 disable
		$('#selUPPER_COLUMN option').remove();									//상위컬럼 초기화
		$('#selUPPER_COLUMN').append('<option>선택</option>');
		$('#selUPPER_COLUMN').prop('disabled', true);							//상위컬럼 disable
		$('#rdoCODE_TYPE_SQL').iCheck('uncheck');								//기준코드SQL 해제
		$('#rdoCODE_TYPE_JSN').iCheck('uncheck');								//기준코드JSON 해제
		$('#rdoCODE_TYPE_NON').iCheck('uncheck');								//기준코드직접입력 해제
		$('#rdoCODE_TYPE_SQL').iCheck('disable');								//기준코드SQL disable
		$('#rdoCODE_TYPE_JSN').iCheck('disable');								//기준코드JSON disable
		$('#rdoCODE_TYPE_NON').iCheck('disable');								//기준코드직접입력 disable
		$('#txtCODE_SET').val('');												//코드관리 초기화
		$('#txtCODE_SET').prop('placeholder','');								//코드관리placeholder 초기화
		$('#txtCODE_SET').prop('disabled', true);								//코드관리 disable
		$('#txtPOPUP_COLUMN').val('');											//코드컬럼 초기화
		$('#txtPOPUP_COLUMN').prop('disabled', true);							//코드컬럼 disable
	}else{
		$('#selUPPER_TABLE option:eq(0)').prop('selected','selected');			//상위테이블 초기화
		$('#selUPPER_TABLE').prop('disabled', true);							//상위테이블 disable
		$('#selUPPER_COLUMN option').remove();									//상위컬럼 초기화
		$('#selUPPER_COLUMN').append('<option>선택</option>');
		$('#selUPPER_COLUMN').prop('disabled', true);							//상위컬럼 disable
		$('#rdoCODE_TYPE_SQL').iCheck('uncheck');								//기준코드SQL 해제
		$('#rdoCODE_TYPE_JSN').iCheck('check');									//기준코드JSON 해제
		$('#rdoCODE_TYPE_NON').iCheck('uncheck');								//기준코드직접입력 해제
		$('#rdoCODE_TYPE_SQL').iCheck('disable');								//기준코드SQL disable
		$('#rdoCODE_TYPE_JSN').iCheck('enable');								//기준코드JSON enable
		$('#rdoCODE_TYPE_NON').iCheck('enable');								//기준코드직접입력 enable
		$('#txtCODE_SET').val('');												//코드관리 초기화
		//$('#txtCODE_SET').prop('placeholder','');								//코드관리placeholder 초기화
		$('#txtCODE_SET').prop('disabled', false);								//코드관리 enable
		$('#txtPOPUP_COLUMN').val('');											//코드컬럼 초기화
		$('#txtPOPUP_COLUMN').prop('disabled', true);							//코드컬럼 disable
	}
}

var changeChkCODE_TYPE = function(val){
	/*if(val == "SQL"){	//코드관리가 SQL일경우
		$('#txtPOPUP_COLUMN').prop('disabled', false);
		
	}else{								
		$('#txtPOPUP_COLUMN').prop('disabled', true);
		
	}*/
}

//------------------------------------------------------------------------------------------
//	EVENT	
//------------------------------------------------------------------------------------------
/**
 * 이벤트 초기화
 * @returns
 */
function initEvent(){
//	대분류선택
	$('#selItemCateList').on('change',function(e){
		getItemCateDetlList();
		getItemMgmtList();
		
	});
	
//	중분류선택	
	$('#selItemCateDetlList').on('change',function(e){
		getItemMgmtList();
		
	});
	
//	등록화면-대분류 선택	
	$('#selItemCate').on('change',function(e){
		getItemCateDetlAddList();
		
	});
	
	
	
	$('#txtSEARCH_VAL').on('keypress',function(e){
		if( e.keyCode === 13){
			getItemMgmtList();
			
		}
	});
	
	$("#jqxResearchItemList").bind("pagechanged", function (event) {
	    var args = event.args;
	    var pagenumber = args.pagenum;
	    var pagesize = args.pagesize;
	});



	$("#jqxResearchItemList").bind("pagesizechanged", function (event) {
	    var args = event.args;
	    var pagenumber = args.pagenum;
	    var pagesize = args.pagesize;
	});
	
	
	
//	연구항목등록
	$('#btnRegistItemMgmt').on('click',function(e)
	{
		if(isNullOrEmpty($('#selItemCate').val())){
			showAlert('항목등록','대분류는 필수항목입니다.',null);
			return;
		}
		
		if(isNullOrEmpty($('#selItemCateDetl').val())){
			showAlert('항목등록','중분류는 필수항목입니다.',null);
			return;
		}
		
		if(isNullOrEmpty($('#valITEM_ID').val())){
			showAlert('항목등록','항목ID는 필수항목입니다.',null);
			return;
		}
		
		if(isNullOrEmpty($('#valITEM_NM').val())){
			showAlert('항목등록','항목명은 필수항목입니다.',null);
			return;
			
		}
		
		var dataSet = {
			ITEM_CATE_SEQ:$('#selItemCate').val(),
			ITEM_CATE_DETL_SEQ:$('#selItemCateDetl').val(),
			ITEM_ID:$('#valITEM_ID').val(),
			ITEM_NM:$('#valITEM_NM').val(),
			ITEM_DESC:$('#valITEM_DESC').val(),
			UDT_ID:$.session.get('PER_CODE'),
			CRT_ID:$.session.get('PER_CODE')
				
		};
		
		callService("insertItemMgmt"
					,"admin/researchItem/insertItemMgmt"
					,dataSet
					,"serviceCallback");
		
		
	});
	
	$("#jqxResearchItemList").on("cellclick", function(event) {
		var args = event.args;
	    var rowBoundIndex = args.rowindex;
	    var columnindex = args.columnindex;
	    var dataField = args.datafield;
	    var value = args.value;
	    
	    
	    if(dataField !== 'COLUMN' && dataField !== 'COLUMN_COMMENT'){
	    	return;
	    	
	    }
	    var data = $("#jqxResearchItemList").jqxGrid('getrowdata', rowBoundIndex);
	    var dataSet = {};
		
		dataSet.SEARCH_SEQ = data.SEQ;
		dataSet.SEARCH_SCHEMA = data.SCHEMA;
		dataSet.SEARCH_TABLE = data.TABLE;
		
		callServiceSync("getColumnDateList"
				,"admin/researchItem/selectCatalogColumnDateList"
				,dataSet
				,"serviceCallback");
		
		
		callServiceSync("selectItemMgmtView"
					,"admin/researchItem/selectItemMgmtView"
					,dataSet
					,"serviceCallback");
		
		var dlg = $('#itemMgmtUpdModal').modal();
		dlg.find('.modal-title').text('항목수정');
		dlg.modal('show');
		
		
	});
	
	
	
	/**
	 * 연구항목 추가 스키마 목록
	 */
	$('#selAddSchemaList').on('change',function(e){
		var expr = 'jObj.SCHEMA === "' + $(this).val() + '"';
		
		optionFilter('selAddTableList', gvTableList, expr, 'TABLE', 'TABLE','','선택');
		
	});
	
	/**
	 * 연구항목 추가 테이블 목록
	 */
	$('#selAddTableList').on('change',function(e){
		getColumnList();
		
	});
	
	
	/**
	 * 연구항목추가 모달 호출
	 */
	$('#btnAdd').on('click',function(e){
		var value = '';
		var expr  = '';
		
		gvColumnList = [];
		
		setComboList('selItemCate', gvItemCateList, 'SEQ', 'CATE_NM','','선택');
		setComboList('selItemCateDetl', gvItemCateDetlList, 'SEQ', 'CATE_NM','','선택');
		setComboList('selAddSchemaList', gvSchemaList, 'SCHEMA', 'SCHEMA','','선택');
		setComboList('selAddTableList', gvTableList, 'TABLE', 'TABLE','','선택');
		setComboList('selColumnList', gvColumnList, 'COLUMN', 'COLUMN','','선택');
		
		value = $('#selAddSchemaList').val();
		expr  = 'jObj.SCHEMA === "' + value + '"';
		
		optionFilter('selAddTableList', gvTableList, expr, 'TABLE', 'TABLE','','선택');
		
		var dlg = $("#itemMgmtAddModal").modal({
			handle: ".modal-header"
		});
		dlg.title = "항목등록";
		dlg.modal('show');
		
	});
	
	/**
	 * 연구항목수정 모달 호출
	 */
	$('#btnUpd').on('click',function(e){
		gvCommand = 'U';
		
		var rowindex = -1;
		var data = {};
				
		rowindex = $('#jqxResearchItemList').jqxGrid('getselectedrowindex');
		
		if(rowindex < 0){
			showAlert(null,'선택된 정보가 없습니다.',null);
			return;
		}
		
		data = $('#jqxResearchItemList').jqxGrid('getrowdata',rowindex);
		
		var dataSet = {};
		
		dataSet.SEARCH_SEQ = data.SEQ;
		dataSet.SEARCH_SCHEMA = data.SCHEMA;
		dataSet.SEARCH_TABLE = data.TABLE;
		
		callServiceSync("getColumnDateList"
				,"admin/researchItem/selectCatalogColumnDateList"
				,dataSet
				,"serviceCallback");
		
		
		callServiceSync("selectItemMgmtView"
					,"admin/researchItem/selectItemMgmtView"
					,dataSet
					,"serviceCallback");
		
		
		var dlg = $('#itemMgmtUpdModal').modal();
		dlg.find('.modal-title').text('항목수정');
		dlg.modal('show');
		
		
	});

	// 항목 삭제
	$('#btnDel').on('click',function(e){
		var rowindex = -1;
		var data = {};
				
		rowindex = $('#jqxResearchItemList').jqxGrid('getselectedrowindex');
		
		if(rowindex < 0){
			showAlert('항목 삭제',COM_0031,null);
			return;
		}
		
		data = $('#jqxResearchItemList').jqxGrid('getrowdata',rowindex);
		
		var dataSet = {};
		
		dataSet.SEQ = data.SEQ;
		
		callService("deleteItemMgmt"
					,"admin/researchItem/deleteItemMgmt"
					,dataSet
					,"serviceCallback");
	});
	
	
	//	항목 수정
	$('#btnUpdateItemMgmt').on('click',function(e){
		
		//연구항목명 체크
		if(isNull($('#txtITEM_NM').val())){
			showAlert("항목수정","항목명은 " + COM_0010,null);			//연구항목명은 필수항목입니다.
			$('#txtITEM_NM').focus();
			return;
		}
		
		//데이터타입에 따른 코드관리 유효성 체크
		if(isNull($('#selITEM_TYPE').val())){
			showAlert("항목수정","데이터타입은 " + COM_0010,null);			//데이터타입은 필수항목입니다.
			$('#selITEM_TYPE').focus();
			return;
		}
		
		var dataSet = {};
		
		dataSet.SEQ 				= $('#txtSEQ').val();
//		dataSet.ITEM_ID 			= $('#txtITEM_ID').val();
		dataSet.ITEM_NM 			= $('#txtITEM_NM').val();
		dataSet.ITEM_DESC 			= $('#txtITEM_DESC').val();
//		dataSet.SEARCH_YN 			= iif($('#chkSEARCH_YN:checked').val() === 'on', 'Y','N');
		dataSet.DEFAULT_YN 			= iif($('#chkDEFAULT_YN:checked').val() === 'on', 'Y','N');
		
		dataSet.ITEM_TYPE 			= $('#selITEM_TYPE').val();
		dataSet.CHART_TYPE 			= $('#selCHART_TYPE').val();
		dataSet.FREQ 				= $('#txtFREQ').val();
		dataSet.ITEM_COLUMN			= $('#txtITEM_COLUMN').val();
		dataSet.ITEM_LABEL			= $('#txtITEM_LABEL').val();
		dataSet.EXEC_SQL			= $('#txtEXEC_SQL').val();
		dataSet.ORIGINAL_SQL		= $('#txtORIGINAL_SQL').val();
		
		dataSet.UDT_ID 				= $.session.get('PER_CODE');
		
		console.log(dataSet);
		
		callService("updateItemMgmt"
					,"admin/researchItem/updateItemMgmt"
					,dataSet
					,"serviceCallback");		
	});	
	
	// '초기화'
	$('#btnInitSearch').on('click',function(e){
		setComboList('selItemCateList', gvItemCateList, 'SEQ', 'CATE_NM','','전체');
		setComboList('selItemCateDetlList', gvItemCateDetlList, 'SEQ', 'CATE_NM','','전체');
		optionFilter('selItemCateDetlList', gvItemCateDetlList, "ITEM_CATE_SEQ=''", 'SEQ', 'CATE_NM','','전체');
		getItemMgmtList();	
	});
	
	// '항목 조회'
	$('#btnSearch').on('click',function(e){
		getItemMgmtList();		
	});
}


