<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://asr.gnani.ai/upload",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  $args['audio_file'] = new CurlFile('/var/www/dev.anoorcloud.in/public_html/authentisure/uploads/recording.wav', 'audio/wav'),
  CURLOPT_POSTFIELDS => $args,
  CURLOPT_HTTPHEADER => array(
    "accesskey: c5785d4b9ffa5439be3af683e6c4473f668d179753d6b761af925113c594f792",
    "audioformat: wav",
    "cache-control: no-cache",
    "content-type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
    "encoding: pcm16",
    "lang: eng_IN",
    "org: anoorcloud",
    "postman-token: a0e208f1-a1cd-5d50-cf95-1b171163bd8f",
    "product: apiservice",
    "token: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyX25hbWUiOiJiJ2dVaGQ5VHhwblFwcG5aVkFmN2N2OWw5NjYrSlJBMk90eXB2TFd2U0dsaG9hNDFGbWNsRC9Bd1ZkcW9ITFhYWmgnIiwia2V5X2RhdGUiOiIyMDIwLTA4LTEwIn0.mIMLZM2L0Dm1JXk1tmwbMoPdFR6boOC3M2SI8L23DD3_SUItYoPAhz5QLix6GLZ5_jWI_FIxJdhFimrLQhbasA"
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