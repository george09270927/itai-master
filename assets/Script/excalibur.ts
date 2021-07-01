const { ccclass, property } = cc._decorator;

@ccclass
export default class GlowInnerEffectScene extends cc.Component {
    private _redSlider: cc.Slider = null;
    private _redSliderLabel: cc.Label = null;

    private _greenSlider: cc.Slider = null;
    private _greenSliderLabel: cc.Label = null;

    private _blueSlider: cc.Slider = null;
    private _blueSliderLabel: cc.Label = null;

    private _alphaSlider: cc.Slider = null;
    private _alphaSliderLabel: cc.Label = null;

    private _glowWidthSlider: cc.Slider = null;
    private _glowWidthSliderLabel: cc.Label = null;

    private _glowThresholdSlider: cc.Slider = null;
    private _glowThresholdSliderLabel: cc.Label = null;

    private _examplesParentNode: cc.Node = null;

    onLoad() {
        this._examplesParentNode = cc.find("Canvas/excalubur2");
    }

    onEnable() {
        
    }

    onDisable() {

    }

    start() {
        this._onSliderChanged();
    }

    private _onSliderChanged() {
        // 更新进度条值 Label 文本
        this._redSliderLabel.string = `${this._redSlider.progress.toFixed(2)} | ${Math.round(255 * this._redSlider.progress)}`;
        this._greenSliderLabel.string = `${this._greenSlider.progress.toFixed(2)} | ${Math.round(255 * this._greenSlider.progress)}`;
        this._blueSliderLabel.string = `${this._blueSlider.progress.toFixed(2)} | ${Math.round(255 * this._blueSlider.progress)}`;
        this._alphaSliderLabel.string = `${this._alphaSlider.progress.toFixed(2)} | ${Math.round(255 * this._alphaSlider.progress)}`;

        // 这里为约束一下值发光宽度值在 [0.0, 0.1] 因为 0.1+ 之后的效果可能不明显，也可以自己尝试修改
        let realGlowWidthProgress = this._glowWidthSlider.progress * 0.1;
        this._glowWidthSliderLabel.string = `${realGlowWidthProgress.toFixed(2)}`;

        // 这里为约束一下值发光阈值值在 [0.0, 0.5] 因为 0.5+ 之后的效果可能就是其他效果，也可以自己修改这里
        // let realGlowThresholdProgress = this._glowThresholdSlider.progress * 0.5;
        let realGlowThresholdProgress = this._glowThresholdSlider.progress;
        this._glowThresholdSliderLabel.string = `${realGlowThresholdProgress.toFixed(2)}`;

        // 更新材质
        this._updateRenderComponentMaterial({
            glowColor: cc.v4(this._redSlider.progress, this._greenSlider.progress, this._blueSlider.progress, this._alphaSlider.progress),
            glowColorSize: realGlowWidthProgress,
            glowThreshold: realGlowThresholdProgress
        });
    }

    /**
     * 更新渲染组件的材质
     *
     * 1. 获取材质
     * 2. 给材质的 unitform 变量赋值
     * 3. 重新将材质赋值回去
     */
    private _updateRenderComponentMaterial(param: {
        /**
         * 发光宽度 [0.0, 1.0]
         */
        glowColorSize: number;

        /**
         * 发光颜色 [0.0, 1.0]
         */
        glowColor: cc.Vec4;

        /**
         * 发光阈值 [0.0, 1.0]
         */
        glowThreshold: number;
    }) {
        this._examplesParentNode.children.forEach(childNode => {
            childNode.getComponents(cc.RenderComponent).forEach(renderComponent => {
                let material: cc.Material = renderComponent.getMaterial(0);
                material.setProperty("glowColorSize", param.glowColorSize);
                material.setProperty("glowColor", param.glowColor);
                material.setProperty("glowThreshold", param.glowThreshold);
                renderComponent.setMaterial(0, material);
            });
        });
    }
}
