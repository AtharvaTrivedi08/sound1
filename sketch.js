var bg, shooter_shooting, shooter_img, bg_img, player;
var heart1_img, heart2_img, heart3_img;
var heart1, heart2, heart3;
var zombie_img, zombie, bullet;
var zombieGroup, bulletGroup;
var gameState = "fight";
var bullets = 70;
var score = 0;
var life = 3;
var lose, winning, explosion;

function preload(){
  shooter_img = loadImage("assets/shooter_2.png");
  shooter_shooting = loadImage("assets/shooter_3.png");
  bg_img = loadImage("assets/bg.jpeg");
  heart1_img = loadImage("assets/heart_1.png");
  heart2_img = loadImage("assets/heart_2.png");
  heart3_img = loadImage("assets/heart_3.png");
  zombie_img = loadImage("assets/zombie.png");
  lose = loadSound("assets/lose.mp3");
  winning = loadSound("assets/win.mp3");
  explosion = loadSound("assets/explosion.mp3");
}

function setup(){
  createCanvas(windowWidth,windowHeight);

  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20);
  bg.addImage(bg_img);
  bg.scale = 1.1;

  player = createSprite(displayWidth-1150,displayHeight-300,50,50);
  player.addImage(shooter_img);
  player.scale = 0.3;

  zombieGroup = new Group();
  bulletGroup = new Group();
  
  heart1 = createSprite(displayWidth-150,40,20,20);
  heart1.visible = false;
  heart1.addImage("heart1",heart1_img);
  heart1.scale = 0.4;

  heart2 = createSprite(displayWidth-100,40,20,20);
  heart2.visible = false;
  heart2.addImage("heart2",heart2_img);
  heart2.scale = 0.4;

  heart3 = createSprite(displayWidth-150,40,20,20);
  heart3.addImage("heart3",heart3_img);
  heart3.scale = 0.4;

}

function draw(){
  background("black");

  if(gameState == "fight"){

    if(life === 3){
      heart3.visible = true;
      heart2.visible = false;
      heart1.visible = false;
    }

    if(life === 2){
      heart2.visible = true;
      heart3.visible = false;
      heart1.visible = false;
    }

    if(life === 1){
      heart1.visible = true;
      heart3.visible = false;
      heart2.visible = false;
    }

    if(life === 0){
      gameState = "lost";
      lose.play();
    }

    if(score === 100){
      gameState = "won";
      winning.play();
    }

  if(keyDown(UP_ARROW)||touches.lenght>0){
      player.y = player.y-30;
  }

  if(keyDown(DOWN_ARROW)||touches.lenght>0){
    player.y = player.y+30;
}

if(keyWentDown("space")){
  bullet = createSprite(displayWidth-1150, player.y-30,10,10);
  bullet.velocityX = 20;
  bulletGroup.add(bullet);
  player.depth = bullet.depth;
  player.depth = player.depth+2;
  player.addImage(shooter_shooting);
  bullets = bullets-1;
  explosion.play();
}

else if(keyWentUp("space")){
  player.addImage(shooter_img);
}
 
if(bullets === 0){
  gameState = "bullet";
  lose.play();
}

if(zombieGroup.isTouching(bulletGroup)){
  for(var i = 0;i<zombieGroup.length; i++){
    if(zombieGroup[i].isTouching(bulletGroup)){
      zombieGroup[i].destroy();
      bulletGroup.destroyEach();
      explosion.play();
      score = score+2;
    }
   }
  }
 

if(zombieGroup.isTouching(player)){
  lose.play();
  for(var i = 0;i<zombieGroup.length; i++){
    if(zombieGroup[i].isTouching(player)){
      zombieGroup[i].destroy();
      life = life-1;
    }
  }
}
  enemey();
  }
  drawSprites();

  textSize(20);
  fill("white");
  text("Bullets = " + bullets,displayWidth-210,displayHeight/2-250);
  text("Score = " + score,displayWidth-200,displayHeight/2-220);
  text("Lives = " + life,displayWidth-200,displayHeight/2-280);

  if(gameState === "lost"){
    fill("red");
    text("Game Over",400,400);
    zombieGroup.destroyEach();
    player.destroy();
  }

  else if(gameState === "won"){
    fill("green");
    text("You Wonnn!!!",400,400);
    zombieGroup.destroyEach();
    player.destroy();
  }

  else if(gameState === "bullet"){
    textSize(100);
    fill("red");
    text("No Bullets",400,400);
    zombieGroup.destroyEach();
    bulletGroup.destroyEach();
    player.destroy();
  }
 }
 

function enemey(){
   if(frameCount%50 === 0){
    zombie = createSprite(random(500,1100),random(100,500),40,40);
    zombie.addImage("zombie",zombie_img);
    zombie.scale = 0.15;
    zombie.velocityX = -3;
    zombie.debug = true;
    zombie.setCollider("rectangle",0,0,400,400)
    zombie.lifetime = 400
    zombieGroup.add(zombie);
   }
}
