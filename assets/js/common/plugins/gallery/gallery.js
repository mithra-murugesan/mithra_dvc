var galleryList=new Array();
galleryList.push('./assets/images/common/product/1.jpeg');
galleryList.push('./assets/images/common/product/2.jpeg');
galleryList.push('./assets/images/common/product/3.jpeg');
galleryList.push('./assets/images/common/product/4.jpeg');
galleryList.push('./assets/images/common/product/5.jpeg');
galleryList.push('./assets/images/common/product/6.jpeg');
galleryList.push('./assets/images/common/product/7.jpeg');
galleryList.push('./assets/images/common/product/8.jpeg');
galleryList.push('./assets/images/common/product/9.jpeg');
galleryList.push('./assets/images/common/product/10.jpeg');
galleryList.push('./assets/images/common/product/11.jpeg');
galleryList.push('./assets/images/common/product/12.jpeg');
galleryList.push('./assets/images/common/product/13.jpeg');
galleryList.push('./assets/images/common/product/14.jpeg');
galleryList.push('./assets/images/common/product/15.jpeg');


var galleryEvents = new Array();

console.log('In Gallery JS');

function addImagesToGallery()
{

	galleryEvents = new Array();
	var canvasList = new Array();

	var width=300;
	var height=200;

	x = 210;
	y = 400;

	for(var i=0;i<galleryList.length;i++)
	{
		canvasList.push(writeImageToCanvas(galleryList[i],width,height,x,y));		

		if((i+1) % 3 == 0)
		{
			x = 210;
			y = y + 250;
		}
		else
			x = x+325;
	}


	for(var i=0;i<canvasList.length;i++)
	{
		//console.log(c);

		canvasList[i].setInteractive().on('pointerdown', function(pointer, localX, localY, event){
    		galleryCallback(i);
		});
	}
}

var mask,next,prev;

function galleryCallback(index)
{
	console.log("INDEX = ",index);

	if(mask)
		mask.destroy();

	mask=game.add.sprite(0,0,'mask');
	mask.setOrigin(0,0);
	mask.setDepth(3);
	obj_list.push(mask);

	if(next)
		next.destroy();

	next=game.add.sprite(900,1400,'next');
	next.inputEnabled = true;
	next.setInteractive({
        useHandCursor: true
    });
    next.setDepth(5);
    next.on('pointerdown', function(pointer) {
       DisplayNewScrollImage(0.075)
     });
    obj_list.push(next);

    if(prev)
		prev.destroy();

	prev=game.add.sprite(180,1400,'prev');
	prev.inputEnabled = true;
	prev.setInteractive({
        useHandCursor: true
    });
    prev.setDepth(5);
    prev.on('pointerdown', function(pointer) {
        DisplayNewScrollImage(-0.075)
    });
    obj_list.push(prev);

	addGalleryScroller(540,1000,1080,450,0x000000,0xd3d3d3,0xd3d3d3);
}