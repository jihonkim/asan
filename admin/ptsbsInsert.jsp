<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>


<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.13.5/jszip.js"></script>
<style>

</style>

<section class="content-header">
	<h1>
		유래물 비코드 업로드
	</h1>
	<ol class="breadcrumb">
		<li><a href="#"><i class="ion ion-erlenmeyer-flask"></i> 관리자</a></li>
		<li class="active">유래물 비코드 업로드</li>
	</ol>
</section>
<section  class="content">
	<div class="row">
		<div class="col-lg-12">
			<div class="box">
				<div class="box-body">
			        	<div class="fileArea" style="display: inline-block; ">
						    <input class="custom-file" type="file" id="fileUpload" />
						</div>
						<button type="button" class="btn btn-primary btn-sm" id="upload" > Upload </button>
						<div id="ptsTotal"  style="display: inline-block; float:right;">
							
						</div>
						
				</div>
			</div>
			<div class="row">
				<section class="col-lg-6">		
					<div class="box">
						<div class="box-header">
							<i class="ion ion-ios-list-outline"></i>
							<h3 class="box-title">엑셀파일</h3>
						</div>
						<div class="box-body" style="min-height:500px; height:70vh; overflow: auto;  overflow-x: hidden; text-align: center;">
					        
						    <div class="row">
						    	<div class="col-lg-12">
						    		<div id="dvExcel">
						    		</div>
						    	</div>
						    </div>
					    
						</div>			    
				    </div>
			    </section>
			    <section class="col-lg-6">		
					<div class="box">
						<div class="box-header">
							<i class="ion ion-ios-list-outline"></i>
							<h3 class="box-title"> 적재 등록 내역 </h3>
						</div>
						<div class="box-body" style="min-height:500px; height:70vh;  overflow: auto;  overflow-x: hidden; text-align: center;">
					        
						    <div class="row">
						    	<div class="col-lg-12">
						    		<div id="resultExcel">
						    		</div>
						    	</div>
						    </div>
					    
						</div>			    
				    </div>
			    </section>
		    </div>
	    </div>
	</div>
</section>
<script src="<c:url value="/js/admin/ptsbsInsert.js" />"></script>

