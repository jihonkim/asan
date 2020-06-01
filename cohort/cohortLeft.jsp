<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>


<script type="text/javascript">

$(document).ready(function(){
	
/* 	var dataSet = {};
	var promise = http('dashboard/selectCohortList', 'post', true , dataSet);
	promise.then(function(result){
		
		
		var dataView = result.selectCohortList;
		var html = '';
		//console.log(dataView);
		for(var i=0; i<dataView.length; i++){
			html = '';
			var tmpMap = dataView[i];
			if($('#itemCateCohort_'+tmpMap.CATE_SEQ).length == 0){
				html += '<li class="treeview" id="itemCateCohort_'+tmpMap.CATE_SEQ+'">';
				html += 	'<a href="#itemCate_treeCohort'+tmpMap.CATE_SEQ+'">'+tmpMap.CATE_NM+'<span class="pull-right-container">';
				html += 		'<i class="fa fa-angle-left pull-right"></i></span>'
				html +=		'</a>';
				html += 	'<ul class="treeview-menu" id="itemCate_treeCohort'+tmpMap.CATE_SEQ+'" style="">';
				
				html += 		'<li class="treeview itemCateCohort"><a class="radio" href="#"><div class="itemCateCohortDetl" for="itemCateDetl_tree_Cohort'+i+'" style="white-space: normal;">';
				html += 		'<input type="hidden" name="itemCate_treeCohort" seq="'+tmpMap.CATE_SEQ+'" value="'+tmpMap.MID_SEQ+'" id="itemCateDetl_tree_Cohort'+i+'">';
				html += 		tmpMap.CATE+'</div></a></li>';
				
				html += 	'</ul>';
				html += '</li>';
				$('#liCohortMainList').append(html);
			}
			else{
				html += '<li class="treeview itemCateCohort"><a class="radio" href="#"><div class="itemCateCohortDetl" for="itemCateDetl_tree_Cohort'+i+'" style="white-space: normal;">';
				html += '<input type="hidden" name="itemCate_treeCohort" seq="'+tmpMap.CATE_SEQ+'" value="'+tmpMap.MID_SEQ+'" id="itemCateDetl_tree_Cohort'+i+'">';
				html += tmpMap.CATE+'</div></a></li>';
				$('#itemCate_treeCohort'+tmpMap.CATE_SEQ).append(html);
			}
				
		}
		
	});
	 */
});

</script>

<!-- sidebar: style can be found in sidebar.less -->
<section class="sidebar">
	<!-- Sidebar user panel -->
	<div class="user-panel padding-top-20 padding-bottom-20">
		<div class="info text-align-center" style="left:0px;padding:0px;">
			<p><i class="fa fa-user-circle text-aqua"></i>&nbsp;&nbsp;${PER_NAME}</p>
			<a><i class="fa fa-id-card"></i> ${DEPT_NAME}</a>
		</div>
	</div>
		
	<ul class="sidebar-menu" id="liCohortMainList">
		<li class="header">MAIN NAVIGATION</li>
		
		

	</ul>
</section>
<!-- /.sidebar -->