
const {ccclass, property} = cc._decorator;

@ccclass
export default class Treadhalf extends cc.Component 
{
    private moveSpeed: number = -800;

    private collider = null;

    private enemyManager = null;

    private enemySpeed = -600;

    public init(node: cc.Node, num)
    {   

        this.collider = this.getComponent(cc.PhysicsBoxCollider);

        this.node.opacity = 255;

        this.setInitPos(node, num);

    }

    // this function is called when the enemy manager calls "get" API.
    reuse(enemyManager)
    {
        this.enemyManager = enemyManager;
    }

    //this function sets the enemy's initial position when it is reused.
    private setInitPos(node: cc.Node, num)
    {
        this.node.parent = node;
        this.node.scaleX = 1;

        if(num == 1) {   
            this.node.position = cc.v2(390, -110);
            this.enemySpeed = -600;
            this.collider.enabled = true;
            this.collider.apply();
        }
        
        else if(num == 2) {
            this.node.position = cc.v2(-400, -145);
            this.enemySpeed = 600;
        }
        
    }

    // check if current position is out of view.
    private boundingDetect()
    {
        if(this.node.x < -400 || this.node.x > 390) {
            this.node.destroy();
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

    onPostSolve(contact, selfCollider, otherCollider) {
        //if(otherCollider.node.group == "stick" || otherCollider.node.group == "stick2" || otherCollider.node.group == "leg") {
        if(otherCollider.node.group == "leg") {
            let vy = otherCollider.getComponent(cc.RigidBody).linearVelocity.y;
            otherCollider.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.moveSpeed, vy);
        }
    }
}
