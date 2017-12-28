function SceneObject() {
  this.points = [];
  this.colors = [];
  this.normals=[];//法向量normal vectors
  this.texs=[];
  this.tags = [new Component()];//(type,start,numOfPoints,colorRaw(vec4)) 
                                 //type 1 for Triangles,type 3 for Triangle_Strip;
  this.offset = [0, 0, 0];//position of current object
  this.theta = [0, 0, 0];//direction and speed the object rotates
  this.rMat = mat4();
  this.vBuffer = null;
  this.nBuffer=null;
  this.tBuffer=null;

  this.get=null;
  this.actionList=[];
  this.setAction=function(action){//设置执行一个动作
      setAction(this,action);
  }   
  this.nextAction=function(){//得出执行动作后的下一步状态
      nextAction(this);
  }   
}

function bear(obj){
    tags=obj.tags;
    texs=obj.texs;
    normals=obj.normals;
    points=obj.points;
    //计算points，normals和texs并设置颜色
    //左右区分按照熊自身的位置，如左手在我们默认视角的右侧
    var head      = sphere(points,normals,texs,tags,0,0.3,0,0.2,Material.undefine());//face
    var body      = ellipsoid(points,normals,texs,tags,0,0,0,0.27,0.2,0.2,Material.undefine());//body
    var leftHand  = ellipsoid(points,normals,texs,tags,0.27,0,0,0.05,0.08,0.05,Material.black());//left hand
    var rightHand = ellipsoid(points,normals,texs,tags,-0.27,0,0,0.05,0.08,0.05,Material.white());//right hand
    var leftLeg   = cylinderZ(points,normals,texs,tags,0.15,-0.08,0.0,0.3,0.07,Material.black());//left leg
    var rightLeg  = cylinderZ(points,normals,texs,tags,-0.15,-0.08,0.0,0.3,0.07,Material.white());//right leg
    var leftFoot  = ellipsoid(points,normals,texs,tags,0.15,-0.08,0.3,0.07,0.09,0.07,Material.black());//left foot
    var rightFoot = ellipsoid(points,normals,texs,tags,-0.15,-0.08,0.3,0.07,0.09,0.07,Material.white());//right foot
    var leftEar   = sphere(points,normals,texs,tags,0.27*Math.cos(Math.PI/3),0.28+0.27*Math.sin(Math.PI/3),0,0.08,Material.black());//left ear
    var rightEar  = sphere(points,normals,texs,tags,-0.27*Math.cos(Math.PI/3),0.28+0.27*Math.sin(Math.PI/3),0,0.08,Material.white());//right ear

    //设置名称映射关系
    obj.get={
      'head':head,
      'body':body,
      'leftHand':leftHand,
      'rightHand':rightHand,
      'leftLeg':leftLeg,
      'rightLeg':rightLeg,
      'leftFoot':leftFoot,
      'rightFoot':rightFoot,
      'leftEar':leftEar,
      'rightEar':rightEar,
  };

    //设置关节树
    body.attach(head,head.downPos);
    body.attach(leftHand,leftHand.leftPos);
    body.attach(rightHand,rightHand.rightPos);
    body.attach(leftLeg,leftLeg.backPos);
    body.attach(rightLeg,rightLeg.backPos);
    head.attach(leftEar,vec3(0.2*Math.cos(Math.PI/3),0.28+0.2*Math.sin(Math.PI/3),0));
    head.attach(rightEar,vec3(-0.2*Math.cos(Math.PI/3),0.28+0.2*Math.sin(Math.PI/3),0));
    leftLeg.attach(leftFoot,leftFoot.backPos);
    rightLeg.attach(rightFoot,rightFoot.backPos);

    //leftLeg.theta=[-135,0,0];
}

function sun(obj){
  tags=obj.tags;
  texs=obj.texs;
  normals=obj.normals;
  points=obj.points;
  obj.material=Material.create(vec4(0.2,0.2,0.2,1.0),vec4(1.0,1.0,1.0,1.0),vec4(1.0,1.0,1.0,1.0));
  sphere(points,normals,texs, tags,0,0,0,0.2,obj.material);//球体
  obj.colorDirect=Color.red;
}

function christmasHat(obj){
    tags=obj.tags;
    texs=obj.texs;
    normals=obj.normals;
    points=obj.points;
    var bottom=wheelXZ(points,normals,texs,tags,0,0,0,0.2,0.05,Material.white());//帽檐
    var body=coneY(points,normals,texs,tags,0,0,0.05,0.4,0.2,Material.red());//帽身
    var ball=sphere(points,normals,texs,tags,0,0.4,0,0.05,Material.white());//小球
}

