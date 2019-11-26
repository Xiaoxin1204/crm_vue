import request from '@/utils/request';

export default {
    getcontactsList() {
        const req = request({
            method: 'get',
            url: `/dev-api/linkman/findLinkmanByCustomerId`
        })
        return req
    }
}