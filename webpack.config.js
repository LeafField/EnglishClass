const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const HtmlEntries = fs
  .readdirSync(path.resolve(__dirname, "src"))
  .filter((filename) => filename.match(/\.html/));

const HtmlWebpackPluginEntries = () => {
  return HtmlEntries.map((entry) => {
    return new HtmlWebpackPlugin({
      filename: `${entry}`,
      template: `./src/${entry}`,
      inject: "head",
      chunks: ["index"],
    });
  });
};

/** @type {import("webpack").Configuration} */
module.exports = {
  // 本番環境の場合modeをdevelopmentからproductionへと書き換えてください
  mode: "production",
  // 本番ビルド時にソースマップは削除してください（要件による）
  // devtool: "inline-source-map",
  entry: {
    index: "./src/js/index.ts",
  },
  output: {
    path: path.resolve(__dirname, "./docs"),
    filename: `./js/main.js`,
  },
  resolve: {
    extensions: ["", ".ts", ".js"],
  },

  module: {
    rules: [
      // typescriptのコンパイル
      {
        // javascriptのバンドル及びES6とReactのコンパイル
        test: /\.(js|ts)/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                ["@babel/preset-env", { useBuiltIns: "usage", corejs: 3 }],
                ["@babel/preset-typescript"],
              ],
            },
          },
        ],
      },
      // scssファイルのコンパイル
      {
        test: /\.s?css/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [require("autoprefixer")({ grid: true })],
              },
            },
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      // 画像ファイルの取り込み、現状では圧縮は別ツールを使用
      // {
      //   test: /\.(png|jpe?g|gif|svg)$/i,
      //   loader: "file-loader",
      // },
      // {
      //   test: /\.html$/i,
      //   loader: "html-loader",
      // },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),

    new CopyPlugin({
      patterns: [
        {
          from: "src/images",
          to: "images",
        },
      ],
    }),

    //複数のCSSを生成したい場合styleの部分を[name]へ変更すると対応するjavascriptファイルの名前へ変更されます
    new MiniCssExtractPlugin({
      filename: "css/style.css",
    }),

    ...HtmlWebpackPluginEntries(),
  ],
};
