---
outline: deep
---

# 3DTiles 模型信息树组件

### 功能介绍

通过 3DTiles 模型的属性信息及构件ID，能够生成该模型的信息树（构件树）。信息树不仅提供可视化展示构件层级的功能，还能够通过按钮控制对应构件类别的显隐。

注：该功能使用了 elementUI 库，使用前需安装该库，具体方法见 [elementUI 安装](https://element.eleme.io/#/zh-CN/component/installation) 。

注：该功能使用了 vue-giant-tree 库，使用前需安装该库（该组件库有BUG，如遇到报错可尝试先安装该组件库0.1.0版本，后安装该组件库1.0.0版本）：

```sh
npm install vue-giant-tree@1.0.0
```

不妨通过代码示例在 Vue 中尝试一下：

### 组件代码示例

默认路径为 `components/ModelTreeSet/index.vue`

```vue
<template>
  <div>
    <!-- 模型信息树 -->
    <el-card class="box-card">
      <div class="title">模型信息树</div>
      <hr />
      <tree
        :setting="setting"
        :nodes="nodes"
        @onCheck="onCheck"
        @onCreated="handleCreated"
      />
    </el-card>
  </div>
</template>

<script type="text/javascript">
import tree from 'vue-giant-tree'

export default {
  components: {
    tree
  },
  data () {
    return {
      setting: {
        check: {
          enable: true
        },
        data: {
          simpleData: {
            enable: true,
            pIdKey: 'pid'
          }
        },
        view: {
          showIcon: false,
          addHoverDom: this.addHoverDom,
          removeHoverDom: this.removeHoverDom
        }
      },
      nodes: []

    }
  },

  methods: {

    initNodes () {
      let myNodes = []
      const level = []
      const category = []
      const family = []

      window.nodesList.forEach((e, index) => {
        // 将第一个index设为1开始，将0留给pid使用
        index += 1

        let newNode = {};
        newNode.id = index;
        newNode.pid = 0;
        newNode.name = e.id;
        newNode.checked = true;
        newNode.open = false;
        this.nodes.push(newNode);

        uniCore.model.fetchPropertys(e.propertysURL).then((data) => {

          data.forEach((ele, i) => {
            // 这里可以设置radio变量为按楼层过滤、按类名过滤或是按族family过滤
            let radio = '按楼层过滤';

            // 首先将level、category、family依次找到
            let levelRadio, categoryRadio, familyRadio

            if (radio == '按楼层过滤') {
              levelRadio = ele.level
              categoryRadio = ele.category
              familyRadio = ele.family
            } else if (radio == '按类名过滤') {
              levelRadio = ''
              categoryRadio = ele.category
              familyRadio = ele.family
            } else {
              levelRadio = ''
              categoryRadio = ''
              familyRadio = ele.family
            }


            if (levelRadio != '') {
              // 找到level，将没记录的作为父级元素
              if (ele.hasOwnProperty('level') && level.indexOf(index + levelRadio) === -1) {
                myNodes.pid = index
                myNodes.id = myNodes.pid + levelRadio
                myNodes.name = levelRadio
                myNodes.open = false
                myNodes.checked = true
                level.push(myNodes.id)
                this.nodes.push(myNodes)
                myNodes = []
              }
            }

            if (categoryRadio != '') {
              // 找到category，将没记录的作为二级元素
              if (ele.hasOwnProperty('category') && category.indexOf(index + levelRadio + categoryRadio) === -1) {
                myNodes.pid = index + levelRadio
                myNodes.id = myNodes.pid + categoryRadio
                myNodes.name = categoryRadio
                myNodes.open = false
                myNodes.checked = true
                category.push(myNodes.id)
                this.nodes.push(myNodes)
                myNodes = []
              }
            }

            if (familyRadio != '') {
              // 找到family，将没记录的作为三级元素
              if (ele.hasOwnProperty('family') && family.indexOf(index + '' + levelRadio + categoryRadio + familyRadio) === -1) {
                myNodes.pid = index + levelRadio + categoryRadio
                myNodes.id = myNodes.pid + familyRadio
                myNodes.name = familyRadio
                myNodes.open = false
                myNodes.checked = true
                family.push(myNodes.id)
                this.nodes.push(myNodes)
                myNodes = []
              }
            }

            // 将所有的子项都作为四级元素，自动匹配对应的父级元素
            const item = []
            item.pid = index + levelRadio + categoryRadio + familyRadio
            item.id = item.pid + ele.name
            item.open = false
            item.name = ele.name
            item.checked = true
            item.instanceid = ele._BATCHID === undefined ? ele.ElementID : ele._BATCHID;
            this.nodes.push(item)


          })

        })


      });

    },

    onCheck (evt, treeId, treeNode) {

      // 数组去重
      function handleArr (arr) {
        return ([...new Set(arr)])
      }

      // 找到节点下所有的子节点
      let findChild = function (array) {
        for (let i = 0; i < array.length; i++) {
          if (array[i].hasOwnProperty("children")) {
            findChild(array[i].children)
          } else {
            allClickInstanceid.push(array[i].instanceid)
          }
        }
      }

      // 递归找到节点最上层父节点
      let findParent = function (array) {
        return array.getParentNode() === null ? array : findParent(array.getParentNode());
      }

      // 最新返回的treeNode所点击到的所有elementID
      let allClickInstanceid = []

      if (treeNode.hasOwnProperty("children")) {
        findChild(treeNode.children)
      } else {
        allClickInstanceid.push(treeNode.instanceid)
      }

      // 以下代码将应用上面所得到的id序列进行显隐操作
      // 所展示的模型ID，依据为initNodes函数的index，据此找到allClickInstanceid对应的哪个模型，应对多模型的信息树情况
      let parentId = findParent(treeNode).id;
      let parentTileset = window.nodesList[parentId - 1].tileset;

      // 初始化下selectElementID
      window.selectElementID === undefined ? window.selectElementID = [] : window.selectElementID;

      let hideElementList = window.selectElementID.find(e => { return e.id === parentTileset.debugPickedTile.id })
      if (hideElementList === undefined) {
        window.selectElementID.push({ id: parentTileset.debugPickedTile.id, eleID: [] })
        hideElementList = window.selectElementID.find(e => { return e.id === parentTileset.debugPickedTile.id })
      }

      // 如果最新返回的treeNode为选中状态，那里面包含的elementID对应的构件都需要显示
      if (!treeNode.checked) {
        hideElementList.eleID.push(...allClickInstanceid)
        // 数组去重
        hideElementList.eleID = handleArr(hideElementList.eleID);


      } else {
        // 数组去重
        hideElementList.eleID = handleArr(hideElementList.eleID);

        // 如果最新返回的treeNode为取消选中状态，那里面包含的elementID对应的构件都需要隐藏
        allClickInstanceid.forEach(e => {
          hideElementList.eleID.splice(hideElementList.eleID.indexOf(e), 1)
        })

      }

      // 找到与elementID关联的构件方法
      parentTileset.tileVisible.addEventListener((tile) => {
        let content = tile.content;
        let featuresLength = content.featuresLength;

        for (let i = 0; i < featuresLength; i++) {
          let feature = content.getFeature(i);
          let elementId = feature.getProperty("id")
          if (hideElementList.eleID.indexOf(elementId) !== -1) {
            // 获得与elementID关联的构件feature
            feature.show = false;
          } else {
            feature.show = true;
          }
        }

        // 优化性能，自动清除事件
        setTimeout(() => {
          parentTileset.tileVisible._listeners = [];
          parentTileset.tileVisible._scopes = [];
        })
      });




    },

    handleCreated: function (ztreeObj) {
      this.ztreeObj = ztreeObj;
      // onCreated 中操作ztreeObj对象展开第一个节点
      ztreeObj.expandNode(ztreeObj.getNodes()[0], true);
    },

  },

  mounted () {

  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
::v-deep .el-card__body {
  padding: 20px 20px 0 20px;
}

::v-deep .box-card::-webkit-scrollbar {
  display: none;
}
::v-deep .box-card {
  position: absolute;
  top: 3%;
  left: 3%;
  z-index: 1;
  background: rgb(26 26 26 / 83%);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0px 24px 54px 0px rgba(35, 41, 50, 0.5);
  border-radius: 10px;
  padding: 0 24px 24px 0px;
  margin-bottom: 12px;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  max-width: 370px;
  max-height: 70%;
  overflow-y: scroll;
  .el-table {
    border-radius: 15px;
  }

  .title {
    font-size: 18px;
    font-weight: bold;
    color: #fefeff;
    display: block;
    margin-left: 24px;
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
    background: #ffffff00;
    border-radius: 5px;
    cursor: pointer;
  }

  .vue-giant-tree li a {
    color: #bdbdbd;
  }
}
</style>


```

### 调用代码示例

```vue
<template>
  <div id="unicoreContainer">
    <!-- 信息树窗口卡片开始 -->
    <mtSet ref="mtSetId"></mtSet>
    <!-- 信息树窗口卡片结束 -->
  </div>
</template>

<script>
import { UniCore } from 'unicore-sdk'
import { config } from 'unicore-sdk/unicore.config'
import 'unicore-sdk/Widgets/widgets.css'
import mtSet from '@/components/ModelTreeSet/index.vue'; //模型信息树组件


export default {

  components: {
    mtSet
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

      let options = {
        id: '小别墅1号示例',
        url: '../../assets/3Dtiles/sample3_方法2_小别墅属性(1)/tileset.json',
        propertysURL: '../../assets/3Dtiles/sample3_方法2_小别墅属性(1)/01 小别墅.json'
      }
      //加载3dtiles
      uniCore.model.createTileset(options.url, options).then(cityLeft => {
        uniCore.model.changeModelPos(cityLeft, [113.12098820449636, 28.256150218457687, 130], [0, 0, 0], [23.8, 23.8, 23.8])

        // 绑定信息树（配合ModelTreeSet组件使用
        options.tileset = cityLeft;
        if (!!!window.nodesList) {
          window.nodesList = [];
        }
        window.nodesList.push(options)

        // 原本设计是作为开关调用的，这里使用定时器先展示功能
        setTimeout(() => {
          // 信息树初始化
          this.$refs.mtSetId.nodes = [];
          this.$refs.mtSetId.initNodes();
        }, 1000)


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
}
</style>
```


### 示例运行结果

![Alt text](image.png)

### 调用代码示例中的关键代码

```js
// 绑定信息树（配合ModelTreeSet组件使用
options.tileset = cityLeft;
if (!!!window.nodesList) {
  window.nodesList = [];
}
window.nodesList.push(options)

// 原本设计是作为开关调用的，这里使用定时器先展示功能
setTimeout(() => {
  // 信息树初始化
  this.$refs.mtSetId.nodes = [];
  this.$refs.mtSetId.initNodes();
}, 1000)
```
