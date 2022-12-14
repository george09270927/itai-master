import { Global } from "./Leg_force_2";


const {ccclass, property} = cc._decorator;

@ccclass
export default class L_Arm_force_2 extends cc.Component {

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


    playerangel1:number = 0;//arm01
    playerangel2:number = 0;//arm02

    onLoad () {

    }

    
    start() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }


    update() {
        //cc.log(this.node.position);
        if(Global.player2_dead==false)this.playerMovement();
    }


    onKeyDown(event) {
        //cc.log("Key Down: " + event.keyCode);
        
        if(event.keyCode == cc.macro.KEY.left) {
            this.aDown = true;
            this.dDown = false;
        } else if(event.keyCode == cc.macro.KEY.right) {
            this.dDown = true;
            this.aDown = false;
        } else if(event.keyCode == cc.macro.KEY.down) {
            this.sDown = true;
        }
        if(event.keyCode == cc.macro.KEY.p) {
            this.jDown = true;
        } 
        
        if(event.keyCode == cc.macro.KEY.up) {
            this.wDown = true;
        } 

    }

    onKeyUp(event) {
        if(event.keyCode == cc.macro.KEY.left)
            this.aDown = false;
        if(event.keyCode == cc.macro.KEY.right)
            this.dDown = false;
        if(event.keyCode == cc.macro.KEY.down) {
            this.sDown = false;
        }
        if(event.keyCode == cc.macro.KEY.p)
        {
            this.jDown = false;
            this.hithand*=-1;
        }
            
            
        if(event.keyCode == cc.macro.KEY.up)
            this.wDown = false;
    }
    
    playerMovement() {
        //this.playerangel = 0;
        if(this.dDown)
        {
            this.playerside=true;
        }
        else if (this.aDown)
        {
            this.playerside = false;
        }

        if(Global.player2_getgun==false)
        {

        if (this.jDown){

                //cc.log("jDown");
                if(this.playerside==true)
                {
                    if(this.hithand==-1)
                    {
                        //cc.find('small_sticker - 002_yellow/1_L_Arm_01').angle =100;
                        this.playerangel1 = 100;
                        //this.node.angle = 130;
                        this.playerangel2 = 160;
                        //cc.log("rightside L_arm")
                    }
                    

                    
                    else 
                    {
                        //cc.find('small_sticker - 002_yellow/1_L_Arm_01').angle =-50;
                        //this.node.angle = 130;
                        this.playerangel1 = -100;
                        this.playerangel2 = 80;
                    }

                    
                    
                    

                }
                else if(this.playerside ==false)
                {
                    if(this.hithand==-1)
                    {
                        //cc.find('small_sticker - 002_yellow/1_L_Arm_01').angle =-100;
                        this.playerangel1 = -100;
                        //this.node.angle = -130;
                        this.playerangel2 = -160
                        //cc.log("leftside L_arm")
                    } 
                    
                    
                    else 
                    {
                        //cc.find('small_sticker - 002_yellow/1_L_Arm_01').angle = 50;
                        //this.node.angle = -130;

                        this.playerangel1 = 100;
                        this.playerangel2 = -80;
                    }
                    
                    
                    
                }
                cc.log(this.playerside)
            }
            
            else 
            {
                //if(this.playerside==true) cc.find('small_sticker - 002_yellow/1_L_Arm_01').angle =15;
                //else if(this.playerside==false) cc.find('small_sticker - 002_yellow/1_L_Arm_01').angle =-15;
                //this.node.angle =0;
            }

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
            

            if (!this.sDown) cc.find('small_sticker - 002_yellow/1_L_Arm_01').angle = this.playerangel1;
            if (!this.sDown) this.node.angle = this.playerangel2;  
        
            //window.Test_Body.linearVelocity = cc.v2(this.playerSpeed * dt,window.Test_Body.linearVelocity.y)
            //this.node.position.x += this.playerSpeed * dt;
            //this.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(this.playerSpeed, 0), true);
            //this.getComponent(cc.RigidBody).applyTorque(this.playerSpeed,true);
        }

        else if(Global.player2_getgun ==true)
        {
            if(this.playerside==true)
            {
                this.playerangel1 = 0;
                this.playerangel2 = 0;
            }
            else if(this.playerside ==false)
            {
                this.playerangel1 = 0;
                this.playerangel2 = 0;           
            }
            if (!this.sDown)cc.find('small_sticker - 002_yellow/1_L_Arm_01').angle = this.playerangel1;
            if (!this.sDown)this.node.angle = this.playerangel2;
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
