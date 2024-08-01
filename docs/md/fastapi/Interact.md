# Class: Interact

## Interact()

UniInteract类

## Constructor

### new Interact()

## Classes


### Methods

#### setHighLightTileset(ids)

给予3dtiles模型高亮显示功能

##### Parameters:

| Name | Type | Description |
| --- | --- | --- |
| `ids` | \* |  |

<br><hr>

<br>

#### setTilesRightClickMenu(modelList, showPropertyFunc = null, showFunc = null, switchBIMFunc = null, switchGISFunc = null)

3DTiles 右键菜单功能

##### Parameters:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `modelList` | \* |  |  |
| `showPropertyFunc` | \* | null | 右键菜单查看属性回调方法 默认为null |
| `showFunc` | \* | null | 右键菜单即触发回调方法 默认为null |
| `switchBIMFunc` | \* | null | 切换到BIM场景时触发回调方法 默认为null |
| `switchGISFunc` | \* | null | 切换到GIS场景时触发回调方法 默认为null |

<br><hr>

<br>

#### setGltfRightClickMenu(showPropertyFunc = null, showFunc = null, switchBIMFunc = null, switchGISFunc = null)

glTF 右键菜单功能

##### Parameters:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `showPropertyFunc` | \* | null | 右键菜单查看属性回调方法 默认为null |
| `showFunc` | \* | null | 右键菜单即触发回调方法 默认为null |
| `switchBIMFunc` | \* | null | 切换到BIM场景时触发回调方法 默认为null |
| `switchGISFunc` | \* | null | 切换到GIS场景时触发回调方法 默认为null |