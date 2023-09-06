<%@ page contentType="text/html; charset=utf-8" %>
<%@ page isErrorPage="true" %>
<%@ page import="kr.co.hanshinit.NeoCMS.cmm.util.*"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta charset="utf-8" /><meta name="decorator" content="null"/>
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<link rel="stylesheet" type="text/css" href="/common/css/program.css" />
	<script src="/common/js/jquery-1.12.4.min.js"></script>
	<script src="/common/js/program.min.js"></script>
	<title>안내페이지(404)</title>
</head>
<body>

<div class="row">
    <div class="col-12 col-offset-6 col-sm-24 col-sm-offset">
        <div class="card card--corner">
            <div class="card__body text_center">
                <div class="card__title">안내</div>
                <div class="card__content">주소가 잘못 입력되었거나, 변경 혹은 삭제되어 요청하신 페이지를 찾을 수 없습니다.
                <br /><br />
                입력하신 주소가 정확한지 다시한번 확인해 주세요.
                </div>
            </div>
        </div>
    </div>
</div>

<div class="p-button-group row">
    <div class="col-4 col-offset-10 col-sm-24 col-sm-offset text_center">
        <a href="/" class="p-button p-button--large primary skip">홈으로 이동</a>
		<a href="#n" onclick="history.back();" class="p-button p-button--large info">이전 페이지</a>
    </div>
</div>

</body>
</html>


