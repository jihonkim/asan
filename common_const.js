var context = '';
var gvSERVER 	= 'https://precision.amc.kr/';
var gvCONTEXT 	= '/pmp';
var gvPERINX	= {};								/* 사용자정보 */
var gvAUTINX 	= {};								/* 권한정보 */
var gvMNUINX 	= [];								/* 메뉴목록 */
var gvAUT_CODE 	= '';								/* 권한목록 */
var gvINSTCD_YN = 'N';
var gvPAT_SBST_NO = '';
var gvSEARCH_YN = '';
var gvSplitChar = '##';								/* 멀티 팝업에서 사용할 문자 */
var gvINSTCD    = '030';
var gvINSTCDTemp1    = "'031,032'";					//사업장 전체 코드1 
var gvINSTCDTemp2    = "'031','032'";				//사업장 전체 코드2
var gvPAT_SBST_NO_SIZE = 9;
var gvBASE_DT_TIMESTAMP_YN = 'Y';
var gvIS_NULL_OR_BLANK_YN = 'Y';
var gvREGISTRY_YN = 'N';							//레지스트리 사용유무


/*-----------------------------------------------*/
/* CODE
/*-----------------------------------------------*/
var gvStudyCode = {
	'CS' : '단면연구',
	'CH' : '코호트연구',
	'CC' : '사례대조'
};

var gvSaveCode = {
	'SC' : '환자조회',
	'SI' : '연구조회'
};

var gvSummaryColor = [
                      'bg-green',
                      'bg-blue',
                      'bg-purple',
                      'bg-black',
                      'bg-yellow',
                      'bg-red'
                      ];

var gvSummaryIcon = [
                      'fa-bed',
                      'fa-stethoscope',
                      'fa-plus-square',
                      'fa-database',
                      'fa-medkit',
                      'fa-heartbeat',
                      'fa-user',
                      'fa-cube'
                      ];

var gvWidth = {
	3 	: '25%',
	6 	: '50%',
	12 	: '100%'
}



//모달창 CateDetl_seq번호에 따라 그리드 및 레벨클릭이벤트 제어
var gvCateDetl_seq = {
		'11' : '1',
		'4' : '2'
};

//첨부파일 확장자 제한
var gvFileExt = ['jsp', 'js'];

//첨부파일 용량 제한
var gvFileSize = 1024 * 1024 * 20;

//승인 > 추출목적 selectbox
var gvPURPOSE_CD_UUH  = {1:"업무용", 2:"심사용", 3:"타기관전송용", 4:"연구용", 5:"통계용", 6:"기타"}
var gvPURPOSE_CD_KUH  = {1:"업무용", 4:"연구용", 5:"통계용", 6:"기타"}
/*-----------------------------------------------*/
/* Message
/*-----------------------------------------------*/
var COM_0001 = "저장 되었습니다.";
var COM_0002 = "수정 되었습니다.";
var COM_0003 = "삭제 되었습니다.";
var COM_0004 = "저장 하시겠습니까?";
var COM_0005 = "삭제 하시겠습니까?";
var COM_0006 = "검색어를 입력하세요.";
var COM_0007 = "더 이상 삭제 할 수 없습니다.";
var COM_0008 = "저장이 안되었습니다. <br>다시 시도해 주세요.";
var COM_0009 = "삭제가 안되었습니다. <br>다시 시도해 주세요.";
var COM_0010 = "필수항목입니다.";
var COM_0011 = "Query 실행이 성공 하였습니다.";
var COM_0012 = "Query 실행이 실패 하였습니다.";
var COM_0013 = "추가해 주세요.";
var COM_0014 = "입력해 주세요.";
var COM_0015 = "체크된 항목이 없습니다.";
var COM_0016 = "타인이 공유한 조건은 삭제 할 수 없습니다.";
var COM_0017 = "공유할 항목을 선택해주세요.";
var COM_0018 = "한번에 하나의 조건만 공유 가능합니다.";
var COM_0019 = "하위코드만 선택 가능합니다.";
var COM_0020 = "2글자 이상 입력해 주세요.";
var COM_0021 = " 데이터를 승인요청 하시겠습니까?";
var COM_0022 = "승인이 요청되었습니다.";
var COM_0023 = "선택해 주세요.";
var COM_0024 = "아래의 이유로 승인이 거부되었습니다.";
var COM_0025 = "승인 심사 중 입니다.";
var COM_0026 = "서버와의 연결이 끊어졌습니다. 다시 접속해 주시기 바랍니다.";
var COM_0027 = "비밀번호를 입력해 주세요.";
var COM_0028 = "변경할 비밀번호가 서로 일치하지 않습니다.";
var COM_0029 = "비밀번호 패턴이 맞지 않습니다.";
var COM_0030 = "비밀번호가 변경되었습니다.";
var COM_0031 = "최소 한건이상 있어야 합니다.";
var COM_0032 = "날짜 포맷이 부적합 합니다.";
var COM_0033 = "서로 다른 중분류는 그룹이 될 수 없습니다.";
var COM_0034 = "보다 클 수 없습니다.";
var COM_0035 = "보다 작을 수 없습니다.";
var COM_0036 = "전체공유 또는 과공유 조건은 데이터를 저장할 수 없습니다.<br>개인조건 저장후 데이터를 저장 하시기 바랍니다.";
var COM_0037 = "검색결과가 없습니다.";
var COM_0038 = "조회조건 또는 연구항목을 먼저 저장하시기 바랍니다.";
var COM_0039 = "이미 추가된 항목입니다.";
var COM_0040 = "초기화 하시겠습니까?";
var COM_0041 = "더 이상 추가 할 수 없습니다.";
var COM_0042 = "기존 데이터가 존재합니다.<br/>데이터를 초기화 하시겠습니까?";
var COM_0043 = "로그인 시간이 연장되었습니다.";
var COM_0044 = "시작일자가 종료일자보다 클 수 없습니다.";
var COM_0045 = "중복된 조건이 있습니다. 다른 명칭으로 저장해 주시기 바랍니다.";
var COM_0046 = "중복 데이터가 존재 합니다.";
var COM_0047 = " 데이터를 삭제 하시겠습니까?<br/>삭제된 데이터는 복구가 불가능 합니다.";



//사업장 코드
var gvArrInstcd = ['031','032'];
//사업장 코드
var gvArrInstcdKor = ['본원','칠곡'];

//사업장 명
var gvArrInstcdNm = {'031':'본원', '032':'칠곡'};



//mutation mapper color arr
var mutationColor = ["#2dcf00","#ff5353","#5b5bff","#ebd61d","#ba21e0","#ff9c42","#ff7dff","#b9264f","#baba21","#c48484","#1f88a7","#cafeb8","#4a9586","#ceb86c","#0e180f"];