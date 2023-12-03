import SQL_info from './KEY/SQL_info.json'
import mysql from 'mysql';

var connection:mysql.connection;

//인터페이스로 정의
const conn = {
	host: SQL_info.host,
	port: SQL_info.port,
	user: SQL_info.user,
	password: SQL_info.password,
	database: SQL_info.database
};

function connect(){
    connection = mysql.createConnection(conn);  // DB Connect
    connection.connect(function(err){
        if(err){
            console.error(err);
            console.error("MySQL connection err");
            return ;
        }
        console.log("MySQL connected");
    });

    return connection;
}

function return_connection(){
    return connection;
}

export {connect,return_connection};