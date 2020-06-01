/**
 * join관리
 * @Page : joinMgmt.jsp
 */

var gvSchemaList = [];
var gvTableList = [];
var gvTargetId = '';


/**
 * Application Ready
 */
$(document).ready(function(){
	
	//스키마목록
	getSchemaList();
	
	//테이블목록1
	getTableList('mgmtTableList');
	
	//테이블목록2
	getTableList('mgmtTableList2');
	
//	getData();
	
	setGrid();
	
	initEvent();
	
	//메뉴고정
	menuFix('admin_joinMgmt_main');
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
			
			break;
		case "setData":
			if(result['ERR_CD'] == 1){		// 저장성공
				$('#btnCloseJoin').trigger('click');
				showAlert('테이블 JOIN 관리',COM_0001,null);
				
				getSchemaList();
				getTableList('mgmtTableList');
				getTableList('mgmtTableList2');
				
				$("#searchVal").val("");
				setGrid();
				
				return;
				
			}else if(result['ERR_CD'] == -10){						// 중복발생
				showAlert('테이블 JOIN 관리',COM_0046,null);			//중복데이터가 존재합니다.
				return;
				
			}else if(result['ERR_CD'] == 2){		// 수정성공
				$('#btnCloseJoin').trigger('click');
				showAlert('테이블 JOIN 관리',COM_0002,null);			//수정되었습니다.
				setGrid();
				return;
				
			}else if(result['ERR_CD'] == 3){		// 삭제성공
				$('#btnCloseJoin').trigger('click');
				showAlert('테이블 JOIN 관리',COM_0003,null);			//삭제되었습니다.
				setGrid();
				return;
				
			}else{							// 실패
				showAlert('테이블 JOIN 관리',COM_0008,null);			//저장이 안되었습니다. <br>다시 시도해 주세요.
				return;
			}
			
			break;

		case "mgmtData":
			var html = "";
			html += "<option value='' selected >전체</option>";
			for(var i = 0; i < result.data.length; i++){
				var code = result.data[i];
				var selected = "";
//				if(i == 0) selected = "selected";
				html += "<option value='"+code.ITEM+"' "+selected+">"+code.ITEM+"</option>";
			}
			$("#"+result.TARGET_ITEM).html(html);
			break;
			
		//스카마목록	
		case "getSchemaList":
			setComboList('mgmtSchemaList', result.data ,'ITEM', 'ITEM','','전체');
			setComboList('mgmtSchemaList2', result.data ,'ITEM', 'ITEM','','전체');
			break;
		
		//테이블목록	
		case "getTableList":
			if(gvTargetId === 'mgmtTableList'){
				setComboList('mgmtTableList', result.data ,'ITEM', 'ITEM','','전체');
				
			}else{
				setComboList('mgmtTableList2', result.data ,'ITEM', 'ITEM','','전체');
				
			}
			
			gvTargetId = '';
			
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
function getSchemaList(){
	var dataSet = {
			TARGET_ITEM : "mgmtSchemaList"		/* UI Select 구분 값 */
			,SEARCH_ITEM : "SCHEMA_1"			/* 조회 컬럼 */
	};
	callServiceSync("getSchemaList", "admin/joinMgmt/selectJoinItemList", dataSet, "serviceCallback");
}

/**
 * 
 * @returns
 */
function getTableList(elem){
	var dataSet = {};
	
	if(isNull(elem) || elem === 'mgmtTableList'){
		gvTargetId = 'mgmtTableList';
		dataSet.TARGET_ITEM = nvl(elem,"mgmtTableList");
		dataSet.SEARCH_ITEM = "TABLE_1";
		dataSet.SCHEMA_VAL = $('#mgmtSchemaList').val();
		
	}else{
		gvTargetId = 'mgmtTableList2';
		dataSet.TARGET_ITEM = nvl(elem,"mgmtTableList");
		dataSet.SEARCH_ITEM = "TABLE_2";
		dataSet.SCHEMA_VAL = $('#mgmtSchemaList2').val();
		
	}
	
	callServiceSync("getTableList", "admin/joinMgmt/selectJoinItemList", dataSet, "serviceCallback");
}


//------------------------------------------------------------------------------------------
//USER FUNCTION	
//------------------------------------------------------------------------------------------

function setGrid()
{
	// JOIN 리스트 그리드
	var tableOption = {
			searching:false,
			ordering:false,
			paging:true,
			bPaginate:true,
			processing: true,
			serverSide: true
	};
	
	var tableColumns = [
				{ data:"NUM" 		},
				{ data:"SCHEMA_1" 		},
				{ data:"TABLE_1" 		},
				{ data:"COLUMN_1" 		},
				{ data:"SCHEMA_2" 		},
				{ data:"TABLE_2" 		},
				{ data:"COLUMN_2",		},
				{ data:"NUM",
					orderable:false,
					render:function(data,type,row,meta){
						var html = '';

						html = html + '<button class="btn btn-danger btnDelJoin btn-xs" val="' + data + '"><i class="ion ion-trash-a"></i></button>';		 
						
						return html;
					}
					
				}
				
		];
	
	var tableColumnDef = [
	          		    { 
	        		    	className: "dt-body-center", 
	        		    	targets: [ 0,1,2,3,4,5,6,7 ] 
	        		    },
	        		    { width: 130, targets: [0,1,2,3,4,5,6,7] }
	        		]
	callServiceDataTablesTest('gridJoinList', tableOption, tableColumns, tableColumnDef, '/admin/joinMgmt/selectJoinList');
}


//------------------------------------------------------------------------------------------
//	EVENT	
//------------------------------------------------------------------------------------------
/**
 * 이벤트 초기화
 * @returns
 */
function initEvent(){
	makeiCheck('.fileChk, .viewChk');
	
	// join 관리 > 검색 버튼
	$("#btnSearch").on("click", function(){
		setGrid();
	});
	
	// join 관리 > 대분류 Select box 선택
	$("#mgmtSchemaList").on("change", function(){
		getTableList('mgmtTableList');
	});
	
	// join 관리 > 대분류 Select box 선택
	$("#mgmtSchemaList2").on("change", function(){
		getTableList('mgmtTableList2');
	});
	
	// join 관리 > 중분류 Select box 선택
	$("#mgmtTableList").on("change", function(){
		setGrid();
	});
	
	// join 관리 > 중분류 Select box 선택
	$("#mgmtTableList2").on("change", function(){
		setGrid();
	});
	
	// join 관리 > 신규 버튼
	$("#btnJoinMake").on("click", function(){
		// 연구항목 관리 스키마 리스트 1
		var dataSet = {
				TARGET_ITEM : "SCHEMA_1"
				, SEARCH_ITEM : "SCHEMA"
		};
		callService("mgmtData", "admin/joinMgmt/selectMgmtItemList", dataSet, "serviceCallback");
		setTimeout(function(){
			// 연구항목 관리 스키마 리스트 2
			var dataSet = {
					TARGET_ITEM : "SCHEMA_2"
					, SEARCH_ITEM : "SCHEMA"
			};
			callService("mgmtData", "admin/joinMgmt/selectMgmtItemList", dataSet, "serviceCallback");
		}, 500);
		// 초기화
		$("#TABLE_1, #TABLE_2, #COLUMN_1, #COLUMN_2").html("<option value='' selected >선택</option>");
		
	});
	
	// join 관리 > 삭제 버튼
	$(document).on("click", ".btnDelJoin", function(){
		var dataSet = {
				SCHEMA_1 : $(this).parents("tr").find("td").eq(1).text()
				,TABLE_1 : $(this).parents("tr").find("td").eq(2).text()
				,COLUMN_1 : $(this).parents("tr").find("td").eq(3).text()
				,SCHEMA_2 : $(this).parents("tr").find("td").eq(4).text()
				,TABLE_2 : $(this).parents("tr").find("td").eq(5).text()
				,COLUMN_2 : $(this).parents("tr").find("td").eq(6).text()
		};

		
		showConfirm('테이블 JOIN관리',COM_0005,function(e){					//삭제하시겠습니까?
			if(e){
				callService("setData", "admin/joinMgmt/deleteJoin", dataSet, "serviceCallback");
			}
			
		});
		
		
	});
	
	//  join 관리 > 신규 > 스키마 Select
	$("#SCHEMA_1, #SCHEMA_2").on("change", function(){
		var idVal = $(this).attr("id");
		var num = idVal.replace("SCHEMA_", "");
		var dataSet = {
				TARGET_ITEM : "TABLE_"+num	/* UI Select 구분 값 */
				, SEARCH_ITEM : "TABLE"			/* 조회 컬럼 */
				, SCHEMA_VAL : $(this).val()		/* 조건 스키마 값 */
		};
		
//		console.log("Schema Select Info >> " + JSON.stringify(dataSet));
		callService("mgmtData", "admin/joinMgmt/selectMgmtItemList", dataSet, "serviceCallback");
	});
	
	//  join 관리 > 신규 > 테이블 Select
	$("#TABLE_1, #TABLE_2").on("change", function(){
		var idVal = $(this).attr("id");
		var num = idVal.replace("TABLE_", "");
		var dataSet = {
				TARGET_ITEM : "COLUMN_"+num					/* UI Select 구분 값 */
				, SEARCH_ITEM : "COLUMN"						/* 조회 컬럼 */
				, SCHEMA_VAL : $("#SCHEMA_"+num).val()	/* 조건 스키마 값 */
				, TABLE_VAL : $(this).val()						/* 조건 테이블 값 */
		};
		
//		console.log("Table Select Info >> " + JSON.stringify(dataSet));
		callService("mgmtData", "admin/joinMgmt/selectMgmtItemList", dataSet, "serviceCallback");
	});
	
	//  join 관리 > 신규 > 등록 버튼
	$("#btnInsertJoin").on("click", function(){
		var check = false;
		
		$("#modalJoinReg select").each(function(){
			if($(this).val() != "") check = true;
			else check = false;
		});
		
		if(check == false){
			showAlert('테이블 JOIN관리','항목 값들을 모두 ' + COM_0014,null);
			return;
			
		}
		
		
		/*var dataSet = {
				SCHEMA_1 : $("#SCHEMA_1").val()
				,TABLE_1 : $("#TABLE_1").val()
				,COLUMN_1 :$("#COLUMN_1").val()
				,SCHEMA_2 : $("#SCHEMA_2").val()
				,TABLE_2 : $("#TABLE_2").val()
				,COLUMN_2 : $("#COLUMN_2").val()
		};*/
		
		var dataSet = {};
		
		dataSet.SCHEMA_1 = $("#SCHEMA_1").val();
		dataSet.TABLE_1 = $("#TABLE_1").val();
		dataSet.COLUMN_1 = $("#COLUMN_1").val();
		
		dataSet.SCHEMA_2 = $("#SCHEMA_2").val();
		dataSet.TABLE_2 = $("#TABLE_2").val();
		dataSet.COLUMN_2 = $("#COLUMN_2").val();
		
		callService("setData", "admin/joinMgmt/insertJoin", dataSet, "serviceCallback");
		
	});
	
}

var callServiceDataTablesTest = function(id, tableOption, tableColumns, tableColumnDef, ajaxURL){
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
			if(!isNull($('#mgmtSchemaList').val())){
				data.SCHEMA_1 = $("#mgmtSchemaList").val();	 //스키마명 
			}
			
			if(!isNull($('#mgmtSchemaList2').val())){
				data.SCHEMA_2 = $("#mgmtSchemaList2").val();	 //스키마명 
			}
			
			if(!isNull($('#mgmtTableList').val())){
				data.TABLE_1 = $("#mgmtTableList").val();	 //테이블명 
			}
			
			if(!isNull($('#mgmtTableList2').val())){
				data.TABLE_2 = $("#mgmtTableList2").val();	// 테이블명 
			}
			
			console.log(data);
			
			return JSON.stringify(data);
		},
		dataType:'json',
		headers: { 
			'Accept': 'application/json',
		    'Content-Type': 'application/json' 
		}
	};
	tableOption.columnDefs = tableColumnDef;
	tableOption.columns = tableColumns;
	
	$('#'+id).DataTable().destroy();
	var drawTable = $('#'+id).DataTable(
			tableOption
		).draw();
	
	drawTable.on('page.dt', function (e,settings) {
		var info = drawTable.page.info();
	    var page = info.page+1;
	    //alert('changed - page '+page+' out of '+info.pages+' is clicked');
		
	});
}

