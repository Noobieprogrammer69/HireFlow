const Application = require("../models/Application")
const Message = require("../models/Message")

exports.checkChatAccess = async (req,res)=>{

    const app = await Application
    .findById(req.params.applicationId)
    .populate("job")

    if(!app) return res.status(404).json({message:"Application not found"})

    const isApplicant = app.applicant.toString() === req.user._id.toString()
    const isEmployer = app.job.company.toString() === req.user._id.toString()

    if(!isApplicant && !isEmployer){
        return res.status(403).json({message:"Not authorized"})
    }

    if(app.status?.toLowerCase() !== "accepted"){
        return res.json({allowed:false})
    }

    res.json({
        allowed:true,
        roomId: app._id
    })
}

exports.getMessages = async (req, res) => {
  try {

    const app = await Application
      .findById(req.params.roomId)
      .populate("applicant", "name email avatar resume")
      .populate({
        path: "job",
        populate: {
          path: "company",
          select: "companyName name avatar"
        }
      });

    if (!app) {
      return res.status(404).json({ message: "Application not found" });
    }

    const messages = await Message
      .find({ roomId: req.params.roomId })
      .populate("sender", "name avatar");

    let otherUser;

    if (app.applicant._id.toString() === req.user._id.toString()) {

      otherUser = {
        _id: app.job.company._id,
        name: app.job.company.companyName || app.job.company.name,
        avatar: app.job.company.avatar
      };

    } else {

      otherUser = {
        _id: app.applicant._id,
        name: app.applicant.name,
        email: app.applicant.email,
        avatar: app.applicant.avatar,
        resume: app.applicant.resume
      };

    }

    res.json({
      messages,
      user: otherUser
    });

  } catch (err) {

    console.error(err);
    res.status(500).json({ message: "Server error" });

  }
};

exports.getConversations = async (req, res) => {
  try {

    const apps = await Application
      .find({
        $or: [
          { applicant: req.user._id },
          { "job.company": req.user._id }
        ],
        status: "Accepted"
      })
      .populate("job")
      .populate("applicant", "name avatar")
      .populate("job.company", "name avatar companyName companyLogo")
      .sort({ updatedAt: -1 });

    const conversations = await Promise.all(

      apps.map(async (app) => {

        const lastMessage = await Message
          .findOne({ roomId: app._id })
          .sort({ createdAt: -1 });

        let otherUser;

        if (app.applicant._id.toString() === req.user._id.toString()) {

          // Logged in user is the applicant → show employer
          otherUser = {
            _id: app.job.company._id,
            name: app.job.company.companyName || app.job.company.name,
            avatar: app.job.company.companyLogo
          };

        } else {

          // Logged in user is employer → show applicant
          otherUser = {
            _id: app.applicant._id,
            name: app.applicant.name,
            avatar: app.applicant.avatar
          };

        }

        return {
          roomId: app._id,
          user: otherUser,
          lastMessage: lastMessage?.text || "",
          updatedAt: lastMessage?.createdAt || app.updatedAt
        };

      })

    );

    res.json(conversations);

  } catch (err) {

    console.error(err);
    res.status(500).json({ message: "Server error" });

  }
};