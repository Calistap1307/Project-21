var river, oarsman;
var riverImg, oarsmanImg;

var obstacle;
var obstacle1Img;
var obstacle2Img;
var obstacle3Img;

var obstaclesG;

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver, restart;

function preload(){
 riverImg = loadImage("river.jpg");
 oarsmanImg = loadImage("boy.png");

 obstacle1Img = loadImage("obstacle-1.png");
 obstacle2Img = loadImage("obstacle-2.png");
 obstacle3Img = loadImage("obstacle-3.png");


 gameOverImg = loadImage("gameOver.png");
 restartImg = loadImage("restart.jpg");
}

function setup() {

createCanvas(1200,300);

river=createSprite(100,150);
river.addImage(riverImg);
river.velocityX = -5;

oarsman = createSprite(70,150);
oarsman.addAnimation("oarsman",oarsmanImg);
oarsman.scale=0.07;

oarsman.setCollider("rectangle",0,0,40,40);

gameOver = createSprite(650,150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false; 

obstacleG = new Group();
}

function draw() {
  background("riverImg");

  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,900,30);

  if(gameState===PLAY){

    gameOver.visible = false;
    restart.visible = false;
    
    distance = distance + Math.round(getFrameRate()/50);
    river.velocityX = -(6 + 2*distance/150);

    oarsman.y = World.mouseY;

    edges= createEdgeSprites();
    oarsman.collide(edges);

    if(river.x < 0 ){
        river.x = width/2;
      }

    if(obstaclesG.isTouching(oarsman)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;

    ground.velocityX = 0;
    trex.velocityY = 0
      
    obstaclesGroup.setLifetimeEach(-1);

    obstaclesGroup.setVelocityXEach(0);

    if(mousePressedOver(restart)) {
        reset();
      }
    
}
}

function reset(){
    gameState = PLAY;
    obstaclesG.destroyEach();
  }

  function spawnObstacles(){
    if (frameCount % 60 === 0){
      var obstacle = createSprite(600,165,10,40);
      obstacle.velocityX = -(6 + score/100);
      
       //generate random obstacles
       var rand = Math.round(random(1,6));
       switch(rand) {
         case 1: obstacle.addImage(obstacle1);
                 break;
         case 2: obstacle.addImage(obstacle2);
                 break;
         case 3: obstacle.addImage(obstacle3);
                 break;
             default: break;
       }
    }
}

       obstacle.scale = 0.5;
       obstacle.lifetime = 300;

       obstaclesGroup.add(obstacle);