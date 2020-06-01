<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!-- Content Header (Page header) -->
<section class="content-header">
	<h1>
		항목 관리
	</h1>
	<ol class="breadcrumb">
		<li><a href="#"><i class="ion ion-erlenmeyer-flask"></i> 관리자</a></li>
		<li class="active">항목 관리</li>
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
					<h3 class="box-title">항목 등록</h3>
				</div>
				<div class="box-body">
					<!-- item -->
					<div class="item">
						<div class="box-tools">
							<table id="tblSearch" class="table table-responsive search ">
							    <colgroup>
							    	<col width="100px">
							    	<col width="200px">
							    	<col width="100px">
							    	<col width="250px">
							    	<col width="100px">
							    	<col width="*">
							    </colgroup>
							    
							    <tbody>
							    	<tr>
							    		<th style="">대분류</th>
							    		<td>
											<select class="default-select4 form-control input-sm" name="" id="selItemCateList">
												<option value="000">전체</option>
											</select>
							    		</td>
							    		<th><label>중분류</label></th>
							    		<td>
											<select class="default-select2 form-control input-sm" name="" id="selItemCateDetlList" >
												<option value="000">전체</option>
											</select>
							    		</td>
							    		<th></th>
							    		<td>
										</td>
							    	</tr>
							    </tbody>
							</table>
						</div>
					</div>
					<!-- /.item -->
				</div>
				<div class="box-footer">
					<div class="pull-right">
						<button type="button" class="btn bg-orange btn-sm" id="btnInitSearch">초기화</button>&nbsp;
						<button type="button" class="btn bg-olive btn-sm" id="btnSearch">항목 조회</button>
					</div>
				</div>
			</div>
		</section>
		<section class="col-lg-12">					
			<div class="box">
				<div class="box-header">
					<i class="ion ion-ios-list-outline"></i>
					<h3 class="box-title">항목 관리</h3>
				</div>
				<div class="box-body">
					<!-- item -->
					<div class="item" id="jqxResearchItemList"></div>
					<!-- /.item -->
				</div>
				<div class="box-footer">
					<div class="pull-right">
						<button type="button" class="btn bg-maroon btn-sm" id="btnDel">삭제</button>&nbsp;
						<button type="button" class="btn bg-orange btn-sm" id="btnUpd">수정</button>&nbsp;
						<button type="button" class="btn bg-olive btn-sm" id="btnAdd">신규</button>
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
<script src="<c:url value="/js/admin/researchItem.js" />"></script>

<div class="modal fade bs-example-modal-lg" id="itemMgmtAddModal" tabindex="-1" role="dialog" aria-labelledby="itemMgmtAddModal">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
				<span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="exampleModalLabel">항목등록</h4>
			</div>
			
			<div class="modal-body">
				<form id="form-item-regist">
					<h4>▷ 항목분류</h4>
					<table id="tblItemRegist" class="table">
					    <colgroup>
					    	<col width="120px">
					    	<col width="*">
					    </colgroup>
					    <thead>
					    	
					    </thead>
					    <tbody>
					    	<tr>
					    		<th class="required"><label class="padding-top-5">대분류</label></th>
					    		<td >
					    			<select id="selItemCate" name="ITEM_CATE" class="default-select2 form-control input-sm" >
										<option value="">선택</option>
									</select>
					    		</td>
					    	</tr>
					    	<tr>
					    		<th class="required"><label class="padding-top-5">중분류</label></th>
					    		<td >
					    			<select id="selItemCateDetl" name="ITEM_CATE_DETL" class="default-select2 form-control input-sm" >
										<option value="">선택</option>
									</select>
					    		</td>
					    	</tr>
					    </tbody>
					 </table>
					 
					 <hr class="simple">
					 <h4>▷ 관리항목</h4>
					 <table id="tblItemRegist" class="table">
						<colgroup>
							<col width="120px">
							<col width="*">
						</colgroup>
						<thead>
							
						</thead>
						<tbody>
							<tr>
								<th class="required"><label class="padding-top-5">항목ID</label></th>
								<td>
									<input type="text" class="form-control" id="valITEM_ID" maxlength="100"/>
								</td>
							</tr>
							<tr>
								<th class="required"><label class="padding-top-5">항목명</label></th>
								<td>
									<input type="text" class="form-control" id="valITEM_NM" maxlength="100"/>
								</td>
							</tr>
							<tr>
								<th><label class="padding-top-5">항목설명</label></th>
								<td>
									<input type="text" class="form-control" id="valITEM_DESC" maxlength="100"/>
								</td>
							</tr>							
						</tbody>
					 </table>
				</form>
			</div>
			
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal" id="btnItemMgmtClose">취소</button>
				<button type="button" class="btn btn-primary" id="btnRegistItemMgmt">저장</button>
			</div>
		</div>
	</div>
</div>
		

<!-- 항목수정 -->
<div class="modal fade" id="itemMgmtUpdModal" tabindex="-1" role="dialog" aria-labelledby="itemMgmtUpdModal">
	<div class="modal-dialog" role="document" >
	<!-- modal-wide -->
		<div class="modal-content" style="width:800px;">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="exampleModalLabel">항목수정</h4>
			</div>
			
			<div class="modal-body">
				<div class="box margin-bottom-5">
					<div class="box-header height-28" style="padding:4px 10px;">기본 설정</div>
					<div class="box-body">
						<table id="frmItemMgmt" class="table table-responsive">
						    <colgroup>
						    	<col width="20%">
						    	<col width="30%">
						    	<col width="20%">
						    	<col width="30%">
						    </colgroup>
						    
						    <tbody>
						    	<tr>
						    		<th class="required vertical-align-middle"><label>분류</label></th>
						    		<td class="padding-5" colspan="3">
						    			<span id="txtITEM_CATE_FULL"></span>
						    			<!-- <input type="text" class="form-control" id="txtITEM_CATE_FULL" maxlength="100"/> -->
						    		</td>
						    	</tr>
						    	<tr>
						    		<th class="required vertical-align-middle"><label>항목ID</label></th>
						    		<td class="padding-5" colspan="3">
						    			<span id="txtITEM_ID"></span>
						    			<!-- <input type="text" class="form-control" id="txtITEM_ID" maxlength="100"/> -->
						    		</td>
						    	</tr>
						    	<tr>
						    		<th class="vertical-align-middle"><label>항목명</label></th>
						    		<td class="padding-5" colspan="3">
						    			<input type="text" class="form-control" id="txtITEM_NM" maxlength="100"/>
						    		</td>
						    	</tr>
						    	
						    	<tr>
						    		<th class="vertical-align-middle">
						    			<label>항목설명</label>
						    		</th>
						    		<td class="padding-5" colspan="3">
						    			<input type="text" class="form-control" id="txtITEM_DESC" maxlength="100" title="항목설명"/>
						    		</td>
						    	</tr>
						    	<tr>
						    		<th class="vertical-align-middle">
						    			<label>수정일자</label>
						    		</th>
						    		<td class="padding-5" colspan="3">
						    			<span id="txtUDT_DT"></span>
						    		</td>
						    	</tr>
						    	<input type="hidden" name="txtSEQ" id="txtSEQ">
						    	<!-- <tr>
						    		<th class="required vertical-align-middle">
						    			<label class="control-label padding-top-5">조회여부</label>
						    		</th>
						    		<td class="padding-5" colspan="3">
						    			<input type="checkbox" name="chkSEARCH_YN" id="chkSEARCH_YN" class="minimal searchChk">
						    		</td>
						    	</tr> -->
						    	<tr>
						    		<th class="vertical-align-middle">
						    			<label class="control-label">기본항목여부</label>
						    		</th>
						    		<td class="padding-5" colspan="3">
						    			<input type="checkbox" name="chkDEFAULT_YN" id="chkDEFAULT_YN" class="minimal defaultChk">
						    		</td>
						    	</tr>
						    </tbody>
						</table>
					</div>
				</div>
				<div id="option_for_dashboard_item" class="box margin-bottom-5">
					<div class="box-header height-28" style="padding:4px 10px;">옵션 설정</div>
					<div class="box-body">
						<table class="table table-responsive">
						    <colgroup>
						    	<col width="20%">
						    	<col width="30%">
						    	<col width="20%">
						    	<col width="30%">
						    </colgroup>						    
						    <tbody>						    	
						    	<tr>
						    		<th class="vertical-align-middle">
						    			<label class="control-label">항목타입</label>
						    		</th>
						    		<td colspan="3" class="padding-5" colspan="3">
						    			<select class="default-select2 form-control input-sm" name="selITEM_TYPE" id="selITEM_TYPE">
						    			</select>
						    		</td>
						    	</tr>
						    	<tr>
						    		<th class="vertical-align-middle">
						    			<label class="control-label">차트타입</label>
						    		</th>
						    		<td colspan="3" class="padding-5">
						    			<select class="default-select2 form-control input-sm" name="selCHART_TYPE" id="selCHART_TYPE">
						    			</select>
						    		</td>
								</tr>
						    	<tr>
						    		<th class="vertical-align-middle"><label>데이터빈도</label></th>
						    		<td class="padding-5" colspan="3">
						    			<input type="text" class="form-control" id="txtFREQ" maxlength="3"/>
						    		</td>
								</tr>
								<tr>
						    		<th class="vertical-align-middle"><label>ITEM COLUMN</label></th>
						    		<td class="padding-5" colspan="3">
						    			<input type="text" class="form-control" id="txtITEM_COLUMN" maxlength="100"/>
						    		</td>
								</tr>
								<tr>
						    		<th class="vertical-align-middle"><label>ITEM LABEL</label></th>
						    		<td class="padding-5" colspan="3">
						    			<input type="text" class="form-control" id="txtITEM_LABEL" maxlength="100"/>
						    		</td>
								</tr>
						    	<tr>
						    		<th class="vertical-align-middle">
						    			<label>EXEC SQL</label>
						    		</th>
						    		<td class="padding-5" colspan="3">
						    			<textarea class="form-control input-sm" name="txtEXEC_SQL" id="txtEXEC_SQL" rows="5" cols="60" title="항목설명"></textarea>
						    		</td>
								</tr>
						    	<tr>
						    		<th class="vertical-align-middle">
						    			<label>ORIGINAL SQL</label>
						    		</th>
						    		<td class="padding-5" colspan="3">
						    			<textarea class="form-control input-sm" name="txtORIGINAL_SQL" id="txtORIGINAL_SQL" rows="5" cols="60" title="항목설명"></textarea>
						    		</td>
						    	</tr>						   
						    </tbody>
						</table>
					</div>
				</div>				
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal" id="btnCloseItemMgmt">취소</button>
				<button type="button" class="btn btn-primary" id="btnUpdateItemMgmt">저장</button>
			</div>
		</div>
	</div>
</div>



