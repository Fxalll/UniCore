---
outline: deep
---

# 修改模型位置

## Model 类的方法 - changeModelPos

### 方法介绍

UniCore 内置 Model 类，提供 changeModelPos 方法用于修改模型位置。

该方法需传入两个变量，一个为模型的 tileset 对象，另一个为模型需要改变的经纬高程坐标数组。

除此以外，changeModelPos 方法还接受 hprs、scales、offsets 可选变量，分别控制俯仰旋转翻转角、三维缩放数值、三维偏移值。

如果 changeModelPos 方法使用后仍找不到模型，你可以使用 UniCore 提供的另一种方法直接定位到模型上，见 [飞行定位到模型](../fasttool/zoomTo.md) 进行调试。如果是 3DTiles 模型，还可以使用下一节 [修改 3DTiles 模型位置](./change3DTilesPos.md) 进行尝试。 

变量的JSDoc形式如下：

```js
 /**
  * 修改模型形态
  * @param {*} model 使用添加模型方法后返回的模型tileset类
  * @param {*} axis 经纬高度
  * @param {*} hprs 俯仰旋转翻转角
  * @param {*} scales 三维缩放数值
  * @param {*} offsets 三维偏移量
  */
```

不妨通过代码示例在 Vue 中尝试一下（相关模型文件在本章 [阅前提醒](./whatisit.md) 中的内网Git链接中可获取）：

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
      uniCore.position.buildingPosition(uniCore.viewer, [113.12380548015745, 28.250758831850005, 700], -20, -45, 1);

      let options = {
        id: '城市白膜'
      }
      //加载3dtiles
      uniCore.model.createTileset('../../../assets/3Dtiles/changshaCityModel/tileset.json', options).then(cityLeft => {
        uniCore.model.changeModelPos(cityLeft, [113.12098820449636, 28.256150218457687, 50], [0, 0, -90], [23.8, 23.8, 23.8])
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
}
</style>

```

### 关键代码

你可以通过修改 changeModelPos 中的变量查看修改这些变量带来的效果。

```js
uniCore.model.changeModelPos(cityLeft, [113.12098820449636, 28.256150218457687, 50], [0, 0, -90], [23.8, 23.8, 23.8])
```
