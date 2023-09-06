<%@ page language="java" pageEncoding="UTF-8"%><%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<div class="gnb">
    <div class="wrap clearfix">
        <div class="site">
            <jsp:include page="/common/deco/site_gnb_lnb_site_list.jsp"/>
        </div>
        <div class="sns">
            <h2 class="sns_title">SNS</h2>
            <jsp:include page="/common/deco/site_sns_list.jsp"/>
        </div>
    </div>
</div>