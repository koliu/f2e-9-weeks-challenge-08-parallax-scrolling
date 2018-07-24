<template lang="pug">
  .index-main(:class="{'hide-over-flow':!finishAnimation}")
    template(v-if="!finishAnimation")
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
    transition(name="fade" mode="out-in" appear, v-if="finishAnimation")
      router-view(@emit-answer="answer", :get-question="getQuestion")
</template>
<script>
export default {
  data: function() {
    return {
      page: "index",
      finishAnimation: false,
      answers: [],
      questions: []
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
    }, 
    answer(id, point) {
      const index = this.questions.findIndex(e => e.id === id);
      this.answers[index] = point;
    },
    loadQuestions() {
      this.http
      .get('/src/data/data.json')
      .then(res => {
        this.questions = res.data.questions;
      })
      .catch(err => {
        throw new Error(`Fail to load data of questions: ${err}`);
      });
    },
    getQuestion(id) {
      return this.questions.find(e => e.id === id);
    }
  },
  created() {
    this.loadQuestions();
  },
  mounted() {

    // document.querySelector('.title').addEventListener('animationend', () => {
    //   this.finishAnimation = true;
    //   this.navigator.pushTo("/q1");
    // }, true);

    setTimeout(() => {
      this.finishAnimation = true;
      this.navigator.pushTo("/q1");
    }, 300);
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
.index-main {
  height: calc(100% - 32px); // - bottom menu bar
  @include flex-box(center, center);

  .item {
    position: absolute;

    &.square {
      background-color: $color-black;
      height: 439px;
      width: 439px;
      z-index: 6;
      animation: spin 4s linear reverse forwards,
        zoom-out 1s ease 4.25s forwards, fade 2s linear 5.25s reverse forwards;
    }
    &.circle {
      background-color: $color-blue;
      border-radius: 50%;
      height: 539px;
      width: 539px;
      z-index: 8;
      animation: zoom-in-out 4s linear forwards,
        zoom-out 1s ease 4.5s forwards, fade 2s linear 5.25s reverse forwards;
    }

    &.star {
      box-sizing: border-box;
      height: $star-height;
      width: $star-height;
      z-index: 10;
      animation: spin 4s linear forwards, zoom-out 1s ease 4.75s forwards,
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
          margin-bottom: 6px;
        }

        &:last-child {
          margin-top: 6px;
        }
      }
    }
  }
}
</style>
