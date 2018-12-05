var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var FoodSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    foodDecription: {
        type: String,
        default: ""
    },
    create_date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: [{
            type: String,
            enum: ['available', 'unavailable']
        }],
        default: 'available'
    }
});

FoodSchema.path('name').set((inputString) => {
    return inputString[0].toUpperCase() + inputString.slice(1);
})

module.exports = mongoose.model('Food',FoodSchema)