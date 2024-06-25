---
outline: deep
---

# 模型压平

## Flat 类的方法 - flat

### 方法介绍

UniCore 内置 Flat 类，提供 init / addRegion 方法用于模型压平。

init 方法需传入两个变量，即 tileset 模型、 opt 参数（需要包含 flatHeight），JSDoc形式如下：

```js
/**
 * 初始化
 * @param {Cesium.Cesium3DTileset} tileset 三维模型
 * @param {Object} opt 
 * @param {Number} opt.flatHeight 压平高度 
 */
```

addRegion 方法需要传入一个 attr 参数，需包含 positions、height、id，JSDoc形式如下：

```js
/**
 * 添加压平面
 * @param {Object} attr 参数
 * @param {Cesium.Cartesian3[]} attr.positions 压平面坐标
 * @param {Number} attr.height 压平深度，当前不支持单独设置
 * @param {Number} attr.id 唯一标识
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
      let viewer = window.viewer;

      // 视角初始化
      uniCore.position.buildingPosition(viewer, [113.12380548015745, 28.250758831850005, 700], -20, -45, 1);

      /**
       * 小别墅1号示例
       */
      let options = {
        id: '小别墅1号示例',
        url: '../../assets/3Dtiles/sample3_方法2_小别墅属性(1)/tileset.json',
        propertysURL: '../../assets/3Dtiles/sample3_方法2_小别墅属性(1)/01 小别墅.json'
      }
      //加载3dtiles
      uniCore.model.createTileset(options.url, options).then(cityLeft => {
        uniCore.model.changeModelPos(cityLeft, [113.12098820449636, 28.256150218457687, 130], [0, 0, 0], [23.8, 23.8, 23.8])

        uniCore.flat.init(cityLeft, {
          flatHeight: -50
        })
        let positions = [
          uniCore.position.axis2cartesian3([113.13541705128938, 28.259461504616047, 0]),
          uniCore.position.axis2cartesian3([113.10809430954443, 28.259684588881398, 0]),
          uniCore.position.axis2cartesian3([113.10814275877508, 28.25013870333492, 0]),
          uniCore.position.axis2cartesian3([113.13643819418477, 28.250298392202364, 0])
        ]

        uniCore.flat.addRegion({
          positions: positions,
          id: new Date().getTime()
        })

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
}
</style>

```

### 示例运行结果

压平前：

![Alt text](image-16.png)

压平后：

![Alt text](image-17.png)

### 关键代码

你可以通过修改 positions 等变量查看修改这些变量带来的效果。

```js
uniCore.flat.init(cityLeft, {
  flatHeight: -50
})
let positions = [
  uniCore.position.axis2cartesian3([113.13541705128938, 28.259461504616047, 0]),
  uniCore.position.axis2cartesian3([113.10809430954443, 28.259684588881398, 0]),
  uniCore.position.axis2cartesian3([113.10814275877508, 28.25013870333492, 0]),
  uniCore.position.axis2cartesian3([113.13643819418477, 28.250298392202364, 0])
]

uniCore.flat.addRegion({
  positions: positions,
  id: new Date().getTime()
})
```

### 其他模型格式测试：glTF模型

#### 代码示例

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
      let viewer = window.viewer;

      // 视角初始化
      uniCore.position.buildingPosition(viewer, [113.12380548015745, 28.250758831850005, 700], -20, -45, 1);

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
        uniCore.model.changeModelPos(cityModel, [113.12098820449636, 28.256150218457687, 50], [90, 0, 0])

        cityModel.readyEvent.addEventListener(() => {
          uniCore.flat.init(cityModel, {
            flatHeight: -50
          })
          let positions = [
            uniCore.position.axis2cartesian3([113.13541705128938, 28.259461504616047, 0]),
            uniCore.position.axis2cartesian3([113.10809430954443, 28.259684588881398, 0]),
            uniCore.position.axis2cartesian3([113.10814275877508, 28.25013870333492, 0]),
            uniCore.position.axis2cartesian3([113.13643819418477, 28.250298392202364, 0])
          ]

          uniCore.flat.addRegion({
            positions: positions,
            id: new Date().getTime()
          })

          uniCore.model.depthTestAgainstTerrain(false);

        })

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
}
</style>
```

#### 示例运行结果

压平前：

![Alt text](image-18.png)

压平后：

![Alt text](image-19.png)