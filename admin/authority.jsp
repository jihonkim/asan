<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

	
<!-- Content Header (Page header) -->
<section class="content-header">
	<h1>
		권한 관리
	</h1>
	<ol class="breadcrumb">
		<li><a href="#"><i class="ion ion-erlenmeyer-flask"></i> 관리자</a></li>
		<li class="active">권한 관리</li>
	</ol>
</section>
<!-- Main content -->
<section class="content">
	<!-- Main row -->
	<div class="row">
		<section class="col-lg-4">					
			<div class="box">
				<div class="box-header">
					<i class="ion ion-ios-list-outline"></i>
					<h3 class="box-title">권한 LIST</h3>
				</div>
				<div class="box-body height-60vmin">
					<!-- grid item -->
					<div class="item" id="jqxAuthList"></div>
					<!-- /.grid item -->
				</div>
				<div class="box-footer text-right">
					<button type="button" id="btnAuthDel" class="btn btn-danger btn-sm">권한삭제</button><span></span>
					<button type="button" id="btnAuthUpd" class="btn btn-info btn-sm">권한수정</button><span></span>
					<button type="button" id="btnAuthAdd" class="btn btn-success btn-sm">권한추가</button>
				</div>
			</div>
		</section>
		<section class="col-lg-3">					
			<div class="box">
				<div class="box-header">
					<i class="ion ion-ios-list-outline"></i>
					<h3 class="box-title" id="jqxAuthUserTitle">권한별 사용자</h3>
				</div>
				<div class="box-body height-60vmin">
					<!-- grid item -->
					<div class="item" id="jqxAuthUserList"></div>
					<!-- /.grid item -->
				</div>
				<div class="box-footer text-right">
					<!-- <button type="button" id="btnPerAuthDel" class="btn btn-danger btn-sm">권한 삭제</button> -->
					<button type="button" id="btnPerAuthSave" class="btn btn-success btn-sm">권한 저장</button>
				</div>
			</div>
		</section>
		<section class="col-lg-1 height-70vmin padding-top-16p text-center">					
			<div class="row">
				<div class="col-lg-12">
					<button class="btn btn-default btn-sm" id="btnPerAuthAdd">
					<i class="fa fa-3x fa-chevron-circle-left" ></i>
					</button>
					
					
				</div>
			</div>
			<div class="row">
				<div class="col-lg-12">
					<button class="btn btn-default btn-sm" id="btnPerAuthDel">
					<i class="fa fa-3x fa-chevron-circle-right" ></i>
					</button>
					
				</div>
			</div>
		</section>
		<section class="col-lg-4">					
			<div class="box">
				<div class="box-header">
					<i class="ion ion-ios-list-outline"></i>
					<h3 class="box-title">사용자 LIST</h3>
				</div>
				<div class="box-body height-60vmin">
					<!-- grid item -->
					<div class="item" id="jqxUserList"></div>
					<!-- /.grid item -->
				</div>
				<div class="box-footer text-right">&nbsp;
				</div>
			</div>
		</section>
	</div>
	<!-- /.row (main row) -->
</section>
<!-- /.content -->

<!-- POPUP -->
<div class="modal fade" id="authorityModal" tabindex="-1" role="dialog" aria-labelledby="authorityModal">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="exampleModalLabel">권한등록</h4>
			</div>
			
			<div class="modal-body">
				<form id="frmModal">
					<div class="form-group">
						<label for="recipient-name" class="control-label">권한코드:</label>
						<input type="text" class="form-control" id="txtAUT_CODE" data-bind="value:AUT_CODE" pattern="\d*" maxlength="20">
					</div>
					<div class="form-group">
						<label for="message-text" class="control-label">권한명:</label>
						<textarea class="form-control" id="txtAUT_NAME"  data-bind="value:AUT_NAME" maxlength="50"></textarea>
					</div>
				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal" id="btnClose">Close</button>
				<button type="button" class="btn btn-primary" id="btnSave">저장</button>
			</div>
		</div>
	</div>
</div>


<!-- 페이지용 js -->
<script src="<c:url value="/js/admin/authority.js" />"></script>
