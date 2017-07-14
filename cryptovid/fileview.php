<?
include_once '/home/udrugadignitas/getDL.php';
$link = $_GET['link'];
$key = $_GET['key'];
$type = $_GET['type'];
?>

<html>

	<head>
		<meta charset="utf-8"/>

		<meta name="viewport" content="width=device-width, initial-scale=1" />

		<link href="http://fonts.googleapis.com/css?family=Raleway:400,700" rel="stylesheet" />
		<script src="js/jquery.js"></script>
		<script src="js/decrypt.js"></script>
		<script src="js/aes.js"></script>
		<link rel="stylesheet" type="text/css" href="css/viewStyle.css?version=2" />

	</head>

	<body>
	<script type="text/javascript">
	ViData = "<?echo getFile($link)?>";
	ViName = "<?echo $link?>";
	key = "<?echo $key?>";
	FileType = "<?echo $type?>";
	
	</script>
	

			<div id="message"></div>
			<div id="backdrop">
			<center>
			<?
			$unencodedLink = 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
			$actual_link = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&bgcolor=354a54&charset-target=ASCII&data=' . urlencode($unencodedLink);?>
			<img id="qrCode" onclick="enlarge()" width="50" src="<?echo $actual_link?>">
			<div id="motto">
			Secure local encryption file sharing.
			<br>
			<a href="http://udrugadignitas.hr/cryptovid"> Upload </a>
			<div>
			</center>
			</div>
			<div id="outer-frame"><center>
			<? if ($type == "video"){
			echo '
			<video id="video" controls ></video> ';}
			else{ echo '
			<img id="imag" >';}
			?>
			</center> 

                        </div>
			
			<script type="text/javascript">
			if(typeof document.getElementById("video") !== 'undefined' && document.getElementById("video") !== null) {
			document.getElementById("video").volume = 0.5;
			}
			</script>
			
		



	</body>

</html>

