<template>
	<view class="content">
		<u-navbar title-color="#fff" back-icon-color="#ffffff" :is-fixed="true" :is-back="true" :background="background"
		 :back-text-style="{color: '#fff'}" :title="add_title" :back-icon-name="backIconName" :back-text="backText">
		</u-navbar>

		<view class="u-demo">
			<view class="u-demo-wrap" style="background-color: #FFFFFF;">
				<view class="u-demo-area">
					<u-calendar v-model="showCalendar" ref="calendar" @change="change" :mode="mode" :start-text="startText" :end-text="endText"
					 :range-color="rangeColor" :range-bg-color="rangeBgColor" :active-bg-color="activeBgColor" :btn-type="btnType">
					</u-calendar>
					<view class="u-demo-result-line">
						{{result}}
					</view>
				</view>
			</view>
			<view class="u-config-wrap">
				<view class="u-config-item">
					<!-- <u-subsection :current="showBtnStatus" :list="['选择日期', '隐藏']" @change="showChange"></u-subsection> -->
					<u-button style="color: #f0ad4e;" @click="showCalendar = true">选择日期</u-button>
				</view>
			</view>
		</view>


		<!-- {{model.contentHtml}} -->
		<view class="acontent">
			
			<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
				<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" label-width="120" :label-position="labelPosition"
				 label="睡眠" prop="sleep">
					<u-input disabled  v-model="model.sleepS" type="text"></u-input>
				</u-form-item>
				<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" label-width="120" :label-position="labelPosition"
				 label="抑郁天数" prop="title">
					<u-input disabled  v-model="model.days" type="text"></u-input>
				</u-form-item>
				<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" label-width="120" :label-position="labelPosition"
				 label="心情状况" prop="title">
					<u-input disabled  v-model="model.emotionS" type="text"></u-input>
				</u-form-item>
				<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" label-width="120" :label-position="labelPosition"
				 label="药物天数" prop="title">
					<u-input disabled  v-model="model.medicine_days" type="text"></u-input>
				</u-form-item>
				<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" label-width="120" :label-position="labelPosition"
				 label="药物状况" prop="title">
					<u-input disabled  v-model="model.statusS" type="text"></u-input>
				</u-form-item>
			</u-form>
			<!-- <u-button @click="submit" style="background-color: #da8000;color: #fff;">提交</u-button> -->
		</view>



		<!-- <u-tabbar v-model="current" :show="show" :bg-color="bgColor" :border-top="borderTop" :list="list" :inactive-color="inactiveColor"
		 :activeColor="activeColor" @change="gotoOther">
		</u-tabbar> -->
	</view>
</template>

<script>
	import {getRecord} from '../../../api/record.js'
	import user from "@/storev/module/user.js";
	export default {
		data() {
			return {
				add_title: '查看记录',
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
				typeWord: '请选择类型',
				list: [{
						value: '0',
						label: '文章'
					},
					{
						value: '1',
						label: '图片'
					}
				],
				
				labelPosition: 'left',
				codeTips: '',
				errorType: ['message'],

				requestParameters: {},
				model: {
					userId: '',
					sleep: "",
					sleepS: "",
					days: '',
					emotion: "",
					emotionS: "",
					medicine_days: "",
					status: "",
					statusS: '',
					theDate: ''
				},
				rules: {
					title: [{
						required: true,
						message: '请输入姓名',
						trigger: 'blur',
					}, ],
				},


				showCalendar: false,
				mode: 'date',
				result: "日期",
				startText: '开始',
				endText: '结束',
				rangeColor: '#dba58b',
				rangeBgColor: 'rgba(41,121,255,0.13)',
				activeBgColor: '#dba58b',
				btnType: 'warning',
			}
		},
		onLoad() {

		},
		methods: {
			confirm(e) {
				console.log('e', e[0].value);
				this.model.type = e[0].value
				this.typeWord = e[0].label

			},
			confirmCalender(e) {
				console.log(e);
			},
			onEditorReady() {
				// #ifdef MP-BAIDU
				this.editorCtx = requireDynamicLib('editorLib').createEditorContext('editorId');
				// #endif

				// #ifdef APP-PLUS || H5 ||MP-WEIXIN
				uni.createSelectorQuery().select('#editor').context((res) => {
					this.editorCtx = res.context
				}).exec()
				// #endif
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
						this.requestParameters = Object.assign({}, this.model)
						console.log('requestParam', this.requestParameters)
						addUserGoods(this.requestParameters).then(res => {
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

			change(e) {
				this.result = e.result;
				getRecord(this.result, user.state.userId).then(res => {
					this.model = res.data
					console.log("get", this.model)
					if(this.model.sleep == 0){
						this.model.sleepS = "正常"
					}else{
						this.model.sleepS = "失眠"
					}
					if(this.model.emotion == 0){
						this.model.emotionS = "平静"
					}else if(this.model.emotion == 1){
						this.model.emotionS = "开心"
					}else if(this.model.emotion == 2){
						this.model.emotionS = "低落"
					}else{
						this.model.emotionS = "愤怒"
					}
					if(this.model.status == 0){
						this.model.statusS = "无感"
					}else if(this.model.status == 1){
						this.model.statusS = "起效"
					}else{
						this.model.statusS = "不起效"
					}
				})
			}
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


	.u-demo-result-line {
		text-align: center;
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		color: #dba58b;
	}
</style>
