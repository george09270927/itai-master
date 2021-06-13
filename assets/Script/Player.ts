
const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends cc.Component 
{
    private scene = null;

    private anim = null; //this will use to get animation component

    private animateState = null; //this will use to record animationState

    @property(cc.Prefab)
    private bulletPrefab: cc.Prefab = null;

    private bulletPool = null; // this is a bullet manager, and it control the bullet resource

    private playerSpeed: number = 0;

    private zDown: boolean = false; // key for player to go left

    private xDown: boolean = false; // key for player to go right

    private jDown: boolean = false; // key for player to shoot

    private kDown: boolean = false; // key for player to jump

    private onGround: boolean = false;

    private show: boolean = false;

    private ready: boolean = false;

    //private isDead: boolean = true;

    private canCreateBullet: boolean = true;

    private bulletInterval: number = 0.2; 

    onLoad()
    {
        // ===================== TODO =====================
        // 1. Use "this.anim" to record Animation component
        // ================================================

        this.anim = this.node.getComponent(cc.Animation);

        cc.director.getCollisionManager().enabled = true;

        cc.director.getPhysicsManager().enabled = true;

        this.bulletPool = new cc.NodePool('Bullet');
        /*
        let maxBulletNum = 5;
        for(let i: number = 0; i < maxBulletNum; i++)
        {
            let bullet = cc.instantiate(this.bulletPrefab);

            this.bulletPool.put(bullet);
        }
        */
    }

    start() 
    {
        this.node.active = false;
        this.node.getChildByName("text1").active = false;

        // add key down and key up event
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    update(dt)
    {
        if(this.show)
        {
            this.playerMovement(dt);

            this.playerAnimation();
        }  
    }

    onKeyDown(event) 
    {
        switch(event.keyCode) 
        {
            case cc.macro.KEY.w:
                if(!this.show) this.init();
                break;
            
            case cc.macro.KEY.q:
                if(this.ready) this.unprepare();
                else if(!this.ready) this.prepare();
                break;

            case cc.macro.KEY.z:
                
                this.zDown = true;

                this.xDown = false;

                break;

            case cc.macro.KEY.x:

                this.xDown = true;

                this.zDown = false;

                break;

            case cc.macro.KEY.j:
                
                this.jDown = true;

                break;

            case cc.macro.KEY.k:
                
                this.kDown = true;

                break;
        }
    }

    onKeyUp(event)
    {
        switch(event.keyCode) 
        {
            case cc.macro.KEY.z:

                this.zDown = false;

                break;

            case cc.macro.KEY.x:

                this.xDown = false;

                break;

            case cc.macro.KEY.j:

                this.jDown = false;

                break;

            case cc.macro.KEY.k:

                this.kDown = false;

                break;
        }
    }

    private init()
    {
        this.show = true;
        this.node.active = true;
        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);
        this.node.position = cc.v2(-250, 130);
 
        this.animateState = this.anim.play('reborn');
    }

    private unprepare()
    {
        this.ready = false;
        this.node.getChildByName("text1").active = false;
    }

    private prepare()
    {
        this.ready = true;
        this.node.getChildByName("text1").active = true;
    }

    private playerMovement(dt)
    {
        /*
        if(this.isDead)
            this.playerSpeed = 0;
        */
        if(this.jDown || this.anim.getAnimationState('shoot').isPlaying)
            this.playerSpeed = 0;
        else if(this.zDown)
            this.playerSpeed = -300;
        else if(this.xDown)
            this.playerSpeed = 300;
        else
            this.playerSpeed = 0;

        this.node.x += this.playerSpeed * dt;  //move player
    }

    private playerAnimation()
    {
        this.node.scaleX = (this.zDown) ? -1 : (this.xDown) ? 1 : this.node.scaleX;
        this.scene = cc.director.getScene();
        
        if(this.anim.getAnimationState('jump').isPlaying) {
            if(this.jDown)
                this.animateState = this.anim.play('shoot');
        }
        else if(!this.anim.getAnimationState('shoot').isPlaying && !this.anim.getAnimationState('jump').isPlaying && this.onGround) // move animation can play only when shoot or jump animation finished
        {
            if(this.jDown)
                this.animateState = this.anim.play('shoot');
            else if(this.kDown && this.onGround)
            {
                    this.animateState = this.anim.play('jump');

                    this.jump();
            }
            else if(this.zDown && this.onGround || this.xDown && this.onGround)
            {    
                if(this.zDown) 
                    this.node.getChildByName("text1").scaleX = -1;      
                else if(this.xDown)
                    this.node.getChildByName("text1").scaleX = 1;

                if(this.animateState == null || this.animateState.name != 'move') // when first call or last animation is not move
                    this.animateState = this.anim.play('move');
            }
            else
            {
                //if no key is pressed and the player is on ground, stop all animations and go back to idle
                if(this.animateState == null && this.onGround || this.animateState.name != 'idle' && this.onGround)
                    this.animateState = this.anim.play('idle');
            }
        }
    }

    //give velocity to the player
    private jump()
    {
        this.onGround = false;


        // ===================== TODO =====================
        // 1. set the linearVelocity of RigidBody to (0, 1500)
        // ================================================
        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 1000);
    }

    // call this when player shoots the bullet.
    private createBullet()
    {
        this.canCreateBullet = false;
        this.scheduleOnce(function(){
            this.canCreateBullet = true;
        }, this.bulletInterval);

        let bullet = cc.instantiate(this.bulletPrefab);
        bullet.getComponent('Bullet').init(this.node);
    }

    //check if the collision is valid or not
    onBeginContact(contact, selfCollider, otherCollider)
    {     
        if(otherCollider.node.name == "platform"){
            this.onGround = true;
            cc.log("hit platform");
            if(this.anim.clip == "jump" && this.anim.isPlaying){
                this.anim.play("idle");
            }
        }  
    }
}