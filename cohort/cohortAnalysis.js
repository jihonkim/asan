var filterApplyYN = false;
var dataClinical = []; // chart data
var dataGenomic = [];
var dataEtc = [];
var gvDataClinicalSource = {};
var gvDataGenomicSource = {};
var gvDataEtcSource = {};
var cohortTablePatnoList = [];
var filterApplyResult = [];
var cohortQuery = '';
var cohortFilterQuery = '';
var cohortFilterAllQuery = 'SELECT  DISTINCT sb0.RESCH_PAT_ID,sb0.RESCH_SPCN_ID,sb0.DELETE_YN'
							+ 'FROM pmsdata.P'+$.session.get("PER_CODE")+' AS sb0'
							+ 'WHERE 1=1';
var cohortFilterSpcnQuery = '';
var cohortFilterAllGroupByQuery = '';
var cohortFilterSpcnQueryWithout = '';
var currentCohortTab = '1';
var dashboardTabNo;
var selectedCohort = [];
var savedMyCohort = [];
var loadChartList = [];
var loadChartListSeq = [];
var patientCount = '';
var patientOld = '';
var patientNew = 0;
var spcnCount = '';
var spcnOld = '';
var spcnNew = 0;
var chartDataList = [];
var ajaxList = [];

var gvChartOpts = {
		lines: 13, // The number of lines to draw
		length: 11, // The length of each line
		width: 5, // The line thickness
		radius: 17, // The radius of the inner circle
		corners: 1, // Corner roundness (0..1)
		rotate: 0, // The rotation offset
		color: '#756969', // #rgb or #rrggbb
		speed: 1, // Rounds per second
		trail: 60, // Afterglow percentage
		shadow: false, // Whether to render a shadow
		hwaccel: false, // Whether to use hardware acceleration
		className: 'spinner', // The CSS class to assign to the spinner
		zIndex: 2e9, // The z-index (defaults to 2000000000)
		top: 'auto', // Top position relative to parent in px
		left: 'auto' // Left position relative to parent in px
};
var filterYN = false;

$(document).ready(function(){
	
	analysisInit();
	
	
	analysisInitEvent();
	
	
});


function analysisInit(){
	//차트추가 목록
	dashboardTabNo = $('#hiddenCohortTab').val();
	
	setCohortKindBox();
	
	//setCohortFilterBox();
	
	setChartAddList();
	
	checkDefaultChart();
	
	getCohortTable();
	
	
	
	//setCohortAnalysisData();
}

function setArrayCancerType(data){
	
	var tmpArr = [];
	
	for(var i=0; i<data.length; i++){
		
		var tmpSet = data[i];
		if(tmpSet.checked == true){
			tmpArr.push(tmpSet.NM);
		}
		
	}
	
	
	return tmpArr.join("|");
}

function setArraySavedCancerType(data){
	
	var tmpArr = [];
	
	for(var i=0; i<data.length; i++){
		
		var tmpSet = data[i];
		
		tmpArr.push(tmpSet.CANCERTYPE);
		
	}
	return tmpArr.join("|");
}


function gvSpinnerOpen(){
	
	var strMsg = 'Loading....';
	var spinner = new Spinner(gvOpts).spin(gvTargetModal);
	
	if(isNullOrEmpty(gvOverlayModal) || gvOverlayModal == null){
		gvOverlayModal = iosOverlay({
			text: strMsg,
			spinner: spinner
		});
	}
	
}


function gvSpinnerClose(){
	if(!isNull(gvOverlayModal) && !isNullOrEmpty(gvOverlayModal)){
		gvOverlayModal.hide();
		gvOverlayModal = null;
	}
}

function setCohortAnalysisData(sbQuery){
	gvSpinnerOpen();
	var patientDataList = [];
	
	var dataSet = {};
	dataSet.PER_CODE = $.session.get("PER_CODE");
	dataSet.SUBQUERY = sbQuery;
	var promise = http('cohort/selCohortPatientDataList', 'post', true , dataSet);
	promise.then(function(result){
		console.log(result);
		var dataView = result.selCohortPatientDataList;
		patientDataList = dataView;
		gvSpinnerClose();
		
		if(isNullOrEmpty($('#jqxCohortAnalysisData').jqxGrid('source'))){
			setJqxCohortAnalysisData(patientDataList);
		}
		else{
			var $jqx = $('#jqxCohortAnalysisData');
    		$jqx.jqxGrid('source')._source.localdata = patientDataList;
    		
    		$jqx.jqxGrid('updatebounddata','cells');
		}

		
		
	});
	promise.fail(function(e){
		console.log(e);
		gvSpinnerClose();
	});
	
	
	
	//return patientDataList
	    
}

function setJqxCohortAnalysisData(patientDataList){
	var source =
	   {
	       localdata: patientDataList,
	       datafields:
	       [
	           { name: 'RESCH_PAT_ID', type: 'string' },
	           { name: 'RESCH_SPCN_ID', type: 'string' },
	           { name: 'DELETE_YN', type: 'string' },
	           { name: 'AGE', type: 'number' },
	           { name: 'SEX_CD', type: 'string' },
	           { name: 'ABO_BLTY', type: 'string' },
	           { name: 'DEATH_YN', type: 'string' },
	           { name: 'DEATH_DT', type: 'date' },
	           { name: 'INHOSP_DEATH_DT', type: 'date' },
	           { name: 'UCOD_DIAG_CD', type: 'string' },
	           { name: 'CANCER_REG_YN', type: 'string' },
	           { name: 'SPCN_CNT', type: 'string' },
	           { name: 'MUT_CNT', type: 'number' },
	           { name: 'CNV_CNT', type: 'number' },
	           { name: 'SV_CNT', type: 'number' },
	           { name: 'EXP_CNT', type: 'number' },
	           { name: 'CANCER_TYPE', type: 'string' },
	           { name: 'CANCER_DETAIL', type: 'string' }
	        ],
	       datatype: "json",
	       //id : 'RESCH_PAT_ID',
	       deleterow: function (rowid, commit) {
               // synchronize with the server - send deleterow command
               // call commit with parameter true if the synchronization with the server is successful 
               // and with parameter false if the synchronization failed.
               //commit(true);
               
               var selectedrowindexes = $("#jqxCohortAnalysisData").jqxGrid('getselectedrowindexes');
	    	   if (selectedrowindexes.length > 0) $('#deletePatientList').trigger('click');
	    	   else if(selectedrowindexes.length == 0) {
	    		   showAlert('알림','삭제 되었습니다.',null);
	    	   }
           }
	       
	   };
	
		/*var source =
	    {
	        localdata: patientDataList,
	        datatype: "json",
	        id: "ITEM"
	    };*/
	    var dataAdapter = new $.jqx.dataAdapter(source, {
	        downloadComplete: function (data, status, xhr) { },
	        loadComplete: function (data) { },
	        loadError: function (xhr, status, error) { }
	    });
	
	    var cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties) {
         return "<div style='margin: 4px; color: #0000ff; cursor:pointer; text-align: center;' name='"+value+"' onclick=jqxPatiendataCellClick('"+value+"')>" + value + "</div>";
	    }
	    
	    var cellsrendereDel = function(row, columnfield, value, defaulthtml, columnproperties) {
	    	var rowdata = $("#jqxCohortAnalysisData").jqxGrid('getrowdata',row);
	    	
	    	var html = '';
			if(value=="N"){
				html = '';
				
				html = '<div class="row" style=" text-align: center;"><button type="button" ';
				html += ' id="btnDeletePatient_' + row + '"';
				html += ' row='+row+' seq='+rowdata.RESCH_PAT_ID+' spcn="'+rowdata.RESCH_SPCN_ID+'" class="btn btn-danger btn-sm btnDeletePatient"';
				html += ' style="text-align:center;"> ';
				html += '삭제';
				html += '</button></div> ';
				
			}
			else{
			
				html = '';
				
				html = '<div class="row" style="text-align: center;"><button type="button" ';
				html += ' id="btnRecoverPatient_' + row + '"';
				html += ' row='+row+' seq='+rowdata.RESCH_PAT_ID+' spcn="'+rowdata.RESCH_SPCN_ID+'" class="btn btn-warning btn-sm btnRecoverPatient"';
				html += ' style="text-align:center;"> ';
				html += '복구';
				html += '</button></div> ';

			}
			
			return html;
	    }
	    
	    $("#jqxCohortAnalysisData").jqxGrid(
	    {
	    	height : 500,
	    	/*width : 465,*/
	    	width: "100%",
	    	editable: true,
	    	theme: 'bootstrap',
	    	pageable: true,
	    	pagesize: 100,
			pagesizeoptions: ['10', '20', '30', '50', '100'],
	    	//showfilterrow : true,
	    	selectionmode: 'multiplecellsadvanced',
	    	filterable: true,
	    	columnsresize: true,
	    	columnsautoresize : true,
	        source: dataAdapter,
	        sortable : true,
	        ready: function () {
              
            },
	        columns: 
	        	[
	          { text: 'RESCH_PAT_ID', datafield: 'RESCH_PAT_ID' , editable: false, cellsrenderer: cellsrenderer,cellsalign: 'right'},
	          { text: 'RESCH_SPCN_ID', datafield: 'RESCH_SPCN_ID' , editable: false, cellsalign: 'center'},
	          { text: 'DELETE_YN', datafield:'DELETE_YN', editable:false, cellsrenderer: cellsrendereDel},
	          { text: 'AGE', datafield: 'AGE', editable: false,cellsalign: 'right'},
	          { text: 'SEX_CD', datafield: 'SEX_CD' , editable: false,cellsalign: 'right'},
	          { text: 'ABO_BLTY' , datafield: 'ABO_BLTY', editable: false ,cellsalign: 'right'},
	          { text: 'DEATH_YN' , datafield: 'DEATH_YN', editable: false ,cellsalign: 'right'},
	          { text: 'DEATH_DT' , datafield: 'DEATH_DT', editable: false ,cellsalign: 'right',cellsformat: 'yyyy-MM-dd' },
	          { text: 'INHOSP_DEATH_DT' , datafield: 'INHOSP_DEATH_DT', editable: false,cellsalign: 'right',cellsformat: 'yyyy-MM-dd' },
	          { text: 'UCOD_DIAG_CD' , datafield: 'UCOD_DIAG_CD', editable: false ,cellsalign: 'right'},
	          { text: 'CANCER_REG_YN' , datafield: 'CANCER_REG_YN', editable: false ,cellsalign: 'right'},
	          { text: 'SPCN_CNT' , datafield: 'SPCN_CNT', editable: false ,cellsalign: 'right'},
	          { text: 'MUT_CNT' , datafield: 'MUT_CNT', editable: false ,cellsalign: 'right'},
	          { text: 'CNV_CNT' , datafield: 'CNV_CNT', editable: false ,cellsalign: 'right'},
	          { text: 'SV_CNT' , datafield: 'SV_CNT', editable: false,cellsalign: 'right' },
	          { text: 'EXP_CNT' , datafield: 'EXP_CNT', editable: false ,cellsalign: 'right'},
	          { text: 'CANCER_TYPE' , datafield: 'CANCER_TYPE', editable: false ,cellsalign: 'right'},
	          { text: 'CANCER_DETAIL' , datafield: 'CANCER_DETAIL', editable: false ,cellsalign: 'right'}
	        ]
	    });
	    
	    $("#jqxCohortAnalysisData").on('cellselect', function (event) {
	    		    // event arguments.
	    		    var args = event.args;
	    		    // column data field.
	    		    var dataField = event.args.datafield;
	    		    // row's bound index.
	    		    var rowBoundIndex = event.args.rowindex;
	    		    // cell value
	    		    var value = args.value;
	    		    // row's data.
	    		    var rowData = args.row;
	    		    
	    		    if(dataField != 'RESCH_PAT_ID' && dataField != 'RESCH_SPCN_ID'){
	    		    	$('#jqxCohortAnalysisData').jqxGrid('unselectcell', rowBoundIndex, dataField);
	    		    }
	    		    
		});
	    
	    /*$("#jqxRangeSelector").jqxRangeSelector({
            width: 750, height: 80, min: "January 01, 1800", max: "January 01, 1900",
            majorTicksInterval: { years: 10 }, minorTicksInterval: "year", labelsFormat: "yyyy", markersFormat: "yyyy"
        });*/
	    
	    /*var applyFilter = function (from, to) {
            $("#jqxCohortAnalysisData").jqxGrid("clearfilters");
            filtertype = "datefilter";
            var filtergroup = new $.jqx.filter();
            var filter_or_operator = 0;
            var filtervalueFrom = from;
            var filterconditionFrom = "GREATER_THAN_OR_EQUAL";
            var filterFrom = filtergroup.createfilter(filtertype, filtervalueFrom, filterconditionFrom);
            filtergroup.addfilter(filter_or_operator, filterFrom);
            var filtervalueTo = to;
            var filterconditionTo = "LESS_THAN_OR_EQUAL";
            var filterTo = filtergroup.createfilter(filtertype, filtervalueTo, filterconditionTo);
            filtergroup.addfilter(filter_or_operator, filterTo);
            $("#jqxGrid").jqxGrid("DEATH_DT", "year", filtergroup);
            $("#jqxGrid").jqxGrid("applyfilters");
        };
        // update filter on "change" event.
        $("#jqxRangeSelector").on("change", function (event) {
            var range = event.args;
            var min = $("#jqxRangeSelector").jqxRangeSelector("min");
            var max = $("#jqxRangeSelector").jqxRangeSelector("max");
            min = new Date(min);
            max = new Date(max);
            if (range.from.getTime() == min.getTime() && range.to.getTime() == max.getTime()) {
                $("#jqxCohortAnalysisData").jqxGrid("clearfilters");
            } else {
                applyFilter(range.from, range.to);
            };
        });*/

}


function setCohortFilterBox(){
	if(dashboardTabNo == "1" || dashboardTabNo == "2"){
		var html = '';
		html +=		'<div class="btn-group label-group margin-left-10">';
		html += 		'<small class="label bg-orange">';
		html +=  			"Cancer Type";
		html += 		'</small>';
		html += 	'</div>';
		
		$('#cohortFilter').append(html);
		
	}
}


function setCohortKindBox(){

	if(dashboardTabNo == "1"){
		var cnt = 0;
		var html = '';
		html +=		'<div class="btn-group label-group margin-left-10" id="btnSelectedCohortModal">';
		html += 		'<small class="label bg-orange">';
		html +=  			"New Cohort";
		html += 		'</small><h5>';
		for(var i=0; i<selectedCohort.length; i++){
			
			if(selectedCohort[i].checked == true){
				if(cnt == 0){
					html += " " + selectedCohort[i].NM;
				}
				else if(cnt >=5){
					html += "...";
					break;
				}
				else{
					html += ", " + selectedCohort[i].NM;
				}
				cnt++;
			}
		}
		html += 	'</h5></div>';
		
		$('#cohort-grouop').append(html);
		
	}
	if(dashboardTabNo == "2"){
		var html = '';
		html +=		'<div class="btn-group label-group margin-left-10" id="btnSelectedPatientModal">';
		html += 		'<small class="label bg-orange">';
		html +=  			"New Cohort";
		html += 		'</small>';
		html += 	'</div>';
		
		$('#cohort-grouop').append(html);
		
	}
	else if(dashboardTabNo == "3"){
		for(var i=0; i<savedMyCohort.length; i++){
			
			
			var html = '';
			html +=		'<div class="btn-group label-group margin-left-10 SavedCohortModal" num="'+i+'" id="">';
			html += 		'<small class="label bg-orange">';
			html +=  			savedMyCohort[i].CONT_NM;
			html += 		'</small><h5>';
			
			var tmpArr = savedMyCohort[i].CANCERTYPE.split("|");
			var cnt = 0;
			for(var j=0; j<tmpArr.length; j++){
					if(cnt == 0){
						html += " " + tmpArr[j];
					}
					else if(cnt >=5){
						html += "...";
						break;
					}
					else{
						html += ", " + tmpArr[j];
					}
					cnt++;
				
			}
			
			html += 	'</h5></div>';
			
			$('#cohort-grouop').append(html);
			
			$('#txtDashboardCohortSub').append(savedMyCohort[i].CONT_NM + " ");
		}
		for(var i=0; i<savedMyCohort.length; i++){
			
		}

	}
}

function plotHighlight(filterArray, seq){
	
	for(var i=0; i<filterArray.length; i++){
		var tmpMap = filterArray[i];
		if(tmpMap.SEQ != seq) continue;
		
		var seq = tmpMap.SEQ;
		var myPlot = "boxChart"+seq;
		var filteridx = [];
		var widths = [];
		
		var plotMap = $('#'+myPlot)[0].data;
		var plotIdArr = plotMap[0].ids;
		var intBox =  Array.apply(null, new Array(plotIdArr.length)).map(Number.prototype.valueOf,0);
		var colorBox =  Array.apply(null, new Array(plotIdArr.length)).map(function(item) {return "silver"});
		for(var j=0; j<tmpMap.CONDITION.length; j++){
			
			filteridx.push(plotIdArr.indexOf(tmpMap.CONDITION[j]));
			intBox[plotIdArr.indexOf(tmpMap.CONDITION[j])] = '3';
			colorBox[plotIdArr.indexOf(tmpMap.CONDITION[j])] = '';
		}
		
		var update = {'marker':{ colors: colorBox, line: {width : intBox}}};
		Plotly.restyle(myPlot, update, []);
	}
}

function plotHighlightBar(filterArray, seq){
	
	for(var i=0; i<filterArray.length; i++){
		var tmpMap = filterArray[i];
		if(tmpMap.SEQ != seq) continue;
		
		var seq = tmpMap.SEQ;
		var myPlot = "boxChart"+seq;
		var filteridx = [];
		var widths = [];
		
		var plotMap = $('#'+myPlot)[0].data;
		var plotIdArr = plotMap[0].ids;

		var plotMin = tmpMap.CONDITION[0];
		var plotMax = tmpMap.CONDITION[1];
		var selectedArr = plotMap[0].selectedpoints;
		var colorBox =  Array.apply(null, new Array(plotIdArr.length)).map(function(item) {return "silver"});
		var lineBox =  Array.apply(null, new Array(plotIdArr.length)).map(function(item) {return "silver"});
		var intBox =  Array.apply(null, new Array(plotIdArr.length)).map(Number.prototype.valueOf,0);
		var selectedpoints = [];
		for(var j=0; j<plotIdArr.length; j++){
			if(plotIdArr[j] > plotMin && plotIdArr[j] <plotMax){
				colorBox[j] = 'rgb(31, 119, 180)';
				lineBox[j] = 'black';
				intBox[j] = '3';
			}
		}
		
		var update = {'marker' : {color: colorBox } };
		Plotly.restyle(myPlot, update, []);
	}
}

function setChartKindBox(rowData, seq, idx, result){
	 if(rowData.CHART_TYPE == 'PIE'){
		  makeTableChart(result.loadselectedChart, rowData, seq, 'boxChart'+seq, idx);
		  makePieChart(result.loadselectedChart, rowData, seq, 'boxChart'+seq, idx);
		  $('#boxChart'+seq+'_jqx').css('display','none');
		  
		  //$('#boxChart'+seq).css('display','none');
	  }
	  else if(rowData.CHART_TYPE == 'BAR'){
		  makeBarChart(result.loadselectedChart, rowData, seq, 'boxChart'+seq, idx);	    		  
	  }
	  else if(rowData.CHART_TYPE == 'GRD'){
		  makeTableChart(result.loadselectedChart, rowData, seq, 'boxChart'+seq, idx);
	  }
	  else if(rowData.CHART_TYPE == 'GAO'){
		  makeTableGAOChart(result.loadselectedChart, rowData, seq, 'boxChart'+seq, idx);
	  }
}

function getSelectedChartList(){
	var selectedArr = [];
	var rows = $('#subClinical').jqxGrid('getrows');
	for(var i=0; i<rows.length; i++){
		var rowData = rows[i];
		var chk = rows[i].DEFAULT_YN;
		if(chk == true){
			selectedArr.push(rowData);
		}
	}
	
	
	rows = $('#subGenomic').jqxGrid('getrows');
	for(var i=0; i<rows.length; i++){
		var rowData = rows[i];
		var chk = rows[i].DEFAULT_YN;
		if(chk == true){
			selectedArr.push(rowData);
		}
	}
	/*rows = $('#subEtc').jqxGrid('getrows');
	for(var i=0; i<rows.length; i++){
		var rowData = rows[i];
		var chk = rows[i].DEFAULT_YN;
		if(chk == true){
			selectedArr.push(rowData);
		}
	}*/
	
	selectedArr.sort(function(a,b){
		return a.ORDER - b.ORDER
		});
	return selectedArr;
}

function ajaxLoadingChartClear(){
	console.log(ajaxList[i])
	for(var i=0; i<ajaxList.length; i++){
		ajaxList[i].promise.abort();
	}
}

function getSelectedChartDefault(rowData, sb, filterArray){
	var seq = rowData.SEQ;
	
	var itemTarget = $('#box_item_'+seq).children('.box')[0];

	var spinner = new Spinner(gvChartOpts).spin(itemTarget);
	
	var dataSet = {};
	dataSet.ROW = rowData;
	dataSet.SUB_QUERY = sb;
	if(dashboardTabNo == "1"){
		dataSet.CohortTable = "pmsdata.P" + $.session.get("PER_CODE");
	}
	else if(dashboardTabNo == "2"){
		dataSet.CohortTable = "pmsdata.P" + $.session.get("PER_CODE");
	}
	else if(dashboardTabNo == "3"){
		dataSet.CohortTable = "pmsdata.P" + $.session.get("PER_CODE");
	}
	console.log(dataSet);
	var promise = httpChart('dashboard/loadselectedChartFilter', 'post', true , dataSet);
	var tmpAjaxMap = {id:seq,
					promise:promise};
	ajaxList.push(tmpAjaxMap);
    promise.then(function(result){
    	spinner.stop();
    	console.log(rowData.ITEM_NM,result);

    	var resultData = result.loadselectedChartFilter.CHART;
    	var tmpMap = {};
    	tmpMap.SEQ = rowData.SEQ;
    	tmpMap.ITEM_ID = rowData.ITEM_ID;
    	tmpMap.CHART_TYPE = rowData.CHART_TYPE;
    	tmpMap.resultData = resultData;
    	chartDataList.push(tmpMap);
    	
    	var idx = '';
	   	 if(rowData.CHART_TYPE == 'PIE'){
			  makeTableChart(resultData, rowData, seq, 'boxChart'+seq, idx);
			  makePieChart(resultData, rowData, seq, 'boxChart'+seq, idx);
			  $('#boxChart'+seq+'_jqx').css('display','none');
			  if(!isNullOrEmpty(filterArray)) plotHighlight(filterArray, seq);
			  //$('#boxChart'+seq).css('display','none');
		  }
		  else if(rowData.CHART_TYPE == 'BAR'){
			  makeBarChart(resultData, rowData, seq, 'boxChart'+seq, idx);	   
			  if(!isNullOrEmpty(filterArray)) plotHighlightBar(filterArray, seq);
		  }
		  else if(rowData.CHART_TYPE == 'GRD'){			//grid
			  makeTableChart(resultData, rowData, seq, 'boxChart'+seq, idx);
		  }
		  else if(rowData.CHART_TYPE == 'GAO'){			//grid and select
			  makeTableGAOChart(resultData, rowData, seq, 'boxChart'+seq, idx);
		  }
    	
    	
    })
    
    promise.complete(function(result){
    	spinner.stop();
    	ajaxList.splice(ajaxList.indexOf(tmpAjaxMap),1);
    })
	
}

function filteringAfterCheck(){
	$('.filter-box').each(function(key,value){
		
		var $this = $(this);
		var itemId = this.getAttribute('name');
		var seq = this.id.replace('filter_','');
		var cate = this.getAttribute('cate');
		var tmpArray = [];
		var tmpMap = {};
		
		$jqx = $('#boxChart'+seq+'_jqx');
		var $subCate = $('#'+getItemCateId(cate));
		var rowData = $subCate.jqxGrid('getrowdatabyid',seq);
		var type = rowData.CHART_TYPE;
		if(type == 'PIE'){
			$.each($(this).children('.btn-group'),function(){
				//tmpArray.push(this.id); 
				if($jqx.jqxGrid('getcellvaluebyid',this.id,'CHK') !== null){
					$jqx.jqxGrid('setcellvaluebyid',this.id,'CHK',true);	
				}
			});
		}
		/*else if(type == 'BAR'){
			$.each($(this).children('input[type="hidden"]'),function(){
				tmpArray.push(this.value);
			});
		}*/
		else if(type == 'GRD'){
			$.each($(this).children('.btn-group'),function(){
				//tmpArray.push(this.id); 
				if($jqx.jqxGrid('getcellvaluebyid',this.id,'CHK') !== null){
					$jqx.jqxGrid('setcellvaluebyid',this.id,'CHK',true);	
				}
			});
		}
		else if(type == 'GAO'){
			$.each($(this).children('.and-group'),function(){
				$.each($(this).children('.btn-group'),function(){
					if($jqx.jqxGrid('getcellvaluebyid',this.id,'CHK') !== null){
						$jqx.jqxGrid('setcellvaluebyid',this.id,'CHK',true);	
					}
				});
			});
			
			/*$.each($(this).children('.and-group'),function(){
				var tmpArr2 = [];
				var $this2 = $(this);
				$.each($(this).children('.btn-group'),function(){
					var tmpSet = {};
					//tmpSet["ID"] = this.id;
					$.each($(this).children('input[type="hidden"]'),function(){
						tmpSet[this.name] = this.value;
					})
					tmpArr2.push(tmpSet);
				});
				
				tmpArray.push(tmpArr2);
			});*/
		}
		
	});
}


function getSelectedChartFilter(rowData, sb, filterArray){
	
	//if(isNullOrEmpty(sb)) return;
	var seq = rowData.SEQ;
	
	var itemTarget = $('#box_item_'+seq).children('.box')[0];

	var spinner = new Spinner(gvChartOpts).spin(itemTarget);
	
	var dataSet = {};
	dataSet.ROW = rowData;
	dataSet.SUB_QUERY = sb;
	if(dashboardTabNo == "1"){
		dataSet.CohortTable = "pmsdata.P" + $.session.get("PER_CODE");
	}
	else if(dashboardTabNo == "2"){
		dataSet.CohortTable = "pmsdata.P" + $.session.get("PER_CODE");
	}
	else if(dashboardTabNo == "3"){
		dataSet.CohortTable = "pmsdata.P" + $.session.get("PER_CODE");
	}
	//console.log(dataSet);
	var promise = httpChart('dashboard/loadselectedChartFilter', 'post', true , dataSet);
	var tmpAjaxMap = {id:seq,
			promise:promise};
	ajaxList.push(tmpAjaxMap);
	promise.then(function(result){
    	console.log(rowData.ITEM_NM,result);
    	spinner.stop();

    	var resultData = result.loadselectedChartFilter.CHART;
    	
    	if(rowData.CHART_TYPE == 'PIE'){
    		
    		var $chart = $('#boxChart'+rowData.SEQ);
    		if(resultData.length == 0){
    			$chart.append("<span class='no-data-display' style='position: absolute; left:22%; top:50%;'>No data to display</span>");
    		}
    		var data = setPieChartdataform(resultData);
    		//$('#boxChart'+rowData.SEQ).html('');
    		Plotly.react('boxChart'+rowData.SEQ,data,pieLayout,config);
			plotHighlight(filterArray, rowData.SEQ);

    		var $jqx = $('#boxChart'+rowData.SEQ+'_jqx');
    		if($jqx.jqxGrid('getstate')==undefined){
    			  makeTableChart(resultData, rowData, seq, 'boxChart'+seq);
    			  $('#boxChart'+seq+'_jqx').css('display','none');
    		}
    		else{
    			$jqx.jqxGrid('source')._source.localdata = resultData;
        		$jqx.jqxGrid('updatebounddata','cells');
    		}
    		
    		
    		d3LineTextRemove('boxChart'+rowData.SEQ);
    		
    	}
    	else if(rowData.CHART_TYPE == 'BAR'){
    		var $chart = $('#boxChart'+rowData.SEQ);
    		if(resultData.length == 0){
    			$chart.append("<span class='no-data-display' style='position: absolute; left:35%; top:50%;'>No data to display</span>");			
    		}
    		var data = setBarChartdataform(resultData);
    		Plotly.react('boxChart'+rowData.SEQ,data,barLayout,config);
    		
    		plotHighlightBar(filterArray, rowData.SEQ);
    	}
    	else if(rowData.CHART_TYPE == 'GRD'){
    		var $jqx = $('#boxChart'+rowData.SEQ+'_jqx');
    		if($jqx.jqxGrid('getstate')==undefined){
  			  makeTableChart(resultData, rowData, seq, 'boxChart'+seq);
	  		}
	  		else{
	    		$jqx.jqxGrid('source')._source.localdata = resultData;
	    		
	    		$jqx.jqxGrid('updatebounddata','cells');
	  		}
    		
    		
    	}
    	else if(rowData.CHART_TYPE == 'GAO'){
    		var $jqx = $('#boxChart'+rowData.SEQ+'_jqx');

    		if($jqx.jqxGrid('getstate')==undefined){
    			  makeTableGAOChart(resultData, rowData, seq, 'boxChart'+seq);
  	  		}
  	  		else{
  	  			$jqx.jqxGrid('source')._source.localdata = resultData;
    		
    		$jqx.jqxGrid('updatebounddata','cells');
  	  		}
    		
    		
    	}
    	//필터링 이후 jqxGrid 다시 체크
    	filteringAfterCheck();
    	
    	/*marker : { colors : [,'rgb(226, 215, 215)'] ,
			  line : {color : ['silver'], width:[3,0]}
		}*/
    	
    })
    promise.complete(function(result){
    	spinner.stop();
    	ajaxList.splice(ajaxList.indexOf(tmpAjaxMap),1);
    })
	
}

function getFilterBoxGroup(){
	var filterArray = [];
	
	$('.filter-box').each(function(key,value){
		var $this = $(this);
		var itemId = this.getAttribute('name');
		var seq = this.id.replace('filter_','');
		var baseTable = this.getAttribute('table');
		var tmpArray = [];
		var tmpMap = {};
		var itemCol = '';
		var cate = this.getAttribute('cate');
		var $subCate = $('#'+getItemCateId(cate));
		
		var rowData = $subCate.jqxGrid('getrowdatabyid',seq);
		var type = rowData.CHART_TYPE;
		if(!isNullOrEmpty(rowData.ITEM_LABEL)){
			itemCol = rowData.ITEM_COLUMN.split('|');
		}
		
		if(type == 'PIE'){
			$.each($(this).children('.btn-group'),function(){
				tmpArray.push(this.id); 	
			});
		}
		else if(type == 'BAR'){
			$.each($(this).children('input[type="hidden"]'),function(){
				tmpArray.push(this.value);
			});
		}
		else if(type == 'GRD'){
			$.each($(this).children('.btn-group'),function(){
				tmpArray.push(this.id); 	
			});
		}
		else if(type == 'GAO'){
			$.each($(this).children('.and-group'),function(){
				var tmpArr2 = [];
				var $this2 = $(this);
				$.each($(this).children('.btn-group'),function(){
					var tmpSet = {};
					//tmpSet["ID"] = this.id;
					$.each($(this).children('input[type="hidden"]'),function(){
						tmpSet[this.name] = this.value;
					})
					tmpArr2.push(tmpSet);
				});
				
				tmpArray.push(tmpArr2);
			});
		}
		tmpMap.CHART_TYPE = type;
		tmpMap.CONDITION = tmpArray;
		tmpMap.ITEM_ID = itemId;
		tmpMap.BASE_TABLE = baseTable;
		tmpMap.SEQ = seq;
		filterArray.push(tmpMap);
	});
	
	return filterArray;
}

function setDrawChart(rowData){
	var dataSet = {};
	dataSet.DATAQUERY = rowData.EXEC_SQL;
	
	var tmpMap = boxListSearch(rowData);
	var len = tmpMap.len;
	var idx = tmpMap.idx + 1;
	var num = parseInt(tmpMap.num) + 1;
	var seq = rowData.SEQ;
	

	if(rowData.CHART_TYPE == 'PIE'){			 
	  html = makeChartBox(null, rowData.ITEM_NM, 'PIE', seq, idx ,rowData.ITEM_CATE_ID); 
	  $('#item_'+idx).append(html);

	}
	else if(rowData.CHART_TYPE == 'BAR'){
	  html = makeChartBox(null, rowData.ITEM_NM, 'BAR', seq, idx ,rowData.ITEM_CATE_ID);
	  $('#item_'+idx).append(html);

	}
	else if(rowData.CHART_TYPE == 'GRD'){
	  html = makeChartBox(null, rowData.ITEM_NM, 'GRD', seq, idx ,rowData.ITEM_CATE_ID); 
	  $('#item_'+idx).append(html);

	}
	else if(rowData.CHART_TYPE == 'GAO'){
		html = makeChartBox(null, rowData.ITEM_NM, 'GAO', seq, idx ,rowData.ITEM_CATE_ID); 
		$('#item_'+idx).append(html);
	}
	var itemTarget = $('#box_item_'+seq).children('.box')[0];
	/*var spinner = new Spinner(gvChartOpts).spin(itemTarget);

	var promise = http('dashboard/loadselectedChart', 'post', true , dataSet);
    promise.then(function(result){
    	spinner.stop();
    	
    	//setChartKindBox(rowData, seq, idx, result);
    	
    });*/
}

function getItemCateId(cate){
	var jqxcateStr = '';
	
	if(cate == 'CLINICAL'){
		jqxcateStr = 'subClinical';
	}
	else if(cate == 'GENOMIC'){
		jqxcateStr = 'subGenomic';
	}
	else if(cate == 'ETC'){
		jqxcateStr = 'subEtc';
	}
	
	return jqxcateStr;
}


function checkDefaultChart(){
	
	var selectedArr = [];
	selectedArr = getSelectedChartList();
	
	for(var i=0; i<selectedArr.length; i++){
		
		var rowData = selectedArr[i];
		
		
		if(rowData.DEFAULT_YN == 'Y' || rowData.DEFAULT_YN == true){
			
			setDrawChart(rowData);
		}
		
	}
	
}
function setChartAddList(){
	loadChartList = [];
	loadChartListSeq = [];
	dataClinical = [];
	dataGenomic = [];
	dataEtc = [];
	
	var dataSet = {};
	var cate_kind = ["CLINICAL", "GENOMIC", "ETC"];
	dataSet.CATE_ID_KIND = cate_kind;
	dataSet.PROGRM_ID = "MAIN";
	var promise = http('dashboard/selectChartList', 'post', false , dataSet);
	promise.then(function(result){
		console.log(result);
		var dataView = result.CLINICAL;
		
		dataClinical = dataView;
		dataGenomic = result.GENOMIC;
	});
	promise.fail(function(e){
		console.log(e);
	});
	
	
	if(dashboardTabNo == "3"){
		var dataSet2 = {};
		var savedMyCohortSeq = [];
		for(var i=0; i<savedMyCohort.length; i++){
			savedMyCohortSeq.push(savedMyCohort[i].SEQ);
		}
		dataSet2.PER_CODE = $.session.get("PER_CODE");
		dataSet2.CONT_SEQ = savedMyCohortSeq.toString();
		
		var promise2 = http('cohort/selContChartList', 'post', false , dataSet2);
		promise2.then(function(result){
			console.log(result);
			var dataView = result.selContChartList;
			
			loadChartList = dataView;
			for(var i=0; i<dataView.length; i++){
				loadChartListSeq.push(dataView[i].CHART_SEQ);
			}
			
			
		});
		promise2.fail(function(e){
			console.log(e);
		});
	}

	setJqxGridClinical();
	setJqxGridGenomic();
	setJqxGridEtc();
}

function setJqxGridEtc(){
	gvDataEtcSource =
	   {
	       localdata: dataEtc,
	       datafields:
	       [
	    	   { name: 'SEQ', type: 'string' },
	           { name: 'PROGRM_ID', type: 'string' },
	           { name: 'ITEM_CATE_ID', type: 'string' },
	           { name: 'ITEM_CATE_NM', type: 'string' },
	           { name: 'ITEM_ID', type: 'string' },
	           { name: 'ITEM_NM', type: 'string' },
	           { name: 'ITEM_DESC', type: 'string' },
	           { name: 'ORDER', type: 'number' },
	           { name: 'SEARCH_YN', type: 'string' },
	           { name: 'DEFAULT_YN', type: 'string' },
	           { name: 'ITEM_TYPE', type: 'string' },
	           { name: 'CHART_TYPE', type: 'string' },
	           { name: 'EXEC_SQL', type: 'string' },
	           { name: 'BASE_DT_TABLE', type: 'string' },
	           { name: 'BASE_DT_COLUMN', type: 'string' },
	           { name: 'FREQ', type: 'int' },
	           { name: 'ITEM_COLUMN', type: 'string' },
	           { name: 'ITEM_LABEL', type: 'string' },
	           { name: 'ORIGIN_SQL', type: 'string' }
	        ],
	       datatype: "json",
	       id : 'SEQ',
	       updaterow: function (rowid, rowdata, commit) {
		         // synchronize with the server - send update command
		         // call commit with parameter true if the synchronization with the server was successful 
		         // and with parameter false if the synchronization has failed.
		         console.log(rowdata);
		         var rowData = rowdata;
		         console.log("false");
		    	  if($('#filter_'+rowData.SEQ).length != 0 ){
		    		  $('#filter_'+rowData.SEQ).remove();
		    		 // $('#btnDashboardFilterApply').trigger('click');
		    	  }
		    	  $('#box_item_'+rowData.SEQ).remove();
		    	  boxWeightCheck();
		    	  commit(true);
		     }
	       
	   };
	  

	  $("#subETC").on("bindingcomplete", function (event){
		  //$("#subClinical").jqxGrid('sortby', 'ORDER', 'asc');
	  });
	  
	  var dataAdapter = new $.jqx.dataAdapter(gvDataEtcSource, {
		 beforeLoadComplete: function (records) {
			 var data = new Array();
			 if(loadChartList.length == 0){
				 for (var i = 0; i < records.length; i++) {
		            var tmp = records[i];
		            
		            if(tmp.DEFAULT_YN == 'Y'){
		            	tmp.DEFAULT_YN = true;
		            } 
		            else{
		            	tmp.DEFAULT_YN = false;
		            }
		            data.push(tmp);
				 } 
			 }
			 else{
				 for (var i = 0; i < records.length; i++) {
		            var tmp = records[i];
		            
		            if(loadChartListSeq.indexOf(tmp.SEQ) != -1){
		            	tmp.DEFAULT_YN = true;
		            } 
		            else{
		            	tmp.DEFAULT_YN = false;
		            }
		            data.push(tmp);
				 }
			 }
			 
			 	
	        // update the loaded records. Dynamically add EmployeeName and EmployeeID fields. 
	        
	        return data;
	     },
	     loadComplete: function (data) 
	     {
	     }
	 });
	  // Create jqxGrid
	  $("#subETC").jqxGrid(
	  {
		  width: '100%',
	      source: dataAdapter,
	      editable: true,
	      theme: 'bootstrap',
	      showfilterrow : true,
	      filterable: true,
	      //selectionmode: 'checkbox',
	      sortable : true,
	      columnsresize: true,
	      columnsautoresize : true,
	      ready: function(){
	    	  
	      },
	      columns: [
	    	{ 
	    		text: '#', datafield: 'DEFAULT_YN' , editable: true, columntype:'checkbox'
	    	},  
	        { 
	    		text: 'Name', datafield: 'ITEM_NM', width: '80%' , editable: false
	    	},
	        { 
	        	text: 'Freq', datafield: 'FREQ' , editable: false,
	        	cellsrenderer : function(row, column, value){
	        		
	        	}, cellsformat : 'p1'
	        }
	      ]
	  });

	  $("#subETC").jqxGrid('sortby', 'FREQ', 'desc');

	  $("#subETC").on('cellvaluechanged', function (event) 
	  {
	      // event arguments.
	      var args = event.args;
	      // column data field.
	      var datafield = event.args.datafield;
	      // row's bound index.
	      var rowBoundIndex = args.rowindex;
	      // new cell value.
	      var value = args.newvalue;
	      // old cell value.
	      var oldvalue = args.oldvalue;
	      var rowData = $('#subETC').jqxGrid('getrowdata',rowBoundIndex);
	      
	      if(value == true){
	    	  console.log("true");
	    	  var query = rowData.EXEC_SQL;

		      var dataSet = {};
		      dataSet.DATAQUERY = query;
		      dataSet.ROW = rowData;
		      var tmpMap = boxListSearch(rowData);
		  var len = tmpMap.len;
		  var idx = tmpMap.idx + 1;
		  var num = parseInt(tmpMap.num) + 1;
		  var seq = rowData.SEQ;
		  var html = '';
		  if(rowData.CHART_TYPE == 'PIE'){			 
			  html = makeChartBox(null, rowData.ITEM_NM, 'PIE', seq, idx,"ETC");    			  
		  }
		  else if(rowData.CHART_TYPE == 'BAR'){
			  html = makeChartBox(null, rowData.ITEM_NM, 'BAR', seq, idx,"ETC");   			  
		  }
		  else if(rowData.CHART_TYPE == 'GRD'){
			  html = makeChartBox(null, rowData.ITEM_NM, 'GRD', seq, idx,"ETC");   			  
		  }
		  else if(rowData.CHART_TYPE == 'GAO'){
			  html = makeChartBox(null, rowData.ITEM_NM, 'GAO', seq, idx,"ETC"); 
			  }
			  $('#item_'+idx).append(html);

			  var itemTarget = $('#box_item_'+seq).children('.box')[0];
			  
			  getSelectedChartDefault(rowData, cohortFilterQuery);
			  
/*			  var spinner = new Spinner(gvChartOpts).spin(itemTarget);
			  
		      var promise = http('dashboard/loadselectedChartFilter', 'post', true , dataSet);
		      promise.then(function(result){
		    	  spinner.stop();
	    		  setChartKindBox(rowData,seq,idx,result);

		      });*/
	      }
	      else{
	    	  console.log("false");
	    	  if($('#filter_'+rowData.SEQ).length != 0 ){
	    		  $('#filter_'+rowData.SEQ).remove();
	    		 // $('#btnDashboardFilterApply').trigger('click');
	    	  }
	    	  $('#box_item_'+rowData.SEQ).remove();
	    	  
	      }

	  });
}

function setJqxGridGenomic(){
	gvDataGenomicSource =
	   {
	       localdata: dataGenomic,
	       datafields:
	       [
	    	   { name: 'SEQ', type: 'string' },
	           { name: 'PROGRM_ID', type: 'string' },
	           { name: 'ITEM_CATE_ID', type: 'string' },
	           { name: 'ITEM_CATE_NM', type: 'string' },
	           { name: 'ITEM_ID', type: 'string' },
	           { name: 'ITEM_NM', type: 'string' },
	           { name: 'ITEM_DESC', type: 'string' },
	           { name: 'ORDER', type: 'number' },
	           { name: 'SEARCH_YN', type: 'string' },
	           { name: 'DEFAULT_YN', type: 'string' },
	           { name: 'ITEM_TYPE', type: 'string' },
	           { name: 'CHART_TYPE', type: 'string' },
	           { name: 'EXEC_SQL', type: 'string' },
	           { name: 'BASE_DT_TABLE', type: 'string' },
	           { name: 'BASE_DT_COLUMN', type: 'string' },
	           { name: 'FREQ', type: 'int' },
	           { name: 'ITEM_COLUMN', type: 'string' },
	           { name: 'ITEM_LABEL', type: 'string' },
	           { name: 'ORIGIN_SQL', type: 'string' }
	        ],
	       datatype: "json",
	       id : 'SEQ',
		     updaterow: function (rowid, rowdata, commit) {
		         // synchronize with the server - send update command
		         // call commit with parameter true if the synchronization with the server was successful 
		         // and with parameter false if the synchronization has failed.
		         console.log(rowdata);
		         var rowData = rowdata;
		         console.log("false");
		    	  if($('#filter_'+rowData.SEQ).length != 0 ){
		    		  $('#filter_'+rowData.SEQ).remove();
		    		 // $('#btnDashboardFilterApply').trigger('click');
		    	  }
		    	  $('#box_item_'+rowData.SEQ).remove();
		    	  boxWeightCheck();
		    	 commit(true);
		     }
	       
	   };
	  

	  $("#subGenomic").on("bindingcomplete", function (event){
		  //$("#subClinical").jqxGrid('sortby', 'ORDER', 'asc');
	  });
	  
	  var dataAdapter = new $.jqx.dataAdapter(gvDataGenomicSource, {
		 beforeLoadComplete: function (records) {
			 var data = new Array();
			 if(loadChartList.length == 0){
				 for (var i = 0; i < records.length; i++) {
		            var tmp = records[i];
		            
		            if(tmp.DEFAULT_YN == 'Y'){
		            	tmp.DEFAULT_YN = true;
		            } 
		            else{
		            	tmp.DEFAULT_YN = false;
		            }
		            data.push(tmp);
				 } 
			 }
			 else{
				 for (var i = 0; i < records.length; i++) {
		            var tmp = records[i];
		            
		            if(loadChartListSeq.indexOf(tmp.SEQ) != -1){
		            	tmp.DEFAULT_YN = true;
		            } 
		            else{
		            	tmp.DEFAULT_YN = false;
		            }
		            data.push(tmp);
				 }
			 }
			 
			 	
	        // update the loaded records. Dynamically add EmployeeName and EmployeeID fields. 
	        
	        return data;
	     },
	     loadComplete: function (data) 
	     {
	     }
	 });
	  // Create jqxGrid
	  $("#subGenomic").jqxGrid(
	  {
		  width: '100%',
	      source: dataAdapter,
	      editable: true,
	      theme: 'bootstrap',
	      showfilterrow : true,
	      filterable: true,
	      //selectionmode: 'checkbox',
	      sortable : true,
	      columnsresize: true,
	      columnsautoresize : true,
	      ready: function(){
	    	  
	      },
	      columns: [
	    	{ 
	    		text: '#', datafield: 'DEFAULT_YN' , editable: true, columntype:'checkbox'
	    	},  
	        { 
	    		text: 'Name', datafield: 'ITEM_NM', width: '80%' , editable: false
	    	},
	        { 
	        	text: 'Freq', datafield: 'FREQ' , editable: false,
	        	cellsrenderer : function(row, column, value){
	        		
	        	}, cellsformat : 'p1'
	        }
	      ]
	  });

	  $("#subGenomic").jqxGrid('sortby', 'FREQ', 'desc');

	  $("#subGenomic").on('cellvaluechanged', function (event) 
	  {
	      // event arguments.
	      var args = event.args;
	      // column data field.
	      var datafield = event.args.datafield;
	      // row's bound index.
	      var rowBoundIndex = args.rowindex;
	      // new cell value.
	      var value = args.newvalue;
	      // old cell value.
	      var oldvalue = args.oldvalue;
	      var rowData = $('#subGenomic').jqxGrid('getrowdata',rowBoundIndex);
	      
	      if(value == true){
	    	  console.log("true");
	    	  var query = rowData.EXEC_SQL;

		      var dataSet = {};
		      dataSet.DATAQUERY = query;
		      dataSet.ROW = rowData;
		      var tmpMap = boxListSearch(rowData);
		  var len = tmpMap.len;
		  var idx = tmpMap.idx + 1;
		  var num = parseInt(tmpMap.num) + 1;
		  var seq = rowData.SEQ;
		  var html = '';
		  if(rowData.CHART_TYPE == 'PIE'){			 
			  html = makeChartBox(null, rowData.ITEM_NM, 'PIE', seq, idx,"GENOMIC");    			  
		  }
		  else if(rowData.CHART_TYPE == 'BAR'){
			  html = makeChartBox(null, rowData.ITEM_NM, 'BAR', seq, idx,"GENOMIC");   			  
		  }
		  else if(rowData.CHART_TYPE == 'GRD'){
			  html = makeChartBox(null, rowData.ITEM_NM, 'GRD', seq, idx,"GENOMIC");   			  
		  }
		  else if(rowData.CHART_TYPE == 'GAO'){
			  html = makeChartBox(null, rowData.ITEM_NM, 'GAO', seq, idx,"GENOMIC"); 
			  }
			  $('#item_'+idx).append(html);

			  var itemTarget = $('#box_item_'+seq).children('.box')[0];
			  
			  getSelectedChartDefault(rowData, cohortFilterQuery);
			  
/*			  var spinner = new Spinner(gvChartOpts).spin(itemTarget);
			  
		      var promise = http('dashboard/loadselectedChartFilter', 'post', true , dataSet);
		      promise.then(function(result){
		    	  spinner.stop();
	    		  setChartKindBox(rowData,seq,idx,result);

		      });*/
	      }
	      else{
	    	  console.log("false");
	    	  if($('#filter_'+rowData.SEQ).length != 0 ){
	    		  $('#filter_'+rowData.SEQ).remove();
	    		 // $('#btnDashboardFilterApply').trigger('click');
	    	  }
	    	  $('#box_item_'+rowData.SEQ).remove();
	    	  
	      }

	  });
}


function setJqxGridClinical(){
	gvDataClinicalSource =
	   {
	       localdata: dataClinical,
	       datafields:
	       [
	    	   { name: 'SEQ', type: 'string' },
	           { name: 'PROGRM_ID', type: 'string' },
	           { name: 'ITEM_CATE_ID', type: 'string' },
	           { name: 'ITEM_CATE_NM', type: 'string' },
	           { name: 'ITEM_ID', type: 'string' },
	           { name: 'ITEM_NM', type: 'string' },
	           { name: 'ITEM_DESC', type: 'string' },
	           { name: 'ORDER', type: 'number' },
	           { name: 'SEARCH_YN', type: 'string' },
	           { name: 'DEFAULT_YN', type: 'string' },
	           { name: 'ITEM_TYPE', type: 'string' },
	           { name: 'CHART_TYPE', type: 'string' },
	           { name: 'EXEC_SQL', type: 'string' },
	           { name: 'BASE_DT_TABLE', type: 'string' },
	           { name: 'BASE_DT_COLUMN', type: 'string' },
	           { name: 'FREQ', type: 'int' },
	           { name: 'ITEM_COLUMN', type: 'string' },
	           { name: 'ITEM_LABEL', type: 'string' },
	           { name: 'ORIGIN_SQL', type: 'string' }
	        ],
	       datatype: "json",
	       id : 'SEQ',
	       updaterow: function (rowid, rowdata, commit) {
		         // synchronize with the server - send update command
		         // call commit with parameter true if the synchronization with the server was successful 
		         // and with parameter false if the synchronization has failed.
		         console.log(rowdata);
		         var rowData = rowdata;
		         console.log("false");
		    	  if($('#filter_'+rowData.SEQ).length != 0 ){
		    		  $('#filter_'+rowData.SEQ).remove();
		    		 // $('#btnDashboardFilterApply').trigger('click');
		    	  }
		    	  $('#box_item_'+rowData.SEQ).remove();
		    	  boxWeightCheck()
		    	  commit(true);
		     }
	       
	   };
	  

	  $("#subClinical").on("bindingcomplete", function (event){
		  //$("#subClinical").jqxGrid('sortby', 'ORDER', 'asc');
	  });
	  
	  var dataAdapter = new $.jqx.dataAdapter(gvDataClinicalSource, {
		 beforeLoadComplete: function (records) {
			 var data = new Array();
			 if(loadChartList.length == 0){
				 for (var i = 0; i < records.length; i++) {
		            var tmp = records[i];
		            
		            if(tmp.DEFAULT_YN == 'Y'){
		            	tmp.DEFAULT_YN = true;
		            } 
		            else{
		            	tmp.DEFAULT_YN = false;
		            }
		            data.push(tmp);
				 } 
			 }
			 else{
				 for (var i = 0; i < records.length; i++) {
		            var tmp = records[i];
		            
		            if(loadChartListSeq.indexOf(tmp.SEQ) != -1){
		            	tmp.DEFAULT_YN = true;
		            } 
		            else{
		            	tmp.DEFAULT_YN = false;
		            }
		            data.push(tmp);
				 }
			 }
			 
			 	
	        // update the loaded records. Dynamically add EmployeeName and EmployeeID fields. 
	        
	        return data;
	     },
	     loadComplete: function (data) 
	     {
	     }
	 });
	  // Create jqxGrid
	  $("#subClinical").jqxGrid(
	  {
		  width: '100%',
	      source: dataAdapter,
	      editable: true,
	      theme: 'bootstrap',
	      showfilterrow : true,
	      filterable: true,
	      //selectionmode: 'checkbox',
	      sortable : true,
	      columnsresize: true,
	      columnsautoresize : true,
	      ready: function(){
	    	  
	      },
	      columns: [
	    	{ 
	    		text: '#', datafield: 'DEFAULT_YN' , editable: true, columntype:'checkbox'
	    	},  
	        { 
	    		text: 'Name', datafield: 'ITEM_NM', width: '80%' , editable: false
	    	},
	        { 
	        	text: 'Freq', datafield: 'FREQ' , editable: false,
	        	cellsrenderer : function(row, column, value){
	        		
	        	}, cellsformat : 'p1'
	        }
	      ]
	  });

	  $("#subClinical").jqxGrid('sortby', 'FREQ', 'desc');

	  $("#subClinical").on('cellvaluechanged', function (event) 
	  {
	      // event arguments.
	      var args = event.args;
	      // column data field.
	      var datafield = event.args.datafield;
	      // row's bound index.
	      var rowBoundIndex = args.rowindex;
	      // new cell value.
	      var value = args.newvalue;
	      // old cell value.
	      var oldvalue = args.oldvalue;
	      var rowData = $('#subClinical').jqxGrid('getrowdata',rowBoundIndex);
	      
	      if(value == true){
	    	  console.log("true");
	    	  var query = rowData.EXEC_SQL;

		      var dataSet = {};
		      dataSet.DATAQUERY = query;
		      dataSet.ROW = rowData;
		      var tmpMap = boxListSearch(rowData);
 		  var len = tmpMap.len;
 		  var idx = tmpMap.idx + 1;
 		  var num = parseInt(tmpMap.num) + 1;
 		  var seq = rowData.SEQ;
 		  var html = '';
 		  if(rowData.CHART_TYPE == 'PIE'){			 
 			  html = makeChartBox(null, rowData.ITEM_NM, 'PIE', seq, idx,"CLINICAL");    			  
 		  }
 		  else if(rowData.CHART_TYPE == 'BAR'){
 			  html = makeChartBox(null, rowData.ITEM_NM, 'BAR', seq, idx,"CLINICAL");   			  
 		  }
 		  else if(rowData.CHART_TYPE == 'GRD'){
 			  html = makeChartBox(null, rowData.ITEM_NM, 'GRD', seq, idx,"CLINICAL");   			  
 		  }
 		  else if(rowData.CHART_TYPE == 'GAO'){
 			  html = makeChartBox(null, rowData.ITEM_NM, 'GAO', seq, idx,"CLINICAL"); 
			  }
			  $('#item_'+idx).append(html);

			  var itemTarget = $('#box_item_'+seq).children('.box')[0];
			  
			  getSelectedChartDefault(rowData, cohortFilterQuery);
			  
/*			  var spinner = new Spinner(gvChartOpts).spin(itemTarget);
			  
		      var promise = http('dashboard/loadselectedChartFilter', 'post', true , dataSet);
		      promise.then(function(result){
		    	  spinner.stop();
	    		  setChartKindBox(rowData,seq,idx,result);

		      });*/
	      }
	      else{
	    	  console.log("false");
	    	  if($('#filter_'+rowData.SEQ).length != 0 ){
	    		  $('#filter_'+rowData.SEQ).remove();
	    		 // $('#btnDashboardFilterApply').trigger('click');
	    	  }
	    	  $('#box_item_'+rowData.SEQ).remove();
	    	  
	      }

	  });
}

function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
}

function getCohortTable(){
	
	
	if(dashboardTabNo == "1" || dashboardTabNo == "2" || dashboardTabNo == "3"){
		var dataSet = {};
		dataSet.PER_CODE = $.session.get("PER_CODE");
		
		var promise = http('cohort/selCohortTable', 'post', false , dataSet);
		
		promise.then(function(result){
			var dataView = result.selCohortTable;
			
			console.log(result);
			
			cohortTablePatnoList = dataView;
			cohortQuery = result.CohortTableQuery;
			cohortFilterQuery = result.CohortTableQuery;
			cohortFilterAllQuery = result.CohortTableAllQuery;
			cohortFilterSpcnQuery = result.CohortTableSpcnQuery;
			cohortFilterAllGroupByQuery = result.CohortTableAllGroupByQuery;
			cohortFilterSpcnQueryWithout = result.CohortTableSpcnQueryWithout
			
			getPatientCount();
			
			getSPCNCount();
			
			var selectedArr = [];
			selectedArr = getSelectedChartList();
			
			
			for(var i=0; i<selectedArr.length; i++){
				
				var row = selectedArr[i];
				if(row.ITEM_CATE_ID == 'CLINICAL' || row.ITEM_CATE_ID == 'ETC'){
					getSelectedChartDefault(row, result.CohortTableQuery);
				}
				else if(row.ITEM_CATE_ID == 'GENOMIC'){
					getSelectedChartDefault(row, result.CohortTableSpcnQuery);
				}
			}
			
		});
		promise.fail(function(e){
			console.log(e);
		})
		
		//모달 트리
		if(dashboardTabNo == "1") initTreeC(selectedCohort);
		
	}
	
	
}

function initTreeC(dataTree){

	if(dataTree.length>0){
		var width = 1400;
		var height = 1000;
		var dx = 24;
		var dy = width/4;
		var margin = ({top: 10, right: 10, bottom: 10, left: 100});
	
		var diagonal = d3.linkHorizontal().x(d => d.y).y(d => d.x);
	
		var tree = d3.tree().nodeSize([dx, dy]);
		var radius = 6;
	
		const root = d3.stratify()
					.id(function(d){return d.ID})
					.parentId(function(d){return d.PARENTS_ID})(dataTree);
				root.x0 = dy / 2;
				root.y0 = 0;
				root.descendants().forEach((d, i) => {
			    d.id = i;
			    d._children = d.children;
			    d.checked = false;
			    //if (d.depth && d.data.ID.length !== 4) d.children = null;
		 });
	
		$('#divSelectedCohort').empty();
		
		const svg = d3.select("#divSelectedCohort").append("svg")
	    .attr("viewBox", [-margin.left, -margin.top, width, dx])
	    .style("font", "13px sans-serif")
	    .style("user-select", "none")
	    .style("min-height","500px");
	    
		const gLink = svg.append("g")
	    .attr("fill", "none")
	    .attr("stroke", "#555")
	    .attr("stroke-opacity", 0.4)
	    .attr("stroke-width", 1.5);
	
		const gNode = svg.append("g")
	    .attr("cursor", "pointer")
	    .attr("pointer-events", "all");
	    
		svg.call(d3.zoom().scaleExtent([1/2,2]).on("zoom", function () {
	        gNode.attr("transform", d3.event.transform)
	        gLink.attr("transform", d3.event.transform)
	        /*var rang = (d3.zoomTransform(this).k*100).toFixed(2)
	        var rang_f = d3.zoomTransform(this).k*50;
	        $('#customRange1').val(rang_f);
	        $('#rangeScaleVal').text((d3.zoomTransform(this).k*100).toFixed(2)+"%");*/
	     }))
		
		function update(source) {
			    const duration = d3.event && d3.event.altKey ? 2500 : 250;
			    const nodes = root.descendants().reverse();
			    const links = root.links();
	
			    // Compute the new tree layout.
			    tree(root);
			    //d3.tree().nodeSize([root.dx, root.dy]);
			    
			    let left = root;
			    let right = root;
			    root.eachBefore(node => {
			      if (node.x < left.x) left = node;
			      if (node.x > right.x) right = node;
			    });
	
			    const height = right.x - left.x + margin.top + margin.bottom;
	
			    const transition = svg.transition()
			        .duration(duration)
			        .attr("viewBox", [-margin.left, left.x - margin.top, width, height])
			        .tween("resize", window.ResizeObserver ? null : () => () => svg.dispatch("toggle"));
	
			    // Update the nodes…
			    const node = gNode.selectAll("g")
			      .data(nodes, d => d.id);
			    
			    // Enter any new nodes at the parent's previous position.
			    		    
			    const nodeEnter = node.enter().append("g")
			        .attr("transform", d => 'translate('+source.y0+','+source.x0+')')
			        .attr("fill-opacity", 0)
			        .attr("stroke-opacity", 0)
			        
	
			        
			   /* nodeEnter.on("mouseover", mouseover)
	            .on("mousemove", function(d){mousemove(d);})
	            .on("mouseout", mouseout)
	            .attr("fill","black")
	            .attr("r", 5.5);*/
			    
			    nodeEnter.append("circle")
			        .attr("r", 5)
			        .attr("fill", d => {	
			        	if(d.data.LEVEL == 1) return d.data.COLOR
			        	else return d._children ? "#555" : "rgb(255, 255, 255)"
			        	})
		        	.attr("stroke", d => {	
			        	if(d.data.LEVEL == 1) return d.data.COLOR
			        	else return d._children ? "#555" : "#999"
			        	})
			        .attr("stroke-width", 1)
			        .on("click", d => {
				          d.children = d.children ? null : d._children;
				          update(d);
				        });
			        
			    nodeEnter.append("text")
			        .attr("dy", "0.31em")
			        .attr("x", d => d._children ? -9 : 9)
			        .attr("text-anchor", d => d._children ? "end" : "start")
			        .text(d => d.data.NM)
			        .on("click", d => {
				          d.children = d.children ? null : d._children;
				          update(d);
				        })
			      .clone(true).lower();
			    
			    const checkNode = nodeEnter.append("foreignObject")
			    	.attr("dy", "0.31em")
			    	.attr("x", d => d._children ? 7 : -19)
			    	.attr("y","-6")
		   			.attr("width","13px")
	       			.attr("height", "13px")
			        .html(d=> {
			        	if (d.data.checked == true){
			        		d.checked = true;
			        		return '<input type="checkbox" class="input-check-tree" style="height:13px; width:13px; margin:0px; position:absolute;" seq="'+d.data.SEQ+'" value="'+d.data.ID+'" checked disabled>';
			        	}
			        	else{
			        		d.checked = false;
			        		return '<input type="checkbox" class="input-check-tree" style="height:13px; width:13px; margin:0px; position:absolute;" seq="'+d.data.SEQ+'" value="'+d.data.ID+'" disabled>';
			        	}
			        });
	
			    
			    // Transition nodes to their new position.
			    const nodeUpdate = node.merge(nodeEnter).transition(transition)
			        .attr("transform", d => 'translate('+d.y+','+d.x+')')
			        .attr("fill-opacity", 1)
			        .attr("stroke-opacity", 1);
	
			 // Transition exiting nodes to the parent's new position.
			    const nodeExit = node.exit().transition(transition).remove()
			        .attr("transform", d => 'translate('+source.y+','+source.x+')')
			        .attr("fill-opacity", 0)
			        .attr("stroke-opacity", 0);
	
			    
			    // Update the links…
			    const link = gLink.selectAll("path")
			      .data(links, d => d.target.id);
	
			    // Enter any new links at the parent's previous position.
			    const linkEnter = link.enter().append("path")
			        .attr("d", d => {
			          const o = {x: source.x0, y: source.y0};
			          return diagonal({source: o, target: o});
			        });
	
			    // Transition links to their new position.
			    link.merge(linkEnter).transition(transition)
			        .attr("d", diagonal);
	
			    // Transition exiting nodes to the parent's new position.
			    link.exit().transition(transition).remove()
			        .attr("d", d => {
			          const o = {x: source.x, y: source.y};
			          return diagonal({source: o, target: o});
			        });
	
			    // Stash the old positions for transition.
			    root.eachBefore(d => {
			      d.x0 = d.x;
			      d.y0 = d.y;
			    });
			    
			  }
		  
		  update(root);
	}

	  
}

function setCohortQueryStr(){
	var filterArray = [];
	
	if($('.filter-box').length != 0){
		$('.filter-box').each(function(key,value){
			var $this = $(this);
			var itemId = this.getAttribute('name');
			var cate = this.getAttribute('cate');
			var $subCate = $('#'+getItemCateId(cate));
			var seq = this.id.replace('filter_','');
			var baseTable = this.getAttribute('table');
			var tmpArray = [];
			var tmpMap = {};
			
			var rowData = $subCate.jqxGrid('getrowdatabyid',seq);
			var type = rowData.CHART_TYPE;
			var itemCol = '';
			if(!isNullOrEmpty(rowData.ITEM_LABEL)){
				itemCol = rowData.ITEM_COLUMN.split('|');
			}
			
			if(type == 'PIE'){
				$.each($(this).children('.btn-group'),function(){
					tmpArray.push(this.id); 	
				});
			}
			else if(type == 'BAR'){
				$.each($(this).children('input[type="hidden"]'),function(){
					tmpArray.push(this.value);
				});
			}
			else if(type == 'GRD'){
				$.each($(this).children('.btn-group'),function(){
					tmpArray.push(this.id); 	
				});
			}
			else if(type == 'GAO'){
				$.each($(this).children('.and-group'),function(){
					var tmpArr2 = [];
					var $this2 = $(this);
					$.each($(this).children('.btn-group'),function(){
						var tmpSet = {};
						//tmpSet["ID"] = this.id;
						$.each($(this).children('input[type="hidden"]'),function(){
							tmpSet[this.name] = this.value;
						})
						tmpArr2.push(tmpSet);
					});
					
					tmpArray.push(tmpArr2);
				});
			}
			
			tmpMap.CONDITION = tmpArray;
			tmpMap.ITEM_ID = itemId;
			tmpMap.BASE_TABLE = baseTable;
			tmpMap.SEQ = seq;
			tmpMap.EXEC_SQL = rowData.EXEC_SQL;
			tmpMap.ITEM_CATE_ID = cate;
			filterArray.push(tmpMap);
		});
	}
	var dataSet = {};
	//console.log(filterArray);
	filterApplyResult = filterArray;
	dataSet.FILTER = filterArray;
	dataSet.COHORTSET = cohortQuery;
	dataSet.PER_CODE = $.session.get("PER_CODE");
	dataSet.CREATEDTABLE = "P"+$.session.get("PER_CODE");

	var promise = http('dashboard/filterApply', 'post', false, dataSet);
	promise.then(function(result){

		console.log(result);

		//var selectedArr = [];
		//selectedArr = getSelectedChartList();
		var dataView = result.filterApply;
		//var resultKeys = Object.keys(dataView);
		//var resultVals = Object.values(dataView);

		cohortFilterQuery = dataView.all;
		cohortFilterAllQuery = dataView.sbQueryAll;
		cohortFilterSpcnQuery = dataView.sbQuerySpcn;
		cohortFilterAllGroupByQuery = dataView.sbQueryAllGroupBy;
		cohortFilterSpcnQueryWithout = dataView.sbQuerySpcnWithout;
		
	});
}

function jqxPatiendataCellClick(value){
	$('#hiddenCohortPatno').val(value);
	$('#hiddenCohortQuery').val(cohortFilterQuery);
	$('#hiddenCohortSpcnQuery').val(cohortFilterSpcnQuery);
	$('#hiddenCohortSpcnQueryWithout').val(cohortFilterSpcnQueryWithout);
	$('#frmCohortAnalysis').attr('target', "_blank");
	$('#frmCohortAnalysis').attr('action',gvCONTEXT + '/patient/patientView');
	$('#frmCohortAnalysis').method = 'POST';
	$('#frmCohortAnalysis').submit();
}

function getPatientCount(){
	gvSpinnerOpen();
	var dataSet = {};
	dataSet.CohortTableQuery = cohortFilterQuery;
	var promise = http('cohort/selCohortFilteringTable', 'post', true , dataSet);
	promise.then(function(result){
		gvSpinnerClose();
		
		//console.log(result.selCohortFilteringTable);
		patientCount = result.selCohortFilteringTable.length;
		
		//patientOld = patientNew;
		patientNew = patientCount;
		$('#labelPatientCount').text('');
		$('#labelPatientCount').text(numberWithCommas(result.selCohortFilteringTable.length) + " patient(s) / ");
	});
	promise.fail(function(e){
		console.log(e)
		gvSpinnerClose();
	})
}

function getSPCNCount(){
	var dataSet = {};
	dataSet.CohortTableQuery = cohortFilterSpcnQuery;
	var promise = http('cohort/selCohortFilteringTable', 'post',  false , dataSet);
	promise.then(function(result){
		gvSpinnerClose();
		
		//console.log(result.selCohortFilteringTable);
		spcnCount = result.selCohortFilteringTable.length;
		
		//patientOld = patientNew;
		spcnNew = spcnCount;
		$('#labelSPCNCount').text('');
		$('#labelSPCNCount').text(numberWithCommas(result.selCohortFilteringTable.length) + " sample(s)");
	});
	promise.fail(function(e){
		console.log(e)
		gvSpinnerClose();
	})
}

function analysisInitEvent(){
	$(document).on('click','.btnDeletePatient',function(){
		var tmpthis = $(this);
		var rowid = $(this).attr("row");
		var dataSet = {};
		dataSet.DELETE_YN = "Y";
		dataSet.RESCH_PAT_ID = $(this).attr("seq");
		dataSet.RESCH_SPCN_ID = $(this).attr("spcn");
		dataSet.PER_CODE = $.session.get("PER_CODE");
		showConfirm('삭제',"계정를 삭제 하시겠습니까?", function(result){
			if(!result){
				return;
			}
			var promise = http('cohort/updateCohortPatientList','post',false, dataSet);
			promise.then(function (result2) {	
//				console.log(result2)
				//table.draw();
				$("#jqxCohortAnalysisData").jqxGrid('source')._source.localdata[rowid].DELETE_YN = "Y";
				$("#jqxCohortAnalysisData").jqxGrid('updatebounddata','cells');
				getPatientCount();
				getSPCNCount();
			});
		});
		
	});
	
	$(document).on('click','.btnRecoverPatient',function(){
		var tmpthis = $(this);
		var rowid = $(this).attr("row");
		var dataSet = {};
		dataSet.DELETE_YN = "N";
		dataSet.RESCH_PAT_ID = $(this).attr("seq");
		dataSet.RESCH_SPCN_ID = $(this).attr("spcn");
		dataSet.PER_CODE = $.session.get("PER_CODE");
		showConfirm('복구',"환자를 복구 하시겠습니까?", function(result){
			if(!result){
				return;
			}
			var promise = http('cohort/updateCohortPatientList','post',false, dataSet);
			promise.then(function (result2) {	
				$("#jqxCohortAnalysisData").jqxGrid('source')._source.localdata[rowid].DELETE_YN = "N";
				$("#jqxCohortAnalysisData").jqxGrid('updatebounddata','cells');
				getPatientCount();
				getSPCNCount();
			});
		});
	});
	
	$('#deletePatientList').on('click',function(){
		var selectedcells = $("#jqxCohortAnalysisData").jqxGrid('getselectedcells');
		var selectedrowindexes = [];
		for(var i=0; i<selectedcells.length; i++){
			selectedrowindexes.push(selectedcells[i].rowindex);
		}
		selectedrowindexes = Array.from(new Set(selectedrowindexes));
		var rowscount = $("#jqxCohortAnalysisData").jqxGrid('getdatainformation').rowscount;
         showConfirm('삭제',"계정를 삭제 하시겠습니까?", function(result){
 			if(!result){
 				return;
 			}
 			for(var i=0; i<selectedrowindexes.length; i++){
 	        	 var selectedrowindex = selectedrowindexes[i];
 	        	 var rowdata = $("#jqxCohortAnalysisData").jqxGrid('getrowdata',selectedrowindex);
 	        	 
 	        	 if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
 	                 /*var id = $("#jqxCohortAnalysisData").jqxGrid('getrowid', selectedrowindex);
 	                 var commit = $("#jqxCohortAnalysisData").jqxGrid('deleterow', id);*/
 	        		var dataSet = {};
 	        		dataSet.DELETE_YN = "Y";
 	        		dataSet.RESCH_PAT_ID = rowdata.RESCH_PAT_ID;
 	        		dataSet.RESCH_SPCN_ID = rowdata.RESCH_SPCN_ID;
 	        		dataSet.PER_CODE = $.session.get("PER_CODE");
 	        		var promise = http('cohort/updateCohortPatientList','post',false, dataSet);
 	    			promise.then(function (result2) {	
// 	    				console.log(result2)
 	    				//table.draw();
 	    				$("#jqxCohortAnalysisData").jqxGrid('source')._source.localdata[selectedrowindex].DELETE_YN = "Y";
 	    				$("#jqxCohortAnalysisData").jqxGrid('updatebounddata','cells');
 	    			});
 	             }
 	         }
 			getPatientCount();
 			getSPCNCount();
 			
 		});
         
         
	});
	
	$(document).on('click','.SavedCohortModal',function(){
		var idx = $(this).attr("num");
		var cohortSet = savedMyCohort[idx];
		
		$('#popSelectedCohortModal').modal('show');
		$('#divSelectedCohort').empty();
		
		var html = '';
		html += '<dl class="dl-horizontal">';
		html += '<dt> Cancer Information</dt>';
		html += '<dd>'+cohortSet.CANCERTYPE+'</dd>';
		html += '<dt> Cohort Name</dt>';
		html += '<dd>'+cohortSet.CONT_NM+'</dd>';
		html += '<dt> Cohort Description</dt>';
		html += '<dd>'+cohortSet.CONT_DESC+'</dd>';
		html += '<dt> Date</dt>';
		html += '<dd>'+cohortSet.CRT_DT+'</dd>';
		html += '</dl>';
		
		$('#divSelectedCohort').html(html);
		
	})
	
	$(document).on('click','#btnSelectedCohortModal',function(){
		console.log(selectedCohort);
		$('#popSelectedCohortModal').modal('show');
		//$('#popSelectedCohortModal').show();
		initTreeC(selectedCohort);
	});
	
	$('.cohortAnalysisViewTab').on('shown.bs.tab',function(e){
		console.log(e);
		currentCohortTab = $(this).attr("pageNum");
		
		if(currentCohortTab == '1'){
			$('#deletePatientList').hide();
			$('#mainChartAdd').show();
			/*$('#btnPatientView').show();
			$('#btnMutationView').show();*/
			
			if(patientNew !== patientOld || spcnOld !== spcnNew){
				$('.sortable_area').empty();
				
				for(var i=0; i<$('.sortable_area').length; i++){
					$('.sortable_area').eq(i).attr('weight',"0");
				}
				checkDefaultChart();
				
				var dataSet = {};
				dataSet.FILTER = filterApplyResult;
				dataSet.PER_CODE = $.session.get("PER_CODE");
				dataSet.CREATEDTABLE = "P"+$.session.get("PER_CODE");

				var promise = http('dashboard/filterApply', 'post', true, dataSet);
				promise.then(function(result){

					console.log(result);

					var selectedArr = [];
					selectedArr = getSelectedChartList();
					var dataView = result.filterApply;
					var resultKeys = Object.keys(dataView);
					var resultVals = Object.values(dataView);

					cohortFilterQuery = dataView.all;
					cohortFilterAllQuery = dataView.sbQueryAll;
					cohortFilterSpcnQuery = dataView.sbQuerySpcn;
					cohortFilterAllGroupByQuery = dataView.sbQueryAllGroupBy;
					for(var i=0; i<selectedArr.length; i++){
						
						var row = selectedArr[i];
						var idx = resultKeys.indexOf(row.SEQ.toString());
						if( idx != -1 ){
							if(isNullOrEmpty(resultVals[idx])) continue;
							getSelectedChartDefault(row, resultVals[idx], filterApplyResult);
						}
						else{
							if(row.ITEM_CATE_ID == 'CLINICAL' || row.ITEM_CATE_ID == 'ETC' ){
								getSelectedChartDefault(row, dataView.all, filterApplyResult);
							}
							else if(row.ITEM_CATE_ID == 'GENOMIC'){
								getSelectedChartDefault(row, dataView.sbQuerySpcn, filterApplyResult);
							}
						}
					}
					//$('#filterApplyBefore').css('display','none');
					//$('#filterApplyAfter').css('display','inline-block');
					filterApplyYN = true;
					patientOld = patientNew;
					spcnOld = spcnNew;
				});
			}
			else{
				
				for(var i=0; i<chartDataList.length; i++){
					var tmpMap = chartDataList[i];
					var seq = tmpMap.SEQ;
					if($('#boxChart'+seq).length != 0){
						if(tmpMap.CHART_TYPE == 'PIE'){
							var data;
							if(isNullOrEmpty($('#boxChart'+seq)[0].data)){
								data = setPieChartdataform(tmpMap.resultData);
							}
							else{
								data = $('#boxChart'+seq)[0].data;
							}
							Plotly.react('boxChart'+seq, data ,pieLayout,config);
							d3LineTextRemove('boxChart'+seq);
						}
						else if(tmpMap.CHART_TYPE == 'BAR'){
							var data;
							if(isNullOrEmpty($('#boxChart'+seq)[0].data)){
								data = setPieChartdataform(tmpMap.resultData);
							}
							else{
								data = $('#boxChart'+seq)[0].data;
							}
							Plotly.react('boxChart'+seq, data ,barLayout,config);
						}
					}
					
				}
			}
			
	
			
		}
		else if(currentCohortTab == '2'){
			$('#deletePatientList').show();
			$('#mainChartAdd').hide();
			if(patientNew !== patientOld || spcnOld !== spcnNew){
				setCohortAnalysisData(cohortFilterAllQuery);
				patientOld = patientNew;
				spcnOld = spcnNew;
			}

			
		}
      });
	$('.cohortAnalysisViewTab').on('shown.bs.tab',function(e){
		
	});
	
	
	
	$('#btnPatientView').on('click',function(){

		if(patientCount == 0){
			showAlert("알림","검색된 환자가 없습니다.",null);
			return;
		}
		
		$('#hiddenCohortPatientCount').val(patientCount);
		$('#hiddenCohortSpcnCount').val(spcnCount);
		$('#hiddenCohortPatno').val('null');
		//$('#hiddenCohortQuery').val(cohortFilterQuery);
		$('#hiddenCohortQuery').val(cohortFilterQuery);
		$('#hiddenCohortSpcnQuery').val(cohortFilterSpcnQuery);
		$('#hiddenCohortSpcnQueryWithout').val(cohortFilterSpcnQueryWithout);
		$('#frmCohortAnalysis').attr('target', "_blank");
		$('#frmCohortAnalysis').attr('action',gvCONTEXT + '/patient/patientView');
		$('#frmCohortAnalysis').method = 'POST';
		$('#frmCohortAnalysis').submit();

		
	});
	
	$('#btnMutationView').on('click',function(){
		if(patientCount == 0){
			showAlert("알림","검색된 환자가 없습니다.",null);
			return;
		}
		gvSpinnerOpen();
		if(dashboardTabNo == "1" || dashboardTabNo == "2"){
			$('#hiddenCohortPatno').val('null');
			$('#hiddenCohortMyCohort').val('null');

			$('#hiddenCohortPatientCount').val(patientCount);
			$('#hiddenCohortSpcnCount').val(spcnCount);
			
			$('#hiddenCohortQuery').val(cohortFilterQuery);
			$('#hiddenCohortSpcnQuery').val(cohortFilterSpcnQuery);
			$('#hiddenCohortSpcnQueryWithout').val(cohortFilterSpcnQueryWithout);
			$('#hiddenCohortTreeModal').val($('#divSelectedCohort').html());
			
			$('#frmCohortAnalysis').attr('target', "_blank");
			$('#frmCohortAnalysis').attr('action',gvCONTEXT + '/mutation/mutationList');
			$('#frmCohortAnalysis').method = 'POST';
			$('#frmCohortAnalysis').submit();
		}
		else if(dashboardTabNo == "3"){
			$('#hiddenCohortPatientCount').val(patientCount);
			$('#hiddenCohortSpcnCount').val(spcnCount);
			
			$('#hiddenCohortPatno').val('null');
			$('#hiddenCohortQuery').val(cohortFilterQuery);
			$('#hiddenCohortSpcnQuery').val(cohortFilterSpcnQuery);
			$('#hiddenCohortSpcnQueryWithout').val(cohortFilterSpcnQueryWithout);
			$('#hiddenCohortTreeModal').val('null');

			var tmpStr = '';
			for(var i=0; i<savedMyCohort.length; i++){
				if(i!=0) tmpStr+="|";
				tmpStr += savedMyCohort[i].CONT_NM;	
			}
			$('#hiddenCohortMyCohort').val(tmpStr);
			
			
			$('#frmCohortAnalysis').attr('target', "_blank");
			$('#frmCohortAnalysis').attr('action',gvCONTEXT + '/mutation/mutationList');
			$('#frmCohortAnalysis').method = 'POST';
			$('#frmCohortAnalysis').submit();
		}
		
		
		
		gvSpinnerClose();
	});
	
	$('#filter-group').eq(0).on('DOMSubtreeModified', function(){
		//$('#filterApplyAfter').css('display','none');
		//$('#filterApplyBefore').css('display','inline-block');
		filterApplyYN = false;
		//console.log($('#filter-group').length)
		
		patientCount = '';
		spcnCount = '';
		ajaxLoadingChartClear();
		$('#labelPatientCount').empty();
		$('#labelSPCNCount').empty();
		//gvSpinnerOpen();
		
		//gvSpinnerClose();
		if(currentCohortTab == '1'){
			$('#btnDashboardFilterApply').trigger('click');

		}
		else if(currentCohortTab == '2'){
			setCohortQueryStr();
			setCohortAnalysisData(cohortFilterAllQuery);
	
		}
		
		
		
	});
	
	
	$('#btnDashboardFilterApply').on('click',function(){
		
		var filterArray = [];
		
		if($('.filter-box').length != 0){
			$('.filter-box').each(function(key,value){
				var $this = $(this);
				var itemId = this.getAttribute('name');
				var cate = this.getAttribute('cate');
				var $subCate = $('#'+getItemCateId(cate));
				var seq = this.id.replace('filter_','');
				var baseTable = this.getAttribute('table');
				var tmpArray = [];
				var tmpMap = {};
				
				var rowData = $subCate.jqxGrid('getrowdatabyid',seq);
				var type = rowData.CHART_TYPE;
				var itemCol = '';
				if(!isNullOrEmpty(rowData.ITEM_LABEL)){
					itemCol = rowData.ITEM_COLUMN.split('|');
				}
				
				if(type == 'PIE'){
					$.each($(this).children('.btn-group'),function(){
						tmpArray.push(this.id); 	
					});
				}
				else if(type == 'BAR'){
					$.each($(this).children('input[type="hidden"]'),function(){
						tmpArray.push(this.value);
					});
				}
				else if(type == 'GRD'){
					$.each($(this).children('.btn-group'),function(){
						tmpArray.push(this.id); 	
					});
				}
				else if(type == 'GAO'){
					$.each($(this).children('.and-group'),function(){
						var tmpArr2 = [];
						var $this2 = $(this);
						$.each($(this).children('.btn-group'),function(){
							var tmpSet = {};
							//tmpSet["ID"] = this.id;
							$.each($(this).children('input[type="hidden"]'),function(){
								tmpSet[this.name] = this.value;
							})
							tmpArr2.push(tmpSet);
						});
						
						tmpArray.push(tmpArr2);
					});
				}
				
				tmpMap.CONDITION = tmpArray;
				tmpMap.ITEM_ID = itemId;
				tmpMap.BASE_TABLE = baseTable;
				tmpMap.SEQ = seq;
				tmpMap.EXEC_SQL = rowData.EXEC_SQL;
				tmpMap.ITEM_CATE_ID = cate;
				filterArray.push(tmpMap);
			});
		}
		var dataSet = {};
		//console.log(filterArray);
		filterApplyResult = filterArray;
		dataSet.FILTER = filterArray;
		dataSet.COHORTSET = cohortQuery;
		dataSet.PER_CODE = $.session.get("PER_CODE");
		dataSet.CREATEDTABLE = "P"+$.session.get("PER_CODE");

		var promise = http('dashboard/filterApply', 'post', false, dataSet);
		promise.then(function(result){

			console.log(result);
			
			$('.no-data-display').remove();

			var selectedArr = [];
			selectedArr = getSelectedChartList();
			var dataView = result.filterApply;
			var resultKeys = Object.keys(dataView);
			var resultVals = Object.values(dataView);

			cohortFilterQuery = dataView.all;
			cohortFilterAllQuery = dataView.sbQueryAll;
			cohortFilterSpcnQuery = dataView.sbQuerySpcn;
			cohortFilterAllGroupByQuery = dataView.sbQueryAllGroupBy;
			cohortFilterSpcnQueryWithout = dataView.sbQuerySpcnWithout;
			
			getPatientCount();
			getSPCNCount();
			
			for(var i=0; i<selectedArr.length; i++){
				
				var row = selectedArr[i];
				var idx = resultKeys.indexOf(row.SEQ.toString());
				if( idx != -1 ){
					if(isNullOrEmpty(resultVals[idx])) continue;
					getSelectedChartFilter(row, resultVals[idx], filterArray);
				}
				else{
					if(row.ITEM_CATE_ID == 'CLINICAL' || row.ITEM_CATE_ID == 'ETC' ){
						getSelectedChartFilter(row, dataView.all, filterArray);

					}
					else if(row.ITEM_CATE_ID == 'GENOMIC'){
						getSelectedChartFilter(row, dataView.sbQuerySpcn, filterArray);
					}
				}
			}
			//$('#filterApplyBefore').css('display','none');
			//$('#filterApplyAfter').css('display','inline-block');
			filterApplyYN = true;
			
			
		});
		
	});
	
	
	$('#btnDashboardCohortClear').on('click',function(){
		$('#filter-group').empty();
		
	});
	
	$(document).on('change','input[name="itemCate_tree"]',function(){
		var dataSet = {};

		dataSet.CATE_MID_SEQ = $(this).val();
		console.log(dataSet);
		
		var promise = http('dashboard/selectCohortDetlList', 'post', true , dataSet);
		
		promise.then(function(result){
			//console.log(result);
			var html = '';
			var dataView = result.selectCohortDetlList;
			
			if(isNullOrEmpty(dataView)){
				$('#selDashboardCohortList').empty();
				$('#selDashboardCohortList').attr('disabled',true);

				html += '<option value="">';
				html += '없음';
				html += '</option>';
				$('#selDashboardCohortList').append(html);
				return;
			}
			else{
				$('#selDashboardCohortList').empty();
				$('#selDashboardCohortList').attr('disabled',false);

				for(var i=0; i<dataView.length; i++){
					var tmpMap = dataView[i];
					html += '<option value="'+tmpMap.CATE_DETL_SEQ+'">';
					html += tmpMap.CATE_DETL_NM;
					html += '</option>';
				}
				$('#selDashboardCohortList').append(html);

			}
		});
		
		
	});
	
	
	$('#btnDashboardCohortAdd').on('click',function(){
		/*if(filterApplyYN == false){
			showAlert('알림','필터 적용후, 저장 해주십시오.',null);
			return ;
		}
		
		if(isNullOrEmpty($('input[name="itemCate_tree"]:checked').val())){
			showAlert('알림','코호트를 선택해주십시오.',null);
			return ;
		}*/
		if(isNullOrEmpty($('#txtDashboardCohortNM').val())){
			showAlert('알림','코호트 명을 입력해주십시오.',null);
			return ;
		}
		
		if(dashboardTabNo == "1" || dashboardTabNo == "2"){
			var dataSet = {};
			//dataSet.SEQ = $('input[name="itemCate_tree"]:checked').attr('seq');
			//dataSet.MID_SEQ = $('input[name="itemCate_tree"]:checked').val();
			//dataSet.CATE_DETL_SEQ = $('#selDashboardCohortList').val();
			
			dataSet.CONT_NM = $('#txtDashboardCohortNM').val();
			dataSet.CONT_DESC = $('#txtDashboardCohortSub').val();
			dataSet.CANCERTYPE = setArrayCancerType(selectedCohort);
			dataSet.PER_CODE = $.session.get('PER_CODE');
			dataSet.UDT_ID = $.session.get('PER_CODE');
			dataSet.CRT_ID = $.session.get('PER_CODE');
			dataSet.SHARE_CD = "CO";
			dataSet.TABNO = dashboardTabNo;
			dataSet.TABLENAME = cohortFilterAllQuery;
			dataSet.PATCOUNT = patientCount;
			dataSet.SPCNCOUNT = spcnCount;
			
			var selectedArr = getSelectedChartList();
			dataSet.SELECTED_CHART = selectedArr;
			
			var filterArr = getFilterBoxGroup();
			dataSet.FILTER = filterArr;
			
			console.log(dataSet);
			var promise = http('/dashboard/insertCohortItemCont', 'post' ,true, dataSet);
			promise.then(function(result){
				showAlert('알림','저장 되었습니다.',null);
				
				console.log(result);
				$('#mainSaveAdd').trigger('click');

			});
			promise.fail(function(e){
				console.log(e)
			})
		}
		else if (dashboardTabNo == "3"){
			var dataSet = {};
			//dataSet.SEQ = $('input[name="itemCate_tree"]:checked').attr('seq');
			//dataSet.MID_SEQ = $('input[name="itemCate_tree"]:checked').val();
			//dataSet.CATE_DETL_SEQ = $('#selDashboardCohortList').val();
			
			dataSet.CONT_NM = $('#txtDashboardCohortNM').val();
			dataSet.CONT_DESC = $('#txtDashboardCohortSub').val();
			dataSet.CANCERTYPE = setArraySavedCancerType(savedMyCohort);
			dataSet.PER_CODE = $.session.get('PER_CODE');
			dataSet.UDT_ID = $.session.get('PER_CODE');
			dataSet.CRT_ID = $.session.get('PER_CODE');
			dataSet.SHARE_CD = "CO";
			dataSet.TABNO = dashboardTabNo;
			dataSet.TABLENAME = cohortFilterAllQuery;
			dataSet.PATCOUNT = patientCount;
			dataSet.SPCNCOUNT = spcnCount;
			
			var selectedArr = getSelectedChartList();
			dataSet.SELECTED_CHART = selectedArr;
			
			var filterArr = getFilterBoxGroup();
			dataSet.FILTER = filterArr;
			
			console.log(dataSet);
			var promise = http('/dashboard/insertCohortItemCont', 'post' ,true, dataSet);
			promise.then(function(result){
				showAlert('알림','저장 되었습니다.',null);
				
				console.log(result);
				$('#mainSaveAdd').trigger('click');

			});
			promise.fail(function(e){
				console.log(e)
			})
			
		}
		
	});
	
	$('#btnMainAddChartClose').on('click',function(){
		$('#divmainChartAdd').css('z-index',-1);
	})

	$(document).on('click','.delete',function(){
		gvSpinnerOpen();
		var grid = $(this).attr('grid');
		var id = $(this).attr('name');
		var chart = $(this).attr('table');
		
		if($("#"+grid+'_jqx').jqxGrid('getstate')==undefined){
			if($(this).parent().parent().children('div').length <= 1){
				$(this).parent().parent().remove();
			}
			else{
				$(this).parent().remove();
			}
		}
		else{
			var graphNM = grid+'_jqx';
			var idx = $("#"+graphNM).jqxGrid('getrowboundindexbyid',id);
			$("#"+graphNM).jqxGrid('unselectrow', idx);
			$("#"+graphNM).jqxGrid('setcellvaluebyid', id, "CHK", false);

		}
		//$('#btnDashboardFilterApply').trigger('click');
		
		gvSpinnerClose();
		
	});
	
	$(document).on('click','.box-delete',function(){
		
		var gridId = $(this).parents('li').attr('num');
		var cate = $(this).parents('li').attr('cate');
		var $subCate = $('#'+getItemCateId(cate));
		
		var gridIdx = $subCate.jqxGrid('getrowboundindexbyid',gridId);
		
		$subCate.jqxGrid('getrowdatabyid',gridId).DEFAULT_YN=false
		$subCate.jqxGrid('updaterow', gridId, $subCate.jqxGrid('getrowdatabyid',gridId));
		//$subCate.jqxGrid('refreshdata');
		//$subCate.jqxGrid('setcellvaluebyid',gridId,'DEFAULT_YN',false);

		
	});
	
	$('#mainChartAdd,#mainSaveAdd').click(function(){
		
		
		var $this = $(this);
		var $divthis = $('#div'+$this[0].id);
		
	    if ($this.is('.disabled, :disabled')) return

	    var $parent  = getParent($this)
	    var isActive = $parent.hasClass('open')
	    var isZindex = $divthis.css('z-index');
	    
	    if (isZindex == "-1" ) {
	    	 
	     /* var relatedTarget = { relatedTarget: this }
	      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))
	
	      if (e.isDefaultPrevented()) return
	
	      
	
	      $parent
	        .toggleClass('open')
	        .trigger($.Event('shown.bs.dropdown', relatedTarget))*/
	    	$this
	        .trigger('focus')
	        .attr('aria-expanded', 'true')
	        
	        $divthis.css('z-index',1000);
	    	
	        if('mainChartAdd' == $this[0].id && $('#mainSaveAdd').attr('aria-expanded') == 'true'){
				$('#mainSaveAdd').attr('aria-expanded','false');
				$('#divmainSaveAdd').css('z-index',-1);
				
				/*var $parent2  = getParent($('#mainSaveAdd'));
				$parent2.removeClass('open');*/
			}
			else if('mainSaveAdd' ==  $this[0].id && $('#mainChartAdd').attr('aria-expanded') == 'true'){
				$('#mainChartAdd').attr('aria-expanded','false');
				$('#divmainChartAdd').css('z-index',-1);
				/*var $parent2  = getParent($('#mainChartAdd'));
				$parent2.removeClass('open');*/
			}
	    }
	    else{
	    	$this.attr('aria-expanded', 'false')
	    	$divthis.css('z-index',-1);
	    	/* $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))*/
	    }
		
	});
/*	  $(".connectedSortable").sortable({
		    placeholder: "sort-highlight",
		    connectWith: ".connectedSortable",
		    handle: ".box-header, .nav-tabs",
		    forcePlaceholderSize: true,
		    zIndex: 999999
		  });
		  $(".connectedSortable .box-header, .connectedSortable .nav-tabs-custom").css("cursor", "move");*/
	$("#item_1,#item_2,#item_3,#item_4").sortable({
        opacity: 0.5,
        cursor: "move",
        connectWith: "#item_1,#item_2,#item_3,#item_4",
        placeholder: "highlight",
        zIndex: 999999,
        distance: 20,
        dropOnEmpty: true,
        sort:true,
        tolerance : "intersect",
        helper:  "clone",
        forcePlaceholderSize: true,
        start: function (event, ui) {
        		//ui.item.toggleClass("");
        		var $this = $(this);
        		if(ui.item.hasClass('pie')){
        			ui.placeholder.addClass('pie');
        			ui.placeholder.html('<div style="display:inherit"></div>');
        		}
        		else if(ui.item.hasClass('bar')){
        			ui.placeholder.addClass('bar');
        		}
        		else{
        			
        		}
        		
        },
        stop: function (event, ui) {
                //ui.item.toggleClass("");
                
        },
        cancel: "#graphTest,#graphTest1,#graphTest2,#graphTest3,#graphTest4,#graphTest5"
    });

	$("#item_1,#item_2,#item_3,#item_4").disableSelection();
	 
	$(document).on('mouseenter','.list',function(){
			/*$("#btnShowTable").css("display","inline-block");
			$("#btnShowPie").css("display","inline-block");*/
			var num = $(this).attr('num');
			var idx = $(this).attr('idx');
			/*$("#btnDropdownMenu_"+num).css("display","inline-block");*/
			$(this).children().children().children('.btn-drop-menu').css("display","inline-block");
			//$(this).children().children().children('.btn-or-select').css("display","inline-block");
	});
	$(document).on('mouseleave','.list',function(){
			var num = $(this).attr('num');
			var idx = $(this).attr('idx');
			$(this).children().children().children('.btn-drop-menu').css("display","none");
/*			$("#btnShowTable").css("display","none");
			$("#btnShowPie").css("display","none");*/
			//$(this).children().children().children('.btn-or-select').css("display","none");
	});	
	
	$(document).on('click','.btn-or-select',function(){
		var seq = $(this).parents('li').attr('num');
		var cate = $(this).parents('li').attr('cate');
		var $subCate = $('#'+getItemCateId(cate));
		
		var graphNM = 'boxChart'+seq;
		var divId = 'boxChart'+seq;
		var item = $subCate.jqxGrid('getrowdatabyid',seq);
		
		var totalRows = $('#'+graphNM+'_jqx').jqxGrid('getrows');
		
		var rowLen = $('#'+graphNM+'_jqx').jqxGrid('getrows').length;
		var itemLabel = item.ITEM_LABEL.split(',');
		var itemCol = item.ITEM_COLUMN.split('|');
		var name = item.ITEM_NM;;
		
		var selectedGAOArr = [];
		var selectedRowArr = [];
		
		for(var i=0; i<rowLen; i++){
			if(totalRows[i].CHK){
				selectedGAOArr.push(totalRows[i]);
				selectedRowArr.push($('#'+graphNM+'_jqx').jqxGrid('getrowboundindex',i));
			}
		}
		
		for(var i=0; i<selectedRowArr.length; i++){
			$('#'+graphNM+'_jqx').jqxGrid('selectrow',selectedRowArr[i]);
			
		}
		console.log(selectedGAOArr);
		if(selectedGAOArr.length == 0){
			return;
		}
		
		if($('#filter_'+seq).length == 0){
			var htmlf = '';
			htmlf += '<div class="filter-box" id="filter_'+seq+'" cate="'+item.ITEM_CATE_ID+'" name="'+item.ITEM_ID+'"  table="'+item.BASE_DT_TABLE+'">';
			htmlf += 	'<span>';
			htmlf += 		name + ' : ';
			htmlf += 	'</span>';
			//htmlf += '</div>';
			//$('#filter-group').append(htmlf);
			
			
			var html = '';
			
			for(var i=0; i<selectedGAOArr.length; i++){
				//var html2 = '';
				var rowData = selectedGAOArr[i];
				var rowDataIdCol = rowData.CKEY.split('|');
				
				if($('button[name="'+seq+'_'+rowData.uid+'"]').length != 0) continue ;
				
				if(!isNullOrEmpty(html)) html += '<label>or</label>';
				
				html += 	'<div class="btn-group or-group" id="'+rowData.uid+'">';
				for(var j=0; j<itemCol.length; j++){
					html +=			'<input type="hidden" name="'+itemCol[j]+'" value='+ rowDataIdCol[j] +'>';	
				}
				html += 		'<button type="button" class="btn bg-blue btn-flat btn-xs" name="'+seq+'_'+rowData.uid+'">';
				html +=  			rowData.CKEY;
				html += 		'</button>';
				html +=			'<button type="button" class="btn bg-blue btn-flat btn-xs delete" name="'+rowData.uid+'" grid="'+divId+'">';
				html += 		'<i class="fa fa-times"></i>';
				html += 		'</button>';
				html += 	'</div>';
				
				//$('#'+seq+'_and_'+'1 > .and-group-label').append(html2);
			}
			
			var htmlsub = '';
			htmlsub += 	'<div class="and-group" seq="'+seq+'">';
			htmlsub +=  '<label class="and-group-label">(</label>';
			
			htmlsub += html;
			
			htmlsub +=  '<label>)</label>';
			htmlsub += 	'</div>'
				
			htmlf += htmlsub;
			htmlf += '</div>';
			//$('#filter_'+seq).append(htmlsub);
				$('#filter-group').append(htmlf);
			
			
		}
		else{
			var html = '';
			
			//var andLen = $('.btn-group.and-group').length;
			
			for(var i=0; i<selectedGAOArr.length; i++){
				//var html2 = '';
				var rowData = selectedGAOArr[i];
				var rowDataIdCol = rowData.CKEY.split('|');
				if($('button[name="'+seq+'_'+rowData.uid+'"]').length != 0) continue ;
				
				if(!isNullOrEmpty(html)) html += '<label>or</label>';
				
				html += 	'<div class="btn-group or-group" id="'+rowData.uid+'">';
				for(var j=0; j<itemCol.length; j++){
					html +=			'<input type="hidden" name="'+itemCol[j]+'" value='+ rowDataIdCol[j] +'>';	
				}
				html += 		'<button type="button" class="btn bg-blue btn-flat btn-xs" name="'+seq+'_'+rowData.uid+'">';
				html +=  			rowData.CKEY;
				html += 		'</button>';
				html +=			'<button type="button" class="btn bg-blue btn-flat btn-xs delete" name="'+rowData.uid+'" grid="'+divId+'">';
				html += 		'<i class="fa fa-times"></i>';
				html += 		'</button>';
				html += 	'</div>';
				
				//$('#'+seq+'_and_'+(andLen+1)+' > .and-group-label').append(html2);
			}
			
			var htmlsub = '';
			htmlsub +=  '<label>and</label>';
			htmlsub += 	'<div class="and-group" seq="'+seq+'">';
			htmlsub +=  '<label class="and-group-label">(</label>';
			
			htmlsub += html;
			
			htmlsub +=  '<label>)</label>';
			htmlsub += 	'</div>'
				
			if(!isNullOrEmpty(html)){
				$('#filter_'+seq).append(htmlsub);
			}
			
			
		}
	
		//$('#btnDashboardFilterApply').trigger('click');

	});
	
	$(document).on('click','#btnShowTable',function(){
		var graphNM = "boxChart" + $(this).parents('li').attr('num');
		var graphkind = $(this).parents('li').attr('graph');
		var graph = eval(graphNM);
		
		$("#"+graphNM).css("display","none");
		$("#"+graphNM+"_jqx").css("display","block");
		$(this).parents('li').removeClass('pie');
		$("#"+graphNM+"_jqx").jqxGrid('render');
		

		var dropli = "dropdownli_" + $(this).parents('li').attr('num');
		$("#"+dropli).html('');
		
		var html2 = "";
		html2 += '<li id="btnShowPie"><a href="#">Show Pie</a></li>';
		$("#"+dropli).html(html2);
		
	});
	
	$(document).on('click','#btnShowPie',function(){
		var graphNM = "boxChart" + $(this).parents('li').attr('num');
		var graph = eval(graphNM);
		
		$("#"+graphNM).css("display","block");
		$("#"+graphNM+"_jqx").css("display","none");
		$(this).parents('li').addClass('pie');
		
		Plotly.relayout(graphNM,{});
		d3LineTextRemove(graphNM);
		var dropli = "dropdownli_" + $(this).parents('li').attr('num');
		$("#"+dropli).html('');
		
		var html2 = "";
		html2 += '<li id="btnShowTable"><a href="#">Show Table</a></li>';
		$("#"+dropli).html(html2);
	});
}