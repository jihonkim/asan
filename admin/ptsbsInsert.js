/**
 * 사용자관리
 * @Page : ptsbsInsert.jsp
 */


/**
 * Application Ready
 */
$(document).ready(function(){
	getData();
	setinit();
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
	var promise = http('/admin/ptsbsInsert/selectCheckPtsbsMapAll', 'post', true, dataSet);
	promise.then(function(result) {
		console.log(result);
		dataView = result.selectCheckPtsbsMapAll;
		var html = "";
		html += "<table class='table table-bordered' border='1'>";
		html += "<thead ><tr>";
		html += "<th style='text-align: center;'>비코드</th>";
		html += "<th style='text-align: center;'>환자대체번호</th>";
		html += "<th style='text-align: center;'>적용 날짜</th>";
		html += "</tr></thead>";
		html += "<tbody>";
		for(var i=0; i<dataView.length; i++){
			html += "<tr>";
			html += "<td>"+dataView[i].PAT_LAB_NO+"</td>";
			html += "<td>"+dataView[i].PAT_SBST_NO+"</td>";
			html += "<td>"+dataView[i].LDNG_YMD+"</td></tr>";
		}
		html += "</tbody>";
		
		$('#resultExcel').html(html);
	});
	
}



//------------------------------------------------------------------------------------------
//USER FUNCTION	
//------------------------------------------------------------------------------------------



function setinit()
{
	 $("body").on("click", "#upload", function () {
         //Reference the FileUpload element.
         var fileUpload = $("#fileUpload")[0];

         //Validate whether File is valid Excel file. //190910 김지훈 영어이름 정규식 제거
         //var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx|.xlsm)$/;
         var regex = /(.xls|.xlsx|.xlsm)$/;
         if (regex.test(fileUpload.value.toLowerCase())) {
             if (typeof (FileReader) != "undefined") {
                 var reader = new FileReader();

                 //For Browsers other than IE.
                 if (reader.readAsBinaryString) {
                     reader.onload = function (e) {
                         ProcessExcel(e.target.result);
                     };
                     reader.readAsBinaryString(fileUpload.files[0]);
                 } else {
                     //For IE Browser.
                     reader.onload = function (e) {
                         var data = "";
                         var bytes = new Uint8Array(e.target.result);
                         for (var i = 0; i < bytes.byteLength; i++) {
                             data += String.fromCharCode(bytes[i]);
                         }
                         ProcessExcel(data);
                     };
                     reader.readAsArrayBuffer(fileUpload.files[0]);
                 }
             } else {
                 alert("This browser does not support HTML5.");
             }
         } else {
             alert("Please upload a valid Excel file.");
         }
     });
     
}

function ProcessExcel(data) {
    //Read the Excel File data.
    var workbook = XLSX.read(data, {type: 'binary'});

    //Fetch the name of First Sheet.
    var firstSheet = workbook.SheetNames[0];

    //Read all rows from First Sheet into an JSON array.
    //var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
		var excelRows = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet]);
		
    //Create a HTML Table element.
    var table = $("<table class='table table-bordered' />");
    table[0].border = "1";
    
    //Add the header row.
    var row = $(table[0].insertRow(-1));
    
    var headerCell = $("<th style='text-align: center;' />");
    headerCell.html("순번");
    row.append(headerCell);
		
    //Add the header cells.
    var headerCell = $("<th style='text-align: center;' />");
    headerCell.html("비코드");
    row.append(headerCell);

    var headerCell = $("<th style='text-align: center;' />");
    headerCell.html("환자번호");
    row.append(headerCell);

    //dataSet
    var dataList = [];
    $('#resultExcel').html('');
    
    //1번째 row부터 //190910 김지훈 i=3 -> i=1
    for (var i = 1; i < excelRows.length; i++) {
        
        var tmpSet = {};
    	//Add the data row.
        var row = $(table[0].insertRow(-1));
			
			//Row Num 
        var cell = $("<td />");
        cell.html(i);                
        row.append(cell);
			
        //Add the data cells.
        var cell = $("<td />");
        cell.html(excelRows[i]["제공자익명화:제공자바코드"]);                
        row.append(cell);
        tmpSet.PAT_LAB_NO = excelRows[i]["제공자익명화:제공자바코드"];

        cell = $("<td />");
		cell.html(excelRows[i]["제공자익명화:식별번호"]);
        row.append(cell);
        tmpSet.PAT_ID = excelRows[i]["제공자익명화:식별번호"];
        
        dataList.push(tmpSet);
    }

    console.log(dataList);
    

    var dvExcel = $("#dvExcel");
    
    dvExcel.html("");
    dvExcel.append(table);
    
    var promise = http('/admin/ptsbsInsert/selectPtsbsMapping', 'post', true, dataList);
	promise.then(function(result) {
		console.log(result);
	
		var sCnt = result.success;
		var tCnt = result.total;
		
		var dataSet = {};
		var promise = http('/admin/ptsbsInsert/selectCheckPtsbsMapAll', 'post', true, dataSet);
		promise.then(function(result) {
			console.log(result);
			dataView = result.selectCheckPtsbsMapAll;
			var html = "";
			html += "<table class='table table-bordered' border='1'>";
			html += "<thead ><tr>";
			html += "<th style='text-align: center;'>비코드</th>";
			html += "<th style='text-align: center;'>환자대체번호</th>";
			html += "<th style='text-align: center;'>적용 날짜</th>";
			html += "</tr></thead>";
			html += "<tbody>";
			for(var i=0; i<dataView.length; i++){
				if(i<sCnt){
					html += "<tr style='color:red; font-weight: bold;'>";
				}
				else{
					html += "<tr>";
				}
				
				html += "<td>"+dataView[i].PAT_LAB_NO+"</td>";
				html += "<td>"+dataView[i].PAT_SBST_NO+"</td>";
				html += "<td>"+dataView[i].LDNG_YMD+"</td></tr>";
			}
			html += "</tbody>";
			
			$('#resultExcel').html(html);
		});
		
		
		var html2 = "";
		$('#ptsTotal').html('');
		
		html2 += "<span class='badge bg-blue'  style='font-size:14px;'> 전체 : "+ tCnt+"</span> "
		html2 += "<span class='badge bg-red'  style='font-size:14px;'> 성공 : "+ sCnt+"</span>"		
		
		$('#ptsTotal').html(html2);
	});
};

//------------------------------------------------------------------------------------------
//	EVENT	
//------------------------------------------------------------------------------------------
/**
 * 이벤트 초기화
 * @returns
 */
function initEvent(){
	
	
}

