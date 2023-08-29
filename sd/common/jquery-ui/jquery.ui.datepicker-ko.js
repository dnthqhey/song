/* Korean initialisation for the jQuery calendar extension. */
/* Written by DaeKwon Kang (ncrash.dk@gmail.com). */
/*공휴일 설정 관련 추가 */
var holidays = {
  "0101":{type:0, title:"신정", year:""},
  "0301":{type:0, title:"삼일절", year:"2023"},
  "0505":{type:0, title:"어린이날", year:""},
  "0606":{type:0, title:"현충일", year:""},
  "0815":{type:0, title:"광복절", year:""},
  "1003":{type:0, title:"개천절", year:""},
  "1009":{type:0, title:"한글날", year:""},
  "1225":{type:0, title:"크리스마스", year:""},

  "0209":{type:0, title:"설날", year:"2023"},
  "0210":{type:0, title:"설날", year:"2023"},
  "0211":{type:0, title:"설날", year:"2023"},
  "0918":{type:0, title:"추석", year:"2023"},
  "0919":{type:0, title:"추석", year:"2023"},
  "0920":{type:0, title:"추석", year:"2023"},
  "0517":{type:0, title:"석가탄신일", year:"2023"}
};
jQuery(function($){
	$.datepicker.regional['ko'] = {
		closeText: '닫기',
		prevText: '이전달',
		nextText: '다음달',
		currentText: '오늘',
		monthNames: ['1월(JAN)','2월(FEB)','3월(MAR)','4월(APR)','5월(MAY)','6월(JUN)',
		'7월(JUL)','8월(AUG)','9월(SEP)','10월(OCT)','11월(NOV)','12월(DEC)'],
		monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
		dayNames: ['일','월','화','수','목','금','토'],
		dayNamesShort: ['일','월','화','수','목','금','토'],
		dayNamesMin: ['일','월','화','수','목','금','토'],
		weekHeader: 'Wk',
		dateFormat: 'yy-mm-dd',
		firstDay: 0,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.regional['en'] = {
				                closeText: 'Done',
				                prevText: 'Prev',
				                nextText: 'Next',
				                currentText: 'Today',
				                monthNames: ['January','February','March','April','May','June',
				                'July','August','September','October','November','December'],
				                monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
				                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
				                dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
				                dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
				                dayNamesMin: ['Su','Mo','Tu','We','Th','Fr','Sa'],
				                weekHeader: 'Wk',
				                dateFormat: 'yy-mm-dd',
				                firstDay: 1,
				                isRTL: false,
				                showMonthAfterYear: false,
				                yearSuffix: ''};
	
	$.datepicker.setDefaults($.datepicker.regional['ko']);
	
	/*공휴일 설정 관련 추가 */
   $('.datepicker').datepicker({
	  showOn: 'both',
	  buttonImage: '&amp;lt;?=$g4[path]?&amp;gt;/img/calendar.gif',
	  buttonImageOnly: true,
	  buttonText: "달력",
	  changeMonth: true,
	  changeYear: true,
	  showButtonPanel: true,
	  yearRange: 'c-99:c+99',
	  minDate: '+1d',
	  beforeShowDay: function(day) {
	     var result;
	     // 포맷에 대해선 다음 참조(http://docs.jquery.com/UI/Datepicker/formatDate)
	     var holiday = holidays[$.datepicker.formatDate("mmdd",day )];
	     var thisYear = $.datepicker.formatDate("yy", day);
	
	     // exist holiday?
	     if (holiday) {
	    	 if(thisYear == holiday.year || holiday.year == "") {
	    		 result =  [false, "date-holiday", holiday.title];
	    	 }
	     }
	
	     if(!result) {
	    	 switch (day.getDay()) {
	    	 	case 0: // is sunday?
	    	 		result = [false, "date-sunday"];
	    	 		break;
	    	 	case 6: // is saturday?
	    	 		result = [true, "date-saturday"];
	    	 		break;
	    	 	default:
	    	 		result = [true, ""];
	    	 		break;
	    	 }
	    }
	    return result;
	 }
   });
});