<template>
  <div>
    <el-row style="height:50px"></el-row>
    <el-container>
      <el-main>
        <el-row>
          <el-col :span="22" :offset="1">
            <el-card>
              <el-row>
                <el-col :span="18">
                  <el-image :src="imageUrl" style="height:500px" :fit="cover"></el-image>
                </el-col>

                <el-col :span="5" :offset="1">
                  <el-form
                    :model="LoginForm"
                    ref="LoginForm"
                    :rules="rule"
                    label-width="0"
                    style="align:'center'"
                  >
                    <h3
                      style="font-weight:bolder; font-size:larger; marginTop: 80px; margin-bottom: 30px"
                    >登录</h3>

                    <el-form-item prop="id" v-show="account">
                      <el-input type="text" v-model="LoginForm.id" placeholder="请输入您的账号"></el-input>
                    </el-form-item>

                    <el-form-item prop="pwd" v-show="account">
                      <el-input type="password" v-model="LoginForm.pwd" placeholder="请输入您的密码"></el-input>
                    </el-form-item>

                    <el-form-item prop="id" v-show="phone">
                      <el-input type="text" v-model="LoginForm.id" placeholder="请输入您的电话号码"></el-input>
                    </el-form-item>

                    <el-form-item prop="pwd" v-show="phone">
                      <el-input
                        style="width: 65%;"
                        type="password"
                        v-model="LoginForm.pwd"
                        placeholder="请输入您的验证码"
                      ></el-input>
                      <el-button type="danger" class="code" style="padding-left: 15px;" round>获取验证码</el-button>
                    </el-form-item>

                    <el-form-item>
                      <el-button
                        type="danger"
                        class="submitBtn"
                        align="center"
                        round
                        @click.native.prevent="submit('LoginForm')"
                      >登录</el-button>
                    </el-form-item>

                    <el-form-item class="switch" v-show="account">
                      <i class="el-icon-mobile-phone">
                        <a href="#" @click="switchs">验证码登录</a>
                      </i>
                    </el-form-item>

                    <el-form-item class="switch" v-show="phone">
                      <i class="el-icon-lock">
                        <a href="#" @click="switchs">密码登录</a>
                      </i>
                    </el-form-item>

                    <el-form-item>
                      <el-divider></el-divider>
                      <el-button round class="create" @click="toregin">创建新企业</el-button>
                    </el-form-item>
                  </el-form>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </el-main>

      <el-footer style="marginTop:30px">
        <el-divider content-position="center">Copyright @ 东软客户关系管理系统</el-divider>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  // ....
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.LoginForm.checkPass !== "") {
          this.$refs.LoginForm.validateField("checkPass");
        }
        callback();
      }
    };
    return {
      account: true,
      phone: false,
      activeName: "first",
      LoginForm: {
        id: "",
        pwd: ""
      },
      rule: {
        id: [
          {
            required: true,
            max: 14,
            min: 2,
            message: "用户名是必须的，长度为2-14位",
            trigger: "blur"
          }
        ],
        pwd: [
          {
            required: true,
            message: "密码是必须的！",
            trigger: "blur",
            validator: validatePass
          }
        ]
      },

      imageUrl: require("../assets/loginPic.jpg")
    };
  },
  methods: {
    // 提交表单
    submit(formName) {
      this.$router.push("/Home");
      // this.$refs[formName].validate(valid => {
      //   if (valid) {
      //     axios
      //       .post(
      //         "http://172.20.10.9:8080/hims/auth/login",
      //         qs.stringify(
      //           { id: this.LoginForm.id, pwd: this.LoginForm.pwd },
      //           {
      //             headers: {
      //               "Content-Type": "application/x-www-form-urlencoded"
      //             }
      //           }
      //         )
      //       )
      //       .then(res => {
      //         console.log(res.data.status);
      //         if (res.data.status == 200) {
      //           this.$router.push("/Home");
      //         }
      //       });
      //   } else {
      //     console.log(res.data.status);
      //     console.log(res.data.msg);
      //           this.$notify.error({
      //             title: res.data.msg,
      //             //message: 'res.data.msg'
      //           });
      //           return false;

      //     console.log("submit err");
      //     return false;
      //   }
      // });
    },
    reset() {
      this.$refs.LoginForm.resetFields();
    },
    toregin() {
      this.$router.push("/Register");
    },
    doTest() {
      console.log("test beign");
      //let data = {id:'ad',pwd:'admin'};
      axios
        .post(
          "http://192.168.0.7:8080/hims/login",
          qs.stringify(
            { id: "admin", pwd: "admin" },
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
          )
        )
        .then(res => {
          console.log("res=>", res);
        });
    },
    // 点击切换登录方式
    switchs() {
      if (this.account) {
        this.account = false
        this.phone = true
      } else {
        this.account = true
        this.phone = false
      }
    }
  }
};
</script>

<style scoped>
a {
  margin-left: 5px;
  color: #e78989;
}
a:link {
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
.login-form {
  margin: 20px auto;
  width: 310px;
  background: #fff;
  box-shadow: 0 0 35px #b4bccc;
  padding: 30px 30px 0 30px;
  border-radius: 25px;
}
.submitBtn {
  width: 65%;
}
.to {
  color: #67c23a;
  cursor: pointer;
}
.create {
  /* margin-top: 20%; */
  border: 1px solid #e78989;
  color: #e78989;
}
.switch {
  margin-top: -6%;
  margin-left: 70%;
  color: #e78989;
}
.code {
  width: 30%;
  margin-left: 5%;
  padding-left: 15px;
}
</style>
