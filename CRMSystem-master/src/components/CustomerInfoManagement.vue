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

    <!-- 折叠面板 -->
    <el-row>
      <el-collapse v-model="collapseActiveName" accordion>
        <!-- ----------------------------------------------------------------------------------------------------------------------- -->
        <!-- 客户基本信息管理 -->
        <el-collapse-item title="客户基本信息管理" name="1">
          <el-card shadow="hover">
            <!-- 卡片头部 -->
            <div slot="header" class="clearfix">
              <el-row style="height:40px">
                <el-col :span="22">
                  <div
                    style="font-size:20px; text-align:left; color:#000000; margin:10px 0px 0px 10px"
                  >客户基本信息</div>
                </el-col>

                <el-col :span="2">
                  <el-button
                    style="float: right; padding: 3px 0 ; height:40px; text-align:center"
                    type="text"
                    icon="el-icon-edit"
                    @click="editCustomerInfo()"
                  >修改客户基本信息</el-button>
                </el-col>
              </el-row>
            </div>

            <!-- 客户基本信息表单 -->
            <el-row>
              <el-form ref="customerInfoData" :model="customerInfoData" label-width="100px">
                <!-- 表单第一行 -->
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="客户编号">
                      <el-input v-model="customerInfoData.serialNumber" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="16">
                    <el-form-item label="客户名称">
                      <el-input v-model="customerInfoData.compName" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <!-- 表单第二行 -->
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="地区">
                      <el-input v-model="customerInfoData.area" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
                  <!-- <el-col :span="8">
                    <el-form-item label="客户经理">
                      <el-input v-model="customerInfoData.manager" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>-->

                  <el-col :span="8">
                    <el-form-item label="客户等级">
                      <el-select
                        v-model="customerInfoData.level"
                        style="width:100%"
                        :disabled="true"
                      >
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
                      <el-rate v-model="customerInfoData.credit" disabled></el-rate>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-divider />

                <!-- 表单第四行 -->
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="地址">
                      <el-input v-model="customerInfoData.compAddress" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item label="联系人">
                      <el-input v-model="customerInfoData.contactName" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item label="电话">
                      <el-input v-model="customerInfoData.tel" :disabled="true"></el-input>
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
                      <el-input v-model="customerInfoData.licenseNumber" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item label="法人">
                      <el-input v-model="customerInfoData.corporation" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item label="注册资金">
                      <el-input
                        v-model="customerInfoData.registerMoney"
                        :disabled="true"
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
                        :disabled="true"
                        placeholder="（万元）"
                      ></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item label="地税登记号">
                      <el-input v-model="customerInfoData.landTaxNumber" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item label="国税登记号">
                      <el-input v-model="customerInfoData.nationalTaxNumber" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <!-- 表单第六行 -->
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="开户银行">
                      <el-input v-model="customerInfoData.depositBank" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="16">
                    <el-form-item label="银行账号">
                      <el-input v-model="customerInfoData.bankAccount" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-row>
          </el-card>
        </el-collapse-item>

        <!-- ----------------------------------------------------------------------------------------------------------------------- -->
        <!-- 联系人管理 -->
        <el-collapse-item title="联系人管理" name="2">
          <el-row style="margin-top:15px">
            <!-- 该公司联系人信息列表 -->
            <el-card shadow="hover">
              <!-- 卡片头部 -->
              <div slot="header" class="clearfix">
                <el-row style="height:40px">
                  <el-col :span="16">
                    <div
                      style="font-size:20px; text-align:left; color:#000000; margin:10px 0px 0px 10px"
                    >该公司联系人信息列表</div>
                  </el-col>

                  <el-col :span="2">
                    <el-button
                      style="float: right; padding: 3px 0 ; height:40px; text-align:center"
                      type="text"
                      icon="el-icon-plus"
                      @click="addContacts()"
                    >添加联系人</el-button>
                  </el-col>

                  <el-col :span="2">
                    <el-button
                      style="float: right; padding: 3px 0 ; height:40px; text-align:center"
                      type="text"
                      icon="el-icon-refresh"
                      @click="refreshContactsList()"
                    >刷新列表</el-button>
                  </el-col>

                  <el-col :span="2">
                    <el-button
                      style="float: right; padding: 3px 0 ; height:40px; text-align:center"
                      type="text"
                      icon="el-icon-delete"
                      @click="deleteContactsInBatches()"
                    >批量删除</el-button>
                  </el-col>

                  <el-col :span="2">
                    <el-button
                      style="float: right; padding: 3px 0 ; height:40px; text-align:center"
                      type="text"
                      icon="el-icon-close"
                      @click="toggleContactsSelection()"
                    >取消选择</el-button>
                  </el-col>
                </el-row>
              </div>

              <!-- 列表 -->
              <el-table
                ref="contacts_List"
                :data="contactsListData"
                highlight-current-row
                stripe
                border
                @current-change="handleCurrentChange"
                @selection-change="handleSelectionChange"
                style="width: 100%"
              >
                <el-table-column fixed="left" type="selection" width="55"></el-table-column>

                <el-table-column type="index" label="序号" align="center"></el-table-column>

                <el-table-column property="name" label="姓名" align="center"></el-table-column>

                <!-- <el-table-column property="sex" label="性别" align="center"></el-table-column> -->

                <el-table-column property="position" label="职位" align="center"></el-table-column>

                <el-table-column property="officePhone" label="办公电话" align="center"></el-table-column>

                <el-table-column property="mobilePhone" label="手机号" align="center"></el-table-column>

                <el-table-column property="remark" label="备注" align="center"></el-table-column>

                <el-table-column label="修改" align="center">
                  <template slot-scope="scope">
                    <el-button
                      @click="editContactsInfo(scope.row)"
                      icon="el-icon-edit"
                      circle
                      size="small"
                    ></el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
          </el-row>
        </el-collapse-item>

        <!-- ----------------------------------------------------------------------------------------------------------------------- -->
        <!-- 历史订单管理 -->
        <el-collapse-item title="历史订单管理" name="3">
          <el-row style="margin-top:15px">
            <!-- 该公司历史订单列表 -->
            <el-card shadow="hover">
              <!-- 卡片头部 -->
              <div slot="header" class="clearfix">
                <el-row style="height:40px">
                  <el-col :span="16">
                    <div
                      style="font-size:20px; text-align:left; color:#000000; margin:10px 0px 0px 10px"
                    >该公司历史订单列表</div>
                  </el-col>

                  <!-- <el-col :span="2">
                    <el-button
                      style="float: right; padding: 3px 0 ; height:40px; text-align:center"
                      type="text"
                      icon="el-icon-plus"
                      @click="addContacts()"
                    >添加联系人</el-button>
                  </el-col>-->
                </el-row>
              </div>

              <!-- 列表 -->
              <el-table
                ref="history_order_List"
                :data="historyOrderListData"
                highlight-current-row
                stripe
                border
                @current-change="handleCurrentChange"
                style="width: 100%"
              >
                <el-table-column type="index" label="序号" align="center"></el-table-column>

                <el-table-column property="serialNumber" label="订单编号" align="center"></el-table-column>

                <el-table-column property="createTime" label="日期" align="center"></el-table-column>

                <el-table-column property="address" label="送货地址" align="center"></el-table-column>

                <el-table-column property="state" label="状态" align="center"></el-table-column>

                <el-table-column label="查看详情" align="center">
                  <template>
                    <a target="_blank" href="https://bigyue.top/file/%E5%90%88%E5%90%8C.pdf">查看合同</a>
                  </template>
                </el-table-column>

                <el-table-column label="查看详情" align="center">
                  <template slot-scope="scope">
                    <el-button
                      @click="viewHistoryOrderDetails(scope.row)"
                      icon="el-icon-document"
                      circle
                      size="small"
                    ></el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
          </el-row>
        </el-collapse-item>

        <!-- ----------------------------------------------------------------------------------------------------------------------- -->
        <!-- 交往信息管理 -->
        <el-collapse-item title="交往信息管理" name="4">
          <el-row style="margin-top:15px">
            <!-- 该公司联系人信息列表 -->
            <el-card shadow="hover">
              <!-- 卡片头部 -->
              <div slot="header" class="clearfix">
                <el-row style="height:40px">
                  <el-col :span="16">
                    <div
                      style="font-size:20px; text-align:left; color:#000000; margin:10px 0px 0px 10px"
                    >与该公司交往信息列表</div>
                  </el-col>

                  <el-col :span="2">
                    <el-button
                      style="float: right; padding: 3px 0 ; height:40px; text-align:center"
                      type="text"
                      icon="el-icon-plus"
                      @click="addIntercourse()"
                    >添加交往记录</el-button>
                  </el-col>

                  <el-col :span="2">
                    <el-button
                      style="float: right; padding: 3px 0 ; height:40px; text-align:center"
                      type="text"
                      icon="el-icon-refresh"
                      @click="refreshIntercourseList()"
                    >刷新列表</el-button>
                  </el-col>

                  <el-col :span="2">
                    <el-button
                      style="float: right; padding: 3px 0 ; height:40px; text-align:center"
                      type="text"
                      icon="el-icon-delete"
                      @click="deleteIntercourseInBatches()"
                    >批量删除</el-button>
                  </el-col>

                  <el-col :span="2">
                    <el-button
                      style="float: right; padding: 3px 0 ; height:40px; text-align:center"
                      type="text"
                      icon="el-icon-close"
                      @click="toggleIntercourseSelection()"
                    >取消选择</el-button>
                  </el-col>
                </el-row>
              </div>

              <!-- 列表 -->
              <el-table
                ref="Intercourse_List"
                :data="intercourseListData"
                highlight-current-row
                stripe
                border
                @current-change="handleCurrentChange"
                style="width: 100%"
              >
                <el-table-column fixed="left" type="selection" width="55"></el-table-column>

                <el-table-column type="index" label="序号" align="center"></el-table-column>

                <!-- <el-table-column property="number" label="编号" align="center"></el-table-column> -->

                <el-table-column property="time" label="时间" align="center"></el-table-column>

                <el-table-column property="address" label="地点" align="center"></el-table-column>

                <el-table-column property="profile" label="概要" align="center"></el-table-column>

                <el-table-column property="detailInfo" label="详细信息" align="center"></el-table-column>

                <el-table-column property="remark" label="备注" align="center"></el-table-column>

                <el-table-column label="修改" align="center">
                  <template slot-scope="scope">
                    <el-button
                      @click="editIntercourseInfo(scope.row)"
                      icon="el-icon-edit"
                      circle
                      size="small"
                    ></el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
          </el-row>
        </el-collapse-item>
      </el-collapse>
    </el-row>

    <!-- "新建/修改客户"弹出框 -->
    <el-dialog ref="create_new_customer_dialog" :visible.sync="createNewCustomerDialogVisible">
      <el-form ref="customerInfoDetailsData" :model="customerInfoDetailsData" label-width="100px">
        <!-- 表单第一行 -->
        <el-row>
          <el-col :span="8">
            <el-form-item label="客户编号">
              <el-input v-model="customerInfoDetailsData.serialNumber" :disabled="false"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="16">
            <el-form-item label="客户名称">
              <el-input v-model="customerInfoDetailsData.compName" :disabled="false"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 表单第二行 -->
        <el-row>
          <el-col :span="8">
            <el-form-item label="地区">
              <el-input v-model="customerInfoDetailsData.area" :disabled="false"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8">
                    <el-form-item label="客户经理">
                      <el-input v-model="customerInfoData.manager" :disabled="true"></el-input>
                    </el-form-item>
          </el-col>-->

          <el-col :span="8">
            <el-form-item label="客户等级">
              <el-select
                v-model="customerInfoDetailsData.level"
                style="width:100%"
                :disabled="false"
              >
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
              <el-rate v-model="customerInfoDetailsData.credit"></el-rate>
            </el-form-item>
          </el-col>
        </el-row>

        <el-divider />

        <!-- 表单第四行 -->
        <el-row>
          <el-col :span="8">
            <el-form-item label="地址">
              <el-input v-model="customerInfoDetailsData.compAddress" :disabled="false"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="联系人">
              <el-input v-model="customerInfoDetailsData.contactName" :disabled="false"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="电话">
              <el-input v-model="customerInfoDetailsData.tel" :disabled="false"></el-input>
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
              <el-input v-model="customerInfoDetailsData.licenseNumber" :disabled="false"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="法人">
              <el-input v-model="customerInfoDetailsData.corporation" :disabled="false"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="注册资金">
              <el-input
                v-model="customerInfoDetailsData.registerMoney"
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
                v-model="customerInfoDetailsData.annualSale"
                :disabled="false"
                placeholder="（万元）"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="地税登记号">
              <el-input v-model="customerInfoDetailsData.landTaxNumber" :disabled="false"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="国税登记号">
              <el-input v-model="customerInfoDetailsData.nationalTaxNumber" :disabled="false"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 表单第六行 -->
        <el-row>
          <el-col :span="8">
            <el-form-item label="开户银行">
              <el-input v-model="customerInfoDetailsData.depositBank" :disabled="false"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="16">
            <el-form-item label="银行账号">
              <el-input v-model="customerInfoDetailsData.bankAccount" :disabled="false"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 提交表单按钮 -->
        <el-form-item>
          <el-row>
            <el-col :span="4" :offset="20">
              <el-button
                type="primary"
                @click="submitCreateNewCustomerForm('customerInfoData')"
              >确定提交</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- “添加/修改联系人”弹出框 -->
    <el-dialog ref="create_contacts_dialog" :visible.sync="createContactsDialogVisible">
      <el-form :model="createContactsFormData" ref="createContactsFormData" label-width="100px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="createContactsFormData.name"></el-input>
        </el-form-item>

        <el-form-item label="职位" prop="position">
          <el-input v-model="createContactsFormData.position"></el-input>
        </el-form-item>

        <el-form-item label="办公电话" prop="officePhone">
          <el-input v-model="createContactsFormData.officePhone"></el-input>
        </el-form-item>

        <el-form-item label="手机" prop="mobilePhone">
          <el-input v-model="createContactsFormData.mobilePhone"></el-input>
        </el-form-item>

        <el-form-item label="备注" prop="remark">
          <el-input v-model="createContactsFormData.remark"></el-input>
        </el-form-item>

        <!-- 提交/重置表单按钮 -->
        <el-form-item>
          <el-row>
            <el-col :span="4" :offset="15">
              <el-button
                type="primary"
                @click="submitCreateContactsForm('createContactsFormData')"
              >确定提交</el-button>
            </el-col>
            <el-col :span="4" :offset="1">
              <el-button @click="resetreateContactsForm('createContactsFormData')">重置表单</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- “历史订单详情”弹出框 -->
    <el-dialog
      ref="history_order_details_dialog"
      :visible.sync="historyOrderDialogVisible"
      title="历史订单详情"
    >
      <!-- “历史订单详情”表单 -->
      <el-form
        :model="historyOrderDetailsFormData"
        ref="historyOrderDetailsFormData"
        label-width="100px"
      >
        <el-form-item label="订单编号" prop="number">
          <el-input v-model="historyOrderDetailsFormData.serialNumber" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="日期" prop="date">
          <el-input v-model="historyOrderDetailsFormData.createTime" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="状态" prop="situation">
          <el-input v-model="historyOrderDetailsFormData.state" :disabled="true"></el-input>
        </el-form-item>

        <!-- <el-form-item label="总金额（元）" prop="totalPrice">
          <el-input v-model="historyOrderDetailsFormData.number" :disabled="true"></el-input>
        </el-form-item>-->

        <el-form-item label="送货地址" prop="address">
          <el-input v-model="historyOrderDetailsFormData.address" :disabled="true"></el-input>
        </el-form-item>
      </el-form>

      <el-divider />

      <!-- “历史订单详情”中商品信息表格 -->
      <el-table
        ref="history_order_commodity_List"
        :data="historyOrderCommodityListData"
        highlight-current-row
        stripe
        border
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" align="center"></el-table-column>

        <el-table-column property="name" label="商品名称" align="center"></el-table-column>

        <el-table-column property="number" label="数量" align="center"></el-table-column>

        <el-table-column property="address" label="地区" align="center"></el-table-column>

        <el-table-column property="unit" label="单位" align="center"></el-table-column>

        <el-table-column property="unitPrice" label="单价（元）" align="center"></el-table-column>

        <!-- <el-table-column property="price" label="金额（元）" align="center"></el-table-column> -->
      </el-table>
    </el-dialog>

    <!-- “添加/修改交易信息记录”弹出框 -->
    <el-dialog ref="create_intercourse_dialog" :visible.sync="createIntercourseDialogVisible">
      <el-form
        :model="createIntercourseFormData"
        ref="createIntercourseFormData"
        label-width="100px"
      >
        <el-form-item label="时间" prop="date" v-if="isAdd">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="createIntercourseFormData.time"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="地点" prop="location">
          <el-input v-model="createIntercourseFormData.address"></el-input>
        </el-form-item>

        <el-form-item label="概要" prop="digest">
          <el-input v-model="createIntercourseFormData.profile"></el-input>
        </el-form-item>

        <el-form-item label="备注" prop="remark">
          <el-input v-model="createIntercourseFormData.remark"></el-input>
        </el-form-item>

        <el-form-item label="详情" prop="details">
          <el-input type="textarea" v-model="createIntercourseFormData.detailInfo"></el-input>
        </el-form-item>

        <!-- 提交/重置表单按钮 -->
        <el-form-item>
          <el-row>
            <el-col :span="4" :offset="15">
              <el-button
                type="primary"
                @click="submitCreateIntercourseForm('createIntercourseFormData')"
              >确定提交</el-button>
            </el-col>
            <el-col :span="4" :offset="1">
              <el-button @click="resetreateIntercourseForm('createIntercourseFormData')">重置表单</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import PubSub from "pubsub-js";
import customerApi from "@/api/customer";
import linkmanApi from "@/api/linkman";
import orderApi from "@/api/order";
import commApi from "@/api/comm";

export default {
  data() {
    return {
      // 批量删除
      tableChecked: [],
      ids: [],
      // 查询类型
      selectKey: {
        type: "",
        value: ""
      },

      // “新建客户/修改客户信息”弹出框显示控制
      createNewCustomerDialogVisible: false,

      // 折叠面板活跃项
      collapseActiveName: "1",

      // 客户基本信息相关----------------------------------------------------------------
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
      //客户修改弹窗表格内容
      customerInfoDetailsData: {},
      // 联系人管理相关-----------------------------------------------------------
      // “添加/修改联系人”弹出框控制
      createContactsDialogVisible: false,

      // 联系人表单信息
      createContactsFormData: {
        // id: "",
        // name: "",
        // position: "",
        // officePhone: "",
        // mobilePhone: "",
        // remark: ""
      },

      // “联系人”表格信息
      contactsListData: [],
      currentRowOfContacts: "",

      // 历史订单管理相关---------------------------------------------------------------
      historyOrderListData: [],
      currentRowOfHistoryOrder: "",

      // “历史订单详情”弹出框显示控制
      historyOrderDialogVisible: false,

      // “历史订单详情”弹出框内的表单
      historyOrderDetailsFormData: {
        serialNumber: "",
        createTime: "",
        state: "",
        address: ""
      },

      // “历史订单详情”弹出框内的商品信息表格
      historyOrderCommodityListData: [],

      // 交往信息管理相关----------------------------------------------------------------
      intercourseListData: [],
      currentRowOfIntercourse: "",

      // 控制表单内的时间是否出现
      isAdd : false,

      // “添加/修改交往信息”弹出框显示控制
      createIntercourseDialogVisible: false,

      // “添加/修改交往信息”弹出框内的表单
      createIntercourseFormData: {
        time: "",
        profile: "",
        detailInfo: "",
        address: "",
        remark: "",
        customerId: 0
      }
    };
  },
  // created() {
  //   PubSub.subscribe('details-data',function(event,data){
  //     console.log(data)
  //   })
  // },
  mounted() {
    customerApi.getListById(this.$route.params.id).then(Response => {
      this.customerInfoData = Response.data;
    });

    // contactsListData
    linkmanApi.getcontactsList(this.$route.params.id).then(Response => {
      this.contactsListData = Response.data;
    });

    //historyOrderListData
    orderApi.getOrderListById(this.$route.params.id).then(Response => {
      this.historyOrderListData = Response.data;
    });

    //intercourseListData
    commApi.getCommListById(this.$route.params.id).then(Response => {
      this.intercourseListData = Response.data;
    });
  },
  methods: {
    // 查询框-------------------------------------------------------
    selectByPrimaryKey(selectKey) {
      console.log(selectKey);
    },
    // “新建客户”点击事件
    createNewCustomer() {
      this.$refs.create_new_customer_dialog.title = "新建客户";
      this.createNewCustomerDialogVisible = true;
    },

    //  "新建/修改客户"对话框----------------------------------------------
    submitCreateNewCustomerForm(formName) {
      this.createNewCustomerDialogVisible = false;
      customerApi
        .updateCustomer(this.customerInfoDetailsData)
        .then(Response => {
          console.log("更新成功！");
          this.customerInfoData = this.customerInfoDetailsData;
        });
    },

    // 客户基本信息管理------------------------------------------------------------------------------------
    editCustomerInfo() {
      this.$refs.create_new_customer_dialog.title = "修改客户基本信息";
      this.createNewCustomerDialogVisible = true;
      customerApi.getListById(this.$route.params.id).then(Response => {
        this.customerInfoDetailsData = Response.data;
      });
    },

    // "联系人"表格---------------------------------------------------------------------------------------
    // 添加联系人
    addContacts() {
      this.$refs.create_contacts_dialog.title = "创建联系人";
      this.createContactsFormData = {};
      console.log(
        "点击创建联系人时createContactsFormData",
        this.createContactsFormData
      );
      this.createContactsDialogVisible = true;
    },

    // 查看联系人信息详情
    editContactsInfo(row) {
      const id = row.id;
      this.contactsListData.forEach(item => {
        if (item.id == id) {
          this.createContactsFormData = item;
        }
      });
      console.log("修改联系人信息", this.createContactsFormData);
      this.$refs.create_contacts_dialog.title = "修改联系人信息";
      this.createContactsDialogVisible = true;
    },

    // 表格控制当前选中行
    handleCurrentChange(val) {
      // this.currentRowOfContacts = val;
      // this.currentRowOfHistoryOrder = val;
      // this.currentRowOfIntercourse = val;
      // console.log("表格控制当前选中行",val);
    },

    //当联系人选择状态发生改变时触发
    handleSelectionChange(val) {
      this.tableChecked = val;
      console.log("当联系人选择状态发生改变时触发", val);
    },

    // 批量删除联系人
    deleteContactsInBatches() {
      this.tableChecked.forEach(element => {
        // console.log(element);
        linkmanApi.deleteLinkMan(element.id).then(Response => {
          console.log("删除成功！");
          history.go(-1);
        });
      });
    },

    // 刷新联系人列表
    refreshContactsList() {
      console.log("refresh");
    },

    // 取消选择联系人
    toggleContactsSelection() {
      this.$refs.contacts_List.clearSelection();
      console.log("cancel selection");
    },

    // 提交“新建/修改联系人”对话框---------------------------------------------------
    submitCreateContactsForm(formName) {
      if (this.$refs.create_contacts_dialog.title == "创建联系人") {
        console.log("添加联系人信息", this.createContactsFormData);
        linkmanApi.addLinkMan(this.createContactsFormData).then(Response => {
          console.log("联系人添加成功！");
        });
      } else {
        console.log("修改联系人信息", this.createContactsFormData);
        linkmanApi.updateLinkMan(this.createContactsFormData).then(Response => {
          console.log("联系人更新成功！");
        });
      }

      this.createContactsDialogVisible = false;
    },
    resetreateContactsForm(formName) {
    },

    // 查看历史订单详情按钮---------------------------------------------------------------------------------------------
    viewHistoryOrderDetails(row) {
      console.log("查看历史订单详情按钮", row);
      orderApi.getOrderDetailById(row.id).then(Response => {
        this.historyOrderDetailsFormData.serialNumber =
          Response.data.serialNumber;
        this.historyOrderDetailsFormData.createTime = Response.data.createTime;
        this.historyOrderDetailsFormData.state = Response.data.state;
        this.historyOrderDetailsFormData.address = Response.data.address;
        this.historyOrderCommodityListData = Response.data.products;
      });
      this.historyOrderDialogVisible = true;
    },

    // 交往信息管理-------------------------------------------------------------------------
    // 添加交往信息
    addIntercourse() {
      this.isAdd = false;
      this.$refs.create_intercourse_dialog.title = "创建交往信息记录";
      this.createIntercourseFormData = {};
      this.createIntercourseDialogVisible = true;
    },

    // 修改交往信息
    editIntercourseInfo(row) {
      this.isAdd = true;
      console.log("修改交往信息", row);
      commApi.getOrderDetailById(row.id).then(Response => {
        this.createIntercourseFormData = Response.data;
      });
      this.$refs.create_intercourse_dialog.title = "修改交往信息记录";
      this.createIntercourseDialogVisible = true;
    },

    // 批量删除交往信息记录
    deleteIntercourseInBatches() {},

    // 刷新交往信息记录列表
    refreshIntercourseList() {
      console.log("refresh");
    },

    // 取消选择交往信息记录
    toggleIntercourseSelection() {
      this.$refs.Intercourse_List.clearSelection();
      console.log("cancel selection");
    },

    // “新建/修改联系人”对话框---------------------------------------------------
    submitCreateIntercourseForm(formName) {
      this.createIntercourseDialogVisible = false;
      if (this.$refs.create_intercourse_dialog.title == "创建交往信息记录") {
        this.createIntercourseFormData.customerId = this.$route.params.id;
        console.log("提交的新交往信息",this.createIntercourseFormData);
        commApi.addComm(this.createIntercourseFormData).then(Response => {
          console.log("新建交往信息成功");
        });
      }else {
        commApi.addComm(this.createIntercourseFormData).then(Response => {
          console.log("新建交往信息成功");
        });
      }
    },
    resetreateIntercourseForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
a {
  margin-left: 5px;
  color: #8d5656;
}
a:link {
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
</style>
