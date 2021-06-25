
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    private platform_isMouseDown: boolean = false;

    //private platform_isMouseDown: boolean = false;
    //private platform_isMouseDown: boolean = false;
    private moving_object: cc.Node = null;

    private laserBeam_object: cc.Node = null;

    private mouse_position: cc.Vec2 = null;

    private isMouseDown: boolean = false;

    @property(cc.Prefab)
    private laserplatformPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    private laserbeamPrefab: cc.Prefab = null;

    private state: number = null;

    private object_type = cc.Enum({
        platform: 0,
        laserplatform: 1,
        smashcube: 2,
        
    });

    onLoad () {
        cc.find("Canvas").on('mouseup', function (event) {
            console.log('Mouse up');
            this.isMouseDown = false;
          }, this);
        
    }

    start () {
        cc.director.getPhysicsManager().enabled = true;
        
        //cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.find("Canvas").on(cc.Node.EventType.MOUSE_MOVE,(event)=>{
            this.mouse_position = event.getLocation();
            //cc.log(this.mouse_position);
            
        })
        
    }
    getMousePosition(){
        
    }
    platform(){
        
    }

    laserplatform(){
        cc.log("instantiate!");
        this.isMouseDown = true;
        this.state = this.object_type.laserplatform;
        this.moving_object = cc.instantiate(this.laserplatformPrefab);
        this.laserBeam_object = cc.instantiate(this.laserbeamPrefab);
        this.scheduleOnce(()=>{ 
            this.moving_object.getChildByName("base").getComponent(cc.RigidBody).type = 2;
            this.moving_object.getChildByName("base").getComponent(cc.RigidBody).gravityScale = 0;
            this.moving_object.getChildByName("base").getChildByName("platform").getComponent(cc.RigidBody).gravityScale = 0;
            this.moving_object.getChildByName("base").getChildByName("platform").getComponent(cc.RigidBody).fixedRotation = true;
        });
        this.moving_object.parent = cc.find("Canvas");
        // resume moving

        this.moving_object.getChildByName("base").getChildByName("platform").on('mousedown', function (event) {
            console.log('Mouse down');
            this.isMouseDown = true;
          }, this);
    }

    update (dt) {
        //this.getMousePosition();
        if(this.state == this.object_type.laserplatform){
            if(!this.isMouseDown){
                cc.log("fix object////");
                this.scheduleOnce(()=>{ 
                    this.moving_object.getChildByName("base").getComponent(cc.RigidBody).type = 0;
                    this.moving_object.getChildByName("base").getComponent(cc.RigidBody).gravityScale = 1;
                    this.moving_object.getChildByName("base").getChildByName("platform").getComponent(cc.RigidBody).gravityScale = 6;
                    this.moving_object.getChildByName("base").getChildByName("platform").getComponent(cc.RigidBody).fixedRotation = false;
                });
            } else if(this.isMouseDown){

                this.scheduleOnce(()=>{ 
                    this.moving_object.getChildByName("base").getComponent(cc.RigidBody).type = 2;
                    this.moving_object.getChildByName("base").getComponent(cc.RigidBody).gravityScale = 0;
                    this.moving_object.getChildByName("base").getChildByName("platform").getComponent(cc.RigidBody).gravityScale = 0;
                    this.moving_object.getChildByName("base").getChildByName("platform").getComponent(cc.RigidBody).fixedRotation = true;
                });
            }
            //cc.log("moving object: " + this.moving_object.position);
            //cc.log(this.mouse_position);
            //cc.log(this.moving_object);
            //this.moving_object.setPosition(30, 50)
            //this.moving_object.y = this.mouse_position.y;
            //this.moving_object.position = this.mouse_position;
        } else {

        }
    }
}
