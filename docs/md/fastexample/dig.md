---
outline: deep
---

# 地形挖地（旧）

## Model 类的方法 - dig

### 方法介绍

该方法已弃用，新方法见 [地形挖地（新）](./terrainClip.md) 。

UniCore 内置 Model 类，提供 dig 方法用于创建一个标签。

该方法需传入两个变量，即挖地坐标、挖地尺寸坐标，JSDoc形式如下：

```js
/**
 * 挖地
 * @param {*} axis 挖地坐标
 * @param {*} size 挖地尺寸（需构造挖地尺寸坐标为长方形类坐标如[-20, -20, -185, -185]，否则贴图效果可能会出现问题，后续将优化功能）
 */
```


不妨通过代码示例在 Vue 中尝试一下（相关模型文件在本章 [阅前提醒](./whatisit.md) 中的内网Git链接中可获取）：

### 在线尝试

可以使用章节 [快速开始(在线尝试)](../faststart.md#在线尝试) 中的链接，将下文的 `代码示例` 覆盖原代码进行在线尝试。

### 在线演示

点击 [在线链接](http://192.168.4.66:8091/?id=dig) 以查看在线演示。

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

      uniCore.model.dig([113.12123548015745, 28.255978831850005, 20], [-20, -20, -185, -185])
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

![Alt text](image-9.png)

### 关键代码

你可以通过修改 dig 中的变量查看修改这些变量带来的效果。

```js
uniCore.model.dig([113.12123548015745, 28.255978831850005, 20], [-20, -20, -185, -185])
```
