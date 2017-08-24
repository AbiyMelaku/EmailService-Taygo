var webpack = require('webpack');

module.exports = {
  
  //specify the input
  entry: [
  'script!jquery/dist/jquery.min.js',
  'script!foundation-sites/dist/foundation.min.js',
  './app/app.jsx',
  ],
  
  externals: {
    jquery: 'jQuery'
  },
  
  plugins: [
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery'
    })
  ],  
  //specify the output
  output: {
    //set two properties on the object
    path: __dirname,
    filename:  './public/bundle.js'
  },
  
  resolve: {
    root: __dirname,
    alias: {
      Main: 'app/components/Main.jsx',
      Nav: 'app/components/Nav.jsx',
      About: 'app/components/About.jsx',
      Email: 'app/components/Email.jsx',
      EmailForm: 'app/components/EmailForm.jsx',
      EmailContents: 'app/components/EmailContents.jsx',
      emailService: 'app/api/emailService.jsx',
      applicationStyles: 'app/styles/app.scss'
    },
    extensions: ['', '.js', '.jsx']
  },
  
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-3']
        },
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  
  devtool: 'cheap-module-eval-source-map'
  //devtool: 'inline-source-map'
  //devtool: 'eval-source-map'
};