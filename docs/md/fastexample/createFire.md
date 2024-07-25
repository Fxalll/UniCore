---
outline: deep
---

# 类火焰粒子效果

## Particle 类的方法 - createFire

### 方法介绍

UniCore 内置 Particle 类，提供 createFire 方法用于创建一个类火焰粒子效果。

该方法需传入一个设置变量参数，基本格式为：

```js
// 设置火焰参数
let parameter = {
  axiz: [113.12098820449636, 28.256000218457685, 230], // 位置，必填
  image: "../../../static/img/label/fire.png", // 粒子图片资源，必填
  startColor: [1, 1, 1, 1], //开始颜色 rgba（1最大），必填
  endColor: [0.5, 0, 0, 0],//结束颜色 rgba（1最大），必填
  emissionRate: 5,
  gravity: 0.0,//设置重力参数
  minimumParticleLife: 1,
  maximumParticleLife: 6,
  minimumSpeed: 1.0,//粒子发射的最小速度
  maximumSpeed: 4.0,//粒子发射的最大速度
  startScale: 0.0,
  endScale: 10.0,
  particleSize: 25.0
}
```

变量的JSDoc形式如下：

```js
/**
 * 创建类火焰粒子效果
 * @param {*} parameter 
 * @returns 
 */
```


不妨通过代码示例在 Vue 中尝试一下（相关模型文件在本章 [阅前提醒](./whatisit.md) 中的内网Git链接中可获取）：

### 在线演示

点击 [在线链接](http://192.168.4.56:8091/?id=createFire) 以查看在线演示。

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
      window.uniCore = uniCore;

      // // 视角初始化
      uniCore.position.buildingPosition(uniCore.viewer, [113.12380548015745, 28.250758831850005, 700], -20, -45, 1);

      /**
       * 小别墅1号示例
       */
      let options = {
        id: '小别墅1号示例',
        url: '../../assets/3Dtiles/sample3_方法2_小别墅属性(1)/tileset.json',
        propertysURL: '../../assets/3Dtiles/sample3_方法2_小别墅属性(1)/01 小别墅.json'
      }
      //加载3dtiles
      uniCore.model.createTileset(options.url, options).then(cityLeft => {
        uniCore.model.changeModelPos(cityLeft, [113.12098820449636, 28.256150218457687, 130], [0, 0, 0], [23.8, 23.8, 23.8])
      })


      // 设置火焰参数
      let parameter = {
        axiz: [113.12098820449636, 28.256000218457685, 230], // 位置，必填
        image: "../../../static/img/label/fire.png", // 粒子图片资源，必填
        startColor: [1, 1, 1, 1], //开始颜色 rgba（1最大），必填
        endColor: [0.5, 0, 0, 0],//结束颜色 rgba（1最大），必填
        emissionRate: 5,
        gravity: 0.0,//设置重力参数
        minimumParticleLife: 1,
        maximumParticleLife: 6,
        minimumSpeed: 1.0,//粒子发射的最小速度
        maximumSpeed: 4.0,//粒子发射的最大速度
        startScale: 0.0,
        endScale: 10.0,
        particleSize: 25.0
      }
      // 创建火焰
      let fireParticlePrimitives = uniCore.particle.createFire(parameter);

      setTimeout(() => {
        this.$message(
          { message: "执行销毁火焰程序" }
        )
        uniCore.particle.deleteParticle(fireParticlePrimitives);
      }, 15000)


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

![Alt text](image-53.png)

### 关键代码

你可以通过修改变量查看修改这些变量带来的效果。

```js
// 设置火焰参数
let parameter = {
  axiz: [113.12098820449636, 28.256000218457685, 230], // 位置，必填
  image: "../../../static/img/label/fire.png", // 粒子图片资源，必填
  startColor: [1, 1, 1, 1], //开始颜色 rgba（1最大），必填
  endColor: [0.5, 0, 0, 0],//结束颜色 rgba（1最大），必填
  emissionRate: 5,
  gravity: 0.0,//设置重力参数
  minimumParticleLife: 1,
  maximumParticleLife: 6,
  minimumSpeed: 1.0,//粒子发射的最小速度
  maximumSpeed: 4.0,//粒子发射的最大速度
  startScale: 0.0,
  endScale: 10.0,
  particleSize: 25.0
}
// 创建火焰
let fireParticlePrimitives = uniCore.particle.createFire(parameter);
```

### 拓展

你可以使用 deleteParticle 删除粒子效果：

```js
uniCore.particle.deleteParticle(fireParticlePrimitives);
```
