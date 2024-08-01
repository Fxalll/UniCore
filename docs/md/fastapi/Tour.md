# Class: Tour

## Tour()

UniTour类

## Constructor

### new Tour()


## Classes

### Methods

#### start(parameter)

第一视角飞行漫游加载方法

##### Parameters:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `parameter` | \* |  | 第一视角漫游默认配置项 |

<br><hr>

<br>

#### startOnGround(parameter)

第一视角贴地漫游加载方法

##### Parameters:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `parameter` | \* |  | 第一视角漫游默认配置项 |
| `exclude ` | \* |  | 排除需要贴地的模型数组，防止贴着数组内的模型上方 |

<br><hr>

<br>

##### Returns:

#### changeView(value)

漫游视角切换方法

##### Parameters:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | \* |  | value为'first'为第一视角，'none'为取消视角跟随 |

<br><hr>

<br>

#### stop()

暂停第一视角漫游事件

<br><hr>

<br>

#### quit()

销毁第一视角漫游事件

<br><hr>

<br>

#### startTweensTour(viewPoints)

开启动画插值漫游

##### Parameters:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `viewPoints` | \* |  |  |

<br><hr>

<br>

#### stopTweensTour()

关闭动画插值漫游
