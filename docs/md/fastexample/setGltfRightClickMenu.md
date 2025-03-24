---
outline: deep
---

# 开启 3DTiles 模型交互事件

## Interact 类的方法 - setGltfRightClickMenu

### 方法介绍

UniCore 内置 Interact 类，提供 setGltfRightClickMenu 方法用于开启 glTF 模型开启交互事件，如右键菜单、点击高亮、属性property展示、GIS/BIM 场景切换。

建议同时使用组件 [BIM 场景视图盒子组件](../fastcomponents/BimCubeSet.md) 以更好地控制视角与摄像机。

`当前功能主要应用于内部研发的IFC转glTF模型`

变量的JSDoc形式如下：

```js
/**
 * 右键菜单功能
 * @param {*} showPropertyFunc 右键菜单回调方法 默认为null
 * @param {*} switchBIMFunc 切换到BIM场景时触发回调方法 默认为null
 * @param {*} switchGISFunc 切换到GIS场景时触发回调方法 默认为null
 */
```

不妨通过代码示例在 Vue 中尝试一下（相关模型文件在本章 [阅前提醒](./whatisit.md) 中的内网Git链接中可获取）：

### 在线演示

点击 [在线链接](http://192.168.4.66:8091/?id=setGltfRightClickMenu) 以查看在线演示。

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
        id: "小别墅",
        name: null,
        url: '../../../assets/gltf/小别墅.glb',
        scale: 1.0,
        property: null
      }).then(cityModel => {
        uniCore.model.changeModelPos(cityModel, [113.12098820449636, 28.256150218457687, 50], [90, 0, 0])
      })

      // 开启右键交互
      uniCore.interact.setGltfRightClickMenu((property) => console.log(property));


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

![Alt text](image-58.png)

![Alt text](image-59.png)

### 关键代码

你可以通过修改 setGltfRightClickMenu 中的变量查看修改这些变量带来的效果。

在 ``(property) => console.log(property)`` 处可利用所获取的 property 编写前端属性窗口以供展示。

在 ``(pickObj) => console.log(`右键获取该构件: ${pickObj}`)`` 处可获取使用右键时点击到的对应构件。

在 ``(pickObj) => console.log(`已切换至BIM场景: ${pickObj}`)`` 处可编写切换到 BIM 场景时所需执行的函数。

在 ``(pickObj) => console.log(`已切换至GIS场景: ${pickObj}`)`` 处可编写切换到 GIS 场景时所需执行的函数。

```js
// 开启右键菜单、点击高亮、属性property
uniCore.interact.setGltfRightClickMenu((property) => console.log(property), (pickObj) => console.log(`右键获取该构件: ${pickObj}`), (pickObj) => console.log(`已切换至BIM场景: ${pickObj}`), (pickObj) => console.log(`已切换至GIS场景: ${pickObj}`));
```

### 拓展

你可以使用 [模型属性窗口组件](../fastcomponents/modelPropertyInfo.md) 快速创建一个模型窗口。