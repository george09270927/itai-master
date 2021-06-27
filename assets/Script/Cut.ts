
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    public collider = null;

    public rigidbody = null;
    
    private originCubePoints = null;

    public flag: boolean = true;

    public points = null;

    public splitTime: number = 3;

    private parentNode: cc.Node = null;

    private bulletsplitEnable: number = 3;

    private switchflag: boolean = false;

    public firstblock: boolean = true;

    private pos_scaleX: boolean = null;

    @property({type:cc.AudioClip})
    private ice_destruction_sound: cc.AudioClip = null;


    onLoad () {
        
        //cc.log("fuckyou");

        
        this.collider = this.getComponent(cc.PhysicsPolygonCollider);

        this.rigidbody = this.getComponent(cc.RigidBody);
        
        this.originCubePoints = this.getComponent(cc.PhysicsPolygonCollider).points;

        //cc.log("new collider's points: " + this.collider.points);
        //cc.log("point lenght: "+this.collider.points.length);
        //cc.log(this.rigidbody.type);
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
        //cc.director.getPhysicsManager().debugDrawFlags=1;  
        if(!this.firstblock){
            for (let i = 0; i < this.splitTime; i++) {
            //cc.log('split0' + i);
            this.copy(); 
        }
        }
        
                    
    }

    copy(){
        //cc.log("in copy")
        // 设置第一个碰撞体
        //this.scheduleOnce(()=>{this.getComponent(cc.RigidBody).type = 2});

        const cloneNode = cc.instantiate(this.node);
        cloneNode.getComponent("Cut").splitTime = this.splitTime - 1;
        cloneNode.getComponent("Cut").bulletsplitEnable = false;
        cloneNode.getComponent("Cut").firstblock = false;
        this.scheduleOnce(()=>{ cloneNode.getComponent(cc.RigidBody).type = 2});
        //cloneNode.getComponent(cc.RigidBody).type = 2;
        //cc.log("---setting---");
        //cc.log("now point length: " + this.collider.points.length)
        let edge = this.collider.points.length;
        //var random_edge_1 = Math.floor(Math.random()*edge);

        if(this.switchflag == false){
            this.switchflag = true;
            var random_edge_1 = 0;
        } else {
            this.switchflag = false;
            var random_edge_1 = 1;
        }
        
        var random_edge_2 = (random_edge_1 + 2) % 4;
        
        cc.log("get random edge: " + random_edge_1);
        

        var tmpR1 = Math.random();
        if(tmpR1<0.33){
            var ratio1 = 0.25;
        } else if(tmpR1>= 0.33 && tmpR1 <0.66){
            var ratio1 = 0.5;
        } else if(tmpR1>=0.66){
            var ratio1 = 0.75;
        }
        var tmpR2 = Math.random();
        if(tmpR2<0.25){
            var ratio2= 0.2;
        } else if(tmpR2>= 0.25 && tmpR2 <0.55){
            var ratio2 = 0.4;
        } else if(tmpR2>= 0.50 && tmpR2 <0.75){
            var ratio2 = 0.6;
        } else if(tmpR2>=0.75){
            var ratio2 = 0.8;
        }
        
        // ver.2
        if(random_edge_1 == 0 || random_edge_1 == 2){ // edge: 0 2

            let x1 = ratio1*(this.collider.points[1].x-this.collider.points[0].x)+this.collider.points[0].x;
            let y1 = this.collider.points[0].y + (this.collider.points[1].y-this.collider.points[0].y) * ((x1-this.collider.points[0].x)/(this.collider.points[1].x-this.collider.points[0].x))
            let x2 = ratio2*(this.collider.points[2].x-this.collider.points[3].x)+this.collider.points[3].x;
            let y2 = this.collider.points[3].y + (this.collider.points[2].y-this.collider.points[3].y) * ((x2-this.collider.points[3].x)/(this.collider.points[2].x-this.collider.points[3].x));
            //this.collider.points[1] = cc.v2(Math.floor(x1), Math.floor(y1));
            //this.collider.points[2] = cc.v2(Math.floor(x2), Math.floor(y2));
            this.collider.points[1] = cc.v2(x1,y1);
            this.collider.points[2] = cc.v2(x2,y2);
            //cc.log("change0: " + this.collider.points[1] + ", " + this.collider.points[2]);
            if(this.node.getChildByName("IceWorld_Snow3") != null && this.firstblock)
                this.node.getChildByName("IceWorld_Snow3").getComponent(cc.Sprite).fillRange = ratio2;
            //var cutcube
        } else if (random_edge_1 == 1 || random_edge_1 == 3){
            
            let y2 = ratio1*(this.collider.points[2].y-this.collider.points[1].y)+this.collider.points[1].y;
            let x2 = this.collider.points[1].x + (this.collider.points[2].x-this.collider.points[1].x) * ((y2-this.collider.points[1].y)/(this.collider.points[2].y-this.collider.points[1].y));
            let y3 = ratio2*(this.collider.points[3].y-this.collider.points[0].y)+this.collider.points[0].y;
            let x3 = this.collider.points[0].x + (this.collider.points[3].x-this.collider.points[0].x) * ((y3-this.collider.points[0].y)/(this.collider.points[3].y-this.collider.points[0].y));
            //this.collider.points[2] = cc.v2(Math.floor(x2), Math.floor(y2));
            //this.collider.points[3] = cc.v2(Math.floor(x3), Math.floor(y3));
            this.collider.points[2] = cc.v2(x2,y2);
            this.collider.points[3] = cc.v2(x3,y3);

            if(this.firstblock){
                this.node.getChildByName("IceWorld_Snow3").destroy();
            let snowfade = cc.sequence(cc.fadeOut(0.6), cc.callFunc(()=>{this.node.getChildByName("IceWorld_Snow3").destroy()}));

            this.node.getChildByName("IceWorld_Snow3").runAction(snowfade);
            }
            
        } 

        // advanced snoww disappear
        //let snowfade = cc.sequence(cc.fadeOut(0.3), cc.callFunc(()=>{this.node.getChildByName("IceWorld_Snow3").destroy()}));
        //let snowfade = cc.sequence(cc.fadeOut(0.3), cc.callFunc(()=>{this.node.getChildByName("IceWorld_Snow3").destroy()}));
        
        
        //cc.log("collider after change: " + this.collider.points);
        
        //this.collider.apply();   
        
        this.draw();
        this.collider.apply(); 
        //cc.log("after apply")
        //cc.log(this.collider.points);
       
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
        if((other.node.name == "bullet" || other.node.name == "red_beam_1"|| other.node.name == "red_beam_2"||other.node.name=="excalibur_beam_1"||other.node.name=="excalibur_beam_2"||other.node.name=="explosion" || other.node.name == "lasershoot_red_1"|| other.node.name == "lasershoot_red_2") && this.splitTime){
            if(this.flag == true){

                
                var manifold = contact.getWorldManifold()
                var normal = manifold.normal;
                var point = manifold.points[0];
                //cc.log("normal: " + normal);
                //cc.log(other.node.name);
                if(this.pos_scaleX == null && this.firstblock){
                    if(normal.x < 0){
                        //cc.log("change  scale");
                        this.node.scaleX = -1; 
                        this.node.getChildByName("IceWorld_Snow3").scaleX = -1;
                        this.pos_scaleX = false;
                    } else if(normal.x > 0){
                        this.pos_scaleX = true;
                    } else if(normal.x == 0){
                        // do nothing
                        this.pos_scaleX = true;
                    }

                    // snow must be cancel
                    /*
                    let snowfade = cc.sequence(cc.fadeOut(0.3), cc.callFunc(()=>{this.node.getChildByName("IceWorld_Snow3").destroy()}));

                    this.node.getChildByName("IceWorld_Snow3").runAction(snowfade);
                    */

                } else {
                    //cc.log("do nothing")
                }
                /*
                if(normal.x < 0 && this.pos_scaleX){
                    //if(this.node.scaleX > 0)
                    cc.log("sscaleX -")
                        this.node.scaleX = -1; 
                        this.pos_scaleX = false;
                }
                */
                /*
                if(normal.x > 0 && !this.pos_scaleX){
                    this.node.scaleX = 1;
                    this.pos_scaleX = true;
                }
                */
                if(this.bulletsplitEnable){
                    this.bulletsplitEnable--;
                    cc.audioEngine.playEffect(this.ice_destruction_sound, false); 
                   this.copy();
                } else {
                    this.scheduleOnce(()=>{ this.getComponent(cc.RigidBody).type = 2});
                }
                
             
                this.flag = false;

                this.scheduleOnce(()=>{
                    this.flag = true;
                }, 0.5) 
            }
        } 
    }
}
