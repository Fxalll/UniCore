---
outline: deep
---

# 地形挖地（新）

## TerrainClip 类的方法 - createTerrainClip

### 方法介绍

UniCore 内置 Model 类，提供 createTerrainClip 方法用于开启地形挖地。

该方法需先使用 init 方法初始化，随后使用 createTerrainClip 进行挖地。

`注： createTerrainClip 所需的坐标数组 earthPositionList 需要按逆时针的顺序填入。`

init 方法的JSDoc形式如下：

```js
/**
 * 地形挖地初始化
 * @param {*} viewer 
 * @param {*} options 
 */
```

createTerrainClip 方法的JSDoc形式如下：
```js
/**
 * 地形挖地
 * @param {*} earthPositionList 坐标
 */
```


不妨通过代码示例在 Vue 中尝试一下（相关模型文件在本章 [阅前提醒](./whatisit.md) 中的内网Git链接中可获取）：

### 在线尝试

可以使用章节 [快速开始(在线尝试)](../faststart.md#在线尝试) 中的链接，将下文的 `代码示例` 覆盖原代码进行在线尝试。

### 在线演示

点击 [在线链接](http://192.168.4.56:8091/?id=terrainClip) 以查看在线演示。

### 代码示例

```vue
<template>
  <div id="unicoreContainer"></div>
</template>

<script>
import { UniCore } from 'unicore-sdk'
import { config } from 'unicore-sdk/unicore.config'
import 'unicore-sdk/Widgets/widgets.css'



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
      uniCore.position.buildingPosition(uniCore.viewer, [113.33725358682781, 28.631879047649946, 1700], -20, -45, 1);

      let earthPositionList = [
        uniCore.position.axis2cartesian3([113.3344684928246, 28.651326795339365, 172.87746956986445]),
        uniCore.position.axis2cartesian3([113.32630694203719, 28.648432900572512, 323.33026536760207]),
        uniCore.position.axis2cartesian3([113.32534692375877, 28.641073331311016, 215.12468698546806]),
        uniCore.position.axis2cartesian3([113.33192954275, 28.639634525064086, 222.32523043801942]),
        uniCore.position.axis2cartesian3([113.33780681708383, 28.642851075420573, 151.94046698273897]),
      ]
      uniCore.terrainClip.init(uniCore.viewer, {
        height: 100,
        splitNum: 1000,
        bottomImg: '../../assets/img/side.jpeg',
        wallImg: '../../assets/img/side2.jpeg'
      })
      uniCore.terrainClip.createTerrainClip(earthPositionList)

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

### 示例运行效果

![Alt text](image-20.png)

### 关键代码

你可以通过修改 init 中的属性值查看修改这些变量带来的效果。

```js
let earthPositionList = [
        uniCore.position.axis2cartesian3([113.3344684928246, 28.651326795339365, 172.87746956986445]),
        uniCore.position.axis2cartesian3([113.32630694203719, 28.648432900572512, 323.33026536760207]),
        uniCore.position.axis2cartesian3([113.32534692375877, 28.641073331311016, 215.12468698546806]),
        uniCore.position.axis2cartesian3([113.33192954275, 28.639634525064086, 222.32523043801942]),
        uniCore.position.axis2cartesian3([113.33780681708383, 28.642851075420573, 151.94046698273897]),
]
uniCore.terrainClip.init(uniCore.viewer, {
  height: 170,
  splitNum: 1000,
  bottomImg: '../../assets/img/side.jpeg',
  wallImg: '../../assets/img/side2.jpeg'
})
uniCore.terrainClip.createTerrainClip(earthPositionList)
```

### 拓展

你可以使用 clear 方法删除挖地效果：

```js
uniCore.terrainClip.clear()
```