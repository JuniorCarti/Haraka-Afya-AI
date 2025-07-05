
export interface SampleConversation {
  id: string;
  messages: Array<{
    type: 'user' | 'bot';
    content: string;
    timestamp: Date;
  }>;
  category: 'general' | 'symptoms' | 'medication' | 'emergency' | 'appointment';
}

export const sampleConversations: SampleConversation[] = [
  {
    id: '1',
    category: 'symptoms',
    messages: [
      { type: 'user', content: 'I have a persistent headache for 3 days', timestamp: new Date() },
      { type: 'bot', content: 'I understand you\'ve had a headache for 3 days. Can you describe the pain? Is it throbbing, sharp, or dull?', timestamp: new Date() },
      { type: 'user', content: 'It\'s a dull ache on both sides of my head', timestamp: new Date() },
      { type: 'bot', content: 'Based on your symptoms, this could be a tension headache. I recommend staying hydrated, getting adequate rest, and taking over-the-counter pain relief. If it persists beyond 5 days or worsens, please consult a doctor.', timestamp: new Date() }
    ]
  },
  {
    id: '2',
    category: 'medication',
    messages: [
      { type: 'user', content: 'Can I take paracetamol with antibiotics?', timestamp: new Date() },
      { type: 'bot', content: 'Generally, paracetamol can be taken with most antibiotics as there are no known interactions. However, which antibiotic are you currently taking?', timestamp: new Date() },
      { type: 'user', content: 'Amoxicillin 500mg', timestamp: new Date() },
      { type: 'bot', content: 'Yes, paracetamol is safe to take with Amoxicillin. Follow the dosage instructions on both medications. If you experience any unusual symptoms, contact your healthcare provider.', timestamp: new Date() }
    ]
  },
  {
    id: '3',
    category: 'general',
    messages: [
      { type: 'user', content: 'How often should I exercise?', timestamp: new Date() },
      { type: 'bot', content: 'For general health, adults should aim for at least 150 minutes of moderate-intensity aerobic activity per week, plus muscle-strengthening activities 2+ days per week. What\'s your current activity level?', timestamp: new Date() },
      { type: 'user', content: 'I barely exercise, maybe once a week', timestamp: new Date() },
      { type: 'bot', content: 'That\'s a good start! I recommend gradually increasing to 30 minutes of moderate activity 5 days a week. Start with walking, swimming, or cycling. Would you like a personalized exercise plan?', timestamp: new Date() }
    ]
  }
];
