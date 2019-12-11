<template>
  <div>
    <!-- 顶部导航 -->
    <!-- <el-row>
      <el-breadcrumb separator-class="el-icon-arrow-right" style="margin:0px 0px 20px 15px">
        <el-breadcrumb-item :to="{ path: '/' }" class="breadcrumb-title">首页</el-breadcrumb-item>
        <el-breadcrumb-item class="breadcrumb-subtitle">编辑销售机会</el-breadcrumb-item>

      </el-breadcrumb>
    </el-row>-->

    <!-- 查询框 -->
    <el-row style="margin: 0px 0px 30px 0px">
      <el-col :span="18">
        <el-input placeholder="请输入内容" v-model="selectKey.value" style="background-color: #fff;">
          <el-select
            v-model="selectKey.type"
            slot="prepend"
            placeholder="查询类型"
            style="width: 130px; "
          >
            <el-option label="公司名称" value="公司名称"></el-option>
            <el-option label="概要" value="概要"></el-option>
            <el-option label="联系人" value="联系人"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="selectByPrimaryKey(selectKey)">查询</el-button>
        </el-input>
      </el-col>

      <!-- 创建营销 -->
      <!-- <el-col :span="2" :offset="1">
        <el-button type="primary" round @click="creatingMarketingOpportunity()">创建营销机会</el-button>
      </el-col>-->
      <el-col :span="2" :offset="1">
        <el-button type="primary" round @click="createNewCustomer()">新建客户</el-button>
      </el-col>

      <!-- "新建/修改客户"弹出框 -->
      <el-dialog ref="create_new_customer_dialog" :visible.sync="createNewCustomerDialogVisible">
        <el-form ref="customerInfoData" :model="customerInfoData" label-width="100px">
          <!-- 表单第一行 -->
          <el-row>
            <el-col :span="8">
              <el-form-item label="客户编号">
                <el-input v-model="customerInfoData.serialNumber" :disabled="false"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="16">
              <el-form-item label="客户名称">
                <el-input v-model="customerInfoData.compName" :disabled="false"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- 表单第二行 -->
          <el-row>
            <el-col :span="8">
              <el-form-item label="地区">
                <el-input v-model="customerInfoData.area" :disabled="false"></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="8">
                    <el-form-item label="客户经理">
                      <el-input v-model="customerInfoData.manager" :disabled="true"></el-input>
                    </el-form-item>
            </el-col>-->

            <el-col :span="8">
              <el-form-item label="客户等级">
                <el-select v-model="customerInfoData.level" style="width:100%" :disabled="false">
                  <el-option label="一级" value="一级"></el-option>
                  <el-option label="二级" value="二级"></el-option>
                  <el-option label="三级" value="三级"></el-option>
                  <el-option label="四级" value="四级"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- 表单第三行 -->
          <el-row>
            <!-- <el-col :span="8">
                    <el-form-item label="客户满意度">
                      <el-rate v-model="customerInfoData.satisfaction" disabled></el-rate>
                    </el-form-item>
            </el-col>-->

            <el-col :span="8">
              <el-form-item label="客户信用度">
                <el-rate v-model="customerInfoData.credit"></el-rate>
              </el-form-item>
            </el-col>
          </el-row>

          <el-divider />

          <!-- 表单第四行 -->
          <el-row>
            <el-col :span="8">
              <el-form-item label="地址">
                <el-input v-model="customerInfoData.compAddress" :disabled="false"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="联系人">
                <el-input v-model="customerInfoData.contactName" :disabled="false"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="电话">
                <el-input v-model="customerInfoData.tel" :disabled="false"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- 表单第五行 -->
          <!-- <el-row>
                  <el-col :span="8">
                    <el-form-item label="传真">
                      <el-input v-model="customerInfoData.faxes" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="16">
                    <el-form-item label="网址">
                      <el-input v-model="customerInfoData.url" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
          </el-row>-->

          <el-divider />

          <!-- 表单第六行 -->
          <el-row>
            <el-col :span="8">
              <el-form-item label="营业执照编号">
                <el-input v-model="customerInfoData.licenseNumber" :disabled="false"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="法人">
                <el-input v-model="customerInfoData.corporation" :disabled="false"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="注册资金">
                <el-input
                  v-model="customerInfoData.registerMoney"
                  :disabled="false"
                  placeholder="（万元）"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- 表单第七行 -->
          <el-row>
            <el-col :span="8">
              <el-form-item label="年营业额">
                <el-input
                  v-model="customerInfoData.annualSale"
                  :disabled="false"
                  placeholder="（万元）"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="地税登记号">
                <el-input v-model="customerInfoData.landTaxNumber" :disabled="false"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="国税登记号">
                <el-input v-model="customerInfoData.nationalTaxNumber" :disabled="false"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- 表单第六行 -->
          <el-row>
            <el-col :span="8">
              <el-form-item label="开户银行">
                <el-input v-model="customerInfoData.depositBank" :disabled="false"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="16">
              <el-form-item label="银行账号">
                <el-input v-model="customerInfoData.bankAccount" :disabled="false"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- 提交表单按钮 -->
          <el-form-item>
            <el-row>
              <el-col :span="4" :offset="20">
                <el-button type="primary" @click="submitCreateNewCustomerForm()">确定提交</el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-row>

    <el-row>
      <!-- 营销机会列表 -->
      <el-card shadow="hover">
        <!-- 卡片头部 -->
        <div slot="header" class="clearfix">
          <el-row style="height:40px">
            <el-col :span="16">
              <div
                style="font-size:20px; text-align:left; color:#000000; margin:10px 0px 0px 10px"
              >客户列表</div>
            </el-col>

            <el-col :span="2">
              <el-button
                style="float: right; padding: 3px 0 ; height:40px; text-align:center"
                type="text"
                icon="el-icon-download"
                @click="toHighSea()"
              >放入公海</el-button>
            </el-col>
            <el-col :span="2">
              <el-button
                style="float: right; padding: 3px 0 ; height:40px; text-align:center"
                type="text"
                icon="el-icon-refresh"
                @click="refreshList()"
              >刷新列表</el-button>
            </el-col>
            <el-col :span="2">
              <el-button
                style="float: right; padding: 3px 0 ; height:40px; text-align:center"
                type="text"
                icon="el-icon-delete"
                @click="deleteInBatches()"
              >批量删除</el-button>
            </el-col>

            <el-col :span="2">
              <el-button
                style="float: right; padding: 3px 0 ; height:40px; text-align:center"
                type="text"
                icon="el-icon-close"
                @click="toggleSelection()"
              >取消选择</el-button>
            </el-col>
          </el-row>
        </div>

        <!-- 列表 -->
        <el-table
          ref="marketing_opportunity_info_list"
          :data="marketingOpportunityListData"
          highlight-current-row
          @selection-change="handleSelectionChange"
          stripe
          border
          style="width: 100%"
        >
          <el-table-column fixed="left" type="selection" width="55"></el-table-column>

          <el-table-column type="index" label="序号" align="center"></el-table-column>

          <el-table-column property="serialNumber" label="编号" align="center"></el-table-column>

          <el-table-column property="compName" label="公司名称" align="center"></el-table-column>

          <el-table-column property="type" label="客户类型" align="center"></el-table-column>

          <el-table-column property="contactName" label="联系人" align="center"></el-table-column>

          <el-table-column property="tel" label="联系电话" align="center"></el-table-column>

          <el-table-column property="createTime" label="创建时间" align="center"></el-table-column>

          <el-table-column label="成交状态" align="center">
            <template slot-scope="scope">
              <p v-if="scope.row.state == '1'">正在执行</p>
              <p v-if="scope.row.state == '3'">成交</p>
            </template>
          </el-table-column>

          <el-table-column label="查看客户详细信息" align="center">
            <template slot-scope="scope">
              <el-button
                @click="editMarketingOpportunity(scope.row)"
                icon="el-icon-edit"
                circle
                size="small"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页导航条 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="7"
          layout="total, prev, pager, next"
          :total="total"
          class="page"
        ></el-pagination>
      </el-card>
    </el-row>

    <!-- “创建/修改营销”弹出框 -->
    <!-- <el-dialog ref="create_marketing_opportunity_dialog" :visible.sync="dialogFormVisible">
      <el-form
        :model="creatingMarketingOpportunityForm"
        :rules="rules"
        ref="creatingMarketingOpportunityForm"
        label-width="100px"
      >
        客户名称
        <el-form-item label="客户名称" prop="name">
          <el-input v-model="creatingMarketingOpportunityForm.name"></el-input>
        </el-form-item>

        机会来源
        <el-form-item label="机会来源" prop="source">
          <el-input v-model="creatingMarketingOpportunityForm.source"></el-input>
        </el-form-item>

        成功几率
        <el-form-item label="成功几率" prop="odds" placeholder="请填入0-100的百分值（%）">
          <el-input v-model.number="creatingMarketingOpportunityForm.odds"></el-input>
        </el-form-item>

        概要
        <el-form-item label="概要" prop="digest">
          <el-input v-model="creatingMarketingOpportunityForm.digest"></el-input>
        </el-form-item>

        联系人
        <el-form-item label="联系人" prop="contacts">
          <el-input v-model="creatingMarketingOpportunityForm.contacts"></el-input>
        </el-form-item>

        联系人电话
        <el-form-item label="联系人电话" prop="contactsTel">
          <el-input v-model.number="creatingMarketingOpportunityForm.contactsTel"></el-input>
        </el-form-item>

        机会描述
        <el-form-item label="机会描述" prop="opportunityStatement">
          <el-input type="textarea" v-model="creatingMarketingOpportunityForm.opportunityStatement"></el-input>
        </el-form-item>

        指派给
        <el-form-item label="指派给" prop="designate">
          <el-select
            v-model="creatingMarketingOpportunityForm.designate"
            placeholder="请选择此次营销机会负责人"
            style="width:100%"
          >
            <el-option label="小李" value="小李"></el-option>
            <el-option label="小王" value="小王"></el-option>
            <el-option label="小赵" value="小赵"></el-option>
            <el-option label="小吴" value="小吴"></el-option>
            <el-option label="小孙" value="小孙"></el-option>
          </el-select>
        </el-form-item>

        提交/重置表单按钮
        <el-form-item>
          <el-row>
            <el-col :span="4" :offset="15">
              <el-button type="primary" @click="submitForm('creatingMarketingOpportunityForm')">确定提交</el-button>
            </el-col>
            <el-col :span="4" :offset="1">
              <el-button @click="resetForm('creatingMarketingOpportunityForm')">重置表单</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>-->
  </div>
</template>

<script>
import customerApi from "@/api/customer";
import PubSub from "pubsub-js";

export default {
  data() {
    return {
      // 批量删除
      tableChecked: [],
      customerId: 0,
      // “新建客户/修改客户信息”弹出框显示控制
      createNewCustomerDialogVisible: false,
      // 客户基本信息表单
      customerInfoData: {
        id: 0,
        compName: "",
        type: "",
        contactName: "",
        tel: "",
        state: 0,
        empId: 0,
        compId: 0,
        serialNumber: "",
        createTime: "",
        area: "",
        compAddress: "",
        level: "",
        credit: 0,
        licenseNumber: "",
        corporation: "",
        registerMoney: "",
        annualSale: "",
        landTaxNumber: "",
        nationalTaxNumber: "",
        depositBank: "",
        bankAccount: ""
      },
      //分页数据
      currentPage: 1,
      //表格内容
      total: 0,
      marketingOpportunityListData: [],
      currentRow: "",
      // 查询类型
      selectKey: {
        type: "",
        value: ""
      },
      // “创建营销”弹出框是否可见
      dialogFormVisible: false,
      // "创建营销"表单（修改字段名时主义将“rules”的字段名一起修改）
      creatingMarketingOpportunityForm: {
        name: "",
        source: "",
        odds: "",
        digest: "",
        contacts: "",
        contactsTel: "",
        opportunityStatement: "",
        designate: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入客户名称", trigger: "blur" },
          { min: 3, max: 16, message: "长度在 3 到 16 个字符", trigger: "blur" }
        ],
        source: [
          { required: true, message: "请填写机会来源", trigger: "blur" }
        ],
        odds: [
          { required: true, message: "请填写成功几率", trigger: "blur" },
          { type: "number", message: "几率值必须为数字(%)" }
        ],
        digest: [{ required: true, message: "请填写概要", trigger: "blur" }],
        contacts: [
          { required: true, message: "请填写联系人", trigger: "blur" }
        ],
        contactsTel: [
          { required: true, message: "请填写联系人电话", trigger: "blur" },
          { length: 11, type: "number", message: "联系方式必须为11位数字" }
        ],
        opportunityStatement: [
          { required: true, message: "请填写机会描述", trigger: "blur" }
        ],
        designate: [
          { required: true, message: "请指派此次营销负责人", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    // “新建客户”点击事件
    createNewCustomer() {
      this.$refs.create_new_customer_dialog.title = "新建客户";
      this.createNewCustomerDialogVisible = true;
    },
    //提交新客户
    submitCreateNewCustomerForm() {
      customerApi.addCustomer(this.customerInfoData).then(response => {
        console.log("添加成功！");
      });
      this.createNewCustomerDialogVisible = false;
    },
    //分页功能的方法
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 查询框-------------------------------------------------------
    selectByPrimaryKey(selectKey) {
      console.log(selectKey);
    },

    // 创建销售机会
    creatingMarketingOpportunity() {
      this.dialogFormVisible = true;
      this.$refs.create_marketing_opportunity_dialog.title = "创建营销机会";
    },

    // 表格--------------------------------------------------------
    // 表格控制当前选中行
    handleCurrentChange(val) {
      this.currentRow = val;
    },

    // 表单行的选择状态发生改变时触发
    handleSelectionChange(val) {
      this.tableChecked = val;
    },
    // 批量删除
    deleteInBatches() {
      //循环进行批量删除
      this.tableChecked.forEach(element => {
        //获取需要删除的元素的id
        this.customerId = element.id;
        console.log(this.customerId);
        //通过接口来进行删除操作
        customerApi.deleteCustomer(this.customerId).then(Response => {
          console.log("删除成功！");
          //删除成功后改变渲染的数据
          // const len = this.marketingOpportunityListData.length;
          // for(var i=0 ; i<this.marketingOpportunityListData.length; i++) {
          //   if(this.customerId == this.marketingOpportunityListData[i].id);
          //   this.marketingOpportunityListData.splice(i,1);
          //   i--;
          // }
          // this.marketingOpportunityListData.forEach(item => {
          //   console.log(item);
          // });
          // console.log(this.marketingOpportunityListData)
          history.go(0);
        });
      });
    },

    // 刷新列表
    refreshList() {
      console.log("refresh");
    },

    // 取消选择
    toggleSelection() {
      this.$refs.marketing_opportunity_info_list.clearSelection();
      console.log("cancel selection");
    },

    // 修改营销机会
    editMarketingOpportunity(row) {
      console.log(row);
      // this.dialogFormVisible = true;
      // this.$refs.create_marketing_opportunity_dialog.title = "修改营销机会";
      // PubSub.publish('details-data',{showTag:true})
      this.$router.push(`/Home/CustomerInfoManagement/` + row.id);
    },

    // “创建营销”弹出框-------------------------------------------------
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 提交成功
          this.dialogFormVisible = false;
          this.$refs[formName].resetFields();
        } else {
          // 无效提交
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //放入公海
    toHighSea() {
      customerApi.toHighSeas(this.tableChecked[0].id).then(Response => {
        console.log("放入公海成功！")
      })
    }
  },
  watch: {
    currentPage: function(n, o) {
      console.log("currentPage改变了" + n + o);
      customerApi.getList(n).then(response => {
        this.marketingOpportunityListData = response.data.items;
        console.log(this.marketingOpportunityListData);
      });
    }
  },
  mounted() {
    customerApi.getList(1).then(response => {
      this.marketingOpportunityListData = response.data.items;
      this.total = response.data.total;
      console.log(this.marketingOpportunityListData);
    });
  }
};
</script>

<style scoped>
.page {
  margin-top: 2%;
}
</style>

