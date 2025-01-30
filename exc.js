import mysql from 'mysql2/promise'
import express from 'express'
import { config } from 'dotenv'
config()

const pool = mysql.createPool({
    hostname:process.env.HOSTNAME,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.database

})

const app = express()
app.use(express.json)

app.get('/pick_and_steal', async(req,res)=>{
    res.json({
        employee: await getEmployee()
    })
})
app.get('/pick_and_steal', async(req,res)=>{
    res.json({
        employee: await getEmployee(req.params.id)
    })
})

app.post('//pick_and_steal', async(req,res)=>{
    let {idpick_and_steal, first_name, last_name, email, phone_number, department, salary} = req.body
    console.log(req.body);
  
    res.json({
        employee:idpick_and_steal, first_name, last_name, email, phone_number, department, salary
    })
})

app.listen(3000, ()=>{
    console.log('http://localhost:3000');
})

const getEmployee = async()=>{
    let [data] = await pool.query('SELECT * FROM pick_and_steal')
    return data
}

const getSingleEmployee =  async()=>{
    let [data] = await pool.query('SELECT * FROM  pick_and_steal WHERE idpick_and_steal = ?', [idpick_and_steal])
    return data
}

// console.log( awit getSingleEmployee(2));
const insertEmployee = async(idpick_and_steal, first_name, last_name, email, phone_number, department, salary)=>{
    await pool.query('INSERT INTO `pick_and_steal`.`pick_and_steal` (`idpick_and_steal`, `first_name`, `last_name`, `email`, `phone_number`, `department`, `salary`) VALUES ('?', '?', '?', '?', '?', '?', '?'),[idpick_and_steal, first_name, last_name, email, phone_number, department, salary])
    return await getEmployee   

}