/**
 * 동의어 사전관리
 * @Page : synonymDic.jsp
 */

var gvPageNo = 1;
var gvPagePerCount = 20;

var gvCommnad = '';
var gvCategoryList 		= [];
var gvItemCateList 		= [];
var gvItemCateDetlList 	= [];
var gvItemMgmtList 		= [];

var gvDataSourceSynonym ;
var gvDataSourceSynonymTerm;
var gvDataAdapterSynonym ;
var gvDataAdapterSynonymTerm;

var gvSynonymList = [];
var gvSynonymView = {};

var gvSynonymTermList = [];
var gvSynonymTermDelList = [];




/**
 * Application Ready
 */
$(document).ready(function(){
	getCategoryList();
	
	init();
	
	setTree();

	setGrid();
	
	initEvent();
	
	
	getSynonymList();
	
	
//	메뉴고정
	menuFix('admin_synonymDic_main');
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
		BootstrapDialog.alert(result.ERR_MSG);
		return;
	}
	
	switch(svcId){
		case "insertSynonym":
			BootstrapDialog.alert(COM_0001, function(e){
				$('#btnCloseSynonym').trigger('click');
				
				getSynonymList();
				
			});
			break;
			
		case "getCategoryList":
			gvCategoryList = result.dsCategoryList;
			printJSON("-----------------------------");
			printJSON(gvCategoryList);
			
			break;
			
		case "selectSynonymList":
			gvSynonymList = result.dsSynonymList;
			
			gvDataSourceSynonym.localdata = gvSynonymList;
			
			$("#jqxGridSynonym").jqxGrid('clear');			
			$("#jqxGridSynonym").jqxGrid('updatebounddata', 'cells');
			
			$('#searchVal').select();
			
			
			break;
			
		case "selectSynonymView":
			gvSynonymView = result.dsSynonymView[0];
			gvSynonymTermList = result.dsSynonymTermList;
			
			if(gvSynonymView.ITEM_CATE_SEQ === 0){
				$('#selITEM_CATE').val('');
				$('#selITEM_CATE_DETL').val('');
				$('#selITEM_MGMT').val('');
				
				$('#selITEM_CATE').attr('disabled',false);
				$('#selITEM_CATE_DETL').attr('disabled',true);
				$('#selITEM_MGMT').attr('disabled',true);
				
			}else{
				$('#selITEM_CATE').val(gvSynonymView.ITEM_CATE_SEQ);
				$('#selITEM_CATE_DETL').val(gvSynonymView.ITEM_CATE_DETL_SEQ);
				$('#selITEM_MGMT').val(gvSynonymView.ITEM_SEQ);
				
			}
			
			
			$('#txtSEQ').val(gvSynonymView.SEQ);
			$('#txtTERM').val(gvSynonymView.TERM);
			$('#txtSYNONYM_TERM').val('');
			
			$('#txtITEM_SEQ').val(gvSynonymView.ITEM_SEQ);
			$('#txtITEM_MAP_SEQ').val(gvSynonymView.ITEM_MAP_SEQ);
			console.log(gvSynonymTermList);
			
			
		    
		    var dlg = $('#modalSynonymReg').modal();
			dlg.find('.modal-title').text('동의어 수정');
			dlg.find('.modal-dialog').draggable({
	            handle: ".modal-header"
	        });
			dlg.modal('show');
			

			$("#jqxListSynonymTermList").jqxListBox('clear');				
			
			setList();
			
			
			break;
		
		case "upsertSynonymTerm":
			BootstrapDialog.alert(COM_0002, function(e){
				$('#btnCloseSynonym').trigger('click');
				
				getSynonymList();
				
			});
			
			break;
			
		case "deleteSynonymTerm":
			BootstrapDialog.alert(COM_0003, function(e){
				
				if(gvCommand === 'RD'){
					getSynonymList();
					
					
				}else{
					var dataSet = {};
				    
				    dataSet.SEARCH_SEQ 		= $('#txtSEQ').val();
				    dataSet.SEARCH_REP_SEQ 	= $('#txtSEQ').val();
				    
				    console.log(JSON.stringify(dataSet));
				    
					callServiceSync("selectSynonymView" 
								,"admin/synonymDic/selectSynonymView"
								,dataSet
								,"serviceCallback");
					
					gvDataSourceSynonymTerm.localdata = gvSynonymTermList;
					
					$("#jqxListSynonymTermList").jqxListBox('refresh');	
					
				}
			});
			
			break;
		default:
			break;
	
	}
}

//------------------------------------------------------------------------------------------
//	TRANSACTION	
//------------------------------------------------------------------------------------------

function insertSynonym()
{
	
	
}

function getCategoryList()
{
	var dataSet = {};
	
//	동기방식	
	callServiceSync("getCategoryList"
				,"admin/synonymDic/selectSynonymCategoryList"
				,dataSet
				,"serviceCallback");	
	
	$.each(gvCategoryList,function(key, value){
		var jObj = value;
		
		if( jObj.lvl === 1){
			gvItemCateList.push(jObj);
		}
		
		if( jObj.lvl === 2){
			gvItemCateDetlList.push(jObj);
		}
		
		if( jObj.lvl === 3){
			gvItemMgmtList.push(jObj);
		}
		
	});

	setComboList('selITEM_CATE', 		gvItemCateList, 	'id', 'text', '', '전체');
	setComboList('selITEM_CATE_DETL', 	gvItemCateDetlList, 'id', 'text', '', '전체');
	setComboList('selITEM_MGMT', 		gvItemMgmtList, 	'id', 'text', '', '전체');
	
	
	
}

/**
 * 
 * @returns
 */
function getSynonymList()
{
	var dataSet = {};
	
	
	var item = $('#synonymTree').jqxTree('getSelectedItem');
	var values = (item.value).split(',');
	
	if( values.length == 1 && values[0] != 0){
		dataSet.SEARCH_ITEM_CATE_SEQ = values[0];
	}
	
	if( values.length == 2){
		dataSet.SEARCH_ITEM_CATE_SEQ = values[0];
		dataSet.SEARCH_ITEM_CATE_DETL_SEQ = values[1];
	}
	
	if( values.length == 3){
		dataSet.SEARCH_ITEM_CATE_SEQ = values[0];
		dataSet.SEARCH_ITEM_CATE_DETL_SEQ = values[1];
		dataSet.SEARCH_ITEM_SEQ = values[2];
	}
	
	
	dataSet.SEARCH_KEY = $('#searchKey').val();
	dataSet.SEARCH_VAL = $('#searchVal').val();
	
	
	callService("selectSynonymList" 
				,"admin/synonymDic/selectSynonymList"
				,dataSet
				,"serviceCallback");
}




//------------------------------------------------------------------------------------------
//USER FUNCTION	
//------------------------------------------------------------------------------------------
/**
 * 페이지 초기화
 * @returns
 */
function init()
{
	makeiCheck('.chkREP_YN, .chkDELETE_YN, .rdoLANG');
	
	$('#selITEM_CATE').val('');
	
	$('#selITEM_CATE').attr('disabled','disable');
	$('#selITEM_CATE_DETL').attr('disabled','disable');
	$('#selITEM_MGMT').attr('disabled','disable');
		
}

/**
 * 트리 초기화
 */
var setTree = function()
{
	
	
	var source =
	{
	    datatype: "json",
	    datafields: [
		    { name: 'id' },
		    { name: 'parentid' },
		    { name: 'text' },
		    { name: 'icon' },
		    { name: 'lvl' },
		    { name: 'value' }
		    
		],
		id: 'id',
		localdata: gvCategoryList
	}; 
	
	var dataAdapter = new $.jqx.dataAdapter(source);
	
	dataAdapter.dataBind();
	
	var records = dataAdapter.getRecordsHierarchy('id', 'parentid', 'items', [{ name: 'text', map: 'label'}]);
	
	$('#synonymTree').jqxTree({ 
		source: records, 
		width: '100%',
		height: $('#synonymTree').css('height'),
		hasThreeStates: false, 
		checkboxes: false,
		allowDrag: true, 
		allowDrop: true,
		dragEnd: function (item, dropItem, args, dropPosition, tree) {
			if(dropPosition == "after" || dropPosition == "before" || dropPosition == "inside"){
				return false;
			}
		}
	});
	
	$('#synonymTree').jqxTree('selectItem',$("#synonymTree").find('li:first')[0]);
	$('#synonymTree').jqxTree('expandItem',$("#synonymTree").find('li:first')[0]);
	
	
	
};

/**
 * 그리드 초기화
 * @returns
 */
function setGrid()
{
//	연구항목 그리드	
	gvDataSourceSynonym = {
	    datatype: "json",
	    datafields : [ 
	    	{
				name : 'SEQ',
				type : 'string'
			}, 
	    	{
				name : 'TERM',
				type : 'string'
			}, {
				name : 'SYNONYM_TERM',
				type : 'string'
			}, {
				name : 'ITEM_CATE_SEQ',
				type : 'string'
			}, {
				name : 'ITEM_CATE_DETL_SEQ',
				type : 'string'
			}, {
				name : 'ITEM_SEQ',
				type : 'string'
			}, {
				name : 'ITEM_CATE_NM',
				type : 'string'
			}, {
				name : 'ITEM_CATE_DETL_NM',
				type : 'string'
			}, {
				name : 'ITEM_NM',
				type : 'string'
			}, {
				name : 'CRT_DT',
				type : 'date'
			},
			 {
				name : 'UPD_BTN',
				type : 'string'
			}
		],
	    cache: false,
	    localdata: gvSynonymList,
	    processdata: function(data){
	    	//data.pagesize = 20;
	    }
	};
	
	gvDataAdapterSynonym = new $.jqx.dataAdapter(gvDataSourceSynonym, {
		loadError: function(xhr, status, error){
			alert(error);
		}
	});

	
	$("#jqxGridSynonym").jqxGrid({
		width : '100%',
		height : 400,
		source : gvDataAdapterSynonym,
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
		columns : [
			{
                text: '번호', sortable: false, filterable: false, editable: false,
                groupable: false, draggable: false, resizable: false,
                datafield: '', columntype: 'number', width: 50,
                cellsrenderer: function (row, column, value) {
                    return "<div style='margin:4px;text-align:center'>" + (value + 1) + "</div>";
                }

            },
			{ 	text : '순번', 		datafield : 'SEQ', 	width : '80px', 	cellsalign:'center', hidden:true},
			{ 	text : '연구항목', 	datafield : 'ITEM_NM', 	width : '180px', 	 },
			{ 	text : '대표어', 	datafield : 'TERM', 	width : '180px', 	 },
			{ 	text : '동의어', 	datafield : 'SYNONYM_TERM', 	cellclassname:'gridCellLink'},
			{ 	text : '등록일자', 	datafield : 'CRT_DT', 	width : '120px',cellsalign:'center', 	cellsformat:'yyyy-MM-dd'}
		]
	}); 
	
	
//	동의어목록 리스트 박스 설정
	setList();
	

    
}

function setList(){
	gvDataSourceSynonymTerm = {
        datatype: "json",
        datafields: [
            { name: 'SEQ' },
            { name: 'TERM' }
        ],
        id: 'SEQ',
        localdata: gvSynonymTermList
    };
	
	gvDataAdapterSynonymTerm = new $.jqx.dataAdapter(gvDataSourceSynonymTerm);
	
	$("#jqxListSynonymTermList").jqxListBox({ 
		source: gvDataAdapterSynonymTerm, 
		displayMember: 'TERM', 
		valueMember: "SEQ", 
		width: 378, 
		height: 180,
		checkboxes:true,
		theme: 'bootstrap'
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
	$('#synonymTree').on('select', function (event) {
		var args = event.args;
		var item = $('#synonymTree').jqxTree('getItem', args.element);
		
		var label = item.label;
		
		getSynonymList();
		

	});
	
	$('#rdoLANG').on('ifChecked', function () {});
	
	
	/**
	 * 동의어 등록
	 */
	$('#btnAddSynonym').on('click', function(e){
		
		gvCommand = 'C';
		
		var args = event.args;
		var item = $('#synonymTree').jqxTree('getSelectedItem');
		
		
		if(isNull(item.id) || item.id == 0){
			$('#selITEM_CATE').val('');
			$('#selITEM_CATE_DETL').val('');
			$('#selITEM_MGMT').val('');
			
			$('#selITEM_CATE').attr('disabled',false);
			$('#selITEM_CATE_DETL').attr('disabled',true);
			$('#selITEM_MGMT').attr('disabled',true);
			
			setComboList('selITEM_CATE_DETL',[], 'id', 'text', '', '전체');
			setComboList('selITEM_MGMT', 	[], 'id', 'text', '', '전체');
			
		}else{
			var dsList = [];
			
			for(var i=0; i < gvItemCateDetlList.length; i++){
				var ds = gvItemCateDetlList[i];
				if(ds.parentid === item.id){
					dsList.push(ds);
					
				}
			}
			
			$('#selITEM_CATE').val(item.id);
			setComboList('selITEM_CATE_DETL',dsList, 'id', 'text', '', '선택');
			setComboList('selITEM_MGMT', 	[], 'id', 'text', '', '선택');
			
			$('#selITEM_CATE').attr('disabled',false);
			$('#selITEM_CATE_DETL').attr('disabled',false);
			$('#selITEM_MGMT').attr('disabled',false);
		}
		
		
		 
	//	데이터초기화
		$('#txtSEQ').val('');
		$('#txtITEM_SEQ').val('');
		$('#txtITEM_MAP_SEQ').val('');
		$('#txtTERM').val('');
		$('#txtSYNONYM_TERM').val('');
		$("#jqxListSynonymTermList").jqxListBox('clear');

		var dlg = $("#modalSynonymReg").modal();
		dlg.find('.modal-title').text('동의어 등록');
		dlg.modal('show');
		
	});
	
	/**
	 * 동의어 수정
	 */
	$("#jqxGridSynonym").on("cellclick", function(event) {
		var args = event.args;
	    var rowBoundIndex = args.rowindex;
	    var columnindex = args.columnindex;
	    var dataField = args.datafield;
	    var value = args.value;
	    
	    if(dataField !== 'SYNONYM_TERM'){
	    	return;
	    	
	    }
	    
	    gvCommand = 'U';
	    
	    var data = $("#jqxGridSynonym").jqxGrid('getrowdata', rowBoundIndex);
	    
	    var dataSet = {};
	    
	    dataSet.SEARCH_SEQ 		= data.SEQ;
	    dataSet.SEARCH_REP_SEQ 	= data.SEQ;
	    
		callServiceSync("selectSynonymView" 
					,"admin/synonymDic/selectSynonymView"
					,dataSet
					,"serviceCallback");
		
		
	});
	
	
	
//	동의어저장	
	$('#btnSaveSynonym').on('click',function(e){
		
		if(isNullOrEmpty($('#selITEM_CATE').val()) && $("#selITEM_CATE option:checked").text() === '선택'){
			alert("대분류는 필수항목입니다.");
			return;
		}
		
		if(isNullOrEmpty($('#selITEM_CATE_DETL').val()) && $("#selITEM_CATE_DETL option:checked").text() === '선택'){
			alert("중분류는 필수항목입니다.");
			return;
		}
		
		if(isNullOrEmpty($('#selITEM_MGMT').val()) && $("#selITEM_MGMT option:checked").text() === '선택'){
			alert("연구항목은 필수항목입니다.");
			return;
		}
		
		if(isNullOrEmpty($('#txtTERM').val())){
			alert("대표어는 필수항목입니다.");
			return;
		}
		
		
		
		
		var dataSet = {};
		var dsSynonym = {};
		var dsSynonymItemMap = {};
		var dsSynonymTermList = [];
		
		
	//	신규등록	
		if(gvCommand === 'C'){
			dsSynonym.REP_SEQ = "0";
			dsSynonym.TERM = $('#txtTERM').val();
			dsSynonym.LANG = 'EN';
			dsSynonym.REP_YN = 'Y';
			dsSynonym.DELETE_YN = 'N';
			dsSynonym.CRT_ID = $.session.get('PER_CODE');
			dsSynonym.UDT_ID = $.session.get('PER_CODE');
			
		//	분류정보
			dsSynonymItemMap.ITEM_CATE_SEQ = nvl($('#selITEM_CATE').val(),"0");
			dsSynonymItemMap.ITEM_CATE_DETL_SEQ = nvl($('#selITEM_CATE_DETL').val(),"0");
			dsSynonymItemMap.ITEM_SEQ = nvl($('#selITEM_MGMT').val(),"0");
			dsSynonymItemMap.SYNONYM_REP_SEQ = nvl($('#selITEM_CATE').val(),"0");
			dsSynonymItemMap.CRT_ID = $.session.get('PER_CODE');
			dsSynonymItemMap.UDT_ID = $.session.get('PER_CODE');
			
			
			
		//	동의어정보
			var items = $("#jqxListSynonymTermList").jqxListBox('getItems');
			var dsSynonymTermList = [];
			
			for(var i=0; !isNull(items) && i < items.length; i++){
				var dsTmp = {};
				
				dsTmp.TERM 		= items[i].label;
				dsTmp.SEQ 		= '0';
				dsTmp.REP_SEQ 	= '0';
				
				dsTmp.LANG = 'EN';
				dsTmp.REP_YN = 'N';
				dsTmp.DELETE_YN = 'N';
				
				dsTmp.CRT_ID = $.session.get('PER_CODE');
				dsTmp.UDT_ID = $.session.get('PER_CODE');
				
				dsSynonymTermList.push(dsTmp);
			}
			
			
			dataSet.dsSynonym = dsSynonym;
			dataSet.dsSynonymItemMap = dsSynonymItemMap;
			dataSet.dsSynonymTermList = dsSynonymTermList;
			
			callService("insertSynonym" 
						,"admin/synonymDic/insertSynonym"
						,dataSet
						,"serviceCallback");
			
			
		}else if(gvCommand === 'U' || gvCommand === 'RD' || gvCommand === 'SD'){
			var items = $("#jqxListSynonymTermList").jqxListBox('getItems');
			
//			분류정보
			dsSynonymItemMap.ITEM_CATE_SEQ = nvl($('#selITEM_CATE').val(),"0");
			dsSynonymItemMap.ITEM_CATE_DETL_SEQ = nvl($('#selITEM_CATE_DETL').val(),"0");
			dsSynonymItemMap.ITEM_SEQ = nvl($('#selITEM_MGMT').val(),"0");
			dsSynonymItemMap.SYNONYM_REP_SEQ = nvl($('#selITEM_CATE').val(),"0");
			dsSynonymItemMap.TERM_REP_SEQ = nvl($('#txtSEQ').val(),'');
			dsSynonymItemMap.SEQ = nvl($('#txtITEM_MAP_SEQ').val(),'');
			
			
			dsSynonymItemMap.UDT_ID = $.session.get('PER_CODE');
			
			var dsSynonymTermList = [];
			
			for(var i=0; i < items.length; i++){
				
				var dsTmp = {};
				
				
				dsTmp.TERM 	= items[i].label;
				
				if(!isNullOrEmpty(items[i].originalItem)){
					dsTmp.SEQ = items[i].value;
					
				}
				
				
				dsTmp.REP_SEQ 	= $('#txtSEQ').val();
				
				dsTmp.LANG = 'EN';
				dsTmp.REP_YN = 'N';
				dsTmp.DELETE_YN = 'N';
				
				dsTmp.CRT_ID = $.session.get('PER_CODE');
				dsTmp.UDT_ID = $.session.get('PER_CODE');
				
				dsSynonymTermList.push(dsTmp);
			}

			dataSet.dsSynonym = dsSynonym;
			dataSet.dsSynonymItemMap = dsSynonymItemMap;
			dataSet.dsSynonymTermList = dsSynonymTermList;
			
			callService("upsertSynonymTerm" 
						,"admin/synonymDic/upsertSynonymTerm"
						,dataSet
						,"serviceCallback");
		}
		
	});
	
	/**
	 * 
	 */
	$('#btnAddSynonymTerm').on('click', function(e){
		var dataSet = {};
		
		if(isNull($('#txtSYNONYM_TERM').val())){
			alert('동의어는 ' + COM_0010);			//동의어는 필수항목입니다.
			return;
		}
		

	//	중복체크
		var items = $("#jqxListSynonymTermList").jqxListBox('getItems');
		var isDupl = false;
		
		if(items != undefined){
			for(var i=0; i < items.length; i++){
				if($('#txtSYNONYM_TERM').val() === items[i].label){
					isDupl = true;
					break;
				}
			}
		}
		
		if(isDupl){
			alert('중복된 동의어가 있습니다.');			
			return;
		}
		
		
		dataSet.TERM = $('#txtSYNONYM_TERM').val();
		dataSet.DBGBN = 'C';
		
		$("#jqxListSynonymTermList").jqxListBox('addItem', dataSet);
		
	});
	
	/**
	 * 동의어 삭제
	 */
	$('#btnDelSynonymTerm').on('click', function(e){
		var dataSet = {};
		var dsSynonymTermDelList = [];
		var items = $("#jqxListSynonymTermList").jqxListBox('getCheckedItems');
		
		
		if(items.length == 0){
			alert('최소 한건을 선택해 주시기 바랍니다.');
			return;
			
		}
		
		
		for(var i=0; i < items.length; i++){
			if( isNullOrEmpty(items[i].originalItem)){
				$("#jqxListSynonymTermList").jqxListBox('removeItem', items[i]);
				continue;
				
			}
			
			var dsTmp = {};
			
			dsTmp.SEQ = items[i].value;
			
			dsSynonymTermDelList.push(dsTmp);
		}
		
		
	//	담겨진 Item이 없으면 return	
		if(dsSynonymTermDelList.length <= 0){
			$('#txtSYNONYM_TERM').val('');
			$('#txtSYNONYM_TERM').focus();
			
			return;
		}
		
		gvCommand = 'SD';
		
		dataSet.dsSynonymTermDelList = dsSynonymTermDelList;
		
		callService("deleteSynonymTerm"
				,"admin/synonymDic/deleteSynonymTerm"
				,dataSet
				,"serviceCallback");	
		
	});
	
	
	$('#btnCloseSynonym').on('click',function(e){
		getSynonymList();
		
	});
	
	
	$('#btnSearch').on('click',function(e){
		getSynonymList();
		
	});
	
	
	
	$('#searchVal').on('keypress',function(e){
		if(e.keyCode == 13){
			getSynonymList();	
		}
		
	});
	
	$('#searchVal').on('focus',function(e){
		$(this).select();
	});
	
	
	$("#jqxListSynonymTermList").on('checkChange', function (event) {
		var args = event.args;
        
		if (args.checked) {
            $("#Events").text("Checked: " + args.label);

        }else {
            $("#Events").text("Unchecked: " + args.label);
        }

        var items = $("#jqxListSynonymTermList").jqxListBox('getCheckedItems');

        var checkedItems = "";

        $.each(items, function (index) {
            if (index < items.length - 1) {
                checkedItems += this.label + ", ";

            }
            else checkedItems += this.label;

        });

        $("#CheckedItems").text(checkedItems);
    });
	
	
	//동의어 추가 버튼
	$('#btnAddSynonym').on('click', function(){
		var synonymArea = $(this).parent().next().find('.row:first').clone();
		synonymArea.find('.vSynonymName').val('')
		$(this).parent().next().find('.row:last').after(synonymArea);
	});
	
	//동의어 삭제 버튼
	$(document).on("click",".btnMinusSynonym",function(){
		if($('.synonymArea').length == 1){
			BootstrapDialog.alert(COM_0007);
		}else{
			$(this).parent().parent().remove();
		}
	});
	
	
	//동의어삭제
	$('#btnDelete').on('click',function(e){
		var dataSet = {};
		
		var rowindex = $('#jqxGridSynonym').jqxGrid('getselectedrowindex');
		
		if(rowindex < 0){
			BootstrapDialog.alert("선택된 정보가 없습니다.");
			return;
		}
		
		gvCommand = 'RD';
		
		data = $('#jqxGridSynonym').jqxGrid('getrowdata',rowindex);
		
		var dsSynonymList = [];
		
		dsSynonymList.push(data);
		
		dataSet.dsSynonymTermDelList = dsSynonymList;
		
		callService("deleteSynonymTerm"
				,"admin/synonymDic/deleteSynonymTerm"
				,dataSet
				,"serviceCallback");
		
		
		
	});
	
	
	
//	대분류 변경	
	$('#selITEM_CATE').on('change',function(e){
		var dsList = [];
		
		for(var i=0; i < gvItemCateDetlList.length; i++){
			var ds = gvItemCateDetlList[i];
			if(ds.parentid === $(this).val()){
				dsList.push(ds);
				
			}
		}
		
		if(isNull($(this).val())){
			setComboList('selITEM_CATE_DETL', 	[], 'id', 'text', '', '전체');
			setComboList('selITEM_MGMT', 	[], 'id', 'text', '', '전체');
			$('#selITEM_CATE_DETL').attr('disabled',true);
			$('#selITEM_MGMT').attr('disabled',true);
			
		}else{
			setComboList('selITEM_CATE_DETL',dsList, 'id', 'text', '', '선택');
			setComboList('selITEM_MGMT', 	[], 'id', 'text', '', '선택');
			
			$('#selITEM_CATE_DETL').attr('disabled',false);
			$('#selITEM_MGMT').attr('disabled',false);
		}
		
	});
	

//	중분류 변경	
	$('#selITEM_CATE_DETL').on('change',function(e){
		var dsList = [];

		for(var i=0; i < gvItemMgmtList.length; i++){
			var ds = gvItemMgmtList[i];
			if(ds.parentid === $(this).val()){
				dsList.push(ds);
				
			}
		}
		
		if(isNull($(this).val())){
			setComboList('selITEM_MGMT', [], 'id', 'text', '', '선택');
			$('#selITEM_MGMT').attr('disabled',true);
			
		}else{
			setComboList('selITEM_MGMT',dsList, 'id', 'text', '', '선택');
			$('#selITEM_MGMT').attr('disabled',false);
		}
		
	});
	
	
	
	
}
