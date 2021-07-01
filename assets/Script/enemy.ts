
const {ccclass, property} = cc._decorator;

@ccclass
export default class enemy extends cc.Component 
{
    //private anim = null;

    private collider = null;

    private enemyManager = null;

    private enemySpeed = 0;

    public init(node: cc.Node, num)
    {   

        this.collider = this.getComponent(cc.PhysicsBoxCollider);

        this.node.opacity = 255;

        this.setInitPos(node, num);

    }
    start() {
        //cc.director.getPhysicsManager().debugDrawFlags = 1;
    }
    // this function is called when the enemy manager calls "get" API.
    reuse(enemyManager)
    {
        this.enemyManager = enemyManager;
    }

    //this function sets the enemy's initial position when it is reused.
    private setInitPos(node: cc.Node, num)
    {
        if(num == 1) {
            if(Math.random() < 0.5) {
                this.node.position = cc.v2(600, -70);
            }
        }
        else if(num == 2) {
            if(Math.random() < 0.375) {
                this.node.position = cc.v2(600, -5);
            }
        }
        else if(num == 3) {
            if(Math.random() < 0.25) {
                this.node.position = cc.v2(600, 60);
            }
        }

        this.node.parent = node;
        this.node.scaleX = 1;
        this.enemySpeed = -350;
        this.collider.enabled = true;
        this.collider.apply();
    }

    // check if current position is out of view.
    private boundingDetect()
    {
        if(this.node.x < -650) {
            this.enemyManager.put(this.node);
            //console.log("reach boundary");
        }  
    }

    update(dt)
    {
        this.node.x += this.enemySpeed * dt;
        this.boundingDetect();
    }

    //check if the collision is valid or not, and call "deadEffect" if the collision is valid.
    onBeginContact(contact, selfCollider, otherCollider)
    {
        if(otherCollider.node.name == "player") {
            console.log("hit the player");
        }
    }
}
