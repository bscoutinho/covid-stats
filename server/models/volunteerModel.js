  
import mongoose from 'mongoose';

const volunteerSchema = mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var VolunteerModel = mongoose.model('VolunteerModel', volunteerSchema);

export default VolunteerModel;