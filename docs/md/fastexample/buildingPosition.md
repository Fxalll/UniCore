---
outline: deep
---

# 定位到某个经纬度坐标

## Position 类的方法 - buildingPosition

### 方法介绍

UniCore 内置 Position 类，提供 buildingPosition 方法用于定位到某个经纬度坐标上。该方法必须传入 viewer 对象及所需定位的经纬度+高度的坐标数组，前者可使用 UniCore 对外暴露的变量 uniCore.viewer ，后者为 [ 经度 , 维度 , 高度 ] 的数组形式如 `[113.12380548015745, 28.250758831850005, 700]`。

此外，buildingPosition 方法还提供 heading、pitch、duration 三类可选变量，前两个变量控制摄像机俯仰角，第三个变量控制动画时间（即移动摄像机所需时间）。

值得注意的是，UniCore 还提供另一种方法直接定位到模型上，见 [飞行定位到模型](../fasttool/zoomTo.md)。

变量的JSDoc形式如下：

```js
/**
 * 飞行定位
 * @param {*} viewer 视图
 * @param {*} arr 经纬高程坐标
 * @param {*} heading 方向
 * @param {*} pitch 倾斜角度
 * @param {*} duration 动画时间
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

![Alt text](image.png)

### 关键代码

你可以通过修改 buildingPosition 中的变量查看修改这些变量带来的效果。

```js
// 视角初始化
uniCore.position.buildingPosition(uniCore.viewer, [113.12380548015745, 28.250758831850005, 700], -20, -45, 1);
```
