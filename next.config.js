module.exports = {
    webpack: config => {
        config.module.rules.push({
            test: /\.(ts|tsx)$/,
            use: {
                loader: "ts-loader",
            },
        });
        config.module.rules.push({
            test: /\.(png|jpg|gif|svg)$/,
            use: {
                loader: "url-loader",
                options: {
                    limit: 100000,
                },
            },
        });
        return config;
    },
};