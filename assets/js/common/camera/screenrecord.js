
console.log('Inside Screenrecord');

const mediaSource = new MediaSource();
mediaSource.addEventListener('sourceopen', handleSourceOpen, false);
let mediaRecorder;
let recordedBlobs;
let sourceBuffer;

const canvas = document.querySelector('canvas');

console.log("SCREEN RECORD CANVAS = ",canvas);

const stream = canvas.captureStream(); // frames per second
console.log('Started stream capture from canvas element: ', stream);

//startRecording();

function handleSourceOpen(event) {
  console.log('MediaSource opened');
  sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8"');
  console.log('Source buffer: ', sourceBuffer);
}

function handleDataAvailable(event) {
  if (event.data && event.data.size > 0) {
    recordedBlobs.push(event.data);
  }
}
function uploadScreen(fileName){

	const blob = new Blob(recordedBlobs, {type: 'video/webm'});

	console.log('Uploading.. ',blob);

	var url = './assets/scripts/upload.php';

	var fd = new FormData();
	fd.append('fname', fileName+'.webm');
	fd.append('data', blob);

	$.ajax({
		type: 'POST',
		url: url,
		data: fd,
		processData: false,
		contentType: false
	}).done(function(data) {
		   console.log(data);
	});

}


function handleStop(event) {
  console.log('Recorder stopped: ', event);
  const superBuffer = new Blob(recordedBlobs, {type: 'video/webm'});
  //video.src = window.URL.createObjectURL(superBuffer);
}

function startRecording() {
  let options = {mimeType: 'video/webm'};
  recordedBlobs = [];
  try {
    mediaRecorder = new MediaRecorder(stream, options);
  } catch (e0) {
    console.log('Unable to create MediaRecorder with options Object: ', e0);
    try {
      options = {mimeType: 'video/webm,codecs=vp9'};
      mediaRecorder = new MediaRecorder(stream, options);
    } catch (e1) {
      console.log('Unable to create MediaRecorder with options Object: ', e1);
      try {
        options = 'video/vp8'; // Chrome 47
        mediaRecorder = new MediaRecorder(stream, options);
      } catch (e2) {
        alert('MediaRecorder is not supported by this browser.\n\n' +
          'Try Firefox 29 or later, or Chrome 47 or later, ' +
          'with Enable experimental Web Platform features enabled from chrome://flags.');
        console.error('Exception while creating MediaRecorder:', e2);
        return;
      }
    }
  }
  console.log('Created MediaRecorder', mediaRecorder, 'with options', options);

  mediaRecorder.onstop = handleStop;
  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.start(100); // collect 100ms of data
  console.log('MediaRecorder started', mediaRecorder);
}

function stopRecording() {
  mediaRecorder.stop();
  console.log('Recorded Blobs: ', recordedBlobs);

}


function downloadScreen(fileName) {
  const blob = new Blob(recordedBlobs, {type: 'video/webm'});
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = fileName+'.webm';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 100);
}
