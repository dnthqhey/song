<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ page import="java.util.List" %>
<%@	page import="org.springframework.web.context.WebApplicationContext"%>
<%@	page import="org.springframework.web.context.support.WebApplicationContextUtils" %>
<%@ page import="org.apache.commons.lang.StringUtils" %>
<%@ page import="kr.co.hanshinit.NeoCMS.cmm.util.StringUtil"%>
<%@ page import="kr.co.hanshinit.NeoCMS.cop.emp.service.DeptEmp"%>
<%@ page import="kr.co.hanshinit.NeoCMS.cop.emp.service.DeptEmpService"%>
<%@ page import="kr.co.hanshinit.NeoCMS.cop.emp.service.DeptEmpVO"%>
<%@ page import="kr.co.hanshinit.NeoCMS.sym.dep.service.Department"%>
<%@ page import="kr.co.hanshinit.NeoCMS.sym.dep.service.DepartmentService"%>
<%
WebApplicationContext wac = null;
String deptCode = request.getParameter("dept_code");
try {
	wac = WebApplicationContextUtils.getRequiredWebApplicationContext(((HttpServletRequest) request).getSession().getServletContext());
	DeptEmpService deptEmpService = (DeptEmpService)wac.getBean("deptEmpService");
	DepartmentService departmentService = (DepartmentService)wac.getBean("departmentService");

	DeptEmp deptEmp = new DeptEmp();
	deptEmp.setDeptCode(deptCode);

	if(deptEmp.getDeptCode() == null) {
		deptEmp.setDeptCode("");
	}

	if(StringUtils.isNotBlank(deptEmp.getDeptCode())) {
		Department deptInfo = departmentService.selectDepartment(deptEmp.getDeptCode());
		if(deptInfo != null) {
			deptEmp.setDeptSortCode(deptInfo.getDeptSortCode());
			request.setAttribute("deptInfo", deptInfo);
		}
	}

	if(StringUtils.isNotBlank(deptEmp.getDeptCode())) {
		// 게시물 카운트
		int totCnt = deptEmpService.selectDeptEmpTotCnt(deptEmp);

		// 페이징 정보
		deptEmp.setPageUnit(totCnt);
		deptEmp.getNeoPaginationInfo(totCnt);

		// 리스트
		List<DeptEmp> deptEmpList = deptEmpService.selectDeptEmpList(deptEmp);
		request.setAttribute("deptEmpList", deptEmpList);
	}
}
catch(IllegalStateException e) {
	kr.co.hanshinit.NeoCMS.cmm.util.LoggingUtil.log(e);
}
catch(Exception e) {
	kr.co.hanshinit.NeoCMS.cmm.util.LoggingUtil.debug(e);
}
%>
	<table class="table">
		<caption>${deptInfo.deptNm} 구성원에 대한 표 - 성명, 직급, 전화번호, 담당업무 순으로 내용을 제공하고 있습니다.</caption>
		<colgroup>
			<col style="width:120px;" />
			<col style="width:130px;" />
			<col style="width:150px;" />
			<col />
		</colgroup>
		<thead>
			<tr>
				<th scope="col">성명</th>
				<!-- <th scope="col">소속</th> -->
				<!-- <th scope="col">직책</th> -->
				<th scope="col">직급</th>
				<th scope="col">전화번호</th>
				<th scope="col">담당업무</th>
				<!-- <th scope="col">이메일</th> -->
			</tr>
		</thead>
		<c:if test="${fn:length(deptEmpList) gt 0}">
		<tbody>
		<c:forEach var="result" items="${deptEmpList}" varStatus="dstt">
			<tr>
				<td data-cell-header="성명 : "><c:out value="${result.emplNm}" /></td>
				<%-- <td data-cell-header="소속 : "><c:out value="${result.deptNm}" /></td> --%>
				<%-- <td data-cell-header="직명 : "><c:out value="${result.clsf}" /></td> --%>
				<td data-cell-header="직급 : "><c:out value="${result.rspofc}" /></td>
				<td data-cell-header="전화번호 : "><c:out value="${result.emplTelno}" /></td>
				<td data-cell-header="담당업무 : " class="text_left">${result.emplJobBr}</td>
				<%-- <td data-cell-header="이메일 : "><c:if test="${not empty result.emplEmail}"><a href="mailto:<c:out value="${result.emplEmail}" />" title="새창" target="_blank" class="btn small">이메일</a></c:if></td> --%>
			</tr>
		</c:forEach>
		</tbody>
		</c:if>
	</table>
