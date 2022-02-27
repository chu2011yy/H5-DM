define("app", function (nextTick) {
  require("./child.js", "child", function (Child){
      nextTick( {
      template: `<div><span>{{message}}<span><button @click="change">更新数据</button>
            <Child/></div>`,
      data() {
        return {
          message: "saasfasfasf",
        };
      },
      components: {
        Child,
      },
      methods: {
        change() {
          this.message = Math.random();
        },
      },
      beforeCreate() {
        console.log("父=》beforeCreate");
      },
      created() {
        console.log("父=》created");
      },
      beforeMount() {
        console.log("父=》beforeMount");
      },
      mounted() {
        console.log("父=》mounted");
      },
      beforeUpdate() {
        console.log("父=》beforeUpdate");
      },
      updated() {
        console.log("父=》updated");
      },
      beforeDestroy() {
        console.log("父=》beforeDestroy");
      },
      destroyed() {
        console.log("父=》destroyed");
      },
    })
  });
});
