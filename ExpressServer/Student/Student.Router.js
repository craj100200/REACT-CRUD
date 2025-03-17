//Student.Router.js

import  express from 'express';
//import  router from express().Router();
import  Student from './Student.js'; // Student Model

const router = express.Router();

// CREATE Student
router.post('/students', async (req, res, next) => {
	try 
	{
		const data = await Student.create(req.body);
        	console.log(data);
        	res.json(data);
	} 
	catch (error) 
	{
        	return next(error);
    	}
});

// READ Students
router.get('/', async (req, res, next) => {
	try 
	{
        	const data = await Student.find();
        	res.json(data);
    	} 
	catch (error) 
	{
        	return next(error);
    	}
});

// UPDATE Student
router.route('/students/:id')
	// Get Single Student
	.get(async (req, res, next) => {
        try 
	{
        	const data = await Student.findById(req.params.id);
            	res.json(data);
        } 
	catch (error) 
	{
            	return next(error);
        }
    })
    // Update Student Data
	.put(async (req, res, next) => {
	   	try 
		{ 
			// Find the Student by id and update
			const updatedStudent = await Student.findOneAndUpdate(
      				{ id: req.params.id }, // Query criteria
      				req.body,        // Update data
      				{ new: true }       // Options: return the updated document
    				);

    			res.json(updatedStudent);
    			if (updatedStudent) 
			{
			      console.log('Student updated successfully:', updatedStudent);
			} 
			else 
			{
	      		console.log('Student not found');
    			}
	    	} 
	    	catch(error) 
		{ 
			return next(error);
	    	} 

     	//   try {
            //const data = await Student.findByIdAndUpdate(req.params.id, {
       //     const data = await Student.find( {id : req.params.id }, {
       //         $set: req.body,
       //     }, { new: true });
       //     res.json(data);
       //     console.log("Student updated successfully!");
       // } catch (error) {
	//	console.log("Error "); console.log(error);
        //    return next(error);
        //}
    });

// DELETE Student
router.delete('/students/:id', async (req, res, next) => {

try 
{ 
	const deletedStudent = await Student.findOneAndDelete(
     		{ id: req.params.id }// Query criteria
    	);


    	if (deletedStudent) 
	{
    		res.status(200).json(deletedStudent);
      		console.log('Student deleted successfully:', deletedStudent);
    	} 
	else 
	{
		res.status(404).send("Student not found");
      		console.log('Student not found');
    	} 
} 
catch(error) 
{
	console.log("Error deleting Student record");console.log(error);
	return next(error);
} 

    //try {
      //  const data = await Student.findByIdAndRemove(req.params.id);
        //res.status(200).json({
          //  msg: data,
       // });
   // } catch (error) {
     //   return next(error);
   // }
});

export default router;

