const {ccclass, property} = cc._decorator;

@ccclass
export default class barrel extends cc.Component 
{
    @property(cc.Prefab)
    private explosionPrefab: cc.Prefab = null;

    barrel_flag = false;

    //detect collision with enemies
    onBeginContact(contact, selfCollider, otherCollider)
    {
        if(otherCollider.node.group == "bullet1"||otherCollider.node.group == "bullet2"||otherCollider.node.group == "explosion")
        {
            if(otherCollider.node.name!="grenade_1"&&otherCollider.node.name!="grenade_2")
            {
                if(this.barrel_flag==false)
                {
                    this.barrel_flag=true;
                    this.node.getComponent(cc.Animation).play();
                    this.scheduleOnce(() => {
                    cc.instantiate(this.explosionPrefab).getComponent("explosion").init(this.node);
                    cc.find("small_sticker - 002_knee/0_Head").getComponent("debug_body1").shakeEffect(1);
                    selfCollider.node.destroy();
                    },3);
                }
            }
        } 
    }
}
