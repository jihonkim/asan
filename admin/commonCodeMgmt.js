/**
 * 공통코드 관리
 * @Page : commonCodeMgmt.jsp
 * 2018-03-16 : 상위그룹코드, 사용여부 추가
 */

var gvPageNo = 1;
var gvPagePerCount = 20;

var gvResult = {"dsCommonCodeList": []};

var gvSeq;
var gvGrpSeq = null;
var gvNode = null;


/**
 * Application Ready
 */
$(document).ready(function(){
	setGridGroup();
	
	initEvent();
	
	menuFix('admin_commonCodeMgmt_main');
	
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
				$('#btnCloseGroupCode').trigger('click');
				showAlert(null, COM_0001, function(e){
					setGridGroup();
				});
				
			}else if(result['ERR_CD'] == 2){		// 수정성공
				$('#btnCloseGroupCode').trigger('click');
				showAlert(null, COM_0002, function(e){
					setGridGroup();
				});
				
			}else if(result['ERR_CD'] == 3){		// 삭제성공
				$('#btnCloseGroupCode').trigger('click');
				showAlert(null, COM_0003, function(e){
					setGridGroup();
				});
				
			}else{							// 실패
				showAlert(null, COM_0008, null);
				
			}
			
			break;

		case "codeMgm_grpList":
			var html = "";
			for(var i = 0; i < result.data.length; i++){
				var code = result.data[i];
				var selected = "";
				if(i == 0) selected = "selected";
				/*html += "<option value='"+code.SEQ+"' "+selected+">"+code.COMM_GRP_NM+"</option>";*/
				html += "<option value='"+code.COMM_GRP_ID+"' "+selected+">"+code.COMM_GRP_NM+"</option>";
			}
			$("#cGrpCode").append(html);
			break;
			
		case "codeOrderList":
			$("#cCodeOrder").attr("disabled", "disabled");
			$("#cCodeOrder").val(result.maxSort);
			break;
		
		case "setDataCode":
			
			var tableCommonGroupCode = $('#gridCommonGroupCodeList').DataTable();
			var idx = tableCommonGroupCode.row('.info')[0][0];
			var data = tableCommonGroupCode.row(idx).data();
			
			if(result['ERR_CD'] == 1){		// 저장성공
				$('#btnCloseCode').trigger('click');
				showAlert(null, COM_0001, null);
				
			}else if(result['ERR_CD'] == 2){		// 수정성공
				$('#btnCloseCode').trigger('click');
				showAlert(null, COM_0002, null);
				
			}else if(result['ERR_CD'] == 3){		// 삭제성공
				$('#btnCloseCode').trigger('click');
				showAlert(null, COM_0003, null);
				
				
			}else{							// 실패
				showAlert(null, COM_0008, null);
			}
			
			//setGridGroup();
			setGridCode(data.COMM_GRP_ID);
			
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
	var table = $('#gridCommonCodeList').DataTable();
	table.draw();
}


//------------------------------------------------------------------------------------------
//USER FUNCTION	
//------------------------------------------------------------------------------------------
function setGridGroup()
{
	// 그룹코드 리스트 그리드
	var tableOption = {
		searching:true,
		ordering:false,
		info:false,
		processing: true,
		serverSide: true,
		scrollY:"220px",
		scrollCollapse:true
			
		
	};
	
	var tableColumns = [
		{ 
			data:"COMM_GRP_ID",
			defaultContent: ""
		},
		{ 
			data:"COMM_GRP_NM" ,defaultContent: ""
		},
		{ data:"SEQ",
			orderable:false,
			render:function(data,type,row,meta){
				var html = '';

				html = html + '<button class="btn btn-success btnModGrpCode btn-xs" val="' + data + '"><i class="ion ion-gear-a"></i></button>';
				html = html + "&nbsp;&nbsp;";
				html = html + '<button class="btn btn-danger btnDelGrpCode btn-xs" val="' + data + '"><i class="ion ion-trash-a"></i></button>';		 
				
				return html;
			}
			
		}
	];
	
	var tableColumnDef = [
		{ 
			className: "dt-body-center", 
			targets: [ 2 ]
		},
		{ 
			width: "100px", 
			targets: [ 0 ]
		}
	];
	
	callServiceDataTablesTest('gridCommonGroupCodeList'
							 ,tableOption
							 ,tableColumns
							 ,tableColumnDef
							 ,false
							 ,'/admin/commonCodeMgmt/groupCodeList');
	
	// 클릭 이벤트(색상 표기)
	$('#gridCommonGroupCodeList').on('click', 'tr', function(event) {
		datatablesSelected(this, 'info');
	});
	
	
	
}

/**
 * 공통코드
 * @param seq
 * @returns
 */
function setGridCode(seq)
{
	// 코드 리스트 그리드
	var tableOption = {
			searching:false,
			ordering:false,
			paging:true,
			info:false,
			bPaginate:true,
			processing: true,
			serverSide: true
	};
	
	
	var tableColumns = [
		{ data:"COMM_GRP_ID" ,defaultContent: ""	,orderable:false,		},
		{ data:"COMM_CD_ID" 		},
		{ data:"COMM_CD_NM" 		},
		{ data:"UPPER_COMM_CD_ID" ,defaultContent: ""	},
		{ data:"COMM_CD_EXT1" ,defaultContent: ""	},
		{ data:"COMM_CD_EXT2" ,defaultContent: ""	},
		{ data:"COMM_CD_EXT3" ,defaultContent: ""	},
		{ data:"USE_YN" 		},
		{ data:"SORT" 		},
		{ data:"SEQ",
			orderable:false,
			render:function(data,type,row,meta){
				var html = '';
	
				html = html + '<button class="btn btn-success btn-xs btnModCode" val="' + data + '"><i class="ion ion-gear-a"></i></button>';
				html = html + "&nbsp;&nbsp;";
				html = html + '<button class="btn btn-danger btn-xs btnDelCode" val="' + data + '"><i class="ion ion-trash-a"></i></button>';		 
				
				return html;
			}
			
		}		
	];
	
	var tableColumnDef = [
		{ 
			className: "dt-body-center", 
	    	targets: [ 0,1,3,7,8,9 ] 
		},
		{
			orderable:false,
			targets: [0,1,2,3,4,5] 
		}
	];
	
	callServiceDataTablesTest('gridCommonCodeList'
							,tableOption
							,tableColumns
							,tableColumnDef
							,true
							,'/admin/commonCodeMgmt/codeList', seq);
	
	
}


//------------------------------------------------------------------------------------------
//	EVENT	
//------------------------------------------------------------------------------------------
/**
 * 이벤트 초기화
 * @returns
 */
function initEvent(){
	makeiCheck('.codeYN');
	
	
	
	// 그룹코드 관리 이벤트
	$('#gridCommonGroupCodeList tbody').on('click','td',function() {
		var table = $('#gridCommonGroupCodeList').DataTable();
		
		var rowIdx 	= table.row($(this).parents('tr')[0]);
		var data = table.rows(rowIdx).data()[0];

		setGridCode(data.COMM_GRP_ID);
		
		
	});
	
	// 그룹코드 관리 > 그룹코드 생성 버튼 클릭
	$("#btnGroupCodeMake").on("click", function(){
		var data = {};
		
		$("#vCommGrpId").prop('disabled',false);
		$("#vSEQ").val('');
		$("#vUpperCommGrpId").val('');
		$("#vCommGrpId").val('');
		$("#vCommGrpNm").val('');
		
		// 버튼명 변경
		$("#btnGroupCode").text("등록");
		
	});
	
	
	// 그룹코드 관리  > 수정 버튼 클릭 이벤트
	$(document).on("click", ".btnModGrpCode", function(){
		var table = $('#gridCommonGroupCodeList').DataTable();
		var rowIdx 	= table.row($(this).parents('tr')[0]);
		
		gvNode 	= table.row($(this).parents('tr')).node();
		
		var data = table.rows(rowIdx).data()[0];
		
		
		$("#vSEQ").val('');
		$("#vUpperCommGrpId").val('');
		$("#vCommGrpId").val('');
		$("#vCommGrpNm").val('');
		
		
		$("#vCommGrpId").prop('disabled',true);
		$("#vSEQ").val(data.SEQ);
		$("#vUpperCommGrpId").val(data.UPPER_COMM_GRP_ID);
		$("#vCommGrpId").val(data.COMM_GRP_ID);
		$("#vCommGrpNm").val(data.COMM_GRP_NM);
		
		gvGrpSeq = rowIdx[0];
		
		// 버튼명 변경
		$("#btnGroupCode").text("수정");
		
		var dlg = $('#modalGroupCodeReg').modal();
		dlg.find('.modal-title').text('그룹코드 수정');
		dlg.modal('show');
	});
	
	
	
	// 그룹코드 관리  > 삭제 버튼 클릭 이벤트
	$(document).on("click", ".btnDelGrpCode", function(){
		var table = $('#gridCommonGroupCodeList').DataTable();
		
		gvSeq = $(this).attr("val");
		
		showConfirm(null, COM_0005, function(result){
			if(result) {
				var dataSet = {
        			SEQ : gvSeq
        		};

        		callService("setData", "admin/commonCodeMgmt/deleteGroupCode", dataSet, "serviceCallback");
            }
		});
	});
	
	
	// 그룹코드 관리 > 그룹코드 생성 > 등록or수정 버튼 클릭 이벤트
	$("#btnGroupCode").on("click", function(){
		if(isNull($('#vCommGrpId').val())){		
			showAlert(null,'그룹코드ID는 ' + COM_0010,function(e){
				$('#vCommGrpId').focus();	
			});
			
			return;
		}
		
		if($('#vCommGrpNm').val().replace(/ /g, '') == ''){		
			showAlert(null,'그룹코드명은 ' + COM_0010,function(e){
				$('#vCommGrpNm').focus();	
			});
			return;
		}
		
		
		var dataSet = {};
		
		if($(this).text() == "등록"){
			dataSet.UPPER_COMM_GRP_ID = $("#vUpperCommGrpId").val();
			dataSet.COMM_GRP_ID = $("#vCommGrpId").val();
			dataSet.COMM_GRP_NM = $("#vCommGrpNm").val();
			dataSet.CRT_ID = $.session.get('PER_CODE');
			dataSet.UDT_ID = $.session.get('PER_CODE');
			
			callService("setData", "admin/commonCodeMgmt/insertGroupCode", dataSet, "serviceCallback");
		
		}else{
			dataSet.SEQ = $("#vSEQ").val();
			dataSet.COMM_GRP_ID = $("#vCommGrpId").val();
			dataSet.COMM_GRP_NM = $("#vCommGrpNm").val();
			dataSet.UPPER_COMM_GRP_ID = $("#vUpperCommGrpId").val();
			dataSet.UDT_ID = $.session.get('PER_CODE');
			
			callService("setData", "admin/commonCodeMgmt/updateGroupCode", dataSet, "serviceCallback");

		}
		
		
	});
	
	
	
	// ----------------------------------------------
	// 코드관리 이벤트
	
	$('#btnSearch').on('click',function(e){
		if(isNull($('#searchVal').val())){
			showAlert(null, COM_0006, null);	//검색어를 입력하세요
			return;
		}
		
		var table = $('#gridCommonGroupCodeList').DataTable();
		var idx = table.row('.info')[0][0];
		var data = table.row(idx).data();
		
		setGridCode(data.COMM_GRP_ID);
		
	});
	
	
	$('#searchVal').on('keypress',function(e){
		if(e.keyCode == 13){
			if(isNull($('#searchVal').val())){
				showAlert(null, COM_0006, null);	//검색어를 입력하세요
				return;
			}
			
			var table = $('#gridCommonGroupCodeList').DataTable();
			var idx = table.row('.info')[0][0];
			var data = table.row(idx).data();
			
			setGridCode(data.COMM_GRP_ID);
		}
		
	});
	
	
	// 코드등록
	$('#btnCodeMake').on('click', function(e){
		var table = $('#gridCommonGroupCodeList').DataTable();
		var idx = table.row('.info')[0][0];
		var data = table.row(idx).data();
		
		var dataSet = {};
		var html = "";
		
		//data 초기화
		$("#codeSeq").val('');
		$("#cGrpCode").val('');
		$("#cCode").val('');
		$("#cCodeName").val('');
		$("#cUpperCommCdId").val('');		
		$("#commCdExt1").val('');
		$("#commCdExt2").val('');
		$("#commCdExt3").val('');
		$("#cCodeDesc").val('');
		
		
		$("#cCodeOrder").val('');
		
		$("#btnCode").text("등록");	// 버튼명 변경
		
		
		http("admin/commonCodeMgmt/codeGroupCodeList",'post',false, dataSet).then(function(result){
			html = '';			
			for(var i = 0; i < result.data.length; i++){
				var code = result.data[i];
				var selected = "";
				
				if( data.COMM_GRP_ID === code.COMM_GRP_ID){
					selected = 'selected';
				}
				
				html += "<option value='"+code.COMM_GRP_ID+"' "+selected+">"+code.COMM_GRP_NM+"</option>";
			}
			
			$("#cGrpCode").append(html);
			$("#cGrpCode").prop('disabled',true)
			
		});
		
		
		html = "";
		
		dataSet = {
			COMM_GRP_SEQ : data.SEQ,
			COMM_GRP_ID : data.COMM_GRP_ID
		};
		
		http("admin/commonCodeMgmt/codeOrderList",'post',false, dataSet).then(function(result){
			$("#cCodeOrder").val(result.maxSort);
			
		});
		
	});
	
	
	// 코드관리 > 코드생성 버튼 > 등록/수정
	$("#btnCode").on("click", function(){
		var table = $('#gridCommonGroupCodeList').DataTable();
		var idx = table.row('.info')[0][0];
		var data = table.row(idx).data();

		
		if($('#cCode').val().replace(/ /g, '') == ''){		
			showAlert('공통코드관리', '코드는 ' + COM_0010, null);		//~필수항목입니다.
			return;
		}
		
		if($('#cCodeName').val().replace(/ /g, '') == ''){		
			showAlert('공통코드관리', '코드명은 ' + COM_0010, null);	//~필수항목입니다.
			return;
		}
		
		
		//등록
		if($(this).text() == "등록"){
			var dataSet = {};
			
			dataSet.COMM_GRP_SEQ = 	data.SEQ;	
			dataSet.COMM_GRP_ID  = 	$("#cGrpCode").val();	
			dataSet.COMM_CD_ID	 =	$("#cCode").val()		;
			dataSet.COMM_CD_NM	 =	$("#cCodeName").val()	;
			dataSet.UPPER_COMM_CD_ID	 =	$("#cUpperCommCdId").val()	;
			
			dataSet.COMM_CD_EXT1 =	$("#commCdExt1").val()	;
			dataSet.COMM_CD_EXT2 =	$("#commCdExt2").val()	;
			dataSet.COMM_CD_EXT3 =	$("#commCdExt3").val()	;
			
			dataSet.COMM_CD_DESC =	$("#cCodeDesc").val()	;	
			dataSet.SORT		 =	$("#cCodeOrder").val()	;	
			dataSet.USE_YN		 =	$(":input:radio[name=cCodeYN]:checked").val();
			dataSet.CRT_ID		 =	$.session.get('PER_CODE');
			dataSet.UDT_ID		 =	$.session.get('PER_CODE');
			
			callService("setDataCode","admin/commonCodeMgmt/insertCode"
						,dataSet,"serviceCallback");
			
		//수정
		}else{	// 수정
			var dataSet = {};
			
			dataSet.SEQ = $("#codeSeq").val()	;
			dataSet.COMM_GRP_ID  = 	$("#cGrpCode").val()	;	
			dataSet.COMM_CD_ID	 =	$("#cCode").val()		;
			dataSet.COMM_CD_NM	 =	$("#cCodeName").val()	;	
			dataSet.UPPER_COMM_CD_ID	 =	$("#cUpperCommCdId").val()	;
			
			dataSet.COMM_CD_EXT1 =	$("#commCdExt1").val()	;
			dataSet.COMM_CD_EXT2 =	$("#commCdExt2").val()	;
			dataSet.COMM_CD_EXT3 =	$("#commCdExt3").val()	;
			
			dataSet.COMM_CD_DESC =	$("#cCodeDesc").val()	;	
			dataSet.SORT		 =	$("#cCodeOrder").val()	;	
			dataSet.USE_YN		 =	$(":input:radio[name=cCodeYN]:checked").val();
			dataSet.UDT_ID		 =	$.session.get('PER_CODE');
			
			callService("setDataCode","admin/commonCodeMgmt/updateCode"
						,dataSet,"serviceCallback");
		}
		
	});
	
	
	

	$(document).on("click", ".btnModCode", function(){
		var tableCommonCode = $('#gridCommonCodeList').DataTable();
		var tr = $(this).parents("tr");
		
		var dsCommonCode = tableCommonCode.row(tr).data();
		
		var dataSet = {};
		dataSet.COMM_GRP_ID = dsCommonCode.COMM_GRP_ID;
		

		http("admin/commonCodeMgmt/codeGroupCodeList",'post', false, dataSet).then(function(result){
			var html = '';	
			
			for(var i = 0; i < result.data.length; i++){
				var code = result.data[i];
				var selected = "";
				
				if( dsCommonCode.COMM_GRP_ID === code.COMM_GRP_ID){
					selected = 'selected';
				}
				
				html += "<option value='"+code.COMM_GRP_ID+"' "+selected+">"+code.COMM_GRP_NM+"</option>";
			}
			
			$("#cGrpCode").append(html);
			$("#cGrpCode").prop('disabled',true);
			
		});
		
		gvSeq = $(this).attr("val");
		
		$("#codeSeq").val(dsCommonCode.SEQ);
		$("#cGrpCode").val(dsCommonCode.COMM_GRP_ID);
		$("#cCode").val(dsCommonCode.COMM_CD_ID);
		$("#cCodeName").val(dsCommonCode.COMM_CD_NM);
		$("#cUpperCommCdId").val(dsCommonCode.UPPER_COMM_CD_ID);
		$("#commCdExt1").val(dsCommonCode.COMM_CD_EXT1);
		$("#commCdExt2").val(dsCommonCode.COMM_CD_EXT2);
		$("#commCdExt3").val(dsCommonCode.COMM_CD_EXT3);
		$("#cCodeDesc").val(dsCommonCode.COMM_CD_DESC);
		
		$("#cCodeOrder").val(dsCommonCode.SORT);
		
		if(dsCommonCode.USE_YN === 'Y'){
			$("input:radio[name=cCodeYN]").eq(0).iCheck("check");
			
		}else{
			$("input:radio[name=cCodeYN]").eq(1).iCheck("check");
			
		}
		
//		Modal Display	
		$("#btnCode").text("수정");	// 버튼명 변경
		
		var dlg = $('#modalCodeReg').modal();
		dlg.find('.modal-title').text('공통코드 수정');
		dlg.modal('show');
		
	});


	//코드 관리  > 삭제 버튼 클릭 이벤트
	$(document).on("click", ".btnDelCode", function(){
		// 시퀀스 값 저장
		gvSeq = $(this).attr("val");
		
		showConfirm(null, COM_0005, function(result){
			if(result) {
				var dataSet = {};
	        	
	        	dataSet.SEQ = gvSeq;

	    		callService("setDataCode"
	    					,"admin/commonCodeMgmt/deleteCode"
	    					,dataSet
	    					,"serviceCallback");
	        }
		});		
	});
	
}




var callServiceDataTablesTest = function(id, tableOption, tableColumns, tableColumnDef, bPaginiation, ajaxURL, seq){
	tableOption.data = [];
	tableOption.paging = bPaginiation;
	tableOption.bPaginate = bPaginiation;
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
		async:false,
		data:function(data){
			if($('#searchKey').val() != '' && $('#searchKey').val() != undefined){
				data.SEARCH_KEY=$('#searchKey').val();
			}
			if($('#searchVal').val() != '' && $('#searchVal').val() != undefined){
				data.SEARCH_VAL=$('#searchVal').val();
			}
			if(seq != undefined){
				//data.COMM_GRP_SEQ = seq;
				data.COMM_GRP_ID = seq;
			}
			
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
	var drawTable = $('#'+id).DataTable(tableOption).draw();
	
	drawTable.on('page.dt', function (e,settings) {
		var info = drawTable.page.info();
		var page = info.page+1;
	    //alert('changed - page '+page+' out of '+info.pages+' is clicked');
		
	});
	
	if(id === 'gridCommonGroupCodeList'){
		if(isNull(gvGrpSeq)){
			var table = $('#gridCommonGroupCodeList').DataTable();

			table.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
				if(rowIdx == 0){
					var node = this.node();
					var data = this.data();
					datatablesSelected(node, 'info');
					
					setGridCode(data.COMM_GRP_ID);
				} 
	        } );
			
			
		}else{
			var table = $('#gridCommonGroupCodeList').DataTable();

			table.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
				if(rowIdx == gvGrpSeq[0]){
					var node=this.node();
					datatablesSelected(node, 'info');
					
					
				} 
	        } );
			
			gvGrpSeq = null;
			
		}
	}

	
	
};

















/*
function codeEvent(){
	// 모달창 > 그룹코드 Select 리스트 
	var dataSet = {
	};
	callService("codeMgm_grpList", "admin/commonCodeMgmt/codeGroupCodeList", dataSet, "serviceCallback");
	
	// 코드관리 > 검색 버튼
	$("#btnSearch").on("click", function(){
		setGridCode();
	});
	
	
	// 코드 관리 > 코드 생성 > 취소 버튼 
	$("#btnCloseCode").on("click", function(){
		$("#btnCode").text("등록");
	});
	// 코드관리 > 코드생성 버튼 > 그룹코드 Select
	$("#cGrpCode").on("change", function(){
		// 코드 순서 max 값
		var dataSet = {
				COMM_GRP_SEQ : $("#cGrpCode").find(":selected").val()
		};
		callService("codeOrderList", "admin/commonCodeMgmt/codeOrderList", dataSet, "serviceCallback");
	});
	
	// 코드관리 > 코드생성 버튼 > 등록/수정
	$("#btnCode").on("click", function(){
		var tableCommonGroupCode = $('#gridCommonGroupCodeList').DataTable();
		var idx = tableCommonGroupCode.row('.info')[0][0];
		var data = tableCommonGroupCode.row(idx).data();

		
		if($('#cCode').val().replace(/ /g, '') == ''){		
			showAlert('공통코드관리', '코드는 ' + COM_0010, null);		//~필수항목입니다.
			return;
		}
		
		if($('#cCodeName').val().replace(/ /g, '') == ''){		
			showAlert('공통코드관리', '코드명은 ' + COM_0010, null);	//~필수항목입니다.
			return;
		}
		
		
		//등록
		if($(this).text() == "등록"){
			var dataSet = {};
			
			dataSet.COMM_GRP_SEQ = 	data.SEQ;	
			dataSet.COMM_GRP_ID  = 	data.COMM_GRP_ID;	
			dataSet.COMM_CD_ID	 =	$("#cCode").val()		;
			dataSet.COMM_CD_NM	 =	$("#cCodeName").val()	;
			
			dataSet.COMM_CD_EXT1 =	$("#commCdExt1").val()	;
			dataSet.COMM_CD_EXT2 =	$("#commCdExt2").val()	;
			dataSet.COMM_CD_EXT3 =	$("#commCdExt3").val()	;
			
			dataSet.COMM_CD_DESC =	$("#cCodeDesc").val()	;	
			dataSet.SORT		 =	$("#cCodeOrder").val()	;	
			dataSet.USE_YN		 =	$(":input:radio[name=cCodeYN]:checked").val();
			dataSet.CRT_ID		 =	$.session.get('PER_CODE');
			
			callService("setDataCode","admin/commonCodeMgmt/insertCode"
						,dataSet,"serviceCallback");
			
		//수정
		}else{	// 수정
			var dataSet = {};
			
			dataSet.SEQ = $("#codeSeq").val()	;
			dataSet.COMM_GRP_ID  = 	$("#cGrpCode").val()	;	
			dataSet.COMM_CD_ID	 =	$("#cCode").val()		;
			dataSet.COMM_CD_NM	 =	$("#cCodeName").val()	;	
			
			dataSet.COMM_CD_EXT1 =	$("#commCdExt1").val()	;
			dataSet.COMM_CD_EXT2 =	$("#commCdExt2").val()	;
			dataSet.COMM_CD_EXT3 =	$("#commCdExt3").val()	;
			
			dataSet.COMM_CD_DESC =	$("#cCodeDesc").val()	;	
			dataSet.SORT		 =	$("#cCodeOrder").val()	;	
			dataSet.USE_YN		 =	$(":input:radio[name=cCodeYN]:checked").val();
			dataSet.UDT_ID		 =	$.session.get('PER_CODE');
			
			callService("setDataCode","admin/commonCodeMgmt/updateCode"
						,dataSet,"serviceCallback");
		}
		
	});
	
	
	// 코드 관리  > 수정 버튼 클릭 이벤트
	$(document).on("click", ".btnModCode", function(){
		var tableCommonCode = $('#gridCommonCodeList').DataTable();
		var tr = $(this).parents("tr");
		
		var dsCommonCode = tableCommonCode.row(tr).data();
		
		console.log(dsCommonCode)
		
		gvSeq = $(this).attr("val");
		
		$("#codeSeq").val(dsCommonCode.SEQ);
		$("#cGrpCode").val(dsCommonCode.COMM_GRP_ID);
		$("#cCode").val(dsCommonCode.COMM_CD_ID);
		$("#cCodeName").val(dsCommonCode.COMM_CD_NM);
		
		$("#commCdExt1").val(dsCommonCode.COMM_CD_EXT1);
		$("#commCdExt2").val(dsCommonCode.COMM_CD_EXT2);
		$("#commCdExt3").val(dsCommonCode.COMM_CD_EXT3);
		$("#cCodeDesc").val(dsCommonCode.COMM_CD_DESC);
		
		$("#cCodeOrder").val(dsCommonCode.SORT);
		
		if(dsCommonCode.USE_YN === 'Y'){
			$("input:radio[name=cCodeYN]").eq(0).iCheck("check");
			
		}else{
			$("input:radio[name=cCodeYN]").eq(1).iCheck("check");
			
		}
		$("#cCodeOrder").val($(this).parents("tr").find("td").eq(5).text()).removeAttr("disabled");
		$("#changeSort").val($("#cCodeOrder").val());
		
		
	//	Modal Display	
		$("#btnCode").text("수정");	// 버튼명 변경
		$("#btnCodeMake").click();	// 팝업
		
		
		// 모달 세팅
		
		$("#cGrpCode").val($(this).parents("tr").find("td").eq(1).text());
		$("#cCode").val($(this).parents("tr").find("td").eq(2).text());
		$("#cCodeName").val($(this).parents("tr").find("td").eq(3).text());
		if($(this).parents("tr").find("td").eq(4).text() == "Y"){
			$("input:radio[name=cCodeYN]").eq(0).iCheck("check");
		}else{
			$("input:radio[name=cCodeYN]").eq(1).iCheck("check");
		}
		$("#cCodeOrder").val($(this).parents("tr").find("td").eq(5).text()).removeAttr("disabled");
		
		// 바뀌 SORT 
		$("#changeSort").val($("#cCodeOrder").val());
		
		// 버튼명 변경
		$("#btnCode").text("수정");
		// 팝업
		$("#btnCodeMake").click();
		
	});
	
	
	// 코드관리 > 코드생성 버튼
	$("#btnCodeMake").on("click", function(){
		var check = $("#btnCode").text();
		if(check == "등록"){
			// 초기화
			$("#cGrpCode > option:first").prop('selected', true);
			$("#cCode").val("");
			$("#cCodeName").val("");
			$("input:radio[name=cCodeYN]").eq(0).iCheck("check");
//			console.log("select >> "+$("#cGrpCode").find(":selected").val());
			// 코드 순서 max 값
			var dataSet = {
					COMM_GRP_SEQ : $("#cGrpCode").find(":selected").val()
			};
			callService("codeOrderList", "admin/commonCodeMgmt/codeOrderList", dataSet, "serviceCallback");
		}
		
	});
	
	// 코드 관리  > 삭제 버튼 클릭 이벤트
	$(document).on("click", ".btnDelCode", function(){
		// 시퀀스 값 저장
		gvSeq = $(this).attr("val");
		
		showConfirm(null, COM_0005, function(result){
			if(result) {
				var dataSet = {};
            	
            	dataSet.SEQ = gvSeq;

        		callService("setDataCode"
        					,"admin/commonCodeMgmt/deleteCode"
        					,dataSet
        					,"serviceCallback");
            }
		});		
	});
}
*/



/*
function groupEvent(){
	// 그룹코드 관리 > 리스트 > 그룹코드 항목 클릭 이벤트
	$(document).on("click",".btnShowCode",function(){
		var groupSeq = $(this).attr('num');
		setGridCode(groupSeq);
		
		var dataSet = {
				COMM_GRP_SEQ : groupSeq
		};
		console.log(dataSet.COMM_GRP_SEQ);
		

	});
	
	
	$(document).on("click",".btnCommGrpId",function(){
		var commGrpId = $(this).attr('commGrpId');
		setGridCode(commGrpId);

	});
	
	// 그룹코드 관리 > 그룹코드 생성 버튼 클릭
	$("#btnGroupCodeMake").on("click", function(){
		var check = $("#btnGroupCode").text();
		if(check == "등록"){
			$("#vGroupCodeId").attr('disabled',false);
			$("#vGroupCodeId").val('');
			$("#vGroupCodeName").val("");
		}
	});
	
	// 그룹코드 관리 > 그룹코드 생성 > 취소 버튼 
	$("#btnCloseGroupCode").on("click", function(){
		$("#btnGroupCode").text("등록");
	});
	
	// 그룹코드 관리 > 그룹코드 생성 > 등록or수정 버튼 클릭 이벤트
	$("#btnGroupCode").on("click", function(){
		if(isNull($('#vGroupCodeId').val())){		
			showAlert(null,'그룹코드ID는 ' + COM_0010,function(e){
				$('#vGroupCodeId').focus();	
			});
			
			return;
		}
		
		if($('#vGroupCodeName').val().replace(/ /g, '') == ''){		
			showAlert(null,'그룹코드명은 ' + COM_0010,function(e){
				$('#vGroupCodeName').focus();	
			});
			return;
		}
		
		
		var dataSet = {};
		
		// 등록 
		if($(this).text() == "등록"){
			dataSet.UPPER_COMM_GRP_ID = $("#vUpperGroupCodeId").val();
			dataSet.COMM_GRP_ID = $("#vGroupCodeId").val();
			dataSet.COMM_GRP_NM = $("#vGroupCodeName").val();
			dataSet.CRT_ID = $.session.get('PER_CODE');
			
			callService("setData", "admin/commonCodeMgmt/insertGroupCode", dataSet, "serviceCallback");
		
		// 수정
		}else{
			dataSet.COMM_GRP_NM = $("#vGroupCodeName").val();
			dataSet.UDT_ID = $.session.get('PER_CODE');
			dataSet.SEQ = gvSeq;
			
			callService("setData", "admin/commonCodeMgmt/updateGroupCode", dataSet, "serviceCallback");

		}
	
		
	});
	
}*/
