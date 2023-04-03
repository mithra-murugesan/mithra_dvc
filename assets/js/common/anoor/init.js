

$(document).ready(function(){
    $("#loading_div").show();
    window.cur_url = window.location.href.trim();


    window.geo_latitude = 0;
    window.geo_longitude = 0;
    window.geo_location = '';

    window.app_view = false;

    window.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);


    function load_game_js(slug)
    {
        $.getScript("./assets/product_assets/sbi_mf/js/flow_assets_init.js",  function(){
            // Load card workflow js
            $.getScript( "./assets/product_assets/sbi_mf/js/flow_init.js",  function(){
                $("#loading_div").hide();
                $.getScript( "./assets/js/common/anoor/game.js", function(){ } );

            });
        });
    }

  window.product ="sbi_mf";
  window.product_slug = "sbi_mf";
  window.flow_slug = "sbi_mf";
  load_game_js("sbi_mf");

});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('sw.js')
        .then(() => {
            console.log('Service Worker Registered');
            //alert('service worker registered');
        });
}

// Code to handle install prompt on desktop

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {

    console.log("beforeinstallprompt");
    //alert('beforeinstallprompt');
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI to notify the user they can add to home screen
   
});


function prompt_pwa()
{
     deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
        } else {
            console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
    });
}
