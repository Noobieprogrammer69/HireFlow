const User = require("../models/User")
const jwt = require("jsonwebtoken")
const admin = require("../config/firebaseAdmin");

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "60d"})
}

exports.firebaseLogin = async (req, res) => {
  try {
    const { idToken, role } = req.body;

    if (!idToken) {
      return res.status(400).json({ message: "Token missing" });
    }

    const decodedToken = await admin.auth().verifyIdToken(idToken);

    const email = decodedToken.email;
    const name = decodedToken.name;
    const avatar =
    decodedToken.picture ||
    decodedToken.firebase?.identities?.picture ||
    "";

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name: name || "Google User",
        email,
        password: "firebase-auth",
        role: role || "jobseeker",
        avatar
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user
    });

  } catch (error) {
    console.error("Firebase Login Error:", error);
    res.status(500).json({ message: "Firebase login failed" });
  }
};
exports.register = async (req, res) => {
    try {
        const { name, email, password, avatar, role } = req.body
        const userExists = await User.findOne({ email })
        if(userExists) return res.status(400).json({message: "User already Exists"})

        const user = await User.create({ name, email, password, avatar, role })

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            role: user.role,
            token: generateToken(user._id),
            companyName: user.companyName || "",
            companyDescription: user.companyDescription || "",
            companyLogo: user.companyLogo || "",
            resume: user.resume || ""
        })

         
    } catch (error) {
    console.error("REGISTER ERROR:", error)
    res.status(500).json({
        message: error.message,
        stack: error.stack
    })
}
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({email})
        if(!user || !(await user.matchPassword(password))) {
            return res.status(400).json({message: "Invalid Email or Password"})
        }

            res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            role: user.role,
            token: generateToken(user._id),
            companyName: user.companyName || "",
            companyDescription: user.companyDescription || "",
            companyLogo: user.companyLogo || "",
            resume: user.resume || ""
        })

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

exports.getMe = async (req, res) => {
    res.json(req.user)
}