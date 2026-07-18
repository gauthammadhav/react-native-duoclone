export type LanguageCode = 'es' | 'fr' | 'ja' | 'de' | 'it' | 'ko' | 'zh' | 'pt';

export interface Language {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string; // emoji or image path reference
  description: string;
}

export type ActivityType = 'multiple_choice' | 'translation' | 'listening' | 'speaking' | 'ai_chat' | 'ai_video_teacher';

export interface BaseActivity {
  id: string;
  type: ActivityType;
  question: string; // The prompt shown to the user
}

export interface MultipleChoiceActivity extends BaseActivity {
  type: 'multiple_choice';
  options: string[];
  correctAnswerIndex: number;
}

export interface TranslationActivity extends BaseActivity {
  type: 'translation';
  correctTranslation: string;
  acceptedTranslations?: string[];
}

export interface AiChatActivity extends BaseActivity {
  type: 'ai_chat';
  systemPrompt: string; // Instructions for the AI tutor
  goal: string; // What the user needs to achieve in the chat
}

export interface AiVideoTeacherActivity extends BaseActivity {
  type: 'ai_video_teacher';
  systemPrompt: string; // Instructions for the Vision Agent
  teacherName: string;
  avatarVideoUrl?: string; // Optional URL for idle video
  goal: string;
}

export type Activity = 
  | MultipleChoiceActivity 
  | TranslationActivity 
  | AiChatActivity 
  | AiVideoTeacherActivity;

export interface Vocabulary {
  id: string;
  word: string;
  translation: string;
  pronunciation?: string;
}

export interface Phrase {
  id: string;
  phrase: string;
  translation: string;
  pronunciation?: string;
}

export interface Lesson {
  id: string;
  unitId: string;
  title: string;
  description: string;
  order: number;
  goal: string; // What the user will learn
  vocabulary: Vocabulary[];
  phrases: Phrase[];
  activities: Activity[];
}

export interface Unit {
  id: string;
  languageCode: LanguageCode;
  title: string; // e.g., "Unit 1: Basics"
  description: string; // e.g., "Learn basic greetings and introductions"
  order: number;
  themeColor: string; // For UI styling (e.g., "#FF0000")
}
