const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const twilio = require('twilio');
const users = new Map(); // Initialize the users Map to store OTPs



class UserController {
    async register(req, res) {
      try {
        const { name, email, password, mobile } = req.body;
  
        // Check if the email or mobile number already exists
        const existingUser = await User.findOne({
          where: { email: email, mobile: mobile }
        });
  
        if (existingUser) {
          return res.status(400).json({ message: 'User already exists' });
        }
  
        // Hash the password
        const saltRounds = 10; // You can adjust the number of salt rounds
        const hashedPassword = await bcrypt.hash(password, saltRounds);
  
        // Create a new user
        const user = await User.create({
          name: name,
          email: email,
          password: hashedPassword,
          mobile: mobile
        });
  
        // Generate a JWT token for the user
        const token = jwt.sign({ userId: user.id }, 'your_secret_key');
  
        return res.status(201).json({ user, token });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    }

    async login(req, res) {
      try {
        const { mobile, password } = req.body;
    
        // Find the user by mobile number
        const user = await User.findOne({
          where: { mobile: mobile }
        });
    
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
    
        if (!isPasswordValid) {
          return res.status(401).json({ message: 'Invalid password' });
        }
    
        // Generate a JWT token for the user
        const token = jwt.sign({ userId: user.id }, 'your_secret_key');
    
        return res.status(200).json({ user, token });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    }

  async forgotPassword(req, res) {
    try {
      const { mobile } = req.body;
  
      // Find the user by mobile number
      const user = await User.findOne({
        where: { mobile: mobile }
      });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Use dynamic import() to load the crypto-random-string module
      const randomstring = require('randomstring');
  
      // Generate a unique reset OTP (e.g., a 6-digit code)
      const resetOTP = randomstring.generate({ length: 6, charset: 'numeric' });
  
      // Store the reset OTP in the database
      user.otp = resetOTP; // Assuming your OTP column in the User model is named 'otp'
      await user.save(); // Save the user object with the OTP
      console.log(user.save());
  
      const accountSid = 'ACe547dfc8506ef3ea8d3ea60c6d89442f';
      const authToken = '95e862756f5549470ab87f4f289c7be3';
      const twilioClient = require('twilio')(accountSid, authToken);
  
      // Send the OTP via SMS using Twilio
      twilioClient.messages
        .create({
          body: `Your OTP for password reset: ${resetOTP}`,
          from: '+18065573085', // Your Twilio phone number
          to: mobile // User's mobile number
        })
        .then(() => {
          console.log('Reset OTP sent via SMS');
          return res.status(200).json({ message: `Reset OTP sent successfully ${resetOTP}` });
        })
        .catch((error) => {
          console.error('Twilio error:', error);
          return res.status(500).json({ message: 'Failed to send reset OTP via SMS' });
        });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  
  
  // Reset Password
  async resetPassword(req, res) {
    const { mobile, otp, newPassword } = req.body;
  
    try {
      // Find the user by mobile number
      const user = await User.findOne({
        where: { mobile: mobile }
      });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the OTP matches the stored OTP in the database
      if (user.otp !== otp) {
        return res.status(400).json({ message: 'Invalid OTP' });
      }
  
      // Ensure that newPassword is a non-empty string
    if (!newPassword || typeof newPassword !== 'string') {
      return res.status(400).json({ message: 'Invalid new password' });
    }
  
      // Hash the new password with a salt
      const saltRounds = 10; // You can adjust the number of salt rounds
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
  
      // Update the user's password in the database
      user.password = hashedPassword; // Set the new hashed password
      user.otp = null; // Clear the OTP field
      await user.save();
  
      return res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  
  
  // Verify OTP
  async verifyOTP(req, res) {
    try {
      const { mobile, otp } = req.body;
  
      // Find the user by mobile number
      const user = await User.findOne({
        where: { mobile: mobile }
      });
      console.log(user);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the OTP matches
      if (user.otp === otp) {
        return res.status(200).json({ message: 'OTP verification successful' });
      } else {
        return res.status(400).json({ message: 'Invalid OTP' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
 
  
  

}


// Helper function to generate a random OTP
function generateOTP() {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

module.exports = UserController;
