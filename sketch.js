
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var Ground

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
    monkey = createSprite(80, 350, 20, 50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  Ground= createSprite(400,350,900,10)
  Ground.x=Ground.width/2;
  console.log(Ground.x)

  FoodGroup = new Group();
  obstacleGroup = new Group();

  score = 0;

  
}


function draw() {
background("white")
  drawSprites();
  text("survival Time:" +score,90,30);
  score=score+Math.round(getFrameRate() /60)
  
   if (keyDown("space")) {
    monkey.velocityY = -12;
  }
  monkey.velocityY=monkey.velocityY+0.8
  
  
  if (Ground.x < 0) {
    Ground.x = Ground.width / 2;
  }
  monkey.collide(Ground);
  spawnFood();
  spawnObstacle();
  
   if (obstacleGroup.isTouching(monkey)) {
    monkey.velocityX = 0
    monkey.velocityY = 0

    Ground.velocityX = 0

    obstacleGroup.setVelocityXEach(0)
    FoodGroup.setVelocityXEach(0);

    obstacleGroup.setsurvivalTimeEach(-1);
    FoodGroup.setsurvivalTimeEach(-1);
  }

}
function spawnFood() {
  if (frameCount % 60 === 0) {
banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;

    
    
    banana.survivalTime = 200;
    
     banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
      FoodGroup.add(banana);
    
  }
}

function spawnObstacle() {
  if(frameCount % 60 === 0) {
obstacle = createSprite(800,320,10,40);

    obstacle.addImage(obstacleImage)
  
    obstacle.velocityX = -(6 + 3*score/100);
 obstacle.scale = 0.1;
    obstacle.survivalTime = 300;
  obstacleGroup.add(obstacle);
  }
}


