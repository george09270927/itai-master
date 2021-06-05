const {ccclass, property} = cc._decorator;

@ccclass
export default class weapon_instantiate extends cc.Component {


    @property(cc.Prefab)
    private bulletPrefab: cc.Prefab = null;

    private canCreateBullet: boolean = true;

    private bulletInterval: number = 2; 



    onLoad() {

    }

    public init(node: cc.Node) 
    {
        this.setInitPos(node);
    }

    //this function sets the bullet's initial position when it is reused.
    private setInitPos(node: cc.Node)
    {
        this.node.parent = node.parent; // don't mount under the player, otherwise it will change direction when player move

        this.node.position = cc.v2(0,0);

        //cc.find('small_sticker - 002_knee/0_R_hand').getComponent(cc.DistanceJoint).frequency = 0;

        this.node.getComponent(cc.RevoluteJoint).connectedBody = cc.find('small_sticker - 002_knee/0_R_hand').getComponent(cc.RigidBody);

        

        this.node.group = "hand";

        this.node.position = this.node.position.addSelf(node.position);
    }






    private createBullet()
    {
        this.canCreateBullet = false;
        this.scheduleOnce(function(){
            this.canCreateBullet = true;
        }, this.bulletInterval);

        let bullet = cc.instantiate(this.bulletPrefab);
        bullet.getComponent('gun_bullet').init(this.node);
    }
}
