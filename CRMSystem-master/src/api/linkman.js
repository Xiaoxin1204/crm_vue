import request from '@/utils/request';

export default {
    getcontactsList(id) {
        const req = request({
            method: 'get',
            url: `/dev-api/linkman/findLinkmanByCustomerId?customerId=${id}`
        })
        return req
    },

    deleteLinkMan(linkmanId) {
        const req = request({
            method: 'delete',
            url: `/dev-api/linkman?linkmanId=${linkmanId}`
        })
        return req
    },

    updateLinkMan(linkman) {
        const req = request({
            method: 'put',
            url: `/dev-api/linkman`,
            data: linkman
        })
        return req
    },

    addLinkMan(linkman) {
        const req = request({
            method: 'post',
            url: `/dev-api/linkman/addLinkman`,
            data: linkman
        })
        return req
    },
}