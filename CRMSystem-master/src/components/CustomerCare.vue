<template>
  <div>
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
            <el-option label="客户名称" value="客户名称"></el-option>
            <el-option label="客户编号" value="客户编号"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="selectByPrimaryKey(selectKey)">查询</el-button>
        </el-input>
      </el-col>

      <!-- 新建客户 -->
      <!-- <el-col :span="2" :offset="1">
        <el-button type="primary" round @click="createNewCustomer()">新建客户</el-button>
      </el-col>-->
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
              >客户关怀列表</div>
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
          :data="CustomerCareData"
          highlight-current-row
          @selection-change="handleSelectionChange"
          stripe
          border
          style="width: 100%"
        >
          <el-table-column fixed="left" type="selection" width="55"></el-table-column>

          <el-table-column type="index" label="序号" align="center"></el-table-column>

          <el-table-column property="id" label="编号" align="center"></el-table-column>

          <el-table-column property="linkmanName" label="联系人" align="center"></el-table-column>

          <el-table-column property="birthday" label="生日" align="center"></el-table-column>

          <el-table-column label="关怀时间" align="center">
            <template slot-scope="scope">
              <p v-if="scope.row.time == null">无</p>
              <p v-else>{{scope.row.time}}</p>
            </template>
          </el-table-column>

          <el-table-column label="方式" align="center">
            <template slot-scope="scope">
              <p v-if="scope.row.detail == null">无</p>
              <p v-else>{{scope.row.detail}}</p>
            </template>
          </el-table-column>

          <el-table-column property="days" label="距生日(日)" align="center"></el-table-column>

          <!-- <el-table-column property="state" label="成交状态" align="center"></el-table-column> -->

          <el-table-column label="编辑" align="center">
            <template slot-scope="scope">
              <el-button
                @click="editCustomerCare(scope.row)"
                icon="el-icon-edit"
                circle
                size="small"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页导航条 -->
        <!-- <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="7"
          layout="total, prev, pager, next"
          :total="total"
          class="page"
        ></el-pagination>-->

        <!-- “编辑计划执行情况”对话框 -->
        <el-dialog :visible.sync="editCareDialogVisible" title="编辑关怀方式">
          <el-form :model="editFormData" ref="editFormData" label-width="100px">
            <!-- 计划执行情况 -->
            <el-form-item label="关怀方式" prop="careDetail">
              <el-input v-model="editFormData.careDetail"></el-input>
            </el-form-item>
            <!-- 提交/重置表单按钮 -->
            <el-form-item>
              <el-row>
                <el-col :span="4" :offset="19">
                  <el-button type="primary" @click="submitEditPlanForm('')">确定提交</el-button>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
        </el-dialog>

      </el-card>
    </el-row>
  </div>
</template>

<script>
import customerApi from "@/api/customer";

export default {
  data() {
    return {
      tableChecked: [],
      // 查询类型
      selectKey: {
        type: "",
        value: ""
      },
      // 表格数据
      CustomerCareData: [],
      // 对话框
      editCareDialogVisible: false,
      editFormData: {
        careDetail: ""
      },
      //编辑的id
      editId: 0
    };
  },
  mounted() {
    customerApi.queryCare().then(Response => {
      this.CustomerCareData = Response.data;
    });
  },
  methods: {
    // 查询框-------------------------------------------------------
    selectByPrimaryKey(selectKey) {
      console.log(selectKey);
    },
    // 表单行的选择状态发生改变时触发
    handleSelectionChange(val) {
      this.tableChecked = val;
    },
    // 修改关怀信息
    editCustomerCare(row) {
      console.log(row);
      this.editId = row.id
      console.log("编辑的id",this.editId)
      this.editCareDialogVisible = true;
      this.editFormData.careDetail = row.detail
    },
    //领取
    receiveCustomer() {
      customerApi.receiveCustomer(this.tableChecked[0].id).then(Response => {
        console.log("领取成功！");
      });
    },
    //编辑表单提交
    submitEditPlanForm() {
        console.log("提交",this.editId,this.editFormData.careDetail)
        customerApi.edit(this.editId,this.editFormData.careDetail).then(Response => {
            this.editCareDialogVisible = false;
        })
    }
  }
};
</script>

<style scoped>
</style>