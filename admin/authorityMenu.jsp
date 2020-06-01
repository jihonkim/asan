<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>


	
<!-- Content Header (Page header) -->
<section class="content-header">
	<h1>
		메뉴 권한 관리
	</h1>
	<ol class="breadcrumb">
		<li><a href="#"><i class="ion ion-erlenmeyer-flask"></i> 관리자</a></li>
		<li class="active">메뉴권한 관리</li>
	</ol>
</section>
<!-- Main content -->
<section class="content">
	<!-- Main row -->
	<div class="row">
		<section class="col-lg-12">					
			<div class="box">
				<div class="box-header">
					<i class="ion ion-ios-list-outline"></i>
					<h3 class="box-title">권한 LIST</h3>
				</div>
				<div class="box-body" style="">
					<!-- grid item -->
					<div class="item" id="jqxAuthList"></div>
					<!-- /.grid item -->
				</div>
				
				<div class="box-footer text-right">
					<button type="button" id="btnSave" class="btn btn-success btn-sm">권한저장</button>
				</div>
			</div>
		</section>
		
		
		
		<section class="col-lg-12">					
			<div class="box">
				<div class="box-header">
					<i class="ion ion-ios-list-outline"></i>
					<h3 class="box-title">메뉴목록</h3>
				</div>
				<div class="box-body" style="">
					<!-- grid item -->
					<div class="item" id="jqxMenuList"></div>
					<!-- /.grid item -->
				</div>
			</div>
		</section>
		
	</div>
	<!-- /.row (main row) -->
</section>
<!-- /.content -->

<!-- 페이지용 js -->
<script src="<c:url value="/js/admin/authorityMenu.js" />"></script>