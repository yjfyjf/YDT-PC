<template>
	<div>
		<div class="pages">
			<!-- <Header class="header" title="教师入驻"></Header> -->
			<div class="main">
				<div class="piece">
					<div class="line">
						<div class="title">姓名：</div>
						<div class="value">
							<van-field v-model="teacherForm.teacherName" placeholder="请输入教师名称" />
						</div>
					</div>
					<div class="line line_picker">
						<div class="title">擅长学科：</div>
						<div class="discipline">
							<div @click="gradeChick" class="picker_line">{{ gradeName }}</div>
							<div @click="subjectChick" class="picker_line">{{ subjectName }}</div>
						</div>
					</div>
					<div class="line">
						<div class="title">补充学科：</div>
						<div class="value">
							<van-field v-model="teacherForm.otherSubject" placeholder="填写其它可授学科,没有可不填" />
						</div>
					</div>
					<div class="line">
						<div class="title">接受时薪：</div>
						<div class="value">
							<van-field v-model="teacherForm.expectedHourWage" placeholder="请输入接受时薪" />
						</div>
					</div>
				</div>
				<div class="piece">
					<div class="line line_school">
						<div class="title">毕业/现读学校：</div>
						<div class="value">
							<van-field v-model="teacherForm.school" placeholder="请输入现/曾经就读学校" />
						</div>
					</div>
					<div class="line">
						<div class="title">年级专业：</div>
						<div class="value">
							<van-field v-model="teacherForm.profession" placeholder="请输入就读专业及年级:如(2018级)" />
						</div>
					</div>
					<div class="line">
						<div class="title">居住地址：</div>
						<div class="value">
							<van-field v-model="teacherForm.address" placeholder="请输入居住地址" />
						</div>
					</div>
				</div>
				<div class="piece">
					<div class="line_time">
						<div class="line_time_title">空闲时间</div>
						<div class="time_content">
							<div class="time_value">
								<div v-for="(item, index) in timeList" :key="index" class="vertical">
									<div v-if="item.type == 'checkbox'" class="vertical_checkbox_box">
										<div class="vertical_title">{{ item.label }}</div>
										<van-checkbox-group v-for="(jtem, jndex) in item.children" :key="jndex" v-model="timeCheckList" checked-color="#5aab61" class="check_box">
											<van-checkbox shape="square" :name="jtem.value" plain :checked="jtem.check" />
										</van-checkbox-group>
									</div>
									<div v-else class="vertical_title_box">
										<div class="vertical_title" v-for="(jtem, jndex) in item.children" :key="jndex">{{ jtem.label }}</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="line">
						<div class="title">联系电话：</div>
						<div class="value">
							<van-field v-model="teacherForm.phone" placeholder="请输入你的联系电话" />
						</div>
					</div>
					<div class="line">
						<div class="title">微信号：</div>
						<div class="value">
							<van-field v-model="teacherForm.wxAccount" placeholder="请输入你的微信号" />
						</div>
					</div>
				</div>
				<div class="piece">
					<div class="line_photo">
						<div class="title">教员头像：</div>
						<div class="value">
                            <van-uploader v-model="images" preview-size="4.5rem" @delete="cancel" :preview-image="true" :max-count="1" :after-read="afterRead">
								<template v-slot:default>
									<div v-if="images.length < 1">
										<van-image :src="require('../../assets/camera.png')" fit="fill" class="photo_img"></van-image>
									</div>
								</template>
							</van-uploader>
						</div>
					</div>
					<div class="remark">
						<div class="label">备注：</div>
						<div class="text">必须正装蓝红底照</div>
					</div>
				</div>
				<div class="piece">
					<div class="line line_intro">
						<div class="title">教员风采：</div>
						<div class="value">
							<van-field type="textarea" class="introduction" v-model="teacherForm.introduction" placeholder="请输入个人简介、家教经验, 不少于20字"/>
						</div>
					</div>
				</div>
				<div @click="submit" class="btn">申请注册</div>
			</div>
		</div>
		<van-popup v-model="isGrade" round position="bottom">
			<van-picker class="picker_line" show-toolbar @confirm="gradePickerChange" @cancel="isGrade = false" value-key="gradeName" :columns="gradeArray"></van-picker>
		</van-popup>
		<van-popup v-model="isSubject" round position="bottom">
			<van-picker class="picker_line" show-toolbar @confirm="subjectPickerChange" @cancel="isSubject = false" value-key="subjectName" :columns="subjectArray"></van-picker>
		</van-popup>
		<van-loading v-if="isLoading" size="48px" class="loading" type="spinner" vertical>{{ loadTitle }}</van-loading>
	</div>
</template>

<script>
	import { addEditTeacher, getListGradeInfo, getGradeSubject, upload } from "@/api/operate.js";
	import { login } from "@/api/login.js";
	import { setToken, setName, setUser } from '@/utils/auth'
	export default {
		metaInfo: {
			title: '教师入驻'
		},
		data() {
			return {
				gradeArray: [],
				subjectArray: [],
				timeList: [
					{
					  value: "0",
					  label: "",
					  type: 'title',
					  children: [
						{
						  value: "100",
						  label: "",
						  check: false
						},
						{
						  value: "001",
						  label: "上午",
						  check: false
						},
						{
						  value: "002",
						  label: "下午",
						  check: false
						},
						{
						  value: "003",
						  label: "晚上",
						  check: false
						}
					  ]
					},
					{
					  value: "1",
					  label: "周一",
					  type: 'checkbox',
					  children: [
						{
						  value: "101",
						  label: "上午",
						  check: false
						},
						{
						  value: "102",
						  label: "下午",
						  check: false
						},
						{
						  value: "103",
						  label: "晚上",
						  check: false
						}
					  ]
					},
					{
					  value: "2",
					  label: "周二",
					  type: 'checkbox',
					  children: [
						{
						  value: "201",
						  label: "上午",
						  check: false
						},
						{
						  value: "202",
						  label: "下午",
						  check: false
						},
						{
						  value: "203",
						  label: "晚上",
						  check: false
						}
					  ]
					},
					{
					  value: "3",
					  label: "周三",
					  type: 'checkbox',
					  children: [
						{
						  value: "301",
						  label: "上午",
						  check: false
						},
						{
						  value: "302",
						  label: "下午",
						  check: false
						},
						{
						  value: "303",
						  label: "晚上",
						  check: false
						}
					  ]
					},
					{
					  value: "4",
					  label: "周四",
					  type: 'checkbox',
					  children: [
						{
						  value: "401",
						  label: "上午",
						  check: false
						},
						{
						  value: "402",
						  label: "下午",
						  check: false
						},
						{
						  value: "403",
						  label: "晚上",
						  check: false
						}
					  ]
					},
					{
					  value: "5",
					  label: "周五",
					  type: 'checkbox',
					  children: [
						{
						  value: "501",
						  label: "上午",
						  check: false
						},
						{
						  value: "502",
						  label: "下午",
						  check: false
						},
						{
						  value: "503",
						  label: "晚上",
						  check: false
						}
					  ]
					},
					{
					  value: "6",
					  label: "周六",
					  type: 'checkbox',
					  children: [
						{
						  value: "601",
						  label: "上午",
						  check: false
						},
						{
						  value: "602",
						  label: "下午",
						  check: false
						},
						{
						  value: "603",
						  label: "晚上",
						  check: false
						}
					  ]
					},
					{
					  value: "7",
					  label: "周天",
					  type: 'checkbox',
					  children: [
						{
						  value: "701",
						  label: "上午",
						  check: false
						},
						{
						  value: "702",
						  label: "下午",
						  check: false
						},
						{
						  value: "703",
						  label: "晚上",
						  check: false
						}
					  ]
					}
				],
				images: [],
				fileList: [],
				teacherForm: {
					teacherName: '',
					otherSubject: '',
					expectedHourWage: '',
					school: '',
					address: '',
					phone: '',
					wxAccount: '',
					introduction: '',
					channel: 2 // 注册渠道为1是PC 为2是小程序
				},
				gradeName: '',
				gradeCode: '',
				subjectName: '',
				subjectCode: '',
				isGrade: false,
				isSubject: false,
				isLoading: false,
				loadTitle: '',
				timeCheckList: []
			};
		},
		created() {
			this.getLogin()
		},
		methods: {
			getLogin() {
				let token = this.$route.query.Authorization
				if (token) {
					setToken(token)
				}
				// let params = {
				// 	username: 'xcxAdmin',
				// 	password: 'xcxAdmin'
				// }
				// login(params).then(res => {
				// 	if (res.data.code == 0) {
				// 		setToken(res.data.data.token)
				// 		setName(res.data.data.nickName)
				// 		setUser(JSON.stringify(res.data.data))
				// 		this.getGradeList()
				// 	}
				// })
			},
			getGradeList() { // 获取年级
				getListGradeInfo({}).then(res => {
					console.log(res, '年级')
					if (res.data.code == 0) {
						this.gradeArray = res.data.data || []
						this.gradeName = this.gradeArray[0].gradeName
						this.gradeCode = this.gradeArray[0].gradeCode
						this.getGradeSubject()
					} else {
						this.$toast(res.data.msg)	
					}
				})
					.catch(err => {
						console.log(err)
					})
			},
			getGradeSubject() { // 获取科目
				getGradeSubject({gradeCode: this.gradeCode}).then(res => {
					console.log(res, '科目')
					if (res.data.code == 0) {
						this.subjectArray = res.data.data || []
						this.subjectName = this.subjectArray[0].subjectName
						this.subjectCode = this.subjectArray[0].subjectCode
					} else {
						this.$toast(res.data.msg)	
					}
				})
					.catch(err => {
						console.log(err)
					})
			},
			gradeChick(val) { // 点击年级
				console.log(val, '点击年级')
				this.isGrade = true
			},
			subjectChick(val) { // 点击科目
				console.log(val, '点击科目')
				this.isSubject = true
			},
			gradePickerChange(val) {
				console.log(val, 'val年级')
				this.gradeName = val.gradeName
				this.gradeCode = val.gradeCode
				this.getGradeSubject()
				this.subjectName = this.subjectArray[0].subjectName
				this.subjectCode = this.subjectArray[0].subjectCode
				this.isGrade = false
			},
			subjectPickerChange(val) {
				console.log(val, 'val科目')
				this.subjectName = val.subjectName
				this.subjectCode = val.subjectCode
				this.isSubject = false
			},
			timeChange(jtem) { // 时间复选框
				console.log(jtem);
				jtem.check = !jtem.check
			},
			afterRead(item) { // 上传图片
				console.log(item, 'item');
				let _this = this;
				_this.isLoading = true
				_this.loadTitle = '图片上传中'
				let formData = new FormData();
				formData.append('file', item.file)
				upload(formData).then(res => {
					console.log(res, '上传图片')
					_this.isLoading = false
					if (res.data.code == 0) {
						_this.fileList.push(res.data.data.fileUrl)
						_this.$toast('图片上传成功')
					} else {
						_this.$toast('图片上传失败')
						_this.fileList = []
					}
				})
				  .catch(err => {
					console.log(err)
					_this.isLoading = false
					_this.fileList = []
				  })
			},
			cancel(item, index) { // 删除照片
				console.log(item, index, 'item 删除图片')
				this.fileList = []
			},
			submit() { // 申请注册
				const _this = this
				console.log(_this.timeList)
				if(!_this.teacherForm.teacherName) {
					return _this.$toast('姓名不能为空') 
				} else if(!_this.teacherForm.expectedHourWage){
					return _this.$toast('接受时薪不能为空')
				} else if(!_this.teacherForm.school){
					return _this.$toast('就读学校不能为空')
				} else if(!_this.teacherForm.profession){
					return _this.$toast('年级专业不能为空')
				} else if(!_this.teacherForm.address){
					return _this.$toast('居住地址不能为空')
				} else if(!_this.teacherForm.phone){
					return _this.$toast('联系电话不能为空')
				} else if(!_this.teacherForm.wxAccount){
					return _this.$toast('微信不能为空')
				} else if(_this.images.length == 0){
					return _this.$toast('头像不能为空')
				} else if(!_this.teacherForm.introduction){
					return _this.$toast('教员风采不能为空')
				}
				let freeTimeListArr = []
				console.log(_this.timeCheckList, '_this.timeCheckList ')
				if (_this.timeCheckList && _this.timeCheckList.length > 0) {
					_this.timeCheckList.forEach(item => {
					  let obj = {
						periodList: []
					  }
					  _this.timeList.forEach(jtem => {
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
				} else {
					return _this.$toast('空闲时间不能为空')
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
				_this.teacherForm.freeTimeList = dataList
				_this.teacherForm.wechatImgLink = _this.fileList.toString()
				_this.teacherForm.teacherSubjectList = []
				_this.teacherForm.teacherSubjectList.push({
					gradeCode: _this.gradeCode,
					subjectCode: _this.subjectCode
				})
				_this.isLoading = true
				_this.loadTitle = '注册中'
				addEditTeacher(_this.teacherForm).then(res => {
					_this.isLoading = false
					if (res.data.code == 0) {
						_this.$toast('注册成功')
						let timer = setTimeout(() => {
							if (/miniProgram/i.test(navigator.userAgent.toLowerCase())) {
								wx.miniProgram.navigateBack({})
							}
							clearInterval(timer);
						}, 1000);
					} else {
						_this.$toast(res.data.msg)
					}
				})
					.catch(err => {
						_this.isLoading = false
						console.log(err)
					})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.main{
		background: #fafafa;
		padding: 0 0 80px 0;
		// margin: 0 0 80px 0;
		.piece{
			padding: 10px 5px;
			border-radius: 10px;
			background: #ffffff;
			margin: 10px;
			.line{
				display: flex;
				// padding: 10px 0;
				font-size: 14px;
				border-bottom: 1.5px solid #eeeeee;
				&:last-child{
					border-bottom: none;
				}
				.title{
					width: 110px;
					// width: 150px;
					margin: auto 0;
					text-align: left;
				}
				.discipline{
					width: 100%;
					display: flex;
					.picker_line{
						width: 50%;
					}
				}
				.value{
					width: 100%;
					margin: auto 0;
				}
			}
			.line_picker{
				padding: 10px 0;
			}
			.line_time{
				padding: 10px 0;
				font-size: 14px;
				border-bottom: 1.5px solid #eeeeee;
				.line_time_title{
					text-align: center;
					padding: 0 0 12px 0;
					border-bottom: 1.5px solid #eeeeee;
				}
				.time_content{
					display: flex;
					padding: 13px 0 0 0;
					.title_box{
						// width: 80px;
						width: 150px;
						.time_box{
							display: flex;
							flex-direction: column;
							justify-content: center;
							.title{
								height: 24px;
								line-height: 24px;
								// margin: 4px 0;
								// &:first-child{
								// 	margin: 2px 0;
								// }
							}
						}
					}
					.time_value{
						width: 100%;
						display: flex;
						justify-content: space-between;
						.check_box{
							display: flex;
							justify-content: center;
							margin: 5px 0;
						}
						.vertical{
							.vertical_title_box{
								.vertical_title{
									&:first-child{
										height: 16px;
										line-height: 16px;
									}
									height: 24px;
									line-height: 24px;
									margin: 1px 0;
								}
							}
						}
					}
				}
			}
			.line_intro{
				.title{
					margin: initial;
					min-width: 70px;
					// min-width: 150px;
				}
				.value{
					padding: 3px 0 0 0;
					.introduction{
						position: initial;
						padding: 0;
					}
				}
			}
			.line_school{
				.title{
					width: 150px;
				}
			}
			.line_photo{
				display: flex;
				font-size: 14px;
				.title{
					width: 70px;
					// width: 150px;
					text-align: left;
				}
				.value{
					.photo_img{
						width: 80px;
						height: 80px;
						border: 1.5px solid #eeeeee;
						border-radius: 6px;
					}
					.teacher_photo{
						.photo_img{
							width: 80px;
							height: 80px;
							border: 1.5px solid #eeeeee;
							border-radius: 6px;
						}
					}
				}
			}
			.remark{
				font-size: 14px;
				display: flex;
				.text{
					color: red;
				}
			}
		}
		.btn{
			width: 100%;
			text-align: center;
			font-size: 16px;
			padding: 12px 0;
			background: #88a169;
			color: #FFFFFF;
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			z-index: 9;
		}
	}
	.loading{
		width: 100%;
		height: 100%;
		z-index: 99;
		position: fixed;
		top: 0;
		background: #000000;
		opacity: 0.5;
		display: flex;
		justify-content: center;
	}
</style>
