<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://fedo-uw-prod.azurewebsites.net/image_processing",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => "{\r\n  \"url\": \"https://dev.anoorcloud.in/authentisure/uploads/consentPhoto.jpeg\"\r\n}\r\n",
  CURLOPT_HTTPHEADER => array(
    "cache-control: no-cache",
    "content-type: application/json",
    "postman-token: 690da609-10ed-b5fd-a0f2-d73679d0a37b"
  ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
  return $response;
}