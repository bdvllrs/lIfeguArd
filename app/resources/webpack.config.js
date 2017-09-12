let path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const dev = process.argv.indexOf('-p') < 0;

let cssLoaders = [
    {loader: 'css-loader', options: { minimize: !dev }}
];

if (!dev) {
    cssLoaders.push({
        loader: 'postcss-loader',
        options: {
            plugins: (loader) => [
                require('autoprefixer')({
                    browsers: ['last 2 versions', 'ie > 8']
                })
            ]
        }
    });
}

let config = {
    entry: {
        app: ['./src/index.js', './src/scss/app.scss']
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './public/assets'),
        publicPath: "/assets/"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: cssLoaders,
                    fallback: 'style-loader',
                    publicPath: '/assets'
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        ...cssLoaders,
                        {
                            loader: "sass-loader",
                            options: {
                                includePaths: [path.resolve(__dirname, 'src/scss')]
                            }
                        }
                    ],
                    fallback: "style-loader",
                    publicPath: '/assets'
                })
            },
            {
                test: /\.(png|svg|jpe?g|woff2?|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: '[name].[ext]',
                            publicPath: '/assets/',
                        }
                    }
                ]
            },
        ]
    },
    devtool: dev ? 'cheap-module-eval-source-map ' : false,
    devServer: {
        contentBase: path.resolve('./public'),
    },
    plugins: [
        new ExtractTextPlugin({
            filename: "css/[name].css",
            // disable: dev,
        })
    ]
};

if (!dev) {
    config.plugins.unshift(new UglifyJSPlugin());
    config.plugins.push(new CleanWebpackPlugin(['public'], {
        exclude: ['index.html'],
        root: path.resolve('./'),
        verbose: true,
        dry: false
    }))
}

module.exports = config;
