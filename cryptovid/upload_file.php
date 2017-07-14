<?php


$filedata = $_POST['filedata'];
$filename = $_POST['filename'];
$path = $_SERVER['DOCUMENT_ROOT'] . '/../uploads/' . $filename;

echo $filedata;


file_put_contents ( $path , "Hi dad");

if (empty($filedata)) {
    echo "no file data";
    echo $filedata;
    exit;
}

if(file_put_contents ( $path , $filedata)){
    echo "contents saved";
    
}else{
    echo $filename;
    echo $path;
    echo "contents NOOOOT saved";
};



try{
file_put_contents ( $path , $filedata);
}
catch(Exception $e){
    echo "Exception";
    echo $e;
}



?>