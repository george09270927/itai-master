
const {ccclass, property} = cc._decorator;

export enum Map {
        CastleMap,
        IceMap,
        LaserMap
}
@ccclass
export default class NewClass extends cc.Component {
    
    private changeflag: boolean = true;

    private number_of_Map: number = 4;

    private current_Map: number  = null;
    onLoad () {
        //cc.game.removePersistRootNode(cc.find("small_sticker - 002_knee"));
        //c.log("position: ");
       // cc.log(cc.find("small_sticker - 002_knee").position);
        let MapName = cc.director.getScene().name;
        cc.log("now scene name: " + MapName);
        if(MapName == "CastleMap"){
            this.current_Map = 0;
        } else if (MapName == "IceMap"){
            this.current_Map = 1;
        } else if (MapName == "LaserMap"){
            this.current_Map = 2;
        } else if (MapName == "MovingMap"){
            this.current_Map = 3;
        }

    }

    @property(cc.Node)
    private Camera: cc.Node = null;

    start () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        //cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.loadSceneAnimation();
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

    loadSceneAnimation(){
        cc.log("---loadsceneAnimation---");
        this.Camera.x = -1100;
        let action = cc.moveTo(1.3, 0, 0).easing(cc.easeInOut(3));
        this.Camera.runAction(action);
        cc.log("finish action: " + this.Camera.position);
    }

    changeScene(){
        
        var randomMap = Math.floor(Math.random()*this.number_of_Map);
        
        while(randomMap == this.current_Map){
            randomMap = Math.floor(Math.random()*this.number_of_Map);
            cc.log("rm = " + randomMap);
            cc.log("cm = " + this.current_Map);
        }
        cc.log("new random map = " + randomMap);
        let action = cc.moveTo(1.3, 1100, 0).easing(cc.easeInOut(3));
        this.Camera.runAction(action);
        this.schedule(()=>{
            if(randomMap == 0){
                
                cc.log("change to CastleMap");
                cc.director.loadScene("CastleMap");
            } else if (randomMap == 1){
                cc.log("change to Icemap");
                cc.director.loadScene("IceMap");
            } else if (randomMap == 2){
                cc.log("change to LaserMap");
                cc.director.loadScene("LaserMap");
            } else if (randomMap == 3){
                cc.log("change to MovingMap");
                cc.director.loadScene("MovingMap");
            }
        },1.3); 
    }

    // update (dt) {}
}
