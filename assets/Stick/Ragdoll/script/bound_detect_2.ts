import { Global } from "./Leg_force_2";


const {ccclass, property} = cc._decorator;

@ccclass
export default class bound_detect_2 extends cc.Component {

    onLoad () {}

    start () {
    }

    update()
    {
    }
    onBeginContact(contact, self, other) {
        //2p
        if(other.node.name == "1_Head") {
            Global.player2_dead = true;
            cc.log("bound");
        }
        else if(other.node.name == "1_Neck")
        {
            Global.player2_dead= true;
            cc.log("bound");
        }
        else if(other.node.name == "1_Body_01")
        {
            Global.player2_dead= true;
            cc.log("bound");
        }
        else if(other.node.name == "1_Body_02")
        {
            Global.player2_dead= true;
            cc.log("bound");
        }
        else if(other.node.name == "1_L_Leg_01")
        {
            Global.player2_dead= true;
            cc.log("bound");
        }
        else if(other.node.name == "1_L_Leg_02")
        {
            Global.player2_dead= true;
            cc.log("bound");
        }
        else if(other.node.name == "1_R_Leg_01")
        {
            Global.player2_dead= true;
            cc.log("bound");
        }
        else if(other.node.name == "1_R_Leg_02")
        {
            Global.player2_dead= true;
            cc.log("bound");
        }
        else if(other.node.name == "1_L_Arm_01")
        {
            Global.player2_dead= true;
            cc.log("bound");
        }
        else if(other.node.name == "1_L_Arm_02")
        {
            Global.player2_dead= true;
            cc.log("bound");
        }
        else if(other.node.name == "1_R_Arm_01")
        {
            Global.player2_dead= true;
            cc.log("bound");
        }
        else if(other.node.name == "1_R_Arm_02")
        {
            Global.player2_dead= true;
            cc.log("bound");
        }
    }
}
