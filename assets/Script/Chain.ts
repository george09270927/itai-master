
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        cc.director.getCollisionManager().enabled = true;

        cc.director.getPhysicsManager().enabled = true;
    }

    start () {

    }

    // update (dt) {}

    onBeginContact(contact, self, other){
        cc.log("hit");
        if(other.node.name == "bullet" || other.node.name == "red_beam_1"|| other.node.name == "red_beam_2"||other.node.name=="excalibur_beam_1"||other.node.name=="excalibur_beam_2"){
            cc.log("chain is hitted by bullet");
            self.node.getComponent(cc.RevoluteJoint).enabled = false;
        } else if(other.tag == 3){
            cc.log("destroy");
            self.node.destroy();
        }
    }
}
