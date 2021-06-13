
const {ccclass, property} = cc._decorator;

@ccclass
export default class Controller extends cc.Component 
{
    private pole = null;

    private time = null;

    private state: number = 5;

    onLoad() {
            
    }

    start() {
        this.pole = cc.find("menu pole/pole", this.node);
        this.time = this.node.getChildByName("countdown");
        this.time.active = false;
        if(this.state >= 0) {
            this.schedule(function() {
                this.countdown();
            }, 1);
        }
    }
    
    update(dt) {

        if(this.pole.angle <= -40) {           
            this.time.active = true;
            if(this.state < 0) {
                cc.director.loadScene("CastleMap");
            } 
        }
        else {
            this.time.active = false;
            this.state = 5;
        }
        
    }

    private countdown() {
        if(this.state >= 4) {
            this.time.getComponent(cc.RichText).fontSize = 100;
            this.time.getComponent(cc.RichText).string = "Starting in";
            this.state -= 1;
        }
        else if(this.state >= 1) {
            this.time.getComponent(cc.RichText).fontSize = 180;
            this.time.getComponent(cc.RichText).string = this.state + "";
            this.state -= 1; 
        }
        else {
            this.state -= 1; 
        }
    }   
}