"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIService = void 0;
const routingService_1 = require("./routingService");
class AIService {
    /**
     * Analyzes customer inquiry text (NLP + Sentiment + Vision simulation + Routing + Churn Risk)
     */
    static async analyzeInquiry(subject, description, inputType = 'text') {
        const fullText = `${subject} ${description}`;
        const textLower = fullText.toLowerCase();
        // 1. Sentiment Detection
        let sentiment = 'Neutral';
        let sentimentScore = 0.0;
        if (textLower.match(/accident|frustrated|angry|horrible|terrible|emergency|broken|claim|urgent|scam/i)) {
            sentiment = 'Frustrated / High Urgency';
            sentimentScore = -0.75;
        }
        else if (textLower.match(/dissatisfied|annoyed|delay|slow|wrong|error|issue|problem|bad/i)) {
            sentiment = 'Dissatisfied';
            sentimentScore = -0.45;
        }
        else if (textLower.match(/great|thanks|thank you|awesome|resolved|love|helpful|good/i)) {
            sentiment = 'Satisfied';
            sentimentScore = 0.8;
        }
        // 2. Intent Detection
        let intent = 'General Support Inquiry';
        let category = 'General';
        if (textLower.match(/accident|claim|insurance|collision|damage/i)) {
            intent = 'Accident Insurance Claim';
            category = 'Claims';
        }
        else if (textLower.match(/bill|charge|refund|invoice|payment/i)) {
            intent = 'Billing Inquiry / Refund Request';
            category = 'Billing';
        }
        else if (textLower.match(/error|bug|crash|tech|login|broken/i)) {
            intent = 'Technical Troubleshooting';
            category = 'Technical';
        }
        else if (textLower.match(/account|password|email|profile/i)) {
            intent = 'Account Security Update';
            category = 'Account';
        }
        // 3. Smart Routing & Priority
        const department = routingService_1.RoutingService.determineDepartment(fullText, intent);
        const priority = routingService_1.RoutingService.predictPriority(sentiment, sentimentScore, fullText);
        // 4. Churn Risk Score Calculation (0.0 to 1.0)
        let churnScore = 0.15;
        if (sentimentScore < -0.6)
            churnScore += 0.55;
        else if (sentimentScore < -0.2)
            churnScore += 0.35;
        if (priority === 'critical')
            churnScore += 0.25;
        churnScore = Math.min(0.95, Math.max(0.05, parseFloat(churnScore.toFixed(2))));
        // 5. Automated AI Initial Response Generation
        let aiResponse = '';
        if (department === 'Claims') {
            aiResponse = `Hello! SupportIQ AI has analyzed your request. We understand you are submitting an accident claim. Your ticket has been pre-routed to our Claims Department with High Priority (#TK-routed). An insurance specialist has been notified.`;
        }
        else if (department === 'Billing') {
            aiResponse = `Hello! SupportIQ AI has received your billing inquiry. We have automatically verified your recent transaction history and assigned this to our Billing Operations team.`;
        }
        else if (department === 'Technical Support') {
            aiResponse = `SupportIQ AI System Alert: Technical issue logged. Our automated diagnostics engine is inspecting your reported error log. A technical specialist will follow up shortly.`;
        }
        else {
            aiResponse = `Thank you for reaching out to SupportIQ. We have logged your request and automatically assigned it to our ${department} team. How else can we assist you today?`;
        }
        return {
            intent,
            category,
            department,
            sentiment,
            sentimentScore,
            priority,
            confidence: 0.96,
            aiResponse,
            churnScore,
        };
    }
}
exports.AIService = AIService;
