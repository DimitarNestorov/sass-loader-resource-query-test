const svgoLoaderWithSettings = {
	loader: 'svgo-loader',
	options: {
		plugins: [
			{removeTitle: true},
			{convertColors: {shorthex: false}},
			{convertPathData: false},
		],
	},
};

const externalSVGConfig = [
	{
		loader: 'file-loader',
		options: {
			name: '[hash].[ext]',
		},
	},
	svgoLoaderWithSettings,
];

module.exports = {
	module: {
		rules: [
			{
				test: /\.svg$/,
				oneOf: [
					{
						resourceQuery: /external/,
						use: externalSVGConfig,
					},
					{
						use: [
							'html-loader',
							svgoLoaderWithSettings,
						],
					},
				],
			},
			{
				test: /\.scss$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: `[name].css`,
						},
					},
					'extract-loader',
					'css-loader',
					'sass-loader',
				],
			}
		]
	}
}