<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>

						<form id="search" action="/search/search.jsp" method="post" class="search_form">
							<fieldset class="search_fieldset">
								<legend>검색</legend>
								<span class="search_input">
                                    <label for="search_query" class="search_label">통합검색</label>
                                    <input type="search" placeholder="코로나19 모두 함께 이겨내요" id="search_query" class="search_query" name="query"/>
                                </span>
                                <input type="submit" class="search_submit" value="검색" />
							</fieldset>
						</form>
						<script>
						$(document).ready(function() {
							$.ajax({
						        url:'/repository/recomendSrchwrd.jsp',
						        dataType:'json',
						        success:function(data) {
						        	if(data && data.keyword) {
							           	$('#search_query').attr('placeholder', data.keyword);
						        	}
						        }
						    });
						});
						</script>
