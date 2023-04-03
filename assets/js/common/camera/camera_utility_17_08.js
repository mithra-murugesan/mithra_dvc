var webcam, bmd, spriteCam, video, type; // webcam related variables
var overlay,context;

function webcam_preload() {
    game.load.script('webcam', './assets/js/common/camera/Webcam.js');

}

function webCamCreate() {
	

   // bmd = game.make.bitmapData(400, 300);	
	
    //webcam = game.plugins.add(Phaser.Plugin.Webcam);
	
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||  navigator.mediaDevices.getUserMedia || navigator.msGetUserMedia || navigator.mozGetUserMedia;

	/* this.context = null;
	this.stream = null;
    this.cameraAccess = true;

	//this.video = document.querySelector('video'); */

	video = document.createElement('video');
    video.setAttribute("id", "vid1");
    video.playsInline = true;
    video.autoplay = true;
    video.volume = 0.00000000001;   
}

function initWebCam() {
    spriteCam = bmd.addToWorld();
    //spriteCam.x = 500;
    spriteCam.x = x;
    spriteCam.y = y;
    spriteCam.anchor.setTo(0.5, 0.5);
    //spriteCam.scale.x *= -1;

    webcam.start(720, 1280, bmd.context);
    obj_list.push(spriteCam);
}

function initWebCamPos(x, y,scale) {



    if (window.innerHeight > window.innerWidth) {
        var ar = window.innerHeight / window.innerWidth;
        width = 650;
        height = 650;//450
        // width;
        // height;

    } else if (window.innerHeight < window.innerWidth) {
        var ar = window.innerWidth / window.innerHeight;
       width = 215;//225
        height = 160;

scale=0.35;
    }

    //x = 480;
    //y = game.world.centerY;
    if (Phaser.Device.android == true) {
        x;
        y;
        //   x = 785;
        // y = 258;
    } else {
        x = 780;
        y = 260;
    }

    bmd = game.make.bitmapData(width, height);
    spriteCam = bmd.addToWorld();
    spriteCam.x = x;
    spriteCam.y = y;



    //spriteCam.width = 600;
   // spriteCam.height = 400;
 spriteCam.width = 500;
    spriteCam.height = 520;//520

    console.log("success cam");


    spriteCam.anchor.setTo(0.5, 0.2);

      initOverlay(x, y, width, height,scale);
    bmd.context.translate(width, 0);
    bmd.context.scale(-scale,scale);

    webcam.start(108, 192, bmd.context);

    console.log("spriteCam : ", spriteCam);
    console.log("webcam : ", webcam);
    obj_list.push(spriteCam);
}
function initWebCamPos_welcome(x,y,scale)
{
  if (window.innerHeight > window.innerWidth) {
      var ar = window.innerHeight / window.innerWidth;
      width = 1500;
      height = 1500;
      // width;
      // height;

  } else if (window.innerHeight < window.innerWidth) {
      var ar = window.innerWidth / window.innerHeight;
      width = 200;
      height = 60;
scale=0.2;

  }

  //x = 480;
  //y = game.world.centerY;
  if (Phaser.Device.android == true) {
      x;
      y;
      //   x = 785;
      // y = 258;
  }
  else if(Phaser.Device.iOS == true)
  {
    x;
    y;
  }
   else {
      x = 400;
      y = 350;
  }

  bmd = game.make.bitmapData(width, height);
  spriteCam = bmd.addToWorld();
  spriteCam.x = x;
  spriteCam.y = y;



  spriteCam.width = 1500;
  spriteCam.height = 1500;
  console.log("success cam");


  spriteCam.anchor.setTo(0.5, 0.2);

      initOverlay(x, y, width, height,scale);
  bmd.context.translate(width, 0);
  bmd.context.scale(-scale,scale);

  webcam.start(108, 192, bmd.context);

  console.log("spriteCam : ", spriteCam);
  console.log("webcam : ", webcam);
  obj_list.push(spriteCam);
}
// function initWebCamPos_videoconsent(x, y,scale) {
//
//
//
//     if (window.innerHeight > window.innerWidth) {
//         var ar = window.innerHeight / window.innerWidth;
//         width = 1100;
//         height = 1500;
//         // width;
//         // height;
//
//     } else if (window.innerHeight < window.innerWidth) {
//         var ar = window.innerWidth / window.innerHeight;
//         width = 300;
//         height = 160;
// scale=0.2;
//     }
//
//     //x = 480;
//     //y = game.world.centerY;
//     if (Phaser.Device.android == true) {
//         x;
//         y;
//         //   x = 785;
//         // y = 258;
//     }
//     else if(Phaser.Device.iOS == true)
//     {
//       x;
//       y;
//     }
//      else {
//         x = 250;
//         y = 1150;
//     }
//
//     bmd = game.make.bitmapData(width, height);
//     spriteCam = bmd.addToWorld();
//     spriteCam.x = x;
//     spriteCam.y = y;
//
//
//
//     spriteCam.width = 1100;
//     spriteCam.height = 1500;
//     console.log("success cam");
//
//
//     spriteCam.anchor.setTo(0.5, 0.2);
//
//         initOverlay(x, y, width, height,scale);
//     bmd.context.translate(width, 0);
//     bmd.context.scale(-scale,scale);
//
//     webcam.start(108, 192, bmd.context);
//
//     console.log("spriteCam : ", spriteCam);
//     console.log("webcam : ", webcam);
//     obj_list.push(spriteCam);
// }
function initWebCamPos_videoconsent(x, y,scale) {

    console.log('Device = ',Phaser.Device);

    if (window.innerHeight > window.innerWidth) {
        var ar = window.innerHeight / window.innerWidth;
        width = 1100;
        height = 1500;

    } else if (window.innerHeight < window.innerWidth) {
        var ar = window.innerWidth / window.innerHeight;
        width = 800;
        height = 960;
		scale=1.2;
    }


    if (Phaser.Device.android == true) {
       console.log('android');
	   x =360;
        y = 1200;
    }
    else if(Phaser.Device.iOS == true)
    {
		//console.log('ios');
		    x =350;//530
        y = 1060;//1030
		scale=1.5;
    }
	else if(Phaser.Device.windows == true){
        console.log('windows');
		x =530;
        y = 1030;
    }

	//x=0;
	//y=1150;

    bmd = game.make.bitmapData(width, height);
    spriteCam = bmd.addToWorld();
    spriteCam.x = x;
    spriteCam.y = y;
    spriteCam.width = width;
    spriteCam.height = height;
    console.log("success cam");


    spriteCam.anchor.setTo(0.5, 0.2);

    initOverlay(x, y, width, height,scale);
    bmd.context.translate(width, 0);
    bmd.context.scale(-scale,scale);

    if(Phaser.Device.windows==true)
	{
		webcam.start(64, 36, bmd.context);
	}
	else
	{
		webcam.start(108, 192, bmd.context);
	}

    console.log("spriteCam : ", spriteCam);
    console.log("webcam : ", webcam);
    obj_list.push(spriteCam);
}

function initWebCamPos_welcome(x, y,scale) {



    if (window.innerHeight > window.innerWidth) {
        var ar = window.innerHeight / window.innerWidth;
        width = 1100;
        height = 1000;
        // width;
        // height;

    } else if (window.innerHeight < window.innerWidth) {
        var ar = window.innerWidth / window.innerHeight;
        width = 200;
        height = 60;
scale=0.2;

    }

    //x = 480;
    //y = game.world.centerY;
    if (Phaser.Device.android == true) {
        x;
        y;
        //   x = 785;
        // y = 258;
    }
    else if(Phaser.Device.iOS == true)
    {
      x;
      y;
    }
     else {
        x = 400;
        y = 350;
    }

    bmd = game.make.bitmapData(width, height);
    spriteCam = bmd.addToWorld();
    spriteCam.x = x;
    spriteCam.y = y;



    spriteCam.width = 1100;
    spriteCam.height = 1000;
    console.log("success cam");


    spriteCam.anchor.setTo(0.5, 0.2);

        initOverlay(x, y, width, height,scale);
    bmd.context.translate(width, 0);
    bmd.context.scale(-scale,scale);

    webcam.start(108, 192, bmd.context);

    console.log("spriteCam : ", spriteCam);
    console.log("webcam : ", webcam);
    obj_list.push(spriteCam);
}

function initCamOnly()
{
	var width = 800;
	var height = 800;
	
    navigator.getUserMedia( { video: { mandatory: {minWidth: width, minHeight: height } } , audio:true}, connectCallback.bind(this), errorCallback.bind(this));
}

var videoStream=null;

function connectCallback(stream)
{
	console.log(stream);
	videoStream = stream;
	video.srcObject = stream;
	
	initWebCam_new();
}

function errorCallback(stream)
{
	
}

function initWebCam_new()
{
	var x = 540;
	var y = 550;
	var width = 800;
	var height = 800;
	
	var canvas = game.add.rexCanvas(x, y, width, height);
	canvas.fill("#FF0000");
	
    context = canvas.getContext();
	video.play();


	if (videoStream)
	{
		console.log(videoStream);
		console.log(video);
		
		context.drawImage(video, 0, 0);
	}
	
}

function updateVideoFrame()
{
	if (videoStream)
	{
		//console.log(videoStream);
		//console.log(video);
		
		context.drawImage(video, 0, 0);
	}
}

function stopCam() {
    webcam.stop();
}

function pauseCam(flag) {

}

function getImgDataURL() {
    return webcam.imgCapture();
}
function getImgDataURL1() {
    return imgCapture();
}

function camAccessStatus() {
    var camStatus = webcam.camStatus();
    if (camStatus) {
        console.log("Camera is accessible");
        return true;
    } else {
        console.log("Camera is not accessible");
        return false;
    }
}

function videoRecordStart() {
    webcam.videoRecord();
}

function videoRecordStop() {
    webcam.videoRecordStop();
    var vBlob = webcam.videoRecordGetBlob();
    return (vBlob) ? vBlob : null;
}

function videoRecordAutoStop(nxt_scrn, vLoadScrn) {
    var time_milisec = 1000 * 20;
    var d = new Date().getTime();
    var video_file_name = window.p_name + "_" + window.product_slug + "_" + d;
    video_file_name = GetFriendlyName(video_file_name);

    webcam.videoRecordAutoStop(time_milisec, video_file_name, nxt_scrn, vLoadScrn);
}

function initOverlay(x, y, width, height,scale) {
    overlay = game.make.bitmapData(width, height);
    var overlayImg = overlay.addToWorld();
    overlayImg.x = x;
    overlayImg.y = y;
    overlay .context.scale(-1.6,1.6);
    overlayImg.anchor.setTo(0.5, 0.2);
    obj_list.push(overlayImg);

    var context = overlay.canvas.getContext('2d');
    context.globalCompositeOperation = "destination-over";
    context.globalCompositeOperation = "source-over";
}
