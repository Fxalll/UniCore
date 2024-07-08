# Class: Animation

## Animation()

UniAnimation类

## Constructor

### new Animation()

## Classes

[Animation](Animation.html)

### Methods

#### updatePosition(axisList, realTimeCallback, finishCallback = null, speed = 5, stepTime = 0.01, exclude = [])

获取两个坐标间贴地/模型的实时坐标

##### Parameters:

| Name | Type | Description |
| --- | --- | --- |
| `axisList` | \* | 坐标路径数组 |
| `realTimeCallback` | \* | 获得实时坐标后的处理函数 |
| `finishCallback` | \* | 完成所有动画后的处理函数 |
| `speed` | \* | 速度参数（越小越快） |
| `stepTime` | \* | 步长（越小越流畅，也越慢） |
| `exclude` | \* | 不采样高度的基本体，实体或3D Tiles功能列表 |

<br>

<br><hr>

#### caluRealTimeRotate(axisList, index)

计算方位角

##### Parameters:

| Name | Type | Description |
| --- | --- | --- |
| `axisList` | \* | 坐标路径数组 |
| `index` | \* | 要计算角度的第index段路径 |

##### Returns: