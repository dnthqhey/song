<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="tsu" uri="http://www.hanshinit.co.kr/jstl/tagStringUtil"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<script>
//<![CDATA[
$(document).ready(function() {
	$('#aditfield2 option').remove();
	$('#aditfield2').append('<option value="">상담시간 선택</option>');

	var start = $('#aditfield1').val();
	var end = start;

	if(start != '') {
		$.ajax({
			type: 'POST',
			url: 'selectTnCmmSchdulListJSON.do',
			data: {"sc1":'wellcju', "start":start, "end":end},
			dataType: 'json',
			success: function(data) {
				if(data.length > 0) {
					s = data[0];

					var b = Number(s.bgnH);
					var e = Number(s.endH);

					for(i = b; i < e; i++) {
						if(i == 12) {
							continue;
						}

						ist = ((i < 10)?"0":"")+i+"시";
						$('#aditfield2').append('<option value="'+ist+'">'+ist+'</option>');
					}
				}

			},
			error: function(xhr, txtStatus, errorThrown){
				 alert(xhr.status + " : "+ txtStatus +" : "+errorThrown);
			}
		});
	}
});
//]]>
</script>