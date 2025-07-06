const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs').promises;
const handlebars = require('handlebars');

// Create reusable transporter
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Load email template
async function loadTemplate(templateName) {
    const templatePath = path.join(__dirname, '../templates/emails', `${templateName}.hbs`);
    const template = await fs.readFile(templatePath, 'utf-8');
    return handlebars.compile(template);
}

// Send email
async function sendEmail({ to, subject, template, data }) {
    try {
        // Load and compile template
        const compiledTemplate = await loadTemplate(template);
        const html = compiledTemplate(data);

        // Send email
        await transporter.sendMail({
            from: `"Biryani Junction" <${process.env.EMAIL_FROM}>`,
            to,
            subject,
            html
        });

        console.log(`Email sent successfully to ${to}`);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

// Email templates
const emailTemplates = {
    orderConfirmation: async (order) => ({
        subject: 'Order Confirmation - Biryani Junction',
        template: 'orderConfirmation',
        data: {
            orderNumber: order._id,
            items: order.items,
            total: order.totalAmount,
            deliveryAddress: order.deliveryAddress,
            estimatedDeliveryTime: order.estimatedDeliveryTime
        }
    }),

    orderStatusUpdate: async (order) => ({
        subject: `Order Status Update - ${order.orderStatus}`,
        template: 'orderStatusUpdate',
        data: {
            orderNumber: order._id,
            status: order.orderStatus,
            estimatedDeliveryTime: order.estimatedDeliveryTime
        }
    }),

    welcomeEmail: async (user) => ({
        subject: 'Welcome to Biryani Junction!',
        template: 'welcome',
        data: {
            name: user.name
        }
    }),

    passwordReset: async (user, resetToken) => ({
        subject: 'Password Reset Request',
        template: 'passwordReset',
        data: {
            name: user.name,
            resetLink: `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`
        }
    })
};

module.exports = {
    sendEmail,
    emailTemplates
};
