<!DOCTYPE html>
<html>

<head>
  <meta http-equiv="Pragma" content="no-cache">
  <meta http-equiv="Cache-Control" content="no-cache">
  <title>HLS Player</title>
</head>

<body>


<iframe id="player1" src="http://v.kr.kollus.com/s?jwt=eyJhbGciOiAiSFMyNTYiLCJ0eXAiOiAiSldUIn0.eyJleHB0IjogNDY3NjI0NzIyMSwibWMiOiBbeyJtY2tleSI6ICJ0bDBFVWFEOCIsInRpdGxlIjogIkNoMSIsImxpdmUiIDogeyJ1cmwiOiAiaHR0cDovL2xpdmVvdXQuY2F0ZW5vaWQubmV0L2xpdmUtMDMta2lhLXNoamgwMS9raWEtc2hqaDAxL3BsYXlsaXN0Lm0zdTgifX1dfQ.IsYYMbodtJ04YsPZ1Lc5Vy1LTbSM-mC1w80b0fd6HcY&custom_key=444b506a095a4adf671465dd2f1a5390e958a9e15ab4ac94b14b93ac0088c278" 
allowFullscreen></iframe><br>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="kollus.videogateway-controller.min.js"></script>
<script>
var controller1;
window.onload = function() {
	try {
		controller1 = new Kollus.VideogatewayController({
			target_window: document.getElementById('player1').contentWindow
		});
	} catch (e) {
	
	}
}
</script>





</body>
</html>


