<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title><c:out value="${param.title}"/></title>
<style type="text/css">
<!--
body {
	margin-left: 0px;
	margin-top: 0px;
	margin-right: 0px;
	margin-bottom: 0px;
}
.style2 {font-size: 13px}
-->
</style></head>
<script language="javascript">

//window.resizeTo(328,460);

	function setCookie( name, value, expiredays )
    {
		var todayDate = new Date();
		todayDate.setDate( todayDate.getDate() + expiredays );
		document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";";
	}

	function closeWin()
	{
		if ( document.Notice.Notice1.checked ) {
			setCookie( "divpopup<c:out value="${param.num}"/>", "done" , 1);
		}

		self.close();

	}

	function url_link(go_url){
		opener.location.href = go_url;
		self.close();
	}

</script>

<body>

<form name="Notice" >

<table width="<c:out value="${param.width}"/>" height="34" border="0" cellpadding="0" cellspacing="0">
	<tr colspan="2">
		<td><a href="<c:out value="${param.link}"/>" target="<c:out value="${param.target}"/>"><img src="/DATA/popup/<c:out value="${param.img}"/>" width="<c:out value="${param.width}"/>px" height="<c:out value="${param.height}"/>px" alt="<c:out value="${param.alt}"/>" border="0" /></a></td>
	</tr>
	<tr bgcolor="#000000">
		<td width="${param.width}px" height="40px" align="right" class="s_txt">
			<span class="style2"><font color="#ffffff">오늘하루동안 열리지 않습니다</font></span>
			<input type="checkbox" name="Notice1" onclick="closeWin()">	</td>
		<td width="11">&nbsp;</td>
	</tr>
</table>

</form>
</body>
</html>