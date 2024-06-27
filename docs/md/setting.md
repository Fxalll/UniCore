---
outline: deep
---

# 通用图形引擎配置

### 进入 UniCore SDK 配置文件

你可以按着 `ctrl` 键并左键单击 'unicore-sdk/unicore.config' 以进入 UniCore SDK 配置文件，如下图：

![Alt text](image-3.png)

你也可以在 node_modules/unicore-sdk/unicore.config 处找到 UniCore SDK 配置文件。

`注意：修改配置文件后需重新执行命令启动项目以更新更改。`

### 默认参数

UniCore SDK 配置文件如下所示，可根据需求调整。

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
    // cesium状态下允许canvas转图片convertToImage
    webgl: {
      alpha: true, //表明canvas包含一个alpha缓冲区
      depth: true, //表明绘制缓冲区包含一个深度至少为16位的缓冲区
      stencil: true, //表明绘制缓冲区包含一个深度至少为8为的模板缓冲区
      antialias: false, //表明是否开启抗锯齿
      premultipliedAlpha: true, //表明排版引擎将假设绘制缓冲区包含预混合alpha通道
      preserveDrawingBuffer: true, //如果为true，缓冲区将不会被清除，会保存直到被清除或被覆盖
      powerPreference: "high-performance", //指示浏览器在运行webgl上下文时使用相应的GPU电源配置 "default" | "low-power" | "high-performance"
      failIfMajorPerformanceCaveat: true, //表明在一个系统性能低的环境是否创建该上下文的boolean值
    },
    allowTextureFilterAnisotropic: true, // 如果为 true，则在纹理采样期间使用各向异性过滤
    requestWebgl1: true, //设置使用Webgl1
    // requestWebgl2: true, //设置使用Webgl2
  },

}
```

### 更多设置

你可参考以下 JsDoc 在UniCore SDK 配置文件中添加更多参数：

```js
/**
 * Initialization options for the Viewer constructor
 * @property [animation = true] - If set to false, the Animation widget will not be created.
 * @property [baseLayerPicker = true] - If set to false, the BaseLayerPicker widget will not be created.
 * @property [fullscreenButton = true] - If set to false, the FullscreenButton widget will not be created.
 * @property [vrButton = false] - If set to true, the VRButton widget will be created.
 * @property [geocoder = true] - If set to false, the Geocoder widget will not be created.
 * @property [homeButton = true] - If set to false, the HomeButton widget will not be created.
 * @property [infoBox = true] - If set to false, the InfoBox widget will not be created.
 * @property [sceneModePicker = true] - If set to false, the SceneModePicker widget will not be created.
 * @property [selectionIndicator = true] - If set to false, the SelectionIndicator widget will not be created.
 * @property [timeline = true] - If set to false, the Timeline widget will not be created.
 * @property [navigationHelpButton = true] - If set to false, the navigation help button will not be created.
 * @property [navigationInstructionsInitiallyVisible = true] - True if the navigation instructions should initially be visible, or false if the should not be shown until the user explicitly clicks the button.
 * @property [scene3DOnly = false] - When <code>true</code>, each geometry instance will only be rendered in 3D to save GPU memory.
 * @property [shouldAnimate = false] - <code>true</code> if the clock should attempt to advance simulation time by default, <code>false</code> otherwise.  This option takes precedence over setting {@link Viewer#clockViewModel}.
 * @property [clockViewModel = new ClockViewModel(clock)] - The clock view model to use to control current time.
 * @property [selectedImageryProviderViewModel] - The view model for the current base imagery layer, if not supplied the first available base layer is used.  This value is only valid if `baseLayerPicker` is set to true.
 * @property [imageryProviderViewModels = createDefaultImageryProviderViewModels()] - The array of ProviderViewModels to be selectable from the BaseLayerPicker.  This value is only valid if `baseLayerPicker` is set to true.
 * @property [selectedTerrainProviderViewModel] - The view model for the current base terrain layer, if not supplied the first available base layer is used.  This value is only valid if `baseLayerPicker` is set to true.
 * @property [terrainProviderViewModels = createDefaultTerrainProviderViewModels()] - The array of ProviderViewModels to be selectable from the BaseLayerPicker.  This value is only valid if `baseLayerPicker` is set to true.
 * @property [baseLayer = ImageryLayer.fromWorldImagery()] - The bottommost imagery layer applied to the globe. If set to <code>false</code>, no imagery provider will be added. This value is only valid if `baseLayerPicker` is set to false.
 * @property [terrainProvider = new EllipsoidTerrainProvider()] - The terrain provider to use
 * @property [terrain] - A terrain object which handles asynchronous terrain provider. Can only specify if options.terrainProvider is undefined.
 * @property [skyBox] - The skybox used to render the stars.  When <code>undefined</code>, the default stars are used. If set to <code>false</code>, no skyBox, Sun, or Moon will be added.
 * @property [skyAtmosphere] - Blue sky, and the glow around the Earth's limb.  Set to <code>false</code> to turn it off.
 * @property [fullscreenElement = document.body] - The element or id to be placed into fullscreen mode when the full screen button is pressed.
 * @property [useDefaultRenderLoop = true] - True if this widget should control the render loop, false otherwise.
 * @property [targetFrameRate] - The target frame rate when using the default render loop.
 * @property [showRenderLoopErrors = true] - If true, this widget will automatically display an HTML panel to the user containing the error, if a render loop error occurs.
 * @property [useBrowserRecommendedResolution = true] - If true, render at the browser's recommended resolution and ignore <code>window.devicePixelRatio</code>.
 * @property [automaticallyTrackDataSourceClocks = true] - If true, this widget will automatically track the clock settings of newly added DataSources, updating if the DataSource's clock changes.  Set this to false if you want to configure the clock independently.
 * @property [contextOptions] - Context and WebGL creation properties passed to {@link Scene}.
 * @property [sceneMode = SceneMode.SCENE3D] - The initial scene mode.
 * @property [mapProjection = new GeographicProjection()] - The map projection to use in 2D and Columbus View modes.
 * @property [globe = new Globe(mapProjection.ellipsoid)] - The globe to use in the scene.  If set to <code>false</code>, no globe will be added and the sky atmosphere will be hidden by default.
 * @property [orderIndependentTranslucency = true] - If true and the configuration supports it, use order independent translucency.
 * @property [creditContainer] - The DOM element or ID that will contain the {@link CreditDisplay}.  If not specified, the credits are added to the bottom of the widget itself.
 * @property [creditViewport] - The DOM element or ID that will contain the credit pop up created by the {@link CreditDisplay}.  If not specified, it will appear over the widget itself.
 * @property [dataSources = new DataSourceCollection()] - The collection of data sources visualized by the widget.  If this parameter is provided,
 *                               the instance is assumed to be owned by the caller and will not be destroyed when the viewer is destroyed.
 * @property [shadows = false] - Determines if shadows are cast by light sources.
 * @property [terrainShadows = ShadowMode.RECEIVE_ONLY] - Determines if the terrain casts or receives shadows from light sources.
 * @property [mapMode2D = MapMode2D.INFINITE_SCROLL] - Determines if the 2D map is rotatable or can be scrolled infinitely in the horizontal direction.
 * @property [projectionPicker = false] - If set to true, the ProjectionPicker widget will be created.
 * @property [blurActiveElementOnCanvasFocus = true] - If true, the active element will blur when the viewer's canvas is clicked. Setting this to false is useful for cases when the canvas is clicked only for retrieving position or an entity data without actually meaning to set the canvas to be the active element.
 * @property [requestRenderMode = false] - If true, rendering a frame will only occur when needed as determined by changes within the scene. Enabling reduces the CPU/GPU usage of your application and uses less battery on mobile, but requires using {@link Scene#requestRender} to render a new frame explicitly in this mode. This will be necessary in many cases after making changes to the scene in other parts of the API. See {@link https://cesium.com/blog/2018/01/24/cesium-scene-rendering-performance/|Improving Performance with Explicit Rendering}.
 * @property [maximumRenderTimeChange = 0.0] - If requestRenderMode is true, this value defines the maximum change in simulation time allowed before a render is requested. See {@link https://cesium.com/blog/2018/01/24/cesium-scene-rendering-performance/|Improving Performance with Explicit Rendering}.
 * @property [depthPlaneEllipsoidOffset = 0.0] - Adjust the DepthPlane to address rendering artefacts below ellipsoid zero elevation.
 * @property [msaaSamples = 1] - If provided, this value controls the rate of multisample antialiasing. Typical multisampling rates are 2, 4, and sometimes 8 samples per pixel. Higher sampling rates of MSAA may impact performance in exchange for improved visual quality. This value only applies to WebGL2 contexts that support multisample render targets.
 */
```