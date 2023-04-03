/*
 Custom Assets
 */

// Define Paths
var CUSTOM_IMG_PATH = './assets/images/custom/';
var PRODUCT_PATH = './assets/product_assets/'+window.flow_slug+'/';
var PRODUCT_IMG_PATH = PRODUCT_PATH+'images/';
var COMMON_PRODUCT_IMG_PATH = './assets/images/common/product/';
var COMMON_PRODUCT_LANG_IMG_PATH = COMMON_PRODUCT_IMG_PATH+'eng/';
var PRODUCT_SCENE_AUDIO_PATH = PRODUCT_PATH+'audio/eng/scenes/';

var COMMON_JS_PATH = './assets/js/common/';


var TYPE_COMMON_AUDIO_PATH = './assets/audio/product/eng/common/';
var TYPE_SCENE_AUDIO_PATH_EN = './assets/audio/product/eng/scenes/';
var TYPE_SCENE_AUDIO_PATH_TA = './assets/audio/product/tam/scenes/';


var IMG_COM_PATH = './assets/images/common/';
var COMMON_LANG_IMG_PATH = IMG_COM_PATH+'eng/';

// var SCREEN_2= IMG_COM_PATH+'screen_2/';
// var SCREEN_3= IMG_COM_PATH+'screen_3/';
// var SCREEN_4= IMG_COM_PATH+'screen_4/';

function customAssets()
{
      //Loading Images
	  load_assets_init_images();

	  //Loading Sprites
	  load_assets_init_sprites();

	  //Loading Audios
	  load_assets_init_audios();

}

function load_assets_init_images()
{
      game.load.image('start_bg', IMG_COM_PATH+'start_bg.png');
      game.load.image('bg', IMG_COM_PATH+'bg.jpg');
      game.load.image('enquiry_bg', IMG_COM_PATH+'enquiry_bg.jpg');
      game.load.image('product_bg', IMG_COM_PATH+'product_bg.jpg');

      game.load.image('pivc_bg', IMG_COM_PATH+'pivc_bg.jpg');
      game.load.image('dwc_bg', IMG_COM_PATH+'dwc_bg.jpg');
      game.load.image('digital_intro_bg', IMG_COM_PATH+'digital_intro_bg.jpg');

      game.load.image('logo_circle', IMG_COM_PATH+'logo_circle.png');
      game.load.image('contact_icon', IMG_COM_PATH+'contact_icon.png');
      game.load.image('mail_icon', IMG_COM_PATH+'mail_icon.png'); 
      game.load.image('adres_icon', IMG_COM_PATH+'adres_icon.png'); 
      game.load.image('whatsapp_icon', IMG_COM_PATH+'whatsapp_icon.png');       
      game.load.image('schedule_call', IMG_COM_PATH+'schedule_call.png');
      game.load.image('website', IMG_COM_PATH+'website.png');
      game.load.image('save_contact', IMG_COM_PATH+'save_contact.png');
      game.load.image('share_contact', IMG_COM_PATH+'share_contact.png');

      game.load.image('facebook', IMG_COM_PATH+'facebook.png');
      game.load.image('instagram', IMG_COM_PATH+'instagram.png');
      game.load.image('twitter', IMG_COM_PATH+'twitter.png');
      game.load.image('linkedin', IMG_COM_PATH+'linkedin.png');

      game.load.image('qr_placeholder', IMG_COM_PATH+'qr_placeholder.png');
      game.load.image('qr', IMG_COM_PATH+'qr.png');

      // game.load.image('play_button', IMG_COM_PATH+'play_button.png');

      game.load.image('home_tab_selected', IMG_COM_PATH+'home_tab_selected.png');
      game.load.image('home_tab_unselected', IMG_COM_PATH+'home_tab_unselected.png');
      game.load.image('product_tab_selected', IMG_COM_PATH+'product_tab_selected.png');
      game.load.image('product_tab_unselected', IMG_COM_PATH+'product_tab_unselected.png');
      game.load.image('enquiry_tab_selected', IMG_COM_PATH+'enquiry_tab_selected.png');
      game.load.image('enquiry_tab_unselected', IMG_COM_PATH+'enquiry_tab_unselected.png');

      game.load.image('submit_btn', IMG_COM_PATH+'submit_btn.png');

      game.load.image('profile_pic', IMG_COM_PATH+'profile_pic.jpg');

      // game.load.video('profile_video',  IMG_COM_PATH+'profile_video.mp4');

      game.load.audio('bg_music',  IMG_COM_PATH+'bg_music.mp3');

      game.load.image('digital_intro', IMG_COM_PATH+'digital_intro.png');
      game.load.image('dwc', IMG_COM_PATH+'dwc.png');
      game.load.image('pivc', IMG_COM_PATH+'pivc.png');
      game.load.image('other_products', IMG_COM_PATH+'other_products.png');
      game.load.image('book_a_demo_product_btn', IMG_COM_PATH+'book_a_demo_product_btn.png');

      game.load.image('add_home_screen', IMG_COM_PATH+'add_home_screen.png');
      
      

}

function load_assets_init_sprites()
{
	
}

function load_assets_init_audios()
{
	
}
