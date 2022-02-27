define("child", function (nextTick) {
   nextTick({
    template: `<div><span>{{message}}  child <span><button @click="change">更新数据</button></div>`,
    data() {
      return {
        message: "子组件",
      };
    },
    methods: {
      change() {
        this.message ="子组件"+ Math.random();
      },
    },
    beforeCreate() {
      console.log("子=》beforeCreate");
    },
    created() {
      console.log("子=》created");
    },
    beforeMount() {
      console.log("子=》beforeMount");
    },
    mounted() {
      console.log("子=》mounted");
    },
    beforeUpdate() {
      console.log("子=》beforeUpdate");
    },
    updated() {
      console.log("子=》updated");
    },
    beforeDestroy() {
      console.log("子=》beforeDestroy");
    },
    destroyed() {
      console.log("子=》destroyed");
    },
  });
});
