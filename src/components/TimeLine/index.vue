<template>
  <div>
    <div v-if="!isVertical" class="container">
      <ul class="time-horizontal">
        <li><b/>成立</li>
        <li><b/>合作</li>
        <li><b/>发展</li>
        <li><b/>共赢</li>
      </ul>
    </div>
    <div v-if="isVertical" class="container">
      <ul class="time-vertical">
        <li v-for="(item, index) in data" :key="index">
          <b :style="{'background': item.color, 'border': '1px solid '+item.color}"/><span/>
        <div class="block">{{ item.name }}：{{ item.value }}</div></li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    isVertical: {
      type: Boolean,
      required: true
    },
    data: { // 数据源
      type: Array,
      required: true
    }
  },
  data() {
    return {
    }
  }
}
</script>
<style scoped>

/*横向时间轴*/
.time-horizontal{list-style-type: none; border-top: 1px solid #D8D8D8; max-width: 800px; padding: 0px; margin: 0px;}
.time-horizontal li{float: left; position: relative; text-align: center; width: 25%; padding-top: 10px;color: #858C96;font-size: 14px;}
.time-horizontal li b:before{content: ''; position: absolute; top: -6px; left: 45%; width: 9px; height: 9px; border: 1px solid #85CCE5; border-radius: 8px; background: #85CCE5;}
/*纵向时间轴*/
.time-vertical{list-style-type: none; border-left: 1px solid #D8D8D8; padding: 0px; height: auto;}
.time-vertical li{height:auto; position: relative; margin:10px auto;}
.time-vertical li a{display: inline-block; margin-left: 20px; margin-top: 15px; text-decoration: none; color: #000;}
.time-vertical li .block{padding: 10px 10px 10px 15px;margin-left:20px;border-radius: 6px;font-size: 14px;background: #F5F5F5;border: 1px solid #E9E9E9;color: #444444; text-align: left; }
.time-vertical li b{content: ''; position: absolute; top: 15px; left: -6px; width: 9px; height: 9px; border-radius: 10px;}
.time-vertical li span{position: absolute; color: #fff; top: 18px; left: -6px;}
</style>

