---
outline: deep
---

# 单击鼠标获取经纬度坐标

## Position 类的方法 - screen2axis

### 方法介绍

UniCore 内置 Position 类，提供 screen2axis 方法用于单击鼠标获取经纬度坐标。

该方法需提供viewer及鼠标点击事件，JSDoc如下：

```js
/**
 * 屏幕坐标转经纬度
 * @param {*} viewer 
 * @param {*} e 
 * @returns 
 */
```

不妨通过代码示例在 Vue 中尝试一下：

### 在线尝试

可以使用章节 [快速开始(在线尝试)](../faststart.md#在线尝试) 中的链接，将下文的 `代码示例` 覆盖原代码进行在线尝试。

### 在线演示

点击 [在线链接](http://192.168.4.66:8091/?id=screen2axis) 以查看在线演示。

### 代码示例

```vue
<template>
  <div id="unicoreContainer" @click="mouseClick($event)"></div>
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
      window.uniCore = uniCore;

      // 视角初始化
      uniCore.position.buildingPosition(uniCore.viewer, [113.12380548015745, 28.250758831850005, 700], -20, -45, 1);

    },

    mouseClick (e) {
      alert(window.uniCore.position.screen2axis(uniCore.viewer, e));
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

![Alt text](image-15.png)

### 关键代码

```js
uniCore.position.screen2axis(uniCore.viewer, e)
```

