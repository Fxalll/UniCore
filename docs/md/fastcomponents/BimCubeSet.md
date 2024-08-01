---
outline: deep
---

# BIM 场景视图盒子组件

### 功能介绍

通过 BIM 场景视图盒子组件，能够使用视图盒子进行当前视角的可视化显示与切换、正交/透视摄像机的切换功能。

本文推荐结合右键菜单 [开启 3DTiles 模型交互事件](../fastexample/setTilesRightClickMenu.md) 进行 BIM 场景切换时显示本文要介绍的 BIM 场景视图盒子组件。

不妨通过代码示例在 Vue 中尝试一下：

### 在线演示

点击 [在线链接](http://192.168.4.56:8091/?id=BimCubeSet) 以查看在线演示。

### 组件代码示例

默认路径为 `components/BimCubeSet/index.vue`

```vue
<template>
  <!-- BIM视图盒子组件 -->
  <div class="box" v-show="isShow">
    <div class="mainView leftSide">👁</div>
    <div class="switchFrustum leftSide">⚙</div>
    <main>
      <div class="front">前</div>
      <div class="ftop fronttop"></div>
      <div class="fbottom frontbottom"></div>
      <div class="fleft frontleft"></div>
      <div class="fright frontright"></div>
      <div class="tri trilefttop"></div>
      <div class="tri trileftbottom"></div>
      <div class="tri tririghttop"></div>
      <div class="tri trirightbottom"></div>

      <div class="back">后</div>
      <div class="ftop backtop"></div>
      <div class="fbottom backbottom"></div>
      <div class="fleft backleft"></div>
      <div class="fright backright"></div>
      <div class="tri tribacklefttop"></div>
      <div class="tri tribackleftbottom"></div>
      <div class="tri tribackrighttop"></div>
      <div class="tri tribackrightbottom"></div>

      <div class="left">左</div>
      <div class="ftop lefttop"></div>
      <div class="fbottom leftbottom"></div>

      <div class="right">右</div>
      <div class="ftop righttop"></div>
      <div class="fbottom rightbottom"></div>

      <div class="top">上</div>
      <div class="bottom">下</div>
    </main>
  </div>
</template>

<script type="text/javascript">

export default {

  data () {
    return {
      isShow: false,
      isFrustum: false,
      directionList: { 'mainView': [-45, -30], 'top': [45, -90], 'bottom': [0, 90], 'left': [90, 0], 'right': [-90, 0], 'front': [0, 0], 'back': [180, 0], 'fronttop': [0, -45], 'frontbottom': [0, 45], 'frontleft': [45, 0], 'frontright': [-45, 0], 'trilefttop': [45, -45], 'trileftbottom': [45, 45], 'tririghttop': [-45, -45], 'trirightbottom': [-45, 45], 'backtop': [180, -45], 'backbottom': [180, 45], 'backleft': [225, 0], 'backright': [135, 0], 'tribacklefttop': [225, -45], 'tribackleftbottom': [225, 45], 'tribackrighttop': [135, -45], 'tribackrightbottom': [135, 45], 'lefttop': [90, -45], 'leftbottom': [90, 45], 'righttop': [-90, -45], 'rightbottom': [-90, 45] }
    }
  },

  // mounted () {
  //   this.show();
  // },

  methods: {


    /**
     * 视图盒子初始化
     * @param {*} uniCore uniCore实例
     * @param {*} centerAxis 视角锁定中心坐标
     * @param {*} range 视角锁定距模型中心距离
     */
    show (uniCore, centerAxis, range) {
      let that = this;
      this.isShow = true;
      const main = document.querySelector('main')
      this.cubeInterval = setInterval(() => {
        let angle = getAngle(window.viewer.camera.direction.x, window.viewer.camera.direction.y)
        main.style.transform = `rotateX(${window.viewer.camera.direction.z * 90}deg) rotateY(${angle}deg) `
        function getAngle (x, y) {
          let angle = Math.atan2(x, y)
          if (angle < 0) angle += 2 * Math.PI
          return angle * 180 / Math.PI
        }
      })

      // 设置点击方法
      Object.entries(this.directionList).forEach(e => {
        document.querySelector(`.box .${e[0]}`).onclick = () => {
          uniCore.position.lockTo(uniCore.viewer, true, centerAxis, ...e[1], range)
        }
      })

      // 设置正交切换
      document.querySelector(`.box .switchFrustum`).onclick = () => {
        that.isFrustum === true ? window.viewer.camera.switchToPerspectiveFrustum() : window.viewer.camera.switchToOrthographicFrustum()
        that.isFrustum = !that.isFrustum;
      }

    },

    /**
     * 隐藏视图盒子
     */
    hide () {
      this.isShow = false;
      clearInterval(this.cubeInterval);

    }


  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
:root {
  --front: translateZ(25px);
  --back: translateZ(-25px) rotateY(180deg);
  --left: rotateY(270deg) translateZ(25px);
  --right: rotateY(90deg) translateZ(25px);
  --top: rotateX(90deg) translateZ(25px);
  --bottom: rotateX(90deg) translateZ(-25px);

  --fronttop: rotateX(45deg) translateY(9px) translateZ(21px);
  --frontbottom: rotateX(-45deg) translateY(9px) translateZ(39px);
  --frontleft: rotateY(-45deg) translateX(9px) translateZ(21px);
  --frontright: rotateY(45deg) translateX(9px) translateZ(40px);

  --trilefttop: rotateX(45deg) rotateY(-45deg) translateX(7px) translateY(10px)
    translateZ(17px) scaleX(-1);
  --trileftbottom: rotateX(-45deg) rotateY(-45deg) translateX(21px)
    translateY(10px) translateZ(30.5px) scaleX(-1);
  --tririghttop: rotateX(45deg) rotateY(45deg) translateX(12.5px)
    translateY(9.9px) translateZ(37px);
  --trirightbottom: rotateX(-45deg) rotateY(45deg) translateX(-0.9px)
    translateY(9.3px) translateZ(49.4px);

  --tribacklefttop: rotateX(-45deg) rotateY(-45deg) translateX(12.6px)
    translateY(10px) translateZ(-37px);
  --tribackleftbottom: rotateX(45deg) rotateY(-45deg) translateX(-0.9px)
    translateY(9.4px) translateZ(-49.9px);
  --tribackrighttop: rotateX(-45deg) rotateY(45deg) translateX(7px)
    translateY(9.4px) translateZ(-17px) scaleX(-1);
  --tribackrightbottom: rotateX(45deg) rotateY(45deg) translateX(20.7px)
    translateY(9.4px) translateZ(-30.3px) scaleX(-1);
}

body {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
/* 设置单面的高宽 */
.box {
  position: absolute;
  top: 60px;
  right: 60px;
  width: 50px;
  height: 50px;
  perspective: 1000px;
  scale: 1.4;
  z-index: 999;
}
/* 设置面里的字体大小居中、绝对定位 */
.box div {
  position: absolute;
  font-size: 20px;
  text-align: center;
  align-content: center;
  width: 70%;
  height: 70%;
  color: #575757;
  background: #dce9f6b5;
  border: 1px solid #fff;
  cursor: pointer;
  -webkit-user-select: none;
  transition: all 0.1s;
}

.box div:hover {
  background: #5ea7e6d1;
}

.box .leftSide {
  width: 12px;
  height: 11px;
  color: #fff;
  background: rgb(51 51 51 / 49%);
  border: 1px solid;
  border-radius: 50px;
  font-size: 10px;
  line-height: 0px;
}
.box .leftSide:hover {
  width: 20px;
  height: 20px;
  font-size: 15px;
  background: #000000f5;
}

.box .mainView {
  transform: translate(-25px, -30px);
}

.box .mainView:hover {
  transform: translate(-30px, -30px);
}

.box .mainView:hover::before {
  content: '主视角';
  position: absolute;
  color: rgb(51 51 51 / 49%);
  font-size: 8px;
  right: 25px;
  width: 30px;
}

.box .switchFrustum {
  transform: translate(-25px, 55px);
}

.box .switchFrustum:hover {
  transform: translate(-30px, 45px);
}

.box .switchFrustum:hover::before {
  content: '正交/透视摄像机切换';
  position: absolute;
  color: rgb(51 51 51 / 49%);
  font-size: 8px;
  right: 25px;
  width: 80px;
}

/* 设置3D动画以及特效旋转 */
main {
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
}

.front {
  transform: var(--front);
}

.ftop,
.fbottom {
  height: 9px !important;
}

.fleft,
.fright {
  width: 9px !important;
}

.fronttop {
  transform: var(--fronttop);
}

.frontbottom {
  transform: var(--frontbottom);
}

.frontleft {
  transform: var(--frontleft);
}

.frontright {
  transform: var(--frontright);
}

.tri {
  width: 18% !important;
  height: 20% !important;
  border: none !important;
  clip-path: polygon(0 0, 0 100%, 100% 45%);
}

.trilefttop {
  transform: var(--trilefttop);
}

.trileftbottom {
  transform: var(--tribackleftbottom);
}

.tririghttop {
  transform: var(--tririghttop);
}

.trirightbottom {
  transform: var(--trirightbottom);
}

.tribacklefttop {
  transform: var(--tribacklefttop);
}

.tribackleftbottom {
  transform: var(--trileftbottom);
}

.tribackrighttop {
  transform: var(--tribackrighttop);
}

.tribackrightbottom {
  transform: var(--tribackrightbottom);
}

.backtop {
  transform: rotateY(180deg) var(--fronttop);
}

.backbottom {
  transform: rotateY(180deg) var(--frontbottom);
}

.backleft {
  transform: rotateY(180deg) translateX(-26px) var(--frontleft);
}

.backright {
  transform: rotateY(180deg) translateX(-26px) var(--frontright);
}

.lefttop {
  transform: rotateY(270deg) var(--fronttop);
}

.leftbottom {
  transform: rotateY(270deg) var(--frontbottom);
}

.righttop {
  transform: rotateY(90deg) var(--fronttop);
}

.rightbottom {
  transform: rotateY(90deg) var(--frontbottom);
}

.back {
  transform: var(--back);
}

.left {
  transform: var(--left);
}

.right {
  transform: var(--right);
}

.top {
  transform: var(--top);
}

.bottom {
  transform: var(--bottom);
}
</style>
```

### 调用代码示例

```vue
<template>
  <div id="unicoreContainer">
    <!-- BIM视图盒子组件开始 -->
    <bcSet ref="bcSetId"></bcSet>
    <!-- BIM视图盒子组件结束 -->
  </div>
</template>

<script>
import { UniCore } from 'unicore-sdk'
import { config } from 'unicore-sdk/unicore.config'
import 'unicore-sdk/Widgets/widgets.css'
import bcSet from '@/components/BimCubeSet/index.vue'; //BIM视图盒子组件

export default {
  components: {
    bcSet
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.init();
  },

  // 方法集合
  methods: {

    /**
    * 通用图形引擎初始化
    */
    init () {

      // 初始化UniCore

      // 目前采用Cesium的地形&底图数据，这里配置Cesium的token
      let accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxNjEwMzI4My01MjBmLTQzYzktOGZiMS0wMDRhZjE0N2IyMGIiLCJpZCI6MTc1NzkyLCJpYXQiOjE3MTM3NzQ3OTh9.zU-R4MNvHr8rvn1v28PQfDImyutnpPF2lmEgGeSPckQ";
      // 初始化unicore
      let uniCore = new UniCore(config, accessToken);
      uniCore.init("unicoreContainer");

      // 视角初始化
      uniCore.position.buildingPosition(uniCore.viewer, [113.12380548015745, 28.250758831850005, 700], -20, -45, 1);

      // 模型示例1
      let options = {
        id: '小别墅'
      }
      //加载3dtiles
      uniCore.model.createTileset('../../assets/3Dtiles/sample3_方法2_小别墅属性(1)/tileset.json', options).then(cityLeft => {
        uniCore.model.changeModelPos(cityLeft, [113.12098820449636, 28.256150218457687, 50])
      })

      // 模型示例2
      options = {
        id: '小别墅2'
      }
      //加载3dtiles
      uniCore.model.createTileset('../../assets/3Dtiles/sample3_方法2_小别墅属性(1)/tileset.json', options).then(cityLeft => {
        uniCore.model.changeModelPos(cityLeft, [113.12098820449636, 28.257150218457687, 50])
      })

      // 开启右键菜单、点击高亮、属性property
      uniCore.interact.setTilesRightClickMenu([{
        id: '小别墅',
        url: '../../assets/3Dtiles/sample3_方法2_小别墅属性(1)/tileset.json',
        propertysURL: '../../assets/3Dtiles/sample3_方法2_小别墅属性(1)/01 小别墅.json'
      }, {
        id: '小别墅2',
        url: '../../assets/3Dtiles/sample3_方法2_小别墅属性(1)/tileset.json',
        propertysURL: '../../assets/3Dtiles/sample3_方法2_小别墅属性(1)/01 小别墅.json'
      }], (property) => console.log(property), (pickObj) => console.log(pickObj), (pickObj) => this.$refs.bcSetId.show(uniCore, uniCore.position.cartesian3_2axis(pickObj.tileset.boundingSphere.center), pickObj.tileset.boundingSphere.radius * 3), () => this.$refs.bcSetId.hide());

    }

  }

}
</script>
<style scoped>
#unicoreContainer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: black;
}
</style>
```


### 示例运行结果

切换 BIM 场景效果：

![Alt text](image-22.png)

点击视图盒子切换到对应视角：

![Alt text](image-23.png)

![Alt text](image-24.png)

主视角切换：

![Alt text](image-25.png)

正交/透视摄像机切换：

![Alt text](image-26.png)

### 调用代码示例中的关键代码

在结合右键菜单进行 BIM 场景切换视图盒子组件时，请学习其内的 [关键代码](../fastexample/setTilesRightClickMenu.md#关键代码) 章节以使用。

#### 组件方法介绍

组件使用 `show` 方法初始化视图盒子，其所需传入的变量如下：

```js
/**
 * 视图盒子初始化
 * @param {*} uniCore uniCore实例
 * @param {*} centerAxis 视角锁定中心坐标
 * @param {*} range 视角锁定距模型中心距离
 */
```

组件使用 `hide` 方法隐藏视图盒子。

#### 关键代码

使用 `show` 方法进行初始化时，完整代码如下。

在使用右键菜单时，直接在切换 BIM 场景的回调函数使用此段代码即可。

```js
(pickObj) => this.$refs.bcSetId.show(uniCore, uniCore.position.cartesian3_2axis(pickObj.tileset.boundingSphere.center), pickObj.tileset.boundingSphere.radius * 3)
```

使用 `hide` 方法进行初始化时，完整代码如下。

在使用右键菜单时，直接在切换 GIS 场景的回调函数使用此段代码即可。

```js
() => this.$refs.bcSetId.hide()
```

### 拓展

你也可以在主场景使用 [视角锁定某一点](../fastexample/lockTo.md) 的同时使用该组件。使用的代码如下例子：

```js
const centerAxis = [113.12143453385162, 28.256011465656002, 46];
const range = 100;
this.$refs.bcSetId.show(uniCore, centerAxis, range);
```