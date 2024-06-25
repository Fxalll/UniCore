---
outline: deep
---

# 简易建模组件

### 功能介绍

通过远程调用接口获取白膜信息，实现简易建模的协同共享。

注：该功能使用了 elementUI 库，使用前需安装该库，具体方法见 [elementUI 安装](https://element.eleme.io/#/zh-CN/component/installation) 。


不妨通过代码示例在 Vue 中尝试一下：

### 组件代码示例

```vue
<template>
  <div>
    <!-- 简易建模 -->
    <el-card class="box-card">
      <div class="title">简易建模</div>
      <hr />
      <div class="button subButton" @click="drawExtent()">绘制</div>
      <div class="button subButton" @click="induationAnalysis()">开始建模</div>
      <div class="button mainButton" @click="initCreate()">保存最新建模</div>
      <div class="button" @click="generationModel()">测试批量建模</div>
      <div class="button" @click="clearAllEntities()">清除</div>

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
import * as turf from '@turf/turf';
import { GET_BUILDING_LIST, INSERT_BUILDING, UPDATE_BUILDING_ISSHOW, DELETE_BUILDING } from '@/apis/building/building'

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
    initCreate () {
      let viewer = window.viewer;
      // 暂时关闭定时器
      clearInterval(window.onlineInterval);
      window.onlineInterval = undefined;
      //  获取building
      // TODO: 这里暂时扩大到500，500后的数据如何管理后面处理
      axios.get(GET_BUILDING_LIST, {
        params: { modelId: this.modelId, size: 500 }
      })
        .then((res) => {

          // 找出在testData中但不在云端中的数据，进行隐藏
          let badData = this.tempData.filter(item => !res.data.data.records.includes(item))
          badData.forEach((ele) => {
            if (uniCore.model.getEntitiesByName(ele.id).length !== 0) {
              uniCore.model.getEntitiesByName(ele.id).forEach((e) => {
                e.show = false;
              })
            }

          })
          this.tempData = res.data.data.records;



          this.testData = res.data.data.records;
          if (this.testData.length === 0) this.emptyText = "暂无数据";
          this.loading = false;
          // 添加建筑
          this.testData.forEach(item => {
            let res = uniCore.model.getEntitiesByName(item.id);
            if (res.length < item.axisList.length) {
              if (item.isShow) {
                // 处理字符串转数字，这里不处理不会报错，因此注释这段代码
                // let axisList = item.axisList.map(e => { return { x: parseFloat(e.x), y: parseFloat(e.y), z: parseFloat(e.z) } })

                // 避免贴图材质颜色重叠问题
                for (let i = 0; i < item.layerNum; i++) {
                  viewer.entities.add({
                    name: item.id,
                    description: item.name,
                    polygon: {
                      hierarchy: item.axisList,
                      // material: Cesium.Color.fromBytes(64, 157, 253, 20), //rgba
                      material: Cesium.Color.WHITESMOKE.withAlpha(1),
                      // material: new Cesium.ImageMaterialProperty({
                      //   //贴图图片的地址
                      //   image: './static/img/texture/building.jpg',
                      //   //可以给贴图设置颜色，设置颜色后图片就不是彩色的了
                      //   //color: Cesium.Color.BLUE,
                      //   //设置贴图的横向和纵向的图片数量，这里横向为1，纵向为1，就等于是不平铺
                      //   repeat: new Cesium.Cartesian2(1, 1),
                      //   //transparent: true
                      // }),
                      height: Number(item.modelHeight * (i + 0)),
                      extrudedHeight: Number(item.modelHeight * (i + 1)),
                      outline: true,
                      outlineColor: Cesium.Color.BLACK,
                      outlineWidth: 4,
                      // perPositionHeight: true
                    }
                  });

                }


              }

            } else {
              // 这里控制显隐
              res.forEach((e) => {
                e.show = item.isShow;
              })

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
      let axis = uniCore.position.cartesian3_2axis(val.axisList[Math.round(val.axisList.length / 2)]);
      uniCore.position.buildingPosition(window.viewer, [parseFloat(axis[0]), parseFloat(axis[1]) - 0.00005, 2260], -20, -90, 1)
    },

    handleChange (index, row) {
      // 这里需要将修改提交到后端再进行更新标签状态，以保证多端协同
      this.loading = true;
      row.isShow = !row.isShow ? 0 : 1;

      axios.post(UPDATE_BUILDING_ISSHOW, {
        id: row.id, isShow: row.isShow
      })
        .then((res) => {
          // console.log(res);

          // 更新状态
          this.initCreate();
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
      axios.post(DELETE_BUILDING, {
        "id": row.id
      })
        .then((res) => {
          // console.log(res);
          // 隐藏建筑
          uniCore.tip.hidePointById(row.id, true)
          // 实时删除功能
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

    init () {
      this.activeShapePoints = []
      this.floatingPoint = undefined
      this.activeShape = undefined
      this.handler = undefined
      this.isDraw = false
      this.buildingHeight = 0
      this.tempEntities = []
    },


    drawExtent () {
      this.init();

      let viewer = window.viewer;


      viewer.scene.globe.depthTestAgainstTerrain = true; // 开启深度检测
      this.handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
      this.handler.setInputAction((event) => {
        const earthPosition = viewer.scene.pickPosition(event.position);
        if (Cesium.defined(earthPosition)) {
          if (this.activeShapePoints.length === 0) {
            this.floatingPoint = this.createPoint(earthPosition);
            this.activeShapePoints.push(earthPosition);
            const dynamicPositions = new Cesium.CallbackProperty(() => {
              return new Cesium.PolygonHierarchy(this.activeShapePoints);
            }, false);
            this.activeShape = this.drawShape(dynamicPositions, Cesium.Color.fromBytes(255, 255, 255, 50));
          }
          this.activeShapePoints.push(earthPosition);
          this.tempEntities.push(this.createPoint(earthPosition));
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

      this.handler.setInputAction((event) => {
        if (Cesium.defined(this.floatingPoint)) {
          const newPosition = viewer.scene.pickPosition(event.endPosition);
          if (Cesium.defined(newPosition)) {
            this.floatingPoint.position.setValue(newPosition);
            this.activeShapePoints.pop();
            this.activeShapePoints.push(newPosition);
          }
        }
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

      this.handler.setInputAction(() => {
        this.activeShapePoints.pop();
        if (this.activeShapePoints.length < 3) return;

        this.tempEntities.push(this.drawPolyline(this.activeShapePoints));
        let ploy = this.drawShape(this.activeShapePoints, Cesium.Color.fromBytes(255, 255, 255, 50));
        this.tempEntities.push(ploy);
        this.getAreaHeight(this.activeShapePoints);

        viewer.entities.remove(this.floatingPoint);
        viewer.entities.remove(this.activeShape);
        this.floatingPoint = undefined;
        this.activeShape = undefined;
        this.handler.destroy();// 关闭事件句柄
        this.handler = null;
      }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    },

    getAreaHeight (positions) {
      let viewer = window.viewer;
      let startP = positions[0];
      let endP = positions[positions.length - 1];
      if (startP.x != endP.x && startP.y != endP.y && startP.z != endP.z) {
        positions.push(positions[0]);
      }
      const tempPoints = [];
      for (let i = 0; i < positions.length; i++) {
        let ellipsoid = viewer.scene.globe.ellipsoid;
        let cartographic = ellipsoid.cartesianToCartographic(positions[i]);
        let lat = Cesium.Math.toDegrees(cartographic.latitude);
        let lng = Cesium.Math.toDegrees(cartographic.longitude);
        tempPoints.push([lng, lat]);
      }
      let line = turf.lineString(tempPoints);
      let chunk = turf.lineChunk(line, 10, { units: 'meters' });

      const tempArray = [];
      chunk.features.forEach(f => {
        f.geometry.coordinates.forEach(c => {
          tempArray.push(Cesium.Cartographic.fromDegrees(c[0], c[1]));
        })
      })

      let promise = Cesium.sampleTerrainMostDetailed(viewer.terrainProvider, tempArray);
      promise.then((updatedPositions) => {
        const max = Math.max.apply(Math, updatedPositions.map(item => { return item.height }))
        const min = Math.min.apply(Math, updatedPositions.map(item => { return item.height }))
        this.buildingHeight = Math.ceil(min);
        this.isDraw = !this.isDraw; // 禁用绘制按钮
      })
    },

    createPoint (worldPosition) {
      let viewer = window.viewer;
      const point = viewer.entities.add({
        position: worldPosition,
        point: {
          color: Cesium.Color.WHITE,
          pixelSize: 5,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        },
      });
      return point;
    },

    drawShape (positionData, mat) {
      let viewer = window.viewer;
      let shape = viewer.entities.add({
        polygon: {
          hierarchy: positionData,
          material: mat,
          outline: true,
          outlineColor: Cesium.Color.WHITE,
          outlineWidth: 4,
        }
      });
      return shape;
    },

    drawPolyline (positions) {
      let viewer = window.viewer;
      if (positions.length < 1) return;

      let startP = positions[0];
      let endP = positions[positions.length - 1];
      if (startP.x != endP.x && startP.y != endP.y && startP.z != endP.z) {
        positions.push(positions[0]);
      }

      return viewer.entities.add({
        name: 'polyline',
        polyline: {
          positions: positions,
          width: 2.0,
          material: Cesium.Color.BLACK,
          clampToGround: true
        }
      })
    },

    induationAnalysis () {

      // 创建输入框
      let modelName = prompt("请输入模型名称");
      let modelHeight = prompt("请输入楼栋高度");
      let modelLayerNum = prompt("请输入楼层数量");
      if (modelName !== null && modelName !== "" && modelHeight !== null && modelHeight !== "" && modelLayerNum !== null && modelLayerNum !== "") {
        // 销毁当前方法左键点击事件
        if (this.handler) {
          this.handler.destroy();
          this.handler = undefined;
        }

        // 数字转字符串以对接后端
        let axisList = this.activeShapePoints.map(e => { return { x: e.x.toString(), y: e.y.toString(), z: e.z.toString() } })

        let shapeObj = {};
        shapeObj.name = modelName;
        shapeObj.modelHeight = modelHeight;
        shapeObj.layerNum = modelLayerNum;
        shapeObj.axisList = axisList;
        shapeObj.color = "#ffffff";
        shapeObj.isShow = 1;

        //  新增label
        axios.post(INSERT_BUILDING, shapeObj)
          .then((res) => {
            // console.log(res);

            // 更新标签状态
            this.initCreate();
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


        this.clearAllEntities();


        function guid () {
          return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
              v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
          });
        }





      }





    },

    clearAllEntities () {
      let viewer = window.viewer;
      const length = this.tempEntities.length;
      for (let i = 0; i < length; i++) {
        viewer.entities.remove(this.tempEntities[i]);
      }
      this.tempEntities = [];
      this.activeShapePoints = [];
      this.isDraw = !this.isDraw;
      this.floatingPoint = undefined;
      this.activeShape = undefined;
      if (this.handler) {
        this.handler.destroy();
        this.handler = undefined;
      }

    },

    // TODO: 点击高亮
    highLightEntity () {
      // 清除高亮颜色
      function clearColor () {
        try {
          window.lastPickEntity.id._polygon.material = window.lastEntityColor;
        } catch (error) {
          // console.log(`clearColor error:${error}`);
        }
      }

      // 高亮选中材质颜色
      function colorSet (pickObj) {
        try {
          // 高亮颜色设置
          pickObj.id._polygon.material = Cesium.Color.fromCssColorString('rgba(238, 85, 34,0.7)');

        } catch (error) {
          console.log(`colorSet error:${error}`);
        }
      }

      // 保存选中材质颜色
      function colorSave (pickObj) {
        try {
          window.lastEntityColor = Object.freeze(pickObj.id._polygon.material);
          window.lastPickEntity = pickObj;
        } catch (error) {
          console.log(`colorSave error:${error}`);

        }
      }

      const handler = new Cesium.ScreenSpaceEventHandler(window.viewer.scene.canvas);
      handler.setInputAction(function (e) {
        const pickObj = window.viewer.scene.pick(e.position);
        clearColor()
        if (Cesium.defined(pickObj)) {
          try {
            // 保证选到的是简单建模的模型
            if (!!pickObj && !!pickObj.id._description._value) {
              colorSave(pickObj)
              colorSet(pickObj)

            }
          }
          catch { (err) => { console.log(err); } }
        }



      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    },


    // TODO: 批量生成模型
    generationModel () {

      // 给定楼层名称、坐标、楼层高度、楼层数量，批量生成楼层
      let randomData = [
        {
          "name": "xx大厦",
          "modelHeight": 150,
          "layerNum": 13,
          "axis": {
            "x": "113.11684446037646",
            "y": "28.260540253905273"
          }
        },
        {
          "name": "xx楼",
          "modelHeight": 120,
          "layerNum": 5,
          "axis": {
            "x": "113.12138590577335",
            "y": "28.261241565931535"
          }
        }
      ]

      // 需要根据建筑单个坐标，生成一个可用的axisList（建筑多边形轮廓），需要用到模型样式预定义
      this.modelPerset(randomData[1].axis)

    },

    // TODO: 模型样式预定义
    modelPerset (axis) {
      const centerLongitude = axis.x;
      const centerLatitude = axis.y;

      // 正方体
      // 正方形的边长，单位为米
      const sideLength = 100;

      // 创建中心点的Cartographic
      const center = new Cesium.Cartographic(Cesium.Math.toRadians(centerLongitude), Cesium.Math.toRadians(centerLatitude));

      // 计算正方形的四个角的Cartographic
      const leftBottom = new Cesium.Cartographic(center.longitude - sideLength / (2 * Cesium.Ellipsoid.WGS84._radii.x * Math.cos(center.latitude)), center.latitude - sideLength / (2 * Cesium.Ellipsoid.WGS84._radii.y));
      const rightBottom = new Cesium.Cartographic(center.longitude + sideLength / (2 * Cesium.Ellipsoid.WGS84._radii.x * Math.cos(center.latitude)), center.latitude - sideLength / (2 * Cesium.Ellipsoid.WGS84._radii.y));
      const rightTop = new Cesium.Cartographic(center.longitude + sideLength / (2 * Cesium.Ellipsoid.WGS84._radii.x * Math.cos(center.latitude)), center.latitude + sideLength / (2 * Cesium.Ellipsoid.WGS84._radii.y));
      const leftTop = new Cesium.Cartographic(center.longitude - sideLength / (2 * Cesium.Ellipsoid.WGS84._radii.x * Math.cos(center.latitude)), center.latitude + sideLength / (2 * Cesium.Ellipsoid.WGS84._radii.y));

      // 将Cartographic转换为世界坐标
      const leftBottomWorld = Cesium.Ellipsoid.WGS84.cartographicToCartesian(leftBottom);
      const rightBottomWorld = Cesium.Ellipsoid.WGS84.cartographicToCartesian(rightBottom);
      const rightTopWorld = Cesium.Ellipsoid.WGS84.cartographicToCartesian(rightTop);
      const leftTopWorld = Cesium.Ellipsoid.WGS84.cartographicToCartesian(leftTop);

      // 最终所需的正方体坐标
      let res = [leftBottomWorld, rightBottomWorld, rightTopWorld, leftTopWorld]
      console.log(res);



    },






  },


  mounted () {
    // // TODO：获取缓存数据，接后端后可考虑删除
    // if (localStorage.getItem('paintData') !== null) {
    //   this.testData = JSON.parse(localStorage.getItem('paintData'));
    // }
    this.highLightEntity();
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
::v-deep .el-card__body {
  padding: 20px 20px 20px 20px;
}
.box-card ::-webkit-scrollbar {
  display: none;
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
  padding: 0 24px 10px 24px;
  margin-bottom: 12px;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  .el-table {
    border-radius: 15px;
  }

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

export const GET_BUILDING_LIST = baseURL + "/bim/building/list"
export const INSERT_BUILDING = baseURL + "/bim/building/add"
export const UPDATE_BUILDING_ISSHOW = baseURL + "/bim/building/update"
export const DELETE_BUILDING = baseURL + "/bim/building/del"
```

接口配置可参考 [示例项目 Apifox 文档](https://console-docs.apipost.cn/preview/24966bf4a030244f/83593e49e2f79206?target_id=bc3075dd-7533-414f-a510-516e780b0928) 中有关于 building 的接口响应示例。



### 调用代码示例

```vue
<template>
  <div id="unicoreContainer">
    <!-- 简易建模窗口卡片开始 -->
    <cmSet ref="cmSetId"></cmSet>
    <!-- 简易建模窗口卡片结束 -->
  </div>
</template>

<script>
import { UniCore } from 'unicore-sdk'
import { config } from 'unicore-sdk/unicore.config'
import 'unicore-sdk/Widgets/widgets.css'
import cmSet from '@/components/createModelSet/index'; //简易建模组件


export default {

  components: {
    cmSet
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.init();

    // 可以不断调用 initCreate 方法实现实时轮询最新数据，如
    setInterval(() => {
      this.$refs.cmSetId.initCreate();
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
      let viewer = window.viewer;

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
}
</style>
```

### 调用代码示例中的关键代码

```js
setInterval(() => {
  this.$refs.cmSetId.initCreate();
}, 1000)
```
