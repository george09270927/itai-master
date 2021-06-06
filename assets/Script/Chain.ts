
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
        if(other.node.name == "bullet"){
            cc.log("chain is hitted by bullet");
            self.node.getComponent(cc.RevoluteJoint).enabled = false;
        } else if(other.tag == 3){
            cc.log("destroy");
            self.node.destroy();
        }
    }
}