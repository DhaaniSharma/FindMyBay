import OTP from "../models/OTP.js";
import nodemailer from "nodemailer";
import twilio from "twilio";

// Generate 6-digit OTP
export const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Nodemailer transporter
const createEmailTransporter = () => {
  if (process.env.EMAIL_SERVICE && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    return nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }
  console.warn("Email transporter not configured.");
  return null;
};

// Twilio client
const createTwilioClient = () => {
  if (process.env.TWILIO_SID && process.env.TWILIO_AUTH_TOKEN) {
    return twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
  }
  console.warn("Twilio client not configured.");
  return null;
};

export const sendOtp = async (contact, type) => {
  try {
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min expiry

    // Save OTP in DB
    await OTP.create({ contact, otp, type, expiresAt });

    const emailTransporter = createEmailTransporter();
    const twilioClient = createTwilioClient();

    if (type === "email" && emailTransporter) {
      await emailTransporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: contact,
        subject: process.env.EMAIL_SUBJECT || "Your OTP Code",
        text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
        html: `<p>Your OTP is <strong>${otp}</strong>. It will expire in 5 minutes.</p>`,
      });
      console.log(`OTP sent to email ${contact}`);
      return { success: true, method: "email" };
    }

    if (type === "phone" && twilioClient && process.env.TWILIO_FROM) {
      await twilioClient.messages.create({
        from: process.env.TWILIO_FROM,
        to: contact,
        body: `Your OTP is ${otp}. It will expire in 5 minutes.`,
      });
      console.log(`OTP sent to phone ${contact}`);
      return { success: true, method: "sms" };
    }

    console.log(`OTP for ${contact}: ${otp} (not sent)`);
    return { success: false, message: "OTP saved but not sent. Configure email/SMS service in .env." };
  } catch (err) {
    console.error(err);
    throw new Error("Failed to send OTP: " + err.message);
  }
};

export const verifyOtp = async (contact, otp, type) => {
  try {
    const record = await OTP.findOne({ contact, otp, type });
    if (!record) return false;
    if (record.expiresAt < new Date()) return false;
    await OTP.deleteMany({ contact, type });
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};