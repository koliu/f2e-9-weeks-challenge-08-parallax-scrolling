<template lang="pug">
  .app.h-100-p Coming Soon...
    button.btn-login(@click.prevent="login", v-if="!this.loginManager.isLoggedIn()") LOGIN
    button.btn-login(@click.prevent="logout", v-if="this.loginManager.isLoggedIn()") LOGOUT
    .item.square
    .item.circle
    .item.star
      .top
      .bottom
    .item.title
      i.ft-title GEOMETRY PERSON
      i.ft-sub-title-2 find your core personality type in shapes!
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
@import "../css/partials/predefined";
@import "../css/partials/animations";
@import "../css/partials/text-utils";

$star-height: 365px;
$star-head-height: 57px;
$star-triangle-height: 365px - $star-head-height;
.app {
  padding-bottom: 30px;
  @include flex-box(center, center);

  .item {
    position: absolute;

    &.square {
      background-color: $color-black;
      height: 439px;
      width: 439px;
      z-index: 6;
      animation: spin 4s linear reverse forwards,
                zoom-out 1s linear 4.25s forwards,
                fade 2s linear 5.25s reverse forwards;
    }
    &.circle {
      background-color: $color-blue;
      border-radius: 50%;
      height: 539px;
      width: 539px;
      z-index: 8;
      animation: zoom-in-out 4s linear forwards,
                zoom-out 1s linear 4.5s forwards,
                fade 2s linear 5.25s reverse forwards;
    }

    &.star {
      box-sizing: border-box;
      height: $star-height;
      width: $star-height;
      z-index: 10;
      animation: spin 4s linear forwards,
                zoom-out 1s linear 4.75s forwards,
                fade 2s linear 5.25s reverse forwards;

      .top,
      .bottom {
        border-left: $star-height / 2 solid transparent;
        border-right: $star-height / 2 solid transparent;
        position: absolute;
      }

      .top {
        border-bottom: $star-triangle-height solid $color-red;
      }

      .bottom {
        border-top: $star-triangle-height solid $color-red;
        margin-top: $star-head-height;
      }
    }

    &.title {
      color: $color-white;
      z-index: 12;
      animation: fade 2s linear 5.25s reverse forwards;
      @include flex-box(center, center, column, wrap);
      
      i {
        display: block;

        &:first-child {
          margin-bottom: 12px;
        }

        &:last-child {
          margin-top: 12px;
        }
      }
    }
  }
}

.btn-login {
  border: 1px dashed $color-yellow;
  background: rgba(255, 255, 255, 0.3);
  color: $color-yellow;
  position: fixed;
  left: 5px;
  bottom: 5px;
  z-index: 99999;

  &:hover {
    border-color: $color-blue;
    color: $color-blue;
    cursor: pointer;
    font-weight: bolder;
  }
}
</style>
