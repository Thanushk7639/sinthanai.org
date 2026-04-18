import nodemailer from 'nodemailer';

// Email configuration interface
export interface EmailConfig {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Create reusable transporter using Gmail SMTP
const createTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Generate HTML email template for contact form
const generateContactEmailTemplate = (data: ContactFormData): string => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f9f9f9;
    }
    .container {
      background-color: #ffffff;
      border-radius: 12px;
      padding: 30px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      border-bottom: 3px solid #dc2626;
      padding-bottom: 20px;
      margin-bottom: 25px;
    }
    .header h1 {
      color: #dc2626;
      margin: 0;
      font-size: 24px;
    }
    .header p {
      color: #666;
      margin: 8px 0 0 0;
      font-size: 14px;
    }
    .content {
      margin-bottom: 25px;
    }
    .field {
      margin-bottom: 18px;
    }
    .field-label {
      font-weight: 600;
      color: #0d9488;
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 6px;
    }
    .field-value {
      color: #333;
      font-size: 15px;
      padding: 10px 15px;
      background-color: #f5f5f5;
      border-radius: 6px;
      border-left: 3px solid #0d9488;
    }
    .message-box {
      background-color: #fefefe;
      border: 1px solid #e5e5e5;
      border-radius: 8px;
      padding: 15px;
      white-space: pre-wrap;
      word-wrap: break-word;
      line-height: 1.7;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #e5e5e5;
      font-size: 12px;
      color: #888;
    }
    .logo {
      color: #dc2626;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Sinthanai Foundation</h1>
      <p>New Contact Form Submission</p>
    </div>
    
    <div class="content">
      <div class="field">
        <div class="field-label">From</div>
        <div class="field-value">${data.name}</div>
      </div>
      
      <div class="field">
        <div class="field-label">Email Address</div>
        <div class="field-value">
          <a href="mailto:${data.email}" style="color: #0d9488; text-decoration: none;">${data.email}</a>
        </div>
      </div>
      
      <div class="field">
        <div class="field-label">Subject</div>
        <div class="field-value">${data.subject}</div>
      </div>
      
      <div class="field">
        <div class="field-label">Message</div>
        <div class="message-box">${data.message}</div>
      </div>
    </div>
    
    <div class="footer">
      <p>This email was sent from the contact form on <span class="logo">sinthanai.org</span></p>
      <p>Reply directly to this email to respond to ${data.name}</p>
    </div>
  </div>
</body>
</html>
  `.trim();
};

// Generate plain text version
const generateContactEmailText = (data: ContactFormData): string => {
  return `
SINTHANAI FOUNDATION - Contact Form Submission
===============================================

From: ${data.name}
Email: ${data.email}
Subject: ${data.subject}

Message:
${data.message}

-----------------------------------------------
Reply directly to this email to respond to ${data.name}
  `.trim();
};

/**
 * Send contact form email using SMTP
 * @param data - Contact form data (name, email, subject, message)
 * @returns Promise<boolean> - Returns true if email sent successfully
 */
export async function sendContactEmail(data: ContactFormData): Promise<{ success: boolean; error?: string }> {
  // Validate environment variables
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('Missing SMTP credentials in environment variables');
    return { 
      success: false, 
      error: 'Server configuration error: SMTP credentials not set' 
    };
  }

  // Validate required fields
  if (!data.name?.trim() || !data.email?.trim() || !data.subject?.trim() || !data.message?.trim()) {
    return { 
      success: false, 
      error: 'All fields are required' 
    };
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return { 
      success: false, 
      error: 'Please provide a valid email address' 
    };
  }

  try {
    const transporter = createTransporter();

    // Verify connection configuration
    await transporter.verify();

    // Prepare email content
    const html = generateContactEmailTemplate(data);
    const text = generateContactEmailText(data);

    // Send email - From shows sender's name, Reply-To goes to sender's email
    const info = await transporter.sendMail({
      from: `"${data.name}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: `"${data.name}" <${data.email}>`,
      subject: `${data.subject}`,
      html,
      text,
    });

    console.log('Email sent successfully:', info.messageId);
    return { success: true };

  } catch (error) {
    console.error('Error sending email:', error);
    
    // Handle specific SMTP errors
    if (error instanceof Error) {
      if (error.message.includes('Invalid login')) {
        return { 
          success: false, 
          error: 'Authentication failed. Please check email credentials.' 
        };
      }
      if (error.message.includes('ECONNREFUSED')) {
        return { 
          success: false, 
          error: 'Could not connect to email server. Please try again later.' 
        };
      }
      return { 
        success: false, 
        error: 'Failed to send email. Please try again later.' 
      };
    }

    return { 
      success: false, 
      error: 'An unexpected error occurred. Please try again.' 
    };
  }
}