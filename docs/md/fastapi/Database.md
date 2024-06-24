# Class: DataBase

## DataBase()

UniDataBase类

## Constructor

### new DataBase()

##### Example

```js
uniCore.database.get(modelUrl).then(blob => {
 const url = URL.createObjectURL(new Blob([blob]));
...
})
```

## Classes

[DataBase](DataBase.html)

### Methods

#### (async) addData(url)

向数据库添加数据

##### Parameters:

| Name | Type | Description |
| --- | --- | --- |
| `url` | \* |  |

<br>

<br><hr>

##### Returns:

#### (async) get(url)

获取三维模型URL

##### Parameters:

| Name | Type | Description |
| --- | --- | --- |
| `url` | \* |  |

<br>

<br><hr>

##### Returns:

#### initDataBase(dbName, storeName, dbVersion)

初始化数据库

##### Parameters:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `dbName` | \* |  |  |
| `storeName` | \* |  |  |
| `dbVersion` | \* | 1 |  |
