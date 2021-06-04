// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
export module Global {
    export let onGround : boolean = false;
}

@ccclass
export default class Leg_force extends cc.Component {
    @property(cc.Node)
    R_leg: cc.Node = null;
    @property(cc.Node)
    L_leg: cc.Node = null;

    @property(cc.Node)
    L_leg1: cc.Node = null;
    @property(cc.Node)
    L_leg2: cc.Node = null;
    @property(cc.Node)
    R_leg1: cc.Node = null;
    @property(cc.Node)
    R_leg2: cc.Node = null;
    @property(cc.Node)
    body: cc.Node = null;

    //playerSpeed: number = 1000;
    playerSpeed: number = 4000 + 600;
    //playerSpeed: number = 120000;
    ll_flag: boolean = true;

    zDown: boolean = false; // key for player to go left

    xDown: boolean =false; // key for player to go right

    jDown: boolean =false; // key for player to shoot

    kDown: boolean =false; // key for player to jump

    sDown: boolean = false;
    dDown: boolean = false;

    isDead:boolean =false;

    //onGround:boolean = false;

    cDown:boolean = false;

    walk_angle = 0;

    onLoad () {


    }

    
    start() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }


    update() {
        //cc.log(this.node.position);
        this.playerMovement();
        //cc.log("diff: ",this.node.y - this.R_leg.y);
        if (this.node.y - this.R_leg.y < 41.5 && Global.onGround && !(this.xDown || this.zDown)) {
            //cc.log("modify: ", this.node.y - this.R_leg.y);
            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.getComponent(cc.RigidBody).linearVelocity.x, (this.node.y - this.R_leg.y) * 10);
        }
    }


    onKeyDown(event) {
        //cc.log("Key Down: " + event.keyCode);
        
        if(event.keyCode == cc.macro.KEY.x) {
            this.xDown = true;
            this.L_leg2.angle -= this.walk_angle;
            this.R_leg2.angle -= this.walk_angle;
        } else if (event.keyCode == cc.macro.KEY.z) {
            this.zDown = true;
            this.L_leg2.angle += this.walk_angle;
            this.R_leg2.angle += this.walk_angle;
        } else if (event.keyCode == cc.macro.KEY.c) {
            this.cDown = true;
            Global.onGround = false;
        } 
    }

    onKeyUp(event) {
        if(event.keyCode == cc.macro.KEY.x) {
            this.xDown = false;
            this.L_leg2.angle += this.walk_angle;
            this.R_leg2.angle += this.walk_angle;
        } else if (event.keyCode == cc.macro.KEY.z) {
            this.zDown = false;
            this.L_leg2.angle -= this.walk_angle;
            this.R_leg2.angle -= this.walk_angle;
        } else if (event.keyCode == cc.macro.KEY.c) {
            this.cDown = false;
            //this.R_leg2.angle = 0;
            /*this.body.getComponent(cc.RigidBody).fixedRotation = false;
            cc.log("up: " + this.body.getComponent(cc.RigidBody).fixedRotation);
            this.body.getComponent(cc.RigidBody).angularVelocity = 500;
            cc.log(this.body.getComponent(cc.RigidBody).angularVelocity);*/
        }
            
    }
    
    playerMovement() {
        //this.playerSpeed = 0;
        if (this.zDown || this.xDown) {
            cc.log("zDown");
            //var tempL = this.node.x -  this.L_leg.x;
            //var tempR = this.node.x -  this.R_leg.x;
            //cc.log ("L: head x:" + tempL);
            //cc.log ("R: head x:" + tempR);
            cc.log("H - L:");
            cc.log(this.node.x - this.L_leg.x);
            cc.log("R - H:");
            cc.log(this.R_leg.x - this.node.x);
            
            if ((this.node.x - this.L_leg.x > 0.5) && this.ll_flag && this.R_leg.x - this.L_leg.x > 15) {
            //if ((this.node.x - this.L_leg.x > 12) && this.ll_flag && this.R_leg.x - this.L_leg.x > 20) {
                cc.log("ll hit !!!!!!!!!!!!!!!!!!!");
                this.playerSpeed = -this.playerSpeed;
                this.node.scaleX *= -1;
                this.ll_flag = false;
            } else if ((this.node.x - this.R_leg.x > 0.5) && !this.ll_flag && this.L_leg.x - this.R_leg.x > 15) {
            //} else if ((this.node.x - this.R_leg.x > 12) && !this.ll_flag && this.L_leg.x - this.R_leg.x > 20) {
                cc.log("rr hit !!!!!!!!!!!!!!!!!!!");
                this.playerSpeed = -this.playerSpeed;
                this.node.scaleX *= -1;
                this.ll_flag = true;
            }
            //this.L_leg.getComponent(cc.RigidBody).linearVelocity = cc.v2(-this.playerSpeed, 0);
            //this.R_leg.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.playerSpeed, 0);
            
            this.L_leg.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(-this.playerSpeed, 0), true);
            this.R_leg.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(this.playerSpeed, 0), true);
        } 
        if (this.cDown) {
            cc.log("head: "+this.node.y);
            /*cc.log("angle: " +this.body.getComponent(cc.RigidBody).angularVelocity);
            //this.body.getComponent(cc.RigidBody).fixedRotation = true;
            this.body.getComponent(cc.RigidBody).angularVelocity = 0;
            cc.log("after: " + this.body.getComponent(cc.RigidBody).angularVelocity);
            this.body.getComponent(cc.RevoluteJoint).collideConnected = true;
            cc.log(this.body.angle);*/
            //if (this.R_leg2.angle < 5)
            //    this.R_leg2.angle = -30;
            //this.L_feet_force.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(-this.playerSpeed / 4, 0), true);
            //this.R_feet_force.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(-this.playerSpeed / 4, 0), true);
        }
        //window.Test_Body.linearVelocity = cc.v2(this.playerSpeed * dt,window.Test_Body.linearVelocity.y)
        //this.node.position.x += this.playerSpeed * dt;
        
    }  
    onBeginContact(contact, self, other) {
        var direction = contact.getWorldManifold().normal;
        if (other.node.name == "Ground") {
            cc.log("onGround");
        }
        //cc.log("contact other:"+ other.node.name);
        //cc.log("diff: ",self.node.y - other.node.y);
        
    }
}
