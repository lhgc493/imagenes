var Tour = require('../models/tourModel');
var catchAsyn = require('../utils/catchAsync');


exports.getTour = catchAsyn(async(req, res) => {

    var tour = await Tour.find();
    res.status(200).json({
        ok: true,
        tours: tour
    })
})