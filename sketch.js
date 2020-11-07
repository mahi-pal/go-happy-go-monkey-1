var PLAY = 1;
var END=0;
var gamestate=PLAY;

var monkey;


var restart;

var score=0;
  var count=0;

 
  
  var ground;

  var invisibleGround;
function preload(){
  
  monkey_running =            loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  
}
function setup(){
  createCanvas(600,400);

  monkey=createSprite(30,360,10,10);
  monkey.setAnimation("monkey");
  monkey.scale=0.1;
  monkey.setCollider("circle",0,0,40);


  restart=createSprite(200,240,3,5);
  restart.setAnimation("restart");
  restart.scale=0.5;
  restart.visible=false;
  
   ground = createSprite(200,395,700,5);
  ground.shapeColor="black";
  ground.x = ground.width /2;

 invisibleGround = createSprite(200,375,400,5);
  invisibleGround.visible = false;

}

function draw() {
  
  background(255);
  
 
  
  monkey.collide(invisibleGround);
  
  
  if(gamestate===PLAY){
  ground.velocityX = -(8+(3*(score/100)));
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  //jump when the space key is pressed
  if(keyDown("space") && monkey.y >= 359){
    monkey.velocityY = -12 ;
    playSound("jump.mp3");
  }
  
  if(monkey.isTouching(fruitsGroup)){
    score=score+1
    fruitsGroup.setVisibleEach(false);
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  spawnFruits();
  
  spawnObstacles();
  
  }
 if(obstaclesGroup.isTouching(monkey)){
   gamestate=END;
  playSound("die.mp3");
 }  
 
 
 if(gamestate===END){
  fruitsGroup.setVelocityXEach(0);  
  obstaclesGroup.setVelocityXEach(0);
  monkey.velocityY=0;
  ground.velocityX=0;
  go.visible=true;
  restart.visible=true;
  obstaclesGroup.setLifetimeEach(-1);
  fruitsGroup.setLifetimeEach(-1);  
  if(mousePressedOver(restart)){
  reset();
  }
    
  }
 
 monkey.collide(invisibleGround);
 
  textSize(20);
  text("SCORE "+score,250,20);
  
 
 
 
  drawSprites();
  
  obstaclesGroup=createNewGroup();
  fruitsGroup=createNewGroup();
  
}

function spawnFruits() {
  //write code here to spawn the clouds
  if (World.frameCount % 90 === 0) {
    var fruit = createSprite(400,290,40,10);
    fruit.velocityX=-10;
    fruit.setAnimation("Banana");
    fruit.scale = 0.05;
    fruit.velocityX = -3;
    fruitsGroup.add(fruit);
    
     //assign lifetime to the variable
    fruit.lifetime = 134;
    
    //adjust the depth
    fruit.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
  }
}

function spawnObstacles(){
//writing a code to spawn obstacles.   
  if(World.frameCount % 70===0){
     var obstacle1=createSprite(400,385,5,40);
      obstacle1.velocityX=-7;
      obstacle1.setAnimation("Stone");
      obstacle1.scale=0.15;
      obstacle1.lifetime = 110;
      obstaclesGroup.add(obstacle1);
   }
         }

function reset(){
  gamestate=PLAY;
  obstaclesGroup.destroyEach();
  fruitsGroup.destroyEach();
  score=0;
  restart.visible=false;
  count=0;
  
  
         }
  