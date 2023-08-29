<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%
String includeEditorJs = egovframework.com.cmm.EgovWebUtil.clearXSSMaximum(request.getParameter("includeEditorJs") == null? "Y":request.getParameter("includeEditorJs"));
String formId = egovframework.com.cmm.EgovWebUtil.clearXSSMaximum(request.getParameter("formId") == null? "form":request.getParameter("formId"));
String selector = egovframework.com.cmm.EgovWebUtil.clearXSSMaximum(request.getParameter("selector") == null? "selector":request.getParameter("selector"));
String imageUpload = egovframework.com.cmm.EgovWebUtil.clearXSSMaximum(request.getParameter("imageUpload") == null? "N": "IU".equals(request.getParameter("imageUpload")) ? "Y":"N");

request.setAttribute("includeEditorJs", includeEditorJs);
request.setAttribute("selector", selector);
request.setAttribute("formId", formId);
request.setAttribute("imageUpload", imageUpload);
%>

<c:if test="${includeEditorJs eq 'Y'}">
<script src="/common/naver_editor/js/service/HuskyEZCreator.js" charset="utf-8"></script>
<script>
var oEditors = [];
<c:forEach var="s" items="${fn:split(selector, ',')}" varStatus="sstt">
nhn.husky.EZCreator.createInIFrame({
	oAppRef: oEditors,
	elPlaceHolder: "<c:out value="${s}"/>",
	<c:choose><c:when test="${imageUpload eq 'Y'}"> sSkinURI: "/common/naver_editor/SmartEditor2SkinUpload.html", </c:when>
	<c:otherwise>sSkinURI: "/common/naver_editor/SmartEditor2SkinUpload.html",</c:otherwise></c:choose>
	htParams : {
		SE2M_FontName: {
			htMainFont: {'id': 'Noto Sans KR Medium','name': '본고딕','size': '12','url': '','cssUrl': ''} // 기본 글꼴 설정
		}
	},
	fCreator: "createSEditor2"
});

$('#<c:out value="${formId}"/>').on('submit', function() {
	oEditors.getById["<c:out value="${s}"/>"].exec("UPDATE_CONTENTS_FIELD", []);
});

<c:if test="${imageUpload eq 'Y'}">
oEditors.getById["<c:out value="${s}"/>"].registerPlugin(new nhn.husky.SE2M_AttachQuickPhoto(elAppContainer)); // 사진
</c:if>

</c:forEach>
</script>
</c:if>