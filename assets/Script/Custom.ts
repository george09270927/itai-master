
const {ccclass, property} = cc._decorator;
import { Global } from "../Stick/Ragdoll/script/Leg_force";

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

    private firstClick: boolean = false;

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

    @property(cc.Prefab)
    private fallingplatformPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    private barrelPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    private laserGunPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    private grenadePrefab: cc.Prefab = null;

    @property(cc.Prefab)
    private desertHawkPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    private excaliburPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    private laserRay_1_Prefab: cc.Prefab = null;

    @property(cc.Prefab)
    private laserRay_2_Prefab: cc.Prefab = null;

    private state: number = null;

    private idle: boolean =true;

    private object_type = cc.Enum({
        idle: 0,
        laserplatform: 1,
        platform: 2,
        ice: 3,
        mush: 4,
        barrel: 5,
        laserGun: 6,
        grenade: 7,
        desertHawk: 8,
        excalibur: 9
        
    });

    onLoad () {

        this.MouseDragPos = new cc.Vec2(0, 0);
        this.MouseDownPos = new cc.Vec2(0, 0);
        this.isMouseDown = false;
        this.idle = true;
        this.state = this.object_type.idle;
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
        this.moving_object.zIndex = 1;
    
        cc.find("Canvas").on('mousedown', this.mousedown_Canvas, this);

        cc.find("Canvas").on('mouseup', function (event) {
            console.log('Mouse up');
            
            this.isMouseDown = false;
        }, this);

        //this.isMouseDown = false;
    }
    mousedown_Canvas(event){
     
        
        console.log('Mouse down in platform detect');
        this.MouseDownPos = cc.find("Canvas").convertToNodeSpaceAR(event.getLocation());
        this.MouseDragPos = cc.find("Canvas").convertToNodeSpaceAR(event.getLocation());
        if(!(this.MouseDownPos.x < -340 && this.MouseDownPos.y > 0) && !(this.MouseDownPos.x > 340 && this.MouseDownPos.y > 0) && !(this.MouseDownPos.y < -250)){
            this.isMouseDown = true;
            this.idle = false;
            cc.log("MDP: " + this.MouseDownPos);
        }
        
        
        
    
    }

    laserplatform(){
        cc.log("instantiate!");
        this.initState();
        this.state = this.object_type.laserplatform;
        this.moving_object = cc.instantiate(this.laserplatformPrefab);
        this.moving_object.zIndex = 1;
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
        this.initState();
        this.state = this.object_type.ice;
        this.moving_object = cc.instantiate(this.smashcubePrefab);
        this.moving_object.zIndex = 1;
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

    mush(){
        this.initState();
        cc.log("mush state...");
        this.state = this.object_type.idle; // initial
        this.state = this.object_type.mush;
        cc.find("Canvas").off('mousedown', this.mousedown_Canvas, this);
        cc.find("Canvas").on('mousedown', this.mousedown_Canvas, this);
        // resume moving
        this.isMouseDown = null;
    }

    barrel(){
        this.initState();
        cc.log("barrel state...");
        this.state = this.object_type.idle; // initial
        this.state = this.object_type.barrel;
        cc.find("Canvas").off('mousedown', this.mousedown_Canvas, this);
        cc.find("Canvas").on('mousedown', this.mousedown_Canvas, this);
        
        this.isMouseDown = null;
    }

    initState(){
        cc.find("Canvas").off('mousedown', this.mousedown_Canvas, this);
        cc.systemEvent.removeAll(cc.find("Canvas"));
        cc.systemEvent.removeAll(this.moving_object);
        cc.log("remove///");
    }

    update (dt) {
        //this.getMousePosition();
        if(this.state == this.object_type.idle){
            //cc.log("int idle");
            //cc.find("Canvas").off('mousedown', this.mousedown_Canvas, this);
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

                // draw
                this.moving_object.width = Math.abs(this.MouseDownPos.x - this.MouseDragPos.x);
                this.moving_object.height = Math.abs(this.MouseDownPos.y - this.MouseDragPos.y);
                
                this.moving_object.x = (this.MouseDownPos.x + this.MouseDragPos.x) / 2;
                this.moving_object.y = (this.MouseDownPos.y + this.MouseDragPos.y) / 2;
    
            }
        } else if(this.state == this.object_type.ice){
            if(!this.isMouseDown && !this.idle){
                
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
        } else if (this.state == this.object_type.mush) {
            if(this.isMouseDown){
                this.isMouseDown = false;
                this.idle = false;
                this.moving_object = cc.instantiate(this.fallingplatformPrefab);
                this.moving_object.zIndex = 1;
                this.moving_object.getChildByName("platform").getComponent("Falling").initPos(this.MouseDownPos);
                this.moving_object.parent = cc.find("Canvas");
                
            } else {
                this.idle = true;
            }
            
        } else if (this.state == this.object_type.barrel){
            if(this.isMouseDown && !this.idle){
                this.isMouseDown = false;
                this.idle = false;
                this.moving_object = cc.instantiate(this.barrelPrefab);
                this.moving_object.zIndex = 1;
                this.moving_object.getComponent("barrel").initPos(this.MouseDownPos);
                this.moving_object.parent = cc.find("Canvas");
                
            } else {
                this.idle = true;
            }
            
        } else if (this.state == this.object_type.laserGun){
            if(this.isMouseDown && !this.idle){
                this.isMouseDown = false;
                this.idle = false;
                this.moving_object = cc.instantiate(this.laserGunPrefab);
                this.moving_object.zIndex = 1;
                this.moving_object.setPosition(this.MouseDownPos);
                this.moving_object.parent = cc.find("Canvas");
                
            } else {
                this.idle = true;
            } 
        } else if (this.state == this.object_type.grenade){
            if(this.isMouseDown && !this.idle){
                this.isMouseDown = false;
                this.idle = false;
                
                this.moving_object = cc.instantiate(this.grenadePrefab);
                this.moving_object.zIndex = 1;
                this.moving_object.setPosition(this.MouseDownPos);
                this.moving_object.parent = cc.find("Canvas");
                
            } else {
                this.idle = true;
            }
        } else if (this.state == this.object_type.desertHawk){
            if(this.isMouseDown && !this.idle){
                this.isMouseDown = false;
                this.idle = false;
                this.moving_object = cc.instantiate(this.desertHawkPrefab);
                this.moving_object.zIndex = 1;
                this.moving_object.setPosition(this.MouseDownPos);
                this.moving_object.parent = cc.find("Canvas");
                
            } else {
                this.idle = true;
            }
        } else if (this.state == this.object_type.excalibur){
            if(this.isMouseDown && !this.idle){
                this.isMouseDown = false;
                this.idle = false;
                this.moving_object = cc.instantiate(this.excaliburPrefab);
                this.moving_object.zIndex = 1;
                this.moving_object.setPosition(this.MouseDownPos);
                this.moving_object.parent = cc.find("Canvas");
                
            } else {
                this.idle = true;
            }
        } 
    }

    generateWeapon(event,weaponType){
        
        cc.log("here");
        cc.log(weaponType);
        if(weaponType == "laserGun"){
            this.initState();
            this.state = this.object_type.idle; // initial
            this.state = this.object_type.laserGun;
            
            cc.log("put laserGun state");
        
            cc.find("Canvas").off('mousedown', this.mousedown_Canvas, this);
            cc.find("Canvas").on('mousedown', this.mousedown_Canvas, this);
            // resume moving
            this.isMouseDown = null;
            
        } else if (weaponType == "grenade"){
            this.initState();
            this.state = this.object_type.idle; // initial
            this.state = this.object_type.grenade;
            cc.log("put grenade state");
            cc.find("Canvas").off('mousedown', this.mousedown_Canvas, this);
            cc.find("Canvas").on('mousedown', this.mousedown_Canvas, this);
            // resume moving
            this.isMouseDown = null;
            
        } else if (weaponType == "desert hawk"){
            this.initState();
            this.state = this.object_type.idle; // initial
            this.state = this.object_type.desertHawk;
            cc.log("put desert hawk state");
            cc.find("Canvas").off('mousedown', this.mousedown_Canvas, this);
            cc.find("Canvas").on('mousedown', this.mousedown_Canvas, this);
            // resume moving
            this.isMouseDown = null;
            
        } else if (weaponType == "excalibur"){
            this.initState();
            this.state = this.object_type.idle; // initial
            this.state = this.object_type.excalibur;
            cc.log("put excalibur state");
            cc.find("Canvas").off('mousedown', this.mousedown_Canvas, this);
            cc.find("Canvas").on('mousedown', this.mousedown_Canvas, this);
            // resume moving
            this.isMouseDown = null;
            
        } 
    }

    startGame(){

        cc.log("---start Game---");
        this.state = this.object_type.idle;
        this.idle = true;

        var leftPage = cc.find("Left Page");
        var action = cc.sequence(cc.moveBy(0.5, 50, 0).easing(cc.easeInOut(3)), cc.moveTo(0.5, -1200, 320).easing(cc.easeInOut(3)), cc.callFunc(()=>{
            let blackPersentNode = cc.instantiate(this.blackNumberPrefab);
            let yellowPersentNode = cc.instantiate(this.yellowNumberPrefab);
            
            
            let laserRay_1 = cc.find("LaserGunRay_1");
            let laserRay_2 = cc.find("LaserGunRay_2");
            
            blackPersentNode.parent = cc.find("Canvas");
            yellowPersentNode.parent = cc.find("Canvas");
            blackPersentNode.position = cc.v2(-430, 270);
            blackPersentNode.width = blackPersentNode.height = 135;
            blackPersentNode.scale = 0.5;
            yellowPersentNode.position = cc.v2(430, 270);
            yellowPersentNode.width = yellowPersentNode.height = 135;
            yellowPersentNode.scale = 0.5;

            let p1Node = cc.instantiate(this.player1Prefab);
            let p2Node = cc.instantiate(this.player2Prefab);
            p1Node.parent = cc.director.getScene();
            p2Node.parent = cc.director.getScene();
            cc.log(p1Node);
            cc.log(p2Node);
            
        }));
        leftPage.runAction(action);
    }

    public Leave() {
        cc.director.loadScene("Menu");
    }
}
