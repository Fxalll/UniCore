import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "通用图形引擎",
  description: "为 GIS + BIM 应用而生的通用图形引擎",
  head: [
    // 添加图标
    ["link", { rel: "icon", href: "/logo3.png" }],
  ],
  themeConfig: {
    // lastUpdated: {
    //   text: '最近更新于',
    //   formatOptions: {
    //     dateStyle: 'full',
    //     timeStyle: 'medium'
    //   }
    // },
    logo: '/logo3.png',
    nav: [
      { text: '首页', link: '/' },
      {
        text: '简介', items: [
          { text: '通用图形引擎是什么？', link: '/md/whatisit' },
          { text: '为什么选择通用图形引擎？', link: '/md/whyit' },
          { text: '快速开始', link: '/md/faststart' },
          { text: '通用图形引擎配置', link: '/md/setting' },
          { text: '工具栏配置', link: '/md/toolbarstart' },
        ]
      },
      {
        text: 'API文档',
        items: [
          { text: 'Model', link: '/md/fastapi/Model' },
          { text: 'Position', link: '/md/fastapi/Position' },
          { text: 'Tip', link: '/md/fastapi/Tip' },
          { text: 'Interact', link: '/md/fastapi/Interact' },
          { text: 'Database', link: '/md/fastapi/Database' },
          { text: 'Animation', link: '/md/fastapi/Animation' },
          { text: 'Particle', link: '/md/fastapi/Particle' },
          { text: 'Flat', link: '/md/fastapi/Flat' },
          { text: 'Tour', link: '/md/fastapi/Tour' },
          { text: 'TerrainClip', link: '/md/fastapi/TerrainClip' },
          { text: 'Service', link: '/md/fastapi/Service' },
        ]
      },
      {
        text: '案例中心',
        items: [
          {
            text: '文档案例',
            items: [
              { text: '视角与模型定位', link: '/md/fastproject/positionExample' },
              { text: '模型加载', link: '/md/fastproject/modelAddExample' },
              { text: '模型操作', link: '/md/fastproject/modelChangeExample' },
              { text: '动画与粒子效果', link: '/md/fastproject/modelAnimationExample' },
              { text: '场景操作', link: '/md/fastproject/sceneOperationExample' },
              { text: '本地组件', link: '/md/fastproject/localComponentsExample' },
              { text: '其他方法', link: '/md/fastproject/otherMethodExample' },
            ]
          },
          {
            text: '项目案例',
            items: [
              { text: '综合大场景案例', link: '/md/fastproject/buildingProject' },
              { text: '城市管网项目', link: '/md/fastproject/pipeProject' },
            ]
          },

        ]
      },
      // {
      //   text: '在线示例项目', link: '/docs/md/fastproject/index'
      // },
      {
        text: '1.4.8', items: [
          { text: '版本更新', link: 'http://192.168.0.6:3000/cxyjy_zhjz/npm-unicore-sdk/commits/branch/main' }
        ]
      }
    ],
    search: {
      provider: 'local'
    },
    footer: {
      message: 'v0.1.0 created by 智慧建造研究部',
      copyright: 'Copyright © 2024-present 广州粤建三和软件股份有限公司'
    },
    sidebar: [
      {
        text: '简介',
        items: [
          { text: '通用图形引擎是什么？', link: '/md/whatisit' },
          { text: '为什么选择通用图形引擎？', link: '/md/whyit' },
          { text: '快速开始', link: '/md/faststart' },
          { text: '通用图形引擎配置', link: '/md/setting' },
          { text: '工具栏配置', link: '/md/toolbarstart' },
        ],
        collapsed: false
      },
      {
        text: '快速上手',
        items: [
          { text: '阅前提醒', link: '/md/fastexample/whatisit' },
          {
            text: '视角与模型定位',
            items: [
              { text: '定位到某个经纬度坐标', link: '/md/fastexample/buildingPosition' },
              { text: '视角锁定某一点', link: '/md/fastexample/lockTo' },
              { text: '单击鼠标获取经纬度坐标', link: '/md/fastexample/screen2axis' },
              { text: '修改模型位置', link: '/md/fastexample/changeModelPos' },
              { text: '修改 3DTiles 模型位置', link: '/md/fastexample/change3DTilesPos' },
            ],
            collapsed: false
          },
          {
            text: '模型加载',
            items: [
              { text: '根据 URL 加载 3DTiles 模型', link: '/md/fastexample/createTileset' },
              { text: '根据 URL 加载 glTF 模型', link: '/md/fastexample/addGltf' },
              { text: '纯 BIM 模式加载模型', link: '/md/fastexample/initOnlyBimMode' },
            ],
            collapsed: false
          },
          {
            text: '模型操作',
            items: [
              { text: '模型剖切', link: '/md/fastexample/digModel' },
              { text: '模型剪切', link: '/md/fastexample/cutModel' },
              { text: '模型右键菜单（含 GIS/BIM 场景切换）', link: '/md/fastexample/setTilesRightClickMenu' },
              { text: '模型压平', link: '/md/fastexample/flat' },
              { text: '模型显隐功能', link: '/md/fastexample/setPrimitivesShow' },
            ],
            collapsed: false
          },
          {
            text: '动画与粒子效果',
            items: [
              { text: '模型贴地移动', link: '/md/fastexample/updatePosition' },
              { text: '类雪花粒子效果', link: '/md/fastexample/createSnow' },
              { text: '类火焰粒子效果', link: '/md/fastexample/createFire' },
              { text: '类爆炸粒子效果', link: '/md/fastexample/createBoom' },
              { text: '类烟雾粒子效果', link: '/md/fastexample/createSmoke' },
            ],
            collapsed: false
          },
          {
            text: '场景操作',
            items: [
              { text: '第一人称自由漫游', link: '/md/fastexample/startTour' },
              { text: '按给定路径漫游', link: '/md/fastexample/startTweensTour' },
              { text: '开启地下模式', link: '/md/fastexample/undergroundMode' },
              { text: '开启阴影遮挡', link: '/md/fastexample/shadowChange' },
              { text: '关闭深度检测', link: '/md/fastexample/depthTestAgainstTerrain' },
              { text: '地形挖地（旧）', link: '/md/fastexample/dig' },
              { text: '地形挖地（新）', link: '/md/fastexample/terrainClip' },
              { text: '创建动态线条', link: '/md/fastexample/createMaterialLine' },
              { text: '绘制多段线条', link: '/md/fastexample/paintLine' },
              { text: '绘制墙体', link: '/md/fastexample/paintWall' },
              { text: '根据坐标创建一个标签', link: '/md/fastexample/createTip' },
              { text: '根据坐标创建一个图片标签', link: '/md/fastexample/createImgTip' },
              { text: '将HTML元素作为标签', link: '/md/fastexample/createHtmlTip' },
            ],
            collapsed: false
          },
        ],
        collapsed: false
      },
      {
        text: '示例组件',
        items: [
          { text: '这是什么？', link: '/md/fastcomponents/whatisit' },
          {
            text: '本地组件',
            items: [
              { text: '图层管理树组件', link: '/md/fastcomponents/LayerControlSet' },
              { text: '模型剖切组件', link: '/md/fastcomponents/ModelCutSet' },
              { text: 'BIM 场景视图盒子组件', link: '/md/fastcomponents/BimCubeSet' },
              { text: '路径漫游控制组件', link: '/md/fastcomponents/CreateTourSet' },
              { text: 'GIS / BIM 切换组件', link: '/md/fastcomponents/GisBimSwitch' },
              { text: '模型信息树组件', link: '/md/fastcomponents/ModelTreeSet' },
              { text: '模型属性窗口组件', link: '/md/fastcomponents/modelPropertyInfo' },
              { text: '模型加载进度条组件', link: '/md/fastcomponents/loadModelInfo' },
              { text: '模型显隐控制组件', link: '/md/fastcomponents/showModelSet' },
              { text: '多底图分屏组件', link: '/md/fastcomponents/LayerSplitSet' },
            ],
            collapsed: false
          },
          {
            text: '服务端组件',
            items: [
              { text: '标签管理组件', link: '/md/fastcomponents/labelManageSet' },
              { text: '区域绘制组件', link: '/md/fastcomponents/paintModelSet' },
              { text: '简易建模组件', link: '/md/fastcomponents/createModelSet' },
            ],
            collapsed: false
          },
        ],
        collapsed: false
      },
      {
        text: '其他工具',
        items: [
          {
            text: '坐标换算',
            items: [
              { text: '屏幕坐标转经纬度', link: '/md/fasttool/screen2axis' },
              { text: 'Cartographic 转经纬度', link: '/md/fasttool/cartographic2axis' },
              { text: 'Cartesian3 转经纬度', link: '/md/fasttool/cartesian3_2axis' },
              { text: '经纬度转 Cartographic', link: '/md/fasttool/axis2cartographic' },
              { text: '经纬度转换为 Cartesian3', link: '/md/fasttool/axis2cartesian3' },
              { text: '经纬度转屏幕坐标', link: '/md/fasttool/axis2screen' },
            ],
            collapsed: false
          },
          {
            text: '本地数据库',
            items: [
              { text: '内置IndexedDB数据库', link: '/md/fasttool/gisdatabase' },
            ],
            collapsed: false
          }, {
            text: '其他方法',
            items: [
              { text: '飞行定位到模型', link: '/md/fasttool/zoomTo' },
              { text: '帧率显示', link: '/md/fasttool/debugShowFramesPerSecond' },
              { text: '全局光照设置', link: '/md/fasttool/enableLighting' },
              { text: '分辨率设置', link: '/md/fasttool/resolutionScale' },
              { text: '天体、雾、大气、光照详细设置', link: '/md/fasttool/setMoonSunFog' },
              { text: '全屏展示', link: '/md/fasttool/fullScreen' },
              { text: '首屏加载动画', link: '/md/fasttool/loadingScreen' },
            ],
            collapsed: false
          },
        ],
        collapsed: false
      }, {
        text: 'API文档',
        items: [
          { text: 'Model', link: '/md/fastapi/Model' },
          { text: 'Position', link: '/md/fastapi/Position' },
          { text: 'Tip', link: '/md/fastapi/Tip' },
          { text: 'Interact', link: '/md/fastapi/Interact' },
          { text: 'Database', link: '/md/fastapi/Database' },
          { text: 'Animation', link: '/md/fastapi/Animation' },
          { text: 'Particle', link: '/md/fastapi/Particle' },
          { text: 'Flat', link: '/md/fastapi/Flat' },
          { text: 'Tour', link: '/md/fastapi/Tour' },
          { text: 'TerrainClip', link: '/md/fastapi/TerrainClip' },
          { text: 'Service', link: '/md/fastapi/Service' },
        ],
        collapsed: false
      },
    ],

    socialLinks: [
      { icon: 'npm', link: 'https://www.npmjs.com/package/unicore-sdk' }
    ]
  }
})
