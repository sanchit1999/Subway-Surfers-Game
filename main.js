var cubeRotation = 0.0;

main();

//
// Start here
//

var follow_time = 0;
var c;
var c1;
var Rails1, Rails2, Rails3;
var Ground;
var obstacle11, obstacle12, obstacle13;
var obstacle21, obstacle22, obstacle23;
var sobs;
var Coins;
var FlyBonus;
var Wall1, Wall2;
var jump_bonus;
var jump_time = 200;
var dog;
var legs;
var f1 = 0;
var temp = 0.6;
var Rb;
var pleg1, pleg2, poleg1, poleg2;
var Tleg;
var scorebonus;
var programInfo, programInfo1, programInfo2;
var grayscale = 0;
var magnets;
var magnettime = 300;
var bonustime = 300;
var pspeed = 0.45;
var speedvar = 0;
var score = 0;

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

var right_key = false;
var left_key = false;
var up_key = false;
var down_key = false;
var pause_key = false;
var ff = 0, sf = 0, uf = 0;
var flytime = 0;
var flashc = 0;

function keyDownHandler(event) {
    if(event.keyCode == 39) {
        left_key = true;
    }
    else if(event.keyCode == 37) {
        right_key = true;
    }
    if(event.keyCode == 40) {
      down_key = true;
    }
    else if(event.keyCode == 38) {
      up_key = true;
    }
    else if(event.keyCode == 80){
      pause_key = true;
    }
    else if(event.keyCode == 84) {
      grayscale = 1;
    }
    else if(event.keyCode == 89) {
      grayscale = 0;
    }
}

function keyUpHandler(event) {
    if(event.keyCode == 40) {
      down_key = false;
    }
    if(event.keyCode == 80) {
      pause_key = false;
    }
}

function main() {


  const canvas = document.querySelector('#glcanvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

  c = new cube(gl, [0, 1, 0], 'Player.jpeg');
  c1 = new cube(gl, [0, 1, -5], 'Police.jpg');

  scorebonus = [];
  magnets = [];
  Tleg = [];
  Rb = [];
  jump_bonus = [];
  sobs = [];
  obstacle11 = [];
  obstacle12 = [];
  obstacle13 = [];
  obstacle21 = [];
  obstacle22 = [];
  obstacle23 = [];
  Rails1 = [];
  Rails2 = [];
  Rails3 = [];
  Coins = [];
  FlyBonus = [];
  Wall1 = [];
  Wall2 = [];
  Ground = [];
  tarr = [-4, 0, 4];

  for(var i = 1 ; i < 21 ; i++)
  {
    var t1 = new boots(gl, [tarr[(20 - i) % 3], 1.5, 71 * i], 'boots.png');
    jump_bonus.push(t1);
  }
  for(var i = 1 ; i < 11 ; i++)
  {
    var t1 = new speedobs(gl, [tarr[i % 3], 3.1, 55 * i], 'traffic.png');
    var t2 = new tlegs(gl, [tarr[i % 3], 1.2, 55 * i], 'legs.jpeg');
    sobs.push(t1);
    Tleg.push(t2);
  }
  for(var i=1;i<11;i++)
  {
    var t1 = new obs1(gl, [0, 2.1, 300 * i], 'Train.jpg');   
    obstacle11.push(t1);
  }
  for(var i=1;i<11;i++)
  {
    var t1 = new obs1(gl, [-4, 2.1, 240 * i], 'Train.jpg');   
    obstacle12.push(t1);
  }
  for(var i=1;i<11;i++)
  {
    var t1 = new obs1(gl, [4, 2.1, 180 * i], 'Train.jpg');   
    obstacle13.push(t1);
  }
  for(var i=1;i<11;i++)
  {
    var t1 = new obs2(gl, [4, 3.4, 66 * i], 'Obs2.jpg');   
    obstacle21.push(t1);
  }
  for(var i=1;i<11;i++)
  {
    var t1 = new obs2(gl, [0, 3.4, 89 * i], 'Obs2.jpg');   
    obstacle22.push(t1);
  }
  for(var i=1;i<11;i++)
  {
    var t1 = new obs2(gl, [-4, 3.4, 121 * i], 'Obs2.jpg');   
    obstacle23.push(t1);
  }
  a = [-4, 0, 4];
  for(var i = 0 ; i < 200 ; i++)
  {
    var t1 = new coins(gl, [a[i % 3], 1, 34 * i], 'Coins.png');
    var t2 = new coins(gl, [a[i % 3], 9, 38 * i], 'Coins.png');
    var t3 = new coins(gl, [a[i % 3], 9, 44 * i], 'Coins.png');
    Coins.push(t1);
    Coins.push(t2);
    Coins.push(t3);
  }
  for(var i = 1 ; i < 21 ; i++)
  {
    var t1 = new Fly(gl, [a[i % 3], 1, 41 * i], 'jet.png');
    FlyBonus.push(t1);
  }
  for(var i = -100; i < 1900; i += 10)
  {  
    var t1 = new rail(gl, [0, 0, i], 'Track.jpg');
    Rails1.push(t1);
  }
  for(var i = -100; i < 1900; i += 10)
  {  
    var t1 = new rail(gl, [4, 0, i], 'Track.jpg');
    Rails2.push(t1);
  }
  for(var i = -100; i < 1900; i += 10)
  {  
    var t1 = new rail(gl, [-4, 0, i], 'Track.jpg');
    Rails3.push(t1);
  }
  for(var i = -100;i<1900; i += 10)
  {
    var t1 = new Wall(gl, [-6, 0, i], 'Wall.jpg');
    Wall1.push(t1); 
  }
  for(var i = -100;i<1900; i += 10)
  {
    var t1 = new Wall(gl, [6, 0, i], 'Wall.jpg');
    Wall2.push(t1); 
  }
  for(var i = 0 ; i < 2000 ; i += 20)
  {
    for(var j = -80 ; j < 80; j += 20)
    {
        var t1 = new ground(gl, [j, 0.1, i], 'Ground.jpeg')
        Ground.push(t1);
    }
  }
  for(var i = 1 ; i < 21 ; i++)
  {
    var t1 = new roadblock(gl, [a[(i + 1) % 3], 1, 62 * (i + 1)], 'roadblock.jpg');
    Rb.push(t1);
  }
  for(var i = 1 ; i < 21 ; i++)
  {
    var t1 = new magnet(gl, [a[(i + 2) % 3], 1.5, 81 * i], 'Magnet.png')
    magnets.push(t1);
  }
  for(var i = 1 ; i < 21 ; i++)
  {
    var t1 = new ScoreBonus(gl, [a[(i) % 3], 1.5, 77 * i], 'scorebonus.webp')
    scorebonus.push(t1);
  }
  dog = new Dog(gl, [-3, 0.70, -5], 'dog.jpg');
  legs = new Legs(gl, [-3, 0.70, -5], 'legs.jpeg');
  pleg1 = new plegs1(gl, [0, 1, 0], 'plegs.jpeg');
  pleg2 = new plegs2(gl, [0, 1, 0], 'plegs.jpeg');

  poleg1 = new plegs1(gl, [0, 1, -5], 'poleg.jpeg');
  poleg2 = new plegs2(gl, [0, 1, -5], 'poleg.jpeg');

  // If we don't have a GL context, give up now
  if (!gl) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.');
    return;
  }

  // Vertex shader program

  const vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec2 aTextureCoord;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    varying highp vec2 vTextureCoord;

    void main(void) {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vTextureCoord = aTextureCoord;
    }
  `;

  // For Flashing
   const vsSource2 = `
    attribute vec4 aVertexPosition;
    attribute vec3 aVertexNormal;
    attribute vec2 aTextureCoord;

    uniform mat4 uNormalMatrix;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    varying highp vec2 vTextureCoord;
    varying highp vec3 vLighting;

    void main(void) {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vTextureCoord = aTextureCoord;

      // Apply lighting effect

      highp vec3 ambientLight = vec3(0.3, 0.3, 0.3);
      highp vec3 directionalLightColor = vec3(1, 1, 1);
      highp vec3 directionalVector = normalize(vec3(0.85, 0.8, 0.75));

      highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);

      highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
      vLighting = ambientLight + (directionalLightColor * directional);
    }
  `;

  // Fragment shader program
   const fsSource = `
    varying highp vec2 vTextureCoord;

    uniform sampler2D uSampler;

    void main(void) {
      gl_FragColor = texture2D(uSampler, vTextureCoord);
    }
  `;

  // For grayscale
  const fsSource1 = `
    varying highp vec2 vTextureCoord;
    uniform sampler2D uSampler;
    precision mediump float;

    void main(void) {
      vec4 tex = texture2D(uSampler, vTextureCoord);
      float sum = (tex.x+tex.y+tex.z)/3.0;

      gl_FragColor = vec4(sum,sum,sum,1);
    }
  `;

  // For Flashing
  const fsSource2 = `
    varying highp vec2 vTextureCoord;
    varying highp vec3 vLighting;

    uniform sampler2D uSampler;

    void main(void) {
      highp vec4 texelColor = texture2D(uSampler, vTextureCoord);

      gl_FragColor = vec4(texelColor.rgb * vLighting, texelColor.a);
    }
  `;

  // Initialize a shader program; this is where all the lighting
  // for the vertices and so forth is established.
  const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
  const shaderProgram1 = initShaderProgram(gl, vsSource, fsSource1);
  const shaderProgram2 = initShaderProgram(gl, vsSource2, fsSource2);

  // Collect all the info needed to use the shader program.
  // Look up which attributes our shader program is using
  // for aVertexPosition, aVevrtexColor and also
  // look up uniform locations.
  programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      textureCoord: gl.getAttribLocation(shaderProgram, 'aTextureCoord'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
      uSampler: gl.getUniformLocation(shaderProgram, 'uSampler'),
    },
  };

  programInfo1 = {
    program: shaderProgram1,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram1, 'aVertexPosition'),
      textureCoord: gl.getAttribLocation(shaderProgram1, 'aTextureCoord'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram1, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram1, 'uModelViewMatrix'),
      uSampler: gl.getUniformLocation(shaderProgram1, 'uSampler'),
    },
  };

  programInfo2 = {
    program: shaderProgram2,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram2, 'aVertexPosition'),
      textureCoord: gl.getAttribLocation(shaderProgram2, 'aTextureCoord'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram2, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram2, 'uModelViewMatrix'),
      uSampler: gl.getUniformLocation(shaderProgram2, 'uSampler'),
    },
  };

  // Here's where we call the routine that builds all the
  // objects we'll be drawing.
  //const buffers
  var then = 0;

  function tick_elements()
  {
    document.getElementById("Score").innerHTML = "Score = " + score;
    speedvar++;
    if(speedvar % 300 == 0) pspeed += 0.03;
    if(magnettime < 200)
    {  
      for(var i = 0 ; i < 600 ; i++)
      {
        if(Coins[i].captureflag == 0  && Coins[i].pos[2] > c.pos[2] - 2 && Coins[i].pos[2] < c.pos[2] + 15 && Math.abs(c.pos[1] - Coins[i].pos[1]) < 5)
        {
          Coins[i].captureflag = 1;
        }
      }
    }
    for(var i = 0 ; i < 600 ; i++)
    {
      if(Coins[i].flag == 1 && Coins[i].captureflag)
      {
          Coins[i].dirx = -Coins[i].pos[0] + c.pos[0];
          Coins[i].diry = -Coins[i].pos[1] + c.pos[1];
          if(ff)
            Coins[i].dirz = -Coins[i].pos[2] + c.pos[2] + 8;
          else
            Coins[i].dirz = -Coins[i].pos[2] + c.pos[2] + 1.3;
          Coins[i].pos[0] += 0.2 * Coins[i].dirx;
          Coins[i].pos[1] += 0.2 * Coins[i].diry;
          Coins[i].pos[2] += 0.2 * Coins[i].dirz;

          if(Coins[i].flag == 1 && Math.abs(c.pos[2] - Coins[i].pos[2]) < 0.2)
          {  
              Coins[i].flag = 0;
              if(bonustime < 150)
                score += 10;
              else score += 2;
          }    
      }
    }
    bonustime++;
    magnettime++;
    flashc++;

    // Position of dog wrt player
    if(!sf)
    {
      if(follow_time < 150)
      {  
        dog.pos[0] = legs.pos[0] = -2;
        if(c.pos[0] > 0)
          dog.pos[0] = legs.pos[0] = c.pos[0] - 2;
      }
      else
      {  
        dog.pos[0] = legs.pos[0] = c.pos[0] - 1;
        if(c.pos[0] < 0)
          dog.pos[0] = legs.pos[0] =  c.pos[0] + 1;
      }
      dog.pos[1] = legs.pos[1] = 1;
      dog.pos[2] = legs.pos[2] = c.pos[2] - 4;
    }
    f1++;
    if(f1 == 11)
      f1 = 0;  
    legs.tick(f1);

    if(!ff)
    {
      pleg1.tick(f1);
      pleg2.tick(f1);
      poleg1.tick(f1);
      poleg2.tick(f1);
    }
    if(pause_key)
      sleep(1);
    jump_time += 1;
    follow_time += 1;
    var check_flag = 0;
    
    // For collision of train with player sidewards
    if(!sf)
    {  
      if(right_key && c.pos[0] < 4)
        c.speedx = 0.5;
      if(left_key && c.pos[0] > -4)
        c.speedx = -0.5;
      if(c.speedx == 0.5)
      {
        var cflag1 = 0, cflag2 = 0;
        if(c.pos[0] >= -4 && c.pos[0] <= 0)
        {
          c.pos[0] += 0.5;
          for(var i = 0; i < 10 ; i++)
          {
            if(c.pos[1] < 4.4 && c.pos[0] > -1.5 && Math.abs(obstacle11[i].pos[2] - c.pos[2]) < 7)
            {
              cflag1 = 1;
              check_flag = 1;
              if(follow_time < 150)
                sf = 1;
              else
                follow_time = 0, pspeed -= 0.1;
              break;
            }
          }
          if(cflag1 == 1)
          {
            c.pos[0] = -4;
            c.speedx = 0;
          }
          else
          {
            c.pos[0] -= 0.5;
          }
        }
        else if(c.pos[0] >= 0 && c.pos[0] <= 4)
        {
          c.pos[0] += 0.5;
          for(var i = 0; i < 10 ; i++)
          {
            if(c.pos[1] < 4.4 && c.pos[0] > 2.5 && Math.abs(obstacle13[i].pos[2] - c.pos[2]) < 7)
            {
              cflag2 = 1;
              check_flag = 1;
               if(follow_time < 150)
                sf = 1;
              else
                follow_time = 0, pspeed -= 0.1;
              break;
            }
          }
          if(cflag2 == 1)
          {
            c.pos[0] = 0;
            c.speedx = 0;
          } 
          else
          {
            c.pos[0] -= 0.5;
          }
        } 
      }    
      if(c.speedx == -0.5)
      {
        var cflag1 = 0, cflag2 = 0;
        if(c.pos[0] >= -4 && c.pos[0] <= 0)
        {
          c.pos[0] -= 0.5;
          for(var i = 0; i < 10 ; i++)
          {
            if(c.pos[1] < 4.4 && c.pos[0] < -2.5 && Math.abs(obstacle12[i].pos[2] - c.pos[2]) < 7)
            {
              cflag1 = 1;
              check_flag = 1;
               if(follow_time < 150)
                sf = 1;
              else
                follow_time = 0, pspeed -= 0.1;
              break;
            }
          }
          if(cflag1 == 1)
          {
            c.pos[0] = 0;
            c.speedx = 0;
          }
          else
          {
            c.pos[0] += 0.5;
          }
        }
        else if(c.pos[0] >= 0 && c.pos[0] <= 4)
        {
          c.pos[0] -= 0.5;
          for(var i = 0; i < 10 ; i++)
          {
            if(c.pos[1] < 4.4 && c.pos[0] < 1.5 && Math.abs(obstacle11[i].pos[2] - c.pos[2]) < 7)
            {
              cflag2 = 1;
              check_flag = 1;
               if(follow_time < 150)
                sf = 1;
              else
                follow_time = 0, pspeed -= 0.1;
              break;
            }
          }
          if(cflag2 == 1)
          {
            c.pos[0] = 4;
            c.speedx = 0;
          } 
          else
          {
            c.pos[0] += 0.5;
          }
        } 
      }    
    }

    //For collision of Player with magnet
    for(var i = 0 ; i < 20 ; i++)
    {
      if(Math.abs(c.pos[2] - magnets[i].pos[2]) < 0.3 && c.pos[0] == magnets[i].pos[0] && (magnets[i].pos[1] == c.pos[1] + 0.5 || magnets[i].pos[1] - c.pos[1] == 1.2))
      {
        magnettime = 0;
        magnets[i].flag = 0;
      }
    }

    //For collision of Player with scorebonus
    for(var i = 0 ; i < 20 ; i++)
    {
      if(Math.abs(c.pos[2] - scorebonus[i].pos[2]) < 0.3 && c.pos[0] == scorebonus[i].pos[0] && (scorebonus[i].pos[1] == c.pos[1] + 0.5 || scorebonus[i].pos[1] - c.pos[1] == 1.2))
      {
        bonustime = 0;
        scorebonus[i].flag = 0;
      }
    }

    if(flytime > 0)
      flytime -= 1;
    if(flytime == 0)
      ff = 0;

    // Collision of Player with RoadBlock
    for(var i = 0 ; i < 20 ; i++)
    {
        if(Rb[i].flag == 1 && Math.abs(c.pos[2] - Rb[i].pos[2]) < 0.75 && c.pos[0] == Rb[i].pos[0] && c.pos[1] < 2)
        {
          Rb[i].flag = 0;
           if(follow_time < 150)
                sf = 1;
              else
                follow_time = 0, pspeed -= 0.1;
        }
    }

    // Collision of Player with 2nd Obstacle
    for(var i = 0; i < 10; i++)
    {
      if(obstacle21[i].pos[0] == c.pos[0] && Math.abs(obstacle21[i].pos[2] - c.pos[2]) < 0.37 && c.pos[1] > 0.6 && c.pos[1] < 5.8)
      {
        sf = 1;
        c.pos[1] = 1;
      }  
    }
    for(var i = 0; i < 10; i++)
    {
      if(obstacle22[i].pos[0] == c.pos[0] && Math.abs(obstacle22[i].pos[2] - c.pos[2]) < 0.37 && c.pos[1] > 0.6 && c.pos[1] < 5.8)
      {
        sf = 1;
        c.pos[1] = 1;
      }  
    }
    for(var i = 0; i < 10; i++)
    {
      if(obstacle23[i].pos[0] == c.pos[0] && Math.abs(obstacle23[i].pos[2] - c.pos[2]) < 0.37 && c.pos[1] > 0.6 && c.pos[1] < 5.8)
      {
        sf = 1;
        c.pos[1] = 1;
      }  
    }

    //Collision of Player with Jump Bonus
    for(var i = 0 ; i < 20 ; i++)
    {
      if(Math.abs(c.pos[2] - jump_bonus[i].pos[2]) < 0.37 && c.pos[0] == jump_bonus[i].pos[0] && c.pos[1] < 3)
      {
        jump_time = 0;
        jump_bonus[i].flag = 0;
      }
    }

    // Collision of Player with Speed Obstacle
    for(var i = 0 ; i < 10 ; i++)
    {
      if(sobs[i].flag2 == 1 && Math.abs(c.pos[2] - sobs[i].pos[2]) < 0.37 && c.pos[0] == sobs[i].pos[0] && c.pos[1] < 5)
      {
        sobs[i].flag2 = 0;
         if(follow_time < 150)
          sf = 1;
         else
           follow_time = 0, pspeed -= 0.1;
      }
    }

    // Collision of Player with Fly Bonus
    for(var i = 0 ; i < 20 ; i++)
    {
      if(Math.abs(c.pos[2] - FlyBonus[i].pos[2]) < 0.2 && c.pos[0] == FlyBonus[i].pos[0] && (FlyBonus[i].pos[1] == c.pos[1] || FlyBonus[i].pos[1] - c.pos[1] == 0.7))
      {
        ff = 1;
        flytime = 120;
        FlyBonus[i].flag = 0;
      }
    }

    // Collision of Player with Coins
    for(var i = 0 ; i < 600 ; i++)
    {
      if(Math.abs(c.pos[2] - Coins[i].pos[2]) < 0.3 && Math.abs(c.pos[0] - Coins[i].pos[0]) < 0.5 && Math.abs(Coins[i].pos[1] - c.pos[1]) < 2)
      {
        Coins[i].flag = 0;
        if(bonustime < 150)
          score += 10;
        else
          score += 2;
      }
    }

    // Collision of Player with train forward
    for(var i  = 0; i < 10 ; i++)
    {
        if( Math.abs((obstacle11[i].pos[2] - 7) - c.pos[2]) < 0.2  && c.pos[0] == obstacle11[i].pos[0] && c.pos[1] < 4.8)
        {
          c.pos[1] = 1;
          sf = 1;
        }
    }
    for(var i  = 0; i < 10 ; i++)
    {
        if( Math.abs((obstacle12[i].pos[2] - 7) - c.pos[2]) < 0.2  && c.pos[0] == obstacle12[i].pos[0] && c.pos[1] < 4.8)
        {
          c.pos[1] = 1;
          sf = 1;
        }
    }
    for(var i  = 0; i < 10 ; i++)
    {
        if( Math.abs((obstacle13[i].pos[2] - 7) - c.pos[2]) < 0.2  && c.pos[0] == obstacle13[i].pos[0] && c.pos[1] < 4.8)
        {
          c.pos[1] = 1;
          sf = 1;
        }
    }

    // For Standing on the train
    if(!check_flag)
    {  
      uf = 0;
      for(var i  = 0 ; i < 10 ; i++)
      {
          if( Math.abs(c.pos[2] - obstacle11[i].pos[2]) < 7 && Math.abs(c.pos[0] - obstacle11[i].pos[0]) < 1.3 )
          {
            uf = 1;
          }
      }
      for(var i  = 0 ; i < 10 ; i++)
      {
          if( Math.abs(c.pos[2] - obstacle12[i].pos[2]) < 7 && Math.abs(c.pos[0] - obstacle12[i].pos[0]) < 1.3)
          {
            uf = 1;
          }
      }
      for(var i  = 0 ; i < 10 ; i++)
      {
          if( Math.abs(c.pos[2] - obstacle13[i].pos[2]) < 7 && Math.abs(c.pos[0] - obstacle13[i].pos[0]) < 1.3)
          {
            uf = 1;
          }
      }
    }  

    for(var i = 0 ; i<600;i++)
      Coins[i].tick();
    
    for(var i = 0;i<20;i++)
      FlyBonus[i].tick();
    
    if(sf) follow_time = 0, c1.pos[1] = 1;
    if(!sf)
    { 
      if(ff)
        c.tick2();
      else if(uf)
        c.tick3(pspeed);
      else
        c.tick(down_key, pspeed);
      if(ff) follow_time = 300;
      if(follow_time < 150)
      {
        c1.pos[0] = c.pos[0];
        c1.pos[1] = c.pos[1];
        c1.pos[2] = c.pos[2] - 4;
      }
      else
      {
        c1.pos[2] += pspeed - 0.1;
      }  
    }
    
    if(up_key && c.pos[1] <= 1)
    { 
      if(jump_time < 200)
        c.speed = 0.65;
      else
        c.speed = 0.52;
    }  
    
    pleg1.pos[0] = pleg2.pos[0] = c.pos[0];
    pleg1.pos[1] = pleg2.pos[1] = c.pos[1];
    pleg1.pos[2] = pleg2.pos[2] = c.pos[2];

    poleg1.pos[0] = poleg2.pos[0] = c1.pos[0];
    poleg1.pos[1] = poleg2.pos[1] = c1.pos[1];
    poleg1.pos[2] = poleg2.pos[2] = c1.pos[2];
    if(ff)
      pleg1.rotation = pleg2.rotation = Math.PI / 2;
    if(!ff && c.pos[1] != 1 && c.pos[1] != 0.3 && c.pos[1] != 4.8) 
      pleg1.rotation = pleg2.rotation = 0;
    if(!ff && c.pos[1] != 1 && c.pos[1] != 0.3 && c.pos[1] != 4.8) 
      poleg1.rotation = poleg2.rotation = 0;
    right_key = false;
    left_key = false;
    up_key = false;
  }
  // Draw the scene repeatedly
  function render(now) {
    // console.log(c.pos[1]);
    now *= 0.001;  // convert to seconds
    const deltaTime = now - then;
    then = now;

    tick_elements();
    if(grayscale)
      drawScene(gl, programInfo1, deltaTime);
    else
      drawScene(gl, programInfo, deltaTime);
    requestAnimationFrame(render);
    if(sf || c.pos[2] > 1800) 
    {
      window.alert("Game Over, Your Score is " + score);   
      window.location.reload();
    } 
  }
  requestAnimationFrame(render);
}

//
// Draw the scene.
//
function drawScene(gl, programInfo, deltaTime) {
  gl.clearColor(0.0, 191 / 255, 1.0, 1.0);  // Clear to black, fully opaque
  gl.clearDepth(1.0);                 // Clear everything
  gl.enable(gl.DEPTH_TEST);           // Enable depth testing
  gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

  // Clear the canvas before we start drawing on it.

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Create a perspective matrix, a special matrix that is
  // used to simulate the distortion of perspective in a camera.
  // Our field of view is 45 degrees, with a width/height
  // ratio that matches the display size of the canvas
  // and we only want to see objects between 0.1 units
  // and 100 units away from the camera.

  const fieldOfView = 45 * Math.PI / 180;   // in radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = mat4.create();

  // note: glmatrix.js always has the first argument
  // as the destination to receive the result.
  mat4.perspective(projectionMatrix,
                   fieldOfView,
                   aspect,
                   zNear,
                   zFar);

  // Set the drawing position to the "identity" point, which is
  // the center of the scene.
    var cameraMatrix = mat4.create();
    var temp = c.pos[2] - 12;
    var temp1 = 6
    if(jump_time < 200)
    {
      temp1 = c.pos[1] + 5; 
      if(c.pos[1] > 5)
        temp -= 6;
    }
    if(ff)
    {
      temp1 = 14;
      temp -= 10;
    }
    mat4.translate(cameraMatrix, cameraMatrix, [c.pos[0], temp1, temp]);
    var cameraPosition = [
      cameraMatrix[12],
      cameraMatrix[13],
      cameraMatrix[14],
    ];

    var up = [0, 1, 0];

    mat4.lookAt(cameraMatrix, cameraPosition, [0, 0, 4 + c.pos[2]], up);

    var viewMatrix = cameraMatrix;//mat4.create();

    //mat4.invert(viewMatrix, cameraMatrix);

    var viewProjectionMatrix = mat4.create();

    mat4.multiply(viewProjectionMatrix, projectionMatrix, viewMatrix);

  // Drawing Various Objects

  c.drawCube(gl, viewProjectionMatrix, programInfo, deltaTime);
  c1.drawCube(gl, viewProjectionMatrix, programInfo, deltaTime);
  for(var i = 0 ; i < 800 ; i++)
    Ground[i].drawCube(gl, viewProjectionMatrix, programInfo, deltaTime);
  for(var i=0;i<200;i++)
    Rails1[i].drawRails(gl, viewProjectionMatrix, programInfo, deltaTime);
  for(var i =0;i<200;i++)
    Rails2[i].drawRails(gl, viewProjectionMatrix, programInfo, deltaTime);
  for(var i =0;i<200;i++)
    Rails3[i].drawRails(gl, viewProjectionMatrix, programInfo, deltaTime);
  for(var i=0;i<10;i++)
    obstacle11[i].drawObs(gl, viewProjectionMatrix, programInfo, deltaTime);
  for(var i=0;i<10;i++)
    obstacle12[i].drawObs(gl, viewProjectionMatrix, programInfo, deltaTime);
  for(var i=0;i<10;i++)
    obstacle13[i].drawObs(gl, viewProjectionMatrix, programInfo, deltaTime);
  for(var i=0;i<10;i++)
    obstacle21[i].drawObs(gl, viewProjectionMatrix, programInfo, deltaTime);
  for(var i=0;i<10;i++)
    obstacle22[i].drawObs(gl, viewProjectionMatrix, programInfo, deltaTime);
  for(var i=0;i<10;i++)
    obstacle23[i].drawObs(gl, viewProjectionMatrix, programInfo, deltaTime);
  for(var i = 0 ; i < 600 ; i++)
    if(Coins[i].flag)
      Coins[i].drawCoins(gl, viewProjectionMatrix, programInfo, deltaTime);
  for(var i = 0 ; i < 20 ; i++)
    if(FlyBonus[i].flag)
      FlyBonus[i].drawfly(gl, viewProjectionMatrix, programInfo, deltaTime);
  for(var i = 0 ; i < 20 ; i++)
    if(magnets[i].flag)
      magnets[i].drawMagnet(gl, viewProjectionMatrix, programInfo, deltaTime);  
  for(var i = 0 ; i < 20 ; i++)
    if(scorebonus[i].flag)
      scorebonus[i].drawBonus(gl, viewProjectionMatrix, programInfo, deltaTime);  
  
  for(var i = 0 ; i < 200 ; i++)
  { 
    if(flashc > 10 && grayscale == 0)
    {
      if(flashc > 20)
        flashc = 0;  
      Wall1[i].drawWall(gl, viewProjectionMatrix, programInfo2, deltaTime);
    }
    else
      Wall1[i].drawWall(gl, viewProjectionMatrix, programInfo, deltaTime);
  }
  for(var i = 0 ; i < 200 ; i++)
  {  
    if(flashc > 10 && grayscale == 0)
    {
      if(flashc > 20)
        flashc = 0;  
      Wall2[i].drawWall(gl, viewProjectionMatrix, programInfo2, deltaTime);
    }
    else
      Wall2[i].drawWall(gl, viewProjectionMatrix, programInfo, deltaTime);
  }
  for(var i = 0 ; i < 10 ;i++)
  {  
    if(sobs[i].flag)
    {  
      sobs[i].drawObs(gl, viewProjectionMatrix, programInfo, deltaTime);
      Tleg[i].drawLegs(gl, viewProjectionMatrix, programInfo, deltaTime);
    }  
  }  
  for(var i = 0 ;i < 20 ;i++)
    if(jump_bonus[i].flag)
      jump_bonus[i].drawBoots(gl, viewProjectionMatrix, programInfo, deltaTime);   
  for(var i = 0 ; i < 20 ; i++)
    if(Rb[i].flag)
      Rb[i].drawBlock(gl, viewProjectionMatrix, programInfo, deltaTime);  
  dog.drawDog(gl, viewProjectionMatrix, programInfo, deltaTime);          
  legs.drawLegs(gl, viewProjectionMatrix, programInfo, deltaTime);
  pleg1.drawLegs(gl, viewProjectionMatrix, programInfo, deltaTime);
  pleg2.drawLegs(gl, viewProjectionMatrix, programInfo, deltaTime);
  poleg1.drawLegs(gl, viewProjectionMatrix, programInfo, deltaTime);
  poleg2.drawLegs(gl, viewProjectionMatrix, programInfo, deltaTime);
}

//
// Initialize a shader program, so WebGL knows how to draw our data
//
function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  // Create the shader program

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // If creating the shader program failed, alert

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    return null;
  }

  return shaderProgram;
}

//
// creates a shader of the given type, uploads the source and
// compiles it.
//
function loadShader(gl, type, source) {
  const shader = gl.createShader(type);

  // Send the source to the shader object

  gl.shaderSource(shader, source);

  // Compile the shader program

  gl.compileShader(shader);

  // See if it compiled successfully

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function loadTexture(gl, url) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Because images have to be download over the internet
  // they might take a moment until they are ready.
  // Until then put a single pixel in the texture so we can
  // use it immediately. When the image has finished downloading
  // we'll update the texture with the contents of the image.
  const level = 0;
  const internalFormat = gl.RGBA;
  const width = 1;
  const height = 1;
  const border = 0;
  const srcFormat = gl.RGBA;
  const srcType = gl.UNSIGNED_BYTE;
  const pixel = new Uint8Array([0, 0, 255, 255]);  // opaque blue
  gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                width, height, border, srcFormat, srcType,
                pixel);

  const image = new Image();
  image.onload = function() {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                  srcFormat, srcType, image);

    // WebGL1 has different requirements for power of 2 images
    // vs non power of 2 images so check if the image is a
    // power of 2 in both dimensions.
    if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
       // Yes, it's a power of 2. Generate mips.
       gl.generateMipmap(gl.TEXTURE_2D);
    } else {
       // No, it's not a power of 2. Turn off mips and set
       // wrapping to clamp to edge
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    }
  };
  image.src = url;

  return texture;
}

function isPowerOf2(value) {
  return (value & (value - 1)) == 0;
}