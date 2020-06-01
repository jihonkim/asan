<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

	
<!-- Content Header (Page header) -->
<section class="content-header">
	<h1>
		공통코드 관리
	</h1>
	<ol class="breadcrumb">
		<li><a href="#"><i class="ion ion-erlenmeyer-flask"></i> 관리자</a></li>
		<li class="active">공통코드 관리</li>
	</ol>
</section>
<!-- Main content -->
<section class="content">
	<!-- Main row -->
	<div class="row">
		<!-- Left col -->
		<div class="col-lg-12">					
			<div class="box">
				<div class="box-header">
					<i class="ion ion-ios-list-outline"></i>
					<h3 class="box-title">그룹코드 관리</h3>
				</div>
				<div class="box-body min-height-294">
					<!-- item -->
					<div class="item">
						<div class="box-tools">
							<div class="row">
								<div class="col-lg-12">
									<div class="form-group pull-right">
										<button class="btn btn-success" num="" data-toggle="modal" data-target="#modalGroupCodeReg" id="btnGroupCodeMake">그룹코드 생성</button>
									</div>
								</div>
							</div>
						</div>
						<div class="margin-top-30"></div>
						
						<table style="width:100%;word-wrap:break-word;table-layout: fixed" class="table table-bordered table-striped font-size-14" id="gridCommonGroupCodeList" cellspacing="0">
							<colgroup>
								<col style="width:40%;"></col>
								<col style="width:40%;"></col>
								<col style="width:20%;"></col>
							</colgroup>
							<thead>
								<tr>
									<th class="text-center">그룹코드</th>
									<th class="text-center">그룹코드명</th>
									<th class="text-center">수정/삭제</th>
								</tr>
							</thead>
						</table>
					</div>
					<!-- /.item -->
				</div>
			</div>
		</div>
		<!-- /.Left col -->
		
	</div>
	<!-- /.row (main row) -->
	
	
	
	<!-- Main row -->
	<div class="row">
		<div class="col-lg-12">	
			<div class="box">
				<div class="box-header">
					<i class="ion ion-ios-list-outline"></i>
					<h3 class="box-title">코드 관리</h3>
				</div>
				<div class="box-body min-height-294">
					<!-- item -->
					<div class="item">
						<div class="box-tools">
							<div class="row">
								<div class="col-lg-2">
									<div class="form-group">
										<select class="default-select2 form-control input-sm" name="searchCondition" id="searchKey" title="검색유형">
											<option value="001">코드</option>
											<option value="002">코드명</option>
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
										<button class="btn btn-success btnRegPopCode" num="" data-toggle="modal" data-target="#modalCodeReg" id="btnCodeMake">코드 생성</button>
									</div>
								</div>
							</div>
						</div>
						<div class="margin-top-30"></div>
						<table width="100%" class="table table-bordered table-striped font-size-14" id="gridCommonCodeList" cellspacing="0">
							<colgroup>
								<col style="width:5%;"></col>
								<col style="width:15%;"></col>
								<col style="width:15%;"></col>
								<col style="width:15%;"></col>
								
								<col style="width:10%;"></col>
								<col style="width:10%;"></col>
								<col style="width:10%;"></col>
								
								<col style="width:5%;"></col>
								<col style="width:5%;"></col>
								<col style="width:10%;"></col>
							</colgroup>
							
							
							<thead>
								<tr>
									<th class="text-center">그룹</th>
									<th class="text-center">코드</th>
									<th class="text-center">코드명</th>
									<th class="text-center">상위코드</th>
									
									<th class="text-center">코드EXT1</th>
									<th class="text-center">코드EXT2</th>
									<th class="text-center">코드EXT3</th>
									
									<th class="text-center">사용여부</th>
									<th class="text-center">순서</th>
									<th class="text-center">수정/삭제</th>
								</tr>
							</thead>
						</table>
					</div>
					<!-- /.item -->
				</div>
			</div>			
		</div>
	</div>
	<!-- /.row (main row) -->

</section>
<!-- /.content -->
<!-- 페이지용 js -->
<script src="<c:url value="/js/admin/commonCodeMgmt.js" />"></script>



<!-- 모달영역 -->
<!-- 그룹코드 등록/수정 -->
<div class="modal fade bs-example-modal-lg" data-backdrop="static" id="modalGroupCodeReg" tabindex="-1" role="dialog" aria-labelledby="modalCodeRegLabel">
	<div class="modal-dialog modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="modalCodeRegLabel">그룹코드 관리</h4>
			</div>
			<div class="modal-body">
				<form name="frm" name="frm" id="frm1" method="post">
					<input type="hidden" id="vSEQ" name="vSEQ" value="">
					
	                <div class="row">
						<div class="col-lg-12 height-40">
			                <div class="form-group required">
								<label class="col-sm-3 control-label padding-top-5">그룹코드ID</label>
								<div class="col-sm-9">
									<input type="text" class="form-control" name="vCommGrpId" id="vCommGrpId">
								</div> 
			                </div>
		                </div>
	                </div>
	                <div class="row">
						<div class="col-lg-12 height-40">
			                <div class="form-group required">
								<label class="col-sm-3 control-label padding-top-5 ">그룹코드 명</label>
								<div class="col-sm-9">
									<input type="text" class="form-control" name="vCommGrpNm" id="vCommGrpNm">
								</div> 
			                </div>
		                </div>
	                </div>
	                
	                <div class="row">
						<div class="col-lg-12 height-40">
			                <div class="form-group">
								<label class="col-sm-3 control-label padding-top-5">상위그룹코드ID</label>
								<div class="col-sm-9">
									<input type="text" class="form-control" name="vUpperCommGrpId" id="vUpperCommGrpId">
								</div> 
			                </div>
		                </div>
	                </div>
				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal" id="btnCloseGroupCode">취소</button>
				<button type="button" class="btn btn-success" id="btnGroupCode">등록</button>
			</div>
		</div>
	</div>
</div>

<!-- 공통코드 등록/수정 -->
<div class="modal fade bs-example-modal-lg" id="modalCodeReg" tabindex="-1" role="dialog" aria-labelledby="modalCodeRegLabel">
	<div class="modal-dialog modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="modalCodeRegLabel">공통코드 관리</h4>
			</div>
			<div class="modal-body">
				
				<form name="frm" name="frm" id="frm2" method="post">
					
					<input type="hidden" id="codeSeq" name="codeSeq" value="">
					<input type="hidden" id="changeSort" name="changeSort" value="" >
					<!-- <input type="hidden" value="" id="changeSort"> -->
					<!-- <input type="hidden" id="vSEQ" name="vSEQ" value=""> -->
					<div class="row">
						<div class="col-lg-12 height-40">
			                <div class="form-group">
								<label class="col-sm-3 control-label padding-top-5">그룹코드명</label>
								<div class="col-sm-9">
									<select class="default-select2 form-control" style="width:100%" id="cGrpCode" name="cGrpCode">
									</select>
								</div> 
			                </div>
		                </div>
	                </div>
	                <div class="row">
						<div class="col-lg-12 height-40">
			                <div class="form-group ">
								<label class="col-sm-3 control-label padding-top-5">상위코드</label>
								<div class="col-sm-9">
									<input type="text" class="form-control" name="cUpperCommCdId" id="cUpperCommCdId">
								</div> 
			                </div>
		                </div>
	                </div>
	                
	                <div class="row">
						<div class="col-lg-12 height-40">
			                <div class="form-group required">
								<label class="col-sm-3 control-label padding-top-5">코드</label>
								<div class="col-sm-9">
									<input type="text" class="form-control" name="cCode" id="cCode">
								</div> 
			                </div>
		                </div>
	                </div>
	                <div class="row">
						<div class="col-lg-12 height-40">
			                <div class="form-group required">
								<label class="col-sm-3 control-label padding-top-5">코드 명</label>
								<div class="col-sm-9">
									<input type="text" class="form-control" name="cCodeName" id="cCodeName">
								</div> 
			                </div>
		                </div>
	                </div>
	                
	                <!-- 코드 확장1 -->
	                <div class="row">
						<div class="col-lg-12 height-40">
			                <div class="form-group">
								<label class="col-sm-3 control-label padding-top-5">코드부가설명1</label>
								<div class="col-sm-9">
									<input type="text" class="form-control" name="commCdExt1" id="commCdExt1">
								</div> 
			                </div>
		                </div>
	                </div>
	                 <!-- 코드 확장2 -->
	                <div class="row">
						<div class="col-lg-12 height-40">
			                <div class="form-group">
								<label class="col-sm-3 control-label padding-top-5">코드부가설명2</label>
								<div class="col-sm-9">
									<input type="text" class="form-control" name="commCdExt2" id="commCdExt2">
								</div> 
			                </div>
		                </div>
	                </div>
	                 <!-- 코드 확장3 -->
	                <div class="row">
						<div class="col-lg-12 height-40">
			                <div class="form-group">
								<label class="col-sm-3 control-label padding-top-5">코드부가설명3</label>
								<div class="col-sm-9">
									<input type="text" class="form-control" name="commCdExt3" id="commCdExt3">
								</div> 
			                </div>
		                </div>
	                </div>
	                
	                <div class="row">
						<div class="col-lg-12 height-40">
			                <div class="form-group">
								<label class="col-sm-3 control-label padding-top-5">코드설명</label>
								<div class="col-sm-9">
									<input type="text" class="form-control" name="cCodeDesc" id="cCodeDesc">
								</div> 
			                </div>
		                </div>
	                </div>
	                <div class="row">
						<div class="col-lg-12">
			                <div class="form-group">
								<label class="col-sm-3 control-label padding-top-5">사용</label>
								<div class="col-sm-9">
									<div class="form-group padding-top-5">
										<label class="font-weight-100 margin-right-10">
											<input type="radio" name="cCodeYN" value="Y" class="minimal codeYN" checked="" style="position: absolute; opacity: 0;">
											&nbsp;Yes
										</label>
										<label class="font-weight-100 margin-right-10">
											<input type="radio" name="cCodeYN" value="N" class="minimal codeYN" style="position: absolute; opacity: 0;">
											&nbsp;No
										</label>
									</div>
								</div> 
			                </div>
		                </div>
	                </div>
	                <div class="row">
						<div class="col-lg-12 height-40">
			                <div class="form-group">
								<label class="col-sm-3 control-label padding-top-5">순서</label>
								<div class="col-sm-9">
									<input type="text" class="form-control" name="cCodeOrder" id="cCodeOrder">
								</div> 
			                </div>
		                </div>
	                </div>
				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal" id="btnCloseCode">취소</button>
				<button type="button" class="btn btn-success" id="btnCode">등록</button>
			</div>
		</div>
	</div>
</div>
