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

    addCustomer(customer) {
        const req = request({
            method: 'post',
            url: `/dev-api/customer/addCustomer`,
            data: customer
        })
        return req
    },

    updateCustomer(customer) {
        const req = request({
            method: 'put',
            url: `/dev-api/customer`,
            data: customer
        })
        return req
    },

    deleteCustomer(customerId) {
        const req = request({
            method: 'delete',
            url: `/dev-api/customer?customerId=${customerId}`
        })
        return req
    },
}