import express from 'express';
import { connectDb } from './src/congigs/dbcongig.js';
import { addcontact , updatecontact, getAllcontact_us , getcontactById, deletecontactById }  from './src/congigs/contoller/contact_us.js';
import cors from 'cors';
import { 
    addFeedback,
    getAllFeedback, 
    getFeedbackById, 
    deleteFeedbackById 
} from './src/congigs/contoller/Feedback.js';
const app = express();
app.use(cors());
app.use(express.json());

app.get("/contact_us",addcontact);
app.post("/contact_us",addcontact);
app.put("/contact_us/:id", updatecontact);
app.put("/contact_us", getAllcontact_us);
app.delete("/contact_us/:id", deletecontactById);
app.put("/contact_us/:id", getcontactById);

app.get("/feedback", getAllFeedback); // GET: Fetch all feedback
app.post("/feedback", addFeedback); // POST: Add new feedback
// We generally don't update feedback logs, but included for completeness:
// app.put("/feedback/:id", updateFeedback); 
app.get("/feedback/:id", getFeedbackById); // GET: Get feedback by ID
app.delete("/feedback/:id", deleteFeedbackById);

app.listen(5000,()=>{
        connectDb();
})