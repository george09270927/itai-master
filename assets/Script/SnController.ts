
const {ccclass, property} = cc._decorator;

@ccclass
export default class ButtonController extends cc.Component 
{
    private PauseCover = null;
    private isPaused: boolean = false;

    onLoad() {
    }

    start() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);  
        this.PauseCover = cc.find("Canvas/pure pause/PauseCover");      
    }

    onKeyDown(event) {
        let keyCode = event.keyCode;
        if(keyCode == cc.macro.KEY.q) {
            if(this.isPaused) {
                this.isPaused = false;
                this.PauseCover.active = false;
                cc.director.resume();
                cc.audioEngine.resumeAll();
            }
            else {
                this.isPaused = true;     
                this.PauseCover.active = true;
                cc.director.pause();
                cc.audioEngine.pauseAll();
            }
        }
    } 
}