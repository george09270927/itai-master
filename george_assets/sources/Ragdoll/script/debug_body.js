

cc.Class({
    extends: cc.Component,

    properties: {
        
     playerSpeed:0,

     aDown: false, // key for player to go left

     dDown: false, // key for player to go right

     jDown: false, // key for player to shoot

     wDown: false, // key for player to jump

     isDead:false,

     onGround: false,

    },

    onLoad () {

        window.Test_Body = this.node.getComponent(cc.RigidBody);
        cc.director.getPhysicsManager().debugDrawFlags=1;

    },

    
    start() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },


    update(dt) {
        //cc.log(this.node.position);
        this.playerMovement(dt);
        
    },


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
    },

    onKeyUp(event) {
        if(event.keyCode == cc.macro.KEY.a)
            this.aDown = false;
        else if(event.keyCode == cc.macro.KEY.d)
            this.dDown = false;
        else if(event.keyCode == cc.macro.KEY.j)
            this.jDown = false;
        else if(event.keyCode == cc.macro.KEY.w)
            this.wDown = false;
    },
    
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
            this.hit_right_main = false;
            this.hit_left_main = false; 
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


        var callback1=cc.callFunc(()=>
        {
            cc.find("Character/R_Leg_02").getComponent(cc.RigidBody).getComponent(cc.RigidBody).linearVelocity = cc.v2(this.playerSpeed/5, 0);
            cc.find("Character/L_Leg_02").getComponent(cc.RigidBody).getComponent(cc.RigidBody).linearVelocity = cc.v2(-this.playerSpeed/5, 0);
            cc.log("111")
        });
        var callback2=cc.callFunc(()=>
        {
            cc.find("Character/L_Leg_02").getComponent(cc.RigidBody).getComponent(cc.RigidBody).linearVelocity = cc.v2(this.playerSpeed/5, 0);
            cc.find("Character/R_Leg_02").getComponent(cc.RigidBody).getComponent(cc.RigidBody).linearVelocity = cc.v2(-this.playerSpeed/5, 0);
        });

        if(this.playerSpeed!=0)
        {
            cc.log("wow")
            this.schedule(()=>{
               callback1
            },0.25);
            this.scheduleOnce(()=>{
                this.schedule(()=>{
                    callback2
                },0,25)
            },0,5);
        }
        else if(this.playerSpeed==0)
        {
            this.unschedule(callback1);
            this.unschedule(callback2);
        }
    }  ,


    jump() {
        this.onGround = false;

        // Method I: Apply Force to rigidbody
        //this.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(0, 150000), true);

        // Method II: Change velocity of rigidbody
        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 2000);
    }
});
