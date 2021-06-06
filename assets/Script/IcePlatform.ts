
const {ccclass, property} = cc._decorator;

@ccclass
export default class enemy extends cc.Component 
{
    private anim = null;

    private collider = null;


    //if this is called, the enemy will fade out in 1s and go back to the enemy pool.
    private deadEffect()
    {
        this.node.runAction(cc.fadeOut(1));
        this.node.destroy();
        
        /*

        let finished = cc.callFunc(() => {
            this.enemyManager.put(this.node);
        });

        this.node.runAction(cc.sequence(fade, finished));
        */
    }

    //check if the collision is valid or not, and call "deadEffect" if the collision is valid.
    onBeginContact(contact, selfCollider, otherCollider)
    {
        if(otherCollider.node.name == "bullet" && !otherCollider.node.getComponent('Bullet').isTriggered)
        {
            cc.log("get hit!");
            otherCollider.node.getComponent('Bullet').isTriggered = true;
            this.deadEffect();
        }
    }
}
