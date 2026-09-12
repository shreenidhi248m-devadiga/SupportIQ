import { DepartmentName, PriorityLevel } from '../models/Ticket';

export class RoutingService {
  /**
   * Automatically determines department based on text content and intent keywords
   */
  static determineDepartment(text: string, intent: string): DepartmentName {
    const content = `${text} ${intent}`.toLowerCase();

    if (content.match(/claim|accident|damage|insurance|policy|collision|stolen|injury/i)) {
      return 'Claims';
    }
    if (content.match(/bill|payment|invoice|charge|refund|credit card|pricing|subscription|cost/i)) {
      return 'Billing';
    }
    if (content.match(/error|bug|crash|tech|code|api|login issue|failed|broken|connection|slow/i)) {
      return 'Technical Support';
    }
    if (content.match(/account|profile|password|email change|settings|security|deactivate/i)) {
      return 'Account';
    }
    if (content.match(/help|question|info|inquiry|general/i)) {
      return 'General Support';
    }

    return 'General Support';
  }

  /**
   * Predicts ticket priority level based on sentiment and urgency keywords
   */
  static predictPriority(sentiment: string, sentimentScore: number, text: string): PriorityLevel {
    const content = text.toLowerCase();

    if (content.match(/urgent|emergency|accident|injured|critical|down|blocked|immediately|fraud/i) || sentimentScore < -0.6) {
      return 'critical';
    }
    if (content.match(/frustrated|angry|broken|help needed|failed|refund/i) || sentimentScore < -0.2) {
      return 'high';
    }
    if (content.match(/question|inquiry|update|feature|how to/i) && sentimentScore >= 0.2) {
      return 'low';
    }

    return 'medium';
  }
}
