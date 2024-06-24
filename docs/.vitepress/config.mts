import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "通用图形引擎",
  description: "为 GIS + BIM 应用而生的通用图形引擎",
  themeConfig: {
    lastUpdated: {
      text: '最近更新于',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },
    nav: [
      { text: '首页', link: '/' },
      { text: '示例', link: '/md/fastcomponents/whatisit' },
      { text: '1.0.2', link: 'https://www.npmjs.com/package/unicore-sdk' }
    ],
    search: {
      provider: 'local'
    },
    footer: {
      message: 'v0.1.0 created by 3hljk',
      copyright: 'Copyright © 2024-present 广州粤建三和软件股份有限公司'
    },
    sidebar: [
      {
        text: '简介',
        items: [
          { text: 'UniCore 是什么？', link: '/md/whatisit' },
          { text: '为什么选择 UniCore？', link: '/md/whyit' },
          { text: '快速开始', link: '/md/faststart' },
          { text: 'UniCore 配置', link: '/md/setting' },
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
            ],
            collapsed: false
          },
          {
            text: '模型交互',
            items: [
              { text: '模型剪切', link: '/md/fastexample/cutModel' },
              { text: '3DTiles 模型开启交互事件', link: '/md/fastexample/setTilesRightClickMenu' },
              { text: '模型压平', link: '/md/fastexample/flat' },
            ],
            collapsed: false
          },
          {
            text: '场景操作',
            items: [
              { text: '开启地下模式', link: '/md/fastexample/undergroundMode' },
              { text: '开启阴影遮挡', link: '/md/fastexample/shadowChange' },
              { text: '关闭深度检测', link: '/md/fastexample/depthTestAgainstTerrain' },
              { text: '地形挖地（旧）', link: '/md/fastexample/dig' },
              { text: '地形挖地（新）', link: '/md/fastexample/terrainClip' },
              { text: '创建动态线条', link: '/md/fastexample/createMaterialLine' },
              { text: '绘制多段线条', link: '/md/fastexample/paintLine' },
              { text: '绘制墙体', link: '/md/fastexample/paintWall' },
              { text: '根据坐标创建一个标签', link: '/md/fastexample/createTip' },
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
              { text: 'GIS / BIM 切换组件', link: '/md/fastcomponents/GisBimSwitch' },
              { text: '3DTiles 模型信息树组件', link: '/md/fastcomponents/ModelTreeSet' },
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
              { text: '天体、雾等特效', link: '/md/fasttool/setMoonSunFog' },
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
          { text: 'Flat', link: '/md/fastapi/Flat' },
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
