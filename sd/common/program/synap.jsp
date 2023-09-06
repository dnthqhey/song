<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="org.apache.commons.lang.*" %>
<%@ page import="com.synap.convert.*" %>
<%@ page import="egovframework.com.cmm.*" %>
<%@ page import="kr.co.hanshinit.NeoCMS.cmm.service.*" %>
<%@ page import="kr.co.hanshinit.NeoCMS.cmm.util.*" %>
<%
String webRootPath = FileMngUtil.WEB_ROOT_REAL_PATH;
String synapDocUrl = PropResource.getString(PropResource.PropType.CMS, "synap_skin_doc", "/synap/skin/doc.html");
String fileName = request.getParameter("fileName");
if(fileName != null) {
	String inputFile = EgovWebUtil.filePathBlackList(EgovWebUtil.removeOSCmdRisk(fileName));
	//out.println("<!-- inputFile1 = " + inputFile + "-->");
	inputFile = FileMngUtil.getStandardPath(webRootPath + "/" + inputFile);
	//out.println("<!-- inputFile2 = " + inputFile + "-->");
	String fn = StringUtil.toSha256(inputFile);
	//out.println("<!-- fn = " + fn + "-->");
	String previewPath = "/synap/preview/contents/"+fn;
	//out.println("<!-- previewPath = " + previewPath + "-->");
	String aPpreviewPath = FileMngUtil.getStandardPath(webRootPath + "/" + previewPath);
	//out.println("<!-- aPreviewPath = " + previewPath + "-->");
	int outputValue = ConvertToHtml.convertToHtml(inputFile, aPpreviewPath, fn);
	//out.println("<!-- outputValue = " + outputValue + "-->");
	if( 0 == outputValue ) {
	    response.sendRedirect(synapDocUrl+"?fn=" + fn + "&rs=" + previewPath);
	    return;
	}
}
%>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
    <title>변환 오류</title>
</head>
<body>
<%--
<%=webRootPath%><br/>
<%=synapDocUrl%><br/>
<%=fileName%><br/>
--%>
    변환중 오류가 발생하였습니다.
</body>
</html>