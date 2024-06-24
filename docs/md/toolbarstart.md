# UniCore UI 工具栏

## 使用说明

UniCore UI工具栏可以前端自行编写相关代码逻辑实现，因此目前不集成在UniCore SDK内，需外部引入。

本次UniCore UI工具栏示例主要代码文件为UI.js，样式文件为toolbar.css。
要引入UI工具栏，获取UI.js后，可以使用以下代码引入UI.js：
```js
import { UI } from '../../public/static/extend/UI'
```

通过以下代码引入toolbar.css：

```js
<style scoped>
@import url('../../public/static/css/toolbar.css');
</style>
```

利用诸如以下代码初始化UI组件：
```js
// 初始化工具栏
 this.ui = new UI();
 //工具栏参数
 let opt = [
   {
     title: '主视角',
     url: 'url(../static/img/ui/zhushijiao.png)',
     callback: () => {
       // 编写按钮方法
     }
   },
   {
     title: '定位',
     url: 'url(../static/img/ui/shiqumian.png)',
     callback: () => {
       // 编写按钮方法
     }
   },
   {
     title: '挖地',
     url: 'url(../static/img/ui/zhongli@2x.png)',
     callback: () => {
       // 编写按钮方法
     }
   },
   {
     title: '显隐',
     url: 'url(../static/img/ui/xitongin@2x.png)',
     callback: () => {
       // 编写按钮方法
     }
   },
   {
     title: '更多',
     url: 'url(../static/img/ui/shezhi.png)',
     callback: () => {
       // 编写按钮方法
     }
   },

 ]
 // 初始化UI组件
 this.ui.init(document.querySelector('#unicoreContainer'), opt);
```
UI组件成功引入后，网页可出现下方红框样式的UI工具栏，工具栏所需图片资源可自己修改。通过每个按钮的callback回调方法内可编写按钮方法，点击按钮即可运行。
![Alt text](image-1.png)