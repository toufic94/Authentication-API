import userData from './data/users.js'
import connectDB from './config/db.js'

const connection = await connectDB()



const createTable = async () => {

    try {
        await connection.execute("CREATE TABLE IF NOT EXISTS users (id INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY, firstName  VARCHAR(100) NOT NULL,lastName  VARCHAR(100) NOT NULL, email VARCHAR(100) NOT NULL,password VARCHAR(100) NOT NULL,role VARCHAR(50) NOT NULL DEFAULT 'client') ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1")
    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
}

const importData = async () => {
    try{
        await connection.execute('delete from users')

        
        await connection.query('INSERT INTO users (firstName,lastName,email,password,role) VALUES ?',[userData])
        

        console.log('Data imported!')
        process.exit()


    }catch(error){

        console.error(`${error}`)
        process.exit(1)

    }
}


createTable()
importData()