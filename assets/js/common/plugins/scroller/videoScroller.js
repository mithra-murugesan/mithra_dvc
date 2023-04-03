var videoList=new Array();
videoList.push('I7-cGscfzgA');
videoList.push('JA8YgP5lZtY');
videoList.push('TO04KfLO7TI');
//videoList.push('./assets/images/common/product/3.jpeg');
//videoList.push('./assets/images/common/product/4.jpeg');

function addVideosScroller(x_pos,y_pos,width,height,COLOR_PRIMARY,COLOR_LIGHT,COLOR_DARK)
{
	/*var scroller_panel = game.rexUI.add.scrollablePanel({
		
		x: x_pos,//540
        y: y_pos,//1000
        width: width,//950
        height: height,//1400

        scrollMode: 0,JA8YgP5lZtY

        background: game.rexUI.add.roundRectangle(0, 0, 0, 0, 0, COLOR_PRIMARY),
		
		slider: {
            track: game.rexUI.add.roundRectangle(0, 0, 10, 3, 0, COLOR_DARK),
            thumb: game.rexUI.add.roundRectangle(0, 0, 0, 0, 8, COLOR_LIGHT),
        },
		
		panel: {
        child: createVideosPanel(COLOR_PRIMARY,COLOR_LIGHT,COLOR_DARK),
		},
		
		space: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10,

            panel: 10,
        }
		
	}).layout();
	
				
	obj_list.push(scroller_panel);*/
	
	//return scroller_panel;

	x = 540;
	y = 220;

	for(var i=0;i<videoList.length;i++)
    {
       createVideo(x,y,videoList[i]);
       y = y+500;
    }
}

function createVideosPanel(COLOR_PRIMARY,COLOR_LIGHT,COLOR_DARK)
{
	var sizer = game.rexUI.add.sizer({
        orientation: 'y',
        space: { 
            left: 10,
            right: 10,
            top: 20,
            bottom: 20,
            item: 100 }
    });

    for(var i=0;i<videoList.length;i++)
    {
       sizer.add(createVideo(COLOR_PRIMARY,COLOR_LIGHT,COLOR_DARK,videoList[i]), { align: 'center',padding: {left: 0, right: 0, top: 0, bottom: 0} }); 
       sizer.addSpace();
    }
	
	sizer.layout();

    console.log(sizer);
    return sizer;
}

function createVideo(x,y,id)
{
	var config = {

	    videoId: id,
	    autoPlay: false,
	    controls: true,
	    keyboardControl: true,
	    modestBranding: true,
	    loop: false,
    };

    youtubePlayer = game.add.rexYoutubePlayer(x, y, 750, 400, config);
    youtubePlayer.setOrigin(0.5,0);
    youtubePlayer.setDepth(4);
    
    obj_list.push(youtubePlayer);
    
    return youtubePlayer;
}

