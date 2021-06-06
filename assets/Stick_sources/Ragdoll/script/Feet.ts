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
export default class Feet extends cc.Component {

    onBeginContact(contact, self, other) {
        var direction = contact.getWorldManifold().normal;
        //cc.log("YYYYYYYYY: "+direction.y);
        if (other.node.name == "platform" && direction.y < -0.1) {
            cc.log("y: ", direction.y);
            //cc.log("hit onGround: ",Global.onGround);
            Global.onGround = true;
            Global.onWall = 0;
            //cc.log("platform");
        }
        /*if (other.node.name == "platform" && direction.x != 0) {     // wall
            Global.onWall = true;
        }*/
    }
    onEndContact(contact, self, other) {
        if (other.node.name == "platform") {
            //cc.log("leave onGround: ",Global.onGround);
            Global.onGround = false;
            //Global.onWall = false;
            //cc.log("platform");
        }
    }
}
