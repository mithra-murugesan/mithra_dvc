var webcam, bmd, spriteCam, video, type; // webcam related variables
var overlay;

function webcam_preload()
{
    game.load.script('webcam', './assets/js/Webcam.js');
}

function webCamCreate()
{
	bmd = game.make.bitmapData(400, 300);
	webcam = game.plugins.add(Phaser.Plugin.Webcam);
}

function initWebCam()
{
    spriteCam = bmd.addToWorld();
    spriteCam.x = 400;
    spriteCam.y = 220;
    spriteCam.anchor.setTo(0.5,0.5);
    //spriteCam.scale.x *= -1;

	webcam.start(1280, 720, bmd.context);
	obj_list.push(spriteCam);
}

function initWebCamPos(x,y,width,height)
{
	if(window.innerHeight > window.innerWidth)
	{
		var ar = window.innerHeight / window.innerWidth;	
		width = 500;
		//height = width * ar;
		height = width * ar;
		
	}
	else if(window.innerHeight < window.innerWidth)
	{
		var ar = window.innerWidth / window.innerHeight;	
		height = 600;
		width = height * ar;
		//width = 400;
	}
		
	x = game.world.centerX;
	y = game.world.centerY;
	
    bmd = game.make.bitmapData(width, height);
    spriteCam = bmd.addToWorld();
    spriteCam.x = x;
    spriteCam.y = y;
    spriteCam.anchor.setTo(0.5,0.2);
    //spriteCam.scale.x *= -1;
	initOverlay(x,y,width,height);	
    
	//bmd.context.save(); // Save the current state
	//bmd.context.translate(bmd.context.width/2,bmd.context.height/2);
    //bmd.context.scale(-1, 1); // Set scale to flip the image
    //this.context.drawImage(this.video, width*-1, 0, width, height); // draw the image
    //bmd.context.restore(); // Restore the last saved state
	
	bmd.context.translate(width, 0);
	bmd.context.scale(-1, 1);
   
    webcam.start(width, height, bmd.context);

    console.log("spriteCam : ",spriteCam);
    console.log("webcam : ",webcam);
    obj_list.push(spriteCam);
}

function initCamOnly()
{
    console.log("initCamOnly fn : start");
    var imgCanvasReg = document.createElement("canvas");
    var img_context = imgCanvasReg.getContext('2d');
	
	if(window.innerHeight > window.innerWidth)
	{
		webcam.start(720, 1280, img_context);
		
	}
	else if(window.innerHeight < window.innerWidth)
	{
		webcam.start(1280, 720, img_context);
	}
    
}


function stopCam() {
		webcam.stop();
}

function  pauseCam(flag)
{

}

function getImgDataURL()
{
	return webcam.imgCapture();
}

function camAccessStatus()
{
    var camStatus = webcam.camStatus();
    if(camStatus)
    {
        console.log("Camera is accessible");
        return true;
    }
    else
    {
        console.log("Camera is not accessible");
        return false;
    }
}

function videoRecordStart(){
    webcam.videoRecord();
}

function videoRecordStop(){
    webcam.videoRecordStop();
    var vBlob = webcam.videoRecordGetBlob();
    return (vBlob)? vBlob : null;
}

function videoRecordAutoStop(nxt_scrn,vLoadScrn)
{
    var time_milisec = 1000*20;
    var d = new Date().getTime();
    var video_file_name = window.p_name+"_"+window.product_slug+"_"+d;
    video_file_name = GetFriendlyName(video_file_name);

    webcam.videoRecordAutoStop(time_milisec,video_file_name,nxt_scrn,vLoadScrn);
}

function initOverlay(x,y,width,height)
{
	overlay = game.make.bitmapData(width, height);
    var overlayImg = overlay.addToWorld();
    overlayImg.x = x;
    overlayImg.y = y;
    overlayImg.anchor.setTo(0.5,0.2);
	obj_list.push(overlayImg);
	
	var context = overlay.canvas.getContext('2d');
	context.globalCompositeOperation = "destination-over";
	context.globalCompositeOperation = "source-over";
}