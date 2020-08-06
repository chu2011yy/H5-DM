// components/drag/index.js
let canRun= true;
let startTouchPostion; // 开始触摸点的位置
let startTouchOffset; //开始触摸点偏移量

Component({
  // 启用插槽
  options: {
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    customStyle:{
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    movePosition:{
      x: 0,
      y: 0
    }
  },
  ready(){
  },
  /**
   * 组件的方法列表
   */
  methods: {
    touchStart(event) {
      const touch = event.touches[0];
      const target = event.target;
      const {
        clientX,
        clientY
      } = touch;
      const {
        offsetLeft,
        offsetTop
      } = target;
      startTouchPostion = {
        x: clientX,
        y: clientY 
      }
      startTouchOffset = {
        x: offsetLeft,
        y: offsetTop 
      }
    },
    touchMove(event) {
      // console.log('touchMove',event);
      // 节流,使用transition过度效果使移动效果更顺畅
      if (!canRun) return;
      canRun = false;
      const touch = event.touches[0];
      const {
        clientX,
        clientY
      } = touch;
      this.setData({
        movePosition: {
          x: parseInt(clientX - startTouchPostion.x + startTouchOffset.x),
          y: parseInt(clientY - startTouchPostion.y + startTouchOffset.y)
        }
      })
      setTimeout(()=>{
        canRun = true;
      }, parseInt(1000/60));
    }
  }
})
