<%@ page language="java" pageEncoding="UTF-8"%><%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<c:choose>
<c:when test="${siteInfo.siteId ne 'eng' and siteInfo.siteId ne 'chn'}">
							<ul class="language_list">
                                   <li class="language_item"><a href="/eng/index.do" target="_blank" class="language_anchor">English</a></li>
                                   <li class="language_item"><a href="/chn/index.do" target="_blank" class="language_anchor">中文</a></li>
								   <li class="language_item"><a href="/jpn/index.do" target="_blank" class="language_anchor">日本語</a></li>
							</ul>
</c:when>
<c:otherwise>
                            <ul class="${lang_se}_list clearfix">
                                <li class="${lang_se}_item"><a href="/main/index.do" class="${lang_se}_anchor">KOR</a></li>
                                <li class="${lang_se}_item"><a href="/eng/index.do" class="${lang_se}_anchor">EN</a></li>
                                <li class="${lang_se}_item"><a href="/chn/index.do" class="${lang_se}_anchor">CHN</a></li>
								<li class="${lang_se}_item"><a href="/jpn/index.do" class="${lang_se}_anchor">JPN</a></li>
                            </ul>
</c:otherwise>
</c:choose>