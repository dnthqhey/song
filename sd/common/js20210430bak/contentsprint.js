/** 프린트 버튼 클릭 시 이벤트 */
function contentsprint(){
	let $head = $('head').clone();
	let $contents = $('#contents').clone();    // 프린트 할 특정 영역 복사
	
	let headHtml = $head[0].innerHTML
	let innerHtml = $contents[0].innerHTML
	let popupWindow = window.open("", "_blank", "width=910,height=800")
	popupWindow.document.write('<!DOCTYPE html>'+
	  '<html>'+
		'<head>'+headHtml+'</head>'+
		'<body><div id="contents">'+innerHtml+'</div></body>'+
	  '</html>')
   
	popupWindow.document.close();
	popupWindow.focus();


	setTimeout(function(){
		popupWindow.print();         // 팝업의 프린트 도구 시작
		popupWindow.close();       // 프린트 도구 닫혔을 경우 팝업 닫기
	}, 200);
}
