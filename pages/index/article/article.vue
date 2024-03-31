<template>
	<view class="content">
		<u-navbar title-color="#fff" back-icon-color="#ffffff" :is-fixed="true" :is-back="true" :background="background"
		 :back-text-style="{color: '#fff'}" :title="title" :back-icon-name="backIconName" :back-text="backText">
		</u-navbar>

		<view style="text-align: center; width: 90%; margin-left:5%;">
			 <h2>{{article.title}}</h2>
		</view>
		<!-- <view style="text-align: center;">
			<image :src="article.url"></image>
		</view> -->
		<view style="text-align: center; width: 90%; margin-left:5%;">
			<rich-text :nodes="article.content"></rich-text>
		</view>
		<view style="text-align: center; width: 90%; margin-left:5%;">
			<img style="width: 100%;" :src="article.url"/>
		</view>

		<!-- <u-tabbar v-model="current" :show="show" :bg-color="bgColor" :border-top="borderTop" :list="list" :inactive-color="inactiveColor"
		 :activeColor="activeColor" @change="gotoOther">
		</u-tabbar> -->
	</view>
</template>

<script>
	import {getArticle} from '../../../api/article.js'
	const imageUrl = 'http://47.110.248.137:8080/'
	export default {
		data() {
			return {
				title: '我一直在',
				backIconName: 'arrow-left',
				backText: '',
				background: {
					'background-image': 'linear-gradient(45deg, rgb(219, 165, 139), rgb(244,223, 206))'
				},
				id: '',
				article: {
					id: '',
					type: '',
					title: '抑郁症',
					content: '<p>\t抑郁症的诊断是……\n无法</p>',
					fileId: '',
					url: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/d8590190-4f28-11eb-b680-7980c8a877b8.png'
				}
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
				],

				placeholder: '开始输入...'*/
			}
		},
		onLoad(option) {
			this.id = option.id
			console.log(this.id)
			this.getArticle(this.id)
		
		},
		methods: {
			getArticle(id){
				getArticle(id).then(res => {
					console.log(res)
					this.article = res.data
					this.article.url = imageUrl + this.article.url
				})
			}
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
</style>
