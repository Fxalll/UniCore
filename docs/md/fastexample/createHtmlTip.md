---
outline: deep
---

# 将HTML元素作为标签

## Tip 类的方法 - createHtmlTip

### 方法介绍

UniCore 内置 Tip 类，提供 createHtmlTip 方法用于将 HTML 元素作为标签固定在场景中。

`注：HTML 元素需使用 id 值。`
<!-- 
值得注意的是，如果你需要使用 GIS/BIM 场景切换功能，在右键菜单切换到 BIM 场景时无法自动隐藏此类标签。因为通用图形引擎无法确认哪一种 HTML 元素需要隐藏。为了避免隐藏到页面必要的 UI 组件，在使用右键菜单切换到 GIS/BIM 场景时利用回调函数使用 Javascript 原生方法隐藏需要隐藏的 HTML 元素。见 [开启 3DTiles 模型交互事件 - 关键代码](./setTilesRightClickMenu.md#关键代码) 。 -->


该方法需传入两个变量，即id值、标签坐标。参见JSDoc形式如下：

```js
/**
 * 将HTML元素作为标签
 * @param {*} id div的ID名称
 * @param {*} axis 坐标数组
 * @param {*} isFixed 是否将元素固定 默认为True
 */
```

不妨通过代码示例在 Vue 中尝试一下：

### 在线尝试

可以使用章节 [快速开始(在线尝试)](../faststart.md#在线尝试) 中的链接，将下文的 `代码示例` 覆盖原代码进行在线尝试。

### 在线演示

点击 [在线链接](http://192.168.4.56:8091/?id=createHtmlTip) 以查看在线演示。

### 代码示例

```vue
<template>
  <div id="unicoreContainer">
    <div id="test" @click="clickFun">你可以将任意HTML元素固定在某处</div>
  </div>
</template>

<script>
import { UniCore } from 'unicore-sdk'
import { config } from 'unicore-sdk/unicore.config'
import 'unicore-sdk/Widgets/widgets.css'
import * as Cesium from 'cesium'

export default {
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

      // 将HTML元素定位在某一点上
      uniCore.tip.createHtmlTip("test", [113.12098820449636, 28.256150218457687, 50],false)



    },

    /**
     * test标签的点击事件
     */
    clickFun () {
      let r = parseInt(Math.random() * 255);
      let g = parseInt(Math.random() * 255);
      let b = parseInt(Math.random() * 255);
      let mixNum = 0.2;
      const testStyle = document.querySelector('#test').style;
      testStyle.color = `rgb(${r}, ${g},${b})`
      testStyle.backgroundColor = `rgb(${r * mixNum}, ${g * mixNum},${b * mixNum})`
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
#test {
  position: absolute;
  font-size: 20px;
  background: #fff;
  border-radius: 15px;
  padding: 5px 20px;
  cursor: pointer;
  user-select: none;
  z-index: 999;
}
</style>

```

### 示例运行结果

点击 HTML 标签，将执行随机显示颜色的方法。
![Alt text](image-26.png)

### 关键代码

你可以通过修改 createTip 中的变量查看修改这些变量带来的效果。

```js
// 将HTML元素定位在某一点上
uniCore.tip.createHtmlTip("test", [113.12098820449636, 28.256150218457687, 50], false)
```

### 拓展

以下列举其他类型的例子，你可以自行尝试。

#### 图片
你可以将图片等其他 HTML 元素固定在场景中，如图。

![Alt text](image-30.png)

#### 组件

你甚至可以将组件固定在场景中，以 [模型加载进度条组件](../fastcomponents/loadModelInfo.md) 为例。

##### 代码示例

```js
<template>
  <div id="unicoreContainer">
    <div id="lmInfoID">
      <!-- 模型加载组件窗口卡片开始 -->
      <lmInfo ref="lmInfoId"></lmInfo>
      <!-- 模型加载组件窗口卡片结束 -->
    </div>
  </div>
</template>

<script>
import { UniCore } from 'unicore-sdk'
import { config } from 'unicore-sdk/unicore.config'
import 'unicore-sdk/Widgets/widgets.css'
import lmInfo from '@/components/loadModelInfo/index'; //模型加载组件

export default {
  components: {
    lmInfo
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


      let options = {
        id: '小别墅',
        url: '../../assets/3Dtiles/sample3_方法2_小别墅属性(1)/tileset.json'
      }
      //加载3dtiles
      uniCore.model.createTileset(options.url, options, () => {
        // 开始触发加载进度条
        this.$refs.lmInfoId.loadName = "小别墅";
        this.$refs.lmInfoId.setLoadNum();
      }).then(cityLeft => {
        uniCore.model.changeModelPos(cityLeft, [113.12098820449636, 28.256150218457687, 130], [0, 0, 0], [23.8, 23.8, 23.8])
        this.$refs.lmInfoId.setNewData('第二个模型');
        // 将HTML元素定位在某一点上
        uniCore.tip.createHtmlTip("lmInfoID", [113.12098820449636, 28.256150218457687, 130])
      })

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
#lmInfoID {
  position: absolute;
  z-index: 999;
}
</style>
```

##### 效果展示

![Alt text](image-27.png)

![Alt text](image-28.png)

![Alt text](image-29.png)

### 停用方法

你可以使用 `window.viewer.scene.preRender` 查看其中的 `_listeners`，如果你将该参数清空，则可以清除监听事件。HTML 元素将不再固定在场景中。

```js
window.viewer.scene.preRender._listeners = [];
```