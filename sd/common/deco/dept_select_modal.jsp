<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="modal" id="dept_select_modal" tabindex="0" role="dialog">
    <div class="modal__body">
        <div class="modal__header">
            <div class="modal__title">부서선택</div>
        </div>
        <div class="modal__content">
			<iframe src="/neo/popupDeptSelectView.do?selectMode=MULTI&amp;hideTitle=Y&amp;w=540&amp;h=280" title="부서선택창" scrolling="no" style="width:550px;height:300px;overflow:hidden;"></iframe>
			<div id="selected_dept"></div>
        </div>
        <div class="modal__footer">
            <button type="button" class="p-button default"  data-close="modal">닫기</button>
            <button type="button" class="p-button secondary" id="btn_apply_selected" data-close="modal">적용</button>
        </div>
        <div class="modal__close">
            <button type="button" data-close="modal" class="modal__close-button">
                <span>닫기</span>
            </button>
        </div>
    </div>
</div>

<script>
$(function() {
	try {
		selected_dept;
	} catch(e) {
		if(e.name == "ReferenceError") {
			selected_dept = [];
		}
	}

	$('#'+call_modal_btn_id).on('click', function() {
    	printDeptCode(selected_dept, 'selected_dept');

        $(this).modalPop({
            target : "#dept_select_modal",
            width  : "600",
            height : "400"
        });
    });

	window.callbackSelectDept = function(deptCode, deptNm, caller) {
    	var nd = {"deptCode":deptCode, "deptNm":deptNm};
    	var contains = containsDeptCode(selected_dept, nd);
    	if(!contains) {
			selected_dept.push(nd);
    	}
    	printDeptCode(selected_dept, 'selected_dept', false);
    }

    function containsDeptCode(arr, el) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].deptCode === el.deptCode) {
                return true;
            }
        }
        return false;
    }

    function printDeptCode(arr, containerId, includeInput) {
    	var depts = "";
    	for (var i = 0; i < arr.length; i++) {
    		if(i > 0) {
    			depts += "&nbsp;";
    		}
    		if(includeInput) {
    			depts += "<button class='p-button p-button--xsmall last_remove_dept' data-dept-code='" + arr[i].deptCode + "'>" + arr[i].deptNm + "(" + arr[i].deptCode + ")</button>";
                depts += "<input type='hidden'  id='"+ apply_depts_prefix + "_" + apply_depts_frm_nm_dept_nm + i + "' name='" + apply_depts_prefix + "[" + i + "]." + apply_depts_frm_nm_dept_nm +  "' value='" + arr[i].deptNm + "'/>";
                depts += "<input type='hidden'  id='"+ apply_depts_prefix + "_" + apply_depts_frm_nm_dept_cd + i + "' name='" + apply_depts_prefix + "[" + i + "]." + apply_depts_frm_nm_dept_cd +  "' value='" + arr[i].deptCode + "'/>";
    		}
    		else {
            	depts += "<button class='p-button p-button--xsmall remove_dept' data-dept-code='" + arr[i].deptCode + "'>" + arr[i].deptNm + "(" + arr[i].deptCode + ")</button>";
    		}
        }
		$('#'+containerId).html(depts);
    }

	$(document).on('click', 'button.remove_dept', function() {
		var $this = $(this),
			deptCode = $this.data('deptCode');

		var match_index = -1;
		for (var i = 0; i < selected_dept.length; i++) {
            if(selected_dept[i].deptCode == deptCode) {
            	match_index = i;
            }
        }
		selected_dept.splice(match_index, 1);
		printDeptCode(selected_dept, 'selected_dept');
	});


    $('#btn_apply_selected').on('click', function() {
    	printDeptCode(selected_dept, apply_depts_container_id, true);
    	processAfterApply(selected_dept);
    });

	$(document).on('click', 'button.last_remove_dept', function() {
		var $this = $(this),
			deptCode = $this.data('deptCode');

		var match_index = -1;
		for (var i = 0; i < selected_dept.length; i++) {
            if(selected_dept[i].deptCode == deptCode) {
            	match_index = i;
            }
        }
		console.log(deptCode + ":" + match_index);
		selected_dept.splice(match_index, 1);
		printDeptCode(selected_dept, apply_depts_container_id, true);
		processAfterApply(selected_dept);
	});

	if(selected_dept && selected_dept.length > 0) {
		printDeptCode(selected_dept, apply_depts_container_id, true);
		processAfterApply(selected_dept);
	}
});
</script>