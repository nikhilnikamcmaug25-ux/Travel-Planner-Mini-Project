import { createConnection } from "mysql2/promise";

let connection = null;

export async function connectDb(){
    try{
        connection = await createConnection({
            host: 'localhost',
            user : 'root',
            password: 'cdac',
            port : 3306,
            database : 'travel_planner'
        });
    }catch(error){
            console.log("error in db connection");
            console.log(error);

        }
        return connection;
    }
    export function getConnectionObject(){
        return connection;
    }
