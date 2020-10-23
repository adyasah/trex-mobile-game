
var trex ,trex_running,ground ,gImage,g2,cloud,cloudImg,obsticals,o1,o2,o3,o4,o5,o6,score;
var play=1,end=0,cGroup,oGroup,trexC,gO,goImg,restart,rImg;
var gameState=play;

var jump,die,cp;
function preload(){
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trexC=loadAnimation("trex_collided.png")
gImage=loadImage("ground2.png");
  cloudImg=loadImage("cloud.png")
  o1=loadImage("obstacle1.png")
  o2=loadImage("obstacle2.png")
  o3=loadImage("obstacle3.png")
  o4=loadImage("obstacle4.png")
o5=loadImage("obstacle5.png")
  o6=loadImage("obstacle6.png")
  
 goImg=loadImage("gameOver.png")
  
  rImg=loadImage("restart-removebg-preview.png")
  
  jump=loadSound("jump.mp3")
  die=loadSound("die.mp3")
  cp=loadSound("checkPoint.mp3")
}
function setup(){
  createCanvas(windowWidth,windowHeight)
  score=0
  
  //create a trex sprite
  trex = createSprite(50,height-70,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("c",trexC)
  trex.scale=0.6
  //trex.debug=true
  trex.setCollider("circle",0,0,35)
  
  ground=createSprite(300,height-20,600,5)
  ground.addImage("ground",gImage)
 // console.log(ground.width)
  ground.x=ground.width/2
  edges=createEdgeSprites()
  
  g2=createSprite(300,height-10,600,1)
  g2.visible=false
  
  cGroup=new Group()
  oGroup=new Group()
  
  gO=createSprite(300,height/2-50)
  gO.addImage("gameO",goImg)
  
  restart=createSprite(300,height/2,50,50)
  restart.addImage("again",rImg)
  restart.scale=0.1
}

function draw(){
  background(200)
  
  if(gameState===play){
     score=Math.round(getFrameRate()/60)+score
    
     if(touches.length>0||keyDown("space")&&trex.collide(g2)){
    trex.velocityY=-10
    jump.play()
       touches=[]
     }
    if(score>0&&score%100==0){
      cp.play()
       
       }
    ground.velocityX=-3
    
     if( ground.x<0){
    ground.x=ground.width/2
  }
    
    trex.velocityY=trex.velocityY+0.5
 
    
     manyClouds();
 mo();
    
    if(trex.isTouching(oGroup)){
     gameState=end  
      die.play()
       }
    
    gO.visible=false
     restart.visible=false
    
     }
  else if(gameState===end){
       ground.velocityX=0 
    oGroup.setVelocityXEach(0)
      cGroup.setVelocityXEach(0)
    oGroup.setLifetimeEach(-1)
     cGroup.setLifetimeEach(-1)
     trex.changeAnimation("c",trexC)
    gO.visible=true
     restart.visible=true
          }
 // console.log(trex.y)
  textSize(20)
  fill("black")
  text("score- "+score,500,50)
  
 if(mousePressedOver(restart)){
    gameState=play
   oGroup.destroyEach()
   cGroup.destroyEach()
   trex.changeAnimation("running", trex_running)
   score=0
    }
  
  
  trex .collide(g2)
  
  
 
  drawSprites();
//console.log(frameCount)
}

function manyClouds(){
  if(frameCount%80==0){
    cloud=createSprite(600,height-100,20,30)
    cloud.y=Math.round(random(150,height-150))
    cloud.addImage(cloudImg)
  cloud.velocityX=-2
    cloud.lifetime=300
    trex.depth=cloud.depth+1
     cGroup.add(cloud)
  }
 
}

function mo(){
  if(frameCount%60==0){
      obsticals=createSprite(600,height-30,20,20)
    var r=Math.round(random(1,6))
    obsticals.velocityX=-3
    
    switch(r){
      case 1: obsticals.addImage(o1);
       break 
       case 2: obsticals.addImage(o2);
       break 
        case 3: obsticals.addImage(o3);
       break 
       case 4: obsticals.addImage(o4);
       break 
        case 5: obsticals.addImage(o5);
       break 
       case 6: obsticals.addImage(o6);
       break 
       
           }
       oGroup.add(obsticals)
       obsticals.scale=0.5
    obsticals.lifetime=200
     }
  
  
  
} 

