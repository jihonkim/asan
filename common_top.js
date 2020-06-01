
/**
 * Application Ready
 */
$(document).ready(function(){
	initEventTop();
	
	
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
function serviceCallback_changePassword(svcId, result){
	if(result.ERR_CD == '-1'){
		showAlert('비밀번호 변경',result.ERR_MSG,null);
		return;
	}
	
	switch(svcId){
		case "changePassword":
			if(result.ERR_CD == '0'){
				showAlert('비밀번호 변경',COM_0030,function(e){
					$('#myPasswordModal').modal('hide');
					location.href=gvCONTEXT + '/dashboard/main';
					return;
				});
			}else if(result.ERR_CD == '1'){
				showAlert('비밀번호 변경',result.ERR_MSG,null);
				return;
			}
			break;
			
		case "changeFirstPassword":
			if(result.ERR_CD == '0'){
				showAlert('비밀번호 변경',COM_0030,function(e){
					$('#myFirstPasswordModal').modal('hide');
					location.href=gvCONTEXT + '/dashboard/main';
					return;
				});
				
			}else if(result.ERR_CD == '1'){
				showAlert('비밀번호 변경',COM_0029,null);
				return;
			}
			break;
			
		case "firstFlagUpdate":
			// 경북대-필수설치 파일다운후 닫기 버튼 클릭시
			$('#myFirstPasswordModal').modal('hide');
			break;
				
		default:
			break;
	
	}
}

//------------------------------------------------------------------------------------------
//	TRANSACTION	
//------------------------------------------------------------------------------------------
/**
 * 비밀번호 변경
 * @returns
 */
function changePassword(svcId,pwdVal)
{
	var dataSet = {};
	
	dataSet.PER_CODE = $.session.get("PER_CODE");
	dataSet.CHANGE_PER_PASS = pwdVal;
	
	callService(svcId, "login/changePassword", dataSet, "serviceCallback_changePassword");
}



//------------------------------------------------------------------------------------------
//	EVENT	
//------------------------------------------------------------------------------------------
/**
 * 이벤트 초기화
 * @returns
 */
function initEventTop(){
	$(document).on('click','.no_permission',function(e){
		//alert('메뉴 접근권한이 없습니다.');
		showAlert('메뉴이동','메뉴 접근권한이 없습니다.',null);
		return;
	});
	
	
	$('#btnMyPassword').on('click', function(){		
		
		$('.border-red').each(function(){
			$(this).removeClass('border-red');
		});
		
		//	변경비밀번호 확인	
		if( isNullOrEmpty($('#myChangePassword').val().replace(/ /g, '')) ){
			$('#myChangePassword').addClass('border-red');
			showAlert('비밀번호 변경',COM_0027,null);
			return;
		}
		
		//	변경비밀번호 확인	
		if( isNullOrEmpty($('#myChangePassword2').val().replace(/ /g, ''))){
			$('#myChangePassword2').addClass('border-red');
			$('#myChangePassword2').focus();
			showAlert('비밀번호 변경',COM_0027,null);
			return;
		}
		
		//	변경비밀번호 확인	
		if($('#myChangePassword').val() != $('#myChangePassword2').val()){
			showAlert('비밀번호 변경',COM_0028,null);
			return;
		}
		
		
		//패턴 체크
		if(pwdChk($('#myChangePassword').val())){
//			Confirm	
			if(!confirm("비밀번호를 변경하시겠습니까?")){
				return;
				
			}
			
			changePassword("changePassword", $('#myChangePassword').val());
		}
		
		
	});
	
	//변경비밀번호 이벤트
	$('#myChangePassword').on('keyup',function(e){

		/*if(pwdChk($(this).val())){		//패턴체크
			$('#pwdMsg').text('적합').addClass('font-color-blue').removeClass('font-color-red');
		}else{
			$('#pwdMsg').text('부적합').addClass('font-color-red').removeClass('font-color-blue');
		}*/
	});
	
	//변경비밀번호 확인 이벤트
	$('#myChangePassword2').on('keyup',function(e){
		console.log($(this).val());

		/*if($(this).val()){
			if(pwdChk($(this).val())){		//패턴체크
				$('#pwdMsg2').text('적합').addClass('font-color-blue').removeClass('font-color-red');
				
				if($(this).val() == $('#myChangePassword').val()){			//입력한 비밀번호 비교
					$('#pwdMsg2').text('일치').addClass('font-color-blue').removeClass('font-color-red');

					if(e.keyCode === 13){	//엔터키 체크
						$('#btnMyPassword').trigger('click');
					}
				}else{		//입력한 비밀번호 비교 else
					$('#pwdMsg2').text('불일치').addClass('font-color-red').removeClass('font-color-blue');
					return;
				}
			}else{		//패턴체크 else
				$('#pwdMsg2').text('부적합').addClass('font-color-red').removeClass('font-color-blue');
				return;
			}
		}*/
				
	});
	
	
	//첫방문 비밀번호 변경 이벤트
	$('#btnMyFirstPassword').on('click', function(){
		$('.border-red').each(function(){
			$(this).removeClass('border-red');
		});
		
		//	변경비밀번호 확인	
		if( isNullOrEmpty($('#myChangeFirstPassword').val().replace(/ /g, '')) ){
			$('#myChangeFirstPassword').addClass('border-red');
			showAlert('비밀번호 변경',COM_0027,null);
			return;
		}
		
		//	변경비밀번호 확인	
		if( isNullOrEmpty($('#myChangeFirstPassword2').val().replace(/ /g, ''))){
			$('#myChangeFirstPassword2').addClass('border-red');
			$('#myChangeFirstPassword2').focus();
			showAlert('비밀번호 변경',COM_0027,null);
			return;
		}
		
		//	변경비밀번호 확인	
		if($('#myChangeFirstPassword').val() != $('#myChangeFirstPassword2').val()){
			showAlert('비밀번호 변경',COM_0028,null);
			return;
		}
		
		changePassword("changeFirstPassword",$('#myChangeFirstPassword').val());

		/*//패턴 체크
		if(pwdChk($('#myChangeFirstPassword').val())){
			
		}else{
			showAlert('비밀번호 변경',COM_0029,null);
			return;
		}*/
		
	});
	
	//첫방문 변경비밀번호 이벤트
	$('#myChangeFirstPassword').on('keyup',function(e){

		if(pwdChk($(this).val())){		//패턴체크
			$('#pwdFirstMsg').text('적합').addClass('font-color-blue').removeClass('font-color-red');
		}else{
			$('#pwdFirstMsg').text('부적합').addClass('font-color-red').removeClass('font-color-blue');
		}
	});
	
	//첫방문 변경비밀번호 확인 이벤트
	$('#myChangeFirstPassword2').on('keyup',function(e){
		console.log($(this).val());

		if($(this).val()){
			if(pwdChk($(this).val())){		//패턴체크
				$('#pwdFirstMsg2').text('적합').addClass('font-color-blue').removeClass('font-color-red');
				
				if($(this).val() == $('#myChangeFirstPassword').val()){			//입력한 비밀번호 비교
					$('#pwdFirstMsg2').text('일치').addClass('font-color-blue').removeClass('font-color-red');

					if(e.keyCode === 13){	//엔터키 체크
						$('#btnMyFirstPassword').trigger('click');
					}
				}else{		//입력한 비밀번호 비교 else
					$('#pwdFirstMsg2').text('불일치').addClass('font-color-red').removeClass('font-color-blue');
					return;
				}
			}else{		//패턴체크 else
				$('#pwdFirstMsg2').text('부적합').addClass('font-color-red').removeClass('font-color-blue');
				return;
			}
		}
				
	});
	
	//비밀번호 변경 모달 열릴때
	$('#myPasswordModal').on('show.bs.modal', function(event){
		//기존 등록값 초기화
		$('#myChangePassword').val('');
		$('#myChangePassword2').val('');
		$('#pwdMsg').text('');
		$('#pwdMsg2').text('');
	});
	
	// 경북대 - 최초 로그인시 - 필수 설치 파일다운 이벤트
	$("#btnRequiredFileDown").on("click", function(){
		window.location = "/bigcenmed2/login/regeditDown";
		$(".modal-footer").show();
	});
	// 경북대 - 최초 로그인시 - 필수설치 파일다운 닫기 이벤트
	// 최초 로그인 체크 FLAG 업데이트
	$("#btnRequiredFileDownClose").on("click", function(){
		var dataSet = {};
		
		dataSet.PER_CODE = $.session.get("PER_CODE");
		dataSet.HOSPITAL_CODE =  $.session.get('HOSPITAL_CODE');
		
		callService("firstFlagUpdate", "login/firstFlagUpdate", dataSet, "serviceCallback_changePassword");
	});
}

var pwdChk = function(val){

	/*var pattern = new RegExp(PWD_PATTERN);
	var flag = false;
	
	if(pattern.test(val)){
		flag = true;
	}else{
		flag = false;
	}*/
	
	return true;
}

var menuFix = function(menu){
	$("."+menu).each(function() {
		$(this).addClass('active');
	});
};

