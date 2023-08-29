$(function(){
    /*액티브 박스-공통*/
    var $activeBtn = $('.active_btn').on('click', function() {
        var $this = $(this);

        $this.attr('title', ($this.hasClass('on')) ? '하위내용 축소' : '하위내용 확장').toggleClass('on').parents('.active_box').toggleClass('active').siblings('.active_box').removeClass('active').find('.active_btn').attr('title', '하위내용 확장').removeClass('on');
    });

    $(document).on('click', function(event) {
        var $activeBox = $activeBtn.parents('.active_box');

        if(!$activeBox.has(event.target).length) {
            $activeBox.removeClass('active').find('.active_btn').attr('title', '하위내용 확장').removeClass('on');
        }
    });
});

// 탭메뉴 공통적으로 사용
function tabOn(tab,num,img) {
	var $tab,$tab_btn;
	var tabid=tab, n=num-1, btn_img=img;

	$tab = $(tabid+'> ul > li');
	$tab_btn = $(tabid+'> ul > li > a');

	$tab_btn.siblings().hide();
	$tab.eq(n).addClass('active');
	$tab.eq(n).children('a').siblings().show();

	if(btn_img =='img'){
		var btn = $tab.eq(n).children('a').find("img");
		btn.attr("src",btn.attr("src").replace("_off","_on"));
	}

	$tab_btn.on("click",function(event){
		var realTarget = $(this).attr('href');

		if(realTarget != "#"){
			return
		}
		if(btn_img =='img'){
			for(var i=0;i<$tab.size();i++){
				var btn = $tab.eq(i).children('a').find("img");
				btn.attr("src",btn.attr("src").replace("_on","_off"));
			}
			var active = $(this).parent().attr('class');
			if(active != 'active'){
				var btn_img_off = $(this).find('img')[0];
				btn_img_off.src =  btn_img_off.src.replace('_off','_on');
			}
		}
		$tab_btn.siblings().hide();
		$tab_btn.parent().removeClass('active');

		$(this).siblings().show();
		$(this).parent().addClass('active');

		event.preventDefault();
	});
}

function tabOrg(tabid,a,img) {
	var $tab, $tab_btn,$obj,$obj_view;
	var tabid = tabid, num = a, btn_img = img;

	$tab = $(tabid+' .tab_item  > li');
	$tab_btn = $(tabid+' .tab_item > li > a');
	$obj = $(tabid+' .tab_obj');
	$obj_view = $(tabid+' .tab_obj.n'+num);

	$tab.eq(num-1).addClass('active');
	$obj_view.show();

	if(btn_img =='img'){
		var btn = $tab.eq(num-1).children('a').find("img");
		btn.attr("src",btn.attr("src").replace("_off","_on"));
	}

	$tab.bind("click",function(event){
		if(btn_img =='img'){
			for(var i=0;i<$tab.size();i++){
				var btn = $tab.eq(i).children('a').find("img");
				btn.attr("src",btn.attr("src").replace("_on","_off"));
			}
			var active = $(this).parent().attr('class');
			if(active != 'active'){
				var btn_img_off = $(this).find('img')[0];
				btn_img_off.src =  btn_img_off.src.replace('_off','_on');
			}
		}

		var this_eq = $tab.index( $(this) );
		$tab.removeClass('active');
		$tab.eq(this_eq).addClass('active');

		$obj.hide();
		$(tabid+' .tab_obj.n'+(this_eq+1)).show();

		event.preventDefault ();
	});
}

$(document).ready(function(){
	//이미지 롤오버
	 $('.overimg').mouseover(function (){
		var file = $(this).attr('src').split('/');
		var filename = file[file.length-1];
		var path = '';
		for(i=0 ; i < file.length-1 ; i++){
		 path = ( i == 0 )?path + file[i]:path + '/' + file[i];
		}
		$(this).attr('src',path+'/'+filename.replace('_off.','_on.'));

	 }).mouseout(function(){
		var file = $(this).attr('src').split('/');
		var filename = file[file.length-1];
		var path = '';
		for(i=0 ; i < file.length-1 ; i++){
		 path = ( i == 0 )?path + file[i]:path + '/' + file[i];
		}
		$(this).attr('src',path+'/'+filename.replace('_on.','_off.'));
	 });
});



/** 프린트 버튼 클릭 시 이벤트 */
function contentsprint(){
	var $contents = $('#contents'),
		ContentsClass = $contents.attr('class');
	let $head = $('head').clone();
	let $contentsClone = $('#contents').clone();    // 프린트 할 특정 영역 복사
	
	let headHtml = $head[0].innerHTML
	let innerHtml = $contentsClone[0].innerHTML
	let popupWindow = window.open("", "_blank", "width=910,height=800")
	popupWindow.document.write('<!DOCTYPE html>'+
	  '<html>'+
		'<head>'+headHtml+'</head>'+
		'<body><div id="contents" class="'+ContentsClass+'">'+innerHtml+'</div></body>'+
	  '</html>')
   
	popupWindow.document.close();
	popupWindow.focus();


	setTimeout(function(){
		popupWindow.print();         // 팝업의 프린트 도구 시작
		popupWindow.close();       // 프린트 도구 닫혔을 경우 팝업 닫기
	}, 200);
}
















/**
 * 테이블 ROW 데이타 셋
 * @returns
 */
function gfn_setNoData() {
    if(!gfn_isNull($("#noData"))) $("#noData").text(NO_DATA);
}
/**
 * Null값 체크
 */
function gfn_isNull(value) {

    if("OBJECT"     == (typeof value).toUpperCase()) return false;
    if("BOOLEAN"    == (typeof value).toUpperCase()) return false;
    if(value == "") return true;
    if(value == null) return true;
    if(value == undefined) return true;

    //if((typeof value).toUpperCase() == "OBJECT") return false;

    return false;
}

/**
 * 해당 객체로 포커스 이동
 */
function gfn_setFocus(idValue) {
    // 아이디값이 존재하는지 체크
    if(this.gfn_isNull(idValue)) return;

    setTimeout(function() {
        // 해당 위치로 이동
        $("#" + idValue).focus();
        $("#" + idValue).select();
        $("#" + idValue).prop({
                "selectionStart":   0
            ,   "selectionEnd"  :   $("#" + idValue).val().length
        });
    });
}

/**
 * 해당 객체로 포커스 이동
 */
function gfn_isEngUpperCase(object, fieldNm, messageAt) {
    var objectId    = object.id;
    var regexp      = /[^A-Z]/;
    var value       = object.value;

    // 영문 대문자가 아닐 경우
    if(regexp.test(value)) {
        var message = String.format(ERR_MSG_ENGL_UPPER_CASE, fieldNm);
        if(messageAt) {
            alert(message);
        }

        gfn_setFocus(objectId);
        return false;
    }
    return true;
}

/**
 * StringFormat {0}, {1}... 대상문자열 치환
 */
String.format = function() {
    var value = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
        var regex = new RegExp("\\{" + (i - 1) + "\\}", "gm");
        value = value.replace(regex, arguments[i]);
    }

    return value;
}

/**
 * 문자열 특정값 치환
 */
String.prototype.replaceAll = function() {
  var args            = arguments;
  var pattern         = "";
  var changePattern   = "";
  var thisValue       = "";
  var returnValue     = "";
  var thisValues;

  // 값 설정
  thisValue       = this;         // 현재값
  pattern         = arguments[0]; // 값의 패턴
  changePattern   = arguments[1]; // 변경 패턴

  // 파라미터 값이 없을 경우 공백반환
  if(gfn_isNull(arguments)) return thisValue;
  if(arguments.length != 2) return thisValue;

  // 파라미터값 Null 체크
  if(gfn_isNull(pattern))         return thisValue;

  // 패턴을 이용하여 배열로 정리
  thisValues = thisValue.split(pattern);

  // 배열 길이만큼 변경될 패턴을 삽입
  for(var i = 0; i < thisValues.length; i++) {
      if(i == thisValues.length) {
          returnValue = returnValue + thisValues[i];
      } else {
          returnValue = returnValue + thisValues[i] + changePattern;
      }
  }

  return returnValue;
};

/**
 * 숫자 Mask 변경
 * 사용법 gfn_maskForNumber(12345, ",")
 */
function gfn_maskForNumber(value, indictChrctr) {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return value.toString().replace(regexp, indictChrctr);
}

/**
 * 전화번호 Format
 * 사용법 gfn_formatPhone(01011111111);
 */
function gfn_formatPhone(number) {
    return number.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/, "$1-$2-$3");
}

/**
 * 사업자등록 번호 Format
 * @param number
 * @returns
 */
function gfn_formatBizNo(number) {
    var formatNum = '';

    // 빈값인지 체크
    if(gfn_isNull(number))  return number;

    // 자리수 체크
    if(number.length != 10) return number;

    // 변경
    return number.replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3');
}

/* 문자열 관련 함수 시작 */
//=================================================
//문자열을 앞쪽에서 입력값으로 자릿수 만큼 채움
//=================================================
function gfn_lPad(value, position, chrSt) {
  value = value + '';
  return value.length >= position ? value : new Array(position - value.length + 1).join(chrSt + '') + value;
}

/**
 * 객체 반환
**/
function gf_getObject(object) {
    // 값이 존재하지 않을 경우 null을 반환
    if(!object) return null;

    // ID로 찾기
    if(
            "object"    == typeof document.getElementById(object)       &&
            null        != document.getElementById(object)
            ) return document.getElementById(object);

    // NAME으로 찾기
    if(
            "object"    == typeof document.getElementsByName(object)    &&
            null        != document.getElementsByName(object)           &&
            document.getElementsByName(object).length > 0
            ) return document.getElementsByName(object);

    // Class로 찾기
    if(
            "object"    == typeof document.getElementsByClassName(object)   &&
            null        != document.getElementsByClassName(object)          &&
            document.getElementsByClassName(object).length > 0
            ) return document.getElementsByClassName(object);

    return null;
}
/**
 * Json 요청 후 데이터에 맞게 만든 후 return한다
 * 예: url :??.do
 *   : tempalte : "<option value='{0}'>{1}</option>"
 *   : varNameArr : ['spceCode','spceNm']
 *   : failureFunc : 사용자정의
 *   : return :
 *   <option value='000001'>시설1</option><option value='000002'>시설2</option><option value='000003'>시설3</option>
 *
 * @returns
 */
function jsonParseData(url,template,varNameArr,failureFunc) {
    $.ajaxSetup({
        async: false
    });
    var result = '';
    $.getJSON(url,function(data) {
        // 데이터수가 2개이상일경우는 List형태이므로 Loop
        if(Array.isArray(data)) {
            $.each(data,function(i,item) {
                var value = template;
                for (var i = 0; i < varNameArr.length; i++) {
                    var regex = new RegExp("\\{" + (i) + "\\}", "gm");
                    value = value.replace(regex, item[varNameArr[i]]);
                }
                result += value;
            });
        }else {
            var value = template;
            for (var i = 0; i < varNameArr.length; i++) {
                var regex = new RegExp("\\{" + (i) + "\\}", "gm");
                value = value.replace(regex, data[varNameArr[i]]);
            }
            result += value;
        }
    }).fail(function() {
        if(typeof(failureFunc) !== "undefined"){
            failureFunc();
        }
        return '';
    });

    return result;
}
//=================================================
//날짜형식 체크
//=================================================
function gfn_validateDate(value, format) {
    var pattern         = "";
    var setTimeValue    = "";

    //format 값 체크
    if(gfn_isNull(format)) return false;

    //format에 따른 정규식
    if("yyyy-MM-dd" == format) {
        pattern = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;
    } else if("yyyyMMdd" == format) {
        pattern = /[0-9]{4}[0-9]{2}[0-9]{2}/;
    } else if("HH" == format || "mm" == format || "ss" == format ) {
        pattern = /[0-9]{2}/;
    }

    //패턴 체크
    if(!pattern.test(value)) return false;

    //실제 Date로 변경하여 년,월,일,시,분,초를 추출하여 값이 맞는지 비교
    var year;
    var month;
    var day;
    var hour;
    var min;
    var ses;
    var newDate;

    try {
        var nowDate = new Date();
        year    = gfn_lPad((nowDate.getFullYear())  + "", 4, "0");  // 년도
        month   = gfn_lPad((nowDate.getMonth() + 1) + "", 2, "0");  // 월
        day     = gfn_lPad((nowDate.getDate())      + "", 2, "0");  // 일
        hour    = gfn_lPad((nowDate.getHours())     + "", 2, "0");  // 시
        min     = gfn_lPad((nowDate.getMinutes())   + "", 2, "0");  // 분
        ses     = gfn_lPad((nowDate.getSeconds())   + "", 2, "0");  // 초

        //기본값 설정
        setValue = year + "-" + month + "-" + day;

        //format에 따른 정규식
        if("yyyy-MM-dd" == format) {
            var splitValue = value.split("-");
            setValue = value;
        } else if("yyyyMMdd" == format) {
            year    = value.substring(0, 4);
            month   = value.substring(4, 6);
            day     = value.substring(6, 8);
            setValue = year + "-" + month + "-" + day;
        } else if("HH" == format) {
            setValue = setValue + "T" + value + ":" + "00" + ":" + "00" + "Z";
        } else if("mm" == format) {
            setValue = setValue + "T" + hour + ":" + value + ":" + "00" + "Z";
        } else if("ss" == format ) {
            setValue = setValue + "T" + hour + ":" + min + ":" + value + "Z";
        }

        //날짜로 변환
        newDate = new Date(setValue);

        //데이터 추출
        /*
        year    = gfn_lPad((newDate.getFullYear())  + "", 4, "0");  // 년도
        month   = gfn_lPad((newDate.getMonth() + 1) + "", 2, "0");  // 월
        day     = gfn_lPad((newDate.getDate())      + "", 2, "0");  // 일
        hour    = gfn_lPad((newDate.getHours())     + "", 2, "0");  // 시
        min     = gfn_lPad((newDate.getMinutes())   + "", 2, "0");  // 분
        ses     = gfn_lPad((newDate.getSeconds())   + "", 2, "0");  // 초
        */
    } catch(e) {
        return false;
    }

    //유효한 날짜가 아닐경우 값 반환
    if("Invalid Date" == newDate) return false;

    return true;
}


/**
 * checkbox가 클릭시 전체선택, 해제시 전체 해제
 * @param name
 * @returns
 */
function gfn_allcheck(clazz,checkbox) {
    if(gfn_isChecked(checkbox)) {
        $(clazz).prop('checked','checked');
    }else {
        $(clazz).prop('checked','');
    }
}
/**
 * 체크박스의 체크를 해제한다
 * @param checkbox
 * @returns
 */
function gfn_uncheck(checkbox) {
    $(checkbox).prop('checked','');
}
/**
 * 체크박스를 체크한다.
 * @param checkbox
 * @returns
 */
function gfn_check(checkbox) {
    $(checkbox).prop('checked','checked');
}
/**
 * 체크박스를 토글한다
 * @param checkbox
 * @returns
 */
function gfn_toggleCheck(checkbox) {
    if(gfn_isChecked(checkbox)) {
        gfn_uncheck(checkbox);
    }else {
        gfn_check(checkbox);
    }
}
/**
 * 체크가 되어있는지 확인한다
 * @param checkbox
 * @returns
 */
function gfn_isChecked(checkbox) {
    if($(checkbox).is(":checked")) {
        return true;
    }
    return false;
}
/**
 * 1. subCheckbox에 있는것이 전부다 클릭해있을경우 checkbox를 체크한다
 * 2. subCheckbox에 있는것이 하나라도 해제가 되있을경우 체크를 해제한다.
 * @param checkbox
 * @param subCheckbox
 * @returns
 */
function gfn_toggleAllCheckbox(checkbox,subCheckbox) {
    var isAllChecked = true;
    $(subCheckbox).each(function() {
        if(!gfn_isChecked(this)) {
            isAllChecked = false;
            return;
        }
    });
    if(isAllChecked) {
        gfn_check($(checkbox));
    }else {
        gfn_uncheck($(checkbox));
    }
}

/* 체크박스 관련 함수 시작 */
//=================================================
//체크박스 전체 선택
//=================================================
function gfn_allCheckBox(objName, eventAt) {
    var event = false;

    // 정확한 boolean일 경우 처리
    if(!gfn_isNull(eventAt) && "boolean" == typeof(eventAt)) event = eventAt;

    $("input[name=" + objName + "]:checkbox").each(function (){
        this.checked    = true;
        if(event) {
            if(typeof this.onchange == "function") this.onchange();
        }
    });
}

//=================================================
//체크박스 전체 선택 해제
//=================================================
function gfn_allUnCheckBox(objName, eventAt) {
    var event = false;

    // 정확한 boolean일 경우 처리
    if(!gfn_isNull(eventAt) && "boolean" == typeof(eventAt)) event = eventAt;

    $("input[name=" + objName + "]:checkbox").each(function (){
        this.checked    = false;
        if(event) {
            if(typeof this.onchange == "function") this.onchange();
        }
    });
}

//=================================================
//체크박스 전체 선택된 개수
//=================================================
function gfn_allCheckBoxCount(objName) {
  return $("input[name=" + objName + "]:checkbox:checked").length;
}

//=================================================
//체크박스 선택된 값 배열로 반환
//=================================================
function gfn_getCheckBoxCheckedDatas(objName, headDelAt) {
  // 변수선언 및 값 설정
  var returnData    = new Array();
  var head          = true;

  // objName 존재 체크
  if(gfn_isNull(objName)) {
      return returnData;
  }

  // objName 존재 체크
  if(gfn_isNull($("input[name=" + objName + "]").attr("name"))) {
      return returnData;
  }

  // objName에 해당하는 객체 개수 체크
  if(gfn_allCheckBoxCount(objName) < 1) {
      return returnData;
  }

  // 정확한 boolean일 경우 처리
  if(!gfn_isNull(headDelAt) && "boolean" == typeof(headDelAt)) head = headDelAt;

  var indexCnt = 0;
  $("input[name=" + objName + "]").each(function(index) {
      if($(this).is(":checked")) {
          var arryIndex = index;

          // 헤더갑 삭제여부가 True
          if(head) {
              arryIndex = index - 1;
          }

          if(arryIndex > -1) {
              returnData[indexCnt] = $(this).val();
              indexCnt++;
          }
      }
  });

  return returnData;
}
/* 체크박스 관련 함수 종료 */

/**
 * undifined를 replace 한다
 * @param v1 확인할 데이터
 * @param v2 undifined일시 리턴할 데이터
 * @returns
 */
function replaceUndefined(v1,v2){
    if(typeof(v1) === "undefined"){
        return v2; // return 0 as replace, and end function execution
    }
    return v1; // the above state was false, functions continues and return original value
};

/**
 * 왼쪽에 문자열 패딩을 추가한다
 */
String.prototype.lpad = function(padLength, padString){
    var s = this;
    while(s.length < padLength)
        s = padString + s;
    return s;
}
 /**
  * 오른쪽에 문자열 패딩을 추가한다.
  */
String.prototype.rpad = function(padLength, padString){
    var s = this;
    while(s.length < padLength)
        s += padString;
    return s;
}
/**
 * 왼쪽에 패딩을 추가한다.
 * @param s
 * @param padLength
 * @param padString
 * @returns
 */
function lpad(s, padLength, padString){

    while(s.length < padLength)
        s = padString + s;
    return s;
}
/**
 * 오른쪽에 패딩을 추가한다.
 * @param s
 * @param padLength
 * @param padString
 * @returns
 */
function rpad(s, padLength, padString){
    while(s.length < padLength)
        s += padString;
    return s;
}

//=================================================
//Jquery Ajax Json 전송
//=================================================
function gfn_jqueryAjaxJsonSend(url, jsonData, method, async, errCallBack, sucessCallBack) {
 var objAjax = $.ajax({
     type        : method,
     url         : url,
     data        : jsonData,
     //dataType    : "json",
     //contentType : "text/html; charset=utf-8",
     async       : async,
     error       : errCallBack,
     success     : sucessCallBack
 });

 return objAjax;
}
/**
 * js import
loadScript("/common/js/message.js");
function loadScript(url, callback) {
    var script = document.createElement('script');
    script.src = url;
    script.onload = callback;
    document.getElementsByTagName('body')[0].appendChild(script);
}
 */

/**
 * 날짜포멧
 */
Date.prototype.format = function(f) {
    if (!this.valueOf()) return " ";

    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var d = this;

    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear();
            case "yy": return (d.getFullYear() % 1000).zf(2);
            case "MM": return (d.getMonth() + 1).zf(2);
            case "dd": return d.getDate().zf(2);
            case "E": return weekName[d.getDay()];
            case "HH": return d.getHours().zf(2);
            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
            case "mm": return d.getMinutes().zf(2);
            case "ss": return d.getSeconds().zf(2);
            case "a/p": return d.getHours() < 12 ? "오전" : "오후";
            default: return $1;
        }
    });
};
Date.prototype.addDay = function(day) {
    this.setDate(this.getDate() + Number(day));
};
Date.prototype.diffDay = function(day) {
	var date = new Date(day);
	return this.getTime() - date.getTime();

}

String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
Number.prototype.zf = function(len){return this.toString().zf(len);};

function gfn_validateMobileTelNo(str) {
    var regExp = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
    if ( !regExp.test( str ) ) {
          return false;
    }
    return true;
}

/**
 * 객체 UTIL
 */
var ObjectUtil = new function() {
    // 객체를 생성
    this.create = function(options){
        // 변수및 값 설정
        var element     = "";
        var type        = "";
        var id          = "";
        var name        = "";
        var value       = "";
        var classInfo   = "";
        var textValue   = "";
        var events      = new Array();
        var returnObject;
        var parents;

        // 파라미터 및 부모객체가 없을 경우 반환
        if(gfn_isNull(options))         return null;
        if(gfn_isNull(options.parents)) return null;

        // 부모객체 설정
        parents = options.parents;

        // 각각의 파라미터값 확인
        if(!gfn_isNull(options.element))    element     = options.element;
        if(!gfn_isNull(options.type))       type        = options.type;
        if(!gfn_isNull(options.id))         id          = options.id;
        if(!gfn_isNull(options.name))       name        = options.name;
        if(!gfn_isNull(options.value))      value       = options.value;
        if(!gfn_isNull(options.classInfo))  classInfo   = options.classInfo;
        if(!gfn_isNull(options.textValue))  textValue   = options.textValue;
        if(!gfn_isNull(options.events))     events      = options.events;

        // 테그 객체 생성
        returnObject        = document.createElement(element);
        returnObject.type   = type;
        returnObject.name   = name;
        returnObject.id     = id;
        returnObject.value  = value;
        returnObject.appendChild(document.createTextNode(textValue));
        if(!gfn_isNull(classInfo)) {
            returnObject.setAttribute("class", classInfo);
        }

        // 이벤트 생성
        for(var i = 0; i < events.length; i++) {
            returnObject.setAttribute(events[i].event, events[i].functionText);
        }

        // 부모객체 하위에 생성
        parents.appendChild(returnObject);

        return returnObject;
    };

    // 콤보박스 초기화 설정
    this.setSelectBoxInit = function(options) {
        // 변수및 값 설정
        var element     = "";
        var initMap;

        // 파라미터 및 부모객체가 없을 경우 반환
        if(gfn_isNull(options))         return null;

        // 객체 설정
        element = options.element;

        // 객체 확인
        if(gfn_isNull(element)) return null;

        // 콤보박스 체크
        if("SELECT" != element.tagName.toUpperCase()) return null;

        if(!gfn_isNull(options.initMap))     initMap      = options.initMap;

        // 초기화
        element.options.length = 0;
        for(var key in initMap ) {
            element.options[0] = new Option(initMap[key], key);
        }
    };

    // 콤보박스 값 설정
    this.setSelectBoxOption = function(options) {
        // 변수및 값 설정
        var element     = "";
        var optionCnt   = 0;
        var initMap;
        var dataMap;

        // 파라미터 및 부모객체가 없을 경우 반환
        if(gfn_isNull(options))         return null;

        // 객체 설정
        element = options.element;

        // 객체 확인
        if(gfn_isNull(element)) return null;

        // 콤보박스 체크
        if("SELECT" != element.tagName.toUpperCase()) return null;

        // 초기화
        element.options.length = 0;

        // 값이 존재할 경우 처리
        if(!gfn_isNull(options.initMap)) {
            // 값 설정
            initMap = options.initMap;

            for(var key in initMap ) {
                element.options[0] = new Option(initMap[key], key);
                optionCnt++;
            }
        }

        // 값이 존재할 경우 처리
        if(!gfn_isNull(options.dataMap)) {
            // 값 설정
            dataMap = options.dataMap;

            var index = optionCnt;
            for(var key in dataMap ) {
                element.options[index++] = new Option(dataMap[key], key);
            }
        }
    };
};
/**
 * Form에 있는 데이터를 String형태로 변환한다
 * var arr = ['telno','mbtlnum','smsRecptnAgreAt','zip','bassAdres','detailAdres','resveBgnde','resveEndde'
            	 ,'resvePdSe','useNmpr','rdcxptBnefNo','metpay'];

             alert(makeParams(document.rcrtfrFcltyResveInfoVO,arr));
 * @param frm
 * @param names
 * @returns
 */
function makeParams(frm,names) {
	var rtnValue = '';
	$(names).each(function() {
		var val = $(frm).find("[name='"+this+"']").val();
		if(gfn_isNull(val)) {
			val = ''
		}
		if(rtnValue != '') {
			rtnValue += '&';
		}
		rtnValue += encodeURI(this)+'='+encodeURI(val);
	});
	return rtnValue;
}
function shareSns(sns, url, txt)
{
    var o;
    var _url = encodeURIComponent(url);
    var _txt = encodeURIComponent(txt);
    var _br  = encodeURIComponent('\r\n');

    switch(sns)
    {
        case 'facebook':
            o = {
                method:'popup',
                url:'http://www.facebook.com/sharer/sharer.php?u=' + _url
            };
            break;

        case 'twitter':
            o = {
                method:'popup',
                url:'http://twitter.com/intent/tweet?text=' + _txt + '&url=' + _url
            };
            break;
            break;

        case 'blog':
            o = {
				method:'popup',
				url:'http://blog.naver.com/openapi/share?url='+_url
            };
            break;

        default:
            alert('지원하지 않는 SNS입니다.');
            return false;
    }

    switch(o.method)
    {
        case 'popup':
            window.open(o.url);
            break;

        case 'web2app':
            if(navigator.userAgent.match(/android/i))
            {
                // Android
                setTimeout(function(){ location.href = 'intent://' + o.param + '#Intent;' + o.g_proto + ';end'}, 100);
            }
            else if(navigator.userAgent.match(/(iphone)|(ipod)|(ipad)/i))
            {
                // Apple
                setTimeout(function(){ location.href = o.a_store; }, 200);
                setTimeout(function(){ location.href = o.a_proto + o.param }, 100);
            }
            else
            {
                alert('이 기능은 모바일에서만 사용할 수 있습니다.');
            }
            break;
    }
}