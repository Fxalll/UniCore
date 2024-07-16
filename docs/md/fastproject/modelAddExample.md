---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "快速上手"
  text: "模型加载"
  tagline: 使用 UniCore 打造的应用示例
  image: { src: ""}
  actions:
  - theme: brand
    text: ↓ 模型操作
    link: md/fastproject/modelChangeExample
  - theme: alt
    text: ↑ 视角与模型定位
    link: md/fastproject/positionExample

features:
  - title: 根据 URL 加载 3DTiles 模型
    icon: {src: './image-7.png', width: '4000px'}
    link: 'http://192.168.4.56:8091/?id=createTileset'
    linkText: '点击查看在线示例'
  - title: 根据 URL 加载 glTF 模型
    icon: {src: './image-8.png', width: '4000px'}
    link: 'http://192.168.4.56:8091/?id=addGltf'
    linkText: '点击查看在线示例'
---
