---
outline: deep
---

# 模型显隐功能

## Model 类的方法 - setPrimitivesShow

### 方法介绍

UniCore 内置 Model 类，提供 setPrimitivesShow 方法用于模型显隐功能。

该方法需传入一个或一组想显示的构件ID。

其他可选变量的JSDoc形式如下：

```js
/**
 * 设置构件显隐
 * @param {*} primitiveName 需要设置的构件名称
 * @param {*} bool 设置的构件是否隐藏，默认false
 * @param {*} otherbool id为null的构件是否隐藏，使用该参数默认true以保证工具栏显隐正常使用
 * @param {*} ignore 需要忽略的构件名称
 */
```

不妨通过代码示例在 Vue 中尝试一下（相关模型文件在本章 [阅前提醒](./whatisit.md) 中的内网Git链接中可获取）：

### 在线演示

点击 [在线链接](http://192.168.4.56:8091/?id=setPrimitivesShow) 以查看在线演示。

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

      // 模型示例1
      let options = {
        id: '城市白膜',
        url: '../../../assets/3Dtiles/changshaCityModel/tileset.json'
      }
      //加载3dtiles
      uniCore.model.createTileset(options.url, options).then(cityLeft => {
        uniCore.model.changeModelPos(cityLeft, [113.12098820449636, 28.256150218457687, 50], [0, 0, -90], [23.8, 23.8, 23.8])
      })

      // 模型示例2
      options = {
        id: '城市白膜2',
        url: '../../../assets/3Dtiles/changshaCityModel/tileset.json'
      }
      //加载3dtiles
      uniCore.model.createTileset(options.url, options).then(cityLeft => {
        uniCore.model.changeModelPos(cityLeft, [113.12098820449636, 28.262150218457687, 50], [0, 0, -90], [23.8, 23.8, 23.8])
      })

      setTimeout(() => {
        uniCore.model.setPrimitivesShow('城市白膜2')
      }, 5000)


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

你可以通过修改 setPrimitivesShow 中的布尔值查看修改这些变量带来的效果。

```js
uniCore.model.setPrimitivesShow('城市白膜2')
```

可传入数组，如

```js
uniCore.model.setPrimitivesShow(['城市白膜', '城市白膜2'])
```

#### 结合地形挖地可能出现的问题

如果在使用本功能时会导致地形挖地也被连带隐藏了，可以加入 ignore 参数 ['地形挖地底面', '地形挖地墙体'] 规避：

```js
uniCore.model.setPrimitivesShow(['城市白膜', '城市白膜2'], false, true, ['地形挖地底面', '地形挖地墙体'])
```