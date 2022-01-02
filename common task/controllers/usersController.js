import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import generateToken from '../utils/generateToken.js'
import connectDB from '../config/db.js'



const connection = await connectDB()


// @desc user Auth & GET Token
// @route POST /api/users/login
// @access Public

const userAuth = asyncHandler(async (req,res) => {
  const {email , password} = req.body

   

   const [rows] = await connection.execute('Select * from users where email=?',[email])

   const match = rows.length!==0 && await bcrypt.compare(password,rows[0].password)
      
       

        if(rows && match){
          res.json({
          id : rows[0].id,
          firstName : rows[0].firstName,
          lastName : rows[0].lastName,
          email : rows[0].email,
          role : rows[0].role,
          token : generateToken(rows[0].id)
          })
      }else{
          res.status(401)
          throw new Error('invalid username or password')
          
      } 
      
    })


// @desc user register
// @route POST /api/users/register
// @access Public

const registerUser = asyncHandler( async (req,res) => {

  const {firstName,lastName,email , password} = req.body

  const salt = await bcrypt.genSalt(10)

  const passwordencryp = await bcrypt.hash(password,salt)

  if(!firstName || !lastName || !email || !password){
      res.status(400)
      throw new Error('All the fields must be filled')
  }
  
    const [rows] = await connection.execute('Select count(*) as n from users where email=?',[email])

      if(rows[0].n!==0){
      res.status(400)
      throw new Error('user exists!')
      }

        const user = await connection.execute('INSERT INTO users (firstName,lastName,email,password) VALUES (?,?,?,?)',[firstName,lastName,email,passwordencryp])
          
  
        if(user){
          res.status(201).json({
            id : user[0].insertId,
            firstName,
            lastName,
            email,
            token : generateToken(user[0].insertId)
            })
          }
          else{
            throw new Error('There was a problem when creating this user')
          }
          })
      
// @desc edit user
// @route POST /api/users/edit/:id
// @access Private/admin

const editUser = asyncHandler( async (req,res) => {

  const id = req.params.id

  const [user] = await connection.execute('select * from users where id=?',[id])

  const {firstName,lastName,email ,role} = req.body

  console.log(role)

  if(role!=="admin" && role!=="client"){
    res.status(400)
    throw new Error('Role should only be admin or client')
  }

  const updatedUser = {
    firstName: firstName || user[0].firstName,
    lastName: lastName || user[0].lastName,
    email: email || user[0].email,
    role: role || user[0].role
  }

  await connection.execute('update users set firstName=?,lastName=?,email=?,role=? where id=?',[updatedUser.firstName,updatedUser.lastName,updatedUser.email,updatedUser.role,id])

  res.status(200).json(updatedUser)
})
          
      


export {userAuth,registerUser,editUser}