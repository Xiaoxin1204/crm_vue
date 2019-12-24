<template>
  <div>
    <!-- 查询框 -->
    <el-row style="margin: 0px 0px 30px 0px">
      <el-form :model="selectKey" label-width="100px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="选择客户等级">
              <el-select v-model="selectKey.rank" style="width:100%">
                <el-option label="S" value="S"></el-option>
                <el-option label="A" value="A"></el-option>
                <el-option label="B" value="B"></el-option>
                <el-option label="C" value="C"></el-option>
                <el-option label="D" value="D"></el-option>
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
      <!-- 客户构成分析列表 -->
      <el-card shadow="hover">
        <!-- 卡片头部 -->
        <div slot="header" class="clearfix">
          <el-row style="height:40px">
            <el-col :span="16">
              <div
                style="font-size:20px; text-align:left; color:#000000; margin:10px 0px 0px 10px"
              >客户构成分析列表</div>
            </el-col>
          </el-row>
        </div>

        <!-- 列表 -->
        <el-table
          ref="customer_construct_analysis_list"
          :data="customerConstructAnalysisListData"
          highlight-current-row
          stripe
          border
          style="width: 100%"
        >
          <el-table-column type="index" label="序号" align="center"></el-table-column>
<!--
          <el-table-column property="number" label="编号" align="center"></el-table-column>-->

          <el-table-column property="rank" label="等级" align="center"></el-table-column>

          <el-table-column property="amount" label="客户数量" align="center"></el-table-column>
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
        rank: ""
      },

      // “客户服务信息”列表数据
      customerConstructAnalysisListData: [
        {
          number: "1",
          rank: "S",
          amount: "15"
        },
        {
          number: "2",
          rank: "A",
          amount: "14"
        },
        {
          number: "3",
          rank: "B",
          amount: "17"
        },
        {
          number: "4",
          rank: "C",
          amount: "21"
        },
        {
          number: "5",
          rank: "D",
          amount: "25"
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
           tooltip : {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        data:['S','A','B','C','D']
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data : ['周一','周二','周三','周四','周五','周六','周日']
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'S',
            type:'line',
            stack: '总量',
            areaStyle: {},
            data:[2, 2, 3, 2, 1, 2, 2]
        },
        {
            name:'A',
            type:'line',
            stack: '总量',
            areaStyle: {},
            data:[2, 2, 4, 5, 2, 6, 3]
        },
        {
            name:'B',
            type:'line',
            stack: '总量',
            areaStyle: {},
            data:[5, 4, 6, 8, 5, 5, 2]
        },
        {
            name:'C',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data:[5, 4, 2, 4, 5, 2, 4]
        },
        {
            name:'D',
            type:'line',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            areaStyle: {normal: {}},
            data:[5, 4, 5, 6, 4, 5, 2]
        }
    ]
      });
    }
  }
};
</script>
