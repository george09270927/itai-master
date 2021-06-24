const {ccclass, property} = cc._decorator;
import { Global } from "./Leg_force";

@ccclass
export default class gun_bullet_2 extends cc.Component 
{

    @property(cc.Prefab)
    private explosionPrefab: cc.Prefab = null;

    private anim = null;

    //private bulletManager = null;
    private hit_coff = 3;

    public isTriggered = false; // I add this to make the bullet kill one enemy at a time.

    hit_laser = false;
    // when created, the bullet need to be placed at correct position and play animation.
    public init(node: cc.Node) 
    {


        this.setInitPos(node);
        if(this.node.name == "grenade_1"||this.node.name=="grenade_2")
        {
            if(this.node.scaleX > 0)
            this.node.getComponent(cc.RigidBody).applyForceToCenter(cc.v2(1000, 1500),true);
            else
                this.node.getComponent(cc.RigidBody).applyForceToCenter(cc.v2(-1000, 1500),true);
        } else if(this.node.name == "lasershoot_red_2"){
            cc.log("22222222222");
            cc.find("LaserGunRay_2").active = false;
            //let lasereffect = cc.sequence(cc.scaleBy(0.1, 1, 6).easing(cc.easeSineIn()),cc.delayTime(0.1),  cc.spawn(cc.fadeOut(0.5),cc.scaleBy(0.5, 0, 0).easing(cc.easeOut(3))), cc.callFunc(()=>{
            let lasereffect = cc.sequence(cc.scaleBy(0.3, 1, 5).easing(cc.easeOut(10)),  cc.scaleBy(0.4, 1, 0.20), cc.scaleBy(0.3, 0, 0).easing(cc.easeOut(1.5)), cc.callFunc(()=>{

                this.node.destroy();
                cc.log(this.node.parent.name);
                //cc.log(node.parent.name);
                if(this.node.parent.name == "small_sticker - 002_yellow") 
                {
                
                    cc.find("LaserGunRay_2").active = true;
                }
            }));
            this.node.runAction(lasereffect);

        }
        else this.bulletMove();

    }

    // this function is called when the bullet manager calls "get" API.
    /*
    reuse(bulletManager)
    {
        this.bulletManager = bulletManager;

        this.isTriggered = false;
    }
    */

    //this function sets the bullet's initial position when it is reused.
    private setInitPos(node: cc.Node)
    {
        this.node.parent = node.parent; // don't mount under the player, otherwise it will change direction when player move

        if(this.node.name == "lasershoot_red_2"){
            //cc.log(cc.find("small_sticker - 002_yellow/0_R_hand"));
            if(node.scaleX > 0)
            {

                this.node.position = cc.v2(1050 * Math.cos(cc.find("small_sticker - 002_yellow/LaserGun_prefab_2").angle *Math.PI /180), 1050 *Math.sin(cc.find("small_sticker - 002_yellow/LaserGun_prefab_2").angle *Math.PI /180));
                cc.log(cc.find("small_sticker - 002_yellow/LaserGun_prefab_2").angle);
                this.node.angle = cc.find("small_sticker - 002_yellow/LaserGun_prefab_2").angle;
                this.node.scaleX = 1;
            }
            else
            {
                this.node.position = cc.v2(-1050*Math.cos(cc.find("small_sticker - 002_yellow/LaserGun_prefab_2").angle *Math.PI /180), -1050*Math.sin(cc.find("small_sticker - 002_yellow/LaserGun_prefab_2").angle *Math.PI /180));
                this.node.angle = cc.find("small_sticker - 002_yellow/LaserGun_prefab_2").angle;
                this.node.scaleX = -1;
            }
        }

        else {
            if(node.scaleX > 0)
            {
                this.node.position = cc.v2(62, 8);

                this.node.scaleX = 1;
            }
            else
            {
                this.node.position = cc.v2(-62, 8);

                this.node.scaleX = -1;
            }
        }

        this.node.position = this.node.position.addSelf(node.position);
        cc.log(this.node.group);
    }

    //make the bullet move from current position
    private bulletMove()
    { 
    
        let speed = 0;
        if(this.node.name == "excalibur_beam_1"||this.node.name == "excalibur_beam_2")
        {
            if(this.node.scaleX > 0)
                speed = 100;
            else
                speed = -100;
        }
        else 
        {

            if(this.node.scaleX > 0)
                speed = 600;
            else
                speed = -600;
        }

        

        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(speed, 0);
    
    }
    
    //detect collision with enemies
    onBeginContact(contact, selfCollider, otherCollider)
    {
        //cc.log("bullet hit :" + otherCollider.name );
        if(this.node.name == "excalibur_beam_1"||this.node.name == "excalibur_beam_2")
        {
            this.scheduleOnce(() => {
                this.node.stopAllActions();
                cc.log("///recycle bullet///");
            this.node.runAction(cc.fadeOut(5));
            //selfCollider.node.destroy();
            },0.5); 
            this.scheduleOnce(() => {
                this.node.stopAllActions();
                cc.log("///recycle bullet///");
            //this.node.runAction(cc.fadeOut(3));
            selfCollider.node.destroy();
            },10); 
            
            if (otherCollider.node.group == "stick" && this.node.group == "bullet2") {
                cc.log("stick2 been hit");
                this.schedule(() => {
                    Global.player1_percent += this.hit_coff;
                },0.03);
                //Global.player2_percent += this.hit_coff;
            }
        }
        else if(this.node.name == "grenade_1"||this.node.name == "grenade_2")
        {
            
            this.scheduleOnce(() => {
                this.node.stopAllActions();
            cc.instantiate(this.explosionPrefab).getComponent("explosion_2").init(this.node);
            cc.find("small_sticker - 002_yellow/1_Head").getComponent("debug_body1_2").shakeEffect(1);
            selfCollider.node.destroy();
            },1);
        
        } else if (this.node.name == "lasershoot_red_2"){
            //cc.log("gogogogogogo");
            //Global.player1_percent += this.hit_coff;
            this.hit_laser = true;
            if (otherCollider.node.group == "stick" && this.node.group == "laser") {
                this.schedule(() => {
                    if (this.hit_laser) Global.player1_percent += 1;
                },0.08);
            }
            // the force to the black when been hit by laser
            if (cc.find('small_sticker - 002_yellow/1_Head').getComponent("debug_body1_2").playerside) {
                cc.find("small_sticker - 002_knee/0_Head").getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(20000, 0), true);
            } else if (!cc.find('small_sticker - 002_yellow/1_Head').getComponent("debug_body1_2").playerside) {
                cc.find("small_sticker - 002_knee/0_Head").getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(-20000, 0), true);
            }
        }
        else    // desert hawk red beam
        {
            
            this.scheduleOnce(() => {
                this.node.stopAllActions();
                //this.bulletManager.put(this.node);

                cc.log("///recycle bullet///");
            selfCollider.node.destroy();
            },0.1); // for better animation effect, I delay 0.1s when bullet hits the enemy
        
            if (otherCollider.node.group == "stick" && this.node.group == "bullet2") {
                //cc.log("stick2 been hit");
                Global.player1_percent += this.hit_coff;
            }
        }
    }
    onEndContact(contact, selfCollider, otherCollider) {
        if (this.node.name == "lasershoot_red_2") this.hit_laser = false;
    }
}
