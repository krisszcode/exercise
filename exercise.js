//get the canvas element and create the 2d-drawing context
var c=document.getElementById('demo');
var cc=c.getContext("2d");

cc.width=window.innerWidth;
cc.height=window.innerHeight;


//set intervals for functions to execute
var animation=setInterval(drawLine,1);
var end  = setInterval(idleness, 120000);


//add event listeners to functions
window.addEventListener("load",setDimensions);
window.addEventListener("resize",setDimensions);
window.addEventListener("click",mouseClick)


//resize elements when window resize
function setDimensions() {
	c.width=window.innerWidth;
	c.height=window.innerHeight;
};

//use global variables to track animations step by step
var x=0;
var y = 60
var circleStop;
var stopped = false;
var korX = 0;
var korY = 0;
var megall;
var idle = false;
var clicked = false;
var radius = 30;
var firstend = false;
guessX = 0;
guessY = 0;


//this function will execute every 1ms
function drawLine() {

	//drawing a circle
	cc.clearRect(0,0,c.width,c.height);
	cc.beginPath();
	cc.fillStyle="black";
	cc.arc(x, y, radius, 0,2 * Math.PI);
	cc.fill()

	//move the circle on the x axis
	x+=1;

	//this will execute when the circle pass half screen
	if(x > c.width/2)
	{
		cc.beginPath()
		cc.fillStyle ="white";
		cc.arc(x, y, radius+2, 0,2 * Math.PI)
		cc.fill()

		if(stopped){
			x = circleStop
			cc.font = "40px Arial";
			cc.fillStyle ="black";
			cc.fillText("Hol a kör?", 50, 50);
			if(clicked){
				clearInterval(animation)
				var animation2 = setInterval(drawCircle(800,450,0),1);
			}
			if(!clicked && idle){
				console.log("Tétlenség miatt megállt!")
				clearInterval(end);
			}
		}
	}

		if(x == c.width/2)
		{
			timer = setInterval(time, 3000 )
		}
}


function idleness(){
	idle = true;
	cc.clearRect(0, 0, c.width, c.height);
}

//timing the circle when to stop animation
function time(){
	stopped = true;
	circleStop = x;
	clearInterval(timer);
}


//get the coords when mouse click happens
function mouseClick(event){
    guessX = event.offsetX;
    guessY = event.offsetY;

		if(stopped && !idle)
		{
			diffx = difference(guessX,x);
			diffy = difference(guessY,y);
			console.log(JSON.stringify({x: diffx, y: diffy}))
			clicked = true;
		}

}

//get the difference of the clicked coords and the circle coords
function difference(a, b) {
	return Math.abs(a - b);
}


function drawCircle(x,y,i)
{

	cc.clearRect(0, 0, c.width, c.height);


	cc.save();
	cc.beginPath();
	cc.fillStyle ="blue";
	cc.arc(x, y, radius+2, 0,2 * Math.PI);
	cc.fill();
	cc.translate(i/2, i/2);
	cc.rotate(i/100);
	cc.translate(-i/2, -i/2);
	cc.restore();
	i++;
}