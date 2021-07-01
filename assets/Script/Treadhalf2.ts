
const {ccclass, property} = cc._decorator;

@ccclass
export default class Treadhalf extends cc.Component 
{
    private moveSpeed: number = -800;
    private collider = null;
    private enemyManager = null;
    private enemySpeed = -600;

    private platform = null;
    private iniX1: number = 0;
    private iniY1: number = 0;
    private iniX2: number = 0;
    private iniY2: number = 0;

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
        this.platform = cc.find("Canvas/Treadmill/platform");
        let dist = this.platform.width / 20;
        this.iniX1 = this.platform.x + this.platform.width/2 - dist;
        this.iniY1 = this.platform.y + this.platform.height/2 + 2;
        this.iniX2 = this.platform.x - this.platform.width/2 + dist;
        this.iniY2 = this.platform.y - this.platform.height/2 - 2;

        this.node.parent = node;
        this.node.scaleX = 1;
        if(num == 1) {
            this.node.position = cc.v2(this.iniX1, this.iniY1);
            this.enemySpeed = -600;
            this.collider.enabled = true;
            this.collider.apply();
        }     
        else if(num == 2) {
            this.node.position = cc.v2(this.iniX2, this.iniY2);
            this.enemySpeed = 600;
        }
    }

    // check if current position is out of view.
    private boundingDetect()
    {
        if(this.node.x < this.iniX2 || this.node.x > this.iniX1) {
            this.node.destroy();
        }
    }

    update(dt)
    {
        this.node.x += this.enemySpeed * dt;
        this.boundingDetect();
    }

    onPostSolve(contact, selfCollider, otherCollider) {
        //if(otherCollider.node.group == "stick" || otherCollider.node.group == "stick2" || otherCollider.node.group == "leg") {
        if(otherCollider.node.group == "leg") {
            let vy = otherCollider.getComponent(cc.RigidBody).linearVelocity.y;
            otherCollider.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.moveSpeed, vy);
        }
    }
}
