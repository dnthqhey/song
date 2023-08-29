<%@ page language="java" pageEncoding="UTF-8"%>
<script>
    $(".view_ntt").on("click", function () {
    	var bbsNo = $(this).data('bbsNo'),
    		nttNo = $(this).data('nttNo'),
    		nttSj = $(this).data('nttSj');

    	$.ajax({
    		async : false,
    		url : '/bbs/selectBbsNttViewHTML.do',
    		data : {'bbsNo':bbsNo, 'nttNo':nttNo},
    		dataType : 'html',
    		success : function(data, textStatus, jqXHR) {
    			console.log(data);
    			$('#ntt-view .modal_title').text(nttSj);
    	        $('#ntt-view .modal_content').html(data);
    	    	$(this).modalPop({
    	            target : "#ntt-view",
    	            width  : "800",
    	            height : "600"
    	        });
				$('.p-table--th-left tr:nth-child(2) th').css('width','100px');// 구청장에게 바란다 스테프 페이지 적용 210225
				$('.p-table--th-left tr:nth-child(2) td').css('text-align','left');// 구청장에게 바란다 스테프 페이지  적용 210225
				$('.ntt_cn_container').css('text-align','left');// 구청장에게 바란다 스테프 페이지 적용 210225
    		},
    		error: function(xhr, txtStatus, errorThrown){
    			 alert(xhr.status + " : "+ txtStatus +" : "+errorThrown);
    		},
    		complete : function() {
    	    }
    	});

		$('.modal__backdrop').remove();
    });
</script>

	<style>
		.modal{position:fixed;top:10% !important;/*bottom:0;*/left:calc(50% - 500px) !important;width:1000px; z-index:1050;display:none;overflow:hidden;text-align:center}
		.modal .p-table.block {margin:0;}
		.modal:before {display:none;}
		.modal .modal_entity{background-color:#fff; border:2px solid #000;}
		.modal .modal_close {padding:5px 0; width:100%; background: #969696; color: #fff;}
		.modal .modal_content .ntt_cn_container{text-align:left; }
	@media all and (max-width:1000px) {
		.modal {left:2% !important;width:96%;}
	}
	</style>
<div class="modal" id="ntt-view" role="dialog">
    <div class="modal_entity">
        <div class="modal_header">
            <div class="modal_title"></div>
        </div>
        <div class="modal_content">

        </div>
        <!--<div class="modal__footer">
            <button type="button" class="p-button default"  data-close="modal">닫기</button>
            <%--<a href="" class="p-button secondary">확인</a>--%>

         </div>-->
            <button type="button" data-close="modal" class="modal_close">닫기</button>
    </div>
</div>

