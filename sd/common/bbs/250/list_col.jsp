<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="tsu" uri="http://www.hanshinit.co.kr/jstl/tagStringUtil"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<col style="width:90px"/>
<col style="width:90px"/><c:set var="colspan_cnt" value="${colspan_cnt + 2}" scope="request"/>
<c:if test="${bbsMgrAuth eq 'Y' }">
<col style="width:120px"/>
<col style="width:70px"/>
<col style="width:70px"/><c:set var="colspan_cnt" value="${colspan_cnt + 3}" scope="request"/>
</c:if>