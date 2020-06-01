<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

	
<!-- Content Header (Page header) -->
<section class="content-header">
	<h1>
		DashBoard 관리
	</h1>
	<ol class="breadcrumb">
		<li><a href="#"><i class="ion ion-erlenmeyer-flask"></i> 관리자</a></li>
		<li class="active">DashBoard 관리</li>
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
					DashBoard 관리
				</div>
				<div class="box-body">
					<!-- item -->
					<div class="item">
		                <div class="row">
							<div class="col-lg-12 margin-bottom-10">
				                <div class="form-group">
									<label class="col-sm-2 control-label padding-top-5">서비스 상태 Query</label>
									<div class="col-sm-10">
										<textarea class="form-control" name="vServiceQuery" id="vServiceQuery" rows="10"></textarea>
									</div> 
				                </div>
			                </div>
		                </div>
					</div>
					<!-- /.item -->
				</div>
				<div class="box-footer">
					<div class="pull-right">
						<button class="btn btn-warning btn-sm" id="btnService" data-toggle="modal" data-target="#modalService">서비스상태 미리보기</button>
					</div>
				</div>
			</div>
		</section>
		<!-- <form id="frm" name="frm" method="post"> -->
		<section class="col-lg-12">					
			<div class="box">
				<div class="box-header">
					Summary 관리
				</div>
				<div class="box-body">
					<!-- summary -->
					<div class="row margin-bottom-10">
						<div class="col-lg-12">
							<div class="item">
								<div class="form-group">
									<label class="col-sm-2 control-label padding-top-5">Query</label>
									<div class="col-sm-10">
										<textarea class="form-control" name="vSummaryQuery" id="vSummaryQuery" rows="10"></textarea>
									</div> 
				                </div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-lg-12">
							<div class="item">
								<div class="form-group">
									<label class="col-sm-2 control-label padding-top-5">크기</label>
									<div class="col-sm-4">
										<div class="form-group padding-top-5">
											<label class="font-weight-100 margin-right-20">
												<input type="radio" name="vSummaryWidth" value="3" class="minimal widthYN" style="position: absolute; opacity: 0;">
												&nbsp;25%
											</label>
											<label class="font-weight-100 margin-right-20">
												<input type="radio" name="vSummaryWidth" value="6" class="minimal widthYN" style="position: absolute; opacity: 0;">
												&nbsp;50%
											</label>
											<label class="font-weight-100 margin-right-20">
												<input type="radio" name="vSummaryWidth" value="12" class="minimal widthYN" style="position: absolute; opacity: 0;">
												&nbsp;100%
											</label>
										</div>
									</div>
									<label class="col-sm-2 control-label padding-top-5">사용</label>
									<div class="col-sm-4">
										<div class="form-group padding-top-5">
											<label class="font-weight-100 margin-right-10">
												<input type="radio" name="vSummaryYN" value="Y" class="minimal summaryYN" style="position: absolute; opacity: 0;">
												&nbsp;Yes
											</label>
											<label class="font-weight-100 margin-right-10">
												<input type="radio" name="vSummaryYN" value="N" class="minimal summaryYN" style="position: absolute; opacity: 0;">
												&nbsp;No
											</label>
										</div>
									</div>
				                </div>
							</div>
						</div>
					</div>
				</div>
				<div class="box-footer">
					<div class="pull-right">
						<button class="btn btn-warning btn-sm" id="btnSummary" data-toggle="modal" data-target="#modalSummary">Summary 미리보기</button>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-lg-12">	
					<div class="form-group pull-right">
						<button class="btn btn-success" id="btnDashboardReg">저장</button>
					</div>
				</div>
			</div>
		</section>
		<!-- 게시판 관리 -->
		<section class="col-lg-12">
			<div class="row">	
				<div class="col-lg-12">
					<div class="box">
						<div class="box-header">
							Chart 관리
						</div>
						<div class="box-body">
							<!-- item -->
							<div class="item">
								<table width="100%" class="table table-bordered table-striped" id="gridChartList" cellspacing="0">
									<thead>
										<tr>
											<th class="text-center">No.</th>
											<th class="text-center">Title</th>
											<th class="text-center">Chart 형태</th>
											<th class="text-center">크기</th>
											<th class="text-center">사용여부</th>
											<th class="text-center">순서</th>
											<th class="text-center">삭제</th>
										</tr>
									</thead>
								</table>
							</div>
						</div>
						<div class="box-footer">
							<div class="pull-right">
								<button class="btn btn-success btn-sm btnModalChartReg" data-toggle="modal" data-target="#modalChartReg" myFlag="false">Chart 등록</button>&nbsp;
								<button class="btn btn-warning btn-sm" id="btnChart" data-toggle="modal" data-target="#modalChart">Chart 미리보기</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<!-- </form> -->
		<!-- /.Left col -->
	</div>
	<!-- /.row (main row) -->
</section>
<!-- /.content -->
<!-- 페이지용 js -->
<script src="<c:url value="/js/admin/dashboardMgmt.js" />"></script>






<!-- 모달영역 -->
<!-- Chart 등록/수정 -->
<div class="modal fade bs-example-modal-lg" data-backdrop="static" id="modalChartReg" tabindex="-1" role="dialog" aria-labelledby="modalChartRegLabel">
	<div class="modal-dialog modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="modalChartRegLabel">Chart 관리</h4>
			</div>
			<div class="modal-body">
				<form name="frmChart" id="frmChart" method="post">
					<input type="hidden" id="vSEQ" name="vSEQ" value="">
	                <div class="row margin-bottom-10">
						<div class="col-lg-12">
			                <div class="form-group">
								<label class="col-sm-2 control-label padding-top-5">Title</label>
								<div class="col-sm-10">
									<input type="text" class="form-control" name="vChartTitle" id="vChartTitle">
								</div> 
			                </div>
		                </div>
	                </div>
	                <div class="row">
	                	<div class="col-lg-12">
			                <div class="form-group">
								<label class="col-sm-2 control-label padding-top-5">형태</label>
								<div class="col-sm-4">
									<div class="form-group">
										<select class="default-select2 form-control input-sm" name="vChartShape" id="vChartShape">
											<option value="line">line</option>
											<option value="spline">spline</option>
											<option value="bar">bar</option>
											<option value="step">step</option>
											<option value="area-step">area-step</option>
											<option value="area">area</option>
											<option value="area-spline">area-spline</option>
										</select>
									</div>
								</div> 
								<label class="col-sm-2 control-label padding-top-5">크기</label>
								<div class="col-sm-4">
									<div class="form-group padding-top-5">
										<label class="font-weight-100 margin-right-5">
											<input type="radio" name="vChartWidth" value="3" class="minimal chartWidth" style="position: absolute; opacity: 0;">
											&nbsp;25%
										</label>
										<label class="font-weight-100 margin-right-5">
											<input type="radio" name="vChartWidth" value="6" class="minimal chartWidth" style="position: absolute; opacity: 0;">
											&nbsp;50%
										</label>
										<label class="font-weight-100">
											<input type="radio" name="vChartWidth" value="12" class="minimal chartWidth" style="position: absolute; opacity: 0;">
											&nbsp;100%
										</label>
									</div>
								</div> 
			                </div>
			        	</div>
	                </div>
	                <div class="row">
	                	<div class="col-lg-12">
			                <div class="form-group">
								<label class="col-sm-2 control-label padding-top-5">사용</label>
								<div class="col-sm-10 form-group padding-top-5">
									<label class="font-weight-100 margin-right-10">
										<input type="radio" name="vChartYN" value="Y" class="minimal chartYN" style="position: absolute; opacity: 0;">
										&nbsp;Yes
									</label>
									<label class="font-weight-100 margin-right-10">
										<input type="radio" name="vChartYN" value="N" class="minimal chartYN" style="position: absolute; opacity: 0;">
										&nbsp;No
									</label>
								</div>
			                </div>
		                </div>
	                </div>
	                <div class="row">
	                	<div class="col-lg-12">
	                		<div class="form-group">
								<label class="col-sm-2 control-label padding-top-5">Query</label>
								<div class="col-sm-10">
									<div class="form-group">
										<textarea class="form-control" name="vChartQuery" id="vChartQuery" rows="10"></textarea>
										<div class="pull-right margin-top-5">
											<button type="button" class="btn btn-warning btn-xs" id="btnQueryMod">수정</button>
											<button type="button" class="btn btn-primary btn-xs" id="btnQueryExe">실행</button>
										</div>
									</div>
								</div> 
			                </div>
	                	</div>
	                </div>
	                <div class="row">
	                	<div class="col-lg-12">
			                <div class="form-group">
								<label class="col-sm-2 control-label padding-top-5">Dimension</label>
								<div class="col-sm-4">
									<div class="form-group">
										<select class="default-select2 form-control input-sm" name="vChartDimension" id="vChartDimension">
										</select>
									</div>
								</div> 
							</div>
						</div>
					</div>
					<div class="row">
	                	<div class="col-lg-12">
			                <div class="form-group">
								<label class="col-sm-2 control-label padding-top-5">Measures</label>
								<div class="col-sm-10 padding-top-5">
									<div class="form-group" id="measuresArea">
										<!-- <div class="col-sm-3">
											<div class="form-group">
												<label class="font-weight-100 margin-right-15">
													<input type="checkbox" name="vChartMeasures" value="Measures1" class="minimal measuresChk" style="position: absolute; opacity: 0;">
													&nbsp;Measures1
												</label>
											</div>
										</div> -->
					                </div>
								</div> 
							</div>
						</div>
					</div>
				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal" id="btnCloseChart">취소</button>
				<button type="button" class="btn btn-success" id="btnRegChart">등록</button>
			</div>
		</div>
	</div>
</div>


<!-- 서비스 상태 미리보기 -->
<div class="modal fade" id="modalService" tabindex="-1" role="dialog" aria-labelledby="modalServiceLabel">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="modalServiceLabel">서비스 상태 미리보기</h4>
			</div>
			<div class="modal-body">
                <div class="row margin-bottom-10">
					<div class="col-lg-12">
		                <div class="item text-align-center" id="serviceArea"></div>
	                </div>
                </div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">닫기</button>
			</div>
		</div>
	</div>
</div>


<!-- summary 미리보기 -->
<div class="modal fade bs-example-modal-lg" id="modalSummary" tabindex="-1" role="dialog" aria-labelledby="modalSummaryLabel">
	<div class="modal-dialog modal-lg" role="document" style="width:90%;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="modalSummaryLabel">Summary 미리보기</h4>
			</div>
			<div class="modal-body">
                <div class="row margin-bottom-10">
					<div class="col-lg-12">
		                <div class="item" id="summaryArea"></div>
	                </div>
                </div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">닫기</button>
			</div>
		</div>
	</div>
</div>


<!-- chart 미리보기 -->
<div class="modal fade bs-example-modal-lg" id="modalChart" tabindex="-1" role="dialog" aria-labelledby="modalChartLabel">
	<div class="modal-dialog modal-lg" role="document" style="width:90%;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="modalChartLabel">Chart 미리보기</h4>
			</div>
			<div class="modal-body">
                <div class="row margin-bottom-10">
					<div class="col-lg-12">
		                <div class="row" id="chartArea">
		                </div>
	                </div>
                </div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">닫기</button>
			</div>
		</div>
	</div>
</div>
