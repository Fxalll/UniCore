---
outline: deep
---

# 快速开始

## 安装

### 前置准备

UniCore 可以单独使用（可参考 [快速上手](./fastexample/whatisit.md) 进行项目的快速搭建），也可以安装到现有项目中。在这两种情况下，都可以使用以下方式安装它：

```sh
npm install unicore-sdk
```

以Vue2.0框架为例，搭建框架后，在vue.config.js添加如下配置：

```js
const { defineConfig } = require('@vue/cli-service')
const path = require("path")
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const CopyWebpackPlugin = require("copy-webpack-plugin")
const cesiumSource = 'node_modules/cesium/Source';
const cesiumWorkers = '../Build/Cesium/Workers';

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [new NodePolyfillPlugin()],
    resolve: {
      fallback: {
        "url": false,
        "http": false,
        "https": false,
        "zlib": false
      }
    },
    plugins: [
      // Copy Cesium Assets, Widgets, and Workers to a static directory
      new CopyWebpackPlugin({
        patterns: [
          { from: path.join(cesiumSource, cesiumWorkers), to: 'Workers' },
          { from: path.join(cesiumSource, 'Assets'), to: 'Assets' },
          { from: path.join(cesiumSource, 'Widgets'), to: 'Widgets' },
          { from: path.join(cesiumSource, 'ThirdParty'), to: 'ThirdParty' }
        ]
      }),
    ],
    module: {
      unknownContextRegExp: /^('|')\.\/.*?\1$/,
      unknownContextCritical: false
    }
  }
})
```

在Vue入口文件引入通用图形引擎SDK及配置文件、样式文件：

```js
import { UniCore } from 'unicore-sdk'
import { config } from 'unicore-sdk/unicore.config'
import 'unicore-sdk/Widgets/widgets.css'
```

在初始化方法调用（accessToken可联系开发者获取Token获取方法）：
```js
// 初始化unicore
let uniCore = new UniCore(config, accessToken);
uniCore.init("unicoreContainer");
```
accessToken 可联系开发者获取 Token 获取方法，下面为测试 token ：

```md
测试Token：eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxNjEwMzI4My01MjBmLTQzYzktOGZiMS0wMDRhZjE0N2IyMGIiLCJpZCI6MTc1NzkyLCJpYXQiOjE3MTM3NzQ3OTh9.zU-R4MNvHr8rvn1v28PQfDImyutnpPF2lmEgGeSPckQ
```
在前端界面新增一段用于存放通用图形引擎显示区域的 div （通过 css 样式修改可以将通用图形引擎显示区域调整为全屏，这里展示未作修改的样式）：

```js
<div id="unicoreContainer"></div>
```

运行命令npm run serve，即可看到通用图形引擎SDK已初始化完毕。

![Alt text](image.png)

为了让通用图形引擎显示区域更好地展示，建议为 div 设置 css 样式，如下例：

```css
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

### 温馨提示

鉴于 Vue 的实现原理，`不建议将 viewer 放入 Vue 中的 store、data、computed 内`，会导致通用图形引擎的展示帧率严重下降。你可以直接使用 `uniCore.viewer` 或 `window.viewer` 的方式获取 viewer。 