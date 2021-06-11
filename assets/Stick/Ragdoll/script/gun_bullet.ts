const {ccclass, property} = cc._decorator;

@ccclass
export default class gun_bullet extends cc.Component 
{

    private anim = null;

    //private bulletManager = null;

    public isTriggered = false; // I add this to make the bullet kill one enemy at a time.

    // when created, the bullet need to be placed at correct position and play animation.
    public init(node: cc.Node) 
    {


        this.setInitPos(node);

        this.bulletMove();

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
        }
        else 
        {
            this.scheduleOnce(() => {
                this.node.stopAllActions();
                //this.bulletManager.put(this.node);

                cc.log("///recycle bullet///");
            selfCollider.node.destroy();
            },0.1); // for better animation effect, I delay 0.1s when bullet hits the enemy
        }
    }
}
