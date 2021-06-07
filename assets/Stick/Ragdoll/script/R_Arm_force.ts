import { Global } from "./Leg_force";


const {ccclass, property} = cc._decorator;

@ccclass
export default class R_Arm_force extends cc.Component {

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


    hitflag: boolean = false;

    playerangel1: number  = 0;
    playerangel2: number  = 0;
    playerangel3: number  = 0;

    onLoad () {

    }

    
    start() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }


    update() {
        //cc.log(this.node.position);
        if(Global.player1_dead==false)this.playerMovement();
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
            //this.getComponent(cc.RigidBody).angularDamping = 0;
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
        if(event.keyCode == cc.macro.KEY.s) {
            this.sDown = false;
            //this.getComponent(cc.RigidBody).angularDamping = 100000;
        }
        if(event.keyCode == cc.macro.KEY.j)
        {
            this.jDown = false;
            this.hitflag= false;
            this.hithand*=-1;
        }
            
            
        if(event.keyCode == cc.macro.KEY.w)
            this.wDown = false;
    }
    
    playerMovement() {
        //this.playerangel=0;
        if(this.dDown)
        {
            this.playerside=true;
        }
        else if (this.aDown)
        {
            this.playerside = false;
        }

        if(Global.player1_getgun==false)
        {



            if (this.jDown){

                //cc.log("jDown");
                if(this.playerside==true)
                {
                    if(this.hithand==1)
                    {
                        //cc.find('small_sticker - 002_knee/0_R_Arm_01').angle =100;
                        this.playerangel1 = 100;
                        //this.node.angle = 130;

                        this.playerangel2 = 160;
                        //this.playerangel3 = 160;

                        //cc.log("rightside R_arm");
                    }
                    
                    
                    else 
                    {
                        //cc.find('small_sticker - 002_knee/0_R_Arm_01').angle =-50;
                        //this.node.angle = 130;

                        this.playerangel1 = -100;
                        this.playerangel2 = 80;
                        //this.playerangel3 = 80;
                    }
                    
                    
                    

                }
                else if(this.playerside ==false)
                {
                    if(this.hithand==1)
                    {
                        //cc.find('small_sticker - 002_knee/0_R_Arm_01').angle =-100;
                        this.playerangel1 =-100;
                        //this.node.angle = -130;

                        this.playerangel2 = -160;
                        //this.playerangel3 = -160;


                        //cc.log("leftside R_arm")
                    }
                    
                    
                    else 
                    {
                        //cc.find('small_sticker - 002_knee/0_R_Arm_01').angle =50;
                        //this.node.angle = -130;


                        this.playerangel1 = 100;
                        this.playerangel2 = -80;
                        //this.playerangel3 = -80;
                    }
                    
                    
                    
                }
                this.hitflag = true;
            }
            else 
            {
                //if(this.playerside==true) cc.find('small_sticker - 002_knee/0_R_Arm_01').angle =15;
                //else if(this.playerside==false) cc.find('small_sticker - 002_knee/0_R_Arm_01').angle =-15;
                //this.node.angle=0;
            }
            
            //window.Test_Body.linearVelocity = cc.v2(this.playerSpeed * dt,window.Test_Body.linearVelocity.y)
            //this.node.position.x += this.playerSpeed * dt;
            //this.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(this.playerSpeed, 0), true);
            //this.getComponent(cc.RigidBody).applyTorque(this.playerSpeed,true);
            //this.getComponent(cc.RigidBody).angularVelocity=this.playerSpeed;
            //this.getComponent(cc.RigidBody).applyAngularImpulse(this.playerSpeed,true);


            if(this.playerangel1<0)
            {
                this.playerangel1++;
            }
            else if(this.playerangel1>0)
            {
                this.playerangel1--;
            }


            if(this.playerangel2<0)
            {
                this.playerangel2++;
            }
            else if(this.playerangel2>0)
            {
                this.playerangel2--;
            }

            /*
            if(this.playerangel3<0)
            {
                this.playerangel3++;
            }
            else if(this.playerangel3>0)
            {
                this.playerangel3--;
            }
            */
            
            if (!this.sDown) cc.find('small_sticker - 002_knee/0_R_Arm_01').angle = this.playerangel1;
            if (!this.sDown) this.node.angle = this.playerangel2;

            //cc.find('small_sticker - 002_knee/0_R_hand').angle = this.playerangel3;
        }


        else if(Global.player1_getgun==true)
        {
            if(this.playerside==true)
            {
                this.playerangel1 = 90;
                this.playerangel2 = 120;
            }
            else if(this.playerside ==false)
            {
                this.playerangel1 =-90;
                this.playerangel2 = -120;           
            }
            cc.find('small_sticker - 002_knee/0_R_Arm_01').angle = this.playerangel1;
            this.node.angle = this.playerangel2;
        }

        
    }  
    onBeginContact(contact, self, other) {
        var direction = contact.getWorldManifold().normal;
        if (other.node.name == "Ground") {
            this.onGround = true;
            //cc.log("onGround");
        }
        
    }
    
}
