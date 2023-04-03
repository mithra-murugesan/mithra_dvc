var productList=new Array();
productList.push('./assets/images/common/product/1.jfif');
productList.push('./assets/images/common/product/2.jfif');
productList.push('./assets/images/common/product/3.jfif');
productList.push('./assets/images/common/product/4.jfif');

var type = new Array();
type.push('DVC');
type.push('VKYC');
type.push('KYC');

function addProductsScroller(x_pos,y_pos,width,height,COLOR_PRIMARY,COLOR_LIGHT,COLOR_DARK)
{
	var scroller_panel = game.rexUI.add.scrollablePanel({
		
		x: x_pos,//540
        y: y_pos,//1000
        width: width,//950
        height: height,//1400

        scrollMode: 0,

        background: game.rexUI.add.roundRectangle(0, 0, 0, 0, 0, COLOR_PRIMARY),
		
		slider: {
            track: game.rexUI.add.roundRectangle(0, 0, 10, 3, 0, COLOR_DARK),
            thumb: game.rexUI.add.roundRectangle(0, 0, 0, 0, 8, COLOR_LIGHT),
        },
		
		panel: {
        child: createProductsPanel(COLOR_PRIMARY,COLOR_LIGHT,COLOR_DARK),
		},
		
		space: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10,

            panel: 10,
        }
		
	}).layout();
	
				
	obj_list.push(scroller_panel);
	
	return scroller_panel;
}

function createProductsPanel(COLOR_PRIMARY,COLOR_LIGHT,COLOR_DARK)
{
	var sizer = game.rexUI.add.sizer({
        orientation: 'y',
        space: { 
            left: 10,
            right: 10,
            top: 20,
            bottom: 20,
            item: 0 }
    });

    for(var i=0;i<productList.length;i++)
    {
       sizer.add(createProductSet(COLOR_PRIMARY,COLOR_LIGHT,COLOR_DARK,productList[i],type[i])); 
    }
	

    return sizer;
}

function createProductSet(COLOR_PRIMARY,COLOR_LIGHT,COLOR_DARK,url,type)
{
	console.log(type);
    var enquiry = game.add.sprite(0,0,'enquiry');
	enquiry = setupMenuItem(enquiry,'mail_callback_enquiry(\'jeromed@anoorcloud.com\',type)');

    var image= writeImageToCanvas(url,800,450,0,0)

	var button = createButton(enquiry,0,0);

	var sizer = game.rexUI.add.sizer({
        orientation: 'y',
        space: { item: 0 }
    })
    .addBackground(
            game.rexUI.add.roundRectangle(0, 0, 2, 2, 0, COLOR_PRIMARY).setStrokeStyle(2, COLOR_LIGHT, 1)
     )
    .add(image, { align: 'center',padding: {left: 30, right: 30, top: 30, bottom: 30} })
    .add(button,{ proportion: 1,align: 'right',padding: {left: 0, right: 0, top: 20, bottom: 20} })

    return sizer;
}

function createButton(spriteobj,x_pos,y_pos)
{
	var buttonArray=new Array();
	buttonArray.push(spriteobj);

	var buttons = game.rexUI.add.buttons({
            x: x_pos, 
            y: y_pos,
            width: 0,

            orientation: 'x',

            buttons: buttonArray,

            expand: false,

            space: { left: 0, right:50, top:0, bottom:0, item:0 },

             //background: game.rexUI.add.roundRectangle(0, 0, 2, 2, 0, COLOR_PRIMARY).setStrokeStyle(2, COLOR_DARK, 1),
        })
            .layout()
            //.drawBounds(this.add.graphics(), 0xff0000)

    buttons
        .on('button.click', function (button, index, pointer, event) {
                //console.log(`Click button-${button.text}`);
     })

     return buttons;

}

function writeImageToCanvas(url,w,h,x,y)
{

    console.log(url);
    var width=w;
    var height=h;

    var img_canvas = game.add.rexCanvas(x, y, width, height);    

    img_canvas.fill("#FFFFFF");     
    
    var context = img_canvas.getContext(); 

    var img = new Image();   
    img.addEventListener('load', function() {

        context.drawImage(img, 0, 0,width,height);
      
    }, false);
    img.src = url; // Set source path 

    img_canvas.setDepth(3); 

    obj_list.push(img_canvas);

    return img_canvas;

}