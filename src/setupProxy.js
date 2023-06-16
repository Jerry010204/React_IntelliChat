const proxy = require("http-proxy-middleware")

module.exports = function(app) {
    app.use(
        proxy("/chatgpt",
        {
            target: 'http://localhost:8080',
            secure: false,
            changeOrigin: true
        })
    )
}

// /chatgpt/send 

// dog.ceo/api/breeds/image/random
// pro> /api/breeds, to end