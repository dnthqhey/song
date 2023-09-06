/* 
 * 회차 관련 스크립트 
 */
 
 
/*  회차 등록 페이지 jsp 추가하기  */
 function fn_registType(){
 
	$('input:checkbox[name=exceptionWeeks]').each(function (index) {
		$(this).attr("checked", false);
	});		
 
	$("#ageType").empty();
	$("#exceptionType").empty();
	var agency = $("#agencyNumber option:selected").val();
	
	
	
	$.ajax({
		type : 'GET',
		url : '/staff2/ageTypeRegist.do',
		data: {agencyNumber : agency, roundType : 'round'},
		success : function(data) {
			$("#exceptionTr").show();
			if(agency == 315){
				$("#exceptionTr").hide();
			}
			$("#ageType").append(data);
		},
		error: function(xhr, txtStatus, errorThrown){
			 alert(xhr.status + " : "+ txtStatus +" : "+errorThrown);
		}
	});	
}


/* 회차추가 타입별 추가방긱 분기 */ 
function fn_addRound(){
	var agency = $("#agencyNumber option:selected").val();
	if(agency == 311 || agency == 315){
		fn_addMusicRound();
	}else{
		fn_addNomalRound();
	}	
}


/* (일반) 회차 추가하기  */ 
function fn_addNomalRound(){
	var tag_index = $('.roundsTag').length;
	var cloneHtml =  $("#roundsTag").clone();
	cloneHtml.attr('id', "roundsTag" + tag_index);
	cloneHtml.find("select:eq(0)").attr("name", "roundList["+tag_index+"].programStartTime");
	cloneHtml.find("select:eq(1)").attr("name", "roundList["+tag_index+"].programStartMinute");
	cloneHtml.find("select:eq(2)").attr("name", "roundList["+tag_index+"].programEndTime");
	cloneHtml.find("select:eq(3)").attr("name", "roundList["+tag_index+"].programEndMinute");
	
	cloneHtml.find("input:eq(0)").attr("name", "roundList["+tag_index+"].recruitmentCount");
	cloneHtml.find("input:eq(1)").attr("name", "roundList["+tag_index+"].recruitmentMinCount");
	cloneHtml.find("input:eq(2)").attr("name", "roundList["+tag_index+"].recruitmentMaxCount");
	cloneHtml.find("input:eq(3)").attr("name", "roundList["+tag_index+"].waitingCount");
	
	cloneHtml.find("input:eq(0)").val("");
	cloneHtml.find("input:eq(1)").val("");
	cloneHtml.find("input:eq(2)").val("");	
	cloneHtml.find("input:eq(3)").val("0");	
	
	cloneHtml.appendTo("#roundsTb");
	$("#removeRound").show();
}

function fn_addSafetyRound(){
	var tag_index = $('.roundsTag').length;

	var cloneHtml =  $("#roundsTag").clone();
	cloneHtml.attr('id', "roundsTag" + tag_index);
	cloneHtml.find("select:eq(0)").attr("name", "roundList["+tag_index+"].programStartTime");
	cloneHtml.find("select:eq(1)").attr("name", "roundList["+tag_index+"].programStartMinute");
	cloneHtml.find("select:eq(2)").attr("name", "roundList["+tag_index+"].programEndTime");
	cloneHtml.find("select:eq(3)").attr("name", "roundList["+tag_index+"].programEndMinute");
	
	cloneHtml.appendTo("#roundsTb");
	$("#removeRound").show();	
	

	

	var cloneHtml_n = $("#addEtcTag0").find("#addEtc0").clone();
	cloneHtml_n.attr('id', "addEtc" + tag_index);
	cloneHtml_n.find("input:eq(0)").attr("name", "roundList["+tag_index+"].recruitmentCount");
	cloneHtml_n.find("input:eq(1)").attr("name", "roundList["+tag_index+"].recruitmentMinCount");
	cloneHtml_n.find("input:eq(2)").attr("name", "roundList["+tag_index+"].recruitmentMaxCount");	
	
	cloneHtml_n.find("input:eq(0)").val("");
	cloneHtml_n.find("input:eq(1)").val("");
	cloneHtml_n.find("input:eq(2)").val("");		
	
	cloneHtml_n.appendTo("#addEtcTag0");


	var cloneHtml_e = $("#addExceptionEtcTag0").find("#addExceptionEtc0").clone();
	cloneHtml_e.attr('id', "addExceptionEtc" + tag_index);
	cloneHtml_e.find("input:eq(0)").attr("name", "roundExceptionList["+tag_index+"].recruitmentCount");
	cloneHtml_e.find("input:eq(1)").attr("name", "roundExceptionList["+tag_index+"].recruitmentMinCount");
	cloneHtml_e.find("input:eq(2)").attr("name", "roundExceptionList["+tag_index+"].recruitmentMaxCount");	
	
	cloneHtml_e.find("input:eq(0)").val("");
	cloneHtml_e.find("input:eq(1)").val("");
	cloneHtml_e.find("input:eq(2)").val("");		
	
	cloneHtml_e.appendTo("#addExceptionEtcTag0");
}


/* (뮤직/안전) 회차 추가하기  */
function fn_addMusicRound(){
	var tag_index = $('.roundsTag').length;

	var cloneHtml =  $("#roundsTag").clone();
	cloneHtml.attr('id', "roundsTag" + tag_index);
	cloneHtml.find("select:eq(0)").attr("name", "roundList["+tag_index+"].programStartTime");
	cloneHtml.find("select:eq(1)").attr("name", "roundList["+tag_index+"].programStartMinute");
	cloneHtml.find("select:eq(2)").attr("name", "roundList["+tag_index+"].programEndTime");
	cloneHtml.find("select:eq(3)").attr("name", "roundList["+tag_index+"].programEndMinute");
	
	cloneHtml.appendTo("#roundsTb");
	$("#removeRound").show();	
	
	var tag_index2 = $('.roundCount').length;
	var cloneHtml2 =  $("#roundCount").clone();
	var round = tag_index2 + 1;
	$("#roundCount").find('th:eq(0)').attr('rowspan', tag_index2+1);
	

	cloneHtml2.attr('id', "roundCount" + tag_index2);
	cloneHtml2.find("th:eq(0)").remove();
	//cloneHtml2.find("th:eq(0)").find("span").text(round+"회차");
	cloneHtml2.find("th:eq(0)").find("a:eq(0)").attr("onclick","addEtc("+tag_index2+")");
	cloneHtml2.find("td").attr("id", "addEtcTag"+tag_index2);
	cloneHtml2.find("a:eq(1)").attr("onclick","fn_removeRoundEtc("+tag_index2+",1)");
	cloneHtml2.find("a:eq(1)").attr("id", "removeRoundEtc"+tag_index2);
	
	var cloneHtml3 =  $("#addEtc0").clone();
	cloneHtml3.attr("id", "addEtc0");
	/*cloneHtml3.attr("class", "addEtc"+tag_index2);*/
	cloneHtml2.find("div").remove();
	cloneHtml2.find("td").append(cloneHtml3);
	
	cloneHtml2.find("input:eq(0)").attr("name", "roundList["+tag_index2+"].roundsEtcList[0].etcRoundNo");
	cloneHtml2.find("input:eq(0)").val('0');
	cloneHtml2.find("input:eq(1)").attr("name", "roundList["+tag_index2+"].roundsEtcList[0].etcRound");
	cloneHtml2.find("input:eq(2)").attr("name", "roundList["+tag_index2+"].roundsEtcList[0].etcTime");
	cloneHtml2.find("input:eq(3)").attr("name", "roundList["+tag_index2+"].roundsEtcList[0].etcNo");
	cloneHtml2.find("input:eq(4)").attr("name", "roundList["+tag_index2+"].roundsEtcList[0].etcCount");
	cloneHtml2.find("input:eq(5)").attr("name", "roundList["+tag_index2+"].roundsEtcList[0].etcMinCount");
	cloneHtml2.find("input:eq(6)").attr("name", "roundList["+tag_index2+"].roundsEtcList[0].etcMaxCount");



	cloneHtml2.appendTo("#ageType");
	
}


/* (뮤직/안전) 회차 세부회차 추가  */
function addEtc(index){
	var cloneHtml = $("#addEtcTag"+index).find("#addEtc0").clone();
	var tag_index = $("#addEtcTag"+index).find('.addEtc').length;

	cloneHtml.attr("id", "addEtc"+tag_index);
	cloneHtml.find("input:eq(0)").attr("name", "roundList["+index+"].roundsEtcList["+tag_index+"].etcRoundNo");
	cloneHtml.find("input:eq(1)").attr("name", "roundList["+index+"].roundsEtcList["+tag_index+"].etcRound");
	cloneHtml.find("input:eq(2)").attr("name", "roundList["+index+"].roundsEtcList["+tag_index+"].etcTime");
	cloneHtml.find("input:eq(3)").attr("name", "roundList["+index+"].roundsEtcList["+tag_index+"].etcNo");
	cloneHtml.find("input:eq(4)").attr("name", "roundList["+index+"].roundsEtcList["+tag_index+"].etcCount");
	cloneHtml.find("input:eq(5)").attr("name", "roundList["+index+"].roundsEtcList["+tag_index+"].etcMinCount");
	cloneHtml.find("input:eq(6)").attr("name", "roundList["+index+"].roundsEtcList["+tag_index+"].etcMaxCount");
	
	//cloneHtml.find("input:eq(0)").val("0");
	cloneHtml.find("input:eq(1)").val("0");
	cloneHtml.find("input:eq(2)").val("0");
	cloneHtml.find("input:eq(3)").val("0");
	cloneHtml.find("input:eq(4)").val("");
	cloneHtml.find("input:eq(5)").val("");
	cloneHtml.find("input:eq(6)").val("");

	$("#removeRoundEtc"+index).show();
	cloneHtml.appendTo("#addEtcTag"+index);
	
}


/* (일반) 추가회차 제거 */
function fn_removeRound(end){
	var tag_index = $('.roundsTag').length-1;
	$("#roundsTag"+tag_index).remove();
	$("#roundCount"+tag_index).remove();
	if(tag_index == end){
		$("#removeRound").hide();
	}
}

/* (일반) 추가회차Etc 제거 */
function fn_removeRoundEtc(round, end){

	var tag_index = $("#addEtcTag"+round).find('.addEtc').length-1;

	$("#addEtcTag"+round).find("#addEtc"+tag_index).remove();

	if(tag_index == end){
	
		$("#removeRoundEtc"+round).hide();
	}
}

function fn_removeSafetyRound(index){

	var tag_index = $('.roundsTag').length - 1;

	$("#roundsTag"+tag_index).remove();

	if(tag_index > index){
		$("#addEtcTag0").find("#addEtc"+tag_index).remove();
	
		$("#addExceptionEtcTag0").find("#addExceptionEtc"+tag_index).remove();
	}


	
}




