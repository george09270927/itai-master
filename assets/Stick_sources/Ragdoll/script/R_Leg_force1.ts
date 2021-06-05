

const {ccclass, property} = cc._decorator;

@ccclass
export default class R_Leg_force extends cc.Component {

    playerSpeed: number =0;

    zDown: boolean = false; // key for player to go left

    xDown: boolean =false; // key for player to go right

    jDown: boolean =false; // key for player to shoot

    kDown: boolean =false; // key for player to jump

    sDown: boolean = false;
    dDown: boolean = false;

    isDead:boolean =false;

    onGround:boolean = false;

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
        //cc.log("Key Down: " + event.keyCode);
        
        if(event.keyCode == cc.macro.KEY.d) {
            this.dDown = true;
            this.onGround = false;
        } else if (event.keyCode == cc.macro.KEY.s) {
            this.sDown = true;
            this.onGround = false;
        }
    }

    onKeyUp(event) {
        if(event.keyCode == cc.macro.KEY.d)
            this.dDown = false;
        else if (event.keyCode == cc.macro.KEY.s)
            this.sDown = false;
    }
    
    playerMovement() {
        this.playerSpeed = 0;
        if(this.dDown){
            //cc.log("dDown");
            this.playerSpeed = 3000;
            //this.playerSpeed = 10000;       // cool broken version
            //this.playerSpeed = 150000;
            this.node.scaleX = 1;
        } else if (this.sDown){
            //cc.log("sDown");
            this.playerSpeed = -3000;
            //this.playerSpeed = -10000;      // cool broken version
            //this.playerSpeed = -150000;
            this.node.scaleX = 1;
        }
        
        //window.Test_Body.linearVelocity = cc.v2(this.playerSpeed * dt,window.Test_Body.linearVelocity.y)
        //this.node.position.x += this.playerSpeed * dt;
        this.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(this.playerSpeed, 0), true);
    }  
    onBeginContact(contact, self, other) {
        var direction = contact.getWorldManifold().normal;
        if (other.node.name == "Ground") {
            this.onGround = true;
            cc.log("onGround");
        }
        
    }
    
}
