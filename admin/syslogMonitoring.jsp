<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<script>

$(document).ready(function(){
	$('ul.nav li').click(function(){
		var tab_id = $(this).attr('data-tab');
		console.log(tab_id)
		$('ul.nav li').removeClass('current');
		$('.tab-content').removeClass('current');

		$(this).addClass('current');
		$("#"+tab_id).addClass('current');
	});
});


</script>
<!-- Content Header (Page header) -->
<section class="content-header">
	<h1>
		SysLog
	</h1>
	<ol class="breadcrumb">
		<li><a href="#"><i class="ion ion-erlenmeyer-flask"></i> 관리자</a></li>
		<li class="active">SysLog</li>
	</ol>
</section>
<!-- Main content -->
<section class="content">
	<!-- Main row -->
	<div class="row">
		<!-- Left col -->
		<section class="col-lg-12">		
			<div class="nav-tabs-custom">
				<ul class="nav nav-tabs" role="tablist">
					<li role="presentation" data-tab="metricbeat" class="active">
						<a data-target="#metricbeat" id="metricbeatTab" href="#metricbeat" role="tab" data-toggle="tab" aria-controls="metricbeat" aria-expanded="true">Web SysLog</a>
					</li>
					<li role="presentation" data-tab="vertica">
						<a data-target="#vertica" role="tab" href="#vertica" id="verticaTab" data-toggle="tab" aria-controls="vertica" aria-expanded="false">Vertica SysLog</a>
					</li>
				</ul>
			</div>
			
			<div id="tabContent" class="tab-content marT10">
				<div role="tabpanel" class="tab-pane fade active in fontstyle" style="overflow: auto;" id="metricbeat" aria-labelledby="metricbeatTab">
					<div class="box col-lg-12">
						<div class="box-header">
							<h3 class="box-title">Web SysLog</h3>
						</div>
						<div class="box-body" style="min-height:470px; background-color: #f2f2f2;">
							<!-- item -->
							<div class="row">
								<div class="col-md-12">
									<iframe src="http://192.168.70.231:5601/app/kibana#/dashboard/c96ea130-5a8d-11e9-88e0-efa60cc3d4c3?embed=true&_g=(refreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-1h%2Cmode%3Aquick%2Cto%3Anow))" height="425" width="100%" frameborder="0"></iframe>
									<iframe src="http://192.168.70.231:5601/app/kibana#/dashboard/83203610-5b48-11e9-aeea-a51ae79d7033?embed=true&_g=(refreshInterval%3A(pause%3A!f%2Cvalue%3A30000)%2Ctime%3A(from%3Anow-24h%2Cmode%3Aquick%2Cto%3Anow))" height="425" width="100%" frameborder="0"></iframe>
								</div>
							</div>
							
							<!-- /.item -->
						</div>
					</div>
				</div>
				<div role="tabpanel" class="tab-pane fade fontstyle" style="overflow: auto;" id="vertica" aria-labelledby="verticaTab">
					<div class="box col-lg-12">
						<div class="box-header">
							<h3 class="box-title">Vertica SysLog</h3>
						</div>
						<div class="box-body" style="min-height:470px;">
							<!-- item -->
							<div class="row">
								<div class="col-md-12">
									<div>
										<iframe src="http://192.168.70.231:5601/app/kibana#/dashboard/463c0fd0-60b1-11e9-8bd8-9b211785cdcd?embed=true&_g=(refreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-1h%2Cmode%3Aquick%2Cto%3Anow))" height="1250" width="100%" frameborder="0"></iframe>
									</div>
								</div>
							</div>
							<!-- /.item -->
						</div>
					</div>
				</div>
			</div>
								
		</section>		
		
	</div>
	<!-- /.row (main row) -->
</section>
<!-- /.content -->
<!-- 페이지용 js -->




