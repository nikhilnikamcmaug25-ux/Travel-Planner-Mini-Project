import { connection } from "../configs/db.js";

export async function addTrip(req,res){
    try{
        const {user_id, trip_name, destination, start_date, end_date, budget, description} = req.body;

        //for now basic validation
        if(!trip_name || !destination){
            return res.status(400).json({message:"Trip name and destination are required !"});
        }
        const tripData = { user_id, trip_name, destination, start_date, end_date, budget, description };
        const [result] = await connection.query("INSERT INTO trips SET ?", tripData);

        res.status(201).json({message:" Trip Added Successfully ! ", tripId : result.insertId,})
    }catch(error){
        console.log(error);
        console.log("Error adding trip:");
        res.status(500).json({message:"Server Error !",error : error.message});
    }
}

export async function viewTrips(req, res) {
    try{
        const user_id = req.params.user_id;
        
        const [rows] = await connection.query("SELECT * FROM trips WHERE user_id = ?",[user_id]);

        if(rows.length === 0){
            res.status(404).json({message:"No trips found for provided user !"});
        }
        res.status(200).json(rows); 
    }catch(error){
        console.log("Error fetching trips : ",error);
        res.status(500).json({message:"Server Error", error: error.message});
    }
}

export async function updateTrip(req,res) {
    try{
    const trip_id = req.params.trip_id;
    const { trip_name, destination, start_date, end_date, budget, description } = req.body;

    //available or not
    const [existing] = await connection.query("SELECT * FROM trips WHERE trip_id = ?", [trip_id]);
    if(existing.length === 0){
        return res.status(404).json({message:"Trip Not Found !"});
    }

    const [result] = await connection.query(`UPDATE trips SET trip_name = ?, destination = ?, start_date = ?, end_date = ?, budget = ?, description = ? WHERE trip_id = ?`,[trip_name, destination, start_date, end_date, budget, description, trip_id]);

    if(result.affectedRows === 1){
        res.status(200).json({message:"Trip Updated Successfully ! ",Trip_id : result.insertId});
    }else{
        res.status(400).json({message:"No changes made to Trip ! "});
    }
    }catch(error){
        console.error("Error updating trip:",error);
        res.status(500).json({message:"Server Error", error : error.message});
    }
}

export async function deleteTrip(req,res) {
    try{
        const trip_id=req.params.trip_id;

        const [existing] = await connection.query("SELECT * FROM trips WHERE trip_id = ?",[trip_id]);
        if(existing.length === 0){
            return res.status(404).json({message:"Trip not found ! "});
        }

        const [result] = await connection.query("DELETE FROM trips WHERE trip_id = ?",[trip_id]);

        if(result.affectedRows === 1){
            res.status(200).json({message:"Trip deleted Successfully ! "});
        }else{
            res.status(400).json({message:"Failed to delete Trips ! "});
        }
    }catch(error){
        console.error("Error deleting trip : ",error);
        res.status(500).json({message:"Server Error ",error:error.message});
    }
    
}