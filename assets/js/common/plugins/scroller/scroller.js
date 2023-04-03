
var scroller_panel;
var button_onclick_answers = new Array();
var current_question_set;

function addMenuScroller(x_pos,y_pos,width,height,COLOR_PRIMARY,COLOR_LIGHT,COLOR_DARK)
{
	var menu_items = getMenuItemList();

	var buttons = game.rexUI.add.buttons({
            x: x_pos,
            y: y_pos,
            width: 1080,
            height:height,

            orientation: 'x',

            buttons: menu_items,

            expand: false,

             space: { left: 50, right:30, top:0, bottom:5, item:150 },

             background: game.rexUI.add.roundRectangle(0, 0, 2, 2, 0, COLOR_PRIMARY),
        })
            .layout()
            //.drawBounds(this.add.graphics(), 0xff0000)

    buttons
        .on('button.click', function (button, index, pointer, event) {
                //console.log(`Click button-${button.text}`);
            })

}


function createPanel(COLOR_PRIMARY,COLOR_LIGHT){

	console.log("Create Panel")
	var sizer = game.rexUI.add.sizer({
        orientation: 'x',
        space: { left: 50, right:50, top:0, bottom:5, item:180 },
    });

	console.log("OBJ LIST = ",obj_list);

	var menu_items = getMenuItemList();

	var buttons = game.rexUI.add.buttons({
            x: 400, y: 300,
            width: 300,
            orientation: 'x',

            buttons: menu_items,

            //expand: expand
        })
            .layout()
            //.drawBounds(this.add.graphics(), 0xff0000)

    buttons
        .on('button.click', function (button, index, pointer, event) {
                console.log(`Click button-${button.text}`);
            })

    sizer.add(buttons);

	console.log(buttons);
	return sizer;
}

var menu_items = new Array();
function getMenuItemList()
{
	menu_items = new Array();

	var obj1 = game.add.sprite(0, 0, 'home');
	obj1 = setupMenuItem(obj1,'callHome()','Home');

    menu_items.push(obj1);

	var obj2 = game.add.sprite(0, 0, 'about-us');
	obj2 = setupMenuItem(obj2,'callAboutUs()','Profile');

    menu_items.push(obj2);

    var obj3 = game.add.sprite(0, 0, 'products');
	obj3 = setupMenuItem(obj3,'callProducts()','Products');

    menu_items.push(obj3);


    var obj5 = game.add.sprite(0, 0, 'video-camera');
	obj5 = setupMenuItem(obj5,'callVideos()','Videos');

    menu_items.push(obj5);



    return menu_items;
}

function setupMenuItem(menuitem,onclickfn,label_name)
{
	menuitem.setOrigin(0.5);
    menuitem.setScale(0.5);
    menuitem.setDepth(3);
    menuitem.inputEnabled = true;
	menuitem.setInteractive({
        useHandCursor: true
    });
    menuitem.on('pointerdown', function(pointer) {
        eval(onclickfn);
    });

    var label = game.rexUI.add.label({
        x: 0,
        y: 0,
        //anchor: undefined,
        // width: undefined,
        // height: undefined,

        orientation: 1,

        //background: backgroundGameObject,
        icon: menuitem,
        //iconMask: false,
        text: addTextToGame(label_name, 0, 0, 'Uniform', '30px', '#FFFFFF', 'justify', 650, 0.5, 0.5, false),
        //expandTextWidth: false,
        //expandTextHeight: false,
        //action: actionGameObject,
        //actionMask: false,
        //align: undefined,

        /*space: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,

            icon: 0,
            text: 0,
        },*/

        // name: '',
        // draggable: false
    });



    return label;
}


function addStaticContentScroller(x_pos,y_pos,width,height,COLOR_PRIMARY,COLOR_LIGHT,COLOR_DARK,text)
{
	var content = addTextToGame(text, 100, 100, 'Uniform', '30px', COLOR_LIGHT, 'justify', 650, 0.5, 0.5, false);

	scroller_panel = game.rexUI.add.scrollablePanel({

		x: x_pos,//540
        y: y_pos,//1000
        width: width,//950
        height: height,//1400

        scrollMode: 0,

        background: game.rexUI.add.roundRectangle(0, 0, 2, 2, 10, COLOR_PRIMARY).setStrokeStyle(2, COLOR_DARK, 1),

		slider: {
            track: game.rexUI.add.roundRectangle(0, 0, 20, 3, 0, COLOR_DARK),
            thumb: game.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOR_LIGHT),
        },

		panel: {
        child:  game.rexUI.add.sizer({
			        orientation: 'y',
			        space: { left: 50, right:50, top:0, bottom:5, item:180 },
			    }).add(content),
		},

		space: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10,

            panel: 10,
        }

	}).layout();


	console.log(scroller_panel);

	return scroller_panel;
}





