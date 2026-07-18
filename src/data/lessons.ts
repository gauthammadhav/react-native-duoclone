import { Lesson } from '../types/learning';

export const lessons: Lesson[] = [
  {
    id: 'es_lesson_1',
    unitId: 'es_unit_1',
    title: 'Welcome to Spanish!',
    description: 'Learn to say hello and introduce yourself.',
    order: 1,
    goal: 'Understand basic greetings like Hola and Buenos días.',
    vocabulary: [
      { id: 'es_voc_1', word: 'Hola', translation: 'Hello', pronunciation: 'oh-lah' },
      { id: 'es_voc_2', word: 'Adiós', translation: 'Goodbye', pronunciation: 'ah-dyohs' },
      { id: 'es_voc_3', word: 'Gracias', translation: 'Thank you', pronunciation: 'grah-syahs' },
    ],
    phrases: [
      { id: 'es_phr_1', phrase: 'Hola, ¿cómo estás?', translation: 'Hello, how are you?', pronunciation: 'oh-lah, koh-moh ehs-tahs' },
    ],
    activities: [
      {
        id: 'es_act_1',
        type: 'multiple_choice',
        question: 'Which of these means "Hello"?',
        options: ['Adiós', 'Hola', 'Gracias', 'Por favor'],
        correctAnswerIndex: 1,
      },
      {
        id: 'es_act_2',
        type: 'translation',
        question: 'Translate: "Thank you"',
        correctTranslation: 'Gracias',
        acceptedTranslations: ['Gracias.', 'gracias'],
      },
      {
        id: 'es_act_3',
        type: 'ai_video_teacher',
        question: 'Practice greetings with Teacher Maria',
        teacherName: 'Maria',
        goal: 'The user should successfully say hello and ask how the teacher is doing.',
        systemPrompt: 'You are Maria, a friendly Spanish teacher. The user is a beginner. Start by saying "¡Hola!" and wait for them to respond. If they say hello back, ask them how they are doing. Keep responses short, encouraging, and use simple Spanish vocabulary.',
      },
      {
        id: 'es_act_4',
        type: 'ai_chat',
        question: 'Chat: Order a coffee',
        goal: 'Order a coffee from the barista',
        systemPrompt: 'You are a barista in Madrid. The user is a customer. Greet them and ask what they would like to drink. Expect them to order a coffee. Help them if they make mistakes.',
      }
    ]
  },
  {
    id: 'fr_lesson_1',
    unitId: 'fr_unit_1',
    title: 'First steps in French',
    description: 'Basic greetings',
    order: 1,
    goal: 'Learn Bonjour and Merci',
    vocabulary: [
      { id: 'fr_voc_1', word: 'Bonjour', translation: 'Hello', pronunciation: 'bon-zhoor' },
      { id: 'fr_voc_2', word: 'Merci', translation: 'Thank you', pronunciation: 'mair-see' },
    ],
    phrases: [
      { id: 'fr_phr_1', phrase: 'Bonjour, ça va?', translation: 'Hello, how are you?', pronunciation: 'bon-zhoor, sah vah' },
    ],
    activities: [
      {
        id: 'fr_act_1',
        type: 'multiple_choice',
        question: 'Which of these means "Thank you"?',
        options: ['Bonjour', 'Oui', 'Merci', 'Non'],
        correctAnswerIndex: 2,
      },
      {
        id: 'fr_act_2',
        type: 'ai_video_teacher',
        question: 'Say hello to Pierre',
        teacherName: 'Pierre',
        goal: 'Say hello in French',
        systemPrompt: 'You are Pierre, a French teacher. The user is a beginner. Say "Bonjour" and encourage them to reply.',
      }
    ]
  }
];
