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
    export let onWall : number = 0;
    export let head_contact : boolean = false;
    export let player1_getgun : boolean = false;
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
    body1: cc.Node = null;
    @property(cc.Node)
    body2: cc.Node = null;
    @property(cc.Node)
    head: cc.Node = null;
    @property(cc.Node)
    neck: cc.Node = null;
    @property(cc.Node)
    L_arm1: cc.Node = null;
    @property(cc.Node)
    L_arm2: cc.Node = null;
    @property(cc.Node)
    R_arm1: cc.Node = null;
    @property(cc.Node)
    R_arm2: cc.Node = null;

    //playerSpeed: number = 1000;
    playerSpeed: number = 4000 + 600;
    //playerSpeed: number = 120000;
    ll_flag: boolean = true;

    aDown: boolean = false; // key for player to go left

    dDown: boolean =false; // key for player to go right

    jDown: boolean =false; // key for player to shoot

    kDown: boolean =false; // key for player to jump


    isDead:boolean =false;

    //onGround:boolean = false;

    sDown:boolean = false;

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
        if (this.node.y - this.R_leg.y < 41.5 && Global.onGround && !(this.dDown || this.aDown)) {
            //cc.log("modify: ", this.node.y - this.R_leg.y);
            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.getComponent(cc.RigidBody).linearVelocity.x, (this.node.y - this.R_leg.y) * 10);
        }
        if (Global.onWall == 0) {
            this.R_leg1.getComponent(cc.RigidBody).fixedRotation = false;
            this.L_leg1.getComponent(cc.RigidBody).fixedRotation = false;
        } else if (Global.onWall == 1) {
            cc.log("LEFT!!!");
            this.R_leg1.angle = 60;
            this.L_leg1.angle = 0;

            this.R_leg1.getComponent(cc.RigidBody).fixedRotation = true;
            this.L_leg1.getComponent(cc.RigidBody).fixedRotation = true;
        } else if (Global.onWall == 2) {
            this.R_leg1.angle = 0;
            this.L_leg1.angle = -60;

            this.R_leg1.getComponent(cc.RigidBody).fixedRotation = true;
            this.L_leg1.getComponent(cc.RigidBody).fixedRotation = true;
        }
    }


    onKeyDown(event) {
        //cc.log("Key Down: " + event.keyCode);
        
        if(event.keyCode == cc.macro.KEY.d) {
            this.dDown = true;
            this.L_leg2.angle -= this.walk_angle;
            this.R_leg2.angle -= this.walk_angle;
        } else if (event.keyCode == cc.macro.KEY.a) {
            this.aDown = true;
            this.L_leg2.angle += this.walk_angle;
            this.R_leg2.angle += this.walk_angle;
        } else if (event.keyCode == cc.macro.KEY.s) {
            this.sDown = true;
            Global.onGround = false;
        } 
    }

    onKeyUp(event) {
        if(event.keyCode == cc.macro.KEY.d) {
            this.dDown = false;
            this.L_leg2.angle += this.walk_angle;
            this.R_leg2.angle += this.walk_angle;
        } else if (event.keyCode == cc.macro.KEY.a) {
            this.aDown = false;
            this.L_leg2.angle -= this.walk_angle;
            this.R_leg2.angle -= this.walk_angle;
        } else if (event.keyCode == cc.macro.KEY.s) {
            this.sDown = false;
            this.body1.angle = 0;
            this.body2.angle = 0;
            this.head.angle = 0;
            this.neck.angle = 0;
            this.L_arm1.angle = 0;
            this.R_arm1.angle = 0;
            this.L_leg1.angle = 0;
            this.R_leg1.angle = 0;
            this.body1.getComponent(cc.RigidBody).fixedRotation = true;
            this.body2.getComponent(cc.RigidBody).fixedRotation = true;
            this.head.getComponent(cc.RigidBody).fixedRotation = true;
            this.neck.getComponent(cc.RigidBody).fixedRotation = true;
            this.L_arm1.getComponent(cc.RevoluteJoint).enableLimit = true;
            this.R_arm1.getComponent(cc.RevoluteJoint).enableLimit = true;
            this.L_arm2.getComponent(cc.RevoluteJoint).enableLimit = true;
            this.R_arm2.getComponent(cc.RevoluteJoint).enableLimit = true;
            this.head.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(0, this.playerSpeed * 15), true);
            this.L_leg.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(-this.playerSpeed * 2, 0), true);
            this.R_leg.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(this.playerSpeed * 2, 0), true);
            
            //this.R_leg2.angle = 0;
            /*this.body.getComponent(cc.RigidBody).fixedRotation = false;
            cc.log("up: " + this.body.getComponent(cc.RigidBody).fixedRotation);
            this.body.getComponent(cc.RigidBody).angularVelocity = 500;
            cc.log(this.body.getComponent(cc.RigidBody).angularVelocity);*/
        }
            
    }
    
    playerMovement() {
        //this.playerSpeed = 0;
        if ((this.aDown || this.dDown) && !Global.onWall) {
            //cc.log("zDown");
            //var tempL = this.node.x -  this.L_leg.x;
            //var tempR = this.node.x -  this.R_leg.x;
            //cc.log ("L: head x:" + tempL);
            //cc.log ("R: head x:" + tempR);
            /*cc.log("H - L:");
            cc.log(this.node.x - this.L_leg.x);
            cc.log("R - H:");
            cc.log(this.R_leg.x - this.node.x);*/
            
            if ((this.node.x - this.L_leg.x > 0.5) && this.ll_flag && this.R_leg.x - this.L_leg.x > 15) {
            //if ((this.node.x - this.L_leg.x > 12) && this.ll_flag && this.R_leg.x - this.L_leg.x > 20) {
                //cc.log("ll hit !!!!!!!!!!!!!!!!!!!");
                this.playerSpeed = -this.playerSpeed;
                this.node.scaleX *= -1;
                this.ll_flag = false;
            } else if ((this.node.x - this.R_leg.x > 0.5) && !this.ll_flag && this.L_leg.x - this.R_leg.x > 15) {
            //} else if ((this.node.x - this.R_leg.x > 12) && !this.ll_flag && this.L_leg.x - this.R_leg.x > 20) {
                //cc.log("rr hit !!!!!!!!!!!!!!!!!!!");
                this.playerSpeed = -this.playerSpeed;
                this.node.scaleX *= -1;
                this.ll_flag = true;
            }
            //this.L_leg.getComponent(cc.RigidBody).linearVelocity = cc.v2(-this.playerSpeed, 0);
            //this.R_leg.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.playerSpeed, 0);
            
            this.L_leg.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(-this.playerSpeed, 0), true);
            this.R_leg.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(this.playerSpeed, 0), true);
        } 
        if (this.sDown) {
            cc.log("head: "+this.node.y);
            this.L_leg.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(-5000, 0), true);
            this.R_leg.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(5000, 0), true);
            this.head.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(0, -5000), true);
            //this.body.angle = 90;
            //this.L_arm1.angle = 60;
            //this.R_arm1.angle = -60;
            this.L_arm1.getComponent(cc.RevoluteJoint).enableLimit = false;
            this.R_arm1.getComponent(cc.RevoluteJoint).enableLimit = false;
            this.L_arm2.getComponent(cc.RevoluteJoint).enableLimit = false;
            this.R_arm2.getComponent(cc.RevoluteJoint).enableLimit = false;
            this.L_arm1.angle = 90;
            this.R_arm1.angle = -90;
            //this.L_arm2.angle = 90;
            //this.R_arm2.angle = -90;
            this.body1.getComponent(cc.RigidBody).fixedRotation = false;
            this.body2.getComponent(cc.RigidBody).fixedRotation = false;
            //this.head.getComponent(cc.RigidBody).fixedRotation = false;
            //this.neck.getComponent(cc.RigidBody).fixedRotation = false;
            this.body2.getComponent(cc.RigidBody).applyTorque(1, true);
            this.L_leg2.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(0, -5000), true);
            this.R_leg2.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(0, -5000), true);
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
