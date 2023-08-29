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
	$.ajax({
		url : 'http://www.kangwon.ac.kr/ideaListJSON.do',
		data : {"ctgry":"a", "siteId":"www", "ikey":1266, "fkey":1264, "skey":1265},
		dataType : "json",
		success : function(data) {
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
		},
		error: function(xhr, txtStatus, errorThrown){
			 alert(xhr.status + " : "+ txtStatus +" : "+errorThrown);
		}
	});
}

$(document).ready(function() {
	idea();
});
</script>

</body>
</html>