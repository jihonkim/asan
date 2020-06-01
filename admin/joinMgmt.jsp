<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

	
<!-- Content Header (Page header) -->
<section class="content-header">
	<h1>
		JOIN 관리
	</h1>
	<ol class="breadcrumb">
		<li><a href="#"><i class="ion ion-erlenmeyer-flask"></i> 관리자</a></li>
		<li class="active">JOIN 관리</li>
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
								<!-- table1 -->
								<div class="col-lg-1">
									<label style="margin-top:5px;text-align:center;">Relation1</label>
								</div>
								<div class="col-lg-1">
									<div class="form-group">
										<select class="default-select2 form-control input-sm" title="검색유형" id="mgmtSchemaList">
											<option value="" selected>전체</option>
										</select>
									</div>
								</div>
								<div class="col-lg-2">
									<div class="form-group">
										<select class="default-select2 form-control input-sm" title="검색유형" id="mgmtTableList">
											<option value="" selected>선택</option>
										</select>
									</div>
								</div>
								
								<!-- table2 -->
								<div class="col-lg-1">
									<label style="margin-top:5px;text-align:center;">Relation2</label>
								</div>
								<div class="col-lg-1">
									<div class="form-group">
										<select class="default-select2 form-control input-sm" title="검색유형" id="mgmtSchemaList2">
											<option value="" selected>전체</option>
										</select>
									</div>
								</div>
								<div class="col-lg-2">
									<div class="form-group">
										<select class="default-select2 form-control input-sm" title="검색유형" id="mgmtTableList2">
											<option value="" selected>선택</option>
										</select>
									</div>
								</div>
								
								
								<div class="col-lg-2">
									<div class="input-group input-group-sm">
										<input type="text" name="table_search" class="form-control pull-right" placeholder="Search" id="searchVal">
										<div class="input-group-btn">
											<button class="btn btn-default" id="btnSearch"><i class="fa fa-search"></i></button>
										</div>
									</div>
								</div>
								<div class="col-lg-2">
									<div class="form-group pull-right">
										<button class="btn btn-success btnRegPopJoin" num="" data-toggle="modal" data-target="#modalJoinReg" id="btnJoinMake">신규</button>
									</div>
								</div>
							</div>
						</div>
						<table width="100%" class="table table-bordered table-striped" id="gridJoinList" cellspacing="0">
							<thead>
								<tr>
									<th class="text-center">No.</th>
									<th class="text-center">SCHEMA 1</th>
									<th class="text-center">TABLE 1</th>
									<th class="text-center">COLUMN 1</th>
									<th class="text-center">SCHEMA 2</th>
									<th class="text-center">TABLE 2</th>
									<th class="text-center">COLUMN 2</th>
									<th class="text-center">삭제</th>
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
<script src="<c:url value="/js/admin/joinMgmt.js" />"></script>






<!-- 모달영역 -->
<!-- 게시판 등록/수정 -->
<div class="modal fade bs-example-modal-lg" data-backdrop="static" id="modalJoinReg" tabindex="-1" role="dialog" aria-labelledby="modalJoinRegLabel">
	<div class="modal-dialog modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="modalJoinRegLabel">JOIN 관리</h4>
			</div>
			<div class="modal-body">
				<form name="frm" name="frm" id="frm" method="post">
					<div class="row">
						<div class="col-lg-6 height-40">
			                <div class="form-group">
								<label class="col-sm-4 control-label padding-top-5">SCHEMA 1</label>
								<div class="col-sm-8">
									<select class="default-select2 form-control input-sm" id="SCHEMA_1">
										<option value="" selected>선택</option>
									</select>
								</div> 
			                </div>
		                </div>
						<div class="col-lg-6 height-40">
			                <div class="form-group">
								<label class="col-sm-4 control-label padding-top-5">TABLE 1</label>
								<div class="col-sm-8">
									<select class="default-select2 form-control input-sm" id="TABLE_1">
										<option value="" selected>선택</option>
									</select>
								</div> 
			                </div>
		                </div>
	                </div>
	                <div class="row">
						<div class="col-lg-6 height-40">
			                <div class="form-group">
								<label class="col-sm-4 control-label padding-top-5">COLUMN 1</label>
								<div class="col-sm-8">
									<select class="default-select2 form-control input-sm" id="COLUMN_1">
										<option value="" selected>선택</option>
									</select>
								</div> 
			                </div>
		                </div>
	                </div>
	                <div class="row">
	                	<div class="col-lg-12 height-40">
	                		<hr>
	                	</div>
	                </div>
	                <div class="row">
						<div class="col-lg-6 height-40">
			                <div class="form-group">
								<label class="col-sm-4 control-label padding-top-5">SCHEMA 2</label>
								<div class="col-sm-8">
									<select class="default-select2 form-control input-sm" id="SCHEMA_2">
										<option value="" selected>선택</option>
									</select>
								</div> 
			                </div>
		                </div>
						<div class="col-lg-6 height-40">
			                <div class="form-group">
								<label class="col-sm-4 control-label padding-top-5">TABLE 2</label>
								<div class="col-sm-8">
									<select class="default-select2 form-control input-sm" id="TABLE_2">
										<option value="" selected>선택</option>
									</select>
								</div> 
			                </div>
		                </div>
	                </div>
	                <div class="row">
						<div class="col-lg-6 height-40">
			                <div class="form-group">
								<label class="col-sm-4 control-label padding-top-5">COLUMN 2</label>
								<div class="col-sm-8">
									<select class="default-select2 form-control input-sm" id="COLUMN_2">
										<option value="" selected>선택</option>
									</select>
								</div> 
			                </div>
		                </div>
	                </div>
				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal" id="btnCloseJoin">취소</button>
				<button type="button" class="btn btn-success" id="btnInsertJoin">등록</button>
			</div>
		</div>
	</div>
</div>
