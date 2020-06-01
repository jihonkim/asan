/**
 * 사용자관리
 * @Page : boardManagement.jsp
 */

var gvPageNo = 1;
var gvPagePerCount = 20;

var gvResult = {
		"dsMenuMgmtList": []
	};



/**
 * Application Ready
 */
$(document).ready(function(){
	setGrid();
	
	initEvent();
	
	getData();
	
	//메뉴고정
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
	switch(svcId){			
		case "getData":
			console.log(JSON.stringify(result));
			
			$('#gridMenuList').dataTable().fnClearTable();
			
			if(result.dsBoardMgmtList.length > 0){
				$('#gridMenuList').dataTable().fnAddData(result.dsMenuMgmtList);
			}
			
			gvResult['dsMenuMgmtList'] = result.dsMenuMgmtList;
			
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
	table = $('#gridMenuList').DataTable( {
		data: gvResult.dsMenuMgmtList,
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
			{ 
				data:"TITLE", 		
				render:function(data,type,row,meta){
					var html = '';
					
					html = '<a href="#" class="btnRegPopMenu" '; 
					html = html + 'data-toggle="modal" ';
					html = html + 'data-target="#modalMenuReg" ';
					html = html + 'num="' + row['NUM'] + '">';
					html = html + data + '</a>';
										 
					return html;
				}
			},
			{ data:"UDT_DT" },
			{ 
				data:"ORDER_NUM",		
				orderable:false,
				render:function(data,type,row,meta){
					var html = '';
					
					html = html + '<button class="btn btn-primary btnOrderUpMenu btn-xs" seq="' + row['SEQ'] + '" val="' + data + '"><i class="ion ion-arrow-up-c"></i></button>&nbsp;';
					html = html + '<button class="btn btn-warning btnOrderDownMenu btn-xs" seq="' + row['SEQ'] + '" val="' + data + '"><i class="ion ion-arrow-down-c"></i></button>';
					return html;
				}
			},
			{ 
				data:"SEQ",
				render:function(data,type,row,meta){
					var html = '';
					
					html = '<button class="btn btn-danger btnRegPopMenu btn-xs" '; 
					html = html + 'data-toggle="modal" ';
					html = html + 'data-target="#modalMenuReg" ';
					html = html + 'val="' + row['SEQ'] + '">';
					html = html + '<i class="ion ion-trash-a"></i></button>';
					html = html + '<button class="btn btn-danger btnDelMenu btn-xs" '; 
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
		    	targets: [ 0,1,2,3,4,5 ] 
		    },
		    { width: 30, targets: [0] },
		    { width: 60, targets: [1,2,4,5] },
		    { width: 150, targets: [3] }
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
	
	//검색버튼
	$('#searchKey').on('change',function(e){
		alert('aa');
		getData();		
	});
	
	//정형보고서 일때 inputbox 추가
	$('#vMenuCategorize').on('change', function(){
		if($(this).val() == "3"){
			$('#reportArea').css('display','block');
		}else{
			$('#reportArea').css('display','none');
		}
	});
}

//화살표 첫번째와 마지막 disabled 처리
var arrowDisable = function(){
	$('.btnOrderUpMenu:first').attr("disabled", true);
	$('.btnOrderDownMenu:last').attr("disabled", true);
};
