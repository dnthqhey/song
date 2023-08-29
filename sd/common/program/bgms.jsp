<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=2.0, minimum-scale=1.0, user-scalable=yes" />
	<meta name="author" content="부동산 중개 수수료 계산" />
	<meta name="keywords" content="부동산 중개 수수료 계산" />
	<meta name="description" content="부동산 중개 수수료 계산" />
    <link rel="stylesheet" type="text/css" href="/common/css/font.css" />
	<!--[if lt IE 9]><link rel="stylesheet" type="text/css" href="/common/css/font_ie8.css" /><![endif]-->
	<!--[if lt IE 10]><script src="/common/js/consoleFix.min.js"></script><![endif]-->
    <!--[if lt IE 9]><script src="/common/js/html5.js"></script><![endif]-->
    <script src="/common/js/jquery-1.12.4.min.js"></script>
    <script src="/common/js/jquery.menu.min.js"></script>
	<script src="/common/js/slick.min.js"></script>
	<script src="/common/js/program.min.js"></script>
    <title>부동산 중개 수수료 계산</title>
</head>
<body id="sub${menuInfo.naviList[0].menuOrdr}" class="${siteInfo.siteId}">


<div class="program">
	<div class="brokerage_fee">
		<div class="box">
			<div class="box_wrap">
				<h3 class="box_title">부동산중개수수료 지급에 대한 안내</h3>
				<p class="box_text">우리군 에서는 공정한 부동산 거래질서를 확립하고 부동산중개업소의 위법·부당한 행위로 인한 군민의 불편 및 재산상의 피해를 방지하기 위하여 부동산중개업 불법행위신고 센터를 운영하고 있습니다.</p>
			</div>
		</div>

		<h3>근거</h3>
		<p>충청북도 부동산중개수수료 및 실비의 기준과 한도 등에 관한조례[2006 .5. 12개정]</p>

<script>
//<![CDATA[
$(document).ready(function() {
    $(document).on("keyup", ".numberonly", function() {$(this).val( $(this).val().replace(/[^0-9]/gi,"") );});
});

function doCalc(ty) {
	var base = 0.0;
	var rs1 = {"result":0.0, "type":""}; // 일반주택일 경우
	var rs2 = {"result":0.0, "type":""}; // 주거용 오피스텔의 경우
	var rs3 = {"result":0.0, "type":""}; // 일반주택외 중개 대상물일 경우

	console.log(ty);


	if(ty === "1") {
		if($('#input1').val() === "") {
			alert("매매교환거래가를 입력하시기 바랍니다.");
			return false;
		}
		base = parseFloat($('#input1').val());

		rs1 = calc(ty, base);
		rs2.result = base * 0.005;
	}
	else if(ty === "2") {
		if($('#input2').val() === "") {
			alert("전세보증금을 입력하시기 바랍니다.");
			return false;
		}
		base = parseFloat($('#input2').val());

		rs1 = calc(ty, base);
		rs2.result = base * 0.004;
	}
	else if(ty === "3") {
		if($('#input3_1').val() === "") {
			alert("월세보증금을 입력하시기 바랍니다.");
			return false;
		}
		if($('#input3_2').val() === "") {
			alert("월세를 입력하시기 바랍니다.");
			return false;
		}

		var base1 = parseFloat($('#input3_1').val());
		var base2 = parseFloat($('#input3_2').val());
		base = base1 + base2 * 100;

		if(base < 5000) { // 월세시 거래금액이 5000만원 미만일 경우 : 보증금 + (월세 * 70) 으로 계산하여 적용
			base = base1 + (base2 * 70);
		}

		rs1 = calc(ty, base);
		rs2.result = base * 0.004;
	}

	rs3.result = base * 0.009;
	rs3.type = "이내에서 협의 결정";

	printResult(ty, base, rs1, rs2, rs3);

	return false;
}

function printResult(ty, bs, rs1, rs2, rs3) {
	console.log(ty, bs, rs1, rs2, rs3);

    $('#p_div_result_1').removeClass("active");
    $('#p_div_result_2').removeClass("active")
    $('#p_div_result_3').removeClass("active")

	if(ty === "1") {
		$('#p_gubun_'+ty).text("부동산 매매/교환 거래");
	}
	else if(ty === "2") {
		$('#p_gubun_'+ty).text("부동산 전세 거래");
	}
	else if(ty === "3") {
		$('#p_gubun_'+ty).text("부동산 월세 거래");
	}
	$('#p_amount_'+ty).text(bs);
	$('#p_rs1_'+ty).text(Math.round(rs1.result));
	$('#p_ty1_'+ty).text(rs1.type);
	$('#p_rs2_'+ty).text(Math.round(rs2.result));
	$('#p_ty2_'+ty).text(rs2.type);
	$('#p_rs3_'+ty).text(Math.round(rs3.result));
	$('#p_ty3_'+ty).text(rs3.type);


	$('#p_div_result_'+ty).addClass("active");
}


function calc(ty, base) {
	var type = "";

	if(ty == "1") {
		if(base < 5000) {
			rs = base * 0.006;
			if(rs > 25) {
				rs = 25;
			}
		}
		else if(base >= 5000 && base < 20000) {
			rs = base * 0.005;
			if(rs > 80) {
				rs = 80;
			}
		}
		else if(base >= 20000 && base < 60000) {
			rs = base * 0.004;
		}
		else if(base >= 60000 && base < 90000) {
			rs = base * 0.005;
		}
		else if(base >= 90000) {
			rs = base * 0.009;
			type = "이내에서 협의 결정";
		}
	}
	else if(ty == "2" || ty == "3") {
		if(base < 5000) {
			rs = base * 0.005;
			if(rs > 20) {
				rs = 20;
			}
		}
		else if(base >= 5000 && base < 10000) {
			rs = base * 0.004;
			if(rs > 30) {
				rs = 30;
			}
		}
		else if(base >= 10000 && base < 30000) {
			rs = base * 0.003;
		}
		else if(base >= 30000 && base < 60000) {
			rs = base * 0.004;
		}
		else if(base >= 60000) {
			rs = base * 0.008;
			type = "이내에서 협의 결정";
		}
	}

	return {"result":rs, "type":type};
}
//]]>
</script>


		<h3>부동산중개수수료계산</h3>
		<ul>
			<li>
				<h4 class="h0">매매교환</h4>
				<div class="inner_wrap">
					<label for="input1">매매거래가 입력</label>
					<input id="input1" class="p-input p-input--auto numberonly" type="text" placeholder="매매교환거래가"/> 만원
					<button type="button" class="btn type6" onclick="return doCalc('1')">계산하기</button>
				</div>
				<div id="p_div_result_1" class="result_box">
					<p>수수료 계산결과</p>
					<ul class="bu type2">
						<li>거래구분 : <strong id="p_gubun_1"></strong>, 거래금액:<strong id="p_amount_1"></strong>만원</li>
						<li>따라서 부동산 중개수수료는
							<ul>
								<li>일반주택일 경우 : <strong id="p_rs1_1" class="em_blue"></strong>만원 <span id="p_ty1_1"></span></li>
								<li>일반주택외 중개대상물일 경우 : <strong id="p_rs3_1" class="em_blue"></strong>만원 <span id="p_ty3_1"></span></li>
								<li>주거용오피스텔의 경우 : <strong id="p_rs2_1" class="em_blue"></strong>만원 <span id="p_ty2_1"></span></li>
							</ul>
						</li>
						<li>전용면적 85㎡이하로 일정설비(입식부엌, 화장실, 욕실 등)를 갖춘 오피스텔</li>
					</ul>
				</div>
			</li>
			<li>
				<h4 class="h0">부동산전세</h4>
				<div class="inner_wrap">
					<label for="input2">전세보증금 입력</label>
					<input id="input2" class="p-input p-input--auto numberonly" type="text" placeholder="전세보증금"/> 만원
					<button type="button" class="btn type6" onclick="return doCalc('2')">계산하기</button>
				</div>
				<div id="p_div_result_2" class="result_box">
					<p>수수료 계산결과</p>
					<ul class="bu type2">
						<li>거래구분 : <strong id="p_gubun_2"></strong>, 거래금액:<strong id="p_amount_2"></strong>만원</li>
						<li>따라서 부동산 중개수수료는
							<ul>
								<li>일반주택일 경우 : <strong id="p_rs1_2" class="em_blue"></strong>만원 <span id="p_ty1_2"></span></li>
								<li>일반주택외 중개대상물일 경우 : <strong id="p_rs3_2" class="em_blue"></strong>만원 <span id="p_ty3_2"></span></li>
								<li>주거용오피스텔의 경우 : <strong id="p_rs2_2" class="em_blue"></strong>만원 <span id="p_ty2_2"></span></li>
							</ul>
						</li>
						<li>전용면적 85㎡이하로 일정설비(입식부엌, 화장실, 욕실 등)를 갖춘 오피스텔</li>
					</ul>
				</div>
			</li>
			<li>
				<h4 class="h0">부동산월세</h4>
				<div class="inner_wrap">
					<ul class="clearfix">
						<li>
							<label for="input3_1">보증금 입력</label>
							<input id="input3_1" class="p-input p-input--auto numberonly" type="text" placeholder="보증금"/> 만원
						</li>
						<li>
							<label for="input3_2">월세 입력</label>
							<input id="input3_2" class="p-input p-input--auto numberonly" type="text"  placeholder="월세" /> 만원
						</li>
					</ul>
					<button type="button" class="btn type6" onclick="return doCalc('3')">계산하기</button>
				</div>
				<div id="p_div_result_3" class="result_box">
					<p>수수료 계산결과</p>
					<ul class="bu type2">
						<li>거래구분 : <strong id="p_gubun_3"></strong>, 거래금액:<strong id="p_amount_3"></strong>만원</li>
						<li>따라서 부동산 중개수수료는
							<ul>
								<li>일반주택일 경우 : <strong id="p_rs1_3" class="em_blue"></strong>만원 <span id="p_ty1_3"></span></li>
								<li>일반주택외 중개대상물일 경우 : <strong id="p_rs3_3" class="em_blue"></strong>만원 <span id="p_ty3_3"></span></li>
								<li>주거용오피스텔의 경우 : <strong id="p_rs2_3" class="em_blue"></strong>만원 <span id="p_ty2_3"></span></li>
							</ul>
						</li>
						<li>전용면적 85㎡이하로 일정설비(입식부엌, 화장실, 욕실 등)를 갖춘 오피스텔</li>
					</ul>
				</div>
			</li>
		</ul>



		<h3>주택의 중개보수(부속토지 포함)</h3>
		<table class="table">
			<caption>주택의 중개 보수(부속토지 포함) 표 - 거래종류, 거래금액, 중개보수 상한요율, 한도액에 대한 정보 제공</caption>
			<thead>
				<tr>
					<th scope="col">거래종류</th>
					<th scope="col">거래금액</th>
					<th scope="col">중개보수 상한요율</th>
					<th scope="col">한도액</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td rowspan="5">매매·교환</td>
					<td>5천만원 미만</td>
					<td>1천분의 6</td>
					<td>25만원</td>
				</tr>
				<tr>
					<td>5천만원 이상 2억원 미만</td>
					<td>1천분의 5</td>
					<td>80만원</td>
				</tr>
				<tr>
					<td>2억원 이상 6억원 미만</td>
					<td>1천분의 4</td>
					<td>-</td>
				</tr>
				<tr>
					<td>6억원 이상 9억원 미만</td>
					<td>1천분의 5</td>
					<td>-</td>
				</tr>
				<tr>
					<td>9억원 이상</td>
					<td>1천분의 9 이내에서 협의 결정</td>
					<td>-</td>
				</tr>
				<tr>
					<td rowspan="5">임대차 등<br>
						(매매·교환 이외)
					</td>
					<td>5천만원 미만</td>
					<td>1천분의 5</td>
					<td>20만원</td>
				</tr>
				<tr>
					<td>5천만원 이상 1억원 미만</td>
					<td>1천분의 4</td>
					<td>30만원</td>
				</tr>
				<tr>
					<td>1억원 이상 3억원 미만</td>
					<td>1천분의 3</td>
					<td>-</td>
				</tr>
				<tr>
					<td>3억원 이상 6억원 미만</td>
					<td>1천분의 4</td>
					<td>-</td>
				</tr>
				<tr>
					<td>6억원 이상</td>
					<td>1천분의 8 이내에서 협의 결정</td>
					<td>-</td>
				</tr>
			</tbody>
		</table>
		<p class="warning">중개보수는 거래금액에 보수 요율을 곱한 금액으로 하되, 보수가 한도액을 초과하는 경우에는 한도액 범위안에서만 받을 수 있음.</p>
		<ul class="bu">
			<li>보수 지불시기 - 다른 약정이 없으면 거래대금이 완료된 날에 지불(공인중개사법 시행령 제27조의 2)</li>
			<li>보수 부담 - 중개의뢰인 쌍방이 정해진 요율 및 한도액 범위안에서 협의한 금액을 각각 부담</li>
			<li>중개대상물인 건축물 중 주택의 면적이 2분의 1 이상인 경우에는 주택의 중개보수 요율을 적용하고, 주택의 면적이 2분의 1미만인 경우에는 주택외의 중개보수 요율을 적용</li>
		</ul>

		<h3>주거용 오피스텔 중개보수(공인중개사법시행규칙 제20조 제4항)</h3>
		<h4>적용기준(아래의 요건을 모두 갖춘 경우) </h4>
		<ul class="bu">
			<li>가. 전용면적이 85제곱미터 이하일 것</li>
			<li>나. 상·하수도 시설이 갖추어진 전용입식 부엌, 전용수세식 화장실 및 목욕시설(전용수세식 화장실에 목욕시설을 갖춘 경우 포함)을 갖출 것</li>
		</ul>
		<h4>중개보수 요율</h4>
		<table class="table">
			<caption>중개보수 요율 표 - 구분, 중개보수 상한요율에 대한 정보 제공</caption>
			<thead>
				<tr>
					<th scope="col">구분 </th>
					<th scope="col">중개보수 상한요율</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>매매·교환</td>
					<td>1천분의 5</td>
				</tr>
				<tr>
					<td>임대차 등</td>
					<td>1천분의 4</td>
				</tr>
			</tbody>
		</table>
		<p class="warning">주거용 오피스텔 기준에 적용되지 않을 경우, 거래금액의 1천분의 9 이내에서 중개의뢰인과 개업공인중개사가 서로 협의하여 결정</p>

		<h3>주택 외의 중개 수수료</h3>
		<ul class="bu">
			<li>중개의뢰인 쌍방으로부터 각각 받되, 거래금액의 1천분의 9 이내에서 중개의뢰인과 개업공인중개사가 서로 협의하여 결정</li>
			<li>실제 우리 중개업소에서 받고자 하는 중개보수의 상한요율 : 거래금액의 1천분의 ( )</li>
		</ul>

		<h3>거래금액 산정 기준</h3>
		<ul class="bu">
			<li>임대차 중 보증금 외에 차임이 있는 경우 : 임대보증금 + (월 단위 차임액 x 100)
				<p class="warning">임대보증금 +(월 단위 차임액 x 100)을 적용하여거래금액이 5천만원 미만일 경우 <br />
				"임대보증금 + (월 단위 차임액 x 70)"으로 재산정한 금액을 거래금액으로 함</p>
			</li>
			<li>교환계약의 경우 : 교환대상 중개대상물 중 거래금액이 큰 중개대상물의 가액</li>
			<li>동일한 중개대상물에 대하여 동일 당사자간에 매매를 포함한 둘 이상의 거래가 동일 기회에 이루어지는 경우 : 매매계약에 관한 거래금액만을 적용</li>
		</ul>

		<h3>실비</h3>
		<table class="table">
			<caption>실비 표 - 구분, 청구범위, 한도액, 부담자, 지불시기에 대한 정보 제공</caption>
			<thead>
				<tr>
					<th scope="col">구분 </th>
					<th scope="col"> 청구범위 </th>
					<th scope="col">한도액</th>
					<th scope="col">부담자</th>
					<th scope="col"> 지불시기</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td rowspan="3">중개대상물의<br>
						권리관계 등의<br>
						확인에 소요되는
						실비
					</td>
					<td>제증명 신청 및<br>
						공부 열람 대행료
					</td>
					<td>건당 1천원</td>
					<td rowspan="3">매도·임대<br>
						그 밖의 권리를<br>
						이전하고자 <br>
						하는 자
					</td>
					<td rowspan="3">개업공인중개사와 중개의뢰인이 약정<br>
						(약정이 없으면	중개대상물에 대하여	확인·설명한 후에 지불)
					</td>
				</tr>
				<tr>
					<td>제증명 발급 및<br>
						공부 열람 수수료 <br>
					</td>
					<td>당해 증명발급<br>
						및 열람 수수료
					</td>
				</tr>
				<tr>
					<td>여비<br>
						(교통비, 숙박료) <br>
					</td>
					<td> 실비</td>
				</tr>
				<tr>
					<td rowspan="3">계약금등의<br>
						반환채무이행<br>
						보장에 소요되는<br>
						실비
					</td>
					<td>계약금등의<br>
						예치에 따른 비용 <br>
					</td>
					<td> 예치 수수료</td>
					<td rowspan="3">매수·임차<br>
						그 밖의 권리를<br>
						취득하고자 <br>
						하는 자
					</td>
					<td rowspan="3">개업공인중개사와 중개의뢰인이 약정<br>
						(약정이 없으면 계약금등의 반환 또는 지급과 동시에 지불)
					</td>
				</tr>
				<tr>
					<td>계약금등의<br>
						예치금 반환시<br>
						보증 설정에 따른 비용
					</td>
					<td> 실비</td>
				</tr>
				<tr>
					<td> 교통비 </td>
					<td> 실비 </td>
				</tr>
			</tbody>
		</table>
	</div>
</div>

</body>
</html>