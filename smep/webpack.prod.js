var webpack = require('webpack');
var path = require('path');
var webpackMerge = require('webpack-merge');

var CompressionPlugin = require("compression-webpack-plugin");

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var FaviconsWebpackPlugin = require('favicons-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// Webpack Config
var webpackConfig = {
    entry: {
        'main': './src/main.aot.ts',
    },

    output: {
        path: path.join(__dirname, 'dist/aot/'),
        filename: '[name].bundle.js',
        chunkFilename: 'js/[id]-[hash:8].chunk.js',
    },

    resolve: {
        extensions: ['.ts', '.js', '.json', '.css', '.scss', '.html']
    },

    plugins: [
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)src(\\|\/)linker/,
            path.resolve(__dirname, './src'),
            {
                // your Angular Async Route paths relative to this root directory
            }
        ),

        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            },
            sourceMap: false
        }),

        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
        }),

        
        new CleanWebpackPlugin(
            [
                './dist/aot/'
            ]
        ),
        
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),

        new ExtractTextPlugin("styles.css"),
        
        new HtmlWebpackPlugin({
            filename: 'index.html'            
        }),
        
        new webpack.ProvidePlugin({
            zone: 'zone.js',
            Reflect: 'core-js/es7/reflect'
        })
    ],

    module: {
        loaders: [
            // .ts files for TypeScript
            {
                test: /\.ts$/,
                loaders: [
                    'awesome-typescript-loader',
                    'angular2-template-loader',
                    // 'angular-router-loader',
                    'angular-router-loader?aot=true&genDir=aot/',
                ]
            },
            {
                test: /\.html$/,
                use: 'raw-loader'
            },
            {
                test: /\.(png|jpg|gif|ico|woff|woff2|ttf|svg|eot)$/,
                loader: 'file-loader?name=assets/[name]-[hash:6].[ext]',
            },
            { test: /\.css$/, loaders: ['to-string-loader', 'css-loader'] }
        ],
        exprContextCritical: false
    }

};


// Our Webpack Defaults
var defaultConfig = {
    //devtool: 'source-map',
    devtool: "eval-source-map",
    /*
      https://github.com/webpack/docs/wiki/build-performance
      devtool: "source-map" cannot cache SourceMaps for modules and need to regenerate complete SourceMap for the chunk. It's something for production.
  
      devtool: "eval-source-map" is really as good as devtool: "source-map", but can cache SourceMaps for modules. It's much faster for rebuilds.
  
      devtool: "eval-cheap-module-source-map" offers SourceMaps that only maps lines (no column mappings) and are much faster.
  
      devtool: "eval-cheap-source-map" is similar but doesn't generate SourceMaps for modules (i.e., jsx to js mappings).
  
      devtool: "eval" has the best performance, but it only maps to compiled source code per module. In many cases this is good enough. (Hint: combine it with output.pathinfo: true.)
    */

    output: {
        // filename: '[name].bundle.js',
        // sourceMapFilename: '[name].map',
        // chunkFilename: '[id].chunk.js'
        path: './.dist/web/aot/',
        filename: '[name].bundle.js',
        chunkFilename: 'js/[id].-[hash:8].chunk.js',
    },

    resolve: {
        extensions: ['.ts', '.js'],
        modules: [path.resolve(__dirname, 'node_modules')]
    },

    devServer: {
        historyApiFallback: true,
        watchOptions: { aggregateTimeout: 300, poll: 1000 },
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        }
    },

    node: {
        global: true,
        crypto: 'empty',
        __dirname: true,
        __filename: true,
        process: true,
        Buffer: false,
        clearImmediate: false,
        setImmediate: false
    }
};


module.exports = webpackMerge(defaultConfig, webpackConfig);
