<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"  uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>

<c:set var="context" value="${pageContext.request.contextPath }"></c:set>
	
<!-- Content Header (Page header) -->
<section class="content-header">
	<h1>
		환자 첨부파일 목록
	</h1>
	<ol class="breadcrumb">
		<li><a href="#"><i class="ion ion-erlenmeyer-flask"></i> 관리자</a></li>
		<li class="active">환자 첨부파일 목록</li>
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
					<h3 class="box-title">첨부파일</h3>
				</div>
				
				<div class="box-body min-height-294">
					<table width="100%" class="table table-bordered table-striped" id="gridUserList" cellspacing="0">
						<thead>
							<tr>
								<th class="text-center">환자ID(연구용)</th>
								<th class="text-center">파일명</th>
								<th class="text-center">파일크기(byte)</th>
								<th class="text-center">등록자</th>
								<th class="text-center">등록일자</th>
								<th class="text-center">삭제</th>
							</tr>
						</thead>
						
						<tbody>
							<c:forEach items="${clinicalFileList}" var="clinicalFile" varStatus="status" >
								<tr>
									<td class="text-center">${clinicalFile.TITLE }</td>
									<td>
										<a href="javascript:fileDownload('${clinicalFile.ATTACH_PATH }','${clinicalFile.SAVE_FILE_NAME }','${clinicalFile.FILE_NAME }');">
											${clinicalFile.FILE_NAME }
										</a>
									</td>
									<td class="text-right">
									<fmt:formatNumber type="number" maxFractionDigits="3" value="${clinicalFile.ATTACH_SIZE }" />
									</td>
									<td class="text-center">${clinicalFile.PER_NAME }</td>
									<td class="text-center">${clinicalFile.UDT_DT }</td>
									<td class="text-center">
										<a href="javascript:removeFile('${clinicalFile.DOCUMENT_SEQ }','${clinicalFile.SEQ }');" class="btn btn-danger btn-sm">삭제</a>
									</td>
								</tr>
							</c:forEach>
						</tbody>
						
					</table>
				</div>
			</div>
			
		</section>
		<!-- /.Left col -->
	</div>
	<!-- /.row (main row) -->
</section>
<form id="formAttach" name="formAttach" method="POST" >
	<input type="hidden" id="DOCUMENT_SEQ" name="DOCUMENT_SEQ" value="" />
	<input type="hidden" id="SEQ" name="SEQ" value="" />
	<input type="hidden" id="path" name="path" value="" />
	<input type="hidden" id="SAVE_FILE_NAME" name="SAVE_FILE_NAME" value="" />
	<input type="hidden" id="FILE_NAME" name="FILE_NAME" value="" />
</form>

<script type="text/javascript">
	//첨부파일 다운로드
	function fileDownload(ATTACH_PATH,SAVE_FILE_NAME,FILE_NAME){
		var frm = document.formAttach;
		
		frm.path.value=ATTACH_PATH;
		frm.SAVE_FILE_NAME.value=SAVE_FILE_NAME;
		frm.FILE_NAME.value=FILE_NAME;
	
		frm.action = "${context}/dashboard/fileDownload";
		frm.submit();
	}
	
	
	//첨부파일 삭제
	//게시판순번, 첨부파일 순번
	function removeFile(DOCUMENT_SEQ, SEQ){
	var frm = document.formAttach;
		
		frm.DOCUMENT_SEQ.value=DOCUMENT_SEQ;
		frm.SEQ.value=SEQ;
	
		frm.action = "${context}/admin/clinicalfile/removeClinicalFile.do";
		frm.submit();
	}
	
</script>