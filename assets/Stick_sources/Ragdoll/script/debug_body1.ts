
const {ccclass, property} = cc._decorator;
import { Global } from "./Leg_force";

@ccclass
export default class debug_body extends cc.Component 
{
    @property(cc.Node)
    Jump_force: cc.Node = null;
    playerSpeed: number =0;

    zDown: boolean = false; // key for player to go left

    xDown: boolean =false; // key for player to go right

    jDown: boolean =false; // key for player to shoot

    kDown: boolean =false; // key for player to jump

    isDead:boolean =false;

    onGround:boolean = false;
    xFlag: boolean = false; // key for player to go right
    zFlag: boolean = false; // key for player to go left
    

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
    }

    
    start() {
        //cc.director.getPhysicsManager().debugDrawFlags = 1;

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }


    update() {
        //cc.log(this.node.position);///
        this.playerMovement();
    }


    onKeyDown(event) {
        //cc.log("Key Down: " + event.keyCode);
        
        if(event.keyCode == cc.macro.KEY.z) {
            this.zDown = true;
            if (this.xDown) {
                this.xDown = false;
                this.xFlag = true;
            }
            
        } else if(event.keyCode == cc.macro.KEY.x) {
            this.xDown = true;
            if (this.zDown) {
                this.zDown = false;
                this.zFlag = true;
            }
            
        } else if(event.keyCode == cc.macro.KEY.k) {
            if (!this.kDown) {
                if (Global.onWall == 1) {
                    cc.log("onwall: " + Global.onWall);
                    this.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.getComponent(cc.RigidBody).linearVelocity.x, 0);
                    this.Jump_force.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(40000, 100000), true);
                } else if (Global.onWall == 2) {
                    cc.log("onwall: " + Global.onWall);
                    this.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.getComponent(cc.RigidBody).linearVelocity.x, 0);
                    this.Jump_force.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(-40000, 100000), true);
                }
            }
            this.kDown = true;
        } 
    }

    onKeyUp(event) {
        if(event.keyCode == cc.macro.KEY.z) {
            this.zDown = false;
            this.zFlag = false;
            if (this.xFlag) {
                this.xDown = true;
                this.xFlag = false;
            }
        } else if(event.keyCode == cc.macro.KEY.x) {
            this.xDown = false;
            this.xFlag = false;
            if (this.zFlag) {
                this.zDown = true;
                this.zFlag = false;
            }
        } else if(event.keyCode == cc.macro.KEY.j)
            this.jDown = false;
        else if(event.keyCode == cc.macro.KEY.k)
            this.kDown = false;
    }
    
    playerMovement() {
        this.playerSpeed = 0;
        if(this.zDown){
            this.playerSpeed = -500;
            //this.playerSpeed = -2000;
            //this.playerSpeed = -55000;
            this.node.scaleX = -1;
        }
        else if(this.xDown){
            this.playerSpeed = 500;
            //this.playerSpeed = 2000;
            //this.playerSpeed = 55000;
            this.node.scaleX = 1;
        }
        
        
        //window.Test_Body.linearVelocity = cc.v2(this.playerSpeed * dt,window.Test_Body.linearVelocity.y)
        //this.node.position.x += this.playerSpeed * dt;
        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.playerSpeed,0);
        
        //this.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(this.playerSpeed, 0), true);
        if (this.kDown && Global.onGround && Global.onWall == 0)
        {
            this.jump();
        } 
        /*else if (this.kDown && Global.onWall) {
            this.wall_jump();
        }*/
    }  


    jump() {
        Global.onGround = false;

        // Method I: Apply Force to rigidbody
        this.Jump_force.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(0, 120000), true);

        // Method II: Change velocity of rigidbody
        //this.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.getComponent(cc.RigidBody).linearVelocity.x, 0);
        //this.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.getComponent(cc.RigidBody).linearVelocity.x, 20000);
        //this.Jump_force.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.getComponent(cc.RigidBody).linearVelocity.x, 1000);
        cc.log("jump ss############");
    }
    wall_jump() {
        cc.log("wall jump");
        //this.Jump_force.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(0, 10000), true);
        if (Global.onWall == 1) {
            cc.log("onwall: " + Global.onWall);
            this.Jump_force.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(15000, 80000), true);
        } else if (Global.onWall == 2) {
            cc.log("onwall: " + Global.onWall);
            this.Jump_force.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(-15000, 80000), true);
        }
    }

    onBeginContact(contact, self, other) {
        var direction = contact.getWorldManifold().normal;
        //cc.log("YYYYYYYYY: "+direction.y);
        if (other.node.name == "platform" && direction.x < 0) {
            cc.log("onWall left");
            Global.onWall = 1;
            //cc.log("platform");
        } else if (other.node.name == "platform" && direction.x > 0) {
            cc.log("onWall right");
            Global.onWall = 2;
            //cc.log("platform");
        }
    }
    onEndContact(contact, self, other) {
        if (other.node.name == "platform") {
            cc.log("onwall false");
            if (Global.onWall == 1 || Global.onWall == 2) Global.onWall = 3;
        }
    }
}


