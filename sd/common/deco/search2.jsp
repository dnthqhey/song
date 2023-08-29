<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<form method="get" action="/search.do" target="SEARCH_TAB">
	<fieldset>
		<legend>검색 폼</legend>
		<input type="hidden" name="cate" value=""/>
		<input type="search" title="검색어입력" placeholder="검색어를 입력해주세요." name="query" class="keyword" />
		<span class="submit"><label for="search_btn" class="skip"><input id="search_btn" type="submit" value="검색" /></span>
	</fieldset>
</form>