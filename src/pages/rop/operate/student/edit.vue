<template>
  <div class="app-page">
    <el-drawer class="teacher_drawer" :title="title" :visible.sync="isAddDrawer" size="50%" :wrapperClosable="false" direction="rtl" :before-close="handleClose">
      <el-form :model="studentForm" :rules="taecherRules" ref="studentRuleForm" label-width="120px" class="ruleForm">
        <el-form-item class="form_item" label="学员名字" prop="studentName">
          <el-input :disabled="type == 'look'" v-model="studentForm.studentName"></el-input>
        </el-form-item>
        <el-form-item class="form_item" label="就读年级" prop="currentGrade">
          <el-input :disabled="type == 'look'" v-model="studentForm.currentGrade"></el-input>
        </el-form-item>
        <el-form-item class="form_item" label="现读学校" prop="currentSchool">
          <el-input :disabled="type == 'look'" v-model="studentForm.currentSchool"></el-input>
        </el-form-item>
        <el-form-item class="form_item" label="学员家长名字" prop="parentName">
          <el-input :disabled="type == 'look'" v-model="studentForm.parentName"></el-input>
        </el-form-item>
        <el-form-item class="form_item" label="学员电话" prop="phone">
          <el-input :disabled="type == 'look'" v-model="studentForm.phone"></el-input>
        </el-form-item>
        <el-form-item class="form_item" label="学员家长电话" prop="parentPhone">
          <el-input :disabled="type == 'look'" v-model="studentForm.parentPhone"></el-input>
        </el-form-item>
        <el-form-item class="form_item_line" label="学员学习情况" prop="studySituation">
          <el-input :disabled="type == 'look'" type="textarea" :rows="2" maxlength="200" v-model="studentForm.studySituation"></el-input>
        </el-form-item>
        <el-form-item class="form_item_line" label="学习成绩" prop="achievement">
          <el-input :disabled="type == 'look'" type="textarea" :rows="2" maxlength="200" v-model="studentForm.achievement"></el-input>
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
import { studentSave, studentUpdate, getStudentInfoDetail } from "@/api/operate.js";

export default {
  data() {
    return {
      studentForm: {
        studentName: '',
        currentGrade: '',
        currentSchool: '',
        parentName: '',
        phone: '',
        parentPhone: '',
        studySituation: '',
        achievement: '',
      },
      taecherRules: {
        studentName: [{ required: true, message: "请输入学员名字", trigger: "blur" }],
        currentGrade: [{ required: true, message: "请输入就读年级", trigger: "blur" }],
        currentSchool: [{ required: true, message: "请输入现读学校", trigger: "blur" }],
        parentName: [{ required: true, message: "请输入学员家长名字", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入学员电话", trigger: "blur" }
        ],
        parentPhone: [{ required: false, message: "请输入学员家长电话", trigger: "blur" }],
        studySituation: [
          { required: true, message: "请输入学员学习情况", trigger: "blur" }
        ],
        achievement: [
          { required: true, message: "请输入学习成绩", trigger: "blur" }
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
  },
  computed: {
    title() {
      let str = "新增学员";
      if (this.type == "add") {
        str = "新增学员";
      } else if (this.type == "edit") {
        str = "编辑学员";
      } else if (this.type == "look") {
        str = "查看详情";
      }
      return str;
    }
  },
  methods: {
    getDetail(id) {
      // 获取详情
      const _this = this;
      getStudentInfoDetail({ studentId: id })
        .then(res => {
          if (res.data.code == 0) {
            let detail = res.data.data || {};
            for (const key in detail) {
              for (const keys in _this.studentForm) {
                if (key == keys) {
                  _this.studentForm[keys] = detail[key];
                }
              }
            }
            if (_this.type == 'edit') {
              this.studentForm.id = res.data.data.id
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleClose(value) {
      this.$refs.studentRuleForm.resetFields();
      this.loading = false;
      this.$emit("addClose", value);
    },
    submitForm() {
      const _this = this;
      _this.$refs["studentRuleForm"].validate(valid => {
        if (valid) {
          _this.loading = true;
          let subStudent = this.type == 'add' ? studentSave : studentUpdate
          subStudent(_this.studentForm)
            .then(res => {
              if (res.data.code == 0) {
                _this.handleClose("refresh");
              }
              _this.loading = false;
            })
            .catch(err => {
              _this.loading = false;
            });
        }
      });
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