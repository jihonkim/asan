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
var gvBasketListSource;
var gvBasketDetlListSource;
var gvBRCParcelApplySource;
var gvBRCParcelResultSource;
var gvBRCParcelApplyResultSource;
var gvCommand = '';
var gvSelectedBRCParcelResult;
/**
 * Application Ready
 */
$(document).ready(function(){
	
	brcParcelInit();
	
	brcParcelEventTop();
	
	
	/*$(document).ready(function(e){
		
	});*/
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


//------------------------------------------------------------------------------------------
//	TRANSACTION	
//------------------------------------------------------------------------------------------
/**
 * 
 * @returns
 */
function brcParcelInit(){
	
}

function setJqxGridBasketList(){
	gvBasketListSource =
    {
        localdata: [],
        datafields:
 	       [
 	    	  { name: 'SEQ', type: 'number' },
 	           { name: 'PER_CODE', type: 'string' },
 	           { name: 'BUCK_NM', type: 'string' },
 	           { name: 'RGST_DT', type: 'date' }
 	        ],
        datatype: "json",
        id: "SEQ"
    };
    var dataAdapter = new $.jqx.dataAdapter(gvBasketListSource, {
        downloadComplete: function (data, status, xhr) { },
        loadComplete: function (data) { },
        loadError: function (xhr, status, error) { }
    });
    
    
    $("#jqxBasketList").jqxGrid(
    {
    	height : '100%',
    	/*width : 465,*/
    	width: "100%",
    	editable: true,
    	theme: 'bootstrap',
    	pageable: false,
    	/*pagesize: 20,
		pagesizeoptions: ['10', '20', '30', '50', '100'],*/
    	//showfilterrow : true,
    	selectionmode: 'singlerow',
    	filterable: true,
    	columnsresize: true,
    	columnsautoresize : true,
        source: dataAdapter,
        sortable : true,
        columns: 
        	[
          { text: '이름', datafield: 'BUCK_NM', width: '100%', align: 'center', editable: false}

          //{ text: '#', datafield: 'CHK' , columntype:'checkbox', width: '5%', editable: true},
          //{ text: 'Freq' , datafield: 'FREQ', width: '15%', editable: false , cellsformat : 'p2' ,cellsrenderer: cellsFreqrenderer}
        ]
    });
}

function setJqxGridBaskeDetltList(){
	gvBasketDetlListSource =
    {
        localdata: [],
        datafields:
 	       [
 	    	  { name: 'SEQ', type: 'number' },
 	    	  { name: 'PER_CODE', type: 'string' },
 	    	  { name: 'RESCH_PAT_ID', type: 'string' },
	          { name: 'EXAM_NO', type: 'string' },
	          { name: 'SPCN_TYP_CD', type: 'string' },
	          { name: 'REAL_SPCN_RST_CNT', type: 'number' },
	          { name: 'CNT_YN', type: 'number' },
	          { name: 'APRY_YN', type: 'string' },
	          { name: 'APRY_DT', type: 'date' },
	          { name: 'APRY_ID', type: 'string' },
	          { name: 'EXIST_YN', type: 'string' },
	          { name: 'BUCK_SEQ', type: 'number' },
	          { name: 'AGE', type: 'number' },
	          { name: 'CELL_ORGAN_DIV_CD', type: 'string' },
	          { name: 'DTL_ORGAN_CD', type: 'string' },
	          { name: 'KOR_NM', type: 'string' },
 	        ],
        datatype: "json",
        id: "SEQ"
    };
    var dataAdapter = new $.jqx.dataAdapter(gvBasketDetlListSource, {
        downloadComplete: function (data, status, xhr) { },
        loadComplete: function (data) { },
        loadError: function (xhr, status, error) { }
    });
    
    var cellsrendererCnt = function (row, columnfield, value, defaulthtml, columnproperties) {
    	var rowdata = $("#jqxSelectedbasketList").jqxGrid('getrowdata',row);
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
    	var rowdata = $("#jqxSelectedbasketList").jqxGrid('getrowdata',row);
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
    
    var cellclassCnt = function (row, columnfield, value) {
        if (value == 1) {
            return 'jqx-coral';
        }
    }
    
    var cellclassSpcn = function (row, columnfield, value) {
    	var rowdata = $("#jqxSelectedbasketList").jqxGrid('getrowdata',row);
    	var html ='';
    	
    	if (rowdata.REAL_SPCN_RST_CNT == 1) {
            return 'jqx-coral';
        }
    }
    $("#jqxSelectedbasketList").jqxGrid(
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
    	selectionmode: 'singlerow',
    	filterable: true,
    	columnsresize: true,
    	columnsautoresize : false,
        source: dataAdapter,
        sortable : true,
        columns: 
        	[
        		{ text: "연구 번호", datafield: 'RESCH_PAT_ID' , width: '100', editable: false , align: 'center',cellsalign: 'center' },
                { text: "BRC 번호", datafield: 'EXAM_NO' , width: '100', editable: false, align: 'center',cellsalign: 'center'},
                { text: "장기", datafield: 'CELL_ORGAN_DIV_CD' , width: '100', editable: false, cellclassname : cellclassSpcn, align: 'center',cellsalign: 'center'},
                { text: "세부장기", datafield: 'DTL_ORGAN_CD' , width: '100', editable: false, cellclassname : cellclassSpcn, align: 'center',cellsalign: 'center'},
                { text: "검체유형", datafield: 'SPCN_TYP_CD' , width: '100', editable: false, cellsrenderer: cellsrendereSpcn, cellclassname : cellclassSpcn,align: 'center', cellsalign: 'center'},
                { text: "분양가능 검체수", datafield: 'REAL_SPCN_RST_CNT' , width: '50', editable: false, cellclassname : cellclassCnt,align: 'center', cellsalign: 'center'},
                { text: "나이", datafield: 'AGE' , width: '50', editable: false,align: 'center', cellsalign: 'center'},
                { text: "조직사용동의서 제출", datafield: 'CNT_YN' , width: '100', editable: false , cellclassname : cellclassCnt, cellsrenderer: cellsrendererCnt,align: 'center', cellsalign: 'center'},
                { text: "집도의", datafield: 'KOR_NM' , width: '150', editable: false, align: 'center',cellsalign: 'center'}
        ]
    });
}



function setJqxGridBRCParcelApplyList(){
	
	gvBRCParcelApplySource =
    {
        localdata: [],
        datafields:
 	       [
 	    	  { name: 'SEQ', type: 'number' },
 	    	  { name: 'PER_CODE', type: 'string' },
 	    	  { name: 'RESCH_PAT_ID', type: 'string' },
	          { name: 'EXAM_NO', type: 'string' },
	          { name: 'SPCN_TYP_CD', type: 'string' },
	          { name: 'REAL_SPCN_RST_CNT', type: 'number' },
	          { name: 'CNT_YN', type: 'number' },
	          { name: 'APRY_YN', type: 'string' },
	          { name: 'APRY_DT', type: 'date' },
	          { name: 'APRY_ID', type: 'string' },
	          { name: 'EXIST_YN', type: 'string' },
	          { name: 'BUCK_SEQ', type: 'number' },
	          { name: 'AGE', type: 'number' },
	          { name: 'CELL_ORGAN_DIV_CD', type: 'string' },
	          { name: 'DTL_ORGAN_CD', type: 'string' },
	          { name: 'KOR_NM', type: 'string' },
 	        ],
        datatype: "json",
        id: "SEQ"
    };
    var dataAdapter = new $.jqx.dataAdapter(gvBRCParcelApplySource, {
        downloadComplete: function (data, status, xhr) { },
        loadComplete: function (data) { },
        loadError: function (xhr, status, error) { }
    });
    
    var cellsrendererCnt = function (row, columnfield, value, defaulthtml, columnproperties) {
    	var rowdata = $("#jqxGridParcelApply").jqxGrid('getrowdata',row);
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
    
    var cellclassCnt = function (row, columnfield, value) {
        if (value == 1) {
            return 'jqx-coral';
        }
    }
    
    var cellsrendereSpcn = function (row, columnfield, value, defaulthtml, columnproperties) {
    	var rowdata = $("#jqxGridParcelApply").jqxGrid('getrowdata',row);
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
    	var rowdata = $("#jqxGridParcelApply").jqxGrid('getrowdata',row);
    	var html ='';
    	
    	if (rowdata.REAL_SPCN_RST_CNT == 1) {
            return 'jqx-coral';
        }
    }
    
    $("#jqxGridParcelApply").jqxGrid(
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
    	selectionmode: 'checkbox',
    	filterable: true,
    	columnsresize: true,
    	columnsautoresize : true,
        source: dataAdapter,
        sortable : true,
        columns: 
        	[
        		{ text: "연구 번호", datafield: 'RESCH_PAT_ID', align: 'center',cellsalign: 'center' , width: '100', editable: false},
                { text: "BRC 번호", datafield: 'EXAM_NO', align: 'center',cellsalign: 'center' , width: '100', editable: false},
                { text: "장기", datafield: 'CELL_ORGAN_DIV_CD', align: 'center',cellsalign: 'center' , width: '100', editable: false, cellclassname : cellclassSpcn},
                { text: "세부장기", datafield: 'DTL_ORGAN_CD', align: 'center',cellsalign: 'center' , width: '100', editable: false, cellclassname : cellclassSpcn},
                { text: "검체유형", datafield: 'SPCN_TYP_CD' ,align: 'center', cellsalign: 'center', width: '100', editable: false, cellsrenderer: cellsrendereSpcn, cellclassname : cellclassSpcn},
                { text: "분양가능 검체수", datafield: 'REAL_SPCN_RST_CNT',align: 'center', cellsalign: 'center' , width: '50', editable: false, cellclassname : cellclassCnt},
                { text: "나이", datafield: 'AGE', align: 'center',cellsalign: 'center' , width: '50', editable: false},
                { text: "조직사용동의서 제출", datafield: 'CNT_YN',align: 'center', cellsalign: 'center' , width: '100', editable: false , cellclassname : cellclassCnt, cellsrenderer: cellsrendererCnt},
                { text: "집도의", datafield: 'KOR_NM',align: 'center', cellsalign: 'center' , width: '150', editable: false}
        ]
    });
}

function setJqxGridParcelApplySubList(){
	
    var dataAdapter = new $.jqx.dataAdapter(gvBRCParcelApplySource, {
        downloadComplete: function (data, status, xhr) { },
        loadComplete: function (data) { },
        loadError: function (xhr, status, error) { }
    });
    
    var cellsrendererCnt = function (row, columnfield, value, defaulthtml, columnproperties) {
    	var rowdata = $("#jqxGridParcelApplySub").jqxGrid('getrowdata',row);
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
    
    var cellclassCnt = function (row, columnfield, value) {
        if (value == 1) {
            return 'jqx-coral';
        }
    }
    var cellsrendereSpcn = function (row, columnfield, value, defaulthtml, columnproperties) {
    	var rowdata = $("#jqxGridParcelApplySub").jqxGrid('getrowdata',row);
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
    	var rowdata = $("#jqxGridParcelApplySub").jqxGrid('getrowdata',row);
    	var html ='';
    	
    	if (rowdata.REAL_SPCN_RST_CNT == 1) {
            return 'jqx-coral';
        }
    }
    $("#jqxGridParcelApplySub").jqxGrid(
    {
    	height : '600',
    	/*width : 465,*/
    	width: "100%",
    	editable: true,
    	theme: 'bootstrap',
    	pageable: true,
    	pagesize: 20,
		pagesizeoptions: ['10', '20', '30', '50', '100'],
    	//showfilterrow : true,
    	selectionmode: 'checkbox',
    	filterable: true,
    	columnsresize: true,
    	columnsautoresize : true,
        source: dataAdapter,
        sortable : true,
        columns: 
        	[
        		{ text: "연구 번호", datafield: 'RESCH_PAT_ID',align: 'center', cellsalign: 'center' , width: '100', editable: false},
                { text: "BRC 번호", datafield: 'EXAM_NO',align: 'center', cellsalign: 'center' , width: '100', editable: false},
                { text: "장기", datafield: 'CELL_ORGAN_DIV_CD', align: 'center',cellsalign: 'center' , width: '100', editable: false, cellclassname : cellclassSpcn},
                { text: "세부장기", datafield: 'DTL_ORGAN_CD',align: 'center', cellsalign: 'center' , width: '100', editable: false, cellclassname : cellclassSpcn},
                { text: "검체유형", datafield: 'SPCN_TYP_CD',align: 'center', cellsalign: 'center' , width: '100', editable: false, cellsrenderer: cellsrendereSpcn, cellclassname : cellclassSpcn},
                { text: "분양가능 검체수", datafield: 'REAL_SPCN_RST_CNT' ,align: 'center', cellsalign: 'center', width: '50', editable: false, cellclassname : cellclassCnt},
                { text: "나이", datafield: 'AGE', align: 'center',cellsalign: 'center' , width: '50', editable: false},
                { text: "조직사용동의서 제출", datafield: 'CNT_YN' ,align: 'center', cellsalign: 'center', width: '100', editable: false , cellclassname : cellclassCnt, cellsrenderer: cellsrendererCnt},
                { text: "집도의", datafield: 'KOR_NM' ,align: 'center', cellsalign: 'center', width: '150', editable: false}
        ]
    });
}

function setJqxGridParcelApplyResultList(){
	
	gvBRCParcelApplyResultSource =
    {
        localdata: [],
        datafields:
 	       [
 	    	  { name: 'SEQ', type: 'number' },
 	    	  { name: 'PER_CODE', type: 'string' },
 	    	  { name: 'RESCH_PAT_ID', type: 'string' },
	          { name: 'EXAM_NO', type: 'string' },
	          { name: 'SPCN_TYP_CD', type: 'string' },
	          { name: 'REAL_SPCN_RST_CNT', type: 'number' },
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
    var dataAdapter = new $.jqx.dataAdapter(gvBRCParcelApplyResultSource, {
        downloadComplete: function (data, status, xhr) { },
        loadComplete: function (data) { },
        loadError: function (xhr, status, error) { }
    });
    
    var cellsrendererExist = function (row, columnfield, value, defaulthtml, columnproperties) {
    	var rowdata = $("#jqxGridParcelApplyResult").jqxGrid('getrowdata',row);
    	var applyResult = rowdata;
    	var html ='';
    	
    	if(value == 'Y'){
    		html = '<div class="row" style=" text-align: center;    margin-top: 2px;">';
			html +=  'Y';
			html += '</div> ';	
		}
		else if(value == 'N'){
			html = '<div class="row" style=" text-align: center;    margin-top: 2px; color:red;">';
			html +=  'N';
			html += '</div> ';	
		}
        return html;
    }
    var cellsrendererCnt = function (row, columnfield, value, defaulthtml, columnproperties) {
    	var rowdata = $("#jqxGridParcelApplyResult").jqxGrid('getrowdata',row);
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
    	var rowdata = $("#jqxGridParcelApplyResult").jqxGrid('getrowdata',row);
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
    var cellclassCnt = function (row, columnfield, value) {
        if (value == 1) {
            return 'jqx-coral';
        }
    }
    var cellclassSpcn = function (row, columnfield, value) {
    	var rowdata = $("#jqxGridParcelApplyResult").jqxGrid('getrowdata',row);
    	var html ='';
    	
    	if (rowdata.REAL_SPCN_RST_CNT == 1) {
            return 'jqx-coral';
        }
    }
    $("#jqxGridParcelApplyResult").jqxGrid(
    {
    	height : '620',
    	/*width : 465,*/
    	width: "100%",
    	editable: true,
    	theme: 'bootstrap',
    	pageable: true,
    	pagesize: 20,
		pagesizeoptions: ['10', '20', '30', '50', '100'],
    	//showfilterrow : true,
    	selectionmode: 'singlerow',
    	filterable: true,
    	columnsresize: true,
    	columnsautoresize : true,
        source: dataAdapter,
        sortable : true,
        columns: 
        	[
        		{ text: "분양 가능", datafield: 'EXIST_YN', align: 'center',cellsalign: 'center', editable: false, cellsrenderer : cellsrendererExist},
        		{ text: "연구 번호", datafield: 'RESCH_PAT_ID' , align: 'center',cellsalign: 'center', width: '100', editable: false},
                { text: "BRC 번호", datafield: 'EXAM_NO' , align: 'center',cellsalign: 'center', width: '100', editable: false},
                { text: "장기", datafield: 'CELL_ORGAN_DIV_CD' , align: 'center',cellsalign: 'center', width: '100', editable: false, cellclassname : cellclassSpcn},
                { text: "세부장기", datafield: 'DTL_ORGAN_CD' ,align: 'center', cellsalign: 'center', width: '100', editable: false, cellclassname : cellclassSpcn},
                { text: "검체유형", datafield: 'SPCN_TYP_CD',align: 'center', cellsalign: 'center' , width: '100', editable: false, cellsrenderer: cellsrendereSpcn, cellclassname : cellclassSpcn},
                { text: "분양가능 검체수", datafield: 'REAL_SPCN_RST_CNT' ,align: 'center', cellsalign: 'center', width: '50', editable: false, cellclassname : cellclassCnt},
                { text: "나이", datafield: 'AGE',align: 'center', cellsalign: 'center' , width: '50', editable: false},
                { text: "조직사용동의서 제출", datafield: 'CNT_YN' , align: 'center',cellsalign: 'center', width: '100', editable: false , cellclassname : cellclassCnt, cellsrenderer: cellsrendererCnt},
                { text: "집도의", datafield: 'KOR_NM', align: 'center',cellsalign: 'center' , width: '150', editable: false}
                
        ]
    });
}

function setJqxGridBRCParcelResultList(){
	
	
	gvBRCParcelResultSource =
    {
        localdata: [],
        datafields:
 	       [
 	    	  { name: 'SEQ', type: 'number' },
 	    	  { name: 'STAT', type: 'string' },
 	    	  { name: 'APRY_ID', type: 'string' },
 	    	  { name: 'BUCK_SEQ', type: 'number' },
 	    	  { name: 'BUCK_NM', type: 'string' },
 	    	  { name: 'IRB_ID', type: 'string' },
 	    	  { name: 'APRY_CONTENT', type: 'string' },
	    	  { name: 'APRY_PER_CODE', type: 'string' },
	    	  { name: 'APRY_PER_NM', type: 'string' },
 	    	  { name: 'APRY_DT', type: 'date' },
 	    	  { name: 'APRY_REASON', type: 'string' },
 	    	  { name: 'APRV_PER_CODE', type: 'string' },
 	    	  { name: 'APRV_PER_NM', type: 'string' },
	    	  { name: 'APRV_YN', type: 'string' },
	    	  { name: 'APRV_REASON', type: 'string' },
	    	  { name: 'APRV_DT', type: 'date' },
	    	  { name: 'STAT2', type:'string'}
 	        ],
        datatype: "json",
        id: "SEQ"
    };
    var dataAdapter = new $.jqx.dataAdapter(gvBRCParcelResultSource, {
        downloadComplete: function (data, status, xhr) { },
        loadComplete: function (data) { },
        loadError: function (xhr, status, error) { }
    });
    
    var cellsrendererStatus = function (row, columnfield, value, defaulthtml, columnproperties) {
    	var rowdata = $("#jqxGridParcelResult").jqxGrid('getrowdata',row);
    	
    	var html = '';
		if(value == 'S'){
			html = '<div class="row" style=" text-align: center;">';
			html += '<label> 대기 </label>';
			html += '<button type="button" id="btnParcelResult_' + row + '" stat="'+value+'" row='+row+' class="btn btn-default btn-sm btnParcelResult" ';
			//html += ' row='+row+' class="btn btn-default btn-sm btnParcelResult" ';
			html += ' style="text-align:center;    margin-top: 2px;     padding: 0px 6px;"> ';
			html +=  '<span class="glyphicon glyphicon-list"></span>'
			html += '</button></div> ';	
		}
		else if(value == 'R'){
			html = '<div class="row" style=" text-align: center;">';
			html += '<label> 재신청 </label>';
			html += '<button type="button" id="btnParcelResult_' + row + '" stat="'+value+'" row='+row+' class="btn btn-default btn-sm btnParcelResult" ';
			//html += ' row='+row+' class="btn btn-default btn-sm btnParcelResult" ';
			html += ' style="text-align:center;    margin-top: 2px;     padding: 0px 6px;"> ';
			html +=  '<span class="glyphicon glyphicon-list"></span>'
			html += '</button></div> ';	
		}
		else if(value == 'A'){
			var aprv = rowdata.APRV_YN
			if(aprv == "N"){
				html = '<div class="row" style=" text-align: center;">';
				html += '<label> 반려 </label>';
				html += '<button type="button" id="btnParcelResult_' + row + '" stat="'+value+aprv+'" row='+row+' class="btn btn-default btn-sm btnParcelResult" ';
				//html += ' row='+row+' class="btn btn-default btn-sm btnParcelResult" ';
				html += ' style="text-align:center;    margin-top: 2px;     padding: 0px 6px;"> ';
				html +=  '<span class="glyphicon glyphicon-list"></span>'
				html += '</button></div> ';	
			}
			else if(aprv == "Y"){
				html = '<div class="row" style=" text-align: center;">';
				html += '<label> 승인 </label>';
				html += '<button type="button" id="btnParcelResult_' + row + '" stat="'+value+aprv+'" row='+row+' class="btn btn-default btn-sm btnParcelResult" ';
				//html += ' row='+row+' class="btn btn-default btn-sm btnParcelResult" ';
				html += ' style="text-align:center;    margin-top: 2px;     padding: 0px 6px;"> ';
				html +=  '<span class="glyphicon glyphicon-list"></span>'
				html += '</button></div> ';	
			}
		}
		
    	
    	return html;
    }
    
    var cellsrendererEtc = function (row, columnfield, value, defaulthtml, columnproperties) {
    	var rowdata = $("#jqxGridParcelResult").jqxGrid('getrowdata',row);
    	var applyResult = rowdata;
    	var html ='';
    	
    	if(value == 'S'){
    		html = '<div class="row" style=" text-align: center;    margin-top: 2px">';
			html +=  '-';
			html += '</div> ';	
		}
		else if(value == 'R'){
			html = '<div class="row" style=" text-align: center;    margin-top: 2px">';
			html +=  '-';
			html += '</div> ';	
		}
		else if(value == 'A'){
			var aprv = rowdata.APRV_YN
			if(aprv == "N"){
				html = '<div class="row" style=" text-align: center;    margin-top: 2px">';
				html +=  rowdata.APRY_REASON;
				html += '</div> ';	
			}
			else if(aprv == "Y"){
				html = '<div class="row" style=" text-align: center;    margin-top: 2px">';
				html +=  '<a href="https://aris.amc.seoul.kr/index.html">https://aris.amc.seoul.kr/index.html</a>';
				html += '</div> ';	
			}
		}
    	
    	
        return html;
    }
    
    var cellsrendererNM = function (row, columnfield, value, defaulthtml, columnproperties) {
    	var rowdata = $("#jqxGridParcelResult").jqxGrid('getrowdata',row);
    	var applyResult = rowdata;
    	var html ='';
    	
    	if(isNullOrEmpty(value)){
    		html = '<div class="row" style=" text-align: center;    margin-top: 2px">';
			html +=  '이름없음';
			html += '</div> ';	
		}
    	else{
    		html = '<div class="row" style=" text-align: center;    margin-top: 2px">';
			html +=  value;
			html += '</div> ';	
    	}
        return html;
    }
    
    $("#jqxGridParcelResult").jqxGrid(
    {
    	height : "700",
    	/*width : 465,*/
    	width: "100%",
    	editable: true,
    	theme: 'bootstrap',
    	pageable: true,
    	pagesize: 20,
		pagesizeoptions: ['10', '20', '30', '50', '100'],
    	//showfilterrow : true,
    	selectionmode: 'singlerow',
    	filterable: true,
    	columnsresize: true,
    	columnsautoresize : true,
        source: dataAdapter,
        sortable : true,
        columns: 
        	[
        		{ text: "분양과제분류",align: 'center', cellsalign: 'center' , datafield: 'BUCK_NM', width: '10%' , editable: false},
				{ text: "접수번호", align: 'center', cellsalign: 'center' ,datafield: 'APRY_ID', width: '10%' , editable: false},
				{ text: 'IRB번호',align: 'center', cellsalign: 'center' , datafield: 'IRB_ID', width: '10%', editable: false},
				{ text: '요청일시',align: 'center', cellsalign: 'center' , datafield: 'APRY_DT', width: '10%', editable: false, cellsformat:'yyyy-MM-dd'},
				{ text: '요청자',align: 'center', cellsalign: 'center' , datafield: 'APRY_PER_NM', width: '10%', editable: false, cellsrenderer : cellsrendererNM},
				{ text: '승인자',align: 'center', cellsalign: 'center' , datafield: 'APRV_PER_NM', width: '10%', editable: false, cellsrenderer : cellsrendererNM},
				{ text: '승인여부',align: 'center', cellsalign: 'center' , datafield: 'STAT', width: '10%', editable: false, cellsrenderer: cellsrendererStatus},
				{ text: '승인/반려일자', align: 'center', cellsalign: 'center' ,datafield: 'APRV_DT', width: '10%', editable: false, cellsformat:'yyyy-MM-dd'},
				{ text: '비고', align: 'center', cellsalign: 'center' ,datafield: 'STAT2', editable: false, cellsrenderer : cellsrendererEtc}

          //{ text: '#', datafield: 'CHK' , columntype:'checkbox', width: '5%', editable: true},
          //{ text: 'Freq' , datafield: 'FREQ', width: '15%', editable: false , cellsformat : 'p2' ,cellsrenderer: cellsFreqrenderer}
        ]
    });
}

function getBRCParcelApplyList(){
	var dataView = [];
	var dataSet = {};
	
	dataSet.PER_CODE = $.session.get("PER_CODE");
	dataSet.APRY_YN = "N";
	
	var promise = http('common/modal/selBRCParcelList', 'post', false , dataSet);
	promise.then(function(result){
		console.log(result);
		dataView = result.selBRCParcelList;
		console.log('modal ononon')
		
		gvBRCParcelApplySource.localdata = dataView;
		
		$("#jqxGridParcelApply").jqxGrid('clear');			
		$("#jqxGridParcelApply").jqxGrid('updatebounddata', 'cells');
		
		//var nowDate = getNowDateToString();
		//$('#modalPercelText1').val(nowDate);
	});
	promise.fail(function(e){
		console.log(e);
	});
}

function getBRCBasketList(){
	var dataView = [];
	var dataSet = {};
	
	dataSet.PER_CODE = $.session.get("PER_CODE");
	dataSet.APRY_YN = 'N';
	var promise = http('common/modal/selBaketList', 'post', false , dataSet);
	promise.then(function(result){
		console.log(result);
		dataView = result.selBaketList;
		gvBasketListSource.localdata = dataView;
		
		$("#jqxBasketList").jqxGrid('clear');			
		$("#jqxBasketList").jqxGrid('updatebounddata', 'cells');

		if($("#jqxBasketList").jqxGrid('getrows').length != 0){
			$('#jqxBasketList').jqxGrid('selectrow', 0);
		}
		
	});
	promise.fail(function(e){
		console.log(e);
	});
}

function getBasketDetltList(){
	var dataView = [];
	var dataSet = {};
	
	var selBasketRow 	= $('#jqxBasketList').jqxGrid('getselectedrowindex');			//권한목록
	if(selBasketRow == -1) return;
	var dataBasket = $('#jqxBasketList').jqxGrid('getrowdata', selBasketRow);
	
	dataSet.PER_CODE = $.session.get("PER_CODE");
	dataSet.APRY_YN = "N";
	dataSet.BUCK_SEQ = dataBasket.SEQ;
	
	var promise = http('common/modal/selBRCParcelDetlList', 'post', false , dataSet);
	promise.then(function(result){
		console.log(result);
		dataView = result.selBRCParcelDetlList;

		gvBasketDetlListSource.localdata = dataView;
		
		$("#jqxSelectedbasketList").jqxGrid('clear');			
		$("#jqxSelectedbasketList").jqxGrid('updatebounddata', 'cells');

	});
	promise.fail(function(e){
		console.log(e);
	});
}

function getBasketDetltResultList(){
	var dataSet = {}
	dataSet.BUCK_SEQ = gvSelectedBRCParcelResult.BUCK_SEQ;
	dataSet.PER_CODE = $.session.get("PER_CODE");
	//dataSet.APRY_YN = 'Y';
	
	var promise = http('common/modal/selBRCParcelDetlList', 'post', true , dataSet);
	promise.then(function(result){
		console.log(result);
		dataView = result.selBRCParcelDetlList;
		gvBRCParcelApplyResultSource.localdata = dataView;
		
		$("#jqxGridParcelApplyResult").jqxGrid('clear');			
		$("#jqxGridParcelApplyResult").jqxGrid('updatebounddata', 'cells');
		
		
	});
}

function getBRCParcelResultList(){
	var dataView = [];
	var dataSet = {};
	
	dataSet.PER_CODE = $.session.get("PER_CODE");
	
	var promise = http('common/modal/selBRCParcelResulDetltList', 'post', false , dataSet);
	promise.then(function(result){
		console.log(result);
		dataView = result.selBRCParcelResulDetltList;
		
		gvBRCParcelResultSource.localdata = dataView;
		
		$("#jqxGridParcelResult").jqxGrid('clear');			
		$("#jqxGridParcelResult").jqxGrid('updatebounddata', 'cells');

	});
	promise.fail(function(e){
		console.log(e);
	});
}

function saveApplyBRCparcel(){
	
	var seBasketRow 	= $('#jqxBasketList').jqxGrid('getselectedrowindex');			//권한목록
	var dataBasket = $('#jqxBasketList').jqxGrid('getrowdata', seBasketRow);

	var dataSet = {};
	
	dataSet.PER_CODE = $.session.get("PER_CODE");
	dataSet.STAT = 'S';
	dataSet.APRY_ID = $('#modalPercelText1').val();
	dataSet.BUCK_SEQ = dataBasket.SEQ;
	dataSet.IRB_ID = $('#modalPercelText2').val();
	dataSet.APRY_CONTENT = $('#modalPercelText3').val();;
	dataSet.APRY_PER_CODE = $.session.get("PER_CODE");
	dataSet.APRY_DT = '';
	dataSet.APRY_REASON = '';
	dataSet.APRV_PER_CODE = '';
	dataSet.APRV_YN = '';
	dataSet.APRV_REASON = '';
	dataSet.APRV_DT = '';
	
	var promise = http('common/modal/insertBRCParcelApply', 'post', false , dataSet);
	promise.then(function(result){
		console.log(result);
		
		getBRCParcelResultList();
		

		
	});
	promise.fail(function(e){
		console.log(e);
	});
	
}

function updateBRCParcelBasket(){
	
	var seBasketRow 	= $('#jqxBasketList').jqxGrid('getselectedrowindex');			//권한목록
	var dataBasket = $('#jqxBasketList').jqxGrid('getrowdata', seBasketRow);

	var dataSet = {};
	
	dataSet.PER_CODE = $.session.get("PER_CODE");
	dataSet.BUCK_SEQ = dataBasket.SEQ;
	dataSet.APRY_YN = 'Y';
	dataSet.APRY_ID = $('#modalPercelText1').val();
	var promise = http('common/modal/updateBRCParcelListApply', 'post', false , dataSet);
	promise.then(function(result){
		console.log(result);
	});
	promise.fail(function(e){
		console.log(e);
	});
	
}
function updateBasketList(){
	var seBasketRow 	= $('#jqxBasketList').jqxGrid('getselectedrowindex');			//
	var dataBasket = $('#jqxBasketList').jqxGrid('getrowdata', seBasketRow);
	
	var dataSet = {};
	
	dataSet.PER_CODE = $.session.get("PER_CODE");
	dataSet.APRY_YN = 'Y';
	dataSet.BUCK_NM = dataBasket.BUCK_NM;
	dataSet.SEQ = dataBasket.SEQ;
	var promise = http('common/modal/updateBaketList', 'post', false , dataSet);
	promise.then(function(result){
		getBRCBasketList();
	});
	promise.fail(function(e){
		console.log(e);
	});	
	
}

function saveBasketList(){
	var dataSet = {};
	
//	신규저장	
	if(gvCommand === 'C'){

		var dataSet = {};
		
		dataSet = {
				BUCK_NM:$('#txtBasket_Name').val()
		};
		
		dataSet.PER_CODE = $.session.get("PER_CODE");
		
		var promise = http('common/modal/insertBaketList', 'post', false , dataSet);
		promise.then(function(result){

			showAlert('추가',"추가 되었습니다.",function(e){
				$('#btnBasketClose').trigger('click');
				getBRCBasketList();
			});

		});
		promise.fail(function(e){
			console.log(e);
		});	
		
//	수정		
	}else if(gvCommand === 'U'){

		var dataSet = {};
		
		dataSet = {
				BUCK_NM:$('#txtBasket_Name').val()
		};
		
		dataSet.PER_CODE = $.session.get("PER_CODE");
		dataSet.APRY_YN = 'N';
		
		var promise = http('common/modal/updateBaketList', 'post', false , dataSet);
		promise.then(function(result){
			showAlert('수정',"수정 되었습니다.",function(e){
				$('#btnBasketClose').trigger('click');
				getBRCBasketList();
			});

		});
		promise.fail(function(e){
			console.log(e);
		});	
	
		
	}else if(gvCommand === 'D'){
        var dsPerParcel = $('#jqxSelectedbasketList').jqxGrid('getrows');
		
		var rowindex = $('#jqxBasketList').jqxGrid('getselectedrowindex');
		var data = $('#jqxBasketList').jqxGrid('getrowdata', rowindex);
		
		var dataSet = {};
		
		dataSet = {
				SEQ :data.SEQ
		};
		dataSet.PER_CODE = $.session.get("PER_CODE");
		dataSet.dsPerParcel = dsPerParcel;
		var promise = http('common/modal/deleteBaketList', 'post', false , dataSet);
		promise.then(function(result){
			showAlert('삭제',"삭제 되었습니다.",function(e){
				$('#btnBasketClose').trigger('click');
				getBRCBasketList();
				getBRCParcelApplyList();
			});

		});
		promise.fail(function(e){
			console.log(e);
		});	
		//return;

	}
	
	
}

//------------------------------------------------------------------------------------------
//	EVENT	
//------------------------------------------------------------------------------------------
/**
 * 이벤트 초기화
 * @returns
 */
function brcParcelEventTop(){
	
	
	$('#modalPercelText2').on('keyup',function(e){
		var regnum = /[^0-9]/gi;
		var reg = '/\d{0,4}-\d{0,4}/gi';
		var val = e.keyCode;
		v = $(this).val();
		
		var str = v.replace(regnum, '');
		
		var tmp = '';
		if(str.length < 4) {
			$('#modalPercelText2').val(str);
		}
		else if(str.length >= 4){
			tmp += str.substr(0,4);
			tmp += '-';
			tmp += str.substr(4,4);
			$('#modalPercelText2').val(tmp);
		}
		
		
	});
	
	$('#modalPercelResultText2').on('keyup',function(e){
		var regnum = /[^0-9]/gi;
		var reg = '/\d{0,4}-\d{0,4}/gi';
		var val = e.keyCode;
		v = $(this).val();
		
		var str = v.replace(regnum, '');
		
		var tmp = '';
		if(str.length < 4) {
			$('#modalPercelResultText2').val(str);
		}
		else if(str.length >= 4){
			tmp += str.substr(0,4);
			tmp += '-';
			tmp += str.substr(4,4);
			$('#modalPercelResultText2').val(tmp);
		}
		
		
	});
	$('#btnBRCPercelReApply').on('click',function(){
		if(isNullOrEmpty($('#modalPercelResultText2').val())){
			showAlert('알림','IRB 번호를 입력해주십시오.',null);
			return ;
		}
		
		showConfirm('알림','분양 재신청을 하시겠습니까? 분양 불가능한 검체는 신청에서 제외됩니다.', function(result){
			if(!result){
				return;
			}
			
			var chkRows = $('#jqxGridParcelApplyResult').jqxGrid('getrows');
			for(var i=0; i<chkRows.length; i++){
				if(isNullOrEmpty(chkRows[i].BUCK_SEQ)){
					showAlert('알림','현재 분양 과제 분류를 저장해주십시오.',null);
					return ;
				}
			}
			if(chkRows.length == 0){
				showAlert('알림','현재 분양 과제 분류가 비어있습니다.',null);
				return ;
			}
			
			var dsNewRows = [];
			var dsNoRows = [];
			for(var i=0; i<chkRows.length; i++){
				if(chkRows[i].EXIST_YN != 'N'){
					dsNewRows.push(chkRows[i]);
				}
				else{
					dsNoRows.push(chkRows[i]);
				}
			}
			
			var buckSeq = gvSelectedBRCParcelResult.BUCK_SEQ;
			
			
			//exist_yn = N 삭제
			var dataSet = {};
			
			dataSet.PER_CODE = $.session.get("PER_CODE");
			dataSet.dsNoRows = dsNoRows;
			
			var promise = http('common/modal/deleteBRCApplyList', 'post', false , dataSet);
			promise.then(function(result){				
				console.log(result);
			});
			promise.fail(function(e){
				console.log(e);
			});
			
			
			//새로 추가된 검체 추가
			var dataSet2 = {};
			dataSet2.PER_CODE = $.session.get("PER_CODE");
			dataSet2.BUCK_SEQ = buckSeq;
			dataSet2.APRY_YN = 'Y';
			dataSet2.APRY_ID = $('#modalPercelResultText1').val();
			var promise2 = http('common/modal/updateBRCParcelListApply', 'post', false , dataSet2);
			promise2.then(function(result){
				console.log(result);
			});
			promise2.fail(function(e){
				console.log(e);
			});
			
			
			//신청 결과 수정
			var dataSet3 = {};
			
			dataSet3.SEQ = gvSelectedBRCParcelResult.SEQ;
			dataSet3.STAT = 'R';
			dataSet3.APRY_ID = $('#modalPercelResultText1').val();
			dataSet3.BUCK_SEQ = buckSeq;
			dataSet3.IRB_ID = $('#modalPercelResultText2').val();
			dataSet3.APRY_CONTENT = $('#modalPercelResultText3').val();;
			dataSet3.APRY_PER_CODE = $.session.get("PER_CODE");
			dataSet3.APRY_DT = '';
			dataSet3.APRY_REASON = '';
			dataSet3.APRV_PER_CODE = '';
			dataSet3.APRV_YN = '';
			dataSet3.APRV_REASON = '';
			dataSet3.APRV_DT = '0000-00-00 00:00:00';
			
			var promise3 = http('common/modal/updateBRCApplyResultData', 'post', false , dataSet3);
			promise3.then(function(result){
				console.log(result);
				
				getBRCParcelResultList();
				
				showAlert('알림','재신청이 완료 되었습니다.',null);
				
			});
			promise3.fail(function(e){
				console.log(e);
			});
			
			
		});
	})
	
	$('#btnBRCPercelApply').on('click',function(){
		if(isNullOrEmpty($('#modalPercelText2').val())){
			showAlert('알림','IRB 번호를 입력해주십시오.',null);
			return ;
		}
		
		showConfirm('알림','분양 신청을 하시겠습니까?', function(result){
			if(!result){
				return;
			}
		
			var chkRows = $('#jqxSelectedbasketList').jqxGrid('getrows');
			
			for(var i=0; i<chkRows.length; i++){
				if(isNullOrEmpty(chkRows[i].BUCK_SEQ)){
					showAlert('알림','현재 분양 과제 분류를 저장해주십시오.',null);
					return ;
				}
				if(chkRows[i].REAL_SPCN_RST_CNT == 0){
					showAlert('알림','현재 신청 검체중에 분양 가능 갯수가 0개가 있습니다.',null);
					return ;
				}
			}
			if(chkRows.length == 0){
				showAlert('알림','현재 분양 과제 분류가 비어있습니다.',null);
				return ;
			}
			
			
			var nowDate = getNowDateToString();
			var lastIdx = 0;
			var dataView = [];
			var dataSet = {};
			
			dataSet.PER_CODE = $.session.get("PER_CODE");
			
			var promise = http('common/modal/selBRCParcelResulSeqList', 'post', false , dataSet);
			promise.then(function(result){
				console.log(result);
				dataView = result.selBRCParcelResulSeqList;
				if(!isNullOrEmpty(dataView)){
					lastIdx = dataView[0]*1 + 1;
				}
				
				$('#modalPercelText1').val(nowDate+lastIdx);
				
				saveApplyBRCparcel();
				
				$('#jqxSelectedbasketList').jqxGrid('clear');
			});
			promise.fail(function(e){
				console.log(e);
			});
			
			updateBRCParcelBasket();
			
			updateBasketList();
			
			
			
			$('#modalPercelText1').val('');
			$('#modalPercelText2').val('');
			$('#modalPercelText3').val('');
		});
		
	});
	

	$('#jqxBasketList').on('rowselect', function (event){
		var args = event.args;
		var rowBoundIndex = args.rowindex;
		var rowData = args.row;

		
		var dataSet = {}
		dataSet.BUCK_SEQ = rowData.SEQ;
		dataSet.PER_CODE = $.session.get("PER_CODE");
		dataSet.APRY_YN = 'N';
		
		var promise = http('common/modal/selBRCParcelDetlList', 'post', false , dataSet);
		promise.then(function(result){
			console.log(result);
			dataView = result.selBRCParcelDetlList;

			gvBasketDetlListSource.localdata = dataView;
			
			$("#jqxSelectedbasketList").jqxGrid('clear');			
			$("#jqxSelectedbasketList").jqxGrid('updatebounddata', 'cells');
			
			$("#jqxGridParcelApply").jqxGrid('clear');			
			$("#jqxGridParcelApply").jqxGrid('updatebounddata', 'cells');

		});
		promise.fail(function(e){
			console.log(e);
		});
	
		
		
	});

//	사용자-권한 추가	
	$('#btnPerParcelResultAdd').on('click', function(){
		var selParcelRows 	= $('#jqxGridParcelApplySub').jqxGrid('getselectedrowindexes');		//사용자목록
		var selectedPerParcelRows 	= $('#jqxGridParcelApplyResult').jqxGrid('getrows');					//사용자-권한 목록
		
		var selParcelRowsData = [];
		for(var i=0; i< selParcelRows.length; i++){
			selParcelRowsData.push($('#jqxGridParcelApplySub').jqxGrid('getrowdata', selParcelRows[i]));
		}
		
		for(var i=0; i< selParcelRowsData.length; i++){
			
		//	중복체크	
			for(var j=0; j < selectedPerParcelRows.length; j++){
				var dsPerAuth = selectedPerParcelRows[j];				
				
				if(dsPerAuth.SEQ === selParcelRowsData[i].SEQ){					
					alert(dsPerinx.PER_NAME + '는 이미 추가된 검체입니다...');
					$('#jqxGridParcelApplySub').jqxGrid('clearselection');
					$("#jqxGridParcelApplySub").jqxGrid('clear');			
					$("#jqxGridParcelApplySub").jqxGrid('updatebounddata', 'cells');
					return;
				}
    		}
			
			selParcelRowsData[i].ROW_STATE = 'C';
			
			$("#jqxGridParcelApplyResult").jqxGrid('addrow', selParcelRowsData[i].SEQ, selParcelRowsData[i]);
			$("#jqxGridParcelApplySub").jqxGrid('deleterow', selParcelRowsData[i].SEQ);
			
		}
		$("#jqxGridParcelApplySub").jqxGrid('clearselection');
	});	
	
	
//	권한별 사용자 삭제	
	$('#btnPerParcelResultDel').on('click',function(e){
		showConfirm('권한별 사용자 삭제',COM_0005, function(result){
			if(!result){
				return;
			}
			
			var selectedrowindex = $("#jqxGridParcelApplyResult").jqxGrid('getselectedrowindex');
            var dsPerParcel = $('#jqxGridParcelApplyResult').jqxGrid('getrowdata', selectedrowindex);
    		
    	//	추가된 Row	
    		if(dsPerParcel.ROW_STATE === 'C'){
    			showConfirm('권한별 사용자 삭제','저장되지 않은 검체 입니다.<br>계속 진행하시겠습니까?', function(result){
    				if(!result) {
    	                return;
    	            }
    				
    				var id = $("#jqxGridParcelApplyResult").jqxGrid('getrowid', selectedrowindex);

    				dsPerParcel.ROW_STATE = null;
    				$("#jqxGridParcelApplySub").jqxGrid('addrow', dsPerParcel.SEQ, dsPerParcel,'first');
    				$("#jqxGridParcelApplyResult").jqxGrid('deleterow', id);
    				
    			});
    			
    		}else{
    			var dataSet = {};
        		
        		//dataSet.BUCK_NM = null;
        		dataSet.SEQ = dsPerParcel.SEQ;

        		var promise = http('common/modal/updatefordelBRCParcelList', 'post', false , dataSet);
        		promise.then(function(result){
        			console.log(result);
        			
        		});
        		promise.fail(function(e){
        			console.log(e);
        		});
        		
        		var dataSet2 = {};
        		
        		//dataSet.BUCK_NM = null;
        		dataSet2.SEQ = dsPerParcel.SEQ;
        		dataSet2.APRY_YN = 'N';
        		dataSet2.APRY_DT = '0000-00-00 00:00:00';
        		dataSet2.APRY_ID = '';
        		dataSet2.EXIST_YN = '';
        		dataSet2.PER_CODE = $.session.get("PER_CODE");
        		var promise = http('common/modal/updateOneBRCParcelListApply', 'post', false , dataSet2);
        		promise.then(function(result){
        			console.log(result);
        			$("#jqxGridParcelApplySub").jqxGrid('addrow', dsPerParcel.SEQ, dsPerParcel,'first');
    				$("#jqxGridParcelApplyResult").jqxGrid('deleterow', dsPerParcel.SEQ);
        		});
        		promise.fail(function(e){
        			console.log(e);
        		});
    		}
			
		});
//		
		
	});
	
	
//	추가	
	$('#btnPerParcelAdd').on('click', function(){
		if($('#jqxBasketList').jqxGrid('getselectedrowindex') == -1){
			showAlert('알림','선택된 바구니가 없습니다.',null);
			return;
		}
		
		var selParcelRows 	= $('#jqxGridParcelApply').jqxGrid('getselectedrowindexes');		//사용자목록
		var selectedPerParcelRows 	= $('#jqxSelectedbasketList').jqxGrid('getrows');					//사용자-권한 목록
		
		var selParcelRowsCp = selParcelRows.slice();
		
		var selParcelRowsData = [];
		for(var i=0; i< selParcelRows.length; i++){
			selParcelRowsData.push($('#jqxGridParcelApply').jqxGrid('getrowdata', selParcelRows[i]));
		}
		
		for(var i=0; i< selParcelRowsData.length; i++){
			
		//	중복체크	
			for(var j=0; j < selectedPerParcelRows.length; j++){
				var dsPerAuth = selectedPerParcelRows[j];				
				
				if(dsPerAuth.SEQ === selParcelRowsData[i].SEQ){					
					alert(dsPerinx.PER_NAME + '는 이미 추가된 검체입니다...');
					$('#jqxGridParcelApply').jqxGrid('clearselection');
					$("#jqxGridParcelApply").jqxGrid('clear');			
					$("#jqxGridParcelApply").jqxGrid('updatebounddata', 'cells');
					return;
				}
    		}
			
			selParcelRowsData[i].ROW_STATE = 'C';
			
			$("#jqxSelectedbasketList").jqxGrid('addrow', selParcelRowsData[i].SEQ, selParcelRowsData[i]);
			$("#jqxGridParcelApply").jqxGrid('deleterow', selParcelRowsData[i].SEQ);
		}
		$('#jqxGridParcelApply').jqxGrid('clearselection');
	});	
	
	
//	삭제	
	$('#btnPerParcelDel').on('click',function(e){
		showConfirm('권한별 사용자 삭제',COM_0005, function(result){
			if(!result){
				return;
			}
			
			var selectedrowindex = $("#jqxSelectedbasketList").jqxGrid('getselectedrowindex');
            var dsPerParcel = $('#jqxSelectedbasketList').jqxGrid('getrowdata', selectedrowindex);
    		
    	//	추가된 Row	
    		if(dsPerParcel.ROW_STATE === 'C'){
    			showConfirm('권한별 사용자 삭제','저장되지 않은 검체 입니다.<br>계속 진행하시겠습니까?', function(result){
    				if(!result) {
    	                return;
    	            }
    				
    				var id = $("#jqxSelectedbasketList").jqxGrid('getrowid', selectedrowindex);
        			
    				
    				dsPerParcel.ROW_STATE = null;
    				$("#jqxSelectedbasketList").jqxGrid('deleterow', id);
    				$("#jqxGridParcelApply").jqxGrid('addrow', dsPerParcel.SEQ, dsPerParcel,'first');

    			});
    			
    		}else{
    			var dataSet = {};
        		
        		//dataSet.BUCK_NM = null;
        		dataSet.SEQ = dsPerParcel.SEQ;

        		var promise = http('common/modal/updatefordelBRCParcelList', 'post', false , dataSet);
        		promise.then(function(result){
        			console.log(result);
        			
        			getBasketDetltList();
        			
        			getBRCParcelApplyList();
        			
        		});
        		promise.fail(function(e){
        			console.log(e);
        		});
    		}
			
		});
		
		
	});
	
	$('#btnPerParcelResultSave').on('click',function(){
		showConfirm('권한별사용자저장',COM_0004, function(result){
			if(!result){
				return;
			}
			var selectedPerParcelRows 	= $('#jqxGridParcelApplyResult').jqxGrid('getrows');	//
    		var seBasketRow 	= $('#jqxGridParcelResult').jqxGrid('getselectedrowindex');			//
    		var dataBasket = $('#jqxGridParcelResult').jqxGrid('getrowdata', seBasketRow);
    		
    		var dsAddedList = [];
    		var dsOnlyCnt = [];
    		var dsOnlyDr = [];
    	//	추가된 건만
    		for(var i=0; i< selectedPerParcelRows.length; i++){
    			var dsPerAuth = $('#jqxGridParcelApplyResult').jqxGrid('getrowdata', i);
    			
    			if( dsPerAuth.ROW_STATE === 'C'){
    				dsAddedList.push(dsPerAuth);
    			}
    			if( dsPerAuth.REAL_SPCN_RST_CNT == 1){
    				dsOnlyCnt.push(dsPerAuth);
    				dsOnlyDr.push(dsPerAuth.KOR_NM);
    			}
    		}
    		
    		if(dsOnlyCnt.length != 0){
    			showConfirm('알림',"신청하신 검체 중 마지막 검체가 포함되어 있습니다. <br> <label style='margin:0;'>조직사용동의서 제출이 Y</label>인 건은 집도의 <label style='margin:0;'>" +
    					dsOnlyDr.join("/")+" 선생님</label>에게 동의서 서명을 받아 제출하셔야 합니다.<br> 그래도 신청하시겠습니까?", function(result){
    				if(!result){
    					return;
    				}
    				var dataSet = {};
    	    		
    	    		dataSet.BUCK_SEQ = dataBasket.BUCK_SEQ;
    	    		dataSet.dsPerAuthList = dsAddedList;    	    		
    	    		
    	    		var promise = http('common/modal/updateforinsBRCParcelList', 'post', false , dataSet);
    	    		promise.then(function(result){
    	    			console.log(result);
    	    			getBasketDetltResultList();
    	    		});
    	    		promise.fail(function(e){
    	    			console.log(e);
    	    		});
    	    		
    			});
    		}
    		else{
    			var dataSet = {};
        		
        		dataSet.BUCK_SEQ = dataBasket.BUCK_SEQ;
        		dataSet.dsPerAuthList = dsAddedList;

        		var promise = http('common/modal/updateforinsBRCParcelList', 'post', false , dataSet);
        		promise.then(function(result){
        			console.log(result);
        			
        			getBasketDetltResultList();
        		});
        		promise.fail(function(e){
        			console.log(e);
        		});
    		}
    		
		});
	})
	
//	사용자 권한 저장	
	$('#btnPerParcelSave').on('click',function(){
		showConfirm('바구니별 검체 저장',COM_0004, function(result){
			if(!result){
				return;
			}
			var selectedPerParcelRows 	= $('#jqxSelectedbasketList').jqxGrid('getrows');	//
    		var seBasketRow 	= $('#jqxBasketList').jqxGrid('getselectedrowindex');			//
    		var dataBasket = $('#jqxBasketList').jqxGrid('getrowdata', seBasketRow);
    		
    		var dsAddedList = [];
    		var dsOnlyCnt = [];
    		var dsOnlyDr = [];
    	//	추가된 건만
    		for(var i=0; i< selectedPerParcelRows.length; i++){
    			var dsPerAuth = $('#jqxSelectedbasketList').jqxGrid('getrowdata', i);
    			
    			if( dsPerAuth.ROW_STATE === 'C'){
    				dsAddedList.push(dsPerAuth);
    				
    			}
    			if( dsPerAuth.REAL_SPCN_RST_CNT == 1){
    				dsOnlyCnt.push(dsPerAuth);
    				dsOnlyDr.push(dsPerAuth.KOR_NM);
    			}
    		}
    		
    		if(dsOnlyCnt.length != 0){
    			showConfirm('알림',"신청하신 검체 중 마지막 검체가 포함되어 있습니다. <br> <label style='margin:0;'>조직사용동의서 제출이 Y</label>인 건은 집도의 <label style='margin:0;'>" +
    					dsOnlyDr.join("/")+" 선생님</label>에게 동의서 서명을 받아 제출하셔야 합니다.<br> 그래도 신청하시겠습니까?", function(result){
    				if(!result){
    					return;
    				}
    				var dataSet = {};
    	    		
    	    		dataSet.BUCK_SEQ = dataBasket.SEQ;
    	    		dataSet.dsPerAuthList = dsAddedList;

    	    		var promise = http('common/modal/updateforinsBRCParcelList', 'post', true , dataSet);
    	    		promise.then(function(result){
    	    			console.log(result);
    	    			
    	    			getBasketDetltList();
    	    			
    	    			getBRCParcelApplyList();
    	    			
    	    		});
    	    		promise.fail(function(e){
    	    			console.log(e);
    	    		});
    			});
    		}
    		else{
    			var dataSet = {};
        		
        		dataSet.BUCK_SEQ = dataBasket.SEQ;
        		dataSet.dsPerAuthList = dsAddedList;

        		var promise = http('common/modal/updateforinsBRCParcelList', 'post', true , dataSet);
        		promise.then(function(result){
        			console.log(result);
        			
        			getBasketDetltList();
        			
        			getBRCParcelApplyList();
        			
        		});
        		promise.fail(function(e){
        			console.log(e);
        		});
    		}
    		
		});
		
	});
	
	$('#btnBasketSave').on('click',function(e){
		showConfirm('저장',"저장 하시겠습니까?", function(result){
			if(!result){
				return;
			}
			saveBasketList();
		});
	});
	
//	권한추가	
	$('#btnbasketAdd').on('click',function(e){
		gvCommand = 'C';
		
		$('#exampleBasketModalLabel').text('추가');
		
		$('#txtBasket_Name').val("");
		$("#parcelBasketModal").modal();
		
	});
	
//	권한수정	
	$('#btnbasketUpd').on('click',function(e){
		gvCommand = 'U';
		
		$('#exampleBasketModalLabel').text('수정');
		
		var rowindex = $('#jqxBasketList').jqxGrid('getselectedrowindex');
		var data = $('#jqxBasketList').jqxGrid('getrowdata', rowindex);
		
		$('#txtBasket_Name').val(data.BUCK_NM);
		
		$("#parcelBasketModal").modal();
		
	});
	
//	권한삭제	
	$('#btnbasketDel').on('click',function(e){
		
		gvCommand = 'D';
		
		showConfirm('삭제',COM_0005, function(result){
			if(!result){
				return;
			}
			saveBasketList();
		});
	});	

	
	$('.parcelViewTab').on('show.bs.tab',function(e){
		console.log(e);
		currentParcelNum = $(this).attr("pageNum");
		if(currentParcelNum == '1'){
			var itemTarget = $('#subParcelApply')[0];
			var spinner = new Spinner(gvChartOpts).spin(itemTarget);
			
			getBRCBasketList();
			//getBasketDetltList();
			getBRCParcelApplyList();
						
			spinner.stop();
		}
		else if(currentParcelNum == '2'){
			var itemTarget = $('#subParcelApply')[0];
			var spinner = new Spinner(gvChartOpts).spin(itemTarget);

			getBRCParcelResultList();		
			
			spinner.stop();
		}
	})
	
	$(document).on('click','#parcelDoor',function(){
		
		
		$('#parcelApplyModal').modal('show');
		if($('#jqxBasketList').jqxGrid('getstate') == undefined ||
				$('#jqxSelectedbasketList').jqxGrid('getstate') == undefined ||
				$('#jqxGridParcelApply').jqxGrid('getstate') == undefined ||
				$("#jqxGridParcelResult").jqxGrid('getstate') == undefined ){
			
			setJqxGridBasketList();
			setJqxGridBaskeDetltList();
			setJqxGridBRCParcelApplyList();
			setJqxGridBRCParcelResultList();
		}
		
		
		getBRCBasketList();
		getBasketDetltList();
		getBRCParcelApplyList();
		
	});
	
	$(document).on('click','.btnParcelResult',function(){
		var dataView = [];
		var dataSet = {};
		var rowIdx = $(this).attr("row");
		var rowStat = $(this).attr("stat");
		var rowData = $('#jqxGridParcelResult').jqxGrid('getrowdata', rowIdx);
		gvSelectedBRCParcelResult = rowData;
		$('#parcelApplyResultModal').modal('show');
		if($('#jqxGridParcelApplyResult').jqxGrid('getstate') == undefined ||
				$('#jqxGridParcelApplySub').jqxGrid('getstate') == undefined){
			setJqxGridParcelApplyResultList();
			setJqxGridParcelApplySubList();
		}
		
		var dataSet = {}
		dataSet.BUCK_SEQ = rowData.BUCK_SEQ;
		dataSet.PER_CODE = $.session.get("PER_CODE");
		//dataSet.APRY_YN = 'Y';
		
		var promise = http('common/modal/selBRCParcelDetlList', 'post', false , dataSet);
		promise.then(function(result){
			console.log(result);
			dataView = result.selBRCParcelDetlList;
			gvBRCParcelApplyResultSource.localdata = dataView;
			
			$("#jqxGridParcelApplyResult").jqxGrid('clear');			
			$("#jqxGridParcelApplyResult").jqxGrid('updatebounddata', 'cells');
			
			if(rowStat == 'S' || rowStat == 'R'){
				var rowDataStat = $('#jqxGridParcelApplyResult').jqxGrid('getrows');
				var cntAll = 0;
				var cntY = 0;
				for(var i=0; i<rowDataStat.length; i++){
					var tmpMap = rowDataStat[i];
					if(rowDataStat[i].EXIST_YN == 'Y') cntY += 1;
					cntAll += 1;
				}
				$('#inputParcelApplyCount').val(cntAll);
				$('#inputParcelBRCAprovCount').val(cntY);
				$("#btnPerParcelResultAdd").css('display','none');
				//$("#btnPerParcelResultDel").css('display','none');
				$("#jqxGridParcelApplySub").css('display','none');
				$("#divParcelApplySub").css('display','block');
				
				$("#btnBRCPercelReApply").attr('disabled',true);
				$("#modalPercelResultText2").attr('disabled',true);
				$("#modalPercelResultText3").attr('disabled',true);
				$("#btnPerParcelResultSave").attr('disabled',true);
			}
			else if(rowStat == 'AN'){
				$("#divParcelApplySub").css('display','none');
				$("#btnPerParcelResultAdd").css('display','inline-block');
				//$("#btnPerParcelResultDel").css('display','inline-block');
				$("#jqxGridParcelApplySub").css('display','inline-block');
				
				$("#btnBRCPercelReApply").attr('disabled',false);
				$("#modalPercelResultText2").attr('disabled',false);
				$("#modalPercelResultText3").attr('disabled',false);
				$("#btnPerParcelResultSave").attr('disabled',false);
				
				$("#jqxGridParcelApplySub").jqxGrid('clear');			
				$("#jqxGridParcelApplySub").jqxGrid('updatebounddata', 'cells');
			}
			else if(rowStat == 'AY'){
				var rowDataStat = $('#jqxGridParcelApplyResult').jqxGrid('getrows');
				var cntAll = 0;
				var cntY = 0;
				for(var i=0; i<rowDataStat.length; i++){
					var tmpMap = rowDataStat[i];
					if(rowDataStat[i].EXIST_YN == 'Y') cntY += 1;
					cntAll += 1;
				}
				$('#inputParcelApplyCount').val(cntAll);
				$('#inputParcelBRCAprovCount').val(cntY);
				
				$("#btnBRCPercelReApply").attr('disabled',true);
				$("#modalPercelResultText2").attr('disabled',true);
				$("#modalPercelResultText3").attr('disabled',true);
				$("#btnPerParcelResultSave").attr('disabled',true);
				
				$("#btnPerParcelResultAdd").css('display','none');
				//$("#btnPerParcelResultDel").css('display','none');
				$("#jqxGridParcelApplySub").css('display','none');
				$("#divParcelApplySub").css('display','block');
				
			}
			
			
			
			
			
			
			$('#modalPercelResultText1').val(rowData.APRY_ID);
			$('#modalPercelResultText2').val(rowData.IRB_ID);
			
		});
		promise.fail(function(e){
			console.log(e);
		});
		
	})
}

