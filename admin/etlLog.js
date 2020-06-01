/**
 * ETL로그관리
 * @Page : etlLog.jsp
 */

var gvPageNo = 1;
var gvPagePerCount = 20;

var dataSet = {};
var dateVal;
var dateValSplit;

//전체기간용 타입
var myType = false;

var gvResult = {
		"dsEtlLogList": []
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
	menuFix('admin_log_etlLog');
	
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
			console.log(JSON.stringify(result.dsEtlLogList.length));
			
			$('#gridEtlLogList').dataTable().fnClearTable();
			
			if(result.dsEtlLogList.length > 0){
				$('#gridEtlLogList').dataTable().fnAddData(result.dsEtlLogList);
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
	
	dataSet.SEARCH_KEY = $('#searchKey').val();
	dataSet.SEARCH_VAL = $('#searchVal').val();

	dateVal = $('#dateVal').text();
	if(dateVal){
		dateValSplit = dateVal.split('~');
		dataSet.SEARCH_START_DATE = dateValSplit[0]+" 00:00:00";
		dataSet.SEARCH_END_DATE = dateValSplit[1]+" 23:59:59";
	}
	
	console.log(JSON.stringify(dataSet));
	
	callService("getData", "admin/log/etlLogList", dataSet, "serviceCallback");
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
	        			{ 
	        				data:"INFWF_ID" /* 워크플로우ID */
	        			},
	        			{ 
	        				data:"WORK_DT" /* 작업일자 */
	        			},
	        			{ 
	        				data:"ETL_ST_DTM" /* 시작일시 */
	        			},
	        			{ 
	        				data:"ETL_END_DTM" /* 종료일시 */
	        			},
	        			{ 
	        				data:"ETL_LEAD_SEC_CNT" /* 소요초수 */
	        			},
	        			{ 
	        				data:"ETL_SRC_DATA_CNT",	/* 원천데이터 건수 */
	        				render:function(data,type,row,meta){
	        					var html = '';
	        					
	        					html = numberWithCommas(data);
	        										 
	        					return html;
	        				}			
	        			},
	        			{ 
	        				data:"ETL_LOAD_DATA_CNT", 		/* 적재데이터 건수 */	
	        				render:function(data,type,row,meta){
	        					var html = '';
	        					
	        					html = numberWithCommas(data);
	        										 
	        					return html;
	        				}			
	        			},
	        			{ 
	        				data:"ETL_ERR_CD_VAL" /* 에러코드 */
	        			},
	        			{ 
	        				data:"ETL_ERR_CD_SUMMARY", 	/* 에러코드 설명 */	
	        				render:function(data,type,row,meta){
	        					
	        					if(data == undefined || data == '' ) return 'Success';
	        					else return data;
	        				}				
	        			}
	        		];	
	
	var tableColumnDef = [
	          		    { 
	        		    	className: "dt-body-center pointer", 
	        		    	targets: [ 0,1,2,3,4,5,6,7 ] 
	        		    },
	        		    { width: 80, targets: [0,1,2,3,4,5,6,7] },
	        		    { width: 150, targets: [8] }
	        		];
	
	callServiceDataTables('gridEtlLogList', tableOption, tableColumns, tableColumnDef, '/admin/log/etlLogList');
	
	$('#gridEtlLogList').on('click', 'tr', function(event) {
        var INFWF_ID = $('#gridEtlLogList').DataTable().row(this).data().INFWF_ID;
        var WORK_DT	 = $('#gridEtlLogList').DataTable().row(this).data().WORK_DT;
        var ETL_ST_DTM	 = $('#gridEtlLogList').DataTable().row(this).data().ETL_ST_DTM;
        var ETL_END_DTM	 = $('#gridEtlLogList').DataTable().row(this).data().ETL_END_DTM;
        var ETL_LEAD_SEC_CNT	 = $('#gridEtlLogList').DataTable().row(this).data().ETL_LEAD_SEC_CNT;
        var ETL_SRC_DATA_CNT	 = $('#gridEtlLogList').DataTable().row(this).data().ETL_SRC_DATA_CNT;
        var ETL_LOAD_DATA_CNT	 = $('#gridEtlLogList').DataTable().row(this).data().ETL_LOAD_DATA_CNT;
        var vStatus	 = $('#gridEtlLogList').DataTable().row(this).data().ETL_ERR_CD_VAL;
        var vMessage		 = $('#gridEtlLogList').DataTable().row(this).data().ETL_ERR_CD_DESC;
        
        if(vStatus=='0') vStatus = "Success";
        else vStatus = "Error";
        
        if(vMessage=='') vMessage = "No Message";
        
        var vDate = WORK_DT + "(" + ETL_ST_DTM + " ~ " + ETL_END_DTM + "), Takes " + ETL_LEAD_SEC_CNT + " seconds";
        var vCount = "원천("+numberWithCommas(ETL_SRC_DATA_CNT)+"), 적재("+numberWithCommas(ETL_LOAD_DATA_CNT)+")";
        
        $('#bWorkflowId').text(INFWF_ID);
        $('#bDate').text(vDate);
        $('#bCount').text(vCount);
		$('#bStatus').text(vStatus);
		$('#bMessage').text(vMessage);
        
        $('#modalEtlView').modal('show');
    } );
	
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
	makeiCheck('.dateChk');
	
	var table = $('#gridEtlLogList').DataTable();
	
	$('#btnSearch').on('click',function(e){
		/*if(isNullOrEmpty($('#searchVal').val())){
			alert('검색어를 입력하세요.');
			return;
			
		}*/
		table.search('').draw();
		
		
	});
	
	$('#searchVal').on('keypress',function(e){
		if(e.keyCode === 13){
			/*if(isNullOrEmpty($('#searchVal').val())){
				alert('검색어를 입력하세요.');
				return;
				
			}*/
			
			table.search('').draw();
			
		}
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
	
	
	$('#modalEtlView').on('hide.bs.modal', function(event){
		$('#bJobId').text('');
		$('#bCount').text('');
		$('#bStatus').text('');
		$('#bDate').text('');
		$('#bContent').text('');
	});
}
