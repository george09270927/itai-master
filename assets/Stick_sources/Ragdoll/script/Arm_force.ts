

const {ccclass, property} = cc._decorator;

@ccclass
export default class Arm_force extends cc.Component {

    playerSpeed: number =0;

    aDown: boolean = false; // key for player to go left

    dDown: boolean =false; // key for player to go right

    sDown: boolean = false //key for player to go down

    jDown: boolean =false; // key for player to shoot

    wDown: boolean =false; // key for player to jump


    isDead:boolean =false;

    onGround:boolean = false;


    playerside: boolean = true;//true:right false:left

    hithand: number = 1;//true:right false:left

    onLoad () {

    }

    
    start() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.schedule(()=>{this.hithand *= -1},0.5);
    }


    update() {
        //cc.log(this.node.position);
        this.playerMovement();
    }


    onKeyDown(event) {
        cc.log("Key Down: " + event.keyCode);
        
        if(event.keyCode == cc.macro.KEY.a) {
            this.aDown = true;
            this.dDown = false;
        } else if(event.keyCode == cc.macro.KEY.d) {
            this.dDown = true;
            this.aDown = false;
        } else if(event.keyCode == cc.macro.KEY.s) {
            this.sDown = true;
        }
        if(event.keyCode == cc.macro.KEY.j) {
            this.jDown = true;
        } 
        
        if(event.keyCode == cc.macro.KEY.w) {
            this.wDown = true;
        } 

    }

    onKeyUp(event) {
        if(event.keyCode == cc.macro.KEY.a)
            this.aDown = false;
        if(event.keyCode == cc.macro.KEY.d)
            this.dDown = false;
        if(event.keyCode == cc.macro.KEY.s)
            this.sDown = false;
        if(event.keyCode == cc.macro.KEY.j)
        {
            this.jDown = false;
        }
            
            
        if(event.keyCode == cc.macro.KEY.w)
            this.wDown = false;
    }
    
    playerMovement() {
        this.playerSpeed = 0;
        if(this.dDown)
        {
            this.playerside=true;
        }
        else if (this.aDown)
        {
            this.playerside = false;
        }
        if (this.jDown){

            cc.log("jDown");
            if(this.playerside==true)
            {
                if(this.hithand==1)
                {
                    if(this.node.name=='0_R_Arm_02')
                    {
                        this.playerSpeed = 3000;
                        cc.log("rightside R_arm")
                    }
                    else if(this.node.name == '0_L_Arm_02')
                    {
                        this.playerSpeed = 0;
                    }
                }
                else if(this.hithand==-1)
                {
                    if(this.node.name == '0_L_Arm_02')
                    {
                        this.playerSpeed = 3000;
                        cc.log("rightside L_arm")
                    }
                }
            }
            else if(this.playerside ==false)
            {
                if(this.hithand==1)
                {
                    if(this.node.name=='0_R_Arm_02')
                    {
                        this.playerSpeed = -3000;
                        cc.log("leftside R_arm")
                    }
                }
                else if(this.hithand==-1)
                {
                    if(this.node.name == '0_L_Arm_02')
                    {
                        this.playerSpeed = -3000;
                        cc.log("leftside L_arm")
                    }
                }
            }
            
        }
        
        //window.Test_Body.linearVelocity = cc.v2(this.playerSpeed * dt,window.Test_Body.linearVelocity.y)
        //this.node.position.x += this.playerSpeed * dt;
        //this.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(this.playerSpeed, 0), true);
        this.getComponent(cc.RigidBody).applyTorque(this.playerSpeed,true);
    }  
    onBeginContact(contact, self, other) {
        var direction = contact.getWorldManifold().normal;
        if (other.node.name == "Ground") {
            this.onGround = true;
            cc.log("onGround");
        }
        
    }
    
}
