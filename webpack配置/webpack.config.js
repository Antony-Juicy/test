const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports={
    // 入口文件
    entry:path.join(__dirname,'src/index.js'),
    output:{
        // 编译文件保存路径 多入口
        path:path.join(__dirname,'./dist'),
        filename:'js/[name]-[hash:5].js'
    },

    // 开启服务器
    devServer:{
        // 服务器根目录
        contentBase:path.join(__dirname,'./public'),
        // port:            // 端口
        // proxy:           // 代理
        // compress:true,  // 服务器压缩
    },
    resolve:{
        // 路径别名
        alias:{
            '@':path.resolve('./src'),
            '$c':path.resolve('./src/components'),
            '$v':path.resolve('./src/views'),
        },
        // 默认扩展名
        extensions:['.js', '.json','.jsx']
    },
    // 加载器
    module:{
        rules:[
            // js: babel-loader
            {
                test:/\.jsx?$/,
                // includes/excludes：加快编译速度
                include:path.join(__dirname,'./src'),
                // excludes:path.join(__dirname,'./node_modules'),  // 过滤
                use:{
                    loader:'babel-loader',
                    options:{
                        // 插件集合
                        presets:['@babel/preset-react'],
                        //  插件
                        plugins:[
                            ['@babel/plugin-proposal-decorators',{legacy:true}],
                            ['@babel/plugin-proposal-class-properties',{loose:true}],
                        ]
                    }
                }
            },
            // css: css-loader,style-loader
            {
                test:/\.css$/,
                //include:path.join(__dirname,'./src'),
                use:['style-loader','css-loader']
            },

            // sass: sass-loader
            // css: css-loader,style-loader
            {
                test:/\.s[ca]ss$/,
                include:path.join(__dirname,'./src'),
                use:['style-loader','css-loader','sass-loader']
            }
        ]
    },

    // 插件
    plugins:[
        new HtmlWebpackPlugin({
            template:'./public/template.html',
            // filename:'login.html', // 默认index.html
        })
    ]
}