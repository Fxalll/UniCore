---
outline: deep
---

# 第一人称自由漫游控制组件

### 功能介绍

通过第一人称自由漫游控制组件，能够更方便地进行自由漫游。实现通过键盘移动、鼠标控制方向的类第一人称游戏操作。

不妨通过代码示例在 Vue 中尝试一下：

### 在线演示

点击 [在线链接](http://192.168.4.66:8091/?id=WanderMode) 以查看在线演示。

### 组件代码示例

默认路径为 `components/WanderMode/index.vue`

```vue
<template>
  <div class="wander-mode">
    <div class="wander-controls" v-show="showControls">
      <div class="control-info">
        <h3>第一人称漫游模式</h3>
        <div v-if="!isPointerLocked" class="start-tip">
          <p><strong>点击屏幕激活漫游控制</strong></p>
          <p><small>鼠标将被锁定在窗口中心</small></p>
        </div>
        <div class="controls-guide">
          <p><strong>鼠标：</strong>控制镜头方向</p>
          <p><strong>WASD：</strong>前后左右移动</p>
          <p><strong>Space：</strong>上升</p>
          <p><strong>Shift：</strong>下降</p>
          <p><strong>ESC：</strong>退出漫游/解锁鼠标</p>
        </div>
      </div>
      <div class="speed-control">
        <label>移动速度：</label>
        <input
          type="range"
          min="1"
          max="100"
          v-model="moveSpeed"
          class="speed-slider"
        />
        <span>{{ moveSpeed }}</span>
      </div>
      <button @click="exitWanderMode" class="exit-btn">退出漫游</button>
    </div>

    <!-- 简化的状态显示 -->
    <div class="wander-status" v-show="isWanderMode && !showControls">
      <span class="status-text">漫游模式</span>
      <button @click="toggleControls" class="toggle-btn">?</button>
    </div>

    <!-- 准星 -->
    <div class="crosshair" v-if="isWanderMode">
      <div class="crosshair-horizontal"></div>
      <div class="crosshair-vertical"></div>
    </div>
  </div>
</template>

<style scoped>
.wander-mode {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1000;
}

.wander-controls {
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 20px;
  border-radius: 10px;
  pointer-events: auto;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.control-info h3 {
  margin: 0 0 15px 0;
  color: #4caf50;
  font-size: 18px;
}

.start-tip {
  background: rgba(76, 175, 80, 0.2);
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 15px;
  border: 1px solid #4caf50;
}

.start-tip p {
  margin: 0;
  color: #4caf50;
  font-weight: bold;
  text-align: center;
}

.controls-guide p {
  margin: 8px 0;
  font-size: 14px;
  line-height: 1.4;
}

.speed-control {
  margin: 15px 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.speed-control label {
  font-size: 14px;
  min-width: 80px;
}

.speed-slider {
  flex: 1;
  min-width: 100px;
}

.speed-control span {
  min-width: 30px;
  text-align: center;
  font-weight: bold;
}

.exit-btn {
  background: #f44336;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s;
}

.exit-btn:hover {
  background: #d32f2f;
}

.crosshair {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
}

.crosshair-horizontal,
.crosshair-vertical {
  position: absolute;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 1px;
}

.crosshair-horizontal {
  width: 20px;
  height: 2px;
  top: 50%;
  transform: translateY(-50%);
}

.crosshair-vertical {
  width: 2px;
  height: 20px;
  left: 50%;
  transform: translateX(-50%);
}

.wander-status {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  pointer-events: auto;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  gap: 10px;
}

.status-text {
  font-size: 14px;
  color: #4caf50;
}

.toggle-btn {
  background: #4caf50;
  color: white;
  border: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-btn:hover {
  background: #45a049;
}
</style>

<script>
import * as Cesium from 'cesium'

export default {
  name: 'WanderMode',
  data () {
    return {
      isWanderMode: false,
      moveSpeed: 10,
      isPointerLocked: false,
      showControls: false, // 默认隐藏详细控件

      // 移动状态
      moveState: {
        forward: false,
        backward: false,
        left: false,
        right: false,
        up: false,
        down: false
      },

      // 鼠标控制
      mouseSensitivity: 0.002,
      lastMouseX: 0,
      lastMouseY: 0,

      // 相机状态
      cameraHeading: 0,
      cameraPitch: 0,

      // 事件监听器引用
      keydownHandler: null,
      keyupHandler: null,
      mousemoveHandler: null,
      clickHandler: null,
      globalClickHandler: null,
      globalMouseDownHandler: null,
      globalMouseUpHandler: null,
      globalPointerDownHandler: null,
      globalPointerUpHandler: null,

      // 动画循环
      animationId: null
    }
  },

  mounted () {
    this.setupEventListeners()
  },

  beforeUnmount () {
    this.cleanup()
  },

  methods: {
    /**
     * 开始漫游模式
     */
    startWanderMode () {
      if (this.isWanderMode) return

      this.isWanderMode = true

      // 保存当前相机状态
      const camera = window.viewer.camera
      this.cameraHeading = camera.heading
      this.cameraPitch = camera.pitch

      // 禁用默认相机控制
      window.viewer.scene.screenSpaceCameraController.enableRotate = false
      window.viewer.scene.screenSpaceCameraController.enableTranslate = false
      window.viewer.scene.screenSpaceCameraController.enableZoom = false
      window.viewer.scene.screenSpaceCameraController.enableTilt = false
      window.viewer.scene.screenSpaceCameraController.enableLook = false

      // 隐藏鼠标光标
      // window.viewer.canvas.style.cursor = 'none'

      // 设置指针锁定（可选）
      this.setupPointerLock()

      // 开始移动循环
      this.startMovementLoop()

      this.$emit('wander-started')
    },

    /**
     * 退出漫游模式
     */
    exitWanderMode () {
      if (!this.isWanderMode) return

      this.showControls = false;
      this.isWanderMode = false
      this.exitPointerLock()

      // 恢复默认相机控制
      window.viewer.scene.screenSpaceCameraController.enableRotate = true
      window.viewer.scene.screenSpaceCameraController.enableTranslate = true
      window.viewer.scene.screenSpaceCameraController.enableZoom = true
      window.viewer.scene.screenSpaceCameraController.enableTilt = true
      window.viewer.scene.screenSpaceCameraController.enableLook = true

      // 恢复鼠标光标
      window.viewer.canvas.style.cursor = 'default'

      // 停止移动循环
      this.stopMovementLoop()

      // 重置移动状态
      this.resetMoveState()

      this.$emit('wander-ended')
    },

    /**
     * 设置指针锁定
     */
    setupPointerLock () {
      const canvas = window.viewer.canvas

      // 使用Pointer Lock API锁定鼠标
      this.clickHandler = (event) => {
        if (this.isWanderMode && !this.isPointerLocked) {
          // 请求指针锁定
          canvas.requestPointerLock = canvas.requestPointerLock ||
            canvas.mozRequestPointerLock ||
            canvas.webkitRequestPointerLock

          if (canvas.requestPointerLock) {
            canvas.requestPointerLock()
          }
        }
      }

      canvas.addEventListener('click', this.clickHandler)

      // 添加多种鼠标事件监听器，用于在指针锁定状态下阻止所有鼠标事件
      this.globalClickHandler = (event) => {
        if (this.isPointerLocked) {
          event.preventDefault()
          event.stopPropagation()
          return false
        }
      }

      this.globalMouseDownHandler = (event) => {
        if (this.isPointerLocked) {
          event.preventDefault()
          event.stopPropagation()
          return false
        }
      }

      this.globalMouseUpHandler = (event) => {
        if (this.isPointerLocked) {
          event.preventDefault()
          event.stopPropagation()
          return false
        }
      }

      this.globalPointerDownHandler = (event) => {
        if (this.isPointerLocked) {
          event.preventDefault()
          event.stopPropagation()
          return false
        }
      }

      this.globalPointerUpHandler = (event) => {
        if (this.isPointerLocked) {
          event.preventDefault()
          event.stopPropagation()
          return false
        }
      }

      // 使用捕获阶段确保优先处理
      document.addEventListener('click', this.globalClickHandler, true)
      document.addEventListener('mousedown', this.globalMouseDownHandler, true)
      document.addEventListener('mouseup', this.globalMouseUpHandler, true)
      document.addEventListener('pointerdown', this.globalPointerDownHandler, true)
      document.addEventListener('pointerup', this.globalPointerUpHandler, true)

      // 监听指针锁定状态变化
      document.addEventListener('pointerlockchange', this.onPointerLockChange.bind(this))
      document.addEventListener('pointerlockerror', this.onPointerLockError.bind(this))
    },

    /**
     * 退出指针锁定
     */
    exitPointerLock () {
      try {
        if (document.pointerLockElement && document.exitPointerLock) {
          document.exitPointerLock()
        }
      } catch (error) {
        console.warn('Failed to exit pointer lock:', error)
      }
      this.isPointerLocked = false
    },

    /**
     * 指针锁定状态变化处理
     */
    onPointerLockChange () {
      const canvas = window.viewer.canvas
      this.isPointerLocked = document.pointerLockElement === canvas ||
        document.mozPointerLockElement === canvas ||
        document.webkitPointerLockElement === canvas

      if (!this.isPointerLocked && this.isWanderMode) {
        // 指针锁定丢失时显示提示，但不自动退出漫游模式
        console.log('指针锁定已丢失，点击屏幕重新激活')
      }
    },

    /**
     * 指针锁定错误处理
     */
    onPointerLockError () {
      console.warn('Pointer lock failed')
      this.exitWanderMode()
    },

    /**
     * 设置事件监听器
     */
    setupEventListeners () {
      // 键盘事件
      this.keydownHandler = (event) => {
        if (!this.isWanderMode) return

        switch (event.code) {
          case 'KeyW':
            this.moveState.forward = true
            break
          case 'KeyS':
            this.moveState.backward = true
            break
          case 'KeyA':
            this.moveState.left = true
            break
          case 'KeyD':
            this.moveState.right = true
            break
          case 'Space':
            event.preventDefault()
            this.moveState.up = true
            break
          case 'ShiftLeft':
          case 'ShiftRight':
            this.moveState.down = true
            break
          case 'Escape':
            if (this.isPointerLocked) {
              // 如果指针锁定状态，先解锁鼠标
              this.exitPointerLock()
            } else {
              // 如果没有指针锁定，退出漫游模式
              this.exitWanderMode()
            }
            break
        }
      }

      this.keyupHandler = (event) => {
        if (!this.isWanderMode) return

        switch (event.code) {
          case 'KeyW':
            this.moveState.forward = false
            break
          case 'KeyS':
            this.moveState.backward = false
            break
          case 'KeyA':
            this.moveState.left = false
            break
          case 'KeyD':
            this.moveState.right = false
            break
          case 'Space':
            this.moveState.up = false
            break
          case 'ShiftLeft':
          case 'ShiftRight':
            this.moveState.down = false
            break
        }
      }

      // 鼠标移动事件
      this.mousemoveHandler = (event) => {
        if (!this.isWanderMode) return

        // 只有在指针锁定状态下才处理鼠标移动
        if (!this.isPointerLocked) return

        // 使用movementX/Y获取鼠标移动距离
        const deltaX = event.movementX || 0
        const deltaY = event.movementY || 0

        // 更新相机方向（修复反转问题）
        this.cameraHeading += deltaX * this.mouseSensitivity
        this.cameraPitch -= deltaY * this.mouseSensitivity // 上下方向反转

        // 限制俯仰角
        this.cameraPitch = Math.max(-Cesium.Math.PI_OVER_TWO,
          Math.min(Cesium.Math.PI_OVER_TWO, this.cameraPitch))
        


        // 应用相机方向
        this.updateCameraOrientation()
      }

      document.addEventListener('keydown', this.keydownHandler)
      document.addEventListener('keyup', this.keyupHandler)
      document.addEventListener('mousemove', this.mousemoveHandler)
    },

    /**
     * 更新相机方向
     */
    updateCameraOrientation () {
      const camera = window.viewer.camera
      camera.setView({
        destination: camera.position,
        orientation: {
          heading: this.cameraHeading,
          pitch: this.cameraPitch,
          roll: 0.0
        }
      })
    },

    /**
     * 开始移动循环
     */
    startMovementLoop () {
      let lastTime = 0
      const move = (currentTime) => {
        if (!this.isWanderMode) return

        // 限制帧率，提高性能
        if (currentTime - lastTime >= 16) { // 约60fps
          this.updateCameraPosition()
          lastTime = currentTime
        }

        this.animationId = requestAnimationFrame(move)
      }

      this.animationId = requestAnimationFrame(move)
    },

    /**
     * 停止移动循环
     */
    stopMovementLoop () {
      if (this.animationId) {
        cancelAnimationFrame(this.animationId)
        this.animationId = null
      }
    },

    /**
     * 更新相机位置
     */
    updateCameraPosition () {
      // 检查是否有任何移动输入
      const hasMovement = this.moveState.forward || this.moveState.backward ||
        this.moveState.left || this.moveState.right ||
        this.moveState.up || this.moveState.down

      if (!hasMovement) return // 没有移动输入时直接返回

      const camera = window.viewer.camera
      const speed = this.moveSpeed * 0.1

      // 计算移动方向
      let moveVector = new Cesium.Cartesian3(0, 0, 0)

      // W/S 前后移动（修复方向）
      if (this.moveState.forward || this.moveState.backward) {
        const direction = this.moveState.forward ? 1 : -1
        const forward = Cesium.Cartesian3.clone(camera.direction)
        Cesium.Cartesian3.normalize(forward, forward)
        const forwardMovement = Cesium.Cartesian3.multiplyByScalar(forward, speed * direction, new Cesium.Cartesian3())
        moveVector = Cesium.Cartesian3.add(moveVector, forwardMovement, moveVector)
      }

      // A/D 左右移动
      if (this.moveState.left || this.moveState.right) {
        const direction = this.moveState.right ? 1 : -1
        const right = Cesium.Cartesian3.clone(camera.right)
        Cesium.Cartesian3.normalize(right, right)
        const rightMovement = Cesium.Cartesian3.multiplyByScalar(right, speed * direction, new Cesium.Cartesian3())
        moveVector = Cesium.Cartesian3.add(moveVector, rightMovement, moveVector)
      }

      if (this.moveState.up || this.moveState.down) {
        const direction = this.moveState.up ? 1 : -1
        const up = Cesium.Cartesian3.clone(camera.up)
        Cesium.Cartesian3.normalize(up, up)
        const upMovement = Cesium.Cartesian3.multiplyByScalar(up, speed * direction, new Cesium.Cartesian3())
        moveVector = Cesium.Cartesian3.add(moveVector, upMovement, moveVector)
      }

      // 应用移动
      if (!Cesium.Cartesian3.equals(moveVector, Cesium.Cartesian3.ZERO)) {
        const newPosition = Cesium.Cartesian3.add(camera.position, moveVector, new Cesium.Cartesian3())

        // 检查新位置是否在地面以下
        const cartographic = Cesium.Cartographic.fromCartesian(newPosition)
        const height = window.viewer.scene.globe.getHeight(cartographic) || 0

        // 确保相机不会低于地面
        if (cartographic.height < height + 1.8) { // 1.8米是人物高度
          cartographic.height = height + 1.8
          const adjustedPosition = Cesium.Cartesian3.fromCartographic(cartographic)
          camera.setView({
            destination: adjustedPosition,
            orientation: {
              heading: this.cameraHeading,
              pitch: this.cameraPitch,
              roll: 0.0
            }
          })
        } else {
          camera.setView({
            destination: newPosition,
            orientation: {
              heading: this.cameraHeading,
              pitch: this.cameraPitch,
              roll: 0.0
            }
          })
        }
      }
    },

    /**
     * 重置移动状态
     */
    resetMoveState () {
      this.moveState = {
        forward: false,
        backward: false,
        left: false,
        right: false,
        up: false,
        down: false
      }
    },

    /**
     * 切换控件显示
     */
    toggleControls () {
      this.showControls = !this.showControls
    },

    /**
     * 清理事件监听器
     */
    cleanup () {
      if (this.keydownHandler) {
        document.removeEventListener('keydown', this.keydownHandler)
      }
      if (this.keyupHandler) {
        document.removeEventListener('keyup', this.keyupHandler)
      }
      if (this.mousemoveHandler) {
        document.removeEventListener('mousemove', this.mousemoveHandler)
      }
      if (this.clickHandler) {
        window.viewer.canvas.removeEventListener('click', this.clickHandler)
      }

      document.removeEventListener('pointerlockchange', this.onPointerLockChange.bind(this))
      document.removeEventListener('pointerlockerror', this.onPointerLockError.bind(this))

      this.stopMovementLoop()

      if (this.isWanderMode) {
        this.exitWanderMode()
      }
    }
  }
}
</script>

```

### 调用代码示例

```vue
<template>
  <div id="unicoreContainer">
    <!-- 第一人称自由漫游控制组件窗口卡片开始 -->
    <wdSet ref="wdSetId"></wdSet>
    <!-- 第一人称自由漫游控制组件窗口卡片结束 -->
  </div>
</template>

<script>
import { UniCore } from 'unicore-sdk'
import { config } from 'unicore-sdk/unicore.config'
import 'unicore-sdk/Widgets/widgets.css'
import wdSet from '@/components/WanderMode/index'; // 第一人称自由漫游控制组件


export default {

  components: {
    wdSet
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.init();
  },

  // 方法集合
  methods: {

    /**
    * 通用图形引擎初始化
    */
    init () {

      // 初始化UniCore

      // 目前采用Cesium的地形&底图数据，这里配置Cesium的token
      let accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxNjEwMzI4My01MjBmLTQzYzktOGZiMS0wMDRhZjE0N2IyMGIiLCJpZCI6MTc1NzkyLCJpYXQiOjE3MTM3NzQ3OTh9.zU-R4MNvHr8rvn1v28PQfDImyutnpPF2lmEgGeSPckQ";
      // 初始化unicore
      let uniCore = new UniCore(config, accessToken);
      uniCore.init("unicoreContainer");
      window.uniCore = uniCore;
      let viewer = uniCore.viewer;

      // 视角初始化
      uniCore.position.buildingPosition(viewer, [113.12380548015745, 28.250758831850005, 700], -20, -45, 1);

      this.$refs.wdSetId.showControls = true;
      if (this.$refs.wdSetId) {
        this.$refs.wdSetId.startWanderMode();
      }



    }
  }

}
</script>
<style scoped>
#unicoreContainer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: black;
}
</style>
```


### 调用代码示例中的关键代码

暂无，只需直接引入组件即可。
