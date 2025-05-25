<template>
  <div class="app-page">
    <el-drawer class="teacher_drawer" :title="title" :visible.sync="isAddDrawer" size="50%" :wrapperClosable="false" direction="rtl" :before-close="handleClose">
      <el-form :model="orderForm" :rules="orderRules" ref="orderRuleForm" label-width="120px" class="ruleForm">
        <el-form-item class="form_item" label="年级" prop="grade">
          <el-input :disabled="type == 'look'" v-model="orderForm.grade"></el-input>
        </el-form-item>
        <el-form-item class="form_item" label="性别" prop="sex">
          <el-select v-model="orderForm.sex" :disabled="type == 'look'" placeholder="请选择">
            <el-option v-for="item in sexOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="form_item" label="客户名称" prop="customerName">
          <el-input :disabled="type == 'look'" v-model="orderForm.customerName"></el-input>
        </el-form-item>
        <el-form-item class="form_item" label="教员名称" prop="teacherName">
          <el-input :disabled="type == 'look'" v-model="orderForm.teacherName"></el-input>
        </el-form-item>
        <el-form-item class="form_item" label="地址" prop="address">
          <el-input :disabled="type == 'look'" v-model="orderForm.address"></el-input>
        </el-form-item>
        <el-form-item class="form_item" label="时间" prop="timeStr">
          <el-input :disabled="type == 'look'" v-model="orderForm.timeStr"></el-input>
        </el-form-item>
        <el-form-item class="form_item" label="教员性别" prop="teacherSex">
          <el-select v-model="orderForm.teacherSex" :disabled="type == 'look'" placeholder="请选择">
            <el-option v-for="item in sexOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="form_item" label="授课科目" prop="teachSubject">
          <el-input :disabled="type == 'look'" v-model="orderForm.teachSubject"></el-input>
        </el-form-item>
        <el-form-item class="form_item" label="课酬" prop="wage">
          <el-input :disabled="type == 'look'" v-model="orderForm.wage"></el-input>
        </el-form-item>
        <el-form-item class="form_item" label="频次" prop="frequency">
          <el-input :disabled="type == 'look'" v-model="orderForm.frequency"></el-input>
        </el-form-item>
        <el-form-item class="form_item_line" label="其他补充" prop="otherInfo">
          <el-input :disabled="type == 'look'" type="textarea" :rows="2" maxlength="200" v-model="orderForm.otherInfo"></el-input>
        </el-form-item>
      </el-form>
      <div class="drawer_footer">
        <el-button size="medium" @click="handleClose">{{ type == 'look' ? '取 消' : '返 回' }}</el-button>
        <el-button v-if="type != 'look'" size="medium" :loading="loading" type="primary" @click="submitForm()">提 交</el-button>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import { orderSave, orderUpdate, getOrderDetail } from "@/api/operate.js";

export default {
  data() {
    return {
      orderForm: {
        grade: '',
        sex: '',
        address: '',
        customerName: '',
        teacherName: '',
        timeStr: '',
        teacherSex: '',
        teachSubject: '',
        wage: '',
        frequency: '',
        otherInfo: ''
      },
      sexOptions: [
        {
          value: 0,
          label: '未知'
        },
        {
          value: 1,
          label: '男'
        },
        {
          value: 2,
          label: '女'
        },
      ],
      orderRules: {
        grade: [{ required: true, message: "请输入年级", trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        address: [
          { required: true, message: "请输入地址", trigger: "blur" }
        ],
        customerName: [
          { required: true, message: "请输入客户名称", trigger: "blur" }
        ],
        teacherName: [
          { required: true, message: "请输入教师名称", trigger: "blur" }
        ],
        timeStr: [{ required: true, message: "请输入时间", trigger: "blur" }],
        teacherSex: [
          { required: true, message: "请选择教员性别", trigger: "change" }
        ],
        teachSubject: [
          { required: true, message: "请输入授课科目", trigger: "blur" }
        ],
        wage: [
          { required: true, message: "请输入课酬", trigger: "blur" }
        ],
        frequency: [
          { required: true, message: "请输入频次", trigger: "blur" }
        ],
        otherInfo: [
          { required: true, message: "请输入其他补充", trigger: "blur" }
        ]
      },
      loading: false,
    };
  },
  props: {
    isAddDrawer: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: "add"
    },
    id: {
      type: String,
      default: ""
    }
  },
  computed: {
    title() {
      let str = "新增订单";
      if (this.type == "add") {
        str = "新增订单";
      } else if (this.type == "edit") {
        str = "编辑订单";
      } else if (this.type == "look") {
        str = "查看订单";
      }
      return str;
    }
  },
  methods: {
    getDetail(id) {
      // 获取详情
      const _this = this;
      getOrderDetail({ orderId: id })
        .then(res => {
          if (res.data.code == 0) {
            let detail = res.data.data || {};
            for (const key in detail) {
              for (const keys in _this.orderForm) {
                if (key == keys) {
                  _this.orderForm[keys] = detail[key];
                }
              }
            }
            if (_this.type == 'edit') {
              this.orderForm.id = res.data.data.id
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleClose(value) {
      this.$refs.orderRuleForm.resetFields();
      this.loading = false;
      this.$emit("addClose", value);
    },
    submitForm() {
      const _this = this;
      _this.$refs["orderRuleForm"].validate(valid => {
        if (valid) {
          _this.loading = true;
          let subOrder = this.type == 'add' ? orderSave : orderUpdate
          subOrder(_this.orderForm)
            .then(res => {
              if (res.data.code == 0) {
                _this.handleClose("refresh");
              }
              _this.loading = false;
            })
            .catch(err => {
              _this.loading = false;
            })
        }
      })
    },
  }
};
</script>
<style lang="scss" scoped>
.app-page {
  .teacher_drawer {
    /deep/.el-drawer__body {
      overflow-y: auto;
      .ruleForm {
        padding: 20px 20px 100px 20px;
        display: flex;
        flex-wrap: wrap;
        .form_item {
          width: 50%;
          .el-select,
          .el-cascader {
            width: 100%;
          }
        }
        .form_item_line {
          width: 100%;
        }
        .form_item_img {
          width: 100%;
          .img_list {
            .img {
              width: 100px;
              height: 100px;
            }
          }
        }
      }
      .drawer_footer {
        display: flex;
        background: #ffffff;
        box-shadow: 0 -1px 4px 0 rgba(0, 0, 0, 0.1);
        justify-content: end;
        position: absolute;
        width: 100%;
        bottom: 0;
        right: 0;
        padding: 20px;
      }
    }
  }
}
</style>