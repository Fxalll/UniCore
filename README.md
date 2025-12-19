# UniCore 通用图形引擎

<p align="center">
  <img src="./docs/public/logo2.png" width="200" alt="UniCore Logo" />
</p>

<h3 align="center">为 GIS + BIM 应用而生的通用图形引擎</h3>

<p align="center">
  <a href="https://www.npmjs.com/package/unicore-sdk"><img src="https://img.shields.io/npm/v/unicore-sdk?style=flat&logo=npm&label=版本号" alt="NPM Version"></a>
  <a href="#"><img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License"></a>
</p>

---

## 简体中文

### 简介

UniCore（通用图形引擎）是一个基于 Web 端开发的图形引擎，专为 GIS（地理信息系统）应用与 BIM（建筑信息模型）应用而设计。

不同于市面上的 BIM 图形引擎与 GIS 图形引擎，通用图形引擎致力于将 BIM 场景与 GIS 场景结合，不仅能支持建筑信息模型（BIM）的加载、交互和展示，还能与地理信息系统（GIS）进行深度融合。

### 核心特性

- **通用性**: 支持 BIM 与 GIS 融合应用，打破原先 BIM 与 GIS 这两种系统相互独立的局面
- **可视化**: 直观展示复杂数据模型，帮助用户更好地把握项目的整体情况和细节
- **协同&共享**: 实现高效沟通，数据实时共享，让不同部门或团队间能方便地共享和交换数据
- **高性能**: 通过自研 3DTiles 格式转换算法，结合 GIS 图形引擎加载 3DTiles 模型的性能优势，实现卓越的性能优化

### 安装

```bash
npm install unicore-sdk
```

### 快速开始

1. 在 Vue 项目中引入 UniCore SDK：

```javascript
import { UniCore } from "unicore-sdk";
import { config } from "unicore-sdk/unicore.config";
import "unicore-sdk/Widgets/widgets.css";
```

2. 初始化引擎（需要获取 accessToken）：

```javascript
// 初始化方法调用
```

### 文档

详细的文档和示例请访问我们的[官方文档网站](https://fxalll.github.io/UniCore/)。

### API 文档

UniCore 提供了丰富的 API 接口，包括：

- Model: 模型加载与操作
- Position: 坐标转换与视角控制
- Tip: 标签创建与管理
- Interact: 交互事件处理
- Animation: 动画效果
- Particle: 粒子系统
- Flat: 模型压平
- Tour: 漫游功能
- TerrainClip: 地形裁剪
- Service: 服务接口

### 示例项目

我们提供了多个示例项目来帮助您快速上手：

- 综合大场景案例
- 城市管网项目
- 视角与模型定位示例
- 模型加载与操作示例
- 动画与粒子效果示例
- 场景操作示例

### 许可证

MIT License

---

## English

### Introduction

UniCore is a web-based graphics engine specifically designed for GIS (Geographic Information System) and BIM (Building Information Modeling) applications.

Unlike existing BIM and GIS graphics engines on the market, UniCore is dedicated to integrating BIM and GIS scenarios. It not only supports the loading, interaction, and display of building information models (BIM) but also achieves deep integration with geographic information systems (GIS).

### Key Features

- **Universality**: Supports integrated BIM and GIS applications, breaking the traditional isolation between BIM and GIS systems
- **Visualization**: Intuitive visualization of complex data models to help users better understand overall project situations and details
- **Collaboration & Sharing**: Enables efficient communication and real-time data sharing, allowing different departments or teams to easily share and exchange data
- **High Performance**: Achieves excellent performance optimization through self-developed 3DTiles format conversion algorithms combined with the performance advantages of GIS graphics engines in loading 3DTiles models

### Installation

```bash
npm install unicore-sdk
```

### Quick Start

1. Import UniCore SDK in your Vue project:

```javascript
import { UniCore } from "unicore-sdk";
import { config } from "unicore-sdk/unicore.config";
import "unicore-sdk/Widgets/widgets.css";
```

2. Initialize the engine (accessToken required):

```javascript
// Initialization method call
```

### Documentation

For detailed documentation and examples, please visit our [official documentation website](#).

### API Documentation

UniCore provides rich API interfaces, including:

- Model: Model loading and manipulation
- Position: Coordinate transformation and camera control
- Tip: Label creation and management
- Interact: Interaction event handling
- Animation: Animation effects
- Particle: Particle system
- Flat: Model flattening
- Tour: Roaming functionality
- TerrainClip: Terrain clipping
- Service: Service interfaces

### Example Projects

We provide multiple example projects to help you get started quickly:

- Comprehensive large-scene case
- Urban pipeline network project
- Camera and model positioning examples
- Model loading and operation examples
- Animation and particle effect examples
- Scene operation examples

### License

MIT License

---
