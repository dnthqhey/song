<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<c:set var="req_path" value="${requestScope['javax.servlet.forward.servlet_path']}"/>
<c:choose>
<c:when test="${empty req_path or fn:length(req_path) lt 1}"><c:set var="req_path"><%=request.getRequestURL()%></c:set></c:when>
<c:otherwise><c:set var="req_path"><%=request.getScheme()%>://<%=request.getServerName()%><%=( ("http".equals(request.getScheme()) && request.getServerPort() != 80) || ("https".equals(request.getScheme()) && request.getServerPort() != 443))?":"+request.getServerPort():""%>${req_path}</c:set></c:otherwise>
</c:choose>

<c:choose>
	<c:when test="${menuInfo.menuTy eq 'MNTY03'}">
		<c:choose>
			<c:when test="${!empty bbsNtt}">
				<c:set var="req_url">${req_path}?key=<c:out value="${key}"/>&bbsNo=<c:out value="${bbsNtt.bbsNo}"/>&nttNo=<c:out value="${bbsNtt.nttNo}"/></c:set>
			</c:when>
			<c:otherwise>
				<c:set var="req_url">${req_path}?key=<c:out value="${key}"/>&bbsNo=<c:out value="${bbsNttVO.bbsNo}"/><c:if test="${!empty bbsNttVO.searchKrwd}">&searchCnd=<c:out value="${bbsNttVO.searchCnd}"/>&searchKrwd=<c:out value="${bbsNttVO.searchKrwd}"/></c:if>&pageIndex=<c:out value="${bbsNttVO.pageIndex}"/></c:set>
			</c:otherwise>
		</c:choose>
	</c:when>
	<c:otherwise>
		<c:set var="req_url">${req_path}?<%=request.getQueryString()%></c:set>
	</c:otherwise>
</c:choose>

<form name="snsf" method="get" action="https://www.facebook.com/sharer/sharer.php">
	<input type="hidden" name="u" value=""/>
	<input type="hidden" name="text" value=""/>
	<input type="hidden" name="url" value=""/>
	<input type="hidden" name="title" value=""/>
</form>
<script>
 //<![CDATA[
	function goFacebook() {
		var txt = '${menuInfo.menuNm} - ${siteInfo.siteNm}';
		var arg = '${req_url}';
		console.log(arg);
		window.open("//www.facebook.com/sharer.php?u="+encodeURIComponent(arg)+"&t="+encodeURIComponent(txt), "", "width=486, height=286");
		return false;
	}

	function goTweet() {
		var txt = '${menuInfo.menuNm} - ${siteInfo.siteNm}';
		var arg = '${req_url}';
		window.open("//twitter.com/intent/tweet?url="+encodeURIComponent(arg)+"&text="+encodeURIComponent(txt), "tweetPop", "width=486, height=286,scrollbars=yes");
		return false;
	}

	function goNaverBlog(){
		var txt = '${menuInfo.menuNm} - ${siteInfo.siteNm}';
		var arg = '${req_url}';
		console.log(arg);
		window.open("//share.naver.com/web/shareView?url="+encodeURIComponent(arg)+"&title="+encodeURIComponent(txt), "naverPop", "width=486, height=186,scrollbars=yes");
		return false;
	}

	function goKakao(){
		var txt = '${menuInfo.menuNm} - ${siteInfo.siteNm}';
		var arg = '${req_url}';
		window.open("//story.kakao.com/share?url=?url="+encodeURIComponent(arg), "kakaoPop", "width=605, height=615,scrollbars=yes");
		return false;
	}
	
	var ogtitle =  $(document).find("title").text();
	$("#ogtitle").attr("content",  ogtitle);
	function goblog(){
		var objPopup = window.open("","naverPop","width=486, height=486,scrollbars=yes");

		document.snsf.url.value = window.location.href;
		document.snsf.title.value = '${menuInfo.menuNm} - ${siteInfo.siteNm}';
		document.snsf.action = "https://blog.naver.com/openapi/share";
		document.snsf.target="naverPop";
	    if ( objPopup == null){            
	    	// 팝업이 뜨는지 확인
	        alert('차단된 팝업창을 허용해 주세요');
	    } else{			
			document.snsf.submit();
	    	objPopup.focus();
	    }		
	}	

	$(document).ready(function(){
	    try{
	    	console.log("katalk share test");
		    var ksjs = document.createElement('script');
		    ksjs.src = '//developers.kakao.com/sdk/js/kakao.min.js';
		    ksjs.type = 'text/javascript';
		    $('head').append(ksjs);
	   	}catch(e){
	   	    if(console){console.log('kakao init error');}
	   	}
	});
	function subShareUrlConvert(url){
	    if(url != null && url != ''){
	        if(url.indexOf('BD_board.view.do') > -1){
	            var returnUrl = '';
	            var targetParam = {};
	            var sourceParam = ['bbsCd', 'seq'];
	            for(var i = 0; i < sourceParam.length; i++){
	                var name = sourceParam[i];
			        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
			        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
			        results = regex.exec(url);
			        if(results === null){
			            targetParam[name] = '';
			        }else{
			            targetParam[name] = decodeURIComponent(results[1].replace(/\+/g, ''));
			        }
	            }
	            if(url.indexOf('?') > -1){
	            	returnUrl = url.substring(0, url.indexOf('?'));
	            }else{
	                returnUrl = url;
	            }
	            returnUrl += '?bbsCd=' + targetParam.bbsCd + '&seq=' + targetParam.seq;
	            return returnUrl;
	        }
	    }
	    return url;
	}

	function subShareToKakaoTalk(msg, url) {
		msg = '${menuInfo.menuNm} - ${siteInfo.siteNm}';
		url = window.location.href;
		url = subShareUrlConvert(url);
		try{
			Kakao.init('378d00acdf02cd51817fba85bc31996a');
		}catch(e){
		    if(console){console.log('kakao init error');}
		}
	   	Kakao.Link.sendDefault({
	   		objectType: 'feed',
	   		content: {
	   		    title: msg,
	   		    description: '',
	   		    imageUrl: 'http://www.sd.go.kr/site/main/images/common/svg_logo.svg',
	   		    //imageUrl: 'http://k.kakaocdn.net/dn/bVdj94/btqJxbDsIIR/YHgYsvkgDRXKSs1OktRUA1/kakaolink40_original.png',
	   		    link: {
	   		        mobileWebUrl: url,
	   		        webUrl: url
	   		    }
	   		}
	   	});
	}	
//]]>
</script>