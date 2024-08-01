---
outline: deep
---

# 第一人称自由贴地漫游

## Tour 类的方法 - startOnGround

### 方法介绍

UniCore 内置 Tour 类，提供 startOnGround 方法用于开启第一人称自由贴地漫游功能。

该方法需传入参数，参数格式示例如下：

```js
// 定义漫游参数对象
let carRoamParam = {
  // 模型路径
  modelPath: "../../../../assets/gltf/CesiumMilkTruck.glb",
  // 模型是否显示
  modelShow: true,
  // 模型缩放比例
  modelScale: 1.0,
  // 起始位置
  startPosition: [113.12248820449636, 28.254150218457687, 500],
  // 初始漫游速度
  speed: 10,
};
```

变量的JSDoc形式如下：

```js
/**
 * 第一视角漫游加载方法
 * @param: 使用键盘控制第一视角漫游，模型姿态：↑：抬头；↓：低头；←：左转；→：右转；9：顺时针旋转；0：逆时针旋转；1：加速；2：减速；3：停止运行；4：切换视角
 * @param {Object} parameter -第一视角漫游默认配置项
 * @param {String} parameter.modelPath -模型URL路径
 * @param {Array} parameter.startPosition -模型初始坐标位置
 * @param {Array} parameter.modelScale -模型大小
 * @param {Array} parameter.modelShow -模型是否显示
 * @param {Number} [parameter.speed] -漫游速度，默认为1
 * @param {*} exclude - 排除需要贴地的模型数组，防止贴着数组内的模型上方
 * @return {Cesium.Primitive} -返回驾驶对象实体
 */
```

不妨通过代码示例在 Vue 中尝试一下（相关模型文件在本章 [阅前提醒](./whatisit.md) 中的内网Git链接中可获取）：

### 在线演示

点击 [在线链接](http://192.168.4.56:8091/?id=startOnGround) 以查看在线演示。

### 代码示例

```vue
<template>
  <div id="unicoreContainer"></div>
</template>

<script>
import { UniCore } from "../../public/static/application/UniCore"
import { config } from '../../public/unicore.config'
import 'cesium/Source/Widgets/widgets.css'


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


      // 定义漫游参数对象
      let carRoamParam = {
        // 模型路径
        modelPath: "../../../../assets/gltf/CesiumMilkTruck.glb",
        // 模型是否显示
        modelShow: true,
        // 模型缩放比例
        modelScale: 1.0,
        // 起始位置
        startPosition: [113.12248820449636, 28.254150218457687, 500],
        // 初始漫游速度
        speed: 0,
      };

      // 执行开始驾驶方法
      uniCore.tour.startOnGround(carRoamParam);
      // 更改驾驶视角方法（或按4键），value为'first'为第一视角，'none'为取消视角跟随
      uniCore.tour.changeView('first');

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
  background: #000;
}
</style>
```

### 示例运行结果

![Alt text](image-60.png)

### 关键代码

你可以通过修改 carRoamParam 中的值查看修改这些变量带来的效果。

```js
// 定义漫游参数对象
let carRoamParam = {
  // 模型路径
  modelPath: "../../../../assets/gltf/CesiumMilkTruck.glb",
  // 模型是否显示
  modelShow: true,
  // 模型缩放比例
  modelScale: 1.0,
  // 起始位置
  startPosition: [113.12248820449636, 28.254150218457687, 500],
  // 初始漫游速度
  speed: 0,
};

// 执行开始驾驶方法
uniCore.tour.startOnGround(carRoamParam);
// 更改驾驶视角方法（或按4键），value为'first'为第一视角，'none'为取消视角跟随
uniCore.tour.changeView('first');
```

### 拓展

startOnGround 内可以使用 exclude 排除需要贴地的模型数组，防止贴着数组内的模型上方。

```js
uniCore.tour.startOnGround(carRoamParam, [cityModel1, carModel2]);
```

使用 stop 方法可以停止漫游。

```js
uniCore.tour.stop();
```

使用 quit 方法可以终止并销毁模型。

```js
uniCore.tour.quit();
```