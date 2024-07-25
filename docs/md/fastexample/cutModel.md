---
outline: deep
---

# 模型剪切

## Model 类的方法 - cutModel

### 方法介绍

UniCore 内置 Model 类，提供 cutModel 方法用于模型剪切。

该方法需传入两个变量，一个是模型tileset，一个是切割坐标数组（逆时针坐标）。

其他可选变量的JSDoc形式如下：

```js
/**
 * 模型按坐标逆时针剖切
 * @param {*} tilesetData 模型数据
 * @param {*} originPositions 切块逆时针坐标数组
 * @param {*} isCutInside 内部剖切选项
 * @param {*} hpr 模型headings/pitchs/rolls旋转参数，一般配合changePos()函数使用
 * @param {*} scales 缩放系数，配合changePos()函数使用
 * @param {*} offsets 偏移系数，配合changePos()函数使用
 * @param {*} edgeWidth 边缘宽度
 * @param {*} color 边缘颜色
 */
```

不妨通过代码示例在 Vue 中尝试一下：

### 在线演示

点击 [在线链接](http://192.168.4.56:8091/?id=cutModel) 以查看在线演示。

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
        id: "城市白膜",
        name: null,
        url: '../../../assets/gltf/长沙项目项目周边模型.glb',
        scale: 6.8,
        property: null
      }).then(cityModel => {
        uniCore.model.changeModelPos(cityModel, [113.12098820449636, 28.256150218457687, 50], [90, 0, 0])

        const cityCutAxiz = [
          [
            113.12142552716101,
            28.25794444173175
          ],
          [
            113.12101500404785,
            28.25794444173175
          ],
          [
            113.12101500404785,
            28.25461763870921
          ],
          [
            113.12142552716101,
            28.25461763870921
          ]
        ]

        // 模型剖切
        cityModel.readyEvent.addEventListener(() => {
          uniCore.model.cutModel(cityModel, cityCutAxiz, false, [90, 0, 0], undefined, undefined, 0)
        })

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
  background: black;
}
</style>
```

### 示例运行结果

原模型：

![Alt text](image-13.png)

剖切后：

![Alt text](image-14.png)

### 关键代码

你可以通过修改 cutModel 中的变量查看修改这些变量带来的效果。

```js
const cityCutAxiz = [
  [
    113.12142552716101,
    28.25794444173175
  ],
  [
    113.12101500404785,
    28.25794444173175
  ],
  [
    113.12101500404785,
    28.25461763870921
  ],
  [
    113.12142552716101,
    28.25461763870921
  ]
]

// 模型剖切
cityModel.readyEvent.addEventListener(() => {
  uniCore.model.cutModel(cityModel, cityCutAxiz, false, [90, 0, 0], undefined, undefined, 0)
})
```

### 拓展

你可以使用 digModel 还原模型剖切前的样子。

```js
uniCore.model.digModel(cityModel)
```