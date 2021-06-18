const { ccclass, property } = cc._decorator;

@ccclass
export default class Treadmill extends cc.Component {
  
    private moveSpeed: number = -80;

    start() {
    }

    update(dt) {
    }

    onBeginContact(contact, selfCollider, otherCollider) {
    }

    onPostSolve(contact, selfCollider, otherCollider) {
        if(otherCollider.node.name == "player") {
            let vy = otherCollider.getComponent(cc.RigidBody).linearVelocity.y;
            otherCollider.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.moveSpeed, vy);
        }
    }
}
