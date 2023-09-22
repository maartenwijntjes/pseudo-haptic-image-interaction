//image numbers start and finish
var start=3075;
var finish=3094;

var gain=.2;
var gain_exponent=0;

// gain is computed by 2^gain_exponent. For example, if gain_exponent=0, gain = 1. If gain_exponent = -1, gain = 0.5. If gain_exponent = 2, than gain = 4. 

// if you want 5 steps, you could for example think of 0.25, 0.5, 1, 2, 4. 

// here you can change the size of the sketch a bit, 400 is small
var imheight=400;
var imwidth;
var extraWidth;

// here you can change the starting coordinates of the signifier
const signifierX = 250, signifierY = 220;


// this is the variable it uses to calculate how far the user has dragged the fabric
var dragX=0;

var sigShift = 0;

// number of images
var nImages;

//declaration of an array to put in the images
var imgs = [];

var showSignifier = true;


// you need to preload images in javascript
function preload(){
  for (var i = start; i<=finish; i++) {
    imgs[i-start]=loadImage("IMG_"+str(i)+".jpg");
  }
}


// this function is obligatory, normally full of stuff to setup the sketch
function setup() {
  nImages=finish-start;
  imwidth=1.5*imheight;
  
  //Maarten added extra width, to cover the mouse cursor. Also, I changed all the 'width' references in the main draw() loop to 'imwidth'. 
  extraWidth=1000;
  
  
  createCanvas(imwidth+extraWidth, imheight);
  
}


function draw() {
  
  // if the mouse is pressed it changes the drag variable
  if(mouseIsPressed){
    dragX += mouseX-pmouseX;
    
    // if stretch is already at minimum or maximum dragging won't stretch it further
    dragX = min(dragX,imwidth*gain);
    dragX = max(dragX,0);
    
    //only shows image number in console when you're changing it
    print(imageNumber);
    
    //hide signifier
    showSignifier = false;
  }
  
  //Maarten added background, if you change it to a colour you'll notice the extend of the canvas.
  //background(255,0,0);//this is red
  background(255);//this is white, so you don't see it. 
  
  imageNumber = floor(map(abs(dragX/gain),0, imwidth,0,nImages,true));
  image(imgs[imageNumber],0,0,imwidth, imheight)
  
  let s = 'Hold the mouse and drag your cursor to the right';
  fill(50);
  text(s, 10, 10, 150, height); // Text wraps within text box
  
  text('gain = ' + gain, 500,20)
  
  noStroke();
  
  if(showSignifier){
    fill(255,255,255,100);
    sigShift += 1;
    circle(signifierX + sigShift, signifierY,30);
  }
  
  if(sigShift > 50){
    sigShift = 0;
  }
  
  fill(75,120,90)
  rect(imwidth-20,map(gain_exponent,-4,4,imheight,0),10,imheight)
  stroke(0)
  line(imwidth-25,map(gain_exponent,-4,4,imheight,0),imwidth-5,map(gain_exponent,-4,4,imheight,0))
  noStroke();
  
  
}


// Maarten added these two functions to get rid of the mouse cursor while pulling.
function mousePressed() {
  noCursor();
}

function mouseReleased() {
  cursor();
}

// Gain manipulation
function keyPressed() {
  if (keyCode === UP_ARROW) {
    gain_exponent = gain_exponent+0.5;
    dragX=0;
  } else if (keyCode === DOWN_ARROW) {
    gain_exponent = gain_exponent-0.5;
    dragX=0;
  }
  gain=pow(2,gain_exponent)
}

