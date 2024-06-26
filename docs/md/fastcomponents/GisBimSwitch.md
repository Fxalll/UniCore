---
outline: deep
---

# GIS / BIM 切换组件

### 功能介绍

通过 GIS / BIM 切换组件，能够在 GIS 功能与 BIM 功能之间自由切换。

不妨通过代码示例在 Vue 中尝试一下：

### 组件代码示例

```vue
<template>
  <div>
    <!-- GIS / BIM 切换组件 -->
    <el-card class="box-card">
      <div class="title">GIS / BIM 切换组件</div>
      <hr />
      <div class="button" @click="gbSwitch(false)">切换 GIS</div>
      <div class="button" @click="gbSwitch()">切换 BIM</div>
    </el-card>
  </div>
</template>

<script type="text/javascript">
import * as Cesium from 'cesium'

export default {

  methods: {
    init (modelId, lockAxiz) {
      this.modelId = modelId;
      this.lockAxiz = lockAxiz;
    },
    gbSwitch (bool = true) {

      // 开启地下模式
      uniCore.model.undergroundMode(bool);
      
      if (bool) {
        uniCore.viewer.scene.backgroundColor = Cesium.Color.fromCssColorString("#b9d3ee");
        uniCore.viewer.terrainProvider = null;

        // 只留该模型显示，其他全部隐藏
        uniCore.model.setPrimitivesShow(this.modelId, false, false)

        // // 信息树只留该模型
        // window.nodesList = window.nodesList?.filter(e =>
        //   e.id === this.modelId
        // )

      } else {
        uniCore.viewer.scene.backgroundColor = null;
        uniCore.viewer.terrainProvider = window.terrainProvider;

        // 还原所有模型显示
        uniCore.model.setPrimitivesShow('', true)

        // // 信息树还原所有模型
        // window.nodesList = window.nodesListSaved;

      }
      // 打开视角锁定
      uniCore.position.lockTo(uniCore.viewer, bool, this.lockAxiz);

    }

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
::v-deep .el-card__body {
  padding: 20px 0px 0 0px;
}
::v-deep .box-card {
  position: absolute;
  top: 3%;
  left: 3%;
  width: 300px;
  z-index: 1;
  background: rgb(26 26 26 / 83%);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0px 24px 54px 0px rgba(35, 41, 50, 0.5);
  border-radius: 15px;
  padding: 0 24px 12px 24px;
  margin-bottom: 12px;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);

  .title {
    font-size: 18px;
    font-weight: bold;
    text-shadow: 1px 1px #000;
    color: #fefeff;
    display: block;
    margin-bottom: 10px;
  }

  hr {
    margin-left: 24px;
    margin-bottom: 10px;
    border: none;
    border-bottom: 1px solid #ffffff1a;
  }

  .button {
    display: inline-flex;
    margin: 5px 10px;
    color: white;
    background: #4d4d4dd1;
    border-radius: 10px;
    padding: 7px 20px;
    cursor: pointer;
    transition: 0.3s;
  }
}
</style>


```

### 调用代码示例

```vue
<template>
  <div id="unicoreContainer">
    <!-- GIS / BIM 切换组件窗口卡片开始 -->
    <gbSet ref="gbSetId"></gbSet>
    <!-- GIS / BIM 切换组件窗口卡片结束 -->
  </div>
</template>

<script>
import { UniCore } from 'unicore-sdk'
import { config } from 'unicore-sdk/unicore.config'
import 'unicore-sdk/Widgets/widgets.css'
import gbSet from '@/components/GisBimSwitch/index'; //GIS/BIM切换组件


export default {

  components: {
    gbSet
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.init();

    // 初始化GIS/BIM所需focus的模型
    this.$refs.gbSetId.init('小别墅1号示例', [113.12098820449636, 28.256150218457687, 130]);
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
      let viewer = uniCore.viewer;

      // 视角初始化
      uniCore.position.buildingPosition(viewer, [113.12380548015745, 28.250758831850005, 700], -20, -45, 1);

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

        // 开启右键菜单、点击高亮、属性property
        uniCore.interact.setTilesRightClickMenu([{
          id: '小别墅1号示例',
          url: '../../assets/3Dtiles/sample3_方法2_小别墅属性(1)/tileset.json',
          propertysURL: '../../assets/3Dtiles/sample3_方法2_小别墅属性(1)/01 小别墅.json'
        }], (property) => console.log(property));
      })



      /**
         * 小别墅2号示例
         */
      options = {
        id: '小别墅2号示例',
        url: '../../assets/3Dtiles/sample3_方法2_小别墅属性(1)/tileset.json'
      }
      //加载3dtiles
      uniCore.model.createTileset(options.url, options).then(cityLeft => {
        uniCore.model.changeModelPos(cityLeft, [113.12098820449636, 28.266150218457687, 130], [0, 0, 0], [23.8, 23.8, 23.8])
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
}
</style>
```


### 示例运行结果

切换 GIS 模式效果（加载多源异构数据及GIS系统）：

![Alt text](image-4.png)

切换 BIM 模式效果（切换到单个模型的BIM系统）：

![Alt text](image-2.png)

![Alt text](image-3.png)

### 调用代码示例中的关键代码

```js
this.$refs.gbSetId.init('小别墅1号示例', [113.12098820449636, 28.256150218457687, 130]);
```
