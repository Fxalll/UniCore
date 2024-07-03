---
outline: deep
---

# 多底图分屏组件

### 功能介绍

可同时展示两种底图，并使用滑块调整尺寸。

不妨通过代码示例在 Vue 中尝试一下：

### 组件代码示例

默认路径为 `components/LayerSplitSet/index.vue`

```vue
<template>
  <div>
    <div id="slider"></div>
  </div>
</template>

<script type="text/javascript">
import * as Cesium from 'cesium'

export default {

  methods: {

    init (imageryProvider) {
      viewer.imageryLayers.addImageryProvider(imageryProvider);

      viewer.imageryLayers._layers[viewer.imageryLayers._layers.length - 1].splitDirection = 0.5



      // Sync the position of the slider with the split position
      const slider = document.getElementById("slider");
      window.viewer.scene.splitPosition =
        slider.offsetLeft / slider.parentElement.offsetWidth;

      const handler = new Cesium.ScreenSpaceEventHandler(slider);

      let moveActive = false;

      function move (movement) {
        if (!moveActive) {
          return;
        }

        const relativeOffset = movement.endPosition.x;
        const splitPosition =
          (slider.offsetLeft + relativeOffset) /
          slider.parentElement.offsetWidth;
        slider.style.left = `${100.0 * splitPosition}%`;
        window.viewer.scene.splitPosition = splitPosition;
      }

      handler.setInputAction(function () {
        moveActive = true;
      }, Cesium.ScreenSpaceEventType.LEFT_DOWN);
      handler.setInputAction(function () {
        moveActive = true;
      }, Cesium.ScreenSpaceEventType.PINCH_START);

      handler.setInputAction(move, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      handler.setInputAction(move, Cesium.ScreenSpaceEventType.PINCH_MOVE);

      handler.setInputAction(function () {
        moveActive = false;
      }, Cesium.ScreenSpaceEventType.LEFT_UP);
      handler.setInputAction(function () {
        moveActive = false;
      }, Cesium.ScreenSpaceEventType.PINCH_END);
    }

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#slider {
  position: absolute;
  left: 50%;
  top: 0px;
  background-color: #d3d3d3;
  width: 5px;
  height: 100%;
  z-index: 1;
}

#slider:hover {
  cursor: ew-resize;
}
</style>
```

### 调用代码示例

```vue
<template>
  <div id="unicoreContainer">
    <!-- 底图分割卡片开始 -->
    <lsSet ref="lsSetId"></lsSet>
    <!-- 底图分割树卡片结束 -->
  </div>
</template>

<script>
import { UniCore } from 'unicore-sdk'
import { config } from 'unicore-sdk/unicore.config'
import 'unicore-sdk/Widgets/widgets.css'
import lsSet from '@/components/LayerSplitSet/index.vue'; //底图分割组件
import * as Cesium from 'cesium'

export default {
  components: {
    lsSet
  },
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
        id: '城市白膜',
        url: '../../../assets/3Dtiles/changshaCityModel/tileset.json'
      }
      //加载3dtiles
      uniCore.model.createTileset(options.url, options).then(cityLeft => {
        uniCore.model.changeModelPos(cityLeft, [113.12098820449636, 28.256150218457687, 50], [0, 0, -90], [23.8, 23.8, 23.8])
      })


      this.$refs.lsSetId.init(new Cesium.UrlTemplateImageryProvider({
        url: "https://tile-{s}.openstreetmap.fr/hot/{z}/{x}/{y}.png",
        subdomains: ["a", "b", "c", "d"],
      }));


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

默认五五分屏（`OpenStreetMap正常风格`）：

```js
new Cesium.UrlTemplateImageryProvider({
    url: "https://tile-{s}.openstreetmap.fr/hot/{z}/{x}/{y}.png",
    subdomains: ["a", "b", "c", "d"],
})
```

![Alt text](image-18.png)

滑块可控制：

![Alt text](image-19.png)

底图可修改（`OpenStreetMap黑色风格`）：

```js
new Cesium.UrlTemplateImageryProvider({
    url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
    subdomains: ["a", "b", "c", "d"],
})
```

![Alt text](image-20.png)

可带地形（`OpenStreetMap地形图`）：

```js
new Cesium.UrlTemplateImageryProvider({
    url: "https://tile.openstreetmap.bzh/br/{z}/{x}/{y}.png",
    subdomains: ["a", "b", "c", "d"],
})
```

![Alt text](image-21.png)

### 调用代码示例中的关键代码

```js
this.$refs.lsSetId.init(new Cesium.UrlTemplateImageryProvider({
  url: "https://tile-{s}.openstreetmap.fr/hot/{z}/{x}/{y}.png",
  subdomains: ["a", "b", "c", "d"],
}));
```
