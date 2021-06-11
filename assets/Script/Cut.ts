
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    public collider = null;

    public rigidbody = null;
    
    private originCubePoints = null;

    public flag: boolean = true;

    public points = null;

    public splitTime: number = 4;

    private parentNode: cc.Node = null;

    private bulletsplitEnable: boolean = true;


    onLoad () {
        
        //cc.log("fuckyou");

        
        this.collider = this.getComponent(cc.PhysicsPolygonCollider);

        this.rigidbody = this.getComponent(cc.RigidBody);
        
        this.originCubePoints = this.getComponent(cc.PhysicsPolygonCollider).points;

        cc.log("new collider's points: " + this.collider.points);
        //cc.log("point lenght: "+this.collider.points.length);
        cc.log(this.rigidbody.type);
        //this.splitTime = 3;
        //this.collider.type = 1;
        //this.rigidbody.type = 0;
        
        //cc.log(this.rigidbody);
        //this.rigidbody.type = 1;
        this.draw();

        
    }
    draw () {

        const points = this.collider.points;
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

        //cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);

        //cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

        //cc.director.getPhysicsManager().debugDrawFlags=1;

        //this.parentNode = this.node.parent;
        //cc.log(this.parentNode);
        /*
        if(this.parentNode != null){
            if(this.parentNode.getComponent("Cut").splitEnable == true && this.parentNode.getComponent("Cut").splitTime > 0){
                this.splitEnable = true;
                this.splitTime = this.parentNode.getComponent("Cut").splitTime - 1;
            }

        }
        */

        //cc.log("split time: " +this.splitTime);

     
    }
    /*
    onKeyDown(event) 
    {
        switch(event.keyCode) 
        {
            case cc.macro.KEY.z:

                cc.log("---copy---");
                if(this.flag == true){
                    this.splitEnable = true;
                    for (let i = 0; i < this.splitTime; i++) {
                        cc.log('split0' + i);
                        this.copy(); 
                    }
                    this.flag = false; 
                }
                
                break;
        }
    }
    
    onKeyUp(event) 
    {
        switch(event.keyCode) 
        {
            case cc.macro.KEY.z:
                this.flag = true;

                break;
        }
    }
*/
    copy(){
        cc.log("in copy")
        // 设置第一个碰撞体
        //this.scheduleOnce(()=>{this.getComponent(cc.RigidBody).type = 2});

        const cloneNode = cc.instantiate(this.node);
        cloneNode.getComponent("Cut").splitTime = this.splitTime - 1;
        cloneNode.getComponent("Cut").bulletsplitEnable = false;
        this.scheduleOnce(()=>{ cloneNode.getComponent(cc.RigidBody).type = 2});
        //cloneNode.getComponent(cc.RigidBody).type = 2;
        //cc.log("---setting---");
        //cc.log("now point length: " + this.collider.points.length)
        let edge = this.collider.points.length;
        var random_edge_1 = Math.floor(Math.random()*edge);

        //random_edge_1 = 0;
        /*
        do {
            var random_edge_2 = Math.floor(Math.random() * edge);
        } while(random_edge_2 === random_edge_1);
        */
        var random_edge_2 = (random_edge_1 + 2) % 4;
        
        cc.log("get random edge: " + random_edge_1);
        //random_edge_1 = 0;
        //cc.log("---generate random points---");
        //var edgeVar = Math.abs(random_edge_1 - random_edge_2);
        //cc.log("edge variation: " + edgeVar);
        
        //if(this.splitTime != 3){
            //this.rigidbody.type = 3;
        //cc.log("now rigid bodytype = " + this.rigidbody.type);
        //}
        

        if(random_edge_1 == 0 || random_edge_1 == 2){ // edge: 0 2

            let x1 = Math.random()*(this.collider.points[1].x-this.collider.points[0].x)+this.collider.points[0].x;
            let y1 = this.collider.points[0].y + (this.collider.points[1].y-this.collider.points[0].y) * ((x1-this.collider.points[0].x)/(this.collider.points[1].x-this.collider.points[0].x))
            let x2 = Math.random()*(this.collider.points[2].x-this.collider.points[3].x)+this.collider.points[3].x;
            let y2 = this.collider.points[3].y + (this.collider.points[2].y-this.collider.points[3].y) * ((x2-this.collider.points[3].x)/(this.collider.points[2].x-this.collider.points[3].x));
            //this.collider.points[1] = cc.v2(Math.floor(x1), Math.floor(y1));
            //this.collider.points[2] = cc.v2(Math.floor(x2), Math.floor(y2));
            this.collider.points[1] = cc.v2(x1,y1);
            this.collider.points[2] = cc.v2(x2,y2);
            //cc.log("change0: " + this.collider.points[1] + ", " + this.collider.points[2]);
            //var cutcube
        } else if (random_edge_1 == 1 || random_edge_1 == 3){
            
            let y2 = Math.random()*(this.collider.points[2].y-this.collider.points[1].y)+this.collider.points[1].y;
            let x2 = this.collider.points[1].x + (this.collider.points[2].x-this.collider.points[1].x) * ((y2-this.collider.points[1].y)/(this.collider.points[2].y-this.collider.points[1].y));
            let y3 = Math.random()*(this.collider.points[3].y-this.collider.points[0].y)+this.collider.points[0].y;
            let x3 = this.collider.points[0].x + (this.collider.points[3].x-this.collider.points[0].x) * ((y3-this.collider.points[0].y)/(this.collider.points[3].y-this.collider.points[0].y));
            //this.collider.points[2] = cc.v2(Math.floor(x2), Math.floor(y2));
            //this.collider.points[3] = cc.v2(Math.floor(x3), Math.floor(y3));
            this.collider.points[2] = cc.v2(x2,y2);
            this.collider.points[3] = cc.v2(x3,y3);
            
        } 

        
        //cc.log("collider after change: " + this.collider.points);
        
        this.collider.apply();   
        
        this.draw();
       
        // 克隆一个本体作为第二个
        
        var cloneNodeCollider = cloneNode.getComponent(cc.PhysicsPolygonCollider);

        if(random_edge_1 == 0 || random_edge_1 == 2){
            
            cloneNodeCollider.points[0] = this.collider.points[1];
            cloneNodeCollider.points[3] = this.collider.points[2];
            //cc.log("this" + cloneNodeCollider.points);
            //cc.log(cloneNodeCollider.points);
        } else {
            
            cloneNodeCollider.points[1] = this.collider.points[2];
            cloneNodeCollider.points[0] = this.collider.points[3];
            //cc.log("this" + cloneNodeCollider.points);
        }
        
        
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

    //update (dt) {}

    onBeginContact(contact, self, other){
        if((other.node.name == "bullet" || other.node.name == "red_beam"||other.node.name=="excalibur_beam") && this.splitTime){
            if(this.flag == true){
                
                //cc.log(self.getComponent(cc.RigidBody).type);
                
                //cc.log(this.splitTime);
                if(this.bulletsplitEnable){
                    this.bulletsplitEnable = false;
                    for (let i = 0; i < this.splitTime; i++) {
                        cc.log('split0' + i);
                        this.copy(); 
                    }
                } else {
                    this.scheduleOnce(()=>{ this.getComponent(cc.RigidBody).type = 2});
                }
                
             
                this.flag = false;

                this.scheduleOnce(()=>{
                    this.flag = true;
                }, 1) 
            }
        } 
    }
}
