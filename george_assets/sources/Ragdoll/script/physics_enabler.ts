

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    Debug_Draw:boolean = false;

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        cc.director.getPhysicsManager().enabled = true;

        if(this.Debug_Draw){
            var Bits = cc.PhysicsManager.DrawBits;
            cc.director.getPhysicsManager().debugDrawFlags = Bits.e_aabbBit |
            Bits.e_pairBit |
            Bits.e_centerOfMassBit |
            Bits.e_jointBit |
            Bits.e_shapeBit;
        }
     }

    start () {

    }

    // update (dt) {}
}
