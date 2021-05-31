const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends cc.Component 
{

    private anim = null; //this will use to get animation component

    private animateState = null; //this will use to record animationState

    @property(cc.Prefab)
    private bulletPrefab: cc.Prefab = null;

    private bulletPool = null; // this is a bullet manager, and it control the bullet resource

    private playerSpeed: number = 0;

    private zDown: boolean = false; // key for player to go left

    private xDown: boolean = false; // key for player to go right

    private jDown: boolean = false; // key for player to shoot

    onLoad()
    {
        this.anim = this.getComponent(cc.Animation);

        cc.director.getPhysicsManager().enabled = true;

        this.bulletPool = new cc.NodePool('Bullet');

        let maxBulletNum = 5;

        for(let i: number = 0; i < maxBulletNum; i++)
        {
            let bullet = cc.instantiate(this.bulletPrefab);

            this.bulletPool.put(bullet);
        }
    }

    start() 
    {
        // add key down and key up event
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    update(dt)
    {
        this.node.x += this.playerSpeed * dt;  //move player
    }

    onKeyDown(event) 
    {
        switch(event.keyCode) 
        {
            case cc.macro.KEY.z:

                this.zDown = true;

                this.xDown = false;

                break;

            case cc.macro.KEY.x:

                this.xDown = true;

                this.zDown = false;

                break;

            case cc.macro.KEY.j:

                this.jDown = true;

                break;
        }
    }

    onKeyUp(event)
    {
        switch(event.keyCode) 
        {
            case cc.macro.KEY.z:

                this.zDown = false;

                break;

            case cc.macro.KEY.x:

                this.xDown = false;

                break;

            case cc.macro.KEY.j:

                this.jDown = false;

                break;
        }
    }
}