import request from '@/utils/request';

export default {
    getCommListById(custoemrId) {
        const req = request({
            method: 'get',
            url: `/dev-api/comm/findAllById?custoemrId=${custoemrId}`
        })
        return req
    },

    getOrderDetailById(commId) {
        const req = request({
            method: 'get',
            url: `/dev-api/comm/findCommById?commId=${commId}`
        })
        return req
    },

    addComm(comm) {
        const req = request({
            method: 'post',
            url: `/dev-api/comm/addComm`,
            data: comm
        })
        return req
    },

    deleteComm(commId) {
        const req = request({
            method: 'delete',
            url: `/dev-api/comm/addComm?commId=${commId}`
        })
        return req
    },
}