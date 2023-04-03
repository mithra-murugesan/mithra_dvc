/**
* Provides access to the Webcam (if available)
*/
Webcam = function (game, parent) {

	call(this, game, parent);

	/* if (!game.device.getUserMedia)
	{
		return false;
	} */

	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||  navigator.mediaDevices.getUserMedia || navigator.msGetUserMedia || navigator.mozGetUserMedia;

	this.context = null;
	this.stream = null;
    this.cameraAccess = true;

	//this.video = document.querySelector('video');

	this.video = document.createElement('video');
    this.video.setAttribute("id", "vid1");
    this.video.playsInline = true;
    this.video.autoplay = true;
    this.video.volume = 0.00000000001;
    this.recorder = null;





};

Webcam.prototype = Object.create(prototype);
Webcam.prototype.constructor = Webcam;

Webcam.prototype.start = function (width, height, context) {

console.log('Webcam start', width, height);

	this.context = context;
//	this.video.x=x;
	//this.video.y=y;
    this.video.height = height;
    this.video.width = width;




	if (!this.stream)
	{
	    if(window.app_view)
        {
            navigator.getUserMedia( { video: { mandatory: {minWidth: width, minHeight: height } } , audio:true}, this.connectCallback.bind(this), this.errorCallback.bind(this));
        }
        else
        {
            navigator.getUserMedia( { video: { mandatory: { minWidth: width, minHeight: height } }, audio:true }, this.connectCallback.bind(this), this.errorCallback.bind(this));
        }
	}

};

Webcam.prototype.stop = function () {

	if (this.stream)
	{
        this.stream.getTracks().forEach(function (track) { track.stop(); });
		this.stream = null;
		console.log("Camera is stopped!");
	}
};

Webcam.prototype.connectCallback = function (stream) {

	this.stream = stream;
    this.cameraAccess = true;

    this.video.srcObject = this.stream;

};

Webcam.prototype.errorCallback = function (e) {

	console.log('Video Stream rejected', e);
    this.cameraAccess = false;

};

Webcam.prototype.grab = function (context, x, y) {

	if (this.stream)
	{
		//ctx.translate(canvas.width, 0);
		context.drawImage(this.video, x, y);
	}

};

Webcam.prototype.update = function () {

	if (this.stream)
	{
		this.context.drawImage(this.video, 0, 0);
	}

};

/**
* @name Webcam#active
* @property {boolean} active - Is this Webcam plugin capturing a video stream or not?
* @readonly
*/
Object.defineProperty(Webcam.prototype, "active", {

    get: function() {
        return (this.stream);
    }

});

/*
	Custom Codes
 */
Webcam.prototype.imgCapture = function () {

    console.log('Image Capture');
    // var imgCanvas = document.createElement("canvas");
    // imgCanvas.width = this.video.videoWidth;
    // imgCanvas.height = this.video.videoHeight;
    // imgCanvas.getContext('2d')
		// .drawImage(this.video, 0, 0, imgCanvas.width, imgCanvas.height);
		//
    // return (imgCanvas.toDataURL('image/jpeg',0.80))? imgCanvas.toDataURL('image/jpeg',0.80) : null;

		// console.log('Image Capture');
		var imgCanvas = document.createElement("canvas");
		imgCanvas.width = this.video.videoWidth;
		imgCanvas.height = this.video.videoHeight;
		var context=imgCanvas.getContext('2d');
		context.translate(1080, 0);
    context.scale(-1, 1);
		context.drawImage(this.video, 0, 0, imgCanvas.width, imgCanvas.height);

		return (imgCanvas.toDataURL('image/jpeg',0.80))? imgCanvas.toDataURL('image/jpeg',0.80) : null;
};

Webcam.prototype.camStatus = function () {

    console.log('Camera Status');

    return this.cameraAccess;
};

/*
Record Functions
 */

Webcam.prototype.videoRecord = function () {

    this.video.srcObject = this.stream;
    this.video.muted = "muted";
    this.video.play();

    this.recorder = RecordRTC(this.stream, {
        type: 'video'
    });

    this.recorder.startRecording();
    this.recorder.camera = this.stream;
};

Webcam.prototype.videoRecordStop = function () {
    this.recorder.stopRecording(this.videoRecordStopCallback);
};

Webcam.prototype.videoRecordStopCallback= function() {
    this.recorder.camera.stop();
};

Webcam.prototype.videoRecordGetBlob= function() {
    return this.recorder.getBlob();
};

Webcam.prototype.videoRecordAutoStop = function (video_timer,video_file_name,nxt_scrn,vLoadScrn) {

    this.video.srcObject = this.stream;
    this.video.muted = "muted";
    this.video.play();

    this.recorder = RecordRTC(this.stream, {
        type: 'video'
    });

    this.recorder.setRecordingDuration(video_timer).onRecordingStopped(function() {
        var blob = this.getBlob();
        //download(blob, video_file_name, "video/mp4");
        saveVideoRecord(blob,nxt_scrn);
        // this.camera.stop();
        onVideoRecordStop(vLoadScrn);
    });

    this.recorder.camera = this.stream;
    this.recorder.startRecording();

};
