var dataAdapterGrid;		//jqxGrid
var table;					//datatables

//dataTables 그리기
var makeDataTables = function(dataTablesId, dataTablesOption){
	//table = $(dataTablesId).DataTable(dataTablesOption);
	
	//동적 변수로 테이블 생성
	window['table'+$(".dataTableDiv").index($(dataTablesId+'Div'))] = $(dataTablesId).DataTable(dataTablesOption);
    
    /*table.on( 'row-reorder', function ( e, diff, edit ) { 
        for ( var i=0, ien=diff.length ; i<ien ; i++ ) {
            var rowData = table.row( diff[i].node ).data(); 
        }
	} );*/
}

//jqxGrid그리기
var makeTable = function(myId, sourceGrid, tableOptions){

	dataAdapterGrid = new $.jqx.dataAdapter(sourceGrid);
	
	var jqxTableOption = {
			source: dataAdapterGrid
	};
	
	//두개의 json합치기
	$.extend(jqxTableOption, tableOptions);
	
	$(myId).jqxGrid(jqxTableOption);
}


//게시판 그리기
var makeBoard = function(boardName){
	var boardData = {
		totalCount:58,
		data : [
		        {idx:58, writer:'작성자58', title:'제목58', date:'2017-03-23', hit:1},
		        {idx:57, writer:'작성자57', title:'제목57', date:'2017-03-22', hit:3},
		        {idx:56, writer:'작성자56', title:'제목56', date:'2017-03-21', hit:5},
		        {idx:55, writer:'작성자55', title:'제목55', date:'2017-03-20', hit:10},
		        {idx:54, writer:'작성자54', title:'제목54', date:'2017-03-20', hit:21}
		    ]
	};
	
	if(boardData['totalCount'] > 0){				//데이터가 있으면
		$(boardName + " > tbody > .boardEmpty").remove();
		for(var i=0; i < boardData['data'].length; i++){
			var thisRow = '';
			
			thisRow = thisRow + '<tr>';
			thisRow = thisRow + '<td scope="row" class="text-center">'+ parseInt(parseInt(boardData['totalCount']) - parseInt(i)) +'</td>';
			thisRow = thisRow + '<td class="txt_line"><a href="http://naver.com" target="_blank">'+ boardData['data'][i]['title'] +'</a></td>';
			thisRow = thisRow + '<td class="text-center">'+ boardData['data'][i]['writer'] +'</td>';
			thisRow = thisRow + '<td class="text-center">'+ boardData['data'][i]['date'] +'</td>';
			thisRow = thisRow + '<td class="text-center">'+ boardData['data'][i]['hit'] +'</td>';
			thisRow = thisRow + '</tr>';
			
			$(boardName + " > tbody").append(thisRow);
		}
	}
}


//dataTables add row
var addRow = function(dataArr, tableId){
	
	//동적변수로 row add
	window['table'+$(".dataTableDiv").index($(tableId+'Div'))].row.add( dataArr ).draw( false );
	for(var i=0; i<$('.dataTables_scrollHeadInner > table > thead > tr:eq(0) > th').length; i++){			//th와 td 가로사이즈 맞추기		
		$('.dataTables_scrollBody > table > thead > tr:last-child > th:eq('+i+')').width($('.dataTables_scrollHeadInner > table > thead > tr > th:eq('+i+')').width());
		console.log($('.dataTables_scrollHeadInner > table').width());
	}
};



/**
 * JqxGrid 헤더 Style
 */
var columnsrenderer = function (value) {	
	return '<div style="text-align: center; margin-top: 5px;">' + value + '</div>';
}



/**
 * jqxGrid UP ROW
 */
$.fn.upRow = function()
{
	var idx 		= $(this).jqxGrid('getselectedrowindex');
	var rowscount 	= $(this).jqxGrid('getdatainformation').rowscount;
	var currentIdx  = -1;
	
	
	if(	idx == 0){
		return;
	}
	
	for(var i=0; i < rowscount; i++){
    	var dsTmp = $(this).jqxGrid('getrowdata',i);
    	
    	if(i == idx - 1){
    		dsTmp.ORDER = (i+1) + 1;
    		$(this).jqxGrid('updaterow',i,dsTmp);
        	
    	}
    	
    	if(i == idx){
    		dsTmp.ORDER = (i+1) - 1;
    		currentIdx = i - 1;
        	$(this).jqxGrid('updaterow', i, dsTmp);
    	}
    }
	return currentIdx;
}

/**
 * jqxGrid DOWN ROW
 */
$.fn.downRow = function()
{
	var idx 		= $(this).jqxGrid('getselectedrowindex');
	var rowscount 	= $(this).jqxGrid('getdatainformation').rowscount;
	var currentIdx  = -1;
	
	if(idx == (rowscount - 1)){
		return;
		
	}
	
    for(var i=0; i < rowscount; i++){
    	var dsTmp = $(this).jqxGrid('getrowdata',i);
    	
    	if(i == idx){
    		dsTmp.ORDER = (i + 1) + 1;
    		currentIdx = i+1;
        	$(this).jqxGrid('updaterow', i, dsTmp);
    	}
    	
    	if(i == idx + 1){
    		dsTmp.ORDER = (i + 1) - 1;
        	$(this).jqxGrid('updaterow', i, dsTmp);
    	}
    }
    
    return currentIdx;
	
}


/**
 * datatables row select
 * ex) datatablesSelected(this, color) color:success, info, warning, danger
 */
function datatablesSelected(thisDom, color){
	if ( $(thisDom).hasClass(color) ) {
        $('table').removeClass(color);
    }
    else {
    	$('table tr.'+color).removeClass(color);
        $(thisDom).addClass(color);
    }
}




