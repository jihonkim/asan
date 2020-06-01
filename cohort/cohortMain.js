var gvItemContList = [];
var gvCategoryList = [];


$(document).ready(function(){
	
	cohortInit();
	
	
	cohortInitEvent();
	
	
});

function cohortInit(){

   
/*   var dataSet = {};
   var promise = http('cohort/cohortAnalysisList', 'post', true,	dataSet);
	promise.then(function(result) {
		 console.log(result);
	});*/
	
}

function setInitCohortListGrid() {
	
	var dataSet = {};
	
	dataSet.SEARCH_METH_CD = 'CS';		
	dataSet.SEARCH_PER_CODE = $.session.get('PER_CODE');		
	dataSet.SEARCH_DEPT_CODE = $.session.get('DEPT_CODE');
	
	var dataSet = {};
	   var promise = http('common/sys/getItemContTreeList', 'post', false,	dataSet);
		promise.then(function(result) {
			gvItemContList = [];
			if(!isNull(result.dsItemContTreeList)){
				for(var i=0; i < result.dsItemContTreeList.length; i++){
					var dsItemCont = result.dsItemContTreeList[i];
					/*
					//CDW_PERSONAL_SHARE_YN_CD == 'N'이면 개인공유기능 숨김
					if(gvPersonalShareYnList[0].VALUE === 'N'){
						if(dsItemCont.parentid === 'S' || dsItemCont.id === 'S'){
							continue;
							
						}
					}*/
					gvItemContList.push(dsItemCont);
				}
			}
		});
	
	
	
	var source = {
	        datatype: "json",
	        datafields: [
	            { name: 'id' },
	            {name : 'icon'}, 
	            { name: 'parentid' },
	            { name: 'text' },
	            { name: 'value' },
	            { name: 'PER_CODE'},
	            { name: 'DEPT_CODE'}
	        ],
	        id: 'id',
	        localdata: gvItemContList

	    };
		
		var treeAdapter = new $.jqx.dataAdapter(source);
		
		treeAdapter.dataBind();
		
		var records = treeAdapter.getRecordsHierarchy('id', 'parentid'
													 ,'items'
													 ,[{name : 'text',map : 'label'}, {name : 'value',map : 'value'}]);
														
		$('#jqxCohortList').jqxTree({
			allowDrag : true,
			allowDrop : false,
			width : '100%',
			height : '400',
			source : records,
			checkboxes : true,
			hasThreeStates : true,
			animationShowDuration : 0,
			animationHideDuration : 0
		});
		
		
		$('#jqxCohortList').on('expand', function(event) {
			var args = event.args;
			var item = $('#jqxCohortList').jqxTree('getItem', args.element);
			var label = item.label;
			var icon = item.icon;
			var id = item.id;
			var parentId = item.parentId;
			var boo = false;
			
			var isIcon = $("#jqxCohortList div div div ul #" + id + " > div:eq(0) > img").attr("src");
			
			if (isIcon != undefined && isIcon != "undefined") {
				// 현재 tree의 icon이 폴더일 경우만 변경
				boo = isIcon.indexOf("folder.png") > -1;
				if (boo) {
					$("#jqxCohortList > div:eq(0) .itemicon").attr("src", "../../images/folderOpen.png");
				}
			}
		});

		$("#jqxCohortList .jqx-checkbox").css("margin-top", "4.5px");

		$('#jqxCohortList').on('collapse', function(event) {
			var item = $('#jqxCohortList').jqxTree('getItem', args.element);
			var label = item.label;
			var icon = item.icon;
			var id = item.id;
			var parentId = item.parentId;
			var boo = false;
			
			var isIcon = $("#jqxCohortList > div:eq(0) > img").attr("src");
			
			if (isIcon != undefined && isIcon != "undefined") {
				// 현재 tree의 icon이 폴더일 경우만 변경
				boo = isIcon.indexOf("folder") > -1;
				if (boo) {
					$("#jqxCohortList > div:eq(0) > img").attr("src", "../../images/folder.png");
				}
			}
		});
}

function cohortdetlList(detlSeq){
	
	var dataSet = {};
	dataSet.CATE_DETL_SEQ = detlSeq;
	
	var promise = http('cohort/selCohortContList', 'post', true , dataSet);
	
	promise.then(function(result){
		
		console.log("delList:::",result);
		var dataView = result.selCohortContList;
		for(var i=0; i<dataView.length; i++){
			var tmpMap = dataView[i];
			var html = '';
			//html += '<ul class="treeview-menu collapse in" id="cohortList_tree'+tmpMap.CATE_DETL_SEQ+'" style="padding-left: 10px;">';
			
			html += '<div class="treeview"><div class="checkbox" href="#"><label for="itemCateDetl_tree_'+tmpMap.SEQ+'">';
			html += '<input type="checkbox" class="cohort-cate-list" name="itemCate_tree" detlseq="'+tmpMap.CATE_DETL_SEQ+'" value="'+tmpMap.SEQ+'" id="itemCateDetl_tree_'+tmpMap.SEQ+'" style="margin-top:5px;">';
			html += tmpMap.CONT_NM+'</label>';
			html += '<div class="pull-right">';
			html += '1919 samples';
			html += '</div></div>';
			html += '<input type="hidden" id="itemCate_tree_'+tmpMap.SEQ+'" value="'+tmpMap.CONT_NM+'"></div>';
			
			//html += '</ul>';
			
			$('#cohortList_tree'+tmpMap.CATE_DETL_SEQ).append(html);
		}
		

	});
	
	
}

function cohortInitEvent(){
	$(document).on('click','.cohort-cate-list',function(){
		
		console.log($(this));
		var seq = $(this).val();
		var contNM = $('#itemCate_tree_'+seq).val();
		
		var html = ' ';
		html += '';
		html += '	<div class="btn-group filter-box-cohort" id="cohortCateList_'+seq+'"  style="margin-right: 2px;">';
		html +=	'		<button type="button" class="btn bg-navy btn-flat" style="">';
		html +=				contNM;
		html +=	'		</button>';
		html +=	'		<button type="button" class="btn bg-navy btn-flat delete" name="'+contNM+'" seq="'+seq+'">';
		html +=	'		    <i class="fa fa-times"></i>';
		html +=	'		</button>';
		html +=	'	</div>';
		html +=	'';
		
		$('#filter-group-cohort').append(html);
	});
	
	$(document).on('')
	
	$(document).on('click','.itemCateCohort',function(){
		$this = $(this).children().children().children()
		
		var dataSet = {};

		dataSet.CATE_MID_SEQ = $this.val();
		console.log(dataSet);
		
		var promise = http('dashboard/selectCohortDetlList', 'post', true , dataSet);
		
		promise.then(function(result){
			console.log(result);
			var html = '';
			var dataView = result.selectCohortDetlList;
			
			$('.itemCateCohortDetl').css("color","");
			$this.parent().css("color","white");
			
			if(isNullOrEmpty(dataView)){
				$('#jqxCohortList').empty();

				$('#jqxCohortList').append(html);
				return;
			}
			else{
				$('#jqxCohortList').empty();
				
				for(var i=0; i<dataView.length; i++){
					var tmpMap = dataView[i];
					html += '<div class="treeview" id="cohortList_'+tmpMap.CATE_DETL_SEQ+'">';
					html += '<a data-toggle="collapse" data-parent="#cohortTree" href="#cohortList_tree'+tmpMap.CATE_DETL_SEQ+'" aria-expanded="true"><h3>'+tmpMap.CATE_DETL_NM+'</h3></a>';
					html += '<ul class="treeview-menu collapse in" id="cohortList_tree'+tmpMap.CATE_DETL_SEQ+'" style="padding-left: 10px;">';
					/*
					html += '<div class="treeview"><div class="checkbox" href="#"><label for="itemCateDetl_tree_">';
					html += '<input type="checkbox" name="itemCate_tree" detlseq="1" value="2" id="itemCateDetl_tree_" style="margin-top:5px;">';
					html += 'breacMSKSKSK'+'</label>';
					html += '<div class="pull-right">';
					html += '1919 samples';
					html += '</div></div></div>';
					*/
					html += '</ul>';
					html += '</div>';
					$('#jqxCohortList').append(html);
					cohortdetlList(tmpMap.CATE_DETL_SEQ);
				}
				
			}
		});
		
	});
	
	
}