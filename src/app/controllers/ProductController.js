const Product = require('../models/Product')
const Category = require('../models/Category')

module.exports = {
    create(req, res) {
        Category.all()
        .then(results => {

            const categories = results.rows
            return res.render("products/create.njk", { categories })

        }).catch(err => {
            throw new Error(err)
        })

    },

    async post(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send('Por favor, preencha todos os campos!')
            }
        }

        let results = await Product.create(req.body).catch(e => console.log(new Error(e)))
        const productId = results.rows[0].id

        results = await Category.all()
        const categories = results.rows

        return res.render("products/create.njk", { productId, categories })

    }
}