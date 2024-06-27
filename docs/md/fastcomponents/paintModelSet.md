---
outline: deep
---

# 区域绘制组件

### 功能介绍

通过远程调用接口获取墙体信息，实现标签交互的协同共享。

注：该功能使用了 elementUI 库，使用前需安装该库，具体方法见 [elementUI 安装](https://element.eleme.io/#/zh-CN/component/installation) 。


不妨通过代码示例在 Vue 中尝试一下：

### 组件代码示例

```vue
<template>
  <div>
    <!-- 区域绘制 -->
    <el-card class="box-card">
      <div class="title">区域绘制</div>
      <hr />
      <div class="button subButton" @click="startClick()">开始绘制</div>
      <div class="button subButton" @click="endClick()">停止绘制</div>
      <div class="button mainButton" @click="savePaint()">保存最新绘制</div>
      <div class="button" @click="clearPaint()">清除绘制</div>

      <el-table
        v-loading="loading"
        :data="testData"
        :empty-text="emptyText"
        style="width: 100%; min-width: 270px"
        max-height="300px"
        highlight-current-row
        @row-dblclick="onClickRow"
      >
        <el-table-column
          label="显隐"
          width="50"
          header-align="center"
          align="center"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.isShow"
              :active-value="1"
              :nactive-value="0"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="handleChange(scope.$index, scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>

        <el-table-column
          label="绘制名称"
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
import * as Cesium from 'cesium'
import axios from 'axios'
import { GET_GEOPOINT_LIST, INSERT_GEOPOINT, UPDATE_GEOPOINT_ISSHOW, DELETE_GEOPOINT } from '@/apis/geopoint/geopoint'

export default {
  components: {

  },
  data () {
    return {
      modelId: 1,
      loading: false,
      emptyText: "暂无数据",
      mouseAxisList: [],
      testData: [],
      tempData: []
    }
  },

  methods: {

    /**
     * 生成区域绘制
     */
    initPaint () {
      // 暂时关闭定时器
      clearInterval(window.onlineInterval);
      window.onlineInterval = undefined;

      //  获取geopoint
      // TODO: 这里暂时扩大到500，500后的数据如何管理后面处理
      axios.get(GET_GEOPOINT_LIST, {
        params: { modelId: this.modelId, size: 500 }
      })
        .then((res) => {
          // 找出在testData中但不在云端中的数据，进行隐藏
          let badData = this.tempData.filter(item => !res.data.data.records.includes(item))
          badData.forEach((ele) => {
            uniCore.model.getPrimitivesById(ele.id) !== null ? uniCore.model.getPrimitivesById(ele.id).show = false : null;
          })
          this.tempData = res.data.data.records;


          this.testData = res.data.data.records;
          if (this.testData.length === 0) this.emptyText = "暂无数据";
          this.loading = false;

          this.testData.forEach(ele => {
            let res = uniCore.model.getPrimitivesById(ele.id);
            if (res === null) {
              if (ele.isShow) {
                for (let i = 0; i < ele.axisList.length - 1; i++) {
                  // 需要配合后端把数组里的float改为string
                  uniCore.model.paintWall(ele.id, [[parseFloat(ele.axisList[i][0]), parseFloat(ele.axisList[i][1])], [parseFloat(ele.axisList[i + 1][0]), parseFloat(ele.axisList[i + 1][1])]], ele.setLineheight, ele.wallLineheight);
                }
              }

            } else {
              // 这里控制显隐
              res.show = ele.isShow;
            }
          })


        }).then(() => {
          // 重启定时器
          this.$parent.createOnlineInterval();
        })
        .catch(error => {
          console.log(error);
          this.emptyText = "网络错误";
          this.$notify.error({
            title: '错误',
            message: '网络错误，无法更新数据',
          });
          this.loading = false;
        })










      // // TODO: 缓存当前数据，接后端后可考虑删除或修改此处逻辑
      // localStorage.setItem('paintData', JSON.stringify(this.testData));
    },

    onClickRow (val) {

      let axis = val.axisList[Math.round(val.axisList.length / 2)];
      uniCore.position.buildingPosition(uniCore.viewer, [axis[0], axis[1], 760], -20, -90, 1)
    },

    handleChange (index, row) {
      // 这里需要将修改提交到后端再进行更新标签状态，以保证多端协同
      this.loading = true;
      row.isShow = !row.isShow ? 0 : 1;

      axios.post(UPDATE_GEOPOINT_ISSHOW, {
        id: row.id, isShow: row.isShow
      })
        .then((res) => {
          // console.log(res);

          // 更新状态
          this.initPaint();
          this.loading = true;
        })
        .catch(error => {
          console.log(error);
          this.emptyText = "网络错误";
          this.$notify.error({
            title: '错误',
            message: '网络错误，无法更新数据',
          });
          this.loading = false;
        })
    },

    handleDelete (index, row) {
      this.loading = true;
      //  删除label
      axios.post(DELETE_GEOPOINT, {
        "id": row.id
      })
        .then((res) => {
          // console.log(res);
          // 删除绘制
          uniCore.model.delLine(row.id)
          // // 实时删除功能
          this.testData = this.testData.filter(e => e.id !== row.id)
          this.loading = false;

        })
        .catch(error => {
          console.log(error);
          this.$notify.error({
            title: '错误',
            message: '网络错误，无法更新数据',
          });
          this.loading = false;
        })



    },

    startClick () {
      let viewer = uniCore.viewer;
      viewer.scene.globe.depthTestAgainstTerrain = true; // 必须开启深度检测，否则点击的位置可能不在理想位置
      this.handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
      this.handler.setInputAction((event) => {
        const earthPosition = viewer.scene.pickPosition(event.position);
        if (Cesium.defined(earthPosition)) {

          let setLineheight = 60;
          let setWallLineheight = 100;
          let mouseAxis = uniCore.position.cartesian3_2axis(earthPosition)
          this.mouseAxisList.push([mouseAxis[0], mouseAxis[1]])
          try {
            uniCore.model.paintWall("PaintLineCollecion", [this.mouseAxisList[this.mouseAxisList.length - 2], this.mouseAxisList[this.mouseAxisList.length - 1]], setLineheight, setWallLineheight);
          } catch (error) { }

        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);



      this.handler.setInputAction((event) => {
        const earthPosition = viewer.scene.pickPosition(event.endPosition);
        if (Cesium.defined(earthPosition)) {

          if (this.mouseAxisList.length >= 1) {
            let setLineheight = 60;
            let setWallLineheight = 20;
            let mouseAxis = uniCore.position.cartesian3_2axis(earthPosition)
            mouseAxis = [mouseAxis[0], mouseAxis[1]]

            uniCore.model.delLine("PaintMoveLineCollecion");
            uniCore.model.paintLine("PaintMoveLineCollecion", [this.mouseAxisList[this.mouseAxisList.length - 1], mouseAxis], setLineheight, "#ffffff");

          }

        }
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

      this.handler.setInputAction((event) => {
        this.endClick();
      }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);




      // let that = this.$parent;
      // that.isPaintModel = true;
      // window.uniCore.model.delLine("PaintLineCollecion");

    },
    endClick () {
      // 销毁当前方法点击事件
      if (this.handler) {
        this.handler.destroy();
        this.handler = undefined;
      }
      uniCore.model.delLine("PaintMoveLineCollecion");
    },

    clearPaint () {
      try {

        window.uniCore.model.delLine("PaintLineCollecion");
        window.uniCore.model.delLine("PaintMoveLineCollecion");
        this.mouseAxisList = [];

      } catch (error) {
        console.error(error);
        this.$notify({
          title: '提醒',
          message: '请先开始绘制',
          type: 'warning'
        });
      }
    },

    savePaint () {
      // 暂停绘制
      this.endClick();

      // 创建输入框
      let ret = prompt("请输入绘制内容名称");
      if (ret !== null && ret !== "") {

        let newArr = [];
        this.mouseAxisList.forEach(e => { let arr = []; e.forEach(ele => { arr.push(ele.toString()) }); newArr.push(arr) }); newArr

        // newArr = [['1', '1'], ['2', '2'], ['3', '3'], ['4', '4'], ['5', '5'], ['6', '6']]

        let lineObj = {};
        lineObj.modelId = this.modelId;
        lineObj.name = ret;
        lineObj.axisList = newArr;
        lineObj.setLineheight = 60;
        lineObj.wallLineheight = 100;
        lineObj.color = "#1a1a1a"
        lineObj.isShow = 1;

        this.loading = true;
        //  新增geopoint
        axios.post(INSERT_GEOPOINT, lineObj)
          .then((res) => {
            // console.log(res);
            // 保存后清除当前绘制
            this.clearPaint();
            // 更新状态
            this.initPaint();
            this.loading = true;
          })
          .catch(error => {
            console.log(error);
            this.$notify.error({
              title: '错误',
              message: '网络错误，无法更新数据',
            });
            this.loading = false;
          })

        // // TODO: 缓存当前数据，接后端后可考虑删除
        // localStorage.setItem('paintData', JSON.stringify(this.testData));



        function guid () {
          return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
              v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
          });
        }
      }






    }
  },

  mounted () {
    // // TODO：获取缓存数据，接后端后可考虑删除
    // if (localStorage.getItem('paintData') !== null) {
    //   this.testData = JSON.parse(localStorage.getItem('paintData'));
    // }
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
  padding: 0 24px 24px 24px;
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

### API代码示例（服务器需自行配置）：

```js
let baseURL = process.env.VUE_APP_DEV_API || ""

export const GET_GEOPOINT_LIST = baseURL + "/bim/geopoints/list"
export const INSERT_GEOPOINT = baseURL + "/bim/geopoints/add"
export const UPDATE_GEOPOINT_ISSHOW = baseURL + "/bim/geopoints/update"
export const DELETE_GEOPOINT = baseURL + "/bim/geopoints/del"
```

接口配置可参考 [示例项目 Apifox 文档](https://console-docs.apipost.cn/preview/24966bf4a030244f/83593e49e2f79206?target_id=bc3075dd-7533-414f-a510-516e780b0928) 中有关于 geopoints 的接口响应示例。



### 调用代码示例

```vue
<template>
  <div id="unicoreContainer">
    <!-- 区域绘制窗口卡片开始 -->
    <pmSet ref="pmSetId"></pmSet>
    <!-- 区域绘制窗口卡片结束 -->
  </div>
</template>

<script>
import { UniCore } from 'unicore-sdk'
import { config } from 'unicore-sdk/unicore.config'
import 'unicore-sdk/Widgets/widgets.css'
import pmSet from '@/components/paintModelSet/index'; //区域绘制组件


export default {

  components: {
    pmSet
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.init();

    // 可以不断调用 initPaint 方法实现实时轮询最新数据，如
    setInterval(() => {
      this.$refs.pmSetId.initPaint();
    }, 1000)
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

### 调用代码示例中的关键代码

```js
setInterval(() => {
  this.$refs.pmSetId.initPaint();
}, 1000)
```
