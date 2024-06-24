# UniCore 配置

### 进入 UniCore 配置文件

你可以按着 `ctrl` 键并左键单击 'unicore-sdk/unicore.config' 以进入 UniCore 配置文件，如下图：

![Alt text](image-3.png)

你也可以在 node_modules/unicore/unicore.config 处找到 UniCore 配置文件。

`注意：修改配置文件后需重新执行命令启动项目以更新更改。`

### 默认参数

UniCore 配置文件如下所示，可根据需求调整。

比如，UniCore 为保证兼容性，默认使用 WebGL 1.0 运行。你可以在配置文件中将 requestWebgl2 设为 `True`，将 requestWebgl1 设为 `False` 以开启 WebGL 2.0。

```js

export let config = {
  animation: false, //是否显示动画控件
  shouldAnimate: true,
  homeButton: false, //是否显示Home按钮
  fullscreenButton: false, //是否显示全屏按钮
  baseLayerPicker: false, //是否显示图层选择控件
  geocoder: false, //是否显示地名查找控件
  timeline: false, //是否显示时间线控件
  sceneModePicker: false, //是否显示投影方式控件
  navigationHelpButton: false, //是否显示帮助信息控件
  infoBox: false, //是否显示点击要素之后显示的信息
  requestRenderMode: false, //启用请求渲染模式
  scene3DOnly: false, //每个几何实例将只能以3D渲染以节省GPU内存
  sceneMode: 3, //初始场景模式 1 2D模式 2 2D循环模式 3 3D模式  Cesium.SceneMode
  fullscreenElement: document.body, //全屏时渲染的HTML元素 暂时没发现用处
  shadows: false, //是否启用阴影渲染，默认为false
  maximumRenderTimeChange: 0, // 最大帧率限制，表示相邻两帧之间最多允许刷新的时间差（毫秒），如果超过该值则自动降低帧率。默认为0，表示不限制帧率。
  // maximumRenderTimeChange: 0.058, // 最大帧率限制，表示相邻两帧之间最多允许刷新的时间差（毫秒），如果超过该值则自动降低帧率。默认为0，表示不限制帧率。
  // msaaSamples: 4, //不作设置性能能更高。默认情况下，这个属性被设置为4，表示每个像素采样4次，以获得更平滑的边缘效果。如果您将这个值设置为0或1，将禁用MSAA，将不会进行多重采样，从而降低了渲染质量。

  layerConfig: {
    url: "http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
    layer: "tdtVecBasicLayer",
    style: "default",
    format: "image/png",
    tileMatrixSetID: "GoogleMapsCompatible",
  },
  renderConfig: {
    show: true,
    alpha: 1
  },
  contextOptions: {
    webgl: {
      alpha: true, //表明canvas包含一个alpha缓冲区
      depth: true, //表明绘制缓冲区包含一个深度至少为16位的缓冲区
      stencil: true, //表明绘制缓冲区包含一个深度至少为8为的模板缓冲区
      antialias: false, //表明是否开启抗锯齿
      premultipliedAlpha: true, //表明排版引擎将假设绘制缓冲区包含预混合alpha通道
      preserveDrawingBuffer: true, //如果为true，缓冲区将不会被清除，会保存直到被清除或被覆盖
      powerPreference: "low-power", //指示浏览器在运行webgl上下文时使用相应的GPU电源配置
      failIfMajorPerformanceCaveat: true, //表明在一个系统性能低的环境是否创建该上下文的boolean值
    },
    allowTextureFilterAnisotropic: true,
    requestWebgl1: true, //设置使用Webgl1
    // requestWebgl2: true, //设置使用Webgl2
  },

}
```

