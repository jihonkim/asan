var currentDashboardTab = gvDASHBOARD_TAB;
var checkedPatnoResult = [];
//------------------------------------------------------------------------------------------
// PAGE INIT	
//------------------------------------------------------------------------------------------
$(document).ready(function(){	
	//initTree()
	setTreeData();
	
	setMainPatientBarChart();
	
	//setMainPatientPieChart();
	
	initTreeEvent();
	
	iniDashboard();
	//$(".js-range-slider").ionRangeSlider();
	
});

function iniDashboard(){
	
	var dashboardTab = gvPERINX.DASHBOARD_TAB*1;
	
	$('select[name="inputDashboardRadio"]').val(dashboardTab);
	
	dashboardTab = dashboardTab - 1;
	$('#myTab li:eq('+dashboardTab+') a').tab('show');
}


function setTreeData(){
	var dataTree;
	var promise = http('/dashboard/selCateOncotreeList', 'post', 'false', {});
		/*{$.ajax({
		type: 'get',
		url: 'http://oncotree.mskcc.org/api/tumorTypes',
		async:false,
		dataType: 'json',
		contentType: "application/json"
	});*/
	promise.then(function(result){
		var dataTree;
		console.log(result);
		dataTree =result.selCateOncotreeList;
		
		initTreeC(dataTree);
	
	});
	
}

function initTreeC(dataTree){
	var cnt = 0;
	var width = 1400;
	var height = 1000;
	var dx = 24;
	var dy = width/2.5;
	var margin = ({top: 10, right: 10, bottom: 10, left: 100});

	var diagonal = d3.linkHorizontal()
		.x(function(d){
			return d.y
		})
		.y(function(d){
			return d.x
		});

	var tree = d3.tree().nodeSize([dx, null]);
	var radius = 6;
	/*var circleAttrs = {
	          cx: function(d) { return xScale(d.x); },
	          cy: function(d) { return yScale(d.y); },
	          r: radius
	      };

	var xScale = d3.scaleLinear()
    .domain([0, width])
    .range([0, width]);
	
	var yScale = d3.scaleLinear()
    .domain([0, height])
    .range([0, height]);*/


	

	const root = d3.stratify()
				.id(function(d){return d.ID})
				.parentId(function(d){return d.PARENTS_ID})(dataTree);
			root.x0 = dy / 2;
			root.y0 = 0;
			root.descendants().forEach(function(d, i) {
		    d.id = i;
		    d._children = d.children;
		    d.checked = false;
		    d.search = false;
		    if (d.depth && d.data.ID.length !== 1) d.children = null;
	 });

	
	const svg = d3.select(".cancer-tree").append("svg")
    .attr("viewBox", [-margin.left, -margin.top, width, dx])
    .style("font", "13px sans-serif")
    .style("user-select", "none")
    .style("min-height","500px");
    
	const gLink = svg.append("g")
    .attr("fill", "none")
    .attr("stroke", "#555")
    .attr("stroke-opacity", 0.4)
    .attr("stroke-width", 1.5);

	const gNode = svg.append("g")
    .attr("cursor", "pointer")
    .attr("pointer-events", "all");
	
	
    svg.call(d3.zoom().scaleExtent([1/2,2]).on("zoom", function () {
       gNode.attr("transform", "translate(" + d3.event.transform.x + "," + d3.event.transform.y + ") scale(" + d3.zoomTransform($('svg')[0]).k + ")")
       gLink.attr("transform", "translate(" + d3.event.transform.x + "," + d3.event.transform.y + ") scale(" + d3.zoomTransform($('svg')[0]).k + ")")
       var rang = (d3.zoomTransform(this).k*100).toFixed(2)
       var rang_f = d3.zoomTransform(this).k*50;
       $('#customRange1').val(rang_f);
       $('#rangeScaleVal').text((d3.zoomTransform(this).k*100).toFixed(2)+"%");
    }))
	
	var div = d3.select("body").append("div")
		.attr("class", "treetooltip")
		.style("opacity", 0);
    

    $('#customRange1').on('change',function(){
    	var sz = $(this).val()/50;
    	d3.zoomTransform($('svg')[0]).k = sz;
    	gLink.attr("transform", "translate(" + d3.zoomTransform($('svg')[0]).x + "," + d3.zoomTransform($('svg')[0]).y + ") scale(" + sz + ")");
    	gNode.attr("transform", "translate(" + d3.zoomTransform($('svg')[0]).x + "," + d3.zoomTransform($('svg')[0]).y + ") scale(" + sz + ")");
    	
    	$('#rangeScaleVal').text((sz*100).toFixed(2)+"%")
    })
    
    $("#customText1").keydown(function(key) {
    	if (key.keyCode == 13) {

    		collapseAll();
	    	
			cnt = 0;
        	var searchStr = $('#customText1').val();
	    	if(isNullOrEmpty(searchStr)) return ;
	    	if(searchStr.length <= 2){
	    		showAlert('알림','3 글자 이상만 검색가능합니다.',null);
	    	}
	    	//root = $.extend(true, {}, originRoot);
	    	
			var paths = searchTree(root,searchStr,[]);
			$('#spanSearchResult').text(cnt + ' results');
			paths = Array.from(new Set(paths));
			//alert(cnt + "개를 찾았습니다.");
			
			if(typeof(paths) !== "undefined"){
				openPaths(paths);
			}
			gNode.selectAll('text').style('fill',function(d){
				if(d.search==="found"){
					return "blue";
				}
				else{
					return "black";
				}
			});
			
		}	
	});

    $("#btnTreeSearchText1").on("click", function() {
    		
    	collapseAll();
    	
		cnt = 0;
    	var searchStr = $('#customText1').val();
    	if(isNullOrEmpty(searchStr)) return ;
    	if(searchStr.length <= 2){
    		showAlert('알림','3 글자 이상만 검색가능합니다.',null);
    	}
    	//var root = $.extend(true, {}, root);
    	
		var paths = searchTree(root,searchStr,[]);
		$('#spanSearchResult').text(cnt + ' results');
		paths = Array.from(new Set(paths));
		//alert(cnt + "개를 찾았습니다.");
		
		if(typeof(paths) !== "undefined"){
			openPaths(paths);
		}
		gNode.selectAll('text').style('fill',function(d){
			if(d.search==="found"){
				return "blue";
			}
			else{
				return "black";
			}
		});
        	
    	
	});
    
    $("#collapse_button").click(function(){
        root.children.forEach(collapse);
        update(root);
    });
    
    $('#btnTreeCenter').on('click',function(){
       gNode.attr("transform", "translate(0,0) scale(" + d3.zoomTransform($('svg')[0]).k + ")");
       gLink.attr("transform", "translate(0,0) scale(" + d3.zoomTransform($('svg')[0]).k + ")");
       d3.zoomTransform($('svg')[0]).x = 0
       d3.zoomTransform($('svg')[0]).y = 0
    })
	
    function collapseAll() {
    	root.children.forEach(collapse);
        update(root);
    }
    
	function collapse(d) {
		d.search = false;
    	if (d.children) {
	      //d._children = d.children;
	      d._children.forEach(collapse);
	      d.children = null;
	    }
	}

    function checkupdate(d){
    	d.checked = $('input[value='+d.data.ID+']').is(':checked');
        
        if(d.checked == false){
			if(d.parent == null) return;
			  
			if(d.parent.checked == true){
				d.parent.checked = false;
				  
				$('input[value='+d.parent.data.ID+']').prop('checked',false);
				checkParentupdate(d.parent);
			}
      	  
	      	if(!isNullOrEmpty(d.children)){
	    		for(var i=0; i<d.children.length; i++){
	    			d.children[i].checked = false;
	    			$('input[value='+d.children[i].data.ID+']').prop('checked',false);
	    			checkChildernupdate(d.children[i]);
	    		}
	    	}
      	  
        }
        else{
        	if(!isNullOrEmpty(d.children)){
        		for(var i=0; i<d.children.length; i++){
        			if(d.children[i].data.ONCOTREE_PAT_CNT == 0 || d.children[i].data.ONCOTREE_SPCN_CNT == 0){
        				continue;
        			}
        			d.children[i].checked = true;
        			$('input[value='+d.children[i].data.ID+']').prop('checked',true);
        			checkChildernupdate(d.children[i]);
        		}
        	}
        	
        }
    }
    
    function checkParentupdate(d){
    	d.checked = $('input[value='+d.data.ID+']').is(':checked');
        
        if(d.checked == false){
			if(d.parent == null) return;
			  
			if(d.parent.checked == true){
				d.parent.checked = false;
				  
				$('input[value='+d.parent.data.ID+']').prop('checked',false);
				checkParentupdate(d.parent);
			}
      	  
        }
    }
    
    function checkChildernupdate(d){
    	d.checked = $('input[value='+d.data.ID+']').is(':checked');
        
        if(d.checked == false){
        	
	      	if(!isNullOrEmpty(d.children)){
	    		for(var i=0; i<d.children.length; i++){
	    			d.children[i].checked = false;
	    			$('input[value='+d.children[i].data.ID+']').prop('checked',false);
	    			checkupdate(d.children[i]);
	    		}
	    	}
      	  
        }
        else{
        	if(!isNullOrEmpty(d.children)){
        		for(var i=0; i<d.children.length; i++){
        			if(d.children[i].data.ONCOTREE_PAT_CNT == 0 || d.children[i].data.ONCOTREE_SPCN_CNT == 0){
        				continue;
        			}
        			d.children[i].checked = true;
        			$('input[value='+d.children[i].data.ID+']').prop('checked',true);
        			checkupdate(d.children[i]);
        		}
        	}
        	
        }
    }
    
    
	  function mouseover() {
          div.transition()
          .duration(100)
          .style("opacity", 1);
      }

      function mousemove(d) {
          div
          .html( /*"<label>Main Type : " + d.data.MAINTYPE + "</label></br>"*/
        		  ""+ "환자 수 : " + d.data.ONCOTREE_PAT_CNT + "</br>"
        		  + "검체 수 : " + d.data.ONCOTREE_SPCN_CNT + "</br>")
          .style("left", (d3.event.pageX+15 ) + "px")
          .style("top", (d3.event.pageY+20) + "px");
      }

      function mouseout() {
          div.transition()
          .duration(100)
          .style("opacity", 0);
      } 
      
      function searchTree(obj,search,path){
    	var oname = obj.data.NM;
    	var lowname = oname.toLowerCase();
    	var lowsearch = search.toLowerCase();
    	  //Adrenocortical Adenoma (ACA)
		
    	if(lowname.indexOf(lowsearch) !== -1){ //if search is found return, add the object to the path and return it
			obj.search = "found";
			if(obj.parent !== null){
				path.push(obj.parent);
			}
			cnt++;
		}
		
		if(obj.children || obj._children){ //if children are collapsed d3 object will have them instantiated as _children
			
			if(obj.parent !== null){
				path.push(obj.parent);// we assume this path is the right one
			}
			var children = (obj.children) ? obj.children : obj._children;
			
			var found = [];
			for(var i=0; i<children.length; i++){
				var tmp = searchTree(children[i],search,[]);
				
				found = found.concat(tmp);
				
				
			}
			
			if(found.length != 0){// we were right, this should return the bubbled-up path from the first if statement
				//path.pop();
				path =  path.concat(found);
			}
			else{// we were right, this should return the bubbled-up path from the first if statement
				path.pop();
			}
			
		}
		
		return path;
      }

      function openPaths(paths){
    	  for(var i=0;i<paths.length;i++){
    		  if(paths[i].id !== "0"){//i.e. not root
				//paths[i].search = 'found';
				
				if(paths[i]._children){ //if children are hidden: open them, otherwise: don't do anything
					paths[i].children = paths[i]._children;
			    	//paths[i]._children = null;
				}
				update(paths[i]);
    		  }
    	  }
      }
      
	  
	  function update(source) {
		    const duration = d3.event && d3.event.altKey ? 2500 : 250;
		    const nodes = root.descendants().reverse();
		    const links = root.links();

		    // Compute the new tree layout.
		    tree(root);
		    //d3.tree().nodeSize([root.dx, root.dy]);
		    
		    let left = root;
		    let right = root;
		    root.eachBefore(function(node) {
		      if (node.x < left.x) left = node;
		      if (node.x > right.x) right = node;
		    });

		    var leftDepth = {0: 0};
	        //Indicate the right side depth for specific level (circal point as center)
	        var rightDepth = {0: 0};

	        var numOfPoints = {},
	            maxNumOfPoints = 0;

	        //Calculate maximum length of selected nodes in different levels
	        nodes.forEach(function (d) {
	            var _nameLength = d.data.NM.length * 7 + 50;

	            if (d.depth !== 0) {
	                if (!leftDepth.hasOwnProperty(d.depth)) {
	                    leftDepth[d.depth] = 0;
	                    rightDepth[d.depth] = 0;
	                }

	                //Only calculate the point without child and without showed child
	                if (!d.children && !d._children && rightDepth[d.depth] < _nameLength) {
	                    rightDepth[d.depth] = _nameLength;
	                }

	                //Only calculate the point with child(ren) or with showed child(ren)
	                if ((d.children || d._children) && leftDepth[d.depth] < _nameLength) {
	                    leftDepth[d.depth] = _nameLength;
	                }
	            }
	        });

	        //Calculate the transform information for each node.
	        nodes.forEach(function (d) {
	            if (d.depth === 0) {
	                d.y = 0;
	            } else {
	                var _y = 0,
	                    _length = d.depth;

	                for (var i = 1; i <= _length; i++) {
	                    if (leftDepth[i] === 0) {
	                        //Give constant depth if no point has child or has showed child
	                        if(rightDepth[i - 1]) {
	                            _y += rightDepth[i - 1];
	                        }else{
	                            _y += 50;
	                        }
	                    } else {
	                        if (i > 1) {
	                            _y += leftDepth[i] + rightDepth[i - 1];
	                            if(leftDepth[i] > 0 && rightDepth[i - 1] > 0) {
	                                _y -= 50;
	                            } else {
	                                _y -= 0;
	                            }
	                        } else {
	                            _y += leftDepth[i];
	                        }
	                    }
	                }
	                d.y = _y;
	            }
	        });
		    
		    const height = right.x - left.x + margin.top + margin.bottom;

		    const transition = svg.transition()
		        .duration(duration)
		        .attr("viewBox", [-margin.left, left.x - margin.top, width, height])
		        .tween("resize", window.ResizeObserver ? null : function() { return function() { return svg.dispatch("toggle")}});

		    // Update the nodes…
		    const node = gNode.selectAll("g")
		      .data(nodes, function(d){ return d.id });
		    
		    // Enter any new nodes at the parent's previous position.
		    		    
		    const nodeEnter = node.enter().append("g")
		        .attr("transform", function(d) {return 'translate('+source.y0+','+source.x0+')'})
		        .attr("fill-opacity", 0)
		        .attr("stroke-opacity", 0)
		        
		     
		        
		    nodeEnter.on("mouseover", mouseover)
            .on("mousemove", function(d){mousemove(d);})
            .on("mouseout", mouseout)
            .attr("fill","black")
            .attr("r", 5.5);
		    
		    nodeEnter.append("circle")
		        .attr("r", 5)
		        .attr("fill", function(d) {	
		        	if(d.data.LEVEL == 1) return d.data.COLOR
		        	else return d._children ? "#555" : "rgb(255, 255, 255)"
		        	})
	        	.attr("stroke", function(d) {	
		        	if(d.data.LEVEL == 1) return d.data.COLOR
		        	else return d._children ? "#555" : "#999"
		        	})
		        .attr("stroke-width", 1)
		        .attr("opacity", function(d) {	
		        	if(d.data.LEVEL == 1) return d.data.COLOR
		        	else return d._children ? "1" : "0"
		        	})
		        .on("click", function(d) {
		        	d.children = d.children ? d.children.forEach(collapse) : d._children;
			          update(d);
			        });
		        
		    nodeEnter.append("text")
		        .attr("dy", "0.31em")
		        .attr("x", function(d){ return d._children ? -9 : 9 })
		        .attr("text-anchor", function(d){ return d._children ? "end" : "start" })
		        .text(function(d) { return d.data.NM })
		        .style("fill",function(d) {
					if(d.search==="found"){
						return "blue";
					}
					else{
						return "black";
					}
		        })
		        .on("click", function(d) {		
			        	d.children = d.children ? d.children.forEach(collapse) : d._children;
			        	update(d);
			        })
		        .clone(true).lower();
		      
		    
		    const checkNode = nodeEnter.append("foreignObject")
		    	.attr("dy", "0.31em")
		    	.attr("x", function(d) {return d._children ? 7 : -6 })
		    	.attr("y","-6")
	   			.attr("width","13px")
       			.attr("height", "13px")
		        .html(function(d) {
		        	if (!isNullOrEmpty(d.parent) && d.parent.checked == true){
		        		if(d.data.ONCOTREE_PAT_CNT == 0 || d.data.ONCOTREE_SPCN_CNT == 0){
		        			return '<input type="checkbox" class="input-check-tree" style="height:13px; width:13px; margin:0px; position:absolute;" seq="'+d.data.SEQ+'" value="'+d.data.ID+'" disabled>';;
		        		}
		        		d.checked = true;
		        		return '<input type="checkbox" class="input-check-tree" style="height:13px; width:13px; margin:0px; position:absolute;" seq="'+d.data.SEQ+'" value="'+d.data.ID+'" checked>';
		        	}
		        	else{
		        		d.checked = false;
		        		if(d.data.LEVEL == 0) {
		        			return null;
		        		}
		        		if(d.data.ONCOTREE_PAT_CNT == 0 || d.data.ONCOTREE_SPCN_CNT == 0){
		        			return '<input type="checkbox" class="input-check-tree" style="height:13px; width:13px; margin:0px; position:absolute;" seq="'+d.data.SEQ+'" value="'+d.data.ID+'" disabled>';;
		        		}
		        		return '<input type="checkbox" class="input-check-tree" style="height:13px; width:13px; margin:0px; position:absolute;" seq="'+d.data.SEQ+'" value="'+d.data.ID+'">';
		        	}
		        })
		        .on("change",function(d) {
		        	checkupdate(d)   
			    });
       			
		    // Transition nodes to their new position.
		    const nodeUpdate = node.merge(nodeEnter).transition(transition)
		        .attr("transform", function(d){ 
		        	var len = d.data.NM.length;
		        	
		        	return 'translate('+d.y+','+d.x+')' })
		        .attr("fill-opacity", 1)
		        .attr("stroke-opacity", 1);

		    
		    
		 // Transition exiting nodes to the parent's new position.
		    const nodeExit = node.exit().transition(transition).remove()
		        .attr("transform", function(d) {return 'translate('+source.y+','+source.x+')'})
		        .attr("fill-opacity", 0)
		        .attr("stroke-opacity", 0);
		    

		    
		    // Update the links…
		    const link = gLink.selectAll("path")
		      .data(links, function(d) {return d.target.id});

		    // Enter any new links at the parent's previous position.
		    const linkEnter = link.enter().append("path")
		        .attr("d", function(d) {
		          const o = {x: source.x0, y: source.y0};
		          return diagonal({source: o, target: o});
		        });

		    // Transition links to their new position.
		    link.merge(linkEnter).transition(transition)
		        .attr("d", diagonal);

		    // Transition exiting nodes to the parent's new position.
		    link.exit().transition(transition).remove()
		        .attr("d", function(d) {
		          const o = {x: source.x, y: source.y};
		          return diagonal({source: o, target: o});
		        });

		    // Stash the old positions for transition.
		    root.eachBefore(function(d) {
		      d.x0 = d.x;
		      d.y0 = d.y;
		    });
		    
		    //treeRoot = root;
		  }
	  
	  update(root);


	  
}
function cohortdetlList(){
	
	var dataSet = {};
	//dataSet.CATE_DETL_SEQ = detlSeq;
	
	var promise = http('cohort/selCohortContList', 'post', false , dataSet);
	
	promise.then(function(result){
		
		console.log("delList:::",result);
		var dataView = result.selCohortContList;
		
		return dataView;
		

	});
	
	
}

function setMainPatientBarChart(){
	
	var promise = http('/dashboard/selMainPatientChart', 'post', 'true', {});
	promise.then(function(result){
		console.log(result);
		
		var arrVal = [];
		var arrLabel = [];
		var resultData = result.selMainPatientChart;
		
		for(var i=0; i<resultData.length; i++){
			arrVal.push(resultData[i].CNT);
			arrLabel.push(resultData[i].COMM_CD_NM.replace("Cancer",""));
		}
		
		var barData = [{
			  type: 'bar',
			  x: arrVal.slice(0,25).reverse(),
			  y: arrLabel.slice(0,25).reverse(),
			  orientation: 'h',
			  hovertemplate :
				  "<b>%{x}</b><extra></extra>",
			  marker:{
				color: ['Black','Blue','Cyan','DarkRed','Gainsboro','Gray','Green','HotPink','LightBlue'
					,'LightSalmon','LightSkyblue','LightYellow','LimeGreen','MediumSeaGreen','Orange','PeachPuff'
					,'Purple','Red','SaddleBrown','Teal','Yellow','MediumOrchid','OrangeRed','RoyalBlue','DarkRed']
			  }
			}];

		var barlayout = {
				 	font:{
					    family: 'Raleway, sans-serif'
					  },
					yaxis: {
					    automargin: true,
					    ticklen: 5
					},
					xaxis: {
						automargin: true,
						'tickformat': ',d'
					},
					margin: {
						l: 100,
					    r: 0,
					    t: 50,
					    b: 0
					},
					height : "600",
					width : "250",
					title: {
						text : '<b>Ratio by Primary Sites</b>',
						
					}
			};

		Plotly.newPlot('mainPatientbarChart', barData, barlayout, {displayModeBar: false});
		
		var pieData = [{
			  values: arrVal,
			  labels: arrLabel,
			  hoverinfo: 'label+percent',
			  hole: .4,
			  type: 'pie',
			  textinfo: 'none'
			}];
		
		var pielayout = {
				 height : "250",
				 showlegend: false,
				 margin: {
					    l: 20,
					    r: 20,
					    b: 0,
					    t: 30,
				  }
				};

		Plotly.newPlot('mainPatientpieChart', pieData, pielayout);
		

		$('#mainPatientChartArea').css('height',$('#mainCohortArea').height());
	
	});
	
	
	
}
function setMainPatientPieChart(){
	var data = [{
		  values: [16, 15, 12, 6, 5, 4, 42],
		  labels: ['US', 'China', 'European Union', 'Russian Federation', 'Brazil', 'India', 'Rest of World' ],
		  domain: {column: 0},
		  hoverinfo: 'label+percent+name',
		  hole: .4,
		  type: 'pie'
		}];
	
	var layout = {
			 height : "250",
			 showlegend: false,
			 margin: {
				    l: 20,
				    r: 20,
				    b: 20,
				    t: 20,
			  }
			};

	Plotly.newPlot('mainPatientpieChart', data, layout);
}

function treeChart(){
	
}
function parentCheckChange(d){
	d.checked = false;
	
}

function getParentData(d, selectedTreeArr){
	
	if(selectedTreeArr.indexOf(d.data) == -1 ){
		
		d.data.checked = d.checked;
		selectedTreeArr.push(d.data);
		
		if(!isNullOrEmpty(d.parent)){
			selectedTreeArr = getParentData(d.parent, selectedTreeArr);						
		}
	}
	
	return selectedTreeArr;
}

function getPatnoResultCheck(dataSet, txtArr, last){
	
	var promise = http('dashboard/selPatnoResultCheck', 'post', true , dataSet);
	promise.then(function(result){
		
		//console.log(result);
		var dataView = result.selPatnoResultCheck;
		checkedPatnoResult = checkedPatnoResult.concat(dataView);
		var failArr = [];
		
		for(var i=0; i<txtArr.length; i++){
			if(dataView.indexOf(txtArr[i]) == -1 ) failArr.push(txtArr[i]);
		}

		var html = '';

		var succLen = $('#divPatnoResultSuccess').html()*1 + dataView.length;
		var failLen = $('#divPatnoResultFail').html()*1 + failArr.length;
		
		$('#divPatnoResultSuccess').html(succLen);
		if($('#divPatnoResultSuccesstxt').html() != "") $('#divPatnoResultSuccesstxt').append(",");
		$('#divPatnoResultSuccesstxt').append(dataView.toString());
		
		$('#divPatnoResultFail').html(failLen);
		if($('#divPatnoResultFailtxt').html() != "") $('#divPatnoResultFailtxt').append(",");
		$('#divPatnoResultFailtxt').append(failArr.toString());
		
		if(last == true) {
			showAlert('알림','완료 되었습니다.',null);
			gvSpinnerClose();
		}
		
	});
	promise.fail(function(e){
		console.log(e);
	})
}

//------------------------------------------------------------------------------------------
//	EVENT	
//------------------------------------------------------------------------------------------
/**
 * 이벤트 초기화
 * @returns
 */
function initTreeEvent(){
	//
	$('select[name="inputDashboardRadio"]').on('change',function(){
		var dataSet = {};
		dataSet.PER_CODE = $.session.get("PER_CODE");
		dataSet.DASHBOARD_TAB = $('select[name="inputDashboardRadio"]').val();
		
		var promise = http('dashboard/updateDashboardTabNo', 'post', false , dataSet);
		
		promise.then(function(result){
			showAlert('알림','첫 메인화면이 변경 되었습니다. 재로그인시 적용됩니다.',null);
		});
		promise.fail(function(e){
			console.log(e);
		});
	});
	
	$('#btnCohortAnalysis').on('click',function(){
		gvSpinnerOpen();
		if(currentDashboardTab == "1"){
			var tmpArr = [];
			var treeArr = [];
			var selectedTreeArr = [];
			
			if($('.input-check-tree:checked').size() == 0){
				showAlert("알림","선택한 코호트가 없습니다.", null);
				gvSpinnerClose();
				return;
			}
			
			$.each($('.input-check-tree:checked'),function(key,value){
				$this = $(this).parent()[0];
				var d = d3.select($this).data()[0];
				
				/*if(d.parent != null && d.parent.checked == true){
					return true;
				}*/
				
				var tmpMap = {};
				
				/*tmpMap.CNMN_CRCN_CD = d.data.CNMN_CRCN_CD;
				tmpMap.CNMN_PRMR_ORGAN_CD = d.data.CNMN_PRMR_ORGAN_CD;
				tmpMap.CNMN_MRPH_DIAG_CD = d.data.CNMN_MRPH_DIAG_CD;*/
				
				tmpMap.MAP_ONCOTREE_FULL_NM = d.data.MAP_ONCOTREE_FULL_NM;
				
				tmpArr.push(tmpMap);
				
				treeArr.push(d);
			})
			console.log(treeArr);
			
			console.log(selectedTreeArr);
			
			for(var i=0; i<treeArr.length; i++){
				var d = treeArr[i];
				
				if(selectedTreeArr.indexOf(d.data) == -1 ){
					
					d.data.checked = d.checked;
					selectedTreeArr.push(d.data);
					
					if(!isNullOrEmpty(d.parent)){
						selectedTreeArr = getParentData(d.parent, selectedTreeArr);						
					}

				}
			}

			
			var dataSet = {};
			dataSet.codelist = tmpArr;
			dataSet.currentTab = currentDashboardTab;
			dataSet.PER_CODE = $.session.get('PER_CODE');

			for(var i=0; i<tmpArr.length; i++){
				if(isNullOrEmpty(tmpArr[i].MAP_ONCOTREE_FULL_NM)){
					showAlert("알림","빈데이터가 존재합니다.",null);
					gvSpinnerClose();
					return;
				}
			}
			
			
			var promise = http('dashboard/selCohortAnalysisPatno', 'post', true , dataSet);
			promise.then(function(result){
				if(result.ERR_CD == "-1"){
					showAlert("알림","ERROR : -1",null);
					gvSpinnerClose();
					return;
				}
				$('#hiddenDashboardTab').val('');
				$('#hiddenDashboardTab').val(currentDashboardTab);
				$('#hiddenSelectedCancer').val('');
				$('#hiddenSelectedCancer').val(nvl(JSON.stringify(selectedTreeArr),""));
				$('#hiddenSelectedCohort').val('null');
			
				$('#frmCohortAnalysis').attr('action',gvCONTEXT + '/cohort/cohortAnalysis');
				$('#frmCohortAnalysis').method = 'POST';
				$('#frmCohortAnalysis').submit();
				gvSpinnerClose();
				
			});
			promise.fail(function(e){
				console.log(e);
				showAlert("알림","ERROR : -1",null);
				gvSpinnerClose();
			});
		}
		else if(currentDashboardTab == "2"){
			var dataSet = {};
			if(checkedPatnoResult.length == 0){
				showAlert("알림","Success 결과값이 없습니다.<br/>환자번호를 수정해주시거나 Check버튼을 클릭해 주십시오.", null);
				gvSpinnerClose();
				return;
			}
			dataSet.TXTARR = checkedPatnoResult.toString();
			dataSet.PER_CODE = $.session.get('PER_CODE');
			dataSet.KIND = "patnoB";//$('input[name="patnoRadios"]:checked').val();
			var promise = http('dashboard/selCohortAnalysisPatnoByNo', 'post', true , dataSet);
			
			promise.then(function(result){
				
				console.log(result);
			
				$('#hiddenDashboardTab').val('');
				$('#hiddenSelectedCancer').val('null');
				$('#hiddenSelectedCohort').val('null');
				//$('#hiddenDashboardTab').val(JSON.stringify(tmpArr));
			
				$('#hiddenDashboardTab').val(currentDashboardTab);
				$('#frmCohortAnalysis').attr('action',gvCONTEXT + '/cohort/cohortAnalysis');
				$('#frmCohortAnalysis').method = 'POST';
				$('#frmCohortAnalysis').submit();
				gvSpinnerClose();
			});
			promise.fail(function(e){
				console.log(e);
				gvSpinnerClose();
			});
		}
		else if(currentDashboardTab == "3"){
		
			var chkCohort = $('input[name="itemCate_tree"]:checked');
			
			if(chkCohort.size() == 0){
				showAlert("알림","선택한 코호트가 없습니다.", null);
				gvSpinnerClose();
				return;
			}
			
			var contSeq = [];
			for(var i=0; i<chkCohort.length; i++) contSeq.push(chkCohort[i].value);
			var dataSet = {};
			dataSet.PER_CODE = $.session.get('PER_CODE');
			dataSet.CONT_SEQ = contSeq;
			var promise = http('dashboard/selSavedCohortList', 'post', true , dataSet);
			
			promise.then(function(result){
				
				console.log(result);
				var tmpArr = result.selSavedCohortList;
				$('#hiddenDashboardTab').val('');
				$('#hiddenSelectedCohort').val('');
				$('#hiddenSelectedCancer').val('null');

				$('#hiddenDashboardTab').val(currentDashboardTab);
				$('#hiddenSelectedCohort').val(JSON.stringify(tmpArr));
				

				$('#frmCohortAnalysis').attr('action',gvCONTEXT + '/cohort/cohortAnalysis');
				$('#frmCohortAnalysis').method = 'POST';
				$('#frmCohortAnalysis').submit();
				gvSpinnerClose();
			});
			promise.fail(function(e){
				console.log(e);
				gvSpinnerClose();
			});
			
			
			
		}
		
		
	})
	
	$('.input-check-tree').on('change',function(){
		console.log(this);
		
	});

	
	$('.patientViewTab').on('click',function(){
		currentDashboardTab = $(this).attr("pageNum");
	})
	$('#txtareaPatnoResultCheck').on('keyup',function(e){
		regexp = /[^0-9,|/\n]/gi;

        v = $(this).val();

        
        $(this).val(v.replace(regexp, ''));
        
	})
	
	$('#btnPatnoResultCheck').on('click',function(){
		gvSpinnerOpen();
		
		var regexp = /[,|/\n]/gi;
		var numregexp = /[^0-9]/gi;
		var lastCnt = 0;
		var txtareaVal = $('#txtareaPatnoResultCheck').val();
		//txtareaVal = txtareaVal.replace(/\s/gi,'');
		var txtspace = /\s/gi;
		var txtArr = txtareaVal.split(regexp);
		txtArr = txtArr.filter(function(n) {
			n = n.replace(txtspace,'');
			return n;
		});
		var dataSet = {};
		dataSet.KIND = "patnoB";//$('input[name="patnoRadios"]:checked').val();
		
		//초기화
		$('#divPatnoResultSuccess').html('0');
		$('#divPatnoResultSuccesstxt').html('');
		$('#divPatnoResultFail').html('0');
		$('#divPatnoResultFailtxt').html('');
		
		
		//var tmpTxtArr = [];
		for(var i=0; i<txtArr.length; i++){
			if(i == txtArr.length-1){
				dataSet.TXTARR = txtArr.slice(lastCnt, txtArr.length);
				getPatnoResultCheck(dataSet , txtArr.slice(lastCnt, txtArr.length),true);	
			}
			else{
				if(i%100 == 0){
					dataSet.TXTARR = txtArr.slice(lastCnt, i+1);
					
					getPatnoResultCheck(dataSet, txtArr.slice(lastCnt, i+1),false);
					
					lastCnt = i+1;
				}
			}
			

			
		}
		
		
		
		
	});
	
	$('#btnMutationViewMove').on('click',function(){
		$.each($('.input-check-tree:checked'),function(key,value){
			console.log($(this).val())
		})
	});
	
	$('#btnMycohortDelete').on('click',function(){
		var chkCohort = $('input[name="itemCate_tree"]:checked');
		var contSeq = [];
		for(var i=0; i<chkCohort.length; i++) contSeq.push(chkCohort[i].value);
		
		var dataSet = {};
		dataSet.CHKSEQ = contSeq;
		
		var promise = http('dashboard/deleteMycohortCont', 'post', true , dataSet);
		
		promise.then(function(result){
			
			console.log(result);
			showAlert('알림','삭제가 완료되었습니다.',null);
			$('#mycohort-tab').trigger('click');
		});
		promise.fail(function(e){
			console.log(e);

		});
	})
	
	$('#mycohort-tab').on('shown.bs.tab',function(){
		var dataSet = {};
		dataSet.PER_CODE = $.session.get("PER_CODE");
		dataSet.SHARE_CD = 	"CO";
		var cohortdetlArr;
		var detlSeqArr = [];
		//dataSet.CATE_MID_SEQ = $this.val();
		console.log(dataSet);		
		var promise = http('cohort/selCohortContList', 'post', false , dataSet);
		
		promise.then(function(result){
			
			console.log("delList:::",result);
			cohortdetlArr = result.selCohortContList;
			
			for(var i=0; i<cohortdetlArr.length; i++){
				var tmpMap = cohortdetlArr[i];
				if(detlSeqArr.indexOf(tmpMap.CATE_DETL_SEQ) == -1){
					detlSeqArr.push(tmpMap.CATE_DETL_SEQ);
				}
			}
		});
		
		var promise2 = http('dashboard/selectCohortDetlList', 'post', true , dataSet);
		
		promise2.then(function(result){
			console.log(result);
			var html = '';
			var dataView = result.selectCohortDetlList;
			var dataView2 = cohortdetlArr;
			
			if(isNullOrEmpty(dataView)){
				$('#jqxCohortList').empty();

				$('#jqxCohortList').append(html);
				return;
			}
			else{
				$('#jqxCohortList').empty();
				
				for(var i=0; i<dataView.length; i++){
					var tmpMap = dataView[i];
					if(detlSeqArr.indexOf(tmpMap.CATE_DETL_SEQ) != -1){
						html = '';
						html += '<div class="treeview" id="cohortList_'+tmpMap.CATE_DETL_SEQ+'">';
						html += '<a data-toggle="collapse" data-parent="#cohortTree" href="#cohortList_tree'+tmpMap.CATE_DETL_SEQ+'" aria-expanded="true"><h3>'+tmpMap.CATE_DETL_NM+'</h3></a>';
						html += '<ul class="treeview-menu collapse in" id="cohortList_tree'+tmpMap.CATE_DETL_SEQ+'" style="padding-left: 10px;">';
						html += '</ul>';
						html += '</div>';
						
					}
					
				}
				
				$('#jqxCohortList').append("<h3>Cohort List</h3>");

					var html = '';
					
					html += '<table width="100%" class="table table-bordered table-striped dataTable no-footer">';
					html += '	<th style="text-align: center;">#</th>';
					html += '	<th>Cohort Name</th>';
					html += '	<th>Desc</th>';
					html += '	<th>Patient/Sample</th>';
					html += '	<th>Date</th>';
			
					for(var i=0; i<dataView2.length; i++){
						var tmpMap = dataView2[i];
					
						var date = new Date(tmpMap.CRT_DT).toLocaleString();
						
						html += '	<tr>';
						html += '		<td width="5%" style="text-align: center;"><input type="checkbox" name="itemCate_tree" detlseq="'+tmpMap.CATE_DETL_SEQ+'" value="'+tmpMap.SEQ+'" id="itemCateDetl_tree_'+tmpMap.SEQ+'" style=""></td>';
						html += '		<td width="20%"><label for="itemCateDetl_tree_'+tmpMap.SEQ+'" style="margin-bottom:0px;  font-weight: normal; width:100%; cursor:pointer;">'+tmpMap.CONT_NM+'</label></td>';
						html += '		<td width="30%" style="white-space:pre;">'+tmpMap.CONT_DESC+'</td>';
						html += '		<td width="20%">'+tmpMap.PATCOUNT+'/'+tmpMap.SPCNCOUNT+'</td>';
						html += '		<td width="25%">'+date+'</td>';
						html += '	</tr>';

					}
					html += '</table>';
					
					
					$('#jqxCohortList').append(html);
				

			}
		});
	})
	
	
}

