window.stage.screens = [];

var d_blue = '#174774';
var l_blue = '#0f8dc8';


for (var i = 0; i < window.common_screens.length; i++) {
    window.stage.screens.push(window.common_screens[i]);
}


var screens_eng = [{

        "functions": [{
                "fn": "SetBGTile('bg')",
                "delay": 0
            },
            {
                "fn": "langAssetsRest()",
                "delay": 0
            },

        ],
        "name": "Assets Loading",
        "timing": -1,
        "index": 1
    },

    {
        "sprite_animations": [


        {
           "sprite": "add_home_screen",
           "x": 1000,
           "y": 80,
           "loop": false,
           "timing": 0,
           "delay": 0,
           "toTopObj": 2,
           "anchor": [0.5, 0.5],
           "scale": 1,   
           "onClickFn":"prompt_pwa()"         
           }, 

           {
           "sprite": "logo_circle",
           "x": 900,
           "y": 200,
           "loop": false,
           "timing": 0,
           "delay": 0,
           "toTopObj": 2,
           "anchor": [0.5, 0.5],
           "scale": 1,                 
           }, 

         

            {
                "sprite": "contact_icon",
                "x": 160, //550
                "y": 580, //1440
                "loop": false,
                "timing": 0,
                "delay": 0,
                "toTopObj": 2,
                "anchor": [0, 0],
                "scale": 1.0,
                "onClickFn": "phone_callback(9884285710)"
            },

            {
                "sprite": "mail_icon",
                "x": 160, //550
                "y": 800, //1440
                "loop": false,
                "timing": 0,
                "delay": 0,
                "toTopObj": 2,
                "anchor": [0, 0.5],
                "scale": 1.0,
                "onClickFn": "mail_callback('mithra@anurcloud.com')"
            },

            {
                "sprite": "adres_icon",
                "x": 160, //550
                "y": 1000, //1440
                "loop": false,
                "timing": 0,
                "delay": 0,
                "toTopObj": 2,
                "anchor": [0, 0.5],
                "scale": 1.0,
                "onClickFn": "open_url('https://www.google.com/maps/place/Anur+Cloud+Technologies+Private+Limited/@13.0307474,80.2380133,15z/data=!4m5!3m4!1s0x0:0x1b94a4f6f9dec1f7!8m2!3d13.0307861!4d80.2380967')"
            },

            {
                "sprite": "schedule_call",
                "x": 240, //550
                "y": 1300, //1440
                "loop": false,
                "timing": 0,
                "delay": 0,
                "toTopObj": 2,
                "anchor": [0.5, 0.5],
                "scale": 0.9,
                "onClickFn": "goToPage(3)",
            },

            {
                "sprite": "whatsapp_icon",
                "x": 440, //550
                "y": 1300, //1440
                "loop": false,
                "timing": 0,
                "delay": 0,
                "toTopObj": 2,
                "anchor": [0.5, 0.5],
                "scale": 0.9,
                "onClickFn": "chatonwhatsapp()"
            },

            {
                "sprite": "website",
                "x": 640, //550
                "y": 1300, //1440
                "loop": false,
                "timing": 0,
                "delay": 0,
                "toTopObj": 2,
                "anchor": [0.5, 0.5],
                "scale": 0.9,
                "onClickFn": "open_url(\'https://anurcloud.com/\')"
            },

            {
                "sprite": "save_contact",
                "x": 840, //550
                "y": 1300, //1440
                "loop": false,
                "timing": 0,
                "delay": 0,
                "toTopObj": 2,
                "anchor": [0.5, 0.5],
                "scale": 0.9,
                "onClickFn": "download_local_file(\'https://dev.anurcloud.com/mithra_murugesan/assets/Mithra_murugesan.vcf\')"
            },

             {
                "sprite": "share_contact",
                "x": 300, //550
                "y": 420, //1440
                "loop": false,
                "timing": 0,
                "delay": 0,
                "toTopObj": 2,
                "anchor": [0.5, 0.5],
                "scale": 1,
                "onClickFn": "open_share()"
            },



            {
                "sprite": "facebook",
                "x": 130, //550
                "y": 1580, //1440
                "loop": false,
                "timing": 0,
                "delay": 0,
                "toTopObj": 2,
                "anchor": [0.5, 0.5],
                "scale": 0.9,
                "onClickFn": "facebook_callback()"
            },

            {
                "sprite": "instagram",
                "x": 280, //550
                "y": 1580, //1440
                "loop": false,
                "timing": 0,
                "delay": 0,
                "toTopObj": 2,
                "anchor": [0.5, 0.5],
                "scale": 0.9,
                "onClickFn": "insta_callback()"
            },

            {
                "sprite": "twitter",
                "x": 430, //550
                "y": 1580, //1440
                "loop": false,
                "timing": 0,
                "delay": 0,
                "toTopObj": 2,
                "anchor": [0.5, 0.5],
                "scale": 0.9,
                "onClickFn": "twitter_callback()"
            },

            {
                "sprite": "linkedin",
                "x": 580, //550
                "y": 1580, //1440
                "loop": false,
                "timing": 0,
                "delay": 0,
                "toTopObj": 2,
                "anchor": [0.5, 0.5],
                "scale": 0.9,
                "onClickFn": "linkedin_callback()"
            },

            {
                "sprite": "qr",
                "x": 880, //550
                "y": 1580, //1440
                "loop": false,
                "timing": 0,
                "delay": 0,
                "toTopObj": 3,
                "anchor": [0.5, 0.5],
                "scale": 0.25,
            },

             {
                "sprite": "qr_placeholder",
                "x": 880, //550
                "y": 1580, //1440
                "loop": false,
                "timing": 0,
                "delay": 0,
                "toTopObj": 2,
                "anchor": [0.5, 0.5],
                "scale": 1,
            },

            //Tabs

             {
                "sprite": "home_tab_selected",
                "x": 200, //550
                "y": 1830, //1440
                "loop": false,
                "timing": 0,
                "delay": 0,
                "toTopObj": 2,
                "anchor": [0.5, 0.5],
                "scale": 1,
            },


             {
                "sprite": "enquiry_tab_unselected",
                "x": 540, //550
                "y": 1830, //1440
                "loop": false,
                "timing": 0,
                "delay": 0,
                "toTopObj": 2,
                "anchor": [0.5, 0.5],
                "scale": 1,
                "onClickFn":"goToPage(3)"
            },

             {
                "sprite": "product_tab_unselected",
                "x": 880, //550
                "y": 1830, //1440
                "loop": false,
                "timing": 0,
                "delay": 0,
                "toTopObj": 2,
                "anchor": [0.5, 0.5],
                "scale": 1,
                "onClickFn":"goToPage(4)"
            },

            //  {
            //     "sprite": "play_button",
            //     "x": 800, //550
            //     "y": 680, //1440
            //     "loop": false,
            //     "timing": 0,
            //     "delay": 0,
            //     "toTopObj": 5,
            //     "anchor": [0.5, 0.5],
            //     "scale": 0.5,
            //     "onClickFn":"play_profile_video()"
            // },

             {
                "sprite": "profile_pic",
                "x": 800, //550
                "y": 520, //1440
                "loop": false,
                "timing": 0,
                "delay": 0,
                "toTopObj": 3,
                "anchor": [0.5, 0.5],
                "scale": 0.8,
            },


        ],

        "text_animations": [




        ],

        "input_animations": [




        ],

        "functions": [

            {

                "fn": "SetBGTile('bg')",
                "delay": 0
            },

            //  {

            //     "fn": "add_profile_video()",
            //     "delay": 2
            // },

        ],

        /* "sound_list": [{
             "sound": ["welcome"]
         }],*/

        "name": "welcome",
        "timing": -1, //10
        "index": 2
    },

    {
        "sprite_animations": [

        {
           "sprite": "add_home_screen",
           "x": 1000,
           "y": 80,
           "loop": false,
           "timing": 0,
           "delay": 0,
           "toTopObj": 2,
           "anchor": [0.5, 0.5],
           "scale": 1,   
           "onClickFn":"prompt_pwa()"         
           }, 

           {
           "sprite": "logo_circle",
           "x": 900,
           "y": 200,
           "loop": false,
           "timing": 0,
           "delay": 0,
           "toTopObj": 2,
           "anchor": [0.5, 0.5],
           "scale": 1,                 
           }, 


              {
                "sprite": "home_tab_unselected",
                "x": 200, //550
                "y": 1830, //1440
                "loop": false,
                "timing": 0,
                "delay": 0,
                "toTopObj": 2,
                "anchor": [0.5, 0.5],
                "scale": 1,
                "onClickFn":"goToPage(2)"
            },


             {
                "sprite": "enquiry_tab_selected",
                "x": 540, //550
                "y": 1830, //1440
                "loop": false,
                "timing": 0,
                "delay": 0,
                "toTopObj": 2,
                "anchor": [0.5, 0.5],
                "scale": 1,
                "onClickFn":"goToPage(3)"
            },

             {
                "sprite": "product_tab_unselected",
                "x": 880, //550
                "y": 1830, //1440
                "loop": false,
                "timing": 0,
                "delay": 0,
                "toTopObj": 2,
                "anchor": [0.5, 0.5],
                "scale": 1,
                 "onClickFn":"goToPage(4)"
            },

            {
                "sprite": "submit_btn",
                "x": 850, //550
                "y": 1620, //1440
                "loop": false,
                "timing": 0,
                "delay": 0,
                "toTopObj": 2,
                "anchor": [0.5, 0.5],
                "scale": 1,
                "onClickFn": "submit_enquiry()"
            },

        ],

        "text_animations": [

          {
                "text": [{
                    "content": "Please fill all the details to submit your enquiry."
                }],
                "sx": 100,
                "sy": 1620,
                "x": 100,
                "y": 1620,
                "size": 35,
                "weight": "bold",
                "color": '#FF0000',
                "tween_type": "Elastic.easeOut",
                "timing": 500,
                "delay": 0,
                "anchor": [0, 0.5],
                "align": "left",
                "alpha": 0,
                "wordWrapWidth": 550,
                //"disappear": 5.5
            },

              {
                "text": [{
                    "content": "Enquiry Submitted Successfully!"
                }],
                "sx": 100,
                "sy": 1620,
                "x": 100,
                "y": 1620,
                "size": 35,
                "weight": "bold",
                "color": '#FFFFFF',
                "tween_type": "Elastic.easeOut",
                "timing": 500,
                "delay": 0,
                "anchor": [0, 0.5],
                "align": "left",
                "alpha": 0,
                "wordWrapWidth": 550,
                //"disappear": 5.5
            },


        ],

        "input_animations": [

            {
                "text": [{
                    "content": ""
                }],
                "key": "in_name",
                "sx": 200,
                "sy": 730,
                "x": 200,
                "y": 730,
                "size": 42,
                "weight": "bold",
                "width": 700,
                "height": 70,
                "backgroundColor": "transparent",
                "fill": "#FFFFFF",
                "fontFamily": "Helvetica",
                "tween_type": "Elastic.easeOut",
                "timing": 200,
                "delay": 0,
                "anchor": [0, 0.5],
                "padding": 10,
                "align": "left",
                "type": "text",
                "placeHolder":"Enter your Name"
            },

            {
                "text": [{
                    "content": ""
                }],
                "key": "in_contact",
                "sx": 200,
                "sy": 940,
                "x": 200,
                "y": 940,
                "size": 42,
                "weight": "bold",
                "width": 700,
                "height": 70,
                "backgroundColor": "transparent",
                "fill": "#FFFFFF",
                "fontFamily": "Helvetica",
                "tween_type": "Elastic.easeOut",
                "timing": 200,
                "delay": 0,
                "anchor": [0, 0.5],
                "padding": 10,
                "align": "left",
                "type": "number",
                "placeHolder":"Enter your Contact Number"
            },

            {
                "text": [{
                    "content": ""
                }],
                "key": "in_email",
                "sx": 200,
                "sy": 1140,
                "x": 200,
                "y": 1140,
                "size": 42,
                "weight": "bold",
                "width": 700,
                "height": 70,
                "backgroundColor": "transparent",
                "fill": "#FFFFFF",
                "fontFamily": "Helvetica",
                "tween_type": "Elastic.easeOut",
                "timing": 200,
                "delay": 0,
                "anchor": [0, 0.5],
                "padding": 10,
                "align": "left",
                "type": "text",
                "placeHolder":"Enter your Email"
            },

            {
                "text": [{
                    "content": ""
                }],
                "key": "in_message",
                "sx": 200,
                "sy": 1340,
                "x": 200,
                "y": 1340,
                "size": 42,
                "weight": "bold",
                "width": 700,
                "height": 70,
                "backgroundColor": "transparent",
                "fill": "#FFFFFF",
                "fontFamily": "Helvetica",
                "tween_type": "Elastic.easeOut",
                "timing": 200,
                "delay": 0,
                "anchor": [0, 0.5],
                "padding": 10,
                "align": "left",
                "type": "text",
                "placeHolder":"Enter your Message"
            },

        ],


        "functions": [

            {

                "fn": "SetBGTile('enquiry_bg')",
                "delay": 0
            },

        ],


        "name": "enquiry",
        "timing": -1, //10
        "index": 3
    },

    {

         "sprite_animations": [

         {
           "sprite": "add_home_screen",
           "x": 1000,
           "y": 80,
           "loop": false,
           "timing": 0,
           "delay": 0,
           "toTopObj": 2,
           "anchor": [0.5, 0.5],
           "scale": 1,   
           "onClickFn":"prompt_pwa()"         
           }, 

           {
           "sprite": "logo_circle",
           "x": 900,
           "y": 200,
           "loop": false,
           "timing": 0,
           "delay": 0,
           "toTopObj": 2,
           "anchor": [0.5, 0.5],
           "scale": 1,                 
           }, 


              {
                "sprite": "home_tab_unselected",
                "x": 200, //550
                "y": 1830, //1440
                "loop": false,
                "timing": 0,
                "delay": 0,
                "toTopObj": 3,
                "anchor": [0.5, 0.5],
                "scale": 1,
                "onClickFn":"goToPage(2)"
            },


             {
                "sprite": "enquiry_tab_unselected",
                "x": 540, //550
                "y": 1830, //1440
                "loop": false,
                "timing": 0,
                "delay": 0,
                "toTopObj": 3,
                "anchor": [0.5, 0.5],
                "scale": 1,
                "onClickFn":"goToPage(3)"
            },

             {
                "sprite": "product_tab_selected",
                "x": 880, //550
                "y": 1830, //1440
                "loop": false,
                "timing": 0,
                "delay": 0,
                "toTopObj": 3,
                "anchor": [0.5, 0.5],
                "scale": 1,
                 "onClickFn":"goToPage(4)"
            },

               {
                "sprite": "pivc",
                "x": 100, //550
                "y": 400, //1440
                "loop": false,
                "timing": 0,
                "delay": 0,
                "toTopObj": 2,
                "anchor": [0, 0],
                "scale": 1,
                "onClickFn":"make_visible(\'pivc_bg\'),make_visible(\'book_a_demo_product_btn\')"
            },

             {
                "sprite": "dwc",
                "x": 580, //550
                "y": 400, //1440
                "loop": false,
                "timing": 0,
                "delay": 0,
                "toTopObj": 2,
                "anchor": [0, 0],
                "scale": 1,
                "onClickFn":"make_visible(\'dwc_bg\'),make_visible(\'book_a_demo_product_btn\')"
            },

                {
                "sprite": "digital_intro",
                "x": 100, //550
                "y": 950, //1440
                "loop": false,
                "timing": 0,
                "delay": 0,
                "toTopObj": 2,
                "anchor": [0, 0],
                "scale": 1,
                "onClickFn":"make_visible(\'digital_intro_bg\'),make_visible(\'book_a_demo_product_btn\')"
            },

             {
                "sprite": "other_products",
                "x": 580, //550
                "y": 950, //1440
                "loop": false,
                "timing": 0,
                "delay": 0,
                "toTopObj": 2,
                "anchor": [0, 0],
                "scale": 1,                
            },

            {
                "sprite": "digital_intro_bg",
                "x": 0, //550
                "y": 0, //1440
                "loop": false,
                "timing": 0,
                "delay": 0,
                "toTopObj": 2,
                "anchor": [0, 0],
                "scale": 1,    
                "alpha":0            
            },

             {
                "sprite": "pivc_bg",
                "x": 0, //550
                "y": 0, //1440
                "loop": false,
                "timing": 0,
                "delay": 0,
                "toTopObj": 2,
                "anchor": [0, 0],
                "scale": 1,  
                "alpha":0              
            },

             {
                "sprite": "dwc_bg",
                "x": 0, //550
                "y": 0, //1440
                "loop": false,
                "timing": 0,
                "delay": 0,
                "toTopObj": 2,
                "anchor": [0, 0],
                "scale": 1,     
                "alpha":0           
            },


             {
                "sprite": "book_a_demo_product_btn",
                "x": 850, //550
                "y": 1650, //1440
                "loop": false,
                "timing": 0,
                "delay": 0,
                "toTopObj": 3,
                "anchor": [0.5, 0.5],
                "scale": 1,     
                "alpha":0,
                "onClickFn":"goToPage(3)"           
            },

            

        ],


         "functions": [

            {

                "fn": "SetBGTile('product_bg')",
                "delay": 0
            },

        ],


        "name": "enquiry",
        "timing": -1, //10
        "index": 4
    }

];



for (var i = 0; i < screens_eng.length; i++) {
    window.stage.screens.push(screens_eng[i]);
}