/**
 * 사용자관리
 * @Page : boardManagement.jsp
 */

var gvPageNo = 1;
var gvPagePerCount = 20;

var gvResult = {
		"dsBoardMgmtList": []
	};



/**
 * Application Ready
 */
$(document).ready(function(){
	setGrid();
	
	initEvent();
	
	getData();
	
	//메뉴고정
	menuFix('admin_board_boardManagement');
	
	getAuthData();
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
		case "getAuth":
			//console.log(JSON.stringify(result));
			//selectbox 만들기
			makeSelectBox('vBoardAuth', result['dsAutinxList'], 'AUT_CODE', 'AUT_NAME');
			break;
			
		case "getData":
			console.log(JSON.stringify(result));
			
			$('#gridBoardList').dataTable().fnClearTable();
			
			if(result.dsBoardMgmtList.length > 0){
				$('#gridBoardList').dataTable().fnAddData(result.dsBoardMgmtList);
			}
			
			gvResult['dsBoardMgmtList'] = result.dsBoardMgmtList;
			
			arrowDisable();
			
			break;
			
		case "setData":
			//ERR_CD
			//console.log(JSON.stringify(result));
			if(result['ERR_CD'] == 0){		//저장성공
				BootstrapDialog.alert(COM_0001, function(){
					$('#btnCloseBoard').trigger('click');
		        });
				getData();
			}else{							//저장 실패
				BootstrapDialog.alert(COM_0008);
			}
			
			break;
			
		case "delData":
			//ERR_CD
			//console.log(JSON.stringify(result));
			if(result['ERR_CD'] == 0){		//저장성공
				BootstrapDialog.alert(COM_0003);
				getData();
			}else{							//저장 실패
				BootstrapDialog.alert(COM_0009);
			}
			
			break;
			
		case "setOrderData":
			if(result['ERR_CD'] == 0){
				getData();
			}else{							//저장 실패
				BootstrapDialog.alert(COM_0008);
			}
			
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
	var dataSet = {};
	
	dataSet.SEARCH_KEY = $('#searchKey').val();
	dataSet.SEARCH_VAL = $('#searchVal').val();
	
	//console.log(JSON.stringify(dataSet));
	
	callService("getData", "admin/board/selectBoardMgmt", dataSet, "serviceCallback");
	
}

function getAuthData(){
	var dataSet = {};
	
	callService("getAuth", "admin/auth/selectAuthList", dataSet, "serviceCallback");
};


//------------------------------------------------------------------------------------------
//USER FUNCTION	
//------------------------------------------------------------------------------------------

function setGrid()
{
	table = $('#gridBoardList').DataTable( {
		data: gvResult.dsBoardMgmtList,
		paging:false,
		info:false,
		searching:true,
		pagingType: "full_numbers",
		deferLoading: 57,
		processing: true,
		scrollX: '100%',
	    language:{ 
	       "loadingRecords": "&nbsp;",
	       "processing": "Loading..."
	    },
		columns: [
			{ 
				data:"NUM",
				orderable:false
			},
			{ 
				data:"SEQ",
				orderable:false
			},
			{ 
				data:"TITLE", 		
				render:function(data,type,row,meta){
					var html = '';
					
					html = '<a href="#" class="btnRegPopBoard" '; 
					html = html + 'data-toggle="modal" ';
					html = html + 'data-target="#modalBoardReg" ';
					html = html + 'num="' + row['NUM'] + '">';
					html = html + data + '</a>';
										 
					return html;
				},
				orderable:false
			},
			{ 
				data:"SHOW_DASHBOARD_YN",
				orderable:false
			},
			{ 
				data:"LIST_COUNT_DASHBOARD",
				orderable:false
			},
			{ 
				data:"WIDTH",
				render:function(data,type,row,meta){
					var html = '';
					
					html = gvWidth[data];
										 
					return html;
				},
				orderable:false
			},
			{ 
				data:"SHOW_DASHBOARD_GBN",
				orderable:false
			},
			{ 
				data:"UDT_DT",
				"type": "date",
				"dateFormat": "yy-mm-dd",
				orderable:false
			},
			{ 
				data:"ORDER_NUM",		
				orderable:false,
				render:function(data,type,row,meta){
					var html = '';
					
					html = html + '<input type="hidden" id="btn'+meta['row']+'" order_num="'+data+'" seq="' + row['SEQ'] + '">';
					html = html + '<button class="btn btn-primary btnOrderUp btn-xs" seq="' + row['SEQ'] + '" val="' + data + '" index="' + meta['row'] + '"><i class="ion ion-arrow-up-c"></i></button>&nbsp;';
					html = html + '<button class="btn btn-warning btnOrderDown btn-xs" seq="' + row['SEQ'] + '" val="' + data + '" index="' + meta['row'] + '"><i class="ion ion-arrow-down-c"></i></button>';
					return html;
				},
				orderable:false
			},
			{ 
				data:"SEQ",
				render:function(data,type,row,meta){
					var html = '';
					
					html = '<button class="btn btn-danger btnDelBoard btn-xs" '; 
					html = html + 'val="' + row['SEQ'] + '">';
					html = html + '<i class="ion ion-trash-a"></i></a>';		 
					return html;
				},		
				orderable:false
			},
		],
		"columnDefs": [
		    { 
		    	className: "dt-body-center", 
		    	targets: [ 0,1,2,3,4,5,6,7,8,9 ] 
		    },
		    { width: 50, targets: [0,3,4,6,7,9] },
		    { width: 80, targets: [1,5,8] },
		    { width: 150, targets: [2] }
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
function initEvent(){
	makeiCheck('.fileChk, .viewChk');
	
	//게시판 등록/수정 팝업버튼
	$(document).on("click",".btnRegPopBoard",function(){		
		
		if($(this).attr('num') == ''){	
			//모든항목 초기화
			$('#codeArea').css('display', 'none');		//등록일때 code값 숨김
			$('#vBoardCode').val('');
			$('#vBoardName').val('');					//등록일때 모든 값 초기화
            $('input:radio[name="vFileYN"][value="Y"]').iCheck('check');			
			$('input:radio[name="vDashboardViewYN"][value="Y"]').iCheck('check');
			$("#vBoardDashboardCount > option:first").prop('selected', true);
			$("#vBoardDashboardWidth > option:first").prop('selected', true);
			$('input:radio[name="vDashboardGBN"][value="CDW"]').iCheck('check');
		}else{
			var myNum = $(this).attr('num')-1;
			
			//console.log(gvResult['dsBoardMgmtList'][myNum]);
			//데이터 입력
			$('#codeArea').css('display', 'block');
			$('#vBoardCode').val(gvResult['dsBoardMgmtList'][myNum]['SEQ']);
			$('#vBoardName').val(gvResult['dsBoardMgmtList'][myNum]['TITLE']);
			$('input:radio[name=vFileYN][value='+gvResult['dsBoardMgmtList'][myNum]['ATTACH_YN']+']').iCheck('check');
			$('#vBoardAuth').val(gvResult['dsBoardMgmtList'][myNum]['AUTH_CODE']).prop('selected', true);
			$('input:radio[name="vDashboardViewYN"][value='+gvResult['dsBoardMgmtList'][myNum]['SHOW_DASHBOARD_YN']+']').iCheck('check');
			$('#vBoardDashboardCount').val(gvResult['dsBoardMgmtList'][myNum]['LIST_COUNT_DASHBOARD']).prop('selected', true);
			$('#vBoardDashboardWidth').val(gvResult['dsBoardMgmtList'][myNum]['WIDTH']).prop('selected', true);
			$('input:radio[name="vDashboardGBN"][value='+gvResult['dsBoardMgmtList'][myNum]['SHOW_DASHBOARD_GBN']+']').iCheck('check');
		}
		
	});
	
	//게시판 등록/수정 버튼
	$('#btnRegBoard').on('click', function(){		
		if($('#vBoardName').val().replace(/ /g, '') == ''){		
			BootstrapDialog.alert('게시판 명을 입력해 주세요.');
			return;
		}else{
			$('#vBoardName').val($.trim($('#vBoardName').val()));
			
			if($('#vBoardCode').val()){			//수정
				var dataSet = {
						SEQ						: $('#vBoardCode').val(),
						TITLE 					: $('#vBoardName').val(),                   				/* 게시판명 */
						LIST_COUNT_DASHBOARD 	: $("#vBoardDashboardCount option:selected").val(),			/* Dashboard에 표출되는 목록 개수 */
						ATTACH_YN 				: $(":input:radio[name=vFileYN]:checked").val(),			/* 파일첨부 여부 */
						SHOW_DASHBOARD_YN 		: $(":input:radio[name=vDashboardViewYN]:checked").val(),	/* Dashboard 표출여부 */
						WIDTH 					: $("#vBoardDashboardWidth option:selected").val(),			/* Dashboard에 표시되는 화면 넓이 (50%, 100%) */
						UDT_ID 					: $.session.get('PER_CODE'),								/* 변경자 ID */
						AUTH_CODE 				: $("#vBoardAuth option:selected").val(),					/* 권한코드 */
						SHOW_DASHBOARD_GBN 		: $(":input:radio[name=vDashboardGBN]:checked").val()	/* 사용 구분 */
				};
				
				callService("setData", "admin/board/updateBoardMgmt", dataSet, "serviceCallback");
				
			}else{								//등록
				var ORDER_NUMVal = 1;
				
				if($('#gridBoardList > tbody > tr > td').hasClass('dataTables_empty')){		//빈값일때 순서 1번으로 고정
					ORDER_NUMVal = 1;
				}else{
					ORDER_NUMVal = $('#gridBoardList > tbody > tr').length + 1;
				}
				
				var dataSet = {
						TITLE 					: $('#vBoardName').val(),                   				/* 게시판명 */
						LIST_COUNT_DASHBOARD 	: $("#vBoardDashboardCount option:selected").val(),			/* Dashboard에 표출되는 목록 개수 */
						ATTACH_YN 				: $(":input:radio[name=vFileYN]:checked").val(),			/* 파일첨부 여부 */
						SHOW_DASHBOARD_YN 		: $(":input:radio[name=vDashboardViewYN]:checked").val(),	/* Dashboard 표출여부 */
						WIDTH 					: $("#vBoardDashboardWidth option:selected").val(),			/* Dashboard에 표시되는 화면 넓이 (50%, 100%) */
						UDT_ID 					: $.session.get('PER_CODE'),								/* 변경자 ID */
						CRT_ID 					: $.session.get('PER_CODE'),								/* 생성자 ID */
						AUTH_CODE 				: $("#vBoardAuth option:selected").val(),					/* 권한코드 */
						SHOW_DASHBOARD_GBN		: $(":input:radio[name=vDashboardGBN]:checked").val(),		/* 사용구분 */
						ORDER_NUM				: ORDER_NUMVal
						
				};
				
				callService("setData", "admin/board/insertBoardMgmt", dataSet, "serviceCallback");
				
			}
			
		}
	});
	
	//검색버튼
	$('#btnSearch').on('click',function(e){
		/*if(isNullOrEmpty($('#searchVal').val())){
			showAlert('게시판 관리',COM_0006,null);
			return;
			
		}*/
		
		getData();
		
		
	});
	
	$('#searchVal').on('keypress',function(e){
		if(e.keyCode === 13){
			/*if(isNullOrEmpty($('#searchVal').val())){
				showAlert('게시판 관리',COM_0006,null);
				return;
				
			}*/
			
			getData();
			
		}
	});
	
	//게시판 삭제
	$(document).on("click",".btnDelBoard",function(){
		var mySEQ = $(this).attr('val');
		BootstrapDialog.confirm('게시판을 삭제하면 해당게시판의 모든데이터가 삭제 됩니다.<br>정말 삭제하시겠습니까?', function(result){
            if(result) {
            	var dataSet = {
						SEQ	: mySEQ
				};
            	
            	callService("delData", "admin/board/deleteBoardMgmt", dataSet, "serviceCallback");
            }
        });
	});
	
	//순서 up 
	$(document).on("click",".btnOrderUp",function(){
		var dataSet = {
				SEQ					: $(this).attr('seq'),
				ORDER_NUM			: $(this).attr('val'),
				SEQ_PARTNER			: $('#btn'+(parseInt($(this).attr('index'))-1)).attr('seq'),
				ORDER_NUM_PARTNER	: $('#btn'+(parseInt($(this).attr('index'))-1)).attr('order_num')
		};
		
		callService("setOrderData", "admin/board/orderBoardMgmtUpDown", dataSet, "serviceCallback");
	});
	
	//순서 down
	$(document).on("click",".btnOrderDown",function(){
		var dataSet = {
				SEQ					: $(this).attr('seq'),
				ORDER_NUM			: $(this).attr('val'),
				SEQ_PARTNER			: $('#btn'+(parseInt($(this).attr('index'))+1)).attr('seq'),
				ORDER_NUM_PARTNER	: $('#btn'+(parseInt($(this).attr('index'))+1)).attr('order_num')
		};
		
		callService("setOrderData", "admin/board/orderBoardMgmtUpDown", dataSet, "serviceCallback");
	});
}

