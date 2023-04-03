<?php
ini_set('display_errors',1);
error_reporting(E_ALL);
//echo($_POST['fname']);

//$fname=$_POST['fname'];
//$data=$_POST['data'];

//$fp = fopen('test.webm', "wb");

//fwrite($fp, $data);
//fclose($fp);


// upload directory
$filePath = '/var/www/dev.anoorcloud.in/public_html/nlg_demo/uploads/'.$_POST['fname'];
//$filePath = $_POST['fname'];

// path to ~/tmp
echo $_FILES['data']['size'];
$tempName = $_FILES['data']['tmp_name'];

// move file from ~/tmp to "uploads" directory
if (!move_uploaded_file($tempName, $filePath)) {
    // failure report
    echo 'Problem saving file: '.$tempName;
    die();
}

// success report
echo 'success';

?>
