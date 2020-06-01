/**
 * 연구분류관리
 * @Page : categorize.jsp
 */

var gvPageNo = 1;
var gvPagePerCount = 20;


var gvSchemaList 		= [];		//스키마목록
var gvTableList 		= [];		//테이블목록
var gvColumnDateList 	= [];	//컬럼목록(Date 타입만)

var gvItemCateList  	= [];		//대분류
var gvItemCateDetlList 	= [];		//중분류목록

var gvDataSourceItemCateList;		//대분류 DATASOURCE
var gvDataSourceItemCateDetlList;	//중분류 DATASOURCE

var gvDataAdapterItemCateList;
var gvDataAdapterItemCateDetlList;

var gvCommand = '';
var gvCommandDetl = '';

var gvItemCateIdx = -1;
var gvItemCateDetlIdx = -1;

/**
 * Application Ready
 */
$(document).ready(function(){
	init();
	
	setGrid();
	
	initEvent();
	
	getItemCateList();
	
	//메뉴고정
	menuFix('admin_researchItem_categorizeMain');
	
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
		case "getItemCateList":
			gvItemCateList = result.dsItemCateList;
			
			if(typeof gvItemCateList === 'undefined'){
				return;
			}
			
			gvDataSourceItemCateList.localdata = gvItemCateList;
			
			$("#jqxItemCateList").jqxGrid('clear');			
			$("#jqxItemCateList").jqxGrid('updatebounddata', 'cells');
			
			
			if(gvItemCateIdx < 0){
				$("#jqxItemCateList").jqxGrid('selectrow', 0);	
				
			}else{
				$("#jqxItemCateList").jqxGrid('selectrow', gvItemCateIdx);
				
			}
			
			

			getItemCateDetlList();
			
			
			break;
			
		case "getItemCateDetlList":
			gvItemCateDetlList = result.dsItemCateDetlList;
			
			if(typeof gvItemCateDetlList === 'undefined'){
				return;
			}
			
			gvDataSourceItemCateDetlList.localdata = gvItemCateDetlList;
			
			$("#jqxItemCateDetlList").jqxGrid('clear');			
			$("#jqxItemCateDetlList").jqxGrid('updatebounddata', 'cells');
			
			if(gvItemCateDetlIdx < 0){
				$("#jqxItemCateDetlList").jqxGrid('selectrow', 0);	
				
			}else{
				$("#jqxItemCateDetlList").jqxGrid('selectrow', gvItemCateDetlIdx);
				
			}
			
			
			/*$("#jqxItemCateDetlList").jqxGrid('selectrow', 0);*/
			
			break;
			
		case "insertItemCate":
			showAlert('분류관리',COM_0001,function(result){
				$('#btnClose').trigger('click');
				getItemCateList();
			});
		
			break;
			
		case "updateItemCate":
			showAlert('분류관리',COM_0002,function(result){
				$('#btnClose').trigger('click');
				getItemCateList();
			});
		
			break;
			
		case "updateItemCateOrder":
			getItemCateList();
			break;
			
		case "deleteItemCate":
			showAlert('분류관리',COM_0003,function(result){
				$('#btnClose').trigger('click');
				getItemCateList();
			});
			
			break;
			
		case "insertItemCatedDetl":
			showAlert('분류관리',COM_0001,function(result){
				$('#btnDetlClose').trigger('click');
				getItemCateDetlList();
			});
			
			break;
			
		case "updateItemCateDetl":
			showAlert('분류관리',COM_0002,function(result){
				$('#btnDetlClose').trigger('click');
				getItemCateDetlList();
			});
			break;
			
		case "deleteItemCateDetl":
			showAlert('분류관리',COM_0003,function(result){
				$('#btnDetlClose').trigger('click');
				getItemCateDetlList();
			});
			
			break;
			
		case "updateItemCateDetlUpDown":
			getItemCateDetlList();
			
			break;
			
		
			
			
		case "getSchemaList":
			gvSchemaList = result.dsSchemaList;
			
			break;
			
		case "getTableList":
			gvTableList = result.dsTableList;
			
			setComboList('selTableList', gvTableList, 'TABLE', 'TABLE_COMMENT_ID','0000','선택');
			
			
			break;
			
		case "insertItemMgmt":
			alert('저장되었습니다.');
			break;
				
			
		case "updateItemCateDetl":
			alert(COM_0002);
			getItemMgmtList();
			
			break;
			
			
		case "getColumnDateList":
			gvColumnDateList = result.dsColumnDateList;
			
			setComboList('selBASE_DT_COLUMN', gvColumnDateList, 'COLUMN', 'COLUMN','0000','선택');
			
			break;
			
				
		default:
			break;
	
	}
}

//------------------------------------------------------------------------------------------
//	TRANSACTION	
//------------------------------------------------------------------------------------------

function getItemCateList()
{
	var dataSet = {};
	
	callService("getItemCateList"
				,"admin/researchItem/selectItemCateList"
				,dataSet
				,"serviceCallback");
}


function getItemCateDetlList()
{

	var rowindex = $('#jqxItemCateList').jqxGrid('getselectedrowindex');
	var data = $('#jqxItemCateList').jqxGrid('getrowdata', rowindex);
	
	var dataSet = {};
	
	dataSet.SEARCH_ITEM_CATE_SEQ = data.SEQ;
	
	callService("getItemCateDetlList", 
				"admin/researchItem/selectItemCateDetlList", 
				dataSet, 
				"serviceCallback");
	
}


function getSchemaList()
{
	var dataSet = {
	};
	
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
	var dataSet = {};
	
	dataSet.SEARCH_SCHEMA = $('#selSchemaList').val();
	dataSet.SEARCH_TABLE = $('#txtSEARCH_TABLE').val();
	
	callServiceSync("getTableList"
					,"admin/researchItem/selectCatalogTableList"
					,dataSet
					,"serviceCallback");
}



/**
 * 
 * @returns
 */
function getColumnDateList()
{
	var dataSet = {
		SEARCH_SCHEMA:$('#selSchemaList').val(),
		SEARCH_TABLE:$('#selTableList').val()
		
	};
	
	callServiceSync("getColumnDateList"
					,"admin/researchItem/selectCatalogColumnDateList"
					,dataSet
					,"serviceCallback");
}






//------------------------------------------------------------------------------------------
//USER FUNCTION	
//------------------------------------------------------------------------------------------
function init()
{
	
	$('#txtORDER').inputmask({
		mask:'99999',
		placeholder: ' ',
        showMaskOnHover: false,
        showMaskOnFocus: false
	});   
	
	$('#txtORDER_DETL').inputmask({
		mask:'99999',
		placeholder: ' ',
        showMaskOnHover: false,
        showMaskOnFocus: false
	});
	
	makeiCheck('.rdoInstCdYn');
	
//	사업장적용여부	
/*	if(gvINSTCD_YN === 'Y'){
		$('#divINSTCD_YN').css('display','');
		
	}else{
		$('#divINSTCD_YN').css('display','none');
	}
*/	
}

function setGrid()
{	
	
//	대분류
	gvDataSourceItemCateList = {
		datatype: "json",
		datafields : [ 
			{
				name : 'SEQ',
				type : 'string'
			},
			{
				name : 'CATE_NM',
				type : 'string'
			},
			{
				name : 'CATE_ID',
				type : 'string'
			},
			{
				name : 'ORDER',
				type : 'string',
				align: 'right'
			}
		],
		cache: false,
	    localdata: gvItemCateList,
	    updaterow: function (rowid, newdata, commit) {
	    	newdata.UDT_ID = $.session.get('PER_CODE');
	    	
	    	commit(true);
	    	
			callService("updateItemCateOrder" 
						,"admin/researchItem/updateItemCate"
						,newdata
						,"serviceCallback");
	    	
            

        }
	};
	
	
	gvDataAdapterItemCateList = new $.jqx.dataAdapter(gvDataSourceItemCateList, {
		loadError: function(xhr, status, error){
			alert(error);
		}
	});
	
	$("#jqxItemCateList").jqxGrid({
		width : '100%',
		source : gvDataAdapterItemCateList,
		autoheight : false,
		sortable : true,
		altrows : true,
		enabletooltips : false,
		editable : false,
		/*showfilterrow : true,
		filterable : true,*/
		selectionmode : 'singlerow',
		columnsresize: true,
		theme: 'bootstrap',
		columns : [
			{
				text : '분류ID',
				datafield : 'CATE_ID',
				width : '40%',
				editable: false
			},
			{
				text : '분류명',
				datafield : 'CATE_NM',
				width : '40%',
				editable: false
			},
			{ 
				text : '표시순서', 	datafield : 'ORDER', 	width : '20%' ,	cellsalign:'center',
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
	
	
//	중분류
	gvDataSourceItemCateDetlList = {
		datatype: "json",
		datafields : [ 
			{
				name : 'SEQ',
				type : 'string'
			},
			{
				name : 'ITEM_CATE_SEQ',
				type : 'string'
			},
			{
				name : 'CATE_ID',
				type : 'string'
			},
			{
				name : 'CATE_NM',
				type : 'string'
			},
			{
				name : 'ORDER',
				type : 'string'
			}
			
		],
		cache: false,
	    localdata: gvItemCateDetlList,
	    updaterow: function (rowid, newdata, commit) {
	    	newdata.UDT_ID = $.session.get('PER_CODE');
	    	
	    	commit(true);
	    	
	    	callService("updateItemCateDetlUpDown" 
					,"admin/researchItem/updateItemCateDetl"
					,newdata
					,"serviceCallback");
        }
	};
	
	
	gvDataAdapterItemCateDetlList = new $.jqx.dataAdapter(gvDataSourceItemCateDetlList, {
		loadError: function(xhr, status, error){
			alert(error);
		}
	});
	
	
	$("#jqxItemCateDetlList").jqxGrid({
		width : '100%',
		source : gvDataAdapterItemCateDetlList,
		autoheight : false,
		sortable : true,
		altrows : true,
		enabletooltips : false,
		editable : false,
		/*showfilterrow : true,
		filterable : true,*/
		selectionmode : 'singlerow',
		columnsresize: true,
		theme: 'bootstrap',
		columns : [
			{
				text : '분류ID',
				datafield : 'CATE_ID',
				width : '40%'
			},{
				text : '분류명',
				datafield : 'CATE_NM',
				width : '40%'
			},{ 
				text : '순서', 	datafield : 'ORDER', width : '20%', 
				cellsalign:'center',
				cellsrenderer:function (row, column, value) {
					var html = '';
					
					html += '<div style="margin-top:3px;text-align:center;">';
					html += '<button class="btn btn-primary btnItemDetlOrderUp btn-xs" seq="" val="" index=""><i class="ion ion-arrow-up-c"></i></button>&nbsp;';
					html += '<button class="btn btn-warning btnItemDetlOrderDown btn-xs" seq="" val="" index=""><i class="ion ion-arrow-down-c"></i></button>&nbsp;';
					html += '</div>';
					
					return html;
				}
				
			}
		]
	});
}

$(document).on('click','.btnOrderUp',function(){
	gvItemCateIdx = $("#jqxItemCateList").upRow();
	
});

$(document).on('click','.btnOrderDown',function(){
	gvItemCateIdx = $("#jqxItemCateList").downRow();
	
});



$(document).on('click','.btnItemDetlOrderUp',function(){
	gvItemCateDetlIdx = $("#jqxItemCateDetlList").upRow();
	
});

$(document).on('click','.btnItemDetlOrderDown',function(){
	gvItemCateDetlIdx = $("#jqxItemCateDetlList").downRow();
	
});


//------------------------------------------------------------------------------------------
//	EVENT	
//------------------------------------------------------------------------------------------
/**
 * 이벤트 초기화
 * @returns
 */
function initEvent(){
//	class set	
	makeiCheck('.importantChk, .manyChk, .searchChk, .codeChk, .popupChk, .importantUpChk, .manyUpChk, .analogueUpChk');
	
	
//	스키마선택
	$('#selSchemaList').on('change',function(e){
		getTableList();
		
	});
	
	
//	테이블선택
	$('#selTableList').on('change',function(e){
		var text = $(this).children("option:selected").text();
		
		var pos = text.indexOf('-');
		
		text = text.substring(0,pos);
		
		$('#txtCATE_NM_DETL').val(text);
		
		getColumnDateList();
		
		
	});
	
	
	/**
	 * 대분류 그리드 클릭
	 */
	$("#jqxItemCateList").on("rowclick", function(event){
		var args = event.args;
		var boundIndex = args.rowindex;
	    var visibleIndex = args.visibleindex;
	    var rightclick = args.rightclick; 
	    var ev = args.originalEvent;
	    
	    
	    var data = $('#jqxItemCateList').jqxGrid('getrowdata', boundIndex);
		
		var dataSet = {};
		
		dataSet.SEARCH_ITEM_CATE_SEQ = data.SEQ;
		
		callService("getItemCateDetlList", 
					"admin/researchItem/selectItemCateDetlList", 
					dataSet, 
					"serviceCallback");
	});
	
	
	$('#btnAdd').on('click',function(e){
		gvCommand = 'C';
		
		$('#txtSEQ').val('');
		$('#txtCATE_ID').val('');
		$('#txtCATE_NM').val('');
		$('#txtORDER').val('');
		
		var modalDlg = $('#itemCateModal');
		modalDlg.find('.modal-title').text('대분류등록');
		modalDlg.modal('show');
		
	});
	
	$('#btnUpd').on('click',function(e){
		gvCommand = 'U';
		

		var rowindex = $('#jqxItemCateList').jqxGrid('getselectedrowindex');
		var data = $('#jqxItemCateList').jqxGrid('getrowdata', rowindex);
				
		$('#txtSEQ').val(data.SEQ); 
		$('#txtCATE_ID').val(data.CATE_ID);
		$('#txtCATE_NM').val(data.CATE_NM);
		$('#txtORDER').val(data.ORDER);
		
		$('#txtORDER').attr('disabled',false);
		
		var modalDlg = $('#itemCateModal');
		modalDlg.find('.modal-title').text('대분류수정');
		modalDlg.modal('show');
		
	});

	$('#btnDel').on('click',function(e){
		//
		var rows = $('#jqxItemCateDetlList').jqxGrid('getrows');
		var strMsg = '';
		
		if(rows.length > 0){
			strMsg = '정의된 중분류가 있습니다.<br>삭제하시겠습니까?';
		}else{
			strMsg = '삭제하시겠습니까?';
		}
		
		showConfirm("분류관리", strMsg, function(result){
			if(!result) {
                return;
            }
            
            var rowindex = $('#jqxItemCateList').jqxGrid('getselectedrowindex');
    		var data = $('#jqxItemCateList').jqxGrid('getrowdata', rowindex);
            
    		var dataSet = {};
    		
    		dataSet.SEQ = data.SEQ;
    		
    		callService("deleteItemCate" ,"admin/researchItem/deleteItemCate"
					 	,dataSet
					 	,"serviceCallback");
		});
	});
	
	
	/**
	 * 중분류등록
	 */
	$('#btnDetlAdd').on('click',function(e){
		gvCommandDetl = 'C';
		
		getSchemaList();
		getTableList();
		
	//	대분류seq설정
		var rowindex = $('#jqxItemCateList').jqxGrid('getselectedrowindex');
		var data = $('#jqxItemCateList').jqxGrid('getrowdata', rowindex);
		
		$('#txtITEM_CATE_SEQ').val(data.SEQ);
		$('#txtDETL_SEQ').val('');
		$('#txtCATE_ID_DETL').val('');
		$('#txtCATE_NM_DETL').val('');			
		
		var dlg = $('#itemCateDetlModal');
		dlg.find('.modal-title').text('중분류등록');
		dlg.modal('show');
		
	});
	
	$('#btnDetlUpd').on('click',function(e){
		gvCommandDetl = 'U';
		
//		getSchemaList();
//		setComboList('selSchemaList', gvSchemaList, 'SCHEMA', 'SCHEMA','0000','선택');
		
//		대분류seq설정
		var rowindex = $('#jqxItemCateDetlList').jqxGrid('getselectedrowindex');
		var data = $('#jqxItemCateDetlList').jqxGrid('getrowdata', rowindex);
		
		console.log(JSON.stringify(data));
		
//		$('#txtSEARCH_SCHEMA').val(data.SCHEMA);
//		$('#txtSEARCH_TABLE').val(data.TABLE);
		$('#txtDETL_SEQ').val(data.SEQ);
		$('#txtITEM_CATE_SEQ').val(data.ITEM_CATE_SEQ);
//		$('#selSchemaList').val(data.SCHEMA);
		$('#txtCATE_ID_DETL').val(data.CATE_ID);
		$('#txtCATE_NM_DETL').val(data.CATE_NM);
		$('#txtORDER_DETL').val(data.ORDER);

//		getTableList();
//		
//		$('#selTableList').val(data.TABLE);
//		
//		getColumnDateList();
		
//		$('#selBASE_DT_COLUMN').val(data.BASE_DT_COLUMN);
//		
//		
//		$('#selSchemaList').attr('disabled',true);
//		$('#selTableList').attr('disabled',true);
		$('#txtORDER_DETL').attr('disabled',false);
		
	

	//	사업장적용여부추가
//		if(gvINSTCD_YN === 'Y'){
//			$('#divINSTCD_YN').css('display','');
//			
//		}else{
//			$('#divINSTCD_YN').css('display','none');
//		}
			
		
		var dlg = $('#itemCateDetlModal');
		dlg.find('.modal-title').text('중분류수정');
		dlg.modal('show');
		
	});
	
	
	$('#btnDetlDel').on('click',function(e){
		showConfirm("분류관리", COM_0005, function(result){
			if(!result) {
                return;
            }
            
            var rowindex = $('#jqxItemCateDetlList').jqxGrid('getselectedrowindex');
    		var data = $('#jqxItemCateDetlList').jqxGrid('getrowdata', rowindex);
    		
    		
    		if(typeof data.SEQ === 'undefined'){
    			return;
    			
    		}
            
    		var dataSet = {};
    		
    		dataSet.SEQ = data.SEQ;
    		
    		callService("deleteItemCateDetl" ,"admin/researchItem/deleteItemCateDetl"
					 	,dataSet
					 	,"serviceCallback");
		});
		/*BootstrapDialog.confirm(COM_0005,function(result){
            
    		
        });*/
		
	});
	
	/**
	 * 대분류저장
	 */
	$('#btnSave').on('click',function(e){
		showConfirm("분류관리", COM_0004, function(result){
			if(!result) {
                return;
            }
			
			var dataSet = {};
    		
    		dataSet.CATE_ID = $('#txtCATE_ID').val();
    		dataSet.CATE_NM = $('#txtCATE_NM').val();
    		dataSet.ORDER = $('#txtORDER').val();
    		dataSet.UDT_ID = $.session.get('PER_CODE');
    		dataSet.CRT_ID = $.session.get('PER_CODE');
    		
    		
    		if(gvCommand === 'C'){
    			callService("insertItemCate" ,"admin/researchItem/insertItemCate"
    										 ,dataSet
    										 ,"serviceCallback");
    		}else if(gvCommand === 'U'){
    			dataSet.SEQ = $('#txtSEQ').val();
    			
    			callService("updateItemCate" ,"admin/researchItem/updateItemCate"
    										 ,dataSet
    										 ,"serviceCallback");
    		}
			
			
		});
		
	});
	
	
	/**
	 * 중분류저장
	 */
	$('#btnDetlSave').on('click',function(e)
	{
//		if(isNull($('#selSchemaList').val())){
//			showAlert('연구분류관리','대분류는 ' + COM_0010,null);
//			return;
//			
//		}
//		
//		if(isNull($('#selTableList').val())){
//			showAlert('연구분류관리','중분류는 ' + COM_0010,null);
//			return;
//			
//		}
		
		if(isNull($('#txtCATE_NM_DETL').val())){
			showAlert('분류관리','분류명은 ' + COM_0010,null);
			return;
			
		}
		
		
		showConfirm("분류관리", COM_0004, function(result){
			if(!result){
				return;
			}
			
			var dataSet 			= {};
			
			dataSet.SEQ 			= $('#txtDETL_SEQ').val();
//			dataSet.SCHEMA 			= $('#selSchemaList').val();
//			dataSet.TABLE 			= $('#selTableList').val();
			dataSet.ITEM_CATE_SEQ 	= $('#txtITEM_CATE_SEQ').val();
			dataSet.ORDER 			= $('#txtORDER_DETL').val();
			dataSet.CATE_ID 		= $('#txtCATE_ID_DETL').val();
			dataSet.CATE_NM 		= $('#txtCATE_NM_DETL').val();
//			dataSet.BASE_DT_COLUMN 	= $('#selBASE_DT_COLUMN').val();
//			dataSet.INSTCD_YN 		= $(':input:radio[name="INSTCD_YN"]:checked').val();
			dataSet.UDT_ID 			= $.session.get('PER_CODE');
			dataSet.CRT_ID 			= $.session.get('PER_CODE');
			
			if(gvCommandDetl === 'C'){
				callService("insertItemCatedDetl" 
							,"admin/researchItem/insertItemCateDetl"
							,dataSet
							,"serviceCallback");
			}else if(gvCommandDetl === 'U'){
				callService("updateItemCateDetl" 
							,"admin/researchItem/updateItemCateDetl"
							,dataSet
							,"serviceCallback");
			}
		});
	});
}



