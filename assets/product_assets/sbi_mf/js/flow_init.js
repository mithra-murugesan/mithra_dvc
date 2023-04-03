/*
 Animation Flow
 PageByPage
 */
var l_green = '#92d050';
var d_green = '#50af31';
var white = '#FFFFFF';
var black = '#000000';
var blue = '#0070c0';

window.stage = {
    "screens": []
};


window.common_screens = [




    {
        "sprite_animations": [

        ],

        "text_animations": [

          {
                "text": [{
                    "content": ""
                }],
                "sx": 90,
                "sy": 330,
                "x": 90,
                "y": 330,
                "size": 50,
                "weight": "bold",
                "color": white,
                "tween_type": "Elastic.easeOut",
                "timing": 500,
                "delay": 0,
                "anchor": [0, 0.5],
                "align": "justify",
                "alpha": 0,
                "wordWrapWidth": 700,
                //"disappear": 5.5
            },



        ],



        "functions": [{
                "fn": "init()",
                "delay": 0
            },


            {
                "fn": "loadLangFlow(\"eng\",\"normal\",2)",
                "delay": 0
            },



        ],

        "name": "Start",
        "timing": -1,
        "index": 0
    },


];



for (var i = 0; i < window.common_screens.length; i++) {
    window.stage.screens.push(window.common_screens[i]);
}