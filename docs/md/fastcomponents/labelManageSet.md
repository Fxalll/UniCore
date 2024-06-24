---
outline: deep
---

# 标签管理组件

### 功能介绍

通过远程调用接口获取标签信息，实现标签交互的协同共享。

注：该功能使用了 elementUI 库，使用前需安装该库，具体方法见 [elementUI 安装](https://element.eleme.io/#/zh-CN/component/installation) 。


不妨通过代码示例在 Vue 中尝试一下：

### 组件代码示例

```vue
<template>
  <div>
    <!-- 标签管理 -->
    <el-card class="box-card">
      <div class="title">标签管理</div>
      <hr />
      <div class="button mainButton" @click="createLabel()">创建标签</div>

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
          label="标签名称"
          width="120"
          header-align="center"
          align="center"
        >
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.text }}</el-tag>
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
import { GET_LABEL_LIST, INSERT_LABEL, UPDATE_LABEL_ISSHOW, DELETE_LABEL } from '@/apis/label/label'

export default {
  components: {

  },
  data () {
    return {
      modelId: 1,
      loading: false,
      emptyText: "暂无数据",
      testData: [],
      tempData: []
    }
  },

  methods: {

    /**
     * 生成标签
     */
    initLabel () {

      // 暂时关闭定时器
      clearInterval(window.onlineInterval);
      window.onlineInterval = undefined;

      //  获取label
      // TODO: 这里暂时扩大到500，500后的数据如何管理后面处理
      axios.get(GET_LABEL_LIST, {
        params: { modelId: this.modelId, size: 500 }
      })
        .then((res) => {

          // 找出在testData中但不在云端中的数据，进行隐藏
          let badData = this.tempData.filter(item => !res.data.data.records.includes(item))
          badData.forEach((ele) => {
            if (uniCore.tip.getTipById(ele.id) !== null) {
              uniCore.tip.hideTipById(ele.id, true)
              uniCore.tip.hidePointById(ele.id, true)
            }

          })
          this.tempData = res.data.data.records;


          this.testData = res.data.data.records;
          if (this.testData.length === 0) this.emptyText = "暂无数据";
          this.loading = false;
          // 添加标签
          this.testData.forEach(ele => {
            uniCore.tip.getTipById(ele.id).then((res) => {
              if (res === null) {
                if (ele.isShow) {
                  let axis = {};
                  axis.x = parseFloat(ele.xAxis)
                  axis.y = parseFloat(ele.yAxis)
                  axis.z = parseFloat(ele.zAxis)
                  uniCore.tip.createPoint(ele.id, axis)
                  uniCore.tip.initTip(ele.id, axis, ele.text, [0, 1.3, 55000, 0.5], [0, 1.0, 550000, 0.0], ele.color, 1)
                }
              } else {
                uniCore.tip.hideTipById(ele.id, !ele.isShow)
                uniCore.tip.hidePointById(ele.id, !ele.isShow)
              }
            })
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
      // localStorage.setItem('labelData', JSON.stringify(this.testData));


    },

    onClickRow (val) {
      let axis = uniCore.position.cartesian3_2axis(val.axis);
      uniCore.position.buildingPosition(window.viewer, [axis[0], axis[1], 760], -20, -90, 1)
    },

    handleChange (index, row) {

      // 这里需要将修改提交到后端再进行更新标签状态，以保证多端协同
      this.loading = true;
      row.isShow = !row.isShow ? 0 : 1;
      //  获取label
      axios.post(UPDATE_LABEL_ISSHOW, {
        id: row.id, isShow: row.isShow
      })
        .then((res) => {
          // console.log(res);

          // 更新标签状态
          this.initLabel();
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
      axios.post(DELETE_LABEL, {
        "id": row.id
      })
        .then((res) => {
          // console.log(res);
          // 隐藏被删除的标签，下一次不再加载该标签
          uniCore.tip.hideTipById(row.id, true)
          uniCore.tip.hidePointById(row.id, true)
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

    /**
     * 创建标签
     */
    createLabel () {
      // 提示用户点击位置创建标签
      this.$notify({
        title: '提示',
        message: '请点击要创建标签的位置',
        type: 'info',
        duration: 500
      });

      viewer.scene.globe.depthTestAgainstTerrain = true; // 必须开启深度检测，否则标签可能不在理想位置

      let uniCore = window.uniCore;

      this.handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
      this.handler.setInputAction((event) => {
        const earthPosition = viewer.scene.pickPosition(event.position);
        if (Cesium.defined(earthPosition)) {

          // 创建输入框
          let ret = prompt("请输入标签内容");
          if (ret !== null && ret !== "") {
            // 销毁当前方法左键点击事件
            if (this.handler) {
              this.handler.destroy();
              this.handler = undefined;
            }

            let labelObj = {};
            labelObj.modelId = this.modelId;
            labelObj.text = ret;
            labelObj.xAxis = earthPosition.x;
            labelObj.yAxis = earthPosition.y;
            labelObj.zAxis = earthPosition.z;
            labelObj.color = "#1a1a1a";
            labelObj.isShow = 1;


            this.loading = true;
            //  新增label
            axios.post(INSERT_LABEL, labelObj)
              .then((res) => {
                // console.log(res);

                // 更新标签状态
                this.initLabel();
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



            //             // TODO: 缓存当前数据，接后端后可考虑删除或修改此处逻辑
            // localStorage.setItem('labelData', JSON.stringify(this.testData));

            function guid () {
              return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0,
                  v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
              });
            }

          }



        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    }



  },

  mounted () {
    // // TODO：获取缓存数据，接后端后可考虑删除
    // if (localStorage.getItem('labelData') !== null) {
    //   this.testData = JSON.parse(localStorage.getItem('labelData'));
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

export const GET_LABEL_LIST = baseURL + "/bim/label/list"
export const INSERT_LABEL = baseURL + "/bim/label/add"
export const UPDATE_LABEL_ISSHOW = baseURL + "/bim/label/update"
export const DELETE_LABEL = baseURL + "/bim/label/del"
```

接口配置可参考 [示例项目 Apifox 文档](https://console-docs.apipost.cn/preview/24966bf4a030244f/83593e49e2f79206?target_id=bc3075dd-7533-414f-a510-516e780b0928) 中有关于 label 的接口响应示例。



### 调用代码示例

```vue
<template>
  <div id="unicoreContainer">
    <!-- 标签管理窗口卡片开始 -->
    <lmSet ref="lmSetId"></lmSet>
    <!-- 标签管理窗口卡片结束 -->
  </div>
</template>

<script>
import { UniCore } from 'unicore-sdk'
import { config } from 'unicore-sdk/unicore.config'
import 'unicore-sdk/Widgets/widgets.css'
import lmSet from '@/components/labelManageSet/index'; //标签管理组件


export default {

  components: {
    lmSet
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.init();

    // 可以不断调用 initLabel 方法实现实时轮询最新数据，如
    setInterval(() => {
      this.$refs.lmSetId.initLabel();
    }, 1000)
  },

  // 方法集合
  methods: {

    /**
 * GIS引擎初始化
 */
    init () {

      // 初始化UniCore

      //  配置unicore的token
      let accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxNjEwMzI4My01MjBmLTQzYzktOGZiMS0wMDRhZjE0N2IyMGIiLCJpZCI6MTc1NzkyLCJpYXQiOjE3MTM3NzQ3OTh9.zU-R4MNvHr8rvn1v28PQfDImyutnpPF2lmEgGeSPckQ";
      // 初始化unicore
      let uniCore = new UniCore(config, accessToken);
      uniCore.init("unicoreContainer");
      window.uniCore = uniCore;
      let viewer = window.viewer;

      // 视角初始化
      uniCore.position.buildingPosition(viewer, [113.12380548015745, 28.250758831850005, 700], -20, -45, 1);

    }
  }

}
</script>
```

### 调用代码示例中的关键代码

```js
setInterval(() => {
  this.$refs.lmSetId.initLabel();
}, 1000)
```
