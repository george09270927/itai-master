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
        if (other.node.name == "platform" && direction.y < 0) {
            cc.log("hit onGround: ",Global.onGround);
            Global.onGround = true;
            //cc.log("platform");
        }
        //cc.log("contact other:"+ other.node.name);
        //cc.log("diff: ",self.node.y - other.node.y);
        
    }
    onEndContact(contact, self, other) {
        if (other.node.name == "platform") {
            cc.log("leave onGround: ",Global.onGround);
            Global.onGround = false;
            //cc.log("platform");
        }
    }
}
