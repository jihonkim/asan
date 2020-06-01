/**
 * 사용자관리
 * @Page : webLog.jsp
 */

var gvPageNo = 1;
var gvPagePerCount = 20;
var dataSet = {};

var dateVal;
var dateValSplit;

//전체기간용 타입
var myType = false;

var gvResult = {
		"dsWebLogList": []
	};

var start = moment().subtract(7, 'days');
var end = moment();


/**
 * Application Ready
 */
$(document).ready(function(){
	setDatePicker();
	
	setGrid();
	
	initEvent();
	
	//getData();
	
	//메뉴고정
	menuFix('admin_log_webLog');
	
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
			//console.log(JSON.stringify(result));
			
			$('#gridWebLogList').dataTable().fnClearTable();
			
			if(result.dsWebLogList.length > 0){
				$('#gridWebLogList').dataTable().fnAddData(result.dsWebLogList);
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
	//console.log(JSON.stringify(dataSet));
	
	callService("getData", "admin/log/webLogList", dataSet, "serviceCallback");
}


//------------------------------------------------------------------------------------------
//USER FUNCTION	
//------------------------------------------------------------------------------------------

function setGrid()
{	
	var tableOption = {
			searching:false,
			ordering:false,
			paging:true,
			bPaginate:true,
			processing: true,
			serverSide: true
	};
	
	var tableColumns = [
	        			{ data:"NUM"			},
	        			{ data:"REQUEST_URL"			},
	        			{ data:"PER_CODE" 		},
	        			{ 
	        				data:"ACCESS_IP",
	        				defaultContent: ""
	        			},
	        			{ 
	        				data:"TYPE",
	        				defaultContent: ""
	        			},
	        			{ 
	        				data:"SITE_CD",
	        				defaultContent: ""
	        			},
	        			{ 
	        				data:"CRT_DT"
	        			},
	        			{ 
	        				data:"MESSAGE",
	        				defaultContent: "",
	        				render:function(data,type,row,meta){
	        					var html = '';
	        					
	        					if(row['TYPE'] == "E" || row['TYPE'] == "Q"){
	        						html = '<button class="btn btn-xs btn-info btn-flat btnErrMsg" data-toggle="modal" data-target="#modalErrMsg">메세지 보기</button>';
	        						html = html + '<div class="msg" style="display:none;">'+ data +'</div>';
	        					}
	        										 
	        					return html;
	        				}
	        			}
	        		];	
	
	var tableColumnDef = [
	          		    { 
	        		    	className: "dt-body-center", 
	        		    	targets: [ 0,1,2,3,4,5,6,7 ] 
	        		    },
	        		    { width: 50, targets: [0,2,4,5] },
	        		    { width: 80, targets: [3,6,7] },
	        		    { width: 200, targets: [1] }
	        		];
	
	callServiceDataTables('gridWebLogList', tableOption, tableColumns, tableColumnDef, '/admin/log/webLogList');
	
	
}

function setDatePicker(){
	$('#reportrange').daterangepicker({
        startDate: start,
        endDate: end,
        "autoApply": true,
        ranges: {
           'Today': [moment(), moment()],
           'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
           'Last 7 Days': [moment().subtract(6, 'days'), moment()],
           'Last 30 Days': [moment().subtract(29, 'days'), moment()],
           'This Month': [moment().startOf('month'), moment().endOf('month')],
           'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        },
		"locale": {
	        "format": "YYYY/MM/DD",
	        "separator": " - ",
	        "applyLabel": "Apply",
	        "cancelLabel": "Cancel",
	        "fromLabel": "From",
	        "toLabel": "To",
	        "customRangeLabel": "Custom",
	        "weekLabel": "W",
	        "daysOfWeek": [
	            "Su",
	            "Mo",
	            "Tu",
	            "We",
	            "Th",
	            "Fr",
	            "Sa"
	        ],
	        "monthNames": [
	            "January",
	            "February",
	            "March",
	            "April",
	            "May",
	            "June",
	            "July",
	            "August",
	            "September",
	            "October",
	            "November",
	            "December"
	        ],
	        "firstDay": 1
	    }
    }, cb);
	
	cb(start, end);
}

function cb(start, end) {
    $('#reportrange span').html(start.format('YYYY-MM-DD') + '~' + end.format('YYYY-MM-DD'));
}


//------------------------------------------------------------------------------------------
//	EVENT	
//------------------------------------------------------------------------------------------
/**
 * 이벤트 초기화
 * @returns
 */
function initEvent(){
	var table = $('#gridWebLogList').DataTable();
	
	makeiCheck('.logChk, .dateChk, .siteChk');
	
	$("input:radio[name=logType]").on('ifClicked', function(){
		$('#iCheckVal').val($(this).val());
		table.search('').draw();
	});
	
	$("input:radio[name=siteCd]").on('ifClicked', function(){
		$('#iCheckValSiteCd').val($(this).val());
		table.search('').draw();
	});
	
	$('#btnWebSearch').on('click', function(){
		table.search('').draw();
	});
	
	$("input:checkbox[name=dateType]").on('ifClicked', function(){
		if($(this).prop("checked")){
			$('#reportrangeArea').show();
			$('#btnWebSearch').show();
			myType = false;
		}else{
			$('#reportrangeArea').hide();
			$('#btnWebSearch').hide();
			myType = true;
		}
		
		table.search('').draw();
	});
	
	$(document).on('click', '.btnErrMsg', function(){
		$('#errMsgArea').text('');
		
		$('#errMsgArea').text($(this).nextAll('.msg').text());
	});
}
