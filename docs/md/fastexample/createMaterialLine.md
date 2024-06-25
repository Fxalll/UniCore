---
outline: deep
---

# 创建动态线条

## Model 类的方法 - createMaterialLine

### 方法介绍

UniCore 内置 Model 类，提供 createMaterialLine 方法用于创建动态线条。

该方法需传入两个变量，即线条起始点的两个坐标数组。


变量的JSDoc形式如下：

```js
  /**
   * 创建动态水流线条
   * @param {*} startAxis 起始坐标
   * @param {*} endAxis 终止坐标
   */
```

不妨通过代码示例在 Vue 中尝试一下：

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

      uniCore.model.createMaterialLine([113.12123548015745, 28.255978831850005, 50], [113.12123548015745, 28.245978831850005, 80])
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

![Alt text](image-10.png)

### 关键代码

你可以通过修改 createMaterialLine 中的变量查看修改这些变量带来的效果。

```js
uniCore.model.createMaterialLine([113.12123548015745, 28.255978831850005, 50], [113.12123548015745, 28.245978831850005, 80])
```
