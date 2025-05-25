/**
 * Created by XiaoChengji on 18/12/28.
 */

export const isTruestatus = [
  {
    key: '是',
    value: true
  },
  {
    key: '否',
    value: false
  }
]

// 物业账单状态
export const propertyBillStatus = [
  {
    key: '支付失败',
    value: -1
  },
  {
    key: '待支付',
    value: 0
  },
  {
    key: '支付中',
    value: 1
  },
  {
    key: '已支付',
    value: 2
  },
  {
    key: '退款中',
    value: 3
  },
  {
    key: '已退款',
    value: 4
  }
]



// 获取ERP核销状态
export function getErpWriteOffStatus(status) {
  switch (status) {
    case -1:
      return '核销失败'
    case 0:
      return '正常'
    case 1:
      return '核销完成'
    default:
      return '——'
  }
}

// 获取物业账单状态
export function getPropertyBillStatus(status) {
  switch (status) {
    case -1:
      return '支付失败'
    case 0:
      return '待支付'
    case 1:
      return '支付中'
    case 2:
      return '已支付'
    case 3:
      return '退款中'
    case 4:
      return '已退款'
    default:
      return '——'
  }
}

// 问卷状态
export const cusformStatus = [
  {
    value: -1,
    label: '全部'
  },
  {
    value: 0,
    label: '未开始'
  },
  {
    value: 1,
    label: '进行中'
  },
  {
    value: 2,
    label: '已结束'
  }
]


// yjf 2020/04/27
export const rangeTypeList = [
  {
    value: -1,
    label: '全部'
  },
  {
    value: 0,
    label: '公司'
  },
  {
    value: 1,
    label: '区域'
  },
  {
    value: 2,
    label: '项目'
  }
]

export const rangeTypeTwoList = [
  {
    value: 0,
    label: '公司'
  },
  {
    value: 1,
    label: '区域'
  },
  {
    value: 2,
    label: '项目'
  }
]
