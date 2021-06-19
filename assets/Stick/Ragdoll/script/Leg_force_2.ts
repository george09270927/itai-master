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
    export let player2_getgun : boolean = false;
    export let player2_dead: boolean = false;
    export let player2_percent: number = 0;
    export let player2_dead_bound: number = 0;
    export let onWalk_range: boolean = false;
}

@ccclass
export default class Leg_force_2 extends cc.Component {
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
    private laseroffset: number = 100;

    localConvertWorldPointAR(node) {
        if (node) {
            return node.convertToWorldSpaceAR(cc.v2(0, 0));
        }
        return null;
    }
    

    StartDetect () {
        //cc.log("---touchStart---");
        //获得触摸点本地坐标位置
        let p1 = this.localConvertWorldPointAR(this.node);
        //cc.log("p1: " + p1);
        let angle = this.node.angle;
        //cc.log("angle: "+angle);
        let height = p1.y + this.laseroffset;
        //cc.log("h: " + height);
        //cc.log("tan: "+ Math.tan(angle* Math.PI /180));
        let bottom_offset = height * Math.tan(angle *Math.PI /180);
        //cc.log("bottom length: "+ bottom_offset);
        
        
        //射线测试结束点位置 預設結束的位置要超過floor
        let p2 = cc.v2(p1.x+bottom_offset, 0-this.laseroffset) 
        //cc.log("p2: " + p2);
        this.rayTest(p1, p2)
    }
    rayTest (p1, p2) {

        //cc.log("in ratTest");
        var results = cc.director.getPhysicsManager().rayCast(p1, p2, cc.RayCastType.AllClosest);
        var temp_min = 1000;
        for (var i = 0; i < results.length; i++) {
            //两点之间检测出来的点的数组
            var result = results[i];
            //射线穿过的是哪一个碰撞体。
            var collider = result.collider;
            //cc.log(collider);
            
            if(collider.node.name == "platform") {
                var diff = p1.y - result.point.y;
                if (diff < temp_min) temp_min = diff;
            } 
        }
        if (temp_min < 60) {
            //cc.log("modify", (temp_min));
            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.getComponent(cc.RigidBody).linearVelocity.x, (temp_min) * 15);
        }
        if (temp_min < 63) Global.onWalk_range = true;
        else Global.onWalk_range = false;
    }
    onLoad () {


    }

    
    start() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }


    update() {
        
        if(Global.player2_dead==false)
        {
            this.StartDetect();
            //cc.log(this.node.position);
            this.playerMovement();
            
            if (Global.onWall == 0) {
                this.R_leg1.getComponent(cc.RigidBody).fixedRotation = false;
                this.L_leg1.getComponent(cc.RigidBody).fixedRotation = false;
            } else if (Global.onWall == 1) {
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
    }


    onKeyDown(event) {
        //cc.log("Key Down: " + event.keyCode);
        if(Global.player2_dead==false)
        {
        
            if(event.keyCode == cc.macro.KEY.right) {
                this.dDown = true;
                this.L_leg2.angle -= this.walk_angle;
                this.R_leg2.angle -= this.walk_angle;
            } else if (event.keyCode == cc.macro.KEY.left) {
                this.aDown = true;
                this.L_leg2.angle += this.walk_angle;
                this.R_leg2.angle += this.walk_angle;
            } else if (event.keyCode == cc.macro.KEY.down) {
                this.sDown = true;
                Global.onGround = false;
            } 

        }
    }

    onKeyUp(event) {
        if(Global.player2_dead==false)
        {

        
            if(event.keyCode == cc.macro.KEY.right) {
                this.dDown = false;
                this.L_leg2.angle += this.walk_angle;
                this.R_leg2.angle += this.walk_angle;
            } else if (event.keyCode == cc.macro.KEY.left) {
                this.aDown = false;
                this.L_leg2.angle -= this.walk_angle;
                this.R_leg2.angle -= this.walk_angle;
            } else if (event.keyCode == cc.macro.KEY.down) {
                Global.onGround = true;
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
            //cc.log("onGround");
        }
        //cc.log("contact other:"+ other.node.name);
        //cc.log("diff: ",self.node.y - other.node.y);
        
    }
}
