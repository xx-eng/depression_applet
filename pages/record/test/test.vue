<template>
	<view class="u-demo">
		<view class="u-demo-wrap" style="background-color: #FFFFFF;">
			<view class="u-demo-area">
				<u-calendar v-model="showCalendar" ref="calendar" @change="change" :mode="mode"
					:start-text="startText" :end-text="endText" :range-color="rangeColor"
					:range-bg-color="rangeBgColor" :active-bg-color="activeBgColor" :btn-type="btnType"
				>
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
</template>

<script>
	export default {
		data() {
			return {
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
		computed: {
	
		},
		methods: {
			change(e) {
				
					this.result = e.result;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-demo {
		.u-demo-result-line{
			text-align: center;
			width:100%;
			height: 100rpx;
			line-height: 100rpx;
			color: #dba58b;
		}
	}
</style>
