<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

	
<!-- Content Header (Page header) -->
<section class="content-header">
	<h1>
		웹로그 관리
	</h1>
	<ol class="breadcrumb">
		<li><a href="#"><i class="ion ion-erlenmeyer-flask"></i> 관리자</a></li>
		<li class="active">웹로그 관리</li>
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
							<div class="form-group">
								<label class="font-weight-100 margin-right-15">
									<input type="radio" name="logType" value="" class="minimal logChk" checked="" style="position: absolute; opacity: 0;">
									&nbsp;All
								</label>
								<label class="font-weight-100 margin-right-15">
									<input type="radio" name="logType" value="L" class="minimal logChk" style="position: absolute; opacity: 0;">
									&nbsp;Login
								</label>
								<label class="font-weight-100">
									<input type="radio" name="logType" value="P" class="minimal logChk" style="position: absolute; opacity: 0;">
									&nbsp;Page
				                </label>
				                <label class="font-weight-100">
									<input type="radio" name="logType" value="E" class="minimal logChk" style="position: absolute; opacity: 0;">
									&nbsp;Error
				                </label>
				                <!--  연구용/진료용 선택 -->
				                <label class="font-weight-100 margin-right-15" style="margin-left:100px;">
									<input type="radio" name="siteCd" value="" class="minimal siteChk" checked="" style="position: absolute; opacity: 0;">
									&nbsp;All
								</label>
								<label class="font-weight-100 margin-right-15">
									<input type="radio" name="siteCd" value="STUDY" class="minimal siteChk" style="position: absolute; opacity: 0;">
									&nbsp;연구용
								</label>
								<label class="font-weight-100">
									<input type="radio" name="siteCd" value="AMIS" class="minimal siteChk" style="position: absolute; opacity: 0;">
									&nbsp;진료용
				                </label>
				                <!-- <label class="font-weight-100">
									<input type="radio" name="logType" value="Q" class="minimal logChk" style="position: absolute; opacity: 0;">
									&nbsp;Query Log
				                </label> -->
				                <input type="hidden" id="iCheckVal" value="">
				                <input type="hidden" id="iCheckValSiteCd" value="">
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
								<div id="reportrange" class="reportrange" style="background: #fff; cursor: pointer; padding: 5px 10px; border: 1px solid #ccc; width: 100%">
								    <i class="glyphicon glyphicon-calendar fa fa-calendar"></i>&nbsp;
								    <span id="dateVal"></span> <b class="caret"></b>
								</div>
							</div>
							<button class="btn btn-primary btn-sm" id="btnWebSearch">검색</button>
						</div>
						<div class="margin-top-30"></div>
						<table width="100%" class="table table-bordered table-striped" id="gridWebLogList" cellspacing="0">
							<thead>
								<tr>
									<th class="text-center">No.</th>
									<th class="text-center">URL</th>
									<th class="text-center">ID</th>
									<th class="text-center">IP</th>
									<th class="text-center">Type</th>
									<th class="text-center">Site 구분</th>
									<th class="text-center">Date</th>
									<th class="text-center">Message</th>
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
<script src="<c:url value="/js/admin/webLog.js" />"></script>


<!-- 모달영역 -->
<!-- 에러메세지 -->
<div class="modal fade bs-example-modal-lg" id="modalErrMsg" tabindex="-1" role="dialog" aria-labelledby="modalErrMsgLabel">
	<div class="modal-dialog modal-lg width-90p" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="modalErrMsgLabel">Message</h4>
			</div>
			<div class="modal-body">
                <div class="row">
					<!-- <div class="col-lg-12" id="errMsgArea" style="word-break: break-all;"> -->
					<div class="col-lg-12" >
						<textarea class="form-control col-sm-5" rows="30" id="errMsgArea" ></textarea>
						
	                </div>
                </div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">닫기</button>
			</div>
		</div>
	</div>
</div>
