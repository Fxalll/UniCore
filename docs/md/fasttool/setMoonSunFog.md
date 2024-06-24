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
window.viewer.scene.moon.show = false;
window.viewer.scene.fog.enabled = false;
window.viewer.scene.sun.show = false;
window.viewer.scene.skyBox.show = false;
```
