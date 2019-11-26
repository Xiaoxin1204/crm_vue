import request from '@/utils/request';

// request.get('/db.json').then(response => {
//     console.log(response.data)
// })

export default {
    getList(page,rows) {
        const req = request({
            method: 'get',
            url: `/dev-api/customer/findCustomerByPage?page=${page}`
        })
        return req
    },

    getListById(customerId) {
        const req = request({
            method: 'get',
            url: `/dev-api/customer/findCustomerById?customerId=${customerId}`
        })
        return req
    },

    
}