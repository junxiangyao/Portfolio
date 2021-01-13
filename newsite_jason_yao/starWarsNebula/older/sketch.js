/************************************************************
 * MAT259 PROJ 2 : 3D Interaction & Change Over Time        *
 *                                                          *
 * Junxiang Yao                                             *
 *                                                          *
 *                                                          *
 * Usage: Press 1 / 2 / 3 / 4 / 5 / 6 to check movie        *
 *        individually.                                     *
 *                                                          *
 *        Press 7 / 8 to check the original / prequel       *
 *        trilogy.                                          *
 *                                                          *
 *        Press 9 / 0 to check all in one / different       *
 *        cordinate systems.                                *
 *                                                          *
 *        Press D to show / hide dots of duration           *
 *        times.                                            *
 *                                                          *
 *        Press S to show / hide the solids.                *
 *                                                          *
 *        Press N to show / hide the cromatic frames.       *
 *                                                          *
 *        Press F to show / hide grey frames.               *
 *                                                          *
 *        Press T to show / hide the verbal information.    *
 *                                                          *
 *        Press L to show / hide the cordinate axis and     *
 *        lables.                                           *
 *                                                          *
 *        Press G to show / hide the grid system.           *
 *                                                          *
 *                                                          *
 * Tags:  Interaction - Keyboard Control                    *
 *                                                          *
 *        data        - Containing the data() function      *
 *                      which draws the cordinate axises    *
 *                      and the dots and calls other        *
 *                      ralated functions.                  *
 *                                                          *
 *        drawLine    - Including drawHLine() & drawVLine() *
 *                      which draw longitude and latitude.  *
 *                                                          *
 *        drawShape   - Containing drawShape() which paints *
 *                      the color between longitude and     *
 *                      latitude.                           *
 *                                                          *
 *        gui         - draw verbal information and legends.*
 *                                                          *
 *        mousePressed- Containing mouse pressing events    *
 *                      related code.                       *
 *                                                          *
 ************************************************************/


var easycam;
var canvas;
//DOM ellement
var dot_dom;
var frame_dom;
var mesh_dom;
var label_dom;
var dot_boolean = true;
var frame_boolean = true;
var mesh_boolean = true;
var label_boolean = true;

var sw1_dom;
var sw2_dom;
var sw3_dom;
var sw4_dom;
var sw5_dom;
var sw6_dom;

// let love;
function setup() {

  pixelDensity(1);

  // love = createGraphics(300,300);
  // love.fill(255);
  // love.textAlign(CENTER);
  // love.textSize(64);
  // love.text("love",150,150);

  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.position(0, 0);
  setAttributes('antialias', true);

  console.log(Dw.EasyCam.INFO);

  easycam = new Dw.EasyCam(this._renderer, {distance : 300});

  initHUD();

  dot_dom = select('#dot');
  dot_dom.mouseOver(function(){
    if(dot_boolean){
      this.style('background-color','rgba(255,255,255,0.9)');
      this.style('color','rgba(56, 48, 60, 1)');
    }else{
      this.style('background-color','rgba(255,255,255,0.2)');
      this.style('color','rgba(255,255,255,1)');
    }
  });

  dot_dom.mouseOut(function(){
    if(dot_boolean){
      this.style('background-color','rgba(255,255,255,0.7)');
      this.style('color','rgba(56, 48, 60, 1)');
    }else{
      this.style('background-color','rgba(255,255,255,0)');
      this.style('color','rgba(255,255,255, 1)');
    }
  });

  dot_dom.mousePressed(function(){
    dot_boolean = !dot_boolean;
    print(dot_boolean);
  });
}



function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  easycam.setViewport([0,0,windowWidth, windowHeight]);
}


function draw(){


  // projection
  perspective(60 * PI/180, width/height, 1, 5000);

  // BG
  background(56, 48, 60);

  // gizmo
  strokeWeight(1);
  stroke(255, 32,  0); line(0,0,0,100,0,0);
  stroke( 32,255, 32); line(0,0,0,0,100,0);
  stroke(  0, 32,255); line(0,0,0,0,0,100);

  // objects
  strokeWeight(0.5);
  stroke(0);

  push();
  translate(50, 50, 0);
  fill(255);
  box(50, 50, 25);
  pop();

  push();
  translate(-50, -50, 0);
  fill(255,0,128);
  box(50, 50, 25);
  pop();

  push();
  translate(+50, -50, 0);
  fill(0,128,255,10);
  box(50, 50, 25);
  pop();



//   texture(love);
//
// plane(300, 300);

  // HeadUpDisplay
  displayHUD();

}

// utility function to get some GL/GLSL/WEBGL information
function getGLInfo(){

  var gl = this._renderer.GL;

  var info = {};
  info.gl = gl;

  var debugInfo  = gl.getExtension("WEBGL_debug_renderer_info");
  if (debugInfo) {
    info.gpu_renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
    info.gpu_vendor   = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
  }
  info.wgl_renderer = gl.getParameter(gl.RENDERER);
  info.wgl_version  = gl.getParameter(gl.VERSION);
  info.wgl_glsl     = gl.getParameter(gl.SHADING_LANGUAGE_VERSION);
  info.wgl_vendor   = gl.getParameter(gl.VENDOR);

  return info;
}




function initHUD(){
  // init hud
  // var hleft = select('#hud-left');
  // var hright = select('#hud-right');
  //
  // createElement('li', "gpu_renderer").parent(hleft);
  // createElement('li', "wgl_version" ).parent(hleft);
  // createElement('li', "wgl_glsl"    ).parent(hleft);
  // createElement('li', "Framerate:"  ).parent(hleft).attribute('gap', '');
  // createElement('li', "Viewport:"   ).parent(hleft);
  // createElement('li', "Distance:"   ).parent(hleft).attribute('gap', '');
  // createElement('li', "Center:"     ).parent(hleft);
  // createElement('li', "Rotation:"   ).parent(hleft);
  //
  // var info = getGLInfo();
  // createElement('li', info.gpu_renderer || '.').parent(hright).class('green');
  // createElement('li', info.wgl_version  || '.').parent(hright).class('green');
  // createElement('li', info.wgl_glsl     || '.').parent(hright).class('green');
  // createElement('li', '.'                     ).parent(hright).class('').attribute('gap', '');
  // createElement('li', '.'                     ).parent(hright).class('');
  // createElement('li', '.'                     ).parent(hright).class('orange').attribute('gap', '');
  // createElement('li', '.'                     ).parent(hright).class('orange');
  // createElement('li', '.'                     ).parent(hright).class('orange');
}



function displayHUD(){
  easycam.beginHUD();

  // var state = easycam.getState();
  //
  // // update list
  // var ul = select('#hud-right');
  // ul.elt.children[3].innerHTML = nfs(frameRate()          , 1, 2);
  // ul.elt.children[4].innerHTML = nfs(easycam.getViewport(), 1, 0);
  // ul.elt.children[5].innerHTML = nfs(state.distance       , 1, 2);
  // ul.elt.children[6].innerHTML = nfs(state.center         , 1, 2);
  // ul.elt.children[7].innerHTML = nfs(state.rotation       , 1, 3);
  //
  // // draw screen-aligned rectangles
  // var ny = 10;
  // var off = 20;
  // var rs = (height-off) / ny - off;
  // for(var y = 0; y < ny; y++){
  //   var r = 255 * y / ny;
  //   var g = 255 - r;
  //   var b = r+g;
  //   var px = width - off - rs;
  //   var py = off + y * (rs+off);
  //   noStroke();
  //   fill(r,g,b);
  //   rect(px, py, rs, rs);
  // }

  easycam.endHUD();
}


// import peasy.*;
// import peasy.org.apache.commons.math.*;
// import peasy.org.apache.commons.math.geometry.*;
// //import peasy.test.*;
//
// PeasyCam cam;
//
// PFont f;
//
//
// int horMargin = 90;
// int verMargin = 100;
//
// Table table;//for checkout times
// Table table1;//for duration times
// Table table2;
// Table table3;
// Table table4;
// Table table5;
// Table table6;
//
// int rows;
// //matrix countaining data about checkout times
// float[][] dataMatrix1;
// float[][] dataMatrix2;
// float[][] dataMatrix3;
// float[][] dataMatrix4;
// float[][] dataMatrix5;
// float[][] dataMatrix6;
//
// //matrix countaining data about duration times
// float[][] duMatrix1;
// float[][] duMatrix2;
// float[][] duMatrix3;
// float[][] duMatrix4;
// float[][] duMatrix5;
// float[][] duMatrix6;
//
//
// int year = 10, month =12;
// float radM, radY;
//
//
//
// boolean fill = true;// paint color on each surfaces
// boolean duration = true;//show dots
// boolean line = false;//hide the grey frames
// boolean cline = true;//show the cromatic frames
// boolean [] s;//whether the structure is show or not
// boolean [] center;//whether the structure is shown on the center or not
//
// boolean [] highlightingYear;//whether the data of years are highlighted
// boolean [] highlightingMonth;//whether the data of months are highlighted
// boolean grid = false;//hide the grid system
// boolean discription = true;//show the verbal information
// boolean label = true;//show the cordinate circles and lables
// boolean showTitle = true;//show the title of the movie near the cordinate circles
// boolean showLegend = false;//hide the legend
//
// String[] monthName = {"January", "February", "March", "April", "May", "June", "July", "August",
//   "September", "October", "November", "December"};
// String[] m = {"Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.",
//   "Sep.", "Oct.", "Nov.", "Dec."};
// String[] movieTitle = {"Star Wars I : \nThe Phantom Menace\n1999 ",
//   //"Star War I : \nThe Phantom Menace     \n1999       ",
//   "Star Wars II : \nAttack of the Clones\n2002 ",
//   "Star Wars III : \nRevenge of the Sith\n2005 ",
//   "Star Wars IV : \nA New Hope\n1977 ",
//   "Star Wars V : \nThe Empire Strikes Back\n1980 ",
//   "Star Wars VI : \nReturn of the Jedi\n1983 "};
//
// float frameCounter = 0;
// float circleCounter = 0;
// float savedFrame = 0;
// float frameSection = 0;
// float circles = 3;
// int  state = 0;
//
//
// void setup() {
//   //size(1920, 1080, P3D);
//   //size(1080, 720, P3D);
//     size(1280, 800, P3D);
//
//   cam = new PeasyCam(this, 800);
//   cam.setMinimumDistance(200);
//   cam.setMaximumDistance(1800);
//
//   f = createFont("Arial", 100);
//
//   savedFrame = frameCount;
//   highlightingYear = new boolean [10];
//   highlightingMonth = new boolean [12];
//   s = new boolean [6];
//   center = new boolean [6];
//   for (int i = 0; i < year; i++) {
//     highlightingYear[i]=false;
//   }
//   for (int i = 0; i < month; i++) {
//     highlightingMonth[i]=false;
//   }
//
//   for (int i = 0; i < 6; i++) {
//     s[i]=true;
//   }
//   for (int i = 0; i < 6; i++) {
//     center[i]=false;
//   }
//
//   table = new Table();
//   //table1 = new Table();
//   table = loadTable("starwarcheckout.csv", "header");
//
//   table1 = loadTable("starwar1_duration.csv", "header");
//   table2 = loadTable("starwar2_duration.csv", "header");
//   table3 = loadTable("starwar3_duration.csv", "header");
//   table4 = loadTable("starwar4_duration.csv", "header");
//   table5 = loadTable("starwar5_duration.csv", "header");
//   table6 = loadTable("starwar6_duration.csv", "header");
//
//
//   //------------------------------
//   //Initialize the checkout data
//   //------------------------------
//
//
//   cp5 = new ControlP5(this);
//   dataMatrix1 = new float[year][month];
//   dataMatrix2 = new float[year][month];
//   dataMatrix3 = new float[year][month];
//   dataMatrix4 = new float[year][month];
//   dataMatrix5 = new float[year][month];
//   dataMatrix6 = new float[year][month];
//
//
//
//   for (int i = 0; i < year; i++) {
//     for (int j = month-1; j >=0; j--) {
//       dataMatrix1[i][month-1-j] = table.getInt(i*month+j, 2);
//     }
//   }
//
//   for (int i = 0; i < year; i++) {
//     for (int j = month-1; j >=0; j--) {
//       dataMatrix2[i][month-1-j] = table.getInt(i*month+j, 3);
//     }
//   }
//   for (int i = 0; i < year; i++) {
//     for (int j = month-1; j >=0; j--) {
//       dataMatrix3[i][month-1-j] = table.getInt(i*month+j, 4);
//     }
//   }
//   for (int i = 0; i < year; i++) {
//     for (int j = month-1; j >=0; j--) {
//       dataMatrix4[i][month-1-j] = table.getInt(i*month+j, 5);
//     }
//   }
//   for (int i = 0; i < year; i++) {
//     for (int j = month-1; j >=0; j--) {
//       dataMatrix5[i][month-1-j] = table.getInt(i*month+j, 6);
//     }
//   }
//   for (int i = 0; i < year; i++) {
//     for (int j = month-1; j >=0; j--) {
//       dataMatrix6[i][month-1-j] = table.getInt(i*month+j, 7);
//     }
//   }
//
//
//   //-----------------------------
//   //Initialize the duration data
//   //-----------------------------
//
//   duMatrix1 = new float[year][month];
//   duMatrix2 = new float[year][month];
//   duMatrix3 = new float[year][month];
//   duMatrix4 = new float[year][month];
//   duMatrix5 = new float[year][month];
//   duMatrix6 = new float[year][month];
//
//   for (int i = 0; i < year; i++) {
//     for (int j = month-1; j >=0; j--) {
//       duMatrix1[i][month-1-j] = table1.getInt(i*month+j, 2);
//     }
//   }
//
//   for (int i = 0; i < year; i++) {
//     for (int j = month-1; j >=0; j--) {
//       duMatrix2[i][month-1-j] = table2.getInt(i*month+j, 2);
//     }
//   }
//   for (int i = 0; i < year; i++) {
//     for (int j = month-1; j >=0; j--) {
//       duMatrix3[i][month-1-j] = table3.getInt(i*month+j, 2);
//     }
//   }
//   for (int i = 0; i < year; i++) {
//     for (int j = month-1; j >=0; j--) {
//       duMatrix4[i][month-1-j] = table4.getInt(i*month+j, 2);
//     }
//   }
//   for (int i = 0; i < year; i++) {
//     for (int j = month-1; j >=0; j--) {
//       duMatrix5[i][month-1-j] = table5.getInt(i*month+j, 2);
//     }
//   }
//   for (int i = 0; i < year; i++) {
//     for (int j = month-1; j >=0; j--) {
//       duMatrix6[i][month-1-j] = table6.getInt(i*month+j, 2);
//     }
//   }
//   for (int i = 0; i < 6; i++) {
//       s[i]=true;
//     }
// }
//
//
// void draw() {
//   smooth();
//   rotateX(-.5);
//   rotateY(-.5);
//   background(56, 48, 60);
//
//
//   rotateY(-radians(frameCounter));
//
//
//   //if (circleCounter > circles*10+6) {
//   //  circleCounter = 0;
//   //  state = (state + 1)%4;
//   //}
//   ////print(state);
//   //if (state == 0) {
//   //  fill = true;
//   //  duration = true;
//   //  cline = true;
//   //} else if (state == 1) {
//   //  fill = false;
//   //  duration = false;
//   //  cline = true;
//   //} else if (state == 2) {
//   //  fill = false;
//   //  duration = true;
//   //  cline = false;
//   //} else if (state == 3) {
//   //  fill = true;
//   //  duration = false;
//   //  cline = false;
//   //}
//
//
//
//
// //  if (circleCounter < circles*2+2) {
// //    mode1();
// //  } else if (circleCounter < circles*3+2) {
// //    mode2();
// //  } else if (circleCounter < circles*4+2) {
// //    mode3();
// //  } else if (circleCounter < circles*5+2) {
// //    mode4();
// //  } else if (circleCounter < circles*6+2) {
// //    mode5();
// //  } else if (circleCounter < circles*7+2) {
// //    mode6();
// //  } else if (circleCounter < circles*8+2) {
// //    label = false;
// //    mode7();
// //  } else if (circleCounter < circles*9+2) {
// //    label = false;
// //    mode8();
// //  } else if (circleCounter < circles*10+6) {
// //    label = false;
// //    mode9();
// //  }
//   mode9();
//
//
//
//   if (s[0]) {
//     pushMatrix();
//     int move1;
//     if (center[0]) {
//       move1 = 0;
//       rotateY(0);
//     } else {
//       move1 = 600;
//       rotateY(2*PI/3+PI);
//     }
//     data(dataMatrix1, move1, 0, color(#ff3535), color(#ffcccc),
//       20, 100, duMatrix1, movieTitle[0]);
//     popMatrix();
//   }
//   if (s[1]) {
//     pushMatrix();
//     int move2;
//     if (center[1]) {
//       move2 = 0;
//       rotateY(0);
//     } else {
//       move2 = 600;
//       rotateY(TWO_PI);
//     }
//     data(dataMatrix2, move2, 0, color(#fe9a2e), color(#fcd7ae),
//       20, 100, duMatrix2, movieTitle[1]);
//     popMatrix();
//   }
//   if (s[2]) {
//     pushMatrix();
//     int move3;
//     if (center[2]) {
//       move3 = 0;
//       rotateY(0);
//     } else {
//       move3 = 600;
//       rotateY(TWO_PI+PI/3);
//     }
//     data(dataMatrix3, move3, 0, color(#edc628), color(#edeadc),
//       20, 100, duMatrix3, movieTitle[2]);
//     popMatrix();
//   }
//   if (s[3]) {
//     pushMatrix();
//     int move4;
//     if (center[3]) {
//       move4 = 0;
//       rotateY(0);
//     } else {
//       move4 = 600;
//       rotateY(TWO_PI+2*PI/3);
//     }
//     data(dataMatrix4, move4, 0, color(#70b70a), color(#b8fcf0),
//       20, 100, duMatrix4, movieTitle[3]);
//     popMatrix();
//   }
//   if (s[4]) {
//     pushMatrix();
//     int move5;
//     if (center[4]) {
//       move5 = 0;
//       rotateY(0);
//     } else {
//       move5 = 600;
//       rotateY(TWO_PI+PI);
//     }
//     data(dataMatrix5, move5, 0, color(#4c97dc), color(#b7cbff),
//       20, 100, duMatrix5, movieTitle[4]);
//     popMatrix();
//   }
//   if (s[5]) {
//     pushMatrix();
//     int move6;
//     if (center[5]) {
//       move6 = 0;
//       rotateY(0);
//     } else {
//       move6 = 600;
//       rotateY(PI/3+PI);
//     }
//     data(dataMatrix6, move6, 0, color(#6d6cca), color(#c898df),
//       20, 100, duMatrix6, movieTitle[5]);
//     popMatrix();
//   }
//
//   if (discription) {
//     gui();
//   }
//   frameCounter += 0.2;
//
//   frameSection = frameCount - savedFrame;
//   if (frameSection>360) {
//     savedFrame = frameCount;
//     circleCounter++;
//   }
// }
// data(dataMatrix1, move1, color(#ff3535), 20, duMatrix1);

function data(dataMatrix, c, a, duMatrix) {
  push();
  fill(10);

  //-----------------------------
  //draw dots
  //-----------------------------
  if (duration) {
    for (int i = 0; i < year; i++) {
      color dcolor = c;
      for (int k = 0; k < year; k++) {
        if (highlightingYear[k]==true && k == i) {
          dcolor = cb;
        }
      }
      radY=i*TWO_PI/year;
      for (int j = 0; j < month; j++) {
        stroke(dcolor, 150);
        for (int k = 0; k < month; k++) {
          if (highlightingMonth[k]==true && k == month - j - 1) {
            stroke(cb, 150);
          }
        }
        radM=(j+1)*(float)PI/13;

        strokeWeight(duMatrix[i][j]/10);
        float r = dataMatrix[i][j];
        point(r*sin(radY)*sin(radM), r*cos(radM), r*cos(radY)*sin(radM));
      }
    }
  }



  //-----------------------------
  //call other functions
  //-----------------------------

  //for surface
  if (fill) {
    drawShape(dataMatrix, c, a);
  }

  //for cromatic frame
  if (cline) {
    drawHLine(dataMatrix, c);
    drawVLine(dataMatrix, c);
  }

  popMatrix();
}
