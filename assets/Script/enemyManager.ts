const {ccclass, property} = cc._decorator;

@ccclass
export default class enemyManager extends cc.Component 
{
    @property(cc.Prefab)
    private enemyPrefab: cc.Prefab = null;

    private enemyPool = null;

    onLoad()
    {
        this.enemyPool = new cc.NodePool('enemy');

        let maxEnemyNum = 8;

        for(let i: number = 0; i < maxEnemyNum; i++)
        {
            let enemy = cc.instantiate(this.enemyPrefab);

            this.enemyPool.put(enemy);
        }
        
        this.schedule(this.createEnemy1, 1); //set one enemy to the scene every 0.5s .
        this.schedule(this.createEnemy2, 0.75);
        this.schedule(this.createEnemy3, 0.5);
    }

    //call this function to add new enemy to the scene.
    private createEnemy1()
    {
        let enemy = null;

        if(this.enemyPool.size() > 0)
            enemy = this.enemyPool.get(this.enemyPool);

        if(enemy != null)
            enemy.getComponent('enemy').init(this.node, 1);
    }
    
    private createEnemy2()
    {
        let enemy = null;

        if(this.enemyPool.size() > 0)
            enemy = this.enemyPool.get(this.enemyPool);

        if(enemy != null)
            enemy.getComponent('enemy').init(this.node, 2);
    }

    private createEnemy3()
    {
        let enemy = null;

        if(this.enemyPool.size() > 0)
            enemy = this.enemyPool.get(this.enemyPool);

        if(enemy != null)
            enemy.getComponent('enemy').init(this.node, 3);
    }
}
