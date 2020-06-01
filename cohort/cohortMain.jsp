<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>


<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.13.5/jszip.js"></script>
<style>
.with-border{
	    border-bottom: 1px solid #f4f4f4;
	    text-align: left;
}
</style>

<section class="content-header">
	<h1>
		Cohort 선택
	</h1>
	<ol class="breadcrumb">
		<li class="active">Cohort 선택</li>
	</ol>
</section>
<section  class="content">
	<div class="row">
		<div class="col-lg-12">
			<div class="box box-solid">
				<div class="box-header">
					<i class="ion ion-ios-list-outline"></i>
					<div class="box-title">Cohort 현황</div>
					<div class="box-tools pull-right">
				      <!-- Collapse Button -->
				      <button type="button" class="btn btn-box-tool" data-widget="collapse">
				        <i class="fa fa-minus"></i>
				      </button>
				    </div>
				</div>
				<div class="box-body" style="height: 300px; overflow: auto;  overflow-x: hidden; text-align: center;">
			        
				    <div class="row">
				    	<div class="col-lg-12">
				    		<div id="dvExcel">
				    		</div>
				    	</div>
				    </div>
			    
				</div>			    
		    </div>
		</div>
	</div>
	<div class="row" style="margin-right:10px; margin-bottom: 10px;">
		<div class="btn-group pull-right">
			<label id="labelPatientCount"></label><label>patients</label>
		</div>
		<div class="btn-group pull-right">
			<button type="button" class="btn btn-default btn-sm" style="margin-left:10px;"><a href="<c:url value="/cohort/cohortAnalysis" />">Cohort Analysis </a> </button>
			<button type="button" class="btn btn-primary btn-sm" style="margin-left:10px;"> Patient View </button>
			<button type="button" class="btn btn-primary btn-sm" style="margin-left:10px;"> Mutation View </button>
		</div>
	</div>
	<div class="row">
		<div class="col-lg-12">
			<div class="box box-solid">
				<div class="box-header with-border">
					<div class="box-title"><i class="ion ion-ios-list-outline"></i>&nbsp;Filter</div>
				</div>
				<div class="box-body">
			        	<div id="filter-group-cohort" style="    display: flex;">
							<!-- <div class="filter-box-cohort" id="filter_cancer">
								<div class="btn-group">
									<button type="button" class="btn bg-navy btn-flat" style="">
									    Removable Box Example
								    </button>
								    <button type="button" class="btn bg-navy btn-flat delete">
									    <i class="fa fa-times"></i>
									</button>
									
								</div>
							</div> -->
								
						</div>
						<div class="btn-group pull-right">
						 	<button type="button" class="btn btn-default btn-sm pull-right" style="margin-left:10px;"> 검색 </button>
						 </div>
						<div class="input-group pull-right">
							<input type="text">
						</div>
						
				 </div>
			</div>
			<div class="row">
				<section class="col-lg-12">		
					<div class="box box-solid">
						<div class="box-header">
							<i class="ion ion-ios-list-outline"></i>
							<div class="box-title">Cohort List</div>
							<div class="box-tools pull-right">
						      <!-- Collapse Button -->
						      <button type="button" class="btn btn-box-tool" data-widget="collapse">
						        <i class="fa fa-minus"></i>
						      </button>
						    </div>
						</div>
						<div class="box-body" style="height: 500px; overflow: auto;  overflow-x: hidden; text-align: center;">
					        
						    <div class="row">
						    	<div class="col-lg-12" style="float: none;   display: inline-block; width: 80%;">
						    		<div class="" id="jqxCohortList" style="text-align: left;">
						    			<h3 class="with-border">
						    				Breast
						    			</h3>
						    			<div>
						    				<input type="checkbox" id="breast_0" value="0"> <label for="breast_0"> Breast Cancer  </label>
						    				<div class="pull-right">
						    					1919 samples
						    				</div>
						    			</div>
						    			<div>
						    				<input type="checkbox" id="breast_1" value="1"> <label for="breast_1"> Breast Invasive </label>
						    				<div class="pull-right">
						    					1919 samples
						    				</div>
						    			</div>
						    			<div>
						    				<input type="checkbox" id="breast_2" value="2"> <label for="breast_2"> Breast Mero </label>
						    				<div class="pull-right">
						    					1919 samples
						    				</div>
						    			</div>
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
<script src="<c:url value="/js/cohort/cohortMain.js" />"></script>

