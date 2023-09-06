<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="java.util.Calendar" %>
<%@ page import="java.text.DateFormat" %>
<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="java.text.ParseException" %>
<%!

	// 값 존재 유무
	public boolean isNullEmpty(String str) {

		if( str == null ) return true;

		if( str.trim().length() == 0 ) return true;

		return false;

	}

	// 날짜 유효성 체크
	public boolean isYMD(String sYear, String sMonth, String sDay, String eYear, String eMonth, String eDay) {

		if( !isNumeric(sYear) ) return false;
		if( !isNumeric(sMonth) ) return false;
		if( !isNumeric(sDay) ) return false;

		String sDate = sYear + zeroFill(sMonth, 2, "0") + zeroFill(sDay, 2, "0");
		if( !isDate(sDate) ) return false;

		if( !isNumeric(eYear) ) return false;
		if( !isNumeric(eMonth) ) return false;
		if( !isNumeric(eDay) ) return false;

		String eDate = eYear + zeroFill(eMonth, 2, "0") + zeroFill(eDay, 2, "0");
		if( !isDate(eDate) ) return false;

		return true;

	}

	// 날짜인지
	public boolean isDate(String date) {

		if( isNullEmpty(date) ) return false;

		String format = null;

		try {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
			format = sdf.format(sdf.parse(date));
		} catch( ParseException e ) {
			kr.co.hanshinit.NeoCMS.cmm.util.LoggingUtil.log(e);
		}

		return date.equals(format);

	}

	// 숫자인지
	public boolean isNumeric(String str) {

		if( isNullEmpty(str) ) return false;

		str = str.trim();

		int n = str.length();

		for(int i=0; i < n; i++) {

			char c = str.charAt(i);

			if(!('0' <=  c && c <= '9')) return false;

		}

		return true;

	}

	// 두 날짜의 일 수
	public long getRangeDay(String sDate, String eDate) throws ParseException {

		SimpleDateFormat dfs = new SimpleDateFormat ("yyyyMMdd");

		long rangeDay = (dfs.parse(eDate).getTime() - dfs.parse(sDate).getTime()) / 86400 / 1000;

		rangeDay = rangeDay - 30;

		return ( rangeDay < 0 ) ? 0 : rangeDay;

	}

	// ZeroFill
	public String zeroFill(String str, int len, String fill) {

		int strLen = str.length();

		StringBuffer tmp = new StringBuffer();

		for( int LoopI=0; LoopI<len-strLen; LoopI++ ) {
			tmp.append(fill);
		}

		tmp.append(str);

		return tmp.toString();

	}

	// 검사, 점검
	// parameter 일수, 최소일수, 최소 금액, 초과 일수, 초과시 금액, 최고 금액
	public long penalty(long rangeDay, int minDay, int minWon, int overDay, int overWon, int maxWon) {

		if( rangeDay <= 0 ) return 0;

		// 일수가 최소 일수 보가 크면
		if( rangeDay > minDay ) {

			long overRangeDay = ( ( rangeDay - minDay ) / overDay ) + ( ( ( rangeDay - minDay ) % overDay > 0 ) ? 1 : 0 );

			long won = minWon + ( overRangeDay * overWon );

			return ( won > maxWon ) ? maxWon : won;

		// 일수가 최소 일수면 최소 금액
		} else {

			return minWon;

		}

	}

%>
<%

	/*
	 * 자동차정기점사 : inspection
	 * 자동차정기점검 : check
	 * 자동차정기점검(5톤이상대형) : checkBig
	 * 이륜차 : motercycle
	 * 비상업용 : noncommercial
	 * 상업용 : commercial
	 */

	String key = request.getParameter("key");
	String type = request.getParameter("type");
	String mode = request.getParameter("mode");

	// type(구분) 이 있다면
	if( !isNullEmpty(type) ) {

		boolean isValidate = false;
		long resultWon = 0;
		long resultWon1 = 0;
		long resultWon2 = 0;
		long resultWon3 = 0;

		String sYear = request.getParameter("syear");
		String sMonth = request.getParameter("smonth");
		String sDay = request.getParameter("sday");
		String eYear = request.getParameter("eyear");
		String eMonth = request.getParameter("emonth");
		String eDay = request.getParameter("eday");

		int nYear = 0;
		int nMonth = 0;
		int nDay = 0;

		// 오늘일자
		Calendar cal = Calendar.getInstance();
		DateFormat df = null;
		df = new SimpleDateFormat("yyyy");
		nYear = Integer.parseInt(df.format(cal.getTime()));
		df = new SimpleDateFormat("M");
		nMonth = Integer.parseInt(df.format(cal.getTime()));
		df = new SimpleDateFormat(
			"d");
		nDay = Integer.parseInt(df.format(cal.getTime()));

		String osYear = String.valueOf(nYear);
		String osMonth = String.valueOf(nMonth);
		String osDay = String.valueOf(nDay);
		String oeYear = String.valueOf(nYear);
		String oeMonth = String.valueOf(nMonth);
		String oeDay = String.valueOf(nDay);

		String sDate = "";
		String eDate = "";
		long rangeDay = 0;

		if( "do".equals(mode) ) {

			// select 선택
			osYear = sYear;
			osMonth = sMonth;
			osDay = sDay;
			oeYear = eYear;
			oeMonth = eMonth;
			oeDay = eDay;

			// 입력받은 날짜 검사
			if( !isYMD(sYear, sMonth, sDay, eYear, eMonth, eDay) ) {
				isValidate = false;
			} else {
				isValidate = true;
				sDate = sYear + zeroFill(sMonth, 2, "0") + zeroFill(sDay, 2, "0");
				eDate = eYear + zeroFill(eMonth, 2, "0") + zeroFill(eDay, 2, "0");
				rangeDay = getRangeDay(sDate, eDate);
			}

		}

		// 자동차정기검사
		if( "inspection".equals(type) ) {

			if( isValidate ) {
				resultWon = penalty(rangeDay, 30, 20000, 3, 10000, 300000);
			}

			%><%@ include file="/common/penalty/inspection.jsp" %><%

		// 자동차정기점검
		} else if( "check".equals(type) ) {

			if( isValidate ) {
				resultWon = penalty(rangeDay, 30, 20000, 3, 10000, 300000);
			}

			%><%@ include file="/common/penalty/check.jsp" %><%

		// 자동차정기점검(5톤이상대형)
		} else if( "checkBig".equals(type) ) {

			if( isValidate ) {
				resultWon = penalty(rangeDay, 30, 20000, 3, 10000, 300000);
			}

			%><%@ include file="/common/penalty/checkBig.jsp" %><%

		// 이륜차
		} else if( "motercycle".equals(type) ) {

			if( isValidate ) {
				resultWon1 = penalty(rangeDay, 10, 6000, 1, 1200, 200000);
				resultWon2 = penalty(rangeDay, 10, 3000, 1, 600, 100000);
			}

			%><%@ include file="/common/penalty/motercycle.jsp" %><%

		// 비상업용
		} else if( "noncommercial".equals(type) ) {

			if( isValidate ) {
				resultWon1 = penalty(rangeDay, 10, 10000, 1, 4000, 600000);
				resultWon2 = penalty(rangeDay, 10, 5000, 1, 2000, 300000);
			}

			%><%@ include file="/common/penalty/noncommercial.jsp" %><%

		// 상업용
		} else if( "commercial".equals(type) ) {

			if( isValidate ) {
				resultWon1 = penalty(rangeDay, 10, 30000, 1, 8000, 1000000);
				resultWon2 = penalty(rangeDay, 10, 30000, 1, 8000, 1000000);
				resultWon3 = penalty(rangeDay, 10, 5000, 1, 2000, 300000);
			}

			%><%@ include file="/common/penalty/commercial.jsp" %><%

		}

	}

%>