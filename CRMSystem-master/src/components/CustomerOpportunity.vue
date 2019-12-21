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
        <el-button type="primary" round @click="creatingMarketingOpportunity()">新建商机</el-button>
      </el-col>
    </el-row>

    <el-row>
      <!-- 营销机会列表 -->
      <el-card shadow="hover">
        <!-- 卡片头部 -->
        <div slot="header" class="clearfix">
          <el-row style="height:40px">
            <el-col :span="18">
              <div
                style="font-size:20px; text-align:left; color:#000000; margin:10px 0px 0px 10px"
              >商机列表</div>
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
          :data="OpportunityListData"
          highlight-current-row
          @selection-change="handleSelectionChange"
          stripe
          border
          style="width: 100%"
        >
          <el-table-column fixed="left" type="selection" width="55"></el-table-column>

          <el-table-column type="index" label="序号" align="center"></el-table-column>

          <el-table-column property="customerName" label="公司名称" align="center"></el-table-column>

          <el-table-column property="source" label="来源" align="center"></el-table-column>

          <el-table-column property="contactName" label="联系人" align="center"></el-table-column>

          <el-table-column property="contactPhone" label="联系电话" align="center"></el-table-column>

          <el-table-column property="status" label="状态" align="center"></el-table-column>

          <el-table-column label="成功率" align="center">
            <template slot-scope="scope">
              <p>{{scope.row.success}}%</p>
            </template>
          </el-table-column>

          <el-table-column property="createTime" label="创建时间" align="center"></el-table-column>

          <el-table-column label="查看详情" align="center">
            <template slot-scope="scope">
              <el-button
                @click="editMarketingOpportunity(scope.row)"
                icon="el-icon-view"
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
    <el-dialog
      ref="create_marketing_opportunity_dialog"
      :visible.sync="dialogFormVisible"
      width="30%"
    >
      <el-form
        :model="creatingOpportunityForm"
        ref="creatingOpportunityForm"
        label-width="100px"
        :rules="rules"
      >
        <!-- 选择客户 -->
        <el-popover placement="bottom-start" width="600" trigger="click" v-model="popVisible">
          <!-- 显示样式 -->
          <div style="font-size:18px; text-align:left; color:#000000; margin:10px 0px 0px 10px">客户列表</div>
          <el-divider></el-divider>
          <el-table
            ref="singleTable"
            :data="gridData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="日期" width="120">
              <template slot-scope="scope">{{ scope.row.compName }}</template>
            </el-table-column>
            <el-table-column prop="contactName" label="姓名" width="120"></el-table-column>
            <el-table-column prop="tel" label="地址" show-overflow-tooltip></el-table-column>
            <el-table-column prop="createTime" label="地址" show-overflow-tooltip></el-table-column>
          </el-table>
          <div style="margin-top: 20px">
            <el-button>上一页</el-button>
            <el-button>下一页</el-button>
          </div>
          <el-divider></el-divider>
          <div style="margin-top: 20px;margin-left:70%;">
            <el-button type="primary" @click="submitPop">确定</el-button>
            <el-button @click="popVisible = false">取消</el-button>
          </div>

          <!-- 触发按钮 -->
          <el-form-item slot="reference" label="选择客户">
            <!-- <el-input v-model="creatingMarketingOpportunityForm.customerName"></el-input> -->
            <div class="pop_input">
              <el-tag
                v-for="tag in tags"
                :key="tag.name"
                closable
                :type="tag.type"
                @close="handleClose(tag)"
              >{{tag.name}}</el-tag>
            </div>
            <p class="popWarning" v-if="tags.length == 0">请填写客户</p>
          </el-form-item>
        </el-popover>

        <!-- 机会来源 -->
        <el-form-item label="机会来源" prop="source">
          <el-input v-model="creatingOpportunityForm.source"></el-input>
        </el-form-item>

        <!-- 成功几率 -->
        <el-form-item label="成功几率" placeholder="请填入0-100的百分值（%）" prop="success">
          <el-input v-model.number="creatingOpportunityForm.success"></el-input>
        </el-form-item>

        <!-- 联系人 -->
        <el-form-item label="联系人" prop="contactName">
          <el-input v-model="creatingOpportunityForm.contactName"></el-input>
        </el-form-item>

        <!-- 联系人电话 -->
        <el-form-item label="联系人电话" prop="contactPhone">
          <el-input v-model.number="creatingOpportunityForm.contactPhone"></el-input>
        </el-form-item>

        <!-- 机会概要 -->
        <el-form-item label="机会概要" prop="general">
          <el-input type="textarea" v-model="creatingOpportunityForm.general"></el-input>
        </el-form-item>

        <!-- 提交/重置表单按钮 -->
        <el-form-item>
          <el-row>
            <el-col :span="4" :offset="12">
              <el-button type="primary" @click="submitForm('creatingOpportunityForm')">确定提交</el-button>
            </el-col>
            <el-col :span="4" :offset="2">
              <el-button @click="resetForm('creatingOpportunityForm')">重置表单</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import customerApi from "@/api/customer";
import PubSub from "pubsub-js";

export default {
  data() {
    return {
      //测试数据
      gridData: [],
      popVisible: false,
      tags: [],
      popWarn: false,
      // 批量删除
      tableChecked: [],
      customerId: 0,
      // “新建客户/修改客户信息”弹出框显示控制
      create_marketing_opportunity_dialog: false,
      // 客户基本信息表单
      creatingOpportunityForm: {
        customerId: 0,
        source: "",
        success: "",
        contactName: "",
        contactPhone: "",
        general: ""
      },
      //分页数据
      currentPage: 1,
      //表格内容
      total: 0,
      OpportunityListData: [],
      currentRow: "",
      // 查询类型
      selectKey: {
        type: "",
        value: ""
      },
      // “创建营销”弹出框是否可见
      dialogFormVisible: false,
      // "创建营销"表单（修改字段名时主义将“rules”的字段名一起修改）
      rules: {
        source: [
          { required: true, message: "请输入来源名称", trigger: "blur" }
        ],
        success: [
          { required: true, message: "请输入成功率概率", trigger: "blur" },
          { type: "number", message: "概率必须为数字值" },
          { min: 0, max: 99, type: "number", message: "概率的范围要在0~99之间" }
        ],
        contactName: [
          { required: true, message: "请输入联系人名称", trigger: "blur" }
        ],
        contactPhone: [
          { required: true, message: "请填写联系人电话", trigger: "blur" },
          { length: 11, type: "number", message: "联系方式必须为11位数字" }
        ],
        general: [
          { required: true, message: "请输入概要信息", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //pop弹出框
    submitPop() {
      this.tags.push({
        name: this.tableChecked[0].compName,
        type: ""
      });
      this.creatingOpportunityForm.customerId = this.tableChecked[0].id;
      this.popVisible = false;
    },
    handleClose(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
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
      //   this.$refs.pop.style["left"] = "900px";
    },

    // 表格--------------------------------------------------------
    // 表格控制当前选中行
    handleCurrentChange(val) {
      this.currentRow = val;
    },

    // 表单行的选择状态发生改变时触发
    handleSelectionChange(val) {
      this.tableChecked = val;
      console.log(this.tableChecked);
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
      this.$router.push(`/Home/CustomerDevelopmentPlan/` + row.id);
    },

    // “创建营销”弹出框-------------------------------------------------
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 提交成功
          this.dialogFormVisible = false;
          customerApi
            .addSaleOpp(this.creatingOpportunityForm)
            .then(Response => {
              console.log("提交成功", this.creatingOpportunityForm);
              this.creatingOpportunityForm = {};
              customerApi.querySale_opp().then(response => {
                this.OpportunityListData = response.data;
                this.total = response.data.total;
                console.log("重新查询商机列表", this.OpportunityListData);
              });
            });
        } else {
          console.log("error submit!!", valid);
          return false;
        }
      });
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
    customerApi.querySale_opp().then(response => {
      this.OpportunityListData = response.data;
      this.total = response.data.total;
      console.log("OpportunityListData", this.OpportunityListData);
    });
    customerApi.getList(1).then(response => {
      this.gridData = response.data.items;
    });
  }
};
</script>

<style scoped>
.page {
  margin-top: 2%;
}
.pop_input {
  width: 100%;
  height: 40px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}
.popWarning {
  position: fixed;
  margin-top: -10px;
  color: #f56c6c;
  font-size: 12px;
}
</style>

