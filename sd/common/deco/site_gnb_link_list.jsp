<%@ page language="java" pageEncoding="UTF-8"%><%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
					<ul class="link_list clearfix">
						<jsp:include page="/common/deco/site_gnb_lnb_link_list_li.jsp"/>
                        <li class="link_item n3 language">
                            <button type="button" class="language_button"><span>LANGUAGE</span></button>
                            <div class="language_panel">
                                <jsp:include page="/common/deco/site_gnb_lnb_language_list.jsp"/>
                            </div>
                        </li>
                    </ul>