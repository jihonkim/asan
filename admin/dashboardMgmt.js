/**
 * dashboard 관리
 * @Page : dashboardMgmt.jsp
 */

var gvPageNo = 1;
var gvPagePerCount = 20;

var gvResult = {
		"dsChartList": [],
		"dsChartMgmtList" : []
	};
var chartQueryFlag = "false";


/**
 * Application Ready
 */
$(document).ready(function(){	
	setGrid();
	
	initEvent();
	
	getChartData();
	
	//DashBoard 데이터 받아오기
	getDashBoardData();
	
	//메뉴고정
	menuFix('admin_dashboardMgmt_main');
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
		//summary query 에러 시
		if(svcId == "setSummarySQLData"){
			var summaryHtml = "";
			summaryHtml = summaryHtml + "<div class='col-lg-12'>";
    		summaryHtml = summaryHtml + "<div class='widget widget-stats bg-red'>";
    		summaryHtml = summaryHtml + "<div class='stats-title'></div>";
    		summaryHtml = summaryHtml + "<div class='stats-number text-align-center'>";
    		summaryHtml = summaryHtml + "<i class='fa fa-fw fa-exclamation-triangle'></i>&nbsp;";
    		summaryHtml = summaryHtml + "Summary Query 오류 입니다.";
    		summaryHtml = summaryHtml + "</div>";
    		summaryHtml = summaryHtml + "<div class='stats-progress progress'>";
    		summaryHtml = summaryHtml + "<div class='progress-bar progress-bar-white' style='width: 101.0%;'></div>";
    		summaryHtml = summaryHtml + "</div>";
    		summaryHtml = summaryHtml + "<div class='stats-desc text-align-center'>관리자 > Dashboard관리에서 Summary Query를 다시 확인 해 주세요.</div>";
    		summaryHtml = summaryHtml + "</div>";
    		summaryHtml = summaryHtml + "</div>";
    		
    		$('#summaryArea').append(summaryHtml);
    		return;
		}else if(svcId == "setChartView"){
			console.log(result);
			var summaryHtml = "";
			var chartNum = parseInt(parseInt(result['CHART_INDEX'])+1);
    		summaryHtml = summaryHtml + "<div class='col-lg-12'>";
    		summaryHtml = summaryHtml + "<div class='widget widget-stats bg-red'>";
    		summaryHtml = summaryHtml + "<div class='stats-title'></div>";
    		summaryHtml = summaryHtml + "<div class='stats-number text-align-center'>";
    		summaryHtml = summaryHtml + "<i class='fa fa-fw fa-exclamation-triangle'></i>&nbsp;";
    		summaryHtml = summaryHtml + "Chart Query 오류 입니다.";
    		summaryHtml = summaryHtml + "</div>";
    		summaryHtml = summaryHtml + "<div class='stats-progress progress'>";
    		summaryHtml = summaryHtml + "<div class='progress-bar progress-bar-white' style='width: 101.0%;'></div>";
    		summaryHtml = summaryHtml + "</div>";
    		summaryHtml = summaryHtml + "<div class='stats-desc text-align-center'>관리자 > Dashboard관리에서 "+ chartNum +"번째 Chart Query를 다시 확인 해 주세요.</div>";
    		summaryHtml = summaryHtml + "</div>";
    		summaryHtml = summaryHtml + "</div>";
    		
    		$('#chart'+result['CHART_INDEX']).append(summaryHtml);
    		return;
		}else{
			BootstrapDialog.alert(result.ERR_MSG);
			return;
		}
	}
	
	switch(svcId){			
		case "getDashBoardData":
			var RESEARCH_TARGET_STAT_SQL 	= "";
			var SERVICE_STAT_SQL 			= "";
			var SHOW_MY_RESEARCH 			= "";
			var SUMMARY_WIDTH 				= "";
			
			if(result['dsDashBoard'].length > 0){
				RESEARCH_TARGET_STAT_SQL 	= result['dsDashBoard'][0]['RESEARCH_TARGET_STAT_SQL'];
				SERVICE_STAT_SQL 			= result['dsDashBoard'][0]['SERVICE_STAT_SQL'];
				SHOW_MY_RESEARCH 			= result['dsDashBoard'][0]['SHOW_MY_RESEARCH'];
				SUMMARY_WIDTH 				= result['dsDashBoard'][0]['SUMMARY_WIDTH'];
			}else{
				RESEARCH_TARGET_STAT_SQL 	= '';
				SERVICE_STAT_SQL 			= '';
				SUMMARY_WIDTH = "3";
				SHOW_MY_RESEARCH = "Y";
			}
			
			$('#vServiceQuery').text(SERVICE_STAT_SQL);
			$('#vSummaryQuery').text(RESEARCH_TARGET_STAT_SQL);
			$(':radio[name=vSummaryWidth][value='+SUMMARY_WIDTH+']').iCheck('check');
			$(':radio[name=vSummaryYN][value='+SHOW_MY_RESEARCH+']').iCheck('check');
			
			break;
			
		case "setDashboardData":
			
			if(result['ERR_CD'] == 0){		//저장 성공
				BootstrapDialog.alert(COM_0001);
			}else{							//저장 실패
				BootstrapDialog.alert(COM_0008);
			}
			
			break;
			
		case "setChartData":
			
			if(result['ERR_CD'] == 0){		//저장 성공
				BootstrapDialog.alert(COM_0001);
				getChartData();
			}else{							//저장 실패
				BootstrapDialog.alert(COM_0008);
			}
			
			break;	
			
		case "getChartData":
			
			$('#gridChartList').dataTable().fnClearTable();
			
			if(result.dsChartMgmtList.length > 0){
				$('#gridChartList').dataTable().fnAddData(result.dsChartMgmtList);
			}
			
			gvResult['dsChartMgmtList'] = result.dsChartMgmtList;
			
			//팝업창닫기
			$('#btnCloseChart').trigger('click');
			
			arrowDisable();
			
			break;	
			
		case "delChartData":
			
			if(result['ERR_CD'] == 0){		//삭제 성공
				BootstrapDialog.alert(COM_0003);
				getChartData();
			}else{							//삭제 실패
				BootstrapDialog.alert(COM_0009);
			}
			
			break;	
			
		case "setOrderData":
			
			getChartData();
			
			break;	
			
		case "setChartSQLData":
			
			if(result['ERR_CD'] == 0){		//실행 성공
				BootstrapDialog.alert(COM_0011);

				var myResult = result['dsChartDimMeaList'][0];
				
				//select box 동적 생성
				//Dimension 초기화
				$("#vChartDimension option").remove();	
				//Measures 초기화
				$("#measuresArea").html('');
				
				var keyArr = [];
				
				//데이터 키만 받아오기
				$.each(myResult, function(key, value){ 
					var keyArrOptVal = {};
					keyArrOptVal.optVal = key;	
					keyArr.push(keyArrOptVal);
					
					//check box 동적 생성
					makeCheckBoxForiCheck("measuresArea", "3", "vChartMeasures", key, "measuresChk", key);
				});
				
				makeSelectBox('vChartDimension', keyArr, 'optVal', 'optVal');
				//.select box 동적 생성
				
				//iCheck 실행
				makeiCheck('.measuresChk');
				
				//Dimension선택된 Measures checkbox disable
				$(':checkbox[name="vChartMeasures"][value="'+$('#vChartDimension option:selected').val()+'"]').iCheck('disable');
				
				chartQueryFlag = "true";		//실행해서 문제 없어야 true로 변경
				
			}else{							//실행 실패
				BootstrapDialog.alert(COM_0012);
				chartQueryFlag = "false";
			}
			
			break;	
			
		case "setServiceSQLData":
        	
        	$('#serviceArea').html('');
        	var serviceHtml = "";
        	serviceHtml = serviceHtml + "<small class='btn bg-olive btn-xs btn-flat'>"+ result['dsService'][0]['CODE'] +"</small>";
        	serviceHtml = serviceHtml + "&nbsp;<span>"+ result['dsService'][0]['MESSAGE'] +"</span>";
        	$('#serviceArea').html(serviceHtml);
			
			break;	
			
		case "setSummarySQLData":
        	
        	console.log(result['dsSummary']);

        	for(var i=0; i<result['dsSummary'].length; i++){
        		var codeNum = i % gvSummaryColor.length;
        		var iconNum = i % gvSummaryIcon.length;
        		var summaryHtml = "";
        		summaryHtml = summaryHtml + "<div class='col-lg-"+ $(':radio[name=vSummaryWidth]:checked').val() +"'>";
        		summaryHtml = summaryHtml + "<div class='widget widget-stats "+ gvSummaryColor[codeNum] +"'>";
        		summaryHtml = summaryHtml + "<div class='stats-icon stats-icon-lg icon'>";
        		summaryHtml = summaryHtml + "<i class='fa fa-fw "+ gvSummaryIcon[iconNum] +"'></i>";
        		summaryHtml = summaryHtml + "</div>";
        		summaryHtml = summaryHtml + "<div class='stats-title'>연구대상 "+ result['dsSummary'][i]['DSTC'] +"</div>";
        		summaryHtml = summaryHtml + "<div class='stats-number'>";
        		summaryHtml = summaryHtml + numberWithCommas(result['dsSummary'][i]['SUM']);
        		summaryHtml = summaryHtml + "</div>";
        		summaryHtml = summaryHtml + "<div class='stats-progress progress'>";
        		summaryHtml = summaryHtml + "<div class='progress-bar progress-bar-white' style='width: 101.0%;'></div>";
        		summaryHtml = summaryHtml + "</div>";
        		summaryHtml = summaryHtml + "<div class='stats-desc'>Bigger than yesterday "+ numberWithCommas(result['dsSummary'][i]['RATE']) +" </div>";
        		summaryHtml = summaryHtml + "</div>";
        		summaryHtml = summaryHtml + "</div>";
        		
        		$('#summaryArea').append(summaryHtml);
        	}
			
			break;	
			
		case "setChartView":
        	
        	console.log(result);
        	var gvResultMeasureSplit 	= gvResult['dsChartMgmtList'][result['CHART_INDEX']]['MEASURE'].split('||');
        	var CHART_INDEX 			= result['CHART_INDEX'];
        	var dsChartViewData 		= result['dsChartView'];
        	var cTYPE 					= gvResult['dsChartMgmtList'][result['CHART_INDEX']]['TYPE'];
        	var cDIM 					= gvResult['dsChartMgmtList'][result['CHART_INDEX']]['DIM'];
        	var cDate					= isDate(dsChartViewData[0][gvResult['dsChartMgmtList'][result['CHART_INDEX']]['DIM']]);

        	console.log();
        	
        	//차트 그리기 cDate가 true일경우 date타입으로 차트그림 false일경우 category타입으로 그림
        	makeChart('#chart'+CHART_INDEX, dsChartViewData, cTYPE, gvResultMeasureSplit, cDIM, false);
        	//makeChart('#chart'+CHART_INDEX, dsChartViewData, cTYPE, gvResultMeasureSplit, cDIM, cDate);
			
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
function getDashBoardData(){
	var dataSet = {};
		
	callService("getDashBoardData", "admin/dashboardMgmt/selectDashBoardMgmt", dataSet, "serviceCallback");
	
}


/**
 * 
 * @returns
 */
function getChartData(){
	var dataSet = {};
		
	callService("getChartData", "admin/dashboardMgmt/selectChartMgmt", dataSet, "serviceCallback");
}




//------------------------------------------------------------------------------------------
//USER FUNCTION	
//------------------------------------------------------------------------------------------
function setGrid()
{
	table = $('#gridChartList').DataTable( {
		data: gvResult.dsChartList,
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
				data:"TITLE", 		
				render:function(data,type,row,meta){
					var html = '';
					
					html = '<a href="#" class="btnModalChartReg" '; 
					html = html + 'data-toggle="modal" ';
					html = html + 'data-target="#modalChartReg" myFlag="true" ';
					html = html + 'index="' + meta['row'] + '" seq="' + row['SEQ'] + '"';
					html = html + 'num="' + row['NUM'] + '">';
					html = html + data + '</a>';		 
					return html;
				},
				orderable:false
			},
			{ 
				data:"TYPE",
				orderable:false
			},
			{ 
				data:"WIDTH",
				orderable:false
			},
			{ 
				data:"SHOW_YN",
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
					
					html = html + '<button class="btn btn-danger btnDelChart btn-xs" val="' + row['SEQ'] + '"><i class="ion ion-trash-a"></i></button>';		 
					return html;
				},		
				orderable:false
			}
		],
		"columnDefs": [
		    { 
		    	className: "dt-body-center", 
		    	targets: [ 0,1,2,3,4,5,6 ] 
		    },
		    { width: 50, targets: [0,3,4,6] },
		    { width: 80, targets: [2,5] },
		    { width: 150, targets: [1] }
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
	
	makeiCheck('.chartYN, .boardYN, .summaryYN, .widthYN, .chartWidth');
	
	//summary color picker
	$('.btnSummaryColor').on('click', function(){
		var indexNum = $(this).attr('indexNum');
		var myColor = $(this).attr('color');
		
		$('.itemSummary'+indexNum)
			.removeClass('border-default')
			.removeClass('border-green')
			.removeClass('border-blue')
			.removeClass('border-purple')
			.removeClass('border-black')
			.removeClass('border-yellow')
			.removeClass('border-red')
			.addClass('border-'+myColor);
	});
	
	//등록버튼
	$('#btnDashboardReg').on('click', function(){
		$('.border-red').each(function(){
			$(this).removeClass('border-red');
		});
		
		//서비스 상태 Query
		if($('#vServiceQuery').val() == ""){
			$('#vServiceQuery').addClass('border-red');
			BootstrapDialog.alert('서비스 상태 Query를 입력해 주세요.');
			return;
		}
		
		//summary Query
		if($(':radio[name=vSummaryYN]:checked').val() == "Y"){
			if($('#vSummaryQuery').val() == ""){
				$('#vSummaryQuery').addClass('border-red');
				BootstrapDialog.alert('Summary Query를 입력해 주세요.');
				return;
			}
		}
		
		var dataSet = {
				SERVICE_STAT_SQL			: $('#vServiceQuery').val(),						/* 서비스 상태 메시지 생성 SQL */
				RESEARCH_TARGET_STAT_SQL	: $('#vSummaryQuery').val(),						/* 연구대상 통계 정보 생성 SQL */
				SUMMARY_WIDTH				: $(':radio[name=vSummaryWidth]:checked').val(),	/* SUMMARY 길이 */
				SHOW_MY_RESEARCH			: $(':radio[name=vSummaryYN]:checked').val(),		/* 나의 연구현황 표출여부 */
				UDT_ID 						: $.session.get('PER_CODE'),						/* 변경자 ID */
				CRT_ID 						: $.session.get('PER_CODE')							/* 생성자 ID */
		};
		
		callService("setDashboardData", "admin/dashboardMgmt/insertDashBoardMgmt", dataSet, "serviceCallback");
		
	});
	
	//chart 등록 : 쿼리실행 버튼
	$('#btnQueryExe').on('click', function(){
		if($('#vChartQuery').val() == ""){
			BootstrapDialog.alert('Chart Query를 입력해 주세요.');
			return;
		}else{
			var dataSet = {
					CHART_SQL					: $('#vChartQuery').val()		/* chart SQL */
			};
			
			callService("setChartSQLData", "admin/dashboardMgmt/selectChartSQL", dataSet, "serviceCallback");
		}
	});
	
	//chart flag 설정
	$(document).on('click', '.btnModalChartReg', function(){
		chartQueryFlag = $(this).attr('myFlag');
		
		$('.border-red').each(function(){
			$(this).removeClass('border-red');
		});
		
		if($(this).attr('seq')){			//수정
			var myIndex = $(this).attr('index');
						
			$('#vSEQ').val($(this).attr('seq'));
			$('#vChartTitle').val(gvResult['dsChartMgmtList'][myIndex]['TITLE']);
			$('#vChartShape').val(gvResult['dsChartMgmtList'][myIndex]['TYPE']).prop("selected", true);
			$(':radio[name=vChartWidth][value='+gvResult['dsChartMgmtList'][myIndex]['WIDTH']+']').iCheck('check');
			$(':radio[name=vChartYN][value='+gvResult['dsChartMgmtList'][myIndex]['SHOW_YN']+']').iCheck('check');
			$('#vChartQuery').val(gvResult['dsChartMgmtList'][myIndex]['DATA_SQL']);
			$('#vChartQuery').prop('disabled', true);
			$('#vChartDimension option').remove();
			
			//Dimension값 가져오기
			var cols = gvResult['dsChartMgmtList'][myIndex]['COLS'];
			var checkboxSplit = cols.split('^^');
			
			//Measures 초기화
			$("#measuresArea").html('');
			for(var i=0; i<checkboxSplit.length; i++){
				console.log(checkboxSplit[i]);
				var dimensionSplit = checkboxSplit[i].split("||");
				
				//Dimension 추가
				$('#vChartDimension').append('<option value="'+dimensionSplit[0]+'">'+dimensionSplit[0]+'</option>');
				
				//Measures 추가
				makeCheckBoxForiCheck("measuresArea", "3", "vChartMeasures", dimensionSplit[0], "measuresChk", dimensionSplit[0]);
				
				//체크여부
				if(dimensionSplit[1] == "true"){
					$('.measuresChk:eq('+i+')').iCheck('check');
				}
				
				//disable여부
				if(dimensionSplit[2] == "disabled"){
					$('.measuresChk:eq('+i+')').iCheck('disable');
				}
			}
			//Dimension 선택
			$('#vChartDimension').val(gvResult['dsChartMgmtList'][myIndex]['DIM']).prop("selected", true);
			
			//iCheck 실행
			makeiCheck('.measuresChk');
						
		}else{								//등록
			//input 초기화
			$('#vChartQuery').prop('disabled', false);
			$('#vSEQ').val('');
			$('#vChartTitle').val('');
			$('#vChartShape').find("option:eq(0)").prop("selected", true);
			$(':radio[name=vChartWidth][value=6]').iCheck('check');
			$(':radio[name=vChartYN][value=Y]').iCheck('check');
			$('#vChartQuery').val('');
			$("#vChartDimension option").remove();
			$("#measuresArea").html('');
		}
		
	});
	
	
	//chart 등록
	$('#btnRegChart').on('click', function(){
				
		if(chartQueryFlag == "false"){
			BootstrapDialog.alert('Query를 실행해 주세요.');
			return;
		}
		
		$('.border-red').each(function(){
			$(this).removeClass('border-red');
		});
		
		//chart title
		if($('#vChartTitle').val() == ""){
			$('#vChartTitle').addClass('border-red');
			BootstrapDialog.alert('Chart관리 Title을 입력해 주세요.');
			return;
		}
		
		//chart query
		if($('#vChartQuery').val() == ""){
			$('#vChartQuery').addClass('border-red');
			BootstrapDialog.alert('Chart관리 Query를 입력해 주세요.');
			return;
		}
		
		//chart Dimension
		if($("#vChartDimension option:selected").val() == ""){
			$('#vChartDimension').addClass('border-red');
			BootstrapDialog.alert('Chart관리 Dimension을 선택해 주세요.');
			return;
		}
		
		//chart Measures
		if($('.measuresChk:checked').length == "0"){
			BootstrapDialog.alert('Chart관리 Measures를 선택해 주세요.');
			return;
		}
		
		var vMEASURE = "";
		$("input:checkbox[name=vChartMeasures]:checked").each(function(){
			vMEASURE = vMEASURE + $(this).val() + "||";
		});		
		vMEASURE = vMEASURE.slice(0,-2);
		

		//차트 MEASURE checkbox 전체 값 value||check여부||disabled여부
		var chekckVal = "";
		$(".measuresChk").each(function() {
			var thisVal = $(this).val();
			var thisCheck = $(this).parent().hasClass('checked');
			var thisDisabled = $(this).attr('disabled');
			if(thisDisabled == undefined){
				thisDisabled = "able";
			}
		    chekckVal = chekckVal + thisVal+"||"+thisCheck+"||"+thisDisabled+"^^";
		});
		chekckVal = chekckVal.slice(0,-2);
		
		if($('#vSEQ').val()){			//chart 수정
			var dataSet = {
					SEQ			: $('#vSEQ').val(),
					TITLE		: $('#vChartTitle').val(),							/* 차트 제목 */
					TYPE		: $("#vChartShape option:selected").val(),			/* 차트 종류 */
					DATA_SQL	: $('#vChartQuery').val(),							/* 데이터 생성 SQL */
					WIDTH		: $(':radio[name=vChartWidth]:checked').val(),		/* 차트 넓이. 50%, 100% */
					SHOW_YN 	: $(':radio[name=vChartYN]:checked').val(),			/* 표출여부 */
					UDT_ID 		: $.session.get('PER_CODE'),						/* 변경자 ID */
					DIM 		: $("#vChartDimension option:selected").val(),		/* 차트 DIM */
					MEASURE 	: vMEASURE,											/* 차트 MEASURE */
					COLS		: chekckVal											/* 차트 MEASURE checkbox 전체 값 value||check여부||disabled여부 */
			};
			
			callService("setChartData", "admin/dashboardMgmt/updateChartMgmt", dataSet, "serviceCallback");
		}else{							//chart 등록
			var dataSet = {
					TITLE		: $('#vChartTitle').val(),							/* 차트 제목 */
					TYPE		: $("#vChartShape option:selected").val(),			/* 차트 종류 */
					DATA_SQL	: $('#vChartQuery').val(),							/* 데이터 생성 SQL */
					WIDTH		: $(':radio[name=vChartWidth]:checked').val(),		/* 차트 넓이. 50%, 100% */
					SHOW_YN 	: $(':radio[name=vChartYN]:checked').val(),			/* 표출여부 */
					UDT_ID 		: $.session.get('PER_CODE'),						/* 변경자 ID */
					CRT_ID 		: $.session.get('PER_CODE'),						/* 생성자 ID */
					DIM 		: $("#vChartDimension option:selected").val(),		/* 차트 DIM */
					MEASURE 	: vMEASURE,											/* 차트 MEASURE */
					COLS		: chekckVal											/* 차트 MEASURE checkbox 전체 값 value||check여부||disabled여부 */
			};
			
			callService("setChartData", "admin/dashboardMgmt/insertChartMgmt", dataSet, "serviceCallback");
		}								
		
	});
	
	//chart del button
	$(document).on('click', '.btnDelChart', function(){
		var mySEQ = $(this).attr('val');
		
		BootstrapDialog.confirm('정말 삭제하시겠습니까?', function(result){
            if(result) {
            	var dataSet = {
        				SEQ		: mySEQ	/* SEQ */
        		};
        		
        		callService("delChartData", "admin/dashboardMgmt/deleteChartMgmt", dataSet, "serviceCallback");
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
		
		callService("setOrderData", "admin/dashboardMgmt/orderChartMgmtUpDown", dataSet, "serviceCallback");
	});
	
	//순서 down
	$(document).on("click",".btnOrderDown",function(){
		var dataSet = {
				SEQ					: $(this).attr('seq'),
				ORDER_NUM			: $(this).attr('val'),
				SEQ_PARTNER			: $('#btn'+(parseInt($(this).attr('index'))+1)).attr('seq'),
				ORDER_NUM_PARTNER	: $('#btn'+(parseInt($(this).attr('index'))+1)).attr('order_num')
		};
		
		callService("setOrderData", "admin/dashboardMgmt/orderChartMgmtUpDown", dataSet, "serviceCallback");
	});
	
	//Dimension 선택 시 Measures값 disable 
	$(document).on('change', '#vChartDimension', function(){
		//disable 초기화
		$(':checkbox[name="vChartMeasures"]').iCheck('enable');
		
		//선택된 체크박스 disable
		$(':checkbox[name="vChartMeasures"][value="'+$('#vChartDimension option:selected').val()+'"]').iCheck('uncheck').iCheck('disable');
	});
	
	//chart 관리 query 수정 버튼
	$('#btnQueryMod').on('click', function(){
		$('#vChartQuery').prop('disabled', false);
	});
	
	//서비스상태 미리보기
	$('#btnService').on('click', function(){
		var dataSet = {
				CHART_SQL	: $('#vServiceQuery').val()		/* 서비스상태 SQL */
		};
		
		callService("setServiceSQLData", "admin/dashboardMgmt/selectServiceSQL", dataSet, "serviceCallback");
	});
	
	//summary 미리보기
	$('#btnSummary').on('click', function(){

		$('#summaryArea').html('');
		
		var dataSet = {
				CHART_SQL	: $('#vSummaryQuery').val()		/* summary SQL */
		};
		
		callService("setSummarySQLData", "admin/dashboardMgmt/selectSummarySQL", dataSet, "serviceCallback");
	});
	
	//chart 미리보기
	$('#btnChart').on('click', function(){
		console.log(gvResult);
		//chart 영역 초기화
		$('#chartArea').html('');
		$('#modalChart').css('display', 'block');
		
		
		//차트영역 생성
		for(var i=0; i<gvResult['dsChartMgmtList'].length; i++){

			if(gvResult['dsChartMgmtList'][i]['SHOW_YN'] == "Y"){		//사용인 차트만 표기
				var WIDTH = gvResult['dsChartMgmtList'][i]['WIDTH'];
				
	        	var chartHtml = "";
	        	chartHtml = chartHtml + "<section class='col-lg-"+ WIDTH +"'>";
	        	chartHtml = chartHtml + "<div class='box'>";
	        	chartHtml = chartHtml + "<div class='box-header'>";
	        	chartHtml = chartHtml + "<i class='ion ion-search'></i>";
	        	chartHtml = chartHtml + "<h3 class='box-title'>"+ gvResult['dsChartMgmtList'][i]['TITLE'] +"</h3>";
	        	chartHtml = chartHtml + "</div>";
	        	chartHtml = chartHtml + "<div class='box-body min-height-340'>";		
	        	chartHtml = chartHtml + "<div class='item' id='chart"+i+"'></div>";		
	        	chartHtml = chartHtml + "</div>";
	        	chartHtml = chartHtml + "</div>";
	        	chartHtml = chartHtml + "</section>";
	        	
	        	$('#chartArea').append(chartHtml);
			}   
		}
		
		//차트데이터 통신
		for(var i=0; i<gvResult['dsChartMgmtList'].length; i++){
			
			if(gvResult['dsChartMgmtList'][i]['SHOW_YN'] == "Y"){		//사용인 차트만 표기
				var dataSet = {
						CHART_INDEX	: i,
						CHART_SQL	: gvResult['dsChartMgmtList'][i]['DATA_SQL']		/* chart SQL */
				};
				
				callService("setChartView", "admin/dashboardMgmt/selectChartView", dataSet, "serviceCallback");
			}
		}
	});
}

