const {ccclass, property} = cc._decorator;
import explosion from "./explosion";
import { Global } from "./Leg_force_2";

@ccclass
export default class gun_bullet extends cc.Component 
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
        //cc.log(this.node.parent.name);
        if(this.node.name == "grenade_1"||this.node.name=="grenade_2")
        {
            if(this.node.scaleX > 0)
            this.node.getComponent(cc.RigidBody).applyForceToCenter(cc.v2(1000, 1500),true);
            else
                this.node.getComponent(cc.RigidBody).applyForceToCenter(cc.v2(-1000, 1500),true);

        } else if(this.node.name == "lasershoot_red_1"){
            cc.log("11111111111");
            cc.find("LaserGunRay_1").active = false;
            //let lasereffect = cc.sequence(cc.scaleBy(0.1, 1, 6).easing(cc.easeSineIn()),cc.delayTime(0.1),  cc.spawn(cc.fadeOut(0.5),cc.scaleBy(0.5, 0, 0).easing(cc.easeOut(3))), cc.callFunc(()=>{
            let lasereffect = cc.sequence(cc.scaleBy(0.3, 1, 5).easing(cc.easeOut(10)),  cc.scaleBy(0.4, 1, 0.20), cc.scaleBy(0.3, 0, 0).easing(cc.easeOut(1.5)), cc.callFunc(()=>{

                this.node.destroy();
                cc.log(this.node.parent.name);
                //cc.log(node.parent.name);
                if(this.node.parent.name == "small_sticker - 002_knee") {
                    //cc.log("its omneoneoneoneoe");
                    cc.find("LaserGunRay_1").active = true;
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

        if(this.node.name == "lasershoot_red_1"){
            //cc.log(cc.find("small_sticker - 002_knee/0_R_hand"));
            if(node.scaleX > 0)
            {

                this.node.position = cc.v2(1050 * Math.cos(cc.find("small_sticker - 002_knee/LaserGun_prefab_1").angle *Math.PI /180), 1050 *Math.sin(cc.find("small_sticker - 002_knee/LaserGun_prefab_1").angle *Math.PI /180));
                cc.log(cc.find("small_sticker - 002_knee/LaserGun_prefab_1").angle);
                this.node.angle = cc.find("small_sticker - 002_knee/LaserGun_prefab_1").angle;
                this.node.scaleX = 1;
            }
            else
            {
                this.node.position = cc.v2(-1050*Math.cos(cc.find("small_sticker - 002_knee/LaserGun_prefab_1").angle *Math.PI /180), -1050*Math.sin(cc.find("small_sticker - 002_knee/LaserGun_prefab_1").angle *Math.PI /180));
                this.node.angle = cc.find("small_sticker - 002_knee/LaserGun_prefab_1").angle;
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
        var direction = contact.getWorldManifold().normal;
        //cc.log("bullet hit :" + otherCollider.name );
        if(this.node.name == "excalibur_beam_1"||this.node.name == "excalibur_beam_2")
        {
            this.scheduleOnce(() => {
                this.node.stopAllActions();
                //cc.log("///recycle bullet///");
            this.node.runAction(cc.fadeOut(5));
            //selfCollider.node.destroy();
            },0.5); 
            this.scheduleOnce(() => {
                this.node.stopAllActions();
                //cc.log("///recycle bullet///");
            //this.node.runAction(cc.fadeOut(3));
            selfCollider.node.destroy();
            },10); 
            
            if (otherCollider.node.group == "stick2" && this.node.group == "bullet1") {
                this.schedule(() => {
                    Global.player2_percent += this.hit_coff;
                },0.03);
                //Global.player1_percent += this.hit_coff;

            }
        }
        else if(this.node.name == "grenade_1"||this.node.name == "grenade_2")
        {
            
            this.scheduleOnce(() => {
                this.node.stopAllActions();
            cc.instantiate(this.explosionPrefab).getComponent("explosion").init(this.node);
            cc.find("small_sticker - 002_knee/0_Head").getComponent("debug_body1").shakeEffect(1);
            selfCollider.node.destroy();
            },1);
        
        } else if (this.node.name == "lasershoot_red_1"){
            //cc.log("gogogogogogo");
            this.hit_laser = true;
            if (otherCollider.node.group == "stick2" && this.node.group == "laser") {
                this.schedule(() => {
                    if (this.hit_laser) Global.player2_percent += 1;
                },0.08);

                // the force to the yellow when been hit by laser
                if (cc.find('small_sticker - 002_knee/0_Head').getComponent("debug_body1").playerside) {
                    cc.find("small_sticker - 002_yellow/1_Head").getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(20000, 0), true);
                } else if (!cc.find('small_sticker - 002_knee/0_Head').getComponent("debug_body1").playerside) {
                    cc.find("small_sticker - 002_yellow/1_Head").getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(-20000, 0), true);
                }

            }
            //Global.player2_percent += this.hit_coff;

        } else if (this.node.name == "red_beam_1") {
            if (otherCollider.node.group == "stick2" && this.node.group == "bullet1") {
                //cc.log("stick1 been hit");
                Global.player2_percent += this.hit_coff;
                this.scheduleOnce(() => {
                    this.node.stopAllActions();
                    //this.bulletManager.put(this.node);
    
                    if (selfCollider.node) {
                        selfCollider.node.destroy();
                        cc.log("destroy success!!!!!!!!!!!");
                    }
                },0.1);
                cc.find("small_sticker - 002_yellow/1_Head").getComponent("debug_body1_2").init_hit_smoke();
            }
            else if(otherCollider.node.group=="platform"&&this.node.group=="bullet1")
            {
                contact.disabled = true;
            }
        } else {// desert hawk red beam hit wall?     
            
            this.scheduleOnce(() => {
                this.node.stopAllActions();
                //this.bulletManager.put(this.node);

                cc.log("///recycle bullet///");
            selfCollider.node.destroy();
            },0.1); // for better animation effect, I delay 0.1s when bullet hits the enemy
        
            if (otherCollider.node.group == "stick2" && this.node.group == "bullet1") {
                //cc.log("stick1 been hit");
                Global.player2_percent += this.hit_coff;
            }
        }
    }
    onEndContact(contact, selfCollider, otherCollider) {
        if (this.node.name == "lasershoot_red_1") this.hit_laser = false;
    }
}
