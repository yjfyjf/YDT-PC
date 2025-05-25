<template>
  <div class="app-page">
    <el-drawer class="teacher_drawer" :title="title" :visible.sync="isAddDrawer" size="50%" :wrapperClosable="false" direction="rtl" :before-close="handleClose">
      <el-form v-if="isAddDrawer" :model="taecherForm" :rules="taecherRules" ref="taecherRuleForm" label-width="120px" class="ruleForm">
        <el-form-item class="form_item" label="教员姓名" prop="teacherName">
          <el-input :disabled="type == 'look'" v-model="taecherForm.teacherName"></el-input>
        </el-form-item>
        <el-form-item class="form_item" label="年级" prop="gradeCode">
          <el-select :disabled="type == 'look'" v-model="taecherForm.gradeCode" @change="starChange" placeholder="请选择年级">
            <el-option v-for="item in gradeOptions" :key="item.gradeCode" :label="item.gradeName" :value="item.gradeCode"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="form_item" label="擅长科目" prop="subjectCode">
          <el-select :disabled="type == 'look' || !taecherForm.gradeCode" multiple v-model="taecherForm.subjectCode" placeholder="请选择学科">
            <el-option v-for="item in subjectOptions" :key="item.subjectCode" :label="item.subjectName" :value="item.subjectCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="form_item" label="补充学科" prop="otherSubject">
          <el-input :disabled="type == 'look'" v-model="taecherForm.otherSubject"></el-input>
        </el-form-item>
        <el-form-item class="form_item" label="星级" prop="starLevel">
          <div class="star">
            <el-rate :disabled="type == 'look'" v-model="taecherForm.starLevel"></el-rate>
          </div>
        </el-form-item>
        <el-form-item class="form_item" label="接受时薪" prop="expectedHourWage">
          <el-input :disabled="type == 'look'" v-model="taecherForm.expectedHourWage"></el-input>
        </el-form-item>
        <el-form-item class="form_item" label="毕业/现读学校" prop="school">
          <el-input :disabled="type == 'look'" v-model="taecherForm.school"></el-input>
        </el-form-item>
        <el-form-item class="form_item" label="居住地址" prop="address">
          <el-input :disabled="type == 'look'" v-model="taecherForm.address"></el-input>
        </el-form-item>
        <el-form-item class="form_item" label="空闲时间" prop="freeTime">
          <el-tooltip v-if="type == 'look'" effect="dark" :content="freeTimeText" placement="top">
            <el-input disabled v-model="freeTimeText"></el-input>
          </el-tooltip>
          <!-- <el-input v-if="type == 'look'" disabled v-model="taecherForm.freeTime"></el-input> -->
          <el-cascader v-else v-model="taecherForm.freeTime" :props="timeProps" size="medium" :options="options" :show-province="1" :check-strictly="false" :show-all-levels="false" collapse-tags filterable clearable @change="handleChange"></el-cascader>
        </el-form-item>
        <el-form-item class="form_item" label="联系电话" prop="phone">
          <el-input :disabled="type == 'look'" v-model="taecherForm.phone"></el-input>
        </el-form-item>
        <el-form-item class="form_item" label="微信" prop="wxAccount">
          <el-input :disabled="type == 'look'" v-model="taecherForm.wxAccount"></el-input>
        </el-form-item>
        <el-form-item class="form_item_line" label="教员风采" prop="introduction">
          <el-input :disabled="type == 'look'" v-model="taecherForm.introduction" type="textarea" :rows="2" maxlength="200" show-word-limit></el-input>
        </el-form-item>
        <el-form-item class="form_item_img" label="教员图片" prop="wechatImgLink">
          <div v-if="type == 'look'" class="img_list">
            <el-image class="img" v-for="(item, index) in taecherForm.wechatImgLink" :key="index" :src="item" :preview-src-list="taecherForm.wechatImgLink"></el-image>
          </div>
          <div v-else class="img_upload">
            <el-upload class="upload-demo" :action="uploadUrl" :on-preview="handlePreview" :on-success="handleSuccess" :headers="uploadHeader" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="1" :on-exceed="handleExceed" :file-list="taecherForm.wechatImgLink">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过5M、最多一张</div>
            </el-upload>
          </div>
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
import { addEditTeacher, getTeacherDetail, teacherUpdate, getListGradeInfo, getGradeSubject } from "@/api/operate.js";
import { getToken } from '@/utils/auth'
const timeListCasca = [
  {
    value: "1",
    label: "周一",
    disabled: false,
    children: [
      {
        value: "101",
        label: "上午",
        disabled: false,
      },
      {
        value: "102",
        label: "下午",
        disabled: false,
      },
      {
        value: "103",
        label: "晚上",
        disabled: false,
      }
    ]
  },
  {
    value: "2",
    label: "周二",
    disabled: false,
    children: [
      {
        value: "201",
        label: "上午",
        disabled: false,
      },
      {
        value: "202",
        label: "下午",
        disabled: false,
      },
      {
        value: "203",
        label: "晚上",
        disabled: false,
      }
    ]
  },
  {
    value: "3",
    label: "周三",
    disabled: false,
    children: [
      {
        value: "301",
        label: "上午",
        disabled: false,
      },
      {
        value: "302",
        label: "下午",
        disabled: false,
      },
      {
        value: "303",
        label: "晚上",
        disabled: false,
      }
    ]
  },
  {
    value: "4",
    label: "周四",
    disabled: false,
    children: [
      {
        value: "401",
        label: "上午",
        disabled: false,
      },
      {
        value: "402",
        label: "下午",
        disabled: false,
      },
      {
        value: "403",
        label: "晚上",
        disabled: false,
      }
    ]
  },
  {
    value: "5",
    label: "周五",
    disabled: false,
    children: [
      {
        value: "501",
        label: "上午",
        disabled: false,
      },
      {
        value: "502",
        label: "下午",
        disabled: false,
      },
      {
        value: "503",
        label: "晚上",
        disabled: false,
      }
    ]
  },
  {
    value: "6",
    label: "周六",
    disabled: false,
    children: [
      {
        value: "601",
        label: "上午",
        disabled: false,
      },
      {
        value: "602",
        label: "下午",
        disabled: false,
      },
      {
        value: "603",
        label: "晚上",
        disabled: false,
      }
    ]
  },
  {
    value: "7",
    label: "周天",
    disabled: false,
    children: [
      {
        value: "701",
        label: "上午",
        disabled: false,
      },
      {
        value: "702",
        label: "下午",
        disabled: false,
      },
      {
        value: "703",
        label: "晚上",
        disabled: false,
      }
    ]
  }
]

export default {
  data() {
    return {
      taecherForm: {
        teacherName: '',
        starLevel: 0,
        otherSubject: '',
        expectedHourWage: '',
        school: '',
        address: '',
        freeTime: [],
        phone: '',
        wxAccount: '',
        introduction: '',
        subjectCode: [],
        gradeCode: '',
        wechatImgLink: [],
      },
      uploadUrl: process.env.BASE_API + '/attachment/upload',
      uploadHeader: { Token: getToken() },
      taecherRules: {
        teacherName: [{ required: true, message: "请输入教员名称", trigger: "blur" }],
        gradeCode: [{ required: true, message: "请选择年级", trigger: "change" }],
        subjectCode: [
          { required: false, message: "请选择擅长科目", trigger: "change" }
        ],
        starLevel: [{ required: false, message: "请选择星级", trigger: "change" }],
        otherSubject: [{ required: false, message: "请输入补充学科", trigger: "blur" }],
        expectedHourWage: [
          { required: true, message: "请输入接受时新", trigger: "blur" }
        ],
        school: [
          { required: true, message: "请输入学校名称", trigger: "blur" }
        ],
        address: [{ required: true, message: "请输入居住地址", trigger: "blur" }],
        freeTime: [{ required: true, message: "请选择空闲时间", trigger: "change" }],
        phone: [{ required: true, message: "请输入联系电话", trigger: "blur" }],
        wxAccount: [{ required: true, message: "请输入微信", trigger: "blur" }],
        introduction: [{ required: true, message: "请输入教员风采", trigger: "blur" }],
        wechatImgLink: [{ required: true, message: "请上传教员图片", trigger: "change" }]
      },
      loading: false,
      timeProps: {
        multiple: true,
        emitPath: false,
        disabled: 'disabled'
      },
      options: JSON.parse(JSON.stringify(timeListCasca)),
      gradeOptions: [],
      subjectOptions: []
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
      let str = "新增老师";
      if (this.type == "add") {
        str = "新增老师";
        this.options = JSON.parse(JSON.stringify(timeListCasca))
      } else if (this.type == "edit") {
        str = "编辑老师";
        this.options = JSON.parse(JSON.stringify(timeListCasca))
      } else if (this.type == "look") {
        str = "查看详情";
      }
      return str;
    }
  },
  methods: {
    init(id) {
      const _this = this
      _this.getDetail(id)
      _this.getListGradeInfo()
    },
    getListGradeInfo() { // 获取年级
      getListGradeInfo({}).then(res => {
        if (res.data.code == 0) {
          this.gradeOptions = res.data.data || []
        }
      })
    },
    starChange(value) { // 根据年级获取学科
      this.taecherForm.subjectCode = []
      getGradeSubject({ gradeCode: value }).then(res => {
        if (res.data.code == 0) {
          this.subjectOptions = res.data.data || []
        }
      })
    },
    getDetail(id) {
      // 获取详情
      const _this = this;
      getTeacherDetail({ teacherId: id })
        .then(res => {
          if (res.data.code == 0) {
            let detail = res.data.data || {};
            _this.starChange(detail.teacherSubjectList[0].gradeCode)
            let freeTime = []
            _this.freeTimeText = ''
            detail.freeTimeList && detail.freeTimeList.length > 0 && detail.freeTimeList.forEach(item => {
              _this.freeTimeText += item.weekdayDesc + '：'
              item.periodList && item.periodList.length > 0 && item.periodList.forEach(jtem => {
                freeTime.push(jtem.period)
                _this.freeTimeText += jtem.periodDesc + '、'
              })
            })
            _this.taecherForm.freeTime = freeTime
            detail.teacherSubjectList && detail.teacherSubjectList.length > 0 && detail.teacherSubjectList.forEach(item => {
              _this.taecherForm.gradeCode = item.gradeCode
              _this.taecherForm.subjectCode.push(item.subjectCode)
            })
            for (const key in detail) {
              for (const keys in _this.taecherForm) {
                if (key == keys) {
                  _this.taecherForm[keys] = detail[key];
                }
              }
            }
            console.log(_this.taecherForm)
            _this.taecherForm.wechatImgLink = []
            if (_this.type == 'edit') {
              _this.taecherForm.id = res.data.data.id
                _this.taecherForm.wechatImgLink.push({
                url: detail.wechatImgLink,
                name: detail.wechatImgLinkName
              })
            } else if (_this.type == 'look') {
              _this.taecherForm.wechatImgLink.push(detail.wechatImgLink)
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    resetFields(){
      this.$refs.taecherRuleForm.resetFields()
    },
    handleClose(value) {
      this.$refs.taecherRuleForm.resetFields()
      this.loading = false;
      this.$emit("addClose", value);
    },
    handleChange(value) {
      console.log(value, '空闲时间')
    },
    submitForm() {
      const _this = this;
      _this.$refs["taecherRuleForm"].validate(valid => {
        if (valid) {
          _this.loading = true;
          let subTeacher = this.type == 'add' ? addEditTeacher : teacherUpdate
          let params = JSON.parse(JSON.stringify(_this.taecherForm))
          params.teacherSubjectList = []
          if (params.subjectCode && params.subjectCode.length > 0) {
            params.subjectCode.forEach(item => {
              params.teacherSubjectList.push({
                gradeCode: params.gradeCode,
                subjectCode: item
              })
            });
          }
          params.freeTimeList = []
          let freeTimeListArr = []
          if (params.freeTime && params.freeTime.length > 0) {
            params.freeTime.forEach(item => {
              let obj = {
                periodList: []
              }
              _this.options.forEach(jtem => {
                jtem.children.forEach(ktem => {
                  if (item == ktem.value) {
                    obj.periodList.push({
                      period: item,
                      periodDesc: ktem.label,
                    })
                    obj.weekday = jtem.value
                    obj.weekdayDesc = jtem.label
                  }
                })
              })
              freeTimeListArr.push(obj)
            })
          }
          let tempArr = [];
          let dataList = [];
          for (let i = 0; i < freeTimeListArr.length; i++) {
            if (tempArr.indexOf(freeTimeListArr[i].weekday) === -1) {
              dataList.push({
                weekday: freeTimeListArr[i].weekday,
                weekdayDesc: freeTimeListArr[i].weekdayDesc,
                periodList: freeTimeListArr[i].periodList
              });
              tempArr.push(freeTimeListArr[i].weekday);
            } else {
              for (let j = 0; j < dataList.length; j++) {
                if (dataList[j].weekday== freeTimeListArr[i].weekday) {
                  dataList[j].periodList.push(freeTimeListArr[i].periodList[0]);
                  break;
                }
              }
            }
          }
          params.freeTimeList = dataList
          delete params.gradeCode
          delete params.subjectCode
          delete params.freeTime
          params.wechatImgLink = params.wechatImgLink[0].url
          params.channel = 1 // 注册渠道为1是PC 为2是小程序
          subTeacher(params).then(res => {
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
    handleRemove(res, fileList) {
      console.log(res, fileList);
      this.taecherForm.wechatImgLink = [] // 就一张图片 直接清空即可
    },
    handlePreview(file) {
      console.log(file);
    },
    handleSuccess(res, fileList) {
      console.log(res);
      console.log(fileList);
      if (res.code == 0) {
        this.taecherForm.wechatImgLink.push({
          name: res.data.fileOriginalName,
          url: res.data.fileUrl
        })
      }
      console.log(this.taecherForm.wechatImgLink);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
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
          .star{
            margin: auto 0;
            padding: 8px 0 0 0;
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