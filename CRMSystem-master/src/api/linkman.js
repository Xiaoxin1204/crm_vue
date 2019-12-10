import request from '@/utils/request';

export default {
    getcontactsList(id) {
        const req = request({
            method: 'get',
            url: `/linkman/findLinkmanByCustomerId?customerId=${id}`
        })
        return req
    },

    deleteLinkMan(linkmanId) {
        const req = request({
            method: 'delete',
            url: `/linkman?linkmanId=${linkmanId}`
        })
        return req
    },

    updateLinkMan(linkman) {
        const req = request({
            method: 'put',
            url: `/linkman`,
            data: linkman
        })
        return req
    },

    addLinkMan(linkman) {
        const req = request({
            method: 'post',
            url: `/linkman/addLinkman`,
            data: linkman
        })
        return req
    },
}