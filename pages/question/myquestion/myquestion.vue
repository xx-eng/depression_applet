<template>
	<view>
		<u-navbar title-color="#fff" back-icon-color="#ffffff" :is-fixed="true" :is-back="true" :background="background"
		 :back-text-style="{color: '#fff'}" :title="title" :back-icon-name="backIconName" :back-text="backText">
		</u-navbar>
		<view class="wrap">
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition">
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<view class="order" v-for="(res, index) in dataList" :key="res.id">
								<view class="item" :key="index">
									<!--v-for="(item, index) in res.goodsList"-->
									<!-- <view class="left">
										<image :src="res.goodsUrl" mode="aspectFill"></image>
									</view> -->
									<view class="content">
										<view class="title u-line-2">{{ res.title }}</view>
										<view class="delivery-time">{{ res.content }}</view>
									</view>
								</view>
								<view class="bottom">
									<view class="logistics btn" @click="gotoUpdate(res.id)">更改</view>
									<!-- <view class="exchange btn">卖了换钱</view>
									<view class="evaluate btn"><u-icon name="thumb-up"></u-icon>5</view> -->
									<view class="more" @click="deleteQuesion(res.id)">
										<u-icon name="trash" color="rgb(203,203,203)" size="50"></u-icon>
									</view>
								</view>
							</view>
							<u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>

		<!-- <view class="add">
			<u-icon name="plus-circle-fill" color="#dba58b" size="100"></u-icon><br><br>
			<u-icon name="heart-fill" color="#dba58b" size="100"></u-icon>
		</view> -->
		<!-- <u-tabbar v-model="current" :show="show" :bg-color="bgColor" :border-top="borderTop" :list="list" :inactive-color="inactiveColor"
		 :activeColor="activeColor" @change="gotoOther">
		</u-tabbar> -->
	</view>
</template>

<script>
	import user from "@/storev/module/user.js";
	import { getMyQuestions,deleteQuesion } from '../../../api/question.js'
	export default {
		data() {
			return {
				title: '我的问题',
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


				dataList: [{
						id: 1,
						goodsUrl: '//img13.360buyimg.com/n7/jfs/t1/103005/7/17719/314825/5e8c19faEb7eed50d/5b81ae4b2f7f3bb7.jpg',
						title: '【冬日限定】现货 原创jk制服女2020冬装新款小清新宽松软糯毛衣外套女开衫短款百搭日系甜美风',
						type: '灰色;M',
						deliveryTime: '付款后30天内发货',
						price: '348.58',
						number: 2

					},
					{
						id: 2,

						goodsUrl: '//img14.360buyimg.com/n7/jfs/t1/60319/15/6105/406802/5d43f68aE9f00db8c/0affb7ac46c345e2.jpg',
						title: '【冬日限定】现货 原创jk制服女2020冬装新款小清新宽松软糯毛衣外套女开衫短款百搭日系甜美风',
						type: '粉色;M',
						deliveryTime: '付款后7天内发货',
						price: '128.05',
						number: 1

					},
					{
						id: 3,

						goodsUrl: '//img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg',
						title: '三星（SAMSUNG）京品家电 UA65RUF70AJXXZ 65英寸4K超高清 HDR 京东微联 智能语音 教育资源液晶电视机',
						type: '4K，广色域',
						deliveryTime: '保质5年',
						price: '1998',
						number: 3

					},
					{
						id: 4,

						goodsUrl: '//img10.360buyimg.com/n7/jfs/t22300/31/1505958241/171936/9e201a89/5b2b12ffNe6dbb594.jpg!q90.jpg',
						title: '法国进口红酒 拉菲（LAFITE）传奇波尔多干红葡萄酒750ml*6整箱装',
						type: '4K，广色域',
						deliveryTime: '珍藏10年好酒',
						price: '1543',
						number: 3

					},
					{
						id: 5,

						goodsUrl: '//img12.360buyimg.com/n7/jfs/t1/52408/35/3554/78293/5d12e9cfEfd118ba1/ba5995e62cbd747f.jpg!q90.jpg',
						title: '企业微信 中控人脸指纹识别考勤机刷脸机 无线签到异地多店打卡机WX108',
						type: '识别效率高',
						deliveryTime: '使用方便',
						price: '451',
						number: 9

					}
				],
				swiperCurrent: 0,
				tabsHeight: 0,
				dx: 0,
				loadStatus: ['loadmore', 'loadmore', 'loadmore', 'loadmore'],
			};
		},
		onLoad() {
			this.getMyQuestion()
		},
		methods: {
			getMyQuestion() {
				// user.state.userId
				console.log("user:", user.state.userId)
				getMyQuestions(user.state.userId).then( res => {
					this.dataList = res.data
					console.log(res)
				})
			},
			deleteQuesion(id) {
				deleteQuesion(id).then( res => {
					console.log(res)
					this.getMyQuestion()
				})
			},
			gotoUpdate(id){
				uni.navigateTo({
					url:'../updateQuestion/updateQuestion?id='+ id,
					success: (res) => {
						console.log(res)
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
			reachBottom() {
				// 此tab为空数据
				this.loadStatus.splice(this.current, 1, "loading")
				// setTimeout(() => {
				// 	this.getOrderList(this.current);
				// }, 1200);

			},
			// tab栏切换
			change(index) {
				this.swiperCurrent = index;
				this.getOrderList(index);
			},
			transition({
				detail: {
					dx
				}
			}) {
				this.$refs.tabs.setDx(dx);
			},
			animationfinish({
				detail: {
					current
				}
			}) {
				this.$refs.tabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			}
		},
		onBackPress(e) {
			console.log("监听返回按钮事件", e);
			//正常返回页面
			uni.switchTab({
				url: "/pages/question/question",
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
	};
</script>

<style>
	/* #ifndef H5 */
	page {
		height: 100%;
		background-color: #f2f2f2;
	}

	/* #endif */
</style>

<style lang="scss" scoped>
	.order {
		width: 710rpx;
		background-color: #ffffff;
		margin: 20rpx auto;
		border-radius: 20rpx;
		box-sizing: border-box;
		padding: 20rpx;
		font-size: 28rpx;

		.top {
			display: flex;
			justify-content: space-between;

			.left {
				display: flex;
				align-items: center;

				.store {
					margin: 0 10rpx;
					font-size: 32rpx;
					font-weight: bold;
				}
			}

			.right {
				color: $u-type-warning-dark;
			}
		}

		.item {
			display: flex;
			margin: 20rpx 0 0;

			.left {
				margin-right: 20rpx;

				image {
					width: 200rpx;
					height: 200rpx;
					border-radius: 10rpx;
				}
			}

			.content {
				.title {
					font-size: 28rpx;
					line-height: 50rpx;
				}

				.type {
					margin: 10rpx 0;
					font-size: 24rpx;
					color: $u-tips-color;
				}

				.delivery-time {
					margin: 30rpx 0;
					color: $uni-text-color-grey;
					font-size: 24rpx;
				}
			}

			.right {
				margin-left: 10rpx;
				padding-top: 20rpx;
				text-align: right;

				.decimal {
					font-size: 24rpx;
					margin-top: 4rpx;
				}

				.number {
					color: $u-tips-color;
					font-size: 24rpx;
				}
			}
		}

		.total {
			margin-top: 20rpx;
			text-align: right;
			font-size: 24rpx;

			.total-price {
				font-size: 32rpx;
			}
		}

		.bottom {
			display: flex;
			margin-top: 40rpx;
			padding: 0 10rpx;
			justify-content: space-between;
			align-items: center;

			.btn {
				line-height: 52rpx;
				width: 160rpx;
				border-radius: 26rpx;
				border: 2rpx solid $u-border-color;
				font-size: 26rpx;
				text-align: center;
				color: $u-type-info-dark;
			}

			.evaluate {
				color: #e3b093; //$u-type-warning-dark
				border-color: #e3b093;
			}
		}
	}

	.centre {
		text-align: center;
		margin: 200rpx auto;
		font-size: 32rpx;

		image {
			width: 164rpx;
			height: 164rpx;
			border-radius: 50%;
			margin-bottom: 20rpx;
		}

		.tips {
			font-size: 24rpx;
			color: #999999;
			margin-top: 20rpx;
		}

		.btn {
			margin: 80rpx auto;
			width: 200rpx;
			border-radius: 32rpx;
			line-height: 64rpx;
			color: #ffffff;
			font-size: 26rpx;
			background: linear-gradient(270deg, rgba(249, 116, 90, 1) 0%, rgba(255, 158, 1, 1) 100%);
		}
	}

	.wrap {
		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--window-top));
		width: 100%;
	}

	.swiper-box {
		flex: 1;
	}

	.swiper-item {
		height: 100%;
	}
	.add{
		position: absolute;
		top: 70%;
		right: 5%;
		z-index: 1000;
	}
</style>
