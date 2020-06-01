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
		Transaction
	</h1>
	<ol class="breadcrumb">
		<li><a href="#"><i class="ion ion-erlenmeyer-flask"></i> 관리자</a></li>
		<li class="active">Transaction</li>
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
					<li role="presentation" data-tab="tomcat">
						<a data-target="#tomcat" role="tab" href="#tomcat" id="tomcatTab" data-toggle="tab" aria-controls="tomcat" aria-expanded="false">Tomcat</a>
					</li>
					<li role="presentation" data-tab="bigcenmed2">
						<a data-target="#bigcenmed2" role="tab" href="#bigcenmed2" id="bigcenmed2Tab" data-toggle="tab" aria-controls="bigcenmed2" aria-expanded="false">Bigcenmed2</a>
					</li>
					<li role="presentation" data-tab="mysql">
						<a data-target="#mysql" role="tab" href="#mysql" id="mysqlTab" data-toggle="tab" aria-controls="mysql" aria-expanded="false">SQL</a>
					</li>
				</ul>
			</div>
			
			<div id="tabContent" class="tab-content marT10">
				<div role="tabpanel" class="tab-pane fade active in fontstyle" style="overflow: auto;" id="tomcat" aria-labelledby="tomcatTab">
					<div class="box col-lg-12">
						<div class="box-header">
							<h3 class="box-title">Tomcat</h3>
						</div>
						<div class="box-body" style="min-height:470px;">
							<!-- item -->
							<div class="row">
								<div class="col-md-12">
									<div>
										<iframe src="http://192.168.70.231:5601/app/kibana#/dashboard/afc38ad0-60d1-11e9-8bd8-9b211785cdcd?embed=true&_g=(refreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-1h%2Cmode%3Aquick%2Cto%3Anow))" height="500" width="100%" frameborder="0"></iframe>
										<iframe src="http://192.168.70.231:5601/app/kibana#/dashboard/d14708a0-6b06-11e9-8bd8-9b211785cdcd?embed=true&_g=(refreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-7d%2Cmode%3Aquick%2Cto%3Anow))" height="1000" width="100%" frameborder="0"></iframe>
									</div>
								</div>
							</div>
							<!-- /.item -->
						</div>
					</div>
				</div>
				<div role="tabpanel" class="tab-pane fade fontstyle" style="overflow: auto;" id="bigcenmed2" aria-labelledby="bigcenmed2Tab">
					<div class="box col-lg-12">
						<div class="box-header">
							<h3 class="box-title">Bigcenmed2</h3>
						</div>
						<div class="box-body" style="min-height:470px;">
							<!-- item -->
							<div class="row">
								<div class="col-md-12">
									<div>
										<iframe src="http://192.168.70.231:5601/app/kibana#/dashboard/05016e30-5a89-11e9-88e0-efa60cc3d4c3?embed=true&_g=(refreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-7d%2Cmode%3Aquick%2Cto%3Anow))" height="500" width="100%" frameborder="0"></iframe>
										<iframe src="http://192.168.70.231:5601/app/kibana#/dashboard/dd20ca70-6b20-11e9-8bd8-9b211785cdcd?embed=true&_g=(refreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow%2Fd%2Cmode%3Aquick%2Cto%3Anow%2Fd))" height="500" width="100%" frameborder="0"></iframe>
									</div>
								</div>
							</div>
							<!-- /.item -->
						</div>
					</div>
				</div>
				<div role="tabpanel" class="tab-pane fade fontstyle" style="overflow: auto;" id="mysql" aria-labelledby="mysqlTab">
					<div class="box col-lg-12">
						<div class="box-header">
							<h3 class="box-title">SQL</h3>
						</div>
						<div class="box-body" style="min-height:470px;">
							<!-- item -->
							<div class="row">
								<div class="col-md-12">
									<div>
										<iframe src="http://192.168.70.231:5601/app/kibana#/dashboard/9bfd3450-5f47-11e9-8bd8-9b211785cdcd?embed=true&_g=(refreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow%2Fd%2Cmode%3Aquick%2Cto%3Anow%2Fd))" height="1030" width="100%" frameborder="0"></iframe>										
									</div>
								</div>
							</div>
							<!-- /.item -->
						</div>
					</div>
				</div>
				
			</div>
								
			
			<div id="query" class="tab-content">
				
			</div>
		
		</section>		
		
				
		
	
								
		
	<%-- 	<div class="box">
				<div class="box-header">
					<h3 class="box-title">Filebeat</h3>
				</div>
				<div class="box-body" style="min-height:470px;">
					<!-- item -->
					<div class="row">
						<div class="col-md-6">
							Apache Tomcat
							<div>
								<iframe src="http://192.168.70.231:5601/app/kibana#/dashboard/63394890-59d7-11e9-81b0-fdb851412e84?embed=true&_g=(refreshInterval:(pause:!t,value:0),time:(from:now-1h,mode:quick,to:now))&_a=(description:'tomcat:+dashboard+%EB%B6%84+%EB%8B%A8%EC%9C%84+log+count+%EC%88%98',filters:!(),fullScreenMode:!f,options:(darkTheme:!f,hidePanelTitles:!f,useMargins:!t),panels:!((embeddableConfig:(),gridData:(h:15,i:'1',w:12,x:0,y:0),id:a7a6b1e0-59d0-11e9-81b0-fdb851412e84,panelIndex:'1',type:visualization,version:'6.4.0'),(embeddableConfig:(),gridData:(h:15,i:'2',w:24,x:0,y:15),id:'2c2451a0-59d3-11e9-81b0-fdb851412e84',panelIndex:'2',type:visualization,version:'6.4.0'),(embeddableConfig:(),gridData:(h:16,i:'5',w:24,x:0,y:30),id:'9b97d020-59d3-11e9-81b0-fdb851412e84',panelIndex:'5',type:visualization,version:'6.4.0'),(embeddableConfig:(),gridData:(h:15,i:'6',w:12,x:12,y:0),id:'28da1660-59d8-11e9-81b0-fdb851412e84',panelIndex:'6',type:visualization,version:'6.4.0'),(embeddableConfig:(),gridData:(h:14,i:'7',w:24,x:0,y:46),id:'7fdeb2e0-59d8-11e9-81b0-fdb851412e84',panelIndex:'7',type:visualization,version:'6.4.0')),query:(language:lucene,query:''),timeRestore:!f,title:'%5Btomcat:+dashboard%5D+%EB%B6%84+%EB%8B%A8%EC%9C%84+log+count+%EC%88%98',viewMode:view)" height="500" width="800"></iframe>
								<iframe name="img" class="myFrame" src="<c:url value='/images/kibanaImg/tomcat.png' ></c:url>" onLoad="setIFrameHeight(this)" scrolling="no" style='width:100%' marginwidth=0 marginheight=0 frameborder=0></iframe>
							</div>
						</div>
						<div class="col-md-6">
							CDW
							<div>
								<iframe src="http://192.168.70.231:5601/app/kibana#/dashboard/05016e30-5a89-11e9-88e0-efa60cc3d4c3?embed=true&_g=(refreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-7d%2Cmode%3Aquick%2Cto%3Anow))" height="500" width="800"></iframe>
							</div>
						</div>
					</div>
					
					<!-- /.item -->
				</div>
			</div> --%>
		
		
		<!-- /.Left col -->
	</div>
	<!-- /.row (main row) -->
</section>
<!-- /.content -->
<!-- 페이지용 js -->




