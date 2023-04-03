window.stage.screens = [];

var orange = '#ff6600';
var blue ='#0a6bff';
var white = '#FFFFFF';
var black = '#000000';
var dblue='#243062';
var grey='#c3c3c3';
var l_green = '#92d050';
var d_green ='#50af31';

var app_red='#C93D42';
var app_yellow='#F0F0E1';

//Values Used
var mobile_number = '+968 9367 5834';
var civil_id_number = '73380685';
var user_name='Ayman Mohammed Abdelreheem El Shobery';
var user_dob='01/08/1985';

for (var i = 0; i < window.common_screens.length; i++) {
  window.stage.screens.push(window.common_screens[i]);
}


var screens_eng = [{

    "functions": [{
        "fn": "SetBGTile('start')",
        "delay": 0
      },
      {
        "fn": "langAssetsRest()",
        "delay": 0
      },      

    ],
    "name": "Assets Loading",
    "timing": -1,
    "index": 2
  },

  {
    "sprite_animations": [

     {
        "sprite": "mss_logo",
        "x": 930,
        "y": 170,
        "loop": false,
        "timing": 0,
        "delay": 0,
        "toTopObj": 1,
        "anchor": [0.5, 0.5],
        "scale": 0.75,        
        "alpha":1,
        "onClickFn": "open_url(\'http://www.madrassuperstore.com/\')"
    }, 

     {
        "sprite": "facebook",
        "x": 900,
        "y": 350,
        "loop": false,
        "timing": 0,
        "delay": 0,
        "toTopObj": 1,
        "anchor": [0.5, 0.5],
        "scale": 0.15,
        "onClickFn": "open_url(\'https://m.facebook.com/pages/category/Clothing--Brand-/madrassuperstore/posts/\')"
     },

     {
        "sprite": "instagram",
        "x": 1000,
        "y": 350,
        "loop": false,
        "timing": 0,
        "delay": 0,
        "toTopObj": 1,
        "anchor": [0.5, 0.5],
        "scale": 0.15,
        "onClickFn": "open_url(\'https://instagram.com/madrassuperstore?igshid=z6r5ulspprmt\')"
     },

     {
        "sprite": "youtube",
        "x": 900,
        "y": 450,
        "loop": false,
        "timing": 0,
        "delay": 0,
        "toTopObj": 1,
        "anchor": [0.5, 0.5],
        "scale": 0.15,
        "onClickFn": "open_url(\'https://www.youtube.com/channel/UCN4oFkujDP8Ig8mCr6O-BVg\')"
     },

     {
        "sprite": "playstore",
        "x": 1000,
        "y": 450,
        "loop": false,
        "timing": 0,
        "delay": 0,
        "toTopObj": 1,
        "anchor": [0.5, 0.5],
        "scale": 0.15,
        "onClickFn": "open_url(\'https://play.google.com/store/apps/details?id=com.pupaclic.mss\')"
     },

      {
        "sprite": "whatsapp",
        "x": 900,
        "y": 550,
        "loop": false,
        "timing": 0,
        "delay": 0,
        "toTopObj": 1,
        "anchor": [0.5, 0.5],
        "scale": 0.15,
        "onClickFn": "open_url(\'https://api.whatsapp.com/send?phone=919841070077&text=Hello, I am interested to shop at Madras Super Store&source=&data=&app_absent=\')"
     },

     {
        "sprite": "google-maps",
        "x": 1000,
        "y": 550,
        "loop": false,
        "timing": 0,
        "delay": 0,
        "toTopObj": 1,
        "anchor": [0.5, 0.5],
        "scale": 0.15,
        "onClickFn": "open_url(\'https://goo.gl/maps/mYtZbu3ejL3BA5Lf7\')"
     },

      {
        "sprite": "women",
        "x": 143,
        "y": 1245,
        "loop": false,
        "timing": 0,
        "delay": 0,
        "toTopObj": 1,
        "anchor": [0.5, 0.5],
        "scale": 0.6,
        "onClickFn": "addScrollerToGame(\'women\')"
        },

        {
        "sprite": "men",
        "x": 410,
        "y": 1245,
        "loop": false,
        "timing": 0,
        "delay": 0,
        "toTopObj": 1,
        "anchor": [0.5, 0.5],
        "scale": 0.6,
        "onClickFn": "addScrollerToGame(\'men\')"
        },

        {
        "sprite": "kids",
        "x": 680,
        "y": 1245,
        "loop": false,
        "timing": 0,
        "delay": 0,
        "toTopObj": 1,
        "anchor": [0.5, 0.5],
        "scale": 0.6,
        "onClickFn": "addScrollerToGame(\'kids\')"
        },

        {
        "sprite": "accessories",
        "x": 953,
        "y": 1245,
        "loop": false,
        "timing": 0,
        "delay": 0,
        "toTopObj": 1,
        "anchor": [0.5, 0.5],
        "scale": 0.6,
        "onClickFn": "addScrollerToGame(\'accessories\')"
        },

      
       
    
    ],

    "text_animations": [
     

      ],  

    "sound_list": [{
      "sound": ['1_TA']
    }],
    
    "functions": [

      {
        "fn": "SetBGTile('intro')",
        "delay": 0
      },     

      {
        "fn":"addScrollerToGame(\'women\')",
        "delay":0
      },

      {
        "fn":"playBG(\'bg\')",
        "delay":0
      },
      {
        "fn":"addYoutubePlayer(540,1280,1080,430)",
        "delay":0
      }

     

    ],
    "name": "Display Form",
    "timing": -1,
    "index": 3
  },
  
  

];



for (var i = 0; i < screens_eng.length; i++) {
  if (i == 5) {
    if (window.pa_PREMIUM_POLICY_TYPE !== false) {
      if (window.pa_PREMIUM_POLICY_TYPE === 'regular') {
        console.log("Enter : regular");
        screens_eng[i]['sound_list'] = [{
          "sound": ["au_5_1", "$var.window.pa_product", "au_5_2", "$var.window.pa_category", "au_5_3", "$var.window.pa_PREMIUM_POLICY_TYPE", "au_5_4", "$var.currency_window.p_PREMIUM_AMOUNT", "$var.window.pa_FREQUENCY", "au_5_5", "$var.number_window.pa_PAYMENT_TERM", "years", "au_5_6", "$var.number_window.pa_BENEFIT_TERM", "au_5_7", "$var.currency_window.p_SUM_ASSURED", "au_5_8"]
        }];
      } else if (window.pa_PREMIUM_POLICY_TYPE === 'single') {
        console.log("Enter : single");
        screens_eng[i]['sound_list'] = [{
          "sound": ["au_5_1", "$var.window.pa_product", "au_5_2", "$var.window.pa_category", "au_5_3", "$var.window.pa_PREMIUM_POLICY_TYPE", "au_5_4_1", "$var.currency_window.p_PREMIUM_AMOUNT", "au_5_6", "$var.number_window.pa_BENEFIT_TERM", "au_5_7", "$var.currency_window.p_SUM_ASSURED", "au_5_8"]
        }];
      }
    }
  }
  window.stage.screens.push(screens_eng[i]);
}