<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

	
<!-- Content Header (Page header) -->
<section class="content-header">
	<h1>
		게시판 관리
	</h1>
	<ol class="breadcrumb">
		<li><a href="#"><i class="ion ion-erlenmeyer-flask"></i> 관리자</a></li>
		<li class="active">게시판 관리</li>
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
								<div class="col-lg-2">
									<div class="form-group">
										<select class="default-select2 form-control input-sm" name="searchCondition" id="searchKey" title="검색유형">
											<option value="0">게시판코드</option>
											<option value="1">게시판이름</option>
										</select>
									</div>
								</div>
								<div class="col-lg-3">
									<div class="input-group input-group-sm">
										<input type="text" name="table_search" class="form-control pull-right" placeholder="Search" id="searchVal">
										<div class="input-group-btn">
											<button class="btn btn-default" id="btnSearch"><i class="fa fa-search"></i></button>
										</div>
									</div>
								</div>
								<div class="col-lg-7">
									<div class="form-group pull-right">
										<button class="btn btn-success btnRegPopBoard" num="" data-toggle="modal" data-target="#modalBoardReg">게시판 생성</button>
									</div>
								</div>
							</div>
						</div>
						<table width="100%" class="table table-bordered table-striped" id="gridBoardList" cellspacing="0">
							<thead>
								<tr>
									<th class="text-center">No.</th>
									<th class="text-center">게시판코드</th>
									<th class="text-center">게시판이름</th>
									<th class="text-center">DashBoard 노출여부</th>
									<th class="text-center">DashBoard 노출개수</th>
									<th class="text-center">DashBoard 노출길이</th>
									<th class="text-center">구분</th>
									<th class="text-center">등록일</th>
									<th class="text-center">순서</th>
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
<script src="<c:url value="/js/admin/boardManagement.js" />"></script>






<!-- 모달영역 -->
<!-- 게시판 등록/수정 -->
<div class="modal fade bs-example-modal-lg" data-backdrop="static" id="modalBoardReg" tabindex="-1" role="dialog" aria-labelledby="modalBoardRegLabel">
	<div class="modal-dialog modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="modalBoardRegLabel">게시판 관리</h4>
			</div>
			<div class="modal-body">
				<form name="frm" name="frm" id="frm" method="post">
					<input type="hidden" id="vSEQ" name="vSEQ" value="">
					<div class="row" id="codeArea">
						<div class="col-lg-6 height-40">
			                <div class="form-group">
								<label class="col-sm-4 control-label padding-top-5">Code</label>
								<div class="col-sm-8">
									<input type="text" class="form-control" name="vBoardCode" id="vBoardCode" disabled>
								</div> 
			                </div>
		                </div>
	                </div>
	                <div class="row">
						<div class="col-lg-6 height-40">
			                <div class="form-group">
								<label class="col-sm-4 control-label padding-top-5">게시판 명</label>
								<div class="col-sm-8">
									<input type="text" class="form-control" name="vBoardName" id="vBoardName">
								</div> 
			                </div>
		                </div>
	                </div>
	                <div class="row">
	                	<div class="col-lg-6 height-40">
			                <div class="form-group">
								<label class="col-sm-4 control-label padding-top-5">파일첨부</label>
								<div class="col-sm-8">
									<div class="form-group padding-top-5">
										<label class="font-weight-100 margin-right-15">
											<input type="radio" name="vFileYN" value="Y" class="minimal fileChk" checked="" style="position: absolute; opacity: 0;">
											&nbsp;Yes
										</label>
										<label class="font-weight-100 margin-right-15">
											<input type="radio" name="vFileYN" value="N" class="minimal fileChk" style="position: absolute; opacity: 0;">
											&nbsp;No
										</label>
									</div>
								</div> 
			                </div>
		                </div>
						<div class="col-lg-6 height-40">
			                <div class="form-group">
								<label class="col-sm-4 control-label padding-top-5">쓰기 & 삭제 권한</label>
								<div class="col-sm-8">
									<div class="form-group">
										<select class="default-select2 form-control input-sm" name="vBoardAuth" id="vBoardAuth">
										</select>
									</div>
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
	                	<div class="col-lg-12 height-40">
	                		<h4>DashBoard</h4>
	                	</div>
	                </div>
	                <div class="row">
	                	<div class="col-lg-6 height-40">
			                <div class="form-group">
								<label class="col-sm-4 control-label padding-top-5">노출여부</label>
								<div class="col-sm-8">
									<div class="form-group padding-top-5">
										<label class="font-weight-100 margin-right-15">
											<input type="radio" name="vDashboardViewYN" value="Y" class="minimal viewChk" checked="" style="position: absolute; opacity: 0;">
											&nbsp;Yes
										</label>
										<label class="font-weight-100 margin-right-15">
											<input type="radio" name="vDashboardViewYN" value="N" class="minimal viewChk" style="position: absolute; opacity: 0;">
											&nbsp;No
										</label>
									</div>
								</div> 
			                </div>
		                </div>
						<div class="col-lg-6 height-40">
			                <div class="form-group">
								<label class="col-sm-4 control-label padding-top-5">노출개수</label>
								<div class="col-sm-8">
									<div class="form-group">
										<select class="default-select2 form-control input-sm" name="vBoardDashboardCount" id="vBoardDashboardCount" title="검색유형">
											<option value="3">3</option>
											<option value="4">4</option>
											<option value="5">5</option>
											<option value="6">6</option>
											<option value="7">7</option>
											<option value="8">8</option>
											<option value="9">9</option>
											<option value="10">10</option>
										</select>
									</div>
								</div> 
			                </div>
		                </div>
	                </div>
	                <div class="row">
	                	<div class="col-lg-6 height-40">
	                		<div class="form-group">
								<label class="col-sm-4 control-label padding-top-5">노출 넓이</label>
								<div class="col-sm-8">
									<div class="form-group">
										<select class="default-select2 form-control input-sm" name="vBoardDashboardWidth" id="vBoardDashboardWidth" title="검색유형">
											<option value="6">50%</option>
											<option value="12">100%</option>
										</select>
									</div>
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
	                	<div class="col-lg-12 height-40">
	                		<h4>사용구분</h4>
	                	</div>
	                </div>
	                <div class="row">
	                	<div class="col-lg-6 height-40">
			                <div class="form-group">
								<label class="col-sm-4 control-label padding-top-5">구분</label>
								<div class="col-sm-8">
									<div class="form-group padding-top-5">
										<label class="font-weight-100 margin-right-15">
											<input type="radio" name="vDashboardGBN" value="CDW" class="minimal viewChk" checked="" style="position: absolute; opacity: 0;">
											&nbsp;CDW
										</label>
										<label class="font-weight-100 margin-right-15">
											<input type="radio" name="vDashboardGBN" value="RG" class="minimal viewChk" style="position: absolute; opacity: 0;">
											&nbsp;RG
										</label>
									</div>
								</div> 
			                </div>
		                </div>
	                </div>
				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal" id="btnCloseBoard">취소</button>
				<button type="button" class="btn btn-success" id="btnRegBoard">등록</button>
			</div>
		</div>
	</div>
</div>
