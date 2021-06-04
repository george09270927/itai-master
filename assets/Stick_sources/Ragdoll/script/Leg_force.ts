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
    playerSpeed: number = 4000;
    //playerSpeed: number = 120000;
    ll_flag: boolean = true;

    aDown: boolean = false; // key for player to go left

    dDown: boolean =false; // key for player to go right

    jDown: boolean =false; // key for player to shoot

    kDown: boolean =false; // key for player to jump


    isDead:boolean =false;

    onGround:boolean = false;

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
    }


    onKeyDown(event) {
        cc.log("Key Down: " + event.keyCode);
        
        if(event.keyCode == cc.macro.KEY.d) {
            this.dDown = true;
            this.onGround = false;
            this.L_leg2.angle -= this.walk_angle;
            this.R_leg2.angle -= this.walk_angle;
        } else if (event.keyCode == cc.macro.KEY.a) {
            this.aDown = true;
            this.onGround = false;
            this.L_leg2.angle += this.walk_angle;
            this.R_leg2.angle += this.walk_angle;
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
        } 
            
    }
    
    playerMovement() {
        //this.playerSpeed = 0;
        if (this.aDown || this.dDown) {
            cc.log("aDown");
            //var tempL = this.node.x -  this.L_leg.x;
            //var tempR = this.node.x -  this.R_leg.x;
            //cc.log ("L: head x:" + tempL);
            //cc.log ("R: head x:" + tempR);
            //cc.log("H - L:");
            //cc.log(this.node.x - this.L_leg.x);
            //cc.log("R - H:");
            //cc.log(this.R_leg.x - this.node.x);
            
            //if ((this.node.x - this.L_leg.x > 120 || this.R_leg.x - this.node.x > 160) && this.ll_flag) {
            //if ((this.node.x - this.L_leg.x > 6.5 || this.R_leg.x - this.node.x > 8.8) && this.ll_flag) {
            if ((this.node.x - this.L_leg.x > 12) && this.ll_flag && this.R_leg.x - this.L_leg.x > 20) {
                cc.log("ll hit !!!!!!!!!!!!!!!!!!!");
                this.playerSpeed = -this.playerSpeed;
                this.node.scaleX *= -1;
                this.ll_flag = false;
            } else if ((this.node.x - this.R_leg.x > 12) && !this.ll_flag && this.L_leg.x - this.R_leg.x > 20) {
            //} else if ((this.node.x - this.R_leg.x > 6.5 || this.L_leg.x - this.node.x > 8.8) && !this.ll_flag) {
            //} else if ((this.node.x - this.R_leg.x > 120 || this.L_leg.x - this.node.x > 160) && !this.ll_flag) {
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

        
    }  
    onBeginContact(contact, self, other) {
        var direction = contact.getWorldManifold().normal;
        if (other.node.name == "Ground") {
            this.onGround = true;
            cc.log("onGround");
        }
        
    }
}
