# Class: Flat

## Flat()

UniFlat类

## Constructor

### new Flat()

## Classes

### Methods

#### addRegion(attr)

添加压平面

##### Parameters:

| Name | Type | Description |
| --- | --- | --- |
| `attr` | Object | 参数
###### Properties

| Name | Type | Description |
| --- | --- | --- |
| `positions` | Array.<Cesium.Cartesian3> | 压平面坐标 |
| `height` | Number | 压平深度，当前不支持单独设置 |
| `id` | Number | 唯一标识 |

 |

<br><hr>

<br>

#### destroy()

销毁

<br><hr>

<br>

#### getIsinPolygonFun()

根据数组长度，构建 判断点是否在面内 的压平函数

<br><hr>

<br>

#### init(tileset, opt)

初始化

##### Parameters:

| Name | Type | Description |
| --- | --- | --- |
| `tileset` | Cesium.Cesium3DTileset | 三维模型 |
| `opt` | Object | 
###### Properties

| Name | Type | Description |
| --- | --- | --- |
| `flatHeight` | Number | 压平高度 |

 |

<br><hr>

<br>

#### removeRegionById(id)

根据id删除压平的面

##### Parameters:

| Name | Type | Description |
| --- | --- | --- |
| `id` | String | 唯一标识 |
