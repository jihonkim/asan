/**
 * 승인요청 관리
 * @Page : approveMgmt.jsp
 */
//그리드번호 : column resize를 위해 번호를 담음 
var gridNum = 0;
var modalSearchData;
var modalSearchData2;
var gvBRCApprovMgmtResultSource;
/**
 * Application Ready
 */
$(document).ready(function(){
	
	//메뉴고정
	menuFix('admin_approveMgmt_approveMgmtMain');
	
	//승인요청현황 가져오기
	setGridRequest();
	
	setJqxGridApprovMgmtList();
	initEvent();
	
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
function serviceCallback_approveMgmt(svcId, result){
	if(result.ERR_CD != '0'){
		BootstrapDialog.alert(result.ERR_MSG);
		return;
	}
	
	switch(svcId){
		case "getItemContDetlList":
			console.log(result);
			drawStudyItemSavedResultApprove(result);
			
			break;
			
		case "setApproveData":
			console.log(result);
			
			BootstrapDialog.alert(COM_0001);
			$('#gridRequestList').dataTable().fnDraw();
			
			//승인관리SNS연동common_utils.js 	'승인자ID', 					'승인자명', 		'승인결과', 	'조건명', 		'조건 seq', 	'데이터 seq', 	'요청자 부서'		'요청자ID'		'요청자명'			'추출목적'			'사유'
			callSNS_ADMIN($.session.get('PER_CODE'), $.session.get('PER_NAME'), result.APRV_YN, result.CONDT_NM, result.CONT_SEQ, result.DATA_SEQ, result.DEPT_NAME, result.PER_CODE, result.PER_NAME, result.PURPOSE_CD, result.REJT_REASON);
			
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
}


//------------------------------------------------------------------------------------------
//USER FUNCTION	
//------------------------------------------------------------------------------------------

//승인요청/조회
function setGridRequest(){
		
	var tableOption = {
			searching:true,
			ordering:true,
			paging:true,
			//bPaginate:true,
			//processing: true,
			//serverSide: true,
			info: false,
			lengthMenu: [5,10],
			pageLength: 5,
			"order": [],
			pagingType: "full_numbers",
			dom: '<"top"<"display-inline-block pull-left"l><"display-inline-block pull-right"f> >rt<"bottom"p><"clear">',
			fnRowCallback: function( row, data, index ) {
				if ( data.APRV_YN == "Y" ){
					$( row ).addClass( "label-primary" );
				}else if ( data.APRV_YN == "N" ){
					$( row ).addClass( "label-danger" );
				}
			}
	};
	var tableColumns = [
			{ 
				data:"STAT",
				orderable:true,
				render: function ( data, type, row, meta ) {
					var html = '';
					if(data == 'S'){
						html += '대기';
					}
					else if(data == 'R'){
						html += '재신청';
					}
					else if(data == 'A'){
						html += '완료';			
					}
						
			        return html;
			    }
			},
			{ 
				data:"APRY_ID",
				orderable:true
			},
			{ 
				data:"IRB_ID",
				orderable:true
			},
			{ 
				data:"APRY_DT",
				orderable:true,
				render: function(data, type, row){  
	                return moment(data).format("YYYY-MM-D");
	            }
			},
			
			{ 
				data:"APRY_PER_NM",
				orderable:true,
				defaultContent:"이름없음"
			},
			
			{ 
				data:"APRV_PER_NM",
				orderable:true,
				defaultContent:"이름없음"
			},
			{ 
				data:"APRV_YN",
				orderable:true,
				defaultContent:""
			},
			{ 
				data:"APRV_DT",
				orderable:true,
				defaultContent:"",
				render: function(data, type, row){  
	                return moment(data).format("YYYY-MM-D");
	            }
			},
			{ 
				data:"APRY_PER_CODE",
				orderable:true,visible: false
			},
			{ 
				data:"APRV_PER_CODE",
				orderable:true,
				defaultContent:"",visible: false
			}
		];
	
	var tableColumnDef = [
			{ 
		    	className: "dt-body-center", 
		    	targets: [ 0,1,2,3,4,5,6,7] 
		    },
		    {
			    "order": [[ 3, "desc" ]]
		    },
		    { width: 150, targets: [0] },
		    { width: 150, targets: [2,6] },
		    { width: 200, targets: [1,3,7] }
		    //{ width: 50, targets: [0] }
	    ];
	
	var jsonData = {};
	console.log($('.approveNonChk').prop('checked')); //false가 선택된거 임
	//jsonData.PER_CODE = $.session.get("PER_CODE");
	jsonData.APROVE_FILTER = $('.approveNonChk').prop('checked'); //false가 선택된거 임
	
	callServiceDataTablesWithJson('gridRequestList', tableOption, tableColumns, tableColumnDef, '/admin/approveMgmt/getRequestList',jsonData);
	
	
	
};

function setJqxGridApprovMgmtList(){
	
	gvBRCApprovMgmtResultSource =
    {
        localdata: [],
        datafields:
 	       [
  	    	  { name: 'SEQ', type: 'number' },
 	    	  { name: 'PER_CODE', type: 'string' },
 	    	  { name: 'RESCH_PAT_ID', type: 'string' },
	          { name: 'EXAM_NO', type: 'string' },
	          { name: 'SPCN_TYP_CD', type: 'string' },
	          { name: 'SPCN_RSD_QT', type: 'number' },
	          { name: 'CNT_YN', type: 'number' },
	          { name: 'APRY_YN', type: 'string' },
	          { name: 'APRY_DT', type: 'date' },
	          { name: 'APRY_ID', type: 'string' },
	          { name: 'EXIST_YN', type: 'string' },
	          { name: 'BUCK_SEQ', type: 'number' },
	          { name: 'AGE', type: 'number' },
	          { name: 'CELL_ORGAN_DIV_CD', type: 'string' },
	          { name: 'DTL_ORGAN_CD', type: 'string' },
	          { name: 'KOR_NM', type: 'string' }
 	        ],
        datatype: "json",
        id: "SEQ"
    };
    var dataAdapter = new $.jqx.dataAdapter(gvBRCApprovMgmtResultSource, {
        downloadComplete: function (data, status, xhr) { },
        loadComplete: function (data) { },
        loadError: function (xhr, status, error) { }
    });
    
    var cellsrendererExist = function (row, columnfield, value, defaulthtml, columnproperties) {
    	var rowdata = $("#jqxGridResultWrap").jqxGrid('getrowdata',row);
    	var applyResult = rowdata;
    	var html ='';
    	if(value == 'Y'){
    		html += '<div class="row" style=" text-align: center;    margin-top: 2px;"><label for="exist_'+row+'_Y"><input type="radio" class="radio_exist_yn" name="radio_exist_yn'+rowdata.SEQ+'" seq="'+rowdata.SEQ+'" id="exist_'+rowdata.SEQ+'_Y" value="Y" checked> Y </label>';
			html += '&nbsp;&nbsp;<label for="exist_'+rowdata.SEQ+'_N"><input type="radio" class="radio_exist_yn" name="radio_exist_yn'+rowdata.SEQ+'" seq="'+rowdata.SEQ+'" id="exist_'+rowdata.SEQ+'_N" value="N"> N </label></div>';
		}
		else if(value == 'N'){
			html += '<div class="row" style=" text-align: center;    margin-top: 2px;"><label for="exist_'+row+'_Y"><input type="radio" class="radio_exist_yn" name="radio_exist_yn'+rowdata.SEQ+'" seq="'+rowdata.SEQ+'" id="exist_'+rowdata.SEQ+'_Y" value="Y" > Y </label>';
			html += '&nbsp;&nbsp;<label for="exist_'+rowdata.SEQ+'_N"><input type="radio" class="radio_exist_yn" name="radio_exist_yn'+rowdata.SEQ+'" seq="'+rowdata.SEQ+'" id="exist_'+rowdata.SEQ+'_N" value="N"  checked> N </label></div>';
		}
		else{
			html += '<div class="row" style=" text-align: center;    margin-top: 2px;"><label for="exist_'+row+'_Y"><input type="radio" class="radio_exist_yn" name="radio_exist_yn'+rowdata.SEQ+'" seq="'+rowdata.SEQ+'" id="exist_'+rowdata.SEQ+'_Y" value="Y"> Y </label>';
			html += '&nbsp;&nbsp;<label for="exist_'+rowdata.SEQ+'_N"><input type="radio" class="radio_exist_yn" name="radio_exist_yn'+rowdata.SEQ+'" seq="'+rowdata.SEQ+'" id="exist_'+rowdata.SEQ+'_N" value="N"> N </label></div>';
		}
    	//
        return html;
    }
    var cellsrendererCnt = function (row, columnfield, value, defaulthtml, columnproperties) {
    	var rowdata = $("#jqxGridResultWrap").jqxGrid('getrowdata',row);
    	var applyResult = rowdata;
    	var html ='';
    	
    	if(value == '1'){
    		html = '<div class="row" style=" text-align: center;    margin-top: 2px;">';
			html +=  'Y';
			html += '</div>';
		}
		else{
			html = '<div class="row" style=" text-align: center;    margin-top: 2px;">';
			html +=  'N';
			html += '</div> ';	
		}
        return html;
    }
    var cellsrendereSpcn = function (row, columnfield, value, defaulthtml, columnproperties) {
    	var rowdata = $("#jqxGridResultWrap").jqxGrid('getrowdata',row);
    	var applyResult = rowdata;
    	var html ='';
    	
    	if(value == 'T'){
    		html = '<div class="row" style=" text-align: center;    margin-top: 2px;">';
			html +=  'Tumor tissue';
			html += '</div>';
		}
		else if(value == 'N'){
    		html = '<div class="row" style=" text-align: center;    margin-top: 2px;">';
			html +=  'Normal tissue';
			html += '</div>';
		}
		else if(value == 'P'){
    		html = '<div class="row" style=" text-align: center;    margin-top: 2px;">';
			html +=  'Plasma';
			html += '</div>';
		}
		else if(value == 'B'){
    		html = '<div class="row" style=" text-align: center;    margin-top: 2px;">';
			html +=  'Buffy coat';
			html += '</div>';
		}
		else if(value == 'F'){
    		html = '<div class="row" style=" text-align: center;    margin-top: 2px;">';
			html +=  'Fluid';
			html += '</div>';
		}
		else if(value == 'U'){
    		html = '<div class="row" style=" text-align: center;    margin-top: 2px;">';
			html +=  'Urine';
			html += '</div>';
		}
        return html;
    }
    var cellclassSpcn = function (row, columnfield, value) {
    	var rowdata = $("#jqxGridResultWrap").jqxGrid('getrowdata',row);
    	var html ='';
    	
    	if (rowdata.SPCN_RSD_QT == 1) {
            return 'jqx-coral';
        }
    }
    var cellclassCnt = function (row, columnfield, value) {
        if (value == 1) {
            return 'jqx-coral';
        }
    }
    
    
    $("#jqxGridResultWrap").jqxGrid(
    {
    	height : '100%',
    	/*width : 465,*/
    	width: "100%",
    	editable: true,
    	theme: 'bootstrap',
    	pageable: true,
    	pagesize: 20,
		pagesizeoptions: ['10', '20', '30', '50', '100'],
    	//showfilterrow : true,
    	selectionmode: 'multiplerows',
    	filterable: true,
    	columnsresize: true,
    	columnsautoresize : true,
        source: dataAdapter,
        sortable : true,
        columns: 
        	[
        		{ text: "연구 번호",align: 'center', cellsalign: 'center' , datafield: 'RESCH_PAT_ID' , width: '10%', editable: false},
                { text: "BRC 번호",align: 'center', cellsalign: 'center' , datafield: 'EXAM_NO' , width: '10%', editable: false},
                { text: "장기",align: 'center', cellsalign: 'center' , datafield: 'CELL_ORGAN_DIV_CD' , width: '10%', editable: false, cellclassname : cellclassSpcn},
                { text: "세부장기", align: 'center', cellsalign: 'center' ,datafield: 'DTL_ORGAN_CD' , width: '10%', editable: false, cellclassname : cellclassSpcn},
                { text: "검체유형",align: 'center', cellsalign: 'center' , datafield: 'SPCN_TYP_CD' , width: '10%', editable: false, cellsrenderer: cellsrendereSpcn, cellclassname : cellclassSpcn},
                { text: "분양가능 검체수", align: 'center', cellsalign: 'center' ,datafield: 'SPCN_RSD_QT' , width: '10%', editable: false, cellclassname : cellclassCnt},
                { text: "나이", align: 'center', cellsalign: 'center' ,datafield: 'AGE' , width: '10%', editable: false},
                { text: "조직사용동의서 제출", align: 'center', cellsalign: 'center' ,datafield: 'CNT_YN' , width: '10%', editable: false , cellclassname : cellclassCnt, cellsrenderer: cellsrendererCnt},
                { text: "분양 가능",align: 'center', cellsalign: 'center' , datafield: 'EXIST_YN' ,width: '10%', editable: false, cellsrenderer : cellsrendererExist},
                { text: "집도의", align: 'center', cellsalign: 'center' ,datafield: 'KOR_NM' , width: '10%', editable: false}
        ]
    });
}

//연구항목 데이터 가져오기
function getItemContDetlListApproveMgmt(dataSet)
{
	
	var promise = http('common/modal/selBRCParcelDetlList', 'post', false , dataSet);
	promise.then(function(result){
		console.log(result);
		dataView = result.selBRCParcelDetlList;
		gvBRCApprovMgmtResultSource.localdata = dataView;
		
		$("#jqxGridResultWrap").jqxGrid('clear');			
		$("#jqxGridResultWrap").jqxGrid('updatebounddata', 'cells');
		
		
	});
	promise.fail(function(e){
		console.log(e);
	});
}

//승인요청관리 테이블 clear
function clearTable(){
	$('#gridRequestListArea').html('');
	var tableHtml = '';
	tableHtml = '<table width="100%" class="table table-bordered table-striped" id="gridRequestList" cellspacing="0">';
	tableHtml = tableHtml + '<thead>';
	tableHtml = tableHtml + 	'<tr>';
	tableHtml = tableHtml + 		'<th class="text-center">상태</th>';
	tableHtml = tableHtml + 		'<th class="text-center">접수번호</th>';
	tableHtml = tableHtml + 		'<th class="text-center">IRB번호</th>';
	tableHtml = tableHtml + 		'<th class="text-center">요청일자</th>';
	tableHtml = tableHtml + 		'<th class="text-center">요청자</th>';
	tableHtml = tableHtml + 		'<th class="text-center">승인자</th>';
	tableHtml = tableHtml + 		'<th class="text-center">승인여부</th>';
	tableHtml = tableHtml + 		'<th class="text-center">승인/<br>반려일자</th>';
	tableHtml = tableHtml + 	'</tr>';
	tableHtml = tableHtml + '</thead>';
	tableHtml = tableHtml + '</table>';
	
	$('#gridRequestListArea').html(tableHtml);
}

function AprvRegexp_filter(str_value){
	return str_value.replace(/[^imnx]/gi, ""); 
}


//------------------------------------------------------------------------------------------
//	EVENT	
//------------------------------------------------------------------------------------------
/**
 * 이벤트 초기화
 * @returns
 */
function initEvent(){
	$(document).on('click', '#gridRequestList tr', function(event) {
		if(event.target.localName == "td"){
			var SEQ = $('#gridRequestList').DataTable().row(this).data().SEQ;
			var STAT = $('#gridRequestList').DataTable().row(this).data().STAT
			var BUCK_SEQ = $('#gridRequestList').DataTable().row(this).data().BUCK_SEQ;
			var APRY_PER_CODE = $('#gridRequestList').DataTable().row(this).data().APRY_PER_CODE;
			var APRY_PER_NM = $('#gridRequestList').DataTable().row(this).data().APRY_PER_NM;
			var APRY_CONTENT = $('#gridRequestList').DataTable().row(this).data().APRY_CONTENT;
			var APRY_REASON = $('#gridRequestList').DataTable().row(this).data().APRY_REASON;
			var APRV_REASON = $('#gridRequestList').DataTable().row(this).data().APRV_REASON;

			
			var dataSet = {
				BUCK_SEQ : BUCK_SEQ,
				PER_CODE : APRY_PER_CODE
			};
			//modalSearchData2 = '';
			//modalSearchData2 = dataSet;
			getItemContDetlListApproveMgmt(dataSet);
			
			datatablesSelected(this, 'info');
			//$(this).toggleClass('selected');
			
			var tableData = $('#gridRequestList').DataTable().row(this).data();
			console.log(tableData);
			//선택된 meth_cd 종류
			//gvMethCd = $('#gridRequestList').DataTable().row(this).data().METH_CD;
		
			var dateFormat = getDateToString(tableData.APRY_DT);
			
			
			$('#seq').val(tableData.SEQ);												//승인관리 seq
			$('#STAT').val(tableData.STAT);										
			$('#BUCK_SEQ').val(tableData.BUCK_SEQ);										
			$('#APRY_CONTENT').val(tableData.APRY_CONTENT);								
			$('#APRY_REASON').val(tableData.APRY_REASON);
			$('#APRY_PER_CODE').val(tableData.APRY_PER_CODE);
			$('#APRV_REASON').val(tableData.APRV_REASON);
			$('#approveDivision').text(tableData.APRY_ID);							
			$('#approveDataName').text(tableData.IRB_ID);								
			$('#approveRequestNm').text(tableData.APRY_PER_NM);						
			//$('#approveGroup').text(tableData.DEPT_NAME);							
			$('#approveRequestDate').text(dateFormat);						
			
			$('#approveRequestPurpose').text(tableData.APRY_CONTENT);    
	        
			if(tableData.APRV_YN == "N"){
				$('input:radio[name="approveType"][value="N"]').iCheck('check');
				$('#approveReason').val(tableData.APRV_REASON);
				$('#approveReason').attr('disabled', false);
			}else{
				$('input:radio[name="approveType"][value="Y"]').iCheck('check');
				$('#approveReason').val(tableData.APRV_REASON);
				$('#approveReason').attr('disabled', false);
			}
		}
	});
	
	$('#btnApproveAllSelect').on('click',function(){
		$('#jqxGridResultWrap').jqxGrid('selectallrows');
	})
	$('#btnApproveAllunSelect').on('click',function(){
		$('#jqxGridResultWrap').jqxGrid('unselectallrows');
	})
	$('#btnApproveAllY').on('click',function(){
		var rowindexes = $('#jqxGridResultWrap').jqxGrid('getselectedrowindexes');
		for(var i=0; i<rowindexes.length; i++){
			var rowdata = $('#jqxGridResultWrap').jqxGrid('getrowdata', rowindexes[i]);
			$('#jqxGridResultWrap').jqxGrid('setcellvaluebyid', rowdata.SEQ, "EXIST_YN", 'Y');
		}
		
	})
	$('#btnApproveAllN').on('click',function(){
		var rowindexes = $('#jqxGridResultWrap').jqxGrid('getselectedrowindexes');
		for(var i=0; i<rowindexes.length; i++){
			var rowdata = $('#jqxGridResultWrap').jqxGrid('getrowdata', rowindexes[i]);
			$('#jqxGridResultWrap').jqxGrid('setcellvaluebyid', rowdata.SEQ, "EXIST_YN", 'N');
		}
	})
	
	
	makeiCheck('.approveChk, .approveNonChk');
	
	$(document).on('change','.radio_exist_yn',function(){
		var seq = $(this).attr('seq');
		var chk = $(this).val();
		$('#jqxGridResultWrap').jqxGrid('setcellvaluebyid', seq, "EXIST_YN", chk);
	});
	
	$("input:radio[name=approveType]").on('ifClicked', function(){
		if($(this).val() == "Y"){
			$('#approveReason').attr('disabled', false);
			$('#approveReason').val('');
		}else{
			$('#approveReason').attr('disabled', false);
		}
	});
	
	$('#btnApprove').on('click', function(){
		if($('#seq').val() == ""){
			BootstrapDialog.alert("요청 데이터를 선택해주십시오.");
			return;
		}else{
			if($("input:radio[name=approveType]:checked").val() == "N"){
				if($('#approveReason').val() == ""){
					BootstrapDialog.alert("사유를 " + COM_0014);
					return;
				}
			};
			
			var chkRows = $('#jqxGridResultWrap').jqxGrid('getrows');
			for(var i=0; i<chkRows.length; i++){
				if(isNullOrEmpty($('input[name="radio_exist_yn'+chkRows[i].SEQ+'"]:checked').val())){
					showAlert("알림","분양가능 여부를 모두 체크해주시기 바랍니다.",null);
					return;
				}
				//chkRows[i].EXIST_YN = $('input[name="radio_exist_yn'+chkRows[i].SEQ+'"]:checked').val();
			}
			
			var tableData = $('#gridRequestList').DataTable().rows('.info').data()[0];
			//STAT=#{STAT}, APRY_ID=#{APRY_ID}, BUCK_SEQ=#{BUCK_SEQ}, IRB_ID=#{IRB_ID}, APRY_CONTENT=#{APRY_CONTENT}, APRY_PER_CODE=#{APRY_PER_CODE}, APRY_DT=#{APRY_DT}, APRY_REASON=#{APRY_REASON},
			//APRV_PER_CODE=#{APRV_PER_CODE}, APRV_YN=#{APRV_YN}, APRV_REASON=#{APRV_REASON}, APRV_DT=now()
			var dataSet = {};
			dataSet.SEQ 				= $('#seq').val();
			dataSet.STAT 				= 'A';
			dataSet.APRY_ID 			= tableData.APRY_ID				
			dataSet.BUCK_SEQ 			= $('#BUCK_SEQ').val();
			dataSet.IRB_ID 				= tableData.IRB_ID
			dataSet.APRY_CONTENT 		= $('#APRY_CONTENT').val();	
			dataSet.APRY_PER_CODE		= tableData.APRY_PER_CODE		
			dataSet.APRY_REASON 		= $('#approveReason').val();
			dataSet.APRV_PER_CODE		= $.session.get("PER_CODE");
			dataSet.APRV_YN 			= $('input[name="approveType"]:checked').val();			
			dataSet.APRV_REASON 		= $('#approveReason').val();
			
			//
			var promise = http('admin/approveMgmt/updateApproveBRCApplyResultData', 'post', false , dataSet);
			promise.then(function(result){
				console.log(result);
				
				var dataSet2 = {};
				dataSet2.CHKROWS = chkRows;
				
				var promise2 = http('admin/approveMgmt/updateApproveBRCApplyData', 'post', false , dataSet2);
				promise2.then(function(result){
					console.log(result);
					showAlert("알림","승인/반려 처리 되었습니다.",null);
					$('#gridRequestList').DataTable().draw();
				});
				promise2.fail(function(e){
					console.log(e);
				});
			
			});
			promise.fail(function(e){
				console.log(e);
			});

			
			
		}
		
	});
	
	
	
	$(".approveNonChk").on('ifChecked', function(event){
		console.log("a");
		
		clearTable();
		
		setGridRequest();
	});
	
	$(".approveNonChk").on('ifUnchecked', function(event){
		console.log("b");
		
		clearTable();
		
		setGridRequest();
	});
	
	
}
