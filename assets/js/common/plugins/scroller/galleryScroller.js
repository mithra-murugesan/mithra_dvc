
var scroller_panel;
function addGalleryScroller(x_pos,y_pos,width,height,COLOR_PRIMARY,COLOR_LIGHT,COLOR_DARK,items_array)
{

    if(scroller_panel)
        scroller_panel.destroy();

    
	 scroller_panel = game.rexUI.add.scrollablePanel({
        
        x: x_pos,//540
        y: y_pos,//1000
        width: width,//950
        height: height,//1400

        scrollMode: 0,       

            
        panel: {
        child: createPanel(items_array,COLOR_PRIMARY,COLOR_LIGHT,COLOR_DARK),
        },

        slider: {
            track: game.rexUI.add.roundRectangle(0, 0, 10, 3, 0, COLOR_DARK),
            thumb: game.rexUI.add.roundRectangle(0, 0, 0, 0, 8, COLOR_LIGHT),
        },
        
        space: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10,

            panel: 10,
        }
        
    }).layout();

    //scroller_interval=setInterval(DisplayNewScrollImage,100);
    //scroller_panel.setDepth(7);
    //scroller_panel.setOrigin(0.5,0.5);

    obj_list.push(scroller_panel);
}

function createPanel(items_array,COLOR_PRIMARY,COLOR_LIGHT,COLOR_DARK){

    var path='./assets/images/common/product/';

    var sizer = game.rexUI.add.sizer({
        orientation: 'y',
        space: { item: 30 }
    });
    
    var buttons_array = new Array();
    for(var i=0;i<items_array.length;i++)
    {
        buttons_array.push(createButton1(game, items_array[i],items_array[i],COLOR_PRIMARY,COLOR_LIGHT,COLOR_DARK));
    }

     var CheckboxesMode = false; // False = radio mode

        var buttons = game.rexUI.add.buttons({
        x: 0,
        y: 0,
        orientation: 'y',
        click:0,

        buttons: buttons_array,

        space: {
                left: 0, right: 0, top: 10, bottom: 10, 
                item: 20
            },
            expand: true,

        type: ((CheckboxesMode) ? 'checkboxes' : 'radio'),
        setValueCallback: function(button, value) {

            console.log(button);
        }})
        .layout();

        //buttons.setDepth(12);

         buttons.on('button.click', function(button, index, pointer, event) {
        console.log(buttons);

        close_dropdown(buttons.value);
       

    }, this);

        sizer.add(buttons);

     
            
    return sizer;
}

var scroller_interval;
var scroll_t=0;
var scroll_t_addition=1/scroller_items;

function DisplayNewScrollImage(change)
{
    scroll_t=scroll_t+change;

    if(scroll_t>1)
        scroll_t=0;
    if(scroll_t<0)
        scroll_t=1;

    //console.log("Display New Scroll Image ",scroll_t);
    scroller_panel.setT(scroll_t);
}

function getGalleryScrollerPanel()
{
	console.log(scroller_panel.getElement('panel'));
	console.log(scroller_panel.t);
}


var scroller_items=15;


var createButton1 = function (game, text, name,COLOR_PRIMARY,COLOR_LIGHT,COLOR_DARK) {
    if (name === undefined) {
        name = text;
    }

    var icon=game.rexUI.add.roundRectangle(0, 0, 0, 0, 0, 0xff0000);
    var textgameobject = addTextToGame(text, 0, 0, fontFamilyLangArr[sysLang], "30px", "#000000", "left", 300, 0, 0.5, false);
    textgameobject.setInteractive();

  
    var button = game.rexUI.add.label({
        width: 300,
        height: 150,
        background:game.rexUI.add.roundRectangle(0, 0, 0, 0, 20, 0xc3c3c3,0.5),
        text:textgameobject,
        space: {
            left: 50,
            right: 50,
            icon: 10,
            top:50,
            bottom:50
        },
        align:"center",

        name: name
    });

    button.setDepth(4);

    return button;
}

var text_scroller_panel;
function addTextScroller(x_pos,y_pos,width,height,COLOR_PRIMARY,COLOR_LIGHT,COLOR_DARK,text)
{
     text_scroller_panel = game.rexUI.add.scrollablePanel({
        
        x: x_pos,//540
        y: y_pos,//1000
        width: width,//950
        height: height,//1400

        scrollMode: 0,       

            
        panel: {
        child: createPanelText(text,COLOR_PRIMARY,COLOR_LIGHT,COLOR_DARK),
        },      
        
        space: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10,

            panel: 10,
        }
        
    }).layout();

    //scroller_interval=setInterval(DisplayNewScrollImage,100);
    //scroller_panel.setDepth(7);
    //scroller_panel.setOrigin(0.5,0.5);

    obj_list.push(text_scroller_panel);
}

function createPanelText(text,COLOR_PRIMARY,COLOR_LIGHT,COLOR_DARK){

    var path='./assets/images/common/product/';

    var sizer = game.rexUI.add.sizer({
        orientation: 'y',
        space: { item: 30 }
    });
    
   
    var textgameobject = addTextToGame(text, 0, 0, fontFamilyLangArr[sysLang], "30px", "#000000", "justify", 700, 0,5, 0.5, false);
    sizer.add(textgameobject);
     
            
    return sizer;
}