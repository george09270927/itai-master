
const {ccclass, property} = cc._decorator;

export enum Map {
        CastleMap,
        IceMap,
        LaserMap
}
@ccclass
export default class NewClass extends cc.Component {
    
    private changeflag: boolean = true;
    private numbe_of_Map: number = 3;
    // onLoad () {}

    @property(cc.Node)
    private Camera: cc.Node = null;

    start () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        //cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.loadScene();
    }

    onKeyDown(event){
        if(event.keyCode == cc.macro.KEY.e){
            cc.log("--change scene--");
            if(this.changeflag){
                this.changeflag = false;
                this.changeScene();
            }
            
        }
    }

    loadScene(){
        cc.log("---loadscene---");
        this.Camera.x = -960;
        let action = cc.moveTo(1.5, 0, 0).easing(cc.easeInOut(3));
        this.Camera.runAction(action);
        cc.log("finish action: " + this.Camera.position);
    }

    changeScene(){
        let randomMap = Math.floor(Math.random()*3);
        cc.log("random map = " + randomMap);
        let action = cc.moveTo(1.5, 960, 0).easing(cc.easeInOut(3));
        this.Camera.runAction(action);
        this.schedule(()=>{
            if(randomMap == 1){
                cc.director.loadScene("CastleMap");
            } else if (randomMap == 2){
                cc.director.loadScene("IceMap");
            } else if (randomMap == 3){
                cc.director.loadScene("LaserMap");
            }
        },1.5);
        
       
    }

    // update (dt) {}
}
