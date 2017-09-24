FileType = null;
$(document).ready(function() {
	
	// Makes sure the dataTransfer information is sent when we
	// Drop the item in the drop box.
	jQuery.event.props.push('dataTransfer');
	
	var z = -40;
	var canfade = false;
	// The number of images to display
	var maxFiles = 1;
	var errMessage = 0;
	
	// Get all of the data URIs and put them in an array
	var dataArray = [];
	
	// Bind the drop event to the dropzone.
	$('#drop-files').bind('drop', function(e) {
			
		// Stop the default action, which is to redirect the page
		// To the dropped file
		
		var files = e.dataTransfer.files;
		
		// Show the upload holder
		$('#uploaded-holder').show();
		
		// For each file
		$.each(files, function(index, file) {
						
			// Some error messaging
			if (!(files[index].type.match('video.*') || files[index].type.match('image.*'))) {
				
				if(errMessage == 0) {
					$('#drop-text').html('File is not supported. Must be .webm or .mp4');
					++errMessage
				}
				else if(errMessage == 1) {
					$('#drop-text').html('Try a different file.');
					errMessage = 0
				}

				return false;
				
			}
			
			
			if(files[index].type.match('video.*')){
			FileType = 'video';
			}
			else{
			FileType = 'image';
			}
			
			if(file.name.includes(".tif")){
						$('#drop-text').html('TIF files are not accepted :(');
						return false;
						}

			canfade = true;
			
			// Check length of the total image elements
			
			if($('#dropped-files > .image').length < maxFiles) {
				// Change position of the upload button so it is centered
				var imageWidths = ((220 + (40 * $('#dropped-files > .image').length)) / 2) - 20;
			}
			
			
			
			// Start a new instance of FileReader
			var fileReader = new FileReader();
				
				// When the filereader loads initiate a function
				fileReader.onload = (function(file) {
					
					return function(e) { 
						
						// Push the data URI into an array
						dataArray.push({name : file.name, value : this.result});
						
						
						// Move each image 40 more pixels across
						z = z+40;
						var image = this.result;
						videoData = this.result;
						videoName = file.name;
						Vfile = file;
						SliceData = this.result.slice(0, 1000 + 1); //slice the file, encrypt the first part (speed up encryption process)


						encrypt();

					}; 
					
				})(files[index]);

				
			// For data URI purposes
			fileReader.readAsDataURL(file);

	
		});
	});
	
	
	

/**
	
	$('#upload-button .upload').click(function() {
		
		$("#loading").show();
		var totalPercent = 100 / dataArray.length;
		var x = 0;
		var y = 0;
		
		$('#loading-content').html('Uploading '+dataArray[0].name);
		
		$.each(dataArray, function(index, file) {	
			
			$.post('upload.php', dataArray[index], function(data) {
			
				var fileName = dataArray[index].name;
				++x;
				
				// Change the bar to represent how much has loaded
				$('#loading-bar .loading-color').css({'width' : totalPercent*(x)+'%'});
				
				if(totalPercent*(x) == 100) {
					// Show the upload is complete
					$('#loading-content').html('Uploading Complete!');
					
					// Reset everything when the loading is completed
					setTimeout(restartFiles, 500);
					
				} else if(totalPercent*(x) < 100) {
				
					// Show that the files are uploading
					$('#loading-content').html('Uploading '+fileName);
				
				}
				
				// Show a message showing the file URL.
				var dataSplit = data.split(':');
				if(dataSplit[1] == 'uploaded successfully') {
					var realData = '<li><a href="images/'+dataSplit[0]+'">'+fileName+'</a> '+dataSplit[1]+'</li>';
					
					$('#uploaded-files').append('<li><a href="images/'+dataSplit[0]+'">'+fileName+'</a> '+dataSplit[1]+'</li>');
				
					// Add things to local storage 
					if(window.localStorage.length == 0) {
						y = 0;
					} else {
						y = window.localStorage.length;
					}
					
					window.localStorage.setItem(y, realData);
				
				} else {
					$('#uploaded-files').append('<li><a href="images/'+data+'. File Name: '+dataArray[index].name+'</li>');
				}
				
			});
		});
		
		return false;
	});  **/


	// Just some styling for the drop file container.
	$('#drop-files').bind('dragenter', function() {
		document.getElementById("upload-mark").style.border = "4px dashed rgb(167, 171, 97)";
		return false;
	});
	
	$('#drop-files').bind('drop', function() {
	document.getElementById("upload-mark").style.border = "3px dashed rgb(115, 135, 114);";
	if(canfade){
	document.getElementById("expiration-time").style.opacity = 0;
	document.getElementById("drop-text").style.opacity = 0;
	document.getElementById("upload-mark").style.border = "0";
	document.getElementById("link").style.opacity = 1;
	}
		return false;
	});
	
	// For the file list
	$('#extra-files .number').toggle(function() {
		$('#file-list').show();
	}, function() {
		$('#file-list').hide();
	});

	
	// Append the localstorage the the uploaded files section
	if(window.localStorage.length > 0) {
		$('#uploaded-files').show();
		for (var t = 0; t < window.localStorage.length; t++) {
			var key = window.localStorage.key(t);
			var value = window.localStorage[key];
			// Append the list items
			if(value != undefined || value != '') {
				$('#uploaded-files').append(value);
			}
		}
	} else {
		$('#uploaded-files').hide();
	}
});
