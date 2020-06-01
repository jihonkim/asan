<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

	
<!-- Content Header (Page header) -->
<section class="content-header">
	<h1>
		ETL로그 관리
	</h1>
	<ol class="breadcrumb">
		<li><a href="#"><i class="ion ion-erlenmeyer-flask"></i> 관리자</a></li>
		<li class="active">ETL로그 관리</li>
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
					<i class="ion ion-ios-list-outline"></i>
					<h3 class="box-title">&nbsp;</h3>
				</div>
				<div class="box-body min-height-294">
					<!-- item -->
					<div class="item">
						<div class="box-tools">
							<div class="row">
								<div class="col-lg-1 width-200">
									<div class="form-group">
										<select class="default-select2 form-control input-sm" name="searchKey" id="searchKey" title="검색유형">
											<option value="000">워크플로우 ID & 상태메세지</option>
											<option value="001">워크플로우 ID</option>
											<option value="002">상태메세지</option>
										</select>
									</div>
								</div>
				                <div class="input-group input-group-sm width-200">
									<input type="text" name="searchVal" class="form-control pull-right" placeholder="Search" id="searchVal">
									<div class="input-group-btn">
										<button class="btn btn-default" id="btnSearch"><i class="fa fa-search"></i></button>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-lg-2">
									<label class="font-weight-100">
										<input type="checkbox" name="dateType" value="ALL" class="minimal dateChk" style="position: absolute; opacity: 0;">
										&nbsp;전체기간
					                </label>
								</div>
								<div class="col-lg-4" id="reportrangeArea">
									<div id="reportrange" style="background: #fff; cursor: pointer; padding: 5px 10px; border: 1px solid #ccc; width: 100%">
									    <i class="glyphicon glyphicon-calendar fa fa-calendar"></i>&nbsp;
									    <span id="dateVal"></span> <b class="caret"></b>
									</div>
								</div>
								<button class="btn btn-primary btn-sm" id="btnWebSearch">검색</button>
							</div>
						</div>
						<div class="margin-top-30"></div>
						<table width="100%" class="table table-bordered table-striped" id="gridEtlLogList" cellspacing="0">
							<thead>
								<tr>
									<th class="text-center">워크플로우 ID</th>
									<th class="text-center">작업일자</th>
									<th class="text-center">시작일시</th>
									<th class="text-center">종료일시</th>
									<th class="text-center">소요초수</th>
									<th class="text-center">원천데이터 건수</th>
									<th class="text-center">적재데이터 건수</th>
									<th class="text-center">상태코드</th>
									<th class="text-center">상태메세지</th>
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
<script src="<c:url value="/js/admin/etlLog.js" />"></script>




<!-- 모달영역 -->
<!-- 상세페이지 -->
<div class="modal fade bs-example-modal-lg" id="modalEtlView" tabindex="-1" role="dialog" aria-labelledby="modalEtlViewLabel">
	<div class="modal-dialog modal-lg width-90p" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="modalEtlViewLabel">ETL Log View</h4>
			</div>
			<div class="modal-body">
				<div class="row">
					<div class="col-lg-12">
						<table class="table table-bordered ho-table-border">
							<tr>
								<th width="15%">JOB ID</th>
								<td id="bWorkflowId" width="35%"></td>
								<th width="15%">작업일자</th>
								<td id="bDate" width="35%"></td>
							</tr>
							<tr>
								<th width="15%">데이터건수</th>
								<td id="bCount"></td>
								<th width="15%">상태</th>
								<td id="bStatus"></td>
							</tr>
							<tr>
								<td colspan="4">
									<div class="max-height-500" id="bMessage" style="overflow:scroll; height:500px; padding:10px;"></div>
								</td>
							</tr>
						</table>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal" id="btnEtlClose">닫기</button>
			</div>
		</div>
	</div>
</div>
