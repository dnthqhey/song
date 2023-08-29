<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8"/>
<title>주소검색</title>
<%
	request.setCharacterEncoding("UTF-8"); //한글깨지면 주석제거
	String inputYn = request.getParameter("inputYn");
	boolean changeCharset = false;

	String roadFullAddr = request.getParameter("roadFullAddr");
	if(roadFullAddr != null && changeCharset) {
		roadFullAddr = new String(roadFullAddr.getBytes("ISO-8859-1"), "utf-8");
	}
	String roadAddrPart1 = request.getParameter("roadAddrPart1");
	if(roadAddrPart1 != null && changeCharset) {
		roadAddrPart1 = new String(roadAddrPart1.getBytes("ISO-8859-1"), "utf-8");
	}
	String roadAddrPart2 = request.getParameter("roadAddrPart2");
	if(roadAddrPart2 != null && changeCharset) {
		roadAddrPart2 = new String(roadAddrPart2.getBytes("ISO-8859-1"), "utf-8");
	}
	String engAddr = request.getParameter("engAddr");
	String jibunAddr = request.getParameter("jibunAddr");
	if(jibunAddr != null && changeCharset) {
		jibunAddr = new String(jibunAddr.getBytes("ISO-8859-1"), "utf-8");
	}
	String zipNo = request.getParameter("zipNo");
	String addrDetail = request.getParameter("addrDetail");
	if(addrDetail != null && changeCharset) {
		addrDetail = new String(addrDetail.getBytes("ISO-8859-1"), "utf-8");
	}

	String fctgry = request.getParameter("fctgry");

	request.setAttribute("inputYn", inputYn);
	request.setAttribute("roadFullAddr", roadFullAddr);
	request.setAttribute("roadAddrPart1", roadAddrPart1);
	request.setAttribute("roadAddrPart2", roadAddrPart2);
	request.setAttribute("engAddr", engAddr);
	request.setAttribute("jibunAddr", jibunAddr);
	request.setAttribute("zipNo", zipNo);
	request.setAttribute("addrDetail", addrDetail);

	if(!"Y".equals(inputYn)) {
		if(fctgry != null) {
			//System.out.println("1.fctgry = " + fctgry);
			session.setAttribute("fctgry", fctgry);
		}
		else {
			session.setAttribute("fctgry", "");
		}
	}
%>
</head>
<script>
function init(){
	var url = location.href;
	var confmKey = "bnVsbDIwMTQwOTA0MTc1NTQ1";
	var inputYn= "<c:out value="${inputYn}"/>";
	if(inputYn != "Y"){
		document.form.confmKey.value = confmKey;
		document.form.returnUrl.value = url;
		document.form.action="http://www.juso.go.kr/addrlink/addrLinkUrl.do"; //인터넷망
		document.form.submit();
	}
	else{
		opener.jusoCallBack("<c:out value="${roadFullAddr}"/>","<c:out value="${roadAddrPart1}"/>","<c:out value="${addrDetail}"/>","<c:out value="${roadAddrPart2}"/>","<c:out value="${engAddr}"/>","<c:out value="${jibunAddr}"/>","<c:out value="${zipNo}"/>", "<c:out value="${sessionScope.fctgry}"/>");
		window.close();
	}
}
</script>
<body onload="init();">
	<form id="form" name="form" method="post">
		<input type="hidden" id="confmKey" name="confmKey" value=""/>
		<input type="hidden" id="returnUrl" name="returnUrl" value=""/>
	</form>
</body>
</html>
<%
if("Y".equals(inputYn)) {
	//System.out.println("2. fctgry = " + fctgry);
	session.removeAttribute("fctgry");
}
%>
