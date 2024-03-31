<template>
	<view class="content">
		<u-navbar title-color="#fff" back-icon-color="#ffffff" :is-fixed="true" :is-back="true" :background="background"
		 :back-text-style="{color: '#fff'}" :title="add_title" :back-icon-name="backIconName" :back-text="backText">
		</u-navbar>

	<!-- {{model.contentHtml}} -->
		<view class="acontent">
			<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
				<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" label-width="120" :label-position="labelPosition"
				 label="标题" prop="title">
					<u-input  placeholder="请输入标题" v-model="model.title" type="text"></u-input>
				</u-form-item>
				<u-form-item :label-position="labelPosition" label="类型" prop="abstract">
					<u-select v-model="show" :list="list" @confirm="confirm"></u-select>
					<u-button @click="show = true" style="margin: 5% 5%;width: 90%;color:#da8000;">{{typeWord}}</u-button>
				</u-form-item>
				<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" label-width="120" :label-position="labelPosition"
				 label="内容" prop="title">
					<editor id="editor" class="ql-container" placeholder="请输入文章内容或图片简介" @ready="onEditorReady" @input="addModel" v-model="model.contentHtml"></editor>
				</u-form-item>
				<u-form-item :label-position="labelPosition" label="上传图片" prop="photo" label-width="150">
					<!-- <u-upload :beforeUpload="beforeUpload" width="160" height="160" action="http://121.40.235.133:8080/file/upload"></u-upload> -->

					<u-upload max-count="1" ref="uUpload" action="http://47.110.248.137:8080/file/upload" :auto-upload="true"></u-upload>
					<u-button @click="submitPhoto">提交图片<text style="font-size:5pt;">(提交前点击)</text></u-button>



				</u-form-item>
			</u-form>
			<!-- <view class="agreement">
			<u-checkbox v-model="check" @change="checkboxChange"></u-checkbox>
			<view class="agreement-text">
				勾选代表同意uView的版权协议
			</view>
		</view> -->
			<u-button @click="submit" style="background-color: #da8000;color: #fff;">提交</u-button>
		</view>



		<!-- <u-tabbar v-model="current" :show="show" :bg-color="bgColor" :border-top="borderTop" :list="list" :inactive-color="inactiveColor"
		 :activeColor="activeColor" @change="gotoOther">
		</u-tabbar> -->
	</view>
</template>

<script>
	import user from "@/storev/module/user.js";
	import {addArticle} from '../../../api/article.js'
	export default {
		data() {
			return {
				add_title: '添加文章',
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
					type: '',
					title: '',
					contentHtml: '',
					content: '',
					fileId: '',
					url: ''
				},
				rules: {
					title: [{
						required: true,
						message: '请输入姓名',
						trigger: 'blur',
					}, ],
				},
				userId: ''
			}
		},
		onLoad() {
			console.log("user", user.state.userId)
			this.userId = user.state.userId
		},
		methods: {
			confirm(e) {
				console.log('e', e[0].value);
				this.model.type = e[0].value
				this.typeWord = e[0].label

			},
			onEditorReady() {
				console.log("editorReady")
				// #ifdef MP-BAIDU
				this.editorCtx = requireDynamicLib('editorLib').createEditorContext('editorId');
				// #endif

				// #ifdef APP-PLUS || H5 ||MP-WEIXIN
				uni.createSelectorQuery().select('#editor').context((res) => {
					this.editorCtx = res.context
				}).exec()
				// #endif
			},
			addModel(e){
				this.model.contentHtml = e.detail.html
				this.model.content = e.detail.html
				console.log("this.model.contentHtml", this.model.contentHtml)
			},
			submitPhoto() {
				let files = [];
				// 通过filter，筛选出上传进度为100的文件(因为某些上传失败的文件，进度值不为100，这个是可选的操作)
				files = this.$refs.uUpload.lists.filter(val => {
					console.log("val:", val)
					this.model.url = val.response.data.url
					this.model.fileId = val.response.data.id
					console.log(':filename', this.model.url, this.model.fieId)
					return val.progress == 100;

				})
				// 如果您不需要进行太多的处理，直接如下即可
				// files = this.$refs.uUpload.lists;
				console.log(this.$refs.uUpload.lists)
			},
			submit() {
				console.log('提交')
				console.log('userID', this.userId)
				this.$refs.uForm.validate(valid => {
					console.log(valid)
					if (valid) {
						console.log(this.model)
						console.log(this.userId)
						const user = {
							userId: this.userId
						}
						// this.model.content = this.model.contentHtml.detail.html
						console.log("content",this.model.content)
						this.requestParameters = Object.assign({}, this.model, user)
						console.log('requestParam', this.requestParameters)
						addArticle(this.requestParameters).then(res => {
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
				url: "/pages/index/index",
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
