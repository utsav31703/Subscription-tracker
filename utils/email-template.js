// modernEmailTemplate.js
export const generateEmailTemplate = ({
  userName,
  subscriptionName,
  renewalDate,
  planName,
  price,
  paymentMethod,
  accountSettingsLink,
  supportLink,
  daysLeft,
}) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Subscription Renewal Reminder</title>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #f8fafc; padding: 20px 10px;">
        
        <!-- Main Container -->
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08); border: 1px solid #e2e8f0;">
            
            <!-- Header with Gradient -->
            <tr>
                <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); text-align: center; padding: 32px 20px;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -0.5px; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        Utsav Kushwaha
                    </h1>
                    <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0; font-size: 16px; font-weight: 400;">
                        Subscription Management
                    </p>
                </td>
            </tr>
            
            <!-- Content Section -->
            <tr>
                <td style="padding: 40px 32px;">
                    
                    <!-- Greeting -->
                    <h2 style="color: #1a202c; margin: 0 0 24px; font-size: 24px; font-weight: 600; line-height: 1.3;">
                        Hello ${userName}! 👋
                    </h2>
                    
                    <!-- Main Message with Urgency Indicator -->
                    <div style="background: ${daysLeft <= 2 ? 'linear-gradient(135deg, #fed7d7 0%, #feb2b2 100%)' : 'linear-gradient(135deg, #e6fffa 0%, #b2f5ea 100%)'}; 
                                border-left: 4px solid ${daysLeft <= 2 ? '#e53e3e' : '#38b2ac'}; 
                                padding: 20px; border-radius: 8px; margin-bottom: 32px;">
                        <p style="margin: 0; font-size: 17px; line-height: 1.6; color: #2d3748;">
                            Your <strong style="color: #667eea;">${subscriptionName}</strong> subscription will renew on 
                            <strong style="color: ${daysLeft <= 2 ? '#e53e3e' : '#38b2ac'};">${renewalDate}</strong>
                            ${daysLeft === 1 ? ' — that\'s tomorrow!' : ` — only ${daysLeft} days away!`}
                        </p>
                    </div>
                    
                    <!-- Subscription Details Card -->
                    <div style="background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%); border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; margin-bottom: 32px;">
                        
                        <!-- Card Header -->
                        <div style="background: #667eea; color: white; padding: 16px 24px; text-align: center;">
                            <h3 style="margin: 0; font-size: 18px; font-weight: 600;">Subscription Details</h3>
                        </div>
                        
                        <!-- Card Content -->
                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tr>
                                <td style="padding: 20px 24px 16px; border-bottom: 1px solid #e2e8f0;">
                                    <div style="display: flex; justify-content: space-between; align-items: center;">
                                        <span style="font-size: 16px; color: #4a5568; font-weight: 500;">📦 Plan </span>
                                        <span style="font-size: 16px; color: #2d3748; font-weight: 600;"> ${planName}</span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 16px 24px; border-bottom: 1px solid #e2e8f0;">
                                    <div style="display: flex; justify-content: space-between; align-items: center;">
                                        <span style="font-size: 16px; color: #4a5568; font-weight: 500;">💰 Price </span>
                                        <span style="font-size: 18px; color: #667eea; font-weight: 700;"> ${price}</span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 16px 24px 20px;">
                                    <div style="display: flex; justify-content: space-between; align-items: center;">
                                        <span style="font-size: 16px; color: #4a5568; font-weight: 500;">💳 Payment </span>
                                        <span style="font-size: 16px; color: #2d3748; font-weight: 600;"> ${paymentMethod}</span>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                    
                    <!-- Action Buttons -->
                    <div style="text-align: center; margin-bottom: 32px;">
                        <a href="${accountSettingsLink}" 
                           style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                                  color: #ffffff; text-decoration: none; padding: 14px 28px; 
                                  border-radius: 8px; font-weight: 600; font-size: 16px; 
                                  margin: 0 8px 12px; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
                                  transition: all 0.3s ease;">
                            ⚙️ Manage Subscription
                        </a>
                        
                        <a href="${supportLink}" 
                           style="display: inline-block; background: linear-gradient(135deg, #48bb78 0%, #38a169 100%); 
                                  color: #ffffff; text-decoration: none; padding: 14px 28px; 
                                  border-radius: 8px; font-weight: 600; font-size: 16px; 
                                  margin: 0 8px 12px; box-shadow: 0 4px 15px rgba(72, 187, 120, 0.4);">
                            💬 Get Support
                        </a>
                    </div>
                    
                    <!-- Information Box -->
                    <div style="background: #f7fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
                        <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #4a5568;">
                            <strong>💡 Need to make changes?</strong><br>
                            You can update your plan, payment method, or cancel anytime from your account settings. 
                            Changes made before the renewal date will take effect immediately.
                        </p>
                    </div>
                    
                    <!-- Sign-off -->
                    <div style="text-align: left; margin-top: 32px; padding-top: 24px; border-top: 1px solid #e2e8f0;">
                        <p style="margin: 0 0 8px; font-size: 16px; color: #2d3748;">
                            Best regards,
                        </p>
                        <p style="margin: 0; font-size: 16px; font-weight: 600; color: #667eea;">
                            The Kushwaha Team
                        </p>
                    </div>
                </td>
            </tr>
            
            <!-- Footer -->
            <tr>
                <td style="background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%); 
                           padding: 24px 32px; text-align: center; border-top: 1px solid #e2e8f0;">
                    
                    <!-- Company Info -->
                    <p style="margin: 0 0 16px; font-size: 14px; color: #718096; line-height: 1.5;">
                        <strong>Utsav Kushwaha Inc.</strong><br>
                        Near mayur vihar kolipura sehore
                    </p>
                    
                    <!-- Footer Links -->
                    <div style="margin-bottom: 16px;">
                        <a href="#" style="color: #667eea; text-decoration: none; font-size: 14px; margin: 0 12px; font-weight: 500;">
                            Unsubscribe
                        </a>
                        <span style="color: #cbd5e0;">|</span>
                        <a href="#" style="color: #667eea; text-decoration: none; font-size: 14px; margin: 0 12px; font-weight: 500;">
                            Privacy Policy
                        </a>
                        <span style="color: #cbd5e0;">|</span>
                        <a href="#" style="color: #667eea; text-decoration: none; font-size: 14px; margin: 0 12px; font-weight: 500;">
                            Terms of Service
                        </a>
                    </div>
                    
                    <!-- Social Media Icons (Optional) -->
                    <div style="margin-top: 16px;">
                        <p style="margin: 0; font-size: 13px; color: #a0aec0;">
                            Follow us for updates and tips
                        </p>
                    </div>
                </td>
            </tr>
        </table>
        
        <!-- Spacer -->
        <div style="height: 20px;"></div>
    </div>
</body>
</html>
`;

export const emailTemplates = [
  {
    label: "7 days before reminder",
    generateSubject: (data) =>
      `📅 Heads up! Your ${data.subscriptionName} renews in 7 days`,
    generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 7 }),
  },
  {
    label: "5 days before reminder", 
    generateSubject: (data) =>
      `⏰ 5 days left: ${data.subscriptionName} subscription renewal`,
    generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 5 }),
  },
  {
    label: "2 days before reminder",
    generateSubject: (data) =>
      `🚨 Just 2 days! ${data.subscriptionName} renews soon`,
    generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 2 }),
  },
  {
    label: "1 days before reminder",
    generateSubject: (data) =>
      `⚡ Tomorrow: ${data.subscriptionName} subscription renewal`,
    generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 1 }),
  },
];

// Optional: Advanced email with dark mode support
export const generateAdvancedEmailTemplate = (data) => `
<style>
  @media (prefers-color-scheme: dark) {
    .dark-mode { background-color: #1a202c !important; color: #e2e8f0 !important; }
    .dark-mode-card { background-color: #2d3748 !important; border-color: #4a5568 !important; }
  }
  
  @media only screen and (max-width: 600px) {
    .mobile-padding { padding: 16px !important; }
    .mobile-text { font-size: 14px !important; }
    .mobile-button { display: block !important; margin: 8px 0 !important; }
  }
</style>
${generateEmailTemplate(data)}
`;
