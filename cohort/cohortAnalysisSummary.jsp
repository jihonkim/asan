<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>


<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.13.5/jszip.js"></script>
<style>

.content{
	background: #fff;
    border-top: 1px solid #ddd;
    padding-right: 20px;
    padding-left: 20px;
}
.modebar{
	left: 0;
	z-index:0 !important;
}
a.modebar-btn::after{
	z-index:999999 !important;
}
</style>

<!-- Main content -->
<section class="content">

	<div class="row">
		<ul id="item_1" class="sortable_area connectedSortable col-lg-3" weight=0>
		
		</ul>
		<ul id="item_2" class="sortable_area connectedSortable col-lg-3" weight=0>
		
		</ul>
		<ul id="item_3" class="sortable_area connectedSortable col-lg-3" weight=0>
	    
		 </ul>
		 <ul id="item_4" class="sortable_area connectedSortable col-lg-3" weight=0>
		
		 </ul>

	</div>
	
</section>
<script src="<c:url value="" />"></script>

