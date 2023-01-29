
var canvas; 
var context;
var radius;
var canvasDimension;
var allColors;
var allCircles;
var yInterval;
var maxCircles;
var animateIndex;
var animateSpeed; 

var i;


function init(){
	canvasDimension = 500;
	radius = 40;
	maxCircles = 3;
	yInterval = (radius * 2) + 10;
	allColors = ['green','red','blue'];
	allCircles = [];
	animateIndex = 0;
	animateSpeed = 5;

	canvas = document.getElementById('mainCanvas');
	canvas.width = canvasDimension;
	canvas.height = canvasDimension;
	context = canvas.getContext('2d');
	
	//draw circles
	for(i = 0; i < maxCircles; i++ ) {
		allCircles.push(new Circle( radius, radius + (yInterval * i), animateSpeed, radius,allColors[i], i, circleAnimComplete));
	}

	animateCircles();
};


animateCircles = function(){
	context.clearRect( 0, 0 , canvasDimension,canvasDimension);
	for(i = 0; i < maxCircles; i++ ) {
		allCircles[i].update(animateIndex);
	}
	if(animateIndex < maxCircles){
		requestAnimationFrame(animateCircles);
	}else{
		//All Animations are complete
	}
};

circleAnimComplete = function(index){
	//call this when a circle reaches the end
	animateIndex = index + 1;
};

//Circle Class
Circle = function( x, y, dx, radius, color, index, callback) {
	this.x 	= x;
	this.y 	= y;
	this.dx = dx;
	this.color = color;
	this.radius = radius;
	this.index = index;
	this.isEnd = false;
	this.callback = callback;

	this.draw = function() {
		context.beginPath();
		context.arc( this.x, this.y,  this.radius, 0, Math.PI * 2, false  );
		context.fillStyle = this.color;
		context.fill();
	}
	this.update = function(animateIndex) {
		if(this.isEnd){
			//no need to keep calculating when its done animating
			this.draw();
			return;
		}
		if(this.index <= animateIndex){
			if( this.x + this.radius >= canvasDimension) {
				//end 
				this.x = canvasDimension - this.radius - 1;
				this.isEnd = true;
				this.callback(this.index);
			}else{
				//not end yet, keep moving
				this.x += this.dx;
			}
		}
		this.draw();
	}
}



//check if page is loaded
document.onreadystatechange = function () {
	if (document.readyState === 'complete') {
		init();
	}
};



