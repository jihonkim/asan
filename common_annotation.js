var oncokbTokken = '';
$(document).ready(function(){

	

});


function getCommonCodeOncokbTk(){
		var dataSet = {};
		
		dataSet.SEARCH_COMM_GRP_ID = 'ONCOKB_TOKEN';
		
		var promise = http('/common/sys/getCommonCodeList', 'post', false, dataSet);
		promise.then(function(result){
			console.log(result);
			var dataView = result.dsCommonCodeList;
			
			oncokbTokken = dataView[0].VALUE;
	
		});
		promise.fail(function(e){
			console.log(e);
		});
}

function getAjaxPatientSearchList(param){
	//토큰 확인
	$.ajax({
	    type: "POST",
	    headers: {
	    	Authorization : 'Bearer '+ oncokbTokken
	    },
	    dataType: "json",
	    cache: false,
	    url: gvSERVER+"/pmp/proxy/searchPostGean",
	    contentType: "application/json",
	    data: JSON.stringify(param),
	    success: function (result) {
	        console.log("getAjaxPatientSearchList",result);
	        //gvMutationSearchList = result;
	        annotationImgUpdate(result);       
	        
	    },
	    error: function (request, status, error) {
	        console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
	    
	        $('.annoImg').attr('class','fa fa-exclamation-triangle text-danger');
	    }
	});
	
}

function getAjaxSearchList(param){
	$.ajax({
	    type: "POST",
	    headers: {
	    	Authorization : 'Bearer '+ oncokbTokken
	    },
	    dataType: "json",
	    cache: false,
	    url: gvSERVER+"/pmp/proxy/searchPostGean",
	    contentType: "application/json",
	    data: JSON.stringify(param.queries),
	    success: function (json) {
	    	gvMutationSearchList = json;
	        console.log("gvMutationSearchList",json);
	        
	        annotationImgUpdate(json);       
	        
	    },
	    error: function (request, status, error) {
	        console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
	    
	        $('.annoImg').attr('class','fa fa-exclamation-triangle text-danger');
	    }
	});
	
}

function getAjaxCNAList(param){
	$.ajax({
	    type: "POST",
	    headers: {
	    	Authorization : 'Bearer '+ oncokbTokken
	    },
	    dataType: "json",
	    cache: false,
	    url: gvSERVER+"/pmp/proxy/cnaPostGean",
	    contentType: "application/json",
	    data: JSON.stringify(param),
	    success: function (json) {
	    	gvMutationSVList = json;
	        console.log("gvMutationCNAList",json);
	        
	        annotationCNAImgUpdate(json);       
	        
	    },
	    error: function (request, status, error) {
	        console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
	    
	        $('.annoImg').attr('class','fa fa-exclamation-triangle text-danger');
	    }
	});
}


function getAjaxSVList(param){
	$.ajax({
	    type: "POST",
	    headers: {
	    	Authorization : 'Bearer '+ oncokbTokken
	    },
	    dataType: "json",
	    cache: false,
	    url: gvSERVER+"/pmp/proxy/svPostGean",
	    contentType: "application/json",
	    data: JSON.stringify(param),
	    success: function (json) {
	    	gvMutationSVList = json;
	        console.log("gvMutationSVList",json);
	        
	        annotationSVImgUpdate(json);       
	        
	    },
	    error: function (request, status, error) {
	        console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
	    
	        $('.annoImg').attr('class','fa fa-exclamation-triangle text-danger');
	    }
	});
	
}

function getAjaxHotspotList(param){
	var tabFirstUrl = 'https://www.cancerhotspots.org/api/variants/'+param.gene+'/'+param.alteration;
    var tabSecUrl = 'https://www.3dhotspots.org/api/variants/'+param.gene+'/'+param.alteration;
	
    $.get(encodeURI(tabFirstUrl), function(dataFirst) {
    	
    	$.get(encodeURI(tabSecUrl), function(dataSec) {
        	console.log( dataFirst, dataSec );
    		
        	if(dataFirst.length == 0 && dataSec.length == 0) param.value = 'N';
        	else if(dataFirst.length != 0 && dataSec.length == 0) param.value = 'RE';
        	else if(dataFirst.length == 0 && dataSec.length != 0) param.value = '3D';
        	else if(dataFirst.length != 0 && dataSec.length != 0) param.value = 'TO';
        	annotationHotspotImgUpdate(param)
        	
    		
        });
    	
    	
    });
    
	
}

/*function getAjaxReHotspotList(param){
	$.ajax({
	    type: "GET",
	    dataType: "json",
	    cache: false,
	    async: true,
	    url: encodeURI('http://www.cancerhotspots.org/api/'+param.gene+'/'+param.hgvspVal),
	    contentType: "application/json",
	    data: JSON.stringify(param),
	    success: function (json) {

	    	json.gene = param.gene;

	        
	    },
	    error: function (request, status, error) {
	        console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
	        $('.civicImg.loading[gene="'+param.gene+'"]').attr('class','fa fa-exclamation-triangle text-danger');
	    }
	});
	
}

function getAjax3DHotspotList(param){
	$.ajax({
	    type: "GET",
	    dataType: "json",
	    cache: false,
	    async: true,
	    url: encodeURI('http://www.3dhotspots.org/api/'+param.gene+'/'+param.hgvspVal),
	    contentType: "application/json",
	    data: JSON.stringify(param),
	    success: function (json) {

	    	json.gene = param.gene;

	        
	    },
	    error: function (request, status, error) {
	        console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
	        $('.civicImg.loading[gene="'+param.gene+'"]').attr('class','fa fa-exclamation-triangle text-danger');
	    }
	});
	
}*/


function getAjaxCivicGeneList(param){
	$.ajax({
	    type: "GET",
	    dataType: "json",
	    cache: false,
	    async: true,
	    url: encodeURI('https://civicdb.org/api/genes/'+param.gene+'?identifier_type=entrez_symbol'),
	    contentType: "application/json",
	    data: JSON.stringify(param),
	    success: function (json) {

	    	json.gene = param.gene;
			
	        console.log("gvMutationCivicMap",json);
	        
	        //gvMutationCivicMap = json;
	        
	        annotationCivicImgUpdate(json);

	    },
	    error: function (request, status, error) {
	        console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
	        $('.civicImg.loading[gene="'+param.gene+'"]').attr('class','fa fa-exclamation-triangle text-danger');
	    }
	});
	
}

function getAjaxCivicVariantList(){
	var variants = gvMutationCivicMap.variants;
	
	for(var i=0; i<variants.length; i++){
		var vId = variants[i].id;
		$.ajax({
		    type: "GET",
		    dataType: "json",
		    cache: false,
		    url: encodeURI('https://civicdb.org/api/variants/'+vId),
		    contentType: "application/json",
		    async:true,
		    data: null,
		    success: function (json) {
		    	
		        gvMutationCivicVariantList.push(json);

		    },
		    error: function (request, status, error) {
		        console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
		    }
		});
	}
	
	
}

function setArticleDetail(pmids, evidence){
	var resultList = [];
	
	var idxChk = [];
	
	for(var i=0; i<pmids.length; i++){
		var cur = pmids[i];
		
		for(var j=0; j<evidence.length; j++){
			var tmpSet = evidence[j];
			var articles = tmpSet.articles;
			for(var k=0; k<articles.length; k++){
				if(idxChk.indexOf(cur) != -1) break;
				
				if(articles[k].pmid == cur){
					idxChk.push(cur);
					resultList.push(articles[k]);
				}
			}	
		}
		
	}
	
	return resultList;
}

function annotationHotspotImgUpdate(gvList){
	var json = gvList;
	
	var $imgId = $('.hotspotImg.loading[name="'+json.alteration+'"]');
	if(json.value == 'N'){
		$imgId.attr('class','hotspotImg');
		$imgId.parent().attr('spot',json.value);
		$imgId.parent().attr('hotspotId',json.id);
	}
	else{
		$imgId.attr('class','hotspotImg ay');
		$imgId.parent().attr('spot',json.value);
		$imgId.parent().attr('hotspotId',json.id);
	}

	
}

function annotationCivicImgUpdate(gvList){
	var json = gvList;
	for(var i=0; i<json.variants.length; i++){
		var $imgId = $('.civicImg[name="'+json.variants[i].name+'"]');
     	if($imgId.length != 0){
     		
     		$imgId.attr('class','civicImg ay');
			$imgId.parent().attr('civicId',json.variants[i].id);
     	}
     }
	$('.civicImg.loading[gene="'+json.name+'"]').attr('class','civicImg');
	
}

function annotationCNAImgUpdate(gvList){
	var json = gvList;
	for(var i=0; i<json.length; i++){
    	var $imgId = $('#imgCNA_'+json[i].query.id);
    	$imgId.parent().attr('gene',json[i].query.hugoSymbol);
    	$imgId.parent().attr('proteiChange',json[i].query.alteration);
    	$imgId.parent().attr('cnaId',json[i].query.id);
    	
    	if(json[i].geneExist == true){
	         	if(isNullOrEmpty(json[i].oncogenic)){
	   	         if(json[i].variantExist == true ){
	   	        	$imgId.attr('class','annotaionImg b');
	   	         }
	   	         else{
	   	        	$imgId.attr('class','annotaionImg c');
	   	         }
	        	 
			}
			else{
				if(json[i].highestSensitiveLevel == "LEVEL_2B"){
					$imgId.attr('class','annotaionImg leveln level2b');
				}
				else if(json[i].highestSensitiveLevel == "LEVEL_3B"){
					$imgId.attr('class','annotaionImg leveln level3b');
				}
				else if(json[i].highestSensitiveLevel == "LEVEL_4"){
					$imgId.attr('class','annotaionImg leveln level4');
				}
				else if(json[i].highestSensitiveLevel == "LEVEL_1"){
					$imgId.attr('class','annotaionImg leveln level1');
				}
				else if(json[i].highestSensitiveLevel == "LEVEL_2A"){
					$imgId.attr('class','annotaionImg leveln level2a');
				}
				else if(json[i].highestSensitiveLevel == "LEVEL_3A"){
					$imgId.attr('class','annotaionImg leveln level3a');
				}
				else{
					$imgId.attr('class','annotaionImg leveln');
				}
				
			}
		}
		else{
			$imgId.attr('class','annotaionImg');
		}
    }
}

function annotationSVImgUpdate(gvList){
	var json = gvList;
	for(var i=0; i<json.length; i++){
    	var $imgId = $('#imgSV_'+json[i].query.id);
    	$imgId.parent().attr('gene',json[i].query.hugoSymbol);
    	$imgId.parent().attr('proteiChange',json[i].query.alteration);
    	$imgId.parent().attr('svId',json[i].query.id);
    	
    	if(json[i].geneExist == true){
	         	if(isNullOrEmpty(json[i].oncogenic)){
	   	         if(json[i].variantExist == true ){
	   	        	$imgId.attr('class','annotaionImg b');
	   	         }
	   	         else{
	   	        	$imgId.attr('class','annotaionImg c');
	   	         }
	        	 
			}
			else{
				if(json[i].highestSensitiveLevel == "LEVEL_2B"){
					$imgId.attr('class','annotaionImg leveln level2b');
				}
				else if(json[i].highestSensitiveLevel == "LEVEL_3B"){
					$imgId.attr('class','annotaionImg leveln level3b');
				}
				else if(json[i].highestSensitiveLevel == "LEVEL_4"){
					$imgId.attr('class','annotaionImg leveln level4');
				}
				else if(json[i].highestSensitiveLevel == "LEVEL_1"){
					$imgId.attr('class','annotaionImg leveln level1');
				}
				else if(json[i].highestSensitiveLevel == "LEVEL_2A"){
					$imgId.attr('class','annotaionImg leveln level2a');
				}
				else if(json[i].highestSensitiveLevel == "LEVEL_3A"){
					$imgId.attr('class','annotaionImg leveln level3a');
				}
				else{
					$imgId.attr('class','annotaionImg leveln');
				}
				
			}
		}
		else{
			$imgId.attr('class','annotaionImg');
		}
    }
}


function annotationImgUpdate(gvList){
	var json = gvList;
	/*if(isNullOrEmpty(gene)) {
		json = gvList;
	}
	else{
		json = gvList[gene];
	}*/
	for(var i=0; i<json.length; i++){
    	var $imgId = $('#img_'+json[i].query.hugoSymbol+'_'+json[i].query.id);
    	if(json[i].geneExist == true){
	        if(isNullOrEmpty(json[i].oncogenic)){
	   	         if(json[i].variantExist == true ){
	   	        	$imgId.attr('class','annotaionImg b');
	   	         }
	   	         else{
	   	        	$imgId.attr('class','annotaionImg c');
	   	         }

			}
			else{
				if(json[i].highestSensitiveLevel == "LEVEL_2B"){
					$imgId.attr('class','annotaionImg leveln level2b');
				}
				else if(json[i].highestSensitiveLevel == "LEVEL_3B"){
					$imgId.attr('class','annotaionImg leveln level3b');
				}
				else if(json[i].highestSensitiveLevel == "LEVEL_4"){
					$imgId.attr('class','annotaionImg leveln level4');
				}
				else if(json[i].highestSensitiveLevel == "LEVEL_1"){
					$imgId.attr('class','annotaionImg leveln level1');
				}
				else if(json[i].highestSensitiveLevel == "LEVEL_2A"){
					$imgId.attr('class','annotaionImg leveln level2a');
				}
				else if(json[i].highestSensitiveLevel == "LEVEL_3A"){
					$imgId.attr('class','annotaionImg leveln level3a');
				}
				else{
					$imgId.attr('class','annotaionImg leveln');
				}
				
			}
		}
		else{
			$imgId.attr('class','annotaionImg');
		}
    }
}

function getNCBIlink(pathnameOrParams) {
    return 'https://www.ncbi.nlm.nih.gov'+pathnameOrParams;
}

function tooltipEvent(){
	$(document).on("click", ".btnAnnotationHotspot", function (e) {
		if($(this).hasClass('tooltipstered')){
			//$(this).tooltipster('open');
        }
        else{
        	var id = e.target.id;
            var prop = {};
            var gene = $(this).attr('gene');
            var proteiChange = $(this).attr('proteiChange');
            var tumorType = $(this).attr('tumorType');
            var hotspotid =  $(this).attr('hotspotid');
            var spot = $(this).attr('spot');
            //var evidenceTypes = 'MUTATION_EFFECT,STANDARD_THERAPEUTIC_IMPLICATIONS_FOR_DRUG_SENSITIVITY,STANDARD_THERAPEUTIC_IMPLICATIONS_FOR_DRUG_RESISTANCE, INVESTIGATIONAL_THERAPEUTIC_IMPLICATIONS_DRUG_SENSITIVITY, INVESTIGATIONAL_THERAPEUTIC_IMPLICATIONS_DRUG_RESISTANCE';
            var $this = $(this);
            
            if(tumorType == "" || tumorType == null || tumorType == undefined || tumorType == " "){
            	tumorType == "NULL";
            }
    
        	$(this).tooltipster({
            	plugins: ['sideTip', 'scrollableTip'],
                theme: 'tooltipster-shadow',
                contentAsHTML: true,
                interactive: true,
                arrow: false,
                onlyOne: false,
                content: 'Loading...',
                animation: 'fade',
                updateAnimation: null,
                contentCloning: true,
                trigger: 'click',
                functionBefore: function(instance, helper) {
                    
                    var $origin = $(helper.origin);
                    
                    var txt = '';
                    if ($origin.data('loaded') !== true){
                    	
                    	if(spot == 'RE'){
                    		txt = setReHotspotText();
                    	}
                    	else if(spot == '3D'){
                    		txt = set3DHotspotText();
                    	}
                    	else if(spot == 'TO'){
                    		txt = setTotalHotspotText();
                    	}
                    	
	                	instance.content(txt);
	                    
	                    $origin.data('loaded', true);
                    	

                    }
                }
            });
            $(this).tooltipster('open');
            
        }
		
	});
	
	$(document).on("click", ".btnCNAAnnotation", function (e) {
		if($(this).hasClass('tooltipstered')){
			//$(this).tooltipster('open');
        }
        else{
        	var id = e.target.id;
            var prop = {};
            var gene = $(this).attr('gene');
            var cna = $(this).attr('cna');
            var proteiChange = $(this).attr('proteiChange');
            var tumorType = $(this).attr('tumorType');
            var cnaId =  $(this).attr('cnaId');
            //var evidenceTypes = 'MUTATION_EFFECT,STANDARD_THERAPEUTIC_IMPLICATIONS_FOR_DRUG_SENSITIVITY,STANDARD_THERAPEUTIC_IMPLICATIONS_FOR_DRUG_RESISTANCE, INVESTIGATIONAL_THERAPEUTIC_IMPLICATIONS_DRUG_SENSITIVITY, INVESTIGATIONAL_THERAPEUTIC_IMPLICATIONS_DRUG_RESISTANCE';
            var $this = $(this);
            
            if(tumorType == "" || tumorType == null || tumorType == undefined || tumorType == " "){
            	tumorType == "NULL";
            }
    
        	$(this).tooltipster({
            	plugins: ['sideTip', 'scrollableTip'],
                theme: 'tooltipster-shadow',
                contentAsHTML: true,
                interactive: true,
                arrow: false,
                onlyOne: false,
                content: 'Loading...',
                animation: 'fade',
                updateAnimation: null,
                contentCloning: true,
                trigger: 'click',
                functionBefore: function(instance, helper) {
                    
                    var $origin = $(helper.origin);
                    
                    var txt = '';
                    if ($origin.data('loaded') !== true){
                    	
                    	var tabFirstUrl = 'https://www.oncokb.org/api/v1/annotate/copyNumberAlterations?hugoSymbol='+gene+'&copyNameAlterationType='+cna+'&tumorType='+tumorType;//키값api
                        //var tabSecondUrl = 'https://legacy.oncokb.org:443/api/v1/evidences/lookup?hugoSymbol='+gene+'&variant='+proteiChange+'&tumorType='+tumorType;//오픈형테스트
                    	//
                    	var tabSecondUrl = 'https://www.oncokb.org/api/v1/evidences/lookup?hugoSymbol='+gene+'&variant='+proteiChange+'&tumorType='+tumorType;
                        
                    	$.ajax({
                    	    type: "POST",
                    	    headers: {
                    	    	Authorization : 'Bearer ca94ed72-6380-4f16-ab74-a573874781db'
                    	    },
                    	    dataType: "json",
                    	    cache: false,
                    	    data: encodeURI(tabSecondUrl),
                    	    url: gvSERVER+'/pmp/proxy/searchGetEvidence',
                    	    contentType: "application/json",
                    	    success: function (dataSec) {
                    	    	
                    	    	$.ajax({
                            	    type: "POST",
                            	    headers: {
                            	    	Authorization : 'Bearer ca94ed72-6380-4f16-ab74-a573874781db'
                            	    },
                            	    dataType: "json",
                            	    cache: false,
                            	    data: encodeURI(tabFirstUrl),
                            	    url: gvSERVER+'/pmp/proxy/searchGetGean',
                            	    contentType: "application/json",
                            	    success: function (data) {
                            	    	console.log(dataSec)
                            	        
                            	    	var mutationArticleList = [];
                            	    	var mutationAlterationList = [];
                            	    	
                            	    	//searchGetGean
                            	    	data.mutId = cnaId;
                	                    
                	                    if(!isNullOrEmpty(data.mutationEffect)){
                	                    	 var citations = data.mutationEffect.citations;
                     	                    
                     	                    mutationArticleList = setArticleDetail(citations.pmids, dataSec)
                	                    }
                	                    
                	                    gvMutationAlterationList = setTreatmentList(data, dataSec);
                	                    mutationAlterationList = gvMutationAlterationList;
                	                    
                	                	txt = makeToolBoxContent(data, mutationArticleList, mutationAlterationList);
                	                	
                	                	instance.content(txt);
                	                    console.log(data);
                	                    
                	                    $origin.data('loaded', true);
                            	    	
                            	    },
                            	    error: function (request, status, error) {
                            	        console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
                            	    
                            	    }
                            	});
                    	    	
                    	    	
                    	    },
                    	    error: function (request, status, error) {
                    	        console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
                    	    
                    	    }
                    	});
                    	

                    }
                }
            });
            $(this).tooltipster('open');
            
        }
		
    });
	
	
	$(document).on("click", ".btnSVAnnotation", function (e) {
		if($(this).hasClass('tooltipstered')){
			//$(this).tooltipster('open');
        }
        else{
        	var id = e.target.id;
            var prop = {};
            var gene = $(this).attr('gene');
            var gene1 = $(this).attr('gene1');
            var gene2 = $(this).attr('gene2');
            var proteiChange = $(this).attr('proteiChange');
            var tumorType = $(this).attr('tumorType');
            var svId =  $(this).attr('svId');
            //var evidenceTypes = 'MUTATION_EFFECT,STANDARD_THERAPEUTIC_IMPLICATIONS_FOR_DRUG_SENSITIVITY,STANDARD_THERAPEUTIC_IMPLICATIONS_FOR_DRUG_RESISTANCE, INVESTIGATIONAL_THERAPEUTIC_IMPLICATIONS_DRUG_SENSITIVITY, INVESTIGATIONAL_THERAPEUTIC_IMPLICATIONS_DRUG_RESISTANCE';
            var $this = $(this);
            
            if(tumorType == "" || tumorType == null || tumorType == undefined || tumorType == " "){
            	tumorType == "NULL";
            }
    
        	$(this).tooltipster({
            	plugins: ['sideTip', 'scrollableTip'],
                theme: 'tooltipster-shadow',
                contentAsHTML: true,
                interactive: true,
                arrow: false,
                onlyOne: false,
                content: 'Loading...',
                animation: 'fade',
                updateAnimation: null,
                contentCloning: true,
                trigger: 'click',
                functionBefore: function(instance, helper) {
                    
                    var $origin = $(helper.origin);
                    
                    var txt = '';
                    if ($origin.data('loaded') !== true){
                    	
                    	var tabFirstUrl = 'https://www.oncokb.org/api/v1/annotate/structuralVariants?hugoSymbolA='+gene1+'&hugoSymbolB='+gene2+'&structuralVariantType=FUSION&isFunctionalFusion=true&tumorType='+tumorType;//키값api
                        //var tabSecondUrl = 'https://legacy.oncokb.org:443/api/v1/evidences/lookup?hugoSymbol='+gene+'&variant='+proteiChange+'&tumorType='+tumorType;//오픈형테스트
                    	//
                    	var tabSecondUrl = 'https://www.oncokb.org/api/v1/evidences/lookup?hugoSymbol='+gene+'&variant='+proteiChange+'&tumorType='+tumorType;
                        
                    	$.ajax({
                    	    type: "POST",
                    	    headers: {
                    	    	Authorization : 'Bearer ca94ed72-6380-4f16-ab74-a573874781db'
                    	    },
                    	    dataType: "json",
                    	    cache: false,
                    	    data: encodeURI(tabSecondUrl),
                    	    url: gvSERVER+'/pmp/proxy/searchGetEvidence',
                    	    contentType: "application/json",
                    	    success: function (dataSec) {
                    	    	
                    	    	$.ajax({
                            	    type: "POST",
                            	    headers: {
                            	    	Authorization : 'Bearer ca94ed72-6380-4f16-ab74-a573874781db'
                            	    },
                            	    dataType: "json",
                            	    cache: false,
                            	    data: encodeURI(tabFirstUrl),
                            	    url: gvSERVER+'/pmp/proxy/searchGetGean',
                            	    contentType: "application/json",
                            	    success: function (data) {
                            	    	console.log(dataSec)
                            	        
                            	    	var mutationArticleList = [];
                            	    	var mutationAlterationList = [];
                            	    	
                            	    	//searchGetGean
                            	    	data.mutId = svId;
                	                    
                	                    if(!isNullOrEmpty(data.mutationEffect)){
                	                    	 var citations = data.mutationEffect.citations;
                     	                    
                     	                    mutationArticleList = setArticleDetail(citations.pmids, dataSec)
                	                    }
                	                    
                	                    gvMutationAlterationList = setTreatmentList(data, dataSec);
                	                    mutationAlterationList = gvMutationAlterationList;
                	                    
                	                	txt = makeToolBoxContent(data, mutationArticleList, mutationAlterationList);
                	                	
                	                	instance.content(txt);
                	                    console.log(data);
                	                    
                	                    $origin.data('loaded', true);
                            	    	
                            	    },
                            	    error: function (request, status, error) {
                            	        console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
                            	    
                            	    }
                            	});
                    	    	
                    	    	
                    	    },
                    	    error: function (request, status, error) {
                    	        console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
                    	    
                    	    }
                    	});
                    	

                    }
                }
            });
            $(this).tooltipster('open');
            
        }
		
    });
	
	
	$(document).on("click", ".btnAnnotationCivic", function (e) {
		
		if($(this).hasClass('tooltipstered')){
			//$(this).tooltipster('open');
        }
        else{
        	var gene = $(this).attr('gene');
            var proteiChange = $(this).attr('proteiChange');
            var tumorType = $(this).attr('tumorType');
            var mutationId =  $(this).attr('mutationId');
            var vId = $(this).attr('civicId');
            var $this = $(this);
           
    		$(this).tooltipster({
            	plugins: ['sideTip', 'scrollableTip'],
                theme: 'tooltipster-shadow',
                contentAsHTML: true,
                interactive: true,
                arrow: false,
                onlyOne: false,
                content: 'Loading...',
                animation: 'fade',
                trigger: 'click',
                updateAnimation: null,
                functionBefore: function(instance, helper) {
                    
                    var $origin = $(helper.origin);
                    
                    var txt = '';
                    if ($origin.data('loaded') !== true){
                    	var tabFirstUrl = 'https://civicdb.org/api/genes/'+gene+'?identifier_type=entrez_symbol';
                        var tabSecUrl = 'https://civicdb.org/api/variants/'+vId;
                    	
                        $.get(encodeURI(tabFirstUrl), function(dataFirst) {
                        	console.log(dataFirst);
                        	gvMutationCivicMap = dataFirst;
                        	var mutationCivicMap = dataFirst
                    		$.get(encodeURI(tabSecUrl), function(dataSec) {
                        		console.log(dataSec);
                        		dataSec.mutId = mutationId;
        	                    
        	                	txt = makeToolBoxContentCivic(dataSec, mutationCivicMap);
        	                	instance.content(txt);
        	                    
        	                    
        	                    $origin.data('loaded', true);
        	                }); 
                    		
    	                });  
                        
                    	      
                    }
                }
    		});
    		$(this).tooltipster('open');
        }

        
	});
	
	$(document).on("click", ".btnAnnotation", function (e) {
		
		if($(this).hasClass('tooltipstered')){
			//$(this).tooltipster('open');
        }
        else{
        	var id = e.target.id;
            var prop = {};
            var trId = $(this).parents('tr').attr('id');
            var gene = $(this).attr('gene');
            var proteiChange = $(this).attr('proteiChange');
            var tumorType = $(this).attr('tumorType');
            var mutationId =  $(this).attr('mutationId');
            var evidenceTypes = 'MUTATION_EFFECT,STANDARD_THERAPEUTIC_IMPLICATIONS_FOR_DRUG_SENSITIVITY,STANDARD_THERAPEUTIC_IMPLICATIONS_FOR_DRUG_RESISTANCE, INVESTIGATIONAL_THERAPEUTIC_IMPLICATIONS_DRUG_SENSITIVITY, INVESTIGATIONAL_THERAPEUTIC_IMPLICATIONS_DRUG_RESISTANCE';
            var $this = $(this);
            
            if(tumorType == "" || tumorType == null || tumorType == undefined || tumorType == " "){
            	tumorType == "NULL";
            }
    
        	$(this).tooltipster({
            	plugins: ['sideTip', 'scrollableTip'],
                theme: 'tooltipster-shadow',
                contentAsHTML: true,
                interactive: true,
                arrow: false,
                onlyOne: false,
                content: 'Loading...',
                animation: 'fade',
                updateAnimation: null,
                contentCloning: true,
                trigger: 'click',
                functionBefore: function(instance, helper) {
                    
                    var $origin = $(helper.origin);
                    
                    var txt = '';
                    if ($origin.data('loaded') !== true){
                    	
                    	var tabFirstUrl = 'https://www.oncokb.org/api/v1/annotate/mutations/byProteinChange?hugoSymbol='+gene+'&alteration='+proteiChange+'&tumorType='+tumorType;//키값api
                        //var tabSecondUrl = 'https://legacy.oncokb.org:443/api/v1/evidences/lookup?hugoSymbol='+gene+'&variant='+proteiChange+'&tumorType='+tumorType+'&evidenceTypes='+evidenceTypes;//오픈형테스트
                        var tabSecondUrl = 'https://www.oncokb.org/api/v1/evidences/lookup?hugoSymbol='+gene+'&variant='+proteiChange+'&tumorType='+tumorType;
                        $.ajax({
                    	    type: "POST",
                    	    headers: {
                    	    	Authorization : 'Bearer ca94ed72-6380-4f16-ab74-a573874781db'
                    	    },
                    	    dataType: "json",
                    	    cache: false,
                    	    data: encodeURI(tabSecondUrl),
                    	    url: gvSERVER+'/pmp/proxy/searchGetEvidence',
                    	    contentType: "application/json",
                    	    success: function (dataSec) {
                    	    	console.log(dataSec)
                    	    	$.ajax({
                            	    type: "POST",
                            	    headers: {
                            	    	Authorization : 'Bearer ca94ed72-6380-4f16-ab74-a573874781db'
                            	    },
                            	    dataType: "json",
                            	    cache: false,
                            	    data: encodeURI(tabFirstUrl),
                            	    url: gvSERVER+'/pmp/proxy/searchGetGean',
                            	    contentType: "application/json",
                            	    success: function (data) {
                            	    	
                            	        
                            	    	var mutationArticleList = [];
                            	    	var mutationAlterationList = [];
                            	    	
                            	    	//searchGetGean
                            	    	data.mutId = mutationId;
                	                    
                	                    if(!isNullOrEmpty(data.mutationEffect)){
                	                    	 var citations = data.mutationEffect.citations;
                     	                    
                     	                    mutationArticleList = setArticleDetail(citations.pmids, dataSec)
                	                    }
                	                    gvMutationAlterationList = setTreatmentList(data, dataSec);
                	                    mutationAlterationList = gvMutationAlterationList;
                	                    
                	                	txt = makeToolBoxContent(data, mutationArticleList, mutationAlterationList);
                	                	
                	                	instance.content(txt);
                	                    console.log(data);
                	                    
                	                    $origin.data('loaded', true);
                            	    	
                            	    },
                            	    error: function (request, status, error) {
                            	        console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
                            	    
                            	    }
                            	});
                    	    	
                    	    },
                    	    error: function (request, status, error) {
                    	        console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
                    	    
                    	    }
                    	});
          
                    }
                }
            });
            $(this).tooltipster('open');
            
        }
        
    });
	
	$(document).on("mouseover", ".drugArticle", function (e) {
		if($(this).hasClass('tooltipstered')){
			$(this).tooltipster('open');
        }
        else{
        	var tmpId = $(this).attr('tmpId');
        	
        	$(this).tooltipster({
            	plugins: ['sideTip', 'scrollableTip'],
                theme: 'tooltipster-shadow',
                contentAsHTML: true,
                interactive: true,
                arrow: false,
                onlyOne: false,
                content: 'Loading...',
                animation: 'fade',
                updateAnimation: null,
                functionBefore: function(instance, helper) {
                	var txt = '';
                	for(var i=0; i<gvMutationAlterationList.length; i++){
                		if(gvMutationAlterationList[i].tmpId == tmpId){
                			txt = makeToolBoxContentDrug(gvMutationAlterationList[i]);
                			break;
                		}
                	}
                	instance.content(txt);
                }
        	});
        	$(this).tooltipster('open');
        }
		
	});
	
}

function setTreatmentList(data, evidence){
	var treatmentList = data.treatments;

	var AlterList = [];
	for(var i=0; i<treatmentList.length; i++){
		var tmpSet = treatmentList[i];
		var tmpMap = {};
		var drugList = [];
		for(var j=0; j<tmpSet.drugs.length; j++){
			drugList.push(tmpSet.drugs[0].drugName);
		}
		
		tmpMap.tmpId = i;
		tmpMap.level = tmpSet.level;
		tmpMap.alteration = 'Oncogenic Mutations';
		tmpMap.drug = drugList.join(' + ');
		tmpMap.levelAss = data.query.tumorType;
		tmpMap.pmids = setArticleDetail(tmpSet.pmids, evidence);
		tmpMap.abstracts = tmpSet.abstracts;
		
		AlterList.push(tmpMap);
	}

	
	return AlterList;
	
}

function getEvidenceLevelList(data){
	
	var resultMap = {};
	for(var i=0; i<data.length; i++){
		var tmpSet = data[i];
		var evidenceType = tmpSet.evidence_type;
		
		if(resultMap.hasOwnProperty(evidenceType)){
			resultMap[evidenceType]++;
		}
		else{
			resultMap[evidenceType] = 1;
		}
		
	}
	
	return resultMap;
	
}

function makeToolBoxContentDrug(data){
	var txt = '';
	var articles = data.pmids;
	var abstracts = data.abstracts;
	txt +=	'<div class="oncokb-card">';
	txt +=	'<div class="rc-tooltip-inner" role="tooltip">';
	txt +=	'<ul class="no-style-ul">';
	
	for(var i=0; i<articles.length; i++){
		if(articles[i].pmid==null)continue;
		txt +=	'<li key=' + articles[i].pmid + ' class="list-group-item">';
		txt +=		'<a class="list-group-item-title" href="'+getNCBIlink("/pubmed/" + articles[i].pmid)+'" target="_black"><b> ' + articles[i].title + ' </b></a>';
		txt +=		'<div class="list-group-item-content">';
		txt +=			'<span>'+ articles[i].authors + '.' + articles[i].pubDate +'</span>';
		txt +=			'<span>PMID: '+ articles[i].pmid +'</span>';
		txt +=		'</div>';
		txt +=	'</li>';
	}
	for(var i=0; i<abstracts.length; i++){
		txt +=	'<li key="" class="list-group-item">';
		txt +=		'<a class="" href="'+abstracts[i].link+'" target="_black"><b>'+abstracts[i].abstract+'</b></a>';
		txt +=	'</li>';
	}	
	txt +=	'</ul>';
	txt +=	'</div>';
	txt +=	'</div>';
	return txt;
}

function makeToolBoxContentCivic(data, mutationCivicMap){
	
	var itemMap = {};
	var itemStr = '';
	if(data.evidence_items.length != 0){
		itemMap = getEvidenceLevelList(data.evidence_items);
		$.each(itemMap,function(key,value){
			itemStr += key + ": " + value;
			itemStr += ' / ';
		});
	}
	
	var txt = '';
	txt +=	'<div class="rc-tooltip-inner" role="tooltip">';
	txt +=	'<div class="civic-card">';
	txt +=		'<span>';
	txt +=			'<div class="col s12 tip-header">CIViC Variants</div>';
	txt +=			'<div class="col s12 civic-card-content">';
	txt +=				'<div class="col s12 civic-card-gene">';
	txt +=					'<p>';
	txt +=					'<span class="civic-card-gene-name">';
	txt +=						'<a href="https://civicdb.org/#/events/genes/45/summary" target="_blank"><b>'+mutationCivicMap.name+'</b></a>';
	txt +=					'</span>';
	txt +=					' ' + mutationCivicMap.description;
	txt +=					'</p>';
	txt +=				'</div>';
	txt +=				'<div class="col s12">';
	txt +=					'<ul><div class="civic-card-variant"><div class="civic-card-variant-header">';
	txt +=						'<span class="civic-card-variant-name">';
	txt +=							'<a href="https://civicdb.org/#/events/genes/'+mutationCivicMap.id+'/summary/variants/'+data.id+'/summary#variant" target="_blank">'+data.name+'</a>';
	txt +=						'</span>';
	txt +=						'<span class="civic-card-variant-entry-types">';
	txt +=							' Entries: '+ itemStr;
	txt +=						'</span></div>';
	txt +=						'<div class="civic-card-variant-description summary">'+data.description+'</div>';
	txt +=					'</div></ul>';
	txt +=				'</div>';
	txt +=				'<div class="item disclaimer">';
	txt +=					'<span>Disclaimer: This resource is intended for purely research purposes. It should not be used for emergencies or medical or professional advice.</span>';
	txt +=				'</div>';
	txt +=			'</div>';
	txt +=		'</span>';
	txt +=		'<div class="item footer"><a href="https://civicdb.org/#/events/genes/'+mutationCivicMap.id+'/summary" target="_blank"><img src="/pmp/js/page/patient/images/civic_text_logo.png" class="civic-logo" alt="CIViC"></a></div>';
	txt +=	'</div>';
	txt +=	'</div>';

	return txt;
	
	
	
}

function makeToolBoxContent(data, mutationArticleList, mutationAlterationList){
	var oncogenic = (data.oncogenic=='')?"Unknown" : data.oncogenic;
    var mutationEffect = (data.mutationEffect == null) ?'Unknown':data.mutationEffect.knownEffect;
    var geneSummary = data.geneSummary;
    var variantSummary = data.variantSummary;
    var tumorTypeSummary = data.tumorTypeSummary;
	var id = data.mutId;
	
	
	
	
	var txt = '';
    if(data.geneExist!==true){
        txt='<div class="oncokb-card>\n' +
            '<div>\n' +
            '<div class="additional-info>\n' +
            'There is currently no information about this gene in OncoKB.\n' +
            '</div>\n' +
            '<div class="footer" style="background-color: white;">\n' +
            '<a href="https://oncokb.org/gene/TSC2/KCTD5-TSC2 Fusion" target="_blank">\n' +
            '          <img src="/pmp/js/page/patient/images/oncokb_logo.png" class="oncokb-logo" alt="OncoKB">\n' +
            '</a>\n' +
            '<span class="pull-right feedback">\n' +
            //'       <button class="btn btn-default btn-sm btn-xs">Feedback</button>\n' +
            '      </span>\n' +
            '</div>\n' +
            '</div>\n' +
            '</div>';

    }
    else{
        txt='<div class="rc-tooltip-inner" role="tooltip">\n' +
            '        <div class="oncokb-card">\n' +
            '                   <div>\n' +
            '                       <span>\n' +
            '                           <div class="tabs-wrapper">\n' +
            '                               <div class="title" style="background-color: #a03f61;">'+data.query.hugoSymbol+' '+data.query.alteration+' in '+data.query.tumorType+'</div>\n' +
            '                               <div class="title" style="background-color: #8539b2;">'+data.query.hugoSymbol+' '+data.query.alteration+'</div>\n' +
            '                               <div class="tabs" style="background-color: rgba(8,3,5,0.96);">\n' +
            '                                   <div class="tab enable-hover">\n' +
            '                                       <a href="#tab1_'+id+'" class="oncogenicity tab-title-a enable-hover-a" id="mutationAnnotation-tabA" pagenum="1" data-toggle="tab" aria-controls="mutationAnnotationA" aria-selected="true">\n' +
            '                                           <span class="tab-title">clinical implications</span>\n' +
            '                                           <span class="tab-subtitle">'+oncogenic+'</span>\n' +
            '                                       </a>\n' +
            '       							</div>\n' +
							            '       <div class="tab enable-hover">\n' +
							            '           <a href="#tab2_'+id+'" class="mutation-effect tab-title-a enable-hover-a" id="mutationAnnotation-tabB" pagenum="2" data-toggle="tab" aria-controls="mutationAnnotationB" aria-selected="false">\n' +
							            '               <span class="tab-title">Biological Effect</span>\n' +
							            '               <span class="tab-subtitle">'+mutationEffect+'</span>\n' +
							            '           </a>\n' +
							            '       </div>\n';

        txt+='<div class="indicator"></div>\n' +
            '    </div>\n' +
            '    <div class="tab-content">\n' +
            '        <div id="tab1_'+id+'" class="tab-pane active" role="tabpanel" aria-labelledby="mutationAnnotation-tabA" style="background-color: white;">\n' +
            '            <p>'+geneSummary+'</p>\n' +
            '            <p>'+variantSummary+'</p>\n' +
            '            <p style="margin-bottom: 0px;">There are no FDA-approved or NCCN-compendium listed treatments specifically for patients with KMT2A-ATP5L fusion positive adrenocortical carcinoma.</p>\n';
        if(gvMutationAlterationList.length > 0){
		            txt+='<div class="oncokb-treatment-table" style="font-size: 1.2rem;">\n' +
		                '      <table class="table table table-bordered" style="margin-top:1px;margin-bottom:1px;">\n' +
		                '            <thead>\n' +
		                '                <tr>\n' +
		                '                    <th scope="col" style="background-color:white;">Level</th>\n' +
		                '                    <th scope="col" style="background-color:white;">Alteration(s)</th>\n' +
		                '                    <th scope="col" style="background-color:white;">Drug(s)</th>\n' +
		                '                    <th scope="col" style="background-color:white;">Level-associated<br/>cancer Type(s)</th>\n' +
		                '                    <th scope="col" style="background-color:white;"></th>\n' +
		                '                </tr>\n' +
		                '            </thead>\n' +
		                '            <tbody style="background-color:white;">\n';
		            for(var i=0; i<gvMutationAlterationList.length; i++){
		            	var lvClass = '';
		            	switch (gvMutationAlterationList[i].level){
		            	case 'LEVEL_1' :
		            		lvClass = 'oncokb level-icon level-1';
		            		break;
		            	case 'LEVEL_2A' :
		            		lvClass = 'oncokb level-icon level-2A';
		            		break;
		            	case 'LEVEL_2B' :
		            		lvClass = 'oncokb level-icon level-2B';
		            		break;
		            	case 'LEVEL_3A' :
		            		lvClass = 'oncokb level-icon level-3A';
		            		break;
		            	case 'LEVEL_3B' :
		            		lvClass = 'oncokb level-icon level-3B';
		            		break;
		            	case 'LEVEL_4' :
		            		lvClass = 'oncokb level-icon level-4';
		            		break;
		            	case 'LEVEL_R1' :
		            		lvClass = 'oncokb level-icon level-R1';
		            		break;
		            	case 'LEVEL_R2' :
		            		lvClass = 'oncokb level-icon level-R2';
		            		break;
		            	}
		            	
		            	txt+='<tr>';
			            txt+=	'<td><i class="' + lvClass + '"></i></td>';
			            txt+=	'<td>' + gvMutationAlterationList[i].alteration+ '</td>';
			            txt+=	'<td>' + gvMutationAlterationList[i].drug+ '</td>';
			            txt+=	'<td>' + gvMutationAlterationList[i].levelAss+ '</td>';
			            txt+=	'<td><span class="drugArticle" tmpId="'+gvMutationAlterationList[i].tmpId+'"><i class="fa fa-book" tmpId="'+gvMutationAlterationList[i].tmpId+'"></span></td>';
			            txt+='</tr>';
		            }
		            
		            //txt+=OncoKbTreatmentTable(cache.treatments.sensitivity,sample);
		            txt+='            </tbody>\n' +
		                '      </table>\n' +
		                '</div>';
        }
         txt+='</div>\n' +


            ' 		 <div id="tab2_'+id+'" class="tab-pane" role="tabpanel" aria-labelledby="mutationAnnotation-tabB" style="background-color:white;">\n' +
            '   		 <ul class="no-style-ul">\n';
        if(mutationArticleList.length > 0) {

           var articles =  mutationArticleList;

            if(!_.isUndefined(articles) && articles.length>0) {
                for(var i=0;i<articles.length;i++) {
                    if(articles[i].pmid==null)continue;
                    txt +=
                        ' <li key=' + articles[i].pmid + ' class="list-group-item">\n' +
                        '                <a\n' +
                        '                    class="list-group-item-title"\n' +
                        '                    href="'+getNCBIlink("/pubmed/" + articles[i].pmid)+'"\n' +
                        '                    target="_blank"\n>' +
                        '                    <b>' + articles[i].title + '</b>\n' +
                        '                </a>\n' +
                        '                <div class="list-group-item-content">\n' +
                        '                    <span>' + articles[i].authors + '.' + articles[i].pubDate + '</span>\n' +
                        '                    <span>PMID: ' + articles[i].pmid + '</span>\n' +
                        '                </div>\n' +
                        '            </li>';
                }
            }
        }
            txt+='    </ul>\n' +
            '  </div>' +
            '</div>\n' +

            '</div>\n' +
            '</div>\n';

        

        txt+=' <div class="disclaimer" style="background-color: white;">' +
            '<span>The information above is intended for research purposes only and should not be used as a substitute for professional diagnosis and treatment.</span>' +
            '</div><div>\n' +
            '    <div data-toggle="collapse" data-target="#secret1_'+id+'" class="collapsible-header">Levels<span style="float: right;">\n' +
            '        <i id="ardown_'+id+'" class="fa fa-chevron-down blue-icon"></i>' +
            '        <i id="arup_'+id+'"   class="fa fa-chevron-up blue-icon" style="display:none;"></i>' +
            '</span></div>\n' +
            '    <div id="secret1_'+id+'" data-toggle="collapse" data-target="#topDives" class="ReactCollapse--collapse" style="overflow: hidden; height: 0px;">\n' +
            '        <div id="topDives" class="ReactCollapse--content" style="background-color: white;">\n' +
            '            <div class="levels levels-collapse">\n' +
            '                <ul style="line-height: 8; padding: 0px;">\n' +
            '                    <li class="levels-li"><i class="oncokb level-icon level-1"></i><span><b>FDA-recognized</b> biomarker predictive of response to an <b>FDA-approved</b> drug <b>in this indication</b></span></li>\n' +
            '                    <li class="levels-li"><i class="oncokb level-icon level-2A"></i><span><b>Standard care</b> biomarker predictive of response to an <b>FDA-approved</b> drug <b>in this indication</b></span></li>\n' +
            '                    <li class="levels-li"><i class="oncokb level-icon level-2B"></i><span><b>Standard care</b> biomarker predictive of response to an <b>FDA-approved</b> drug <b>in another indication</b>, but not standard care for this indication</span></li>\n' +
            '                    <li class="levels-li"><i class="oncokb level-icon level-3A"></i><span><b>Compelling clinical evidence</b> supports the biomarker as being predictive of response to a drug <b>in this indication</b></span></li>\n' +
            '                    <li class="levels-li"><i class="oncokb level-icon level-3B"></i><span><b>Compelling clinical evidence</b> supports the biomarker as being predictive of response to a drug <b>in another indication</b></span></li>\n' +
            '                    <li class="levels-li"><i class="oncokb level-icon level-4"></i><span><b>Compelling biological evidence</b> supports the biomarker as being predictive of response to a drug</span></li>\n' +
            '                    <li class="levels-li"><i class="oncokb level-icon level-R1"></i><span><b>Standard care</b> biomarker predictive of <b>resistance</b> to an <b>FDA-approved</b> drug <b>in this indication</b></span></li>\n' +
            '                    <li class="levels-li"><i class="oncokb level-icon level-R2"></i><span><b>Compelling clinical evidence</b> supports the biomarker as being predictive of <b>resistance</b> to a drug</span></li>\n' +
            '                </ul>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '\n' +
            '    </span>\n' +
            '      <div class="footer" style="background-color: white;">\n' +
            '        <a href="https://oncokb.org/gene/'+data.query.hugoSymbol+'/'+data.query.alteration+'" target="_blank">\n' +
            '          <img src="/pmp/js/page/patient/images/oncokb_logo.png" class="oncokb-logo" alt="OncoKB">\n' +
            '       </a>\n' +
            '       <span class="pull-right feedback">\n' +
            '      </span>\n' +
            '    </div>\n' +
            '   </div>\n' +
            '   </div>\n' +
            '  </div>';

    }
    return txt;
}

function setReHotspotText(){
	var html = '';
	html +=	'<div class="rc-tooltip-inner" role="tooltip">';
	html +=	'<div class="civic-card">';
	html += '<span class="cancerHotspots-module__hotspot-info__1GI2v">';
	html += '<span><b>Recurrent Hotspot</b></span><br>';
	html += '<span>This mutated amino acid was identified as a recurrent hotspot (statistically significant) in a population-scale cohort of tumor samples of various cancer types using methodology based in part on ';
	html += '<a href="http://www.ncbi.nlm.nih.gov/pubmed/26619011" target="_blank">Chang et al., Nat Biotechnol, 2016</a></span><br><br>';
	html += '<span>Explore all mutations at ';
	html += '<a href="http://www.cancerhotspots.org/" target="_blank">http://cancerhotspots.org/</a></span>';
	html += '</span>';
	html +=	'</div>';
	html +=	'</div>';
	
	return html;
}
function set3DHotspotText(){
	var html = '';
	html +=	'<div class="rc-tooltip-inner" role="tooltip">';
	html +=	'<div class="civic-card">';
	html += '<span class="cancerHotspots-module__hotspot-info__1GI2v">';
	html += '<span><b>3D Clustered Hotspot</b></span><br>';
	html += '<span>This mutated amino acid was identified as a 3D clustered hotspot in a population-scale cohort of tumor samples of various cancer types using methodology based in part on ';
	html += '<a href="http://genomemedicine.biomedcentral.com/articles/10.1186/s13073-016-0393-x" target="_blank">Gao et al., Genome Medicine, 2017</a></span><br><br>';
	html += '<span>Explore all mutations at ';
	html += '<a href="http://www.3dhotspots.org/" target="_blank">http://3dhotspots.org/</a></span>';
	html += '</span>';
	
	return html;
}
function setTotalHotspotText(){
	var html = '';
	html +=	'<div class="rc-tooltip-inner" role="tooltip">';
	html +=	'<div class="civic-card">';
	html += '<span class="cancerHotspots-module__hotspot-info__1GI2v">';
	html += '<span><b>Recurrent Hotspot</b> and <b>3D Clustered Hotspot</b></span><br>';
	html += '<span>This mutated amino acid was identified as a recurrent hotspot (statistically significant) and a 3D clustered hotspot in a population-scale cohort of tumor samples of various cancer types using methodology based in part on ';
	html += '<a href="http://www.ncbi.nlm.nih.gov/pubmed/26619011" target="_blank">Chang et al., Nat Biotechnol, 2016</a></span><br><br>';
	html += ' and ';
	html += '<a href="http://genomemedicine.biomedcentral.com/articles/10.1186/s13073-016-0393-x" target="_blank">Gao et al., Genome Medicine, 2017</a>.';
	html += '<span>Explore all mutations at ';
	html += '<a href="http://www.cancerhotspots.org/" target="_blank">http://cancerhotspots.org/</a> and <a href="http://www.3dhotspots.org/" target="_blank">http://3dhotspots.org/</a></span>';
	html += '</span>';
	html +=	'</div>';
	html +=	'</div>';
	return html;
}