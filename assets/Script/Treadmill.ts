const { ccclass, property } = cc._decorator;

@ccclass
export default class Treadmill extends cc.Component {
  
    private moveSpeed: number = -800;
    //private moveSpeed: number = -8000;

    start() {
    }

    update(dt) {
    }

    onBeginContact(contact, selfCollider, otherCollider) {
    }

    onPostSolve(contact, selfCollider, otherCollider) {
        //if(otherCollider.node.group == "stick" || otherCollider.node.group == "stick2" || otherCollider.node.group == "leg") {
        if (otherCollider.node.name == "0_L_Leg_02" || otherCollider.node.name == "0_R_Leg_02") {
            let vy = otherCollider.getComponent(cc.RigidBody).linearVelocity.y;
            otherCollider.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.moveSpeed, vy);
            /*let vy = cc.find('small_sticker - 002_knee/0_Head').getComponent(cc.RigidBody).linearVelocity.y;
            cc.find('small_sticker - 002_knee/0_Head').getComponent(cc.RigidBody).linearVelocity = cc.v2(this.moveSpeed, vy);
            cc.log("in knee!!!!!!!!!!!: ", cc.find('small_sticker - 002_knee/0_Head').getComponent(cc.RigidBody).linearVelocity.x);*/
        } else if (otherCollider.node.name == "1_L_Leg_02" || otherCollider.node.name == "1_R_Leg_02") {
            let vy = otherCollider.getComponent(cc.RigidBody).linearVelocity.y;
            otherCollider.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.moveSpeed, vy);
            /*let vy = cc.find('small_sticker - 002_yellow/1_Head').getComponent(cc.RigidBody).linearVelocity.y;
            cc.find('small_sticker - 002_yellow/1_Head').getComponent(cc.RigidBody).linearVelocity = cc.v2(this.moveSpeed, vy);
            cc.log("in yellow!!!!!!!!!!!");*/
        }
    }
}
