<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<script type="text/javascript" src="<c:url value='/cmm/validator.do'/>"></script>

<c:set var="model" value="${param.modelNm}"/>
<c:set var="originalModelNm" value="${param.originalModelNm }"/>
<c:if test="${empty(originalModelNm) }">
    <c:set var="originalModelNm" value="${model}"/>
</c:if>


<validator:javascript formName="${model}" staticJavascript="false" xhtml="true" cdata="false"/>
<spring:hasBindErrors name="${originalModelNm }">
    <script type="text/javascript">
        <c:forEach items="${errors.allErrors}" var="error" varStatus="status">
            <c:if test="${status.first}">
                alert("<spring:message code="${error.code}" arguments="${error.arguments}" />");
            </c:if>
        </c:forEach>
    </script>
</spring:hasBindErrors>
<c:if test="${!empty message}">
    <script type="text/javascript">
        function fn_check_message() {
            alert("<c:out value='${message}'/>");
            <c:if test="${!empty fieldName}">
                $("#${fieldName}").focus();
            </c:if>
        }
        $(window).load(function() {
            fn_check_message();
        });
    </script>
</c:if>