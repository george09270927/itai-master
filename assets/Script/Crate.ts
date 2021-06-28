
const {ccclass, property} = cc._decorator;

@ccclass
export default class Crate extends cc.Component {

    onLoad () {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getPhysicsManager().enabled = true;
    }

    start () {
        
    }

}
