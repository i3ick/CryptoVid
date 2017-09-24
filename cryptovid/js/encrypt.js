	var videoData = null;
	var videoName = null;
	var Vfile = null;
	var key = generateKey();
	var extensionName = null;
	var Message = 0;
	
$(function(){

	var body = $('body'),
		stage = $('#stage'),
		back = $('a.back');
		
		
		document.onclick = function(e) {    
    if (e.target.className === 'click') {
        SelectText('keyCode');
    }
};

    document.getElementById('expiration-time').addEventListener('click', function() {
	if(Message == 0){
    	document.getElementById("text-select").innerHTML = "in 24 hours";
		Message = 1;
		return;
		}
	if(Message == 1){
	document.getElementById("text-select").innerHTML = "after one view.";
		Message = 2;
		return;
	}
	else if(Message == 2){
    	document.getElementById("text-select").innerHTML = "in 8 hours.";
		Message	= 0;
		return;
	}
}, false);

		
	/**

	$('#upload').on('change', '#encrypt-input', function(e){

		// Has a file been selected?

		if(e.target.files.length!=1){
			alert('Please select a file to encrypt!');
		}
		alert('boss');
		file = e.target.files[0];
		alert(file);
		

	});
*/

});

	
	//TODO better salt
	function generateKey(){
	var salty = null;
	var salt = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for(var i=0; i<20; i++){
	
	if(salty==null){
	salty = salt.charAt(Math.floor(Math.random() * salt.length));
	}
	salty = salty + salt.charAt(Math.floor(Math.random() * salt.length));
	}
	return salty;
	}

	function encrypt(){

	//load bar

	document.getElementById("loadbar").style.visibility = 'visible';


	var Ftype;
	if(FileType == 'video'){
	Ftype = 'video';
	}
	else{Ftype = 'image';}
	var parseLink = window.location.href + '/fileview.php?link=' + videoName + '.encrypted&key=' + key + '&type=' + Ftype;


		var reader = new FileReader();
			// Encrypt the file!
			reader.onload = function ed(e){

				// Use the CryptoJS library and the AES cypher to encrypt the 
				// contents of the file, held in e.target.result, with the password

				var encrypted = CryptoJS.AES.encrypt(videoData, key);
                if(videoData === null){
                    alert("filedata is null. error encountered, please try again.");
                }

                if(videoData == null){
                    alert("filedata is null. error encountered, please try again2.");
                }

                alert(videoData);
                alert(encrypted);
				extensionName = videoName + '.encrypted';
				passtoserver(encrypted);
				//uploadChunk(encrypted);

                //Show the link
                document.getElementById("loadbar").style.visibility = 'hidden';
	            document.getElementById('keyCode').value = parseLink;
	            document.getElementById('keyCode').setAttribute('size', parseLink.length + 3);
				

			};

			// This will encode the contents of the file into a data-uri.
			// It will trigger the onload handler above, with the result

			reader.readAsDataURL(Vfile);
			

	}


function passtoserver(data){

    var form_data = new FormData();                  // Creating object of FormData class
	form_data.append('filename', extensionName);
	form_data.append('filedata', data);

    var request = new XMLHttpRequest();
    request.open("POST", "http://udrugadignitas.hr/cryptovid/upload_file.php");
    request.send(form_data);
    request.status;


}



//chunk uploader - code borrowed from http://mylinuxtechcorner.blogspot.hr/2015/03/upload-large-files-on-web-using.html

    var chunk_size = 1*1024*1024; // 1Mbyte Chunk 
    var offset = 0;    
    var retry  = 0;


    function uploadChunk(data)
    {
         var upload_size = data.length;
         //formData.append("uploadchunkdata"   ,  evt.target.result );
         
         var file_data = data;
         var form_data = new FormData();                  // Creating object of FormData class
         form_data.append('filename', extensionName);
         form_data.append('filedata', data);
         
         
         $.ajax({
                type: 'post',
                  data: form_data,    
                  processData: false, 
                  contentType: false,
                  url:"upload_file.php",
                success: function(){
                    //offset += data.length;
                    readSlice(data);
                },
                error: function(){
                    if( ++retry >= 3 ) {
                            progress_label.html("Upload failed"); 
                    }
                    else {
                            retry = 0;
                            uploadSlice(data);
                    }
                }
            });
    }
    
    
    function readSlice(e)
    {
        var file = e;
          var reader = new FileReader();
          if( offset < e.length )
          {
            var blob = e.slice(offset, offset + chunk_size);
            reader.onload = readCallback;
            reader.readAsDataURL(blob);
        }
        else
        {
                    alert("upload complete");
        }
    }
    
           function readCallback(data) 
   {
        if (data.target.error == null) {
                  uploadChunk(data);
        } else {
            alert("File read error on disk");
            return;
        }
    }
    
     function uploadForm(e){
               e.preventDefault();
               offset = 0; 
             readSlice(e);
             alert("Starting");
             
      }    
    
    function onFilesSelected(e) {     
        submit_btn.attr('disabled', false);
    } 






