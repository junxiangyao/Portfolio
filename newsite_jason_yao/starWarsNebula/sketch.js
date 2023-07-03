/************************************************************
 * MAT259 PROJ 2 : 3D Interaction & Change Over Time        *
 *                                                          *
 * Junxiang Yao                                             *
 *                                                          *
 * Feb. 22 2018  PST                                        *
 *                                                          *
 *                                                          *
 * Usage: Press 1 / 2 / 3 / 4 / 5 / 6 to check movie        *
 *        individually.                                     *
 *                                                          *
 *        Press 0 to check all in one cordinate system.     *
 *                                                          *
 *        Press D to show / hide dots of duration           *
 *        times.                                            *
 *                                                          *
 *        Press M to show / hide meshes.                    *
 *                                                          *
 *        Press S to show / hide cromatic structures.       *
 *                                                          *
 *        Press T to show / hide the title of the movie.    *
 *                                                          *
 *        Press L to show / hide cordinate axis and lables. *
 *                                                          *
 *        Press G to show / hide gizmo.                     *
 *                                                          *
 ************************************************************/

var easycam;
var canvas;

//data
var table_check_out;//for checkout times
var table = [];//for duration times
var data_matrix_cout = new Array(6);
var data_matrix_duration = new Array(6);
function preload() {
  table_check_out = loadTable("./data/starwarscheckout.csv","csv","header");
  print(table_check_out);
  for(var i = 0; i < 6; ++i){
      let num = i + 1;
      let filename = "./data/starwars" + num.toString() + "_duration.csv";
      print(filename);
      table[i] = loadTable(filename, 'csv', "header");
      print("Succeed!");
  }
}

//drawing
var label;
var radM, radY;
var years = 10;//don't use year
var months = 12;//don't use month
var color_bg = 'rgba(56, 48, 60, 1)';
var color_white = 'rgba(255,255,255, 1)';
var color_transparent = 'rgba(255,255,255, 0.1)';
var color_translucent = 'rgba(255,255,255, 0.7)';
var color_rgb = ["255,53,53,","240,120,46,", "240,200,40,",
"112,183,10,", "76,151,220,", "109,108,202,"];
var color_minimum = 0.1;
var color_limited = 0.2;
var color_light = 0.4;
var color_middle = 0.6;
var color_vivid = 0.8;
var color_full = 1.0;

//interaction
var showData = [];//whether the structure is show or not
var showMesh = false;// paint color on each surfaces
var duration = false;//show dots
var showStructure = true;//show the cromatic frames
var showLabel = true;//show the cordinate circles and lables
var showTitle = [];// show title of the movie in the cordinate system
var showMultiple = true;//if multiple data are shown, disable showTitle no matter what
var doRotate = true;//rotation control
var showGizmo = false;
var millisHolder = 0;//get the angle when rotation is stopped
var currentPosition = 0;//current rotating angle

// dom
var dot_dom;
var structure_dom;
var mesh_dom;
var label_dom;
var rotation_dom;
var star_wars_dom = [];
var movie_name_short = ["Star Wars I (1999)",
"Star Wars II (2002)",
"Star Wars III (2005)",
"Star Wars IV (1977)",
"Star Wars V (1980)",
"Star Wars VI (1983)"]

function setup() {

  /***********************
    Data input
  ************************/
  for (i = 0; i < 6; i++) {
    data_matrix_cout[i] = []; // create nested array
    for (j = 0; j < years; j++) {
      data_matrix_cout[i][j] = [];
      for (k = 0; k < months; k++) {
        let z = 11 - k;
        data_matrix_cout[i][j][k] = table_check_out.get(int(j*months+z), i+2);
      }
    }
  }

  for (i = 0; i < 6; i++) {
    data_matrix_duration[i] = []; // create nested array
    for (j = 0; j < years; j++) {
      data_matrix_duration[i][j] = [];
      for (k = 0; k < months; k++) {
        let z = 11 - k;
        data_matrix_duration[i][j][k] = table[i].get(int(j*months+z), 2);
        if(data_matrix_duration[i][j][k] == 0){
          data_matrix_duration[i][j][k] = 0.1;
        };
      }
    }
  }

  // console.log(data_matrix_duration[1][9]);
  // console.log(table[1]);

  /****************************
    Display Data Controlling
  *****************************/
  for(var i = 0; i < 6; ++i){
    showData[i] = false;
    showTitle[i] = false;
  }
  showData[0] = true;
  showTitle[0] = true;


  pixelDensity(1);

  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.position(0,0);
  setAttributes('antialias', false);

  // console.log(Dw.EasyCam.INFO);

  easycam = new Dw.EasyCam(this._renderer, {distance : 800});

  label = new Label();
  //Predraw the spheres. Without this step, when enable sphere in draw() during runtime, the screen will freeze a bit
  if(duration === false){
    duration = true;
    for(var i = 0; i < 6; ++i){
      if(showData[i]){
        data(data_matrix_cout[i], color("rgba("+color_rgb[i]+color_full+")"), color("rgba("+color_rgb[i]+color_minimum+")"), data_matrix_duration[i]);
      }
    }
    duration = false;
  }

  initHUD();
}

//callbacks
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  easycam.setViewport([0,0,windowWidth, windowHeight]);
}
function keyTyped() {
  if (key === '1'||key === '2'||key === '3'||key === '4'||key === '5'||key === '6') {
    for(var i = 0; i < 6; ++i){
      showData[i] = false;
      showTitle[i] = false;
    }
    showData[key - 1] = true;
    showTitle[key - 1] = true;
    showMultiple = false;
  }
  else if(key === '0'){
    for(var i = 0; i < 6; ++i){
      showData[i] = true;
      showTitle[i] = false;
    }
    showMultiple = true;
  }else if(key === 't'){
    for(var i = 0; i < 6; ++i){
      if(showData[i]&&!showMultiple){
        showTitle[i] = !showTitle[i];
      }else{
        showTitle[i] = false;
      }
    }
  }else if(key === 'd'){
    duration = !duration;
  }
  else if(key === 's'){
    showStructure = !showStructure;
  }else if(key === 'm'){
    showMesh = !showMesh;
  }else if(key === 'l'){
    showLabel = !showLabel;
  }else if(key === 'g'){
    showGizmo = !showGizmo;
  }else if(key === 'r'){
    doRotate = !doRotate;
    if(!doRotate){
      millisHolder = currentPosition;
    }else{
      millisHolder = millis() - currentPosition;//My gosh this is tricky
    }
  }
}

function draw(){

  // projection
  perspective(60 * PI/180, width/height, 1, 5000);
  clear();

  // BG
  background(56,48,60);

  // Initialize the default camera angle
  rotateX(-.5);
  rotateY(-.5);

  //rotation
  // rotateY(millis()/ 5000);
  if(doRotate){
    currentPosition = millis() - millisHolder;
    rotateY(currentPosition / 5000);
  }else{
    rotateY(millisHolder / 5000);
  }

  // ambientLight(128, 128, 128);
  // directionalLight(128, 128, 128, 0, 0, -1);
  for(var i = 0; i < 6; ++i){
    if(showData[i]){
      data(data_matrix_cout[i], color("rgba("+color_rgb[i]+color_full+")"), color("rgba("+color_rgb[i]+color_minimum+")"), data_matrix_duration[i]);
    }
  }

  let showCounter = 0;
  let showIndex = 0;
  for(var i = 0; i < 6; ++i){
    showTitle[i] = false;
    if(showData[i]){
      showCounter += 1;
      showIndex = i;
    }
  }
  if(showCounter === 1){
    showTitle[showIndex] = true;
  }

  if(showLabel){
    label.display();
  }

  if(showGizmo){
    drawGizmo();
  }

  displayHUD();
  // for(let i = 0; i < 6; ++i){
  //   if(showData[i]){
  //     star_wars_dom[i].style('background-color','rgba('+color_rgb[i]+color_vivid+')');
  //     star_wars_dom[i].style('color',color_white);
  //
  //   }else{
  //     star_wars_dom[i].style('background-color','rgba('+color_rgb[i]+color_light+')');
  //     star_wars_dom[i].style('color',color_white);
  //   }
  // }
  // HeadUpDisplay



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
  var hud = selectAll('.hud');
  var control_button = select('#control');
  var movie_button = select('#movie');
  var title = select('.title');

  control_button.style("width","140px");
  // movie_button.style();

  title.style('margin','0 auto');
  hud[0].style('padding-left','10%');
  hud[1].style('padding-left','10%');
  hud[1].style('padding-top','200px');
  let majortitle = createElement('h2', "Star Wars Nebular").parent(title);
  majortitle.style('margin-bottom','0');
  createElement('h5', "Checkout Times and Duration Data of the Former 6 in the Movie Series in Seattle Public Library").parent(title);
  dot_dom = createElement('p', "Duration Dots").parent(control_button);
  dot_dom.class("custom_button");
  if(duration){
    dot_dom.style('background-color', color_translucent);
    dot_dom.style('color',color_bg);
  }else{
    dot_dom.style('background-color',color_transparent);
    dot_dom.style('color',color_white);
  }
  structure_dom = createElement('p', "Structure").parent(control_button);
  structure_dom.class("custom_button");
  if(showStructure){
    structure_dom.style('background-color', color_translucent);
    structure_dom.style('color',color_bg);
  }else{
    structure_dom.style('background-color',color_transparent);
    structure_dom.style('color',color_white);
  }
  // mesh_dom = createElement('p', "Mesh").parent(control_button);
  // mesh_dom.class("custom_button");
  // if(showMesh){
  //   mesh_dom.style('background-color', color_translucent);
  //   mesh_dom.style('color',color_bg);
  // }else{
  //   mesh_dom.style('background-color',color_transparent);
  //   mesh_dom.style('color',color_white);
  // }
  label_dom = createElement('p', "Label").parent(control_button);
  label_dom.class("custom_button");
  if(showLabel){
    label_dom.style('background-color', color_translucent);
    label_dom.style('color',color_bg);
  }else{
    label_dom.style('background-color',color_transparent);
    label_dom.style('color',color_white);
  }
  rotation_dom = createElement('p', "Rotation").parent(control_button);
  rotation_dom.class("custom_button");
  if(doRotate){
    rotation_dom.style('background-color', color_translucent);
    rotation_dom.style('color',color_bg);
  }else{
    rotation_dom.style('background-color',color_transparent);
    rotation_dom.style('color',color_white);
  }

  for(var i = 0; i < 6; ++i){
    star_wars_dom[i] = createElement('p', movie_name_short[i]).parent(movie_button);
    star_wars_dom[i].class("custom_button");
    if(showData[i]){
      star_wars_dom[i].style('background-color','rgba('+color_rgb[i]+color_middle+')');
      star_wars_dom[i].style('color',color_white);
    }else{
      star_wars_dom[i].style('background-color','rgba('+color_rgb[i]+color_limited+')');
      star_wars_dom[i].style('color',color_white);
    }
  }
}
// ... 3D ....
// easycam.beginHUD();
// ... 2D ....
// easycam.endHUD();
// ... 3D ....
function displayHUD(){
  easycam.beginHUD();
  dot_dom.mouseOver(function(){
    if(duration){
      this.style('background-color','rgba(255,255,255,0.9)');
      this.style('color',color_bg);
    }else{
      this.style('background-color','rgba(255,255,255,0.2)');
      this.style('color','rgba(255,255,255,1)');
    }
  });
  dot_dom.mouseOut(function(){
    if(duration){
      this.style('background-color', color_translucent);
      this.style('color',color_bg);
    }else{
      this.style('background-color',color_transparent);
      this.style('color',color_white);
    }
  });
  dot_dom.mousePressed(function(){
    duration = !duration;
  });

  structure_dom.mouseOver(function(){
    if(showStructure){
      this.style('background-color','rgba(255,255,255,0.9)');
      this.style('color',color_bg);
    }else{
      this.style('background-color','rgba(255,255,255,0.2)');
      this.style('color','rgba(255,255,255,1)');
    }
  });
  structure_dom.mouseOut(function(){
    if(showStructure){
      this.style('background-color', color_translucent);
      this.style('color',color_bg);
    }else{
      this.style('background-color',color_transparent);
      this.style('color',color_white);
    }
  });
  structure_dom.mousePressed(function(){
    showStructure = !showStructure;
  });

  // mesh_dom.mouseOver(function(){
  //   if(showMesh){
  //     this.style('background-color','rgba(255,255,255,0.9)');
  //     this.style('color',color_bg);
  //   }else{
  //     this.style('background-color','rgba(255,255,255,0.2)');
  //     this.style('color','rgba(255,255,255,1)');
  //   }
  // });
  // mesh_dom.mouseOut(function(){
  //   if(showMesh){
  //     this.style('background-color', color_translucent);
  //     this.style('color',color_bg);
  //   }else{
  //     this.style('background-color',color_transparent);
  //     this.style('color',color_white);
  //   }
  // });
  // mesh_dom.mousePressed(function(){
  //   showMesh = !showMesh;
  // });

  label_dom.mouseOver(function(){
    if(showLabel){
      this.style('background-color','rgba(255,255,255,0.9)');
      this.style('color',color_bg);
    }else{
      this.style('background-color','rgba(255,255,255,0.2)');
      this.style('color','rgba(255,255,255,1)');
    }
  });
  label_dom.mouseOut(function(){
    if(showLabel){
      this.style('background-color', color_translucent);
      this.style('color',color_bg);
    }else{
      this.style('background-color',color_transparent);
      this.style('color',color_white);
    }
  });
  label_dom.mousePressed(function(){
    showLabel = !showLabel;
  });

  rotation_dom.mouseOver(function(){
    if(doRotate){
      this.style('background-color','rgba(255,255,255,0.9)');
      this.style('color',color_bg);
    }else{
      this.style('background-color','rgba(255,255,255,0.2)');
      this.style('color','rgba(255,255,255,1)');
    }
  });
  rotation_dom.mouseOut(function(){
    if(doRotate){
      this.style('background-color', color_translucent);
      this.style('color',color_bg);
    }else{
      this.style('background-color',color_transparent);
      this.style('color',color_white);
    }
  });
  rotation_dom.mousePressed(function(){
    doRotate = !doRotate;
    if(!doRotate){
      millisHolder = currentPosition;
    }else{
      millisHolder = millis() - currentPosition;//My gosh this is tricky
    }
  });

  star_wars_dom[0].mouseOver(function(){
    if(showData[0]){
      this.style('background-color','rgba('+color_rgb[0]+color_vivid+')');
      this.style('color',color_white);
    }else{
      this.style('background-color','rgba('+color_rgb[0]+color_light+')');
      this.style('color',color_white);
    }
  });
  star_wars_dom[0].mouseOut(function(){
    if(showData[0]){
      this.style('background-color','rgba('+color_rgb[0]+color_middle+')');
      this.style('color',color_white);
    }else{
      this.style('background-color','rgba('+color_rgb[0]+color_limited+')');
      this.style('color',color_white);
    }
  });
  star_wars_dom[0].mousePressed(function(){
    if (!showData[0]) {
      showTitle[0] = true;
      for(var i = 0; i < 6; ++i){
        if(showData[i]){
          for(var i = 0; i < 6; ++i){
            showTitle[i] = false;
          }
        }
      }
    }else{
      showTitle[0] = false;
    }
    showData[0] = !showData[0];
    if(showData[0]){
      showData[1] = false;
      showData[2] = false;
      showData[3] = false;
      showData[4] = false;
      showData[5] = false;
    }
    for(let i = 0; i < 6; ++i){
      if(showData[i]){
        star_wars_dom[i].style('background-color','rgba('+color_rgb[i]+color_vivid+')');
        star_wars_dom[i].style('color',color_white);

      }else{
        star_wars_dom[i].style('background-color','rgba('+color_rgb[i]+color_limited+')');
        star_wars_dom[i].style('color',color_white);
      }
    }
  });

  star_wars_dom[1].mouseOver(function(){
    if(showData[1]){
      this.style('background-color','rgba('+color_rgb[1]+color_vivid+')');
      this.style('color',color_white);
    }else{
      this.style('background-color','rgba('+color_rgb[1]+color_light+')');
      this.style('color',color_white);
    }
  });
  star_wars_dom[1].mouseOut(function(){
    if(showData[1]){
      this.style('background-color','rgba('+color_rgb[1]+color_middle+')');
      this.style('color',color_white);
    }else{
      this.style('background-color','rgba('+color_rgb[1]+color_limited+')');
      this.style('color',color_white);
    }
  });
  star_wars_dom[1].mousePressed(function(){
    if (!showData[1]) {
      showTitle[1] = true;
      for(var i = 0; i < 6; ++i){
        if(showData[i]){
          for(var i = 0; i < 6; ++i){
            showTitle[i] = false;
          }
        }
      }
    }else{
      showTitle[1] = false;
    }
    showData[1] = !showData[1];
    if(showData[1]){
      showData[0] = false;
      showData[2] = false;
      showData[3] = false;
      showData[4] = false;
      showData[5] = false;
    }
    for(let i = 0; i < 6; ++i){
      if(showData[i]){
        star_wars_dom[i].style('background-color','rgba('+color_rgb[i]+color_vivid+')');
        star_wars_dom[i].style('color',color_white);

      }else{
        star_wars_dom[i].style('background-color','rgba('+color_rgb[i]+color_limited+')');
        star_wars_dom[i].style('color',color_white);
      }
    }
  });

  star_wars_dom[2].mouseOver(function(){
    if(showData[2]){
      this.style('background-color','rgba('+color_rgb[2]+color_vivid+')');
      this.style('color',color_white);
    }else{
      this.style('background-color','rgba('+color_rgb[2]+color_light+')');
      this.style('color',color_white);
    }
  });
  star_wars_dom[2].mouseOut(function(){
    if(showData[2]){
      this.style('background-color','rgba('+color_rgb[2]+color_middle+')');
      this.style('color',color_white);
    }else{
      this.style('background-color','rgba('+color_rgb[2]+color_limited+')');
      this.style('color',color_white);
    }
  });
  star_wars_dom[2].mousePressed(function(){
    if (!showData[2]) {
      showTitle[2] = true;
      for(var i = 0; i < 6; ++i){
        if(showData[i]){
          for(var i = 0; i < 6; ++i){
            showTitle[i] = false;
          }
        }
      }
    }else{
      showTitle[2] = false;
    }
    showData[2] = !showData[2];
    if(showData[2]){
      showData[0] = false;
      showData[1] = false;
      showData[3] = false;
      showData[4] = false;
      showData[5] = false;
    }
    for(let i = 0; i < 6; ++i){
      if(showData[i]){
        star_wars_dom[i].style('background-color','rgba('+color_rgb[i]+color_vivid+')');
        star_wars_dom[i].style('color',color_white);

      }else{
        star_wars_dom[i].style('background-color','rgba('+color_rgb[i]+color_limited+')');
        star_wars_dom[i].style('color',color_white);
      }
    }
  });

  star_wars_dom[3].mouseOver(function(){
    if(showData[3]){
      this.style('background-color','rgba('+color_rgb[3]+color_vivid+')');
      this.style('color',color_white);
    }else{
      this.style('background-color','rgba('+color_rgb[3]+color_light+')');
      this.style('color',color_white);
    }
  });
  star_wars_dom[3].mouseOut(function(){
    if(showData[3]){
      this.style('background-color','rgba('+color_rgb[3]+color_middle+')');
      this.style('color',color_white);
    }else{
      this.style('background-color','rgba('+color_rgb[3]+color_limited+')');
      this.style('color',color_white);
    }
  });
  star_wars_dom[3].mousePressed(function(){
    if (!showData[3]) {
      showTitle[3] = true;
      for(var i = 0; i < 6; ++i){
        if(showData[i]){
          for(var i = 0; i < 6; ++i){
            showTitle[i] = false;
          }
        }
      }
    }else{
      showTitle[3] = false;
    }
    showData[3] = !showData[3];
    if(showData[3]){
      showData[0] = false;
      showData[1] = false;
      showData[2] = false;
      showData[4] = false;
      showData[5] = false;
    }
    for(let i = 0; i < 6; ++i){
      if(showData[i]){
        star_wars_dom[i].style('background-color','rgba('+color_rgb[i]+color_vivid+')');
        star_wars_dom[i].style('color',color_white);

      }else{
        star_wars_dom[i].style('background-color','rgba('+color_rgb[i]+color_limited+')');
        star_wars_dom[i].style('color',color_white);
      }
    }
  });

  star_wars_dom[4].mouseOver(function(){
    if(showData[4]){
      this.style('background-color','rgba('+color_rgb[4]+color_vivid+')');
      this.style('color',color_white);
    }else{
      this.style('background-color','rgba('+color_rgb[4]+color_light+')');
      this.style('color',color_white);
    }
  });
  star_wars_dom[4].mouseOut(function(){
    if(showData[4]){
      this.style('background-color','rgba('+color_rgb[4]+color_middle+')');
      this.style('color',color_white);
    }else{
      this.style('background-color','rgba('+color_rgb[4]+color_limited+')');
      this.style('color',color_white);
    }
  });
  star_wars_dom[4].mousePressed(function(){
    if (!showData[4]) {
      showTitle[4] = true;
      for(var i = 0; i < 6; ++i){
        if(showData[i]){
          for(var i = 0; i < 6; ++i){
            showTitle[i] = false;
          }
        }
      }
    }else{
      showTitle[4] = false;
    }
    showData[4] = !showData[4];
    if(showData[4]){
      showData[0] = false;
      showData[1] = false;
      showData[2] = false;
      showData[3] = false;
      showData[5] = false;
    }
    for(let i = 0; i < 6; ++i){
      if(showData[i]){
        star_wars_dom[i].style('background-color','rgba('+color_rgb[i]+color_vivid+')');
        star_wars_dom[i].style('color',color_white);

      }else{
        star_wars_dom[i].style('background-color','rgba('+color_rgb[i]+color_limited+')');
        star_wars_dom[i].style('color',color_white);
      }
    }
  });

  star_wars_dom[5].mouseOver(function(){
    if(showData[5]){
      this.style('background-color','rgba('+color_rgb[5]+color_vivid+')');
      this.style('color',color_white);
    }else{
      this.style('background-color','rgba('+color_rgb[5]+color_light+')');
      this.style('color',color_white);
    }
  });
  star_wars_dom[5].mouseOut(function(){
    if(showData[5]){
      this.style('background-color','rgba('+color_rgb[5]+color_middle+')');
      this.style('color',color_white);
    }else{
      this.style('background-color','rgba('+color_rgb[5]+color_limited+')');
      this.style('color',color_white);
    }
  });
  star_wars_dom[5].mousePressed(function(){
    if (!showData[5]) {
      showTitle[5] = true;
      for(var i = 0; i < 6; ++i){
        if(showData[i]){
          for(var i = 0; i < 6; ++i){
            showTitle[i] = false;
          }
        }
      }
    }else{
      showTitle[5] = false;
    }
    showData[5] = !showData[5];
    showData[4] = !showData[4];
    if(showData[5]){
      showData[0] = false;
      showData[1] = false;
      showData[2] = false;
      showData[3] = false;
      showData[4] = false;
    }
    for(let i = 0; i < 6; ++i){
      if(showData[i]){
        star_wars_dom[i].style('background-color','rgba('+color_rgb[i]+color_vivid+')');
        star_wars_dom[i].style('color',color_white);

      }else{
        star_wars_dom[i].style('background-color','rgba('+color_rgb[i]+color_limited+')');
        star_wars_dom[i].style('color',color_white);
      }
    }
  });

  // var state = easycam.getState();

  easycam.endHUD();
}

//drawing
function data(dataMatrix, c, a, duMatrix) {
  push();
  // fill(10);


  //-----------------------------
  //draw mesh
  //-----------------------------

  //for surface
  if (showMesh) {
    drawShape(dataMatrix, a);
    drawLines(dataMatrix, a);
  }

  //for cromatic frame
  if (showStructure) {
    drawLines(dataMatrix, c);
  }

  //-----------------------------
  //draw dots
  //-----------------------------
  if (duration) {
    push();
    for (var i = 0; i < years; i++) {
      var dcolor = c;
      radY = i * TWO_PI / years;
      for (var j = 0; j < months; j++) {
        fill(c);
        noStroke();
        radM = (j+1) * PI / 13;
        var r = dataMatrix[i][j];
        push();
        translate(r*sin(radY)*sin(radM), r*cos(radM), r*cos(radY)*sin(radM));
        sphere(duMatrix[i][j]/20);
        pop();
      }
    }
    pop();
  }
  pop();
}
function drawShape(dataMatrix, c) {

  for (var i = 0; i < 10; i++) {
    radY=i*TWO_PI/10;
    for (var j = 0; j < months-1; j++) {
      radM=(j+1)*PI/13;
      noStroke();
      var r = dataMatrix[i][j];
      // ambientMaterial(250);
      if (i<9) {
        beginShape();
        fill(c);
        strokeWeight(1);
        vertex(r*sin(radY)*sin(radM), r*cos(radM), r*cos(radY)*sin(radM));
        vertex(dataMatrix[i][j+1]*sin(radY)*sin(radM+PI/13), dataMatrix[i][j+1]*cos(radM+PI/13), dataMatrix[i][j+1]*cos(radY)*sin(radM+PI/13));
        vertex(dataMatrix[i+1][j+1]*sin(radY+TWO_PI/10)*sin(radM+PI/13), dataMatrix[i+1][j+1]*cos(radM+PI/13), dataMatrix[i+1][j+1]*cos(radY+TWO_PI/10)*sin(radM+PI/13));
        endShape(CLOSE);
        beginShape();
        fill(c);
        vertex(r*sin(radY)*sin(radM), r*cos(radM), r*cos(radY)*sin(radM));
        vertex(dataMatrix[i+1][j]*sin(radY+TWO_PI/10)*sin(radM), dataMatrix[i+1][j]*cos(radM), dataMatrix[i+1][j]*cos(radY+TWO_PI/10)*sin(radM));
        vertex(dataMatrix[i+1][j+1]*sin(radY+TWO_PI/10)*sin(radM+PI/13), dataMatrix[i+1][j+1]*cos(radM+PI/13), dataMatrix[i+1][j+1]*cos(radY+TWO_PI/10)*sin(radM+PI/13));
        endShape(CLOSE);
      }
      if (i == 9) {
        beginShape();
        fill(c);
        vertex(r*sin(radY)*sin(radM), r*cos(radM), r*cos(radY)*sin(radM));
        vertex(dataMatrix[i][j+1]*sin(radY)*sin(radM+PI/13), dataMatrix[i][j+1]*cos(radM+PI/13), dataMatrix[i][j+1]*cos(radY)*sin(radM+PI/13));
        vertex(dataMatrix[0][j+1]*sin(radY+TWO_PI/10)*sin(radM+PI/13), dataMatrix[0][j+1]*cos(radM+PI/13), dataMatrix[0][j+1]*cos(radY+TWO_PI/10)*sin(radM+PI/13));
        endShape(CLOSE);

        beginShape();
        fill(c);
        vertex(r*sin(radY)*sin(radM), r*cos(radM), r*cos(radY)*sin(radM));
        vertex(dataMatrix[0][j]*sin(radY+TWO_PI/10)*sin(radM), dataMatrix[0][j]*cos(radM), dataMatrix[0][j]*cos(radY+TWO_PI/10)*sin(radM));
        vertex(dataMatrix[0][j+1]*sin(radY+TWO_PI/10)*sin(radM+PI/13), dataMatrix[0][j+1]*cos(radM+PI/13), dataMatrix[0][j+1]*cos(radY+TWO_PI/10)*sin(radM+PI/13));
        endShape(CLOSE);
      }
    }
  }





  //-----------------------------
  //surfaces on the top & bottom
  //-----------------------------

  //top--------------------------
  beginShape();
  fill(c);
  let k = 1;
  vertex(dataMatrix[k][0]*sin(TWO_PI/10*k)*sin(PI/13), dataMatrix[k][0]*cos(PI/13), dataMatrix[k][0]*cos(TWO_PI/10*k)*sin(PI/13));
  k = 2;
  vertex(dataMatrix[k][0]*sin(TWO_PI/10*k)*sin(PI/13), dataMatrix[k][0]*cos(PI/13), dataMatrix[k][0]*cos(TWO_PI/10*k)*sin(PI/13));
  k = 3;
  vertex(dataMatrix[k][0]*sin(TWO_PI/10*k)*sin(PI/13), dataMatrix[k][0]*cos(PI/13), dataMatrix[k][0]*cos(TWO_PI/10*k)*sin(PI/13));
  endShape(CLOSE);

  beginShape();
  fill(c);
  k = 3;
  vertex(dataMatrix[k][0]*sin(TWO_PI/10*k)*sin(PI/13), dataMatrix[k][0]*cos(PI/13), dataMatrix[k][0]*cos(TWO_PI/10*k)*sin(PI/13));
  k = 4;
  vertex(dataMatrix[k][0]*sin(TWO_PI/10*k)*sin(PI/13), dataMatrix[k][0]*cos(PI/13), dataMatrix[k][0]*cos(TWO_PI/10*k)*sin(PI/13));
  k = 1;
  vertex(dataMatrix[k][0]*sin(TWO_PI/10*k)*sin(PI/13), dataMatrix[k][0]*cos(PI/13), dataMatrix[k][0]*cos(TWO_PI/10*k)*sin(PI/13));
  endShape(CLOSE);

  beginShape();
  fill(c);
  k = 0;
  vertex(dataMatrix[k][0]*sin(TWO_PI/10*k)*sin(PI/13), dataMatrix[k][0]*cos(PI/13), dataMatrix[k][0]*cos(TWO_PI/10*k)*sin(PI/13));
  k = 1;
  vertex(dataMatrix[k][0]*sin(TWO_PI/10*k)*sin(PI/13), dataMatrix[k][0]*cos(PI/13), dataMatrix[k][0]*cos(TWO_PI/10*k)*sin(PI/13));
  k = 4;
  vertex(dataMatrix[k][0]*sin(TWO_PI/10*k)*sin(PI/13), dataMatrix[k][0]*cos(PI/13), dataMatrix[k][0]*cos(TWO_PI/10*k)*sin(PI/13));
  endShape(CLOSE);

  beginShape();
  fill(c);
  k = 0;
  vertex(dataMatrix[k][0]*sin(TWO_PI/10*k)*sin(PI/13), dataMatrix[k][0]*cos(PI/13), dataMatrix[k][0]*cos(TWO_PI/10*k)*sin(PI/13));
  k = 4;
  vertex(dataMatrix[k][0]*sin(TWO_PI/10*k)*sin(PI/13), dataMatrix[k][0]*cos(PI/13), dataMatrix[k][0]*cos(TWO_PI/10*k)*sin(PI/13));
  k = 5;
  vertex(dataMatrix[k][0]*sin(TWO_PI/10*k)*sin(PI/13), dataMatrix[k][0]*cos(PI/13), dataMatrix[k][0]*cos(TWO_PI/10*k)*sin(PI/13));
  endShape(CLOSE);

  beginShape();
  fill(c);
  k = 9;
  vertex(dataMatrix[k][0]*sin(TWO_PI/10*k)*sin(PI/13), dataMatrix[k][0]*cos(PI/13), dataMatrix[k][0]*cos(TWO_PI/10*k)*sin(PI/13));
  k = 0;
  vertex(dataMatrix[k][0]*sin(TWO_PI/10*k)*sin(PI/13), dataMatrix[k][0]*cos(PI/13), dataMatrix[k][0]*cos(TWO_PI/10*k)*sin(PI/13));
  k = 5;
  vertex(dataMatrix[k][0]*sin(TWO_PI/10*k)*sin(PI/13), dataMatrix[k][0]*cos(PI/13), dataMatrix[k][0]*cos(TWO_PI/10*k)*sin(PI/13));
  endShape(CLOSE);

  beginShape();
  fill(c);
  k = 9;
  vertex(dataMatrix[k][0]*sin(TWO_PI/10*k)*sin(PI/13), dataMatrix[k][0]*cos(PI/13), dataMatrix[k][0]*cos(TWO_PI/10*k)*sin(PI/13));
  k = 5;
  vertex(dataMatrix[k][0]*sin(TWO_PI/10*k)*sin(PI/13), dataMatrix[k][0]*cos(PI/13), dataMatrix[k][0]*cos(TWO_PI/10*k)*sin(PI/13));
  k = 6;
  vertex(dataMatrix[k][0]*sin(TWO_PI/10*k)*sin(PI/13), dataMatrix[k][0]*cos(PI/13), dataMatrix[k][0]*cos(TWO_PI/10*k)*sin(PI/13));
  endShape(CLOSE);

  beginShape();
  fill(c);
  k = 9;
  vertex(dataMatrix[k][0]*sin(TWO_PI/10*k)*sin(PI/13), dataMatrix[k][0]*cos(PI/13), dataMatrix[k][0]*cos(TWO_PI/10*k)*sin(PI/13));
  k = 8;
  vertex(dataMatrix[k][0]*sin(TWO_PI/10*k)*sin(PI/13), dataMatrix[k][0]*cos(PI/13), dataMatrix[k][0]*cos(TWO_PI/10*k)*sin(PI/13));
  k = 6;
  vertex(dataMatrix[k][0]*sin(TWO_PI/10*k)*sin(PI/13), dataMatrix[k][0]*cos(PI/13), dataMatrix[k][0]*cos(TWO_PI/10*k)*sin(PI/13));
  endShape(CLOSE);

  beginShape();
  fill(c);
  k = 6;
  vertex(dataMatrix[k][0]*sin(TWO_PI/10*k)*sin(PI/13), dataMatrix[k][0]*cos(PI/13), dataMatrix[k][0]*cos(TWO_PI/10*k)*sin(PI/13));
  k = 7;
  vertex(dataMatrix[k][0]*sin(TWO_PI/10*k)*sin(PI/13), dataMatrix[k][0]*cos(PI/13), dataMatrix[k][0]*cos(TWO_PI/10*k)*sin(PI/13));
  k = 8;
  vertex(dataMatrix[k][0]*sin(TWO_PI/10*k)*sin(PI/13), dataMatrix[k][0]*cos(PI/13), dataMatrix[k][0]*cos(TWO_PI/10*k)*sin(PI/13));
  endShape(CLOSE);







  //bottom---------------------------------------
  beginShape();
  fill(c);
  k = 1;
  vertex(dataMatrix[k][11]*sin(TWO_PI/10*k)*sin(12*PI/13), dataMatrix[k][11]*cos(12*PI/13), dataMatrix[k][11]*cos(TWO_PI/10*k)*sin(12*PI/13));
  k = 2;
  vertex(dataMatrix[k][11]*sin(TWO_PI/10*k)*sin(12*PI/13), dataMatrix[k][11]*cos(12*PI/13), dataMatrix[k][11]*cos(TWO_PI/10*k)*sin(12*PI/13));
  k = 3;
  vertex(dataMatrix[k][11]*sin(TWO_PI/10*k)*sin(12*PI/13), dataMatrix[k][11]*cos(12*PI/13), dataMatrix[k][11]*cos(TWO_PI/10*k)*sin(12*PI/13));
  endShape(CLOSE);

  beginShape();
  fill(c);
  k = 3;
  vertex(dataMatrix[k][11]*sin(TWO_PI/10*k)*sin(12*PI/13), dataMatrix[k][11]*cos(12*PI/13), dataMatrix[k][11]*cos(TWO_PI/10*k)*sin(12*PI/13));
  k = 4;
  vertex(dataMatrix[k][11]*sin(TWO_PI/10*k)*sin(12*PI/13), dataMatrix[k][11]*cos(12*PI/13), dataMatrix[k][11]*cos(TWO_PI/10*k)*sin(12*PI/13));
  k = 1;
  vertex(dataMatrix[k][11]*sin(TWO_PI/10*k)*sin(12*PI/13), dataMatrix[k][11]*cos(12*PI/13), dataMatrix[k][11]*cos(TWO_PI/10*k)*sin(12*PI/13));
  endShape(CLOSE);

  beginShape();
  fill(c);
  k = 0;
  vertex(dataMatrix[k][11]*sin(TWO_PI/10*k)*sin(12*PI/13), dataMatrix[k][11]*cos(12*PI/13), dataMatrix[k][11]*cos(TWO_PI/10*k)*sin(12*PI/13));
  k = 1;
  vertex(dataMatrix[k][11]*sin(TWO_PI/10*k)*sin(12*PI/13), dataMatrix[k][11]*cos(12*PI/13), dataMatrix[k][11]*cos(TWO_PI/10*k)*sin(12*PI/13));
  k = 4;
  vertex(dataMatrix[k][11]*sin(TWO_PI/10*k)*sin(12*PI/13), dataMatrix[k][11]*cos(12*PI/13), dataMatrix[k][11]*cos(TWO_PI/10*k)*sin(12*PI/13));
  endShape(CLOSE);

  beginShape();
  fill(c);
  k = 0;
  vertex(dataMatrix[k][11]*sin(TWO_PI/10*k)*sin(12*PI/13), dataMatrix[k][11]*cos(12*PI/13), dataMatrix[k][11]*cos(TWO_PI/10*k)*sin(12*PI/13));
  k = 4;
  vertex(dataMatrix[k][11]*sin(TWO_PI/10*k)*sin(12*PI/13), dataMatrix[k][11]*cos(12*PI/13), dataMatrix[k][11]*cos(TWO_PI/10*k)*sin(12*PI/13));
  k = 5;
  vertex(dataMatrix[k][11]*sin(TWO_PI/10*k)*sin(12*PI/13), dataMatrix[k][11]*cos(12*PI/13), dataMatrix[k][11]*cos(TWO_PI/10*k)*sin(12*PI/13));
  endShape(CLOSE);

  beginShape();
  fill(c);
  k = 9;
  vertex(dataMatrix[k][11]*sin(TWO_PI/10*k)*sin(12*PI/13), dataMatrix[k][11]*cos(12*PI/13), dataMatrix[k][11]*cos(TWO_PI/10*k)*sin(12*PI/13));
  k = 0;
  vertex(dataMatrix[k][11]*sin(TWO_PI/10*k)*sin(12*PI/13), dataMatrix[k][11]*cos(12*PI/13), dataMatrix[k][11]*cos(TWO_PI/10*k)*sin(12*PI/13));
  k = 5;
  vertex(dataMatrix[k][11]*sin(TWO_PI/10*k)*sin(12*PI/13), dataMatrix[k][11]*cos(12*PI/13), dataMatrix[k][11]*cos(TWO_PI/10*k)*sin(12*PI/13));
  endShape(CLOSE);

  beginShape();
  fill(c);
  k = 9;
  vertex(dataMatrix[k][11]*sin(TWO_PI/10*k)*sin(12*PI/13), dataMatrix[k][11]*cos(12*PI/13), dataMatrix[k][11]*cos(TWO_PI/10*k)*sin(12*PI/13));
  k = 5;
  vertex(dataMatrix[k][11]*sin(TWO_PI/10*k)*sin(12*PI/13), dataMatrix[k][11]*cos(12*PI/13), dataMatrix[k][11]*cos(TWO_PI/10*k)*sin(12*PI/13));
  k = 6;
  vertex(dataMatrix[k][11]*sin(TWO_PI/10*k)*sin(12*PI/13), dataMatrix[k][11]*cos(12*PI/13), dataMatrix[k][11]*cos(TWO_PI/10*k)*sin(12*PI/13));
  endShape(CLOSE);

  beginShape();
  fill(c);
  k = 9;
  vertex(dataMatrix[k][11]*sin(TWO_PI/10*k)*sin(12*PI/13), dataMatrix[k][11]*cos(12*PI/13), dataMatrix[k][11]*cos(TWO_PI/10*k)*sin(12*PI/13));
  k = 8;
  vertex(dataMatrix[k][11]*sin(TWO_PI/10*k)*sin(12*PI/13), dataMatrix[k][11]*cos(12*PI/13), dataMatrix[k][11]*cos(TWO_PI/10*k)*sin(12*PI/13));
  k = 6;
  vertex(dataMatrix[k][11]*sin(TWO_PI/10*k)*sin(12*PI/13), dataMatrix[k][11]*cos(12*PI/13), dataMatrix[k][11]*cos(TWO_PI/10*k)*sin(12*PI/13));
  endShape(CLOSE);

  beginShape();
  fill(c);
  k = 6;
  vertex(dataMatrix[k][11]*sin(TWO_PI/10*k)*sin(12*PI/13), dataMatrix[k][11]*cos(12*PI/13), dataMatrix[k][11]*cos(TWO_PI/10*k)*sin(12*PI/13));
  k = 7;
  vertex(dataMatrix[k][11]*sin(TWO_PI/10*k)*sin(12*PI/13), dataMatrix[k][11]*cos(12*PI/13), dataMatrix[k][11]*cos(TWO_PI/10*k)*sin(12*PI/13));
  k = 8;
  vertex(dataMatrix[k][11]*sin(TWO_PI/10*k)*sin(12*PI/13), dataMatrix[k][11]*cos(12*PI/13), dataMatrix[k][11]*cos(TWO_PI/10*k)*sin(12*PI/13));
  endShape(CLOSE);
}
function drawLines(dataMatrix, c) {
  for (var i = 0; i < 10; i++) {
    radY=i*TWO_PI/10;
    for (var j = 0; j < months-1; j++) {
      radM=(j+1)*PI/13;
      // noStroke();
      stroke(c);
      var r = dataMatrix[i][j];
      if (i<9) {
        beginShape();
        fill(c);
        vertex(r*sin(radY)*sin(radM), r*cos(radM), r*cos(radY)*sin(radM));
        vertex(dataMatrix[i][j+1]*sin(radY)*sin(radM+PI/13), dataMatrix[i][j+1]*cos(radM+PI/13), dataMatrix[i][j+1]*cos(radY)*sin(radM+PI/13));
        vertex(dataMatrix[i+1][j+1]*sin(radY+TWO_PI/10)*sin(radM+PI/13), dataMatrix[i+1][j+1]*cos(radM+PI/13), dataMatrix[i+1][j+1]*cos(radY+TWO_PI/10)*sin(radM+PI/13));
        endShape();
        beginShape();
        fill(c);
        vertex(r*sin(radY)*sin(radM), r*cos(radM), r*cos(radY)*sin(radM));
        vertex(dataMatrix[i+1][j]*sin(radY+TWO_PI/10)*sin(radM), dataMatrix[i+1][j]*cos(radM), dataMatrix[i+1][j]*cos(radY+TWO_PI/10)*sin(radM));
        vertex(dataMatrix[i+1][j+1]*sin(radY+TWO_PI/10)*sin(radM+PI/13), dataMatrix[i+1][j+1]*cos(radM+PI/13), dataMatrix[i+1][j+1]*cos(radY+TWO_PI/10)*sin(radM+PI/13));
        endShape();
      }
      if (i == 9) {
        beginShape();
        fill(c);
        vertex(r*sin(radY)*sin(radM), r*cos(radM), r*cos(radY)*sin(radM));
        vertex(dataMatrix[i][j+1]*sin(radY)*sin(radM+PI/13), dataMatrix[i][j+1]*cos(radM+PI/13), dataMatrix[i][j+1]*cos(radY)*sin(radM+PI/13));
        vertex(dataMatrix[0][j+1]*sin(radY+TWO_PI/10)*sin(radM+PI/13), dataMatrix[0][j+1]*cos(radM+PI/13), dataMatrix[0][j+1]*cos(radY+TWO_PI/10)*sin(radM+PI/13));
        endShape();

        beginShape();
        fill(c);
        vertex(r*sin(radY)*sin(radM), r*cos(radM), r*cos(radY)*sin(radM));
        vertex(dataMatrix[0][j]*sin(radY+TWO_PI/10)*sin(radM), dataMatrix[0][j]*cos(radM), dataMatrix[0][j]*cos(radY+TWO_PI/10)*sin(radM));
        vertex(dataMatrix[0][j+1]*sin(radY+TWO_PI/10)*sin(radM+PI/13), dataMatrix[0][j+1]*cos(radM+PI/13), dataMatrix[0][j+1]*cos(radY+TWO_PI/10)*sin(radM+PI/13));
        endShape();
      }
    }
  }

  //-----------------------------
  //surfaces on the top & bottom
  //-----------------------------

  //top--------------------------
  beginShape();
  fill(c);
  let k = 1;
  vertex(dataMatrix[k][0]*sin(TWO_PI/10*k)*sin(PI/13), dataMatrix[k][0]*cos(PI/13), dataMatrix[k][0]*cos(TWO_PI/10*k)*sin(PI/13));
  k = 2;
  vertex(dataMatrix[k][0]*sin(TWO_PI/10*k)*sin(PI/13), dataMatrix[k][0]*cos(PI/13), dataMatrix[k][0]*cos(TWO_PI/10*k)*sin(PI/13));
  k = 3;
  vertex(dataMatrix[k][0]*sin(TWO_PI/10*k)*sin(PI/13), dataMatrix[k][0]*cos(PI/13), dataMatrix[k][0]*cos(TWO_PI/10*k)*sin(PI/13));
  endShape();

  beginShape();
  fill(c);
  k = 3;
  vertex(dataMatrix[k][0]*sin(TWO_PI/10*k)*sin(PI/13), dataMatrix[k][0]*cos(PI/13), dataMatrix[k][0]*cos(TWO_PI/10*k)*sin(PI/13));
  k = 4;
  vertex(dataMatrix[k][0]*sin(TWO_PI/10*k)*sin(PI/13), dataMatrix[k][0]*cos(PI/13), dataMatrix[k][0]*cos(TWO_PI/10*k)*sin(PI/13));
  k = 1;
  vertex(dataMatrix[k][0]*sin(TWO_PI/10*k)*sin(PI/13), dataMatrix[k][0]*cos(PI/13), dataMatrix[k][0]*cos(TWO_PI/10*k)*sin(PI/13));
  endShape();

  beginShape();
  fill(c);
  k = 0;
  vertex(dataMatrix[k][0]*sin(TWO_PI/10*k)*sin(PI/13), dataMatrix[k][0]*cos(PI/13), dataMatrix[k][0]*cos(TWO_PI/10*k)*sin(PI/13));
  k = 1;
  vertex(dataMatrix[k][0]*sin(TWO_PI/10*k)*sin(PI/13), dataMatrix[k][0]*cos(PI/13), dataMatrix[k][0]*cos(TWO_PI/10*k)*sin(PI/13));
  k = 4;
  vertex(dataMatrix[k][0]*sin(TWO_PI/10*k)*sin(PI/13), dataMatrix[k][0]*cos(PI/13), dataMatrix[k][0]*cos(TWO_PI/10*k)*sin(PI/13));
  endShape();

  beginShape();
  fill(c);
  k = 0;
  vertex(dataMatrix[k][0]*sin(TWO_PI/10*k)*sin(PI/13), dataMatrix[k][0]*cos(PI/13), dataMatrix[k][0]*cos(TWO_PI/10*k)*sin(PI/13));
  k = 4;
  vertex(dataMatrix[k][0]*sin(TWO_PI/10*k)*sin(PI/13), dataMatrix[k][0]*cos(PI/13), dataMatrix[k][0]*cos(TWO_PI/10*k)*sin(PI/13));
  k = 5;
  vertex(dataMatrix[k][0]*sin(TWO_PI/10*k)*sin(PI/13), dataMatrix[k][0]*cos(PI/13), dataMatrix[k][0]*cos(TWO_PI/10*k)*sin(PI/13));
  endShape();

  beginShape();
  fill(c);
  k = 9;
  vertex(dataMatrix[k][0]*sin(TWO_PI/10*k)*sin(PI/13), dataMatrix[k][0]*cos(PI/13), dataMatrix[k][0]*cos(TWO_PI/10*k)*sin(PI/13));
  k = 0;
  vertex(dataMatrix[k][0]*sin(TWO_PI/10*k)*sin(PI/13), dataMatrix[k][0]*cos(PI/13), dataMatrix[k][0]*cos(TWO_PI/10*k)*sin(PI/13));
  k = 5;
  vertex(dataMatrix[k][0]*sin(TWO_PI/10*k)*sin(PI/13), dataMatrix[k][0]*cos(PI/13), dataMatrix[k][0]*cos(TWO_PI/10*k)*sin(PI/13));
  endShape();

  beginShape();
  fill(c);
  k = 9;
  vertex(dataMatrix[k][0]*sin(TWO_PI/10*k)*sin(PI/13), dataMatrix[k][0]*cos(PI/13), dataMatrix[k][0]*cos(TWO_PI/10*k)*sin(PI/13));
  k = 5;
  vertex(dataMatrix[k][0]*sin(TWO_PI/10*k)*sin(PI/13), dataMatrix[k][0]*cos(PI/13), dataMatrix[k][0]*cos(TWO_PI/10*k)*sin(PI/13));
  k = 6;
  vertex(dataMatrix[k][0]*sin(TWO_PI/10*k)*sin(PI/13), dataMatrix[k][0]*cos(PI/13), dataMatrix[k][0]*cos(TWO_PI/10*k)*sin(PI/13));
  endShape();

  beginShape();
  fill(c);
  k = 9;
  vertex(dataMatrix[k][0]*sin(TWO_PI/10*k)*sin(PI/13), dataMatrix[k][0]*cos(PI/13), dataMatrix[k][0]*cos(TWO_PI/10*k)*sin(PI/13));
  k = 8;
  vertex(dataMatrix[k][0]*sin(TWO_PI/10*k)*sin(PI/13), dataMatrix[k][0]*cos(PI/13), dataMatrix[k][0]*cos(TWO_PI/10*k)*sin(PI/13));
  k = 6;
  vertex(dataMatrix[k][0]*sin(TWO_PI/10*k)*sin(PI/13), dataMatrix[k][0]*cos(PI/13), dataMatrix[k][0]*cos(TWO_PI/10*k)*sin(PI/13));
  endShape();

  beginShape();
  fill(c);
  k = 6;
  vertex(dataMatrix[k][0]*sin(TWO_PI/10*k)*sin(PI/13), dataMatrix[k][0]*cos(PI/13), dataMatrix[k][0]*cos(TWO_PI/10*k)*sin(PI/13));
  k = 7;
  vertex(dataMatrix[k][0]*sin(TWO_PI/10*k)*sin(PI/13), dataMatrix[k][0]*cos(PI/13), dataMatrix[k][0]*cos(TWO_PI/10*k)*sin(PI/13));
  k = 8;
  vertex(dataMatrix[k][0]*sin(TWO_PI/10*k)*sin(PI/13), dataMatrix[k][0]*cos(PI/13), dataMatrix[k][0]*cos(TWO_PI/10*k)*sin(PI/13));
  endShape();







  //bottom---------------------------------------
  beginShape();
  fill(c);
  k = 1;
  vertex(dataMatrix[k][11]*sin(TWO_PI/10*k)*sin(12*PI/13), dataMatrix[k][11]*cos(12*PI/13), dataMatrix[k][11]*cos(TWO_PI/10*k)*sin(12*PI/13));
  k = 2;
  vertex(dataMatrix[k][11]*sin(TWO_PI/10*k)*sin(12*PI/13), dataMatrix[k][11]*cos(12*PI/13), dataMatrix[k][11]*cos(TWO_PI/10*k)*sin(12*PI/13));
  k = 3;
  vertex(dataMatrix[k][11]*sin(TWO_PI/10*k)*sin(12*PI/13), dataMatrix[k][11]*cos(12*PI/13), dataMatrix[k][11]*cos(TWO_PI/10*k)*sin(12*PI/13));
  endShape();

  beginShape();
  fill(c);
  k = 3;
  vertex(dataMatrix[k][11]*sin(TWO_PI/10*k)*sin(12*PI/13), dataMatrix[k][11]*cos(12*PI/13), dataMatrix[k][11]*cos(TWO_PI/10*k)*sin(12*PI/13));
  k = 4;
  vertex(dataMatrix[k][11]*sin(TWO_PI/10*k)*sin(12*PI/13), dataMatrix[k][11]*cos(12*PI/13), dataMatrix[k][11]*cos(TWO_PI/10*k)*sin(12*PI/13));
  k = 1;
  vertex(dataMatrix[k][11]*sin(TWO_PI/10*k)*sin(12*PI/13), dataMatrix[k][11]*cos(12*PI/13), dataMatrix[k][11]*cos(TWO_PI/10*k)*sin(12*PI/13));
  endShape();

  beginShape();
  fill(c);
  k = 0;
  vertex(dataMatrix[k][11]*sin(TWO_PI/10*k)*sin(12*PI/13), dataMatrix[k][11]*cos(12*PI/13), dataMatrix[k][11]*cos(TWO_PI/10*k)*sin(12*PI/13));
  k = 1;
  vertex(dataMatrix[k][11]*sin(TWO_PI/10*k)*sin(12*PI/13), dataMatrix[k][11]*cos(12*PI/13), dataMatrix[k][11]*cos(TWO_PI/10*k)*sin(12*PI/13));
  k = 4;
  vertex(dataMatrix[k][11]*sin(TWO_PI/10*k)*sin(12*PI/13), dataMatrix[k][11]*cos(12*PI/13), dataMatrix[k][11]*cos(TWO_PI/10*k)*sin(12*PI/13));
  endShape();

  beginShape();
  fill(c);
  k = 0;
  vertex(dataMatrix[k][11]*sin(TWO_PI/10*k)*sin(12*PI/13), dataMatrix[k][11]*cos(12*PI/13), dataMatrix[k][11]*cos(TWO_PI/10*k)*sin(12*PI/13));
  k = 4;
  vertex(dataMatrix[k][11]*sin(TWO_PI/10*k)*sin(12*PI/13), dataMatrix[k][11]*cos(12*PI/13), dataMatrix[k][11]*cos(TWO_PI/10*k)*sin(12*PI/13));
  k = 5;
  vertex(dataMatrix[k][11]*sin(TWO_PI/10*k)*sin(12*PI/13), dataMatrix[k][11]*cos(12*PI/13), dataMatrix[k][11]*cos(TWO_PI/10*k)*sin(12*PI/13));
  endShape();

  beginShape();
  fill(c);
  k = 9;
  vertex(dataMatrix[k][11]*sin(TWO_PI/10*k)*sin(12*PI/13), dataMatrix[k][11]*cos(12*PI/13), dataMatrix[k][11]*cos(TWO_PI/10*k)*sin(12*PI/13));
  k = 0;
  vertex(dataMatrix[k][11]*sin(TWO_PI/10*k)*sin(12*PI/13), dataMatrix[k][11]*cos(12*PI/13), dataMatrix[k][11]*cos(TWO_PI/10*k)*sin(12*PI/13));
  k = 5;
  vertex(dataMatrix[k][11]*sin(TWO_PI/10*k)*sin(12*PI/13), dataMatrix[k][11]*cos(12*PI/13), dataMatrix[k][11]*cos(TWO_PI/10*k)*sin(12*PI/13));
  endShape();

  beginShape();
  fill(c);
  k = 9;
  vertex(dataMatrix[k][11]*sin(TWO_PI/10*k)*sin(12*PI/13), dataMatrix[k][11]*cos(12*PI/13), dataMatrix[k][11]*cos(TWO_PI/10*k)*sin(12*PI/13));
  k = 5;
  vertex(dataMatrix[k][11]*sin(TWO_PI/10*k)*sin(12*PI/13), dataMatrix[k][11]*cos(12*PI/13), dataMatrix[k][11]*cos(TWO_PI/10*k)*sin(12*PI/13));
  k = 6;
  vertex(dataMatrix[k][11]*sin(TWO_PI/10*k)*sin(12*PI/13), dataMatrix[k][11]*cos(12*PI/13), dataMatrix[k][11]*cos(TWO_PI/10*k)*sin(12*PI/13));
  endShape();

  beginShape();
  fill(c);
  k = 9;
  vertex(dataMatrix[k][11]*sin(TWO_PI/10*k)*sin(12*PI/13), dataMatrix[k][11]*cos(12*PI/13), dataMatrix[k][11]*cos(TWO_PI/10*k)*sin(12*PI/13));
  k = 8;
  vertex(dataMatrix[k][11]*sin(TWO_PI/10*k)*sin(12*PI/13), dataMatrix[k][11]*cos(12*PI/13), dataMatrix[k][11]*cos(TWO_PI/10*k)*sin(12*PI/13));
  k = 6;
  vertex(dataMatrix[k][11]*sin(TWO_PI/10*k)*sin(12*PI/13), dataMatrix[k][11]*cos(12*PI/13), dataMatrix[k][11]*cos(TWO_PI/10*k)*sin(12*PI/13));
  endShape();

  beginShape();
  fill(c);
  k = 6;
  vertex(dataMatrix[k][11]*sin(TWO_PI/10*k)*sin(12*PI/13), dataMatrix[k][11]*cos(12*PI/13), dataMatrix[k][11]*cos(TWO_PI/10*k)*sin(12*PI/13));
  k = 7;
  vertex(dataMatrix[k][11]*sin(TWO_PI/10*k)*sin(12*PI/13), dataMatrix[k][11]*cos(12*PI/13), dataMatrix[k][11]*cos(TWO_PI/10*k)*sin(12*PI/13));
  k = 8;
  vertex(dataMatrix[k][11]*sin(TWO_PI/10*k)*sin(12*PI/13), dataMatrix[k][11]*cos(12*PI/13), dataMatrix[k][11]*cos(TWO_PI/10*k)*sin(12*PI/13));
  endShape();
}
class Label{
  constructor(){
    this.month_text = [];
    this.month_text_content = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.",
 "Sep.", "Oct.", "Nov.", "Dec."];
    for(var i = 0; i < months; ++i){
      this.month_text[i] = createGraphics(200,200);
      this.month_text[i].fill(255);
      this.month_text[i].textAlign(CENTER,LEFT);
      this.month_text[i].textSize(48);
      this.month_text[i].text(this.month_text_content[i],50,50);
    }
    this.year_text_content = [];
    this.year_text = [];
    for(var i = 0; i < years; ++i){
      // this.year_text_content[i] = 2006 + i;
      this.year_text[i] = createGraphics(200,200);
      this.year_text[i].fill(255);
      this.year_text[i].textAlign(CENTER,LEFT);
      this.year_text[i].textSize(48);
      this.year_text[i].text(2006 + i,50,50);
    }
    this.movie_title = [];
    this.movie_title_text = [
    "          Star Wars I : \nThe Phantom Menace     \n                      1999 ",
    "         Star Wars II : \nAttack of the Clones  \n                      2002 ",
    "       Star Wars III :\nRevenge of the Sith  \n                     2005",
    "         StarWars IV :  \n          A New Hope\n                      1977 ",
    "         Star Wars V :  \nThe Empire Strikes Back          \n                     1980",
    "      Star Wars VI :\n Return of the Jedi\n                      1983 "];
    for(var i = 0; i < 6; ++i){
      this.movie_title[i] = createGraphics(800,800);
      this.movie_title[i].fill(255);
      this.movie_title[i].textAlign(CENTER);
      this.movie_title[i].textSize(48);
      this.movie_title[i].text(this.movie_title_text[i],400,290);
    }
  }

  display(){
    // gl.disable(gl.DEPTH_TEST);

    push();
    rotateY(PI/2);
    stroke(200);
    drawCircle(200);
    // translate(200,200,0);
    pop();

    push();
    // translate(200,0,200);
    rotateX(PI/2);
    stroke(200);
    drawCircle(200);
    pop();


    push();
    rotateY(PI/2);
    for (var i = 0; i < months; i++) {
        push();
        var theta = (i+1)*PI/(months+1)- 0.025*PI;
        translate(172*cos(theta+PI/2), 172*sin(theta+PI/2),0);
        rotateZ(theta+PI/2+PI);
        // fill(180);
        texture(this.month_text[months - i - 1]);
        plane(50, 50);
        pop();
      }
    for (var i = 0; i < 6; i++) {
      if(showTitle[i]){
        push();
        translate(120,24,0);
        texture(this.movie_title[i]);
        plane(300, 300);
        pop();
      }
    }
    pop();

    push();
    rotateX(PI/2);
    for (var i = 0; i < years; i++) {
      push();
      var theta = (2006+years-i)*TWO_PI/10 + 4 * PI / 5 - 0.025*PI;
      translate(204*cos(theta+PI/2), 204*sin(theta+PI/2));
      rotateZ(theta+PI/2+PI);
      // fill(180);
      texture(this.year_text[i]);
      plane(50, 50);
      pop();
    }
    pop();
    // gl.enable(gl.DEPTH_TEST);
  }
}
function drawCircle(r){
  beginShape();
  for(var i = 0; i < 361; ++i){
    vertex(cos(i * PI / 180) * r,sin(i * PI / 180) * r,0);
  }
  endShape();
}
function drawGizmo(){
  // gizmo
  strokeWeight(1);
  // stroke(255, 32,  0); line(0,0,0,100,0,0);
  // stroke( 32,255, 32); line(0,0,0,0,-100,0);
  // stroke(  0, 32,255); line(0,0,0,0,0,100);
  stroke(200); line(0,0,0,200,0,0);
  stroke(200); line(0,0,0,0,-200,0);
  stroke(200); line(0,0,0,0,0,200);
}
