---
outline: deep
---

# 按给定路径漫游

## Tour 类的方法 - startTweensTour

### 方法介绍

UniCore 内置 Tour 类，提供 startTweensTour 方法用于开启按给定路径漫游功能。

你可以配合 [路径漫游控制组件](../fastcomponents/CreateTourSet.md) 来使用该功能。

该方法需传入参数，参数格式示例如下：

```js
const viewPoints = [
  {
    // id值（非必须）
    id: 0,
    // name名称（非必须）
    name: "小别墅边",
    // 目标经度
    lon: 113.12070458505828, 
    // 目标纬度
    lat: 28.255870346084727, 
    // 目标高程
    het: 59.16259222422615, 
    // 目标heading
    heading: 0.6386749807117074, 
    // 目标pitch
    pitch: -0.1617832069985936, 
    // 移动动画时间
    duration: 0
  }
]
```

变量的JSDoc形式如下：

```js
/**
 * 开启动画插值漫游
 * @param {*} viewPoints 
 */
```

不妨通过代码示例在 Vue 中尝试一下（相关模型文件在本章 [阅前提醒](./whatisit.md) 中的内网Git链接中可获取）：

### 在线演示

点击 [在线链接](http://192.168.4.56:8091/?id=startTweensTour) 以查看在线演示。

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
      uniCore.position.buildingPosition(uniCore.viewer, [113.12198820449636, 28.254150218457687, 300], -20, -45, 1);


      // 模型示例1
      let options = {
        id: '小别墅'
      }
      //加载3dtiles
      uniCore.model.createTileset('../../assets/3Dtiles/sample3_方法2_小别墅属性(1)/tileset.json', options).then(cityLeft => {
        uniCore.model.changeModelPos(cityLeft, [113.12098820449636, 28.256150218457687, 50])
      })



      const viewPoints = [
        {
          id: 0, name: "小别墅边", lon: 113.12070458505828, lat: 28.255870346084727, het: 59.16259222422615, heading: 0.6386749807117074, pitch: -0.1617832069985936, duration: 0
        },
        {
          id: 1, name: "小别墅外", lon: 113.1210608168098, lat: 28.25542377233109, het: 72.79499359025445, heading: 6.145402847334479, pitch: -0.18127134988192473, duration: 5
        },
        {
          id: 2, name: "小别墅楼梯间", lon: 113.120961813896, lat: 28.256206854277405, het: 51.07297361584761, heading: 0.38183529708669717, pitch: 0.049221426052290296, duration: 5
        },
        {
          id: 3, name: "小别墅边", lon: 113.12070458505828, lat: 28.255870346084727, het: 59.16259222422615, heading: 0.6386749807117074, pitch: -0.1617832069985936, duration: 3
        }
      ]

      setTimeout(() => {
        uniCore.tour.startTweensTour(viewPoints)
      }, 4000)

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

### 关键代码

你可以通过修改 viewPoints 中的值查看修改这些变量带来的效果。

```js
const viewPoints = [
  {
    id: 0, name: "小别墅边", lon: 113.12070458505828, lat: 28.255870346084727, het: 59.16259222422615, heading: 0.6386749807117074, pitch: -0.1617832069985936, duration: 0
  },
  {
    id: 1, name: "小别墅外", lon: 113.1210608168098, lat: 28.25542377233109, het: 72.79499359025445, heading: 6.145402847334479, pitch: -0.18127134988192473, duration: 5
  },
  {
    id: 2, name: "小别墅楼梯间", lon: 113.120961813896, lat: 28.256206854277405, het: 51.07297361584761, heading: 0.38183529708669717, pitch: 0.049221426052290296, duration: 5
  },
  {
    id: 3, name: "小别墅边", lon: 113.12070458505828, lat: 28.255870346084727, het: 59.16259222422615, heading: 0.6386749807117074, pitch: -0.1617832069985936, duration: 3
  }
]

setTimeout(() => {
  uniCore.tour.startTweensTour(viewPoints)
}, 4000)
```

### 拓展

使用 stopTweensTour 方法可以停止路径漫游。

```js
uniCore.tour.stopTweensTour();
```

使用 getCurrentCameraSet 方法可以获取当前场景摄像机的各项参数，你可以使用获取到的数值填充 viewPoints。

```js
uniCore.position.getCurrentCameraSet();
```