---
outline: deep
---

# 模型编辑组件

### 功能介绍

通过模型编辑组件，能够调试模型位置、大小、旋转角度等参数。

注：该功能使用了 elementUI 库，使用前需安装该库，具体方法见 [elementUI 安装](https://element.eleme.io/#/zh-CN/component/installation) 。

不妨通过代码示例在 Vue 中尝试一下：

### 在线演示

点击 [在线链接](http://192.168.4.56:8091/?id=AdjustModelSet) 以查看在线演示。

### 组件代码示例

默认路径为 `components/AdjustModelSet/index.vue`

```vue
<template>
  <div>
    <!-- 模型编辑组件 -->
    <el-card class="box-card" v-show="isShow">
      <div
        id="move-layer"
        class="title"
        @mousedown="mousedown"
        @mouseup="mouseup"
      >
        模型编辑
      </div>
      <hr />

      <div class="button mainButton" @click="selectModelFunc()">选择模型</div>
      <div class="button subButton" @click="outputData()">导出设置</div>

      <div class="block">
        <span class="demonstration">经纬度、高程数值设置</span>
        <el-input
          placeholder="请输入内容"
          v-model="lon"
          type="number"
          @input="setData"
        >
          <template slot="prepend">经度</template>
        </el-input>
        <el-input
          placeholder="请输入内容"
          v-model="lat"
          type="number"
          @input="setData"
        >
          <template slot="prepend">纬度</template>
        </el-input>
        <el-input
          placeholder="请输入内容"
          v-model="het"
          type="number"
          @input="setData"
        >
          <template slot="prepend">高程</template>
        </el-input>

        <span class="demonstration">缩放数值</span>
        <el-input
          placeholder="请输入内容"
          v-model="scales1"
          type="number"
          @input="setData"
        >
          <template slot="prepend">X</template>
        </el-input>
        <el-input
          placeholder="请输入内容"
          v-model="scales2"
          type="number"
          @input="setData"
        >
          <template slot="prepend">Y</template>
        </el-input>
        <el-input
          placeholder="请输入内容"
          v-model="scales3"
          type="number"
          @input="setData"
        >
          <template slot="prepend">Z</template>
        </el-input>

        <span class="demonstration">偏移量</span>
        <el-input
          placeholder="请输入内容"
          v-model="offsets1"
          type="number"
          @input="setData"
        >
          <template slot="prepend">X</template>
        </el-input>
        <el-input
          placeholder="请输入内容"
          v-model="offsets2"
          type="number"
          @input="setData"
        >
          <template slot="prepend">Y</template>
        </el-input>
        <el-input
          placeholder="请输入内容"
          v-model="offsets3"
          type="number"
          @input="setData"
        >
          <template slot="prepend">Z</template>
        </el-input>

        <span class="demonstration">俯仰角</span>
        <el-slider v-model="hpr1" :max="maxHpr" @input="setData"></el-slider>
        <span class="demonstration">旋转角</span>
        <el-slider v-model="hpr2" :max="maxHpr" @input="setData"></el-slider>
        <span class="demonstration">翻转角</span>
        <el-slider v-model="hpr3" :max="maxHpr" @input="setData"></el-slider>
      </div>
    </el-card>
  </div>
</template>

<script type="text/javascript">
import * as Cesium from 'cesium'

export default {

  data () {
    return {
      isShow: false,
      isSelectModel: false,
      lon: 0,
      lat: 0,
      het: 0,
      scales1: 0,
      scales2: 0,
      scales3: 0,
      offsets1: 0,
      offsets2: 0,
      offsets3: 0,
      hpr1: 0,
      hpr2: 0,
      hpr3: 0,
      maxHpr: 360
    }
  },

  methods: {

    init (uniCore) {
      window.uniCore = uniCore;
      this.isShow = true;
    },

    selectModelFunc () {

      let that = this;
      this.isSelectModel = false;
      this.selectModel = null;

      this.$message(
        { message: "请点击所需编辑的模型。" }
      )
      const handler = new Cesium.ScreenSpaceEventHandler(window.viewer.scene.canvas);

      handler.setInputAction(function (e) {
        const pickObj = viewer.scene.pick(e.position);
        if (!!pickObj) {
          that.isSelectModel = true;
          that.selectModel = pickObj.primitive;

          let axis = window.uniCore.position.cartesian3_2axis(pickObj.primitive.boundingSphere.center)

          that.lon = axis[0];
          that.lat = axis[1];
          that.het = axis[2];
          that.scales1 = that.scales2 = that.scales3 = 1;
          that.offsets1 = that.offsets2 = that.offsets3 = 0;
          that.hpr1 = that.hpr2 = that.hpr3 = 0;

          // 设置数据
          that.setData();

          handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK)//移除事件
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    },

    outputData () {
      this.$message(
        { message: "所需代码已在控制台打印，使用F12查看" }
      )
      console.log(`导出代码：`);
      console.log(`uniCore.model.changeModelPos(tileset, [${this.lon}, ${this.lat}, ${this.het}], [${this.hpr1}, ${this.hpr2}, ${this.hpr3}], [${this.scales1}, ${this.scales2}, ${this.scales3}], [${this.offsets1}, ${this.offsets2}, ${this.offsets3}]);`);
    },

    setData () {
      try {
        if (this.isSelectModel) {

          [this.scales1, this.scales2, this.scales3] = [this.scales1, this.scales2, this.scales3].map((ele) => {
            ele = Number(ele);
            if (isNaN(ele) || ele === 0) {
              ele = 0.01;
            }
            return ele;
          })

          setTimeout(() => {
            window.uniCore.model.changeModelPos(this.selectModel, [Number(this.lon), Number(this.lat), Number(this.het)], [this.hpr1, this.hpr2, this.hpr3], [Number(this.scales1), Number(this.scales2), Number(this.scales3)], [Number(this.offsets1), Number(this.offsets2), Number(this.offsets3)])
          })


        }
      } catch (error) {
        console.log(error);
      }
    },


    /**
 * 鼠标与窗口拖动相关
 */
    mousedown (event, id) {
      if (document.elementFromPoint(event.clientX, event.clientY).id === 'move-layer') {
        this.selectElement = document.elementFromPoint(event.clientX, event.clientY).parentNode.parentNode;
        document.querySelectorAll('.box-card').forEach((e) => {
          e.style.zIndex = 1000;
        })
        this.selectElement.style.zIndex = 1001;
        var div1 = this.selectElement
        this.selectElement.style.cursor = 'move'
        this.isDowm = true
        var distanceX = event.clientX - this.selectElement.offsetLeft
        var distanceY = event.clientY - this.selectElement.offsetTop
        document.onmousemove = function (ev) {
          var oevent = ev || event
          div1.style.left = oevent.clientX - distanceX + 'px'
          div1.style.top = oevent.clientY - distanceY + 'px'
        }
        document.onmouseup = function () {
          document.onmousemove = null
          document.onmouseup = null
          div1.style.cursor = 'default'
        }
      }

    },
    //鼠标抬起
    mouseup () {
      this.isMove = false;
      this.selectElement = "null"
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
  transition: none;
  user-select: none;

  .title {
    font-size: 18px;
    font-weight: bold;
    color: #fefeff;
    display: block;
    margin-left: 24px;
    margin-bottom: 10px;
    user-select: none;
    overflow: hidden;
    cursor: move;
  }

  hr {
    margin-left: 24px;
    margin-bottom: 10px;
    border: none;
    border-bottom: 1px solid #ffffff1a;
  }

  .block {
    padding: 0px 20px;
  }

  span {
    color: #ccc;
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

  .mainButton {
    background: #105bc5;
    font-weight: 700;
    padding: 7px 40px;
  }

  .subButton {
    background: #979797cc;
  }

  .mainButton:hover {
    background: #009fff;
    box-shadow: 0px 0px 54px 0px #009fffa8;
  }

  .subButton:hover {
    background: #d7d7d7cc;
    box-shadow: 0px 0px 54px 0px #d7d7d7a8;
  }
}
</style>
```

### 调用代码示例

```vue
<template>
  <div id="unicoreContainer">
    <!-- 模型编辑组件开始 -->
    <amSet ref="amSetId"></amSet>
    <!-- 模型编辑组件结束 -->
  </div>
</template>

<script>
import { UniCore } from 'unicore-sdk'
import { config } from 'unicore-sdk/unicore.config'
import 'unicore-sdk/Widgets/widgets.css'
import amSet from '@/components/AdjustModelSet/index.vue'; // 模型编辑组件

export default {
  components: {
    amSet
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

      // 模型示例1
      let options = {
        id: '小别墅'
      }
      //加载3dtiles
      uniCore.model.createTileset('../../assets/3Dtiles/sample3_方法2_小别墅属性(1)/tileset.json', options).then(cityLeft => {
        uniCore.model.changeModelPos(cityLeft, [113.12099164460524, 28.256201272470424, 83])
      })

      // 模型示例2
      uniCore.model.addGltf({
        lon: 0,
        lat: 0,
        height: 0
      }, {
        id: "小别墅",
        name: null,
        url: '../../../assets/gltf/小别墅.glb',
        scale: 1.0,
        property: null
      }).then(cityModel => {
        uniCore.model.changeModelPos(cityModel, [113.12098820449636, 28.256150218457687, 50], [90, 0, 0])
      })

      this.$refs.amSetId.init(uniCore);

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

首次加载效果（上为 3DTiles 模型，下为 glTF 模型）：

![Alt text](image-32.png)

编辑 3DTiles 模型：

![Alt text](image-33.png)

编辑 glTF 模型：

![Alt text](image-34.png)

### 调用代码示例中的关键代码

组件提供 init 方法，传入 uniCore 示例即可。

```js
this.$refs.amSetId.init(uniCore);
```