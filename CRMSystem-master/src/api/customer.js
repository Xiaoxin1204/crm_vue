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

    findCustomerInSeas() {
        const req = request({
            method: 'get',
            url: `/customer/findCustomerInSeas`
        })
        return req
    },

    toHighSeas(customerId) {
        const req = request({
            method: 'get',
            url: `/customer/toHighSeas?customerId=${customerId}`
        })
        return req
    },

    receiveCustomer(customerId) {
        const req = request({
            method: 'get',
            url: `/customer/receiveCustomer?customerId=${customerId}`
        })
        return req
    },

    queryCare() {
        const req = request({
            method: 'get',
            url: `/customerCare/queryCare`
        })
        return req
    },

    //编辑关怀方式
    edit(id,detail) {
        const req = request({
            method: 'get',
            url: `/customerCare/edit?id=${id}&detail=${detail}`
        })
        return req
    },

    //客户商机
    querySale_opp() {
        const req = request({
            method: 'get',
            url: `/sale_opp/query`
        })
        return req
    },

    //客户商机根据id
    querySale_oppById(id) {
        const req = request({
            method: 'get',
            url: `/sale_opp/queryById?id=${id}`
        })
        return req
    },

    //客户商机添加
    addSaleOpp(sale_opp) {
        const req = request({
            method: 'post',
            url: `/sale_opp/addSaleOpp`,
            data: sale_opp
        })
        return req
    }


}