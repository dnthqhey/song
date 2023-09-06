<%@ page pageEncoding="utf-8" contentType="application/vnd.ms-excel; charset=utf-8" %><%@ page import="java.io.*"
%><%@ page import="java.util.List"
%><%@ page import="java.util.UUID"
%><%@ page import="org.apache.commons.lang.StringUtils"
%><%@ page import="org.springframework.web.context.WebApplicationContext"
%><%@ page import="org.springframework.web.context.support.WebApplicationContextUtils"
%><%@ page import="egovframework.com.cmm.util.EgovResourceCloseHelper"
%><%@ page import="kr.co.hanshinit.NeoCMS.cmm.stereotype.BbsMode"
%><%@ page import="kr.co.hanshinit.NeoCMS.cmm.service.SearchCriteria"
%><%@ page import="kr.co.hanshinit.NeoCMS.cmm.service.FileMngUtil"
%><%@ page import="kr.co.hanshinit.NeoCMS.cmm.util.HtmlUtil"
%><%@ page import="kr.co.hanshinit.NeoCMS.cmm.util.DateUtil"
%><%@ page import="kr.co.hanshinit.NeoCMS.cmm.util.DownloadUtil"
%><%@ page import="kr.co.hanshinit.NeoCMS.cop.bbs.ntt.service.BbsAuthor"
%><%@ page import="kr.co.hanshinit.NeoCMS.cop.bbs.ntt.service.BbsAuthorService"
%><%@ page import="kr.co.hanshinit.NeoCMS.cop.bbs.bim.service.BbsInfo"
%><%@ page import="kr.co.hanshinit.NeoCMS.cop.bbs.ntt.service.BbsNttService"
%><%@ page import="kr.co.hanshinit.NeoCMS.cop.bbs.ntt.service.BbsNttVO"
%><%
WebApplicationContext wac = null;
try {
	int bbsNo = 8;
	wac = WebApplicationContextUtils.getRequiredWebApplicationContext(((HttpServletRequest) request).getSession().getServletContext());
	BbsAuthorService bbsAuthorService = (BbsAuthorService)wac.getBean("bbsAuthorService");
	BbsAuthor bbsAuthor = bbsAuthorService.authorBbs(request.getSession(), "www", bbsNo, 0, 0, BbsMode.LIST);

	if(bbsAuthor.isAdminAuth()) {
		BbsNttService bbsNttService = (BbsNttService)wac.getBean("bbsNttService");
		BbsInfo bbsInfo = new BbsInfo();
		bbsInfo.setSortField("SOFL06");
		bbsInfo.setSortMth("DESC");
		BbsNttVO bbsNttVO = new BbsNttVO();
		bbsNttVO.setBbsNo(bbsNo);
		int totalCount = bbsNttService.selectBbsNttTotCnt(bbsNttVO);
		bbsNttVO.setFirstIndex(0);
		bbsNttVO.setLastIndex(totalCount);
		List<BbsNttVO> bbsNttNoticeList01 = bbsNttService.selectBbsNttList(bbsInfo, bbsNttVO);


		File csv = new File(FileMngUtil.WEB_ROOT_REAL_PATH + "/WEB-INF/excel/", UUID.randomUUID().toString()+".csv");

		if(bbsNttNoticeList01 != null) {
			BufferedWriter output = null;
			try {
				output = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(csv, false), "ms949"));

				for(BbsNttVO n : bbsNttNoticeList01) {
					output.write(StringUtils.replace(StringUtils.trim(n.getNttSj()), ",", "_")+","+StringUtils.trim(n.getCtgryNm())+"\n");
					output.flush();
				}
			}
			catch(java.io.IOException e) {
				kr.co.hanshinit.NeoCMS.cmm.util.LoggingUtil.log(e);
			}
			finally {
				EgovResourceCloseHelper.close(output);
			}
		}



		if(csv != null && csv.isFile()) {
			String sp = csv.getParentFile().getAbsolutePath();
			String sn = csv.getName();
			String on = "민원서식목록_" + DateUtil.getNowDateTime("yyyyMMddHHmmss") +".csv";
			String rm = DownloadUtil.DELETE_AFTER_DOWNLOAD;
			request.setAttribute("sp", sp);
			request.setAttribute("sn", sn);
			request.setAttribute("on", on);
			request.setAttribute("rm", rm);
			request.getRequestDispatcher("/common/download_att.do").forward(request, response);
		}
	}
}
catch(NullPointerException e) {
	kr.co.hanshinit.NeoCMS.cmm.util.LoggingUtil.log(e);
}
catch(Exception e) {
	kr.co.hanshinit.NeoCMS.cmm.util.LoggingUtil.log(e);
}
%>