

const {ccclass, property} = cc._decorator;
//const { ray } = geometry;
//import { geometry, Vec3 } from "cc";

@ccclass
export default class NewClass extends cc.Component {
    
    @property(cc.Node)
    public laserBeam:cc.Node = null;

    @property(cc.Node)
    public hit_particleEffect:cc.Node = null;

    private laseroffset: number = 100;
    
    draw (p1, p2) {
        //cc.log("draw!");
        //const points = this.collider.points;
        const ctx = this.laserBeam.getComponent(cc.Graphics);
        //cc.log(cc.find("LaserPlatform/base/platform/laser/power"))
        //cc.log(ctx);
        //cc.log(p1 + ", " + p2);
        ctx.clear();
        //const len = points.length;
        ctx.moveTo(p1.x-3, p1.y);
        ctx.lineTo(p1.x+3, p1.y);
        ctx.lineTo(p2.x+3, p2.y);
        ctx.lineTo(p2.x-3, p2.y);
        ctx.lineTo(p1.x-3, p1.y);
        
        //ctx.lineTo(p2.x, p2.y);
        

        ctx.close();

        ctx.stroke();
        //ctx.fill();
        ctx.fill();
        //ctx.stroke();

    }
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //this.node.on('mousedown', this.TouchStart, this);
        /*
        this.node.on(cc.Node.EventType.MOUSE_DOWN, function (event) {
            console.log('Mouse down');
            this.TouchStart();
          }, this);
        */
       
    }

    start () {
        //const outRay = new ray(0, -1, 0, 0, 1, 0);
        this.laserBeam =  this.node.parent.parent.getChildByName("laserBeam");
        
        this.laserBeam.setPosition(this.laserBeam.convertToNodeSpaceAR(cc.v2(0, 0)));
        //this.hit_particleEffect = cc.find("Canvas/LaserPlatform/laserBeam/particle");
        this.hit_particleEffect = this.node.parent.parent.getChildByName("laserBeam").getChildByName("particle");
        

    }
    //世界座標轉換
    localConvertWorldPointAR(node) {
        if (node) {
            return node.convertToWorldSpaceAR(cc.v2(0, 0));
        }
        return null;
    }
    

    StartDetect () {
        //cc.log("---touchStart---");
        //获得触摸点本地坐标位置
        let p1 = this.localConvertWorldPointAR(this.node);
        //cc.log("p1: " + p1);
        let angle = this.node.angle;
        //cc.log("angle: "+angle);
        let height = p1.y + this.laseroffset;
        //cc.log("h: " + height);
        //cc.log("tan: "+ Math.tan(angle* Math.PI /180));
        let bottom_offset = height * Math.tan(angle *Math.PI /180);
        //cc.log("bottom length: "+ bottom_offset);
        
        
        //射线测试结束点位置 預設結束的位置要超過floor
        let p2 = cc.v2(p1.x+bottom_offset, 0-this.laseroffset) 
        //cc.log("p2: " + p2);
        this.rayTest(p1, p2)
    }
    rayTest (p1, p2) {

        //cc.log("in ratTest");
        var results = cc.director.getPhysicsManager().rayCast(p1, p2, cc.RayCastType.Closest);
        
        for (var i = 0; i < results.length; i++) {
            //两点之间检测出来的点的数组
            var result = results[i];
            //射线穿过的是哪一个碰撞体。
            var collider = result.collider;
            //cc.log(collider);
            if(collider.node.name == "platform"){
                //cc.log("hit platform");
            } else if(collider.node.name == "floor"){
                //cc.log("hit floor");
            } else if(collider.node.name == "player"){
                //cc.log("hit plaeyr");
                collider.node.getComponent("Player_ans").isDead = true;
            }
            //射线穿过的碰撞体的世界坐标
            var point = result.point;
            //碰撞体在相交点的表面的法线向量。
            var normal = result.normal;
            //相交点在射线上的分数。
            var fraction = result.fraction;
            //打印出碰撞点的坐标
            //cc.log('point:', point)

            p2 = point; // update end of the laser beam when hit platform 
            this.hit_particleEffect.active = true;
            this.hit_particleEffect.position = point;
            
        }

        this.draw(p1, p2);
    }
    update (dt) {
        
        this.StartDetect();
        
    }
}
