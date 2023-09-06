<%@ page language="java" pageEncoding="UTF-8"%><%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<div class="addons">
	<jsp:include page="/common/deco/snsshare_common.jsp"/>
    <ul class="addons_list clearfix">
        <li class="addons_item share">
            <button type="button" class="addons_button"><span>공유하기</span></button>
            <div class="share_panel">
                <h3 class="skip">공유하기</h3>
                <ul class="share_list clearfix">
    <!-- 283px
    <li class="share_item kakaotalk"><a href="#n" rel="noopener noreferrer" target="_blank" title="새창" class="share_anchor">카카오톡</a></li>
    <li class="share_item kakaostory"><a href="#n" rel="noopener noreferrer" target="_blank" title="새창" class="share_anchor">카카오스토리</a></li>
    <li class="share_item naverbend"><a href="#n" rel="noopener noreferrer" target="_blank" title="새창" class="share_anchor">네이버밴드</a></li>
    <li class="share_item blog"><a href="#n" rel="noopener noreferrer" target="_blank" title="새창" class="share_anchor">블로그</a></li>
    <li class="share_item google"><a href="#n" rel="noopener noreferrer" target="_blank" title="새창" class="share_anchor">구글+</a></li>
    -->    				
    				<li class="share_item kakaotalk"><a href="#n" onclick="subShareToKakaoTalk();return false;" rel="noopener noreferrer" target="_blank" title="새창" class="share_anchor">카카오톡</a></li>
                    <li class="share_item blog"><a href="#n" onclick="return goblog();" rel="noopener noreferrer" title="새창" class="share_anchor">블로그</a></li>
                    <li class="share_item facebook"><a href="#n" onclick="return goFacebook();" rel="noopener noreferrer" target="_blank" title="새창" class="share_anchor">페이스북</a></li>
                    <li class="share_item twitter"><a href="#n" onclick="return goTweet();" rel="noopener noreferrer" target="_blank" title="새창" class="share_anchor">트위터</a></li>
                    <li class="share_item share"><button type="button" class="share_anchor">링크 복사하기</button></li>
                </ul>
                <button type="button" class="share_close">닫기</button>
            </div>
        </li>
        <li class="addons_item print"><button type="button" onclick="window.print();" class="addons_button"><span>인쇄하기</span></button></li>
    </ul>
</div>
