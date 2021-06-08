import { Global } from "./Leg_force";


const {ccclass, property} = cc._decorator;

@ccclass
export default class weapon extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    kDown = false;
    flag = false;

    onLoad () {}

    start () {
    }

    update()
    {
    }
    //make the bullet move from current position
  

    public initR(node: cc.Node) 
    {
        this.setInitPosR(node);
    }

    private setInitPosR(node: cc.Node)
    {
        this.node.parent = node.parent; // don't mount under the player, otherwise it will change direction when player move

        this.node.position = cc.v2(50,0);

        this.node.position = this.node.position.addSelf(node.position);
    }


    public initL(node: cc.Node) 
    {
        this.setInitPosL(node);
    }

    private setInitPosL(node: cc.Node)
    {
        this.node.parent = node.parent; // don't mount under the player, otherwise it will change direction when player move

        this.node.position = cc.v2(-50,0);

        this.node.position = this.node.position.addSelf(node.position);
    }


    onBeginContact(contact, self, other) {
        if(other.node.name == "0_Head") {
            Global.player1_getgun = true;
            cc.find('small_sticker - 002_knee/0_Head').getComponent("debug_body1").instantiate_gun(this.node.name);
            //other.node.getComponent("debug_body1").instantiate_gun(this.node.name);
            this.node.destroy();
            cc.log("head fuck");
        }
        else if(other.node.name == "0_Neck")
        {
            Global.player1_getgun= true;
            //other.node.getComponent("debug_body1").instantiate_gun(this.node.name);
            cc.find('small_sticker - 002_knee/0_Head').getComponent("debug_body1").instantiate_gun(this.node.name);
            this.node.destroy();
            cc.log("fuck");
        }
        else if(other.node.name == "0_Body_01")
        {
            Global.player1_getgun= true;
            //other.node.getComponent("debug_body1").instantiate_gun(this.node.name);
            cc.find('small_sticker - 002_knee/0_Head').getComponent("debug_body1").instantiate_gun(this.node.name);
            this.node.destroy();
            cc.log("fuck");
        }
        else if(other.node.name == "0_Body_02")
        {
            Global.player1_getgun= true;
            //other.node.getComponent("debug_body1").instantiate_gun(this.node.name);
            cc.find('small_sticker - 002_knee/0_Head').getComponent("debug_body1").instantiate_gun(this.node.name);
            this.node.destroy();
            cc.log("fuck");
        }
        else if(other.node.name == "0_L_Leg_01")
        {
            Global.player1_getgun= true;
            //other.node.getComponent("debug_body1").instantiate_gun(this.node.name);
            cc.find('small_sticker - 002_knee/0_Head').getComponent("debug_body1").instantiate_gun(this.node.name);
            this.node.destroy();
            cc.log("fuck");
        }
        else if(other.node.name == "0_L_Leg_02")
        {
            Global.player1_getgun= true;
            //other.node.getComponent("debug_body1").instantiate_gun(this.node.name);
            cc.find('small_sticker - 002_knee/0_Head').getComponent("debug_body1").instantiate_gun(this.node.name);
            this.node.destroy();
            cc.log("fuck");
        }
        else if(other.node.name == "0_R_Leg_01")
        {
            Global.player1_getgun= true;
            //other.node.getComponent("debug_body1").instantiate_gun(this.node.name);
            cc.find('small_sticker - 002_knee/0_Head').getComponent("debug_body1").instantiate_gun(this.node.name);
            this.node.destroy();
            cc.log("fuck");
        }
        else if(other.node.name == "0_R_Leg_02")
        {
            Global.player1_getgun= true;
            //other.node.getComponent("debug_body1").instantiate_gun(this.node.name);
            cc.find('small_sticker - 002_knee/0_Head').getComponent("debug_body1").instantiate_gun(this.node.name);
            this.node.destroy();
            cc.log("fuck");
        }
        else if(other.node.name == "0_L_Arm_01")
        {
            Global.player1_getgun= true;
            //other.node.getComponent("debug_body1").instantiate_gun(this.node.name);
            cc.find('small_sticker - 002_knee/0_Head').getComponent("debug_body1").instantiate_gun(this.node.name);
            this.node.destroy();
            cc.log("fuck");
        }
        else if(other.node.name == "0_L_Arm_02")
        {
            Global.player1_getgun= true;
            //other.node.getComponent("debug_body1").instantiate_gun(this.node.name);
            cc.find('small_sticker - 002_knee/0_Head').getComponent("debug_body1").instantiate_gun(this.node.name);
            this.node.destroy();
            cc.log("fuck");
        }
        else if(other.node.name == "0_R_Arm_01")
        {
            Global.player1_getgun= true;
            //other.node.getComponent("debug_body1").instantiate_gun(this.node.name);
            cc.find('small_sticker - 002_knee/0_Head').getComponent("debug_body1").instantiate_gun(this.node.name);
            this.node.destroy();
            cc.log("fuck");
        }
        else if(other.node.name == "0_R_Arm_02")
        {
            Global.player1_getgun= true;
            //other.node.getComponent("debug_body1").instantiate_gun(this.node.name);
            cc.find('small_sticker - 002_knee/0_Head').getComponent("debug_body1").instantiate_gun(this.node.name);
            this.node.destroy();
            cc.log("fuck");
        }
        
    }
}
