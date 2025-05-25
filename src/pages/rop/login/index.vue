<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <div class="title-container">
        <span class="title-line-left" />
        <span class="title">{{ systemTitle }}</span>
        <span class="title-line-right" />
      </div>
      <div class="form-box">
        <el-form-item prop="username">
          <span class="img-container">
            <img src="@/assets/loginPhone.png">
          </span>
          <el-input v-model="loginForm.username" :placeholder="$t('login.username')" name="username" type="text" auto-complete="on" minlength="3" maxlength="12" @blur="mobileInputBlur" />
        </el-form-item>
        <el-form-item prop="password">
          <span class="img-container">
            <img src="@/assets/loginPassword.png">
          </span>
          <el-input v-model="loginForm.password" :placeholder="$t('login.password')" class="verification-input" name="password" show-password auto-complete="on" @keyup.enter.native="handleLogin" />
        </el-form-item>
        <el-button :loading="loading" type="primary" class="login-btn" @click.native.prevent="handleLogin">{{ $t('login.logIn') }}</el-button>
        <div class="lt" />
        <div class="lb" />
        <div class="rt" />
        <div class="rb" />
      </div>
    </el-form>
    <div class="login-footer">
    </div>
    <el-dialog :title="$t('login.thirdparty')" :visible.sync="showDialog" append-to-body>
      {{ $t('login.thirdpartyTips') }}
      <br>
      <br>
      <br>
      <social-sign />
    </el-dialog>
  </div>
</template>

<script>
import { validMobile } from "@/utils/validate";
import LangSelect from "@/components/LangSelect";
import SocialSign from "./socialsignin";
import { Message } from "element-ui";

export default {
  name: "Login",
  components: { LangSelect, SocialSign },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length == 0) {
        callback(new Error("请输入账户"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length == 0) {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ]
      },
      loading: false,
      showDialog: false,
      redirect: undefined,
      redirectQuery: undefined,
      show: true,
      count: "",
      timer: null,
      verificationButtonText: "获取验证码",
      systemTitle: this.$t("login.title"),
      verificationBtnDisable: false,
      selectCityShow: false
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
        this.redirectQuery = delete route.query.redirect ? route.query : {};
      },
      immediate: true
    }
  },
  mounted() {
    this.intiSize();
    this.initViewPort(false);
    document.body.addEventListener(
      "touchmove",
      function(event) {
        event.preventDefault();
      },
      false
    );
  },
  destroyed() {
    window.onresize = null;
  },
  methods: {
    getCode() {
      if (this.verificationBtnDisable) return;
      if (!validMobile(this.loginForm.username)) {
        Message.error("请输入正确的手机号");
        return;
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("LoginByUsername", JSON.stringify(this.loginForm))
            .then(() => {
              this.loading = false;
              this.$router.push({ path: "/", query: this.redirectQuery });
            })
            .catch(e => {
              this.loading = false;
              // return this.$message({
              //   message: e.message || "登录失败",
              //   type: "error"
              // });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    initViewPort(scalable) {
      // 初始化viewport，禁止缩放页面
      const metas = window.parent.document.getElementsByTagName("meta");
      const content = scalable
        ? "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.6, user-scalable=yes"
        : "width=device-width, initial-scale=1.0, minimum-scale=1, maximum-scale=1, user-scalable=no";
      for (let i = 0; i < metas.length; i++) {
        if (metas[i].getAttribute("name") === "viewport") {
          metas[i].setAttribute("content", content);
        }
      }
    },
    intiSize() {
      const height = document.documentElement.clientHeight;
      const box = document.querySelector(".login-container");
      box.style.zoom = height / 800;
      window.onresize = () => {
        const height = document.documentElement.clientHeight;
        const box = document.querySelector(".login-container");
        box.style.zoom = height / 800;
      };
    },
    mobileInputBlur() {
      if (!validMobile(this.loginForm.username)) {
        this.selectCityShow = false;
        return;
      }
    },
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #102077;
$light_gray: #eee;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
    &::first-line {
      color: $light_gray;
    }
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 42px;
    width: 85%;
    vertical-align: middle;
    flex: 1;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 12px;
      color: $light_gray;
      height: 42px;
      caret-color: $cursor;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .verification-input {
    width: 55%;
  }
  .verification-span {
    cursor: pointer;
    flex: 1;
    text-align: right;
    margin-right: 10px;
    // display: inline-block;
    font-family: PingFangSC-Medium;
    font-size: 12px;
    color: #1a64ff;
    line-height: 12px;
  }
}
.city-input {
  width: 100%;
  .el-input {
    width: 100%;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background: url("../../../assets/login.jpg") no-repeat center top;
  background-size: 1980px 800px;
  background-color: #061769;
  .form-box {
    width: 328px;
    max-width: 100%;
    background: rgba(216, 216, 216, 0.05);
    border-radius: 4px;
    border-radius: 4px;
    margin: 0 auto;
    position: relative;
    padding: 30px 33px;
  }
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 358px;
    max-width: 100%;
    margin: 197px auto;
    // margin: 227px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title-container {
    position: relative;
    margin: 0px auto 30px auto;
    text-align: center;
    .title-line-left {
      display: inline-block;
      opacity: 0.5;
      vertical-align: middle;
      width: 78px;
      height: 1px;
      background-image: linear-gradient(
        270deg,
        #ffffff 0%,
        rgba(255, 255, 255, 0) 100%
      );
      margin-right: 6px;
    }
    .title-line-right {
      display: inline-block;
      opacity: 0.5;
      vertical-align: middle;
      width: 78px;
      height: 1px;
      background-image: linear-gradient(
        90deg,
        #ffffff 0%,
        rgba(255, 255, 255, 0) 100%
      );
      margin-left: 6px;
    }
    .title {
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: rgba(255, 255, 255, 0.5);
      letter-spacing: 0;
      vertical-align: middle;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
  .el-form-item {
    margin-bottom: 28px;
  }
  /deep/ .el-form-item__content {
    height: 42px;
    background: #102077;
    display: flex;
    align-items: center;
    .img-container {
      display: flex;
      width: 37px;
      height: 28px;
      justify-content: center;
      align-items: center;
      border-right: 1px solid rgba(255, 255, 255, 0.2);
      img {
        width: 13px;
        height: 19px;
      }
    }
  }
}

.login-btn {
  width: 100%;
  height: 38px;
  // opacity: 0.4;
  background: #0255ff;
  border-radius: 19px;
  border-radius: 19px;
  border: none;
  margin: 4px 0 2px;
}

.login-footer {
  position: fixed;
  bottom: 30px;
  left: 0;
  right: 0;
  text-align: center;
  img {
    width: 18px;
    height: 18px;
    vertical-align: middle;
    margin: 0 15px 0 1px;
  }
  span {
    font-family: PingFangSC-Regular;
    font-size: 12px;
    // color: #FFFFFF;
    color: #e0e2ee;
    letter-spacing: 0.3px;
    white-space: pre-wrap;
    vertical-align: middle;
  }
}

.lt {
  position: absolute;
  left: 0;
  top: 0;
  width: 16px;
  height: 16px;
  border-radius: 4px 0 0 0;
  border-left: 2px solid #1a65ff;
  border-top: 2px solid #1a65ff;
}
.lb {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 16px;
  height: 16px;
  border-radius: 0 0 0 4px;
  border-left: 2px solid #1a65ff;
  border-bottom: 2px solid #1a65ff;
}
.rt {
  position: absolute;
  right: 0;
  top: 0;
  width: 16px;
  height: 16px;
  border-radius: 0 4px 0 0;
  border-right: 2px solid #1a65ff;
  border-top: 2px solid #1a65ff;
}
.rb {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 16px;
  height: 16px;
  border-radius: 0 0 4px 0;
  border-right: 2px solid #1a65ff;
  border-bottom: 2px solid #1a65ff;
}
</style>
