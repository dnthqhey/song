<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<c:set var="remote_addr"><%=kr.co.hanshinit.NeoCMS.cmm.util.HtmlUtil.getRemoteAddr(request)%></c:set>
<c:if test="${fn:startsWith(remote_addr, '192.168.0.') or fn:startsWith(remote_addr, '192.168.10.') or fn:startsWith(remote_addr, '127.0.0.1') or fn:startsWith(remote_addr, '175.212.21.90') or fn:startsWith(remote_addr, '98.4.10.142') or fn:startsWith(remote_addr, '98.4.10.143')}">
<div class="hanshin">
	<div class="wrap">
		<jsp:include page="/common/deco/w3c.jsp" />
	</div>
</div>
</c:if>
<script>
var IS_ID_LOGIN = '${not empty loginVO.id and not empty loginVO.uniqId ? "Y":"N"}';
var IS_RN_LOGIN = '${empty loginVO.id and loginVO.userSe ne 'SOCIAL' and not empty loginVO.uniqId ? "Y":"N"}';
var IS_SC_LOGIN = '${empty loginVO.id and loginVO.userSe eq 'SOCIAL' and not empty loginVO.uniqId ? "Y":"N"}';
</script>