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
export default class NewClass extends cc.Component {


    private playerSpeed: number = 0;

    private aDown:boolean =  false; // key for player to go left

    private dDown:boolean = false; // key for player to go right

    private jDown:boolean = false; // key for player to shoot

    private wDown:boolean = false; // key for player to jump

    private isDead:boolean =false;

    private onGround: boolean =false;

    private callback1;

    private callback2;

    onLoad () {
        cc.director.getPhysicsManager().debugDrawFlags=1;

    }

    
    start() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }


    update(dt) {
        //cc.log(this.node.position);
        this.playerMovement(dt);
        
    }


    onKeyDown(event) {
        cc.log("Key Down: " + event.keyCode);
        
        if(event.keyCode == cc.macro.KEY.a) {
            this.aDown = true;
            this.dDown = false;
        } else if(event.keyCode == cc.macro.KEY.d) {
            this.dDown = true;
            this.aDown = false;
        } else if(event.keyCode == cc.macro.KEY.w) {
            this.wDown = true;
        } 
    }

    onKeyUp(event) {
        if(event.keyCode == cc.macro.KEY.a)
            this.aDown = false;
        else if(event.keyCode == cc.macro.KEY.d)
            this.dDown = false;
        else if(event.keyCode == cc.macro.KEY.j)
            this.jDown = false;
        else if(event.keyCode == cc.macro.KEY.w)
            this.wDown = false;
    }
    
    playerMovement(dt) {
        this.playerSpeed = 0;
        if(this.aDown){
            this.playerSpeed = -10000;
            this.node.scaleX = -1;
        }
        else if(this.dDown){
            this.playerSpeed = 10000;
            this.node.scaleX = 1;
        }
        
        if(this.wDown )
        {
            this.jump();
        }
        //this.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.playerSpeed * dt,this.getComponent(cc.RigidBody).linearVelocity.y)
        this.node.x += this.playerSpeed * dt ;
        if(this. node.y < -1400) 
        {
            //this.node.y = -900;
            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.playerSpeed*dt, 1000);
        }
        //this.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(this.playerSpeed, 0), true);
        //cc.log(this.node.y);


        this.callback1=function()
        {
            cc.find("Character/R_Leg_02").getComponent(cc.RigidBody).getComponent(cc.RigidBody).linearVelocity = cc.v2(this.playerSpeed/5, 0);
            cc.find("Character/L_Leg_02").getComponent(cc.RigidBody).getComponent(cc.RigidBody).linearVelocity = cc.v2(-this.playerSpeed/5, 0);
            cc.log("111")
        }
        this.callback2 = function()
        {
            cc.find("Character/L_Leg_02").getComponent(cc.RigidBody).getComponent(cc.RigidBody).linearVelocity = cc.v2(this.playerSpeed/5, 0);
            cc.find("Character/R_Leg_02").getComponent(cc.RigidBody).getComponent(cc.RigidBody).linearVelocity = cc.v2(-this.playerSpeed/5, 0);
        }

        if(this.playerSpeed!=0)
        {
            cc.log("wow")
            this.schedule(()=>{
               this.callback1
            },0.25);
            this.scheduleOnce(()=>{
                this.schedule(()=>{
                    this.callback2
                },0,25)
            },0.5);
        }
        else if(this.playerSpeed==0)
        {
            this.unschedule(this.callback1);
            this.unschedule(this.callback2);
        }
    }  


    jump() {
        this.onGround = false;

        // Method I: Apply Force to rigidbody
        //this.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(0, 150000), true);

        // Method II: Change velocity of rigidbody
        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 2000);
    }
}
