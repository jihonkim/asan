var dataAdapterTree;		//jqxGrid

//jqxTree그리기
var makeTree = function(myId, sourceTree, chkFlag, size, dataKey){

	dataAdapterTree = new $.jqx.dataAdapter(sourceTree);
	dataAdapterTree.dataBind();
	
	console.log(dataKey);
	
	var treeRecords = dataAdapterTree.getRecordsHierarchy(dataKey, 'parentid', 'items', [{ name: 'text', map: 'label'}]);
	console.log($('.control-sidebar-bg').height() * size);
	var windowSize = ($('.control-sidebar-bg').height() * size)+"px";
	
    
    $(myId).jqxTree({ 
		source: treeRecords, 
		width: '100%',
		height: windowSize,
		hasThreeStates: chkFlag, 
		checkboxes: chkFlag,
		allowDrag: true, 
		allowDrop: true,
		dragEnd: function (item, dropItem, args, dropPosition, tree) {
			console.log(item);
			console.log(dropItem);
			console.log(args);
			console.log(dropPosition);
			console.log(tree);
			//tree내에서 이동못하게 수정
			if(dropPosition == "after" || dropPosition == "before" || dropPosition == "inside"){
				return false;
			}
		}
	});
    
    $(myId).css('visibility', 'visible');
    
	//tree change image
    treeChangeImage();
    
    //트리검색 라디오버튼
    treeSearchRadio();
};

//트리검색 라디오버튼
var treeSearchRadio = function(){
	//체크박스
	$('.minimal').iCheck({
		checkboxClass: 'icheckbox_minimal-blue',
		radioClass: 'iradio_minimal-blue'
	});
};


//tree change image
var treeChangeImage = function(){
	$('.jqx-tree-item-arrow-collapse').on('click',function(){
		if($(this).next().find('img').attr('src') == "/images/folderOpen.png"){			//항목선택
			$(this).next().find('img').attr('src','/images/folder.png');
		}else if($(this).next().find('img').attr('src') == "/images/folder.png"){		//항목선택
			$(this).next().find('img').attr('src','/images/folderOpen.png');
		}else if($(this).next().next().find('img').attr('src') == "/images/folderOpen.png"){	//조건공유
			$(this).next().next().find('img').attr('src','/images/folder.png');
		}else if($(this).next().next().find('img').attr('src') == "/images/folder.png"){		//조건공유
			$(this).next().next().find('img').attr('src','/images/folderOpen.png');
		}			
	});
};

//tree drag & drop
var playDragNDropForTree = function(treeId, tableId){
	//drag&drop 시작했을때
	$(treeId).on('dragStart', function (event) {
		$("#dragStartLog").text("Drag Start: " + event.args.label);
		$("#dragEndLog").text("");
	});
	//drag&drop 끝났을때
	$(treeId).on('dragEnd', function (event) {
		$("#dragEndLog").text("Drag End");
		console.log(event);
		 if (event.args.label) {
			var ev = event.args.originalEvent;
			var x = ev.pageX;
			var y = ev.pageY;
			if (event.args.originalEvent && event.args.originalEvent.originalEvent && event.args.originalEvent.originalEvent.touches) {
				var touch = event.args.originalEvent.originalEvent.changedTouches[0];
				x = touch.pageX;
				y = touch.pageY;
			}
			var offset = $(tableId).offset();
			var width = $(tableId).width();
			var height = $(tableId).height();
			var right = parseInt(offset.left) + width;
			var bottom = parseInt(offset.top) + height;

			if (x >= parseInt(offset.left) && x <= right) {
				if (y >= parseInt(offset.top) && y <= bottom) {
					var rows = new Array();
					var dataArr = [
									event.args.label+"1",
									event.args.label+"2",
									event.args.label+"3",
									event.args.label+"4",
									"<input type='text'>",
									event.args.label+"6",
									event.args.label+"7",
									event.args.label+"8",
									event.args.label+"9",
									event.args.label+"10",
									event.args.label+"11",
								];
					console.log(dataArr);
					addRow(dataArr, tableId);
				}
			}
		}
	});
};
