<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

	
<!-- Content Header (Page header) -->
<section class="content-header">
	<h1>
		사용자데이터 관리
	</h1>
	<ol class="breadcrumb">
		<li><a href="#"><i class="ion ion-erlenmeyer-flask"></i> 관리자</a></li>
		<li class="active">사용자데이터 관리</li>
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
							<div class="box-body border-line-c7c7c7 margin-bottom-30">
								<div class="row">
									<div class="col-lg-2">
										<div class="form-group margin-bottom-0">
											<select class="default-select2 form-control input-sm" name="searchCondition" id="searchKey" title="검색유형">
												<option value="0">전체</option>
												<option value="1">작성자</option>
												<option value="2">조건명</option>
												<option value="3">데이터명</option>
											</select>
										</div>
									</div>
									<div class="col-lg-3">
										<div class="input-group-sm">
											<input type="text" class="form-control input_text pull-right height-34" placeholder="Search" id="searchVal">
										</div>
									</div>
									<div class="col-lg-1 col-sm-1 margin-top-5">
										<div class="pull-right">
											등록일 :
										</div>
									</div>
									<div class="col-lg-2 col-sm-2">
										<div class="input-group">
											<div class="input-group">
								                <span class="input-group-addon"><i class="fa fa-calendar calendar" style="cursor:pointer;" onclick="javascript:showDatePicker(this,'vStartDate')"></i></span>
								                <input type="text" class="form-control maskDateInput" id="vStartDate">
	              							</div>
										</div>
									</div>
									<div class="col-lg-2 col-sm-2">
										<div class="input-group">
											<div class="input-group">
								                <span class="input-group-addon"><i class="fa fa-calendar calendar" style="cursor:pointer;" onclick="javascript:showDatePicker(this,'vEndDate')"></i></span>
								                <input type="text" class="form-control maskDateInput" id="vEndDate">
	              							</div>
										</div>
									</div>
									<div class="col-lg-2">
										<div class="form-group pull-right margin-bottom-0">
											<button class="btn btn-default btn-sm height-34" id="btnReset">초기화</button>
											<button class="btn btn-success btn-sm height-34" id="btnSearch">조회</button>
										</div>
									</div>
								</div>
							</div>
						</div>
						<table width="100%" class="table table-bordered table-striped" id="gridUserDataList" cellspacing="0">
							<thead>
								<tr>
									<th class="text-center"><input type="checkbox" class="chkDataAll" name="select_all" value="1" id="select-all"></th>
									<th class="text-center">연구구분</th>
									<th class="text-center">작성자</th>
									<th class="text-center">연구항목 조건명</th>
									<th class="text-center">데이터명</th>
									<th class="text-center">건수</th>
									<th class="text-center">용량</th>
									<th class="text-center">저장기간</th>
									<th class="text-center">등록일자</th>
								</tr>
							</thead>
							<tbody></tbody>
						</table>
					</div>
					<div class="pull-right">
						<button class="btn btn-block btn-danger btn-sm" id="btnDataDelete">삭제</button>
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
<script src="<c:url value="/js/admin/userDataMgmt.js" />"></script>






<!-- 모달영역 -->
<!-- 나의 사용량 -->
<div class="modal fade bs-example-modal-lg" id="modalMyData" tabindex="-1" role="dialog" aria-labelledby="modalMyDataLabel">
	<div class="modal-dialog modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="modalMyDataLabel"><span id="myName"></span> 사용량 조회</h4>
			</div>
			<div class="modal-body">
                <div class="row">
					<div class="col-lg-12" id="myDataArea">
						<h4 style="text-align:right;">총 사용량 : <span id="totalSize"></span></h4>
						<div class="height-60vmin" style="overflow-y:scroll; overFlow-x:hidden;">
							<table class="table table-bordered" id="gridUserDataDetail" width="100%" >
								<thead>
									<tr>
										<th class="text-center">번호</th>
										<th class="text-center">데이터명</th>
										<th class="text-center">데이터건수</th>
										<th class="text-center">테이블크기</th>
									</tr>
								</thead>
								<tbody></tbody>
							</table>
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

<!-- 사용자 데이터 삭제 -->
<div class="modal fade bs-example-modal-lg" id="modalDataDel" tabindex="-1" role="dialog" aria-labelledby="modalDataDelLabel">
	<div class="modal-dialog modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="modalDataDelLabel">사용자 데이터 삭제</h4>
			</div>
			<div class="modal-body">
                <div class="row margin-top-10">
					<div class="col-lg-12" id="dataDelArea">
						<div class="progress">
							<div class="progress-bar progress-bar-primary progress-bar-striped active" role="progressbar" id="progress-bar" style="width: 0%; height:100px;">
							test
							</div>
						</div>
	                </div>
                </div>
                <div class="row">
                	<div class="col-lg-12">
                		<h4 class="pull-right">삭제/전체 : <span id="delPer"></span><span id="delCount">0/0</span></h4>
                	</div>
                </div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">닫기</button>
			</div>
		</div>
	</div>
</div>
