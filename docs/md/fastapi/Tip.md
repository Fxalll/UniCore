# Class: Tip

## Tip()

UniTip类

## Constructor

### new Tip()


## Classes

### Methods

#### createPoint(id, worldPosition, color, pixelSize)

添加点

##### Parameters:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `id` | \* |  | id值 |
| `worldPosition` | \* |  | 坐标 |
| `color` | \* |  | 颜色 |
| `pixelSize` | \* | 6 | 大小 |

<br><hr>

<br>

##### Returns:

#### createTip(id, text, axis, color, alpha, scale, translucency)

创建模型标签Tip

##### Parameters:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `id` | \* |  | id值 |
| `text` | \* |  | 标签内容 |
| `axis` | \* |  | 标签坐标 |
| `callback` | \* |  | 标签点击回调事件 |
| `color` | \* | #1a1a1a | 标签颜色 |
| `alpha` | \* | 1 | 标签透明度 |
| `scale` | \* |  | 标签scaleByDistance参数，eg:\[250, 1.0, 550, 0.0\] |
| `translucency` | \* |  | 标签translucencyByDistance参数，eg:\[250000, 1.0, 5500000, 0.0\] |

<br><hr>

<br>

#### createImgTip(id, url, axis, options = {}, callback = null)

创建图片标签

##### Parameters:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `id` | \* |  | id值 |
| `url` | \* |  | 图片url |
| `axis` | \* |  | 坐标 |
| `options` | \* | {} | 设置 |
| `callback` | \* | #null | 点击回调函数 |

<br><hr>

<br>

#### createHtmlTip(id, text)

将HTML元素作为标签

##### Parameters:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `id` | \* |  | id值 |
| `axis` | \* |  | 标签坐标 |
| `isFixed` | \* |  | 是否将元素固定 |

<br><hr>

<br>

#### getTipById(id)

根据id查找tip

##### Parameters:

| Name | Type | Description |
| --- | --- | --- |
| `id` | \* |  |

<br><hr>

<br>

##### Returns:

#### hidePointById(id)

根据id隐藏point

##### Parameters:

| Name | Type | Description |
| --- | --- | --- |
| `id` | \* |  |
| `bool` | \* | 是否隐藏（或显示） |

<br><hr>

<br>

#### hideTipById(id)

根据id隐藏tip

##### Parameters:

| Name | Type | Description |
| --- | --- | --- |
| `id` | \* |  |
| `bool` | \* | 是否隐藏（或显示） |

<br><hr>

<br>

#### hideTipByText(id)

根据text隐藏tip

##### Parameters:

| Name | Type | Description |
| --- | --- | --- |
| `text` | \* |  |
| `bool` | \* | 是否隐藏（或显示） |

<br><hr>

<br>

#### hideTipByIDText(id)

根据id与text隐藏tip

##### Parameters:

| Name | Type | Description |
| --- | --- | --- |
| `id` | \* |  |
| `text` | \* |  |
| `bool` | \* | 是否隐藏（或显示） |

<br><hr>

<br>

#### initTip(cartesian, str, flage)

模型信息

##### Parameters:

| Name | Type | Description |
| --- | --- | --- |
| `cartesian` | \* |  |
| `str` | \* |  |
| `flage` | \* |  |

