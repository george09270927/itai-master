
const {ccclass, property} = cc._decorator;
import { Global } from "../Stick/Ragdoll/script/Leg_force";
export enum Map {
        CastleMap,
        IceMap,
        LaserMap
}
@ccclass
export default class NewClass extends cc.Component {
    
    private changeflag: boolean = true;

    private number_of_Map: number = 6;

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


    @property({type:cc.AudioClip})
    private  dead_sound: cc.AudioClip=null;

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
        } else if (MapName == "CrateMap"){
            this.current_Map = 5;
        } else if (MapName == "CustomMap"){
            this.current_Map = 10;
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
            if(this.changeflag && this.current_Map != 10){
                this.nextScene();
            }
        }
    }

    nextScene() {
        if (this.changeflag) {
            //console.log("call nextScene");
            cc.find('small_sticker - 002_knee/0_Head').getComponent("debug_body1").local_stop();
            cc.find('small_sticker - 002_yellow/1_Head').getComponent("debug_body1_2").local_stop();
            cc.audioEngine.playEffect(this.dead_sound,false);

            var i = this;
            let o = 2;
            cc.director.getPhysicsManager().enabledAccumulator = !1,
                cc.director.getScheduler().setTimeScale(1), cc.PhysicsManager.FIXED_TIME_STEP = 1 / 60,
                cc.tween(this.node).call(function () {
                    cc.director.getPhysicsManager().enabledAccumulator = !0, cc.director.getScheduler().setTimeScale(.1),
                        cc.PhysicsManager.FIXED_TIME_STEP = 1 / 60 * .1;
                }).delay(o / 20).call(function () {
                    cc.director.getPhysicsManager().enabledAccumulator = !1, cc.director.getScheduler().setTimeScale(1),
                        cc.PhysicsManager.FIXED_TIME_STEP = 1 / 60;
                }).to(.1, {
                }).call(function () {
                }).start();

            this.changeflag = false;
            if(this.current_Map == 10) this.changeflag = true;
            let showDialog_before_changeScene = cc.sequence(cc.callFunc(()=>{this.showDialog()}),cc.delayTime(1), cc.callFunc(()=>{this.changeScene();}))
            this.node.runAction(showDialog_before_changeScene);
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
    
        
        let DialogShowingAction = cc.sequence(cc.scaleTo(0.02, 1.5).easing(cc.easeInOut(2)), cc.scaleTo(0.02, 0.9).easing(cc.easeInOut(2)),  cc.scaleTo(0.02, 1).easing(cc.easeInOut(2)), cc.delayTime(0.5), cc.scaleTo(0.2, 0.95).easing(cc.easeInOut(2)),cc.scaleTo(0.5, 1.6).easing(cc.easeInOut(3)), cc.scaleTo(1, 0).easing(cc.easeIn(5)));
        DialogNode.getChildByName("content").getComponent(cc.Label).string = String(message);
        DialogNode.getChildByName("content").runAction(DialogShowingAction);

        // dialog color
        if (Global.player1_dead) {
            var color = new cc.Color(218, 179, 51);                 // yellow win
            DialogNode.getChildByName("content").color = color;
        } else {
            var color = new cc.Color(255, 255, 255);                // black win
            DialogNode.getChildByName("content").color = color;
        }
        

        // mask淡入`
        //cc.log("mask fade in");
        DialogNode.getChildByName("mask").opacity = 0;

        let fIn : cc.Action = cc.fadeTo(0.1, 100);

        if(this.current_Map != 10)
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
        if(cc.director.getScene().name != "CustomMap") {
            this.Camera.x = -1100;
            let action = cc.moveTo(1.3, 0, 0).easing(cc.easeInOut(3));
            this.Camera.runAction(action);
            //cc.log("finish action: " + this.Camera.position);
        }
    }

    changeScene(){
        
        if(this.noRandomMode){
            if(this.current_Map == 10){ // if current map is "CustomMap"
                var randomMap = 10;
            } else var randomMap = (this.current_Map + 1) % this.number_of_Map;
    
        }else{
            var randomMap = Math.floor(Math.random()*this.number_of_Map);
            while(randomMap == this.current_Map){
                randomMap = Math.floor(Math.random()*this.number_of_Map);
                //cc.log("rm = " + randomMap);
                //cc.log("cm = " + this.current_Map);
            }
        }
        
        cc.log("new random map = " + randomMap);
        
        if(randomMap == 10) {
            var leftPage = cc.find("Left Page");

            var blackPersentNode = cc.find("Canvas/percent_black");          
            var yellowPersentNode = cc.find("Canvas/percent_yellow");
            var p1Node = cc.find("small_sticker - 002_knee");
            var p2Node = cc.find("small_sticker - 002_yellow"); 

            var laserRay_1 = cc.find("LaserGunRay_1");
            var laserRay_2 = cc.find("LaserGunRay_2");

            blackPersentNode.destroy();
            yellowPersentNode.destroy();
            p1Node.destroy();
            p2Node.destroy();
            laserRay_1.active = false;
            laserRay_2.active = false;

            var action = cc.moveTo(0.5, 90, 320).easing(cc.easeInOut(3));
            leftPage.runAction(action);   
        }     
        else {
            let action = cc.moveTo(1.3, 1100, 0).easing(cc.easeInOut(3));
            this.Camera.runAction(action);
            this.schedule(()=>{
                cc.find('small_sticker - 002_knee/0_Head').getComponent("debug_body1").local_stop();
                cc.find('small_sticker - 002_yellow/1_Head').getComponent("debug_body1_2").local_stop();
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
                }  else if (randomMap == 5){
                    cc.log("change to crateMap");
                    cc.director.loadScene("CrateMap");
                }
            },1.3); 
        }
            
    }

    // update (dt) {}
    
}
