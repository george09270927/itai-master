import { Global } from "./Leg_force";


const {ccclass, property} = cc._decorator;

@ccclass
export default class bound_detect extends cc.Component {

    onLoad () {}

    start () {
    }

    update()
    {
    }
    onBeginContact(contact, self, other) {
        if(other.node.name == "0_Head") {
            Global.player1_dead = true;
            cc.log("bound");
        }
        else if(other.node.name == "0_Neck")
        {
            Global.player1_dead= true;
            cc.log("bound");
        }
        else if(other.node.name == "0_Body_01")
        {
            Global.player1_dead= true;
            cc.log("bound");
        }
        else if(other.node.name == "0_Body_02")
        {
            Global.player1_dead= true;
            cc.log("bound");
        }
        else if(other.node.name == "0_L_Leg_01")
        {
            Global.player1_dead= true;
            cc.log("bound");
        }
        else if(other.node.name == "0_L_Leg_02")
        {
            Global.player1_dead= true;
            cc.log("bound");
        }
        else if(other.node.name == "0_R_Leg_01")
        {
            Global.player1_dead= true;
            cc.log("bound");
        }
        else if(other.node.name == "0_R_Leg_02")
        {
            Global.player1_dead= true;
            cc.log("bound");
        }
        else if(other.node.name == "0_L_Arm_01")
        {
            Global.player1_dead= true;
            cc.log("bound");
        }
        else if(other.node.name == "0_L_Arm_02")
        {
            Global.player1_dead= true;
            cc.log("bound");
        }
        else if(other.node.name == "0_R_Arm_01")
        {
            Global.player1_dead= true;
            cc.log("bound");
        }
        else if(other.node.name == "0_R_Arm_02")
        {
            Global.player1_dead= true;
            cc.log("bound");
        }
    }
}
