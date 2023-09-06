/*
* 프로그램 등록 관련 스크립트 모음 
*/


/* 주소검색 */
function searchJuso() {
    var pop = window.open("/common/doro/jusoPopup.jsp","pop","width=570,height=420, scrollbars=yes, resizable=yes");
}

/* 주소검색 결과 리턴 */
function jusoCallBack(roadFullAddr, roadAddrPart1, addrDetail, roadAddrPart2, engAddr, jibunAddr, zipNo){
    $('#zipCode').val(zipNo);
    $('#address').val(roadAddrPart1 + ' ' + roadAddrPart2);
    $('#detailAddress').val(addrDetail);
} 


/* 부서팝업 */
function fn_popDeptWindow( url, name, style) {
	window.open(url, '_blank', name, style);
}

/* 등록 유효성 체크  */
function registration_validation(){	

	console.log("sss");

 	//$('#registForm').validate();
 	
 
} 

function checkboxValidation(){
	
	if(!fn_reservDayWeeksCheckState()){
		alert("이용요일을 선택해주세요");
		$("#reservDayWeek1").focus();
		return false;
	}
	
	if(!fn_tagetCheckState()){
		alert("대상을 선택해주세요");
		$("#targets1").focus();
		return false;
	}
	
	return true;
}

function roundValidation(){
	var result = true;
	$('.recruitmentCount').each(function (index) {
		if($(this).val() == ""){
			alert("모집인원은 필수입력입니다.");
			$(this).focus();
			result = false;
			return;
		}
	});
	
	if(!result){
		return false;
	}
	
	result =true;
	$('.recruitmentMinCount').each(function (index) {
		if($(this).val() == ""){
			alert("최소신청인원은 필수입력입니다.");
			$(this).focus();
			result = false;
			return;
		}
	});	
	
	if(!result){
		return false;
	}	
	
	result =true;
	$('.recruitmentMaxCount').each(function (index) {
		if($(this).val() == ""){
			alert("최대신청인원은 필수입력입니다.");
			$(this).focus();
			result = false;
			return;
		}
	});	
	
	if(!result){
		return false;
	}	
	
	result =true;
	$('.waitingCount').each(function (index) {
		if($(this).val() == ""){
			alert("대기인원은 필수입력입니다.");
			$(this).focus();
			result = false;
			return;
		}
	});	
	
	if(!result){
		return false;
	}			
	
	return true;
}

function fn_reservDayWeeksCheckState(){
	var result = false;
	$('input:checkbox[name=reservDayWeeks]').each(function (index) {
		if($(this).is(":checked")==true){
			result = true;
		}
	});
	return result;
}

function fn_tagetCheckState(){
	var result = false;
	$('input:checkbox[name=targets]').each(function (index) {
		if($(this).is(":checked")==true){
			result = true;
		}
	});
	return result;
}

$(document).ready(function(){

	/* 결제방법 노출 미노출 */
	$("input[name='feesYn']").click(function () { 
		if($("input[name='feesYn']:checked").val() == 'PAY'){
			$("#payMethod").show();
		}else{
			$("#payMethod").hide();
		}
	});


	/* 대상전체 선택시 disabled */
	$("input[name='targets']").click(function () { 
		var id = $(this).attr('id');
	
		if(id == 'target0'){
			if($(this).is(":checked")==true){
				$("input[name='targets']").prop("disabled", true);
				$(this).prop("disabled", false);
			}else{
				$("input[name='targets']").prop("disabled", false);
			}
		}
	});





	/* validator 확장 */
	$.validator.setDefaults({
	    onkeyup:false,
	    onclick:false,
	    onfocusout:false,
	    showErrors:function(errorMap, errorList){
	        if(this.numberOfInvalids()) {
	            alert(errorList[0].message);
	        }
	    }
	});


	/* 벨리데이션 체크 내용 */
	$("#registForm").validate({
	    rules: {
	    	operationYear:{required:true},	
	    	agencyNumber:{required:true},
	    	departmentName:{required:true},
	    	programName:{required:true},
	    	categoryName:{required:true},
	    	managerName:{required:true},
	    	tel:{required:true},
	    	listUseAt:{required:true},
			listStartDate:{required:true},
			listStartTime:{required:true},
			listStartMinute:{required:true},
			listEndDate:{required:true}, 
			listEndTime:{required:true}, 
			listEndMinute:{required:true},
			
			cancelDay:{required:true, digits:true}, 
			cancelMinute:{required:true, digits:true},   
			availableOneDay:{required:true, digits:true}, 
			availableMonth:{required:true, digits:true}, 
			
			reservStratDate:{required:true}, 
			reservStratTime:{required:true}, 
			reservStratMinute:{required:true}, 
			reservEndDate:{required:true}, 
			reservEndTime:{required:true}, 
			reservEndMinute:{required:true}, 
			reservDayWeek:{required:true}, 
			
			region:{required:true}, 
			target:{required:true}, 
			location:{required:true}, 
			zipCode:{required:true}, 
			address:{required:true}, 
			detailAddress:{required:true}, 
			methodReception:{required:true}, 
			screeningMethod:{required:true}, 
			fees:{required:true, digits:true}, 
			paymentMethod:{required:true}, 
			operationContent:{required:true}, 
			operationYn:{required:true}
	    	
	    },
	    messages: {
	    	operationYear:{required:"운영연도는 필수 항목입니다."},
	    	agencyNumber:{required:"운영기관명은 필수 항목입니다."},
	    	departmentName:{required:"부서명은 필수 항목입니다."},
	    	programName:{required:"프로그램명은 필수 항목입니다."},
	    	categoryName:{required:"서비스유형은 필수 항목입니다."},
	    	managerName:{required:"담당자명은 필수 항목입니다."},
	    	tel:{required:"연락처는 필수 항목입니다."},
	    	listUseAt:{required:"접수기간은 필수 항목입니다."},
			listStartDate:{required:"접수기간은 필수 항목입니다."},
			listStartTime:{required:"접수기간은 필수 항목입니다."},
			listStartMinute:{required:"접수기간은 필수 항목입니다."},
			listEndDate:{required:"접수기간은 필수 항목입니다."}, 
			listEndTime:{required:"접수기간은 필수 항목입니다."}, 
			listEndMinute:{required:"접수기간은 필수 항목입니다."},
			cancelDay:{required:"취소가능일은 필수 항목입니다."}, 
			cancelMinute:{required:"취소가능일은 필수 항목입니다."},   
			availableOneDay:{required:"1일신청가능 횟수는 필수 항목입니다."}, 
			availableMonth:{required:"월 신청가능횟수는 필수 항목입니다."}, 
			reservStratDate:{required:"예약가능기간은 필수 항목입니다."}, 
			reservStratTime:{required:"예약가능기간은 필수 항목입니다."}, 
			reservStratMinute:{required:"예약가능기간은 필수 항목입니다."}, 
			reservEndDate:{required:"예약가능기간은 필수 항목입니다."}, 
			reservEndTime:{required:"예약가능기간은 필수 항목입니다."}, 
			reservEndMinute:{required:"예약가능기간은 필수 항목입니다."}, 
			reservDayWeek:{required:"예약가능 요일은 필수 항목입니다."}, 
			region:{required:"지역은 필수 항목입니다."}, 
			target:{required:"대상은 필수 항목입니다."}, 
			location:{required:"장소는 필수 항목입니다."}, 
			zipCode:{required:"우편번호는 필수 항목입니다."}, 
			address:{required:"주소는 필수 항목입니다."}, 
			detailAddress:{required:"상세주소는 필수 항목입니다."}, 
			methodReception:{required:"접수방법은 필수 항목입니다."}, 
			screeningMethod:{required:"선별방법은 필수 항목입니다."}, 
			fees:{required:"이용요금은 필수 항목입니다."}, 
			paymentMethod:{required:"결제방법은 필수 항목입니다."}, 
			operationContent:{required:"운영내용은 필수 항목입니다."}, 
			operationYn:{required:"운영여부는 필수 항목입니다."}            	
	    
	    },
	    submitHandler: function (){
	    
		if(!checkboxValidation()){
			return false;
		}
		
		if(!roundValidation()){
			return false;
		}	    
	    
			return true;
	    }
	   
	});
}); 