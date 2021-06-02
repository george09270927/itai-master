
const {ccclass, property} = cc._decorator;

@ccclass
export default class debug_body extends cc.Component 
{

    playerSpeed: number =0;

    zDown: boolean = false; // key for player to go left

    xDown: boolean =false; // key for player to go right

    jDown: boolean =false; // key for player to shoot

    kDown: boolean =false; // key for player to jump

    isDead:boolean =false;

    onGround:boolean = false;

    onLoad () {

        cc.director.getPhysicsManager().enabled = true;
    }

    
    start() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }


    update() {
        //cc.log(this.node.position);///
        this.playerMovement();
    }


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
    }

    onKeyUp(event) {
        if(event.keyCode == cc.macro.KEY.z)
            this.zDown = false;
        else if(event.keyCode == cc.macro.KEY.x)
            this.xDown = false;
        else if(event.keyCode == cc.macro.KEY.j)
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
        if(this.kDown )
        { 
            this.jump();
        }
    }  


    jump() {
        this.onGround = false;

        // Method I: Apply Force to rigidbody
        //this.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(0, 150000), true);

        // Method II: Change velocity of rigidbody
        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.getComponent(cc.RigidBody).linearVelocity.x, 600);
        cc.log("jump ss############");
    }
}


