---
outline: deep
---

# 根据坐标创建一个标签

## Tip 类的方法 - createTip

### 方法介绍

UniCore 内置 Tip 类，提供 createTip 方法用于创建一个标签。

该方法需传入三个变量，即id值、标签内容、标签坐标。可选变量参见JSDoc形式如下：

```js
/**
 * 创建模型标签Tip
 * @param {*} id id值
 * @param {*} text 标签内容
 * @param {*} axis 标签坐标
 * @param {*} callback 标签点击回调事件
 * @param {*} color 标签颜色
 * @param {*} alpha 标签透明度
 * @param {*} scale 标签scaleByDistance参数，eg:[250, 1.0, 550, 0.0]
 * @param {*} translucency 标签translucencyByDistance参数，eg:[250000, 1.0, 5500000, 0.0]
 */
```

不妨通过代码示例在 Vue 中尝试一下（相关模型文件在本章 [阅前提醒](./whatisit.md) 中的内网Git链接中可获取）：

### 在线尝试

可以使用章节 [快速开始(在线尝试)](../faststart.md#在线尝试) 中的链接，将下文的 `代码示例` 覆盖原代码进行在线尝试。

### 在线演示

点击 [在线链接](http://192.168.4.56:8091/?id=createTip) 以查看在线演示。

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

      // 加入普通标签
      uniCore.tip.createTip('标签组', "普通标签", [113.12380548015745, 28.255758831850005, 100], null, '#0361f3', 1, [250, 1.0, 550, 1.0], [250000, 1.0, 5500000, 0.0])

      // 加入带有点击事件的标签
      uniCore.tip.createTip('标签组', "可点击标签-1", [113.12390548015745, 28.255568831850005, 100], () => { alert("你点击了 可点击标签-1") }, '#f3125f', 1, [250, 1.0, 550, 1.0], [250000, 1.0, 5500000, 0.0])
      uniCore.tip.createTip('标签组', "可点击标签-2", [113.12374548015745, 28.256758831850005, 100], () => { alert("可点击标签-2 被你点击到了~") }, '#f3125f', 1, [250, 1.0, 550, 1.0], [250000, 1.0, 5500000, 0.0])
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

点击 可点击标签-1
![Alt text](image-21.png)

点击 可点击标签-2
![Alt text](image-22.png)

### 关键代码

你可以通过修改 createTip 中的变量查看修改这些变量带来的效果。

```js
// 加入普通标签
uniCore.tip.createTip('标签组', "普通标签", [113.12380548015745, 28.255758831850005, 100], null, '#0361f3', 1, [250, 1.0, 550, 1.0], [250000, 1.0, 5500000, 0.0])

// 加入带有点击事件的标签
uniCore.tip.createTip('标签组', "可点击标签-1", [113.12390548015745, 28.255568831850005, 100], () => { alert("你点击了 可点击标签-1") }, '#f3125f', 1, [250, 1.0, 550, 1.0], [250000, 1.0, 5500000, 0.0])
uniCore.tip.createTip('标签组', "可点击标签-2", [113.12374548015745, 28.256758831850005, 100], () => { alert("可点击标签-2 被你点击到了~") }, '#f3125f', 1, [250, 1.0, 550, 1.0], [250000, 1.0, 5500000, 0.0])
```

### 拓展

UniCore Tip 提供 getTipById 方法根据 id 查找标签，hideTipById 方法根据 id 和 bool 值隐藏标签，hideTipByText 根据 text 和 bool 值隐藏标签，hideTipByIDText 根据 id 与 text 和 bool 值隐藏标签。

举个例子，hideTipById 方法的 JSDoc 如下：

```js
/**
 * 根据id隐藏tip
 * @param {*} id 
 * @param {*} bool 是否隐藏（或显示）
 */
```

在使用这些方法时，可以这么写：

```js
uniCore.tip.getTipById('标签组');
uniCore.tip.hideTipById('标签组', true);
```