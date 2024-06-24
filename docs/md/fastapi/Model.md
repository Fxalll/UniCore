# Class: Model

## Model()

UniModels类

## Constructor

### new Model()


## Classes

### Methods

#### add3DTiles(param0, param1)

增加3DTiles模型 （旧

##### Parameters:

| Name | Type | Description |
| --- | --- | --- |
| `param0` | \* | 经纬高程 |
| `param1` | \* | 属性 |

<br><hr>

<br>

##### Returns:

#### (async) addGltf(param0, param1)

增加GLTF模型

##### Parameters:

| Name | Type | Description |
| --- | --- | --- |
| `param0` | \* | 经纬高程 |
| `param1` | \* | 属性 |

<br><hr>

<br>

##### Returns:

#### attachGltfset(viewer)

关联GLTF设置

##### Parameters:

| Name | Type | Description |
| --- | --- | --- |
| `viewer` | \* | 全局Viewr对象 |

<br><hr>

<br>

#### change3DTilesPos(tileset, axis)

修改3DTiles坐标位置

##### Parameters:

| Name | Type | Description |
| --- | --- | --- |
| `tileset` | \* | 使用添加模型方法后返回的模型tileset类 |
| `axis` | \* | 经纬高度 |

<br><hr>

<br>

#### changeColor(model, color, alpha, isSilhouetter, silhouetteSize, colorBlendAmount)

模型颜色调整

##### Parameters:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `model` | \* |  | 使用添加模型方法后返回的模型tileset类 |
| `color` | \* |  | 颜色 |
| `alpha` | \* |  | 透明度 |
| `isSilhouetter` | \* | false | 是否开启外轮廓线颜色 |
| `silhouetteSize` | \* | 1 | 外轮廓线宽度 |
| `colorBlendAmount` | \* | 0.5 | 颜色混合量 |

<br><hr>

<br>

#### changeModelPos(model, axis, hprs, scales, offsets)

修改模型形态

##### Parameters:

| Name | Type | Description |
| --- | --- | --- |
| `model` | \* | 使用添加模型方法后返回的模型tileset类 |
| `axis` | \* | 经纬高度 |
| `hprs` | \* | 俯仰旋转翻转角 |
| `scales` | \* | 三维缩放数值 |
| `offsets` | \* | 三维偏移量 |

<br><hr>

<br>

#### changePos(isAxis, data, hprs, scales, offsets)

针对transform进行修改

##### Parameters:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `isAxis` | \* | true | data是否是axis，否则是transform |
| `data` | \* |  | 填入axis坐标或者transform |
| `hprs` | \* |  | 俯仰旋转翻转角 |
| `scales` | \* |  | 三维缩放数值 |
| `offsets` | \* |  | 三维偏移量 |

<br><hr>

<br>

##### Returns:

#### clearSurface()

清除surface

<br><hr>

<br>

#### createBox(name, size, axis, color, alpha, outline)

建造方块

##### Parameters:

| Name | Type | Description |
| --- | --- | --- |
| `name` | \* | 方块名称 |
| `size` | \* | 方块大小 |
| `axis` | \* | 方块坐标 |
| `color` | \* | 方块颜色 |
| `alpha` | \* | 方块透明度 |
| `outline` | \* | 方块边框 |

<br><hr>

<br>

##### Returns:

#### createMaterialLine(startAxis, endAxis)

创建动态水流线条

##### Parameters:

| Name | Type | Description |
| --- | --- | --- |
| `startAxis` | \* | 起始坐标 |
| `endAxis` | \* | 终止坐标 |

<br><hr>

<br>

#### createSurface(pos, type)

挖地底面

##### Parameters:

| Name | Type | Description |
| --- | --- | --- |
| `pos` | \* | 位置 |
| `type` | \* | 类型 |

<br><hr>

<br>

#### (async) createTileset(url, options)

异步添加3dTiles模型（新

##### Parameters:

| Name | Type | Description |
| --- | --- | --- |
| `url` | \* |  |
| `options` | \* |  |

<br><hr>

<br>

##### Returns:

#### cutModel(tilesetData, originPositions, isCutInside, hpr, scales, offsets, edgeWidth, color)

模型按坐标逆时针剖切

##### Parameters:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `tilesetData` | \* |  | 模型数据 |
| `originPositions` | \* |  | 切块逆时针坐标数组 |
| `isCutInside` | \* | false | 内部剖切选项 |
| `hpr` | \* |  | 模型headings/pitchs/rolls旋转参数，一般配合changePos()函数使用 |
| `scales` | \* |  | 缩放系数，配合changePos()函数使用 |
| `offsets` | \* |  | 偏移系数，配合changePos()函数使用 |
| `edgeWidth` | \* |  | 边缘宽度 |
| `color` | \* |  | 边缘颜色 |

<br><hr>

<br>

#### deepClone(obj)

深拷贝对象

##### Parameters:

| Name | Type | Description |
| --- | --- | --- |
| `obj` | \* | 对象 |

<br><hr>

<br>

##### Returns:

#### delLine(id, delLast)

删除绘制线条

##### Parameters:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `id` | \* |  | 线条id |
| `delLast` | \* | false | 是否是被删除的最后一个 |

<br><hr>

<br>

#### depthTestAgainstTerrain(bool)

深度测试开关

##### Parameters:

| Name | Type | Description |
| --- | --- | --- |
| `bool` | \* |  |

<br><hr>

<br>

#### dig(axis, size)

挖地

##### Parameters:

| Name | Type | Description |
| --- | --- | --- |
| `axis` | \* | 挖地坐标 |
| `size` | \* | 挖地尺寸 |

<br><hr>

<br>

#### digModel(model, dimensions, size)

模型按方块剖切

##### Parameters:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `model` | \* |  | 使用添加模型方法后返回的模型tileset类 |
| `dimensions` | \* |  | 剖切方向 |
| `size` | \* | 0 | 尺寸 |

<br><hr>

<br>

#### fetchPropertys(path)

请求属性数据json

##### Parameters:

| Name | Type | Description |
| --- | --- | --- |
| `path` | \* |  |

<br><hr>

<br>

#### getAxizFromMatrix(matrix, cityAxiz, rotate, setHeight)

根据4\*4matrix矩阵以及参考坐标系，获取其旋转后的坐标（用于根据模型元组生成标签）

##### Parameters:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `matrix` | \* |  | 原矩阵 |
| `cityAxiz` | \* |  | 参考坐标系 |
| `rotate` | \* | 0 | 旋转角度 |
| `setHeight` | \* | null | 高程 |

<br><hr>

<br>

##### Returns:

#### getEntitiesByName(name, bool)

根据Name获取entities

##### Parameters:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | \* |  |  |
| `bool` | \* | false |  |

<br><hr>

<br>

##### Returns:

#### getPrimitivesById(id, bool)

根据ID获取Primitives

##### Parameters:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `id` | \* |  |  |
| `bool` | \* | false |  |

<br><hr>

<br>

##### Returns:

#### getPrimitivesName(ignore)

查询构件名称并归类

##### Parameters:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `ignore` | \* | null | 需要忽略的构件名称 |

<br><hr>

<br>

##### Returns:

#### initDigSurface(pos, depth)

顺时针生成挖地底部效果

##### Parameters:

| Name | Type | Description |
| --- | --- | --- |
| `pos` | \* | 位置 |
| `depth` | \* | 深度 |

<br><hr>

<br>

#### judgeDirection(points)

输入含有三个经纬坐标值，返回是否顺时针判断

##### Parameters:

| Name | Type | Description |
| --- | --- | --- |
| `points` | \* |  |

<br><hr>

<br>

##### Returns:

#### paintLine(id, positions, height, color, width)

绘制线条

##### Parameters:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `id` | \* |  | 线条id |
| `positions` | \* |  | 线条位置 |
| `height` | \* | 200 | 线条高程 |
| `color` | \* | #47ffe0 | 线条颜色 |
| `width` | \* | 0.5 | 线条宽度 |

<br><hr>

<br>

#### paintWall(id, positions, height, wallHeight, color)

绘制墙体

##### Parameters:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `id` | \* |  |  |
| `positions` | \* |  | xy坐标 |
| `height` | \* | 200 | 坐标高 |
| `wallHeight` | \* | 50 | 墙体高 |
| `color` | \* | #47ffe0 |  |

<br><hr>

<br>

#### pickTilesetByClick(data, callback)

点击3DTiles模型获取属性信息

##### Parameters:

| Name | Type | Description |
| --- | --- | --- |
| `data` | \* |  |
| `callback` | \* |  |

<br><hr>

<br>

#### pickTilesetByPosition(data, position, callback)

根据鼠标位置获取3DTiles模型属性信息

##### Parameters:

| Name | Type | Description |
| --- | --- | --- |
| `data` | \* |  |
| `position` | \* |  |
| `callback` | \* |  |

<br><hr>

<br>

#### setPrimitivesShow(primitiveName, bool, otherbool, ignore)

设置构件显隐

##### Parameters:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `primitiveName` | \* |  | 需要设置的构件名称 |
| `bool` | \* | false | 设置的构件是否隐藏，默认false |
| `otherbool` | \* | true | id为null的构件是否隐藏，使用该参数默认true以保证工具栏显隐正常使用 |
| `ignore` | \* |  | 需要忽略的构件名称 |

<br><hr>

<br>

#### shadowChange(bool)

阴影遮挡开关

##### Parameters:

| Name | Type | Description |
| --- | --- | --- |
| `bool` | \* |  |

<br><hr>

<br>

#### tileSet(tileset, longitude, latitude, height)

变换tileSet坐标

##### Parameters:

| Name | Type | Description |
| --- | --- | --- |
| `tileset` | \* |  |
| `longitude` | \* |  |
| `latitude` | \* |  |
| `height` | \* |  |

<br><hr>

<br>

#### undergroundMode(bool)

地下模式

##### Parameters:

| Name | Type | Description |
| --- | --- | --- |
| `bool` | \* | 是否开启地下模式 |

