
const {ccclass, property} = cc._decorator;

@ccclass
export default class ButtonController extends cc.Component 
{
    private Buttons = null;
    private ButtonBg = null;
    private ButtonCover = null;
    private RuleWindow = null;
    private isShow: boolean = false;

    onLoad() {
    }

    start() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);

        this.Buttons = cc.find("Canvas/menu/Buttons");
        this.ButtonBg = cc.find("Canvas/menu/Buttonbg");
        this.ButtonCover = cc.find("Canvas/menu/Button cover");
        if(cc.director.getScene().name == "Menu")
            this.RuleWindow = cc.find("Canvas/menu/RuleWindow");
    }
    
    update(dt) {
    }

    onKeyDown(event) {
        let keyCode = event.keyCode;
        if(keyCode == cc.macro.KEY.escape) {
            if(this.isShow) {
                if(cc.director.getScene().name != "Menu")
                    this.Resume();
                else if(!this.RuleWindow.active)
                    this.Resume();
            }
            else {             
                this.isShow = true;
                this.Buttons.active = true;         
                this.ButtonBg.active = true;
                this.ButtonCover.active = true;
                this.Buttons.getChildByName("Resume").getComponent(cc.Button).interactable = false;
                this.Buttons.getChildByName("MainMenu").getComponent(cc.Button).interactable = false;
                this.Buttons.getChildByName("QuitGame").getComponent(cc.Button).interactable = false;
                
                let move = cc.moveTo(0.2, 0, -280);
                if(cc.director.getScene().name == "Menu") {
                    move = cc.moveTo(0.2, 0, -500);
                    this.Buttons.getChildByName("Rule").getComponent(cc.Button).interactable = false;
                    this.Buttons.getChildByName("Editor").getComponent(cc.Button).interactable = false;
                }
                let finished = cc.callFunc(()=> {
                    cc.director.pause();
                    cc.audioEngine.pauseAll();
                    console.log("pause");
                })
                this.ButtonCover.runAction(cc.sequence(move, finished));
                
                this.Buttons.getChildByName("Resume").getComponent(cc.Button).interactable = true;
                this.Buttons.getChildByName("MainMenu").getComponent(cc.Button).interactable = true;
                this.Buttons.getChildByName("QuitGame").getComponent(cc.Button).interactable = true;
                if(cc.director.getScene().name == "Menu") {
                    this.Buttons.getChildByName("Rule").getComponent(cc.Button).interactable = true;
                    this.Buttons.getChildByName("Editor").getComponent(cc.Button).interactable = true;
                }           
            }
        }
    }

    public Resume() {
        cc.director.resume();
        cc.audioEngine.resumeAll();
        console.log("resume");
        let move = cc.moveTo(0.2, 0, 0)      // move to (0, 0) in 0.2 sec
        if(cc.director.getScene().name == "Menu") move = cc.moveTo(0.2, 0, -30);
        let finished = cc.callFunc(()=> {
            this.isShow = false;
            this.Buttons.active = false;
            this.ButtonBg.active = false;
            this.ButtonCover.active = false;
        });
        this.ButtonCover.runAction(cc.sequence(move, finished));
    }

    public Rule() {
        cc.director.resume();
        this.Buttons.active = false;
        this.RuleWindow.getChildByName("Back").getComponent(cc.Button).interactable = false;

        this.RuleWindow.active = true;
        this.RuleWindow.opacity = 0;
        this.RuleWindow.scale = 0.2;
        cc.tween(this.RuleWindow)
        .to(0.5, {scale: 1, opacity: 255}, {easing: "quartInOut"})
        .call(()=> {
            this.RuleWindow.getChildByName("Back").getComponent(cc.Button).interactable = true;
            cc.director.pause();
        })
        .start();
    }

    public Back() {
        cc.director.resume();
        cc.tween(this.RuleWindow)
        .to(0.5, {scale: 0.2, opacity: 0}, {easing: "quartInOut"})
        .call(()=> {
            this.RuleWindow.active = false;
            this.Buttons.active = true;
            cc.director.pause();
        })
        .start();
    }

    public Editor() {
        cc.director.resume();
        cc.director.loadScene("CustomMap");
    }

    public MainMenu() {
        cc.director.resume();
        cc.director.loadScene("Menu");
    }    

    public QuitGame() {
        cc.game.end();
    }
    
}