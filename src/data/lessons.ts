import { Lesson } from '../types/learning';

/**
 * Hardcoded lesson data for all supported languages.
 * Each language has at least 6 lessons spread across its units.
 * `imageUrl` is used by the lesson screen as the hero illustration.
 */

// ─────────────────────────────────────────────────────────────────────────────
// Extend the Lesson type locally to carry an image URL for the card/header.
// We keep this file-local so we don't need to change the shared type.
export interface LessonWithImage extends Lesson {
  imageUrl: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// SPANISH
// ─────────────────────────────────────────────────────────────────────────────
const spanishLessons: LessonWithImage[] = [
  {
    id: 'es_lesson_1',
    unitId: 'es_unit_1',
    title: 'Greetings & Introductions',
    description: 'Learn to say hello and introduce yourself.',
    order: 1,
    goal: 'Understand basic greetings like Hola and Buenos días.',
    imageUrl: 'https://picsum.photos/seed/es_greet/800/400',
    vocabulary: [
      { id: 'es_v1', word: 'Hola', translation: 'Hello', pronunciation: 'oh-lah' },
      { id: 'es_v2', word: 'Adiós', translation: 'Goodbye', pronunciation: 'ah-dyohs' },
      { id: 'es_v3', word: 'Gracias', translation: 'Thank you', pronunciation: 'grah-syahs' },
    ],
    phrases: [
      { id: 'es_p1', phrase: 'Hola, ¿cómo estás?', translation: 'Hello, how are you?', pronunciation: 'oh-lah, koh-moh ehs-tahs' },
    ],
    activities: [
      {
        id: 'es_a1', type: 'multiple_choice',
        question: 'Which means "Hello"?',
        options: ['Adiós', 'Hola', 'Gracias', 'Por favor'],
        correctAnswerIndex: 1,
      },
      {
        id: 'es_a2', type: 'translation',
        question: 'Translate: "Thank you"',
        correctTranslation: 'Gracias',
        acceptedTranslations: ['Gracias.', 'gracias'],
      },
      {
        id: 'es_a3', type: 'ai_video_teacher',
        question: 'Practice greetings with Teacher Maria',
        teacherName: 'Maria',
        goal: 'Say hello and ask how the teacher is doing.',
        systemPrompt: 'You are Maria, a friendly Spanish teacher. Start by saying "¡Hola!" and wait for the user to respond.',
      },
    ],
  },
  {
    id: 'es_lesson_2',
    unitId: 'es_unit_1',
    title: 'Daily Life',
    description: 'Talk about your everyday routine.',
    order: 2,
    goal: 'Describe what you do every day.',
    imageUrl: 'https://picsum.photos/seed/es_daily/800/400',
    vocabulary: [
      { id: 'es_v4', word: 'desayuno', translation: 'breakfast', pronunciation: 'deh-sah-yoo-noh' },
      { id: 'es_v5', word: 'trabajo', translation: 'work', pronunciation: 'trah-bah-hoh' },
      { id: 'es_v6', word: 'casa', translation: 'home', pronunciation: 'kah-sah' },
    ],
    phrases: [
      { id: 'es_p2', phrase: 'Voy al trabajo.', translation: 'I go to work.', pronunciation: 'boy ahl trah-bah-hoh' },
    ],
    activities: [
      {
        id: 'es_a4', type: 'multiple_choice',
        question: 'What does "trabajo" mean?',
        options: ['breakfast', 'home', 'work', 'school'],
        correctAnswerIndex: 2,
      },
    ],
  },
  {
    id: 'es_lesson_3',
    unitId: 'es_unit_1',
    title: 'At the Café',
    description: 'Order drinks and snacks like a local.',
    order: 3,
    goal: 'Order a coffee and a snack in Spanish.',
    imageUrl: 'https://picsum.photos/seed/es_cafe/800/400',
    vocabulary: [
      { id: 'es_v7', word: 'café', translation: 'coffee', pronunciation: 'kah-feh' },
      { id: 'es_v8', word: 'por favor', translation: 'please', pronunciation: 'por fah-bor' },
      { id: 'es_v9', word: 'la cuenta', translation: 'the bill', pronunciation: 'lah kwehn-tah' },
    ],
    phrases: [
      { id: 'es_p3', phrase: 'Un café, por favor.', translation: 'A coffee, please.', pronunciation: 'oon kah-feh, por fah-bor' },
    ],
    activities: [
      {
        id: 'es_a5', type: 'ai_chat',
        question: 'Order a coffee from the barista',
        goal: 'Successfully order a coffee and ask for the bill.',
        systemPrompt: 'You are a barista in Madrid. Greet the customer and take their order. Help them if they make mistakes.',
      },
    ],
  },
  {
    id: 'es_lesson_4',
    unitId: 'es_unit_2',
    title: 'Travel & Directions',
    description: 'Ask for and give directions around the city.',
    order: 4,
    goal: 'Ask where the metro station is.',
    imageUrl: 'https://picsum.photos/seed/es_travel/800/400',
    vocabulary: [
      { id: 'es_v10', word: 'calle', translation: 'street', pronunciation: 'kah-yeh' },
      { id: 'es_v11', word: 'izquierda', translation: 'left', pronunciation: 'ees-kyehr-dah' },
      { id: 'es_v12', word: 'derecha', translation: 'right', pronunciation: 'deh-reh-chah' },
    ],
    phrases: [
      { id: 'es_p4', phrase: '¿Dónde está el metro?', translation: 'Where is the metro?', pronunciation: 'don-deh ehs-tah el meh-troh' },
    ],
    activities: [
      {
        id: 'es_a6', type: 'multiple_choice',
        question: 'What does "izquierda" mean?',
        options: ['right', 'straight', 'left', 'back'],
        correctAnswerIndex: 2,
      },
    ],
  },
  {
    id: 'es_lesson_5',
    unitId: 'es_unit_2',
    title: 'Shopping',
    description: 'Buy clothes and groceries in a market.',
    order: 5,
    goal: 'Ask how much something costs and buy it.',
    imageUrl: 'https://picsum.photos/seed/es_shop/800/400',
    vocabulary: [
      { id: 'es_v13', word: '¿Cuánto cuesta?', translation: 'How much is it?', pronunciation: 'kwan-toh kwes-tah' },
      { id: 'es_v14', word: 'barato', translation: 'cheap', pronunciation: 'bah-rah-toh' },
      { id: 'es_v15', word: 'caro', translation: 'expensive', pronunciation: 'kah-roh' },
    ],
    phrases: [
      { id: 'es_p5', phrase: '¿Cuánto cuesta esto?', translation: 'How much does this cost?', pronunciation: 'kwan-toh kwes-tah ehs-toh' },
    ],
    activities: [
      {
        id: 'es_a7', type: 'translation',
        question: 'Translate: "How much is it?"',
        correctTranslation: '¿Cuánto cuesta?',
        acceptedTranslations: ['¿cuánto cuesta?', 'cuanto cuesta'],
      },
    ],
  },
  {
    id: 'es_lesson_6',
    unitId: 'es_unit_2',
    title: 'Family & Friends',
    description: 'Talk about your family and relationships.',
    order: 6,
    goal: 'Introduce your family members in Spanish.',
    imageUrl: 'https://picsum.photos/seed/es_family/800/400',
    vocabulary: [
      { id: 'es_v16', word: 'familia', translation: 'family', pronunciation: 'fah-mee-lyah' },
      { id: 'es_v17', word: 'madre', translation: 'mother', pronunciation: 'mah-dreh' },
      { id: 'es_v18', word: 'padre', translation: 'father', pronunciation: 'pah-dreh' },
    ],
    phrases: [
      { id: 'es_p6', phrase: 'Mi familia es grande.', translation: 'My family is big.', pronunciation: 'mee fah-mee-lyah ehs grahn-deh' },
    ],
    activities: [
      {
        id: 'es_a8', type: 'multiple_choice',
        question: 'What does "madre" mean?',
        options: ['father', 'sister', 'mother', 'brother'],
        correctAnswerIndex: 2,
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// FRENCH
// ─────────────────────────────────────────────────────────────────────────────
const frenchLessons: LessonWithImage[] = [
  {
    id: 'fr_lesson_1',
    unitId: 'fr_unit_1',
    title: 'Greetings & Introductions',
    description: 'Learn essential French greetings.',
    order: 1,
    goal: 'Say Bonjour and introduce yourself.',
    imageUrl: 'https://picsum.photos/seed/fr_greet/800/400',
    vocabulary: [
      { id: 'fr_v1', word: 'Bonjour', translation: 'Hello', pronunciation: 'bon-zhoor' },
      { id: 'fr_v2', word: 'Merci', translation: 'Thank you', pronunciation: 'mair-see' },
      { id: 'fr_v3', word: 'Au revoir', translation: 'Goodbye', pronunciation: 'oh ruh-vwahr' },
    ],
    phrases: [
      { id: 'fr_p1', phrase: 'Bonjour, ça va?', translation: 'Hello, how are you?', pronunciation: 'bon-zhoor, sah vah' },
    ],
    activities: [
      {
        id: 'fr_a1', type: 'multiple_choice',
        question: 'Which means "Thank you"?',
        options: ['Bonjour', 'Oui', 'Merci', 'Non'],
        correctAnswerIndex: 2,
      },
      {
        id: 'fr_a2', type: 'ai_video_teacher',
        question: 'Say hello to Pierre',
        teacherName: 'Pierre',
        goal: 'Say hello in French',
        systemPrompt: 'You are Pierre, a French teacher. Say "Bonjour" and encourage them to reply.',
      },
    ],
  },
  {
    id: 'fr_lesson_2',
    unitId: 'fr_unit_1',
    title: 'Daily Life',
    description: 'Describe your everyday routine in French.',
    order: 2,
    goal: 'Talk about what you do each day.',
    imageUrl: 'https://picsum.photos/seed/fr_daily/800/400',
    vocabulary: [
      { id: 'fr_v4', word: 'matin', translation: 'morning', pronunciation: 'mah-tan' },
      { id: 'fr_v5', word: 'travail', translation: 'work', pronunciation: 'trah-vye' },
      { id: 'fr_v6', word: 'maison', translation: 'home', pronunciation: 'meh-zohn' },
    ],
    phrases: [
      { id: 'fr_p2', phrase: 'Je vais au travail.', translation: 'I go to work.', pronunciation: 'zhuh vay oh trah-vye' },
    ],
    activities: [
      {
        id: 'fr_a3', type: 'translation',
        question: 'Translate: "morning"',
        correctTranslation: 'matin',
        acceptedTranslations: ['matin'],
      },
    ],
  },
  {
    id: 'fr_lesson_3',
    unitId: 'fr_unit_1',
    title: 'At the Café',
    description: 'Order coffee and pastries in a Parisian café.',
    order: 3,
    goal: 'Order a café au lait and a croissant.',
    imageUrl: 'https://picsum.photos/seed/fr_cafe/800/400',
    vocabulary: [
      { id: 'fr_v7', word: 'café au lait', translation: 'coffee with milk', pronunciation: 'kah-fay oh lay' },
      { id: 'fr_v8', word: 'croissant', translation: 'croissant', pronunciation: 'kwah-sahn' },
      { id: 'fr_v9', word: "s'il vous plaît", translation: 'please', pronunciation: 'seel voo pleh' },
    ],
    phrases: [
      { id: 'fr_p3', phrase: "Un café, s'il vous plaît.", translation: 'A coffee, please.', pronunciation: "uhn kah-fay, seel voo pleh" },
    ],
    activities: [
      {
        id: 'fr_a4', type: 'ai_chat',
        question: 'Order in a Parisian café',
        goal: 'Order a café au lait and a croissant.',
        systemPrompt: 'You are a waiter at a Parisian café. Greet the customer and take their order in French.',
      },
    ],
  },
  {
    id: 'fr_lesson_4',
    unitId: 'fr_unit_2',
    title: 'Travel & Directions',
    description: 'Navigate Paris using French directions.',
    order: 4,
    goal: 'Ask for directions to the Eiffel Tower.',
    imageUrl: 'https://picsum.photos/seed/fr_travel/800/400',
    vocabulary: [
      { id: 'fr_v10', word: 'rue', translation: 'street', pronunciation: 'roo' },
      { id: 'fr_v11', word: 'gauche', translation: 'left', pronunciation: 'gohsh' },
      { id: 'fr_v12', word: 'droite', translation: 'right', pronunciation: 'drwaht' },
    ],
    phrases: [
      { id: 'fr_p4', phrase: 'Où est la Tour Eiffel?', translation: 'Where is the Eiffel Tower?', pronunciation: 'oo eh lah toor eh-fehl' },
    ],
    activities: [
      {
        id: 'fr_a5', type: 'multiple_choice',
        question: 'What does "gauche" mean?',
        options: ['right', 'straight', 'back', 'left'],
        correctAnswerIndex: 3,
      },
    ],
  },
  {
    id: 'fr_lesson_5',
    unitId: 'fr_unit_2',
    title: 'Shopping',
    description: 'Shop for clothes and gifts in French.',
    order: 5,
    goal: 'Ask how much something costs and buy it.',
    imageUrl: 'https://picsum.photos/seed/fr_shop/800/400',
    vocabulary: [
      { id: 'fr_v13', word: 'combien', translation: 'how much', pronunciation: 'kom-byaN' },
      { id: 'fr_v14', word: 'cher', translation: 'expensive', pronunciation: 'shair' },
      { id: 'fr_v15', word: 'bon marché', translation: 'cheap', pronunciation: 'bohn mar-shay' },
    ],
    phrases: [
      { id: 'fr_p5', phrase: "C'est combien?", translation: 'How much is it?', pronunciation: "say kom-byaN" },
    ],
    activities: [
      {
        id: 'fr_a6', type: 'translation',
        question: 'Translate: "How much is it?"',
        correctTranslation: "C'est combien?",
        acceptedTranslations: ["c'est combien?", "c'est combien"],
      },
    ],
  },
  {
    id: 'fr_lesson_6',
    unitId: 'fr_unit_2',
    title: 'Family & Friends',
    description: 'Describe your family in French.',
    order: 6,
    goal: 'Introduce your family members in French.',
    imageUrl: 'https://picsum.photos/seed/fr_family/800/400',
    vocabulary: [
      { id: 'fr_v16', word: 'famille', translation: 'family', pronunciation: 'fah-mee' },
      { id: 'fr_v17', word: 'mère', translation: 'mother', pronunciation: 'mair' },
      { id: 'fr_v18', word: 'père', translation: 'father', pronunciation: 'pair' },
    ],
    phrases: [
      { id: 'fr_p6', phrase: 'Ma famille est grande.', translation: 'My family is big.', pronunciation: 'mah fah-mee eh grrahnd' },
    ],
    activities: [
      {
        id: 'fr_a7', type: 'multiple_choice',
        question: 'What does "mère" mean?',
        options: ['father', 'brother', 'sister', 'mother'],
        correctAnswerIndex: 3,
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// JAPANESE
// ─────────────────────────────────────────────────────────────────────────────
const japaneseLessons: LessonWithImage[] = [
  {
    id: 'ja_lesson_1',
    unitId: 'ja_unit_1',
    title: 'Greetings & Introductions',
    description: 'Learn essential Japanese greetings.',
    order: 1,
    goal: 'Say Konnichiwa and introduce yourself.',
    imageUrl: 'https://picsum.photos/seed/ja_greet/800/400',
    vocabulary: [
      { id: 'ja_v1', word: 'こんにちは', translation: 'Hello', pronunciation: 'kon-ni-chi-wa' },
      { id: 'ja_v2', word: 'ありがとう', translation: 'Thank you', pronunciation: 'a-ri-ga-to' },
      { id: 'ja_v3', word: 'さようなら', translation: 'Goodbye', pronunciation: 'sa-yo-na-ra' },
    ],
    phrases: [
      { id: 'ja_p1', phrase: 'はじめまして', translation: 'Nice to meet you', pronunciation: 'ha-ji-me-ma-shi-te' },
    ],
    activities: [
      {
        id: 'ja_a1', type: 'multiple_choice',
        question: 'Which means "Hello"?',
        options: ['さようなら', 'ありがとう', 'こんにちは', 'おはよう'],
        correctAnswerIndex: 2,
      },
    ],
  },
  {
    id: 'ja_lesson_2',
    unitId: 'ja_unit_1',
    title: 'Numbers & Counting',
    description: 'Count from 1 to 10 in Japanese.',
    order: 2,
    goal: 'Count objects using Japanese numbers.',
    imageUrl: 'https://picsum.photos/seed/ja_numbers/800/400',
    vocabulary: [
      { id: 'ja_v4', word: 'いち', translation: '1', pronunciation: 'i-chi' },
      { id: 'ja_v5', word: 'に', translation: '2', pronunciation: 'ni' },
      { id: 'ja_v6', word: 'さん', translation: '3', pronunciation: 'san' },
    ],
    phrases: [
      { id: 'ja_p2', phrase: 'いくらですか？', translation: 'How much is it?', pronunciation: 'i-ku-ra-de-su-ka' },
    ],
    activities: [
      {
        id: 'ja_a2', type: 'multiple_choice',
        question: 'Which means "3"?',
        options: ['いち', 'に', 'さん', 'よん'],
        correctAnswerIndex: 2,
      },
    ],
  },
  {
    id: 'ja_lesson_3',
    unitId: 'ja_unit_1',
    title: 'At the Restaurant',
    description: 'Order ramen and sushi like a local.',
    order: 3,
    goal: 'Order food in a Japanese restaurant.',
    imageUrl: 'https://picsum.photos/seed/ja_restaurant/800/400',
    vocabulary: [
      { id: 'ja_v7', word: 'ラーメン', translation: 'ramen', pronunciation: 'ra-men' },
      { id: 'ja_v8', word: 'ください', translation: 'please give me', pronunciation: 'ku-da-sa-i' },
      { id: 'ja_v9', word: 'おいしい', translation: 'delicious', pronunciation: 'o-i-shi-i' },
    ],
    phrases: [
      { id: 'ja_p3', phrase: 'ラーメンをください。', translation: 'Please give me ramen.', pronunciation: 'ra-men wo ku-da-sa-i' },
    ],
    activities: [
      {
        id: 'ja_a3', type: 'ai_chat',
        question: 'Order at a ramen shop',
        goal: 'Order ramen and pay the bill in Japanese.',
        systemPrompt: 'You are a ramen shop owner in Tokyo. Greet the customer in Japanese and take their order.',
      },
    ],
  },
  {
    id: 'ja_lesson_4',
    unitId: 'ja_unit_2',
    title: 'Travel & Directions',
    description: 'Navigate Tokyo using Japanese.',
    order: 4,
    goal: 'Ask how to get to Shibuya station.',
    imageUrl: 'https://picsum.photos/seed/ja_travel/800/400',
    vocabulary: [
      { id: 'ja_v10', word: '駅', translation: 'station', pronunciation: 'e-ki' },
      { id: 'ja_v11', word: 'みぎ', translation: 'right', pronunciation: 'mi-gi' },
      { id: 'ja_v12', word: 'ひだり', translation: 'left', pronunciation: 'hi-da-ri' },
    ],
    phrases: [
      { id: 'ja_p4', phrase: '渋谷駅はどこですか？', translation: 'Where is Shibuya station?', pronunciation: 'shi-bu-ya e-ki wa do-ko de-su-ka' },
    ],
    activities: [
      {
        id: 'ja_a4', type: 'multiple_choice',
        question: 'What does "みぎ" mean?',
        options: ['left', 'straight', 'right', 'back'],
        correctAnswerIndex: 2,
      },
    ],
  },
  {
    id: 'ja_lesson_5',
    unitId: 'ja_unit_2',
    title: 'Shopping',
    description: 'Shop in Akihabara and Harajuku.',
    order: 5,
    goal: 'Ask for the price and buy items in Japanese.',
    imageUrl: 'https://picsum.photos/seed/ja_shop/800/400',
    vocabulary: [
      { id: 'ja_v13', word: 'いくら', translation: 'how much', pronunciation: 'i-ku-ra' },
      { id: 'ja_v14', word: 'やすい', translation: 'cheap', pronunciation: 'ya-su-i' },
      { id: 'ja_v15', word: 'たかい', translation: 'expensive', pronunciation: 'ta-ka-i' },
    ],
    phrases: [
      { id: 'ja_p5', phrase: 'これはいくらですか？', translation: 'How much is this?', pronunciation: 'ko-re wa i-ku-ra de-su-ka' },
    ],
    activities: [
      {
        id: 'ja_a5', type: 'translation',
        question: 'Translate: "How much is this?"',
        correctTranslation: 'これはいくらですか？',
        acceptedTranslations: ['これはいくらですか', 'これはいくらですか？'],
      },
    ],
  },
  {
    id: 'ja_lesson_6',
    unitId: 'ja_unit_2',
    title: 'Family & Friends',
    description: 'Describe your family in Japanese.',
    order: 6,
    goal: 'Introduce your family members.',
    imageUrl: 'https://picsum.photos/seed/ja_family/800/400',
    vocabulary: [
      { id: 'ja_v16', word: 'かぞく', translation: 'family', pronunciation: 'ka-zo-ku' },
      { id: 'ja_v17', word: 'おかあさん', translation: 'mother', pronunciation: 'o-ka-a-san' },
      { id: 'ja_v18', word: 'おとうさん', translation: 'father', pronunciation: 'o-to-u-san' },
    ],
    phrases: [
      { id: 'ja_p6', phrase: 'わたしのかぞくは五人です。', translation: 'My family has 5 people.', pronunciation: 'wa-ta-shi no ka-zo-ku wa go-nin de-su' },
    ],
    activities: [
      {
        id: 'ja_a6', type: 'multiple_choice',
        question: 'What does "おかあさん" mean?',
        options: ['father', 'brother', 'mother', 'sister'],
        correctAnswerIndex: 2,
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// GERMAN
// ─────────────────────────────────────────────────────────────────────────────
const germanLessons: LessonWithImage[] = [
  {
    id: 'de_lesson_1',
    unitId: 'de_unit_1',
    title: 'Greetings & Introductions',
    description: 'Say hello and introduce yourself in German.',
    order: 1,
    goal: 'Use Hallo and Guten Morgen correctly.',
    imageUrl: 'https://picsum.photos/seed/de_greet/800/400',
    vocabulary: [
      { id: 'de_v1', word: 'Hallo', translation: 'Hello', pronunciation: 'ha-lo' },
      { id: 'de_v2', word: 'Danke', translation: 'Thank you', pronunciation: 'dan-ke' },
      { id: 'de_v3', word: 'Tschüss', translation: 'Goodbye', pronunciation: 'choos' },
    ],
    phrases: [
      { id: 'de_p1', phrase: 'Wie heißt du?', translation: 'What is your name?', pronunciation: 'vee hysst doo' },
    ],
    activities: [
      {
        id: 'de_a1', type: 'multiple_choice',
        question: 'Which means "Thank you"?',
        options: ['Hallo', 'Bitte', 'Danke', 'Ja'],
        correctAnswerIndex: 2,
      },
    ],
  },
  {
    id: 'de_lesson_2',
    unitId: 'de_unit_1',
    title: 'Daily Life',
    description: 'Describe your daily routine in German.',
    order: 2,
    goal: 'Talk about morning and evening routines.',
    imageUrl: 'https://picsum.photos/seed/de_daily/800/400',
    vocabulary: [
      { id: 'de_v4', word: 'Morgen', translation: 'morning', pronunciation: 'mor-gen' },
      { id: 'de_v5', word: 'Arbeit', translation: 'work', pronunciation: 'ar-byt' },
      { id: 'de_v6', word: 'Haus', translation: 'home', pronunciation: 'hows' },
    ],
    phrases: [
      { id: 'de_p2', phrase: 'Ich gehe zur Arbeit.', translation: 'I go to work.', pronunciation: 'ikh gay-uh tsoor ar-byt' },
    ],
    activities: [
      {
        id: 'de_a2', type: 'translation',
        question: 'Translate: "morning"',
        correctTranslation: 'Morgen',
        acceptedTranslations: ['morgen', 'Morgen'],
      },
    ],
  },
  {
    id: 'de_lesson_3',
    unitId: 'de_unit_1',
    title: 'At the Café',
    description: 'Order Kaffee und Kuchen in German.',
    order: 3,
    goal: 'Order coffee and cake at a German café.',
    imageUrl: 'https://picsum.photos/seed/de_cafe/800/400',
    vocabulary: [
      { id: 'de_v7', word: 'Kaffee', translation: 'coffee', pronunciation: 'ka-fay' },
      { id: 'de_v8', word: 'bitte', translation: 'please', pronunciation: 'bi-teh' },
      { id: 'de_v9', word: 'die Rechnung', translation: 'the bill', pronunciation: 'dee rech-noong' },
    ],
    phrases: [
      { id: 'de_p3', phrase: 'Einen Kaffee, bitte.', translation: 'A coffee, please.', pronunciation: 'eye-nen ka-fay, bi-teh' },
    ],
    activities: [
      {
        id: 'de_a3', type: 'ai_chat',
        question: 'Order at a German café',
        goal: 'Order coffee and ask for the bill.',
        systemPrompt: 'You are a waiter at a café in Berlin. Greet the customer and take their order in German.',
      },
    ],
  },
  {
    id: 'de_lesson_4',
    unitId: 'de_unit_2',
    title: 'Travel & Directions',
    description: 'Navigate German cities with ease.',
    order: 4,
    goal: 'Ask for directions to the train station.',
    imageUrl: 'https://picsum.photos/seed/de_travel/800/400',
    vocabulary: [
      { id: 'de_v10', word: 'Bahnhof', translation: 'train station', pronunciation: 'bahn-hof' },
      { id: 'de_v11', word: 'links', translation: 'left', pronunciation: 'links' },
      { id: 'de_v12', word: 'rechts', translation: 'right', pronunciation: 'rechts' },
    ],
    phrases: [
      { id: 'de_p4', phrase: 'Wo ist der Bahnhof?', translation: 'Where is the train station?', pronunciation: 'voh ist dehr bahn-hof' },
    ],
    activities: [
      {
        id: 'de_a4', type: 'multiple_choice',
        question: 'What does "links" mean?',
        options: ['right', 'straight', 'back', 'left'],
        correctAnswerIndex: 3,
      },
    ],
  },
  {
    id: 'de_lesson_5',
    unitId: 'de_unit_2',
    title: 'Shopping',
    description: 'Shop at a German market.',
    order: 5,
    goal: 'Ask for prices and make a purchase in German.',
    imageUrl: 'https://picsum.photos/seed/de_shop/800/400',
    vocabulary: [
      { id: 'de_v13', word: 'Wie viel kostet das?', translation: 'How much does this cost?', pronunciation: 'vee feel kos-tet das' },
      { id: 'de_v14', word: 'billig', translation: 'cheap', pronunciation: 'bi-lig' },
      { id: 'de_v15', word: 'teuer', translation: 'expensive', pronunciation: 'toy-er' },
    ],
    phrases: [
      { id: 'de_p5', phrase: 'Wie viel kostet das?', translation: 'How much does this cost?', pronunciation: 'vee feel kos-tet das' },
    ],
    activities: [
      {
        id: 'de_a5', type: 'translation',
        question: 'Translate: "expensive"',
        correctTranslation: 'teuer',
        acceptedTranslations: ['teuer', 'Teuer'],
      },
    ],
  },
  {
    id: 'de_lesson_6',
    unitId: 'de_unit_2',
    title: 'Family & Friends',
    description: 'Describe your family in German.',
    order: 6,
    goal: 'Introduce your family members in German.',
    imageUrl: 'https://picsum.photos/seed/de_family/800/400',
    vocabulary: [
      { id: 'de_v16', word: 'Familie', translation: 'family', pronunciation: 'fa-mi-lee-eh' },
      { id: 'de_v17', word: 'Mutter', translation: 'mother', pronunciation: 'moo-ter' },
      { id: 'de_v18', word: 'Vater', translation: 'father', pronunciation: 'fa-ter' },
    ],
    phrases: [
      { id: 'de_p6', phrase: 'Meine Familie ist groß.', translation: 'My family is big.', pronunciation: 'my-neh fa-mi-lee-eh ist grohs' },
    ],
    activities: [
      {
        id: 'de_a6', type: 'multiple_choice',
        question: 'What does "Mutter" mean?',
        options: ['father', 'brother', 'sister', 'mother'],
        correctAnswerIndex: 3,
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// ITALIAN
// ─────────────────────────────────────────────────────────────────────────────
const italianLessons: LessonWithImage[] = [
  {
    id: 'it_lesson_1',
    unitId: 'it_unit_1',
    title: 'Greetings & Introductions',
    description: 'Learn Italian greetings.',
    order: 1,
    goal: 'Say Ciao and introduce yourself.',
    imageUrl: 'https://picsum.photos/seed/it_greet/800/400',
    vocabulary: [
      { id: 'it_v1', word: 'Ciao', translation: 'Hello/Bye', pronunciation: 'chow' },
      { id: 'it_v2', word: 'Grazie', translation: 'Thank you', pronunciation: 'gra-tsye' },
      { id: 'it_v3', word: 'Arrivederci', translation: 'Goodbye', pronunciation: 'a-ree-veh-dehr-chee' },
    ],
    phrases: [
      { id: 'it_p1', phrase: 'Come stai?', translation: 'How are you?', pronunciation: 'ko-meh sta-ee' },
    ],
    activities: [
      {
        id: 'it_a1', type: 'multiple_choice',
        question: 'Which means "Thank you"?',
        options: ['Ciao', 'Sì', 'Grazie', 'No'],
        correctAnswerIndex: 2,
      },
    ],
  },
  {
    id: 'it_lesson_2',
    unitId: 'it_unit_1',
    title: 'Daily Life',
    description: 'Talk about your Italian daily routine.',
    order: 2,
    goal: 'Describe morning and evening habits.',
    imageUrl: 'https://picsum.photos/seed/it_daily/800/400',
    vocabulary: [
      { id: 'it_v4', word: 'mattina', translation: 'morning', pronunciation: 'ma-tee-nah' },
      { id: 'it_v5', word: 'lavoro', translation: 'work', pronunciation: 'la-vo-ro' },
      { id: 'it_v6', word: 'casa', translation: 'home', pronunciation: 'ka-zah' },
    ],
    phrases: [
      { id: 'it_p2', phrase: 'Vado al lavoro.', translation: 'I go to work.', pronunciation: 'va-do ahl la-vo-ro' },
    ],
    activities: [
      {
        id: 'it_a2', type: 'translation',
        question: 'Translate: "morning"',
        correctTranslation: 'mattina',
        acceptedTranslations: ['mattina', 'la mattina'],
      },
    ],
  },
  {
    id: 'it_lesson_3',
    unitId: 'it_unit_1',
    title: 'At the Café',
    description: 'Order espresso and pastries Italian style.',
    order: 3,
    goal: 'Order un espresso at an Italian bar.',
    imageUrl: 'https://picsum.photos/seed/it_cafe/800/400',
    vocabulary: [
      { id: 'it_v7', word: 'espresso', translation: 'espresso', pronunciation: 'es-pres-so' },
      { id: 'it_v8', word: 'per favore', translation: 'please', pronunciation: 'pehr fa-vo-reh' },
      { id: 'it_v9', word: 'il conto', translation: 'the bill', pronunciation: 'eel kon-to' },
    ],
    phrases: [
      { id: 'it_p3', phrase: 'Un espresso, per favore.', translation: 'An espresso, please.', pronunciation: 'oon es-pres-so, pehr fa-vo-reh' },
    ],
    activities: [
      {
        id: 'it_a3', type: 'ai_chat',
        question: 'Order at an Italian bar',
        goal: 'Order an espresso and pay the bill.',
        systemPrompt: 'You are a barista at a bar in Rome. Greet customers and take their order in Italian.',
      },
    ],
  },
  {
    id: 'it_lesson_4',
    unitId: 'it_unit_2',
    title: 'Travel & Directions',
    description: 'Navigate Rome and Florence.',
    order: 4,
    goal: 'Ask for directions to the Colosseum.',
    imageUrl: 'https://picsum.photos/seed/it_travel/800/400',
    vocabulary: [
      { id: 'it_v10', word: 'via', translation: 'street', pronunciation: 'vee-ah' },
      { id: 'it_v11', word: 'sinistra', translation: 'left', pronunciation: 'see-nees-tra' },
      { id: 'it_v12', word: 'destra', translation: 'right', pronunciation: 'des-tra' },
    ],
    phrases: [
      { id: 'it_p4', phrase: 'Dov\'è il Colosseo?', translation: 'Where is the Colosseum?', pronunciation: "do-veh eel ko-lo-seh-oh" },
    ],
    activities: [
      {
        id: 'it_a4', type: 'multiple_choice',
        question: 'What does "sinistra" mean?',
        options: ['right', 'straight', 'left', 'back'],
        correctAnswerIndex: 2,
      },
    ],
  },
  {
    id: 'it_lesson_5',
    unitId: 'it_unit_2',
    title: 'Shopping',
    description: 'Shop for fashion in Milan.',
    order: 5,
    goal: 'Ask for prices and buy Italian goods.',
    imageUrl: 'https://picsum.photos/seed/it_shop/800/400',
    vocabulary: [
      { id: 'it_v13', word: 'quanto costa?', translation: 'how much is it?', pronunciation: 'kwan-to kos-ta' },
      { id: 'it_v14', word: 'economico', translation: 'cheap', pronunciation: 'eh-ko-no-mi-ko' },
      { id: 'it_v15', word: 'caro', translation: 'expensive', pronunciation: 'ka-ro' },
    ],
    phrases: [
      { id: 'it_p5', phrase: 'Quanto costa questo?', translation: 'How much does this cost?', pronunciation: 'kwan-to kos-ta kwes-to' },
    ],
    activities: [
      {
        id: 'it_a5', type: 'translation',
        question: 'Translate: "expensive"',
        correctTranslation: 'caro',
        acceptedTranslations: ['caro', 'Caro'],
      },
    ],
  },
  {
    id: 'it_lesson_6',
    unitId: 'it_unit_2',
    title: 'Family & Friends',
    description: 'Describe your family the Italian way.',
    order: 6,
    goal: 'Introduce your family in Italian.',
    imageUrl: 'https://picsum.photos/seed/it_family/800/400',
    vocabulary: [
      { id: 'it_v16', word: 'famiglia', translation: 'family', pronunciation: 'fa-mee-lya' },
      { id: 'it_v17', word: 'madre', translation: 'mother', pronunciation: 'ma-dreh' },
      { id: 'it_v18', word: 'padre', translation: 'father', pronunciation: 'pa-dreh' },
    ],
    phrases: [
      { id: 'it_p6', phrase: 'La mia famiglia è grande.', translation: 'My family is big.', pronunciation: 'la mee-ah fa-mee-lya eh gran-deh' },
    ],
    activities: [
      {
        id: 'it_a6', type: 'multiple_choice',
        question: 'What does "madre" mean?',
        options: ['father', 'brother', 'sister', 'mother'],
        correctAnswerIndex: 3,
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// KOREAN
// ─────────────────────────────────────────────────────────────────────────────
const koreanLessons: LessonWithImage[] = [
  {
    id: 'ko_lesson_1',
    unitId: 'ko_unit_1',
    title: 'Greetings & Introductions',
    description: 'Say hello in Korean.',
    order: 1,
    goal: 'Use 안녕하세요 correctly.',
    imageUrl: 'https://picsum.photos/seed/ko_greet/800/400',
    vocabulary: [
      { id: 'ko_v1', word: '안녕하세요', translation: 'Hello', pronunciation: 'an-nyeong-ha-se-yo' },
      { id: 'ko_v2', word: '감사합니다', translation: 'Thank you', pronunciation: 'gam-sa-ham-ni-da' },
      { id: 'ko_v3', word: '안녕히 가세요', translation: 'Goodbye', pronunciation: 'an-nyeong-hi ga-se-yo' },
    ],
    phrases: [
      { id: 'ko_p1', phrase: '처음 뵙겠습니다', translation: 'Nice to meet you', pronunciation: 'cheo-eum boep-get-seum-ni-da' },
    ],
    activities: [
      {
        id: 'ko_a1', type: 'multiple_choice',
        question: 'Which means "Hello"?',
        options: ['감사합니다', '안녕하세요', '죄송합니다', '잘 자요'],
        correctAnswerIndex: 1,
      },
    ],
  },
  {
    id: 'ko_lesson_2',
    unitId: 'ko_unit_1',
    title: 'Hangul Basics',
    description: 'Learn the Korean alphabet.',
    order: 2,
    goal: 'Read and write basic Hangul syllables.',
    imageUrl: 'https://picsum.photos/seed/ko_hangul/800/400',
    vocabulary: [
      { id: 'ko_v4', word: '가나다', translation: 'ga na da (first three letters)', pronunciation: 'ga na da' },
      { id: 'ko_v5', word: '한국', translation: 'Korea', pronunciation: 'han-guk' },
      { id: 'ko_v6', word: '한글', translation: 'Hangul', pronunciation: 'han-geul' },
    ],
    phrases: [
      { id: 'ko_p2', phrase: '한글은 쉬워요.', translation: 'Hangul is easy.', pronunciation: 'han-geul-eun swi-wo-yo' },
    ],
    activities: [
      {
        id: 'ko_a2', type: 'multiple_choice',
        question: 'What does "한국" mean?',
        options: ['Japan', 'China', 'Korea', 'USA'],
        correctAnswerIndex: 2,
      },
    ],
  },
  {
    id: 'ko_lesson_3',
    unitId: 'ko_unit_1',
    title: 'At the Restaurant',
    description: 'Order Korean food.',
    order: 3,
    goal: 'Order bibimbap and kimchi in Korean.',
    imageUrl: 'https://picsum.photos/seed/ko_restaurant/800/400',
    vocabulary: [
      { id: 'ko_v7', word: '비빔밥', translation: 'bibimbap', pronunciation: 'bi-bim-bap' },
      { id: 'ko_v8', word: '주세요', translation: 'please give me', pronunciation: 'ju-se-yo' },
      { id: 'ko_v9', word: '맛있어요', translation: 'delicious', pronunciation: 'ma-si-sseo-yo' },
    ],
    phrases: [
      { id: 'ko_p3', phrase: '비빔밥 주세요.', translation: 'Please give me bibimbap.', pronunciation: 'bi-bim-bap ju-se-yo' },
    ],
    activities: [
      {
        id: 'ko_a3', type: 'ai_chat',
        question: 'Order Korean food',
        goal: 'Order bibimbap and pay the bill.',
        systemPrompt: 'You are a server at a Korean restaurant. Greet customers and take their order in Korean.',
      },
    ],
  },
  {
    id: 'ko_lesson_4',
    unitId: 'ko_unit_2',
    title: 'Travel & Directions',
    description: 'Navigate Seoul using Korean.',
    order: 4,
    goal: 'Ask how to get to Gyeongbokgung Palace.',
    imageUrl: 'https://picsum.photos/seed/ko_travel/800/400',
    vocabulary: [
      { id: 'ko_v10', word: '지하철', translation: 'subway', pronunciation: 'ji-ha-cheol' },
      { id: 'ko_v11', word: '왼쪽', translation: 'left', pronunciation: 'oen-jjok' },
      { id: 'ko_v12', word: '오른쪽', translation: 'right', pronunciation: 'o-reun-jjok' },
    ],
    phrases: [
      { id: 'ko_p4', phrase: '경복궁이 어디에요?', translation: 'Where is Gyeongbokgung?', pronunciation: 'gyeong-bok-gung-i eo-di-e-yo' },
    ],
    activities: [
      {
        id: 'ko_a4', type: 'multiple_choice',
        question: 'What does "왼쪽" mean?',
        options: ['right', 'straight', 'left', 'back'],
        correctAnswerIndex: 2,
      },
    ],
  },
  {
    id: 'ko_lesson_5',
    unitId: 'ko_unit_2',
    title: 'Shopping',
    description: 'Shop in Myeongdong.',
    order: 5,
    goal: 'Ask prices and buy Korean goods.',
    imageUrl: 'https://picsum.photos/seed/ko_shop/800/400',
    vocabulary: [
      { id: 'ko_v13', word: '얼마예요?', translation: 'How much is it?', pronunciation: 'eol-ma-ye-yo' },
      { id: 'ko_v14', word: '싸요', translation: 'cheap', pronunciation: 'ssa-yo' },
      { id: 'ko_v15', word: '비싸요', translation: 'expensive', pronunciation: 'bi-ssa-yo' },
    ],
    phrases: [
      { id: 'ko_p5', phrase: '이게 얼마예요?', translation: 'How much is this?', pronunciation: 'i-ge eol-ma-ye-yo' },
    ],
    activities: [
      {
        id: 'ko_a5', type: 'translation',
        question: 'Translate: "How much is it?"',
        correctTranslation: '얼마예요?',
        acceptedTranslations: ['얼마예요?', '얼마예요'],
      },
    ],
  },
  {
    id: 'ko_lesson_6',
    unitId: 'ko_unit_2',
    title: 'Family & Friends',
    description: 'Describe your family in Korean.',
    order: 6,
    goal: 'Introduce your family members in Korean.',
    imageUrl: 'https://picsum.photos/seed/ko_family/800/400',
    vocabulary: [
      { id: 'ko_v16', word: '가족', translation: 'family', pronunciation: 'ga-jok' },
      { id: 'ko_v17', word: '어머니', translation: 'mother', pronunciation: 'eo-meo-ni' },
      { id: 'ko_v18', word: '아버지', translation: 'father', pronunciation: 'a-beo-ji' },
    ],
    phrases: [
      { id: 'ko_p6', phrase: '우리 가족은 다섯 명이에요.', translation: 'My family has 5 people.', pronunciation: 'u-ri ga-jok-eun da-seot myeong-i-e-yo' },
    ],
    activities: [
      {
        id: 'ko_a6', type: 'multiple_choice',
        question: 'What does "어머니" mean?',
        options: ['father', 'brother', 'sister', 'mother'],
        correctAnswerIndex: 3,
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// CHINESE
// ─────────────────────────────────────────────────────────────────────────────
const chineseLessons: LessonWithImage[] = [
  {
    id: 'zh_lesson_1',
    unitId: 'zh_unit_1',
    title: 'Greetings & Introductions',
    description: 'Say hello in Mandarin.',
    order: 1,
    goal: 'Use 你好 and introduce yourself.',
    imageUrl: 'https://picsum.photos/seed/zh_greet/800/400',
    vocabulary: [
      { id: 'zh_v1', word: '你好', translation: 'Hello', pronunciation: 'nǐ hǎo' },
      { id: 'zh_v2', word: '谢谢', translation: 'Thank you', pronunciation: 'xiè xie' },
      { id: 'zh_v3', word: '再见', translation: 'Goodbye', pronunciation: 'zài jiàn' },
    ],
    phrases: [
      { id: 'zh_p1', phrase: '你叫什么名字？', translation: 'What is your name?', pronunciation: 'nǐ jiào shén me míng zi' },
    ],
    activities: [
      {
        id: 'zh_a1', type: 'multiple_choice',
        question: 'Which means "Hello"?',
        options: ['再见', '谢谢', '你好', '对不起'],
        correctAnswerIndex: 2,
      },
    ],
  },
  {
    id: 'zh_lesson_2',
    unitId: 'zh_unit_1',
    title: 'Tones & Pronunciation',
    description: 'Master the four Mandarin tones.',
    order: 2,
    goal: 'Correctly pronounce the four tones.',
    imageUrl: 'https://picsum.photos/seed/zh_tones/800/400',
    vocabulary: [
      { id: 'zh_v4', word: 'mā (妈)', translation: 'mother (1st tone)', pronunciation: 'mā' },
      { id: 'zh_v5', word: 'má (麻)', translation: 'hemp (2nd tone)', pronunciation: 'má' },
      { id: 'zh_v6', word: 'mǎ (马)', translation: 'horse (3rd tone)', pronunciation: 'mǎ' },
    ],
    phrases: [
      { id: 'zh_p2', phrase: '声调很重要。', translation: 'Tones are very important.', pronunciation: 'shēng diào hěn zhòng yào' },
    ],
    activities: [
      {
        id: 'zh_a2', type: 'multiple_choice',
        question: 'Which tone does 妈 (mother) use?',
        options: ['2nd tone', '3rd tone', '4th tone', '1st tone'],
        correctAnswerIndex: 3,
      },
    ],
  },
  {
    id: 'zh_lesson_3',
    unitId: 'zh_unit_1',
    title: 'At the Restaurant',
    description: 'Order dumplings and noodles in Chinese.',
    order: 3,
    goal: 'Order dim sum at a Chinese restaurant.',
    imageUrl: 'https://picsum.photos/seed/zh_restaurant/800/400',
    vocabulary: [
      { id: 'zh_v7', word: '饺子', translation: 'dumplings', pronunciation: 'jiǎo zi' },
      { id: 'zh_v8', word: '请给我', translation: 'please give me', pronunciation: 'qǐng gěi wǒ' },
      { id: 'zh_v9', word: '好吃', translation: 'delicious', pronunciation: 'hǎo chī' },
    ],
    phrases: [
      { id: 'zh_p3', phrase: '请给我饺子。', translation: 'Please give me dumplings.', pronunciation: 'qǐng gěi wǒ jiǎo zi' },
    ],
    activities: [
      {
        id: 'zh_a3', type: 'ai_chat',
        question: 'Order at a Chinese restaurant',
        goal: 'Order dumplings and ask for the bill.',
        systemPrompt: 'You are a server at a Chinese restaurant. Greet customers and take their order in Mandarin.',
      },
    ],
  },
  {
    id: 'zh_lesson_4',
    unitId: 'zh_unit_2',
    title: 'Travel & Directions',
    description: 'Navigate Beijing using Mandarin.',
    order: 4,
    goal: 'Ask how to get to the Forbidden City.',
    imageUrl: 'https://picsum.photos/seed/zh_travel/800/400',
    vocabulary: [
      { id: 'zh_v10', word: '地铁', translation: 'subway', pronunciation: 'dì tiě' },
      { id: 'zh_v11', word: '左边', translation: 'left', pronunciation: 'zuǒ biān' },
      { id: 'zh_v12', word: '右边', translation: 'right', pronunciation: 'yòu biān' },
    ],
    phrases: [
      { id: 'zh_p4', phrase: '故宫在哪里？', translation: 'Where is the Forbidden City?', pronunciation: 'gù gōng zài nǎ lǐ' },
    ],
    activities: [
      {
        id: 'zh_a4', type: 'multiple_choice',
        question: 'What does "左边" mean?',
        options: ['right', 'straight', 'left', 'back'],
        correctAnswerIndex: 2,
      },
    ],
  },
  {
    id: 'zh_lesson_5',
    unitId: 'zh_unit_2',
    title: 'Shopping',
    description: 'Shop in a Chinese market.',
    order: 5,
    goal: 'Ask prices and buy items in Mandarin.',
    imageUrl: 'https://picsum.photos/seed/zh_shop/800/400',
    vocabulary: [
      { id: 'zh_v13', word: '多少钱？', translation: 'How much is it?', pronunciation: 'duō shao qián' },
      { id: 'zh_v14', word: '便宜', translation: 'cheap', pronunciation: 'pián yi' },
      { id: 'zh_v15', word: '贵', translation: 'expensive', pronunciation: 'guì' },
    ],
    phrases: [
      { id: 'zh_p5', phrase: '这个多少钱？', translation: 'How much is this?', pronunciation: 'zhè ge duō shao qián' },
    ],
    activities: [
      {
        id: 'zh_a5', type: 'translation',
        question: 'Translate: "How much is it?"',
        correctTranslation: '多少钱？',
        acceptedTranslations: ['多少钱？', '多少钱'],
      },
    ],
  },
  {
    id: 'zh_lesson_6',
    unitId: 'zh_unit_2',
    title: 'Family & Friends',
    description: 'Describe your family in Mandarin.',
    order: 6,
    goal: 'Introduce your family members in Chinese.',
    imageUrl: 'https://picsum.photos/seed/zh_family/800/400',
    vocabulary: [
      { id: 'zh_v16', word: '家庭', translation: 'family', pronunciation: 'jiā tíng' },
      { id: 'zh_v17', word: '妈妈', translation: 'mother', pronunciation: 'mā ma' },
      { id: 'zh_v18', word: '爸爸', translation: 'father', pronunciation: 'bà ba' },
    ],
    phrases: [
      { id: 'zh_p6', phrase: '我家有五口人。', translation: 'My family has 5 people.', pronunciation: 'wǒ jiā yǒu wǔ kǒu rén' },
    ],
    activities: [
      {
        id: 'zh_a6', type: 'multiple_choice',
        question: 'What does "妈妈" mean?',
        options: ['father', 'brother', 'sister', 'mother'],
        correctAnswerIndex: 3,
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// PORTUGUESE
// ─────────────────────────────────────────────────────────────────────────────
const portugueseLessons: LessonWithImage[] = [
  {
    id: 'pt_lesson_1',
    unitId: 'pt_unit_1',
    title: 'Greetings & Introductions',
    description: 'Say hello in Portuguese.',
    order: 1,
    goal: 'Use Olá and introduce yourself.',
    imageUrl: 'https://picsum.photos/seed/pt_greet/800/400',
    vocabulary: [
      { id: 'pt_v1', word: 'Olá', translation: 'Hello', pronunciation: 'oh-lah' },
      { id: 'pt_v2', word: 'Obrigado/a', translation: 'Thank you', pronunciation: 'oh-bree-gah-doo/dah' },
      { id: 'pt_v3', word: 'Tchau', translation: 'Bye', pronunciation: 'chow' },
    ],
    phrases: [
      { id: 'pt_p1', phrase: 'Como você se chama?', translation: 'What is your name?', pronunciation: 'ko-mo vo-seh se sha-ma' },
    ],
    activities: [
      {
        id: 'pt_a1', type: 'multiple_choice',
        question: 'Which means "Hello"?',
        options: ['Tchau', 'Obrigado', 'Olá', 'Sim'],
        correctAnswerIndex: 2,
      },
    ],
  },
  {
    id: 'pt_lesson_2',
    unitId: 'pt_unit_1',
    title: 'Daily Life',
    description: 'Describe your routine in Portuguese.',
    order: 2,
    goal: 'Talk about morning and evening habits.',
    imageUrl: 'https://picsum.photos/seed/pt_daily/800/400',
    vocabulary: [
      { id: 'pt_v4', word: 'manhã', translation: 'morning', pronunciation: 'ma-nyah' },
      { id: 'pt_v5', word: 'trabalho', translation: 'work', pronunciation: 'tra-bal-yo' },
      { id: 'pt_v6', word: 'casa', translation: 'home', pronunciation: 'ka-zah' },
    ],
    phrases: [
      { id: 'pt_p2', phrase: 'Vou ao trabalho.', translation: 'I go to work.', pronunciation: 'voh ow tra-bal-yo' },
    ],
    activities: [
      {
        id: 'pt_a2', type: 'translation',
        question: 'Translate: "morning"',
        correctTranslation: 'manhã',
        acceptedTranslations: ['manhã', 'Manhã'],
      },
    ],
  },
  {
    id: 'pt_lesson_3',
    unitId: 'pt_unit_1',
    title: 'At the Café',
    description: 'Order a bica and pastel de nata.',
    order: 3,
    goal: 'Order coffee and pastries in Portuguese.',
    imageUrl: 'https://picsum.photos/seed/pt_cafe/800/400',
    vocabulary: [
      { id: 'pt_v7', word: 'café', translation: 'coffee', pronunciation: 'kah-feh' },
      { id: 'pt_v8', word: 'por favor', translation: 'please', pronunciation: 'por fa-vor' },
      { id: 'pt_v9', word: 'a conta', translation: 'the bill', pronunciation: 'ah kon-ta' },
    ],
    phrases: [
      { id: 'pt_p3', phrase: 'Um café, por favor.', translation: 'A coffee, please.', pronunciation: 'oom kah-feh, por fa-vor' },
    ],
    activities: [
      {
        id: 'pt_a3', type: 'ai_chat',
        question: 'Order at a Portuguese café',
        goal: 'Order coffee and pay the bill.',
        systemPrompt: 'You are a barista at a café in Lisbon. Greet customers and take their order in Portuguese.',
      },
    ],
  },
  {
    id: 'pt_lesson_4',
    unitId: 'pt_unit_2',
    title: 'Travel & Directions',
    description: 'Navigate Lisbon in Portuguese.',
    order: 4,
    goal: 'Ask for directions to the train station.',
    imageUrl: 'https://picsum.photos/seed/pt_travel/800/400',
    vocabulary: [
      { id: 'pt_v10', word: 'rua', translation: 'street', pronunciation: 'roo-ah' },
      { id: 'pt_v11', word: 'esquerda', translation: 'left', pronunciation: 'esh-kehr-dah' },
      { id: 'pt_v12', word: 'direita', translation: 'right', pronunciation: 'dee-rey-tah' },
    ],
    phrases: [
      { id: 'pt_p4', phrase: 'Onde fica a estação?', translation: 'Where is the station?', pronunciation: 'on-de fee-ka ah es-ta-sown' },
    ],
    activities: [
      {
        id: 'pt_a4', type: 'multiple_choice',
        question: 'What does "esquerda" mean?',
        options: ['right', 'straight', 'left', 'back'],
        correctAnswerIndex: 2,
      },
    ],
  },
  {
    id: 'pt_lesson_5',
    unitId: 'pt_unit_2',
    title: 'Shopping',
    description: 'Shop in a Portuguese market.',
    order: 5,
    goal: 'Ask prices and buy items in Portuguese.',
    imageUrl: 'https://picsum.photos/seed/pt_shop/800/400',
    vocabulary: [
      { id: 'pt_v13', word: 'quanto custa?', translation: 'how much is it?', pronunciation: 'kwan-to koos-ta' },
      { id: 'pt_v14', word: 'barato', translation: 'cheap', pronunciation: 'ba-ra-to' },
      { id: 'pt_v15', word: 'caro', translation: 'expensive', pronunciation: 'ka-ro' },
    ],
    phrases: [
      { id: 'pt_p5', phrase: 'Quanto custa isto?', translation: 'How much does this cost?', pronunciation: 'kwan-to koos-ta ees-to' },
    ],
    activities: [
      {
        id: 'pt_a5', type: 'translation',
        question: 'Translate: "how much is it?"',
        correctTranslation: 'quanto custa?',
        acceptedTranslations: ['quanto custa?', 'quanto custa'],
      },
    ],
  },
  {
    id: 'pt_lesson_6',
    unitId: 'pt_unit_2',
    title: 'Family & Friends',
    description: 'Describe your family in Portuguese.',
    order: 6,
    goal: 'Introduce your family members in Portuguese.',
    imageUrl: 'https://picsum.photos/seed/pt_family/800/400',
    vocabulary: [
      { id: 'pt_v16', word: 'família', translation: 'family', pronunciation: 'fa-mee-lya' },
      { id: 'pt_v17', word: 'mãe', translation: 'mother', pronunciation: 'mah-e' },
      { id: 'pt_v18', word: 'pai', translation: 'father', pronunciation: 'pah-ee' },
    ],
    phrases: [
      { id: 'pt_p6', phrase: 'A minha família é grande.', translation: 'My family is big.', pronunciation: 'ah mee-nyah fa-mee-lya eh grahn-de' },
    ],
    activities: [
      {
        id: 'pt_a6', type: 'multiple_choice',
        question: 'What does "mãe" mean?',
        options: ['father', 'brother', 'sister', 'mother'],
        correctAnswerIndex: 3,
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Combined export
// ─────────────────────────────────────────────────────────────────────────────
export const lessons: LessonWithImage[] = [
  ...spanishLessons,
  ...frenchLessons,
  ...japaneseLessons,
  ...germanLessons,
  ...italianLessons,
  ...koreanLessons,
  ...chineseLessons,
  ...portugueseLessons,
];
