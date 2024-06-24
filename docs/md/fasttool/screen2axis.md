---
outline: deep
---

# 屏幕坐标转经纬度

## Position 类的方法 - screen2axis

### 方法介绍

UniCore 内置 Position 类，提供 screen2axis 方法用于将屏幕坐标转经纬度的工具类方法。

该方法需传入 viewer 对象及鼠标事件 $event ，你可以在鼠标点击方法里传入$event ，如：

```vue
<div @click="mouseClick($event)"></div>
```

### 代码示例

```js
function mouseClick(e) {
  let axis = uniCore.position.screen2axis(window.viewer, e);
  console.log(axis);
}
```
