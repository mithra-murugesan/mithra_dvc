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

var game_scale = Phaser.Scale.FIT;

if (window.isMobile) {
    game_scale = Phaser.Scale.ENVELOP;
} else {
    game_scale = Phaser.Scale.FIT;
}


var config = {
    parent: divId,
    dom: {
        createContainer: true
    },
    type: Phaser.CANVAS,
    width: XRes,
    height: YRes,
    scale: {
        mode: game_scale,
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
            gravity: {
                y: 0
            },
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

    //  restLoadText = game.add.text(XRes/2, YRes/2, restLoadString, {
    //     font: fontFamilyLangArr[sysLang],
    //     fontSize: "70px",
    //     fontWeight: "bold",
    //     fill: "#FFFFFF",
    //     align: "center"
    // });

    restLoadText.setOrigin(0.5, 0.5);

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
    // restLoadStatus = false;
    // restLoadText.setText("");

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
    //game.load.plugin('rexcanvasplugin', './assets/js/common/plugins/rex/rexcanvasplugin.min.js', true);
    //game.load.plugin('rexfilechooserplugin', './assets/js/common/plugins/rex/rexfilechooserplugin.min.js', true);
    //game.load.plugin('rexyoutubeplayerplugin', './assets/js/common/plugins/rex/rexyoutubeplayerplugin.min.js', true);
    game.load.scenePlugin('rexuiplugin', './assets/js/common/plugins/rex/rexuiplugin.min.js', 'rexUI', 'rexUI');
    //game.load.plugin('rexbuttonplugin', './assets/js/common/plugins/rex/rexbuttonplugin.min.js', true);

    game.load.plugin('rexscaleplugin', './assets/js/common/plugins/rex/rexscaleplugin.min.js', true);
    game.load.plugin('rexflashplugin', './assets/js/common/plugins/rex/rexflashplugin.min.js', true);
    game.load.plugin('rexmovetoplugin', './assets/js/common/plugins/rex/rexmovetoplugin.min.js', true);
    //game.load.plugin('rexflipplugin', './assets/js/common/plugins/rex/rexflipplugin.min.js', true);
    game.load.plugin('rexshakepositionplugin', './assets/js/common/plugins/rex/rexshakepositionplugin.min.js', true);
    //game.load.plugin('rextexttypingplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rextexttypingplugin.min.js', true);


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
    setDepth(text_group, 4);

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
    var fontStyle = obj.fontStyle || 'normal';

    var strokeThickness = 0;
    if (weight == 'bold')
        strokeThickness = 2;



    var font_obj = game.add.text(obj.sx, obj.sy, txt, {
        fontFamily: font_family,
        fontSize: font_size,
        fontStyle: fontStyle,
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

    if (obj.alpha == 0) {
        console.log("ALPHA 0");
        font_obj.alpha = 0;
        font_obj.setAlpha(0);
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


    var input_obj = addInputField(obj.key, obj.x, obj.y, width, height, obj.type, txt, placeHolder, font_size, backgroundColor, font_family, fill, obj.align, obj.maxLength);

    if (txt) {
        input_obj.setText(txt);
    } else {
        input_obj.setText('');
    }
    if (obj.key) {
        input_obj.key = obj.key;
    }
    input_obj.setOrigin(0.5, 0.5);


    if (obj.onBlur != '') {
        input_obj.on('blur',
            function(inputText, e) {

                var nextInput = getInputObject(obj.onBlur);

                if (nextInput != null) {
                    nextInput.setFocus();
                }

            });
    }

    if (obj.alpha == 0) {
        input_obj.alpha = 0;
    }

    input_group.add(input_obj);
    return input_obj;
}

function addInputField(ip_id, x, y, width, height, ip_type, ip_text, ip_placeholder, ip_fontsize, ip_bgcolor, ip_fontfamily, ip_fontcolor, ip_align, ip_maxLength) {


    var inputText = game.add.rexInputText(x, y, width, height, {
        id: ip_id,
        type: ip_type, //text | textarea | password | number | color
        text: ip_text,
        placeholder: ip_placeholder,
        fontSize: ip_fontsize,
        backgroundColor: ip_bgcolor,
        borderColor: 'transparent',
        fontFamily: ip_fontfamily,
        color: ip_fontcolor,
        align: ip_align
    });

    //console.log(inputText);

    obj_list.push(inputText);
    obj_input_list.push(inputText);

    inputText.on('textchange',
        function(inputText, e) {


            if (inputText.text.length >= ip_maxLength) {
                inputText.setText(inputText.text.substring(0, ip_maxLength));
                inputText.setBlur();
            }

        });

    return inputText;

}

function getInputObject(key) {
    for (var i = 0; i < input_group.children.entries.length; i++) {
        if (input_group.children.entries[i].key == key) {
            return input_group.children.entries[i];
        }
    }

    return null;
}

function getTextObject(text) {
    for (var i = 0; i < text_group.children.entries.length; i++) {
        if (text_group.children.entries[i].text == text) {
            return text_group.children.entries[i];
        }
    }

    return null;
}

function getSpriteObject(key) {

    //console.log(obj_list);
    for (var i = 0; i < obj_list.length; i++) {
        if (obj_list[i].type == "Sprite") {
            if (obj_list[i].texture.key == key) {
                return obj_list[i];
            }
        }
    }

    return null;
}


function LoadAnimation(obj, params) {
    var anim_name = "default";
    var sprite_name = params.sprite;
    var x = params.x;
    var y = params.y;
    if (!obj) {
        obj = game.add.sprite(0, 0, sprite_name);
        obj.setOrigin(0.5);
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

            if (anim.fadeout) {
                var timer = game.time.addEvent({
                    delay: 1000 * anim.fadeout,
                    callback: function() {


                        fadeout(anim.sprite, 500);

                    },
                    callbackScope: this,
                    loop: false
                });

                AddEvent(timer);
            }




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
    //  if (tween_type.startsWith("typewrite")) {
    // txt.text = "";
    // AddEvent(game.time.events.add(Phaser.Timer.SECOND * anim.delay, function() {
    //     txt = typeWriter(txt, text_toDisplay, anim.timing);
    //     obj_list.push(txt);
    //     obj_text_list.push(txt);
    // }, this));
    // }




    if (tween_type.startsWith("typewrite")) {


        //alert();
        var timer = game.time.addEvent({
            delay: 1000 * anim.delay,
            callback: function() {

                typewriter(txt);

            },
            callbackScope: this,
            loop: false
        });

        AddEvent(timer);
        obj_list.push(txt);
        obj_text_list.push(txt);
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


    } else if (anim.disappear) {
        var timer = game.time.addEvent({
            delay: 1000 * anim.delay,
            callback: function() {

                txt.alpha = 1;



                obj_list.push(txt);
                obj_text_list.push(txt);
            },
            callbackScope: this,
            loop: false
        });

        AddEvent(timer);

        var timer2 = game.time.addEvent({
            delay: 1000 * anim.disappear,
            callback: function() {


                txt.alpha = 0;

            },
            callbackScope: this,
            loop: false
        });

        AddEvent(timer2);
    } else {

        if(anim.delay>0)
        {
            var timer = game.time.addEvent({
            delay: 1000 * anim.delay,
            callback: function() {

                txt.alpha = 1;



                obj_list.push(txt);
                obj_text_list.push(txt);
            },
            callbackScope: this,
            loop: false
        });

        AddEvent(timer);
        }

        

        if (anim.disappear) {
            var timer = game.time.addEvent({
                delay: 1000 * anim.disappear,
                callback: function() {


                    txt.alpha = 0;

                },
                callbackScope: this,
                loop: false
            });

            AddEvent(timer);
        }
    }

    if (anim.onClickFn) {
        txt.inputEnabled = true;
        txt.setInteractive({
            useHandCursor: true
        });


        txt.on('pointerdown', function(pointer) {
            eval(anim.onClickFn);
        });

        if(anim.alpha==0)
        {
            txt.alpha = 0;
        }
    }


    console.log("TXT = ", txt);
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

        console.log("CURRENT AUDIO IS PLAYING? ", cur_sfx_list[0].isPlaying);
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

    if (window.stage.screens[cur_scr].timing >= 0) {
        // game.time.events.add(Phaser.Timer.SECOND * (window.stage.screens[cur_scr].timing + sfx_offset), TransitScreen, this);

        var timer = game.time.addEvent({
            delay: 1000 * (window.stage.screens[cur_scr].timing + sfx_offset),
            callback: function() {

                TransitScreen();

            },
            callbackScope: this,
            loop: false
        });

        AddEvent(timer);
    }

    //console.log('Show Screen Complete');
}

function CleanUp() {
    //console.log('Clean Up Started ', text_group);

    if(profile_video)
    {
        if(profile_video.isPlaying())
            profile_video.stop();

        profile_video.destroy();
    }

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
    } else {
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
}



function download_local_file(file) {

    var furl = file;
    var file_name = file.substr(file.lastIndexOf('/') + 1);
    
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
                download(x.response, file_name, allowed_ext[ext]);
            };
            x.send();

        } else {
            return false;
        }

    } else {
        return false;
    }
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

    $.getScript(gallery_scroller_fpath, function() {});


    $.getScript(lang_assets_fpath, function() {
        $.getScript(lang_flow_fpath, function() {
            $.when(langAssets()).then(function() {
                game.load.start();
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
        window.p_CITY_RESIDENCE = 'Bangalore';
        window.p_HEIGHT = '180';
        window.p_WEIGHT = '80';

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
            longitude_value = pos.coords.longitude;
            //return pos.coords.latitude;
        });
    }
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

function downloadImageJPG(furl, fname) {
    var x = new XMLHttpRequest();
    x.open("GET", furl, true);
    x.responseType = 'blob';
    x.onload = function(e) {
        download(x.response, fname, "image/jpeg");
    };
    x.send();
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


// Custom Text Type
function typeCustomText(txt_anim_str) {
    let anim = JSON.parse(txt_anim_str);
    PlayTextAnim(anim);
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

    type = connection.effectiveType;
    nettype = connection.effectiveType;
    netrtt = connection.rtt;
    netdown = connection.downlink;
}


function playAudio(audio) {
    if (cur_sfx_list.length > 0) {
        cur_sfx_list[0].stop();
        cur_sfx_list.length = 0;
    }
    cur_sfx_list.push(game.sound.add(audio));
    cur_sfx_list[0].play();
}

function add_type_and_select_dropdown_area() {
    console.log(document.getElementById(game_canvas_id));
    var el = document.getElementById('area-div');

    console.log(el);

    var domElement = game.add.dom(377, 1143, el);

    var child = domElement.getChildByID('area-input');
    console.log(child);
    var style = child.style;
    style.width = '680px';
    style.height = '65px';
    style.fontSize = '45px';
    console.log(child.style);
    domElement.updateSize();

    domElement.setDepth(3);
    domElement.setOrigin(0, 0.5);

    obj_list.push(domElement);

    console.log(domElement);
}


function showInputField(ip_id) {
    getInputObject(ip_id).alpha = 1;
}


function addImageFromUrl(url, xpos, ypos, width, height) {
    var img_canvas = game.add.rexCanvas(xpos, ypos, width, height);

    img_canvas.fill("#FFFFFF");

    var context = img_canvas.getContext();

    var img = new Image();
    img.addEventListener('load', function() {

        context.drawImage(img, 0, 0, width, height);

    }, false);
    img.src = url; // Set source path
}


function addImageToScroll(url) {
    console.log(url);
    var width = 1080;
    var height = 550;

    var img_canvas = game.add.rexCanvas(0, 0, width, height);

    img_canvas.fill("#FFFFFF");

    var context = img_canvas.getContext();

    var img = new Image();
    img.addEventListener('load', function() {

        context.drawImage(img, 0, 0, width, height);

    }, false);
    img.src = url; // Set source path

    return img_canvas;
}

function popup(sprite, duration) {
    var gameObject = getSpriteObject(sprite);
    gameObject.alpha = 1;
    //var duration=3000;

    game.plugins.get('rexscaleplugin').popup(gameObject, duration, 'x');
}

function popup_box(sprite, duration) {
    var gameObject = getSpriteObject(sprite);
    gameObject.alpha = 1;
    //var duration=3000;

    game.plugins.get('rexscaleplugin').popup(gameObject, duration, 'x', 'Back');
}

function flash(gameObject) {
    var gameObject = getSpriteObject(gameObject);
    gameObject.alpha = 1;

    var flash = game.plugins.get('rexflashplugin').add(gameObject, {
        duration: 500,
        repeat: 2
    });

    flash.flash();
}

function shake(gameObject) {
    var gameObject = getSpriteObject(gameObject);
    gameObject.alpha = 1;

    var shake = game.plugins.get('rexshakepositionplugin').add(gameObject, {
        mode: 1, // 0|'effect'|1|'behavior'
        duration: 500,
        magnitude: 10,
        magnitudeMode: 1, // 0|'constant'|1|'decay'
    });

    shake.shake();
}

var bg_music;

function playBG(file) {
    bg_music = game.sound.add(file);
    bg_music.play();
    bg_music.setVolume(0.2);
}

// RM contact card
    function download_product_summary() {
            //Set the File URL.
             var url = "https://dev.anoorcloud.in/rajat_chattopadhyay/assets/downloads/Product Summary - SBI Focused Equity Fund October 2021.pdf";
             //window.open(url, '_blank').focus();
            var fileName=url.substr(url.lastIndexOf('/'));
            //Create XMLHTTP Request.
            var req = new XMLHttpRequest();
            req.open("GET", url, true);
            req.responseType = "blob";
            req.onload = function () {
                //Convert the Byte Data to BLOB object.
                var blob = new Blob([req.response], { type: "application/octetstream" });
 
                //Check the Browser type and download the File.
                var isIE = false || !!document.documentMode;
                if (isIE) {
                    window.navigator.msSaveBlob(blob, fileName);
                } else {
                    var url = window.URL || window.webkitURL;
                    link = url.createObjectURL(blob);
                    var a = document.createElement("a");
                    a.setAttribute("download", fileName);
                    a.setAttribute("href", link);
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                }
            };
            req.send();
     }


// RM contact card
    function download_sbi_children() {
            //Set the File URL.
             var url = "https://dev.anoorcloud.in/rajat_chattopadhyay/assets/downloads/SBI%20Children's%20Benefit%20Fund%20-Brochure.pdf";
             //window.open(url, '_blank').focus();
            var fileName=url.substr(url.lastIndexOf('/'));
            //Create XMLHTTP Request.
            var req = new XMLHttpRequest();
            req.open("GET", url, true);
            req.responseType = "blob";
            req.onload = function () {
                //Convert the Byte Data to BLOB object.
                var blob = new Blob([req.response], { type: "application/octetstream" });
 
                //Check the Browser type and download the File.
                var isIE = false || !!document.documentMode;
                if (isIE) {
                    window.navigator.msSaveBlob(blob, fileName);
                } else {
                    var url = window.URL || window.webkitURL;
                    link = url.createObjectURL(blob);
                    var a = document.createElement("a");
                    a.setAttribute("download", fileName);
                    a.setAttribute("href", link);
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                }
            };
            req.send();
     }

//pdf
       function pdf() {
            //Set the File URL.
             var url = "https://dev.anoorcloud.in/Rahul_Chopra/assets/downloads/MSP+%20Website%20Product%20Presentation_tcm47-78821.pdf";
             //var url = "https://www.pnbmetlife.com/content/dam/pnb-metlife/docs/product/Know_More/MSP+%20Website%20Product%20Presentation_tcm47-78821.pdf";
             //window.open(url, '_blank').focus();
            var fileName=url.substr(url.lastIndexOf('/'));
            //Create XMLHTTP Request.
            var req = new XMLHttpRequest();
            req.open("GET", url, true);
            req.responseType = "blob";
            req.onload = function () {
                //Convert the Byte Data to BLOB object.
                var blob = new Blob([req.response], { type: "application/octetstream" });
 
                //Check the Browser type and download the File.
                var isIE = false || !!document.documentMode;
                if (isIE) {
                    window.navigator.msSaveBlob(blob, fileName);
                } else {
                    var url = window.URL || window.webkitURL;
                    link = url.createObjectURL(blob);
                    var a = document.createElement("a");
                    a.setAttribute("download", fileName);
                    a.setAttribute("href", link);
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                }
            };
            req.send();
     }

function submit_form() {
    open_url('https://dev.anoorcloud.in/app_form/assets/pdf/Clover-eBrochure-25th-April.pdf');
}

var views_text;

function views() {
    var settings = {
        "url": "./assets/scripts/counter.php",
        "method": "POST",
        "timeout": 0,
        "headers": {
            //"Cookie": "PHPSESSID=v2gmcnm8tmnls9e7r0od4idfao"
        },
    };

    $.ajax(settings).done(function(response) {
        console.log("VIEWS = ", response);

        if (views_text)
            views_text.destroy();

        views_text = addTextToGame(response, 870, 150, fontFamilyLangArr[sysLang], "50px", "#FFFFFF", "center", 1080, 0.5, 0.5, false)
    });
}


function animateLogo() {
    console.log(game);
    var logo = game.physics.add.sprite(950, 100, 'mercsprite');
    logo.setScale(0.6);

    game.anims.create({
        key: 'normal',
        frames: game.anims.generateFrameNumbers('mercsprite', {
            start: 1,
            end: 49
        }),
        frameRate: 20,
        repeat: -1
    });

    logo.anims.play('normal', true);
}

function phone_callback(phone) {
    window.open("tel:" + phone, '_self');
}

function mail_callback(email) //mail@ebrm.com
{
    window.open("mailto:" + email, '_self');
}

function mail_callback_enquiry(email) {
    //mailto:no-one@snai1mai1.com?subject=look at this website&body=Hi,I found this website and thought you might like it http://www.geocities.com/wowhtml/
    //window.open("mailto:" + email + "?subject=Enquiry about " + subject + "&body=Hi! I am interested in this product. Please get in touch with me at <Your Contact Number> for further discussions");
    window.open("mailto:" + email, '_self');

}


function location_callback(location)//mail@ebrm.com
{
   window.location.href ="https://www.google.com/maps/place/PNB+MetLife+India/@28.4212187,77.0054159,13z/data=!4m9!1m2!2m1!1sPlatinum+Tower,+4th+Floor,+Sohna+Road,+Gurgaon+Sector+47,+Gurgaon+-+122018!3m5!1s0x390d23720669e853:0x89d31cf306cf2365!8m2!3d28.421216!4d77.0404125!15sCkpQbGF0aW51bSBUb3dlciwgNHRoIEZsb29yLCBTb2huYSBSb2FkLCBHdXJnYW9uIFNlY3RvciA0NywgR3VyZ2FvbiAtIDEyMjAxOJIBEGNvcnBvcmF0ZV9vZmZpY2U"; 
}


function chatonwhatsapp() {

  message = "I am interested in the products that Anur offers. I would like to connect to know more."//.split(' ').join('%20')
  //var text="number:"+number+"message:"+message;
  window.open('https://api.whatsapp.com/send?phone=' +9884285710, + '&text=%20' + message)
}

function appdownload(){

    window.open_url("https://play.google.com/store/apps/details?id=com.pmli.fusion");
}

function share(){
    window.open_url("localhost/pnb_dvc/");
}

function facebook_callback(){

    window.open_url("https://www.facebook.com/anurcloud");
}

function insta_callback(){

    window.open_url("https://www.instagram.com/anurcloud/");
}

function twitter_callback(){

    window.open_url("https://twitter.com/AnurCloud");
}

function linkedin_callback(){

    window.open_url("https://in.linkedin.com/company/anur-cloud-technologies");
}



function addMenu() {
    addMenuScroller(540, 1820, 1080, 150, 0x062643, 0xd3d3d3, 0xd3d3d3);
}

function addAboutUs() {
    var content = "\nMy Career Objective is to provide genuine advise to clients in the areas of Operations and IT and recommend the optimal solution which provides value for money. Extensive Operations experience coupled with superior knowledge of the latest technologies and well versed with regulatory guidelines helps me to deliver best solutions.\n\nI have a total of 31 years of experience with 21 years across the Life Insurance & Banking industry. I also served 10 years in the Armed Forces which has instilled in me deep rooted discipline and commitment which is the bedrock of my success.\n\nThrough my experience of start-ups & driving change, I have gained tremendous learning & the relevant experience across all aspects of running Operations. My strength is to set up scalable, robust operations with focus on automation using latest technology of RPA, AI, MLetc such that the customer experiences effortless service.\n\nIn my new roles of Sales and Marketing, I am driving sales for multiple Insurtech organisations by leveraging the strong relationship and reputation built in the Industry.";
    addStaticContentScroller(540, 1225, 100, 750, 0xb1d3f3, 0x062643, 0x00529F, content);
}

function addProducts() {
    addProductsScroller(540, 900, 950, 1300, 0x062643, 0x062643, 0x00529F);
}

function addVideos() {
    addVideosScroller(540, 1000, 950, 1300, 0x000000, 0xd3d3d3, 0xd3d3d3);
}

function addGallery() {
    addImagesToGallery();
}

function addFeedback() {

}

function callHome() {
    console.log('Home Called');
    goToPage(2);
}


function callAboutUs() {
    goToPage(3);
}

function callProducts() {
    goToPage(4);
}

function callVideos() {
    goToPage(5);
}

function callGallery() {
    goToPage(6);
}

function callFeedback() {
    goToPage(7);
}

function displayProfileDetails() {
    var url = './assets/images/common/agent.png';
    addImageFromUrl(url, 540, 350, 360, 360);
}



function animateSprite(x, y, sprite_name, scale, frame_start, frame_end, frame_rate, repeat, disappear) {
    console.log('idle');
    var animation = game.physics.add.sprite(x, y, sprite_name);
    animation.setScale(scale);

    console.log(animation);

    game.anims.create({
        key: sprite_name,
        frames: game.anims.generateFrameNumbers(sprite_name, {
            start: frame_start,
            end: frame_end
        }),
        frameRate: frame_rate,
        repeat: repeat
    });

    animation.anims.play(sprite_name, true);
    groupToTop(animation, 2);

    obj_list.push(animation);

    if (disappear != -1) {
        var timer = game.time.addEvent({
            delay: 1000 * disappear,
            callback: function() {
                animation.alpha = 0;

            },
            callbackScope: this,
            loop: false
        });

        AddEvent(timer);
    }


}

function animateLogo() {
    console.log(game);
    var logo = game.physics.add.sprite(300, 1550, 'mercsprite');
    logo.setScale(0.6);

    game.anims.create({
        key: 'normal',
        frames: game.anims.generateFrameNumbers('mercsprite', {
            start: 1,
            end: 49
        }),
        frameRate: 20,
        repeat: -1
    });

    logo.anims.play('normal', true);
}

function flip(front_sprite, back_sprite, delay, orientation) {
    var gameObject = getSpriteObject(front_sprite);

    var flip = game.plugins.get('rexflipplugin').add(gameObject, {
        face: 'back',
        front: front_sprite, // key, or callback
        back: back_sprite, // key, or callback

        orientation: orientation, // 0|'x'|1|'y'
        duration: 800,
        delay: 0,
        ease: 'Expo',
    });

    flip.flip();

    window.setInterval(function() {
        flip.flip()
    }, 5000);

    console.log(flip);
}

//sprite anim play

var man_idle, man_one_hand, man_both_hands;

function init_man() {
    //alert("work");
    if (cur_scr == 2) {
        man_idle = game.physics.add.sprite(850, 1400, 'man_idle'); //540,500//840,1400
        man_idle.setScale(1.6); //1.24//1.6
        man_idle.alpha = 0;

        man_one_hand = game.physics.add.sprite(850, 1400, 'man_6');
        man_one_hand.setScale(1.6); //1.24//1.6
        man_one_hand.alpha = 0;

        man_both_hands = game.physics.add.sprite(850, 1400, 'man_4');
        man_both_hands.setScale(1.3); //1//1.3
        man_both_hands.alpha = 0;

        game.anims.create({
            key: 'idle',
            frames: game.anims.generateFrameNumbers('man_idle', {
                start: 1,
                end: 8
            }),
            frameRate: 10,
            repeat: -1 //0.5
        });

        game.anims.create({
            key: 'move_one_hand',
            frames: game.anims.generateFrameNumbers('man_6', {
                start: 1,
                end: 30
            }),
            frameRate: 10,
            repeat: -1
        });

        game.anims.create({
            key: 'move_both_hands',
            frames: game.anims.generateFrameNumbers('man_4', {
                start: 1,
                end: 28
            }),
            frameRate: 10,
            repeat: -1
        });
    }



    if (cur_scr == 3) {
        man_idle = game.physics.add.sprite(540, 1400, 'man_idle'); //540,500//740,1400
        man_idle.setScale(1.6); //1.24
        man_idle.alpha = 0;

        man_one_hand = game.physics.add.sprite(540, 1400, 'man_6');
        man_one_hand.setScale(1.6); //1.24
        man_one_hand.alpha = 0;

        man_both_hands = game.physics.add.sprite(540, 1400, 'man_4');
        man_both_hands.setScale(1.3); //1
        man_both_hands.alpha = 0;

        game.anims.create({
            key: 'idle',
            frames: game.anims.generateFrameNumbers('man_idle', {
                start: 1,
                end: 8
            }),
            frameRate: 10,
            repeat: -1
        });

        game.anims.create({
            key: 'move_one_hand',
            frames: game.anims.generateFrameNumbers('man_6', {
                start: 1,
                end: 30
            }),
            frameRate: 10,
            repeat: -1
        });

        game.anims.create({
            key: 'move_both_hands',
            frames: game.anims.generateFrameNumbers('man_4', {
                start: 1,
                end: 28
            }),
            frameRate: 10,
            repeat: -1
        });
    }
}

function man_be_idle() {
    man_one_hand.alpha = 0;
    man_idle.alpha = 1;
    man_both_hands.alpha = 0;

    man_idle.anims.play('idle', true);
}

function man_move_one_hand() {
    man_one_hand.alpha = 1;
    man_idle.alpha = 0;
    man_both_hands.alpha = 0;

    man_one_hand.anims.play('move_one_hand', true);
}

function man_move_both_hands() {
    man_one_hand.alpha = 0;
    man_idle.alpha = 0;
    man_both_hands.alpha = 1;

    man_both_hands.anims.play('move_both_hands', true);
}




function typewriter(text) {

    var typing = game.plugins.get('rextexttypingplugin').add(text, {
        speed: 40, // typing speed in ms
        typeMode: 0, //0|'left-to-right'|1|'right-to-left'|2|'middle-to-sides'|3|'sides-to-middle'
    });

    typing.start(text.text);
    text.alpha = 1;
    typing.on('complete', function(typing, txt) {

        var timer = game.time.addEvent({
            delay: 3000, //3000
            callback: function() {

                txt.alpha = 0;

            },
            callbackScope: this,
            loop: false
        });

        AddEvent(timer);

    });
}


function moveTo(gameObject, x, y, speed) {


    var sprite = getSpriteObject(gameObject);

    var origin_x = sprite.x;
    var origin_y = sprite.y;

    sprite.moveTo = game.plugins.get('rexmovetoplugin').add(sprite, {

        speed: speed,
        rotateToTarget: false

    })
    sprite.moveTo.moveTo(x, y);

    sprite.moveTo.on('complete', function(moveTo, gameObject) {
        //gameObject.x = origin_x;
        //gameObject.y = origin_y;

        sprite.setX(origin_x);
        sprite.setY(origin_y);

        move_it(gameObject.gameObject.texture.key, x, y, speed);


    });


}

function move_it(sprite, x, y, speed) {
    moveTo(sprite, x, y, speed);
}

function fadein(sprite, duration) {
    var gameObject = getSpriteObject(sprite);
    gameObject.alpha = 0;

    var alpha_incr = 1 / duration;

    var total_duration = 10;
    var fade_interval = setInterval(function() {

        if (total_duration >= duration)
            clearInterval(fade_interval);
        else {
            total_duration += 10;
            gameObject.alpha += (alpha_incr * 10);
        }
    }, 10);
}

function fadeout(sprite, duration) {
    try {
        var gameObject = getSpriteObject(sprite);
        gameObject.alpha = 1;

        var alpha_incr = 1 / duration;

        var total_duration = 10;
        var fade_interval = setInterval(function() {

            if (total_duration >= duration) {
                gameObject.alpha = 0;
                clearInterval(fade_interval);
            } else {
                total_duration += 10;
                gameObject.alpha -= (alpha_incr * 10);
            }
        }, 10);
    } catch (e) {

    }
}

function scaledown(sprite, duration, scale) {
    try {
        var gameObject = getSpriteObject(sprite);
        var curr_scale = gameObject.scale;

        //alert(curr_scale);

        var incr = -0.1;


        var scale_interval = setInterval(function() {

            if (curr_scale <= scale)
                clearInterval(scale_interval);
            else {
                curr_scale += incr;
                gameObject.scale = curr_scale;
            }
        }, 100);
    } catch (e) {

    }
}

function draw_dreams() {
    var circle1 = getCircle(540, 600, 30, 0xFF0000);
    var circle2 = getCircle(560, 620, 15, 0xFF0000);
    console.log(circle1);
    //circle1.setDepth(5);
}

function getCircle(x, y, radius, color) {
    var graphics = game.add.graphics();
    var circle = new Phaser.Geom.Circle(x, y, radius);
    graphics.fillStyle(color, 1); // color: 0xRRGGBB
    graphics.fillCircleShape(circle);

    return circle;
}

function moveClouds() {


    moveTo('cloud1', -200, 200, 50);
    moveTo('cloud2', -200, 400, 50);


}

var current_dropdown;
var scheme_type_dropdown;
var investment_type_dropdown;

function open_dropdown(flag) {

    var items_array;

    if (flag == 'scheme_type') {
        items_array = ['Debt', 'Hybrid (Debt Oriented)', 'Hybrid (Equity Oriented)', 'Equity'];
        current_dropdown = 'scheme_type';

        getSpriteObject('dark_bg').alpha = 1;
        getSpriteObject('popup_bg').alpha = 1;
         getSpriteObject('back_button').alpha = 1;
    } else if (flag == 'investment_type') {
        current_dropdown = 'investment_type';

        if (scheme_type_dropdown) {
            getSpriteObject('dark_bg').alpha = 1;
            getSpriteObject('popup_bg').alpha = 1;
             getSpriteObject('back_button').alpha = 1;

            var choice = scheme_type_dropdown.text;

            if (choice == 'Debt') {
                items_array = ['Liquidity solution', 'Parking short term surplus', 'To mitigate interest rate risk'];
            } else if (choice == 'Hybrid (Debt Oriented)') {
                items_array = ['Participation in debt but with a moderate exposure to equity'];
            } else if (choice == 'Hybrid (Equity Oriented') {
                items_array = ['Participation in equity but with a moderate exposure to debt', 'Mitigating volatility of pure equity through moderate exposure to debt & Arbitrage', 'Dynamic asset allocation to equity & debt basis view on market movements'];
            } else if (choice == 'Equity') {
                items_array = ['Tax saving solution with an added advantage to long term wealth creation', 'Participation in equity through exposure across market caps bundled in one single scheme', 'Participation in high conviction equity portfolio with  maximum 30 stocks for long term wealth creation'];
            }
        } else {
            if (investment_type_dropdown)
                investment_type_dropdown.setText('Choose Scheme Type First');
            else {
                investment_type_dropdown = getTextObject('Select Investment Type');
                investment_type_dropdown.setText('Choose Scheme Type');
            }
        }

    }

    //var items_array = ['Participation in high conviction equity portfolio with  maximum 30 stocks for long term wealth creation','test2','test3'];

    addGalleryScroller(560, 960, 900, 600, 0x000000, 0xffffff, 0xff0000, items_array);

    //createPanel(items_array,0x000000,0xffffff,0xff0000);
}

function close_dropdown(choice) {
    getSpriteObject('dark_bg').alpha = 0;
    getSpriteObject('popup_bg').alpha = 0;
     getSpriteObject('back_button').alpha = 0;
    scroller_panel.destroy();

    console.log("CHOICE = ", choice);

   // if(choice==null)
       // return;

    if (current_dropdown == 'scheme_type') {
        if (scheme_type_dropdown)
            scheme_type_dropdown.setText(choice);
        else {
            scheme_type_dropdown = getTextObject('Select Scheme Type');
            scheme_type_dropdown.setText(choice);
        }
    } else if (current_dropdown == 'investment_type') {
        if (investment_type_dropdown)
            investment_type_dropdown.setText(choice.substring(0, 35));
        else {
            investment_type_dropdown = getTextObject('Select Investment Type');
            investment_type_dropdown.setText(choice.substring(0, 35));
        }

        setTimeHorizon(choice);
    }
}

function init_scheme()
{
    scheme_type_dropdown = null;
    investment_type_dropdown = null;
    time_horizon_object = null;
    rec_scheme = null;

}

var time_horizon_object;
var rec_scheme;

function setTimeHorizon(choice) {
    if (time_horizon_object == null) {
        time_horizon_object = getTextObject('Time Horizon');
    }

    if (rec_scheme == null) {
        rec_scheme = getTextObject('Your Recommended Scheme');
    }

    var th = '';
    var rs = '';

    switch (choice) {
        case 'Liquidity solution':
            th = 'Less than 3 Months';
            rs = 'SBI Liquid Fund';
            break;

        case 'Parking short term surplus':
            th = '3 to 6 Months';
            rs = 'SBI Magnum Ultra Short Duration Fund';
            break;

        case 'To mitigate interest rate risk':
            th = '1 to 3 Years';
            rs = 'SBI Floating Rate Debt Fund';
            break;

        case 'Participation in debt but with a moderate exposure to equity':
            th = '3 Years +';
            rs = 'SBI Debt Hybrid Fund';
            break;

        case 'Participation in equity but with a moderate exposure to debt':
            th = '3 Years +';
            rs = 'SBI Equity Hybrid Fund';
            break;

        case 'Mitigating volatility of pure equity through moderate exposure to debt & Arbitrage':
            th = '2 Years +';
            rs = 'SBI Equity Savings Fund';
            break;

        case 'Dynamic asset allocation to equity & debt basis view on market movements':
            th = '3 Years +';
            rs = 'SBI Balanced Advantage Fund';
            break;

        case 'Tax saving solution with an added advantage to long term wealth creation':
            th = '3 Years +';
            rs = 'SBI Long Term Equity Fund';
            break;

        case 'Participation in equity through exposure across market caps bundled in one single scheme':
            th = '5 Years +';
            rs = 'SBI Flexicap Fund';
            break;

        case 'Participation in high conviction equity portfolio with  maximum 30 stocks for long term wealth creation':
            th = '5 Years +';
            rs = 'SBI Focused Fund';
            break;

    }

    time_horizon_object.setText(th);
    rec_scheme.setText(rs);

    display_fund_features(rs);
}

function display_fund_features(fund) {
    if (text_scroller_panel)
        text_scroller_panel.destroy();

    var text = '';

    if (fund == 'SBI Focused Fund')
        text = 'Suitable to investors looking for a concentrated portfolio of maximum 30 stocks\n\nHigh conviction stocks with a potential to generate long term capital growth\n\nSuitable for investors with long term investment horizon';
    else if (fund == 'SBI Flexicap Fund')
        text = 'An opportunity to invest across market cap through one single fund\n\nSuitable for investors with long term investment horizon\n\nPotential to generate long term growth on capital invested ';
    else if (fund == 'SBI Long Term Equity Fund')
        text = 'Suitable to investors looking for claiming tax rebate under section 80C\n\nSuitable for investors with long term investment horizon\n\nPotential to generate long term growth on capital invested';
    else if (fund == 'SBI Balanced Advantage Fund')
        text = 'Dynamic mix of Equity & Debt depending upon the market views & other internal parameters\n\nReduce volatility through participation in Arbitrage\n\nSuitable to long term investors\n\nAims to provide equity taxation';
    else if (fund == 'SBI Equity Savings Fund')
        text = 'Mix of Equity, Debt & Arbitrage\n\nParticipation in Equity to leverage potential gains\n\nParticipation in Arbitrage to lower volatility\n\nParticipation in Debt to offer stability \n\nAims to provide equity taxation';
    else if (fund == 'SBI Equity Hybrid Fund')
        text = 'Mix of Equity & Debt\n\nInvestment in Equity portion from 65% to 80% of the total assets with a potential to generate capital appreciation\n\nModerate exposure from 20% to 35% into debt for regular income & stability to the portfolio';
    else if (fund == 'SBI Debt Hybrid Fund')
        text = 'Mix of Debt & Equity\n\nInvestment in debt portion from 75% to 90% of the total assets with a potential to provide regular income & stability to the portfolio\n\nModerate exposure from 10% to 25% into equity for capital appreciation';
    else if (fund == 'SBI Floating Rate Debt Fund')
        text = 'Suitable to investors for investment in debt instruments from short to medium term\n\nCan avail benefits from indexation in the long term\n\nInvestors aiming to mitigate interest rate risk in their portfolio';
    else if (fund == 'SBI Magnum Ultra Short Duration Fund')
        text = 'Suitable to investors for parking surplus money for short term from 3 to 6 months\n\nInvestment in a mix of Money market & debt securities\n\nInvestors seeking liquidity \n\nMinimal interest rate risk';
    else if (fund == 'SBI Liquid Fund')
        text = 'Suitable to investors for parking surplus money for very short term\n\nInvestment in a mix of Money market & debt securities\n\nInvestors seeking liquidity';

    addTextScroller(500, 1520, 900, 200, 0x000000, 0xffffff, 0xff0000, text);
}

function open_share()
{
    if (navigator.share) {
        navigator.share({
            //title:'Srinivasan NV - Cofounder & CTO',
            url: window.location.href,
        }).then(() => {
            
        })
            .catch(console.error);
    } else {
       
    }
}

function open_whatsapp(phone_number)
{
    var whatsapp = 'https://wa.me/'+phone_number+'?text=Hi! I am interested to know more about SBI Mutual Fund\'s Products';

    open_url(whatsapp);
}

function add_sip_dropdown() {
    var select = document.createElement("select");

    var option = document.createElement("option");
    option.value = "Do you want to Invest in a SIP?";
    option.text = "Do you want to Invest in a SIP?";
    select.appendChild(option);

    var option = document.createElement("option");
    option.value = "Yes. Please suggest an Amount";
    option.text = "Yes. Please suggest an Amount";
    select.appendChild(option);

    var option = document.createElement("option");
    option.value = "Yes. I want to start immediately.";
    option.text = "Yes. I want to start immediately.";
    select.appendChild(option);




    document.getElementsByTagName("BODY")[0].appendChild(select);

    var domElement = game.add.dom(540, 1600-30, select);
    var dom_style = domElement.node.style;

    console.log(dom_style);

    dom_style.width = 800 + 'px';
    dom_style.height = 100 + 'px';
    dom_style.fontSize = 50 + 'px';
    dom_style.fontFamily=fontFamilyLangArr[sysLang];
    dom_style.border="none";
    dom_style.borderBottom = "3px solid #3eaee2";
    dom_style.backgroundColor="#fafafa";
    domElement.updateSize();

    domElement.setDepth(5);
    domElement.setOrigin(0.5, 0.5);

    obj_list.push(domElement);
}

function init_enquiry()
{
    getTextObject('Please fill all the details').alpha = 0;
    getTextObject('Details submitted successfully').alpha = 0;
}


function submit_enquiry()
{
    getTextObject('Please fill all the details').alpha = 0;
    getTextObject('Details submitted successfully').alpha = 0;

    getSpriteObject('asterix_1').alpha = 0;
    getSpriteObject('asterix_2').alpha = 0;
    getSpriteObject('asterix_3').alpha = 0;
    getSpriteObject('asterix_4').alpha = 0;

    if(getInputObject('ip_name').text=='')
        getSpriteObject('asterix_1').alpha = 1;

    if(getInputObject('ip_phone').text=='')
        getSpriteObject('asterix_2').alpha = 1;

     if(getInputObject('ip_email').text=='')
        getSpriteObject('asterix_3').alpha = 1;

     if(getInputObject('ip_message').text=='')
        getSpriteObject('asterix_4').alpha = 1;

    if(getInputObject('ip_name').text=='' || getInputObject('ip_phone').text=='' || getInputObject('ip_email').text=='' ||  getInputObject('ip_message').text=='')
        getTextObject('Please fill all the details').alpha = 1;
    else
         getTextObject('Details submitted successfully').alpha = 1;


}

var profile_video;
function add_profile_video()
{
    profile_video = game.add.video(800,520,'profile_video');
    profile_video.setOrigin(0.5,0.5);
    profile_video.setScale(0.8);
    profile_video.setDepth(2);
    profile_video.setVolume(4);

    obj_list.push(profile_video);

    profile_video.on('play', function(video){ 

        console.log('playing');

        getSpriteObject('profile_pic').alpha = 0;

    }, this);

    profile_video.on('pause', function(video){ 

         console.log('pause');

        getSpriteObject('profile_pic').alpha = 1;

    }, this);

    profile_video.on('stop', function(video){

         console.log('ended');

        getSpriteObject('profile_pic').alpha = 1;

     }, this);
}

function play_profile_video()
{
    if(profile_video)
    {
        if(profile_video.isPlaying())
            profile_video.stop();
        else
        {
            getSpriteObject('profile_pic').alpha = 0;
            profile_video.play();
        }
    }
}

function submit_enquiry()
{
    getTextObject('Please fill all the details to submit your enquiry.').alpha = 0;
    getTextObject('Enquiry Submitted Successfully!').alpha = 0;

    if(getInputObject('in_email').text.trim()!='' && getInputObject('in_name').text.trim()!='' && getInputObject('in_message').text.trim()!='' && getInputObject('in_message').text.trim()!='')
    {
        var form = new FormData();
    form.append("from", getInputObject('in_email').text);
    form.append("to", "mithra@anurcloud.com");
    form.append("name", getInputObject('in_name').text);
    form.append("msg", getInputObject('in_message').text);
    form.append("mobile", getInputObject('in_contact').text);

        var settings = {
          "url": "https://indiafirstlife.biz/portal/api/sendmail",
          "method": "POST",
          "timeout": 0,
          "processData": false,
          "mimeType": "multipart/form-data",
          "contentType": false,
          "data": form
        };

        $.ajax(settings).done(function (response) {
          console.log(response);
          getTextObject('Enquiry Submitted Successfully!').alpha = 1;
        });
    }
    else
    {
        getTextObject('Please fill all the details to submit your enquiry.').alpha = 1;
    }
    
}

function make_visible(bg_sprite)
{
    if(getSpriteObject(bg_sprite))
    {
        getSpriteObject(bg_sprite).alpha = 1;
    }
}

function start_bg_click()
{
    if(getSpriteObject('start_bg'))
    {
        getSpriteObject('start_bg').alpha = 0;
        play_bg_music();
    }
}

function play_bg_music()
{
    var bg_music = game.sound.add('bg_music');
    bg_music.on('volume', function(){
        console.log('volume change');
    });
    bg_music.play();
    bg_music.setVolume(0.1);
}




// Orientation Exp
const orientation = screen.msOrientation || (screen.orientation || screen.mozOrientation || {});

////console.log("orientation : ",orientation);
//orientation.lock('portrait').catch(function(error) {
////console.log("Orientation Error : ", error);
//}
//);