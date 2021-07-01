const {ccclass, property} = cc._decorator;

@ccclass
export default class Treadhalfmgr extends cc.Component 
{
    @property(cc.Prefab)
    private enemyPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    private enemyPrefab2: cc.Prefab = null;

    private enemyPool = null;

    onLoad()
    {   
        
        this.schedule(()=> {
            let enemy = cc.instantiate(this.enemyPrefab);
            enemy.getComponent('Treadhalf').init(this.node, 1);
        }, 0.12);

        this.schedule(()=> {
            let enemy = cc.instantiate(this.enemyPrefab2);
            enemy.getComponent('Treadhalf').init(this.node, 2);
        }, 0.12);
        
    }
}
