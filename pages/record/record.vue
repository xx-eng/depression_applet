<template>
	<view>
		<u-navbar title-color="#fff" back-icon-color="#ffffff" :is-fixed="true" :is-back="true" :background="background"
		 :back-text-style="{color: '#fff'}" :title="title" :back-icon-name="backIconName" :back-text="backText">
		</u-navbar>
		<view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30">
			<view class="u-m-r-10">
				<u-avatar :src="user.url" size="140"></u-avatar>
			</view>
			<view class="u-flex-1">
				<view class="u-font-18 u-p-b-20">{{user.account}}</view>
				<!-- <view class="u-font-14 u-tips-color">微信号:helang_uView</view> -->
			</view>
			<!-- <view class="u-m-l-10 u-p-10">
				<u-icon name="scan" color="#969799" size="28"></u-icon>
			</view> -->
			<!-- <view class="u-m-l-10 u-p-10">
				<u-icon name="arrow-right" color="#969799" size="28"></u-icon>
			</view> -->
		</view>
		
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="lock" title="修改密码"  @click="gotoPassword()"></u-cell-item>
			</u-cell-group>
		</view>
		
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="edit-pen" title="记录状况" @click="gotoEdit()"></u-cell-item>
			</u-cell-group>
		</view>
		
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="star" title="每天状况" @click = "gotoGet()"></u-cell-item>
				<!-- <u-cell-item icon="photo" title="抑郁天数"></u-cell-item>
				<u-cell-item icon="coupon" title="心情状况"></u-cell-item>
				<u-cell-item icon="heart" title="药物使用状况"></u-cell-item> -->
			</u-cell-group>
		</view>
		
		<!-- <view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="setting" title="设置"></u-cell-item>
			</u-cell-group>
		</view> -->
		<u-tabbar v-model="current" :show="show" :bg-color="bgColor" :border-top="borderTop" :list="list" :inactive-color="inactiveColor"
		 :activeColor="activeColor" @change="gotoOther">
		</u-tabbar>
	</view>
</template>

<script>
	import {getUser} from '../../api/record.js'
	const imageUrl = 'http://47.110.248.137:8080/'
	import user from "@/storev/module/user.js";
	export default {
		data() {
			return {
				title: '我一直在',
				backIconName: 'arrow-left',
				backText: '',
				background: {
					'background-image': 'linear-gradient(45deg, rgb(219, 165, 139), rgb(244,223, 206))'
				},
				
				current: 0,
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
						pagePath: '/pages/question/question',
					},
					{
						iconPath: "heart",
						selectedIconPath: "heart-fill",
						text: '动态',
						customIcon: false,
						pagePath: '/pages/posts/posts',
					},
					{
						iconPath: "edit-pen",
						selectedIconPath: "edit-pen-fill",
						text: '记录',
						customIcon: false,
						pagePath: '/pages/record/record',
					}
				],
				
				pic:'https://uviewui.com/common/logo.png',
				show:true,
				requestParameters: {},
				user: {},
			}
		},
		onLoad() {
			if(user.state.userId === ''||user.state.userId === undefined){
				console.log('user', user.state.userId)
				this.gotoLogin()
			}
			this.getUserInfo()
		},
		methods: {
			gotoOther() {  //去往其他页面
				console.log('index', this.current)
			},
			getUserInfo() { //获取所有文章
				console.log('user')
				//这里替换！！！
				getUser(user.state.userId).then(res => {
					this.user = res.data
					this.user.url = imageUrl + this.user.url
					console.log(this.user)
				})
			},
			gotoPassword(){
				uni.navigateTo({
					url: 'password/password',
					success: (res) => {
						console.log(res)
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
			gotoGet(){
				uni.navigateTo({
					url: 'get/get',
					success: (res) => {
						console.log(res)
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
			gotoEdit(){
				uni.navigateTo({
					url: 'edit/edit',
					success: (res) => {
						console.log(res)
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
			gotoLogin(){
				uni.navigateTo({
					url: '../Login/Login',
					success: (res) => {
						console.log(res)
					},
					fail: (res) => {
						console.log(res)
					}
				})
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

<style lang="scss">
page{
	background-color: #ededed;
}

.camera{
	width: 54px;
	height: 44px;
	
	&:active{
		background-color: #ededed;
	}
}
.user-box{
	background-color: #fff;
}
</style>
