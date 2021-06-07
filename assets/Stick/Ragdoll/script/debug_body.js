

cc.Class({
    extends: cc.Component,

    properties: {
        
     playerSpeed:0,

     zDown: false, // key for player to go left

     xDown: false, // key for player to go right

     jDown: false, // key for player to shoot

     kDown: false, // key for player to jump

     isDead:false,

     onGround: false,
    },

    onLoad () {

        cc.director.getPhysicsManager().enabled = true;
        window.Test_Body = this.node.getComponent(cc.RigidBody);

    },

    
    start() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },


    update() {
        //cc.log(this.node.position);///
        this.playerMovement();
    },


    onKeyDown(event) {
        cc.log("Key Down: " + event.keyCode);
        
        if(event.keyCode == cc.macro.KEY.z) {
            this.zDown = true;
            this.xDown = false;
        } else if(event.keyCode == cc.macro.KEY.x) {
            this.xDown = true;
            this.zDown = false;
        } else if(event.keyCode == cc.macro.KEY.k) {
            this.kDown = true;
        } 
    },

    onKeyUp(event) {
        if(event.keyCode == cc.macro.KEY.z)
            this.zDown = false;
        else if(event.keyCode == cc.macro.KEY.x)
            this.xDown = false;
        else if(event.keyCode == cc.macro.KEY.j)
            this.jDown = false;
        else if(event.keyCode == cc.macro.KEY.k)
            this.kDown = false;
    },
    
    playerMovement(dt) {
        this.playerSpeed = 0;
        if(this.zDown){
            this.playerSpeed = -150000;
            this.node.scaleX = -1;
        }
        else if(this.xDown){
            this.playerSpeed = 150000;
            this.node.scaleX = 1;
        }
        
        if(this.kDown )
        {
            this.hit_right_main = false;
            this.hit_left_main = false; 
            this.jump();
        }
        //window.Test_Body.linearVelocity = cc.v2(this.playerSpeed * dt,window.Test_Body.linearVelocity.y)
        //this.node.position.x += this.playerSpeed * dt;
        this.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(this.playerSpeed, 0), true);
    }  ,


    jump() {
        this.onGround = false;

        // Method I: Apply Force to rigidbody
        //this.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(0, 150000), true);

        // Method II: Change velocity of rigidbody
        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 320);
    }
});
