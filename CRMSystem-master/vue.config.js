module.exports = {
    //开发环境的配置
    devServer: {
        port: 8889,
        host: "localhost",
        https: false,
        open: true,
        proxy: {//开发环境代理配置
            'dev-api': {
                //目标服务器地址，代理访问
                target: 'http://bigyue.top',
                //开启代理服务器
                changeOrigin: true,
                pathRewrite: {
                    // /db.json 最终会发送http://mengxuegu.com:7300/mock/5dc973eb8e0caf01d45a63fa/db.json
                    '^/dev-api': ''
                }
            }
        }
    },

    lintOnSave: false,
    productionSourceMap: false,
}