import { getConnectionObject } from "../dbcongig.js";


export async function addcontact(request, response){
    try {
        const connection = getConnectionObject();
        const {id,name,email,subject,message,IS_READ} = request.body;
        const qry = `INSERT INTO contact_us(name,email,subject,message,IS_READ) VALUES('${name}','${email}','${subject}','${message}',0)`;
        const [resultSet] = await connection.query(qry);
        if(resultSet.affectedRows === 1){
            response.status(200).send({message:'contact Added'});
        }
        else{
            response.status(500).send({message:'Cannot add contact at this time'});
        }
    } catch (error) {
        console.log(error);
        response.status(500).send({message:'Something went wrong'});
    }
}

export async function  updatecontact(request, response){
try {
        const connection = getConnectionObject();
        const {name,email,subject,message} = request.body;
        const qry = `UPDATE contact_us SET name='${name}', email='${email}', subject='${subject}', message='${message}' WHERE id=${request.params.id}`;
        const [resultSet] = await connection.query(qry);
        if(resultSet.affectedRows === 1){
            response.status(200).send({message:'contact Updated'});
        }
        else{
            response.status(500).send({message:'contact update operation failed'});
        }
    } catch (error) {
        console.log(error);
        response.status(500).send({message:'Something went wrong'});
    }
}

export async function getAllcontact_us(request, response){
    try {
        const connection = getConnectionObject();
        const qry = `SELECT * FROM  contact_us`;
        const [rows] = await connection.query(qry);
        response.status(200).send(rows);
    } catch (error) {
        console.log(error);
        response.status(500).send({message:'Something went wrong'});
    }
}

export async function getcontactById(request, response){
    try {
        const connection = getConnectionObject();
        const qry = `SELECT * FROM contact_us WHERE id=${request.params.id}`;
        const [rows] = await connection.query(qry);
        if(rows.length === 0){
            response.status(404).send({message:'contact  not found'});
        }
        else{
            response.status(200).send(rows[0]);
        }
    } catch (error) {
        console.log(error);
        response.status(500).send({message:'Something went wrong'});
    }
}


export async function deletecontactById(request, response){
    try {
        const connection = getConnectionObject();
        const qry = `DELETE FROM contact_us WHERE id=${request.params.id}`;
        const [resultSet] = await connection.query(qry);
        if(resultSet.affectedRows === 1){
            response.status(200).send({message:'contact Deleted'});
        }
        else{
            response.status(404).send({message:'contact not found'});
        }
    } catch (error) {
        console.log(error);
        response.status(500).send({message:'Something went wrong'});
    }
}