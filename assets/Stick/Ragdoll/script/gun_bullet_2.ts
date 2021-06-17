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
        cc.log("bullet hit :" + otherCollider.name );
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
}
