import mysql from 'mysql2/promise'

const connectDB=  async () => {

   
    try {
      const con = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: ""
      });
      
      await con.execute("CREATE DATABASE IF NOT EXISTS channelpro_db")
   
       return await mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'channelpro_db'
      });

      // const sql ="CREATE TABLE IF NOT EXISTS users (id INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY, firstName  VARCHAR(100) NOT NULL,lastName  VARCHAR(100) NOT NULL, email VARCHAR(100) NOT NULL,password VARCHAR(100) NOT NULL,role VARCHAR(50) NOT NULL) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1"
      // connection.query(sql, function (error, results) {
      //   if (error) throw error;
        
      // });

    } catch (error) 
    {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
    
}

export default connectDB