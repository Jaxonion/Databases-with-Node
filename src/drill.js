require('dotenv').config()

//const { DB_URL } = require('./config')

const knex = require('knex')

//console.log(process.env.DB_URL, 'something')
const knexInstance = knex({
    client: 'pg',
    connection: 'postgresql://dunder_mifflin@localhost/knex-practice'
})


function searchShoppingList(search) {
    knexInstance
        .select('name')
        .from('shopping_list')
        .where('name', 'ILIKE', `%${search}%`)
        .then(result => {
            console.log(result)
        })
}

function pageNumber(page) {
    const offset = limit * (page -1)
    knexInstance
        .select('id', 'name', 'price', 'date_added', 'checked', 'category')
        .from('shopping_list')
        .limit(6)
        .offset(offset)
        .then(result => {
            console.log(result)
        })
}

function afterDate(date) {
    knexInstance
        .select('id', 'name', 'price', 'date_added', 'checked', 'category')
        .from('shopping_list')
        .where('date_added', '>', knexInstance.raw(`now() - '?? date'::INTERAL`, date))
        .then(result => {
            console.log(result)
        })
}

function totalCost() {
    knexInstance
        .select('category')
        .sum('price as total')
        .from('shopping_list')
        .groupBy('category')
        .then(result=> {
            console.log(result)
        })
}
searchShoppingList('dogs')
pageNumber(2)
afterDate(6)
totalCost()