const MailingListModel = require('../models/mailingList')

// get all mailing lists
const getAllMailingLists = async (req: any, res: any) => {
    const AllMailingLists = await MailingListModel.find({});
    res.status(200).json(AllMailingLists);
}

// add mailing list
const addMailingList = async (req: any, res: any) => {
    const {name} = req.body;
    try {
        const newMailingList = new MailingListModel({
            name
        });
        await newMailingList.save();

        return res.status(200).json({message: `Mailing list: ${newMailingList.name} successfully created`});
    } catch (err){
        return res.status(500).json({ err: `${res.message}, bro!`})
    }
}

// fetch mailing list by id
const getMailingListById = async (req: any, res: any) => {
    const { id } = req.params;
    const mailingList = await MailingListModel.findById(id);
    !mailingList ? 
    res.status(500).json({ error: `Mailing list with id '${id}' not found`}) :
    res.status(200).json(mailingList);
}

// update mailing list by id
const updateMailingListById = async (req: any, res: any) => {
    const { id } = req.params;
    const mailingList = await MailingListModel.findByIdAndUpdate(id, req.body,{ runValidators: true, new: true})
    !mailingList ?
    res.status(500).json({error: 'An error occurred.'}) :
    res.status(200).json({message: `Data updated for: ${mailingList.name}`})
}

// delete mailing list by id
const deleteMailingListById = async (req: any, res: any) => {
    const { id } = req.params;
    const mailingList = await MailingListModel.findByIdAndDelete(id, req.body, { runValidators: true, new: true})
    !mailingList ?
    res.status(500).json({error: 'An error occurred.'}) :
    res.status(200).json({message: `Data deleted for: ${mailingList.name}`});
};

export {
    getAllMailingLists,
    addMailingList,
    getMailingListById,
    updateMailingListById,
    deleteMailingListById
}