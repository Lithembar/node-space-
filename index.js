import mysql from 'mysql2/promise'
import {config}from 'dotenv'
config()

const pool = mysql.createPool({
    hostname:process.env.HOSTNAME,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE

})

const getUsers = async()=>{
    let [data] = await pool.query('SELECT * FROM shopleft.shopleft_table')
    return data
}

const getProduct = async (id) =>{
    let [data] = await pool.query('SELECT * FROM shopleft.products WHERE id =?',[id])
    return data
}
console.log(await getProduct(3));


const deleteProduct = async(id)=>{
    let [data]= await pool.query('DELETE FROM shopleft.products WHERE id =?', [id])
    return data
}


console.log(await deleteProduct(4));



