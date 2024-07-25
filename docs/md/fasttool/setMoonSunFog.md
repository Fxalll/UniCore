---
outline: deep
---

# 天体、雾、大气、光照详细设置

## 其他方法 - moon/fog/sun/skyBox

### 方法介绍

UniCore viewer 提供 moon/fog/sun/skyBox 方法用于设置天体、雾等特效的开关。

### 代码示例

```js
// 关闭太阳，月亮，天空盒，雾等相关特效
uniCore.viewer.scene.moon.show = false;
uniCore.viewer.scene.fog.enabled = false;
uniCore.viewer.scene.sun.show = false;
uniCore.viewer.scene.skyBox.show = false;
```

### 详细设置

你可使用更详尽的设置面板进行调整，在参数后的括号内代表该参数的 API 方法。

### 在线演示

点击 [在线链接](http://192.168.4.56:8091/?id=setMoonSunFog) 以查看在线演示。

其中的 `scene` 、 `globe` 、 `skyAtmosphere` 可使用如下方法获取。

```js
const viewer = uniCore.viewer;
const scene = viewer.scene;
const globe = scene.globe;
const skyAtmosphere = scene.skyAtmosphere;
```

![Alt text](image-1.png)

![Alt text](image-2.png)

#### 相关代码

以下代码可直接拷贝至项目使用。

```js
<template>
  <div id="unicoreContainer">
    <div id="toolbar">
      <div class="tab">
        <button
          class="tablinks active"
          onclick="setActiveTab(event, 'ground-table')"
        >
          地面大气
        </button>
        <button class="tablinks" onclick="setActiveTab(event, 'sky-table')">
          天空大气
        </button>
      </div>
      <table id="ground-table" class="tabcontent">
        <tbody>
          <tr>
            <th colspan="2">场景雾设置</th>
          </tr>
          <tr>
            <td>雾(scene.fog.enabled)</td>
            <td>
              <input type="checkbox" data-bind="checked: showFog" />
            </td>
          </tr>
          <tr>
            <td>雾最小亮度(scene.fog.minimumBrightness)</td>
            <td>
              <input
                type="range"
                min="0.0"
                max="1.0"
                step="0.01"
                data-bind="value: minimumBrightness, valueUpdate: 'input'"
              />
              <input
                class="numinput"
                type="number"
                size="5"
                data-bind="value: minimumBrightness, enable: showFog"
              />
            </td>
          </tr>
          <tr>
            <td>雾密度(scene.fog.density)</td>
            <td>
              <input
                type="range"
                min="0.5"
                max="2.0"
                step="0.1"
                data-bind="value: density, valueUpdate: 'input'"
              />
              <input
                class="numinput"
                type="number"
                size="5"
                data-bind="value: density, enable: showFog"
              />
            </td>
          </tr>
          <tr>
            <th colspan="2">地面大气设置</th>
          </tr>
          <tr>
            <td>地面大气(globe.showGroundAtmosphere)</td>
            <td>
              <input
                type="checkbox"
                data-bind="checked: showGroundAtmosphere"
              />
            </td>
          </tr>
          <tr>
            <td>光强度(globe.atmosphereLightIntensity)</td>
            <td>
              <input
                type="range"
                min="0.0"
                max="100.0"
                step="1"
                data-bind="value: groundAtmosphereLightIntensity, valueUpdate: 'input', enable: (showGroundAtmosphere || showFog)"
              />
              <input
                class="numinput"
                type="number"
                size="5"
                data-bind="value: groundAtmosphereLightIntensity"
              />
            </td>
          </tr>
          <tr>
            <td>瑞利系数R(globe.atmosphereRayleighCoefficient.x)</td>
            <td>
              <input
                type="range"
                min="0.0"
                max="100.0"
                step="1"
                data-bind="value: groundAtmosphereRayleighCoefficientR, valueUpdate: 'input', enable: (showGroundAtmosphere || showFog)"
              />
              <input
                class="numinput"
                type="number"
                size="5"
                data-bind="value: groundAtmosphereRayleighCoefficientR"
              />
            </td>
          </tr>
          <tr>
            <td>瑞利系数G(globe.atmosphereRayleighCoefficient.y)</td>
            <td>
              <input
                type="range"
                min="0.0"
                max="100.0"
                step="1"
                data-bind="value: groundAtmosphereRayleighCoefficientG, valueUpdate: 'input', enable: (showGroundAtmosphere || showFog)"
              />
              <input
                class="numinput"
                type="number"
                size="5"
                data-bind="value: groundAtmosphereRayleighCoefficientG"
              />
            </td>
          </tr>
          <tr>
            <td>瑞利系数B(globe.atmosphereRayleighCoefficient.z)</td>
            <td>
              <input
                type="range"
                min="0.0"
                max="100.0"
                step="1"
                data-bind="value: groundAtmosphereRayleighCoefficientB, valueUpdate: 'input', enable: (showGroundAtmosphere || showFog)"
              />
              <input
                class="numinput"
                type="number"
                size="5"
                data-bind="value: groundAtmosphereRayleighCoefficientB"
              />
            </td>
          </tr>
          <tr>
            <td>米氏系数(globe.atmosphereMieCoefficient)</td>
            <td>
              <input
                type="range"
                min="0.0"
                max="100.0"
                step="1"
                data-bind="value: groundAtmosphereMieCoefficient, valueUpdate: 'input', enable: (showGroundAtmosphere || showFog)"
              />
              <input
                class="numinput"
                type="number"
                size="5"
                data-bind="value: groundAtmosphereMieCoefficient"
              />
            </td>
          </tr>
          <tr>
            <td>瑞利标高(globe.atmosphereRayleighScaleHeight)</td>
            <td>
              <input
                type="range"
                min="0"
                max="2e4"
                step="1e2"
                data-bind="value: groundAtmosphereRayleighScaleHeight, valueUpdate: 'input', enable: (showGroundAtmosphere || showFog)"
              />
              <input
                class="numinput"
                type="number"
                size="5"
                data-bind="value: groundAtmosphereRayleighScaleHeight"
              />
            </td>
          </tr>
          <tr>
            <td>米氏等级高度(globe.atmosphereMieScaleHeight)</td>
            <td>
              <input
                type="range"
                min="0"
                max="1e4"
                step="1e2"
                data-bind="value: groundAtmosphereMieScaleHeight, valueUpdate: 'input', enable: (showGroundAtmosphere || showFog)"
              />
              <input
                class="numinput"
                type="number"
                size="5"
                data-bind="value: groundAtmosphereMieScaleHeight"
              />
            </td>
          </tr>
          <tr>
            <td>米氏各向异性(globe.atmosphereMieAnisotropy)</td>
            <td>
              <input
                type="range"
                min="-1.0"
                max="1.0"
                step="0.1"
                data-bind="value: groundAtmosphereMieAnisotropy, valueUpdate: 'input', enable: (showGroundAtmosphere || showFog)"
              />
              <input
                class="numinput"
                type="number"
                size="5"
                data-bind="value: groundAtmosphereMieAnisotropy"
              />
            </td>
          </tr>
          <tr>
            <td>色相(globe.atmosphereHueShift)</td>
            <td>
              <input
                type="range"
                min="-1"
                max="1"
                step="0.01"
                data-bind="value: groundHueShift, valueUpdate: 'input', enable: (showGroundAtmosphere || showFog)"
              />
              <input type="text" size="5" data-bind="value: groundHueShift" />
            </td>
          </tr>
          <tr>
            <td>饱和度(globe.atmosphereSaturationShift)</td>
            <td>
              <input
                type="range"
                min="-1"
                max="1"
                step="0.01"
                data-bind="value: groundSaturationShift, valueUpdate: 'input', enable: (showGroundAtmosphere || showFog)"
              />
              <input
                type="text"
                size="5"
                data-bind="value: groundSaturationShift"
              />
            </td>
          </tr>
          <tr>
            <td>亮度(skyAtmosphere.brightnessShift)</td>
            <td>
              <input
                type="range"
                min="-1"
                max="1"
                step="0.01"
                data-bind="value: skyBrightnessShift, valueUpdate: 'input', enable: (showGroundAtmosphere || showFog)"
              />
              <input
                type="text"
                size="5"
                data-bind="value: skyBrightnessShift"
              />
            </td>
          </tr>
          <tr>
            <td>全局光照(globe.enableLighting)</td>
            <td>
              <input
                type="checkbox"
                data-bind="checked: enableLighting, enable: (showGroundAtmosphere || showFog)"
              />
            </td>
          </tr>
          <tr>
            <td>照明淡出距离(globe.lightingFadeOutDistance)</td>
            <td>
              <input
                type="range"
                min="1e6"
                max="1e8"
                step="1e6"
                data-bind="value: lightingFadeOutDistance, valueUpdate: 'input', enable: showGroundAtmosphere"
              />
              <input
                type="text"
                size="10"
                data-bind="value: lightingFadeOutDistance"
              />
            </td>
          </tr>
          <tr>
            <td>灯光渐变距离(globe.lightingFadeInDistance)</td>
            <td>
              <input
                type="range"
                min="1e6"
                max="1e8"
                step="1e6"
                data-bind="value: lightingFadeInDistance, valueUpdate: 'input', enable: showGroundAtmosphere"
              />
              <input
                type="text"
                size="10"
                data-bind="value: lightingFadeInDistance"
              />
            </td>
          </tr>
          <tr>
            <td>夜间淡出距离(globe.nightFadeOutDistance)</td>
            <td>
              <input
                type="range"
                min="1e6"
                max="1e8"
                step="1e6"
                data-bind="value: nightFadeOutDistance, valueUpdate: 'input', enable: (showGroundAtmosphere &amp;&amp; enableLighting)"
              />
              <input
                type="text"
                size="10"
                data-bind="value: nightFadeOutDistance"
              />
            </td>
          </tr>
          <tr>
            <td>夜间淡入距离(globe.nightFadeInDistance)</td>
            <td>
              <input
                type="range"
                min="1e6"
                max="1e8"
                step="1e6"
                data-bind="value: nightFadeInDistance, valueUpdate: 'input', enable: (showGroundAtmosphere &amp;&amp; enableLighting)"
              />
              <input
                type="text"
                size="10"
                data-bind="value: nightFadeInDistance"
              />
            </td>
          </tr>
          <tr>
            <td>动态大气(globe.dynamicAtmosphereLighting)</td>
            <td>
              <input
                type="checkbox"
                data-bind="checked: dynamicLighting, enable: (showGroundAtmosphere || showFog)"
              />
            </td>
          </tr>
          <tr>
            <td>太阳(globe.dynamicAtmosphereLightingFromSun)</td>
            <td>
              <input
                type="checkbox"
                data-bind="checked: dynamicLightingFromSun, enable: (showGroundAtmosphere || showFog)"
              />
            </td>
          </tr>
          <tr>
            <td>地面半透明(globe.translucency)</td>
            <td>
              <input type="checkbox" data-bind="checked: groundTranslucency" />
            </td>
          </tr>

          <tr>
            <td>HDR(scene.highDynamicRange)</td>
            <td>
              <input type="checkbox" data-bind="checked: hdr" />
            </td>
          </tr>
        </tbody>
      </table>
      <table id="sky-table" class="tabcontent" style="display: none">
        <tbody>
          <tr>
            <th colspan="2">天空大气设置</th>
          </tr>
          <tr>
            <td>天空大气(skyAtmosphere.show)</td>
            <td>
              <input type="checkbox" data-bind="checked: showSkyAtmosphere" />
            </td>
          </tr>
          <tr>
            <td>光强度(skyAtmosphere.atmosphereLightIntensity)</td>
            <td>
              <input
                type="range"
                min="0.0"
                max="100.0"
                step="1"
                data-bind="value: skyAtmosphereLightIntensity, valueUpdate: 'input', enable: (showSkyAtmosphere)"
              />
              <input
                class="numinput"
                type="number"
                size="5"
                data-bind="value: skyAtmosphereLightIntensity"
              />
            </td>
          </tr>

          <tr>
            <td>瑞利系数R(skyAtmosphere.atmosphereRayleighCoefficient.x)</td>
            <td>
              <input
                type="range"
                min="0.0"
                max="100.0"
                step="1"
                data-bind="value: skyAtmosphereRayleighCoefficientR, valueUpdate: 'input', enable: (showSkyAtmosphere)"
              />
              <input
                class="numinput"
                type="number"
                size="5"
                data-bind="value: skyAtmosphereRayleighCoefficientR"
              />
            </td>
          </tr>
          <tr>
            <td>瑞利系数G(skyAtmosphere.atmosphereRayleighCoefficient.y)</td>
            <td>
              <input
                type="range"
                min="0.0"
                max="100.0"
                step="1"
                data-bind="value: skyAtmosphereRayleighCoefficientG, valueUpdate: 'input', enable: (showSkyAtmosphere)"
              />
              <input
                class="numinput"
                type="number"
                size="5"
                data-bind="value: skyAtmosphereRayleighCoefficientG"
              />
            </td>
          </tr>
          <tr>
            <td>瑞利系数B(skyAtmosphere.atmosphereRayleighCoefficient.z)</td>
            <td>
              <input
                type="range"
                min="0.0"
                max="100.0"
                step="1"
                data-bind="value: skyAtmosphereRayleighCoefficientB, valueUpdate: 'input', enable: (showSkyAtmosphere)"
              />
              <input
                class="numinput"
                type="number"
                size="5"
                data-bind="value: skyAtmosphereRayleighCoefficientB"
              />
            </td>
          </tr>
          <tr>
            <td>米氏系数(skyAtmosphere.atmosphereMieCoefficient)</td>
            <td>
              <input
                type="range"
                min="0.0"
                max="100.0"
                step="1"
                data-bind="value: skyAtmosphereMieCoefficient, valueUpdate: 'input', enable: (showSkyAtmosphere)"
              />
              <input
                class="numinput"
                type="number"
                size="5"
                data-bind="value: skyAtmosphereMieCoefficient"
              />
            </td>
          </tr>
          <tr>
            <td>瑞利标高(skyAtmosphere.atmosphereRayleighScaleHeight)</td>
            <td>
              <input
                type="range"
                min="0"
                max="2e4"
                step="1e2"
                data-bind="value: skyAtmosphereRayleighScaleHeight, valueUpdate: 'input', enable: (showSkyAtmosphere)"
              />
              <input
                class="numinput"
                type="number"
                size="5"
                data-bind="value: skyAtmosphereRayleighScaleHeight"
              />
            </td>
          </tr>
          <tr>
            <td>米氏等级高度(skyAtmosphere.atmosphereMieScaleHeight)</td>
            <td>
              <input
                type="range"
                min="0"
                max="1e4"
                step="1e2"
                data-bind="value: skyAtmosphereMieScaleHeight, valueUpdate: 'input', enable: (showSkyAtmosphere)"
              />
              <input
                class="numinput"
                type="number"
                size="5"
                data-bind="value: skyAtmosphereMieScaleHeight"
              />
            </td>
          </tr>
          <tr>
            <td>米氏各向异性(skyAtmosphere.atmosphereMieAnisotropy)</td>
            <td>
              <input
                type="range"
                min="-1.0"
                max="1.0"
                step="0.1"
                data-bind="value: skyAtmosphereMieAnisotropy, valueUpdate: 'input', enable: (showSkyAtmosphere)"
              />
              <input
                class="numinput"
                type="number"
                size="5"
                data-bind="value: skyAtmosphereMieAnisotropy"
              />
            </td>
          </tr>
          <tr>
            <td>色相(skyAtmosphere.hueShift)</td>
            <td>
              <input
                type="range"
                min="-1"
                max="1"
                step="0.01"
                data-bind="value: skyHueShift, valueUpdate: 'input', enable: (showSkyAtmosphere)"
              />
              <input type="text" size="5" data-bind="value: skyHueShift" />
            </td>
          </tr>
          <tr>
            <td>饱和度(skyAtmosphere.saturationShift)</td>
            <td>
              <input
                type="range"
                min="-1"
                max="1"
                step="0.01"
                data-bind="value: skySaturationShift, valueUpdate: 'input', enable: (showSkyAtmosphere)"
              />
              <input
                type="text"
                size="5"
                data-bind="value: skySaturationShift"
              />
            </td>
          </tr>
          <tr>
            <td>亮度(skyAtmosphere.brightnessShift)</td>
            <td>
              <input
                type="range"
                min="-1"
                max="1"
                step="0.01"
                data-bind="value: skyBrightnessShift, valueUpdate: 'input', enable: (showSkyAtmosphere)"
              />
              <input
                type="text"
                size="5"
                data-bind="value: skyBrightnessShift"
              />
            </td>
          </tr>
          <tr>
            <td>按片段(skyAtmosphere.perFragmentAtmosphere)</td>
            <td>
              <input
                type="checkbox"
                data-bind="checked: perFragmentAtmosphere, enable: (showSkyAtmosphere)"
              />
            </td>
          </tr>
          <tr>
            <td>HDR(scene.highDynamicRange)</td>
            <td>
              <input type="checkbox" data-bind="checked: hdr" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { UniCore } from 'unicore-sdk'
import { config } from 'unicore-sdk/unicore.config'
import 'unicore-sdk/Widgets/widgets.css'

import * as Cesium from 'cesium'

export default {
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

      // 视角初始化
      uniCore.position.buildingPosition(uniCore.viewer, [113.12380548015745, 28.250758831850005, 700], -20, -45, 1);



      const viewer = uniCore.viewer;
      const scene = viewer.scene;
      const globe = scene.globe;
      const skyAtmosphere = scene.skyAtmosphere;

      scene.highDynamicRange = true;
      globe.enableLighting = true;
      globe.atmosphereLightIntensity = 20.0;

      viewer.clock.currentTime = Cesium.JulianDate.fromIso8601(
        "2022-03-23T03:31:42.34200000000419095Z"
      );
      

      const canvas = viewer.canvas;
      canvas.setAttribute("tabindex", "0"); // needed to put focus on the canvas
      canvas.onclick = function () {
        canvas.focus();
      };

      const defaultGroundAtmosphereLightIntensity =
        globe.atmosphereLightIntensity;
      const defaultGroundAtmosphereRayleighCoefficient =
        globe.atmosphereRayleighCoefficient;
      const defaultGroundAtmosphereMieCoefficient =
        globe.atmosphereMieCoefficient;
      const defaultGroundAtmosphereMieAnisotropy =
        globe.atmosphereMieAnisotropy;
      const defaultGroundAtmosphereRayleighScaleHeight =
        globe.atmosphereRayleighScaleHeight;
      const defaultGroundAtmosphereMieScaleHeight =
        globe.atmosphereMieScaleHeight;
      const defaultGroundAtmosphereHueShift = globe.atmosphereHueShift;
      const defaultGroundAtmosphereSaturationShift =
        globe.atmosphereSaturationShift;
      const defaultGroundAtmosphereBrightnessShift =
        globe.atmosphereBrightnessShift;
      const defaultLightFadeOut = globe.lightingFadeOutDistance;
      const defaultLightFadeIn = globe.lightingFadeInDistance;
      const defaultNightFadeOut = globe.nightFadeOutDistance;
      const defaultNightFadeIn = globe.nightFadeInDistance;

      const defaultSkyAtmosphereLightIntensity =
        skyAtmosphere.atmosphereLightIntensity;
      const defaultSkyAtmosphereRayleighCoefficient =
        skyAtmosphere.atmosphereRayleighCoefficient;
      const defaultSkyAtmosphereMieCoefficient =
        skyAtmosphere.atmosphereMieCoefficient;
      const defaultSkyAtmosphereMieAnisotropy =
        skyAtmosphere.atmosphereMieAnisotropy;
      const defaultSkyAtmosphereRayleighScaleHeight =
        skyAtmosphere.atmosphereRayleighScaleHeight;
      const defaultSkyAtmosphereMieScaleHeight =
        skyAtmosphere.atmosphereMieScaleHeight;
      const defaultSkyAtmosphereHueShift = skyAtmosphere.hueShift;
      const defaultSkyAtmosphereSaturationShift =
        skyAtmosphere.saturationShift;
      const defaultSkyAtmosphereBrightnessShift =
        skyAtmosphere.brightnessShift;

      const viewModel = {
        // Globe settings

        enableTerrain: false,
        enableLighting: true,
        groundTranslucency: false,

        // Ground atmosphere settings

        showGroundAtmosphere: true,
        groundAtmosphereLightIntensity: defaultGroundAtmosphereLightIntensity,
        groundAtmosphereRayleighCoefficientR:
          defaultGroundAtmosphereRayleighCoefficient.x / 1e-6,
        groundAtmosphereRayleighCoefficientG:
          defaultGroundAtmosphereRayleighCoefficient.y / 1e-6,
        groundAtmosphereRayleighCoefficientB:
          defaultGroundAtmosphereRayleighCoefficient.z / 1e-6,
        groundAtmosphereMieCoefficient:
          defaultGroundAtmosphereMieCoefficient.x / 1e-6,
        groundAtmosphereRayleighScaleHeight: defaultGroundAtmosphereRayleighScaleHeight,
        groundAtmosphereMieScaleHeight: defaultGroundAtmosphereMieScaleHeight,
        groundAtmosphereMieAnisotropy: defaultGroundAtmosphereMieAnisotropy,
        groundHueShift: defaultGroundAtmosphereHueShift,
        groundSaturationShift: defaultGroundAtmosphereSaturationShift,
        groundBrightnessShift: defaultGroundAtmosphereBrightnessShift,
        lightingFadeOutDistance: defaultLightFadeOut,
        lightingFadeInDistance: defaultLightFadeIn,
        nightFadeOutDistance: defaultNightFadeOut,
        nightFadeInDistance: defaultNightFadeIn,

        // Sky atmosphere settings

        showSkyAtmosphere: true,
        skyAtmosphereLightIntensity: defaultSkyAtmosphereLightIntensity,
        skyAtmosphereRayleighCoefficientR:
          defaultSkyAtmosphereRayleighCoefficient.x / 1e-6,
        skyAtmosphereRayleighCoefficientG:
          defaultSkyAtmosphereRayleighCoefficient.y / 1e-6,
        skyAtmosphereRayleighCoefficientB:
          defaultSkyAtmosphereRayleighCoefficient.z / 1e-6,
        skyAtmosphereMieCoefficient:
          defaultSkyAtmosphereMieCoefficient.x / 1e-6,
        skyAtmosphereRayleighScaleHeight: defaultSkyAtmosphereRayleighScaleHeight,
        skyAtmosphereMieScaleHeight: defaultSkyAtmosphereMieScaleHeight,
        skyAtmosphereMieAnisotropy: defaultSkyAtmosphereMieAnisotropy,
        skyHueShift: defaultSkyAtmosphereHueShift,
        skySaturationShift: defaultSkyAtmosphereSaturationShift,
        skyBrightnessShift: defaultSkyAtmosphereBrightnessShift,
        perFragmentAtmosphere: false,
        dynamicLighting: true,
        dynamicLightingFromSun: false,

        // Fog settings

        showFog: true,
        density: 1.0,
        minimumBrightness: 0.03,

        // Scene settings

        hdr: true,
      };

      Cesium.knockout.track(viewModel);
      const toolbar = document.getElementById("toolbar");
      Cesium.knockout.applyBindings(viewModel, toolbar);

      Cesium.knockout
        .getObservable(viewModel, "showFog")
        .subscribe(function (newValue) {
          scene.fog.enabled = newValue;
        });
      Cesium.knockout
        .getObservable(viewModel, "enableLighting")
        .subscribe(function (newValue) {
          globe.enableLighting = newValue;
        });
      Cesium.knockout
        .getObservable(viewModel, "showGroundAtmosphere")
        .subscribe(function (newValue) {
          globe.showGroundAtmosphere = newValue;
        });
      Cesium.knockout
        .getObservable(viewModel, "dynamicLighting")
        .subscribe(function (newValue) {
          globe.dynamicAtmosphereLighting = newValue;
        });
      Cesium.knockout
        .getObservable(viewModel, "dynamicLightingFromSun")
        .subscribe(function (newValue) {
          globe.dynamicAtmosphereLightingFromSun = newValue;
        });
      Cesium.knockout
        .getObservable(viewModel, "density")
        .subscribe(function (newValue) {
          viewer.scene.fog.density = 2.0e-4 * newValue;
        });
      Cesium.knockout
        .getObservable(viewModel, "minimumBrightness")
        .subscribe(function (newValue) {
          viewer.scene.fog.minimumBrightness = newValue;
        });

      // Ground Atmosphere

      Cesium.knockout
        .getObservable(viewModel, "groundAtmosphereLightIntensity")
        .subscribe(function (newValue) {
          globe.atmosphereLightIntensity = parseFloat(newValue);
        });
      Cesium.knockout
        .getObservable(viewModel, "groundAtmosphereRayleighCoefficientR")
        .subscribe(function (newValue) {
          globe.atmosphereRayleighCoefficient.x = parseFloat(newValue) * 1e-6;
        });
      Cesium.knockout
        .getObservable(viewModel, "groundAtmosphereRayleighCoefficientG")
        .subscribe(function (newValue) {
          globe.atmosphereRayleighCoefficient.y = parseFloat(newValue) * 1e-6;
        });
      Cesium.knockout
        .getObservable(viewModel, "groundAtmosphereRayleighCoefficientB")
        .subscribe(function (newValue) {
          globe.atmosphereRayleighCoefficient.z = parseFloat(newValue) * 1e-6;
        });
      Cesium.knockout
        .getObservable(viewModel, "groundAtmosphereMieCoefficient")
        .subscribe(function (newValue) {
          const v = parseFloat(newValue) * 1e-6;
          globe.atmosphereMieCoefficient = new Cesium.Cartesian3(v, v, v);
        });
      Cesium.knockout
        .getObservable(viewModel, "groundAtmosphereRayleighScaleHeight")
        .subscribe(function (newValue) {
          globe.atmosphereRayleighScaleHeight = parseFloat(newValue);
        });
      Cesium.knockout
        .getObservable(viewModel, "groundAtmosphereMieScaleHeight")
        .subscribe(function (newValue) {
          globe.atmosphereMieScaleHeight = parseFloat(newValue);
        });
      Cesium.knockout
        .getObservable(viewModel, "groundAtmosphereMieAnisotropy")
        .subscribe(function (newValue) {
          globe.atmosphereMieAnisotropy = parseFloat(newValue);
        });
      Cesium.knockout
        .getObservable(viewModel, "groundHueShift")
        .subscribe(function (newValue) {
          globe.atmosphereHueShift = parseFloat(newValue);
        });
      Cesium.knockout
        .getObservable(viewModel, "groundSaturationShift")
        .subscribe(function (newValue) {
          globe.atmosphereSaturationShift = parseFloat(newValue);
        });
      Cesium.knockout
        .getObservable(viewModel, "groundBrightnessShift")
        .subscribe(function (newValue) {
          globe.atmosphereBrightnessShift = parseFloat(newValue);
        });
      Cesium.knockout
        .getObservable(viewModel, "lightingFadeOutDistance")
        .subscribe(function (newValue) {
          globe.lightingFadeOutDistance = parseFloat(newValue);
        });
      Cesium.knockout
        .getObservable(viewModel, "lightingFadeInDistance")
        .subscribe(function (newValue) {
          globe.lightingFadeInDistance = parseFloat(newValue);
        });
      Cesium.knockout
        .getObservable(viewModel, "nightFadeOutDistance")
        .subscribe(function (newValue) {
          globe.nightFadeOutDistance = parseFloat(newValue);
        });
      Cesium.knockout
        .getObservable(viewModel, "nightFadeInDistance")
        .subscribe(function (newValue) {
          globe.nightFadeInDistance = parseFloat(newValue);
        });

      // Sky Atmosphere

      Cesium.knockout
        .getObservable(viewModel, "showSkyAtmosphere")
        .subscribe(function (newValue) {
          skyAtmosphere.show = newValue;
        });
      Cesium.knockout
        .getObservable(viewModel, "skyAtmosphereLightIntensity")
        .subscribe(function (newValue) {
          skyAtmosphere.atmosphereLightIntensity = parseFloat(newValue);
        });
      Cesium.knockout
        .getObservable(viewModel, "skyAtmosphereRayleighCoefficientR")
        .subscribe(function (newValue) {
          skyAtmosphere.atmosphereRayleighCoefficient.x =
            parseFloat(newValue) * 1e-6;
        });
      Cesium.knockout
        .getObservable(viewModel, "skyAtmosphereRayleighCoefficientG")
        .subscribe(function (newValue) {
          skyAtmosphere.atmosphereRayleighCoefficient.y =
            parseFloat(newValue) * 1e-6;
        });
      Cesium.knockout
        .getObservable(viewModel, "skyAtmosphereRayleighCoefficientB")
        .subscribe(function (newValue) {
          skyAtmosphere.atmosphereRayleighCoefficient.z =
            parseFloat(newValue) * 1e-6;
        });
      Cesium.knockout
        .getObservable(viewModel, "skyAtmosphereMieCoefficient")
        .subscribe(function (newValue) {
          const v = parseFloat(newValue) * 1e-6;
          skyAtmosphere.atmosphereMieCoefficient = new Cesium.Cartesian3(
            v,
            v,
            v
          );
        });
      Cesium.knockout
        .getObservable(viewModel, "skyAtmosphereRayleighScaleHeight")
        .subscribe(function (newValue) {
          skyAtmosphere.atmosphereRayleighScaleHeight = parseFloat(newValue);
        });
      Cesium.knockout
        .getObservable(viewModel, "skyAtmosphereMieScaleHeight")
        .subscribe(function (newValue) {
          skyAtmosphere.atmosphereMieScaleHeight = parseFloat(newValue);
        });
      Cesium.knockout
        .getObservable(viewModel, "skyAtmosphereMieAnisotropy")
        .subscribe(function (newValue) {
          skyAtmosphere.atmosphereMieAnisotropy = parseFloat(newValue);
        });
      Cesium.knockout
        .getObservable(viewModel, "skyHueShift")
        .subscribe(function (newValue) {
          skyAtmosphere.hueShift = parseFloat(newValue);
        });
      Cesium.knockout
        .getObservable(viewModel, "skySaturationShift")
        .subscribe(function (newValue) {
          skyAtmosphere.saturationShift = parseFloat(newValue);
        });
      Cesium.knockout
        .getObservable(viewModel, "skyBrightnessShift")
        .subscribe(function (newValue) {
          skyAtmosphere.brightnessShift = parseFloat(newValue);
        });
      Cesium.knockout
        .getObservable(viewModel, "perFragmentAtmosphere")
        .subscribe(function (newValue) {
          scene.skyAtmosphere.perFragmentAtmosphere = newValue;
        });
      Cesium.knockout
        .getObservable(viewModel, "hdr")
        .subscribe(function (newValue) {
          scene.highDynamicRange = newValue;
        });
      Cesium.knockout
        .getObservable(viewModel, "groundTranslucency")
        .subscribe(function (newValue) {
          globe.translucency.enabled = newValue;
          globe.translucency.frontFaceAlpha = 0.1;
          globe.translucency.backFaceAlpha = 0.1;
        });

      window.setActiveTab = function (event, tableId) {
        let i;
        const tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
          tabcontent[i].style.display = "none";
        }
        const tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
          tablinks[i].className = tablinks[i].className.replace(
            " active",
            ""
          );
        }
        document.getElementById(tableId).style.display = "block";
        event.currentTarget.className += " active";
      };


      let options = {
        id: '小别墅'
      }
      //加载3dtiles
      uniCore.model.createTileset('../../assets/3Dtiles/sample3_方法2_小别墅属性(1)/tileset.json', options).then(cityLeft => {
        uniCore.model.changeModelPos(cityLeft, [113.12098820449636, 28.256150218457687, 130], [0, 0, 0], [23.8, 23.8, 23.8])
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
  background: black;
}
#toolbar {
  position: absolute;
  top: 0;
  z-index: 999;
  background: rgb(0 0 0 / 76%);
  padding: 4px;
  border-radius: 4px;
  color: #ffffff;
}
#toolbar input {
  vertical-align: middle;
  padding-top: 2px;
  padding-bottom: 2px;
}

.tab {
  overflow: hidden;
  border: 1px solid #ccc;
  background-color: #f1f1f1;
  display: grid;
  grid-auto-flow: column;
}

.tab button {
  background-color: rgb(0 0 0 / 88%);
  color: #ffffff9d;
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 4px 4px;
}

.tab button.active {
  background-color: rgb(0 0 0 / 88%);
  color: #fff;
}

.numinput {
  width: 64px;
}
</style>
```