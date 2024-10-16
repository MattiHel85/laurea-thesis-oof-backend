import nodemailer from 'nodemailer';

const FeedbackModel = require('../models/feedback');
const FeedbackResponseModel = require('../models/feedbackResponse');

const getAllFeedback = async (req: any, res: any) => {
    const allFeedback = await FeedbackModel.find({});
    res.status(200).json(allFeedback);
};

const getFeedbackById = async (req: any, res: any) => {
    const { id } = req.params;
    const feedback = await FeedbackModel.findById(id); 
    res.status(200).json(feedback);
};

const addFeedback = async (req: any, res: any) => {
    const { name, email, message, wantsReply } = req.body;

    try {
        const newFeedback = new FeedbackModel({
            name,
            email,
            message,
            wantsReply
        });
        await newFeedback.save();

        return res.status(200).json({ message: `Added feedback from: ${newFeedback.name}`})
    } catch (error) {
        return res.status(500).json({ error: 'Error saving feedback.'})
    }
};

const deleteFeedbackById = async (req: any, res: any) => {
    const { id } = req.params;
    const feedback = await FeedbackModel.findByIdAndDelete(id);
    res.status(200).json({ message: `Deleted feedback from: ${feedback.name}`});
};

const replyToFeedback = async (req: any, res: any) => {
    const { feedbackId, replyMessage } = req.body;
  
    try {
      const feedback = await FeedbackModel.findById(feedbackId);
      if (!feedback) {
        return res.status(404).json({ error: 'Feedback not found.' });
      }
  
      const transporter = nodemailer.createTransport({
        service: 'Gmail', 
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
  
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: feedback.email, 
        subject: `Response to your feedback (ID: ${feedback._id})`,
        text: replyMessage,
      };
  
      await transporter.sendMail(mailOptions);
  
      const feedbackResponse = new FeedbackResponseModel({
        feedbackId,
        replyMessage,
        sentAt: new Date(), 
      });
  
      await feedbackResponse.save();
  
      return res.status(200).json({ message: 'Reply sent and saved successfully!' });
    } catch (error) {
      console.error('Error sending reply:', error);
      return res.status(500).json({ error: 'Failed to send reply.' });
    }
  };

  const getAllFeedbackResponses = async (req: any, res: any) => {
    try {
      const allFeedbackResponses = await FeedbackResponseModel.find({});
      res.status(200).json(allFeedbackResponses);
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving feedback responses.' });
    }
  };
  

  const getFeedbackResponseById = async (req: any, res: any) => {
    const { id } = req.params;
  
    try {
      const feedbackResponse = await FeedbackResponseModel.findById(id);
      if (!feedbackResponse) {
        return res.status(404).json({ error: 'Feedback response not found.' });
      }
      res.status(200).json(feedbackResponse);
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving feedback response.' });
    }
  };
  
  // const addFeedbackResponse = async (req: any, res: any) => {
  //   const { feedbackId, replyMessage } = req.body;
  
  //   try {
  //     const newFeedbackResponse = new FeedbackResponseModel({
  //       feedbackId,
  //       replyMessage,
  //       sentAt: new Date(),
  //     });
  
  //     await newFeedbackResponse.save();
  //     res.status(201).json(newFeedbackResponse);
  //   } catch (error) {
  //     res.status(500).json({ error: 'Error saving feedback response.' });
  //   }
  // };
  
  const deleteFeedbackResponseById = async (req: any, res: any) => {
    const { id } = req.params;
  
    try {
      const feedbackResponse = await FeedbackResponseModel.findByIdAndDelete(id);
      if (!feedbackResponse) {
        return res.status(404).json({ error: 'Feedback response not found.' });
      }
      res.status(200).json({ message: `Deleted feedback response with ID: ${feedbackResponse._id}` });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting feedback response.' });
    }
  };
  
  export default {
    getAllFeedback,
    getFeedbackById,
    addFeedback,
    deleteFeedbackById,
    replyToFeedback,
    // addFeedbackResponse,
    getAllFeedbackResponses,
    getFeedbackResponseById,
    deleteFeedbackResponseById,
  };