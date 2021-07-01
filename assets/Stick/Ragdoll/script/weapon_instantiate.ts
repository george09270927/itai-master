const {ccclass, property} = cc._decorator;

@ccclass
export default class weapon_instantiate extends cc.Component {


    @property(cc.Prefab)
    private bulletPrefab: cc.Prefab = null;

    private canCreateBullet: boolean = true;

    private bulletInterval: number = 0.5; 

    private jDown: boolean = false;


    @property(cc.ParticleSystem)
    private chargingParticle: cc.ParticleSystem = null;


    @property(cc.ParticleSystem)
    private level0: cc.ParticleSystem = null;
    @property(cc.ParticleSystem)
    private level1: cc.ParticleSystem = null;
    @property(cc.ParticleSystem)
    private level2: cc.ParticleSystem = null;
    @property(cc.ParticleSystem)
    private level3: cc.ParticleSystem = null;
    @property(cc.ParticleSystem)
    private level4: cc.ParticleSystem = null;
    @property(cc.ParticleSystem)
    private level5: cc.ParticleSystem = null;
    @property(cc.ParticleSystem)
    private level6: cc.ParticleSystem = null;
    @property(cc.ParticleSystem)
    private level7: cc.ParticleSystem = null;
    @property(cc.ParticleSystem)
    private level8: cc.ParticleSystem = null;
    @property(cc.ParticleSystem)
    private level9: cc.ParticleSystem = null;
    @property(cc.ParticleSystem)
    private level10: cc.ParticleSystem = null;


    public init(node: cc.Node) 
    {
        if(this.node.name=="Grenade_launcher_prefab_1"||this.node.name=="Grenade_launcher_prefab_2") this.bulletInterval=1;
        
        this.setInitPos(node);
    }

    //this function sets the bullet's initial position when it is reused.
    private setInitPos(node: cc.Node)
    {
        this.node.parent = node.parent; // don't mount under the player, otherwise it will change direction when player move

        this.node.position = cc.v2(0,0);
        
        cc.log(this.node.parent);
        //cc.find('small_sticker - 002_knee/0_R_hand').getComponent(cc.DistanceJoint).frequency = 0;

        if(node.name == '0_R_hand') 
        {

            
            this.node.getComponent(cc.RevoluteJoint).connectedBody = cc.find('small_sticker - 002_knee/0_R_hand').getComponent(cc.RigidBody);
            this.node.group = "stick";
        }
        else if(node.name == '1_R_hand') 
        {
            this.node.getComponent(cc.RevoluteJoint).connectedBody = cc.find('small_sticker - 002_yellow/1_R_hand').getComponent(cc.RigidBody);
            this.node.group = "stick2";
        }

        

        this.node.position = this.node.position.addSelf(node.position);

        cc.log(this.node.group);
    }






    private createBullet()
    {
        if(this.canCreateBullet==true)
        {
            this.canCreateBullet = false;
            this.scheduleOnce(function(){
                this.canCreateBullet = true;
            }, this.bulletInterval);
            let bullet = cc.instantiate(this.bulletPrefab);
            if(this.node.group=="stick")bullet.getComponent('gun_bullet').init(this.node);
            else if(this.node.group=="stick2")bullet.getComponent('gun_bullet_2').init(this.node);


            if(this.node.name  == "excalibur_prefab_1"||this.node.name  == "excalibur_prefab_2")
            {
            cc.log("nonowowow");
            this.stopParticle();
            this.stopLevel0();
            this.stopLevel1();
            this.stopLevel2();
            this.stopLevel3();
            this.stopLevel4();
            this.stopLevel5();
            this.stopLevel6();
            this.stopLevel7();
            this.stopLevel8();
            this.stopLevel9();
            this.stopLevel10();
            } else if(this.node.name == "LaserGun_prefab"){
                cc.log("piupiu");
            }


        }
    }



    private resetParticle()
    {
        // kill all particles and restart particle system
        this.chargingParticle.resetSystem();
    }


    private stopParticle()
    {
        this.chargingParticle.resetSystem();
        this.chargingParticle.stopSystem();
    }


    private slowdownParticle()
    {
        this.chargingParticle.stopSystem();
    }


    private resetLevel0()
    {
        this.level0.resetSystem();
    }
    private stopLevel0()
    {
        this.level0.resetSystem();
        this.level0.stopSystem();
    }
    private resetLevel1()
    {
        this.level1.resetSystem();
    }
    private stopLevel1()
    {
        this.level1.resetSystem();
        this.level1.stopSystem();
    }
    private resetLevel2()
    {
        this.level2.resetSystem();
    }
    private stopLevel2()
    {
        this.level2.resetSystem();
        this.level2.stopSystem();
    }
    private resetLevel3()
    {
        this.level3.resetSystem();
    }
    private stopLevel3()
    {
        this.level3.resetSystem();
        this.level3.stopSystem();
    }
    private resetLevel4()
    {
        this.level4.resetSystem();
    }
    private stopLevel4()
    {
        this.level4.resetSystem();
        this.level4.stopSystem();
    }
    private resetLevel5()
    {
        this.level5.resetSystem();
    }
    private stopLevel5()
    {
        this.level5.resetSystem();
        this.level5.stopSystem();
    }
    private resetLevel6()
    {
        this.level6.resetSystem();
    }
    private stopLevel6()
    {
        this.level6.resetSystem();
        this.level6.stopSystem();
    }
    private resetLevel7()
    {
        this.level7.resetSystem();
    }
    private stopLevel7()
    {
        this.level7.resetSystem();
        this.level7.stopSystem();
    }
    private resetLevel8()
    {
        this.level8.resetSystem();
    }
    private stopLevel8()
    {
        this.level8.resetSystem();
        this.level8.stopSystem();
    }
    private resetLevel9()
    {
        this.level9.resetSystem();
    }
    private stopLevel9()
    {
        this.level9.resetSystem();
        this.level9.stopSystem();
    }
    private resetLevel10()
    {
        this.level10.resetSystem();
    }
    private stopLevel10()
    {
        this.level10.resetSystem();
        this.level10.stopSystem();
    }
}
