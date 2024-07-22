---
outline: deep
---

# 模型剖切

## Model 类的方法 - digModel

### 方法介绍

UniCore 内置 Model 类，提供 digModel 方法用于模型剖切。

该方法需传入一个变量，即模型tileset。

其他可选变量的JSDoc形式如下：

```js
/**
 * 模型按方块剖切
 * @param {*} model 使用添加模型方法后返回的模型tileset类
 * @param {*} options 剖切方向及设置
 * @param {*} edgeWidth 剖切边缘宽度
 */
```

其中，options 需对应 `"fb", "bf", "lr", "rl", "tb", "bt"` 的键名进行写入参数，分别代表从前往后、从后往前、从左到右、从右到左、从上到下、从下到上。参数允许缺省。

不妨通过代码示例在 Vue 中尝试一下：

### 在线演示

点击 [在线链接](http://192.168.4.56:8091/?id=digModel) 以查看在线演示。

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

      let options = {
        id: '小别墅',
        url: '../../assets/3Dtiles/sample3_方法2_小别墅属性(1)/tileset.json'
      }
      //加载3dtiles
      uniCore.model.createTileset(options.url, options).then(cityLeft => {
        uniCore.model.changeModelPos(cityLeft, [113.12098820449636, 28.256150218457687, 130], [0, 0, 0])
        uniCore.viewer.flyTo(cityLeft);

        let option = { "fb": 0.6, "rl": 0.5 };
        let edgeWidth = 5.0;
        uniCore.model.digModel(cityLeft, option, edgeWidth);
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
  overflow: hidden;
}
</style>
```

### 示例运行结果

![Alt text](image-49.png)

### 关键代码

你可以通过修改 digModel 中的变量查看修改这些变量带来的效果。

```js
let option = { "fb": 0.6, "rl": 0.5 };
let edgeWidth = 5.0;
uniCore.model.digModel(cityLeft, option, edgeWidth);
```