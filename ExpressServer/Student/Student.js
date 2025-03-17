//Student.js 

import  mongoose from 'mongoose';
const Schema = mongoose.Schema;

let studentSchema = new Schema({
    id: {
	    type:Number
    }, 
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    rollNo: {
        type: Number
    },
    dateOfBirth: {
	type: String
    }
}, {
    collection: 'students'
});

export default mongoose.model('Student', studentSchema);

