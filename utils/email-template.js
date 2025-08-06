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
    <style>
        /* Enhanced responsive styles */
        @media only screen and (max-width: 600px) {
            .container { padding: 10px 5px !important; }
            .main-table { width: 100% !important; margin: 0 !important; }
            .mobile-padding { padding: 20px 16px !important; }
            .mobile-header-padding { padding: 24px 16px !important; }
            .mobile-title { font-size: 26px !important; }
            .mobile-subtitle { font-size: 14px !important; }
            .mobile-greeting { font-size: 20px !important; }
            .mobile-text { font-size: 14px !important; line-height: 1.5 !important; }
            .mobile-card-padding { padding: 16px !important; }
            .mobile-details-padding { padding: 16px !important; }
            
            /* Button responsiveness */
            .mobile-button { 
                display: block !important; 
                margin: 12px 0 !important; 
                width: calc(100% - 32px) !important;
                text-align: center !important;
                padding: 16px 20px !important;
                box-sizing: border-box !important;
            }
            
            /* Table cell responsiveness */
            .mobile-table-cell {
                display: block !important;
                width: 100% !important;
                padding: 12px 0 !important;
            }
            
            .mobile-flex {
                display: flex !important;
                justify-content: space-between !important;
                align-items: center !important;
                flex-wrap: wrap !important;
            }
            
            .mobile-flex-item {
                flex: 1 !important;
                min-width: 120px !important;
            }
            
            /* Footer adjustments */
            .mobile-footer-links a {
                display: block !important;
                margin: 8px 0 !important;
                padding: 8px 12px !important;
            }
            
            .mobile-social-icons {
                margin-top: 16px !important;
            }
        }

        /* Tablet styles */
        @media only screen and (max-width: 768px) and (min-width: 601px) {
            .tablet-padding { padding: 24px 20px !important; }
            .tablet-button { 
                margin: 8px 4px !important;
                min-width: 200px !important;
            }
        }

        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
            .dark-mode { background-color: #0f172a !important; color: #f1f5f9 !important; }
            .dark-mode-card { background-color: #1e293b !important; border-color: #334155 !important; }
            .dark-mode-header { background: linear-gradient(135deg, #3730a3 0%, #581c87 100%) !important; }
        }

        /* Hover effects */
        .btn-primary:hover { 
            transform: translateY(-2px); 
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6) !important;
        }
        .btn-secondary:hover { 
            transform: translateY(-2px); 
            box-shadow: 0 8px 25px rgba(72, 187, 120, 0.6) !important;
        }

        /* Animation for urgency */
        .urgent-pulse {
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(229, 62, 62, 0.7); }
            70% { box-shadow: 0 0 0 10px rgba(229, 62, 62, 0); }
            100% { box-shadow: 0 0 0 0 rgba(229, 62, 62, 0); }
        }

        /* Improved spacing utilities */
        .spacing-sm { margin-bottom: 16px !important; }
        .spacing-md { margin-bottom: 24px !important; }
        .spacing-lg { margin-bottom: 32px !important; }
        .spacing-xl { margin-bottom: 40px !important; }
    </style>
</head>
<body class="dark-mode" style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6;">
    
    <div class="container" style="max-width: 600px; margin: 0 auto; background-color: #f8fafc; padding: 20px 10px;">
        
        <!-- Main Container -->
        <table class="main-table dark-mode-card" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1); border: 1px solid #e2e8f0;">
            
            <!-- Header -->
            <tr>
                <td class="dark-mode-header mobile-header-padding tablet-padding" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%); text-align: center; padding: 40px 20px; position: relative;">
                    
                    <!-- Decorative elements -->
                    <div style="position: absolute; top: 10px; right: 20px; width: 60px; height: 60px; background: rgba(255,255,255,0.1); border-radius: 50%; opacity: 0.3;"></div>
                    <div style="position: absolute; bottom: 15px; left: 30px; width: 40px; height: 40px; background: rgba(255,255,255,0.1); border-radius: 50%; opacity: 0.2;"></div>
                    
                    <!-- Logo/Icon -->
                    <div style="background: rgba(255,255,255,0.2); width: 60px; height: 60px; border-radius: 50%; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center;">
                        <span style="font-size: 24px;">🚀</span>
                    </div>
                    
                    <h1 class="mobile-title" style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -0.5px; text-shadow: 0 4px 8px rgba(0,0,0,0.2);">
                        Kushwaha Services
                    </h1>
                    <p class="mobile-subtitle" style="color: rgba(255,255,255,0.9); margin: 8px 0 0; font-size: 16px; font-weight: 400;">
                        Subscription Management Portal
                    </p>
                </td>
            </tr>
            
            <!-- Content Section -->
            <tr>
                <td class="mobile-padding tablet-padding" style="padding: 40px 32px;">
                    
                    <!-- Greeting -->
                    <h2 class="mobile-greeting spacing-md" style="color: #1a202c; margin: 0 0 24px; font-size: 24px; font-weight: 600; line-height: 1.3;">
                        Hey ${userName}! 👋
                    </h2>
                    
                    <!-- Urgency Alert -->
                    <div class="${daysLeft <= 2 ? 'urgent-pulse' : ''} spacing-lg" style="
                        background: ${daysLeft <= 2 
                            ? 'linear-gradient(135deg, #fed7d7 0%, #feb2b2 100%)' 
                            : daysLeft <= 5 
                                ? 'linear-gradient(135deg, #fef3cd 0%, #fde68a 100%)'
                                : 'linear-gradient(135deg, #e6fffa 0%, #b2f5ea 100%)'}; 
                        border-left: 4px solid ${daysLeft <= 2 ? '#e53e3e' : daysLeft <= 5 ? '#f59e0b' : '#38b2ac'}; 
                        padding: 24px; 
                        border-radius: 12px; 
                        margin-bottom: 32px;
                        position: relative;
                        overflow: hidden;">
                        
                        <div style="position: absolute; top: 20px; right: 20px; font-size: 24px;">
                            ${daysLeft <= 2 ? '🚨' : daysLeft <= 5 ? '⚠️' : '📅'}
                        </div>
                        
                        <p class="mobile-text" style="margin: 0; font-size: 17px; line-height: 1.6; color: #2d3748; padding-right: 50px;">
                            Your <strong style="color: #667eea;">${subscriptionName}</strong> subscription will renew on 
                            <strong style="color: ${daysLeft <= 2 ? '#e53e3e' : daysLeft <= 5 ? '#f59e0b' : '#38b2ac'};">${renewalDate}</strong>
                            ${daysLeft === 1 
                                ? ' — that\'s <span style="color: #e53e3e; font-weight: 700;">tomorrow!</span>' 
                                : ` — only <span style="font-weight: 700;">${daysLeft} days</span> away!`}
                        </p>
                    </div>
                    
                    <!-- Enhanced Subscription Details Card -->
                    <div class="dark-mode-card spacing-lg" style="background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%); border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; margin-bottom: 32px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                        
                        <!-- Card Header -->
                        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px 24px; text-align: center; position: relative;">
                            <div style="position: absolute; left: 24px; top: 50%; transform: translateY(-50%); font-size: 20px;">📋</div>
                            <h3 style="margin: 0; font-size: 18px; font-weight: 600;">Subscription Details</h3>
                        </div>
                        
                        <!-- Card Content with Enhanced Spacing -->
                        <div class="mobile-card-padding" style="padding: 24px;">
                            
                            <!-- Plan Details -->
                            <div class="mobile-table-cell spacing-md" style="padding: 20px 0; border-bottom: 1px solid #e2e8f0;">
                                <div class="mobile-flex" style="display: flex; justify-content: space-between; align-items: center;">
                                    <span class="mobile-flex-item" style="font-size: 16px; color: #4a5568; font-weight: 500; display: flex; align-items: center;">
                                        <span style="margin-right: 8px;">📦</span> Plan
                                    </span>
                                    <span class="mobile-flex-item" style="font-size: 16px; color: #2d3748; font-weight: 600; background: #f7fafc; padding: 6px 14px; border-radius: 20px; text-align: right;">${planName}</span>
                                </div>
                            </div>
                            
                            <!-- Price Details with Extra Spacing -->
                            <div class="mobile-table-cell spacing-lg" style="padding: 20px 0; border-bottom: 1px solid #e2e8f0; margin-bottom: 24px;">
                                <div class="mobile-flex" style="display: flex; justify-content: space-between; align-items: center;">
                                    <span class="mobile-flex-item" style="font-size: 16px; color: #4a5568; font-weight: 500; display: flex; align-items: center;">
                                        <span style="margin-right: 8px;">💰</span> Price
                                    </span>
                                    <span class="mobile-flex-item" style="font-size: 20px; color: #667eea; font-weight: 700; text-align: right;">${price}</span>
                                </div>
                                <!-- Additional spacing after price -->
                                <div style="height: 16px;"></div>
                            </div>
                            
                            <!-- Payment Details with Extra Spacing -->
                            <div class="mobile-table-cell spacing-lg" style="padding: 20px 0; margin-bottom: 24px;">
                                <div class="mobile-flex" style="display: flex; justify-content: space-between; align-items: center;">
                                    <span class="mobile-flex-item" style="font-size: 16px; color: #4a5568; font-weight: 500; display: flex; align-items: center;">
                                        <span style="margin-right: 8px;">💳</span> Payment
                                    </span>
                                    <span class="mobile-flex-item" style="font-size: 16px; color: #2d3748; font-weight: 600; background: #f0fff4; padding: 6px 14px; border-radius: 20px; border: 1px solid #9ae6b4; text-align: right;">${paymentMethod}</span>
                                </div>
                                <!-- Additional spacing after payment -->
                                <div style="height: 20px;"></div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Responsive Action Buttons -->
                    <div class="spacing-lg" style="text-align: center; margin-bottom: 32px;">
                        <a href="${accountSettingsLink}" 
                           class="btn-primary mobile-button tablet-button"
                           style="display: inline-block; 
                                  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                                  color: #ffffff; text-decoration: none; padding: 16px 32px; 
                                  border-radius: 12px; font-weight: 600; font-size: 16px; 
                                  margin: 0 8px 12px; 
                                  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
                                  transition: all 0.3s ease;
                                  min-width: 200px;
                                  text-align: center;">
                            ⚙️ Manage Subscription
                        </a>
                        
                        <a href="${supportLink}" 
                           class="btn-secondary mobile-button tablet-button"
                           style="display: inline-block; 
                                  background: linear-gradient(135deg, #48bb78 0%, #38a169 100%); 
                                  color: #ffffff; text-decoration: none; padding: 16px 32px; 
                                  border-radius: 12px; font-weight: 600; font-size: 16px; 
                                  margin: 0 8px 12px; 
                                  box-shadow: 0 6px 20px rgba(72, 187, 120, 0.4);
                                  transition: all 0.3s ease;
                                  min-width: 200px;
                                  text-align: center;">
                            💬 Get Support
                        </a>
                    </div>
                    
                    <!-- Information Box -->
                    <div class="dark-mode-card spacing-md" style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin-bottom: 24px; position: relative;">
                        <div style="position: absolute; top: 24px; right: 24px; font-size: 28px; opacity: 0.3;">💡</div>
                        <h4 style="margin: 0 0 12px; font-size: 16px; font-weight: 600; color: #2d3748;">
                            💡 Need to make changes?
                        </h4>
                        <p class="mobile-text" style="margin: 0; font-size: 15px; line-height: 1.6; color: #4a5568; padding-right: 50px;">
                            You can update your plan, payment method, or cancel anytime from your account settings. 
                            Changes made before the renewal date will take effect immediately.
                        </p>
                    </div>
                    
                    <!-- Sign-off -->
                    <div style="text-align: left; margin-top: 32px; padding-top: 24px; border-top: 2px solid #e2e8f0; background: linear-gradient(90deg, #f7fafc 0%, transparent 100%); padding-left: 20px; border-radius: 8px;">
                        <p style="margin: 0 0 8px; font-size: 16px; color: #2d3748;">
                            Best regards,
                        </p>
                        <p style="margin: 0; font-size: 18px; font-weight: 700; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                            The Kushwaha Team 🚀
                        </p>
                    </div>
                </td>
            </tr>
            
            <!-- Responsive Footer -->
            <tr>
                <td class="dark-mode-card mobile-padding tablet-padding" style="background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%); 
                           padding: 32px; text-align: center; border-top: 1px solid #e2e8f0;">
                    
                    <!-- Company Info -->
                    <div style="background: #ffffff; border-radius: 8px; padding: 20px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                        <p style="margin: 0 0 8px; font-size: 16px; color: #2d3748; font-weight: 600;">
                            Sub Dub Inc. 🏢
                        </p>
                        <p class="mobile-text" style="margin: 0; font-size: 14px; color: #718096; line-height: 1.5;">
                            Near Mayur Vihar, Kolipura, Sehore
                        </p>
                    </div>
                    
                    <!-- Responsive Footer Links -->
                    <div class="mobile-footer-links spacing-md" style="margin-bottom: 20px;">
                        <a href="#" style="color: #667eea; text-decoration: none; font-size: 14px; margin: 0 12px; font-weight: 500; padding: 8px 16px; border-radius: 20px; background: rgba(102, 126, 234, 0.1); transition: all 0.3s ease; display: inline-block;">
                            Unsubscribe
                        </a>
                        <a href="#" style="color: #667eea; text-decoration: none; font-size: 14px; margin: 0 12px; font-weight: 500; padding: 8px 16px; border-radius: 20px; background: rgba(102, 126, 234, 0.1); transition: all 0.3s ease; display: inline-block;">
                            Privacy Policy
                        </a>
                        <a href="#" style="color: #667eea; text-decoration: none; font-size: 14px; margin: 0 12px; font-weight: 500; padding: 8px 16px; border-radius: 20px; background: rgba(102, 126, 234, 0.1); transition: all 0.3s ease; display: inline-block;">
                            Terms of Service
                        </a>
                    </div>
                    
                    <!-- Social Media -->
                    <div class="mobile-social-icons">
                        <p class="mobile-text" style="margin: 0 0 12px; font-size: 13px; color: #a0aec0;">
                            Follow us for updates and tips
                        </p>
                        <div>
                            <a href="#" style="display: inline-block; margin: 0 8px; padding: 8px; background: #667eea; color: white; border-radius: 50%; width: 36px; height: 36px; text-align: center; text-decoration: none;">📧</a>
                            <a href="#" style="display: inline-block; margin: 0 8px; padding: 8px; background: #1da1f2; color: white; border-radius: 50%; width: 36px; height: 36px; text-align: center; text-decoration: none;">🐦</a>
                            <a href="#" style="display: inline-block; margin: 0 8px; padding: 8px; background: #0077b5; color: white; border-radius: 50%; width: 36px; height: 36px; text-align: center; text-decoration: none;">💼</a>
                        </div>
                    </div>
                </td>
            </tr>
        </table>
        
        <!-- Bottom Spacer -->
        <div style="height: 30px;"></div>
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
