// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import { DrawManager,PenType } from "./DrawManager";

const {ccclass, property, executeInEditMode} = cc._decorator;

@ccclass
@executeInEditMode
export default class Draw extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property(cc.Node)
    board: cc.Node = null;

    @property(cc.Sprite)
    sprite: cc.Sprite = null;

    private drawManager: DrawManager;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        const node = this.sprite.node;

        this.sprite.spriteFrame.vertices = {
                x: [0, this.sprite.node.width, node.width , 0          ],
                y: [0, 0                     , node.height, node.height],
                nu: [0, 1, 1, 0],
                nv: [0, 0, 1, 1], 
                triangles: [0, 1, 2, 2 ,3 ,0],
            }
            // 标记顶点数据修改过了
            this.sprite.setVertsDirty();
    }
    onFocusInEditor () {
        
    }

    start () {
        this.drawManager = new DrawManager();
        this.drawManager.init(this.board);
        this.onPen();
        this.node.addChild(this.drawManager.drawNode);
        
    }



    onEraser() {
        this.drawManager.setLineWidth(40);
        this.drawManager.setStrokeColor(new cc.Color(0, 0, 0, 0));
    }

    onPen() {
        this.drawManager.setLineWidth(10);
        this.drawManager.setStrokeColor(new cc.Color(0, 200, 200, 255));
    }


    // update (dt) {}
}
