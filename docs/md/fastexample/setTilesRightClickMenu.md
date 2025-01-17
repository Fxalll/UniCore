---
outline: deep
---

# 开启 3DTiles 模型交互事件

## Interact 类的方法 - setTilesRightClickMenu

### 方法介绍

UniCore 内置 Interact 类，提供 setTilesRightClickMenu 方法用于开启 3DTiles 模型开启交互事件，如右键菜单、点击高亮、属性property展示、GIS/BIM 场景切换。

建议同时使用组件 [BIM 场景视图盒子组件](../fastcomponents/BimCubeSet.md) 以更好地控制视角与摄像机。

`当前功能主要应用于内部研发的RVT转3DTiles及IFC转3DTiles、glTF转3DTiles程序所转出的3DTiles模型`

变量的JSDoc形式如下：

```js
/**
 * 3DTiles 右键菜单功能
 * @param {*} modelList 
 * @param {*} showPropertyFunc 右键菜单查看属性回调方法 默认为null
 * @param {*} showFunc 右键菜单即触发回调方法 默认为null
 * @param {*} switchBIMFunc 切换到BIM场景时触发回调方法 默认为null
 * @param {*} switchGISFunc 切换到GIS场景时触发回调方法 默认为null
 * @param {*} leftClickFunc 左键点击事件 默认为null
 * @param {*} ignoreItem 定制右键菜单
 */
```

不妨通过代码示例在 Vue 中尝试一下（相关模型文件在本章 [阅前提醒](./whatisit.md) 中的内网Git链接中可获取）：

### 在线演示

点击 [在线链接](http://192.168.4.56:8091/?id=setTilesRightClickMenu) 以查看在线演示。

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
      }], (property) => console.log(property), (pickObj) => console.log(`右键获取该构件: ${pickObj}`), (pickObj) => console.log(`已切换至BIM场景: ${pickObj}`), (pickObj) => console.log(`已切换至GIS场景: ${pickObj}`));

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

![Alt text](image-33.png)

![Alt text](image-34.png)

### 关键代码

你可以通过修改 setTilesRightClickMenu 中的变量查看修改这些变量带来的效果。

在 ``(property) => console.log(property)`` 处可利用所获取的 property 编写前端属性窗口以供展示。

在 ``(pickObj) => console.log(`右键获取该构件: ${pickObj}`)`` 处可获取使用右键时点击到的对应构件。

在 ``(pickObj) => console.log(`已切换至BIM场景: ${pickObj}`)`` 处可编写切换到 BIM 场景时所需执行的函数。

在 ``(pickObj) => console.log(`已切换至GIS场景: ${pickObj}`)`` 处可编写切换到 GIS 场景时所需执行的函数。

```js
// 开启右键菜单、点击高亮、属性property
uniCore.interact.setTilesRightClickMenu([{
  id: '小别墅',
  url: '../../assets/3Dtiles/sample3_方法2_小别墅属性(1)/tileset.json',
  propertysURL: '../../assets/3Dtiles/sample3_方法2_小别墅属性(1)/01 小别墅.json'
}, {
  id: '小别墅2',
  url: '../../assets/3Dtiles/sample3_方法2_小别墅属性(1)/tileset.json',
  propertysURL: '../../assets/3Dtiles/sample3_方法2_小别墅属性(1)/01 小别墅.json'
}], (property) => console.log(property), (pickObj) => console.log(`右键获取该构件: ${pickObj}`), (pickObj) => console.log(`已切换至BIM场景: ${pickObj}`), (pickObj) => console.log(`已切换至GIS场景: ${pickObj}`));
```

### 拓展

你可以使用 [模型属性窗口组件](../fastcomponents/modelPropertyInfo.md) 快速创建一个模型窗口。

#### 定制右键菜单

你可以使用 ignoreItem 定制右键菜单。假如你要隐藏“构件删除”这一项，可以如下编辑代码：
```js
uniCore.interact.setTilesRightClickMenu(
  [...],
  (property) => console.log(property),
  (pickObj) => console.log(`右键获取该构件: ${pickObj}`),
  (pickObj) => console.log(`已切换至BIM场景: ${pickObj}`), 
  (pickObj) => console.log(`已切换至GIS场景: ${pickObj}`),
  (pickObj) => console.log(`左键获取该构件: ${pickObj}`),
  ['构件删除']
  );
```

目前可定制的选项除了构件删除，还有构件属性、构件隔离、场景还原、切换至 GIS 场景。