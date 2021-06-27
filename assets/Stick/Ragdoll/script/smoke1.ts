// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
import { Global } from "./Leg_force";

@ccclass
export default class smoke1 extends cc.Component {

    smokeAni;
    onLoad() {
        this.smokeAni = this.node.getComponent(cc.Animation);
    }
    die() {
        cc.log("which bound: ",Global.player1_dead_bound);
        if (Global.player1_dead_bound == 1) {           // up bound
            this.node.angle = 90;
        } else if (Global.player1_dead_bound == 3) {    // floor
            this.node.angle = -45;
            this.node.setPosition(this.node.x + 200, this.node.y);
        } else if (Global.player1_dead_bound == 4) {    // left bound
            this.node.angle = -90;
            this.node.setPosition(this.node.x + 400, this.node.y);
        }
        this.node.scaleX = 0.5;
        this.node.scaleY = 0.5;
        this.smokeAni = this.node.getComponent(cc.Animation);
        cc.log("die correctly");
        this.smokeAni.play("smoke_die_1");              /// TODO: here need to chenge to another
        //let action = cc.moveBy(1, -300, 0);
        //this.node.runAction(action);
        this.scheduleOnce(function() { this.node.destroy(); }, 0.25);
    }
    hit(parentX, parentY, percent, playerSide) {
        this.node.scaleX = 0.25;
        this.node.scaleY = 0.25;
        var random_val = 0.25;
        if (percent > 50) {
            random_val = Math.round(Math.random() * (percent / 50 - 1) + 1);
        }
        if (playerSide) {
            if (percent % 12 == 0) {
                this.node.angle = 15;
                parentY += 5;
            } else if (percent % 12 == 3) {
                this.node.angle = 0;
            } else if (percent % 12 == 6) {
                this.node.angle = -15;
                parentY -= 5
            } else if (percent % 12 == 9) {
                this.node.angle = -30;
                parentY -= 7
            }
            this.node.setPosition(parentX + 40, parentY);
        } else {    // yellow left, black right
            if (percent % 12 == 0) {
                this.node.angle = -30;
                parentY += 5;
            } else if (percent % 12 == 3) {
                this.node.angle = -15;
            } else if (percent % 12 == 6) {
                this.node.angle = 0;
                parentY -= 5
            } else if (percent % 12 == 9) {
                this.node.angle = 15;
                parentY -= 7
            }
            this.node.scaleX *= -1;
            this.node.setPosition(parentX - 40, parentY);
        }
        //if (percent > 100) this.node.scaleX *=  percent / 100;
        if (percent > 50) this.node.scaleX *= random_val;
        this.scheduleOnce(function() { this.node.destroy(); }, 0.25);
    }
    appear() {
        let action = cc.sequence(cc.moveBy(0.3, 0, 25), cc.fadeOut(0.8));
        this.node.runAction(action);
        //cc.audioEngine.playEffect(this.getCoin, false);
        this.scheduleOnce(function() { this.node.destroy(); }, 2);
    }
}
