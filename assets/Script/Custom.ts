
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    private platform_isMouseDown: boolean = false;

    //private platform_isMouseDown: boolean = false;
    //private platform_isMouseDown: boolean = false;
    private moving_object: cc.Node = null;

    private laserBeam_object: cc.Node = null;

    private mouse_position: cc.Vec2 = null;

    private isMouseDown: boolean = false;

    private MouseDownPos: cc.Vec2 = null;

    private MouseDragPos: cc.Vec2 = null;

    @property(cc.Prefab)
    private player1Prefab: cc.Prefab = null;

    @property(cc.Prefab)
    private player2Prefab: cc.Prefab = null;
    @property(cc.Prefab)
    private blackNumberPrefab: cc.Prefab = null;
    @property(cc.Prefab)
    private yellowNumberPrefab: cc.Prefab = null;

    

    @property(cc.Prefab)
    private laserplatformPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    private laserbeamPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    private platformPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    private smashcubePrefab: cc.Prefab = null;

    private state: number = null;

    private idle: boolean =true;

    private object_type = cc.Enum({
        idle: 0,
        laserplatform: 1,
        platform: 2,
        ice: 3
        
    });

    onLoad () {

        this.MouseDragPos = new cc.Vec2(0, 0);
        
        this.MouseDownPos = new cc.Vec2(0, 0);
        cc.find("Canvas").on('touchmove', function (event) {
            //console.log('touchmove');
            this.MouseDragPos = cc.find("Canvas").convertToNodeSpaceAR(event.getLocation());
            //this.MouseDragPos = event.getLocation();
            this.isMouseDown = true;
        }, this);
        
    }

    start () {
        cc.director.getPhysicsManager().enabled = true;
        
        //cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.find("Canvas").on(cc.Node.EventType.MOUSE_MOVE,(event)=>{
            this.mouse_position = event.getLocation();
            //cc.log(this.mouse_position);      
        })
        
    }
    getMousePosition(){
        
    }
    platform(){
        cc.log("2!");
        
        this.state = this.object_type.platform;
        

        this.moving_object = cc.instantiate(this.platformPrefab);
        this.moving_object.parent = cc.find("Canvas");
    
        cc.find("Canvas").on('mousedown', this.mousedown_Canvas, this);

        cc.find("Canvas").on('mouseup', function (event) {
            console.log('Mouse up');
            
            this.isMouseDown = false;
        }, this);

        //this.isMouseDown = false;
    }
    mousedown_Canvas(event){
     
        console.log('Mouse down in platform detect');
        this.isMouseDown = true;
        this.idle = false;
        this.MouseDownPos = cc.find("Canvas").convertToNodeSpaceAR(event.getLocation());
        this.MouseDragPos = cc.find("Canvas").convertToNodeSpaceAR(event.getLocation());
        cc.log("MDP: " + this.MouseDownPos);
    
    }

    laserplatform(){
        cc.log("instantiate!");
        
        this.state = this.object_type.laserplatform;
        this.moving_object = cc.instantiate(this.laserplatformPrefab);
        this.laserBeam_object = cc.instantiate(this.laserbeamPrefab);
        this.scheduleOnce(()=>{ 
            this.moving_object.getChildByName("base").getComponent(cc.RigidBody).type = 2;
            this.moving_object.getChildByName("base").getComponent(cc.RigidBody).gravityScale = 0;
            this.moving_object.getChildByName("base").getChildByName("platform").getComponent(cc.RigidBody).gravityScale = 0;
            this.moving_object.getChildByName("base").getChildByName("platform").getComponent(cc.RigidBody).fixedRotation = true;
        });
        this.moving_object.parent = cc.find("Canvas");
        // resume moving

        this.moving_object.on('mouseup', function (event) {
            console.log('Mouse up');
            this.isMouseDown = false;
        }, this);
        this.moving_object.getChildByName("base").getChildByName("platform").on('mousedown', function (event) {
            console.log('Mouse down');
            this.isMouseDown = true;
            this.idle = false;
          }, this);

        this.isMouseDown = null;
    }

    ice(){
        cc.log("ice state!");
        
        this.state = this.object_type.ice;
        this.moving_object = cc.instantiate(this.smashcubePrefab);
        
        this.scheduleOnce(()=>{ 
            this.moving_object.getChildByName("platform").getComponent(cc.RigidBody).type = 2;
            this.moving_object.getChildByName("platform").getComponent(cc.RigidBody).gravityScale = 0;
            //this.moving_object.getChildByName("base").getChildByName("platform").getComponent(cc.RigidBody).gravityScale = 0;
            this.moving_object.getChildByName("platform").getComponent(cc.RigidBody).fixedRotation = true;
        });
        this.moving_object.parent = cc.find("Canvas");
        // resume moving

        this.moving_object.getChildByName("platform").on('mouseup', function (event) {
            console.log('Mouse up');
            this.isMouseDown = false;
        }, this);
        this.moving_object.getChildByName("platform").on('mousedown', function (event) {
            console.log('Mouse down');
            this.isMouseDown = true;
            this.idle = false;
          }, this);

        this.isMouseDown = null;
    }
    
    update (dt) {
        //this.getMousePosition();
        if(this.state == this.object_type.idle){

        }
        else if(this.state == this.object_type.laserplatform){
            if(!this.isMouseDown && !this.idle){
                
                cc.log("fix object////");
                this.scheduleOnce(()=>{ 
                    this.moving_object.getChildByName("base").getComponent(cc.RigidBody).type = 0;
                    this.moving_object.getChildByName("base").getComponent(cc.RigidBody).gravityScale = 1;
                    this.moving_object.getChildByName("base").getChildByName("platform").getComponent(cc.RigidBody).gravityScale = 6;
                    this.moving_object.getChildByName("base").getChildByName("platform").getComponent(cc.RigidBody).fixedRotation = false;
                });

                this.idle = true;
                
            } else if(this.isMouseDown){

                this.scheduleOnce(()=>{ 
                    this.moving_object.getChildByName("base").getComponent(cc.RigidBody).type = 2;
                    this.moving_object.getChildByName("base").getComponent(cc.RigidBody).gravityScale = 0;
                    this.moving_object.getChildByName("base").getChildByName("platform").getComponent(cc.RigidBody).gravityScale = 0;
                    this.moving_object.getChildByName("base").getChildByName("platform").getComponent(cc.RigidBody).fixedRotation = true;
                });
            }
            //cc.log("moving object: " + this.moving_object.position);
            //cc.log(this.mouse_position);
            //cc.log(this.moving_object);
            //this.moving_object.setPosition(30, 50)
            //this.moving_object.y = this.mouse_position.y;
            //this.moving_object.position = this.mouse_position;
        } else if (this.state == this.object_type.platform) {

            if(!this.isMouseDown && !this.idle){
                // put
                cc.log("here");
                this.moving_object.getComponent(cc.PhysicsPolygonCollider).points[0] = cc.v2(-this.moving_object.width/2, -this.moving_object.height/2);
                this.moving_object.getComponent(cc.PhysicsPolygonCollider).points[1] = cc.v2(this.moving_object.width/2,  -this.moving_object.height/2);
                this.moving_object.getComponent(cc.PhysicsPolygonCollider).points[2] = cc.v2(this.moving_object.width/2,  this.moving_object.height/2);
                this.moving_object.getComponent(cc.PhysicsPolygonCollider).points[3] = cc.v2(-this.moving_object.width/2,  this.moving_object.height/2);
                this.moving_object.getComponent(cc.PhysicsPolygonCollider).apply();

                this.state = this.object_type.idle;
                this.idle = true;
                //關閉監聽
                cc.find("Canvas").off('mousedown', this.mousedown_Canvas, this);
                cc.log("turn off the listener");
                
                
            } else if(this.isMouseDown && !this.idle){

                //cc.log(this.MouseDragPos);
                this.moving_object.x = this.MouseDownPos.x;
                this.moving_object.y = this.MouseDownPos.y;
                //let mousedragPosAR = cc.find("Canvas").convertToWorldSpaceAR(this.MouseDragPos);

                // draw
                this.moving_object.width = Math.abs(this.MouseDownPos.x - this.MouseDragPos.x) * 2;
                this.moving_object.height = Math.abs(this.MouseDownPos.y - this.MouseDragPos.y)* 2;
                
                /*
                const ctx = this.moving_object.getComponent(cc.Graphics);
                cc.log("down: " + this.MouseDownPos);
                cc.log("drag: " + this.MouseDragPos);
                ctx.clear();
                
               
                ctx.moveTo(this.MouseDownPos.x, this.MouseDownPos.y);
                
                ctx.lineTo(this.MouseDownPos.x, this.MouseDragPos.y);
                ctx.lineTo(this.MouseDragPos.x, this.MouseDragPos.y);
                ctx.lineTo(this.MouseDragPos.x, this.MouseDownPos.y);
                ctx.lineTo(this.MouseDownPos.x, this.MouseDownPos.y);
                ctx.close();
                ctx.stroke();
                ctx.fill();
                */
                
            }
        } else if(this.state == this.object_type.ice){
            if(!this.isMouseDown && !this.idle){
                
                cc.log("fix object////");
                this.scheduleOnce(()=>{ 
                    this.moving_object.getChildByName("platform").getComponent(cc.RigidBody).type = 0;
                    this.moving_object.getChildByName("platform").getComponent(cc.RigidBody).gravityScale = 4;
                    //this.moving_object.getChildByName("base").getChildByName("platform").getComponent(cc.RigidBody).gravityScale = 4;
                    this.moving_object.getChildByName("platform").getComponent(cc.RigidBody).fixedRotation = false;
                });

                this.idle = true;
                this.state = this.object_type.idle;
                
            } else if(this.isMouseDown && !this.idle){
                cc.log("hi ice");
                this.scheduleOnce(()=>{ 
                    this.moving_object.getChildByName("platform").getComponent(cc.RigidBody).type = 2;
                    this.moving_object.getChildByName("platform").getComponent(cc.RigidBody).gravityScale = 0;
                    //this.moving_object.getChildByName("base").getChildByName("platform").getComponent(cc.RigidBody).gravityScale = 0;
                    this.moving_object.getChildByName("platform").getComponent(cc.RigidBody).fixedRotation = true;
                });
            }
            //cc.log("moving object: " + this.moving_object.position);
            //cc.log(this.mouse_position);
            //cc.log(this.moving_object);
            //this.moving_object.setPosition(30, 50)
            //this.moving_object.y = this.mouse_position.y;
            //this.moving_object.position = this.mouse_position;
        } 
    }

    startGame(){

        cc.log("---start Game---");
        this.state = this.object_type.idle;
        this.idle = true;

        var leftPage = cc.find("Canvas/Left Page");
        var action = cc.sequence(cc.moveBy(0.5, 50, 0).easing(cc.easeInOut(3)), cc.moveTo(0.5, -1600, 0).easing(cc.easeInOut(3)), cc.callFunc(()=>{
            let blackPersentNode = cc.instantiate(this.blackNumberPrefab);
            let yellowPersentNode = cc.instantiate(this.yellowNumberPrefab);
            let p1Node = cc.instantiate(this.player1Prefab);
            let p2Node = cc.instantiate(this.player2Prefab);
            p1Node.parent = cc.director.getScene();
            p2Node.parent = cc.director.getScene();
            blackPersentNode.parent = cc.find("Canvas");
            yellowPersentNode.parent = cc.find("Canvas");
            blackPersentNode.position = cc.v2(-430, 270);
            blackPersentNode.width = blackPersentNode.height = 135;
            blackPersentNode.scale = 0.5;

            yellowPersentNode.position = cc.v2(430, 270);
            yellowPersentNode.width = yellowPersentNode.height = 135;
            yellowPersentNode.scale = 0.5;
            
        
            cc.log(p1Node.parent);
        }));
        leftPage.runAction(action);
    }

    public Leave() {
        cc.director.loadScene("Menu");
    }
}
