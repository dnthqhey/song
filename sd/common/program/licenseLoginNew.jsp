<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="tsu" uri="http://www.hanshinit.co.kr/jstl/tagStringUtil"%>
<%@ page import="java.util.*" %>
<%@ page import="java.net.URLEncoder" %>
<%@ page import="org.springframework.web.context.WebApplicationContext"%>
<%@ page import="org.springframework.web.context.support.WebApplicationContextUtils" %>
<%@ page import="org.apache.commons.lang.StringUtils" %>
<%@ page import="egovframework.com.cmm.LoginVO" %>
<%@ page import="kr.co.hanshinit.NeoCMS.cmm.service.SearchCriteria" %>
<%@ page import="kr.co.hanshinit.NeoCMS.cmm.util.*"%>
<%@ page import="kr.co.hanshinit.NeoCMS.uss.umt.service.*"%>
<%@ page import="kr.co.hanshinit.NeoCMS.cmm.service.*" %>
<%@ include file="./KISA_SHA256.jsp"%>
<%!
public byte[] getBytes(String data) {
	String[] str = data.split(",");
	byte[] result = new byte[str.length];
	for(int i=0; i<result.length; i++) {
		result[i] = getHex(str[i]);
	}
	return result;
}

public String getString(byte[] data) {
	String result = "";
	for(int i=0; i<data.length; i++) {
		result = result + toHex(data[i]);
	}
	return result;
}

public byte getHex(String str) {
	str = str.trim();
	if(str.length() == 0)
		str = "00";
	else if(str.length() == 1)
		str = "0" + str;

	str = str.toUpperCase();
	return (byte)(getHexNibble(str.charAt(0)) * 16 + getHexNibble(str.charAt(1)));
}

public byte getHexNibble(char c) {
	if(c >= '0' && c<='9')
		return (byte)(c - '0');
	if(c >= 'A' && c<='F')
		return (byte)(c - 'A' + 10);
	return 0;
}

public String toHex(int b) {
	char c[] = new char[2];
	c[0] = toHexNibble((b>>4) & 0x0f);
	c[1] = toHexNibble(b & 0x0f);
	return new String(c);
}

public char toHexNibble(int b) {
	if(b >= 0 && b <= 9)
		return (char)(b + '0');
	if(b >= 0x0a && b <= 0x0f)
		return (char)(b + 'A' - 10);
	return '0';
}

// str : 암호화된 값 , rand : 난수
public String toReEnc(String str,String rand){
	String str2 = "";
	str2 += str.substring(0,3) + rand.charAt(0);
	str2 += str.substring(3,17) + rand.charAt(1);
	str2 += str.substring(17,25) + rand.charAt(2);
	str2 += str.substring(25,31) + rand.charAt(3);
	str2 += str.substring(31,36) + rand.charAt(4);
	str2 += str.substring(36,52) + rand.charAt(5);
	str2 += str.substring(52,str.length());
	//
	return str2;
}

%>
<c:choose>
<c:when test="${sessionScope.loginVO.userSe ne 'GNRL'}">
<script type="text/javascript">
alert("비회원은 이용하실 수 없습니다.\r\n\r\n회원가입 후 이용해주세요.");
location.href = "/www/loginForm.do?url=${tsu:urlEncodeByEnc('/common/program/licenseLoginNew.jsp', 'utf-8')}";
</script>
</c:when>
<c:otherwise>
<%
String forwordParam_new = "";
String forwordUrl_new = "";
LoginVO loginVO = (LoginVO)session.getAttribute("loginVO");
if(loginVO != null) {
	String userId = loginVO.getId();
	WebApplicationContext wac = WebApplicationContextUtils.getRequiredWebApplicationContext(((HttpServletRequest) request).getSession().getServletContext());
	UserInfoService userInfoService = (UserInfoService)wac.getBean("userInfoService");
	UserInfo userInfo = userInfoService.selectUserInfo(userId);

	if(userInfo != null) {
		String addr = userInfo.getAdres();
		String ydp_yn = "";
		if(addr.matches(".*영등포구.*")) {
			ydp_yn = "Y";
		} else {
			ydp_yn = "N";
		}

		String memId = kr.co.hanshinit.NeoCMS.cmm.util.StringUtil.nvl(userInfo.getUserId());
		String memNm = kr.co.hanshinit.NeoCMS.cmm.util.StringUtil.nvl(userInfo.getUserNm());
		String point = kr.co.hanshinit.NeoCMS.cmm.util.StringUtil.nvl(""+(userInfo.getPoint() == null ? 0:userInfo.getPoint()));
		//
		int rand = (int) (Math.random() * 1000000 ) + 1;
		String plainStr = memId + rand;
		byte[] plainByte = plainStr.getBytes("euc-kr");
		String sso = toReEnc(getString(Sha256EncryptB(plainByte)),Integer.toString(rand));
		//
		forwordParam_new  = "?sso=" + sso;
		forwordParam_new += "&f_user_id=" + memId;
		forwordParam_new += "&f_user_name=" + URLEncoder.encode(memNm, "EUC-KR" );
		forwordParam_new += "&f_user_point=" + point;
		forwordParam_new += "&f_user_ydp=" + ydp_yn;

		//사이버출판사 파라미터 받는 부분(ssh적용후 https로 변경할 것)
		forwordUrl_new = "https://ydp.cyber.co.kr:444/company/ydp/logInNew.jsp";
	}
}

response.setContentType("text/html;charset=euc-kr");
response.setHeader("Cache-control", "no-cache");
response.setHeader("Pragma", "no-cache");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>영등포구청 온라인 교육 사이트</title>
<script type="text/javascript" src="/common/js/jquery-1.12.4.min.js"></script>
<style type="text/css">
<!--
.style1 {color: #FFFFFF}
-->
</style>
</head>
<style type="text/css">
<!--
body {
font-size: 12px;
	margin-left: 0px;
	margin-top: 0px;
	margin-right: 0px;
}
.afterlogin {
	font-size: 12px;
	font-weight: bold;
	color: #FFFFFF;
}


.layer {display:none; position:fixed; top:0; left:0; width:100%; height:100%; z-index:10000; }
.layer .bg {position:absolute; top:0; left:0; width:100%; height:100%; background:#000; opacity:.5; ;}
.layer .pop-layer {display:block;}

.pop-layer {display:none; position: absolute; top: 50%; left: 50%; width: 780px; height:auto;  background-color:#fff; border: 5px solid #3571B5; z-index: 10;}

.pop-layer p.ctxt {color: #666; text-align:center}
.pop-layer .btn-r {margin:10px 10px 0 0;text-align:right;}


a.cbtn {display:inline-block; height:25px; padding:0 14px 0; border:1px solid #304a8a; background-color:#3f5a9d; font-size:13px; color:#fff; line-height:25px;}
a.cbtn:hover {border: 1px solid #091940; background-color:#1f326a; color:#fff;}

-->
</style>
<script>
$(document).ready(function(){
	var temp = $('#layer');
	var bg = temp.prev().hasClass('bg');

	if(bg) {
		$('.layer').fadeIn();
	} else {
		temp.fadeIn();
	}

	if (temp.outerHeight() < $(document).height() ) {
		temp.css('margin-top', '-'+temp.outerHeight()/2+'px')
	} else {
		temp.css('top', '0px')
	}

	if (temp.outerWidth() < $(document).width() ) {
		temp.css('margin-left', '-'+temp.outerWidth()/2+'px')
	} else {
		temp.css('left', '0px')
	}
});
</script>
<body>
<div class="layer">
	<div class="bg"></div>
	<div class="pop-layer" id="layer">
		<div class="btn-r">
			<a class="cbtn" href="<%=forwordUrl_new%><%=forwordParam_new%>">확인</a>
		</div>
		<div class="pop-container">
			<div class="pop-conts" style="padding-left: 20px; font-size:15px">
				<!-- content // -->
				<p class="ctxt mb20">
					<h1 style="text-align:center">온라인 자격증강좌 서비스 중단 알림</h1>
					기 공지해드린 바와 같이「영등포구 온라인 자격증강좌 서비스」가<br />
					2018년 12월 10일부터 신규 수강신청이 중단되었으며, 수강하신 강좌는 1년 간 복습이 가능합니다.<br />
					그동안 온라인 자격증강좌 서비스를 이용해주셔서 감사드리며, 서비스를 종료하게 된 점 양해 부탁드립니다.<br />
					더 다양한 온라인 교육은 <a href="http://sll.seoul.go.kr/" target="_blank" title="새창">서울시 평생학습포털</a>, <a href="http://www.estudy.or.kr/estudy2.0/kor/index.asp" target="_blank" title="새창">배움나라에서</a> 만나보실 수 있습니다<br /><br />
				</p>
				<!-- // content -->
			</div>
		</div>
	</div>
</div>
</body>
</html>
</c:otherwise>
</c:choose>