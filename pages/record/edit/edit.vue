<template>
	<view class="content">
		<u-navbar title-color="#fff" back-icon-color="#ffffff" :is-fixed="true" :is-back="true" :background="background"
		 :back-text-style="{color: '#fff'}" :title="add_title" :back-icon-name="backIconName" :back-text="backText">
		</u-navbar>

	<!-- {{model.contentHtml}} -->
		<view class="acontent">
			<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
				<!-- <u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" label-width="120" :label-position="labelPosition"
				 label="标题" prop="title">
					<u-input :border="border" placeholder="请输入标题" v-model="model.title" type="text"></u-input>
				</u-form-item> -->
				<u-form-item :label-position="labelPosition" label="睡眠" prop="sleep">
					<u-select v-model="show" :list="sleeplist" @confirm="confirm"></u-select>
					<u-button @click="show = true" style="margin: 5% 5%;width: 90%;color:#da8000;">{{sleepWord}}</u-button>
				</u-form-item>
				<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" label-width="120" :label-position="labelPosition"
				 label="抑郁天数" prop="days">
					<u-input placeholder="请输入抑郁天数" v-model="model.days" type="number"></u-input>
				</u-form-item>
				<u-form-item :label-position="labelPosition" label="心情状况" prop="emotion" label-width="150">
					<u-radio-group v-model="radioEmotion" @change="radioGroupChangeEmotion" :width="radioCheckWidth" :wrap="radioCheckWrap">
						<u-radio shape="circle" v-for="item in radioListEmotion" :key="item.number" :name="item.name">{{ item.name }}</u-radio>
					</u-radio-group>
				</u-form-item>
				<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" label-width="120" :label-position="labelPosition"
				 label="喝药天数" prop="medicine">
					<u-input placeholder="请输入喝药天数" v-model="model.medicineDays" type="number"></u-input>
				</u-form-item>
				<u-form-item :label-position="labelPosition" label="药物状况" prop="status" label-width="150">
					<u-radio-group v-model="radioMedicine" @change="radioGroupChangeMedicine" :width="radioCheckWidth" :wrap="radioCheckWrap">
						<u-radio shape="circle" v-for="item in radioListMedicine" :key="item.number" :name="item.name">{{ item.name }}</u-radio>
					</u-radio-group>
				</u-form-item>
				
				<u-form-item :label-position="labelPosition" label="选择日期" prop="theDate" label-width="150">
					<view class="u-demo">
						<view class="u-demo-wrap" style="background-color: #FFFFFF;">
							<view class="u-demo-area">
								<u-calendar v-model="showCalendar" ref="calendar" @change="change" :mode="mode" :start-text="startText" :end-text="endText"
								 :range-color="rangeColor" :range-bg-color="rangeBgColor" :active-bg-color="activeBgColor" :btn-type="btnType">
								</u-calendar>
								<!-- <view class="u-demo-result-line">
									{{result}}
								</view> -->
							</view>
						</view>
						<view class="u-config-wrap">
							<view class="u-config-item">
								<!-- <u-subsection :current="showBtnStatus" :list="['选择日期', '隐藏']" @change="showChange"></u-subsection> -->
								<u-button style="color: #f0ad4e;" @click="showCalendar = true">{{result}}</u-button>
							</view>
						</view>
					</view>
				</u-form-item>
				
				
				
			</u-form>
			<u-button @click="submit" style="background-color: #da8000;color: #fff;">提交</u-button>
		</view>



		<!-- <u-tabbar v-model="current" :show="show" :bg-color="bgColor" :border-top="borderTop" :list="list" :inactive-color="inactiveColor"
		 :activeColor="activeColor" @change="gotoOther">
		</u-tabbar> -->
	</view>
</template>

<script>
	import {addRecord} from '../../../api/record.js'
	import user from "@/storev/module/user.js";
	export default {
		data() {
			return {
				add_title: '添加记录',
				backIconName: 'arrow-left',
				backText: '',
				background: {
					'background-image': 'linear-gradient(45deg, rgb(219, 165, 139), rgb(244,223, 206))'
				},

				/*current: 0,
				show: true,
				bgColor: '#fbf1e8', //f4dfce
				borderTop: true,
				activeColor: '#dba58b',
				inactiveColor: '#dba58b',
				list: [{
						iconPath: "file-text",
						selectedIconPath: "file-text-fill",
						text: '科普',
						count: 0,
						isDot: true,
						customIcon: false,
						pagePath: '/pages/index/index',
					},
					{
						iconPath: "question-circle",
						selectedIconPath: "question-circle-fill",
						text: '问答',
						customIcon: false,
						pagePath: '/pages/doctor/index',
					},
					{
						iconPath: "heart",
						selectedIconPath: "heart-fill",
						text: '动态',
						customIcon: false,
						pagePath: '/pages/service/index',
					},
					{
						iconPath: "edit-pen",
						selectedIconPath: "edit-pen-fill",
						text: '记录',
						customIcon: false,
						pagePath: '/pages/service/index',
					}
				],*/

				show: false,
				sleepWord: '是否失眠',
				sleeplist: [{
						value: '0',
						label: '正常'
					},
					{
						value: '1',
						label: '失眠'
					}
				],
				
				radioListEmotion: [
					{
						name: '平静',
						number: 0,
						checked: true,
						disabled: false
					},
					{
						name: '开心',
						number: 1,
						checked: false,
						disabled: false
					},
					{
						name: '低落',
						number: 2,
						checked: false,
						disabled: false
					},
					{
						name: '愤怒',
						number: 3,
						checked: false,
						disabled: false
					}
				],
				radioEmotion: '',
				radioCheckWidth: 'auto',
				radioCheckWrap: false,
				
				radioListMedicine: [
					{
						name: '无感',
						number: 0,
						checked: true,
						disabled: false
					},
					{
						name: '起效',
						number: 1,
						checked: false,
						disabled: false
					},
					{
						name: '不起效',
						number: 2,
						checked: false,
						disabled: false
					}
				],
				radioMedicine: '',
				
				showCalendar: false,
				mode: 'date',
				result: "日期",
				startText: '开始',
				endText: '结束',
				rangeColor: '#dba58b',
				rangeBgColor: 'rgba(41,121,255,0.13)',
				activeBgColor: '#dba58b',
				btnType: 'warning',
				
				labelPosition: 'left',
				codeTips: '',
				errorType: ['message'],

				requestParameters: {},
				model: {
					userId: '',
					sleep: '',
					days: '',
					emotion: '',
					medicineDays: '',
					status: '',
					theDate: ''
				},
				rules: {
					title: [{
						required: true,
						message: '请输入姓名',
						trigger: 'blur',
					}, ],
				},
				userId : ''
			}
		},
		onLoad() {
			this.userId = user.state.userId

		},
		methods: {
			confirm(e) {
				console.log('sleep', e[0].label);
				this.model.sleep = e[0].value
				this.sleepWord = e[0].label

			},
			// radio选择发生变化
			radioGroupChangeEmotion(e) {
				console.log(e)
				if(e==="平静"){
					this.model.status = 0
					console.log(this.model.status)
				}else if(e==="开心"){
					this.model.status = 1
					console.log(this.model.status)
				}else if(e==="低落"){
					this.model.status = 2
					console.log(this.model.status)
				}else if(e==="愤怒"){
					this.model.status = 3
					console.log(this.model.status)
				}
			},
			// radio选择发生变化
			radioGroupChangeMedicine(e) {
				console.log(e)
				if(e==="无感"){
					this.model.emotion = 0
					console.log(this.model.emotion)
				}else if(e==="起效"){
					this.model.emotion = 1
					console.log(this.model.emotion)
				}else if(e==="不起效"){
					this.model.emotion = 2
					console.log(this.model.emotion)
				}
				
			},
			
			change(e) {
				this.result = e.result;
				this.model.theDate = this.result
			},
			submitPhoto() {
				let files = [];
				// 通过filter，筛选出上传进度为100的文件(因为某些上传失败的文件，进度值不为100，这个是可选的操作)
				files = this.$refs.uUpload.lists.filter(val => {
					this.model.url = '/file/image/' + val.response.data.fileName
					this.model.fileId = val.response.data.id
					console.log(val.response, ':filename', this.image)
					return val.progress == 100;

				})
				// 如果您不需要进行太多的处理，直接如下即可
				// files = this.$refs.uUpload.lists;
				console.log(this.$refs.uUpload.lists)
			},
			submit() {
				console.log('提交')
				this.$refs.uForm.validate(valid => {
					console.log(valid)
					if (valid) {
						console.log("user:", this.userId)
						const user = {
							userId: this.userId
						}
						this.requestParameters = Object.assign({}, this.model, user)
						console.log('requestParam', this.requestParameters)
						addRecord(this.requestParameters).then(res => {
							console.log(res)
						}).catch(res => {
							console.log(res)
						})
						// if (!this.model.agreement) return this.$u.toast('请勾选协议');
						console.log('验证通过');
					} else {
						console.log('验证失败');
					}
				});
			},
		},
		onBackPress(e) {
			console.log("监听返回按钮事件", e);
			//正常返回页面
			uni.switchTab({
				url: "/pages/record/record",
				success: (res) => {
					console.log(res)
				},
				fail: (res) => {
					console.log(res)
				}
			})
			// 此处一定要return为true，否则页面不会返回到指定路径
			return true;
		},
	}
</script>

<style>
	.acontent {
		width: 90%;
		margin-left: 5%;
	}

	.uni-label {
		line-height: 40px;
		font-size: 30pt;
		color: #da8000;
	}

	.uni-input {
		height: 30px;
		line-height: 30px;
		font-size: 15px;
		padding: 0px;
		background-color: #FFFFFF;
		border: 0.5rpx solid #da8000;
	}

	.uni-textarea {
		width: 100%;
		border: 0.5rpx solid #da8000;
	}

	.ql-container {
		border: 1rpx solid #da8000;
	}
</style>
