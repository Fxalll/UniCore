# Class: Position

## Position()

UniPosition类

## Constructor

### new Position()

## Classes

### Methods

#### axis2cartesian3(lon, lat, height)

经纬度转换为世界坐标

##### Parameters:

| Name | Type | Description |
| --- | --- | --- |
| `lon` | \* |  |
| `lat` | \* |  |
| `height` | \* |  |

<br><hr>

<br>

##### Returns:

#### axis2cartographic(lon, lat, height)

经纬度转弧度

##### Parameters:

| Name | Type | Description |
| --- | --- | --- |
| `lon` | \* |  |
| `lat` | \* |  |
| `height` | \* |  |

<br><hr>

<br>

##### Returns:

#### axis2screen(lon, lat, height)

经纬度转屏幕坐标

##### Parameters:

| Name | Type | Description |
| --- | --- | --- |
| `lon` | \* |  |
| `lat` | \* |  |
| `height` | \* |  |

<br><hr>

<br>

##### Returns:

#### buildingPosition(viewer, arr, heading, pitch, duration)

飞行定位

##### Parameters:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `viewer` | \* |  | 视图 |
| `arr` | \* |  | 经纬高程坐标 |
| `heading` | \* | 2 | 方向 |
| `pitch` | \* |  | 倾斜角度 |
| `duration` | \* | 3 | 动画时间 |

<br><hr>

<br>

#### cartesian3\_2axis(cartesian3)

Cartesian3转经纬度

##### Parameters:

| Name | Type | Description |
| --- | --- | --- |
| `cartesian3` | \* |  |

<br><hr>

<br>

##### Returns:

#### cartographic2axis(cartographic)

cartographic 弧度转经纬度

##### Parameters:

| Name | Type | Description |
| --- | --- | --- |
| `cartographic` | \* |  |

<br><hr>

<br>

##### Returns:

#### getCurrentCameraSet()

获取当前位置参数（经纬度、俯仰角）

<br><hr>

<br>

##### Returns:

#### lockTo(viewer, bool, axis, heading, pitch)

锁定视角

##### Parameters:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `viewer` | \* |  |  |
| `bool` | \* |  |  |
| `axis` | \* |  |  |
| `heading` | \* | 0 |  |
| `pitch` | \* | 0 |  |
| `range` | \* | 0 |  |

<br><hr>

<br>

#### screen2axis(viewer, e)

屏幕坐标转经纬度

##### Parameters:

| Name | Type | Description |
| --- | --- | --- |
| `viewer` | \* |  |
| `e` | \* |  |

