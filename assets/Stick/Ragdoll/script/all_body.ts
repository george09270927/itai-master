

const {ccclass, property} = cc._decorator;

@ccclass
export default class all_body extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    onLoad () {}

    start () {

    }

    update (dt) {
        this.node.position = cc.find('small_sticker - 002_knee/0_Head').position;
    }









    onBeginContact(contact, self, other) {
      
        if(other.node.name == "desert_hawk") {
            
            cc.log("hits desert_hawk");
            other.node.getComponent(cc.RevoluteJoint).ConnectedBody = this.node;
        }
    }
}
