<template>
  <div>
    <!-- 查询框 -->
    <el-row style="margin: 0px 0px 30px 0px">
      <el-col :span="18">
        <el-input placeholder="请输入内容" v-model="selectKey.value" style="background-color: #fff;">
          <el-select
            v-model="selectKey.type"
            slot="prepend"
            placeholder="营销编号"
            style="width: 130px; "
            disabled
          ></el-select>
          <el-button slot="append" icon="el-icon-search" @click="selectByPrimaryKey(selectKey)">查询</el-button>
        </el-input>
      </el-col>
    </el-row>

    <!-- 所查询之营销机会信息 -->
    <el-row>
      <!-- 表单 -->
      <el-form ref="marketingOpportunityInfo" :model="marketingOpportunityInfo" label-width="80px">
        <!-- 表单第一行 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="客户名称">
              <el-input v-model="marketingOpportunityInfo.customerName" :disabled="true"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="机会来源">
              <el-input v-model="marketingOpportunityInfo.source" :disabled="true"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="联系人">
              <el-input v-model="marketingOpportunityInfo.contactName" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 表单第二行 -->
        <el-row>
          <el-col :span="6">
            <el-form-item label="联系电话">
              <el-input v-model="marketingOpportunityInfo.contactPhone" :disabled="true"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="成功率(%)">
              <el-input v-model="marketingOpportunityInfo.success" :disabled="true"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="创建时间">
              <el-input v-model="marketingOpportunityInfo.createTime" :disabled="true"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="状态">
              <el-input v-model="marketingOpportunityInfo.status" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 表单第三行 -->
        <el-row>
          <el-col :span="24">
            <el-form-item label="机会概要">
              <el-input type="textarea" v-model="marketingOpportunityInfo.general" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 表单第四行 -->
        <el-row>
          <el-col :span="6"></el-col>

          <el-col :span="6" :offset="18">
            <el-button
              style="float: right"
              type="primary"
              round
              @click="completeDevelopment()"
            >完成此次营销 / 开发成功</el-button>
          </el-col>

          <!-- “完成此次营销 / 开发成功”弹出框 -->
          <el-dialog
            ref="complete_development_dialog"
            :visible.sync="completeDevelopmentDialogVisible"
            title="历史订单详情"
          >
            <!-- “完成此次营销 / 开发成功”表单 -->
            <el-form
              :model="completeDevelopmentFormData"
              ref="completeDevelopmentFormData"
              label-width="100px"
            >
              <el-form-item label="送货地址" prop="address">
                <el-input v-model="completeDevelopmentFormData.address"></el-input>
              </el-form-item>

              <el-upload
                class="upload-demo"
                ref="upload"
                action="https://bigyue.top/api/order/addOrderFromBus"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                :limit="1"
                :data="upData"
                :on-success="successUpdate"
                :auto-upload="false"
                :on-exceed="handleExceed"
              >
                <el-button slot="trigger" type="primary">选取文件</el-button>
                <div slot="tip" class="el-upload__tip">只能上传pdf文件，且不超过10M</div>
              </el-upload>

              <!-- <el-form-item label="状态" prop="situation">
                <el-input v-model="completeDevelopmentFormData.state" :disabled="true"></el-input>
              </el-form-item>-->
            </el-form>

            <el-divider />

            <!-- “订单详情”中商品信息表格 -->
            <el-button
              round
              type="info"
              style="margin-bottom: 10px;margin-top: -10px;margin-left: -820px;"
              @click="addProduct"
            >添加商品</el-button>
            <el-table
              ref="products"
              :data="completeDevelopmentFormData.products"
              highlight-current-row
              stripe
              border
              style="width: 100%"
            >
              <el-table-column type="index" label="序号" align="center"></el-table-column>

              <el-table-column label="商品名称" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.name" :placeholder="scope.row.name"></el-input>
                </template>
              </el-table-column>

              <el-table-column label="数量" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.number" :placeholder="scope.row.number"></el-input>
                </template>
              </el-table-column>

              <el-table-column label="地区" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.address" :placeholder="scope.row.address"></el-input>
                </template>
              </el-table-column>

              <el-table-column label="单位" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.unit" :placeholder="scope.row.unit"></el-input>
                </template>
              </el-table-column>

              <el-table-column label="单价（元）" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.unitPrice" :placeholder="scope.row.unitPrice"></el-input>
                </template>
              </el-table-column>

              <!-- <el-table-column property="price" label="金额（元）" align="center"></el-table-column> -->
            </el-table>
            <el-divider></el-divider>
            <div style="margin-bottom: 20px;">
              <span style="margin-left: 600px;">已选中商品：</span>
              <span style="margin-left: 5px;color: red;">{{len}}</span>
              <span style="margin-left: 5px;">种</span>
              <span style="margin-left: 15px;">总金额：</span>
              <el-input v-model="totalMoney" style="width: 80px;margin-left: 0px;" disabled></el-input>
              <span style="margin-left: 5px;">元</span>
            </div>
            <el-button
              style="margin-left: 630px;"
              type="primary"
              @click="submitUpload"
              :disabled="uploadCheck"
            >确定</el-button>
            <el-button type="info" @click="complete">取消</el-button>
          </el-dialog>
        </el-row>
      </el-form>
    </el-row>

    <el-row style="margin-top:15px">
      <!-- 客户开发计划及执行情况列表 -->
      <el-card shadow="hover">
        <!-- 卡片头部 -->
        <div slot="header" class="clearfix">
          <el-row style="height:40px">
            <el-col :span="16">
              <div
                style="font-size:20px; text-align:left; color:#000000; margin:10px 0px 0px 10px"
              >客户开发计划及执行情况</div>
            </el-col>

            <el-col :span="2">
              <el-button
                style="float: right; padding: 3px 0 ; height:40px; text-align:center"
                type="text"
                icon="el-icon-plus"
                @click="addPlan()"
              >添加计划</el-button>
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
          ref="customer_development_plan_info_list"
          :data="customerDevelopmentPlanListData"
          highlight-current-row
          stripe
          border
          @current-change="handleCurrentChange"
          style="width: 100%"
        >
          <el-table-column fixed="left" type="selection" width="55"></el-table-column>

          <el-table-column type="index" label="序号" align="center"></el-table-column>

         <!-- <el-table-column property="number" label="编号" align="center"></el-table-column>-->

          <el-table-column property="date" label="日期" align="center"></el-table-column>

          <el-table-column property="plan" label="计划项" align="center"></el-table-column>

          <el-table-column property="situation" label="执行情况" align="center"></el-table-column>

          <el-table-column label="编辑" align="center">
            <template>
              <el-button @click="editPlan()" icon="el-icon-edit" circle size="small"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-row>

    <!-- “添加计划”对话框 -->
    <el-dialog :visible.sync="addPlanDialogVisible" title="添加计划项">
      <el-form
        :model="addPlanFormData"
        :rules="addPlanFormRules"
        ref="addPlanFormData"
        label-width="100px"
      >
        <!-- 日期 -->
        <el-form-item label="日期" prop="date">
          <el-date-picker
            type="date"
            placeholder="选择计划执行日期"
            v-model="addPlanFormData.date"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>

        <!-- 计划项 -->
        <el-form-item label="计划项" prop="plan">
          <el-input v-model="addPlanFormData.plan"></el-input>
        </el-form-item>

        <!-- 提交/重置表单按钮 -->
        <el-form-item>
          <el-row>
            <el-col :span="4" :offset="15">
              <el-button type="primary" @click="submitAddPlanForm('addPlanFormData')">确定提交</el-button>
            </el-col>
            <el-col :span="4" :offset="1">
              <el-button @click="resetAddPlanForm('addPlanFormData')">重置表单</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- “编辑计划执行情况”对话框 -->
    <el-dialog :visible.sync="editPlanDialogVisible" title="编辑计划执行情况">
      <el-form :model="editPlanFormData" ref="editPlanFormData" label-width="100px">
        <!-- 计划执行情况 -->
        <el-form-item label="执行情况" prop="situation">
          <el-input v-model="editPlanFormData.situation"></el-input>
        </el-form-item>
        <!-- 提交/重置表单按钮 -->
        <el-form-item>
          <el-row>
            <el-col :span="4" :offset="15">
              <el-button type="primary" @click="submitEditPlanForm('editPlanFormData')">确定提交</el-button>
            </el-col>
            <el-col :span="4" :offset="1">
              <el-button @click="resetEditPlanForm('editPlanFormData')">重置表单</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>


<script>
import customerApi from "@/api/customer";
export default {
  data() {
    return {
      //完成此次营销 / 开发成功 弹框
      completeDevelopmentDialogVisible: false,
      completeDevelopmentFormData: {
        address: "",
        customerId: 0,
        state: 0,
        busId: 0,
        products: [
          {
            name: "",
            number: 0,
            address: "",
            unit: "",
            unitPrice: 0
          }
        ]
      },
      // totalMoney: "30",
      //上传
      fileList: [],
      uploadCheck: false,
      // 弹出框内的商品信息表格

      // 查询类型
      selectKey: {
        type: "",
        value: ""
      },

      //表单变量
      marketingOpportunityInfo: {},

      //表格内容
      customerDevelopmentPlanListData: [
        {
          date: "2019-12-5",
          plan: "与客户面谈",
          situation: "双方签署合同"
        },
        {
          date: "2019-11-28",
          plan: "与客户面谈",
          situation: "双方交换意见并达成合作"
        },
        {
          date: "2019-11-27",
          plan: "与客户面谈",
          situation: "双方交换意见并达成合作"
        },
        {
          date: "2019-11-22",
          plan: "与客户面谈",
          situation: "双方交换意见并达成合作"
        },
        {
          date: "2019-11-18",
          plan: "与客户面谈",
          situation: "双方交换意见并达成合作"
        },
        {
          date: "2019-11-17",
          plan: "与客户面谈",
          situation: "双方交换意见并达成合作"
        }
      ],
      currentRow: "",

      // 对话框可见性
      addPlanDialogVisible: false,
      editPlanDialogVisible: false,

      //对话框表单数据及限制条件
      addPlanFormData: {
        date: "",
        plan: ""
      },
      addPlanFormRules: {
        date: [
          {
            type: "date",
            required: true,
            message: "请选择此次计划项的执行日期",
            trigger: "change"
          }
        ],
        plan: [{ required: true, message: "请填写计划项内容", trigger: "blur" }]
      },

      editPlanFormData: {
        situation: ""
      }
    };
  },
  mounted() {
    if (this.$route.params.id != -1) {
      customerApi.querySale_oppById(this.$route.params.id).then(Response => {
        this.marketingOpportunityInfo = Response.data;
        //完成此次营销地弹框里的内容
        this.completeDevelopmentFormData.customerId = this.marketingOpportunityInfo.customerId;
        this.completeDevelopmentFormData.busId = this.marketingOpportunityInfo.id;
        console.log(this.marketingOpportunityInfo);
      });
    } else {
      this.marketingOpportunityInfo = {};
    }
  },
  computed: {
    upData: function() {
      return {
        orderBo: JSON.stringify(this.completeDevelopmentFormData)
      };
    },
    len: function() {
      return this.completeDevelopmentFormData.products.length;
    },
    totalMoney: function() {
      var total = 0;
      for (
        var i = 0;
        i < this.completeDevelopmentFormData.products.length;
        i++
      ) {
        var item = this.completeDevelopmentFormData.products[i];
        console.log("item.unitPrice",item.unitPrice)
        console.log("item.number",item.number)
        // total = Number(item.unitPrice) + Number(item.number);
      }
      console.log("total",total)
      return total;
    }
  },

  methods: {
    //关于上传地操作
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    successUpdate() {
      this.upload = !this.upload;
    },
    //手动上传
    submitUpload() {
      // marketingOpportunityInfo.id marketingOpportunityInfo.customerId
      console.log("点击手动上传", this.completeDevelopmentFormData);
      this.$refs.upload.submit();
      this.completeDevelopmentDialogVisible = false;
    },
    // 添加商品
    addProduct() {
      this.completeDevelopmentFormData.products.push({
        name: "",
        number: 0,
        address: "",
        unit: "",
        unitPrice: 0
      });
    },
    // 查询框-------------------------------------------------------
    selectByPrimaryKey(selectKey) {
      console.log(selectKey);
    },

    // 表单----------------------------------------------------------
    // 打开此次营销 / 开发成功
    completeDevelopment() {
      //修改弹出框的状态
      this.completeDevelopmentDialogVisible = true;
    },
    // 关闭此次营销 / 开发成功
    closeCompleteForm() {
      this.completeDevelopmentDialogVisible = false;
      this.fileList = [];
      this.uploadCheck = false;
      this.completeDevelopmentFormData = {
        address: "",
        customerId: 0,
        state: 0,
        busId: 0,
        products: [
          {
            name: "",
            number: 0,
            address: "",
            unit: "",
            unitPrice: 0
          }
        ]
      };
    },
    // 完成弹出框表单
    complete() {
      this.completeDevelopmentDialogVisible = false;
      this.fileList = [];
      this.uploadCheck = false;
      this.completeDevelopmentFormData = {
        address: "",
        customerId: 0,
        state: 0,
        busId: 0,
        products: [
          {
            name: "",
            number: 0,
            address: "",
            unit: "",
            unitPrice: 0
          }
        ]
      };
    },

    // 表格---------------------------------------------------------
    // 添加计划
    addPlan() {
      this.addPlanDialogVisible = true;
    },

    // 编辑计划完成情况
    editPlan() {
      this.editPlanDialogVisible = true;
      console.log(this.currentRow);
    },

    // 表格控制当前选中行
    handleCurrentChange(val) {
      this.currentRow = val;
    },

    // 批量删除计划
    deleteInBatches() {},

    // 刷新列表
    refreshList() {
      console.log("refresh");
    },

    // 取消选择
    toggleSelection() {
      this.$refs.customer_development_plan_info_list.clearSelection();
      console.log("cancel selection");
    },

    // "添加计划"对话框----------------------------------------------------
    submitAddPlanForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 提交成功
          console.log(this.addPlanFormData.date);
          this.addPlanDialogVisible = false;
          this.$refs[formName].resetFields();
        } else {
          // 无效提交
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetAddPlanForm(formName) {
      this.$refs[formName].resetFields();
    },

    //  "编辑计划执行情况"对话框----------------------------------------------
    submitEditPlanForm(formName) {
      this.editPlanDialogVisible = false;
      this.$refs[formName].resetFields();
    },
    resetEditPlanForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
