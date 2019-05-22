const job_route = require('../model/app.model.js');

const enums = require('../enum');

// Create and Save a new field in job collection
exports.create = (req, res, next) => {

    if (!!req.body.content) {
        return res.status(400).send({
            message: "Content cannot be empty"
        });
    }
    // job_route.first.findOne({'name': req.body.company_name}, (err,res) => {
    //     console.log(req.body);
    // //    if(res.roles !== 3) return next(err);
    // })
    const fields_job = new job_route.second({
        job_profile: req.body.job_profile,
        company_name: req.body.company_name,
        job_description: req.body.job_description,
        job_expire_on: req.body.job_expire_on,
        city:req.body.city,
        salary:req.body.salary
    });

    fields_job.save((err, response) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(response)
        }
    })

    // // Only admin and company can add a job 
    // job_route.first.find({ 'id': req.params.id }).then(response => {   //finding details by user id 
    //     if (response[0].roles == enums.roles.admin) {                 // comparing if role is admin 
    //         fields_job.save((err, response) => {
    //             if (err) {
    //                 console.log(err)
    //             }
    //             else {
    //                 res.send(response)
    //             }
    //         })

    //     }
    //     else if (response[0].roles == enums.roles.company) { // checking if role is company
    //         fields_job.save((err, response) => {
    //             if (err) {
    //                 console.log(err)
    //             }
    //             else {
    //                 res.send(response)
    //             }
    //         })

    //     }
    //     else {
    //         res.send({ message: 'user cannot add a job' })
    //     }
    // })
}


// Retrieve and return all fields from database.
exports.findAll = (_req, res) => {
    job_route.second.find()
        .then(test1 => {
            res.send(test1);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "error occurred"
            });
        });
};

//update jobs
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "content cannot be empty"
        });
    }

    // Find id and update it if there is any change in the status
    job_route.second.findOneAndUpdate({ 'job_id': req.params.id }, { $set: req.body }, { new: true })
        .then(fields_job => {
            if (!fields_job) {
                return res.status(404).send({
                    message: "Not found with id " + req.params.id
                });
            }
            res.send(fields_job);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating with id " + req.params.id
            });
        });
};

// Delete user details
exports.delete = (req, res) => {
    job_route.second.findByIdAndRemove(req.params.id)
        .then(fields_job => {
            if (!fields_job) {
                return res.status(404).send({
                    message: "Data not found" + req.params.id
                });
            }
            res.send({ message: "Deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'Not Found') {
                return res.status(404).send({
                    message: "Not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete field with id " + req.params.id
            });
        });
};


