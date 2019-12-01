import request from '@/utils/request';

export default {
    getcontactsList(id) {
        const req = request({
            method: 'get',
            url: `/dev-api/linkman/findLinkmanByCustomerId?customerId=${id}`
        })
        return req
    }
}