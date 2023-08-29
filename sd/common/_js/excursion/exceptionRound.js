/* 
 * 예외 회차 관련 스크립트 
 */
 
 
/* 예외요일 클릭 이벤트  */
$(document).ready(function(){
	$("input[name='exceptionWeeks']").click(function () {	
		if(!removeExceptionTag()){
			fn_registExceptionType();
		}
	}); 
});


/* 예외회차 요일 선택 상태 (모든 요일이 선택 안되었는지에 따라 삭제) */
function fn_exceptionWeeksCheckState(){
	var result = false;
	$('input:checkbox[name=exceptionWeeks]').each(function (index) {
		if($(this).is(":checked")==true){
			result = true;
		}
	});
	
	return result;
}

/* 예외회차 추가 영역 삭제  */
function removeExceptionTag(){
		
	if(!fn_exceptionWeeksCheckState()){

		$("#exceptionType").empty();
		return true;
	}
	return false;
}


/* 예외 회차  */
function fn_registExceptionType(){
	
	var agency = $("#agencyNumber option:selected").val();
	
	// 운영기관 선택 여부
	if(fn_agencyEmptyCheck(agency)){return;}
	
	// 추가영역 있는지 체크 
	if($("#exceptionType").find('tr').length > 0){return;}
	
	//ajax 실행
	$.ajax({
		type : 'GET',
		url : '/staff2/ageTypeRegist.do',
		data: {agencyNumber : agency, roundType : 'exception'},
		success : function(data) {
			$("#exceptionType").append(data);
		},
		error: function(xhr, txtStatus, errorThrown){
			 alert(xhr.status + " : "+ txtStatus +" : "+errorThrown);
		}
	}); 		
}

/* 운영기관 선택 여부 체크  */
function fn_agencyEmptyCheck(agency){
	if(agency == ''){
		alert("운영기관을 선택해주세요");
		$('input:checkbox[name=exceptionWeeks]').each(function (index) {
			$(this).attr("checked", false);
		});			
		return true;
	}
	return false;
}


/* 예외회차추가 타입별 추가방긱 분기 */ 
function fn_addExceptionRound(){
	var agency = $("#agencyNumber option:selected").val();
	if(agency == 311 || agency == 315){
		fn_addMusicExceptionRound();
	}else{
		fn_addNomalExceptionRound();
	}	
}

/* 예외라운드 추가 */
function fn_addNomalExceptionRound(){
	var tag_index = $('.exceptionRoundTag').length;

	var cloneHtml =  $("#exceptionRoundTag").clone();
	cloneHtml.attr('id', "exceptionRoundTag" + tag_index);
	cloneHtml.find("select:eq(0)").attr("name", "roundExceptionList["+tag_index+"].programStartTime");
	cloneHtml.find("select:eq(1)").attr("name", "roundExceptionList["+tag_index+"].programStartMinute");
	cloneHtml.find("select:eq(2)").attr("name", "roundExceptionList["+tag_index+"].programEndTime");
	cloneHtml.find("select:eq(3)").attr("name", "roundExceptionList["+tag_index+"].programEndMinute");
	
	cloneHtml.find("input:eq(0)").attr("name", "roundExceptionList["+tag_index+"].recruitmentCount");
	cloneHtml.find("input:eq(1)").attr("name", "roundExceptionList["+tag_index+"].recruitmentMinCount");
	cloneHtml.find("input:eq(2)").attr("name", "roundExceptionList["+tag_index+"].recruitmentMaxCount");
	cloneHtml.find("input:eq(3)").attr("name", "roundExceptionList["+tag_index+"].waitingCount");
	
	cloneHtml.find("input:eq(0)").val("");
	cloneHtml.find("input:eq(1)").val("");
	cloneHtml.find("input:eq(2)").val("");	
	cloneHtml.find("input:eq(3)").val("0");	
	
	cloneHtml.appendTo("#exceptionTd");
	$("#removeExceptionRound").show();
}    

/* (뮤직/안전) 회차 추가하기  */
function fn_addMusicExceptionRound(){
	var tag_index = $('.roundsExceptionTag').length;

	var cloneHtml =  $("#roundsExceptionTag").clone();
	cloneHtml.attr('id', "roundsExceptionTag" + tag_index);
	cloneHtml.find("select:eq(0)").attr("name", "roundExceptionList["+tag_index+"].programStartTime");
	cloneHtml.find("select:eq(1)").attr("name", "roundExceptionList["+tag_index+"].programStartMinute");
	cloneHtml.find("select:eq(2)").attr("name", "roundExceptionList["+tag_index+"].programEndTime");
	cloneHtml.find("select:eq(3)").attr("name", "roundExceptionList["+tag_index+"].programEndMinute");
	
	cloneHtml.appendTo("#roundsExceptionTb");
	$("#removeRound").show();	
	
	var tag_index2 = $('.roundExceptionCount').length;
	var cloneHtml2 =  $("#roundExceptionCount").clone();
	var round = tag_index2 + 1;
	$("#roundExceptionCount").find('th:eq(0)').attr('rowspan', tag_index2+1);
	
	cloneHtml2.attr('id', "roundExceptionCount" + tag_index2);
	cloneHtml2.find("th:eq(0)").remove();
	//cloneHtml2.find("th:eq(0)").find("span").text(round+"회차");
	cloneHtml2.find("th:eq(0)").find("a:eq(0)").attr("onclick","addExceptionEtc("+tag_index2+")");
	cloneHtml2.find("td").attr("id", "addExceptionEtcTag"+tag_index2);
	cloneHtml2.find("a:eq(1)").attr("onclick","fn_removeExceptionRoundEtc("+tag_index2+",1)");
	cloneHtml2.find("a:eq(1)").attr("id", "removeExceptionRoundEtc"+tag_index2);
	
	var cloneHtml3 =  $("#addExceptionEtc0").clone();
	cloneHtml3.attr("id", "addExceptionEtc0");
	/*cloneHtml3.attr("class", "addExceptionEtc"+tag_index2);*/
	cloneHtml2.find("div").remove();
	cloneHtml2.find("td").append(cloneHtml3);
	
	cloneHtml2.find("input:eq(0)").attr("name", "roundExceptionList["+tag_index2+"].roundsEtcList[0].etcRoundNo");
	cloneHtml2.find("input:eq(0)").val('0');

	cloneHtml2.find("input:eq(1)").attr("name", "roundExceptionList["+tag_index2+"].roundsEtcList[0].etcRound");
	cloneHtml2.find("input:eq(2)").attr("name", "roundExceptionList["+tag_index2+"].roundsEtcList[0].etcTime");
	cloneHtml2.find("input:eq(3)").attr("name", "roundExceptionList["+tag_index2+"].roundsEtcList[0].etcNo");
	cloneHtml2.find("input:eq(4)").attr("name", "roundExceptionList["+tag_index2+"].roundsEtcList[0].etcCount");
	cloneHtml2.find("input:eq(5)").attr("name", "roundExceptionList["+tag_index2+"].roundsEtcList[0].etcMinCount");
	cloneHtml2.find("input:eq(6)").attr("name", "roundExceptionList["+tag_index2+"].roundsEtcList[0].etcMaxCount");



	cloneHtml2.appendTo("#exceptionType");
	
}

/* (뮤직/안전) 회차 세부회차 추가  */
function addExceptionEtc(index){
	var cloneHtml = $("#addExceptionEtcTag"+index).find("#addExceptionEtc0").clone();
	var tag_index = $("#addExceptionEtcTag"+index).find('.addExceptionEtc').length;
	
	cloneHtml.attr("id", "addExceptionEtc"+tag_index);
	
	cloneHtml.find("input:eq(0)").attr("name", "roundExceptionList["+index+"].roundsEtcList["+tag_index+"].etcRoundNo");
	cloneHtml.find("input:eq(1)").attr("name", "roundExceptionList["+index+"].roundsEtcList["+tag_index+"].etcRound");
	cloneHtml.find("input:eq(2)").attr("name", "roundExceptionList["+index+"].roundsEtcList["+tag_index+"].etcTime");
	cloneHtml.find("input:eq(3)").attr("name", "roundExceptionList["+index+"].roundsEtcList["+tag_index+"].etcNo");	
	cloneHtml.find("input:eq(4)").attr("name", "roundExceptionList["+index+"].roundsEtcList["+tag_index+"].etcCount");
	cloneHtml.find("input:eq(5)").attr("name", "roundExceptionList["+index+"].roundsEtcList["+tag_index+"].etcMinCount");
	cloneHtml.find("input:eq(6)").attr("name", "roundExceptionList["+index+"].roundsEtcList["+tag_index+"].etcMaxCount");
	
	//cloneHtml.find("input:eq(0)").val("0");
	cloneHtml.find("input:eq(1)").val("0");
	cloneHtml.find("input:eq(2)").val("0");
	cloneHtml.find("input:eq(3)").val("0");	
	cloneHtml.find("input:eq(4)").val("");
	cloneHtml.find("input:eq(5)").val("");
	cloneHtml.find("input:eq(6)").val("");	
	
	$("#removeExceptionRoundEtc"+index).show();
	cloneHtml.appendTo("#addExceptionEtcTag"+index);
	
}

/* 예외라운드 제거 */
function fn_removeExceptionRound(){
	var tag_index = $('.exceptionRoundTag').length-1;
	$("#exceptionRoundTag"+tag_index).remove();
	if(tag_index == 1){
		$("#removeExceptionRound").hide();
	}
}

/* (일반) 추가회차Etc 제거 */
function fn_removeExceptionRoundEtc(round, end){

	var tag_index = $("#addExceptionEtcTag"+round).find('.addExceptionEtc').length-1;
	console.log(tag_index);
	$("#addExceptionEtcTag"+round).find("#addExceptionEtc"+tag_index).remove();
	
	if(tag_index == end){
		$("#removeExceptionRoundEtc"+round).hide();
	}
}	