/*
 Main KFD Controller
 */

// Environment
var PROD_ENV = true;
var LOADER_SCREEN = true;

var w1, w2, w3, w4, w5, s1, a1;
var divId = "outer_div";

// Phaser Initialize
var XRes = 1080,
    YRes = 1920;
var game_canvas_id = "phaser-canvas";
var StartX = -1000,
    count = 0,
    SfxIndex = 0,
    offset = 0,
    sfx_offset = 0,
    cur_scr = 0,
    currentTween, currentSound, currentTimer, loaderText;


var config = {
    parent: divId,
    dom: {
        createContainer: true
    },
    type: Phaser.CANVAS,
    width: XRes,
    height: YRes,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    audio: {
        disableWebAudio: false
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
};

var game = new Phaser.Game(config);


var obj_list = new Array();
var obj_but_list = new Array();
var obj_text_list = new Array();
var obj_input_list = new Array();
var text_group, input_group, cust_group, top_group1, top_group2, top_group3, top_group4, top_group5, red_dot_group;
var screen_list = [];
var cur_sfx_list = new Array();
var events_list = [];
var lang = 'eng';
var sysLang = "eng";
var sysFlow = "normal";
var START_SCREEN = 0;
var load_scrn = START_SCREEN;


var translitLangArr = {
    "eng": "english",
    "tam": "tamil",
    "hin": "hindi",
    "tel": "telugu",
    "mal": "malayalam",
    "kan": "kannada",
    "ben": "bengali",
    "mar": "marathi",
    "guj": "gujarati",
    "pun": "punjabi",
    "ori": "oriya",
    "maw": "marwari",
    "ass": "assamese",
    "miz": "mizo"
};
var fontFamilyLangArr = {
    "eng": "Uniform",
    "tam": "Tamil",
    "hin": "Hind",
    "tel": "Telugu",
    "mal": "malayalam",
    "kan": "kannada",
    "ben": "bengali",
    "mar": "marathi",
    "guj": "gujarati",
    "pun": "punjabi",
    "ori": "oriya",
    "maw": "marwari",
    "ass": "assamese",
    "miz": "Calibri",
    "ind": "Glacial Indifference"
};
var numberSystemLangArr = {
    "eng": "common",
    "tam": "common",
    "hin": "Hind",
    "tel": "common",
    "mal": "Hind",
    "kan": "common",
    "ben": "common",
    "mar": "common",
    "guj": "common",
    "pun": "common",
    "ori": "common",
    "maw": "common",
    "ass": "common",
    "miz": "common"
};
var choosenLangArr = {
    "eng": "English",
    "tam": "Tamil",
    "hin": "Hindi",
    "tel": "Telugu",
    "mal": "Malayalam",
    "kan": "Kannada",
    "ben": "bengali",
    "mar": "marathi",
    "guj": "gujarati",
    "pun": "punjabi",
    "oriya": "ori",
    "marwari": "maw",
    "assamese": "ass",
    "mizo": "miz"
};


// Default for camera
var webcamtext;
var camera_record_status = false;

// Default for SMS OTP
var smsOTPText;
var smsOTP_btn_status = false;
var smsOTPCur = 'M@yjo$';
var smsOTPOk = false;
var smsOTPValidTxt;
var smsOTPValid_btn_status = false;

// Default for rest load
var restLoadText;
var restLoadStatus = false;
var restLoadString;

// Default Face Detect
var intervalFaceDetectCam;
var faceDetectStatus = false;
var faceDetectText;
var faceDStr = '',
    faceDNStr = '';
var camera_btn_status = false;

// Input Null Check
var inputNullStr = '';
var inputNullTxt;
var inputNullTxt1;

var edit_btn_status = false;

// Default Light Sensor
var lightcamtext;

// Personal Details - Check Box
var check_status = {
    'name': true,
    'email_id': true,
    'address': true,
    'dob': true,
    'phone_no': true
};

// Repeatedly Captured Photo Image
var cap_photo_img_append = false;
var cap_consent_img_append = false;
var cap_captured_img_append = false;
var cap_screen_img_append = false;

// Screen Name
var cur_screen_name;

// AutoLoad Screen
var auto_load_enable = true;
var auto_load_scrn_no = 3;

// Camera Error
var cameraErrorPageStatus = true;
var cameraErrorPageNo = 5;
var videoLoadPageNo = 20;

// Photo Load
var imgLoadPageNo = 0;
var imgLoadEnable = false;
var imgRequest = 0;
var intervalImgRequest;
var intervalImgCount = 0;

// Disagreement Variables
var disagreement_status = false;
var thankDisPageNo = 0;
var thankNorPageNo = 0;



// Default Font Values
var dbg_color = '#ffffff';
var df_color = '#000000';
var df_size = 27;
var df_weight = 'normal';
var df_align = 'center';
var df_family = 'Glacial Indifference';
var df_boundsAlignH = 'left';
var df_wordWrap = false;
var df_wordWrapWidth = 1000;

// Default Input Field Values
var di_size = 14;
var di_fill = '#3b3a3a';
var di_weight = 'normal';
var di_width = 150;
var di_height = 90;
var di_padding = 0;
var di_placeHolder = 'Enter value ...';
var di_backgroundColor = '#ffffff';
var di_placeHolderColor = '#3b3a3a';
var di_cursorColor = '#3b3a3a';

//alert(window.res_params.flow_data.Application_Number);
var facedetect_1, facedetect_2, facedetect_3, ques_text, y, n;

var connection;
var type, nettype, netrtt, netdown;

window.q1 = "";
window.q2 = "";
window.q3 = "";
window.q4 = "";
window.q5 = "";
window.q6 = "";
window.q7 = "";
window.q8 = "";
window.q9 = "";


// Initially Pre-load All Assets
function loadAssets() {
    (typeof commonAssets === 'function') ? commonAssets(): '';
    (typeof customAssets === 'function') ? customAssets(): '';
}


/*
    Loader Module
 */

function loaderScreenInit() {
    game.cameras.main.backgroundColor = dbg_color;

    loaderText = game.add.text(game.cameras.main.centerX, game.cameras.main.centerY, '', {
        fill: df_color
    });

    //console.log(loaderText);
    loaderText.setOrigin(0.5, 0.5);
    text_group.add(loaderText);

    loadAssets();
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.pageAlignVertically = true;
    this.game.scale.refresh();


    game.load.on('progress', loadStart);

    game.load.on('fileprogress', fileComplete);

    game.load.on('complete', loadComplete);

    game.load.start();
}

/*
Load Rest Assets
 */

function loadRestAssetStart() {
    restLoadStatus = true;
    if (sysLang == "eng") {
        restLoadString = "Loading assets...";
    } else if (sysLang == "ind") {
        restLoadString = "memuat aset ...";
    }

    restLoadString = transliterateText(restLoadString, translitLangArr[sysLang]);

    /* restLoadText = game.add.text(XRes/2, YRes/2, restLoadString, {
        font: fontFamilyLangArr[sysLang],
        fontSize: "70px",
        fontWeight: "bold",
        fill: "#FFFFFF",
        align: "center"
    });

    restLoadText.setOrigin(0.5, 0.5); */

    restLoadText = addTextToGame(restLoadString, XRes / 2, YRes / 2, fontFamilyLangArr[sysLang], "70px", "#FFFFFF", "center", 1080, 0.5, 0.5, false);
    //console.log(restLoadText);

    restLoadText.alpha = 0;
    game.add.tween(restLoadText).to({
        alpha: 1
    }, 500, Phaser.Easing.Linear.None, true, 0, 250, true);

    obj_list.push(restLoadText);
    obj_text_list.push(restLoadText);
}

function loadRestAssetProgress(lprec) {
    if (lprec === undefined) {
        lprec = 0;
    }
    var restLoadProgressString = restLoadString + " " + lprec + " % ";
    restLoadText.setText(restLoadProgressString);
}

function loadRestAssetComplete() {
    //restLoadStatus = false;
    //restLoadText.setText("");

    if (auto_load_enable) {
        goToPage(auto_load_scrn_no);
    }
}

function resetValues() {
    cap_photo_img_append = false;
    cap_screen_img_append = false;
    cap_consent_img_append = false;
    smsOTPCur = 'M@yjo$';
    smsOTPOk = false;
    cap_captured_img_append = false;
    disagreement_status = false;
    imgLoadEnable = false;
    imgRequest = 0;
    intervalImgCount = 0;
}


function loadStart() {
    $('#' + game_canvas_id).css('pointer-events', 'none');
    loaderText.text = "Loading...";

    //console.log("LOAD START");

    if (cur_scr == 2) {
        loadRestAssetStart();
    }
}

function fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
    loaderText.text = "Loading... " + progress + "%";
    if (cur_scr == 2) {
        loadRestAssetProgress(progress);
    }
}

function loadComplete() {
    $('#' + game_canvas_id).css('pointer-events', 'auto');
    loaderText.visible = false;

    if (cur_scr == 0) {
        resetValues();
    }
    if (cur_scr == 2) {
        loadRestAssetComplete();
    }

    if ((load_scrn == 0) || (load_scrn == 2) && ((cur_scr == 0) || (cur_scr == 1))) {
        goScreen(load_scrn);
    }
}

function preload() {
    //console.log('Preload');
    // Groups
    game = this;
    text_group = game.add.group();
    input_group = game.add.group();
    top_group1 = game.add.group();
    top_group2 = game.add.group();
    top_group3 = game.add.group();
    top_group4 = game.add.group();
    top_group5 = game.add.group();
    red_dot_group = game.add.group();
    //game.children.bringToTop(text_group);
    //addPlugins();

   // game.load.audio('backmusic', ['./assets/audio/product/eng/scenes/backmusic.mp3']);
    game.load.plugin('rexinputtextplugin', './assets/js/common/plugins/rex/rexinputtextplugin.min.js', true);
	game.load.plugin('rexcanvasplugin', './assets/js/common/plugins/rex/rexcanvasplugin.min.js', true);
	game.load.plugin('rexfilechooserplugin', './assets/js/common/plugins/rex/rexfilechooserplugin.min.js', true);
    game.load.plugin('rexyoutubeplayerplugin', './assets/js/common/plugins/rex/rexyoutubeplayerplugin.min.js', true);
    game.load.scenePlugin('rexuiplugin', './assets/js/common/plugins/rex/rexuiplugin.min.js', 'rexUI', 'rexUI');
    game.load.plugin('rexbuttonplugin', './assets/js/common/plugins/rex/rexbuttonplugin.min.js', true);

    game.load.plugin('rexscaleplugin', './assets/js/common/plugins/rex/rexscaleplugin.min.js', true);
    game.load.plugin('rexflashplugin', './assets/js/common/plugins/rex/rexflashplugin.min.js', true);
    game.load.plugin('rexshakepositionplugin', './assets/js/common/plugins/rex/rexshakepositionplugin.min.js', true);
	

    (LOADER_SCREEN) ? loaderScreenInit(): loadAssets();

}

function create() {

    game.game.canvas.id = game_canvas_id;
    game.cameras.main.backgroundColor = dbg_color;

    
    game.events.on('pause', onGamePause);
    game.events.on('resume', onGameResume);
   
    this.game.scale.refresh();
   
    (!LOADER_SCREEN) ? goScreen(START_SCREEN): '';   
}

function update() {
    setDepth(top_group1, 1);
    setDepth(top_group2, 2);
    setDepth(top_group3, 4);
    setDepth(top_group4, 4);
    setDepth(top_group5, 5);
    setDepth(text_group, 6);
	
	updateVideoFrame();
}


function onGamePause() {
    if (currentTween != null) currentTween.pause();
    if (currentSound != null) currentSound.pause();
    if (currentTimer != null) currentTimer.pause();
}

function onGameResume() {
    if (currentTween != null) currentTween.resume();
    if (currentSound != null) currentSound.resume();
    if (currentTimer != null) currentTimer.resume();
}

// Disable canvas inputs
function canvasInputDisable() {
    //  //console.log("Fn : canvasInputDisable ");
    $('#' + game_canvas_id).css('pointer-events', 'none');
}

// Enable canvas inputs
function canvasInputEnable() {
    //  //console.log("Fn : canvasInputEnable ");
    $('#' + game_canvas_id).css('pointer-events', 'auto');
}


function weltext() {

    s1 = game.add.text(140, 565, window.p_CUSTOMER_NAME, {
        font: fontFamilyLangArr[sysLang],
        fontSize: "46px",
        fontWeight: "bold",
        fill: "#000000",
        align: "center",
        lineSpacing: -3,
        wordWrap: true,
        wordWrapWidth: 950,
        align: "left",
        anchor: [0.5]

    });
    s2 = game.add.text(140, 803, window.p_address, {
        font: fontFamilyLangArr[sysLang],
        fontSize: "46px",
        fontWeight: "bold",
        fill: "#000000",
        align: "center",
        lineSpacing: -5,
        wordWrap: true,
        wordWrapWidth: 750,
        align: "left",
        anchor: [0.5]

    });
    s3 = game.add.text(140, 1056, window.p_MOBILE_NUMBER, {
        font: fontFamilyLangArr[sysLang],
        fontSize: "46px",
        fontWeight: "bold",
        fill: "#000000",
        align: "center",
        lineSpacing: -3,
        wordWrap: true,
        wordWrapWidth: 950,
        align: "left",
        anchor: [0.5]

    });
    s4 = game.add.text(140, 1305, window.p_EMAIL, {
        font: fontFamilyLangArr[sysLang],
        fontSize: "46px",
        fontWeight: "bold",
        fill: "#000000",
        align: "center",
        lineSpacing: -3,
        wordWrap: true,
        wordWrapWidth: 950,
        align: "left",
        anchor: [0.5]

    });
    text_group.add(s1);
    text_group.add(s2);
    text_group.add(s3);
    text_group.add(s4);
    obj_list.push(s1);
    obj_text_list.push(s1);
    obj_list.push(s2);
    obj_text_list.push(s2);
    obj_list.push(s3);
    obj_text_list.push(s3);
    obj_list.push(s4);
    obj_text_list.push(s4);

}


// Text styling
function SetupText(obj, txt) {
    var font_family = (obj.fontFamily) ? obj.fontFamily : fontFamilyLangArr[sysLang];
    var font_size = obj.size || df_size;
    var align = obj.align || df_align;
    var weight = obj.weight || df_weight;
    var color = obj.color || df_color;
    var boundsAlign = obj.boundsAlignH || df_boundsAlignH;
    var wordWrap = obj.wordWrap || df_wordWrap;
    var wordWrapWidth = obj.wordWrapWidth || df_wordWrapWidth;
    var fontStyle=obj.fontStyle || 'normal';

    var strokeThickness = 0;
    if(weight=='bold')
        strokeThickness=2;



    var font_obj = game.add.text(obj.sx, obj.sy, txt, {
        fontFamily: font_family,
        fontSize: font_size,
        fontStyle:fontStyle,
        color: color,
        align: align,
        stroke: color,
        strokeThickness: strokeThickness,
        wordWrap: {
            width: wordWrapWidth,
            callback: null,
            callbackScope: null,
            useAdvancedWrap: false
        },
    });


    //console.log("FONT OBJ = ", font_obj);

    if (obj.lineSpacing) {
        font_obj.lineSpacing = obj.lineSpacing;
    }
    if (obj.padding) {
        font_obj.padding.set(obj.padding[0], obj.padding[1]);
    }
    // font_obj.setTextBounds(0, 0, XRes,YRes);
    //font_obj.setTextBounds(0,0,game.width, game.height);
    font_obj.setOrigin(0.5, 0.5);
    font_obj.inputEnabled = false;
	
	if(obj.alpha == 0)
	{
		font_obj.alpha = 0;
	}

    text_group.add(font_obj);

    return font_obj;
}


function addTextToGame(txt, xPos, yPos, font_family, font_size, color, align, wordWrapWidth, anchorX, anchorY, inputEnabled) {

    var font_obj = game.add.text(xPos, yPos, txt, {
        fontFamily: font_family,
        fontSize: font_size,
        color: color,
        align: align,
        stroke: color,
        strokeThickness: 1,
        wordWrap: {
            width: wordWrapWidth,
            callback: null,
            callbackScope: null,
            useAdvancedWrap: false
        },
    });

    //console.log("ADDING FONT OBJ = ", font_obj);

    font_obj.setOrigin(anchorX, anchorY);
    font_obj.inputEnabled = false;

    text_group.add(font_obj);
    obj_list.push(font_obj);
    obj_text_list.push(font_obj);

    return font_obj;
}

// Input Field styling // Modified for Phaser 3
function SetupInputField(obj, txt) {
    var font_family = (obj.fontFamily) ? obj.fontFamily : fontFamilyLangArr[sysLang];
    var font_size = obj.size + "px";
    var font = font_size + "px " + font_family;
    var fill = obj.fill || di_fill;
    var fontWeight = obj.fontWeight || di_weight;
    var width = obj.width || di_width;
    var height = obj.height || di_height;
    var padding = obj.padding || di_padding;
    var placeHolder = obj.placeHolder || di_placeHolder;
    var backgroundColor = obj.backgroundColor || di_backgroundColor;
    var placeHolderColor = obj.placeHolderColor || di_placeHolderColor;
    var cursorColor = obj.cursorColor || di_cursorColor;


    var input_obj = addInputField(obj.key, obj.x, obj.y, width, height, obj.type, txt,placeHolder, font_size, backgroundColor, font_family, fill,obj.align,obj.maxLength);

    if (txt) {
        input_obj.setText(txt);
    } else {
        input_obj.setText('');
    }
    if (obj.key) {
        input_obj.key = obj.key;
    }
    input_obj.setOrigin(0.5, 0.5);
	
	
	if(obj.onBlur!='')
	{
		input_obj.on('blur', 
			function(inputText, e){ 			
			
			var nextInput = getInputObject(obj.onBlur);
			
			if(nextInput!=null)
			{
				nextInput.setFocus();
			}
			
		});
	}
	
	if(obj.alpha == 0)
	{
		input_obj.alpha = 0;
	}

    input_group.add(input_obj);
    return input_obj;
}

function addInputField(ip_id, x, y, width, height, ip_type, ip_text,ip_placeholder, ip_fontsize, ip_bgcolor, ip_fontfamily, ip_fontcolor,ip_align,ip_maxLength) {
    

    var inputText = game.add.rexInputText(x, y, width, height, {
        id: ip_id,
        type: ip_type, //text | textarea | password | number | color
        text: ip_text,
		placeholder:ip_placeholder,
        fontSize: ip_fontsize,
        backgroundColor: ip_bgcolor,
        borderColor: 'transparent',
        fontFamily: ip_fontfamily,
        color: ip_fontcolor,
		align:ip_align
    });

    //console.log(inputText);

    obj_list.push(inputText);
    obj_input_list.push(inputText);
	
	inputText.on('textchange', 
		function(inputText, e){ 
		
		
		if(inputText.text.length>=ip_maxLength)
		{
			inputText.setText(inputText.text.substring(0, ip_maxLength));
			inputText.setBlur();
		}
		
	});

    return inputText;

}

function getInputObject(key)
{	
	for(var i=0;i<input_group.children.entries.length;i++)
	{		
		if(input_group.children.entries[i].key==key)
		{
			return input_group.children.entries[i];
		}
	}
	
	return null;
}

function getTextObject(text)
{	
	for(var i=0;i<text_group.children.entries.length;i++)
	{				
		if(text_group.children.entries[i].text==text)
		{
			return text_group.children.entries[i];
		}
	}
	
	return null;
}

function getSpriteObject(key)
{	

	//console.log(obj_list);
	for(var i=0;i<obj_list.length;i++)
	{				
		if(obj_list[i].type=="Sprite")
		{
			if(obj_list[i].texture.key==key)
			{
				return obj_list[i];
			}
		}
	}
	
	return null;
}

function goToPage23(scr_no) {



    stopCam();

    CleanUp();
    StartPage(scr_no);
    ShowScreen();

    // stopCam();
    // webCamCreate();
    // initCamOnly();
    // goToPage(5);
}

function LoadAnimation(obj, params) {
    var anim_name = "default";
    var sprite_name = params.sprite;
    var x = params.x;
    var y = params.y;
    if (!obj) {
        obj = game.add.sprite(0, 0, sprite_name);
        obj.setOrigin(0.5);

        ////console.log('OBJ ',obj);

        /* game.anims.create({
        	key: 'default',
        	frames: [ { key: sprite_name} ]
        }); */
        //var anim = obj.animations.add(anim_name);

    }
    obj.x = x;
    obj.y = y;
    obj.inputEnabled = true;

    if (params.toTopObj) {
        groupToTop(obj, params.toTopObj);
    }

    return obj;
}


function AddEvent(ev) {
    events_list[events_list.length] = ev;
}

function PlayVideo(anim) {
    AddEvent(game.time.events.add(Phaser.Timer.SECOND * anim.delay, function() {
        if (video == null) video = game.add.video(anim.video);
        else video.changeSource(anim.video);
        video.play(false);
        if (videoWorld == null)
            videoWorld = video.addToWorld(anim.x, anim.y, 0.5, 0.5, 1, 1); // (x,y,anchorx,anchory,scalex,scaley)
        video.onComplete.add(function(obj) {
            eval(anim.fn);
        });
    }, this));
}


function ShowButton(anim) {
    AddEvent(game.time.events.add(Phaser.Timer.SECOND * anim.delay, function() {
        var button = game.add.button(anim.x, anim.y, anim.sprite, function() {
            eval(anim.onClickFn)
        });
        if (anim.toTopObj) {
            groupToTop(button, anim.toTopObj);
        }
        if (anim.anchor != null) {
            button.setOrigin(anim.anchor[0], anim.anchor[1]);
        }
        obj_list.push(button);
        obj_but_list.push(button);
    }, this));
}

function PlaySpriteAnim(anim) {
    //console.log('SPRITE = ', anim);
    var timer = game.time.addEvent({
        delay: 1000 * anim.delay, // ms
        callback: function() {

            var temp = LoadAnimation(temp, anim); //.x, anim.y, anim.sprite);

            temp.id = anim.id;
            temp.fn_type = anim.fn_type;
            temp.fn_param = anim.fn_param;

            if (anim.fn_type)
                temp.setInteractive({
                    useHandCursor: true
                });

            //temp.play('default', anim.timing, anim.loop);
            if (anim.scale)
                temp.scale = anim.scale;
			
			if (anim.alpha == 0)
                temp.alpha = 0;

            if (anim.anchor != null) {
                temp.setOrigin(anim.anchor[0], anim.anchor[1]);
            } else {
                temp.setOrigin(0.5);
            }

            var params = anim.params;


            if (params) {
                var type = anim.anim_type;
                var x1 = anim.x,
                    y1 = anim.y,
                    x2 = params[0],
                    y2 = params[1];

                //     //console.log(type," ",x1," ",y1," ",x2," ",y2);

                // Move Type
                temp.setOrigin(0.5, 0.5);
                if (anim.anim_type == "move") {
                    game.add.tween(temp).to({
                        x: x2,
                        y: y2
                    }, Phaser.Timer.SECOND * anim.timing, Phaser.Easing.Linear.None, true, Phaser.Timer.SECOND * anim.delay);
                    if (anim.disappear) {
                        AddEvent(game.time.events.add(Phaser.Timer.SECOND * anim.disappear, function() {
                            game.add.tween(temp.scale).to({
                                x: 0,
                                y: 0
                            }, 200, anim.tween_type, true, Phaser.Timer.SECOND * anim.disappear);
                        }, this));
                    }
                } else if (anim.anim_type == "ms0xy") // Scale & Move to a specific position & scale value from 0 - x.
                {
                    var scale_params = anim.scale_params;
                    var scale_x = scale_params[0] ? scale_params[0] : 1;
                    var scale_y = scale_params[1] ? scale_params[1] : 1;

                    temp.scale = 0;
                    game.add.tween(temp.scale).to({
                        x: scale_x,
                        y: scale_y
                    }, Phaser.Timer.SECOND * anim.timing, anim.tween_type, true, Phaser.Timer.SECOND * anim.delay);

                    // Move event
                    AddEvent(game.time.events.add(Phaser.Timer.SECOND, function() {

                        game.add.tween(temp).to({
                            x: x2,
                            y: y2
                        }, Phaser.Timer.SECOND * anim.timing, anim.tween_type, true, Phaser.Timer.SECOND * anim.delay);

                    }, this));

                } else if (anim.anim_type == "scale") {
                    //   //console.log("In Scale");
                    temp.scale = x2;
                    game.add.tween(temp.scale).to({
                        x: y2,
                        y: y2
                    }, Phaser.Timer.SECOND * anim.timing, Phaser.Easing.Linear.None, true, Phaser.Timer.SECOND * 2);
                } else if (anim.anim_type == "alpha") {
                    temp.alpha = x2;
                    game.add.tween(temp).to({
                        alpha: y2
                    }, Phaser.Timer.SECOND * anim.timing, anim.tween_type, true);

                } else if (anim.anim_type == "spin") {
                    var tween = game.add.tween(temp).to({
                        angle: x2
                    }, Phaser.Timer.SECOND * anim.timing, anim.tween_type, true);
                    if (anim.loop) {
                        tween.loop(true);
                        tween.yoyo(true, Phaser.Timer.SECOND * y2);
                    }
                } else if (anim.anim_type == "zoominout") {
                    //     //console.log("In Zoom In Out");
                    temp.scale = 1;

                    game.add.tween(temp.scale).to({
                        x: 1.2,
                        y: 1.2
                    }, Phaser.Timer.SECOND * anim.timing, Phaser.Easing.Linear.None, true, Phaser.Timer.SECOND * 2);

                    game.add.tween(temp.scale).to({
                        x: 1,
                        y: 1
                    }, Phaser.Timer.SECOND * anim.timing, Phaser.Easing.Linear.None, true, Phaser.Timer.SECOND * 2);
                }
            }
            if (anim.fade) {
                //     //console.log("Inside Fade "+anim.fade);
                game.add.tween(temp).to({
                    alpha: 0
                }, 145, Phaser.Easing.Linear.None, true, Phaser.Timer.SECOND * anim.fade);
            } else if (anim.disappear)
                game.add.tween(temp.scale).to({
                    x: 0,
                    y: 0
                }, 200, anim.tween_type, true, Phaser.Timer.SECOND * anim.disappear);
            else if (anim.fade)
                game.add.tween(temp).to({
                    alpha: 0
                }, 145, Phaser.Easing.Linear.None, true, Phaser.Timer.SECOND * anim.fade);


            if (anim.onClickFn) {
                temp.inputEnabled = true;

                temp.setInteractive({
                    useHandCursor: true
                });


                temp.on('pointerdown', function(pointer) {
                    eval(anim.onClickFn);
                });

                //temp.events.onInputDown.add(function () { eval(anim.onClickFn) }, this);
            }

            obj_list.push(temp);
            schedule_tween(temp);

        },
        callbackScope: this,
        loop: false
    });

    AddEvent(timer);


}

function checkObjList(name) {
    for (var i = 0; i < obj_list.length; i++) {
        if (obj_list[i].key == name) {
            //console.log('Found ', name);
            obj_list[i].destroy();
        }

    }
}

function schedule_tween(obj) {
    if (!window.stage.screens[cur_scr].tweens) return;
    for (var i = 0; i < window.stage.screens[cur_scr].tweens.length; i++) {
        var tween = window.stage.screens[cur_scr].tweens[i];
        if (tween.obj.startsWith(obj.key)) {
            game.add.tween(obj).to({
                x: tween.x,
                y: tween.y
            }, tween.timing, tween.tween_type, true, Phaser.Timer.SECOND * tween.delay);
            break;
        }
    }
}

function PlayTextAnim(anim) {
    //console.log('TEXT = ', anim);

    var text_toDisplay = "";

    var orgStr = anim.text[0].content;
    text_toDisplay = orgStr;

    var tween_type = anim.tween_type.toLowerCase();
    var txt = SetupText(anim, text_toDisplay);

    //console.log('INDEX = ', game.children);

    txt.id = anim.id;

    if (anim.anchor != null) {
        if (typeof anim.anchor[1] !== undefined) {
            txt.setOrigin(anim.anchor[0], anim.anchor[1]);
        } else {
            txt.setOrigin(anim.anchor[0], 0);
        }

    }

    //Has to Be Modified for Phaser 3
    if (tween_type.startsWith("typewrite")) {
        txt.text = "";
        AddEvent(game.time.events.add(Phaser.Timer.SECOND * anim.delay, function() {
            txt = typeWriter(txt, text_toDisplay, anim.timing);
            obj_list.push(txt);
            obj_text_list.push(txt);
        }, this));
    }
    //Has to Be Modified for Phaser 3
    else if (tween_type.startsWith("fadein")) {
        txt.alpha = 0;
        //     //console.log("Inside Fade "+anim.fade);

        game.add.tween(txt).to({
            alpha: 1
        }, anim.timing, "Linear", true, Phaser.Timer.SECOND * anim.delay);

        obj_list.push(txt);
        obj_text_list.push(txt);

        if (anim.disappear)
            game.add.tween(txt).to({
                alpha: 0
            }, anim.timing * 2, "Linear", true, Phaser.Timer.SECOND * anim.disappear);

        obj_list.push(txt);
        obj_text_list.push(txt);


    } else {

        var timer = game.time.addEvent({
            delay: 1000 * anim.delay,
            callback: function() {


                //game.add.tween(txt).to({x:anim.x, y: anim.y}, anim.timing, anim.tween_type, true);

                var tween = game.tweens.add({
                    targets: txt,
                    ease: 'Elastic', // 'Cubic', 'Elastic', 'Bounce', 'Back'
                    duration: anim.timing,
                    repeat: 0, // -1: infinity
                    yoyo: false,
                });

                //console.log(tween);


                txt.fn_type = anim.fn_type;
                txt.fn_param = anim.fn_param;

                if (anim.onClickFn) {
                     txt.inputEnabled = true;

                    txt.setInteractive({
                        useHandCursor: true
                    });


                    txt.on('pointerdown', function(pointer) {
                        eval(anim.onClickFn);
                    });
                }

                if (anim.fn_type) {
                    txt.inputEnabled = true;
                    txt.input.useHandCursor = true;
                }

                if (anim.disappear)
                    game.add.tween(txt.scale).to({
                        x: 0,
                        y: 0
                    }, 0.1, anim.tween_type, true, Phaser.Timer.SECOND * anim.disappear);


                obj_list.push(txt);
                obj_text_list.push(txt);
            },
            callbackScope: this,
            loop: false
        });

        AddEvent(timer);
    }


    console.log("TXT = ",txt);
    return txt;
}

// Text typewriting animation
function typeWriter(obj, txt, interval, n, cb) {
    n = n || 0;
    cb = cb || null;
    if (n == 0) obj.text = "";
    if (n < txt.length) {
        obj.text += txt.charAt(n);
        n++;
        setTimeout(function() {
            typeWriter(obj, txt, interval, n, cb);
            game.world.bringToTop(text_group);
        }, interval);
    } else
    if (cb != null) cb.call(this);
    return obj;
}

function PlayInputAnim(anim) {
    var text_toDisplay = "";
    for (var i = 0; i < anim.text.length; i++) {
        if (anim.text[i].content.startsWith("$var.")) {
            var str1 = anim.text[i].content.slice(5);

            if (str1.startsWith("number_")) {
                var orgStr = eval(str1.slice(7));
                if (anim.text[i].enableNumericType) {
                    orgStr = formatNumber(orgStr);
                }

                if (anim.text[i].defaultDecimalPart) {
                    orgStr = validateDecimalPart(orgStr);
                }

                var str_in_words = numberInWords(orgStr, numberSystemLangArr[sysLang]);
                sfx_offset += str_in_words.length * 0.5;

                text_toDisplay += orgStr;
            } else if (str1.startsWith("alphanumeric_")) {
                var orgStr = eval(str1.slice(13));
                var str_in_words = strInLetter(orgStr);

                sfx_offset += str_in_words.length * 0.5;
                text_toDisplay += orgStr;
            } else {
                var orgStr = eval(str1);
                if (anim.text[i].transliterate) {
                    if (['hindi', 'tamil', 'telugu'].indexOf(anim.text[i].transliterate) >= 0) {
                        var text_arr = orgStr.split(" ");
                        var transliterate = anim.text[i].transliterate;

                        if (text_arr.length > 0) {
                            var transliterate_result = "";
                            for (var j = 0; j < text_arr.length; j++) {
                                if (isNaN(text_arr[j])) {
                                    transliterate_result += transliterateText(text_arr[j], transliterate);
                                } else {
                                    transliterate_result += text_arr[j];
                                }

                                transliterate_result += " ";
                            }
                            text_toDisplay += transliterate_result;
                        }
                    }
                } else {
                    text_toDisplay += orgStr;
                }
            }
        } else {
            var orgStr = anim.text[i].content;
            if (anim.text[i].transliterate) {
                if (['hindi', 'tamil', 'telugu'].indexOf(anim.text[i].transliterate) >= 0) {
                    var text_arr = orgStr.split(" ");
                    var transliterate = anim.text[i].transliterate;

                    if (text_arr.length > 0) {
                        var transliterate_result = "";
                        for (var j = 0; j < text_arr.length; j++) {
                            if (isNaN(text_arr[j])) {
                                transliterate_result += transliterateText(text_arr[j], transliterate);
                            } else {
                                transliterate_result += text_arr[j];
                            }

                            transliterate_result += " ";
                        }
                        text_toDisplay += transliterate_result;
                    }
                }
            } else {
                text_toDisplay += orgStr;
            }
        }
    }

    var tween_type = anim.tween_type.toLowerCase();
    var inputField = SetupInputField(anim, text_toDisplay);
    inputField.id = anim.id;

    if (anim.anchor != null) {
        if (typeof anim.anchor[1] !== undefined) {
            inputField.setOrigin(anim.anchor[0], anim.anchor[1]);
        } else {
            inputField.setOrigin(anim.anchor[0], 0);
        }

    }   

    return inputField;
}


function OnStopCB(v) {
    return function() {
        if (cur_sfx_list[v + 1]) {
            currentSound = cur_sfx_list[v + 1].play();
        }
    };
}

function onSoundStop() {
    ////console.log("Fn : onSoundStop");
    //canvasInputEnable();
}

function onSoundPlay() {
    ////console.log("Fn : onSoundPlay");
    //
    //  InputDisable();
}


function PlaySound(anim) {
    cur_sfx_list.length = 0;
    for (var i = 0; i < anim.sound.length; i++) {
        if (anim.sound[i].startsWith("$var.")) {
            var str1 = anim.sound[i].slice(5);

            if (str1.startsWith("number_")) {
                var str2 = str1.slice(7);
                var res = numberInWords(eval(str2), numberSystemLangArr[sysLang]);
                for (var j = 0; j < res.length; j++) {
                    (res[j]) ? cur_sfx_list.push(game.add.audio(res[j])): '';
                }
            } else if (str1.startsWith("currency_")) {
                var str2 = str1.slice(9);
                var res = currencyInWords(eval(str2), numberSystemLangArr[sysLang]);
                for (var j = 0; j < res.length; j++) {
                    (res[j]) ? cur_sfx_list.push(game.add.audio(res[j])): '';
                }
            } else if (str1.startsWith("alphanumeric_")) {
                //console.log("Str Sound : alphanumeric_");
                var str2 = str1.slice(13);
                var strValue = (str2.startsWith("window.")) ? eval(str2) : str2;
                var res = strInLetter(strValue);
                for (var j = 0; j < res.length; j++) {
                    (res[j]) ? cur_sfx_list.push(game.add.audio(res[j])): '';
                }
            } else if (str1.startsWith("dateStr_")) {
                var str2 = str1.slice(8);
                var res = strInDate(eval(str2));
                for (var j = 0; j < res.length; j++) {
                    (res[j]) ? cur_sfx_list.push(game.add.audio(res[j])): '';
                }
            } else if (str1.startsWith("dateMonthStr_")) {
                var str2 = str1.slice(13);
                var res = strInDateMonth(eval(str2));
                for (var j = 0; j < res.length; j++) {
                    (res[j]) ? cur_sfx_list.push(game.add.audio(res[j])): '';
                }
            } else {
                var audioName = eval(str1);
                cur_sfx_list.push(game.add.audio(audioName));
            }
        } else {
            cur_sfx_list.push(game.sound.add(anim.sound[i]));
        }
    }

    //   //console.log("cur_sfx_list.length ",cur_sfx_list.length);
    if (cur_sfx_list.length == 0) return;
    var v = 0;

    for (var i = 0; i <= cur_sfx_list.length - 1; i++) {
        //      //console.log("cur_sfx_list for : ",i);
        v = i;

        if (cur_scr > 0) {
            cur_sfx_list[i].on("play", onSoundPlay);
            cur_sfx_list[i].on("stop", onSoundStop);
        }
        cur_sfx_list[i].on("stop", OnStopCB(i));
    }
    if (cur_sfx_list.length > 0) {

        console.log("CURRENT AUDIO = ", cur_sfx_list[0]);
        currentSound = cur_sfx_list[0].play();

        console.log("CURRENT AUDIO IS PLAYING? ",cur_sfx_list[0].isPlaying);
    }
}


// If need to play a specific screen directly
function actionOnClick(scr_no) {
    CleanUp();
    StartPage(scr_no);
    ShowScreen();
}

function actionOnClickDelay(scr_no, delay) {
    checkObjList('Button_Agree');
    game.add.sprite(280, 1810, 'Agree_New_selected');
    canvasInputDisable();
    if (cur_scr === 0) {
        cur_sfx_list[0].play();
    }
    setTimeout(function() {
        canvasInputEnable();
        goToPage(scr_no);
    }, 1000 * delay);
}

function goToPage(scr_no) {

    //console.log('go to page');
    CleanUp();
    StartPage(scr_no);
    //console.log('Cur Scr = ', cur_scr);
    ShowScreen();

    if(scroller_interval!=null)
        clearInterval(scroller_interval);
}

var select, select2, select3, select4, select5, select6, select7, select8, select9;


function greentick(ss) {
    nullify(select);
    // nullify(select_no);


    if (ss == "yes") {
        select = game.add.sprite(100, 840, 'fb_yes');
        window.q1 = "Yes";
        //console.log("window.q1=" + window.q1);

    }
    if (ss == "no") {
        select = game.add.sprite(550, 840, 'fb_no');
        window.q1 = "No";
        //console.log("window.q1=" + window.q1);


    }
    select.scale.set(1);
    groupToTop(select, 2);
    // groupToTop(select_no,2);

    //select_yes.setOrigin(0.5, 0);
    //  select_no.setOrigin(0, 0.5);
    obj_list.push(select);
    //     obj_list.push(select_no);
    obj_but_list.push(select);
    // obj_but_list.push(select_no);



}


function greentick2(ss) {
    nullify(select2);
    // nullify(select_no);


    if (ss == "yes") {
        select2 = game.add.sprite(100, 1080, 'fb_yes');
        window.q2 = "Yes";
        //console.log("window.q2=" + window.q2);


    }
    if (ss == "no") {
        select2 = game.add.sprite(550, 1080, 'fb_no');
        window.q2 = "No";
        //console.log("window.q2=" + window.q2);

    }
    select2.scale.set(1);
    groupToTop(select2, 2);
    // groupToTop(select_no,2);

    // select_yes.setOrigin(0.5, 0);
    //  select_no.setOrigin(0, 0.5);
    obj_list.push(select2);
    //     obj_list.push(select_no);
    obj_but_list.push(select2);
    // obj_but_list.push(select_no);



}


function greentick3(ss) {
    nullify(select3);

    if (ss == "yes") {
        select3 = game.add.sprite(100, 470, 'fb_yes');

        window.q4 = "Yes";
        //console.log("window.q4=" + window.q4);
    }
    if (ss == "no") {
        select3 = game.add.sprite(550, 470, 'fb_no');
        window.q4 = "No";
        //console.log("window.q4=" + window.q4);

    }
    select3.scale.set(1);
    groupToTop(select3, 2);
    obj_list.push(select3);
    obj_but_list.push(select3);

}

function greentick4(ss) {
    nullify(select4);

    if (ss == "yes") {
        select4 = game.add.sprite(100, 690, 'fb_yes');
        window.q5 = "Yes";
        //console.log("window.q5=" + window.q5);

    }
    if (ss == "no") {
        select4 = game.add.sprite(550, 690, 'fb_no');
        window.q5 = "No";
        //console.log("window.q5=" + window.q5);

    }
    select4.scale.set(1);
    groupToTop(select4, 2);
    obj_list.push(select4);
    obj_but_list.push(select4);

}

function greentick5(ss) {
    nullify(select5);

    if (ss == "yes") {
        select5 = game.add.sprite(100, 910, 'fb_yes');
        window.q6 = "Yes";
        //console.log("window.q6=" + window.q6);

    }
    if (ss == "no") {
        select5 = game.add.sprite(550, 910, 'fb_no');
        window.q6 = "No";
        //console.log("window.q6=" + window.q6);

    }
    select5.scale.set(1);
    groupToTop(select5, 2);
    obj_list.push(select5);
    obj_but_list.push(select5);

}

function greentick6(ss) {
    nullify(select6);

    if (ss == "yes") {
        select6 = game.add.sprite(100, 1130, 'fb_yes');
        window.q7 = "Yes";
        //console.log("window.q7=" + window.q7);

    }
    if (ss == "no") {
        select6 = game.add.sprite(550, 1130, 'fb_no');
        window.q7 = "No";
        //console.log("window.q7=" + window.q7);

    }
    select6.scale.set(1);
    groupToTop(select6, 2);
    obj_list.push(select6);
    obj_but_list.push(select6);

}

function greentick7(ss) {
    nullify(select7);

    if (ss == "yes") {
        select7 = game.add.sprite(100, 1340, 'fb_yes');
        window.q8 = "Yes";
        //console.log("window.q8=" + window.q8);

    }
    if (ss == "no") {
        select7 = game.add.sprite(550, 1340, 'fb_no');
        window.q8 = "No";
        //console.log("window.q8=" + window.q8);

    }
    select7.scale.set(1);
    groupToTop(select7, 2);
    obj_list.push(select7);
    obj_but_list.push(select7);

}

function greentick8(ss) {
    nullify(select8);

    if (ss == "yes") {
        select8 = game.add.sprite(100, 1570, 'fb_yes');
        window.q9 = "Yes";
        //console.log("window.q9=" + window.q9);

    }
    if (ss == "no") {
        select8 = game.add.sprite(550, 1570, 'fb_no');
        window.q9 = "No";
        //console.log("window.q9=" + window.q9);

    }
    select8.scale.set(1);
    groupToTop(select8, 2);
    obj_list.push(select8);
    obj_but_list.push(select8);

}

function greentick9(ss) {
    nullify(select9);

    if (ss == "yes") {
        select9 = game.add.sprite(100, 1320, 'fb_yes');
        window.q3 = "Yes";
        //console.log("window.q3=" + window.q3);

    }
    if (ss == "no") {
        select9 = game.add.sprite(550, 1320, 'fb_no');
        window.q3 = "No";
        //console.log("window.q3=" + window.q3);

    }
    select9.scale.set(1);
    groupToTop(select9, 2);
    obj_list.push(select9);
    obj_but_list.push(select9);

}

var select10;

function greentick10(ss) {
    nullify(select10);

    if (ss == "acknow") {
        select10 = game.add.sprite(135, 1100, 'acknow');


    }
    if (ss == "contact") {
        select10 = game.add.sprite(585, 1100, 'contact');

    }
    select10.scale.set(1);
    groupToTop(select10, 2);
    obj_list.push(select10);
    obj_but_list.push(select10);

}

var select11;

function greentick11(ss) {
    nullify(select11);

    if (ss == "product") {
        select11 = game.add.sprite(270, 720, 'acknow');


    }
    if (ss == "receipt") {
        select11 = game.add.sprite(270, 1170, 'contact');

    }
    select11.scale.set(1.5);
    groupToTop(select11, 2);
    obj_list.push(select11);
    obj_but_list.push(select11);

}


function nullify(obj) {
    if (obj != null)
        obj.destroy();
}



function goToPageBack(scr_no) {
    CleanUp();
    StartPage(scr_no);
    ShowScreen();
    screenBackBtn = true;
}


function editGoToPage(scr_no, xIN, yIN, eKey = '') {
    if (cur_scr == 3) {
        window.ots = obj_input_list[0].value;
        //console.log(window.ots);
        //  alert(ots);
    }
    if (edit_btn_status) {
        return;
    }
    edit_btn_status = true;
    let obj_list_count = 0;
    let input_null_val = false;
    let edit_obj_list = {};
    if (obj_input_list.length > 0) {
        let obj_input_list_len = obj_input_list.length;
        obj_input_list.forEach(
            function(item, index) {
                //console.log("Index : ", index, " == Key == ", item['key'], " == Value == ", item['value']);
                edit_obj_list[item['key']] = item['value'];
                //console.log("sachin10", edit_obj_list['in_otp']);

                if (item['value'] == '') {
                    input_null_val = true;
                }
                obj_list_count++;
                if (obj_list_count == obj_input_list_len) {
                    if (input_null_val) {
                        inputNullStr = 'Provide Valid OTP';
                        inputNullStr = transliterateText(inputNullStr, translitLangArr[sysLang]);

                        inputNullTxt = game.add.text(xIN, yIN, inputNullStr, {
                            font: fontFamilyLangArr[sysLang],
                            fontSize: "25px",
                            fontWeight: "bold",
                            fill: "#ff0000",
                            align: "center"
                        });

                        text_group.add(inputNullTxt);

                        inputNullTxt.setOrigin(0, 0);

                        AddEvent(game.time.events.add(0.1, function() {
                            var inputTxtTween = game.add.tween(inputNullTxt).to({
                                alpha: 0
                            }, 5000, Phaser.Easing.Linear.None, true);
                            inputTxtTween.onComplete.add(function() {
                                //console.log("inputTxtTween : onComplete");
                                edit_btn_status = false;
                            }, this);
                        }, this));

                        obj_list.push(inputNullTxt);
                        obj_text_list.push(inputNullTxt);

                    } else {
                        //  if(eKey!=''){ updateEditLinkResponse(eKey,cur_screen_name,edit_obj_list); }
                        edit_btn_status = false;

                        if (obj_input_list[0].value == "2625") {
                            goToPage(3);
                        }
                        //  goToPage(scr_no);

                        //otp_check();
                    }
                }
            }
        );
    }
}

function editStatusGoToPage(scr_no, xIN, yIN, eKey = '', cKey = '') {
    if (edit_btn_status) {
        return;
    }
    edit_btn_status = true;
    let obj_list_count = 0;
    let input_null_val = false;
    let edit_obj_list = {};
    if (obj_input_list.length > 0) {
        let obj_input_list_len = obj_input_list.length;
        obj_input_list.forEach(
            function(item, index) {
                //console.log("Index : ", index, " == Key == ", item['key'], " == Value == ", item['value']);
                edit_obj_list[item['key']] = item['value'];
                if (item['value'] == '') {
                    input_null_val = true;
                }
                obj_list_count++;
                if (obj_list_count == obj_input_list_len) {
                    if (input_null_val) {
                        inputNullStr = 'Provide input values';
                        inputNullStr = transliterateText(inputNullStr, translitLangArr[sysLang]);

                        inputNullTxt = game.add.text(xIN, yIN, inputNullStr, {
                            font: fontFamilyLangArr[sysLang],
                            fontSize: "50px",
                            fontWeight: "bold",
                            fill: "#ff0000",
                            align: "center"
                        });

                        text_group.add(inputNullTxt);

                        inputNullTxt.setOrigin(0, 0);

                        AddEvent(game.time.events.add(0.1, function() {
                            var inputTxtTween = game.add.tween(inputNullTxt).to({
                                alpha: 0
                            }, 5000, Phaser.Easing.Linear.None, true);
                            inputTxtTween.onComplete.add(function() {
                                //console.log("inputTxtTween : onComplete");
                                edit_btn_status = false;
                            }, this);
                        }, this));

                        obj_list.push(inputNullTxt);
                        obj_text_list.push(inputNullTxt);

                    } else {
                        if (eKey != '') {
                            updateEditLinkResponse(eKey, cur_screen_name, edit_obj_list);
                        }
                        if (cKey != '') {
                            updateLinkResponse(cKey, cur_screen_name, 0);
                        }
                        edit_btn_status = false;
                        goToPage(scr_no);
                    }
                }
            }
        );
    }
}

function ShowScreen() {
    //console.log('Show Screen Begun');

    sfx_offset = 0;
    game.sound.stopAll();
    if (window.stage.screens.count <= 0)
        return;
    if (window.stage.screens[cur_scr].condition != null) {
        var cond = eval(window.stage.screens[cur_scr].condition);
        if (eval(window.stage.screens[cur_scr].condition) == false) {
            TransitScreen();
            return;
        }
    }

    // Videos
    if (window.stage.screens[cur_scr].video != null)
        for (var i = 0; i < window.stage.screens[cur_scr].video.length; i++)
            PlayVideo(window.stage.screens[cur_scr].video[i]);

    // Buttons
    if (window.stage.screens[cur_scr].buttons != null)
        for (var i = 0; i < window.stage.screens[cur_scr].buttons.length; i++)
            ShowButton(window.stage.screens[cur_scr].buttons[i]);

    // Sprite Animations
    if (window.stage.screens[cur_scr].sprite_animations != null)
        for (var i = 0; i < window.stage.screens[cur_scr].sprite_animations.length; i++)
            PlaySpriteAnim(window.stage.screens[cur_scr].sprite_animations[i]);

    // Text Animations
    if (window.stage.screens[cur_scr].text_animations != null)
        for (var i = 0; i < window.stage.screens[cur_scr].text_animations.length; i++)
            PlayTextAnim(window.stage.screens[cur_scr].text_animations[i]);

    // Input Field Animations
    if (window.stage.screens[cur_scr].input_animations != null)
        for (var i = 0; i < window.stage.screens[cur_scr].input_animations.length; i++)
            PlayInputAnim(window.stage.screens[cur_scr].input_animations[i]);

    // Sound
    if (window.stage.screens[cur_scr].sound_list != null)
        for (var i = 0; i < window.stage.screens[cur_scr].sound_list.length; i++)
            PlaySound(window.stage.screens[cur_scr].sound_list[i]);

    // Functions
    if (window.stage.screens[cur_scr].functions != null)
        for (var i = 0; i < window.stage.screens[cur_scr].functions.length; i++)
            call_fn(window.stage.screens[cur_scr].functions[i]);

    // Screen Names
    if (window.stage.screens[cur_scr].name != null)
        cur_screen_name = window.stage.screens[cur_scr].name;

    if (window.stage.screens[cur_scr].timing >= 0)
        game.time.events.add(Phaser.Timer.SECOND * (window.stage.screens[cur_scr].timing + sfx_offset), TransitScreen, this);

    //console.log('Show Screen Complete');
}

function CleanUp() {
    //console.log('Clean Up Started ', text_group);

	stopCameraFeed();

    for (var i = 0; i < obj_but_list.length; i++) {
        obj_but_list[i].x = -game.width * 2;
        obj_but_list[i] = null;
    }
    for (var i = 0; i < obj_text_list.length; i++) {
        obj_text_list[i].x = -game.width * 2;
        obj_text_list[i].destroy();
        obj_text_list[i] = null;
    }
    for (var i = 0; i < obj_input_list.length; i++) {
        obj_input_list[i].x = -game.width * 2;
        obj_input_list[i] = null;
    }
    for (var i = 0; i < obj_list.length; i++) {
        obj_list[i].x = -game.width * 2;
        obj_list[i].destroy();
        obj_list[i] = null;
    }
    for (var i = 0; i < text_group.children.size; i++) {
        //console.log('Text Group');
        text_group.children.entries[i].destroy();

    }
    for (var i = 0; i < events_list.length; i++) {
        game.time.removeAllEvents();
    }

    obj_but_list = obj_but_list.filter(function(el) {
        return el != null;
    });

    obj_text_list = obj_text_list.filter(function(el) {
        return el != null;
    });

    obj_input_list = obj_input_list.filter(function(el) {
        return el != null;
    });

    obj_list = obj_list.filter(function(el) {
        return el != null;
    });

    cur_sfx_list.length = 0;

    screenBackBtn = false;

    //console.log('Clean Up Done');
}

function TransitScreen() {
    CleanUp();
    cur_scr = ++cur_scr % window.stage.screens.length;
    ShowScreen();
}

function ReloadScreen() {
    CleanUp();
    ShowScreen();
}

function prevScreen() {
    CleanUp();
    cur_scr = cur_scr - 1;
    if (cur_scr < 0) {
        cur_scr = 0;
        return;
    }
    ShowScreen();
}

function goScreen(scr_no) {
    CleanUp();

    if (scr_no > 0) {
        if ((scr_no + 1) <= window.stage.screens.length) {
            cur_scr = scr_no;
            ShowScreen();
        } else {
            cur_scr = 0;
            ShowScreen();
        }
    } else {
        cur_scr = 0;
        ShowScreen();
    }
}

function nextScreen() {
    CleanUp();
    cur_scr = ++cur_scr % window.stage.screens.length;
    ShowScreen();
}



/*
    Show Full Screen
 */

function goFull() {
    if (game.scale.isFullScreen) {
        game.scale.stopFullScreen();
    } else {
        game.scale.startFullScreen(false);
    }
}


// Custom group to Top
function groupToTop(obj, i) {
    ////console.log('GROUP TO TOP = ',obj,',DEPTH = ',i);
    if (i == 1) {
        top_group1.add(obj);
        //game.children.bringToTop(top_group1);

        setDepth(top_group1, 1);

    } else if (i == 2) {
        top_group2.add(obj);
        //game.children.bringToTop(top_group2);

        setDepth(top_group2, 2);

    } else if (i == 3) {
        top_group3.add(obj);
        //game.children.bringToTop(top_group3);

        setDepth(top_group3, 3);

    } else if (i == 4) {
        top_group4.add(obj);
        //game.children.bringToTop(top_group4);

        setDepth(top_group4, 4);

    } else if (i == 5) {
        top_group5.add(obj);
        //game.children.bringToTop(top_group5);

        setDepth(top_group5, 5);

    } else if (i == 6) {
        text_group.add(obj);
        //game.children.bringToTop(top_group5);

        setDepth(text_group, 6);

    }
}

function setDepth(group, depth) {
    ////console.log("GROUP = ",group);

    var list = group.children.entries;

    for (var i = 0; i < list.length; i++) {
        list[i].setDepth(depth);
    }
}

function buttonVisibility(status) {
    if (status == true) {
        for (var i = 0; i < obj_but_list.length; i++) {
            obj_but_list[i].alpha = 1;
        }
    } else if (status == false) {
        for (var i = 0; i < obj_but_list.length; i++) {
            obj_but_list[i].alpha = 0;
        }
    }

}

function textVisibility(status) {
    if (status == true) {
        for (var i = 0; i < obj_text_list.length; i++) {
            obj_text_list[i].alpha = 1;
        }
    } else if (status == false) {
        for (var i = 0; i < obj_text_list.length; i++) {
            obj_text_list[i].alpha = 0;
        }
    }

}

function inputFieldVisibility(status) {
    if (status == true) {
        for (var i = 0; i < obj_input_list.length; i++) {
            obj_input_list[i].alpha = 1;
        }
    } else if (status == false) {
        for (var i = 0; i < obj_input_list.length; i++) {
            obj_input_list[i].alpha = 0;
        }
    }

}


function transliterateText(str, transLang) {
    var transLangStatus = true;
    var transStrResult = '';
    if (transLang == 'hindi') {
        pramukhIME.addKeyboard(PramukhIndic, 'hindi');
    } else if (transLang == 'tamil') {
        pramukhIME.addKeyboard(PramukhIndic, 'tamil');
    } else if (transLang == 'telugu') {
        pramukhIME.addKeyboard(PramukhIndic, 'telugu');
    } else if (transLang == 'malayalam') {
        pramukhIME.addKeyboard(PramukhIndic, 'malayalam');
    } else if (transLang == 'kannada') {
        pramukhIME.addKeyboard(PramukhIndic, 'kannada');
    } else if (transLang == 'bengali') {
        pramukhIME.addKeyboard(PramukhIndic, 'bengali');
    } else if (transLang == 'marathi') {
        pramukhIME.addKeyboard(PramukhIndic, 'marathi');
    } else if (transLang == 'gujarati') {
        pramukhIME.addKeyboard(PramukhIndic, 'gujarati');
    } else if (transLang == 'punjabi') {
        pramukhIME.addKeyboard(PramukhIndic, 'punjabi');
    }
    // else if(transLang=='marwari')
    // {
    //     pramukhIME.addKeyboard(PramukhIndic, 'marwari');
    // }
    else {
        transLangStatus = false;
    }


    if (transLangStatus) {
        str = (str) ? str.toLowerCase() : '';
        transStrResult = pramukhIME.convert(str);
    } else {
        transStrResult = str;
    }

    //   //console.log("transStrResult - fn -: ",transStrResult," == ",transLang);

    return transStrResult;
}

function init() {
    setProductParams();
}

function call_fn(func) {

    var timer = game.time.addEvent({
        delay: 1000 * func.delay, // ms
        callback: function() {
            eval(func.fn)
        },
        callbackScope: this,
        loop: false
    });

    AddEvent(timer);

}


function SetBGColor(color) {
    game.stage.backgroundColor = color;
}

function SetBGTile(bg_sprite) {
    var bg_tile = game.add.tileSprite(XRes / 2, YRes / 2, XRes, YRes, bg_sprite);
    obj_list.push(bg_tile);
    //bg_tile.setOrigin(0.5,0.5);
}


function StartPage(num) {
    cur_scr = num;
}
String.prototype.startsWith = function(str) {
    return this.indexOf(str) == 0;
};

function find(str, sub) {
    if (str.indexOf(sub) == -1) {
        return false;
    } else {
        return true;
    }
}

/*
 Debug Modules
 */

function render() {
    if (!PROD_ENV) {
        // Input debug info
        game.debug.inputInfo(32, 32);
        //game.debug.spriteInputInfo(sprite, 32, 130);
        game.debug.pointer(game.input.activePointer);
    }

    if (game.input.activePointer.isDown) {
        ////console.log("Mouse X = ",game.input.activePointer.worldX);
        ////console.log("Mouse Y = ",game.input.activePointer.worldY);

        var red_dot = game.add.sprite(game.input.activePointer.worldX, game.input.activePointer.worldY, 'red_dot');
        red_dot.setOrigin(0.5, 0.5);
        red_dot.scale.set(1);

        //  game.add.tween(red_dot.scale).to( { x: 0, y : 0 }, 20, Phaser.Easing.Linear.None, true, Phaser.Timer.SECOND);
        game.add.tween(red_dot.scale).to({
            x: 0,
            y: 0
        }, 10, "Linear", true);


        obj_list.push(red_dot);

        red_dot_group.add(red_dot);
    }
}





function inputfile(data) {
    if (data == 'block') {
        document.getElementById("cb1").style.display = 'block';
    } else {
        document.getElementById("cb1").style.display = 'none';
    }
}

function download_local_file(file) {
    //var file="PROHLT010039075_04 _Policy document.pdf";
    var furl = "assets/files/download/" + file;
    //  //console.log(furl);
    var ext = file.substr(file.lastIndexOf('.') + 1);
    if ((ext !== undefined) && (ext !== '')) {
        ext = ext.toLowerCase();
        var allowed_ext = {
            "pdf": "application/pdf",
            "doc": "application/msword",
            "docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "vcf": "vcf"
        };

        if (allowed_ext[ext] !== undefined) {
            var x = new XMLHttpRequest();
            x.open("GET", furl, true);
            x.responseType = 'blob';
            x.onload = function(e) {
                download(x.response, file, allowed_ext[ext]);
            };
            x.send();

            //open_url(file);
            // window.open("assets/files/download/Allianz_Customer_Care.vcf");
            // window.open("assets/files/download/Allianz_Customer_Care.vcf");

        } else {
            return false;
        }

    } else {
        return false;
    }
    //  open_url("assets/files/download/allianz_policy_doc.pdf");
    // readFile(furl);
}


function download_local_file1(file) {
    var file = "PROHLT010039075_04_ProposalDocuments_Health Card.pdf";
    var furl = "assets/files/download/" + file;
    //  //console.log(furl);
    var ext = file.substr(file.lastIndexOf('.') + 1);
    if ((ext !== undefined) && (ext !== '')) {
        ext = ext.toLowerCase();
        var allowed_ext = {
            "pdf": "application/pdf",
            "doc": "application/msword",
            "docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        };

        if (allowed_ext[ext] !== undefined) {
            var x = new XMLHttpRequest();
            x.open("GET", furl, true);
            x.responseType = 'blob';
            x.onload = function(e) {
                download(x.response, file, allowed_ext[ext]);
            };
            x.send();
        } else {
            return false;
        }

    } else {
        return false;
    }
}

function download_pdf_url(furl) {
    if (furl) {
        furl = (furl.startsWith("window.")) ? eval(furl) : furl;
    }

    if (furl) {
        var file_name = window.product_slug + ".pdf";
        var x = new XMLHttpRequest();
        x.open("GET", furl, true);
        x.responseType = 'blob';
        x.onload = function(e) {
            download(x.response, file_name, "application/pdf");
        };
        x.send();
    }
}

function open_url(url_link) {
    if ((url_link !== undefined) && (url_link !== '')) {
        window.open(url_link, '_blank');
    } else {
        return false;
    }
}

function initialize() {
    // Images
    if (window.user_profile_image) {
        imageToData(window.user_image_url);
    }
}

/*
    Lang Related functions
 */

function loadLangFlow(setLang, setFlow, setScreen) {
    init();

    sysLang = (setLang) ? setLang : sysLang;
    sysFlow = (setFlow) ? setFlow : sysFlow;

    load_scrn = (setScreen) ? setScreen : 2;

    var lang_assets_fpath = './assets/product_assets/' + window.flow_slug + '/js/flow_assets_' + sysLang + '_' + sysFlow + '.js';

    var lang_flow_fpath = './assets/product_assets/' + window.flow_slug + '/js/flow_' + sysLang + '_' + sysFlow + '.js';
	
	var scroller_fpath = './assets/js/common/plugins/scroller/scroller.js';
    var product_scroller_fpath = './assets/js/common/plugins/scroller/productScroller.js';
    var video_scroller_fpath = './assets/js/common/plugins/scroller/videoScroller.js';
    var gallery_fpath = './assets/js/common/plugins/gallery/gallery.js';
    var gallery_scroller_fpath = './assets/js/common/plugins/scroller/galleryScroller.js';


    /*console.log(document.fonts);

    document.fonts.ready.then(function () {
      alert('All fonts in use by visible text have loaded.');
       alert('Uniform loaded? ' + document.fonts.check('Uniform'));  // true
    });*/
    

	$.getScript(scroller_fpath,function(){  
        $.getScript(product_scroller_fpath,function(){
            $.getScript(gallery_fpath,function(){
                 $.getScript(gallery_scroller_fpath,function(){
                    console.log('Loaded Gallery');

                     $.getScript(video_scroller_fpath,function(){          
                        $.getScript(lang_assets_fpath, function() {
                            $.getScript(lang_flow_fpath, function() {
                                $.when(langAssets()).then(function() {
                                    game.load.start();
                                });
                            });
                        }); 
                    }); 
                }); 
            });
        });       
	});    

}

/*
Product Related Custom functions
 */
// let fdata;
function setProductParams() {

    if (window.flow_slug === "abhi_pivc") {

        window.p_POLICY_NAME = "Active Health";
		window.p_POLICY_NUMBER = "ABHI1234567";		
        window.p_CUSTOMER_NAME = "Ramkumar G";
        window.p_MOBILE_NUMBER = '944414428';
        window.p_EMAIL = 'ramkumar.g@gmail.com';     
        window.p_DOB = '06-05-1991';
        window.p_GENDER = 'Male';
        window.p_OCCUPATION = 'Salaried';
		window.p_ANNUAL_INCOME = 'Rs. 6,00,000';
		window.p_CITY_RESIDENCE='Bangalore';
		window.p_HEIGHT= '180';
		window.p_WEIGHT='80';     

    }

}

function getGeoLocation() {
    //var lat;
    //console.log("Location Finished : fn ");
    if (navigator.geolocation) {
        //console.log("Location Finished : geolocation ");
        var lat = navigator.geolocation.getCurrentPosition(function(pos) {
            //console.log("Location Finished : geolocation - pos" + pos.coords.latitude);
            //lat = pos.coords.latitude;
            latitude_value = pos.coords.latitude;
            longitude_value=pos.coords.longitude;



            //return pos.coords.latitude;
        });
    }

    
}




function getGeoLocationText() {
    let chk = getGeoLocation();
    alert(chk);
    //console.log("Fn : getGeoLocationText ");
    let kfd_get_geoloc_url = window.kfd_api_url + 'api/pivc/getGeoLocationAddress';

    let get_geoloc_params = {
        "sbil_key": (window.link_key) ? window.link_key : '',
        "sbil_geo_lat": window.geo_latitude,
        "sbil_geo_long": window.geo_longitude
        // "sbil_geo_lat":latitude_value,
        // "sbil_geo_long":longitude_value
    };
    //console.log(latitude_value, longitude_value);

    let jq_get_geoloc_res = $.post(kfd_get_geoloc_url, get_geoloc_params, function(data) {}, 'json');

    jq_get_geoloc_res.done(function(data) {
        //console.log(JSON.stringify(data));
        if (data.status) {
            //console.log("getGeoLocationText Response Data : ", data.msg);
            window.geo_location = data.output.address;
        }
    });

}
//var x1;
var latitude_value, longitude_value;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        //console.log(latitude_value, longitude_value);
    } else {

    }
}

function showPosition(position) {
    latitude_value = position.coords.latitude + "";
    longitude_value = position.coords.longitude + "";
    //return position.coords.latitude+","+position.coords.longitude;
    ////console.log("POSITION = ",position.coords.latitude,position.coords.longitude);
    //console.log("POSITION = ", latitude_value, longitude_value);
}

function productInit() {
    getGeoLocation();
}

function pd_checkbox_show() {
    //console.log("Fn : pd_checkbox_show");
    for (var sKey in check_status) {
        check_status[sKey] = true;
    }

    var chb_btn1_count = 0;
    var chb_btn1 = game.add.button(770, 90, 'agree_btn_01', function() {
        chb_btn1_count++;
        if (chb_btn1_count % 2) {
            //console.log("Check - Yes");
            check_status.name = true;
            chb_btn1.setFrames(0, 0, 0, 0);
        } else {
            //console.log("Check - No");
            check_status.name = false;
            chb_btn1.setFrames(1, 1, 1, 1);
        }
    }, 0, 0, 0, 0);
    chb_btn1.setOrigin(0.5, 0.5);
    obj_list.push(chb_btn1);

    var chb_btn2_count = 0;
    var chb_btn2 = game.add.button(770, 135, 'agree_btn_01', function() {
        chb_btn2_count++;
        if (chb_btn2_count % 2) {
            check_status.email_id = true;
            chb_btn2.setFrames(0, 0, 0, 0);
        } else {
            check_status.email_id = false;
            chb_btn2.setFrames(1, 1, 1, 1);
        }
    }, 0, 0, 0, 0);
    chb_btn2.setOrigin(0.5, 0.5);
    obj_list.push(chb_btn2);

    var chb_btn3_count = 0;
    var chb_btn3 = game.add.button(770, 180, 'agree_btn_01', function() {
        chb_btn3_count++;
        if (chb_btn3_count % 2) {
            check_status.address = true;
            chb_btn3.setFrames(0, 0, 0, 0);
        } else {
            check_status.address = false;
            chb_btn3.setFrames(1, 1, 1, 1);
        }
    }, 0, 0, 0, 0);
    chb_btn3.setOrigin(0.5, 0.5);
    obj_list.push(chb_btn3);

    var chb_btn4_count = 0;
    var chb_btn4 = game.add.button(770, 225, 'agree_btn_01', function() {
        chb_btn4_count++;
        if (chb_btn4_count % 2) {
            check_status.dob = true;
            chb_btn4.setFrames(0, 0, 0, 0);
        } else {
            check_status.dob = false;
            chb_btn4.setFrames(1, 1, 1, 1);
        }
    }, 0, 0, 0, 0);
    chb_btn4.setOrigin(0.5, 0.5);
    obj_list.push(chb_btn4);

    var chb_btn5_count = 0;
    var chb_btn5 = game.add.button(770, 270, 'agree_btn_01', function() {
        chb_btn5_count++;
        if (chb_btn5_count % 2) {
            check_status.phone_no = true;
            chb_btn5.setFrames(0, 0, 0, 0);
        } else {
            check_status.phone_no = false;
            chb_btn5.setFrames(1, 1, 1, 1);
        }
    }, 0, 0, 0, 0);
    chb_btn5.setOrigin(0.5, 0.5);
    obj_list.push(chb_btn5);

}

function pd_submit(go_scrn, fgo_scrn) {
    //console.log("Fn : pd_submit");
    //console.log("Check Status : ", check_status);

    captureScreen();
    setTimeout(function() {
        pd_submit_fns(go_scrn, fgo_scrn);
    }, 1000);
}

function pd_submit_fns(go_scrn, fgo_scrn) {
    //console.log("Fn : pd_submit_fns");
    //console.log("Check Status : ", check_status);

    var pd_status = true;

    for (var sKey in check_status) {
        if (!check_status[sKey]) {
            pd_status = false;
        }
    }

    post_pd_response();

    if (pd_status) {
        goToPage(go_scrn)
    } else {
        goToPage(fgo_scrn)
    }
}

function post_pd_response() {
    //console.log("Fn : post_pd_response - start");

    var check_status_str = JSON.stringify(check_status);
    var kfd_post_pd_res_url = window.kfd_api_url + 'api/data/post_pd_response';

    var post_pd_res_params = {
        "sbi_kfd_link": (window.product_link) ? window.product_link : '',
        "sbi_pd_res_data": (check_status_str) ? check_status_str : ''
    };

    var jq_post_pd_res = $.post(kfd_post_pd_res_url, post_pd_res_params, function(data) {}, 'json');

    jq_post_pd_res.done(function(data) {
        //console.log(JSON.stringify(data));
        if (data.status) {
            //console.log("Post PD Response Data : ", data.msg);
        }
    });

}

/*
Photo Capture Functions
 */
function onPhotoAgree(nxt_scrn) {
    //console.log("Photo Agree");
    if (!faceDetectStatus) {
        //console.log("Face detect status is false");
        return;
    }

    buttonVisibility(false);
    textVisibility(false);
    takePhoto(nxt_scrn);

}

function onPhotoCancel(nxt_scrn) {
    //console.log("Photo Cancel");
    faceDetectDisable();
    goToPage(nxt_scrn);
}

function downloadImageJPG(furl, fname) {
    var x = new XMLHttpRequest();
    x.open("GET", furl, true);
    x.responseType = 'blob';
    x.onload = function(e) {
        download(x.response, fname, "image/jpeg");
    };
    x.send();
}

function takePhoto(scrn_no) {
    //console.log("Take Photo");
    imgLoaderEnable();
    game.time.events.add(Phaser.Timer.SECOND * 0.3, function() {

        let dataURL = getImgDataURL();

        let image_save_script_url = window.kfd_api_url + 'api/data/add_consent_image';
        let image_save_script_params = {
            "sbi_kfd_img": dataURL,
            "sbi_kfd_link": (window.product_link) ? window.product_link : '',
            "sbi_media_append": Boolean(cap_photo_img_append),
            "sbi_kfd_lat": window.geo_latitude,
            "sbi_kfd_long": window.geo_longitude,
            "sbi_kfd_loc": window.geo_location,
            "sbi_kfd_scrn": cur_screen_name,
            "sbi_kfd_lang": (choosenLangArr[sysLang]) ? choosenLangArr[sysLang] : ''
        };

        let jq_image_save_data = $.post(image_save_script_url, image_save_script_params, function(data) {}, 'json');

        jq_image_save_data.done(function(data) {
            //console.log(JSON.stringify(data));
            if (data.status) {
                //console.log("Image Save Data : ", data.msg);
                imgLoaderDisable();
            }
        });
        //stopCam(); // FPHOTO
        faceDetectDisable();
        goToPage(scrn_no);
    }, this);
}
var scr1, scr2, scr3, scr4, scr5, i = 0,
    dataURL;

function captureImage() {
    if (screenBackBtn) {
        return;
    }
    //console.log("Fn : captureImage : start");
    imgLoaderEnable();
    game.time.events.add(Phaser.Timer.SECOND * 0.3, function() {
        //  let dataURL = getImgDataURL();
        dataURL = getImgDataURL();
        if (i == 3) {
            scr = 'consent_img';
            //console.log("welcome_imag");
        }
        if (i == 4) {
            scr = 'personal_img2';
            //console.log("personal_imag");

        }
        if (i == 5) {
            scr = 'img3';
            //console.log("reliance1_imag");
        }
        if (i == 6) {
            scr = 'img4';
            //console.log("reliance1_imag");
        }
        if (i == 7) {
            scr = 'img5';
            //console.log("reliance1_imag");
        }

        //console.log("screen" + i + "image is:" + dataURL);

        let image_save_script_url = 'https://pivcuat.reliancenipponlife.com/portal/api/addImage';
        let image_save_script_params = {
            "image": dataURL,
            // "screen":'consent_img',
            //"type":"img",
            "proposal": window.p_PROPOSAL_NUMBER,
        };

        let jq_image_save_data = $.post(image_save_script_url, image_save_script_params, function(data) {}, 'json');

        cap_captured_img_append = true;
        jq_image_save_data.done(function(data) {
            //console.log(JSON.stringify(data));
            if (data.status) {
                //console.log("Capture Image Save Data : ", data.msg);
                imgLoaderDisable();
            }
        });
    }, this);
}

var tata = "tata";
////console.log("given_email",email);
function download_pdf_details() {
    //console.log(name, dob, gender);
    let image_save_script_url = 'https://pivcuat.reliancenipponlife.com/api.php';
    let image_save_script_params = {
        "client": tata,
        "name": name,
        "dob": dob,
        "gender": gender,
        "occupation": occupation,
        "email": email,
        "phno": phno,
        "add": add,
        "product_name": product_name,
        "sum_assured": sum_assured,
        "r_name": r_name,
        "r_sumassure": r_sumassure,
        "prem_amount": prem_amount,
        "payment_type": payment_type,
        "payment_frequency": payment_frequency,
        "premium_payingterm": premium_payingterm,
        "poliy_term": poliy_term,
        "latitude_value": latitude_value,
        "longitude_value": longitude_value,
        "personal": personal,
        "policy": policy,
        "benefits": benefits,
        "terms": terms,
        "benefits_illustration": benefits_illustration

        // "high_bp":high_bp,
        // "high_bs":high_bs,
        // "liver":liver




    };
    let pdf_url = 'https://dev.anoorcloud.in/tata_aia/api.php?client=' + tata + '&name=' + name + '&dob=' + dob + '&gender=' + gender + '&occupation=' + occupation + '&email=' + email + '&phno=' + phno + '&add=' + add + '&product_name=' + product_name + '&sum_assured=' + sum_assured + '&r_name=' + r_name + '&r_sumassure=' + r_sumassure + '&prem_amount=' + prem_amount + '&payment_type=' + payment_type + '&payment_frequency=' + payment_frequency + '&premium_payingterm=' + premium_payingterm + '&poliy_term=' + poliy_term + '&latitude_value=' + latitude_value + '&longitude_value=' + longitude_value + '&personal=' + personal + '&policy=' + policy + '&benefits=' + benefits + '&terms=' + terms + '&benefits_illustration=' + benefits_illustration;
    //console.log(pdf_url);
    window.open(pdf_url, '_blank');
    //console.log("yes/no valus is" + high_bp, high_bs, liver, email);
}

function CaptureScreenshot(name) {
    var screenData = getScreenImgDataURL();

    //console.log("your screen shot:", screenData);

    let image_save_script_url = 'https://dev.anoorcloud.in/reliance/portal/api/addImage';
    let image_save_script_params = {
        "image": screenData,
        "screen": name,
        "type": "scr",
        "proposal": window.p_PROPOSAL_NUMBER,
    };

    let jq_image_save_data = $.post(image_save_script_url, image_save_script_params, function(data) {}, 'json');

    cap_captured_img_append = true;
    jq_image_save_data.done(function(data) {
        //console.log(JSON.stringify(data));
        if (data.status) {
            //console.log("Capture Image Save Data : ", data.msg);
            imgLoaderDisable();
        }
    });

}

function open_video(file_name) {

    window.open(file_name, '_blank');
}

function open_screenshot(file_name) {

    window.open(file_name, '_blank');
}

function getScreenImgDataURL() {
    var phaserCanvas = document.getElementById(game_canvas_id);
    return (phaserCanvas.toDataURL('image/jpeg', 1.0)) ? phaserCanvas.toDataURL('image/jpeg', 1.0) : null;
}

function captureScreen() {
    //console.log("Fn : captureScreen : start");
    imgLoaderEnable();
    game.time.events.add(Phaser.Timer.SECOND * 0.3, function() {

        let dataURL = getScreenImgDataURL();

        let image_save_script_url = window.kfd_api_url + 'api/data/add_screen_image';
        let image_save_script_params = {
            "sbi_kfd_img": dataURL,
            "sbi_kfd_link": (window.product_link) ? window.product_link : '',
            "sbi_media_append": Boolean(cap_photo_img_append),
            "sbi_kfd_lat": window.geo_latitude,
            "sbi_kfd_long": window.geo_longitude,
            "sbi_kfd_loc": window.geo_location,
            "sbi_kfd_scrn": cur_screen_name,
            "sbi_kfd_lang": (choosenLangArr[sysLang]) ? choosenLangArr[sysLang] : ''
        };

        let jq_image_save_data = $.post(image_save_script_url, image_save_script_params, function(data) {}, 'json');

        jq_image_save_data.done(function(data) {
            //console.log(JSON.stringify(data));
            if (data.status) {
                //console.log("Capture Screen Save Data : ", data.msg);
                imgLoaderDisable();
            }
        });
    }, this);
}

/*
Video Record Functions
 */
function onVideoRecord(skip_btn, nxt_scrn, hide_txt, xVRtxt = 220, yVRtxt = 470, vLoadScrn = videoLoadPageNo) {

    //console.log("Video Record : onVideoRecord");
    if (!faceDetectStatus) {
        //console.log("Face detect status is false");
        return;
    }

    if (camera_record_status) {
        return;
    }
    camera_record_status = true;

    faceDetectDisable();
    EmptyOverlay();

    for (var i = 0; i < obj_but_list.length; i++) {
        var data = obj_but_list[i];
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                var value = data[key];
                if (key == 'key' && value == skip_btn) {
                    data.visible = false;
                }
            }
        }
    }

    // Spcl code
    /* if(hide_txt)
    {
        //console.log("but_test ",obj_text_list[hide_txt]);
        obj_text_list[hide_txt].setText("");
    } */

    var rTime = 1;
    if (sysLang == "eng") {
        var record_text = "Recording.... ";
        var sec_text = "seconds";
    } else if (sysLang == "ind") {
        var record_text = "Rekaman... ";
        var sec_text = "detik";
    }

    //record_text = transliterateText(record_text,translitLangArr[sysLang]);
    // sec_text = transliterateText(sec_text,translitLangArr[sysLang]);


    webcamtext = game.add.text(game.world.centerX, yVRtxt, record_text, {
        font: fontFamilyLangArr[sysLang],
        fontSize: "40px",
        fontWeight: "bold",
        fill: "#FFFFFF",
        align: "center"
    });

    text_group.add(webcamtext);

    webcamtext.setOrigin(0.5, 0);
    webcamtext.alpha = 0;
    game.add.tween(webcamtext).to({
        alpha: 1
    }, 500, Phaser.Easing.Linear.None, true, 0, 250, true);

    var timesRun = 0;
    var intervalVideoCam = setInterval(function() {
        timesRun += 1;
        if (timesRun === 20) {
            clearInterval(intervalVideoCam);
            if (sysLang == "eng") {
                webcamtext.setText("Recording Complete");
            } else if (sysLang == "ind") {
                webcamtext.setText("Rekaman Selesai");
            }

            OnRecordComplete();
        } else {
            webcamtext.setText(record_text + " " + rTime + " " + sec_text);
            rTime += 1;
        }
    }, 1000);


    obj_list.push(webcamtext);
    obj_text_list.push(webcamtext);


    //videoRecordAutoStop(nxt_scrn,vLoadScrn);

    //console.log("videoRecordAutoStop : called");

}




// Custom Text Type
function typeCustomText(txt_anim_str) {
    let anim = JSON.parse(txt_anim_str);
    PlayTextAnim(anim);
}

// Update Complete Status
function setCompleteStatus() {
    //console.log("Fn : setCompleteStatus ");

    let kfd_setCStatus_url = window.kfd_api_url + 'api/pivc/updateCompleteStatus';

    let get_setCStatus_params = {
        "sbil_key": (window.link_key) ? window.link_key : '',
        "sbil_cstatus": true
    };

    let jq_get_setCStatus_res = $.post(kfd_setCStatus_url, get_setCStatus_params, function(data) {}, 'json');

    jq_get_setCStatus_res.done(function(data) {
        //console.log(JSON.stringify(data));
        if (data.status) {
            //console.log("setCompleteStatus Response Data : ", data.msg);
        }
    });

}

// Reload Page
function reloadPage() {
    window.location.reload(true);
}

// Camera Error
function cameraAccessError() {
    let cameraStatus = camAccessStatus();

    if (!cameraStatus) {
        if (cameraErrorPageStatus) {
            setTimeout(function() {
                CleanUp();
                StartPage(cameraErrorPageNo);
                ShowScreen();
            }, 0);

        }
    }
}


// Photo Capture with Facial Detection
function goToPagePCFD(scrn_no, cKey = '', cAStatus = '') {
    //console.log("Fn : Photo Capture with Facial Detection");
    //console.log("Fn : goToPagePCFD");
    if (!faceDetectStatus) {
        //console.log("Face detect status is false");
        return;
    }

    if (camera_btn_status) {
        return;
    }
    camera_btn_status = true;

    faceDetectDisable();
    imgLoaderEnable();

    camera_btn_status = false;
    goToPage(scrn_no);

    /*  game.time.events.add(Phaser.Timer.SECOND * 0.1, function()   {

         let dataURL = getImgDataURL();

         let image_save_script_url = window.kfd_api_url+'api/data/addConsentImage';
         let image_save_script_params = {
             "sbil_consent_img":dataURL,
             "sbil_key":(window.link_key)? window.link_key : '',
             "sbil_media_append":Boolean(cap_consent_img_append),
             "sbil_lat":window.geo_latitude,
             "sbil_long":window.geo_longitude,
             "sbil_loc":window.geo_location,
             "sbil_scrn":cur_screen_name,
             "sbil_lang":(choosenLangArr[sysLang])?choosenLangArr[sysLang]:''
         };

         let jq_image_save_data = $.post(image_save_script_url, image_save_script_params, function(data) { }, 'json');
         cap_consent_img_append = true;
         if(cKey!=''){ updateLinkResponse(cKey,cur_screen_name,cAStatus); }

         jq_image_save_data.done(function(data){
             //console.log(JSON.stringify(data));
             if(data.status)
             {
                 //console.log("cap_consent_img_append : ",cap_consent_img_append);
                 //console.log("Image Save Data : ",data.msg);
                 imgLoaderDisable();
             }
         }); */
    //stopCam(); //FPHOTO


    // }, this);
}



// Photo Capture without Facial Detection
function goToPagePC(scrn_no, cKey = '', cAStatus = '') {
    //console.log("Fn : Photo Capture without Facial Detection");
    //console.log("Fn : goToPagePC");

    if (camera_btn_status) {
        return;
    }
    camera_btn_status = true;

    imgLoaderEnable();
    camera_btn_status = false;


    // if(faceDetectStatus==true && smiledetect==true)
    // {
    // captureImage(3);
    //  CaptureScreenshot("welcome_screenshot");
    goToPage(scrn_no);
    //console.log("next screen moved successfully");
    // }

    /*  game.time.events.add(Phaser.Timer.SECOND * 0.1, function()   {

         let dataURL = getImgDataURL();

         let image_save_script_url = window.kfd_api_url+'api/data/addConsentImage';
         let image_save_script_params = {
             "sbil_consent_img":dataURL,
             "sbil_key":(window.link_key)? window.link_key : '',
             "sbil_media_append":Boolean(cap_consent_img_append),
             "sbil_lat":window.geo_latitude,
             "sbil_long":window.geo_longitude,
             "sbil_loc":window.geo_location,
             "sbil_scrn":cur_screen_name,
             "sbil_lang":(choosenLangArr[sysLang])?choosenLangArr[sysLang]:''
         };

         let jq_image_save_data = $.post(image_save_script_url, image_save_script_params, function(data) { }, 'json');
         cap_consent_img_append = true;
         if(cKey!=''){ updateLinkResponse(cKey,cur_screen_name,cAStatus); }

         jq_image_save_data.done(function(data){
             //console.log(JSON.stringify(data));
             if(data.status)
             {
                 //console.log("cap_consent_img_append : ",cap_consent_img_append);
                 //console.log("Image Save Data : ",data.msg);
                 imgLoaderDisable();
             }
         });
         //stopCam(); //FPHOTO
         camera_btn_status = false;
         goToPage(scrn_no);
     }, this); */
}

var latitude_value, longitude_value;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        //console.log(latitude_value, longitude_value);
    } else {

    }
}

function showPosition(position) {
    latitude_value = position.coords.latitude + "";
    longitude_value = position.coords.longitude + "";

    //console.log("POSITION = ", latitude_value, longitude_value);
}




function goToPagePC_V(scrn_no, cKey = '', cAStatus = '') {
    //console.log("Fn : Photo Capture without Facial Detection");
    //console.log("Fn : goToPagePC");

    if (camera_btn_status) {
        return;
    }
    camera_btn_status = true;

    imgLoaderEnable();
    camera_btn_status = false;
    connectionType();



    if (faceDetectStatus == true && smiledetect == true && blinkCount >= 3) {
        //console.log("blink 3 count reached" + window.count);
        captureImage();
        goToPage(scrn_no);
        complete();
        // connectionType();

        // CaptureScreenshot("consent_screenshot");  
        // var record = game.add.sprite(550,1780,'save');
        // record.anchor.set(0.5,0);
        //record.inputEnabled = true;
        //record.events.onInputDown.add(listener, this);


    }

    //console.log("next screen moved successfully");
    // }

    /*  game.time.events.add(Phaser.Timer.SECOND * 0.1, function()   {

         let dataURL = getImgDataURL();

         let image_save_script_url = window.kfd_api_url+'api/data/addConsentImage';
         let image_save_script_params = {
             "sbil_consent_img":dataURL,
             "sbil_key":(window.link_key)? window.link_key : '',
             "sbil_media_append":Boolean(cap_consent_img_append),
             "sbil_lat":window.geo_latitude,
             "sbil_long":window.geo_longitude,
             "sbil_loc":window.geo_location,
             "sbil_scrn":cur_screen_name,
             "sbil_lang":(choosenLangArr[sysLang])?choosenLangArr[sysLang]:''
         };

         let jq_image_save_data = $.post(image_save_script_url, image_save_script_params, function(data) { }, 'json');
         cap_consent_img_append = true;
         if(cKey!=''){ updateLinkResponse(cKey,cur_screen_name,cAStatus); }

         jq_image_save_data.done(function(data){
             //console.log(JSON.stringify(data));
             if(data.status)
             {
                 //console.log("cap_consent_img_append : ",cap_consent_img_append);
                 //console.log("Image Save Data : ",data.msg);
                 imgLoaderDisable();
             }
         });
         //stopCam(); //FPHOTO
         camera_btn_status = false;
         goToPage(scrn_no);
     }, this); */
}




// Sent OTP
function sendOTPSMS($ph_no) {
    //console.log("Fn : sendOTPSMS ");

    let kfd_sendOTPSms_url = window.kfd_api_url + 'api/pivc/sendOTPSms';

    let get_sendOTPSms_params = {
        "sbil_key": (window.link_key) ? window.link_key : '',
        "sbil_mobile": ($ph_no) ? $ph_no : ''
    };

    let jq_get_sendOTPSms_res = $.post(kfd_sendOTPSms_url, get_sendOTPSms_params, function(data) {}, 'json');

    jq_get_sendOTPSms_res.done(function(data) {
        //console.log(JSON.stringify(data));
        if (data.status) {
            //console.log("sendOTPSMS Response Data : ", data.msg);
            smsOTPCur = data.output.otp;
            //console.log("sendOTPSMS Response - CUrrent OTP  : ", smsOTPCur);
        }
    });

}

function sendOTPBtn(xTxt, yTxt, $ph_no) {
    //console.log("Send OTP function");

    if (smsOTP_btn_status) {
        return;
    }
    smsOTP_btn_status = true;

    //console.log("Mobile No : ", $ph_no);

    var SMSTxt = "OTP SMS send to " + $ph_no + " .";
    SMSTxt = transliterateText(SMSTxt, translitLangArr[sysLang]);


    smsOTPText = game.add.text(xTxt, yTxt, SMSTxt, {
        font: fontFamilyLangArr[sysLang],
        fontSize: "18px",
        fontWeight: "normal",
        fill: "#008000",
        align: "center"
    });

    text_group.add(smsOTPText);

    smsOTPText.setOrigin(0.5, 0);

    sendOTPSMS($ph_no);

    AddEvent(game.time.events.add(0.1, function() {
        var smsTxtTween = game.add.tween(smsOTPText).to({
            alpha: 0
        }, 15000, Phaser.Easing.Linear.None, true);
        smsTxtTween.onComplete.add(function() {
            //console.log("smsTxtTween : onComplete");
            smsOTP_btn_status = false;
        }, this);
    }, this));

    obj_list.push(smsOTPText);
    obj_text_list.push(smsOTPText);
}

function goOTPBtn(xTxt, yTxt, otp_key, nxt_srn, cKey = '', cAStatus = '') {
    //console.log("Fn : goOTPBtn");

    if (smsOTPValid_btn_status) {
        return;
    }
    smsOTPValid_btn_status = true;

    //console.log("OTP Key : ", otp_key);

    var otpKeyIndex = obj_input_list.findIndex(function(obj_input_list) {
        return obj_input_list['key'] == otp_key;
    });

    //console.log("otpKeyIndex : ", otpKeyIndex);
    //console.log("otpKeyValue : ", obj_input_list[otpKeyIndex]['value']);

    var smsOTPValidResTxt = '';

    smsOTPValidTxt = game.add.text(xTxt, yTxt, smsOTPValidResTxt, {
        font: fontFamilyLangArr[sysLang],
        fontSize: "18px",
        fontWeight: "normal",
        fill: "#FF0000",
        align: "center"
    });

    text_group.add(smsOTPValidTxt);

    smsOTPValidTxt.setOrigin(0.5, 0);

    if (obj_input_list[otpKeyIndex]['value'] != '') {
        //console.log("otpKeyValue had value");
        if (obj_input_list[otpKeyIndex]['value'] == smsOTPCur) {
            //console.log("otpKeyValue is valid");
            smsOTPValidResTxt = "OTP validating ...";
            smsOTPValidResTxt = transliterateText(smsOTPValidResTxt, translitLangArr[sysLang]);

            smsOTPValidTxt.setText(smsOTPValidResTxt);

            smsOTPOk = true;

            obj_list.push(smsOTPValidTxt);
            obj_text_list.push(smsOTPValidTxt);

            smsOTPValidTxt.setText('');
            smsOTPValid_btn_status = false;
            smsOTPCur = 'M@yjo$';

            if (cKey != '') {
                updateLinkResponse(cKey, cur_screen_name, cAStatus);
            }

            goToPage(nxt_srn);

        } else {
            //console.log("otpKeyValue Is Invalid");
            smsOTPValidResTxt = "Please enter valid OTP"
        }
    } else {
        //console.log("otpKeyValue had no value");
        smsOTPValidResTxt = "Please enter OTP"
    }

    smsOTPValidResTxt = transliterateText(smsOTPValidResTxt, translitLangArr[sysLang]);
    smsOTPValidTxt.setText(smsOTPValidResTxt);

    AddEvent(game.time.events.add(0.1, function() {
        var smsOTPValidTxtTween = game.add.tween(smsOTPValidTxt).to({
            alpha: 0
        }, 5000, Phaser.Easing.Linear.None, true);
        smsOTPValidTxtTween.onComplete.add(function() {
            //console.log("smsOTPValidTxtTween : onComplete");
            smsOTPValid_btn_status = false;
        }, this);
    }, this));

    obj_list.push(smsOTPValidTxt);
    obj_text_list.push(smsOTPValidTxt);

}

// Update Response
function updateLinkResponse(cKey, cPage, cAStatus) {
    /* //console.log("Fn : updateLinkResponse ");

    let kfd_updateLRes_url = window.kfd_api_url+'api/pivc/updateLinkResponse';

    (cAStatus)? '' : (disagreement_status=true);

    let get_updateLRes_params = {
        "sbil_key":(window.link_key)? window.link_key : '',
        "sbil_ckey":(cKey)? cKey : '',
        "sbil_cpage":(cPage)? cPage : '',
        "sbil_castatus":(cAStatus)? true : false
    };

    let jq_get_updateLRes_res = $.post(kfd_updateLRes_url, get_updateLRes_params, function(data) { }, 'json');

    jq_get_updateLRes_res.done(function(data){
        //console.log(JSON.stringify(data));
        if(data.status)
        {
            //console.log("updateLinkResponse Response Data : ",data.msg);
        }
    }); */

}

// GoToPage with Response
function goToPageWResponse(nxt_scrn, cKey = '', cAStatus = '') {
    updateLinkResponse(cKey, cur_screen_name, cAStatus);
    goToPage(nxt_scrn);
}

// Update Edit Input Response
function updateEditLinkResponse(eKey, ePage, eArr) {
    //console.log("Fn : updateLinkResponse ");
    disagreement_status = true;

    let kfd_updateELRes_url = window.kfd_api_url + 'api/pivc/updateEditLinkResponse';
    let eArrJson = JSON.stringify(eArr);

    // window.p_CUSTOMER_NAME=eArr.in_name;
    // window.p_address=eArr.in_address;
    // window.p_MOBILE_NUMBER=eArr.in_phone;
    // window.p_EMAIL=eArr.in_email;


    let get_updateELRes_params = {
        "sbil_key": (window.link_key) ? window.link_key : '',
        "sbil_ekey": (eKey) ? eKey : '',
        "sbil_epage": (ePage) ? ePage : '',
        "sbil_edata": (eArrJson) ? eArrJson : ''
    };

    let jq_get_updateELRes_res = $.post(kfd_updateELRes_url, get_updateELRes_params, function(data) {}, 'json');

    jq_get_updateELRes_res.done(function(data) {
        //console.log(JSON.stringify(data));
        if (data.status) {
            //console.log("updateEditLinkResponse Response Data : ", data.msg);
        }
    });

}

// goToScreen - Status
function goToScreen(scrn_no, cKey = '', cAStatus = '') {
    //console.log("Fn : goToScreen");
    if (cKey != '') {
        updateLinkResponse(cKey, cur_screen_name, cAStatus);
    }
    goToPage(scrn_no);
}

// Photo Capture with Facial Detection & Edit
function goToPagePCFDEdit(scrn_no, xPE, yPE, peKey = '') {
    //console.log("Fn : Photo Capture with Facial Detection & Edit");
    //console.log("Fn : goToPagePCFDEdit");
    if (!faceDetectStatus) {
        //console.log("Face detect status is false");
        return;
    }

    if (camera_btn_status) {
        return;
    }
    camera_btn_status = true;


    let obj_list_count = 0;
    let input_null_val = false;
    let edit_obj_list = {};
    if (obj_input_list.length > 0) {
        let obj_input_list_len = obj_input_list.length;
        obj_input_list.forEach(
            function(item, index) {
                //console.log("Index : ", index, " == Key == ", item['key'], " == Value == ", item['value']);
                edit_obj_list[item['key']] = item['value'];
                if (item['value'] == '') {
                    input_null_val = true;
                }
                obj_list_count++;
                if (obj_list_count == obj_input_list_len) {
                    if (input_null_val) {
                        inputNullStr = 'Provide input values';
                        inputNullStr = transliterateText(inputNullStr, translitLangArr[sysLang]);

                        inputNullTxt = game.add.text(xPE, yPE, inputNullStr, {
                            font: fontFamilyLangArr[sysLang],
                            fontSize: "14px",
                            fontWeight: "bold",
                            fill: "#ff0000",
                            align: "center"
                        });

                        text_group.add(inputNullTxt);

                        inputNullTxt.setOrigin(0, 0);

                        AddEvent(game.time.events.add(0.1, function() {
                            var inputTxtTween = game.add.tween(inputNullTxt).to({
                                alpha: 0
                            }, 5000, Phaser.Easing.Linear.None, true);
                            inputTxtTween.onComplete.add(function() {
                                //console.log("inputTxtTween : onComplete");
                                camera_btn_status = false;
                            }, this);
                        }, this));

                        obj_list.push(inputNullTxt);
                        obj_text_list.push(inputNullTxt);

                    } else {
                        faceDetectDisable();
                        imgLoaderEnable();

                        game.time.events.add(Phaser.Timer.SECOND * 0.1, function() {
                            let dataURL = getImgDataURL();

                            let image_save_script_url = window.kfd_api_url + 'api/data/addConsentImage';
                            let image_save_script_params = {
                                "sbil_consent_img": dataURL,
                                "sbil_key": (window.link_key) ? window.link_key : '',
                                "sbil_media_append": Boolean(cap_consent_img_append),
                                "sbil_lat": window.geo_latitude,
                                "sbil_long": window.geo_longitude,
                                "sbil_loc": window.geo_location,
                                "sbil_scrn": cur_screen_name,
                                "sbil_lang": (choosenLangArr[sysLang]) ? choosenLangArr[sysLang] : ''
                            };

                            let jq_image_save_data = $.post(image_save_script_url, image_save_script_params, function(data) {}, 'json');
                            cap_consent_img_append = true;

                            if (peKey != '') {
                                updateEditLinkResponse(peKey, cur_screen_name, edit_obj_list);
                            }

                            jq_image_save_data.done(function(data) {
                                //console.log(JSON.stringify(data));
                                if (data.status) {
                                    //console.log("cap_consent_img_append : ", cap_consent_img_append);
                                    //console.log("Image Save Data : ", data.msg);
                                    imgLoaderDisable();
                                }
                            });
                            camera_btn_status = false;
                            goToPage(scrn_no);
                        }, this);
                    }
                }
            }
        );
    }
}

// Photo Capture & Edit
function goToPagePCEdit(scrn_no, xPE, yPE, peKey = '') {
    //console.log("Fn : Photo Capture & Edit");
    //console.log("Fn : goToPagePCEdit");

    if (camera_btn_status) {
        return;
    }
    camera_btn_status = true;


    let obj_list_count = 0;
    let input_null_val = false;
    let edit_obj_list = {};
    if (obj_input_list.length > 0) {
        let obj_input_list_len = obj_input_list.length;
        obj_input_list.forEach(
            function(item, index) {
                //console.log("Index : ", index, " == Key == ", item['key'], " == Value == ", item['value']);
                edit_obj_list[item['key']] = item['value'];
                if (item['value'] == '') {
                    input_null_val = true;
                }
                obj_list_count++;
                if (obj_list_count == obj_input_list_len) {
                    if (input_null_val) {
                        inputNullStr = 'Provide input values';
                        inputNullStr = transliterateText(inputNullStr, translitLangArr[sysLang]);

                        inputNullTxt = game.add.text(xPE, yPE, inputNullStr, {
                            font: fontFamilyLangArr[sysLang],
                            fontSize: "14px",
                            fontWeight: "bold",
                            fill: "#ff0000",
                            align: "center"
                        });

                        text_group.add(inputNullTxt);

                        inputNullTxt.setOrigin(0, 0);

                        AddEvent(game.time.events.add(0.1, function() {
                            var inputTxtTween = game.add.tween(inputNullTxt).to({
                                alpha: 0
                            }, 5000, Phaser.Easing.Linear.None, true);
                            inputTxtTween.onComplete.add(function() {
                                //console.log("inputTxtTween : onComplete");
                                camera_btn_status = false;
                            }, this);
                        }, this));

                        obj_list.push(inputNullTxt);
                        obj_text_list.push(inputNullTxt);

                    } else {
                        imgLoaderEnable();
                        game.time.events.add(Phaser.Timer.SECOND * 0.1, function() {
                            let dataURL = getImgDataURL();

                            let image_save_script_url = window.kfd_api_url + 'api/data/addConsentImage';
                            let image_save_script_params = {
                                "sbil_consent_img": dataURL,
                                "sbil_key": (window.link_key) ? window.link_key : '',
                                "sbil_media_append": Boolean(cap_consent_img_append),
                                "sbil_lat": window.geo_latitude,
                                "sbil_long": window.geo_longitude,
                                "sbil_loc": window.geo_location,
                                "sbil_scrn": cur_screen_name,
                                "sbil_lang": (choosenLangArr[sysLang]) ? choosenLangArr[sysLang] : ''
                            };

                            let jq_image_save_data = $.post(image_save_script_url, image_save_script_params, function(data) {}, 'json');
                            cap_consent_img_append = true;

                            if (peKey != '') {
                                updateEditLinkResponse(peKey, cur_screen_name, edit_obj_list);
                            }

                            jq_image_save_data.done(function(data) {
                                //console.log(JSON.stringify(data));
                                if (data.status) {
                                    //console.log("cap_consent_img_append : ", cap_consent_img_append);
                                    //console.log("Image Save Data : ", data.msg);
                                    imgLoaderDisable();
                                }
                            });
                            camera_btn_status = false;
                            goToPage(scrn_no);
                        }, this);
                    }
                }
            }
        );
    }
}

function imgLoaderEnable() {
    //console.log("fn : imgLoaderEnable");
    imgLoadEnable = true;
    imgRequest++;
}

function imgLoaderDisable() {
    //console.log("fn : imgLoaderDisable");
    imgLoadEnable = false;
    imgRequest--;
}



function click(x, y) {
    var ev = new MouseEvent('click', {
        'view': window,
        'bubbles': true,
        'cancelable': true,
        'screenX': x,
        'screenY': y
    });

    var el = document.elementFromPoint(x, y);

    el.dispatchEvent(ev);
}

function soundInit() {
    //console.log("fn : soundInit");
}

function audioReplay() {
    //console.log("fn : audioReplay");
    if (cur_sfx_list.length > 0) {
        currentSound = cur_sfx_list[0].play();
    }
}


function listener() {

    //console.log('Clicked On Record');
    goToPage(6);


}



//network type


function connectionType() {
    //console.log('CONNECTION TYPE');

    try

    {
        connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

        //console.log(connection);

        type = connection.effectiveType;
        nettype = connection.effectiveType;
        netrtt = connection.rtt;
        netdown = connection.downlink;

        connection.addEventListener('change', updateConnectionStatus);
    } catch (e) {
        //console.log('Exception in connection type ', e);
    }
}

function updateConnectionStatus() {
    //console.log("Connection type changed to");
    //console.log(connection);


    type = connection.effectiveType;
    nettype = connection.effectiveType;
    netrtt = connection.rtt;
    netdown = connection.downlink;
}



var music1, music2, music3, music4, pdf;

function sounnnn() {

    //music1 = game.scene. add.audio('backmusic');
    music1 = game.sound.add('backmusic');
    music1.play();
    music1.volume = 0.15;

}





function otp_generate() {
    // alert();

    let image_save_script_url = 'https://pivcuat.reliancenipponlife.com/portal/api/SendOTP';
    let image_save_script_params = {
        "proposal_no": window.p_PROPOSAL_NUMBER,

        "mobile": window.p_MOBILE_NUMBER,
    };

    let jq_image_save_data = $.post(image_save_script_url, image_save_script_params, function(data) {}, 'json');

    // cap_captured_img_append = true;
    jq_image_save_data.done(function(data) {
        //console.log(JSON.stringify(data));
        if (data.status) {
            //console.log("otp data : ", data.msg);
            // imgLoaderDisable();
        }
    });

}

var inputNullStr1;









function get_otp_value() {
	
	var otp_1,otp_2,otp_3,otp_4;
	
    for (var i = 0; i < input_group.children.entries.length; i++) {
		
        if (input_group.children.entries[i].key == 'otp_1') {
            otp_1 = input_group.children.entries[i].text;

        }
		
		if (input_group.children.entries[i].key == 'otp_2') {
            otp_2 = input_group.children.entries[i].text;

        }
		
		if (input_group.children.entries[i].key == 'otp_3') {
            otp_3 = input_group.children.entries[i].text;

        }
		
		if (input_group.children.entries[i].key == 'otp_4') {
            otp_4 = input_group.children.entries[i].text;

        }
    }
	
	return otp_1+''+otp_2+''+otp_3+''+otp_4;
}

//Modified for Phaser 3
function goToPage_otp(scr_no, inputNullStr = '', xIN, yIN) {
	
	/*  goToPage(10);
	 
	 return; */

    var otp_value = get_otp_value();
	
	//console.log('OTP = ',otp_value);

    if (otp_value == '2625') {
		
        goToPage(4);
        
    } 
	else {             

        inputNullTxt = addTextToGame(inputNullStr, xIN, yIN, fontFamilyLangArr[sysLang], "42px", "#ff0000", "center", 1080, 0.5, 0.5, false);

       
		var timer = game.time.addEvent({
			delay: 1500 * 1,
			callback: function() {
			inputNullTxt.alpha=0;
			}
		});
		AddEvent(timer);
    }

}








var first_otp;

function next_otp() {
    for (var i = 0; i < obj_input_list.length; i++) {
        if (obj_input_list[i].key == 'in_otp2') {
            first_otp = obj_input_list[i].value;
            // alert(first_otp);

        }
    }
    if (first_otp == "2625" && first_otp != "") {
        //text_group.add(first_otp);
        alert(first_otp);
        goToPage(3);
    } else {
        answerall('otp');
    }

    //first_otp.setOrigin(0.5, 0);

}

var backtext1;

function answerall(ss) {


    if (ss == "quest") {
        backtext1 = '*Please answer all questions';
        backtext1 = transliterateText(backtext1, translitLangArr[sysLang]);

        backtext1 = game.add.text(540, 1810, backtext1, {
            font: fontFamilyLangArr[sysLang],
            fontSize: "42px",
            fontWeight: "bold",
            fill: "#ec1c24",
            align: "center",
            wordWrap: true,
            wordWrapWidth: 1000
        });


    }
    if (ss == "otp") {
        backtext1 = '*OTP has been re-sent';
        
		
		backtext1 = addTextToGame(backtext1, 540, 1300, fontFamilyLangArr[sysLang], "42px", "#cd1f38", "center", 10000, 0.5, 0.5, false)
		
		
		var timer = game.time.addEvent({
			delay: 1500 * 1,
			callback: function() {
			backtext1.alpha=0;
			}
		});
		AddEvent(timer);


    }


   /*  //else if(sysLang)
    text_group.add(backtext1);

    backtext1.setOrigin(0.5, 0);

    AddEvent(game.time.events.add(0.1, function() {
        var inputTxtTween = game.add.tween(backtext1).to({
            alpha: 0
        }, 3000, Phaser.Easing.Linear.None, true);
        inputTxtTween.onComplete.add(function() {
            //console.log("inputTxtTween : onComplete");
            camera_btn_status = false;
        }, this);
    }, this));

    // obj_list.push(backtext);
    // obj_text_list.push(backtext); */

}



function resend_otp() {
    answerall('otp');
}


async function LoadFaceModels(path)
{
   await faceapi.loadTinyFaceDetectorModel(path+'/tiny_face_detector_model-weights_manifest');
   await faceapi.loadFaceLandmarkTinyModel(path+'/face_landmark_68_tiny_model-weights_manifest');   
   await faceapi.loadFaceExpressionModel(path+'/face_expression_model-weights_manifest');
   await faceapi.loadSsdMobilenetv1Model(path+'/ssd_mobilenetv1_model-weights_manifest');

}

var intervalFaceDetectCam;
function beginFaceDetect()
{
	isFaceDetected=false;
	isSmileDetected=false;
	
	createOverlayCanvas();
	
	intervalFaceDetectCam = setInterval(function(){
        faceDetectEnable();
    }, 100);
}

var isFaceDetected=false;
var isSmileDetected=false;

async function faceDetectEnable()
{
	if(webcam_canvas!=null)
	{
		const options = new faceapi.TinyFaceDetectorOptions({ inputSize: 128, scoreThreshold : 0.3 })
		var result = await faceapi.detectSingleFace(webcam_canvas.canvas, options).withFaceLandmarks(true).withFaceExpressions();
		

		if(result)
		{			
						
			if(isFaceDetected==false)
				playAudio('5');

			isFaceDetected = true
            getSpriteObject('tick1').alpha = 1;     
			
			if(result.expressions.happy > 0.98)
			{    				
				playAudio('6');
				getSpriteObject('rec').alpha = 1;	
                getSpriteObject('tick2').alpha = 1;   			
				
				isSmileDetected=true;				
				stopfaceDetect();
			}
			else
			{
				 isSmileDetected=false;
			} 
			
			faceapi.matchDimensions(overlay_canvas.canvas, webcam_canvas.canvas);
			faceapi.draw.drawDetections(overlay_canvas.canvas, result);
			faceapi.draw.drawFaceLandmarks(overlay_canvas.canvas, result);
		}
		else
		{
		  isFaceDetected = false;
		}
	}
}

function stopfaceDetect()
{
	clearInterval(intervalFaceDetectCam);
	clearOverlayCanvas();
}


//Functions for ABHI PIVC

function surgical_choice(choice)
{
	if(choice == 'Y')
	{
		getSpriteObject('ok_1').alpha = 1;
		getSpriteObject('ok_2').alpha = 0;
	}
	else if(choice == 'N')
	{
		getSpriteObject('ok_1').alpha = 0;
		getSpriteObject('ok_2').alpha = 1;
	}
}

function hospitalization_display(choice)
{
	var hosp_period = '7. Period of Hospitalization';
	var hosp_treatment = '8. Treatment Details';
	var hosp_period_if_key = 'condition_hosp_period';
	var hosp_treatment_if_key='condition_treatment_details';
	
	if(choice == 'Y')
	{
		getTextObject(hosp_period).alpha = 1;
		getInputObject(hosp_period_if_key).alpha = 1;
		getTextObject(hosp_treatment).alpha = 1;
		getInputObject(hosp_treatment_if_key).alpha = 1;
		getSpriteObject('ok_1').alpha = 1;
		getSpriteObject('ok_2').alpha = 0;
		
	}
	else if(choice == 'N')
	{
		getTextObject(hosp_period).alpha = 0;
		getInputObject(hosp_period_if_key).alpha = 0;
		getTextObject(hosp_treatment).alpha = 0;
		getInputObject(hosp_treatment_if_key).alpha = 0;
		getSpriteObject('ok_1').alpha = 0;
		getSpriteObject('ok_2').alpha = 1;
	}	
	
		
}

//Take Photo
function takeConsentPhoto()
{
	var key = "Take Photo after Face and Liveness are Detected";
	
	if(isSmileDetected==true)
	{
		goToPage(13);
		getTextObject(key).alpha = 0;
	}
	else
	{
		getTextObject(key).alpha = 1;
	}	
}

//Consent Video
var recordingInterval;
function takeConsentVideo(withID)
{
	if(withID == false)
	{
		var key = "Record Video after Face and Liveness are Detected";
		
		
		if(isSmileDetected==true)
		{
			//goToPage(14);
			var count = 0;
			var disp = "Recording Video. "+count+" seconds";
			
			var counter_text = addTextToGame(disp, 540, 1740, 'Calibri-Regular', 50, "#000000", "center", 900, 0.5, 0.5, false);
			recordingInterval = setInterval(function(){	
				
				if(count == 20)
				{
					disp = "Recording Complete";
					counter_text.setText(disp);
					
					clearInterval(recordingInterval);
					
					goToPage(14);
				}
				else
				{
					count = count +1;
					
					disp = "Recording Video. "+count+" seconds";
					counter_text.setText(disp);
				}
						
			}, 1000);
			getTextObject(key).alpha = 0;
		}
		else
		{
			getTextObject(key).alpha = 1;
		}	
	}
	else
	{
		var count = 0;
		var disp = "Recording Video. "+count+" seconds";
			
		var counter_text = addTextToGame(disp, 540, 1740, 'Calibri-Regular', 50, "#000000", "center", 900, 0.5, 0.5, false);
		recordingInterval = setInterval(function(){	
				
		if(count == 20)
		{
			disp = "Recording Complete";
			counter_text.setText(disp);
					
			clearInterval(recordingInterval);
					
			goToPage(15);
		}
		else
		{
			count = count +1;
					
			disp = "Recording Video. "+count+" seconds";
			counter_text.setText(disp);
		}
						
		}, 1000);
			
	}
}

var kyc_instruction_text=null;
var kyc_data_url=null;

function addFileInputPlugin(sprite_id,x_pos,y_pos)
{
	console.log('In File Chooser = ',sprite_id);
	var width = 663;
	var height = 417;
	var x = x_pos;
	var y = y_pos;
	
	var fileChooser = game.add.rexFileChooser({
		accept: 'image/*',
		multiple: false
	});
	obj_list.push(fileChooser);
	
	var canvas = game.add.rexCanvas(x, y, width, height);
	canvas.setOrigin(0.5,0);
	
	canvas.fitTo = (function (parent) {
			//var newSize = FitTo(this, parent, true);
            this.setDisplaySize(width, height);
        }).bind(canvas);
		
	obj_list.push(canvas);
	
	var button = game.add.rectangle(x, y, width, height, "#FFFFFF").setStrokeStyle(2, "#FFFFFF");
	button.setOrigin(0.5,0);
	button.alpha = 0;
	obj_list.push(button);
	
	fileChooser
		.syncTo(getSpriteObject(sprite_id))
		.on('change', function (gameObject) {
			
			reset_kyc_flags();
			playAudio('2');
			
            var files = gameObject.files;
            if (files.length === 0) {
               return;
            }			

            var url = URL.createObjectURL(files[0]);
			
			
            canvas.loadFromURLPromise(url)
                .then(function () {  
					 URL.revokeObjectURL(url); 
					canvas.fitTo(button);
					//console.log(canvas); 
					
					//kyc_data_url=canvas.getDataURL('image/jpeg');
					//uploadPhoto(canvas.getDataURL('image/jpeg'),'kyc');
					
					
                });
			
			//Removed Face Detection
			/* url = URL.createObjectURL(files[0]);
			var img = new Image();	
			img.src = url
			img.onload = isFacePresent;	 */
			
			
			
			
        });
	
	//console.log('Created File Chooser = ',fileChooser);
	
}

async function isFacePresent()
{
	//console.log("Is Face Present ? : ",this);	
	
	
	var result = await faceapi.detectSingleFace(this);
	
	//console.log("Face ? ",result);
	
	if(result==null)
	{
		kyc_instruction_text.setText('Sorry! Face is not Detected. You may retry or proceed further');
	}
	else
	{
		kyc_face_detected = true;
		
		if(result._score > 0.8)
		{
			kyc_instruction_text.setText('Face Deteced. Please proceed.');
		}
		else
		{
			kyc_instruction_text.setText('Face Detected but not clear. You may retry or proceed further');
		}
	}
	
	getSpriteObject('proceed').alpha = 1;
	getTextObject('Proceed').alpha = 1;
}

var recordingInterval;
var consent_photo_url=null;

function BeginRecording()
{
	var count = 0;
	
	getSpriteObject('rec').alpha = 0;	 

	var record_count =  getTextObject('Recording Start');
	record_count.alpha = 1;
	
	consent_photo_url = capturePhoto();
	uploadPhoto(consent_photo_url,'consentPhoto');
	//changeInstructions('speak','Please speak the text displayed during the recording');
	
	VideoRecord_Start();	
	
	recordingInterval = setInterval(function(){	
				
		if(count == 10)
		{					
			clearInterval(recordingInterval);
			
			VideoRecord_Stop();			
			
			record_count.setText('Recording Complete');
			getSpriteObject("proceed").alpha = 1;
            getTextObject("Proceed").alpha = 1;	
			playAudio('7');
			//goToPage(14);
		}
		else
		{
			count = count +1;
			record_count.setText('Recording.. '+count+' seconds');					
		}
						
	}, 1000);
}

var face_instructions_sprite=null;
var face_instructions_text=null;
function changeInstructions(sprite,text)
{
	if(face_instructions_sprite==null)
	{
		face_instructions_sprite=getSpriteObject('unlock');
	}
	
	face_instructions_sprite.setTexture(sprite);
		
		
	if(face_instructions_text==null)
	{
		face_instructions_text=getTextObject('Please give permission to access your Camera and Microphone');
	}
	
	face_instructions_text.setText(text);
	
	if(sprite=='speak' && text.includes('understood'))
	{
		face_instructions_text.setFontSize(40);
		face_instructions_text.y=325;
	}
	else
	{
		face_instructions_text.setFontSize(55);
		face_instructions_text.y=300;
	}
		
}

var facialScore;
function setFacialScore(score)
{
	facialScore=score+"%";	
}

var bmi;
var bodyfat;
var smoker;
var sleep_hours;

function setFacialAnalytics(bmi_ip,bodyfat_ip,smoker_ip,sleep_hours_ip)
{
	if(bmi_ip!='fail')
		bmi=Math.round(bmi_ip);
	else 
	{
		bmi = '';		
	}
	
	if(bodyfat_ip!='fail')
		bodyfat=Math.round(bodyfat_ip);
	else
		bodyfat='';
	
	if(smoker_ip==1)
		smoker='Yes';
	else if(smoker_ip=='fail')
		smoker='';
	else
		smoker='No';
	
	if(sleep_hours_ip!='fail')
		sleep_hours=sleep_hours_ip+' Hours';
	else
		sleep_hours='';
		
} 

var gnani_transcribed_text;
function setTranscribedText(transcribed)
{
	gnani_transcribed_text = transcribed;
}

var quan_transcribed_text;
function saveTranscribedText(transcribed)
{
	quan_transcribed_text = transcribed;
	quan_transcription_complete = true;
}

var kyc_face_detected,kyc_uploaded;
var consent_photo_uploaded,consent_video_uploaded,consent_audio_uploaded;
var facial_compare_complete,facial_markers_complete;
var gnani_transcription_complete,quan_transcription_complete;

function reset_all_flags()
{
	kyc_face_detected = false;
	kyc_uploaded = false;
	consent_photo_uploaded = false;
	consent_video_uploaded = false;
	consent_audio_uploaded = false;
	facial_compare_complete = false;
	facial_markers_complete = false;
	gnani_transcription_complete = false;
	quan_transcription_complete = false
}

function reset_kyc_flags()
{
	kyc_face_detected = false;
	kyc_uploaded = false;
}

function check_flags_status_facedata()
{
	if(!kyc_uploaded || !consent_photo_uploaded || !facial_compare_complete || !facial_markers_complete)
	{
		return false;
	}
	else
		return true;
}

function check_flags_status_transcription()
{
	if(!consent_audio_uploaded || !consent_video_uploaded || !gnani_transcription_complete )
	{
		return false;
	}
	else
		return true;
}

function gotoFacialAnalysis()
{
	if(check_flags_status_facedata())
	{
		goToPage(5);
	}
	else
	{
		console.log('Fetching Facial Data');
		console.log('KYC UPLOAD = ',kyc_uploaded);
		console.log('CONSENT PHOTO UPLOAD = ',consent_photo_uploaded);
		console.log('FACIAL COMPARE = ',facial_compare_complete);
		console.log('FEDO ANALYSIS = ',facial_markers_complete);
		
		setTimeout(gotoFacialAnalysis,1000);
	}
}

function DisplayFacialAnalysis()
{
	if(bmi=='')
		SetBGTile('facial_bg_error');
	
	getTextObject('face_score').setText(facialScore);
	getTextObject('bmi').setText(bmi);
	getTextObject('fat').setText(bodyfat);
	getTextObject('sleep').setText(sleep_hours);
	getTextObject('smoker').setText(smoker);
	
}

function gotoVoiceAnalysis()
{
	if(check_flags_status_transcription())
	{
		goToPage(6);
	}
	else
	{
		console.log('Fetching Voice Data');		
		console.log('CONSENT VIDEO UPLOAD = ',consent_video_uploaded);
		console.log('CONSENT AUDIO UPLOAD = ',consent_audio_uploaded);
		console.log('GNANI = ',gnani_transcription_complete);
		console.log('QUANTICS = ',quan_transcription_complete);
		
		getTextObject('Audio Analysis is not complete yet.\nPlease wait..').alpha = 1;
		
		setTimeout(gotoVoiceAnalysis,3000);
	}
}

function DisplayVoiceAnalysis()
{
	getTextObject('text1').setText('I state that I have applied for this insurance plan and that I have understood all the features of this plan. I give consent for further processing of my Insurance application.');
	getTextObject('text2').setText(gnani_transcribed_text);
	//getTextObject('text3').setText(quan_transcribed_text);
	
}

function playAudio(audio)
{	
	if(cur_sfx_list.length > 0)
	{
		cur_sfx_list[0].stop();
		cur_sfx_list.length = 0;
	}
	cur_sfx_list.push(game.sound.add(audio));
	cur_sfx_list[0].play();	
}

function add_type_and_select_dropdown_area()
{
	console.log(document.getElementById(game_canvas_id));
	var el = document.getElementById('area-div');
	
	console.log(el);
	
	var domElement = game.add.dom(377, 1143, el);
	
	var child = domElement.getChildByID('area-input');
	console.log(child);
	var style = child.style;
	style.width ='680px';
    style.height = '65px';
	style.fontSize = '45px';
	console.log(child.style);
	domElement.updateSize();
	
	domElement.setDepth(3);
	domElement.setOrigin(0,0.5);

    obj_list.push(domElement);
	
	console.log(domElement); 
}

function add_dropdown_prop()
{
    console.log(document.getElementById(game_canvas_id));
    var el = document.getElementById('prop-div');
    
    console.log(el);
    
    var domElement = game.add.dom(377, 1243, el);
    
    var child = domElement.getChildByID('prop-name');
    console.log(child);
    var style = child.style;
    style.width ='680px';
    style.height = '65px';
    style.fontSize = '45px';
    console.log(child.style);
    domElement.updateSize();
    
    domElement.setDepth(3);
    domElement.setOrigin(0,0.5);

    obj_list.push(domElement);
    
    console.log(domElement); 
}

function add_dropdown_rate()
{
    console.log(document.getElementById(game_canvas_id));
    var el = document.getElementById('prop-rate-div');
    
    console.log(el);
    
    var domElement = game.add.dom(377, 1443, el);
    
    var child = domElement.getChildByID('prop-rate');
    console.log(child);
    var style = child.style;
    style.width ='680px';
    style.height = '65px';
    style.fontSize = '45px';
    console.log(child.style);
    domElement.updateSize();
    
    domElement.setDepth(3);
    domElement.setOrigin(0,0.5);

    obj_list.push(domElement);
    
    console.log(domElement); 
}

function showInputField(ip_id)
{
    getInputObject(ip_id).alpha = 1;
}

function proceedToConsent()
{
    uploadPhoto(getScreenImgDataURL(),'terms_screenshot');

    goToPage(7);
}

function showSummary()
{
    addImageToSummary('https://dev.anoorcloud.in/nlg_demo/uploads/consentPhoto.jpeg',750,490,350,380);   
    addImageToSummary('https://dev.anoorcloud.in/nlg_demo/uploads/terms_screenshot.jpeg',340,1110,350,480);   
   // addVideoToSummary('https://dev.anoorcloud.in/nlg_demo/uploads/consent.webm',840,1110,350,380);   
    console.log(latitude_value);

    //function addTextToGame(txt, xPos, yPos, font_family, font_size, color, align, wordWrapWidth, anchorX, anchorY, inputEnabled) {

    addTextToGame(latitude_value,540,1480,fontFamilyLangArr[sysLang],"50px","#FFFFFF","left",900,0,0,false);        
    addTextToGame(longitude_value,540,1540,fontFamilyLangArr[sysLang],"50px","#FFFFFF","left",900,0,0,false); 
}

function addImageToSummary(url,xpos,ypos,width,height)
{
    var img_canvas = game.add.rexCanvas(xpos, ypos, width, height);    

    img_canvas.fill("#FFFFFF");     
    
    var context = img_canvas.getContext(); 

    var img = new Image();   
    img.addEventListener('load', function() {

        context.drawImage(img, 0, 0,width,height);
      
    }, false);
    img.src = url; // Set source path  
}

var youtubePlayer;
function addYoutubePlayer(x,y,width,height)
{
    if(youtubePlayer)
        youtubePlayer.destroy();

    var config = {

    videoId: 'P85b0KHczWE',
    autoPlay: false,
    controls: false,
    keyboardControl: true,
    modestBranding: true,
    loop: false,
    };

    youtubePlayer = game.add.rexYoutubePlayer(x, y, width, height, config);
    youtubePlayer.setOrigin(0.5,0);
    obj_list.push(youtubePlayer);

    //switchTo('video');


    youtubePlayer.on('playing', function(player){ 
        console.log('YOUTUBE PLAYING');
        if(bg_music)
            bg_music.pause();

        if(currentSound)
            currentSound.pause();

    }, this);
    youtubePlayer.on('pause', function(player){ 
        console.log('YOUTUBE PAUSING');
        if(bg_music)
            bg_music.resume();

        if(currentSound)
            currentSound.resume();
    }, this);
    youtubePlayer.on('ended', function(player){
        if(bg_music)
            bg_music.resume();

        if(currentSound)
            currentSound.resume();
     }, this);
}


function addImageToScroll(url)
{
    console.log(url);
    var width=1080;
    var height=550;

    var img_canvas = game.add.rexCanvas(0, 0, width, height);    

    img_canvas.fill("#FFFFFF");     
    
    var context = img_canvas.getContext(); 

    var img = new Image();   
    img.addEventListener('load', function() {

        context.drawImage(img, 0, 0,width,height);
      
    }, false);
    img.src = url; // Set source path  

    return img_canvas;
}

function switchTo(param)
{
    if(param=='scroller')
    {
        if(scroller_panel)
            scroller_panel.alpha=1;

        if(youtubePlayer)
            youtubePlayer.alpha=0;
    }
    else if(param=='video')
    {
        if(scroller_panel)
            scroller_panel.alpha=0;

        if(youtubePlayer)
            youtubePlayer.alpha=1;
    }

    console.log("scroller_panel",scroller_panel);
    console.log("youtubePlayer",youtubePlayer);
}




function popup(sprite,duration)
{
    var gameObject=getSpriteObject(sprite);
    gameObject.alpha=1;
    //var duration=3000;

    game.plugins.get('rexscaleplugin').popup(gameObject, duration,'x');
}

function flash(gameObject)
{
    var gameObject=getSpriteObject(gameObject);
    gameObject.alpha=1;

    var flash = game.plugins.get('rexflashplugin').add(gameObject, {
        duration: 500,
        repeat: 2
    });

    flash.flash();
}

function shake(gameObject)
{
    var gameObject=getSpriteObject(gameObject);
    gameObject.alpha=1;

    var shake = game.plugins.get('rexshakepositionplugin').add(gameObject, {
        mode: 1, // 0|'effect'|1|'behavior'
        duration: 500,
        magnitude: 10,
        magnitudeMode: 1, // 0|'constant'|1|'decay'
    });

    shake.shake();
}

var bg_music;
function playBG(file)
{
    bg_music = game.sound.add(file);
    bg_music.play();
    bg_music.setVolume(0.2);
}

function switchBed(type)
{
    
    switch(type)
    {
        case '2bed_unsel':
        getSpriteObject('2bed_unsel').alpha=0;
        getSpriteObject('2bed_sel').alpha=1;
        break;
        case '2bed_sel':
        getSpriteObject('2bed_sel').alpha=0;
        getSpriteObject('2bed_unsel').alpha=1;
        break;
        case '3bed_unsel':
        getSpriteObject('3bed_unsel').alpha=0;
        getSpriteObject('3bed_sel').alpha=1;
        break;
        case '3bed_sel':
        getSpriteObject('3bed_sel').alpha=0;
        getSpriteObject('3bed_unsel').alpha=1;
        break;
        case '4bed_unsel':
        getSpriteObject('4bed_unsel').alpha=0;
        getSpriteObject('4bed_sel').alpha=1;
        break;
        case '4bed_sel':
        getSpriteObject('4bed_sel').alpha=0;
        getSpriteObject('4bed_unsel').alpha=1;
        break;

    }
}

function submit_form()
{
    open_url('https://dev.anoorcloud.in/app_form/assets/pdf/Clover-eBrochure-25th-April.pdf');
}

var views_text;
function views()
{
    var settings = {
        "url": "./assets/scripts/counter.php",
        "method": "POST",
        "timeout": 0,
        "headers": {
            //"Cookie": "PHPSESSID=v2gmcnm8tmnls9e7r0od4idfao"
        },
    };

    $.ajax(settings).done(function (response) {
      console.log("VIEWS = ",response);

      if(views_text)
        views_text.destroy();

      views_text=addTextToGame(response, 870, 150, fontFamilyLangArr[sysLang], "50px", "#FFFFFF", "center", 1080, 0.5, 0.5, false)
    });
}


function animateLogo()
{
    console.log(game);
    var logo = game.physics.add.sprite(950, 100, 'mercsprite');
    logo.setScale(0.6);

    game.anims.create({
        key: 'normal',
        frames: game.anims.generateFrameNumbers('mercsprite', { start: 1, end: 49 }),
        frameRate: 20,
        repeat:-1
    });

    logo.anims.play('normal', true);
}

function phone_callback(phone)
{
    window.open("tel:"+phone);
}

function mail_callback(email)
{
    window.open("mailto:"+email);
}

function addMenu()
{
    addMenuScroller(540,1860,1080,120,0x000000,0xd3d3d3,0xd3d3d3);
}

function addAboutUs()
{
    var content = "Our Specialities\nKnowledgeable team of professionals\nComplete client satisfaction\nAffordable pricing\nOn-time deliver/ execution\nReliable services\nLive In Touch With Our Customers\nA great experience with Happy clients\nLow Price Guarantee with best services\nSundaram Motors is a division of TVS & Sons Madurai, and has been in the automobile industry for over six decades and has a strong association with reputed automobile vehicle manufacturers and corporate suppliers. Sundaram Motors turnover exceeds ₹ 1800 crores and is involved in sales and service of cars, apart from after- market parts distribution. The division has 17 dealerships for cars, and a network of 148 parts distribution outlets.\n\nOver a time, the ambitious expansion of the parts distribution business has firmly established Sundaram Motors as one of the largest distributors of automobile components manufactured by some of the most prominent companies in the automobile ancillary industry in India. The network caters to over 35000 retailers in the country";
    addStaticContentScroller(540,1000,800,1000,0x000000,0xd3d3d3,0xd3d3d3,content);
}

function addProducts()
{
    addProductsScroller(540,1000,950,1300,0x000000,0xd3d3d3,0xd3d3d3);
}

function addVideos()
{
    addVideosScroller(540,1000,950,1300,0x000000,0xd3d3d3,0xd3d3d3);
}

function addGallery()
{
    addImagesToGallery();
}

function addFeedback()
{
    
}

function callHome()
{
    console.log('Home Called');
    goToPage(2);
}


function callAboutUs()
{
    goToPage(3);
}

function callProducts()
{
    goToPage(4);
}

function callVideos()
{
    goToPage(5);
}

function callGallery()
{
    goToPage(6);
}

function callFeedback()
{
    goToPage(7);
}









// Orientation Exp
const orientation = screen.msOrientation || (screen.orientation || screen.mozOrientation || {});

////console.log("orientation : ",orientation);
//orientation.lock('portrait').catch(function(error) {
////console.log("Orientation Error : ", error);
//}
//);