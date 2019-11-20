import request from '@/utils/request';

// request.get('/db.json').then(response => {
//     console.log(response.data)
// })

export default {
    getList() {
        const req = request({
            method: 'get',
            url: '/dev-api/findCustomerByPage'
        })
        return req
    }
}