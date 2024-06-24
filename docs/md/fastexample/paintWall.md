---
outline: deep
---

# 绘制墙体

## Model 类的方法 - paintWall

### 方法介绍

UniCore 内置 Model 类，提供 paintWall 方法用于绘制墙体。

该方法需传入两个变量，一个是墙体id，一个是墙体坐标数组（首部与尾部）。

其他可选变量的JSDoc形式如下：

```js
  /**
   * 绘制墙体
   * @param {*} id 
   * @param {*} positions xy坐标
   * @param {*} height 坐标高
   * @param {*} wallHeight 墙体高
   * @param {*} color 
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
 * GIS引擎初始化
 */
    init () {

      // 初始化UniCore

      //  配置unicore的token
      let accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxNjEwMzI4My01MjBmLTQzYzktOGZiMS0wMDRhZjE0N2IyMGIiLCJpZCI6MTc1NzkyLCJpYXQiOjE3MTM3NzQ3OTh9.zU-R4MNvHr8rvn1v28PQfDImyutnpPF2lmEgGeSPckQ";
      // 初始化unicore
      let uniCore = new UniCore(config, accessToken);
      uniCore.init("unicoreContainer");
      window.uniCore = uniCore;
      let viewer = window.viewer;

      // 视角初始化
      uniCore.position.buildingPosition(viewer, [113.12380548015745, 28.250758831850005, 700], -20, -45, 1);

      uniCore.model.paintWall("wallID", [[113.12380548015745, 28.260758831850005], [113.12380548015745, 28.240758831850005]], 500, 100, "#e46962")
    }

  }

}
</script>

```

### 示例运行结果

![Alt text](image-12.png)

### 关键代码

你可以通过修改 paintWall 中的变量查看修改这些变量带来的效果。

```js
uniCore.model.paintWall("wallID", [[113.12380548015745, 28.260758831850005], [113.12380548015745, 28.240758831850005]], 500, 100, "#e46962")
```
