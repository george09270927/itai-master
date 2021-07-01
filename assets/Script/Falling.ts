const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    private isTouched: boolean = false;
    start () {
        
    }

    // update (dt) {}
    // for CustomMap init position
    initPos(pos){
        this.node.parent.position = pos;
    }

    fall(){
        //cc.log("in fall");
        let shakeaction = cc.sequence(cc.rotateTo(0.08, -6), cc.rotateTo(0.08, 6)).repeat(5);
        let action = cc.sequence(shakeaction, cc.rotateTo(0.1, 0), cc.callFunc(this.falling, this));
        //this.node.runAction(shakeaction);
        this.node.runAction(action);
    }
    falling(){
        //cc.log("in call func");
        this.scheduleOnce(()=>{ this.node.getComponent(cc.RigidBody).type = 2});

    }

    onBeginContact(contact, self, other)
    {
        //if((other.node.group == "leg" || other.node.name == "player" ) && !this.isTouched)
        if((other.node.name == "0_L_Leg_02" || other.node.name == "0_R_Leg_02" || other.node.name == "1_L_Leg_02" || other.node.name == "1_R_Leg_02") && !this.isTouched)
        {
            this.isTouched = true;
            cc.log("fall.");
            this.fall();
        }
    }
}
