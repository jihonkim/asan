<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
	
<!-- Content Header (Page header) -->
<section class="content-header">
	<h1>
		사용자 관리
	</h1>
	<ol class="breadcrumb">
		<li><a href="#"><i class="ion ion-erlenmeyer-flask"></i> 관리자</a></li>
		<li class="active">사용자 관리</li>
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
					<h3 class="box-title">사용자목록</h3>
				</div>
				
				<div class="box-body min-height-294">
					<!-- chat item -->
					<div class="item">
						<div class="box-tools">
							<div class="row">
								<div class="col-lg-2">
									<div class="form-group">
										<select class="default-select2 form-control input-sm" name="searchCondition" id="searchKey" title="검색유형">
											<option value="000">전체</option>
											<option value="001">ID</option>
											<option value="002">이름</option>
											<option value="003">부서명</option>
											<option value="004">직급</option>
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
								
								<div class="col-lg-8 align-right">
					                <div class="input-group input-group-sm">
										<button type="button" class="btn btn-success btn-sm" id="btnInitPassword" style="display:none;">비밀번호초기화</button>
									</div>
								</div>
							</div>
						</div>
						<table width="100%" class="table table-bordered table-striped" id="gridUserList" cellspacing="0">
							<thead>
								<tr>
									<th class="text-center">No.</th>
									<th class="text-center">아이디</th>
									<th class="text-center">이름</th>
									<th class="text-center">부서</th>
									<th class="text-center">직급</th>
									<!--비밀번호 변경
									 <th class="text-center">비밀번호</th> -->
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

<!-- 크롬 autocomplete 기능 적용안되므로 트릭으로 처리 -->
<div style="position: absolute;left:-999px;">
	<input type="text" name="tricId" style="">
</div>
<!-- /.content -->
<!-- 페이지용 js -->
<script src="<c:url value="/js/admin/user.js" />"></script>





<!-- 관리자 > 사용자 비밀번호 변경 modal -->
<div class="modal fade" id="passwordModal" tabindex="-1" role="dialog" aria-labelledby="passwordModalLabel">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="passwordModalLabel"><span id="passwordModalId"></span> 비밀번호 변경</h4>
			</div>
			<div class="modal-body">
				<input type="hidden" class="form-control" id="txtPerCode">
				<input type="hidden" class="form-control" id="txtInstcd">
				<input type="password" class="form-control" id="txtChangePerPass">
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal" id="btnPasswordClose">취소</button>
				<button type="button" class="btn btn-success" id="btnChangePassword">비밀번호 변경</button>
			</div>
		</div>
	</div>
</div>
