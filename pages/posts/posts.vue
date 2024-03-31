<template>
	<view>
		<u-navbar title-color="#fff" back-icon-color="#ffffff" :is-fixed="true" :is-back="true" :background="background"
		 :back-text-style="{color: '#fff'}" :title="title" :back-icon-name="backIconName" :back-text="backText">
		</u-navbar>
		<view class="comment" v-for="(res, index) in commentList" :key="res.id">
			<view class="left">
				<image :src="res.url" mode="aspectFill"></image>
			</view>
			<view class="right">
				<view class="top">
					<view class="name">{{ res.account }}</view>
					<view class="like" :class="{ highlight: res.isLike }" @click="likePosts(res.id)">
						<view class="num">{{ res.likes }}</view>
						<u-icon name="thumb-up" :size="30" color="#9a9a9a" @click="likePosts(res.id)"></u-icon>
						<!-- <u-icon v-if="true" name="thumb-up-fill" :size="30" @click="getLike(index)"></u-icon> -->
					</view>
				</view>
				<view class="content">{{ res.content }}</view>
				<view class="reply-box">
					<view class="item" v-for="(item, index) in res.replyList" :key="item.index">
						<view class="username">{{ item.account }}</view>
						<view class="text">{{ item.content }}</view>
					</view>
					<view class="all-reply" @tap="toAllReply" v-if="res.replyList != undefined">
						共{{ res.comments }}条回复
						<u-icon class="more" name="arrow-right" :size="26"></u-icon>
					</view>
				</view>
				<view class="bottom" @click="gotoReply(res)">
					{{ res.date }}
					<view class="reply">回复</view>
				</view>
			</view>
		</view>
		<view class="add" @click="gotoAdd()">
			<u-icon name="plus-circle-fill" color="#dba58b" size="100"></u-icon><br><br>
		</view>
		<u-tabbar v-model="current" :show="show" :bg-color="bgColor" :border-top="borderTop" :list="list" :inactive-color="inactiveColor"
		 :activeColor="activeColor" @change="gotoOther">
		</u-tabbar>
	</view>
</template>

<script>
	import {
		getAllPosts,
		getPostComments,
		likes
	} from '../../api/posts.js'
	const imageUrl = 'http://47.110.248.137:8080/'
	import user from "@/storev/module/user.js";
	export default {
		data() {
			return {
				title: '动态',
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

				commentList: [{
						id: 1,
						userId: 1,
						account: '叶轻眉',
						// date: '12-25 18:58',
						content: '我不信伊朗会没有后续反应，美国肯定会为今天的事情付出代价的',
						url: 'https://cdn.uviewui.com/uview/template/SmilingDog.jpg',
						comments: 1,
						likes: 33,
						status: 1,
						statusWord: '正常',
						replyList: [{
							account: 'uview',
							content: 'uview是基于uniapp的一个UI框架，代码优美简洁，宇宙超级无敌彩虹旋转好用，用它！'
						}]
					},
					{
						id: 2,
						userId: 2,
						account: '叶轻眉',
						// date: '12-25 18:58',
						content: '我不信伊朗会没有后续反应，美国肯定会为今天的事情付出代价的',
						allReply: 0,
						likeNum: 11,
						isLike: false,
						url: 'https://cdn.uviewui.com/uview/template/niannian.jpg',
						comments: 12,
						likes: 33,
						status: 1,
						statusWord: '正常',
						replyList: []
					},
					{
						id: 3,
						userId: 3,
						account: '叶轻眉',
						// date: '12-25 18:58',
						content: '我不信伊朗会没有后续反应，美国肯定会为今天的事情付出代价的',
						url: 'https://cdn.uviewui.com/uview/template/SmilingDog.jpg',
						comments: 12,
						likes: 33,
						status: 1,
						statusWord: '正常',
						replyList: [{
							account: 'uview',
							content: 'uview是基于uniapp的一个UI框架，代码优美简洁，宇宙超级无敌彩虹旋转好用，用它！'
						}]
					},
					{
						id: 4,
						userId: 4,
						account: '叶轻眉',
						// date: '12-25 18:58',
						content: '我不信伊朗会没有后续反应，美国肯定会为今天的事情付出代价的',
						url: 'https://cdn.uviewui.com/uview/template/SmilingDog.jpg',
						comments: 12,
						likes: 33,
						status: 1,
						statusWord: '正常',
						replyList: []
					},
					{
						id: 5,
						userId: 5,
						account: '叶轻眉',
						// date: '12-25 18:58',
						content: '我不信伊朗会没有后续反应，美国肯定会为今天的事情付出代价的',
						url: 'https://cdn.uviewui.com/uview/template/SmilingDog.jpg',
						comments: 12,
						likes: 33,
						status: 1,
						statusWord: '正常',
						replyList: [{
								account: 'uview',
								content: 'uview是基于uniapp的一个UI框架，代码优美简洁，宇宙超级无敌彩虹旋转好用，用它！'
							},
							{
								account: '粘粘',
								content: '今天吃什么，明天吃什么，晚上吃什么，我只是一只小猫咪为什么要烦恼这么多'
							}
						]
					},
				]
			};
		},
		onLoad() {
			if(user.state.userId === '' || user.state.userId === undefined){
				console.log('user', user.state.userId)
				this.gotoLogin()
			}
			this.getComment();
		},
		methods: {
			// 跳转到全部回复
			toAllReply() {
				uni.navigateTo({
					url: '/pages/template/comment/reply'
				});
			},
			// 点赞
			getLike(index) {
				this.commentList[index].isLike = !this.commentList[index].isLike;
				if (this.commentList[index].isLike == true) {
					this.commentList[index].likeNum++;
				} else {
					this.commentList[index].likeNum--;
				}
			},
			likePosts(id) {  //点赞
				console.log('likes')
				likes(id).then(res => {
					console.log(res)
					this.getComment()
				})
			},
			// 评论列表
			getComment() {
				getAllPosts().then(res => {
					this.commentList = res.data
					for (let aComment of this.commentList) {
						aComment.url = imageUrl + aComment.url
					}
					console.log("commentList", this.commentList)
				})
			},
			gotoReply(posts){
				console.log("post", posts)
				uni.navigateTo({
					url: 'reply/reply?postsId=' + posts.id + '&userId=' + posts.user_id,
					success: (res) => {
						console.log(res)
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
			gotoAdd(){
				uni.navigateTo({
					url: 'add/add',
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
		onBackPress(e){
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
		}
	};
</script>

<style lang="scss" scoped>
	.comment {
		display: flex;
		padding: 30rpx;

		.left {
			image {
				width: 64rpx;
				height: 64rpx;
				border-radius: 50%;
				background-color: #f2f2f2;
			}
		}

		.right {
			flex: 1;
			padding-left: 20rpx;
			font-size: 30rpx;

			.top {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 10rpx;

				.name {
					color: #5677fc;
				}

				.like {
					display: flex;
					align-items: center;
					color: #9a9a9a;
					font-size: 26rpx;

					.num {
						margin-right: 4rpx;
						color: #9a9a9a;
					}
				}

				.highlight {
					color: #5677fc;

					.num {
						color: #5677fc;
					}
				}
			}

			.content {
				margin-bottom: 10rpx;
			}

			.reply-box {
				background-color: rgb(242, 242, 242);
				border-radius: 12rpx;

				.item {
					padding: 20rpx;
					border-bottom: solid 2rpx $u-border-color;

					.username {
						font-size: 24rpx;
						color: #999999;
					}
				}

				.all-reply {
					padding: 20rpx;
					display: flex;
					color: #5677fc;
					align-items: center;

					.more {
						margin-left: 6rpx;
					}
				}
			}

			.bottom {
				margin-top: 20rpx;
				display: flex;
				font-size: 24rpx;
				color: #9a9a9a;

				.reply {
					color: #5677fc;
					margin-left: 10rpx;
				}
			}
		}

	}

	.add {
		position: absolute;
		top: 70%;
		right: 5%;
		z-index: 1000;
	}
</style>
