import request from '@/utils/request';

// request.get('/db.json').then(response => {
//     console.log(response.data)
// })

export default {
    getList(page,rows) {
        const req = request({
            method: 'get',
            url: `/customer/findCustomerByPage?page=${page}`
        })
        return req
    },

    getListById(customerId) {
        const req = request({
            method: 'get',
            url: `/customer/findCustomerById?customerId=${customerId}`
        })
        return req
    },

    addCustomer(customer) {
        const req = request({
            method: 'post',
            url: `/customer/addCustomer`,
            data: customer
        })
        return req
    },

    updateCustomer(customer) {
        const req = request({
            method: 'put',
            url: `/customer`,
            data: customer
        })
        return req
    },

    deleteCustomer(customerId) {
        const req = request({
            method: 'delete',
            url: `/customer?customerId=${customerId}`
        })
        return req
    },
}