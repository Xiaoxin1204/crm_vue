import request from '@/utils/request';

export default {
    sendSms(tel) {
        const req = request({
            method: 'get',
            url: `/sendSms?tel=${tel}`
        })
        return req
    },

    loginByTel(tel) {
        const req = request({
            method: 'get',
            url: `/loginByTel?tel=${tel}`
        })
        return req
    },

    loginByPassword(formData) {
        const req = request({
            method: 'post',
            url: `/loginByPassword`,
            data: {
                "tel": formData.id,
                "password": formData.pwd
            }
        })
        return req
    },

    register(formData) {
        const req = request({
            method: 'post',
            url: `/reg`,
            data: {
                "compName": formData.name,
                "tel": formData.tel,
                "password": formData.pass
            }
        })
        return req
    },
}