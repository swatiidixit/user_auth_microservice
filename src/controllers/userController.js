const {userModel} = require("../models");


exports.getUser = async (req,res) => {
    try {
       const userDetails = await userModel.findOne({where : {id : req.params.id}})
       if (!userDetails) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json(userDetails);

    }catch (error) {
        console.error('Error during getting user details:', error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
}