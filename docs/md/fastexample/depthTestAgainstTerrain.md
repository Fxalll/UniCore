---
outline: deep
---

# 关闭深度检测

## Model 类的方法 - depthTestAgainstTerrain

### 方法介绍

UniCore 内置 Model 类，提供 depthTestAgainstTerrain 方法用于开启或关闭深度检测功能。

该方法需传入一个布尔值。

变量的JSDoc形式如下：

```js
/**
 * 深度检测开关
 * @param {*} bool 
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

      uniCore.model.addGltf({
        lon: 0,
        lat: 0,
        height: 0
      }, {
        id: "城市白膜",
        name: null,
        url: '../../../assets/gltf/长沙项目项目周边模型.glb',
        scale: 6.8,
        property: null
      }).then(cityModel => {
        uniCore.model.changeModelPos(cityModel, [113.12098820449636, 28.256150218457687, 20], [90, 0, 0]);

        uniCore.model.depthTestAgainstTerrain(false);
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

### 示例运行结果

关闭前：

![Alt text](image-7.png)

关闭后（模型不再被地形遮挡）：

![Alt text](image-8.png)


### 关键代码

你可以通过修改 depthTestAgainstTerrain 中的布尔值查看修改这些变量带来的效果。

```js
uniCore.model.depthTestAgainstTerrain(true);
```
