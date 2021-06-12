
const {ccclass, property} = cc._decorator;

import { Global } from "./Leg_force_2";

@ccclass
export default class debug_body1_2 extends cc.Component 
{

@property(cc.Node)
    private camera: cc.Node = null;


    @property(cc.Prefab)
    private desert_hawk_prefab: cc.Prefab = null;

    @property(cc.Prefab)
    private desert_hawk_for_pick_prefab: cc.Prefab = null;


    @property(cc.Prefab)
    private excalibur_prefab: cc.Prefab = null;

    @property(cc.Prefab)
    private excalibur_for_pick_prefab: cc.Prefab = null;

    @property({type:cc.AudioClip})
    private earthquake_sound: cc.AudioClip=null;

    @property({type:cc.AudioClip})
    private excalibur_ex_sound: cc.AudioClip=null;

    @property({type:cc.AudioClip})
    private excalibur_ready_sound: cc.AudioClip=null;

    @property({type:cc.AudioClip})
    private excalibur_shoot_sound: cc.AudioClip=null;

    @property({type:cc.AudioClip})
    private excalibur_break_sound: cc.AudioClip=null;

    @property(cc.Node)
    percent_label: cc.Node = null;

    @property(cc.Node)
    Jump_force: cc.Node = null;
    playerSpeed: number =0;

    aDown: boolean = false; // key for player to go left

    dDown: boolean = false; // key for player to go right

    sDown: boolean = false //key for player to go down

    jDown: boolean = false; // key for player to shoot

    wDown: boolean = false; // key for player to jump

    fDown: boolean = false;

    //isDead:boolean =false;
    dead_finish: boolean = true;

    onGround:boolean = false;
    dFlag: boolean = false; // key for player to go right
    aFlag: boolean = false; // key for player to go left
    

    playerside: boolean = true;//true:right false:left

    private hitflag : boolean = false;

    hithand: number = 1;//true:right false:left


    gun_pointer;
    gun_instantiate_finish = false;
    throw_gun_pointer;
    
    gunname;

    excalibur_count = 0;
    excalibur_cooldown = 0;

    littleshake_flag = false;
    

    excalibur_flag = false;

    get_energy = false;


    local_percent = 0;

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().gravity = cc.v2 (0, -800);
    }

    
    start() {
        //cc.director.getPhysicsManager().debugDrawFlags = 1;

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

    }


    update() {
        //cc.log(this.node.position);///
        if(Global.player2_dead==false)
        {
            cc.find('small_sticker - 002_yellow/1_Head').getComponent(cc.RigidBody).fixedRotation = true;
            cc.find('small_sticker - 002_yellow/1_Neck').getComponent(cc.RigidBody).fixedRotation = true;
            cc.find('small_sticker - 002_yellow/1_Body_01').getComponent(cc.RigidBody).fixedRotation = true;
            cc.find('small_sticker - 002_yellow/1_Body_02').getComponent(cc.RigidBody).fixedRotation = true;
            cc.find('small_sticker - 002_yellow/1_L_Leg_01').getComponent(cc.RevoluteJoint).enableLimit = true;
            cc.find('small_sticker - 002_yellow/1_L_Leg_02').getComponent(cc.RevoluteJoint).enableLimit = true;
            cc.find('small_sticker - 002_yellow/1_R_Leg_01').getComponent(cc.RevoluteJoint).enableLimit= true;
            cc.find('small_sticker - 002_yellow/1_R_Leg_02').getComponent(cc.RevoluteJoint).enableLimit = true;    
            cc.find('small_sticker - 002_yellow/1_L_Arm_01').getComponent(cc.RevoluteJoint).enableLimit = true;
            cc.find('small_sticker - 002_yellow/1_L_Arm_02').getComponent(cc.RevoluteJoint).enableLimit = true;
            cc.find('small_sticker - 002_yellow/1_R_Arm_01').getComponent(cc.RevoluteJoint).enableLimit = true;
            cc.find('small_sticker - 002_yellow/1_R_Arm_02').getComponent(cc.RevoluteJoint).enableLimit = true;
            this.playerMovement();
        }
        //cc.log(this.node.scaleX);
        //cc.log(Global.player2_getgun);

        else if(Global.player2_dead==true&&this.dead_finish==true)
        {
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);

            cc.find('small_sticker - 002_yellow/1_Head').getComponent(cc.RigidBody).fixedRotation = false;
            cc.find('small_sticker - 002_yellow/1_Neck').getComponent(cc.RigidBody).fixedRotation = false;
            cc.find('small_sticker - 002_yellow/1_Body_01').getComponent(cc.RigidBody).fixedRotation = false;
            cc.find('small_sticker - 002_yellow/1_Body_02').getComponent(cc.RigidBody).fixedRotation = false;
            cc.find('small_sticker - 002_yellow/1_L_Leg_01').getComponent(cc.RevoluteJoint).enableLimit = false;
            cc.find('small_sticker - 002_yellow/1_L_Leg_02').getComponent(cc.RevoluteJoint).enableLimit = false;
            cc.find('small_sticker - 002_yellow/1_R_Leg_01').getComponent(cc.RevoluteJoint).enableLimit= false;
            cc.find('small_sticker - 002_yellow/1_R_Leg_02').getComponent(cc.RevoluteJoint).enableLimit = false;    
            cc.find('small_sticker - 002_yellow/1_L_Arm_01').getComponent(cc.RevoluteJoint).enableLimit = false;
            cc.find('small_sticker - 002_yellow/1_L_Arm_02').getComponent(cc.RevoluteJoint).enableLimit = false;
            cc.find('small_sticker - 002_yellow/1_R_Arm_01').getComponent(cc.RevoluteJoint).enableLimit = false;
            cc.find('small_sticker - 002_yellow/1_R_Arm_02').getComponent(cc.RevoluteJoint).enableLimit = false;
            cc.log("fixrotate disable");
            this.onGround=false;
            /*
            this.scheduleOnce(()=>{
                //this.node.position = cc.v2(480, 500);
                //Global.player2_dead=false;
                //this.dead_finish=true;
                cc.log("dead");
            },2);
            */
            this.dead_finish=false;
        }
    
        if(this.gunname == "excalibur_for_pick"&&this.jDown==true&&this.get_energy==true)
        {
            if(this.excalibur_cooldown==0)
            {
                if(this.excalibur_count==30) cc.audioEngine.playEffect(this.earthquake_sound,false);
                if(this.excalibur_count== 360) cc.audioEngine.playEffect(this.excalibur_ex_sound,false);
                if(this.excalibur_count== 30) cc.audioEngine.playEffect(this.excalibur_ready_sound,true);
                if(this.excalibur_count==30) this.littleshakeEffect();
                this.excalibur_count+=0.5;
                if(this.excalibur_count==330&&this.playerside==true) this.gun_pointer.runAction(cc.rotateBy(1,-60));
                else if(this.excalibur_count==330&&this.playerside==false) this.gun_pointer.runAction(cc.rotateBy(1,60));
                if(this.excalibur_count>= 300) this.gun_pointer.getComponent('weapon_instantiate').slowdownParticle();
                if(this.excalibur_count>= 330) this.gun_pointer.getComponent('weapon_instantiate').resetLevel10();
                else if(this.excalibur_count>= 300) this.gun_pointer.getComponent('weapon_instantiate').resetLevel9();
                else if(this.excalibur_count>= 270) this.gun_pointer.getComponent('weapon_instantiate').resetLevel8();
                else if(this.excalibur_count>= 240) this.gun_pointer.getComponent('weapon_instantiate').resetLevel7();
                else if(this.excalibur_count>= 210) this.gun_pointer.getComponent('weapon_instantiate').resetLevel6();
                else if(this.excalibur_count>= 180) this.gun_pointer.getComponent('weapon_instantiate').resetLevel5();
                else if(this.excalibur_count>= 150) this.gun_pointer.getComponent('weapon_instantiate').resetLevel4();
                else if(this.excalibur_count>= 120) this.gun_pointer.getComponent('weapon_instantiate').resetLevel3();
                else if(this.excalibur_count>= 90) this.gun_pointer.getComponent('weapon_instantiate').resetLevel2();
                else if(this.excalibur_count>= 60) this.gun_pointer.getComponent('weapon_instantiate').resetLevel1();
                else if(this.excalibur_count>= 30) this.gun_pointer.getComponent('weapon_instantiate').resetLevel0();
            }
        }


        
        if(this.excalibur_cooldown>0&&this.gunname=="excalibur_for_pick")
        {
            this.excalibur_cooldown--;
        }
        else if(this.excalibur_cooldown==0&&this.gunname=="excalibur_for_pick"&&this.excalibur_count<330)
        {
            if(this.gun_pointer.angle<0) this.gun_pointer.angle++;
            else if(this.gun_pointer.angle>0) this.gun_pointer.angle--;
        }

        var color = new cc.Color(255, 255 - Global.player2_percent * 2, 255 - Global.player2_percent * 2);
        if (Global.player2_percent < 128) this.percent_label.color = color;
        this.percent_label.getComponent(cc.Label).string = Global.player2_percent + "%";
        //this.percent_label.runAction(cc.scaleBy(0.05, 2, 2));
        if (this.local_percent != Global.player2_percent) {
            this.local_percent = Global.player2_percent;
            let action = cc.sequence(cc.scaleTo(0.05, 2, 2), cc.scaleTo(0.05, 1, 1));
            this.scheduleOnce(()=>{
                this.percent_label.runAction(action);
            },0.01);
        }
    }


    onKeyDown(event) {
        //cc.log("Key Down: " + event.keyCode);
        if(Global.player2_dead==false)
        {
        
            if(event.keyCode == cc.macro.KEY.left) {
                if (!this.aDown) this.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(-20000, 0), true);
                this.aDown = true;
                if (this.dDown) {
                    this.dDown = false;
                    this.dFlag = true;
                }
                if (Global.onWall == 4) Global.onWall = 0;

                if(this.gunname == "excalibur_for_pick")
                {
                    this.gun_pointer.getComponent('weapon_instantiate').stopParticle();
                    this.gun_pointer.getComponent('weapon_instantiate').stopLevel10();
                    this.gun_pointer.getComponent('weapon_instantiate').stopLevel9();
                    this.gun_pointer.getComponent('weapon_instantiate').stopLevel8();
                    this.gun_pointer.getComponent('weapon_instantiate').stopLevel7();
                    this.gun_pointer.getComponent('weapon_instantiate').stopLevel6();
                    this.gun_pointer.getComponent('weapon_instantiate').stopLevel5();
                    this.gun_pointer.getComponent('weapon_instantiate').stopLevel4();
                    this.gun_pointer.getComponent('weapon_instantiate').stopLevel3();
                    this.gun_pointer.getComponent('weapon_instantiate').stopLevel2();
                    this.gun_pointer.getComponent('weapon_instantiate').stopLevel1();
                    this.gun_pointer.getComponent('weapon_instantiate').stopLevel0();
                    //this.gun_pointer.runAction(cc.rotateTo(1,0));
                    if(this.littleshake_flag == true)
                    {
                        this.camera.stopAllActions();
                        this.camera.setPosition(0,0);
                    }
                    this.excalibur_count=0;
                    this.get_energy = false;
                    if(this.excalibur_cooldown==0) cc.audioEngine.stopAllEffects();
                }

            } else if(event.keyCode == cc.macro.KEY.right) {
                if (!this.dDown) this.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(20000, 0), true);
                this.dDown = true;
                if (this.aDown) {
                    this.aDown = false;
                    this.aFlag = true;
                }
                if (Global.onWall == 3) Global.onWall = 0;

                if(this.gunname == "excalibur_for_pick")
                {
                    this.gun_pointer.getComponent('weapon_instantiate').stopParticle();
                    this.gun_pointer.getComponent('weapon_instantiate').stopLevel10();
                    this.gun_pointer.getComponent('weapon_instantiate').stopLevel9();
                    this.gun_pointer.getComponent('weapon_instantiate').stopLevel8();
                    this.gun_pointer.getComponent('weapon_instantiate').stopLevel7();
                    this.gun_pointer.getComponent('weapon_instantiate').stopLevel6();
                    this.gun_pointer.getComponent('weapon_instantiate').stopLevel5();
                    this.gun_pointer.getComponent('weapon_instantiate').stopLevel4();
                    this.gun_pointer.getComponent('weapon_instantiate').stopLevel3();
                    this.gun_pointer.getComponent('weapon_instantiate').stopLevel2();
                    this.gun_pointer.getComponent('weapon_instantiate').stopLevel1();
                    this.gun_pointer.getComponent('weapon_instantiate').stopLevel0();
                    //this.gun_pointer.runAction(cc.rotateTo(1,0));
                    if(this.littleshake_flag == true)
                    {
                        this.camera.stopAllActions();
                        this.camera.setPosition(0,0);
                    }
                    this.excalibur_count=0;
                    this.get_energy = false;
                    if(this.excalibur_cooldown==0) cc.audioEngine.stopAllEffects();
                }

            } else if(event.keyCode == cc.macro.KEY.down) {
                this.sDown = true;

                if(this.gunname == "excalibur_for_pick")
                {
                    this.gun_pointer.getComponent('weapon_instantiate').stopParticle();
                    this.gun_pointer.getComponent('weapon_instantiate').stopLevel10();
                    this.gun_pointer.getComponent('weapon_instantiate').stopLevel9();
                    this.gun_pointer.getComponent('weapon_instantiate').stopLevel8();
                    this.gun_pointer.getComponent('weapon_instantiate').stopLevel7();
                    this.gun_pointer.getComponent('weapon_instantiate').stopLevel6();
                    this.gun_pointer.getComponent('weapon_instantiate').stopLevel5();
                    this.gun_pointer.getComponent('weapon_instantiate').stopLevel4();
                    this.gun_pointer.getComponent('weapon_instantiate').stopLevel3();
                    this.gun_pointer.getComponent('weapon_instantiate').stopLevel2();
                    this.gun_pointer.getComponent('weapon_instantiate').stopLevel1();
                    this.gun_pointer.getComponent('weapon_instantiate').stopLevel0();
                    //this.gun_pointer.runAction(cc.rotateTo(1,0));
                    if(this.littleshake_flag == true)
                    {
                        this.camera.stopAllActions();
                        this.camera.setPosition(0,0);
                    }
                    this.excalibur_count=0;
                    this.get_energy = false;
                    if(this.excalibur_cooldown==0) cc.audioEngine.stopAllEffects();
                }

            } else if(event.keyCode == cc.macro.KEY.up) {
                cc.log("w down!!!!!!!!!!!!!");
                if (!this.wDown) {
                    if (Global.onWall == 1) {
                        Global.onGround = false;
                        cc.log("onwall jump: " + Global.onWall);
                        Global.onWall = 3;
                        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.getComponent(cc.RigidBody).linearVelocity.x, 0);
                        this.Jump_force.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(30000, 180000), true);
                    } else if (Global.onWall == 2) {
                        Global.onGround = false;
                        cc.log("onwall jump: " + Global.onWall);
                        Global.onWall = 4;
                        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.getComponent(cc.RigidBody).linearVelocity.x, 0);
                        this.Jump_force.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(-30000, 180000), true);
                    } else if (Global.onGround) {
                        Global.onGround = false;
                        this.Jump_force.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(0, 180000), true);
                    }
                    this.wDown = true;
                }

                if(this.gunname == "excalibur_for_pick")
                {
                    this.gun_pointer.getComponent('weapon_instantiate').stopParticle();
                    this.gun_pointer.getComponent('weapon_instantiate').stopLevel10();
                    this.gun_pointer.getComponent('weapon_instantiate').stopLevel9();
                    this.gun_pointer.getComponent('weapon_instantiate').stopLevel8();
                    this.gun_pointer.getComponent('weapon_instantiate').stopLevel7();
                    this.gun_pointer.getComponent('weapon_instantiate').stopLevel6();
                    this.gun_pointer.getComponent('weapon_instantiate').stopLevel5();
                    this.gun_pointer.getComponent('weapon_instantiate').stopLevel4();
                    this.gun_pointer.getComponent('weapon_instantiate').stopLevel3();
                    this.gun_pointer.getComponent('weapon_instantiate').stopLevel2();
                    this.gun_pointer.getComponent('weapon_instantiate').stopLevel1();
                    this.gun_pointer.getComponent('weapon_instantiate').stopLevel0();
                    //this.gun_pointer.runAction(cc.rotateTo(1,0));
                    if(this.littleshake_flag == true)
                    {
                        this.camera.stopAllActions();
                        this.camera.setPosition(0,0);
                    }
                    this.excalibur_count=0;
                    this.get_energy = false;
                    if(this.excalibur_cooldown==0) cc.audioEngine.stopAllEffects();
                }

            } else if(event.keyCode == cc.macro.KEY.p) {
                if(this.gunname == "excalibur_for_pick")
                {
                    if(this.jDown==false&&this.excalibur_cooldown==0)
                    {
                        this.gun_pointer.getComponent('weapon_instantiate').resetParticle();
                        this.get_energy = true;
                    }
                    if(this.excalibur_cooldown==0)
                    {
                        this.jDown = true;
                    }
                }
                else this.jDown = true;
            } else if(event.keyCode == cc.macro.KEY.o) {
                this.fDown = true;
            } 
        }
    }

    onKeyUp(event) {
        if(Global.player2_dead==false)
        {

        
            if(event.keyCode == cc.macro.KEY.left)
            {
                this.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(25000, 0), true);
                this.aDown = false;
                this.aFlag = false;
                if (this.dFlag) {
                    this.dDown = true;
                    this.dFlag = false;
                }
            }
                
            if(event.keyCode == cc.macro.KEY.right)
            {
                this.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(-25000, 0), true);
                this.dDown = false;
                this.dFlag = false;
                if (this.aFlag) {
                    this.aDown = true;
                    this.aFlag = false;
                }
            }
                
            if(event.keyCode == cc.macro.KEY.down)
                this.sDown = false;
            if(event.keyCode == cc.macro.KEY.p)
            {
                if(this.gunname == "excalibur_for_pick")
                {
                    if(this.jDown==true)
                    {
                        this.gun_pointer.getComponent('weapon_instantiate').stopParticle();
                        this.gun_pointer.getComponent('weapon_instantiate').stopLevel10();
                        this.gun_pointer.getComponent('weapon_instantiate').stopLevel9();
                        this.gun_pointer.getComponent('weapon_instantiate').stopLevel8();
                        this.gun_pointer.getComponent('weapon_instantiate').stopLevel7();
                        this.gun_pointer.getComponent('weapon_instantiate').stopLevel6();
                        this.gun_pointer.getComponent('weapon_instantiate').stopLevel5();
                        this.gun_pointer.getComponent('weapon_instantiate').stopLevel4();
                        this.gun_pointer.getComponent('weapon_instantiate').stopLevel3();
                        this.gun_pointer.getComponent('weapon_instantiate').stopLevel2();
                        this.gun_pointer.getComponent('weapon_instantiate').stopLevel1();
                        this.gun_pointer.getComponent('weapon_instantiate').stopLevel0();
                        if(this.littleshake_flag == true)
                        {
                            this.camera.stopAllActions();
                            this.camera.setPosition(0,0);
                        }
                        if(this.excalibur_count<330)
                        {
                            this.excalibur_count=0;
                        }
                        if(this.excalibur_cooldown==0) cc.audioEngine.stopAllEffects();
                    }
                    this.jDown = false;
                    this.get_energy = false;
                }
                else 
                {
                    this.jDown = false;
                    this.hitflag=false;
                    this.hithand*=-1;
                }
            }
                
                
            if(event.keyCode == cc.macro.KEY.up)
            {
                this.wDown = false;
            }


            if(event.keyCode == cc.macro.KEY.o)
            {
                this.fDown = false;
            }


        }
    }
    
    playerMovement() {
        this.playerSpeed = 0;
        if(this.aDown){
            this.playerSpeed = -350;
            //this.playerSpeed = -2000;
            //this.playerSpeed = -55000;
            //this.node.scaleX = -1;
            this.playerside = false;
        }
        else if(this.dDown){
            this.playerSpeed = 350;
            //this.playerSpeed = 2000;
            //this.playerSpeed = 55000;
            //this.node.scaleX = 1;
            this.playerside  = true;
        }


        //cc.find('small_sticker - 002_yellow/1_Neck').getComponent(cc.RigidBody).fixedRotation = true;
        if (!this.sDown) {
            cc.find('small_sticker - 002_yellow/1_Body_01').getComponent(cc.RigidBody).fixedRotation = true;
            cc.find('small_sticker - 002_yellow/1_Body_02').getComponent(cc.RigidBody).fixedRotation = true;
        }
        
        
        
        if(Global.player2_getgun==true&&this.gun_instantiate_finish==true)
        {
            if(this.playerside==true) this.gun_pointer.scaleX = 1;
            else if(this.playerside ==false) this.gun_pointer.scaleX = -1;
        }
        
        
        if(this.gunname!="excalibur_for_pick")
        { 

            if(this.jDown&&this.hitflag==false&&Global.player2_getgun==false){
                this.shakeEffect(0.1);
                this.hitflag=true;
                //cc.log("wow")

                if(this.playerside==true)
                {
                    //cc.find('small_sticker - 002_yellow/1_Neck').getComponent(cc.RigidBody).fixedRotation = false;
                    cc.find('small_sticker - 002_yellow/1_Body_01').getComponent(cc.RigidBody).fixedRotation = false;
                    cc.find('small_sticker - 002_yellow/1_Body_02').getComponent(cc.RigidBody).fixedRotation = false;
                    //cc.find('small_sticker - 002_yellow/1_Body_02').getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(-2000, 0), true);

                    if(this.hithand==1) 
                    {
                        cc.find('small_sticker - 002_yellow/1_R_Arm_02').getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(40000, 15000), true);
                        cc.find('small_sticker - 002_yellow/1_R_hand').getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(4000, 1500), true);
                    }
                    else 
                    {
                        cc.find('small_sticker - 002_yellow/1_L_Arm_02').getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(40000, 1500), true);

                    }
                        //this.playerSpeed = 2000;


                    //cc.find('small_sticker - 002_yellow/1_Body_01').getComponent(cc.RigidBody).fixedRotation = true;
                    //cc.find('small_sticker - 002_yellow/1_Body_02').getComponent(cc.RigidBody).fixedRotation = true;
                }
                else if(this.playerside==false)
                {


                // cc.find('small_sticker - 002_yellow/1_Neck').getComponent(cc.RigidBody).fixedRotation = false;
                    cc.find('small_sticker - 002_yellow/1_Body_01').getComponent(cc.RigidBody).fixedRotation = false;
                    cc.find('small_sticker - 002_yellow/1_Body_02').getComponent(cc.RigidBody).fixedRotation = false;
                    //cc.find('small_sticker - 002_yellow/1_Body_02').getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(2000, 0), true);
                    if(this.hithand==1)
                    {
                        cc.find('small_sticker - 002_yellow/1_R_Arm_02').getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(-40000, 15000), true);
                        cc.find('small_sticker - 002_yellow/1_R_hand').getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(-4000, 1500), true);
                    }
                    else 
                    {
                        cc.find('small_sticker - 002_yellow/1_L_Arm_02').getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(-40000, 15000), true);
                    
                    }
                        //this.playerSpeed = -2000;


                    //cc.find('small_sticker - 002_yellow/1_Body_01').getComponent(cc.RigidBody).fixedRotation = true;
                    //cc.find('small_sticker - 002_yellow/1_Body_02').getComponent(cc.RigidBody).fixedRotation = true;
                }
            } 




            else if(this.jDown&&this.hitflag==false&&Global.player2_getgun==true){
                this.hitflag=true;
                this.shakeEffect(0.1);
                this.gun_pointer.getComponent('weapon_instantiate').createBullet();
                if(this.playerside==true)
                {
                    this.gun_pointer.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(-40000,(Math.floor(Math.random()*1)+-1)*10000), true);
                }
                else if(this.playerside==false)
                {
                    this.gun_pointer.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(40000, (Math.floor(Math.random()*1)+-1)*10000), true);
                }
            }
        
        }
        else if(this.gunname == "excalibur_for_pick")
        {
            if(this.jDown==false&&this.excalibur_count>=330&&this.excalibur_flag==false)
            {
                this.excalibur_flag=true;
                if(this.playerside==true) this.gun_pointer.runAction(cc.rotateBy(0.2,150));
                else if(this.playerside==false) this.gun_pointer.runAction(cc.rotateBy(0.2,-150));
                this.scheduleOnce(()=>{
                    cc.audioEngine.stopAllEffects();
                    cc.audioEngine.playEffect(this.earthquake_sound,false);
                    this.excalibur_count=0;
                    cc.audioEngine.playEffect(this.excalibur_shoot_sound,false);
                    this.littleshake_flag=false;
                    this.gun_pointer.getComponent('weapon_instantiate').createBullet();
                    this.excalibur_cooldown=2000;
                    this.shakeEffect(10);
                    this.excalibur_flag = false;
                    this.scheduleOnce(()=>{cc.audioEngine.playEffect(this.excalibur_break_sound,false);},4);
                },0.1);
            }
        }



        if(this.fDown&&Global.player2_getgun==true){
            Global.player2_getgun = false;

            this.gun_pointer.destroy();
            if(this.gunname == "desert_hawk_for_pick")
            {
                this.throw_gun_pointer = cc.instantiate(this.desert_hawk_for_pick_prefab);
            }
            else if(this.gunname == "excalibur_for_pick")
            {
                this.throw_gun_pointer = cc.instantiate(this.excalibur_for_pick_prefab);
            }
            
            this.gunname = "nogun";


            if(this.playerside == true)
            {
                this.throw_gun_pointer.getComponent('weapon_disappear').initR(cc.find('small_sticker - 002_yellow/1_R_hand'));
                this.throw_gun_pointer.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(3000, 500), true);
            } 
            else if(this.playerside == false)
            {
                this.throw_gun_pointer.getComponent('weapon_disappear').initL(cc.find('small_sticker - 002_yellow/1_R_hand'));
                this.throw_gun_pointer.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(-3000, 500), true);
            }


            this.gun_instantiate_finish=false;
        }


        /*if(cc.find('small_sticker - 002_yellow/1_Neck').angle<0)
        {
            cc.find('small_sticker - 002_yellow/1_Neck').angle++;
        }
        else if(cc.find('small_sticker - 002_yellow/1_Neck').angle>0)
        {
            cc.find('small_sticker - 002_yellow/1_Neck').angle--;
        }*/
        if(cc.find('small_sticker - 002_yellow/1_Body_01').angle<0)
        {
            cc.find('small_sticker - 002_yellow/1_Body_01').angle++;
        }
        else if(cc.find('small_sticker - 002_yellow/1_Body_01').angle>0)
        {
            cc.find('small_sticker - 002_yellow/1_Body_01').angle--;
        }
        if(cc.find('small_sticker - 002_yellow/1_Body_02').angle<0)
        {
            cc.find('small_sticker - 002_yellow/1_Body_02').angle++;
        }
        else if(cc.find('small_sticker - 002_yellow/1_Body_02').angle>0)
        {
            cc.find('small_sticker - 002_yellow/1_Body_02').angle--;
        }

        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.playerSpeed, 0);
       
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

    littleshakeEffect() {
        this.camera.runAction(
            cc.repeatForever(
                cc.sequence(
                    cc.moveTo(0.02, cc.v2(1.25, 1.75)),
                    cc.moveTo(0.02, cc.v2(-1.5, 1.75)),
                    cc.moveTo(0.02, cc.v2(-3.25, 0.75)),
                    cc.moveTo(0.02, cc.v2(0.75, -1.5)),
                    cc.moveTo(0.02, cc.v2(-1.25, 1.25))
                )
            )
        );
        this.littleshake_flag = true;
    }



    instantiate_gun(name)
    {
        if(name == 'desert_hawk_for_pick'&&this.gun_instantiate_finish==false)
        {
            this.gunname = name;
            this.gun_pointer = cc.instantiate(this.desert_hawk_prefab); 
            this.gun_pointer.getComponent('weapon_instantiate').init(cc.find('small_sticker - 002_yellow/1_R_hand'));
            cc.log("instantiate!!");
        }    
        else if(name == 'excalibur_for_pick'&&this.gun_instantiate_finish==false)
        {
            this.gunname = name;
            this.gun_pointer = cc.instantiate(this.excalibur_prefab); 
            this.gun_pointer.getComponent('weapon_instantiate').init(cc.find('small_sticker - 002_yellow/1_R_hand'));
            cc.log("instantiate!!");
        }
        this.gun_instantiate_finish=true;
    }
    

    onBeginContact(contact, self, other) {
        var direction = contact.getWorldManifold().normal;
        //cc.log("YYYYYYYYY: "+direction.y);
        if (other.node.name == "platform" && direction.x < 0) {
            cc.log("onWall left");
            Global.onWall = 1;
            Global.head_contact = true;
            //cc.log("platform");
        } else if (other.node.name == "platform" && direction.x > 0) {
            cc.log("onWall right");
            Global.onWall = 2;
            Global.head_contact = true;
            //cc.log("platform");
        }
    }
    onEndContact(contact, self, other) {
        if (other.node.name == "platform") {
            cc.log("onwall false");
            if (Global.onWall == 1 && Global.onGround) Global.onWall = 3;
            else if (Global.onWall == 2 && Global.onGround)  Global.onWall = 4;
            //Global.head_contact = false;
        }
    }
}


