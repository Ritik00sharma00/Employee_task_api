const user_model = require('../model/user.js');
const taskref = require('../model/user.js');

exports.printAlltaskref = async (req, res) => {
    try {
        const taskrefs = await user_model.find();
        console.log(taskrefs);
        res.json(taskrefs);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};


exports.taskrefbyId = async (req, res) => {
    try {
        const taskrefs = await taskref.find(req.params.task_id);
        res.json(taskrefs);
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
            uniqueNumber,
            employeeName,
            time,
            priority,
            description

        } = req.body;

        const photo = req.file ? req.file.path : null;

        const newTask = new user_model({
            task,
            uniqueNumber,
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
            task_id: req.params.task_id
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
        const task_id = req.params.task_id;
        const deletedTask = await taskref.findOneAndDelete({
            task_id
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