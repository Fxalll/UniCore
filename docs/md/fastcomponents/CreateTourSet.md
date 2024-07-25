---
outline: deep
---

# 路径漫游控制组件

### 功能介绍

通过路径漫游控制组件，能够更方便地生成路径漫游参数。

注：该功能使用了 elementUI 库，使用前需安装该库，具体方法见 [elementUI 安装](https://element.eleme.io/#/zh-CN/component/installation) 。

不妨通过代码示例在 Vue 中尝试一下：

### 在线演示

点击 [在线链接](http://192.168.4.56:8091/?id=CreateTourSet) 以查看在线演示。

### 组件代码示例

默认路径为 `components/CreateTourSet/index.vue`

```vue
<template>
  <div>
    <!-- 路径漫游控制组件 -->
    <el-card class="box-card">
      <div
        id="move-layer"
        class="title"
        @mousedown="mousedown"
        @mouseup="mouseup"
      >
        路径漫游控制组件
      </div>
      <hr />

      <div class="button mainButton" @click="startTour()">开始漫游</div>
      <div class="button subButton" @click="stopTour()">停止漫游</div>
      <div class="button subButton" @click="createTour()">生成路径</div>
      <div class="button" @click="outputTour()">导出路径</div>

      <el-table
        v-loading="loading"
        :data="tableData"
        :empty-text="emptyText"
        style="width: 100%; min-width: 270px"
        max-height="300px"
        highlight-current-row
        @row-dblclick="onClickRow"
      >
        <el-table-column
          label="路径名称"
          width="120"
          header-align="center"
          align="center"
        >
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" header-align="center" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script type="text/javascript">
import * as Cesium from 'cesium';

export default {

  data () {
    return {
      loading: false,
      emptyText: "暂无数据",
      tableData: [],
    }
  },

  methods: {

    /**
     * 开始漫游
     */
    startTour () {
      uniCore.tour.startTweensTour(this.tableData);
    },

    /**
     * 停止漫游
     */
    stopTour () {
      uniCore.tour.stopTweensTour();
    },

    /**
     * 生成路径
     */
    createTour () {

      let currentCameraSet = uniCore.position.getCurrentCameraSet();

      if (!!currentCameraSet) {
        // 创建输入框
        let ret = prompt("请输入路径内容");
        if (ret !== null && ret !== "") {

          let viewData = {};

          if (this.tableData.length === 0) {
            viewData.duration = 0;
          } else {
            let ret2 = prompt("请输入动画时间");
            ret2 = parseFloat(ret2)
            if (!isNaN(ret2) && ret2 !== null && ret2 !== "") {
              viewData.duration = ret2;
            }
          }
          viewData.id = this.tableData.length;
          viewData.name = ret;
          viewData.lon = currentCameraSet.lon;
          viewData.lat = currentCameraSet.lat;
          viewData.het = currentCameraSet.het;
          viewData.heading = currentCameraSet.heading;
          viewData.pitch = currentCameraSet.pitch;

          this.tableData.push(viewData);

        }
      }


    },

    /**
     * 删除路径
     * @param {*} index 
     * @param {*} row 
     */
    handleDelete (index, row) {
      this.loading = true;
      this.tableData.splice(index, 1)
      this.loading = false;
    },

    /**
     * 双击表格栏
     * @param {*} val 
     */
    onClickRow (val) {
      window.viewer.scene.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(val.lon, val.lat, val.het),
        orientation: {
          heading: val.heading, // 方向
          pitch: val.pitch, // 倾斜角度
          roll: 0
        },
        duration: 0
      });
    },

    /**
     * 导出路径
     */
    outputTour () {
      this.$message(
        { message: "所需路径已在控制台打印，使用F12查看" }
      )

      let outputData = [];
      this.tableData.forEach(e => { outputData.push(e) })
      console.log(outputData);
      return outputData;
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
        console.log(div1);
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

  .el-table {
    border-radius: 15px;
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
    <!-- 路径漫游控制组件窗口卡片开始 -->
    <ctSet ref="ctSetId"></ctSet>
    <!-- 路径漫游控制组件窗口卡片结束 -->
  </div>
</template>

<script>
import { UniCore } from 'unicore-sdk'
import { config } from 'unicore-sdk/unicore.config'
import 'unicore-sdk/Widgets/widgets.css'
import ctSet from '@/components/CreateTourSet/index'; // 路径漫游控制组件


export default {

  components: {
    ctSet
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

![Alt text](image-28.png)

### 调用代码示例中的关键代码

暂无，只需直接引入组件即可。

### 拓展

你可以双击表格某一栏，即可快速将视角跳转至对应视角，方便调试。
