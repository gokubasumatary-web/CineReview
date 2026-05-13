/**
 * Email Service
 * Handles all outgoing emails using Nodemailer and Gmail SMTP.
 * Currently configured for Welcome Emails and Password Reset requests.
 */
const nodemailer = require('nodemailer');

// Configure the SMTP transporter using Gmail settings
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Sends a welcome email to a newly registered user.
 * @param {string} email - Recipient's email address.
 * @param {string} name - Recipient's name.
 */
const sendWelcomeEmail = async (email, name) => {
  try {
    const mailOptions = {
      from: `"CineVerse" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Welcome to CineVerse!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #e50914; text-align: center;">Welcome to CineVerse, ${name}!</h2>
          <p>Thank you for joining our community of movie enthusiasts.</p>
          <p>You can now explore trending films, add them to your watchlist, and get AI-powered insights.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="http://localhost:3000/browse" style="background-color: #e50914; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Start Browsing</a>
          </div>
          <p>Happy watching!</p>
          <p>The CineVerse Team</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Welcome email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
};

/**
 * Sends a password reset link to a user.
 * @param {string} email - Recipient's email address.
 * @param {string} resetToken - The unique reset token.
 */
const sendPasswordResetEmail = async (email, resetToken) => {
  try {
    const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}`;
    const mailOptions = {
      from: `"CineVerse" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Password Reset Request - CineVerse',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #0e0e0e; color: #ffffff;">
          <h2 style="color: #e50914; text-align: center;">Password Reset Request</h2>
          <p>We received a request to reset your password for your CineVerse account.</p>
          <p>Click the button below to reset your password. This link will expire in 1 hour.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background-color: #e50914; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
          </div>
          <p>If you didn't request this, you can safely ignore this email.</p>
          <p>The CineVerse Team</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Reset email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending reset email:', error);
  }
};

module.exports = { sendWelcomeEmail, sendPasswordResetEmail };
