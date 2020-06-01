/**
 * CommonUtils
 * @param svcId
 * @param requestUrl
 * @param paramData
 * @param callback
 * @returns
 */



function isNull(param){
	if(typeof param === 'undefined' || param === null || param.length < 1){
		return true;
		
	}else{
		return false;
	}
	
	
}


/**
 * Description : argument가 null 또는 undefined 이면 true
 */
function isNullOrEmpty(param){
	if(typeof param === 'undefined' || param === null || param === '' || param.length < 1){
		return true;
		
	}else{
		return false;
	}
	
	
}

/**
 * Description : selectbox 만들기, (id, 데이터 {key:value},value,option name)
 * data  = [
 * 	{"UDT_DT":1491983880000,"CRT_ID":"0000000","AUT_CODE":"AUT-001","AUT_NAME":"권한001","CRT_DT":1491983880000,"UDT_ID":"0000000"},
 * 	{"UDT_DT":1492056471000,"CRT_ID":"0000000","AUT_CODE":"AUT-002","AUT_NAME":"권한002","CRT_DT":1492056471000,"UDT_ID":"0000000"}
 * ]
 */
var makeSelectBox = function(id, data, val, optionName){	
	for(var i=0; i<data.length; i++){
		$("#"+id).append("<option value='" + data[i][val] + "'>" + data[i][optionName] + "</option>");
	}
};

/**
 * Description : iCheck를 이용한 checkbox, radio 버튼 만들기 ex)makeiCheck('.fileChk, .viewChk');
 */
var makeiCheck = function(vClass){	
	$(vClass).iCheck({
		checkboxClass: 'icheckbox_square-green',
		radioClass: 'iradio_square-green',
		increaseArea: '20%' // optional
	});
};

var makeiCheckBlue = function(vClass){	
	$(vClass).iCheck({
		checkboxClass: 'icheckbox_square-blue',
		radioClass: 'iradio_square-blue',
		increaseArea: '20%' // optional
	});
};

/**
 * Description : iCheck를 이용한 checkbox 버튼 HTML 만들기 id:append될 id명, col:div크기, vName:체크박스 이름, val:value
 * vClass:class명, description:표시되는 이름 ex)
 */
var makeCheckBoxForiCheck = function(id, col, vName, val, vClass, description){	
	var makeHtml = "";
	makeHtml = makeHtml + "<div class='col-sm-" + col + "'>";
	makeHtml = makeHtml + "<div class='form-group'>";
	makeHtml = makeHtml + "<label class='font-weight-100 margin-right-10'>";
	makeHtml = makeHtml + "<input type='checkbox' name='" + vName + "' value='" + val + "' class='minimal " + vClass + "' style='position: absolute; opacity: 0;'>";
	makeHtml = makeHtml + "&nbsp;" + description;
	makeHtml = makeHtml + "</label>";
	makeHtml = makeHtml + "</div>";
	makeHtml = makeHtml + "</div>";
	
	$('#'+id).append(makeHtml);
};

/**
 * 
 * @param compId
 * @param compData
 * @param code
 * @param text
 * @param defaultCode
 * @param defaultText
 * @returns
 */
function setComboList(compId, compData, code, text, defaultCode, defaultText)
{
	if(isNullOrEmpty(compId)){
		return;
		
	}
	
	/*if(isNullOrEmpty(compData)){
		return;
		
	}*/
	
	if(isNullOrEmpty(code) || isNullOrEmpty(text)){
		return;
		
	}
	
	var $select = $('#' + compId);
	
	$select.empty();
	
	if(!isNullOrEmpty(defaultText)){
		var $option = $('<option/>');
		
		$option.attr("value",'');
		$option.text(defaultText);
		
		$select.append($option);
	}
	
	
	for(var i=0; i < compData.length; i++){
		var $option = $('<option/>');
		
		$.each(compData[i],function(key,value) {
			
			if(code === key){
				$option.attr("value",value);
			}
			
			if(key === text){
				$option.text(value);
			}
			
			$select.append($option);
		});
	}
}

/**
 * 
 * @param condition
 * @param ifTrueFunc
 * @param ifFalseFunc
 * @returns
 */
function iif(condition, trueValue, falseValue)
{
	if (condition){
		return trueValue;
	}
	
	return falseValue;
}


/**
 * 
 * @param str
 * @param defaultVal
 * @returns
 */
function nvl(str, defaultVal) {
    var defaultValue = "";
     
    if (typeof defaultVal != 'undefined') {
        defaultValue = defaultVal;
    }
     
    if (typeof str == "undefined" || str == null || str == '' || str == "undefined") {
        return defaultValue;
    }
     
    return str;
}

//화살표 첫번째와 마지막 disabled 처리
var arrowDisable = function(){
	$('.btnOrderUp:first').attr("disabled", true);
	$('.btnOrderDown:last').attr("disabled", true);
};
  

/**
 * Form to JSON Data name, value
 */
$.fn.formToJson = function()
{
	var array = $(this).serializeArray();
    var json = {};
    
    
    jQuery.each(array, function() {
    	json[this.name] = this.value || '';
    });
    
    return json;
}

/**
 * JSON to FORM
 */
$.fn.JsonToForm = function(data)
{
	for(var i in data){
		$('input[name="'+i+'"]').val(data[i]);

	}
}


//숫자 세자리마다 콤마(,) 찍기
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

//날짜 체크
var isDate = function(str){
	var pattern = /^([0-9]){4}[-/]([0-9]){2}[-/]([0-9]){2}$/;

	var myFlag = "";
	
	if(pattern.test(str)) {
		myFlag = true;
	}else{
		myFlag = false;
	}
	
	return myFlag;
};

var gvServerDate;


/**
 * 서버날짜 조회
 * @returns
 */
function getServerDate()
{
	var dataSet = {};
	
	callServiceSync("getServerDate"
					,"common/sys/getServerDate"
					,dataSet
					,"serviceCallback_common");
	
	return gvServerDate;
	
	
}

/**
 * 공통서비스 콜백
 * @param svcId
 * @param result
 * @returns
 */
function serviceCallback_common(svcId, result){
	if(svcId == 'getServerDate'){
		gvServerDate = result.dsServerDate;
		
	}
	
}

/**
 * Number format
 * @param svcId
 * @param result
 * @returns
 */
function numberFormat(val){
	if(!isNullOrEmpty(val)){
		while (/(\d+)(\d{3})/.test(val.toString())){
			val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
	    }	
	}
	
    return val;
}


function getNowDateToString(){
	var d = new Date(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear(),
    hour = d.getHours(),
    min = d.getMinutes(),
    sec = d.getSeconds();
	
	
	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;
	
	return (year+month+day+hour+min+sec).toString();
}

/**
 * 
 * @param date
 * @returns
 */
function getDateToString(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

/**
 * 
 * @param date
 * @returns
 */
function getDateTimeToString(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    	hour = d.getHours();
    	min = d.getMinutes();
    	sec = de.getSeconds();
    	
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}


//승일알림 세팅
var makeApprove = function(APVCOUT, APVLIST){
	$('#approveCount').text(APVCOUT);
	$('#approveCount2').text(APVCOUT);
	
	
	for(var i=0; i<APVCOUT; i++){
		var approveItemHTML = "";
		
		approveItemHTML = approveItemHTML + '<li class="approveItem">';
		approveItemHTML = approveItemHTML + '<ul class="menu">';
		approveItemHTML = approveItemHTML + '<li>';
		approveItemHTML = approveItemHTML + '<a href="'+ gvCONTEXT +'/admin/approveMgmt/approveMgmtMain?SEQ=9&UPPER_SEQ=0">';
		approveItemHTML = approveItemHTML + '<i class="fa fa-paper-plane text-aqua"></i> <b>'+ APVLIST[i].CONDT_NM +' > '+ APVLIST[i].DATA_NM +'</b>';
		approveItemHTML = approveItemHTML + '<br>';
		approveItemHTML = approveItemHTML + APVLIST[i].PER_NAME +'['+ APVLIST[i].DEPT_NAME +']';
		approveItemHTML = approveItemHTML + '<br>';
		approveItemHTML = approveItemHTML + APVLIST[i].RSCH_DT;
		approveItemHTML = approveItemHTML + '</a>';
		approveItemHTML = approveItemHTML + '</li>';
		approveItemHTML = approveItemHTML + '</ul>';
		approveItemHTML = approveItemHTML + '</li>';
		
		$('#approveArea').append(approveItemHTML);
	}
	
};


//파일용량 표기
function number_to_human_size(x) {
	var s = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'];
	var e = Math.floor(Math.log(x) / Math.log(1024));
	return (x / Math.pow(1024, e)).toFixed(2) + " " + s[e];
};


//get 파라미터 가져오기
function getQuerystring(paramName){ 
	var _tempUrl = window.location.search.substring(1); //url에서 처음부터 '?'까지 삭제 
	var _tempArray = _tempUrl.split('&'); // '&'을 기준으로 분리하기 
	
	if(_tempUrl){
		for(var i = 0; _tempArray.length; i++) { 
			var _keyValuePair = _tempArray[i].split('='); // '=' 을 기준으로 분리하기 
			if(_keyValuePair[0] == paramName){ // _keyValuePair[0] : 파라미터 명 // _keyValuePair[1] : 파라미터 값 
				return _keyValuePair[1]; 
			}
		}
	}else{
		return "";
	}
}


//파라미터 값으로 데이터 자동 로딩 (승인관리, 차트리뷰, 데이터 다운로드)
function paramOnLoad(param){
	if(param){
		$('#row_'+param).trigger('click');
	}
}

//메뉴 seq값 받아오기
function findMenuSeq(url){
	var val;	
	for(var i=0; i<vMNUINX.length; i++){
		if(vMNUINX[i].MENU_URL == url){
			val = vMNUINX[i].SEQ;
			break;
		}
	}	
	return val;
}

//메뉴 upper_seq값 받아오기
function findMenuUpperSeq(url){
	var val;	
	for(var i=0; i<vMNUINX.length; i++){
		if(vMNUINX[i].MENU_URL == url){
			val = vMNUINX[i].UPPER_SEQ;
			break;
		}
	}	
	return val;
}

//replace All 원문, 대체할문자, 대체될문자
function replaceAll(str, searchStr, replaceStr) {
    return str.split(searchStr).join(replaceStr);
}

//승인요청SNS연동  '조건seq', '데이터seq', '조건명', '데이터명', '추출목적', '사용자ID', '사용자명'
function callSNS_USER(CONT_SEQ, SEQ, CONDT_NM, DATA_NM, PURPOSE_CD, PER_CODE, PER_NAME){
	console.log(CONT_SEQ);		//'조건seq'
	console.log(SEQ);			//데이터seq
	console.log(CONDT_NM);		//조건명
	console.log(DATA_NM);		//데이터명
	console.log(PURPOSE_CD);	//추출목적
	console.log(PER_CODE);		//사용자ID
	console.log(PER_NAME);		//사용자명
}

//승인관리SNS연동		'승인자ID', 	'승인자명', '승인결과', '조건명','조건 seq','데이터 seq','요청자 부서','요청자ID','요청자명','추출목적','사유'
function callSNS_ADMIN(ADMIN_PER_CODE, ADMIN_PER_NAME, APRV_YN, CONDT_NM, CONT_SEQ, DATA_SEQ, DEPT_NAME, PER_CODE, PER_NAME, PURPOSE_CD, REJT_REASON){
	console.log(ADMIN_PER_CODE);	//승인자ID
	console.log(ADMIN_PER_NAME);	//승인자명
	console.log(APRV_YN);			//승인결과
	console.log(CONDT_NM);			//조건명
	console.log(CONT_SEQ);			//조건 seq
	console.log(DATA_SEQ);			//데이터 seq
	console.log(DEPT_NAME);			//요청자 부서
	console.log(PER_CODE);			//요청자ID
	console.log(PER_NAME);			//요청자명
	console.log(PURPOSE_CD);		//추출목적
	console.log(REJT_REASON);		//사유
}



//관리자여부체크
function isAdmin(){
	var ret = false;
	var autList = gvAUT_CODE.split(',');
	
	for(var i=0; i < autList.length; i++){
		if(autList[i] === 'ADMIN'){
			ret = true;
			break;
		}
	}
	return ret;
}


//날짜 계산 miners:빼기, plus:더하기
var getDateForMonth = function(appendId, num, item){
	
	var myDate = moment().subtract(num, item).format('YYYY-MM-DD');
		
	$('#'+appendId).val(myDate);
}



/**
 * 병원구분코드명조회
 * @param instcd
 * @returns
 */
function getInstcdName(instcd)
{
	var retVal = '';
	
	if(isNull(instcd)){
		retVal = '전체';
		
	}else{
		if(instcd === '031'){
			retVal = gvArrInstcdKor[0];
			
		}else if(instcd === '032'){
			retVal = gvArrInstcdKor[1];
			
			
		}else{
			retVal = '전체';
		}
	}
	
	return retVal;
}

/*
//사업장 명
var gvArrInstcdNm = {'031':'본원', '032':'칠곡'};*/

function gfn_lpad(str, len) {
    str = str + "";

    while (str.length < len) {
        str = "0" + str;
    }

    return str;

}

var gvItemTextList = new Array();

function getOrgItemNmList(){
	var table = $('#gridStudyItem').DataTable();	//연구항목 테이블
	
	gvItemTextList = new Array();
	
	var i=0;
	
	table.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
		var data = this.data();
		var node = this.node();
		
		gvItemTextList[i] = '연구항목' + (i+1);
		
		$(node).find("td input").each(function (){
			var cellData = this.value;
			
			if(this.name.indexOf('txtITEM_TEXT') >= 0){
				gvItemTextList[i] = cellData;
				
				if(!isNull(data.INPUT_VAL0)){
					$(this).val(data.INPUT_VAL0);
				}
			}	
		});
		
		i++;
	});
	
}


//연구항목 번호추가
function makeStudyNum(mode){
	var table = $('#gridStudyItem').DataTable();	//연구항목 테이블
	var i = 0;
	
	
	
	
//	Group, Append, Reorder	
	/*if(mode === 'G' || mode === 'N' || mode === 'R'){
		getOrgItemNmList();
	}
	
	$('.studyNum').each(function(){
		console.log('>>>' + i + ":::::" + gvItemTextList[i]);
		
		var html = '';
		
		html = '<input type="text" class="form-control input_text" ';
		html += 'id="txtITEM_TEXT_'+(i+1)+'" ';
		html += 'name="txtITEM_TEXT" ';
		
		if(isNull(gvItemTextList)){
			html += 'value="연구항목'+(i+1)+'">';
			
		}else{
			//연구항목에 추가
			if(i > (gvItemTextList.length - 1)){
				html += 'value="'+gvItemTextList[i]+'">';
				
			}else{
				if(gvItemTextList[i].indexOf('연구항목') >= 0){
					html += 'value="연구항목'+(i+1)+'">';
					
				}else{
					html += 'value="'+gvItemTextList[i]+'">';
				}	
			}
		}
		
		$(this).html(html);
		
		i++;
	});
		
	
	table.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
		var data = this.data();
		var node = this.node();
		
		$(node).find("td input").each(function (){
			var cellData = this.value;
			
			if(this.name.indexOf('txtITEM_TEXT') >= 0){
				if(!isNull(data.INPUT_VAL0)){
					if(data.INPUT_VAL0 != cellData && cellData.indexOf('연구항목') < 0){	//저장된 데이터와 화면 데이터가 다르면 화면 데이터로 설정
						$(this).val(cellData);	
						
					}else{
						$(this).val(data.INPUT_VAL0);
						
					}
					
					
				}
			}	
		});
	});*/
}


function initTimer(){
    var timer = document.getElementById("timer");
    var timer2 = document.getElementById("timer2");
    rHour = parseInt(gvTIME_OUT / 3600);
    rHour = rHour % 60;
    rMinute = parseInt(gvTIME_OUT / 60);
    rMinute = rMinute % 60;
    rSecond = gvTIME_OUT % 60;
    
    if(gvTIME_OUT == "600"){	//5분전 알림 modal
        $('#mySessionModal').modal('show');
    }
    
    var myPer = 100-(gvTIME_OUT/2400*100);

    $('#sessionProgress').attr('aria-valuenow',myPer).css('width',myPer+"%");

    if (gvTIME_OUT > 0) {
    	var html = '';
    	
    	html += '&nbsp;';
    	html += gfn_lpad(rMinute, 2) + " :";
    	html += '&nbsp;';
    	html += gfn_lpad(rSecond, 2) + " ";
    	
    	if(!isNull(timer)){
    		timer.innerHTML = html;	
    	}
    	//timer2.innerHTML = html;
    	
	//	timer.innerHTML = "&nbsp;" + gfn_lpad(rHour, 2) + "시간 " + gfn_lpad(rMinute, 2) + "분 " + gfn_lpad(rSecond, 2) + "초 ";
        gvTIME_OUT--;
        gvTIME_CHECK = setTimeout("initTimer()", 1000); // 1초 간격으로 체크

    } else {
    	location.href = gvCONTEXT+"/login/logout"; 

    }

}


function clearTimer() {
	gvTIME_OUT = 1200;
}


function refreshTimer(){
	var dataSet = {};
	callServiceSync("sessionExtend","/login/sessionExtend",dataSet,"serviceCallback_topForPage");
	
	
}

window.showModal = function(){
	var dlg = $('#mySessionModal').modal();
	console.log(dlg.innerHTML())
	dlg.find('.modal-title').text('로그인 연장');
	dlg.modal('show');
};


/**
 * 
 * @param obj
 * @param input
 * @returns
 */
function showDatePicker(obj, input)
{
//	$(obj).datepicker('remove'); //detach

	$(obj).datepicker({
		showOnFocus:false,
		format: 'yyyy-mm-dd',
		todayHighlight:true,
		autoclose:true
		
	}).on('changeDate', function(e){
		var date = $(this).datepicker('getDate');
		var formatDate = getDateToString(date);
		
		$('#' + input).val(formatDate);
		$(this).datepicker('hide');
		
	});
	
	$(obj).datepicker('show');	
}

/**
 * 시작일 종료일 체크
 * @param start
 * @param end
 * @returns
 */
function validateStartEndDate(start,end){
	var v1=start.split("-");
	var v2=end.split("-");

    var a1 = new Date(v1[0],v1[1],v1[2]).getTime();
    var a2 = new Date(v2[0],v2[1],v2[2]).getTime();

    if(a1<a2||a2 == ''){
    	return true;
    }else{
    	return false;
    }
} 

function makeJson(key, val){
	var json = {};
	json[key] = val;
	
	return json;
}

function setCookie(cookieName, value, exdays){
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var cookieValue = escape(value) + ((exdays==null) ? "" : "; expires=" + exdate.toGMTString());
    document.cookie = cookieName + "=" + cookieValue;
}
 
function deleteCookie(cookieName){
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() - 1);
    document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString();
}
 
function getCookie(cookieName) {
    cookieName = cookieName + '=';
    var cookieData = document.cookie;
    var start = cookieData.indexOf(cookieName);
    var cookieValue = '';
    if(start != -1){
        start += cookieName.length;
        var end = cookieData.indexOf(';', start);
        if(end == -1)end = cookieData.length;
        cookieValue = cookieData.substring(start, end);
    }
    return unescape(cookieValue);
}

