const mongoose = require('mongoose');

async function connectToDB(){
    await mongoose.connect('mongodb://localhost:8080')

    const userSchema = new mongoose.Schema({
        name: String

    });

    const user = mongoose.model('User', userSchema);

   
}
    
    
    





