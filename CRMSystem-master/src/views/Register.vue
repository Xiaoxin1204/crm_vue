
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

                <el-col :span="5" style="margin-left:20px">
                  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
                    <h3
                      style="font-weight:bolder; font-size:larger; marginTop: 80px; margin-bottom: 30px"
                    >注册</h3>

                    <el-form-item label="公司名称" prop="name">
                      <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>

                    <el-form-item label="密码" prop="pass">
                      <el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="确认密码" prop="checkPass">
                      <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="手机" prop="tel">
                      <el-input type="text" v-model="ruleForm.tel"></el-input>
                    </el-form-item>

                    <el-form-item label="验证码" prop="sms">
                      <el-input style="width: 65%;" type="password" v-model="ruleForm.sms"></el-input>
                      <el-button
                        type="danger"
                        class="code"
                        style="padding-left: 7px;"
                        round
                        @click="sendSms"
                        v-show="time == 0"
                      >获取验证码</el-button>
                      <el-button
                        type="danger"
                        class="code"
                        style="padding-left: 8px;"
                        round
                        @click="sendSms"
                        v-show="time != 0"
                        disabled
                      >{{time}}s 后重发</el-button>
                    </el-form-item>

                    <el-form-item>
                      <el-alert :title="msg" type="error" center show-icon v-show="error"></el-alert>
                      <el-button type="primary" class="submitBtn" @click="submitForm(ruleForm)">注册</el-button>
                    </el-form-item>
                  </el-form>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </el-main>

      <el-footer style="marginTop:30px">
        <el-divider content-position="center">Copyright @ 软工帮扶客户关系管理系统</el-divider>
      </el-footer>
    </el-container>
  </div>
</template>



<script>
import loginApi from "@/api/login";
//import { constants } from "crypto";

// function getuuid() {
//   var uid = [];
//   var hexDigits = "0123456789abcdefghijklmnopqrst";
//   for (var i = 0; i < 32; i++) {
//     uid[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
//   }
//   uid[6] = "4";
//   uid[15] = hexDigits.substr((uid[15] & 0x3) | 0x8, 1);
//   var uuid = uid.join("");
//   return uuid;
// }

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };

    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      //倒计时
      timer: null,
      time: 0,
      //验证码
      code: "",
      //错误提示
      error: false,
      msg: "验证码输入错误，请重新输入！",

      activeName: "second",
      ruleForm: {
        name: "",
        pass: "",
        tel: "",
        sms: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入您的名称", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 14 个字符", trigger: "blur" }
        ],
        pass: [{ required: true, validator: validatePass, trigger: "blur" }],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ],
        tel: [
          {
            required: true,
            max: 11,
            min: 11,
            message: "电话号码是必须的，长度为11位",
            trigger: "blur"
          }
        ],
        sms: [
          {
            required: true,
            message: "验证码是必须的！",
            trigger: "blur",
            validator: validatePass
          }
        ]
      },
      imageUrl: require("../assets/loginPic.jpg")
    };
  },

  mounted: function() {
    this.getUsers();
  },

  //获取用户数据
  getUsers() {
    this.loading = true;
    api._get().then(
      res => {
        this.users = res.datas;
        this.total_rows = res.datas.total_rows;
        this.loading = false;
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  },

  methods: {
    /**
     * 注册用户
     */
    submitForm(formName) {
      console.log(formName);
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (this.ruleForm.sms == this.code) {
            loginApi.register(this.ruleForm).then(Response => {
              if (Response.data == "success") {
                this.$router.push("/");
                this.$message({
                  showClose: true,
                  message: "注册成功",
                  type: "success"
                });
              } else {
                // alert("注册失败！公司名称重复")
                this.$message.error('注册失败！公司名称重复');
              }
            });
          } else {
            this.error = true;
          }
        }
      });
      if (this.ruleForm.sms == this.code) {
      }

      // api._post(form);

      //this.$router.push("/login");
      // this.$refs.formName.validate(valid => {
      //   console.log(formName);
      //   if (valid) {
      //     this.$message({
      //       type: "success",
      //       message: "注册成功"
      //     });
      //     //register._post(formName);
      //     this.$router.push("/login");
      //     // this.activeName: 'first',
      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });
    },
    //发送验证码到手机
    sendSms() {
      loginApi.sendSms(this.ruleForm.tel).then(Response => {
        console.log(Response.data);
        this.code = Response.data;
      });
      this.time = 60;
      this.timer = setInterval(this.countDown, 1000);
    },
    //倒计时
    countDown() {
      this.time--;
      if (this.time == 0) {
        clearInterval(this.timer);
      }
    }
  }
};
</script>

<style scoped>
.login-form {
  margin: 20px auto;
  width: 310px;
  background: #fff;
  box-shadow: 0 0 35px #b4bccc;
  padding: 30px 30px 0 30px;
  border-radius: 25px;
}
.submitBtn {
  width: 100%;
  margin-top: 30px;
}
.to {
  color: #67c23a;
  cursor: pointer;
}
.code {
  width: 30%;
  margin-left: 5%;
  padding-left: 15px;
}
</style>
