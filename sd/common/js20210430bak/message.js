const   NO_DATA                     = "데이타가 존재하지 않습니다.";
const   NO_DATA_ADD_FIELD           = "{0} 데이타가 존재하지 않습니다.";
const   ERR_MSG_NO_OBJECT           = "객체가 존재하지 않습니다.";

const   ERR_MSG_ESSNTL_VALUE        = "{0} 은(는) 필수 입력 항목입니다.";
const   ERR_MSG_NOT_DATE_VALID      = "{0} 은(는) 유효한 날짜형식이 아닙니다.";

const   ERR_MSG_ONLY_NUMBER         = "숫자만 입력을 할 수가 있습니다.";
const   ERR_MSG_ONLY_NUMBER_ITEM    = "{0} 은(는) 숫자만 입력을 할 수가 있습니다.";
const   ERR_MSG_ENGL_UPPER_CASE     = "{0} 은(는) 영어 대문자가 아닙니다.";
const   ERR_MSG_FROM_TO_DIFF        = "{0} 은(는) {1} 보다 클 수가 없습니다.";
const   ERR_MSG_USER_ID             = "{0}~{1}자의 영문 소문자, 숫자만 사용 가능합니다.";
const   ERR_MSG_PASSWORD            = "문자, 숫자, 기호를 조합하여 8자 이상 사용합니다.";

const   ERR_MSG_PRIOR_SEARCH        = "{0} 를(을) 검색 해주세요.";

const   WRN_MSG_NOT_MTCH            = "{0} 가 일치하지 않습니다.";

const   WRN_MSG_PASSWORD_MTCH       = "현재 비밀번호와 변경 비밀번호는 달라야 합니다.";

const   CFM_MSG_DATA_PROCESS        = "선택된 주문건을 [ {0} ]로 변경을 하시겠습니까?";

const   CFM_MSG_WANT_YOU            = "{0} 를(을) 하시겠습니까?";
const   CFM_MSG_DELETE              = "삭제를 하시겠습니까?";
const   CFM_MSG_RESTORE             = "복원을 하시겠습니까?";

// 이하 함수부분
/**
 * 객체에 TEXT 설정
**/
function setObjectTextByOne(object, textValue) {
    // 객체 GET
    var vObject = $('.'+object);

    if(null == vObject) return false;

    // 단일 객체가 아닐경우 값 설정 불가
    if("object" != typeof vObject || vObject.length > 1) return false;

    // 텍스트 설정
    if(!vObject.length) {
        vObject.innerText   = textValue;
    } else {
        vObject[0].innerText   = textValue;
    }

    return true;
}