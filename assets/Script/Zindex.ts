
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    start () {
        if(this.node.name == "Main Camera"){
            this.node.zIndex = 2;
        }
        cc.log("in " + this.node.name);
        cc.log("Node zIndex: " + this.node.zIndex);
    }

    // update (dt) {}
}
