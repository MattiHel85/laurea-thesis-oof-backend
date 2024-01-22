// const RecipientModel = require('../models/recipient');

// // get all recipients
// const getAllRecipients = async (req: any, res: any) => {
//     const AllRecipients = await RecipientModel.find({});
//     res.status(200).json(AllRecipients);
// }

// // add recipient
// const addRecipient = async (req: any, res: any) => {
//     const {firstName, lastName, email} = req.body;
//     const {id} = req.params;
//     try {
//         const newRecipient = new RecipientModel({
//             firstName,
//             lastName,
//             email
//         });
//         await newRecipient.save();

//         return res.status(200).json({message: `New recipient: ${newRecipient.firstName} ${newRecipient.lastName} successfully added with email address: ${newRecipient.email} to mailing list with id: ${id}`});
//     } catch (err){
//         return res.status(500).json({ err: `${res.message}, bro!`})
//     }
// }

// // fetch recipient by id
// const getRecipientById = async (req: any, res: any) => {
//     const { id, recipientId } = req.params;
//     const recipient = await RecipientModel.findById(recipientId);
//     !recipient ? 
//     res.status(500).json({ error: `Mailing list with id '${id}' not found`}) :
//     res.status(200).json(recipient);
// }

// // update mailing list by id
// const updateMailingListById = async (req: any, res: any) => {
//     const { id } = req.params;
//     const mailingList = await MailingListModel.findByIdAndUpdate(id, req.body,{ runValidators: true, new: true})
//     !mailingList ?
//     res.status(500).json({error: 'An error occurred.'}) :
//     res.status(200).json({message: `Data updated for: ${mailingList.name}`})
// }

// // delete mailing list by id
// const deleteMailingListById = async (req: any, res: any) => {
//     const { id } = req.params;
//     const mailingList = await MailingListModel.findByIdAndDelete(id, req.body, { runValidators: true, new: true})
//     !mailingList ?
//     res.status(500).json({error: 'An error occurred.'}) :
//     res.status(200).json({message: `Data deleted for: ${mailingList.name}`});
// };

// export {
//     getAllMailingLists,
//     addMailingList,
//     getMailingListById,
//     updateMailingListById,
//     deleteMailingListById
// }