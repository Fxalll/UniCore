---
outline: deep
---

# 天体、雾等特效

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
