
var video;
var videoStream=null;
var pri_video_width = 700;
var pri_video_height = 700;

var pri_canvas_x = 530;
var pri_canvas_y = 1150;
var pri_canvas_width = 760;
var pri_canvas_height = 650;
var webcam_canvas;
var overlay_canvas;
var context;

var videoRecorder;
var audioRecorder;
var audioblob;

function webCamCreate() {  
	
	//Checks for compatibiltiy
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||  navigator.mediaDevices.getUserMedia || navigator.msGetUserMedia || navigator.mozGetUserMedia;

	
	//Creates Video element
	video = document.createElement('video');
    video.setAttribute("id", "vid1");
    video.playsInline = true;
    video.autoplay = true;
    video.volume = 0.00000000001;   
}


function initCamOnly()
{	
	var width = 760;
	var height = 650;

	pri_canvas_height=height;
	pri_canvas_width=width;

    navigator.getUserMedia({
    video: {
        mandatory: {
            minWidth: pri_video_width,
            minHeight: pri_video_height,					
			maxAspectRatio:1,			
        }
    },
    audio: true
	}, connectCallback.bind(this), errorCallback.bind(this));

}

function connectCallback(stream)
{
	console.log(stream);
	videoStream = stream;
	
	if(video==null)
	{
		video = document.createElement('video');
		video.setAttribute("id", "vid1");
		video.playsInline = true;
		video.autoplay = true;
		video.volume = 0.00000000001;   
	}
	video.srcObject = stream;
	
	init_OnScreenFeed();
	
	//Added for Authentisure - Must remove for others
	//changeInstructions('face','Please ensure that your face is in the box till your face is detected');
}

function errorCallback(stream)
{
	
}

function init_OnScreenFeed()
{	
	
	webcam_canvas = game.add.rexCanvas(pri_canvas_x, pri_canvas_y, pri_canvas_width, pri_canvas_height);	
	webcam_canvas.fill("#FFFFFF");
	
	console.log(webcam_canvas);
	
    context = webcam_canvas.getContext();
	video.play();


	if (videoStream)
	{
		console.log(videoStream);
		console.log(video);
		
		context.drawImage(video, 0, 0,pri_canvas_width, pri_canvas_height);
	}
	
}

//This is called in Update
function updateVideoFrame()
{
	if (videoStream)
	{		
		context.drawImage(video, 0, 0,pri_canvas_width, pri_canvas_height);
	}
}

function stopCameraFeed()
{
	if (videoStream)
	{
        videoStream.getTracks().forEach(function (track) { track.stop(); });
		videoStream = null;
		console.log("Camera is stopped!");
	}
}

function createOverlayCanvas()
{		
	
	overlay_canvas = game.add.rexCanvas(pri_canvas_x, pri_canvas_y, pri_canvas_width, pri_canvas_height);
	overlay_canvas.depth=2;
}

function clearOverlayCanvas()
{
	overlay_canvas.clear();
	overlay_canvas.destroy();
}

function miniCam()
{
	var width = 400;
	var height = 380;

	pri_canvas_height=height;
	pri_canvas_width=width;
	
	navigator.getUserMedia({
    video: {
        mandatory: {
            minWidth: width,
            minHeight: height,					
			maxAspectRatio:1,			
        }
    },
    audio: false
	}, function(stream){
		
		videoStream = stream;
		video.srcObject = stream;
	
		var x = 840;
		var y = 420;	
		
		webcam_canvas = game.add.rexCanvas(x, y, width, height);	
		webcam_canvas.fill("#FFFFFF");
		
		console.log(webcam_canvas);
		
		context = webcam_canvas.getContext();
		video.play();
		
	}, errorCallback.bind(this));		
	
}

function capturePhoto()
{
	console.log('CAMERA UTIL : Capture Photo');
	var imgCanvas = document.createElement("canvas");
    imgCanvas.width = video.videoWidth;
    imgCanvas.height = video.videoHeight;
    imgCanvas.getContext('2d')
		.drawImage(video, 0, 0, imgCanvas.width, imgCanvas.height);	
	

    return (imgCanvas.toDataURL('image/jpeg',0.80))? imgCanvas.toDataURL('image/jpeg',0.80) : null;
}

function VideoRecord_Start()
{
	videoRecorder = RecordRTC(videoStream, {
        type: 'video'
    });

    videoRecorder.startRecording();
    videoRecorder.camera = videoStream;
}

function VideoRecord_Stop()
{	
	 
	blob = videoRecorder.stopRecording(
		function(){
			var blob = videoRecorder.getBlob();
			videoRecorder.camera.stop();	

			uploadConsentVideo(blob);		
	});	
	
}

function AudioRecord_Start()
{
	audioRecorder = RecordRTC(videoStream, {
        type: 'audio',
        mimeType: 'audio/wav',
        audio: true,
        recorderType: RecordRTC.StereoAudioRecorder
    });

    audioRecorder.startRecording();
    audioRecorder.camera = videoStream;
}

function AudioRecord_Stop()
{
	audioblob = audioRecorder.stopRecording(
		function(){
			audioblob = audioRecorder.getBlob();
			audioRecorder.camera.stop();	
			console.log(audioblob);
			
			uploadConsentAudio(audioblob);
			//init_quantics(audioblob);
			//uploadConsentVideo(audioblob);		
	});	
}



