<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>


<!-- Content Header (Page header) -->
<section class="content-header">
	<h1>
		동의어사전 관리
	</h1>
	<ol class="breadcrumb">
		<li><a href="#"><i class="ion ion-erlenmeyer-flask"></i> 관리자</a></li>
		<li class="active">동의어사전 관리</li>
	</ol>
</section>
<!-- Main content -->
<section class="content">
	<!-- Main row -->
	<div class="row">
		<!-- Left col -->
		<section class="col-lg-4">					
			<div class="box">
				<div class="box-header">
					<i class="ion ion-ios-list-outline"></i>
					<h3 class="box-title">동의어 항목</h3>
				</div>
				<div class="box-body min-height-70vmin" > 
					<!-- item -->
					<div class="item min-height-70vmin" id="synonymTree"></div>
					<!-- /.item -->
				</div> 
				
				<div class="box-footer" style="min-height:60px;">  
					 
				</div>
			</div>
		</section>
		<!-- /.Left col -->
		<!-- Left col -->
		<section class="col-lg-8">					
			<div class="box">
				<div class="box-header">
					<i class="ion ion-ios-list-outline"></i>
					<h3 class="box-title">동의어 사전</h3>
				</div>
				 <!-- min-height-70vmin -->
				<div class="box-body min-height-70vmin" >   
					<!-- item -->
					<div class="item">
						<div class="box-tools">
							<div class="row">
								<div class="col-lg-2">
									<div class="form-group">
										<select class="default-select2 form-control input-sm" name="searchCondition" id="searchKey" title="검색유형">
											<option value="000">전체</option>
											<option value="001">대표어</option>
											<option value="002">동의어</option>
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
									<!-- <div class="form-group pull-right">
										<button class="btn btn-success btnRegPopSynonym" seq="" data-toggle="modal" id="btnAddSynonym" >동의어 추가</button>
									</div> -->
								</div>
							</div>
						</div>
						<div id="jqxGridSynonym"></div>
					</div>
					<!-- /.item -->
				</div>
				<div class="box-footer" style="text-align:right;">
					<button class="btn btn-success btnRegPopSynonym" seq="" data-toggle="modal" id="btnAddSynonym" >
						<span class="glyphicon glyphicon-plus"></span> 동의어 추가
					</button>
					<button type="button" id="btnDelete" class="btn btn-danger btn-md"> 
						<span class="glyphicon glyphicon-remove"></span> 대표어삭제
					</button>
				</div>
			</div>
		</section>
		<!-- /.Left col -->
	</div>
	<!-- /.row (main row) -->
</section>
<!-- /.content -->





<!-- 모달영역 -->
<!-- 동의어 등록/수정 -->
<div class="modal fade bs-example-modal-lg" data-backdrop="static" id="modalSynonymReg" tabindex="-1" role="dialog" aria-labelledby="modalBoardRegLabel">
	<div class="modal-dialog modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="modalBoardRegLabel">동의어 관리</h4>
			</div>
			<div class="modal-body">
				<input type="hidden" class="form-control" id="txtSEQ" maxlength="100" style="width:300px"/>
				<input type="hidden" class="form-control" id="txtITEM_SEQ" maxlength="100" style="width:300px"/>
				<input type="hidden" class="form-control" id="txtITEM_MAP_SEQ" maxlength="100" style="width:300px"/>
				<table id="frmItemMgmt" class="table table-responsive">
					<colgroup>
				    	<col width="120px">
				    	<col width="*">
				    	<col width="120px">
				    	<col width="*">
				    </colgroup>
				    
				    <tbody>
				    	<tr>
				    		<th class="required">
				    			<label class="control-label padding-top-5">대분류</label>
				    		</th>
				    		<td colspan="3">
				    			<select class="default-select2 form-control input-sm" name="selITEM_CATE" id="selITEM_CATE">
									<option>1</option>
								</select>			    				
				    		</td>
				    	</tr>
				    	
				    	<tr>
				    		<th class="required">
				    			<label class="control-label padding-top-5">중분류</label>
				    		</th>
				    		<td colspan="3">
				    			<select class="default-select2 form-control input-sm" name="selITEM_CATE_DETL" id="selITEM_CATE_DETL">
								</select>
				    		</td>
				    	</tr>
				    	
				    	<tr>
				    		<th class="required">
				    			<label>연구항목</label>
				    		</th>
				    		<td colspan="3">
				    			<select class="default-select2 form-control input-sm" name="selITEM_MGMT" id="selITEM_MGMT">
									
								</select>
				    		</td>
				    	</tr>
				    	
				    	<tr>
				    		<th class="required"><label>대표어</label></th>
				    		<td colspan="3">
				    			<input type="text" class="form-control" id="txtTERM" maxlength="100" />
				    		</td>
				    	</tr>
				    	
				    	
				    	<tr>
				    		<th>
				    			<label>동의어</label>
				    		</th>
				    		<td colspan="3">
				    			<input type="text" class="form-control" id="txtSYNONYM_TERM" maxlength="100" style="margin-right:10px;width:250px;float:left;"/>
				    			<button class="btn btn-danger"  style="margin-bottom:10px;" id="btnAddSynonymTerm">
				    				<span class="glyphicon glyphicon-plus"></span> 추가
				    			</button>
	    						<button class="btn btn-success"  style="margin-bottom:10px;" id="btnDelSynonymTerm">
	    							<span class="glyphicon glyphicon-remove"></span> 삭제
	    						</button>
				    			<div id="jqxListSynonymTermList"></div>
				    			
					           <!--  <div style="font-size: 13px; font-family: Verdana; margin-top: 20px;" id="Events"></div>
					            <div style="font-size: 13px; font-family: Verdana; margin-top: 10px;" id="CheckedItems"></div> -->
				    		</td>
				    	</tr>
				    	
				    	
				    </tbody>
				</table>
				
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-success" id="btnSaveSynonym">
					<span class="glyphicon glyphicon-ok"></span> 저장
				</button>
				<button type="button" class="btn btn-default" data-dismiss="modal" id="btnCloseSynonym">
					<span class="glyphicon glyphicon-remove"></span> 취소
				</button>
				
			</div>
		</div>
	</div>
</div>


<!-- 페이지용 js -->
<script src="<c:url value="/js/admin/synonymDic.js" />"></script>