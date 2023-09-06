<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="tsu" uri="http://www.hanshinit.co.kr/jstl/tagStringUtil"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<th scope="col">매뉴얼</th>
<th scope="col">설치파일</th>
<c:if test="${bbsMgrAuth eq 'Y' }">
<th scope="col">사용여부</th>
<th scope="col" colspan="2">관리</th>
</c:if>