const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    private isTouched: boolean = false;
    start () {

    }

    // update (dt) {}

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
        if((other.tag == 3 || other.node.name == "player") && !this.isTouched)
        {
            this.isTouched = true;
            //cc.log("fall.");
            this.fall();
        }
    }
}
