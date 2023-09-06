<%@ page language="java" pageEncoding="UTF-8"%><%
	String ctgry = org.apache.commons.lang.StringUtils.defaultIfEmpty(request.getParameter("ctgry"), "a");
	String siteId = org.apache.commons.lang.StringUtils.defaultIfEmpty(request.getParameter("siteId"), "www");
	String ikey = org.apache.commons.lang.StringUtils.defaultIfEmpty(request.getParameter("ikey"), "1266");
	String fkey = org.apache.commons.lang.StringUtils.defaultIfEmpty(request.getParameter("fkey"), "1264");
	String skey = org.apache.commons.lang.StringUtils.defaultIfEmpty(request.getParameter("skey"), "1265");
	String callback = org.apache.commons.lang.StringUtils.defaultIfEmpty(request.getParameter("callback"), "kangwon_idea");

	String url = "http://www.kangwon.ac.kr/ideaListJSON.do?ctgry="+ctgry+"&siteId="+siteId+"&ikey="+ikey+"&fkey="+fkey+"&skey="+skey;
	String encoding = "utf-8";
	String json = kr.co.hanshinit.NeoCMS.cmm.util.HttpClientUtil.getResponseString(url, encoding, 1000, 1000);
%><%=callback%>(<%=json%>)

