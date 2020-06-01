<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!-- Content Header (Page header) -->
<section class="content-header">
	<h1>
		분류 관리
	</h1>
	<ol class="breadcrumb">
		<li><a href="#"><i class="ion ion-erlenmeyer-flask"></i> 관리자</a></li>
		<li class="active">분류 관리</li>
	</ol>
</section>
<!-- Main content -->
<section class="content">
	<!-- Main row -->
	<div class="row">
		<!-- Left col -->
		<section class="col-lg-6">					
			<div class="box">
				<div class="box-header">
					<i class="ion ion-ios-list-outline"></i>
					<h3 class="box-title">대분류</h3>
				</div>
				<div class="box-body min-height-70vmin">
					<div class="item" id="jqxItemCateList"></div>
					
				</div>
				<div class="box-footer">
					<div class="pull-right">
						<button type="button" class="btn bg-maroon btn-md" id="btnDel">삭제</button>&nbsp;
						<button type="button" class="btn bg-orange btn-md" id="btnUpd">수정</button>&nbsp;
						<button type="button" class="btn bg-olive btn-md" id="btnAdd">신규</button>
					</div>
				</div>
			</div>
		</section>
		<section class="col-lg-6">					
			<div class="box">
				<div class="box-header">
					<i class="ion ion-ios-list-outline"></i>
					<h3 class="box-title">중분류</h3>
				</div>
				<div class="box-body min-height-70vmin">
					
					<!-- item -->
					<div class="item" id="jqxItemCateDetlList"></div>
					<!-- /.item -->
				</div>
				<div class="box-footer">
					<div class="pull-right">
						<button type="button" class="btn bg-maroon btn-md" id="btnDetlDel">삭제</button>&nbsp;
						<button type="button" class="btn bg-orange btn-md" id="btnDetlUpd">수정</button>&nbsp;
						<button type="button" class="btn bg-olive btn-md" id="btnDetlAdd">신규</button>
					</div>
				</div>
			</div>
		</section>
		<!-- /.Left col -->
	</div>
	<!-- /.row (main row) -->
</section>
<!-- /.content -->
<!-- 페이지용 js -->
<script src="<c:url value="/js/admin/researchCategorize.js" />"></script>


<!-- 대분류 신규 -->
<!-- POPUP -->
<div class="modal fade" id="itemCateModal" tabindex="-1" role="dialog" aria-labelledby="itemCateModal">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="exampleModalLabel">대분류등록</h4>
			</div>
			
			<div class="modal-body">
				<form id="frmModal">
					<input type="hidden" id="txtSEQ">
					<input type="hidden" class="form-control" id="txtORDER" maxlength="10" disabled />
					<div class="form-group">
						<label for="recipient-name" class="control-label">대분류ID:</label>
						<input type="text" class="form-control" id="txtCATE_ID" maxlength="20">
					</div>
					<div class="form-group">
						<label for="recipient-name" class="control-label">대분류명:</label>
						<input type="text" class="form-control" id="txtCATE_NM" maxlength="128">
					</div>
				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal" id="btnClose">취소</button>
				<button type="button" class="btn btn-primary" id="btnSave">저장</button>
			</div>
		</div>
	</div>
</div>


<!-- 중분류 신규 -->
<div class="modal fade" id="itemCateDetlModal" tabindex="-1" role="dialog" aria-labelledby="itemCateModal">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="exampleModalLabel">중분류등록</h4>
			</div>
			
			<div class="modal-body">
				<form id="frmModal">
					<input type="hidden" id="txtDETL_SEQ">					
					<input type="hidden" id="txtITEM_CATE_SEQ">
					
					<div class="required padding-10">
						<label for="recipient-name" class="control-label">분류ID</label>
						<input type="text" class="form-control" id="txtCATE_ID_DETL" maxlength="20">
					</div>
					
					<div class="required padding-10">
						<label for="recipient-name" class="control-label">분류명</label>
						<input type="text" class="form-control" id="txtCATE_NM_DETL" maxlength="128">
					</div>
					
				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal" id="btnDetlClose">취소</button>
				<button type="button" class="btn btn-primary" id="btnDetlSave">저장</button>
			</div>
		</div>
	</div>
</div>



