<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="tsu" uri="http://www.hanshinit.co.kr/jstl/tagStringUtil"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<input type="hidden" id="multi_fieldNm" name="fieldNm" value="aditfield1"/>
<select id="multi_fieldVal" name="fieldVal">
	<option value="대기">대기</option>
	<option value="처리완료">처리완료</option>
</select>
<input type="submit" value="선택변경" class="bbs_btn small update" onclick="return changeAction('UPDATE_FIELD');"/>