<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

	
<!-- Content Header (Page header) -->
<section class="content-header">
	<h1>
		메뉴 관리
	</h1>
	<ol class="breadcrumb">
		<li><a href="#"><i class="ion ion-erlenmeyer-flask"></i> 관리자</a></li>
		<li class="active">메뉴 관리</li>
	</ol>
</section>
<!-- Main content -->
<section class="content">
	<!-- Main row -->
	<div class="row">
		<!-- Left col -->
		<section class="col-lg-12">					
			<div class="box">
				<div class="box-header">
					&nbsp;
				</div>
				<div class="box-body min-height-294">
					<!-- item -->
					<div class="item">
						<div class="box-tools">
							<div class="row">
								<div class="col-lg-1">
									<label  class="control-label padding-top-5 pull-right">분류</label>
								</div>
								<div class="col-lg-2">
									<div class="form-group">
										<select class="default-select2 form-control input-sm" name="searchCondition" id="searchKey" title="검색유형">
											<option value="0">전체</option>
											<option value="1">연구</option>
											<option value="2">레지스트리</option>
											<option value="3">정형보고서</option>
										</select>
									</div>
								</div>
								<div class="col-lg-9">
									<div class="form-group pull-right">
										<button class="btn btn-success btnRegPopMenu" num="" data-toggle="modal" data-target="#modalMenuReg">메뉴 생성</button>
									</div>
								</div>
							</div>
						</div>
						<table width="100%" class="table table-bordered table-striped" id="gridMenuList" cellspacing="0">
							<thead>
								<tr>
									<th class="text-center">No.</th>
									<th class="text-center">분류</th>
									<th class="text-center">메뉴ID</th>
									<th class="text-center">메뉴명</th>
									<th class="text-center">순서</th>
									<th class="text-center">수정/삭제</th>
								</tr>
							</thead>
						</table>
					</div>
					<!-- /.item -->
				</div>
			</div>
		</section>
		<!-- /.Left col -->
	</div>
	<!-- /.row (main row) -->
</section>
<!-- /.content -->
<!-- 페이지용 js -->
<script src="<c:url value="/js/admin/menuMgmt.js" />"></script>






<!-- 모달영역 -->
<!-- 게시판 등록/수정 -->
<div class="modal fade bs-example-modal-lg" data-backdrop="static" id="modalMenuReg" tabindex="-1" role="dialog" aria-labelledby="modalMenuRegLabel">
	<div class="modal-dialog modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="modalMenuRegLabel">메뉴 관리</h4>
			</div>
			<div class="modal-body">
				<form name="frm" name="frm" id="frm" method="post">
					<input type="hidden" id="vSEQ" name="vSEQ" value="">
					<div class="row">
						<div class="col-lg-12">
			                <div class="form-group">
								<label class="col-sm-2 control-label padding-top-5">분류</label>
								<div class="col-sm-10">
									<div class="form-group">
										<select class="default-select2 form-control input-sm" name="vMenuCategorize" id="vMenuCategorize">
											<option value="1">연구</option>
											<option value="2">레지스트리</option>
											<option value="3">정형보고서</option>
										</select>
									</div>
								</div> 
			                </div>
		                </div>
	                </div>
	                <div class="row">
						<div class="col-lg-12 margin-bottom-10">
			                <div class="form-group">
								<label class="col-sm-2 control-label padding-top-5">메뉴ID</label>
								<div class="col-sm-10">
									<input type="text" class="form-control" name="vMenuID" id="vMenuID" disabled>
								</div> 
			                </div>
		                </div>
	                </div>
	                <div class="row">
						<div class="col-lg-12 margin-bottom-10">
			                <div class="form-group">
								<label class="col-sm-2 control-label padding-top-5">메뉴 명</label>
								<div class="col-sm-10">
									<input type="text" class="form-control" name="vMenuName" id="vMenuName">
								</div> 
			                </div>
		                </div>
	                </div>
	                <div id="reportArea" style="display:none;">
		                <div class="row">
							<div class="col-lg-12 margin-bottom-10">
				                <div class="form-group">
									<label class="col-sm-2 control-label padding-top-5">메뉴 URL</label>
									<div class="col-sm-10">
										<input type="text" class="form-control" name="vMenuURL" id="vMenuURL">
									</div> 
				                </div>
			                </div>
		                </div>
		                <div class="row">
							<div class="col-lg-12 margin-bottom-10">
				                <div class="form-group">
									<label class="col-sm-2 control-label padding-top-5">권한</label>
									<div class="col-sm-4">
										<select class="default-select2 form-control input-sm" name="vMenuAuth" id="vMenuAuth">
										</select>
									</div> 
									<label class="col-sm-2 control-label padding-top-5 padding-left-30">USER ID</label>
									<div class="col-sm-4">
										<input type="text" class="form-control" name="vMenuUserID" id="vMenuUserID">
									</div> 
				                </div>
			                </div>
		                </div>
		                <div class="row">
							<div class="col-lg-12 margin-bottom-10">
				                <div class="form-group">
									<label class="col-sm-2 control-label padding-top-5">TARGET ID</label>
									<div class="col-sm-4">
										<input type="text" class="form-control" name="vMenuTargetID" id="vMenuTargetID">
									</div> 
				                </div>
			                </div>
		                </div>
		        	</div>
				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal" id="btnCloseMenu">취소</button>
				<button type="button" class="btn btn-success" id="btnRegMenu">등록</button>
			</div>
		</div>
	</div>
</div>
