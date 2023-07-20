const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI, {
            useUnifiedTopology: true, // this object will allow all warnings provide by mongodb
            useNewUrlParser: true
        })
    } catch(err) {
        console.error(err);
    }
}

module.exports = connectDB;