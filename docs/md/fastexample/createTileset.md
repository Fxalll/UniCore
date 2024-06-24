---
outline: deep
---

# 根据 URL 加载 3DTiles 模型

## Model 类的方法 - createTileset

### 方法介绍

UniCore 内置 Model 类，提供 createTileset 方法用于加载 3DTiles 模型文件。该方法必须传入 url 变量及 options 配置变量。

url变量即传入模型文件tileset.json的url位置，options 配置变量可配置的参数较多，本节将options详细参数放置在本节中的拓展小节中，最基本的配置参数如：

```js
let options = {
  id: '城市白膜'
}
```

变量的JSDoc形式如下：

```js
/**
 * 异步添加3dTiles模型（新
 * @param {*} url 
 * @param {*} options 
 * @returns 
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
 * GIS引擎初始化
 */
    init () {

      // 初始化UniCore

      //  配置unicore的token
      let accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxNjEwMzI4My01MjBmLTQzYzktOGZiMS0wMDRhZjE0N2IyMGIiLCJpZCI6MTc1NzkyLCJpYXQiOjE3MTM3NzQ3OTh9.zU-R4MNvHr8rvn1v28PQfDImyutnpPF2lmEgGeSPckQ";
      // 初始化unicore
      let uniCore = new UniCore(config, accessToken);
      uniCore.init("unicoreContainer");
      window.uniCore = uniCore;
      let viewer = window.viewer;

      // 视角初始化
      uniCore.position.buildingPosition(viewer, [113.12380548015745, 28.250758831850005, 700], -20, -45, 1);

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

```

### 示例运行结果

![Alt text](image-2.png)

### 关键代码

```js
let options = {
  id: '城市白膜'
}
//加载3dtiles
uniCore.model.createTileset('../../../assets/3DtileschangshaCityModel/tileset.json', options).then(cityLeft => {
  uniCore.model.changeModelPos(cityLeft, [113.12098820449636, 28.256150218457687, 50], [0, 0, -90], [23.8, 23.8, 23.8])
})
```

### 拓展

关于options的配置，以下可列举作为参考（键名对应可选变量，值对应默认值）：

```js
id: undefined,
name: undefined,
url: url, // 默认为3dtiles模型url
lumimanceAtZenith: 0.2,
lightColor: new Cesium.Cartesian3(0.3, 0.3, 0.3),
modelMatrix: undefined,
scale: 1,
shadow: true,
skipLevelOfDetail: true, // 跳过细节级别
skipLevels: 1, // 跳过的级别数
maximumMemoryUsage: 1024 * 1024 * 1024, // 设置3D Tiles的最大内存使用量
baseScreenSpaceError: 2048, // 基础屏幕空间误差
maximumScreenSpaceError: 32, // 最大屏幕空间误差
skipScreenSpaceErrorFactor: 16, // 跳过屏幕空间误差因子
immediatelyLoadDesiredLevelOfDetail: false, // 是否立即加载所需的细节级别
loadSiblings: true, // 是否加载相邻的瓦片
cullWithChildrenBounds: true, // 是否使用子瓦片边界进行剔除
dynamicScreenSpaceError: true, // 是否启用动态屏幕空间误差
dynamicScreenSpaceErrorDensity: 0.00278, // 动态屏幕空间误差密度
dynamicScreenSpaceErrorFactor: 4.0, // 动态屏幕空间误差因子
dynamicScreenSpaceErrorHeightFalloff: 0.25, // 动态屏幕空间误差高度衰减
preloadWhenHidden: false, // 隐藏时是否预加载
cullRequestsWhileMoving: true, // 移动时是否进行剔除请求
cullRequestsWhileMovingMultiplier: 60, // 剔除请求的乘数，值越小能够更快的剔除
cacheBytes: 128, // 缓存字节数
```

### 旧版兼容方法

加载 3DTiles 模型本地文件这一功能存在旧有方法，即 add3DTiles 。该方法需传入两个对象，一组为经度、维度、高度组成的对象，一组为属性组成的对象。

结构类似下面代码块：

```js
  function add3DTiles ({
    lon,
    lat,
    height
  }, {
    id,
    name,
    url,
    scale,
    property,
    posdifferent,
    rotate,
    isfixrotate
  })
```