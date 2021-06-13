
const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends cc.Component 
{
    private text1 = null;

    private time = null;

    private state: number = 3;

    onLoad() {
            
    }

    start() {
        this.text1 = cc.find("player1/text1", this.node);
        this.time = this.node.getChildByName("countdown");
        this.time.active = false;
        if(this.state >= 0) {
            this.schedule(function() {
                this.countdown();
            }, 1);
        }
    }
    
    update(dt) {
        if(this.text1.active) {           
            this.time.active = true;
            if(this.state < 0) {
                cc.director.loadScene("CastleMap");
            } 
        }
        else {
            this.time.active = false;
            this.state = 3;
        }
    }

    private countdown() {
        if(this.state >= 0) {
            //console.log(this.state);
            this.time.getComponent(cc.RichText).string = this.state + "";
            this.state -= 1;             
        }
    }   
}