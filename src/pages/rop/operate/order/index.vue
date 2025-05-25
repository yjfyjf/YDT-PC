<template>
  <div class="app-page">
    <router-view />
    <div v-show="$route.meta.show" class="app-page-list">
      <div class="app-form">
        <el-form ref="form" :inline="true" label-width="80px" label-position="left">
          <el-form-item label="订单编号:">
            <el-input v-model="listQuery.orderNo" placeholder="请输入关键字查询" />
          </el-form-item>
          <el-form-item class="form_btns">
            <el-button class="btn" type="primary" @click="handleFilter">查询</el-button>
            <el-button class="btn" @click="resetListQuery">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="table_operate">
        <div class="btns">
          <el-button type="primary" size="mini" @click="handleClick('add')">新增</el-button>
        </div>
      </div>
      <el-table v-loading="listLoading" :data="list" border empty-text="暂无数据">
        <el-table-column type="index" label="序号" width="50px" align="center" />
        <el-table-column v-for="(item, jndex) in columnList" :key="jndex" :prop="item.prop" :label="item.label" :width="item.width" show-overflow-tooltip :fixed="item.fixed" align="left">
          <template slot-scope="scope">
            <span>{{ scope.row[item.prop] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" align="left" width="220px">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleClick('look',scope.row)">详情</el-button>
            <el-button type="primary" size="mini" class="deleteBtn" @click="handleClick('edit',scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleClick('delete',scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    </div>
    <orderAdd :isAddDrawer="isAddDrawer" ref="orderAdd" :id="id" :type="type" @addClose="addClose" />
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import { getOrderList, orderDelete } from "@/api/operate.js";
import orderAdd from "../order/edit";
const params = {
  orderNo: "",
  page: 1,
  limit: 10
};
export default {
  name: "teacherList",
  components: { Pagination, orderAdd },
  data() {
    return {
      gradeOptions: [],
      total: 0,
      listQuery: JSON.parse(JSON.stringify(params)),
      list: [],
      listLoading: false,
      isAddDrawer: false,
      columnList: [
        { prop: "orderNo", label: "订单编号" },
        { prop: "customerName", label: "客户名称" },
        { prop: "timeStr", label: "时间" },
        { prop: "wage", label: "课酬" },
        { prop: "frequency", label: "频次" },
        { prop: "otherInfo", label: "其它补充" },
      ],
      id: "",
      type: ""
    };
  },
  created() {
    this.getList();
  },
  activated() {
    console.log("进来了");
    if (this.$route.meta.keepAlive) {
      // this.getList();
    }
  },
  methods: {
    getList() {
      // 获取列表数据
      this.listLoading = true;
      return getOrderList(this.listQuery)
        .then(response => {
          this.listLoading = false;
          if (response.data.code === 0) {
            this.list = response.data.data.list;
            this.total = response.data.data.total;
          }
        })
        .catch(err => {
          this.listLoading = false;
          console.log("error", err);
        });
    },
    addClose(value) {
      // 新增关闭
      this.isAddDrawer = false;
      if (value == "refresh") {
        this.getList();
      }
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    resetListQuery() {
      this.listQuery = JSON.parse(JSON.stringify(params));
    },
    handleClick(type, row) {
      this.type = type;
      if (type === "look") {
        this.isAddDrawer = true;
        this.id = row.id;
        this.$refs.orderAdd.getDetail(row.id)
      } else if (type == "add") {
        this.isAddDrawer = true;
      } else if (type === "edit") {
        this.isAddDrawer = true;
        this.id = row.id;
        this.$refs.orderAdd.getDetail(row.id)
      } else if (type === "delete") {
        // 删除
        this.$confirm("确定删除该数据?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          closeOnClickModal: false
        })
          .then(() => {
            orderDelete({ orderId: row.id })
              .then(response => {
                if (response.data.code == 0) {
                  this.$message({
                    message: '删除成功',
                    duration: 3000,
                    type: "success"
                  });
                  this.getList();
                }
              })
              .catch(err => {
                console.log("删除失败：" + err);
              });
          })
          .catch(() => {
            console.log("取消删除");
          });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.form_btns {
  float: right;
}
.table_operate {
  width: 100%;
  display: flex;
  justify-content: end;
  padding: 0 0 10px 0;
}
</style>
