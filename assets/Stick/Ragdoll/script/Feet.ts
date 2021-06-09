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

    @property(cc.Prefab)
    walk_particle: cc.Prefab = null;
    
    onBeginContact(contact, self, other) {
        var direction = contact.getWorldManifold().normal;
        //cc.log("YYYYYYYYY: "+direction.y);
        if (other.node.name == "platform" && direction.y < -0.1) {  // actually stand on Ground
            Global.onGround = true;
            Global.onWall = 0;
            Global.head_contact = false;
            //cc.log("platform");
            if (self.node.name == "0_R_Leg_02" || self.node.name == "1_R_Leg_02" || self.node.name == "0_L_Leg_02" || self.node.name == "1_L_Leg_02") {
                var particle_prefab = cc.instantiate(this.walk_particle);
                this.node.parent.addChild(particle_prefab);
                particle_prefab.setPosition(cc.v2(this.node.position.x, this.node.position.y - 13));

                this.scheduleOnce(function() { 
                    particle_prefab.destroy();
                    //cc.log("destory");
                }, 3);
            }
            
        } else if (other.node.name == "platform" && direction.x < 0) {
            cc.log("feet onWall left: ", this.node.name);
            if (!Global.head_contact) Global.onWall = 1;
            cc.log("Global.onwall", Global.onWall);
            //if ((self.node.name == "0_Body_01" || self.node.name == "0_Body_02"))
            //cc.log("platform");
        } else if (other.node.name == "platform" && direction.x > 0) {
            cc.log("feet onWall right: ", this.node.name);
            if (!Global.head_contact) Global.onWall = 2;
            //cc.log("platform");
        }
        /*if (other.node.name == "platform" && direction.x != 0) {     // wall
            Global.onWall = true;
        }*/
    }
    onEndContact(contact, self, other) {
        if (other.node.name == "platform") {
            //cc.log("leave onGround: ",Global.onGround);
            //Global.onGround = false;    // when jump, onGround will be false 
            if (Global.onWall == 1 && !Global.head_contact) Global.onWall = 3;
            else if (Global.onWall == 2 && !Global.head_contact)  Global.onWall = 4;
            //cc.log("endcontact:", Global.onWall);
            //Global.onWall = false;
            //cc.log("platform");
        }
    }
}
