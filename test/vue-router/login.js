xdefine("login", function (nextTick) {
  nextTick({
    template: `<div><span>{{message}}<span>
            </div>`,
    data() {
      return {
        message: "登录",
      };
    },
    methods: {
      change() {
        this.message = Math.random();
      },
    },
    beforeCreate() {
      console.log("login=》beforeCreate");
    },
    created() {
      console.log("login=》created");
    },
    beforeMount() {
      console.log("login=》beforeMount");
    },
    mounted() {
      console.log("login=》mounted");
    },
    beforeUpdate() {
      console.log("login=》beforeUpdate");
    },
    updated() {
      console.log("login=》updated");
    },
    beforeDestroy() {
      console.log("login=》beforeDestroy");
    },
    destroyed() {
      console.log("login=》destroyed");
    },
  });
});
