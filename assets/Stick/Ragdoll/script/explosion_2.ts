const {ccclass, property} = cc._decorator;
import { Global } from "./Leg_force_2";

@ccclass
export default class explosion_2 extends cc.Component 
{
    private anim = null;

    //private bulletManager = null;
    private hit_coff = 3;

    public isTriggered = false; // I add this to make the bullet kill one enemy at a time.

    // when created, the bullet need to be placed at correct position and play animation.
    public init(node: cc.Node) 
    {
        this.setInitPos(node);
    }


    private setInitPos(node: cc.Node)
    {
        this.node.parent = node.parent; 
        this.node.position = cc.v2(0,0);

        this.node.position = this.node.position.addSelf(node.position);
    }
    
    //detect collision with enemies
    onBeginContact(contact, selfCollider, otherCollider)
    {
        //cc.log("bullet hit :" + otherCollider.name );
        if(this.node.name == "explosion")
        {

            this.scheduleOnce(() => {
                this.node.stopAllActions();
                //cc.log("///recycle bullet///");
            //this.node.runAction(cc.fadeOut(3));
            selfCollider.node.destroy();
            },1); 
            
            if (otherCollider.node.group == "stick") {
                //cc.log("stick1 been hit");
                //Global.player1_percent += this.hit_coff;
            } else if (otherCollider.node.group == "stick2") {
                //cc.log("stick2 been hit");
                Global.player2_percent += this.hit_coff;
                Global.player2_dead=true;
            }
        }
    }
}