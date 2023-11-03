let skyColorsFrom = [];
let skyColorsTo = [];
let skyColorsLerpA = [];
let skyColorsLerpB = [];
let skyColorsLerpC = [];
let skyColorsLerpD = [];
let skyEllipse = [];
let skyLerpEllipseA = [];
let skyLerpEllipseB = [];
let skyLerpEllipseC = [];
let skyLerpEllipseD = [];
let brushWidth;
let brushAmount;

let inc = 0.1;
let scl = 10; //segmet size
let cols, rows;

let x;
let y;
let w;
let h;

let polyShadow;
let polyBlurry1;//the transition part between building and distant building
let polyBlurry2;//the distant building

function setup() {
  createCanvas(windowWidth,windowHeight);


  //Define the color arrays for lerpColor().

  //The colors are: [0]navy blue, [1]sea green, [2]bright yellow, [3]orange red, [4]dark red
  skyColorsFrom.push(color(62, 84, 143), color(125, 155, 147), color(255, 214, 101), 
  color(193, 113, 67), color(205, 74, 74));

  //The colors are: [0]sea green, [1]bright yellow, [2]orange red
  skyColorsTo.push(color(125, 155, 147), color(255, 214, 101), color(193, 113, 67), color(205, 74, 74));

  //Build four arrays: skyColorLerp A/B/C/D to contain the lerpColor() results between the 
  //skyColorsFrom[] and skyColorsTo[]

  //A
  for(let i = 1; i < 8; i++){

    skyColorsLerpA.push(lerpColor(skyColorsFrom[0], skyColorsTo[0], i * 0.125));

  }

  //B
  for(let i = 1; i < 8; i++){

    skyColorsLerpB.push(lerpColor(skyColorsFrom[1], skyColorsTo[1], i * 0.125));

  }

  //C
  for(let i = 1; i < 8; i++){

    skyColorsLerpC.push(lerpColor(skyColorsFrom[2], skyColorsTo[2], i * 0.125));

  }

  //D
  for(let i = 1; i < 8; i++){

    skyColorsLerpD.push(lerpColor(skyColorsFrom[3], skyColorsTo[3], i * 0.125));

  }

  //The brushWidth of the ellipse is 1/64 of the height of canvas.
  brushWidth = height / 64;

  //The amount of brush is the window's width divides the brush's width.
  brushAmount = width / brushWidth;

  updateDimensions();

  w=windowWidth;
  h=windowHeight;
  x=w/32;//unit coordinate for x
  y=h/32;//unit coordinate for y

  shadow();
  blurryBg1();//transition
  blurryBg2();//distant building

  noLoop();
}

function draw() {
  //background(255);

  drawSkyEllipse();

  waterSurface();

  //waterColor(poly,color(71,41,50));

  //color of building
  fill(71,41,50);
  strokeWeight(2);
  stroke(43,49,45);

  //the building
  beginShape();
  vertex(0,16*y);
  vertex(0,13.8*y);
  vertex(x,13.8*y);
  vertex(2*x,11*y);
  vertex(3*x,11*y);
  vertex(3.4*x,9*y);
  vertex(4*x,11*y);
  vertex(4.7*x,10.5*y);
  vertex(4.7*x,4*y);
  vertex(4.9*x,4*y);
  vertex(5.15*x,0.5*y);
  vertex(5.35*x,0.5*y);
  vertex(5.75*x,3*y);
  vertex(6*x,4*y);
  vertex(6*x,11*y);
  vertex(6.25*x,9*y);
  vertex(7*x,8*y);
  vertex(7.5*x,7*y);
  vertex(8*x,8*y);
  vertex(8.7*x,9*y);
  vertex(8.7*x,10*y);
  vertex(10*x,10*y);
  vertex(10.5*x,11*y);
  vertex(11.2*x,10*y);
  vertex(11.5*x,11*y);
  vertex(12*x,12*y);
  vertex(13*x,13.8*y);
  vertex(15*x,13.8*y);
  vertex(16*x,16*y);
  endShape(CLOSE);

  waterColor(polyShadow,71,41,50,20);
  waterColor(polyBlurry1,20,70,10,10);//transition
  waterColor(polyBlurry2,40,90,30,5);//distant building
}

function waterSurface(){
  push();
  randomSeed(45);
  translate(0, windowHeight / 2);
  let yoff = 0;
  for (let i = 0; i < rows / 2; i++) {//"i" stands for "y"
    let xoff= 0;
    for (let j = 0; j < cols; j++) {//"j" stands for "x"
      let angle = noise(xoff, yoff) * TWO_PI;
      let v = p5.Vector.fromAngle(angle * -0.2);
      xoff += inc;
      //rect(x*scl,y*scl,scl,scl);
      noStroke();

      push();
      translate(i * scl, j * scl);
      rotate(v.heading());
      rect(0, 0, 23, 4);
      pop();
    }

    if (i < 9) {
      fill(skyColorsLerpD[i]);
    } 
    else if (9 < i < 18) {
      fill(skyColorsLerpC[i % 9]);  
    } 
    else if (18 < i < 27) {
      fill(skyColorsLerpB[i % 9]);
 
    } 
    else {
      fill(skyColorsLerpA[i % 9]);
      
    }
    yoff += inc; 
  }
  pop();
}

// function building(){
//   const v=[];
//   v.push(createVector(0,16*y));
//   v.push(createVector(0,13.8*y));
//   v.push(createVector(x,13.8*y));
//   v.push(createVector(2*x,11*y));
//   v.push(createVector(3*x,11*y));
//   v.push(createVector(3.4*x,9*y));
//   v.push(createVector(4*x,11*y));
//   v.push(createVector(4.7*x,10.5*y));
//   v.push(createVector(4.7*x,4*y));
//   v.push(createVector(4.9*x,4*y));
//   v.push(createVector(5.15*x,0.5*y));
//   v.push(createVector(5.35*x,0.5*y));
//   v.push(createVector(5.75*x,3*y));
//   v.push(createVector(6*x,4*y));
//   v.push(createVector(6*x,11*y));
//   v.push(createVector(6.25*x,9*y));
//   v.push(createVector(7*x,8*y));
//   v.push(createVector(7.5*x,7*y));
//   v.push(createVector(8*x,8*y));
//   v.push(createVector(8.7*x,9*y));
//   v.push(createVector(8.7*x,10*y));
//   v.push(createVector(10*x,10*y));
//   v.push(createVector(10.5*x,11*y));
//   v.push(createVector(11.2*x,10*y));
//   v.push(createVector(11.5*x,11*y));
//   v.push(createVector(12*x,12*y));
//   v.push(createVector(13*x,13.8*y));
//   v.push(createVector(15*x,13.8*y));
//   v.push(createVector(16*x,16*y));
//   polyBuilding=new Poly(v);
// }

function shadow(){
  const v=[];
  v.push(createVector(0,15.5*y));
  v.push(createVector(x,15.5*y));
  v.push(createVector(3*x,15*y));
  v.push(createVector(4.9*x,15*y));
  v.push(createVector(4.9*x,h));
  v.push(createVector(6.5*x,h));
  v.push(createVector(6.5*x,14.5*y));
  v.push(createVector(8*x,15*y));
  v.push(createVector(10*x,14.8*y));
  v.push(createVector(11.2*x,15.2*y));
  v.push(createVector(12*x,15.3*y));
  v.push(createVector(15*x,14.3*y));
  v.push(createVector(15.5*x,15.5*y));
  polyShadow=new Poly(v);
}

function blurryBg1(){
  const v=[];
  // v.push(createVector(16*x,16*y));
  // v.push(createVector(18*x,14.5*y));
  // v.push(createVector(19*x,14.8*y));
  // v.push(createVector(21*x,15*y));
  // v.push(createVector(22*x,13.8*y));
  // v.push(createVector(24.5*x,14.3*y));
  // v.push(createVector(25*x,13.5*y));
  // v.push(createVector(25.8*x,10.3*y));
  // v.push(createVector(26.5*x,11*y));
  // v.push(createVector(27*x,12.9*y));
  // v.push(createVector(27.5*x,10.5*y));
  // v.push(createVector(28*x,10.3*y));
  // v.push(createVector(28.6*x,9.2*y));
  // v.push(createVector(29*x,10.5*y));
  // v.push(createVector(29.4*x,10.7*y));
  // v.push(createVector(30*x,12*y));
  // v.push(createVector(32*x,16*y));
  v.push(createVector(16*x,16*y));
  for (let i=0;i<random(5);i++){
    let xScale=random(16,24);
    let yScale=random(15,16);
    v.push(createVector(xScale*x,yScale*y));
  }
  v.push(createVector(24*x,16*y));
  polyBlurry1=new Poly(v);
}

function blurryBg2(){
  const v=[];
  v.push(createVector(20*x,16*y));
  for (let i=0;i<random(10);i++){
    let xScale=constrain(random(24,32)*i/2,24,32);
    //let xScale=random(24,32)*i/2;
    let yScale=random(5,16);
    v.push(createVector(xScale*x,yScale*y));
  }
  v.push(createVector(32*x,16*y));
  polyBlurry2=new Poly(v);
}

class Poly{
  constructor(vertices,modifiers){
    this.vertices=vertices;
    if(!modifiers){
      modifiers=[];
      for(let i=0;i<vertices.length;i++){
        modifiers.push(random(0.01,0.5));
      }
    }
    this.modifiers=modifiers;
  }

  grow(){
    const grownVerts=[];
    const grownMods=[];
    for(let i=0;i<this.vertices.length;i++){
      const j=(i+1)%this.vertices.length;
      const v1=this.vertices[i];
      const v2=this.vertices[j];

      const mod=this.modifiers[i];
      const chmod=m=>{
        return m+(rand()-0.5)*0.1;
      }

      grownVerts.push(v1);
      grownMods.push(chmod(mod));

      const segment=p5.Vector.sub(v2,v1);
      const len=segment.mag();
      segment.mult(rand());

      const v=p5.Vector.add(segment,v1);

      segment.rotate(-PI/2+(rand()-0.5)*PI/4);
      segment.setMag(rand()*len/2*mod);
      v.add(segment);

      grownVerts.push(v);
      grownMods.push(chmod(mod));
    }
    return new Poly(grownVerts,grownMods);
  }

  dup(){
    return new Poly(Array.from(this.vertices),Array.from(this.modifiers));
  }

  draw(){
    beginShape();
    for(let v of this.vertices){
      vertex(v.x,v.y);
    }
    endShape(CLOSE);
  }
}

function waterColor(poly,r,g,b,numLayers){
  //const numLayers=20;
  fill(r,g,b,255/(2*numLayers));
  //fill(red(color),green(color),blue(color),255/(2*numLayers));
  noStroke();

  poly=poly.grow().grow();

  for(let i=0;i<numLayers;i++){
    if(i==int(numLayers/3) || i==int(2*numLayers/3)){
      poly=poly.grow().grow();
    }
    poly.grow().draw();
  }
}

function rand(){
  return distribute(random(1));
}

function distribute(x){
  return pow((x-0.5)*1.58740105,3)+0.5;
}



// 更新尺寸相关的变量
function updateDimensions() {
  w = width;
  h = height;
  x = w / 32;
  y = h / 32;

  shadow();
  blurryBg1();
  blurryBg2();
}

// 响应窗口大小变化
function windowResized() {
  clear();
  brushWidth = height / 64;
  brushAmount = width / brushWidth;
  drawSkyEllipse();
  updateDimensions();
  resizeCanvas(windowWidth, windowHeight);
  
}

//Draw the first line of ellipses using lerpColor() and color arrays.
function drawSkyEllipse() {
  for (let i = 0; i < skyColorsFrom.length; i++) {

    for (let j = 0; j < brushAmount; j++) {

      noStroke();
      fill(skyColorsFrom[i]);
      skyEllipse.push(ellipse(brushWidth / 2 + brushWidth * j, brushWidth / 2 + height / 8 * i, brushWidth));

    }

  }

  for (let i = 0; i < 7; i++) {

    for (let j = 0; j < brushAmount; j++) {

      fill(skyColorsLerpA[i]);
      skyLerpEllipseA.push(ellipse(brushWidth / 2 + brushWidth * j, brushWidth / 2 + brushWidth * (i + 1), brushWidth));

    }

  }

  for (let i = 0; i < 7; i++) {

    for (let j = 0; j < brushAmount; j++) {

      fill(skyColorsLerpB[i]);
      skyLerpEllipseB.push(ellipse(brushWidth / 2 + brushWidth * j, brushWidth / 2 + brushWidth * (i + 9), brushWidth));

    }

  }

  for (let i = 0; i < 7; i++) {

    for (let j = 0; j < brushAmount; j++) {

      fill(skyColorsLerpC[i]);
      skyLerpEllipseC.push(ellipse(brushWidth / 2 + brushWidth * j, brushWidth / 2 + brushWidth * (i + 17), brushWidth));

    }



  }

  for (let i = 0; i < 7; i++) {

    for (let j = 0; j < brushAmount; j++) {

      fill(skyColorsLerpD[i]);
      skyLerpEllipseD.push(ellipse(brushWidth / 2 + brushWidth * j, brushWidth / 2 + brushWidth * (i + 25), brushWidth));

    }

  }
}