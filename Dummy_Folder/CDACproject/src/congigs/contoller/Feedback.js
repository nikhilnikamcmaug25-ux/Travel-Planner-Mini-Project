import { getConnectionObject } from "../dbcongig.js"; 

/**
 * Handles adding a new customer feedback entry.
 * POST /feedback
 */
export async function addFeedback(request, response){
    try {
        const connection = getConnectionObject();
        const { user_id, message } = request.body;
        
        if (!user_id || !message) {
            return response.status(400).send({ message: 'Missing user_id or feedback message.' });
        }
        
        const qry = `
            INSERT INTO feedback 
            (user_id, message) 
            VALUES (${user_id}, '${message}')
        `;

        const [resultSet] = await connection.query(qry);

        if(resultSet.affectedRows === 1){
            response.status(200).send({message: 'Feedback submitted successfully'});
        }
        else{
            response.status(500).send({message: 'Cannot submit feedback at this time'});
        }
    } catch (error) {
        console.log("Error in addFeedback:", error);
        response.status(500).send({message: 'Server error during feedback insertion'});
    }
}

/**
 * Handles fetching all customer feedback entries.
 * GET /feedback
 */
export async function getAllFeedback(request, response){
    try {
        const connection = getConnectionObject();
        const qry = `SELECT * FROM feedback`;
        const [rows] = await connection.query(qry);
        response.status(200).send(rows);
    } catch (error) {
        console.log("Error in getAllFeedback:", error);
        response.status(500).send({message: 'Server error while fetching feedback'});
    }
}

/**
 * Handles fetching a single customer feedback entry by ID.
 * GET /feedback/:id
 */
export async function getFeedbackById(request, response){
    try {
        const connection = getConnectionObject();
        const qry = `SELECT * FROM feedback WHERE id=${request.params.id}`;
        const [rows] = await connection.query(qry);
        
        if(rows.length === 0){
            response.status(404).send({message: 'Feedback not found'});
        }
        else{
            response.status(200).send(rows[0]);
        }
    } catch (error) {
        console.log("Error in getFeedbackById:", error);
        response.status(500).send({message: 'Server error while fetching feedback by ID'});
    }
}


/**
 * Handles deleting a customer feedback entry by ID.
 * DELETE /feedback/:id
 */
export async function deleteFeedbackById(request, response){
    try {
        const connection = getConnectionObject();
        const qry = `DELETE FROM feedback WHERE id=${request.params.id}`;
        const [resultSet] = await connection.query(qry);
        
        if(resultSet.affectedRows === 1){
            response.status(200).send({message: 'Feedback Deleted'});
        }
        else{
            response.status(404).send({message: 'Feedback not found'});
        }
    } catch (error) {
        console.log("Error in deleteFeedbackById:", error);
        response.status(500).send({message: 'Server error during feedback deletion'});
    }
}