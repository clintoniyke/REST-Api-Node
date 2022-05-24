const User = require("../model/User");

const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "username and password are required." });
  //check for an already registered user in the db
  const duplicate = await User.findOne({ username: user }).exec();
  if (duplicate) return res.sendStatus(409); //conflict

  try {
    //encrypt the password using bcrypt
    const hashedPwd = await bcrypt.hash(pwd, 10);
    //store the new user
    const result = await User.create({
      username: user,
      roles: { User: 7000 },
      password: hashedPwd,
    });

    console.log(result);

    res.status(201).json({ success: `new user ${user} created` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
