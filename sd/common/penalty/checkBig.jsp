<%@ page language="java" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<div id="sub02_1448">

	<div id="sub02_1448_title">
		<h2 class="h0">자동차과태료 미리보기 자동차 검사, 점검, 보험가입 안내를 해드립니다.</h2>
	</div>

	<div id="sub02_1448_cts">

		<form name="penaltyForm" method="get" action="?key=<c:out value="${param.key}"/>">
		<input type="hidden" name="type" value="check"/>
		<input type="hidden" name="mode" value="do"/>

		<p><strong>1.자동차등록증 우측하단의 검사유효기간 <em class="em_blue">만료일자를 입력</em>하세요.</strong></p>

		<div class="sub02_1448_box">

			검사유효기간만료일 : 
			<label for="syear" class="skip">연도선택</label>
			<select name="syear" id="syear">
<% for( int LoopI=nYear-15; LoopI<nYear+6; LoopI++ ) { %>
				<option value="<%= LoopI %>" <%= ( String.valueOf(LoopI).equals(osYear) ) ? "selected=\"selected\"" : "" %>><%= LoopI %></option>
<% } %>
			</select>년
			<label for="smonth" class="skip">월선택</label>
			<select name="smonth" id="smonth">
<% for( int LoopI=1; LoopI<=12; LoopI++ ) { %>
				<option value="<%= LoopI %>" <%= ( String.valueOf(LoopI).equals(osMonth) ) ? "selected=\"selected\"" : "" %>><%= LoopI %></option>
<% } %>
			</select>월
			<label for="sday" class="skip">일선택</label>
			<select name="sday" id="sday">
<% for( int LoopI=1; LoopI<=31; LoopI++ ) { %>
				<option value="<%= LoopI %>" <%= ( String.valueOf(LoopI).equals(osDay) ) ? "selected=\"selected\"" : "" %>><%= LoopI %></option>
<% } %>
			</select>일

		</div>
 
		<span class="dot"></span>
 
		<p><strong>2. 검사 <em class="em_red">시행일자</em> 또는 <em class="em_red">검사 예정일자</em>를 입력하세요.</strong></p>

		<div class="sub02_1448_box">

			검사시행일자 : 
			<label for="eyear" class="skip">연도선택</label>
			<select name="eyear" id="eyear">
<% for( int LoopI=nYear-15; LoopI<nYear+6; LoopI++ ) { %>
				<option value="<%= LoopI %>" <%= ( String.valueOf(LoopI).equals(oeYear) ) ? "selected=\"selected\"" : "" %>><%= LoopI %></option>
<% } %>
			</select>년
			<label for="emonth" class="skip">월선택</label>
			<select name="emonth" id="emonth">
<% for( int LoopI=1; LoopI<=12; LoopI++ ) { %>
				<option value="<%= LoopI %>" <%= ( String.valueOf(LoopI).equals(oeMonth) ) ? "selected=\"selected\"" : "" %>><%= LoopI %></option>
<% } %>
			</select>월
			<label for="eday" class="skip">일선택</label>
			<select name="eday" id="eday">
<% for( int LoopI=1; LoopI<=31; LoopI++ ) { %>
				<option value="<%= LoopI %>" <%= ( String.valueOf(LoopI).equals(oeDay) ) ? "selected=\"selected\"" : "" %>><%= LoopI %></option>
<% } %>
			</select>일

		</div>

		<span class="dot"></span>

		<p><strong>3. 아래 버튼을 클릭하세요.</strong></p>
 
		<div class="sub02_1448_btn">
			<input type="submit" value="계산해보기" />
		</div>

		</form>

		<div class="sub02_1448_box02">
<%
	if( "do".equals(mode) ) {

		if( !isValidate ) {
%><span style="color:RED">입력하신 날짜에 오류가 있습니다.</span><%
		} else {
%>과태료 금액은 <span style="color:BLUE"><%= rangeDay %>일</span> 위반에 <span style="color:RED"><%= resultWon %>원</span> 입니다.<%
		}

	} else {

%>유효기간만료일, 시행일자를 선택하고 "계산해보기"를 클릭해주세요<%

	}

%>
		</div>

	</div>

</div>

<div class="box_3">

	<div class="top_bg"></div>

	<div class="text">

		<h2 class="h0">자동차 정기검사 지연 과태료 부과 기준</h2>

		<ul class="num">
			<li class="n01">검사를 받아야 할 기간만료일부터 30일 이내인 때 : 2만원</li>
			<li class="n02">검사를 받아야 할 기간만료일부터 30일을 초과한 경우에는 매 3일 초과시마다 : 1만원</li>
			<li class="n03">최고 30만원</li>
		</ul>

	</div>

	<div class="bot_bg"></div>

</div>
