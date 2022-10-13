const ApiError = require("../api-error");
const ContactService = require("../services/contact.service");
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req,res,next) => {
    if (!req.body?.name){
        return next(new ApiError(400,"Name cannot be empty"));
    }
    try {
        const ContactService = new ContactService(MongoDB.client);
        const document = await ContactService.create(req.body);
        return res.send(document);
    } catch (error){
        return next(
            new ApiError(500,"An error occurred while creating the contact")
        );
    }
};
//Retrieve all contacts of a user from the database
exports.findAll = async (req,res,next) => {
    let document = [];
    try{
        const ContactService = new ContactService(MongoDB.client);
        const {name} = req.query;
        if(name){
            documents = await ContactService.findByName(name);
        } else {
            documents = await ContactService.find({});
        }
    } catch (error){
        return next(
            new ApiError(500,"An error occurred while retrieving contacts")
        );
    }
    return res.send(documents);
};
//Find a single contact with an id
exports.findOne = async (req,res,next) => {
    try {
        const ContactService = new ContactService(MongoDB.client);
        const document = await ContactService.findById(req.params.id);
        if(!document){
            return next(new ApiError(404,"Contact not found"));
        }
        return res.send(document);
        }catch (error){
            return next(
                new ApiError(
                    500,
                    `Error retrieving contact with id=${req.params.id}`
                )
            );
        }
    };
//Update a contact by the id in the request
exports.update = async(req,res,next) => {
    if(Object.keys(req.body).length===0){
        return next(new ApiError(400,"Data to update cannot be empty"));
    }
    try {
        const ContactService = new ContactService(MongoDB.client);
        const document = await ContactService.update(req.params.id, req.body);
        if(!document){
            return next(new ApiError(404,"Contact notfound"));
        }
        return res.send({message:"Contact was updated successfully"});
    } catch (error){
        return next(
            new ApiError(500, ` Error updating contact with id=${req.params.id}`)
        );
    }
};
//Delete a contact with the specified id in the request
exports.delete = async(req,res,next) => {
    try{
        const ContactService = new ContactService(MongoDB.client);
        const document = await ContactService.delete(req.params.id);
        if(!document){
            return next(new ApiError(404,"Contact not found"));
        }
        return res.send({message: "Contact was deleted successfully"});
        } catch (error){
            return next(
                new ApiError(
                    500,
                    `Could not delete the contact with id=${req.params.id}`
                )
            );
        }
    };
//Delete All contacts of a user from the database
exports.deleteAll = async (_req,res,next) => {
    try{
        const ContactService = new ContactService(MongoDB.client);
        const document = await this.ContactService.deleteAll();
        return res.send({
            message:`${deletedCount} contacts were deleted successfully`,
        });
    }catch(error){
        return next(
            new ApiError(500,"An error while removing all contacts")
        );
    }
};
//Find all favorite contacts of a user
exports.findAllFavortie = async (_req,res,next) => {
    try{
        const ContactService = new ContactService(MongoDB.client);
        const document = await ContactService.findFavortie();
        return res.send(document);
    }catch(error){
        return next(
            new ApiError(
                500,
                "An error occurred while retrieving favorite contacts"
            )
        );
    }
};