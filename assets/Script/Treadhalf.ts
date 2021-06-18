const { ccclass, property } = cc._decorator;

@ccclass
export default class Treadhalf extends cc.Component {
  
    private moveSpeed: number = -150;
    private direction: number = -1;

    start() {
        
    }

    update(dt) {
        if(this.direction == -1) {
            this.moveSpeed = -200;
            if(this.node.x <= 75) {
                this.node.angle = 180;
                this.node.y -= 40;
                this.direction = 1;
            }
        }
        else if(this.direction == 1) {
            this.moveSpeed = 200;
            if(this.node.x >= 880) {
                this.node.angle = 0;
                this.node.y += 40;
                this.direction = -1;
            }
        }
        this.node.x += this.moveSpeed * dt;  
    }  
}
