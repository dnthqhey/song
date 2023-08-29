/* 숫자만 입력 가능
 - 사용법
    html5	oninput="fnNumChk(this);"
    xthml	onkeyup="fnNumChk(this);"
*/
function fnNumChk( obj ) {
    if ( /[^0-9]/gi.test(obj.value) ) {
       alert('숫자만 입력해주세요.');
       obj.value = '';
       obj.focus();
       return false;
    }
}

// winOpen(url, 팝업이름, 가로크기, 세로크기, left위치, top위치)
function winOpen(url, WinName, w,h, l, t){
    opt =  'left='+l+',top='+t+',width='+w+',height='+h;
    opt += ',toolbar=no';
    opt += ',menubar=no';
    opt += ',status=no';
    opt += ',resizable=no';
    opt += ',scrollbars=yes';
    window.open(url, WinName, opt);
}

// 숫자에 3자리마다 콤마 찍기
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// 팝업
function popUpCommonWaste( path , winName , widthSize , heightSize ){
    var winHandle;
    var topPoint = (window.screen.height-heightSize)/2;
    var leftPoint = (window.screen.width-widthSize)/2;

    if(winHandle)winHandle.close();

    winHandle = window.open( path , winName, "width="+ widthSize +", height=" + heightSize + ", status=0, location=0, menubar=0, toolbar=0, scrollbars=yes, help=0, hide=0, center=yes, left=" + leftPoint + ", top=" + topPoint );

    if(winHandle==null){
       alert("사용자 설정에 의해 팝업이 차단되었습니다. \n\n자세한 내용을 보시려면 [도구]-[인터넷옵션]-[개인정보] 화면에서 팝업차단 체크를 해제하여 주십시오.");
    }else{
        winHandle.focus();
    }

    return winHandle;
}

// 카카오 지도 기본 설정
var kakaoMap =
{
    appKey : '27a691f88404261f130a7f86721f0003',    // 지도 앱 키 (현재성동구 홈페이지 앱키임)
    lat : '37.5634411',      // 최초 지도 로딩시 위도 값
    lng : '127.0367743',     // 최초 지도 로딩시 경도 값
    mapName : '성동구청',   // 최초 지도 로딩 위치 이름
    postDefaultName : '서울특별시 성동구' // 우편번호 주소 검색시 기본 검색 값
};

/**
    day : 3, time : 18 인 경우, 결제마감기한은 오늘로부터 3일째 되는 날 18시까지
*/
var setleLimit =
{
    day  : '3',  // 결제마감기한 계산시 사용되는 날짜
    time : '18' // 결제마감기한 계산시 사용되는 시간
};
