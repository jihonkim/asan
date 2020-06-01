var config = {
		scrollZoom: true, // lets us scroll to zoom in and out - works
		showLink: false, // removes the link to edit on plotly - works
		modeBarButtonsToRemove: [ 'sendDataToCloud', 'autoScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian'], 
		//modeBarButtonsToAdd: ['lasso2d'],
		//modeBarButton : ['scrollZoom'],
		displaylogo: false, // this one also seems to not work
		responsive: true
		//displayModeBar: true //this one does work
};
var pieLayout = {
		autosize: true,
		  dragmode : 'select',
		  /*title : {
			  text : itemNM
		  },*/
		  showlegend: false,
		  margin: {
			    l: 10,
			    r: 10,
			    b: 10,
			    t: 10,
		  }
}
var barLayout = {
		autosize: true,
		  dragmode : 'select',
		  selectdirection : "h",
		  showlegend: false,
		  margin: {
			  	l: 40,
			    r: 0,
			    b: 20,
			    t: 0,
		  }
}



var makeChart = function(chartId, chartData, prChartType, measure, dimension, cDate){
	
	/*if(chartData == ""){
		chartData = [
		             {date : '2017-03-23', A : 200, B : 100, C: 50, D: 150}, 
		             {date : '2017-03-24', A : 150, B : 220, C: 200, D: 100}, 
		             {date : '2017-03-25', A : 350, B : 120, C: 100, D: 20},
		             {date : '2017-03-26', A : 50, B : 20, C: 20, D: 30},
		             {date : '2017-03-27', A : 250, B : 220, C: 80, D: 50},
		             {date : '2017-03-28', A : 10, B : 50, C: 70, D: 70},
		             {date : '2017-03-29', A : 100, B : 80, C: 150, D: 120},
		             {date : '2017-03-30', A : 20, B : 220, C: 30, D: 80},
		             {date : '2017-03-31', A : 80, B : 180, C: 100, D: 220}
		             ];
		//var keyData = ["A", "B", "C", "D"];
		var axisOption = { x: { type: 'timeseries', tick: { format: '%Y-%m-%d' } } };	//차트 axis option
	}*/
	var axisOption = "";
	//날짜 형식 체크
	if(cDate == true){			//날짜 형식 일 경우
		axisOption = { x: { type: 'timeseries', tick: { format: '%Y-%m-%d' } } };
	}else{							//날짜 형식 아닐 경우
		axisOption = {x: {type: 'category'}};
	}
	
	//c3 스크립트
	chart = c3.generate({
	    bindto: chartId,
	    padding: {
	        right: '4'
	    },
	    data: {
	    	x : 'x',
	    	json: chartData,
			keys: {
				x: dimension, // it's possible to specify 'x' when category axis
				value: measure,
			},
			type: prChartType
	    },
	    axis: axisOption
	});
}

function setOverayBox(){
	var html = '';
	html += '<div class="overlay">';
	html += '  <i class="fa fa-refresh fa-spin"></i>';
	html += '</div>';
	
	return html;
	
}

function makePieEvent(data, name, x, y, chartId){
	
}
function makeBarEvent(data, name, x, y, chartId){
	if(data == undefined || data.points.length == 0) return;

	var barPlot2 = $('#'+chartId)[0];
	var name = barPlot2.getAttribute('name');
	
	if($('#filter_'+name).length > 0){
		$('#filter_'+name).remove();
	}
	
	var html = '';
	html += '<div class="filter-box" id="filter_'+name+'">';
	html += 	'<span>';
	html += 		name + ' : ';
	html += 	'</span>';
	html += 	'<div class="btn-group">';
	html += 		'<button type="button" class="btn bg-navy btn-flat" name="">';
	html +=  			data.range.x[0].toFixed(2)+ ' &le; x &le; ' + data.range.x[1].toFixed(2);
	html += 		'</button>';
	html +=			'<button type="button" class="btn bg-navy btn-flat delete">';
	html += 		'<i class="fa fa-times"></i>';
	html += 		'</button>';
	html += 	'</div>';
	html += '</div>';
	
	$('#filter-group').append(html);
}
function makeScatterEvent(data, name, x, y, chartId){
	if(data == undefined || data.points.length == 0) return;

	var scatterPlot2 = $('#'+chartId)[0];
	var scatterLayout = scatterPlot2.layout;
	var name = scatterPlot2.getAttribute('name');
	
	var x;
	var y;
	
	if($('#filter_'+name).length > 0){
		$('#filter_'+name).remove();
	}
	
	var html = '';
	html += '<div class="filter-box" id="filter_'+name+'">';
	html += 	'<span>';
	html += 		name + ' : ';
	html += 	'</span>';
	html += 	'<div class="btn-group">';
	html += 		'<button type="button" class="btn bg-navy btn-flat" name="">';
	html +=  			data.range.x[0].toFixed(2)+ ' &le; ' +scatterLayout.yaxis.title +' &le; ' + data.range.x[1].toFixed(2);
	html +=  			' and '+ data.range.y[0].toFixed(2)+ ' &le; ' +scatterLayout.yaxis.title +' &le; ' + data.range.y[1].toFixed(2);
	html += 		'</button>';
	html +=			'<button type="button" class="btn bg-navy btn-flat delete">';
	html += 		'<i class="fa fa-times"></i>';
	html += 		'</button>';
	html += 	'</div>';
	html += '</div>';
	
	$('#filter-group').append(html);
}


function makeChartBox(data, title, kind, seq, idx, cate){
	var html = '';
	if(kind == 'PIE'){
		html += '<li class="list pie" id="box_item_'+seq+'" num='+seq+' idx='+idx+' graph="'+kind+'" cate="'+cate+'" weight="1">';
	}
	else if(kind == 'BAR'){
		html += '<li class="list bar" id="box_item_'+seq+'" num='+seq+' idx='+idx+' graph="'+kind+'" cate="'+cate+'"  weight="2">';
	}
	else{
		html += '<li class="list" id="box_item_'+seq+'" num='+seq+' idx='+idx+' graph="'+kind+'" cate="'+cate+'"  weight="4">';
	}
	html += 	'<div class="box" >';
	html += 		'<div class="box-header">';
	html += 			'<div class="box-title"><span>'+title+'</span></div>'
	html += 			'<div class="btn-group btn-group-sm up-right-side btn-drop-menu" role="group" id="btnDropdownMenu_'+seq+'" style="">';
	if(kind == 'PIE'){
		//html += 				'<button type="button" class="btn btn-default"><i class="fa fa-fw fa-info-circle" aria-hidden="true"></i></button>';
		html += 				'<button type="button" class="btn btn-default box-delete"><i class="fa fa-fw fa-times" aria-hidden="true"></i></button>';
		html += 				'<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false" id="dropdownMenu_'+seq+'">';
		html += 					'<i class="fa fa-fw fa-bars" aria-hidden="true"></i>';
		html += 				'</button>';
		html += 				'<ul class="dropdown-menu dropdown-menu-right" role="menu" aria-labelledby="dropdownMenu_'+seq+'" id="dropdownli_'+seq+'">';
		html += 				'<li id="btnShowTable" class="showTable"><a href="#">Show Table</a></li>';
		html += 				'</ul>';
	}
	else{		
		html += 				'<button type="button" class="btn btn-default box-delete"><i class="fa fa-fw fa-times" aria-hidden="true"></i></button>';
	}

	html += 			'</div>';
	html += 		'</div>';
	if(kind == 'PIE'){
		html += 		'<div class="box-body chart-body-pie">';
	}
	else if(kind == 'BAR'){
		html += 		'<div class="box-body chart-body-bar">';
	}
	else{
		html += 		'<div class="box-body chart-body-grd">';
	}
	if(kind == 'GRD'){
		html += 			'<div class="item" id="boxChart'+seq+'" style="display:none;">';
		html += 			'</div>';
		html +=				'<div class="item" id="boxChart'+seq+'_jqx" >';							
		html +=				'</div>';
	}
	else if(kind == 'GAO'){
		html += 			'<div class="item" id="boxChart'+seq+'" style="display:none;">';
		html += 			'</div>';
		html +=				'<div class="item" id="boxChart'+seq+'_jqx" >';			
		html +=				'</div>';
		html += 			'<div class="btn-group btn-group-sm down-right-side btn-or-select" id="btnOrSelecte_'+seq+'" style="">';
		html += 				'<button type="button" class="btn btn-google btn-flat">Select Samples</button>';
		html += 			'</div>';
	}
	else if(kind == 'BAR'){
		html += 			'<div class="item" id="boxChart'+seq+'">';
		html += 			'</div>';
		html +=				'<div class="item" id="boxChart'+seq+'_jqx" style="display:none;">';							
		html +=				'</div>';
	}
	else{
		html += 			'<div class="item" id="boxChart'+seq+'">';
		html += 			'</div>';
		html +=				'<div class="item" id="boxChart'+seq+'_jqx" >';							
		html +=				'</div>';
	}
	html += 		'</div>';
	html += 	'</div>';
	html += '</li>';
	
	return html;
}
function setBarChartdataform(resultData){
	
	var arrVal = [];
	var arrLabel = [];
	for(var i=0; i<resultData.length; i++){
		arrVal.push(resultData[i].CNT);
		arrLabel.push(resultData[i].ITEM);
	}
	var data = [
		  {
		    x: arrLabel,
		    y: arrVal,
		    type: 'bar',
		    ids : arrLabel,
		    marker : { color : 'rgb(31, 119, 180)',
			  line : {color : [''], width:[0]}
		    }
		  }
		];
	return data;
	
}

function makeBarChart(resultData, item, seq, id, idx){
	//bar
	var myplot = $("#"+id);
	if(resultData.length == 0){
		myplot.append("<span class='no-data-display' style='position: absolute; left:35%; top:50%;'>No data to display</span>");
		//return;
	}
	var myplot2 = document.getElementById(id);
	var itemNM = item.ITEM_NM;
/*	var arrVal = [];
	var arrLabel = [];
	for(var i=0; i<resultData.length; i++){
		arrVal.push(resultData[i].CNT);
		arrLabel.push(resultData[i].NM);
	}*/
	
	var data = setBarChartdataform(resultData);
	/*var layout = {
			  autosize: false,
			  height : 140,
			  width : 390,
			  dragmode : 'select',
			  selectdirection : "h",
			  showlegend: false,
			  margin: {
				  	l: 40,
				    r: 0,
				    b: 0,
				    t: 10,
			  }
			};
	var config = {
			scrollZoom: true, // lets us scroll to zoom in and out - works
			showLink: false, // removes the link to edit on plotly - works
			modeBarButtonsToRemove: [ 'sendDataToCloud', 'autoScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian'], 
			//modeBarButtonsToAdd: ['lasso2d'],
			displaylogo: false // this one also seems to not work
			//displayModeBar: true //this one does work
	};*/
	
	Plotly.newPlot(id, data, barLayout,config);
	$('.modebar-btn').removeAttr('data-title');
	myplot[0].on('plotly_selected',function(data){
		
		if(data == undefined || data.points.length == 0) return;

		var name = itemNM;
		var dataArr = data.points;
		
		if($('#filter_'+seq).length > 0){
			$('#filter_'+seq).remove();
		}
		
		var orderArr = [];
		for(var i=0; i<dataArr.length; i++){
			orderArr.push(dataArr[i].x);
		}
		//orderArr.sort();
		var arrMin = Math.min.apply(null,orderArr);
		var arrMax = Math.max.apply(null,orderArr);
		
		var html = '';
		html += '<div class="filter-box" cate="'+item.ITEM_CATE_ID+'" id="filter_'+seq+'" name="'+item.ITEM_ID+'"  table="'+item.BASE_DT_TABLE+'">';
		html +=		'<input type="hidden" name="filterBar1" value='+data.range.x[0].toFixed(2)+'>';
		html +=		'<input type="hidden" name="filterBar2" value='+data.range.x[1].toFixed(2)+'>';
		html += 	'<span>';
		html += 		name + ' : ';
		html += 	'</span>';
		html += 	'<div class="btn-group" id="x">';
		html += 		'<button type="button" class="btn bg-blue btn-flat btn-xs" name="'+seq+'_'+name+'">';
		html +=  			arrMin + ' &le; '+ name +' &le; ' + arrMax;
		html += 		'</button>';
		html +=			'<button type="button" class="btn bg-blue btn-flat btn-xs delete" cate="'+item.ITEM_CATE_ID+'" name="'+name+'" grid="'+id+'">';
		html += 		'<i class="fa fa-times"></i>';
		html += 		'</button>';
		html += 	'</div>';
		html += '</div>';
		
		$('#filter-group').append(html);
		
		//$('#btnDashboardFilterApply').trigger('click');
		
	});
}

function setPieChartdataform(resultData){
	var arrVal = [];
	var arrLabel = [];
	var arrIds = [];
	for(var i=0; i<resultData.length; i++){
		arrVal.push(resultData[i].CNT);
		arrLabel.push(resultData[i].NM);
		arrIds.push(resultData[i].ITEM);
	}
	
	var data = [{
		  values: arrVal,
		  labels: arrLabel,
		  type: 'pie',
		  ids : arrIds,
		  hoverinfo : 'label + percent + value',
		  hovertemplate :
			  "<b>%{label}</b><br><br>" +
	            "%{value} (%{percent:.0%})<extra></extra>",
		  marker : { colors : [] ,
			  line : {color : [], width:[0,0]}
		  },
		  textinfo : ""
		}];
	
	return data;
}

function makePieChart(resultData, item, seq, id, idx){
	var myplot = $("#"+id);
	if(resultData.length == 0){
		myplot.append("<span class='no-data-display' style='position: absolute; left:22%; top:50%;'>No data to display</span>");
		//return;
	}
	var myplot2 = document.getElementById(id);
	
	var itemNM = item.ITEM_NM;
	/*var arrVal = [];
	var arrLabel = [];
	var arrIds = [];
	for(var i=0; i<resultData.length; i++){
		arrVal.push(resultData[i].CNT);
		arrLabel.push(resultData[i].NM);
		arrIds.push(resultData[i].ITEM);
	}
	
	var data = [{
		  values: arrVal,
		  labels: arrLabel,
		  type: 'pie',
		  ids : arrIds
		}];*/
	var data = setPieChartdataform(resultData);
	
	/*var layout = {
		  autosize: false,
		  height : 150,
		  width : 199,
		  dragmode : 'select',
		  title : {
			  text : itemNM
		  },
		  showlegend: false,
		  margin: {
			    l: 0,
			    r: 0,
			    b: 0,
			    t: 0,
		  }
	};
	
	var config = {
			scrollZoom: true, // lets us scroll to zoom in and out - works
			showLink: false, // removes the link to edit on plotly - works
			modeBarButtonsToRemove: [ 'sendDataToCloud', 'autoScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian'], 
			//modeBarButtonsToAdd: ['lasso2d'],
			displaylogo: false // this one also seems to not work
			//displayModeBar: true //this one does work
	};*/
	
	Plotly.newPlot(id, data, pieLayout, config);
	$('.modebar-btn').removeAttr('data-title');
	myplot[0].on('plotly_click',function(data){
		
		var name = itemNM;
		
		if($('button[name="'+seq+'_'+data.points[0].id[0]+'"]').length != 0) return ;
	
		var html = '';
		if($('#filter_'+seq).length == 0){
			html += '<div class="filter-box" cate="'+item.ITEM_CATE_ID+'" id="filter_'+seq+'" name="'+item.ITEM_ID+'" table="'+item.BASE_DT_TABLE+'">';
			html += 	'<span>';
			html += 		name + ' : ';
			html += 	'</span>';
			html += 	'<div class="btn-group" id="'+data.points[0].id[0]+'">';
			html +=			'<input type="hidden" name="filterId" value='+data.points[0].id[0]+'>';
			html += 		'<button type="button" class="btn bg-blue btn-flat btn-xs" name="'+seq+'_'+data.points[0].id[0]+'">';
			html +=  			data.points[0].label;
			html += 		'</button>';
			html +=			'<button type="button" class="btn bg-blue btn-flat btn-xs delete" cate="'+item.ITEM_CATE_ID+'" name="'+data.points[0].id[0]+'" grid="'+id+'">';
			html += 		'<i class="fa fa-times"></i>';
			html += 		'</button>';
			html += 	'</div>';
			html += '</div>';
			
			$('#filter-group').append(html);
		}
		else{
			html += 	' ';
			html += 	'<div class="btn-group" id="'+data.points[0].id[0]+'">';
			html +=			'<input type="hidden" name="filterId" value='+data.points[0].id[0]+'>';
			html += 		'<button type="button" class="btn bg-blue btn-flat btn-xs" name="'+seq+'_'+data.points[0].id[0]+'">';
			html +=  			data.points[0].label;
			html += 		'</button>';
			html +=			'<button type="button" class="btn bg-blue btn-flat btn-xs delete" cate="'+item.ITEM_CATE_ID+'" name="'+data.points[0].id[0]+'" grid="'+id+'">';
			html += 		'<i class="fa fa-times"></i>';
			html += 		'</button>';
			html += 	'</div>';
			
			$('#filter_'+seq).append(html);
		}

		var graphNM = id+'_jqx';
		var idx = $("#"+graphNM).jqxGrid('getrowboundindexbyid',data.points[0].id[0]);
		$("#"+graphNM).jqxGrid('setcellvaluebyid', data.points[0].id[0], "CHK", true);
		//$("#"+graphNM).jqxGrid('selectrow', idx);
		//$('#btnDashboardFilterApply').trigger('click');
		
	});
	
	var dSlice = d3.select(myplot[0])
	.select('svg')
	.select('.pielayer')
	.selectAll('.slice');

	for(var i=0; i<dSlice._groups[0].length; i++){
		var tmp = dSlice._groups[0][i];
		//var dataPer = tmp.__data__.text.replace('%','')*1;
		var dataPer = d3.select(tmp).select('text').text().replace('%','')*1;
		if(dataPer <= 5){
			var dEl = d3.select(tmp)._groups[0][0].parentElement;
			d3.select(tmp).select('text').style("fill-opacity",0);
			d3.select(tmp).select('.textline').style("stroke-opacity",0);	
		}	
	}
	
	
/*	textLine.selectAll('.textline').attr("stroke-opacity",d=>{
		return "0";
	});*/
	
}

function d3LineTextRemove(id){
	var myplot = $("#"+id);
	
	var dSlice = d3.select(myplot[0])
	.select('svg')
	.select('.pielayer')
	.selectAll('.slice');

	if(isNullOrEmpty(dSlice._groups[0])) return;
	for(var i=0; i<dSlice._groups[0].length; i++){
		var tmp = dSlice._groups[0][i];
		var dataPer = d3.select(tmp).select('text').text().replace('%','')*1;
		if(dataPer <= 5){
			var dEl = d3.select(tmp)._groups[0][0].parentElement;
			d3.select(tmp).select('text').style("fill-opacity",0);
			d3.select(tmp).select('.textline').style("stroke-opacity",0);	
		}	
	}
	
}


function makeTableChart(resultData, item, seq, divId, idx){

	
	var graphNM = divId+'_jqx';
	var graph = eval(graphNM);
	var itemNM = item.ITEM_NM;

	
	
	var source =
    {
        localdata: resultData,
        datatype: "json",
        id: "ITEM"
    };
    var dataAdapter = new $.jqx.dataAdapter(source, {
        downloadComplete: function (data, status, xhr) { },
        loadComplete: function (data) { },
        loadError: function (xhr, status, error) { }
    });
    
    var cellsFreqrenderer = function (row, columnfield, value, defaulthtml, columnproperties) {
    	var rowData = $("#"+graphNM).jqxGrid('getrowdata',row);

    	var allCnt = 0;
    	for(var i=0; i<$("#"+graphNM).jqxGrid('getrows').length; i++){
    		var tmpMap = $("#"+graphNM).jqxGrid('getrows')[i];
    		allCnt += tmpMap.CNT;
    	}
    	
        return '<div class="jqx-grid-cell-left-align" style="margin-top: 4px;">'+(rowData.CNT/allCnt*100).toFixed(2)+'%</div>';
    }
    
    $("#"+graphNM).jqxGrid(
    {
    	height : 340,
    	/*width : 465,*/
    	width: "100%",
    	editable: true,
    	theme: 'bootstrap',
    	showfilterrow : true,
    	selectionmode: 'none',
    	filterable: true,
    	columnsresize: true,
    	columnsautoresize : true,
        source: dataAdapter,
        sortable : true,
        columns: 
        	[
          { text: itemNM, datafield: 'NM' , editable: false},
          { text: '#', datafield: 'CNT', width: '15%', editable: false},
          { text: '#', datafield: 'CHK' , columntype:'checkbox', width: '5%', editable: true},
          { text: 'Freq' , datafield: 'FREQ', width: '15%', editable: false , cellsformat : 'p2' ,cellsrenderer: cellsFreqrenderer}
        ]
    });
	

    $("#"+graphNM).on('cellvaluechanged', function (event) {
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
	      var rowData = $("#"+graphNM).jqxGrid('getrowdata',rowBoundIndex);
	      var name = itemNM;
	   		
	      if(value == true){
	    	if($('button[name="'+seq+'_'+rowData.ITEM+'"]').length != 0) return ;
	   	
	    	$('#'+graphNM).jqxGrid('selectrow',rowBoundIndex);
	   		var html = '';
	   		if($('#filter_'+seq).length == 0){
	   			html += '<div class="filter-box" cate="'+item.ITEM_CATE_ID+'" id="filter_'+seq+'" name="'+item.ITEM_ID+'"  table="'+item.BASE_DT_TABLE+'">';
	   			html += 	'<span>';
	   			html += 		name + ' : ';
	   			html += 	'</span>';
	   			html += 	'<div class="btn-group" id="'+rowData.ITEM+'">'; 
	   			html +=			'<input type="hidden" name="filterId" value='+ rowData.ITEM +'>';
	   			html += 		'<button type="button" class="btn bg-blue btn-flat btn-xs" name="'+seq+'_'+rowData.ITEM+'">';
	   			html +=  			rowData.NM;
	   			html += 		'</button>';
	   			html +=			'<button type="button" class="btn bg-blue btn-flat btn-xs delete" cate="'+item.ITEM_CATE_ID+'" name="'+rowData.ITEM+'" grid="'+divId+'">';
	   			html += 		'<i class="fa fa-times"></i>';
	   			html += 		'</button>';
	   			html += 	'</div>';
	   			html += '</div>';
	   			
	   			$('#filter-group').append(html);
	   		}
	   		else{
	   			html += 	' ';
	   			html += 	'<div class="btn-group" id="'+rowData.ITEM+'">';
	   			html +=			'<input type="hidden" name="filterId" value='+ rowData.ITEM+'>';
	   			html += 		'<button type="button" class="btn bg-blue btn-flat btn-xs" name="'+seq+'_'+rowData.ITEM+'">';
	   			html +=  			rowData.NM;
	   			html += 		'</button>';
	   			html +=			'<button type="button" class="btn bg-blue btn-flat btn-xs delete" cate="'+item.ITEM_CATE_ID+'" name="'+rowData.ITEM+'" grid="'+divId+'">';
	   			html += 		'<i class="fa fa-times"></i>';
	   			html += 		'</button>';
	   			html += 	'</div>';
	   			
	   			$('#filter_'+seq).append(html);
	   		}
	    	
	   		//$('#btnDashboardFilterApply').trigger('click');
	      }
	      else{
	    	  $('#'+graphNM).jqxGrid('unselectrow',rowBoundIndex);  
	    	if($('#filter_'+seq).children('div').length <= 1){
	    	  	$('#filter_'+seq).remove();
			}
			else{
				$('#'+rowData.ITEM).remove();
			}
	    	
	    	//$('#btnDashboardFilterApply').trigger('click');
	    	
	      }
	
	});
    
}

function makeTableGAOChart(resultData, item, seq, divId, idx){

	
	var graphNM = divId+'_jqx';
	var graph = eval(graphNM);
	var itemNM = item.ITEM_NM;
	var itemLabel = item.ITEM_LABEL.split(',');


	//console.log(resultData)
	
	var fieldCol = [];
	var dataCol = [];
	var selectedRowCol = [];
	
	var isEditable = function (row, datafield, columntype, value) {
		var rowData = $("#"+graphNM).jqxGrid('getrowdata',row);
		
		if($('button[name="'+seq+'_'+rowData.uid+'"]').length != 0){
	    	return false;
	    }
	}
	
	for(var i=0; i<itemLabel.length; i++){
		var tmpSet = {};
		tmpSet = {text : itemLabel[i], datafield : 'C'+(i+1), editable: false}
		dataCol.push(tmpSet);
	}
	
	
	var source =
    {
        localdata: resultData,
        datatype: "json",
        id: "CKEY"/*,
        updaterow: function (rowid, rowdata, commit) {
            // synchronize with the server - send update command   
            commit(true);
        }*/
    };
    var dataAdapter = new $.jqx.dataAdapter(source, {
        downloadComplete: function (data, status, xhr) { },
        loadComplete: function (data) { },
        loadError: function (xhr, status, error) { }
    });
    
    var cellsFreqrenderer = function (row, columnfield, value, defaulthtml, columnproperties) {
    	var rowData = $("#"+graphNM).jqxGrid('getrowdata',row);
    	/*var allCnt = 0;
		for(var i=0; i<$("#"+graphNM).jqxGrid('getrows').length; i++){
			var tmpMap = $("#"+graphNM).jqxGrid('getrows')[i];
			allCnt += tmpMap.CNT;
		}*/
    	
        return '<div class="jqx-grid-cell-left-align" style="margin-top: 4px;">'+(rowData.CNT/spcnCount*100).toFixed(2)+'%</div>';
    }
	
	dataCol.push(
			{text : '#' , datafield : 'CNT', width: '10%', editable: false},
			{text : '<i class="fa fa-fw fa-caret-down"></i>', datafield : 'CHK', width: '5%' , editable: true, columntype:'checkbox', cellbeginedit: isEditable},
			{text : 'Freq' , datafield : 'FREQ' , cellsformat : 'p2', width: '15%', editable: false ,cellsrenderer: cellsFreqrenderer}
	)


    
    $("#"+graphNM).jqxGrid(
    {
    	height : 310,
    	/*width : 465,*/
    	width: '100%',
    	editable: true,
    	theme: 'bootstrap',
    	showfilterrow : true,
    	selectionmode: 'none',
    	filterable: true,
    	columnsresize: true,
    	columnsautoresize : true,
        source: dataAdapter,
        sortable : true,
        columns: dataCol
    });
	
    $("#"+graphNM).on('cellvaluechanged', function (event) 
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
	      var rowData = $("#"+graphNM).jqxGrid('getrowdata',rowBoundIndex);
	      
	      if(value == false){
	    	  
		    if($('#filter_'+seq).children('div').children('.or-group').length <= 1){
	    	  	$('#filter_'+seq).remove();
			}
			else{
				if($('#'+rowData.uid).parent().children('div').length <= 1){
					if($('#'+rowData.uid).parent().prev('label').text() == 'and'){
						$('#'+rowData.uid).parent().prev('label').remove();
					}
					else{
						$('#'+rowData.uid).parent().next('label').remove();
					}
					$('#'+rowData.uid).parent().remove();
				}
				else{
					if($('#'+rowData.uid).prev('label').text() == 'or'){
						$('#'+rowData.uid).prev('label').remove();
					}
					else{
						$('#'+rowData.uid).next('label').remove();
					}
					$('#'+rowData.uid).remove();
				}
				
			}
	    	
		    //$('#btnDashboardFilterApply').trigger('click');
	      }
	      

	  });
    

}

function makeScatterChart(data, name, x, y){
	
}

function boxWeightCheck(){
	
	for(var i=0; i<$('.sortable_area').length; i++){
		var $ul = $('.sortable_area').eq(i);
		var w = 0;
		for(var j=0; j<$ul.children().length; j++){
			var $li = $ul.children().eq(j);
			w += $li.attr('weight')*1;	
		}
		$ul.attr('weight',w);
	}
	
}

function boxListSearch(rowData){
	
	var weight = 1;
	if(rowData.CHART_TYPE == 'PIE'){			 
		weight = 1;
	}
	else if(rowData.CHART_TYPE == 'BAR'){
		weight = 2;
	}
	else if(rowData.CHART_TYPE == 'GRD'){
		weight = 4;
	}
	else if(rowData.CHART_TYPE == 'GAO'){
		weight = 4;
	}
	
	var tmpArr = [];
	var oddChk = -1;
	for(var i=0; i<$('.sortable_area').length; i++){
		tmpArr.push($('.sortable_area').eq(i).attr('weight'))
		if($('.sortable_area').eq(i).attr('weight')%2 != 0 ){
			oddChk = i;
			break;
		}
		//tmpArr.push($('.sortable_area').eq(i).children().length);
	}
	var len;
	var idx;
	var num;
	if(oddChk == -1){
		len = Math.min.apply(null,tmpArr).toString();
		idx = tmpArr.indexOf(len);
		num;
		if($('.sortable_area').eq(idx).children().length == 0){
			num = 0;
		}
		else{
			num = $('.sortable_area').eq(idx).children().last()[0].getAttribute('num');
		}
	}
	else{
		idx = i;
	}
	
	
	
	var boxIdx = idx + 1;
	var itemWeight = $('#item_'+boxIdx).attr("weight")*1;
	
	$('#item_'+boxIdx).attr("weight",itemWeight + weight);
	
	
	
	var resultMap = {};
	resultMap.len = 0;
	resultMap.idx = idx;
	resultMap.num = 0;
	
	
	
	return resultMap;
}



var MutationChart = {
	saveChartToPNG: function(svg, w, h, filename){
		var string = getSVGString(svg.node());
		
		var imgsrc = 'data:image/svg+xml;base64,'+ btoa( unescape( encodeURIComponent( string ) ) ); // Convert SVG string to data URL
		
		var canvas = document.createElement("canvas");
		var context = canvas.getContext("2d");

		canvas.width = w;
		canvas.height = h;

		var image = new Image();
		image.src = imgsrc;
		
		image.onload = function() {
			context.clearRect ( 0, 0, w, h);
			context.drawImage(image, 0, 0, w, h);

			canvas.toBlob( function(blob) {
				var filesize = Math.round( blob.length/1024 ) + ' KB';
				
				var url = window.URL.createObjectURL(blob);
				
				var a = document.createElement("a")
				a.href = url;
				a.download = filename;
				a.click();
				window.URL.revokeObjectURL(url);
				
			});
		};
		
	},
	saveChartToSVG: function(svg, w, h, fileName){
		alert("saveChart");
		
	}
}





//Below are the functions that handle actual exporting:
//getSVGString ( svgNode ) and svgString2Image( svgString, width, height, format, callback )
function getSVGString( svgNode ) {
	svgNode.setAttribute('xlink', 'http://www.w3.org/1999/xlink');
	var cssStyleText = getCSSStyles( svgNode );
	appendCSS( cssStyleText, svgNode );

	var serializer = new XMLSerializer();
	var svgString = serializer.serializeToString(svgNode);
	svgString = svgString.replace(/(\w+)?:?xlink=/g, 'xmlns:xlink='); // Fix root xlink without namespace
	svgString = svgString.replace(/NS\d+:href/g, 'xlink:href'); // Safari NS namespace fix

	return svgString;

	function getCSSStyles( parentElement ) {
		var selectorTextArr = [];

		// Add Parent element Id and Classes to the list
		selectorTextArr.push( '#'+parentElement.id );
		for (var c = 0; c < parentElement.classList.length; c++)
				if ( !contains('.'+parentElement.classList[c], selectorTextArr) )
					selectorTextArr.push( '.'+parentElement.classList[c] );

		// Add Children element Ids and Classes to the list
		var nodes = parentElement.getElementsByTagName("*");
		for (var i = 0; i < nodes.length; i++) {
			var id = nodes[i].id;
			if ( !contains('#'+id, selectorTextArr) )
				selectorTextArr.push( '#'+id );

			var classes = nodes[i].classList;
			for (var c = 0; c < classes.length; c++)
				if ( !contains('.'+classes[c], selectorTextArr) )
					selectorTextArr.push( '.'+classes[c] );
		}

		// Extract CSS Rules
		var extractedCSSText = "";
		for (var i = 0; i < document.styleSheets.length; i++) {
			var s = document.styleSheets[i];
			
			try {
			    if(!s.cssRules) continue;
			} catch( e ) {
		    		if(e.name !== 'SecurityError') throw e; // for Firefox
		    		continue;
		    	}

			var cssRules = s.cssRules;
			for (var r = 0; r < cssRules.length; r++) {
				if ( contains( cssRules[r].selectorText, selectorTextArr ) )
					extractedCSSText += cssRules[r].cssText;
			}
		}
		

		return extractedCSSText;

		function contains(str,arr) {
			return arr.indexOf( str ) === -1 ? false : true;
		}

	}

	function appendCSS( cssText, element ) {
		var styleElement = document.createElement("style");
		styleElement.setAttribute("type","text/css"); 
		styleElement.innerHTML = cssText;
		var refNode = element.hasChildNodes() ? element.children[0] : null;
		element.insertBefore( styleElement, refNode );
	}
}


function svgString2Image( svgString, width, height, format, callback ) {
	var format = format ? format : 'png';

	var imgsrc = 'data:image/svg+xml;base64,'+ btoa( unescape( encodeURIComponent( svgString ) ) ); // Convert SVG string to data URL

	var canvas = document.createElement("canvas");
	var context = canvas.getContext("2d");

	canvas.width = width;
	canvas.height = height;

	var image = new Image();
	image.onload = function() {
		context.clearRect ( 0, 0, width, height );
		context.drawImage(image, 0, 0, width, height);

		canvas.toBlob( function(blob) {
			var filesize = Math.round( blob.length/1024 ) + ' KB';
			if ( callback ) callback( blob, filesize );
		});

		
	};

	image.src = imgsrc;
}


function save( dataBlob, filesize ){
	saveAs( dataBlob, 'Oncoprint.png' ); // FileSaver.js function
}


