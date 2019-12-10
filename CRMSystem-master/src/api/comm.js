import request from '@/utils/request';

export default {
    getCommListById(custoemrId) {
        const req = request({
            method: 'get',
            url: `/comm/findAllById?custoemrId=${custoemrId}`
        })
        return req
    },

    getOrderDetailById(commId) {
        const req = request({
            method: 'get',
            url: `/comm/findCommById?commId=${commId}`
        })
        return req
    },

    addComm(comm) {
        const req = request({
            method: 'post',
            url: `/comm/addComm`,
            data: comm
        })
        return req
    },

    deleteComm(commId) {
        const req = request({
            method: 'delete',
            url: `/comm/addComm?commId=${commId}`
        })
        return req
    },
}