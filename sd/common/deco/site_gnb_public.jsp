<%@ page language="java" pageEncoding="UTF-8"%><%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<div class="gnb">
    <div class="wrap clearfix">
        <div class="site">
            <jsp:include page="/common/deco/site_gnb_lnb_site_list.jsp"/>
        </div>
        <div class="link">
			<ul class="link_list clearfix">
				<jsp:include page="/common/deco/site_gnb_lnb_link_list_li.jsp"/>
				<li class="link_item language">
					<button type="button" class="language_button">언어선택</button>
					<div class="language_panel">
						<jsp:include page="/common/deco/site_gnb_lnb_language_list.jsp"/>
					</div>
				</li>
			</ul>
		</div>
    </div>
</div>