

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    public collider = null;

    public flag: boolean = true;

    public points = null;
    onLoad () {
        //this.draw();
        cc.log("point display");
        cc.log(this.getComponent(cc.PhysicsPolygonCollider));
        cc.log(this.getComponent(cc.PhysicsPolygonCollider).points);
        
        this.collider = this.getComponent(cc.PhysicsPolygonCollider);
        cc.log("collider: " + this.collider);
        cc.log("collider's poinrts: " + this.collider.points);
        cc.log("point lenght: "+this.collider.points.length);
        cc.log(this.collider.points[0]);
        cc.log(this.collider.points[0].x);
        cc.log(this.collider.points[0].y);
        cc.log(this.collider.points[1]);
        cc.log(this.collider.points);

        //cc.log("change");

        //this.collider.points[0].x = 0;
        //this.collider.points[0].y = 0;
        //this.collider.points[0] = cc.v2(20, 20);

        cc.log(this.collider.points[0]);


        this.draw();
        
    }
    draw () {

        const points = this.getComponent(cc.PhysicsPolygonCollider).points;
        const ctx = this.getComponent(cc.Graphics);
        
        ctx.clear();
        const len = points.length;
        ctx.moveTo(points[len - 1].x, points[len - 1].y);
        for (let i = 0; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.fill();

    }
    start () {

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

        cc.director.getPhysicsManager().debugDrawFlags=1;
    }

    onKeyDown(event) 
    {
        switch(event.keyCode) 
        {
            case cc.macro.KEY.z:

                //his.cutting();
                cc.log("copy");
                if(this.flag == true){
                    this.copy(); 
                    this.flag = false; 
                }
                
                break;
        }
    }

    copy(){
        cc.log("in copy")
        // 设置第一个碰撞体

        cc.log("change");
        this.collider.points[0] = cc.v2(-50, -20);
        this.collider.points[1] = cc.v2(50, 20);
        cc.log("point1 after change: " + this.collider.points);
        
        
        this.collider.apply();
        //this.collider.node.getComponent(Item).draw();
        this.draw();
        // 克隆一个本体作为第二个
        const cloneNode = cc.instantiate(this.node);
        var cloneNodeCollider = cloneNode.getComponent(cc.PhysicsPolygonCollider);
        cc.log("cloneNode point: ");
        cloneNodeCollider.points[0] = cc.v2(-50, -50);
        cloneNodeCollider.points[1] = cc.v2(50, -50);
        cloneNodeCollider.points[2] = cc.v2(50, 20);
        cloneNodeCollider.points[3] = cc.v2(-50, -20);
        cc.log(cloneNodeCollider.points);
        cloneNode.getComponent(cc.PhysicsPolygonCollider).apply();
        this.node.parent.addChild(cloneNode);
        //const comp = cloneNode.getComponent(cc.PhysicsPolygonCollider);
        //comp.points = array2;
        
        //cloneNode.draw();
        
        //cloneNode.getComponent(Item).draw();
        
        
    }
    
    cutting(){
        this.draw();
        
        cc.log("cutting");
    }

    // update (dt) {}
}
