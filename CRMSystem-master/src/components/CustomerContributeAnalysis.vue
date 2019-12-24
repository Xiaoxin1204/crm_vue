<template>
  <div>
    <!-- 查询框 -->
    <el-row style="margin: 0px 0px 30px 0px">
      <el-form :model="selectKey" label-width="100px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="客户名称">
              <el-input v-model="selectKey.name" style="width:100%"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="选择年份">
              <el-select v-model="selectKey.year" style="width:100%">
                <el-option label="2009" value="2009"></el-option>
                <el-option label="2010" value="2010"></el-option>
                <el-option label="2011" value="2011"></el-option>
                <el-option label="2012" value="2012"></el-option>
                <el-option label="2013" value="2013"></el-option>
                <el-option label="2014" value="2014"></el-option>
                <el-option label="10月" value="10月"></el-option>
                <el-option label="11月" value="11月"></el-option>
                <el-option label="12月" value="12月"></el-option>
                <el-option label="2018" value="2018"></el-option>
                <el-option label="2019" value="2019"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <!-- 提交表单按钮 -->

          <el-col :span="3" :offset="9">
            <el-button round type="primary" @click="selectByPrimaryKey()" style="width: 100%">搜索</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-row>

    <!-- 饼状图 -->
    <el-row>
      <div id="barChart" :style="{width: '1100px', height: '440px'}"></div>
    </el-row>

    <el-row style="margin-top:15px">
      <!-- 客户贡献分析列表 -->
      <el-card shadow="hover">
        <!-- 卡片头部 -->
        <div slot="header" class="clearfix">
          <el-row style="height:40px">
            <el-col :span="16">
              <div
                style="font-size:20px; text-align:left; color:#000000; margin:10px 0px 0px 10px"
              >客户贡献分析列表</div>
            </el-col>
          </el-row>
        </div>

        <!-- 列表 -->
        <el-table
          ref="customer_contribute_analysis_list"
          :data="customerContributeAnalysisListData"
          highlight-current-row
          stripe
          border
          style="width: 100%"
        >
          <el-table-column type="index" label="序号" align="center"></el-table-column>
<!--
          <el-table-column property="number" label="客户编号" align="center"></el-table-column>-->

          <el-table-column property="name" label="客户名称" align="center"></el-table-column>

          <el-table-column property="orderPrice" label="订单金额(千元)" align="center"></el-table-column>
        </el-table>
      </el-card>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 查询类型
      selectKey: {
        year: "",
        name: ""
      },

      // “客户服务信息”列表数据
      customerContributeAnalysisListData: [
        {
          number: "123456",
          name: "阿里巴巴",
          orderPrice: 700
        },
        {
          number: "55b2dc",
          name: "甜蜜蜜",
          orderPrice: 625
        },
        {
          number: "437a37",
          name: "大肥玥集团",
          orderPrice:600
        },
        {
          number: "06a2e2",
          name: "天上人间",
          orderPrice: 577
        },
        {
          number: "bfbbad",
          name: "格雅酒店",
          orderPrice: 565
        },
        {
          number: "123451",
          name: "大肥玥",
          orderPrice: 560
        }
      ]
    };
  },

  mounted() {
    this.drawBar();
  },

  methods: {
    // 查询框-------------------------------------------------------
    selectByPrimaryKey(selectKey) {
      console.log(selectKey);
    },

    drawBar() {
      // 基于准备好的dom，初始化echarts实例
      let barChart = this.$echarts.init(document.getElementById("barChart"));
      // 绘制图表
      barChart.setOption({
        legend: {},
        tooltip: {},
        dataset: {
          dimensions: ["product", "10月", "11月", "12月"],
          source: [
            {
              product: "阿里巴巴",
              "10月": 43.3,
              "11月": 85.8,
              "12月": 93.7
            },
            { product: "甜蜜蜜", "10月": 83.1, "11月": 73.4, "12月": 55.1 },
            {
              product: "大肥玥集团",
              "10月": 86.4,
              "11月": 65.2,
              "12月": 82.5
            },
            {
              product: "天上人间",
              "10月": 72.4,
              "11月": 53.9,
              "12月": 39.1
            }
          ]
        },
        xAxis: { type: "category" },
        yAxis: {},
        series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }]
      });
    }
  }
};
</script>
