
const {ccclass, property} = cc._decorator;

export enum Map {
        CastleMap,
        IceMap,
        LaserMap
}
@ccclass
export default class NewClass extends cc.Component {
    
    private changeflag: boolean = true;

    private number_of_Map: number = 5;

    private current_Map: number  = null;

    
    private ready_enabled: boolean = true;
    

    @property()
    noRandomMode: boolean = false;

    @property(cc.Prefab)
    dialogPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    readyPrefab: cc.Prefab = null;

    @property(cc.Node)
    private Camera: cc.Node = null;

    private dialogMessage = cc.Enum({
        GG: 0,
        Easy: 1,
        LOL: 2,
        FuckU: 3,
        Dogge: 4,
    });

    private dialog_number: number = 5;

    onLoad () {
        //cc.game.removePersistRootNode(cc.find("small_sticker - 002_knee"));
        //c.log("position: ");
       // cc.log(cc.find("small_sticker - 002_knee").position);

        //this.node.active = false;
        //this.mask.opacity = this.maskOpacity;

        let MapName = cc.director.getScene().name;
        //cc.log("now scene name: " + MapName);
        if(MapName == "CastleMap"){
            this.current_Map = 0;
        } else if (MapName == "IceMap"){
            this.current_Map = 1;
        } else if (MapName == "LaserMap"){
            this.current_Map = 2;
        } else if (MapName == "MovingMap"){
            this.current_Map = 3;
        } else if (MapName == "XmasMap"){
            this.current_Map = 4;
        } 
        if(!this.ready_enabled)
            this.showReady();

    }

    

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
                let showDialog_before_changeScene = cc.sequence(cc.callFunc(()=>{this.showDialog()}),cc.delayTime(1), cc.callFunc(()=>{this.changeScene();}))
                this.node.runAction(showDialog_before_changeScene);
            }
        }
    }

    showDialog(){
        //cc.log("show dialog");

        //this.node.active = true;

        let DialogNode = cc.instantiate(this.dialogPrefab);
        DialogNode.parent = this.Camera;
        //cc.log(DialogNode);
        let messageNumber = Math.floor(Math.random()*this.dialog_number);
        var message = "default";
        if(messageNumber == 0) message =  "GG!";
        else if (messageNumber == 1) message =  "Easy!";
        else if (messageNumber == 2) message =  "LOL!";
        else if (messageNumber == 3) message =  "TK ♥ WeiN";
        else if (messageNumber == 4) message =  "GG george!";
    
        DialogNode.getChildByName("content").getComponent(cc.Label).string = String(message);

        // mask淡入`
        //cc.log("mask fade in");
        DialogNode.getChildByName("mask").opacity = 0;

        let fIn : cc.Action = cc.fadeTo(0.1, 100);

        DialogNode.getChildByName("mask").runAction(fIn);
    }
    showReady(){
        //cc.log("show dialog");

        //this.node.active = true;

        let ReadyNode = cc.instantiate(this.readyPrefab);
        ReadyNode.parent = this.Camera;
        ReadyNode.active = true;
        
        //let messageNumber = Math.floor(Math.random()*this.dialog_number);
        //var message = "default";
        var timer = -2;
        this.schedule(()=>{
            timer++;
            if(timer < 1){
                ReadyNode.getChildByName("content").getComponent(cc.Label).string = "Ready?";
                cc.director.getPhysicsManager().enabled = false;
            } else if(timer == 4) {
                ReadyNode.active = false;
                cc.director.getPhysicsManager().enabled = true;
            } else {
                ReadyNode.getChildByName("content").getComponent(cc.Label).string = String(4-timer);
            }
        }, 1);
        


        // mask淡入`
        //cc.log("mask fade in");
        ReadyNode.getChildByName("mask").opacity = 0;

        let fIn : cc.Action = cc.fadeTo(0.1, 150);

        ReadyNode.getChildByName("mask").runAction(fIn);
    }

    loadSceneAnimation(){
        //cc.log("---loadsceneAnimation---");
        this.Camera.x = -1100;
        let action = cc.moveTo(1.3, 0, 0).easing(cc.easeInOut(3));
        this.Camera.runAction(action);
        //cc.log("finish action: " + this.Camera.position);
    }

    changeScene(){
        
        if(this.noRandomMode){

            var randomMap = (this.current_Map + 1) % this.number_of_Map;
        }else{
            var randomMap = Math.floor(Math.random()*this.number_of_Map);
            while(randomMap == this.current_Map){
                randomMap = Math.floor(Math.random()*this.number_of_Map);
                //cc.log("rm = " + randomMap);
                //cc.log("cm = " + this.current_Map);
            }
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
            } else if (randomMap == 4){
                cc.log("change to XmasMap");
                cc.director.loadScene("XmasMap");
            }
        },1.3); 
    }

    // update (dt) {}
}
