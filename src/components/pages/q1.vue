<template lang="pug">
  .app
    button.btn-login(@click.prevent="login", v-if="!this.loginManager.isLoggedIn()") LOGIN
    button.btn-login(@click.prevent="logout", v-if="this.loginManager.isLoggedIn()") LOGOUT
    .wrap
      .main
        .ft-title.red Q1
        .ft-sub-title.white If one day you get a gift that can change the rule of the world, which ability will you choose? 
        .ft-sub-title-2.blue Choose the answer appeared in your mind instantly
        ul.list.ft-paragraph.white
          li Destroy all humans in the world
          li Make the war never happened
          li You won’t get old and live forever
      .animations
        .square.red
        .triangle.white
        .circle.black
</template>
<script>
export default {
  data: function() {
    return {
      page: "index"
    };
  },
  methods: {
    login() {
      this.loginManager.login();
      this.loggedIn = this.loginManager.isLoggedIn();
      this.$forceUpdate();
    },
    logout() {
      this.loginManager.logout();
      this.$forceUpdate();
    }
  }
};
</script>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,400i,500,700,900");
@import "../../css/partials/predefined";
@import "../../css/partials/animations";
@import "../../css/partials/text-utils";

.app {
  height: 100%;
  width: 100%;
  overflow-y: auto;

  .wrap {
    box-sizing: border-box;
    padding: 86px 0 0 122px;
    position: relative;
    width: 100%;
    @include flex-box(flex-start, flex-start, row, nowrap);

    .main {
      animation: fade 0.5s ease-in 0s forwards;
      height: 768px;
      width: 60%;
      @include flex-box(flex-start, flex-start, column, wrap);

      .ft-title {
        margin-left: 8px;
      }
      .ft-sub-title {
        margin-top: 10px;
        margin-bottom: 16px;
        width: 402px;
      }
      .ft-sub-title-2 {
        width: 380px;
      }
      .list {
        margin-top: 40px;

        li {
          border: 2px solid $color-white;
          border-radius: 30.5px;
          height: 56px;
          margin-top: 10px;
          width: 380px;
          @include flex-box(center, center);

          &:hover {
            background-color: $color-white;
            color: $color-blue-light;
          }
        }
      }
    }

    .animations {
      animation: slide-x 1s ease-in 0.5s forwards;
      background-color: $color-blue;
      height: 100%;
      position: absolute;
      right: 0;
      top: 0;
      width: 0;

      .square {
        height: 179px;
        position: absolute;
        bottom: 0;
        width: 179px;
      }
    }
  }
}
</style>
