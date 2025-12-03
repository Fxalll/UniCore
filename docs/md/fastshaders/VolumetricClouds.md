---
outline: deep
---

# 全球体积云

### 介绍

体积云用于提升场景逼真度，本文提供示例着色器。可自行优化随机函数，使云朵更自然逼真。

![alt text](image.png)

![alt text](image-2.png)

![alt text](image-1.png)


### 在线演示

点击 [在线链接](http://192.168.4.66:8091/?id=VolumetricClouds) 以查看在线演示。

### 使用方法

#### 1、在src文件夹下新增 `src/shaders/VolumetricClouds.glsl.js`

填充着色器代码：

```js
// src/shaders/VolumetricClouds.glsl.js

const VolumetricCloudsShader = `
precision highp float;
        
// 接收的全局统一变量 (Uniforms)
uniform float realPlanetRadius; // 真实的行星半径
uniform float cloudCover;       // 云覆盖率 (0.0 到 1.0, 控制云量的主要参数)
uniform float cloudBaseRadius;  // 云层底部的半径 (基于行星中心)
uniform float cloudTopRadius;   // 云层顶部的半径 (基于行星中心)
uniform vec3 windVector;        // 风向和风速向量

// 常量定义
const float windSpeedRatio = 0.0002;       // 风速比例因子，用于随时间偏移噪声
const float PI = 3.14159265359;            // 圆周率
const float FOUR_PI = 12.5663706144;        // 4 * PI

#define CLOUDS_MAX_LOD 1                   // 云的最大细节级别 (此处未使用 LOD)

// **调整点 1: 增加步进次数和减小步长，以增加云的细节和随机性**
#define CLOUDS_MARCH_STEP 300.0        // 体积光线步进的步长 (略微减小，增加采样次数)
#define CLOUDS_DENS_MARCH_STEP 100.0   // 用于计算密度的步长 (此处未使用，可能为预留)
#define MAXIMUM_CLOUDS_STEPS 150       // 最大步进次数 (增加到 150，增加细节和体积感)
#define CLOUDS_MAX_VIEWING_DISTANCE 150000.0 // 云的渲染最大距离

// --- 射线球体相交算法 (保持不变) ---
// 计算射线 R0 + Rd*t 与半径为 sr 的球体的相交点 t 值 (tmin, tmax)
vec2 raySphereIntersect(vec3 r0, vec3 rd, float sr) {
    float a = dot(rd, rd);
    float b = 2.0 * dot(rd, r0);
    float c = dot(r0, r0) - (sr * sr);
    float d = (b * b) - 4.0 * a * c;
    if (d < 0.0) return vec2(-1.0, -1.0); // 无相交
    float squaredD = sqrt(d);
    return vec2((-b - squaredD) / (2.0 * a), (-b + squaredD) / (2.0 * a));
}

float saturate(float value) { return clamp(value, 0.0, 1.0); } // 限制值在 [0, 1] 范围
float isotropic() { return 0.07957747154594767; } // 1.0 / (4.0 * PI)，各向同性散射的常数项

// --- 程序化3D噪声 (保持不变) ---
// 基础哈希函数
float hash(float n) { return fract(sin(n) * 753.5453123); }
// 3D 噪声函数 (Perlin/Value Noise 变体)
float noise(vec3 x) {
    vec3 p = floor(x);
    vec3 f = fract(x);
    // 平滑插值 (使用 3x^2 - 2x^3)
    f = f * f * (3.0 - 2.0 * f);
    float n = p.x + p.y * 157.0 + 113.0 * p.z;
    // 三线性插值
    return mix(mix(mix(hash(n + 0.0), hash(n + 1.0), f.x),
                   mix(hash(n + 157.0), hash(n + 158.0), f.x), f.y),
               mix(mix(hash(n + 113.0), hash(n + 114.0), f.x),
                   mix(hash(n + 270.0), hash(n + 271.0), f.x), f.y), f.z);
}

// **调整点 2: 增加 FBM 迭代次数和贡献，增加随机性/细节**
// 分形布朗运动 (FBM) - 叠加多层不同频率和振幅的噪声来创建复杂细节
float fbm(vec3 p) {
    float f = 0.0;
    
    // 基础频率 (决定大块云的形状)
    f += 0.5000 * noise(p); p = p * 2.02;
    // 第二层细节
    f += 0.2800 * noise(p); p = p * 2.03; // 增加贡献权重 (0.28 vs 0.25)，增加细节
    // 第三层细节 (增加层次感)
    f += 0.1500 * noise(p); p = p * 2.04; // 新增/调整权重 (0.15 vs 0.125)，进一步增加复杂度
    // 第四层微小细节 (增加云边缘的复杂性)
    f += 0.0700 * noise(p); p = p * 2.05; // 新增一层，用于云块边缘的细碎感
    
    return f; // 返回叠加后的噪声值
}

// 施利克相位函数 (Schlick Phase Function)
// 用于描述光线在介质中散射的方向性 (k 是各向异性参数，costh 是光线方向和视线方向的点积)
float Schlick(float k, float costh) {
    return (1.0 - k * k) / (FOUR_PI * pow(1.0 - k * costh, 2.0));
}

// --- 云密度计算函数 ---
// p: 世界坐标下的采样点
// wind: 风的偏移量
// lod: 细节级别 (此处未使用)
// heightRatio: 输出参数，表示采样点在云层中的垂直高度比例 (0:云底, 1:云顶)
float cloudDensity(vec3 p, vec3 wind, int lod, inout float heightRatio) {
    float finalCoverage = cloudCover;
    if (finalCoverage <= 0.1) return 0.0; // 云量过低直接返回 0

    float distToCenter = length(p);
    // 计算采样点在云层 (cloudBaseRadius 到 cloudTopRadius) 中的高度比例
    heightRatio = (distToCenter - cloudBaseRadius) / (cloudTopRadius - cloudBaseRadius);
    
    // **调整点 3: 调整噪声采样频率，影响云块大小**
    // 减小乘数 0.0002 -> 0.00018 可以使云块看起来更大
    vec3 noisePos = (p + wind) * 0.00018; 
    float shape = fbm(noisePos); // 采样 FBM 噪声得到云的形状/密度基础值
    
    // 密度计算： shape (噪声) + finalCoverage (全局云量) - 1.0
    // 当 shape > 1.0 - finalCoverage 时，密度大于 0
    float density = shape + finalCoverage - 1.0;
    
    // **调整点 4: 密度提升 (增加体积感)**
    // 将密度值放大，使 Raymarcher 更快积累不透明度 (云更厚实)
    density *= 1.5; // 增加密度倍数
    
    // 边缘衰减：根据高度比例进行垂直方向的衰减 (云底和云顶密度减小)
    // 1.0 - abs(heightRatio - 0.5) * 2.0 在中心 (0.5) 处为 1.0，两端 (0.0, 1.0) 处为 0.0
    density *= saturate(1.0 - abs(heightRatio - 0.5) * 2.0);
    
    // 修正：将 cloudCover 再次用于限制形状 (确保云量控制最终密度)
    density *= finalCoverage; 
    
    return saturate(density); // 最终密度限制在 [0, 1]
}

// --- 主要的云渲染函数 (Raymarching) ---
// start: 射线起点 (相机位置)
// dir: 射线方向
// maxDistance: 射线最大步进距离 (到物体/最大视图距离)
// light_dir: 光线方向 (太阳方向)
// wind: 风的偏移
vec4 calculate_clouds(vec3 start, vec3 dir, float maxDistance, vec3 light_dir, vec3 wind) {
    vec4 cloud = vec4(0.0); // 累积的云颜色和 Alpha (不透明度)
    
    // 计算射线与云层球体 (云顶/云底) 的相交
    vec2 toTop = raySphereIntersect(start, dir, cloudTopRadius);
    vec2 toBase = raySphereIntersect(start, dir, cloudBaseRadius);
    
    float tmin, tmax; // 步进的起始和结束距离
    float distToCenter = length(start);
    
    // 根据相机位置确定步进范围 (tmin, tmax)
    if (distToCenter < cloudBaseRadius) { // 相机在云层下方
        tmin = toBase.y; // 从云底内侧交点开始
        tmax = toTop.y;  // 到云顶外侧交点结束
    } else if (distToCenter > cloudTopRadius) { // 相机在云层上方
        tmin = toTop.x; // 从云顶外侧最近交点开始
        tmax = toTop.y; // 到云顶外侧最远交点结束
    } else { // 相机在云层内部
        tmin = 0.0;     // 从相机位置开始
        tmax = toTop.y; // 到云顶外侧交点结束
    }
    
    if (tmax < 0.0) return vec4(0.0); // 射线不经过云层
    if (tmin < 0.0) tmin = 0.0;       // 确保起始距离非负

    if (tmin >= maxDistance) return vec4(0.0); // 云层在物体后面
    tmax = min(tmax, maxDistance);            // 限制最大步进距离为物体深度或最大视图距离

    float rayLength = tmax - tmin;
    if (rayLength <= 0.0) return vec4(0.0);

    float marchStep = CLOUDS_MARCH_STEP; // 步长
    float distance = tmin;               // 当前步进距离
    
    vec3 sunColor = vec3(1.0, 0.9, 0.8);      // 阳光颜色
    vec3 ambientColor = vec3(0.6, 0.7, 0.8);  // 环境光颜色

    // 体积光线步进循环
    for (int i = 0; i < MAXIMUM_CLOUDS_STEPS; i++) {
        if (distance >= tmax || cloud.a >= 0.99) break; // 超过范围或完全不透明则退出
        
        vec3 p = start + dir * distance; // 当前采样点世界坐标
        float heightRatio = 0.0;
        
        float dens = cloudDensity(p, wind, 0, heightRatio); // 计算当前点的密度
        
        if (dens > 0.01) {
            // **调整点 5: 增加 alpha 贡献，让云更不透明/厚实**
            float alpha = dens * 0.7; // 从 0.5 增加到 0.7，提高单个步长的云不透明度
            
            // 简单的光照模型 (兰伯特光照简化版，用于混合环境光和阳光)
            float sunDiff = saturate(dot(dir, light_dir)); // 视线方向与光线方向的点积
            vec3 color = mix(ambientColor, sunColor, sunDiff * 0.5 + 0.5); // 根据角度混合颜色
            
            // 体积光线步进积分 (Over 运算符)
            // L_out = L_in * (1 - alpha) + Color * alpha
            cloud.rgb += color * alpha * (1.0 - cloud.a); // 颜色累积
            cloud.a += alpha * (1.0 - cloud.a);           // Alpha 累积 (不透明度)
        }
        
        distance += marchStep; // 前进一个步长
    }

    return cloud; // 返回云的颜色和不透明度
}

// --- 片段着色器主函数 ---
uniform sampler2D colorTexture; // 场景颜色贴图 (背景)
uniform sampler2D depthTexture; // 场景深度贴图
in vec2 v_textureCoordinates;   // 纹理坐标

void main() {
    vec4 color = texture(colorTexture, v_textureCoordinates); // 获取背景颜色
    
    // 从深度贴图获取深度值
    #ifdef LOG_DEPTH
        float depth = czm_unpackDepth(texture(depthTexture, v_textureCoordinates));
    #else
        float depth = texture(depthTexture, v_textureCoordinates).r;
    #endif
    
    // 根据深度值计算世界坐标
    vec4 positionEC = czm_windowToEyeCoordinates(gl_FragCoord.xy, depth); // 屏幕坐标转 Eye 坐标
    vec4 worldCoordinate = czm_inverseView * positionEC;
    vec3 vWorldPosition = worldCoordinate.xyz / worldCoordinate.w; // 目标物体/背景的世界坐标
    
    vec3 camPos = czm_viewerPositionWC; // 相机世界坐标
    vec3 posToEye = vWorldPosition - camPos;
    vec3 direction = normalize(posToEye); // 视线方向
    float distToObj = length(posToEye);   // 视线到目标物体/背景的距离
    
    // 如果深度接近 1.0 (背景/天空盒)，则使用最大视图距离
    if (depth >= 1.0 - 0.000001) {
        distToObj = CLOUDS_MAX_VIEWING_DISTANCE;
    }

    vec3 lightDir = normalize(czm_sunPositionWC);              // 太阳光线方向
    vec3 wind = windVector * czm_frameNumber * windSpeedRatio; // 根据帧数计算风的偏移

    // 计算当前视线方向上的云体效果
    vec4 clouds = calculate_clouds(camPos, direction, distToObj, lightDir, wind);
    
    // 最终颜色混合：将云的颜色叠加到背景颜色上
    // L_final = L_cloud * alpha + L_background * (1 - alpha)
    out_FragColor = mix(color, vec4(clouds.rgb, 1.0), clouds.a);
}
`;

export default VolumetricCloudsShader;
```

#### 2、在src文件夹下新增 `src/utils/CloudConfig.js`

新增配置文件

```js
// src/utils/CloudConfig.js

import * as Cesium from 'cesium'
// 导入着色器代码：现在我们从 .glsl.js 文件导入一个字符串
import VolumetricCloudsShader from '../shaders/VolumetricClouds.glsl.js'

/**
 * 默认云层配置
 */
const DEFAULT_CLOUD_CONFIG = {
  cloudCover: 0.55,       // 云量 (0.0 - 1.0)
  cloudBase: 3000,        // 云底高度 (米)
  cloudTop: 6000,         // 云顶高度 (米)
  currentWindVectorWC: new Cesium.Cartesian3(50, 0, 0) // 风速风向
};

/**
 * 初始化体积云后处理阶段
 * @param {Cesium.Viewer} viewer Cesium Viewer 实例
 * @param {Object} [options] 覆盖默认配置的选项
 * @returns {Cesium.PostProcessStage} 创建的 PostProcessStage 实例
 */
export function initializeVolumetricClouds (viewer, options = {}) {
  const config = { ...DEFAULT_CLOUD_CONFIG, ...options };

  // 预计算半径
  const earthRadius = 6378137.0;
  config.cloudBaseRadius = earthRadius + config.cloudBase;
  config.cloudTopRadius = earthRadius + config.cloudTop;

  // 1. 创建 PostProcessStage
  const cloudsStage = new Cesium.PostProcessStage({
    // 直接使用导入的 JavaScript 字符串
    fragmentShader: VolumetricCloudsShader,
    uniforms: {
      realPlanetRadius: earthRadius,
      cloudCover: config.cloudCover,
      cloudBaseRadius: config.cloudBaseRadius,
      cloudTopRadius: config.cloudTopRadius,
      windVector: config.currentWindVectorWC
    }
  });

  // 2. 添加到场景
  viewer.scene.postProcessStages.add(cloudsStage);

  // 开启地形深度检测，确保云不会穿透山体
  viewer.scene.globe.depthTestAgainstTerrain = true;

  // 3. 实时更新 Uniforms 的逻辑
  viewer.scene.preUpdate.addEventListener(() => {
    if (!cloudsStage.enabled) return;

    cloudsStage.uniforms.windVector = config.currentWindVectorWC;
    cloudsStage.uniforms.cloudCover = config.cloudCover;
  });

  return cloudsStage;
}
```

#### 3、在代码中引入

如

```vue
<template>
  <div id="unicoreContainer"></div>
</template>

<script>
import { UniCore } from 'unicore-sdk'
import { config } from 'unicore-sdk/unicore.config'
import 'unicore-sdk/Widgets/widgets.css'
import * as Cesium from 'cesium'

// 引入云配置和集成函数
import { initializeVolumetricClouds } from '@/utils/CloudConfig'

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
      let accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxNjEwMzI4My01MjBmLTQzYzktOGZiMS0wMDRhZjE0N2IyMGIiLCJpZCI6MTc1NzkyLCJpYXQiOjE3MTM3NzQ3OTh9.zU-R4MNvHr8rvn1v28PQfDImyutnpPF2lmEgGeSPckQ";
      let uniCore = new UniCore(config, accessToken);
      uniCore.init("unicoreContainer");
      let viewer = uniCore.viewer;

      // --- 核心修改部分：只调用集成函数 ---
      // 可以在第二个参数中传递自定义配置，例如：
      // initializeVolumetricClouds(viewer, { cloudCover: 0.8, cloudBase: 5000 });
      initializeVolumetricClouds(viewer);

      // 视角初始化
      uniCore.position.buildingPosition(uniCore.viewer, [113.12380548015745, 28.250758831850005, 16700], -20, -45, 1);
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
</style>
```