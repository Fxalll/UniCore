# 示例组件

## 这是什么？

示例组件，系整理利用 UniCore 完成的一些功能组件示例。你也可以根据自己的需要编写功能组件。

## 我使用 Vue3，能不能使用这里的组件示例？

可以，你只需要将原本的 `this.$refs.xxx` 用 `xxx.value` 代替，如：

```js
let xxx = ref();
xxx.value.showProps(result);
```