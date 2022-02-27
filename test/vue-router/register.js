xdefine("register", function (nextTick) {
   nextTick({
    template: `<div> register <span>{{message}}<span></div>`,
    data() {
      return {
        message: "register组件",
      };
    },
    methods: {
      change() {
        this.message ="register组件"+ Math.random();
      },
    },
    beforeCreate() {
      console.log(this.$route.params)
      console.log("register=》beforeCreate");
    },
    created() {
      console.log("register=》created");
    },
    beforeMount() {
      console.log("register=》beforeMount");
    },
    mounted() {
      console.log("register=》mounted");
    },
    beforeUpdate() {
      console.log("register=》beforeUpdate");
    },
    updated() {
      console.log("register=》updated");
    },
    beforeDestroy() {
      console.log("register=》beforeDestroy");
    },
    destroyed() {
      console.log("register=》destroyed");
    },
  });
});
