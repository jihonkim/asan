/**
 * 사용자관리
 * @Page : boardManagement.jsp
 */

var gvPageNo = 1;
var gvPagePerCount = 20;

var gvResult = {
		"dsMenuAuthMgmtList": []
	};



/**
 * Application Ready
 */
$(document).ready(function(){
	setGrid();
	
	initEvent();
	
	getData();
	
	//메뉴고정
	menuFix('admin_menu_menuAuthMain');
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
			console.log(JSON.stringify(result));
			
			$('#gridMenuAuthList').dataTable().fnClearTable();
			
			if(result.dsBoardMgmtList.length > 0){
				$('#gridMenuAuthList').dataTable().fnAddData(result.dsMenuAuthMgmtList);
			}
			
			gvResult['dsMenuAuthMgmtList'] = result.dsMenuAuthMgmtList;
			
			arrowDisable();
			
			break;
			
		case "setData":
			
			break;
			
		case "delData":
			
			break;
			
		case "setOrderData":
			
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
	
	//console.log(JSON.stringify(dataSet));
	
	//callService("getData", "admin/board/selectBoardMgmt", dataSet, "serviceCallback");
	
}



//------------------------------------------------------------------------------------------
//USER FUNCTION	
//------------------------------------------------------------------------------------------

function setGrid()
{
	table = $('#gridMenuAuthList').DataTable( {
		data: gvResult.dsMenuAuthMgmtList,
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
			{ data:"NUM"			},
			{ data:"SEQ"			},
			{ data:"TITLE"			},
			{ 
				data:"SEQ",
				render:function(data,type,row,meta){
					var html = '';
					
					html = '<button class="btn btn-danger btnRegPopMenu btn-xs" '; 
					html = html + 'data-toggle="modal" ';
					html = html + 'data-target="#modalMenuReg" ';
					html = html + 'val="' + row['SEQ'] + '">';
					html = html + '<i class="ion ion-trash-a"></i></button>';
					return html;
				},		
				orderable:false
			},
		],
		"columnDefs": [
		    { 
		    	className: "dt-body-center", 
		    	targets: [ 0,1,2,3 ] 
		    },
		    { width: 30, targets: [0] },
		    { width: 60, targets: [1,2,3] }
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
	
	makeiCheck('.menuChk');
	
	//검색버튼
	$('#searchKey').on('change',function(e){
		alert('aa');
		getData();
		
		
	});
}

