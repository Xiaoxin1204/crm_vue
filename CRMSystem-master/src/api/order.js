import request from '@/utils/request';

export default {
    getOrderListById(customerId) {
        const req = request({
            method: 'get',
            url: `/order/findAllOrderById?customerId=${customerId}`
        })
        return req
    },

    getOrderDetailById(orderId) {
        const req = request({
            method: 'get',
            url: `/order/findOrderDetail?orderId=${orderId}`
        })
        return req
    }
}