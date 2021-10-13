var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gamestate = "play"
var sprite

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  ghost = createSprite(200, 200);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.3
  spookySound.play();

}

function draw() {
  background(200);
  if (gamestate === "play") {
    if (keyDown("right")) {
      ghost.x = ghost.x+5
    }
    if (keyDown("left")) {
      ghost.x = ghost.x-5
    }
    if (keyDown("space")) {
      ghost.velocityY = -10
    }
    ghost.velocityY += 0.2
    spawnDoors();
    if(tower.y > 400){
      tower.y = 300
    }
    if (climbersGroup.isTouching(ghost)) {
      ghost.velocityY = 0
    }
    if (invisibleBlockGroup.isTouching(ghost) || ghost.y > 600) {
      gamestate = "end"
    }
  drawSprites();
  }
  if (gamestate === "end") {
    background("black")
    textSize(60)
    fill("white")
    strokeWeight(4)
    stroke("yellow")
    text("GAME OVER", 100, 300)
    ghost.destroy();
    invisibleBlockGroup.destroyEach();
    doorsGroup.destroyEach();
    climbersGroup.destroyEach();
    spookySound.stop();
  }
}

function spawnDoors() {
  if (frameCount%240 == 0) {
    var door = createSprite(Math.round(random(120, 400)), -50);
    door.velocityY = 1
    door.addImage("door", doorImg)
    var climber = createSprite(door.x, 10);
    climber.velocityY = 1
    climber.addImage("climber", climberImg);
    var invisibleBlock = createSprite(door.x, 15, climber.width, 2);
    invisibleBlock.velocityY = 1;
    doorsGroup.add(door)
    climbersGroup.add(climber)
    invisibleBlockGroup.add(invisibleBlock)
    ghost.depth = door.depth+1
  }
}
