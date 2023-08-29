<%@ page language="java" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" >
<meta http-equiv="content-language" content="ko"/>
<title>옥천군에 오신것을 환영합니다.</title>
</head>
<body>

<script src="/common/js/jquery-1.12.4.min.js"></script>

<div id="curr_idea" style="display:none">
	<span id="ctgry"></span>
	<span id="sj"></span>
	<span id="enddeYMD"></span>
	<a id="ideaLink" href="#n">참여하기</a>
</div>

<script>
function idea() {
	callback = "kangwonIdea";
	$.ajax({
		url : '/common/deco/idea_jsonp.jsp?callback='+callback,
		jsonp : callback,
		dataType : 'jsonp'
	});
}

function kangwonIdea(data) {
	console.log(data);
	idx = 0;
	if(data.resultModel[idx]) {
		m = data.resultModel[idx];

		$('#ctgry').text(m.ctgry);
		$('#sj').text(m.sj);
		$('#enddeYMD').text(m.enddeYMD);
		$('#ideaLink').attr('href', m.detailUrl);
		$('#curr_idea').show();
	}
}


$(document).ready(function() {
	idea();
});
</script>

</body>
</html>