<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>


<!-- Content Header (Page header) -->
<section class="content-header">
	<h1>
		정형보고서 관리
	</h1>
	<ol class="breadcrumb">
		<li><a href="#"><i class="ion ion-erlenmeyer-flask"></i> 관리자</a></li>
		<li class="active">연구항목 관리</li>
	</ol>
</section>
<!-- Main content -->
<section class="content">
	<div class="row">
		<!-- Left col -->
		<section class="col-lg-5">					
			<div class="box">
				<div class="box-header">
					<i class="ion ion-ios-list-outline"></i>
					<h3 class="box-title">정형보고서 분류</h3>
				</div>
				<div class="box-body" style="min-height:700px;">
					<div class="item" id="jqxReportCateList"></div>
				</div>
				<div class="box-footer text-right">
					<button type="button" id="btnDelCategory" class="btn btn-danger btn-md">
						<span class="glyphicon glyphicon-remove"></span> 분류삭제
					</button>
					<button type="button" id="btnUpdCategory" class="btn btn-info btn-md">
						<span class="glyphicon glyphicon-edit"></span> 분류수정
					</button>
					<button type="button" id="btnAddCategory" class="btn btn-success btn-md">
						<span class="glyphicon glyphicon-plus"></span> 분류 추가
					</button>
				</div>
			</div>
		</section>
		<!-- /.Left col -->
		
		<section class="col-lg-7">					
			<div class="box">
				<div class="box-header">
					<i class="ion ion-ios-list-outline"></i>
					<h3 class="box-title">정형보고서 목록</h3>
				</div>
				<div class="box-body" style="min-height:700px;">
					<div class="item" id="jqxReportPageList"></div>
				</div>
				<div class="box-footer text-right">
					<button type="button" id="btnDelReportPage" class="btn btn-danger btn-md">
						<span class="glyphicon glyphicon-remove"></span> 보고서 삭제
					</button>
					<button type="button" id="btnUpdReportPage" class="btn btn-info btn-md">
						<span class="glyphicon glyphicon-edit"></span> 보고서 수정
					</button>
					<button type="button" id="btnAddReportPage" class="btn btn-success btn-md">
						<span class="glyphicon glyphicon-plus"></span> 보고서 추가
					</button>
				</div>
			</div>
		</section>
	</div>
</section>


<script src="<c:url value="/js/jquery.json.js" />"></script>
<script src="<c:url value="/js/admin/reportMgmt.js" />"></script>

<!-- 분류 추가, 수정, 상세 -->
<div class="modal fade bs-example-modal-lg" data-backdrop="static" id="modalCategory" tabindex="-1" role="dialog" aria-labelledby="modalCategory">
	<div class="modal-dialog modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title" id="modalMenuRegLabel">정형보고서 분류 관리</h4>
			</div>
			<div class="modal-body">
				<form id="frmCategory">
					<table id="tblCategory" class="table">
					    <colgroup>
					    	<col width="120px">
					    	<col width="*">
					    	<col width="120px">
					    	<col width="*">
					    </colgroup>
					    
					    <tbody>
					    	<tr>
					    		<th class="required padding-top-5"><label>분류명</label></th>
					    		<td colspan="3">
					    			<input type="hidden" class="form-control" id="txtSEQ" name="SEQ" maxlength="100"/>
					    			<input type="text" class="form-control" id="txtNAME" name="NAME" maxlength="100"/>
					    		</td>
					    	</tr>
					    	
					    	<tr>
					    		<th class="required padding-top-5"><label>아이콘경로</label></th>
					    		<td colspan="3">
					    			<input type="text" class="form-control" id="txtICON_PATH" name="ICON_PATH" maxlength="100"/>
					    		</td>
					    	</tr>
					    	
					    	<tr>
					    		<th><label class="control-label padding-top-5">표시여부</label></th>
					    		<td>
					    			<label class="padding-top-5">
					    				<input type="checkbox" id="chkSHOW_YN" name="SHOW_YN" value="Y" class="minimal chkSHOW_YN ">
					    			</label>
					    		</td>
					    		<th><label class="control-label padding-top-5" >순서</label></th>
					    		<td>
					    			<input type="text" class="form-control" id="txtORDER" name="ORDER" maxlength="100" readonly/>
					    		</td>
					    	</tr>
					    	<c:set var="SITE_CODE" value="${SITE_CODE}" />
							<c:choose>
								<c:when test="${SITE_CODE eq 'UUH'}">
					    	<tr>
					    		<th><label class="control-label padding-top-5">구분</label></th>
					    		<td>
				    				<label class="padding-top-5">
										<input type="radio" id="chkSHOW_GUN_CDW" name="SHOW_GUN" value="CDW" class="minimal chkSHOW_YN " checked="" style="position: absolute; opacity: 0;">
										&nbsp;CDW
									</label>
								</td>
					    		<td>
									<label class="padding-top-5">
										<input type="radio" id="chkSHOW_GUN_RG" name="SHOW_GUN" value="RG" class="minimal chkSHOW_YN" style="position: absolute; opacity: 0;" >
										&nbsp;RG
									</label>
					    		</td>
					    	</tr>
					    	</c:when>
					    	</c:choose>
						</tbody>
					</table>
				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal" id="btnCloseCategory">취소</button>
				<button type="button" class="btn btn-success" id="btnSaveCategory">저장</button>
			</div>
		</div>
	</div>
</div>



<!-- 보고서 추가, 수정, 상세 -->
<div class="modal fade bs-example-modal-lg" data-backdrop="static" id="modalReportPage" tabindex="-1" role="dialog" aria-labelledby="modalReportPage">
	<div class="modal-dialog modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title" id="modalMenuRegLabel">정형보고서 분류 관리</h4>
			</div>
			<div class="modal-body">
				<form id="frmReportPage">
					<input type="hidden" class="form-control" id="txtSEQ" name="SEQ" maxlength="100"/>
					<table id="tblReportPage" class="table">
					    <colgroup>
					    	<col width="120px">
					    	<col width="*">
					    	<col width="120px">
					    	<col width="*">
					    </colgroup>
					    
					    <tbody>
					    	<tr>
					    		<th><label class=" padding-top-5">분류코드</label></th>
					    		<td >
					    			<input type="text" class="form-control" id="txtCATE_CODE" name="CATE_CODE" maxlength="100" readonly/>
					    		</td>
					    		
					    		<th><label class=" padding-top-5">분류명</label></th>
					    		<td>
					    			<input type="text" class="form-control" id="txtCATE_NM" name="CATE_NM" maxlength="100" readonly/>
					    		</td>
					    	</tr>
					    	
					    	<tr>
					    		<th class="required"><label class=" padding-top-5">제목</label></th>
					    		<td colspan="3">
					    			<input type="text" class="form-control" id="TITLE" name="TITLE" maxlength="100"/>
					    		</td>
					    	</tr>
					    	
					    	<tr>
					    		<th class="required"><label class=" padding-top-5">보고서 URL</label></th>
					    		<td colspan="3">
					    			<input type="text" class="form-control" id="txtURL" name="URL" maxlength="1000"/>
					    		</td>
					    	</tr>
					    	
					    	<tr>
					    		<th ><label class=" padding-top-5">사용자ID</label></th>
					    		<td colspan="3">
					    			<input type="text" class="form-control" id="txtUSER_ID" name="USER_ID" />
					    		</td>
					    	</tr>
					    	
					    	<tr>
					    		<th ><label class=" padding-top-5">TARGET ID</label></th>
					    		<td>
					    			<input type="text" class="form-control" id="txtTARGET_ID" name="TARGET_ID" />
					    		</td>
					    		
					    		<th ><label class=" padding-top-5">권한코드</label></th>
					    		<td>
					    			<select class="default-select4 form-control input-sm" id="selAUT_CODE" name="AUT_CODE" >
										<option value="000">전체</option>
									</select>
									
					    			<!-- <input type="text" class="form-control" id="txtAUT_CODE" name="AUT_CODE" /> -->
					    		</td>
					    	</tr>
					    	<tr>
					    		<th><label class="control-label padding-top-5">표시여부</label></th>
					    		<td>
					    			<label class="padding-top-5">
					    				<input type="checkbox" id="chkSHOW_YN_PAGE" name="SHOW_YN" value="Y" class="minimal chkSHOW_YN_PAGE">
					    			</label>
					    		</td>
					    		<th><label class="control-label padding-top-5" ></label></th>
					    		<td>
					    			<input type="hidden" class="form-control" id="txtORDER" name="ORDER" maxlength="100" readonly/>
					    		</td>
					    	</tr>
						</tbody>
					</table>
				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal" id="btnCloseReportPage">취소</button>
				<button type="button" class="btn btn-success" id="btnSaveReportPage">저장</button>
			</div>
		</div>
	</div>
</div>




