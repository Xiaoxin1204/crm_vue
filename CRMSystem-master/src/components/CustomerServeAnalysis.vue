<template>
  <div>
    <!-- 查询框 -->
    <el-row style="margin: 0px 0px 30px 0px">
      <el-form :model="selectKey" label-width="100px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="选择年份">
              <el-select v-model="selectKey.year" style="width:100%">
                <el-option label="2009" value="2009"></el-option>
                <el-option label="2010" value="2010"></el-option>
                <el-option label="2011" value="2011"></el-option>
                <el-option label="2012" value="2012"></el-option>
                <el-option label="2013" value="2013"></el-option>
                <el-option label="2014" value="2014"></el-option>
                <el-option label="2015" value="2015"></el-option>
                <el-option label="2016" value="2016"></el-option>
                <el-option label="2017" value="2017"></el-option>
                <el-option label="2018" value="2018"></el-option>
                <el-option label="2019" value="2019"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <!-- 提交表单按钮 -->

          <el-col :span="3" :offset="15">
            <el-button round type="primary" @click="selectByPrimaryKey()" style="width: 100%">搜索</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-row>

    <!-- 折线图 -->
    <el-row>
      <div id="lineChart" :style="{width: '1100px', height: '440px'}"></div>
    </el-row>

    <el-row style="margin-top:15px">
      <!-- 客户服务分析列表 -->
      <el-card shadow="hover">
        <!-- 卡片头部 -->
        <div slot="header" class="clearfix">
          <el-row style="height:40px">
            <el-col :span="16">
              <div
                style="font-size:20px; text-align:left; color:#000000; margin:10px 0px 0px 10px"
              >客户服务分析列表</div>
            </el-col>
          </el-row>
        </div>

        <!-- 列表 -->
        <el-table
          ref="customer_serve_analysis_list"
          :data="customerServeAnalysisListData"
          highlight-current-row
          stripe
          border
          style="width: 100%"
        >
          <el-table-column type="index" label="序号" align="center"></el-table-column>

       <!--   <el-table-column property="number" label="客户编号" align="center"></el-table-column>-->

          <el-table-column property="item" label="条目" align="center"></el-table-column>

          <el-table-column property="amount" label="服务数量" align="center"></el-table-column>
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
        year: ""
      },

      // “客户服务信息”列表数据
      customerServeAnalysisListData: [
        {
          number: "1",
          item: "建议",
          amount: 23
        },
        {
          number: "2",
          item: "咨询",
          amount: 37
        },
        {
          number: "3",
          item: "投诉",
          amount: 40
        }
      ]
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    // 查询框-------------------------------------------------------
    selectByPrimaryKey(selectKey) {
      console.log(selectKey);
    },

    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let lineChart = this.$echarts.init(document.getElementById("lineChart"));
      // 绘制图表
      lineChart.setOption({
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["建议", "咨询", "投诉"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "建议",
            type: "line",
            stack: "总量",
            data: [4, 3, 2, 5, 2, 2, 5]
          },
          {
            name: "咨询",
            type: "line",
            stack: "总量",
            data: [4, 2, 5, 5, 3, 8, 10]
          },
          {
            name: "投诉",
            type: "line",
            stack: "总量",
            data: [6, 8, 4, 5, 6, 4, 7]
          }
        ]
      });
    }
  }
};
</script>
