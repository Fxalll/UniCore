---
outline: deep
---

# 3DTiles 模型开启交互事件

## Interact 类的方法 - setTilesRightClickMenu

### 方法介绍

UniCore 内置 Interact 类，提供 setTilesRightClickMenu 方法用于开启3DTiles 模型开启交互事件，如右键菜单、点击高亮、属性property展示。

当前功能主要应用于内部研发的RVT转3DTiles及IFC转3DTiles、glTF转3DTiles程序所转出的3DTiles模型。

变量的JSDoc形式如下：

```js
/**
 * 右键菜单功能
 * @param {*} modelList 即模型的optionsList，每个list包含模型id、模型url、模型属性文件url
 * @param {*} showPropertyFunc 右键菜单回调方法
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

      let options = {
        id: '城市白膜'
      }
      //加载3dtiles
      uniCore.model.createTileset('../../assets/3Dtiles/sample3_方法2_小别墅属性(1)/tileset.json', options).then(cityLeft => {
        uniCore.model.changeModelPos(cityLeft, [113.12098820449636, 28.256150218457687, 130], [0, 0, 0], [23.8, 23.8, 23.8])

        // 开启右键菜单、点击高亮、属性property
        uniCore.interact.setTilesRightClickMenu([{
          id: '城市白膜',
          url: '../../assets/3Dtiles/sample3_方法2_小别墅属性(1)/tileset.json',
          propertysURL: '../../assets/3Dtiles/sample3_方法2_小别墅属性(1)/01 小别墅.json'
        }], (property) => console.log(property));
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

![Alt text](image-5.png)

### 关键代码

你可以通过修改 setTilesRightClickMenu 中的变量查看修改这些变量带来的效果。

在 console.log(property) 处可利用所获取的 property 编写前端属性窗口以供展示。

```js
// 开启右键菜单、点击高亮、属性property
uniCore.interact.setTilesRightClickMenu([{
  id: '城市白膜',
  url: '../../assets/3Dtiles/sample3_方法2_小别墅属性(1)/tileset.json',
  propertysURL: '../../assets/3Dtiles/sample3_方法2_小别墅属性(1)/01 小别墅.json'
}], (property) => console.log(property));
```