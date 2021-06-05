
const {ccclass, property} = cc._decorator;
export module Global {
    export let player1_getgun : boolean = false;
}
@ccclass
export default class debug_body extends cc.Component 
{

    @property(cc.Node)
    private camera: cc.Node = null;

    playerSpeed: number =0;

    aDown: boolean = false; // key for player to go left

    dDown: boolean =false; // key for player to go right

    sDown: boolean = false //key for player to go down

    jDown: boolean =false; // key for player to shoot

    wDown: boolean =false; // key for player to jump

    isDead:boolean =false;

    onGround:boolean = false;

    playerside: boolean = true;//true:right false:left

    private hitflag : boolean = false;

    hithand: number = 1;//true:right false:left


    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
    }

    
    start() {
        cc.director.getPhysicsManager().debugDrawFlags = 1;

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

    }


    update() {
        //cc.log(this.node.position);///
        this.playerMovement();
        //cc.log(this.node.scaleX);
        cc.log(Global.player1_getgun);
    }


    onKeyDown(event) {
        //cc.log("Key Down: " + event.keyCode);
        
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
            this.hitflag=false;
            this.hithand*=-1;
        }
            
            
        if(event.keyCode == cc.macro.KEY.w)
            this.wDown = false;
    }
    
    playerMovement() {
        this.playerSpeed = 0;
        if(this.aDown){
            this.playerSpeed = -300;
            //this.playerSpeed = -2000;
            //this.playerSpeed = -55000;
            //this.node.scaleX = -1;
            this.playerside = false;
        }
        else if(this.dDown){
            this.playerSpeed = 300;
            //this.playerSpeed = 2000;
            //this.playerSpeed = 55000;
            //this.node.scaleX = 1;
            this.playerside  = true;
        }


        //cc.find('small_sticker - 002_knee/0_Neck').getComponent(cc.RigidBody).fixedRotation = true;
        cc.find('small_sticker - 002_knee/0_Body_01').getComponent(cc.RigidBody).fixedRotation = true;
        cc.find('small_sticker - 002_knee/0_Body_02').getComponent(cc.RigidBody).fixedRotation = true;


        if(Global.player1_getgun==true)
        {

        }
        
        

        if(this.jDown&&this.hitflag==false&&Global.player1_getgun==false){
            this.shakeEffect(0.1);
            this.hitflag=true;
            //cc.log("wow")

            if(this.playerside==true)
            {
                //cc.find('small_sticker - 002_knee/0_Neck').getComponent(cc.RigidBody).fixedRotation = false;
                cc.find('small_sticker - 002_knee/0_Body_01').getComponent(cc.RigidBody).fixedRotation = false;
                cc.find('small_sticker - 002_knee/0_Body_02').getComponent(cc.RigidBody).fixedRotation = false;
                //cc.find('small_sticker - 002_knee/0_Body_02').getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(-2000, 0), true);

                if(this.hithand==1) 
                {
                    cc.find('small_sticker - 002_knee/0_R_Arm_02').getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(40000, 15000), true);
                    //cc.find('small_sticker - 002_knee/0_R_hand').getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(40000, 15000), true);
                }
                else cc.find('small_sticker - 002_knee/0_L_Arm_02').getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(40000, 15000), true);
                //this.playerSpeed = 2000;


                //cc.find('small_sticker - 002_knee/0_Body_01').getComponent(cc.RigidBody).fixedRotation = true;
                //cc.find('small_sticker - 002_knee/0_Body_02').getComponent(cc.RigidBody).fixedRotation = true;
            }
            else if(this.playerside==false)
            {


               // cc.find('small_sticker - 002_knee/0_Neck').getComponent(cc.RigidBody).fixedRotation = false;
                cc.find('small_sticker - 002_knee/0_Body_01').getComponent(cc.RigidBody).fixedRotation = false;
                cc.find('small_sticker - 002_knee/0_Body_02').getComponent(cc.RigidBody).fixedRotation = false;
                //cc.find('small_sticker - 002_knee/0_Body_02').getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(2000, 0), true);
                if(this.hithand==1)
                {
                    cc.find('small_sticker - 002_knee/0_R_Arm_02').getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(-40000, 15000), true);
                    //cc.find('small_sticker - 002_knee/0_R_hand').getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(-40000, 15000), true);
                }
                else cc.find('small_sticker - 002_knee/0_L_Arm_02').getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(-40000, 15000), true);
                //this.playerSpeed = -2000;


                //cc.find('small_sticker - 002_knee/0_Body_01').getComponent(cc.RigidBody).fixedRotation = true;
                //cc.find('small_sticker - 002_knee/0_Body_02').getComponent(cc.RigidBody).fixedRotation = true;
            }
        } 


        /*if(cc.find('small_sticker - 002_knee/0_Neck').angle<0)
        {
            cc.find('small_sticker - 002_knee/0_Neck').angle++;
        }
        else if(cc.find('small_sticker - 002_knee/0_Neck').angle>0)
        {
            cc.find('small_sticker - 002_knee/0_Neck').angle--;
        }*/
        if(cc.find('small_sticker - 002_knee/0_Body_01').angle<0)
        {
            cc.find('small_sticker - 002_knee/0_Body_01').angle++;
        }
        else if(cc.find('small_sticker - 002_knee/0_Body_01').angle>0)
        {
            cc.find('small_sticker - 002_knee/0_Body_01').angle--;
        }
        if(cc.find('small_sticker - 002_knee/0_Body_02').angle<0)
        {
            cc.find('small_sticker - 002_knee/0_Body_02').angle++;
        }
        else if(cc.find('small_sticker - 002_knee/0_Body_02').angle>0)
        {
            cc.find('small_sticker - 002_knee/0_Body_02').angle--;
        }



        
        //window.Test_Body.linearVelocity = cc.v2(this.playerSpeed * dt,window.Test_Body.linearVelocity.y)
        //this.node.position.x += this.playerSpeed * dt;
        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.playerSpeed,0);
        
        //this.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(this.playerSpeed, 0), true);
        if(this.wDown )
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
        //cc.log("jump ss############");
    }





    shakeEffect(du) {
        this.camera.runAction(
            cc.repeatForever(
                cc.sequence(
                    cc.moveTo(0.02, cc.v2(5, 7)),
                    cc.moveTo(0.02, cc.v2(-6, 7)),
                    cc.moveTo(0.02, cc.v2(-13, 3)),
                    cc.moveTo(0.02, cc.v2(3, -6)),
                    cc.moveTo(0.02, cc.v2(-5, 5))
                    /*,
                    /*
                    cc.moveTo(0.02, cc.v2(2, -8)),
                    cc.moveTo(0.02, cc.v2(-8, -10)),
                    cc.moveTo(0.02, cc.v2(3, 10)),
                    cc.moveTo(0.02, cc.v2(0, 0))
                    */
                )
            )
        );

        this.scheduleOnce(() => {
            this.camera.stopAllActions();
            this.camera.setPosition(0,0);
        }, du);
    }

    
}


