var dialog = {
	alert:{
		title:'Alert',
		error_title:'Error'
	},
	confirm:{
		title:'Confirmation'
	},
	close:{
		timeout:3500
	}
		
}



/**
 * alert messageBox
 * @param title
 * @param message
 * @returns
 */
function showAlert(title, message, callback_func)
{
	if(isNull(title)){
		title = dialog.alert.title;
	}
	
	BootstrapDialog.alert({
		type:BootstrapDialog.TYPE_DEFAULT,
		size: BootstrapDialog.SIZE_NORMAL,
		draggable: true,	
		closable:true,
		autodestroy:true,
		closable:true,
		height:'150px',
        title: '<span style="text-weight:bold;color:black;"><h5>'+title+'</h5></span>',
        message: '<div style="text-align:center;">' + message + '</div>',
        onshown:function(dialogRef){
        	setTimeout(function(){
        		dialogRef.close();	
        	},dialog.close.timeout)
        	
        },
        callback:function(result) {
        	if(isNull(callback_func)){
        		return;
        	}
        	
        	callback_func(result);
        }
    });
}



/**
 * alert messageBox
 * @param title
 * @param message
 * @returns
 */
function showAlertError(title, message, callback_func)
{
	if(isNull(title)){
		title = dialog.alert.error_title;
	}
	
	BootstrapDialog.alert({
		type:BootstrapDialog.TYPE_DANGER,
		size: BootstrapDialog.SIZE_NORMAL,
		draggable: true,	
		closable:true,
		height:'150px',
        title: '<span style="text-weight:bold;color:white;"><h4>'+title+'</h4></span>',
        message: '<div style="text-align:left;overflow-x:scroll;overflow-y:scroll;max-height:400px;">' + message + '</div>',
        callback:function(result) {
        	if(isNull(callback_func)){
        		return;
        	}
        	callback_func(result);
        }
    });
	
}

/**
 * Confirm Yes/No
 * @param title
 * @param message
 * @returns
 */
function showConfirm(title, message, callback_func)
{
	if(isNull(title)){
		title = dialog.confirm.title;
	}
	
	BootstrapDialog.confirm({
        title: title,
        message: message,
        type: BootstrapDialog.TYPE_DEFAULT,
        closable: true,
        draggable: true,
        btnCancelLabel: 'No', 
        btnOKLabel: 'Yes', 
        btnOKClass: 'btn-primary',
        callback: function(result) {
        	callback_func(result);
        }
    });

	
}


/**
 * Confirm  확인/취소
 * @param title
 * @param message
 * @returns
 */
function showConfirmOkCancel(title, message, callback_func)
{
	if(isNull(title)){
		title = dialog.confirm.title;
	}
	
	BootstrapDialog.confirm({
        title: title,
        message: message,
        type: BootstrapDialog.TYPE_DEFAULT,
        closable: true,
        draggable: true,
        btnCancelLabel: '취소', 
        btnOKLabel: '확인', 
        btnOKClass: 'btn-primary',
        callback: function(result) {
        	callback_func(result);
        }
    });

	
}

function showDialog(type, title, message, callback_func)
{
	var html = '';
	
	html = '';
	
	BootstrapDialog.show({
		type:BootstrapDialog.TYPE_DEFAULT,
		size: BootstrapDialog.SIZE_WIDE,
		draggable: true,				
        title: '<span style="text-weight:bold;color:black;"><h3>'+title+'</h3></span>',
        message: '<div style="height:400px;overflow-y:scroll;">' + message + '</div>',
        buttons: [{
            label: '닫기',
            action: function(dialog) {
            	dialog.close();
            }
        }],
        callback:callback_func           
    });
}


function print_bigcenmed(obj){
	console.log(obj);
	
}

