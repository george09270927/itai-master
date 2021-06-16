
const {ccclass, property} = cc._decorator;

@ccclass
export default class LaserGun extends cc.Component {

    public laserGunRay:cc.Node = null;
    // LIFE-CYCLE CALLBACKS:

    private laserSide: boolean = true; // postive

    private laserGunOffset: number = 45;

    private p1: cc.Vec2 = null;
    private p2: cc.Vec2 = null;

    // onLoad () {}

    start () {
        this.laserGunRay = cc.find("LaserGunRay_1");
        
        
    }
    //世界座標轉換
    localConvertWorldPointAR(node) {
        if (node) {
            return node.convertToWorldSpaceAR(cc.v2(0, 0));
        }
        return null;
    }

    draw (p1, p2) {
        //cc.log("draw!");
        //const points = this.collider.points;
        const ctx = this.laserGunRay.getComponent(cc.Graphics);
        //cc.log(cc.find("LaserPlatform/base/platform/laser/power"))
        //cc.log(ctx);
        //cc.log(p1 + ", " + p2);
        ctx.clear();
        //const len = points.length;
        /*
        ctx.moveTo(p1.x-3, p1.y);
        ctx.lineTo(p1.x+3, p1.y);
        ctx.lineTo(p2.x+3, p2.y);
        ctx.lineTo(p2.x-3, p2.y);
        ctx.lineTo(p1.x-3, p1.y);
        */
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        
        //ctx.lineTo(p2.x, p2.y);
        

        ctx.close();

        ctx.stroke();
        //ctx.fill();
        ctx.fill();
        //ctx.stroke();
        //cc.log(draw)

        // for shoot
        this.p1 = p1;
        this.p2 = p2;

    }

    laserShoot(){
        
    }

    StartDetect () {
        //cc.log("---touchStart---");
        //获得触摸点本地坐标位置
        if(this.node.scaleX == -1){
            this.node.getComponent(cc.RevoluteJoint).anchor.x = 15;
            this.node.getComponent(cc.RevoluteJoint).apply();
            this.laserSide = false;
        }   
        else {
            this.laserSide = true;
            this.node.getComponent(cc.RevoluteJoint).anchor.x = -15;
            this.node.getComponent(cc.RevoluteJoint).apply();
        }

        let p1 = this.localConvertWorldPointAR(this.node);
        p1.x = (this.laserSide == true)? p1.x + this.laserGunOffset: p1.x - this.laserGunOffset;
        //cc.log("p1: " + p1);
        let angle = this.node.angle;
        //cc.log("angle: "+angle);

        // ray 1000
        let ray_length = 1000;
        if(this.laserSide) var p2 = cc.v2(p1.x + ray_length * Math.cos(angle *Math.PI /180), p1.y + ray_length *  Math.sin(angle *Math.PI /180));
        else var p2 = cc.v2(p1.x - ray_length * Math.cos(angle *Math.PI /180), p1.y + ray_length *  Math.sin(angle *Math.PI /180));
        //cc.log("p1: " + p1);
        
        //cc.log("p2: " + p2);
        this.rayTest(p1, p2);
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
                cc.log("hit platform");
            } else if(collider.node.name == "floor"){
                cc.log("hit floor");
            } else if(collider.node.name == "player"){
                //cc.log("hit plaeyr");
                //collider.node.getComponent("Player_ans").isDead = true;
            }
            //射线穿过的碰撞体的世界坐标
            var point = result.point;
            //碰撞体在相交点的表面的法线向量。
            var normal = result.normal;
            //相交点在射线上的分数。
            var fraction = result.fraction;
            //打印出碰撞点的坐标
            //cc.log('point:', point)

            //p2 = point; // update end of the laser beam when hit platform 
            //this.hit_particleEffect.active = true;
            //this.hit_particleEffect.position = point;
            
        }

        this.draw(p1, p2);
    }

    update (dt) {
        this.StartDetect();
    }
}
