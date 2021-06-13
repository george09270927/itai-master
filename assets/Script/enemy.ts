
const {ccclass, property} = cc._decorator;

@ccclass
export default class enemy extends cc.Component 
{
    //private anim = null;

    private collider = null;

    private enemyManager = null;

    private enemySpeed = 0;

    public init(node: cc.Node)
    {   
        //this.anim = this.getComponent(cc.Animation);

        this.collider = this.getComponent(cc.PhysicsBoxCollider);

        this.node.opacity = 255;

        this.setInitPos(node);

        //this.anim.play('enemy');
    }

    // this function is called when the enemy manager calls "get" API.
    reuse(enemyManager)
    {
        this.enemyManager = enemyManager;
    }

    //this function sets the enemy's initial position when it is reused.
    private setInitPos(node: cc.Node)
    {
        let num = Math.random();
        let pos = Math.random();

        if(num > 0.2) {
            // I use random to decide where the enemy appear after reuse.
            if(pos < 0.33) {
                this.node.position = cc.v2(600, -180);          
            }
            else if(pos >= 0.33 && pos < 0.66) {
                this.node.position = cc.v2(600, -120); 
            }
            else {
                this.node.position = cc.v2(600, -60);
            }

            this.node.parent = node;
            this.node.scaleX = 1;
            this.enemySpeed = -350;
            this.collider.enabled = true;
            this.collider.offset = cc.v2(20, 0);
            this.collider.apply();
        }
    }

    // check if current position is out of view.
    private boundingDetect()
    {
        if(this.node.x > 650 || this.node.x < -650) {
            this.enemyManager.put(this.node);
            console.log("reach boundary");
        }
            
    }
    /*
    //if this is called, the enemy will fade out in 1s and go back to the enemy pool.
    private deadEffect()
    {
        this.enemySpeed = 0;

        this.collider.enabled = false;

        let fade = cc.fadeOut(1);

        let finished = cc.callFunc(() => {
            this.enemyManager.put(this.node);
        });

        this.node.runAction(cc.sequence(fade, finished));
    }
    */

    update(dt)
    {
        this.node.x += this.enemySpeed * dt;

        this.boundingDetect();
    }

    //check if the collision is valid or not, and call "deadEffect" if the collision is valid.
    onBeginContact(contact, selfCollider, otherCollider)
    {
        /*
        if(otherCollider.node.name == "bullet" && !otherCollider.node.getComponent('Bullet').isTriggered)
        {
            otherCollider.node.getComponent('Bullet').isTriggered = true;

            //this.anim.stop();

            this.deadEffect();
        }
        */
        if(otherCollider.node.name == "player") {
            console.log("hit the player");
        }
    }
}
