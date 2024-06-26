---
outline: deep
---

# 全屏展示

## Javascript 原生方法

### 方法介绍

你可以使用 Javascript 原生方法进行全屏展示。

### 代码示例

全屏方法：

```js
var element = document.documentElement;
if (element.requestFullscreen) {
  element.requestFullscreen();
} else if (element.mozRequestFullScreen) {
  element.mozRequestFullScreen();
} else if (element.webkitRequestFullscreen) {
  element.webkitRequestFullscreen();
} else {
  alert("当前浏览器不支持全屏！");
  return false;
}
```

退出全屏方法：

```js
if (document.exitFullscreen) {
  document.exitFullscreen();
} else if (document.mozRequestFullScreen) {
  document.mozCancelFullScreen();
} else if (document.webkitRequestFullscreen) {
  document.webkitCancelFullScreen();
}
```
