var decrypted = null;
var Enlarged = 0;

$(function(){




		var input = $(this).parent().find('input[type=password]'),
			a = $(' a.download'),
			password = input.val();

		input.val('');

		// The HTML5 FileReader object will allow us to read the 
		// contents of the	selected file.


			// Decrypt it!


				decrypted = CryptoJS.AES.decrypt(ViData, key)
										.toString(CryptoJS.enc.Latin1);

				if(!/^data:/.test(decrypted)){
					alert("Invalid pass phrase or file! Please try again.");
					return false;
				}

				a.attr('href', decrypted);
				a.attr('download', ViName.replace('.encrypted',''));
				
				if(FileType == 'video'){
				playVideo();}
				else{
				showImage();
				}
				

			


	
	function  playVideo(){
			var srcElement = document.getElementsByTagName("video")[0];
			srcElement.src = decrypted;
	}

	function  showImage(){
	
			var y = document.getElementById("imag").height;
			var x = document.getElementById("imag").width;
			$('#imag').attr('src', decrypted);
			
	}



});

		function enlarge() {
		
	if(Enlarged == 0){
    	document.getElementById("qrCode").width = "50";
		Enlarged = 1;
		return;
		}
		else{
		document.getElementById("qrCode").width = "130";
		Enlarged = 0;
		}
		
		}

