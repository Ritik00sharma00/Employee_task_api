const user_model = require('../model/user.js');
const taskref = require('../model/user.js');

exports.printAlltaskref = async (req, res) => {
    try {
        const taskrefs = await user_model.find();
        res.json(taskrefs);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};


exports.taskrefbyId = async (req, res) => {
    const {
        employeeName
    } = req.query
    try {
        const taskrefs = await user_model.find({
            employeeName
        });
        if (taskrefs.length === 0) {
            return res.status(404).json({
                message: 'Task references not found for the specified employee'
            });
        }
        res.status(200).json(taskrefs);


    } catch (err) {
        res.status(500).json({
            message: err.message
        });
        res.status(500).json({
            message: 'Server Error'
        });
    }
}

exports.createtaskref = async (req, res) => {
    try {
        const {
            task,
            employeeName,
            time,

            priority,
            description

        } = req.body;

        const photo = req.file ? req.file.path : null;

        const newTask = new user_model({
            task,

            employeeName,
            time,
            priority,
            description,
            photo

        });

        const savedTask = await newTask.save();

        res.status(201).json(savedTask);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};


exports.updatetaskref = async (req, res) => {
    try {
        const {
            task,
            description,
            priority
        } = req.body;

        await taskref.updateOne({
            employeeName: req.query.employeeName
        }, {
            $set: {
                task,
                description,
                priority
            }
        });

        res.status(200).json({
            message: 'Task updated successfully'
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};


exports.deleteUser = async (req, res) => {
    try {
    const employeeName = req.query.employeeName;
        const deletedTask = await taskref.findOneAndDelete({
            employeeName:employeeName
        });

        if (!deletedTask) {
            return res.status(404).json({
                message: 'Task not found'
            });
        }

        res.json({
            message: 'Task deleted successfully'
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};