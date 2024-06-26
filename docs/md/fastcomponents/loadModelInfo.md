---
outline: deep
---

# 模型加载进度条组件

### 功能介绍

通过模型加载进度条组件，能够在模型加载时显示模型加载进度条，提升使用体验（安慰剂进度条）。

不妨通过代码示例在 Vue 中尝试一下：

### 组件代码示例

```vue

<template>
  <div v-if="!isFinish">
    <!-- 资源加载窗口提示 -->
    <el-card class="box-card">
      <div class="title">资源加载提示</div>
      <div>
        <span class="demonstration">正在加载{{ loadName }}...</span>
        <el-progress :percentage="pgressNum" class="progress"></el-progress>
      </div>
    </el-card>
  </div>
</template>

<script type="text/javascript">

export default {
  components: {

  },
  data () {
    return {
      loadName: null,
      pgressNum: 0,
      isFinish: false,
    }
  },

  methods: {
    /**
     * 设置新值
     * @param {*} name 
     */
    setNewData (name) {
      // 让上一个项目进度条直接达到100%
      if (this.loadName != null) {
        this.pgressNum = 100;
        setTimeout(() => {
          this.loadName = name;
          this.pgressNum = 0;
          this.setLoadNum();
        }, 300)
      } else {
        this.loadName = name;
        this.pgressNum = 0;
        this.setLoadNum();
      }


    },

    /**
     * 设置安慰进度条
     */
    setLoadNum () {
      this.intervalSet = setInterval(() => {
        if (this.pgressNum < 99) {
          this.pgressNum += 3;
        } else {
          clearInterval(this.intervalSet);
        }
      }, Math.random() * Math.random() * 7000)
    },

    /**
     * 结束设置
     */
    setFinish () {
      this.pgressNum = 100;
      setTimeout(() => {
        this.isFinish = true;
      }, 500)
    }

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
::v-deep .box-card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0px 24px 54px 0px rgba(35, 41, 50, 0.5);
  border-radius: 24px;
  padding: 0 24px 24px 24px;
  margin-bottom: 12px;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);

  .title {
    font-size: 18px;
    font-weight: bold;
    color: #fefeff;
    display: block;
    margin-bottom: 20px;
  }

  .demonstration {
    color: #9ea3ad;
    margin: 0 10px;
  }

  .progress {
    width: 300px;
  }
}
</style>

```

### 调用代码示例

```vue
<template>
  <div id="unicoreContainer">
    <!-- 模型加载组件窗口卡片开始 -->
    <lmInfo ref="lmInfoId"></lmInfo>
    <!-- 模型加载组件窗口卡片结束 -->
  </div>
</template>

<script>
import { UniCore } from 'unicore-sdk'
import { config } from 'unicore-sdk/unicore.config'
import 'unicore-sdk/Widgets/widgets.css'
import lmInfo from '@/components/loadModelInfo/index'; //模型加载组件


export default {
  components: {
    lmInfo
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
        id: '小别墅'
      }
      //加载3dtiles
      uniCore.model.createTileset('../../assets/3Dtiles/sample3_方法2_小别墅属性(1)/tileset.json', options, () => {
        // 开始触发加载进度条
        this.$refs.lmInfoId.loadName = "小别墅";
        this.$refs.lmInfoId.setLoadNum();
      }).then(cityLeft => {
        uniCore.model.changeModelPos(cityLeft, [113.12098820449636, 28.256150218457687, 130], [0, 0, 0], [23.8, 23.8, 23.8])

        cityLeft.tileVisible.addEventListener((tile) => {
          if (tile.contentUnloaded) {
            return;
          }
          // 检查瓦片是否加载
          if (tile.contentReady) {
            // 结束进度条显示
            this.$refs.lmInfoId.setFinish();
            // 清空监听事件
            cityLeft.tileVisible._listeners = [];
            cityLeft.tileVisible._scopes = [];

          }
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
}
</style>
```


### 示例运行结果

![Alt text](image-6.png)

### 调用代码示例中的关键代码

```js
// 开始触发加载进度条
this.$refs.lmInfoId.loadName = "小别墅";
this.$refs.lmInfoId.setLoadNum();
```

```js
// 结束进度条显示
this.$refs.lmInfoId.setFinish();
```

### 拓展

当你需要加载多个模型时，在第一个模型如“小别墅”加载完毕后，你可调用以下代码结束“小别墅”的进度条并直接从零进入第二个模型如“第二个模型”进度条的加载。`setFinish` 方法在最后一个模型加载完毕后调用。

```js
this.$refs.lmInfoId.setNewData('第二个模型');
```

![Alt text](image-7.png)