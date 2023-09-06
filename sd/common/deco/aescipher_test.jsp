<%@ page language = "java" contentType = "text/html; charset=utf-8"%>
<%@ include file="./aescipher.jsp" %>
<%
	String id = "hongkd";
	String dept_code = "D0001";
	String dept_nm = "홍보전산과";

	String o = id+"^"+dept_code+"^"+dept_nm;
	String c = encrypt(o, "EUC-KR");
	String p = decrypt(c, "EUC-KR");



	String te = "ef0028f4745edf487a737be5c0c77c318a13c15b44f3044553dc8203197354e2255eece14aab";
	String tp = decrypt(c, "EUC-KR");
%>
o = <%=o%>
c = <%=c%><br/>
p = <%=p%><br/>
te = <%=te%><br/>
tp = <%=tp%><br/>

