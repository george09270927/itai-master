
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

    private isDead: boolean = true;

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

        let maxBulletNum = 5;

        for(let i: number = 0; i < maxBulletNum; i++)
        {
            let bullet = cc.instantiate(this.bulletPrefab);

            this.bulletPool.put(bullet);
        }
    }

    start() 
    {
        // add key down and key up event
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    update(dt)
    {
        this.playerMovement(dt);

        this.playerAnimation();
    }

    onKeyDown(event) 
    {
        switch(event.keyCode) 
        {
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

    private playerMovement(dt)
    {
        if(this.isDead)
            this.playerSpeed = 0;
        else if(this.jDown || this.anim.getAnimationState('shoot').isPlaying)
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

        if(this.isDead)
        {
            //reset player position and play reborn animation
            if(this.animateState == null || this.animateState.name != 'reborn')
            {
                this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);

                // ===================== TODO =====================
                // 1. reset the player's position to (-192, 255)
                // 2. play reborn animation and use "this.animateState" to record animation state
                // 3. register a callback function when reborn animation finish, and set the value of this.isDead to false in the callback function
                // ================================================
                
                if(this.scene.name == "CastleMap")
                    this.node.position = cc.v2(480, 500);
                else if(this.scene.name == "IceMap")
                    this.node.position = cc.v2(200, 500);
                cc.log(this.anim);
                cc.log(this.anim.play('reborn'));
                this.animateState = this.anim.play('reborn');

                cc.log(this.animateState);
                this.animateState.on('finished', ()=>{ this.isDead = false; }, this);


                //reset score value
                //this.score.resetScore();
            }
        }
        else if(this.anim.getAnimationState('jump').isPlaying) {
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
        if(otherCollider.tag == 2 && !this.isDead) //enemy tag
        {
            this.isDead = true;
        }
        // ===================== TODO ===================== 
        // 1. Use otherCollider.tag to check if the player collides with ground or block(the tag of both ground and block are 1), 
        // and do step2 and step3 when the condition is true
        // 2. set the value of this.onGround to true
        // 3. check if jump animation still playing, if yes, stop it and play idle animation 
        // ================================================
        
        else if(otherCollider.node.name == "platform"){
            this.onGround = true;
            cc.log("hit platform");
            if(this.anim.clip == "jump" && this.anim.isPlaying){
                this.anim.play("idle");
            }
        } else if(otherCollider.node.name == "Spike" && !this.isDead){
            this.isDead = true;
        } else if(otherCollider.tag == 3){
            this.isDead = true;
        } else if(otherCollider.node.name == "IcePlatform") {
            this.onGround = true;
            cc.log("hit IcePlatform");
            if(this.anim.clip == "jump" && this.anim.isPlaying){
                this.anim.play("idle");
            }
        }
        
    }
}