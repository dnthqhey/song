<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>

						<h3 class="skip">콘텐츠 만족도 조사</h3>
						<div class="satisfaction_list clearfix">
							<p class="question">이 페이지에서 제공하는 정보에 대하여 어느 정도 만족하셨습니까?</p>
							<form method="post" name="cntntsEvalHist" id="cntntsEvalHist" action="/sym/sit/cem/addContentsEvalHist.do">
								<fieldset>
									<legend>만족도 조사</legend>
									<input type="hidden" name="menuNo" id="menuNo" value="${menuInfo.menuNo}"/>
									<div class="input_radio">
										<ul class="clearfix">
											<li><input name="cntntsEvlSe" value="VERY_SATSFC" id="value5" type="radio" checked="checked"/><label for="value5">매우만족</label></li>
											<li><input name="cntntsEvlSe" value="SATSFC" id="value4" type="radio" /><label for="value4">만족</label></li>
											<li><input name="cntntsEvlSe" value="NRMLTY" id="value3" type="radio" /><label for="value3">보통</label></li>
											<li><input name="cntntsEvlSe" value="DSCNTT" id="value2" type="radio" /><label for="value2">불만족</label></li>
											<li><input name="cntntsEvlSe" value="VERY_DSCNTT" id="value1" type="radio" /><label for="value1">매우불만족</label></li>
										</ul>
									</div>
									<div class="opinion">
										<input name="cntntsOpinionCn" id="etc" title="의견을 입력해주세요" placeholder="의견을 입력해 주세요" type="text" />
										<span class="opinion_submit"><input type="submit" value="의견등록"></span>
									</div>
								</fieldset>
							</form>
						</div>
