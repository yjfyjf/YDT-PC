<!--
 * @Author: your name
 * @Date: 2022-03-11 08:46:57
 * @LastEditTime: 2024-03-04 16:04:37
 * @LastEditors: 东软-游俊丰 13265855311@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /MR-SAAS-BYDWEB/src/components/Header/index.vue
-->
<template>
    <div ref="obtain" class="header_nav">
        <van-nav-bar :fixed="true" z-index="99" class="title" :safe-area-inset-top="true" :title="title" left-arrow>
            <slot slot="left">
                <van-icon @click="goBack" color="#000000" size="20" class="left_img" name="arrow-left" />
            </slot>
            <slot name="header" slot="right"></slot>
        </van-nav-bar>
    </div>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
        }
    },
    created() {
    },
    watch: {
    },
    mounted() {
    　　// 滚动条的获取
        this.$emit('getson', this.$refs.obtain.getBoundingClientRect().top)
    },
    methods: {
        goBack() { // 页面回退
            console.log('页面回退')
            this.$router.go(-1)
        },
    }
}
</script>
<style lang="scss" scoped>
    .header_nav{
        width: 100%;
        /deep/.van-nav-bar{
            padding: 40px 0 0 0;
            .van-nav-bar__title{
                font-weight: 500;
                font-size: 18px;
            }
        }
        .left_img {
            padding: 0 12px 0 0;
        }
        .quit{
            width: 24px;
            height: 24px;
        }
    }
</style>
