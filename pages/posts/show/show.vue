<template>
	<view class="login-container">
		<u-navbar title-color="#fff" back-icon-color="#ffffff" :is-fixed="true" :is-back="true" :background="background"
		 :back-text-style="{color: '#fff'}" :title="title" :back-icon-name="backIconName" :back-text="backText">
		</u-navbar>
		<view class="photo">
			<image src="../../../static/back1.jpg"  mode="widthFix"></image>
		</view>
		
		<view>
			<p style="font-size: 20pt;">这个世界虽然不完美，但总有人守护着你。</p><br>
			
			<p>如果需要帮助，请拨打全国24小时免费心理咨询热线</p><br>
			
			<p>全国免费心理危机咨询热线：<br>010-82951332</p>
		</view>
		



		<!--<a-row class="foot">
      <a-row type="flex" justify="space-around" class="help">
        <a class="item" href="#" target="_blank">帮助</a>
        <a class="item" href="#" target="_blank">隐私</a>
        <a class="item" href="#" target="_blank">条款</a>
      </a-row>
      <a-row type="flex" justify="center">
        Copyright © 2020 - Present
        <a href="javascript:void(0);" target="_blank" style="margin:0 5px;">XXXXXXX</a>
        版权所有
      </a-row>
    </a-row>-->
	</view>
</template>

<script>
	export default {
		name: 'Login',
		data() {
			return {
				title: '你不孤单',
				backIconName: 'nav-back',
				backText: '返回',
				background: {
					'background-image': 'linear-gradient(45deg, rgb(219, 165, 139), rgb(244,223, 206))'
				},
				redirect: undefined,
				loading: false,
				form: {
					account: '',
					password: '',
					keepLogin: true
				},
				rules: {
					account: [{
						required: true,
						trigger: 'blur',
						message: '请输入用户名'
					}],
					password: [{
						required: true,
						trigger: 'blur',
						message: '请输入密码'
					}]
				}
			}
		},
		watch: {
			$route: {
				handler: function(route) {
					this.redirect = route.query && route.query.redirect
				},
				immediate: true
			}
		},
		methods: {
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
			gotoRegister(){
				uni.navigateTo({
					url: '../Register/Register',
					success: (res) => {
						console.log(res)
					},
					fail: (res) => {
						console.log(res)
					}
				})
			},
			handleLogin() {
				this.$refs.form.validate(valid => {
					if (valid) {
						this.loading = true
						this.$store.dispatch('Login', this.form).then(() => {
							// this.$router.push({ path: this.redirect || '/' })
							uni.switchTab({
								url: '../index/index',
								success: (res) => {
									console.log(res)
								},
								fail: (err) => {
									console.log(err)
								}
							})
						}).finally(() => {
							this.loading = false
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss"  scoped>
	.photo {
		display: flex;
		align-items: center;
		justify-content: center;
		image {
			width: 100%;
		}
	}
	
	// /deep/
	.u-btn.u-primary-hover::after {
		background-color: #4371af;
		border: 0;
		z-index: -1;
		color: #fff;
	}
	
	.alternative {
		position: absolute;
		margin-top: 410rpx;
		right: 50px;
		color: #4371af;
	}
</style>
