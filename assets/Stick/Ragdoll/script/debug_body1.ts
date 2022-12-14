
const {ccclass, property} = cc._decorator;

import { Global } from "./Leg_force";

@ccclass
export default class debug_body1 extends cc.Component 
{

@property(cc.Node)
    private camera: cc.Node = null;


    @property(cc.Prefab)
    private desert_hawk_prefab: cc.Prefab = null;

    @property(cc.Prefab)
    private desert_hawk_for_pick_prefab: cc.Prefab = null;

    @property(cc.Prefab)
    private Grenade_launcher_prefab: cc.Prefab = null;

    @property(cc.Prefab)
    private Grenade_launcher_for_pick_prefab: cc.Prefab = null;

    @property(cc.Prefab)
    private LaserGun_prefab: cc.Prefab = null;

    @property(cc.Prefab)
    private LaserGun_for_pick_prefab: cc.Prefab = null;


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
    
    @property({type:cc.AudioClip})
    private desert_hawk_sound: cc.AudioClip=null;

    @property({type:cc.AudioClip})
    private  LaserGun_sound: cc.AudioClip=null;

    @property({type:cc.AudioClip})
    private  punch_sound: cc.AudioClip=null;

    @property({type:cc.AudioClip})
    private  jump_sound: cc.AudioClip=null;

    @property({type:cc.AudioClip})
    private  walk_sound: cc.AudioClip=null;

    @property(cc.Node)
    percent_label: cc.Node = null;
    
    @property(cc.Node)
    Jump_force: cc.Node = null;
       
    @property(cc.Prefab)
    smoke_block: cc.Prefab = null;

    @property(cc.Prefab)
    hit_smoke_black: cc.Prefab = null;
    
    @property(cc.Prefab)
    jump_smoke: cc.Prefab = null;

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

    private laserAimEnable: boolean = true;
    private laserAimFinish: boolean = false;



    gun_pointer;
    gun_instantiate_finish = false;
    throw_gun_pointer;

    gunname;

    excalibur_count = 0;
    excalibur_cooldown = 0;

    littleshake_flag = false;

    shake_effect_flag = false;
    

    excalibur_flag = false;

    get_energy = false;

    local_percent = 0;

    change_scene_flag = false;

    hit_coff = 3;

    local_dead;

    shake_flag = false;

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().gravity = cc.v2 (0, -800);

        this.schedule(()=>{
            if(Math.abs(this.node.getComponent(cc.RigidBody).linearVelocity.x)>=70 && Global.onGround==true&&Global.player1_dead==false && Global.onWalk_range) cc.audioEngine.play(this.walk_sound,false,0.2);
        },0.14)
    }

    
    start() {
        //cc.director.getPhysicsManager().debugDrawFlags??= 1;

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,??this.onKeyDown,??this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,??this.onKeyUp,??this);

        Global.onGround = false;
        Global.onWall = 0;
        Global.head_contact = false;
        Global.player1_getgun = false;
        Global.player1_dead = false;
        Global.player1_percent = 0;
        Global.player1_dead_bound = 0;

        // tk custom need
        this.camera = cc.find("Canvas/Main Camera");
        this.percent_label = cc.find("Canvas/percent_black/number");
    }


    update() {
        this.local_dead = Global.player1_dead;
        //cc.log(this.node.position);///
        if(Global.player1_dead==false)
        {
            cc.find('small_sticker - 002_knee/0_Head').getComponent(cc.RigidBody).fixedRotation = true;
            cc.find('small_sticker - 002_knee/0_Neck').getComponent(cc.RigidBody).fixedRotation = true;
            cc.find('small_sticker - 002_knee/0_Body_01').getComponent(cc.RigidBody).fixedRotation = true;
            cc.find('small_sticker - 002_knee/0_Body_02').getComponent(cc.RigidBody).fixedRotation = true;
            cc.find('small_sticker - 002_knee/0_L_Leg_01').getComponent(cc.RevoluteJoint).enableLimit = true;
            cc.find('small_sticker - 002_knee/0_L_Leg_02').getComponent(cc.RevoluteJoint).enableLimit = true;
            cc.find('small_sticker - 002_knee/0_R_Leg_01').getComponent(cc.RevoluteJoint).enableLimit= true;
            cc.find('small_sticker - 002_knee/0_R_Leg_02').getComponent(cc.RevoluteJoint).enableLimit = true;    
            cc.find('small_sticker - 002_knee/0_L_Arm_01').getComponent(cc.RevoluteJoint).enableLimit = true;
            cc.find('small_sticker - 002_knee/0_L_Arm_02').getComponent(cc.RevoluteJoint).enableLimit = true;
            cc.find('small_sticker - 002_knee/0_R_Arm_01').getComponent(cc.RevoluteJoint).enableLimit = true;
            cc.find('small_sticker - 002_knee/0_R_Arm_02').getComponent(cc.RevoluteJoint).enableLimit = true;
            if(cc.find('small_sticker - 002_yellow/1_Head').getComponent("debug_body1_2").local_dead==false)this.playerMovement();
        }
        //cc.log(this.node.scaleX);
        //cc.log(Global.player1_getgun);

        else if(Global.player1_dead==true&&this.dead_finish==true)
        {

            //this.scheduleOnce(()=>{this.playerMovement()});
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);

            cc.find('small_sticker - 002_knee/0_Head').getComponent(cc.RigidBody).fixedRotation = false;
            cc.find('small_sticker - 002_knee/0_Neck').getComponent(cc.RigidBody).fixedRotation = false;
            cc.find('small_sticker - 002_knee/0_Body_01').getComponent(cc.RigidBody).fixedRotation = false;
            cc.find('small_sticker - 002_knee/0_Body_02').getComponent(cc.RigidBody).fixedRotation = false;
            cc.find('small_sticker - 002_knee/0_L_Leg_01').getComponent(cc.RevoluteJoint).enableLimit = false;
            cc.find('small_sticker - 002_knee/0_L_Leg_02').getComponent(cc.RevoluteJoint).enableLimit = false;
            cc.find('small_sticker - 002_knee/0_R_Leg_01').getComponent(cc.RevoluteJoint).enableLimit= false;
            cc.find('small_sticker - 002_knee/0_R_Leg_02').getComponent(cc.RevoluteJoint).enableLimit = false;    
            cc.find('small_sticker - 002_knee/0_L_Arm_01').getComponent(cc.RevoluteJoint).enableLimit = false;
            cc.find('small_sticker - 002_knee/0_L_Arm_02').getComponent(cc.RevoluteJoint).enableLimit = false;
            cc.find('small_sticker - 002_knee/0_R_Arm_01').getComponent(cc.RevoluteJoint).enableLimit = false;
            cc.find('small_sticker - 002_knee/0_R_Arm_02').getComponent(cc.RevoluteJoint).enableLimit = false;
            cc.log("fixrotate disable");

            this.dead_finish=false;
            var stick_2_change_flag = cc.find('small_sticker - 002_yellow/1_Head').getComponent("debug_body1_2").change_scene_flag;
            if (!this.change_scene_flag && !stick_2_change_flag) {
                this.change_scene_flag = true;
                this.scheduleOnce(()=>{
                    cc.find('SceneControl').getComponent("SceneControl").nextScene();
                });
            }
            
            //cc.find('SceneControl').getComponent("SceneControl").onKeyDown(cc.macro.KEY.e);
            if (Global.player1_dead_bound > 0 && Global.player1_dead_bound < 5) {
                var smoke_block_prefab = cc.instantiate(this.smoke_block);
                smoke_block_prefab.parent = this.node.parent;
                smoke_block_prefab.setPosition(this.node.x - 200, this.node.y + 200);
                //smoke_yellow_prefab.setPosition(this.node.x - 200, this.node.y + 200);
                smoke_block_prefab.getComponent("smoke1").die();
            } else if (Global.player1_dead_bound == 5) {    // castle map's spike
                for (var i = 0; i < 4; i++) {
                    this.init_hit_smoke();
                    Global.player1_percent += this.hit_coff;
                }
            }
        }
        //this.excalibur_count+=2;
        //cc.log(this.excalibur_count);
        if(this.gunname == "excalibur_for_pick"&&this.jDown==true&&this.get_energy==true&&cc.find('small_sticker - 002_yellow/1_Head').getComponent("debug_body1_2").local_dead==false)
        {
            if(this.excalibur_cooldown==0)
            {
                if(this.excalibur_count==30) cc.audioEngine.playEffect(this.earthquake_sound,false);
                if(this.excalibur_count== 360) cc.audioEngine.playEffect(this.excalibur_ex_sound,false);
                if(this.excalibur_count== 30) cc.audioEngine.playEffect(this.excalibur_ready_sound,true);
                if(this.excalibur_count==30) this.littleshakeEffect();
                this.excalibur_count+=1;
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
        //cc.log(this.excalibur_cooldown);
        var color = new cc.Color(255, 255 - Global.player1_percent * 2, 255 - Global.player1_percent * 2);
        if (Global.player1_percent < 128) this.percent_label.color = color;
        this.percent_label.getComponent(cc.Label).string = Global.player1_percent + "%";
        //this.percent_label.runAction(cc.scaleBy(0.05, 2, 2));
        if (this.local_percent != Global.player1_percent) {
            this.local_percent = Global.player1_percent;
            let action = cc.sequence(cc.scaleTo(0.05, 2, 2), cc.scaleTo(0.05, 1, 1));
            this.scheduleOnce(()=>{
                this.percent_label.parent.opacity = 255;
                this.percent_label.runAction(action);
            },0.0);
            this.scheduleOnce(()=>{
                this.percent_label.parent.opacity = 60;
            },0.15);
        }
        if (Global.player1_percent > 500) Global.player1_dead = true;
    }


    onKeyDown(event) {
        if(Global.player1_dead==false&&cc.find('small_sticker - 002_yellow/1_Head').getComponent("debug_body1_2").local_dead==false)
        {
        
            if(event.keyCode == cc.macro.KEY.a) {
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

            } else if(event.keyCode == cc.macro.KEY.d) {
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

            } else if(event.keyCode == cc.macro.KEY.s) {
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
 
            } else if(event.keyCode == cc.macro.KEY.w) {
                if (!this.wDown) {
                    //cc.audioEngine.playMusic(this.jump_sound,false);
                    if (Global.onWall == 1) {
                        this.init_jump_smoke();
                        cc.audioEngine.playMusic(this.jump_sound,false);
                        Global.onGround = false;
                        Global.onWall = 3;
                        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.getComponent(cc.RigidBody).linearVelocity.x, 0);
                        this.Jump_force.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(30000, 180000), true);
                    } else if (Global.onWall == 2) {
                        this.init_jump_smoke();
                        cc.audioEngine.playMusic(this.jump_sound,false);
                        Global.onGround = false;
                        Global.onWall = 4;
                        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.getComponent(cc.RigidBody).linearVelocity.x, 0);
                        this.Jump_force.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(-30000, 180000), true);
                    } else if (Global.onGround) {
                        this.init_jump_smoke();
                        cc.audioEngine.playMusic(this.jump_sound,false);
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

            } else if(event.keyCode == cc.macro.KEY.j) {
                if(this.gunname == "excalibur_for_pick")
                {
                    if(this.jDown==false&&this.excalibur_cooldown==0)
                    {
                        this.gun_pointer.getComponent('weapon_instantiate').resetParticle();
                        this.get_energy = true;
                    }
                    if(this.excalibur_cooldown==0)
                    {
                        //if(this.excalibur_count==30) this.littleshakeEffect();
                        this.jDown = true;
                        /*
                        this.excalibur_count+=2;
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
                        */
                    }
                    
                } else if (this.gunname == "LaserGun_for_pick"){
                    this.jDown = true;
                    if(this.laserAimEnable){
                        this.laserAimEnable = false;
                        cc.log("scalx: " + this.gun_pointer.scaleX);
                        if(this.gun_pointer.scaleX == -1)this.gun_pointer.runAction(cc.sequence(cc.rotateTo(1, 30).easing(cc.easeInOut(2)), cc.rotateTo(1, -30).easing(cc.easeInOut(2))).repeatForever());
                        else if(this.gun_pointer.scaleX == 1) this.gun_pointer.runAction(cc.sequence(cc.rotateTo(1, -30).easing(cc.easeInOut(2)), cc.rotateTo(1, 30).easing(cc.easeInOut(2))).repeatForever());

                    }
                }
                else this.jDown = true;
                
            } else if(event.keyCode == cc.macro.KEY.f) {
                this.fDown = true;
            } 
        }
    }

    onKeyUp(event) {
        if(Global.player1_dead==false&&cc.find('small_sticker - 002_yellow/1_Head').getComponent("debug_body1_2").local_dead==false)
        {

        
            if(event.keyCode == cc.macro.KEY.a)
            {
                this.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(25000, 0), true);
                this.aDown = false;
                this.aFlag = false;
                if (this.dFlag) {
                    this.dDown = true;
                    this.dFlag = false;
                }
            }
                
            if(event.keyCode == cc.macro.KEY.d)
            {
                this.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(-25000, 0), true);
                this.dDown = false;
                this.dFlag = false;
                if (this.aFlag) {
                    this.aDown = true;
                    this.aFlag = false;
                }
            }
                
            if(event.keyCode == cc.macro.KEY.s)
                this.sDown = false;
            if(event.keyCode == cc.macro.KEY.j)
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
                } else if (this.gunname == "LaserGun_for_pick"){
                    if(this.jDown==true){
                        this.jDown = false;
                        this.laserAimEnable = true;
                        //this.gun_pointer.runAction(cc.s)
                        this.gun_pointer.runAction(cc.sequence(cc.rotateTo(0.1, 0), cc.callFunc(()=>{this.gun_pointer.stopAllActions();})));
                        this.laserAimFinish = true;
                    }
                }
                else 
                {
                    this.jDown = false;
                    this.hitflag=false;
                    this.hithand*=-1;
                }
            }
                
                
            if(event.keyCode == cc.macro.KEY.w)
            {
                this.wDown = false;
            }


            if(event.keyCode == cc.macro.KEY.f)
            {
                this.fDown = false;
            }


        }
    }
    
    playerMovement() {
        this.playerSpeed??=??0;
        if(this.aDown){
            this.playerSpeed??=??-350;
            //this.playerSpeed??=??-2000;
            //this.playerSpeed??=??-55000;
            //this.node.scaleX = -1;
            this.playerside = false;
        }
        else??if(this.dDown){
            this.playerSpeed??=??350;
            //this.playerSpeed??=??2000;
            //this.playerSpeed??=??55000;
            //this.node.scaleX = 1;
            this.playerside  = true;
        }


        //cc.find('small_sticker - 002_knee/0_Neck').getComponent(cc.RigidBody).fixedRotation = true;
        if (!this.sDown) {
            cc.find('small_sticker - 002_knee/0_Body_01').getComponent(cc.RigidBody).fixedRotation = true;
            cc.find('small_sticker - 002_knee/0_Body_02').getComponent(cc.RigidBody).fixedRotation = true;
        }
        
        
        
        if(Global.player1_getgun==true&&this.gun_instantiate_finish==true)
        {
            //if(this.gunname!="excalibur_for_pick")
            {
                if(this.playerside==true) this.gun_pointer.scaleX = 1;
                else if(this.playerside ==false) this.gun_pointer.scaleX = -1;
            }
        }
        
        
        if(this.gunname!="excalibur_for_pick" && this.gunname != "LaserGun_for_pick")
        {        

            if(this.jDown&&this.hitflag==false&&Global.player1_getgun==false){
                this.shakeEffect(0.1);
                this.hitflag=true;
                cc.audioEngine.playEffect(this.punch_sound,false);

                if(this.playerside==true)
                {
                    //cc.find('small_sticker - 002_knee/0_Neck').getComponent(cc.RigidBody).fixedRotation = false;
                    cc.find('small_sticker - 002_knee/0_Body_01').getComponent(cc.RigidBody).fixedRotation = false;
                    cc.find('small_sticker - 002_knee/0_Body_02').getComponent(cc.RigidBody).fixedRotation = false;
                    //cc.find('small_sticker - 002_knee/0_Body_02').getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(-2000, 0), true);

                    if(this.hithand==1) 
                    {
                        cc.find('small_sticker - 002_knee/0_R_Arm_02').getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(40000, 15000), true);
                        cc.find('small_sticker - 002_knee/0_R_hand').getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(4000, 1500), true);
                    }
                    else 
                    {
                        cc.find('small_sticker - 002_knee/0_L_Arm_02').getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(40000, 1500), true);

                    }
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
                        cc.find('small_sticker - 002_knee/0_R_hand').getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(-4000, 1500), true);
                    }
                    else 
                    {
                        cc.find('small_sticker - 002_knee/0_L_Arm_02').getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(-40000, 15000), true);
                    
                    }
                        //this.playerSpeed = -2000;


                    //cc.find('small_sticker - 002_knee/0_Body_01').getComponent(cc.RigidBody).fixedRotation = true;
                    //cc.find('small_sticker - 002_knee/0_Body_02').getComponent(cc.RigidBody).fixedRotation = true;
                }
            }
            
            else if(this.jDown&&this.hitflag==false&&Global.player1_getgun==true&&this.gun_pointer.getComponent('weapon_instantiate').canCreateBullet==true){
                this.hitflag=true;
                this.shakeEffect(0.1);
                this.gun_pointer.getComponent('weapon_instantiate').createBullet();
                if(this.gunname=="desert_hawk_for_pick") cc.audioEngine.playEffect(this.desert_hawk_sound,false);
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
                    if (!this.change_scene_flag) {
                        this.change_scene_flag = true;
                        this.scheduleOnce(()=>{
                            cc.find('SceneControl').getComponent("SceneControl").nextScene();
                        }, 9);
                    }
                    this.excalibur_flag = false;
                    this.scheduleOnce(()=>{cc.audioEngine.playEffect(this.excalibur_break_sound,false);},4);
                },0.1);
            }
        } else if (this.gunname == "LaserGun_for_pick"){
            if(this.jDown==false && this.laserAimFinish){
                this.laserAimFinish = false;
                this.shakeEffect(0.1);
                this.gun_pointer.getComponent('weapon_instantiate').createBullet();
                cc.audioEngine.playEffect(this.LaserGun_sound,false);
                if(this.playerside==true)
                {
                    this.gun_pointer.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(-40000,(Math.floor(Math.random()*1)+-1)*10000), true);
                }
                else if(this.playerside==false)
                {
                    this.gun_pointer.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(40000, (Math.floor(Math.random()*1)+-1)*10000), true);
                }
                cc.log("is laser gun, shoot!!!");
            }

        }




        if((this.fDown&&Global.player1_getgun==true)/*||(Global.player1_dead==true&&Global.player1_getgun==true)*/){
            Global.player1_getgun = false;
            
            this.gun_pointer.destroy();
            if(this.gunname == "desert_hawk_for_pick")
            {
                this.throw_gun_pointer = cc.instantiate(this.desert_hawk_for_pick_prefab);
            }
            else if(this.gunname == "excalibur_for_pick")
            {
                this.throw_gun_pointer = cc.instantiate(this.excalibur_for_pick_prefab);
            }
            else if(this.gunname == "Grenade_launcher_for_pick")
            {
                this.throw_gun_pointer = cc.instantiate(this.Grenade_launcher_for_pick_prefab);
            } 
            else if(this.gunname == "LaserGun_for_pick"){
                cc.find("LaserGunRay_1").active = false;
                this.throw_gun_pointer = cc.instantiate(this.LaserGun_for_pick_prefab);
            }
            
            this.gunname = "nogun";
            
            
            if(this.playerside == true)
            {
                this.throw_gun_pointer.getComponent('weapon_disappear').initR(cc.find('small_sticker - 002_knee/0_R_hand'));
                this.throw_gun_pointer.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(3000, 500), true);
            } 
            else if(this.playerside == false)
            {
                this.throw_gun_pointer.getComponent('weapon_disappear').initL(cc.find('small_sticker - 002_knee/0_R_hand'));
                this.throw_gun_pointer.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(-3000, 500), true);
            }
            
            
            this.gun_instantiate_finish=false;
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

        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.playerSpeed, this.getComponent(cc.RigidBody).linearVelocity.y);
        //this.node.parent.getChildByName("0_R_hand").getComponent(cc.RigidBody).linearVelocity.y = this.getComponent(cc.RigidBody).linearVelocity.y;
        if(Global.player1_getgun){
            //cc.log(this.gun_pointer);
            //cc.log("gun up");
            //cc.log("1: "+ this.getComponent(cc.RigidBody).linearVelocity.y)
            this.gun_pointer.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.node.parent.getChildByName("0_R_hand").getComponent(cc.RigidBody).linearVelocity.x, this.node.parent.getChildByName("0_R_hand").getComponent(cc.RigidBody).linearVelocity.y);
        }

    }  

    shakeEffect(du) {
        if(cc.find('small_sticker - 002_yellow/1_Head').getComponent("debug_body1_2").local_dead==false&&this.shake_flag==false&&Global.player1_dead==false)
        {
            this.shake_flag=true;
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
                this.shake_flag=false;
            }, du);
        }
    }

    littleshakeEffect() {
        if(cc.find('small_sticker - 002_yellow/1_Head').getComponent("debug_body1_2").local_dead==false&&Global.player1_dead==false)
        {
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
    }



    instantiate_gun(name)
    {
        if(Global.player1_dead==false)
        {
            if(name == 'desert_hawk_for_pick'&&this.gun_instantiate_finish==false)
            {
                this.gunname = name;
                this.gun_pointer = cc.instantiate(this.desert_hawk_prefab); 
                this.gun_pointer.getComponent('weapon_instantiate').init(cc.find('small_sticker - 002_knee/0_R_hand'));
                cc.log("instantiate!!");
            }    
            else if(name == 'excalibur_for_pick'&&this.gun_instantiate_finish==false)
            {
                this.gunname = name;
                this.gun_pointer = cc.instantiate(this.excalibur_prefab); 
                this.gun_pointer.getComponent('weapon_instantiate').init(cc.find('small_sticker - 002_knee/0_R_hand'));
                cc.log("instantiate!!");
            }
            else if(name == 'Grenade_launcher_for_pick'&&this.gun_instantiate_finish==false)
            {
                this.gunname = name;
                this.gun_pointer = cc.instantiate(this.Grenade_launcher_prefab); 
                this.gun_pointer.getComponent('weapon_instantiate').init(cc.find('small_sticker - 002_knee/0_R_hand'));
                cc.log("instantiate!!");

            } else if(name == 'LaserGun_for_pick' && this.gun_instantiate_finish == false)
            {
                this.gunname = name;
                this.gun_pointer = cc.instantiate(this.LaserGun_prefab); 
                this.gun_pointer.getComponent('weapon_instantiate').init(cc.find('small_sticker - 002_knee/0_R_hand'));
                cc.log("instantiate!!");
                cc.find("LaserGunRay_1").active = true;
            }  

            this.gun_instantiate_finish=true;
        }
    }
    

    init_hit_smoke() {
        var hit_smoke_yellow_prefab = cc.instantiate(this.hit_smoke_black);
        hit_smoke_yellow_prefab.parent = this.node.parent;
        hit_smoke_yellow_prefab.getComponent("smoke1").hit(this.node.x, this.node.y, Global.player1_percent, cc.find('small_sticker - 002_yellow/1_Head').getComponent("debug_body1_2").playerside);
    }
    init_jump_smoke() {
        var x = this.node.x;
        var y = this.node.y;
        for (var i = 0; i < 3; i++) {
            var jump_smok_prefab = cc.instantiate(this.jump_smoke);
            jump_smok_prefab.parent = this.node.parent;
            jump_smok_prefab.getComponent("smoke1").jump(x, y);
        }
    }
    dead_from_laser() {
        Global.player1_dead = true;
        //for (var i = 0; i < 4; i++) {
            this.init_hit_smoke();
            Global.player1_percent += 3;
        //}
    }
    onBeginContact(contact, self, other) {
        var direction = contact.getWorldManifold().normal;
        //cc.log("YYYYYYYYY: "+direction.y);
        if (other.node.name == "platform" && direction.x < 0) {
            Global.onWall = 1;
            Global.head_contact = true;
            //cc.log("platform");
        } else if (other.node.name == "platform" && direction.x > 0) {
            Global.onWall = 2;
            Global.head_contact = true;
            //cc.log("platform");
        }

        // hit by stick2's hand
        if ((other.node.name == "1_R_Arm_02" || other.node.name == "1_L_Arm_02") && cc.find('small_sticker - 002_yellow/1_Head').getComponent("debug_body1_2").playerside) {            // left hit
            this.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(10000 + Global.player1_percent * 1000, Global.player1_percent * 1000), true);
            for (var i = 0; i < Global.player1_percent / 100 + 4; i++) {
                this.init_hit_smoke();
                Global.player1_percent += this.hit_coff;
            }
        } else if ((other.node.name == "1_R_Arm_02" || other.node.name == "1_L_Arm_02") && !cc.find('small_sticker - 002_yellow/1_Head').getComponent("debug_body1_2").playerside) {    // right hit
            this.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(-10000 + Global.player1_percent * -1000, Global.player1_percent * 1000), true);
            for (var i = 0; i < Global.player1_percent / 100 + 4; i++) {
                this.init_hit_smoke();
                Global.player1_percent += this.hit_coff;
            }
        }
        // hit by laser
    }
    onEndContact(contact, self, other) {
        if (other.node.name == "platform") {
            if (Global.onWall == 1 && Global.onGround) Global.onWall = 3;
            else if (Global.onWall == 2 && Global.onGround)  Global.onWall = 4;
            //Global.head_contact = false;
        }
    }
    
    local_stop(){
        cc.audioEngine.stopAll();
    }
}


