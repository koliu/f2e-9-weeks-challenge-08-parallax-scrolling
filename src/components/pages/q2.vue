<template lang="pug">
  .q2
    button.btn-login(@click.prevent="login", v-if="!this.loginManager.isLoggedIn()") LOGIN
    button.btn-login(@click.prevent="logout", v-if="this.loginManager.isLoggedIn()") LOGOUT
    .wrap
      .panel(:class="{'load-panel':isTitleLoaded, 'width-0':!isTitleLoaded}", :style="isAnswered ? 'width: 100%; height: 120%; transition: width 1s ease-in-out 1s' : isTriangleLoaded ? 'height: 120%' : ''")
        .panel-wrap(:style="isAnswered ? 'animation: fade 0.5s forwards reverse' : ''")
          .square(:class="{'load-square':isPanelLoaded, 'default-square':!isPanelLoaded}"
          , :style="isSquareLoaded && isTriangleLoaded && isCircleLoaded ? 'animation: q2-square 4.5s infinite 0.3s linear reverse' : ''")
          .triangle(:class="{'load-triangle':isPanelLoaded, 'default-triangle':!isPanelLoaded}"
          , :style="isSquareLoaded && isTriangleLoaded && isCircleLoaded  ? 'animation: q2-triangle 4s infinite 0.3s linear' : ''")
          .circle(:class="{'load-circle':isPanelLoaded, 'default-circle':!isPanelLoaded}"
          , :style="isSquareLoaded && isTriangleLoaded && isCircleLoaded  ? 'animation: q2-circle 4s infinite 0.3s linear' : ''")
      .wrap1
      .main(:style="isAnswered ? 'animation: fade 0.5s forwards reverse' : ''")
        .ft-title.red {{question.id | toUpperCase}}
        .ft-sub-title.white(v-text="question.title")
        .ft-sub-title-2.blue-light(v-text="question.subTitle")
        ul.list.ft-paragraph.white
          li(v-for="(q, i) in question.options", @click.prevent="redirectPage(i)", v-text="q.desc")
        
</template>
<script>
export default {
  props: {
    getQuestion: {
      type: Function
    }
  },
  data: function() {
    return {
      isTitleLoaded: false,
      isPanelLoaded: false,
      isSquareLoaded: false,
      isCircleLoaded: false,
      isTriangleLoaded: false,
      isAnswered: false,
      question: {}
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
    redirectPage(answerIndex) {
      this.$emit(
        "emit-answer",
        this.question.id,
        this.question.options[answerIndex].point
      );
      this.isAnswered = true;
      document.querySelector(".panel").addEventListener("transitionend", () => {
        setTimeout(() => {
          this.navigator.pushTo("/q3");
        }, 200);
      });
    }
  },
  mounted() {
    this.question = this.getQuestion('q2');

    const main = document.querySelector(".main");
    main.addEventListener("animationend", () => {
      this.isTitleLoaded = true;
    });

    const panel = document.querySelector(".panel");
    panel.addEventListener("transitionend", () => {
      this.isPanelLoaded = true;
    });

    const square = document.querySelector(".square");
    square.addEventListener("transitionend", () => {
      this.isSquareLoaded = true;
    });
    const circle = document.querySelector(".circle");
    circle.addEventListener("transitionend", () => {
      this.isCircleLoaded = true;
    });
    const triangle = document.querySelector(".triangle");
    triangle.addEventListener("transitionend", () => {
      this.isTriangleLoaded = true;
    });
  }
};
</script>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,400i,500,700,900");
@import "../../css/partials/predefined";
@import "../../css/partials/animations";
@import "../../css/partials/text-utils";

$panel-width: 35%;
$square-width: 350px;
$triangle-width: 320px;
$circle-width: 191px;
.q2 {
  background-color: $color-blue;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;

  .wrap {
    box-sizing: border-box;
    padding: 86px 122px 0 0;
    position: relative;
    width: 100%;
    @include flex-box(flex-end, flex-start, row, nowrap);

    .wrap1 {
      width: 40%;
    }

    .main {
      animation: fade 0.5s ease-in 0s forwards;
      height: 768px;
      width: 40%;
      position: relative;
      right: 0;
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
          cursor: pointer;
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

    .panel {
      background-color: $color-red;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;

      .square {
        background-color: $color-blue;
        height: $square-width;
        left: - $square-width / 2;
        position: absolute;
        width: $square-width;
        transition: top 1.5s ease-in 0.3s;
      }
      .triangle {
        border-left: $triangle-width / 2 solid transparent;
        border-right: $triangle-width / 2 solid transparent;
        border-bottom: $triangle-width solid $color-white;
        left: calc(1.2% / $panel-width);
        position: absolute;
        transition: top 1.5s ease-in;
      }
      .circle {
        background-color: $color-black;
        border-radius: 50%;
        height: $circle-width;
        width: $circle-width;
        position: absolute;
        transition: top 1.5s ease-in 0.6s;
        left: $panel-width / 2;
      }
    }
  }
}
.default-circle {
  visibility: hidden;
  top: 100%;
}
.load-circle {
  visibility: visible;
  top: 424px;
}
.default-triangle {
  visibility: hidden;
  top: 100%;
}
.load-triangle {
  visibility: visible;
  transform: rotate(148deg);
  top: -80px;
}
.default-square {
  visibility: hidden;
  top: 100%;
}
.load-square {
  visibility: visible;
  transform: rotate(54deg);
  top: 260px;
}
.load-panel {
  width: $panel-width;
  transition: width 1s ease-in 0.1s;
}
.width-0 {
  width: 0;
}
</style>
