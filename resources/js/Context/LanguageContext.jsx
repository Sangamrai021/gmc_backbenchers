import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('grievance_lang') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('grievance_lang', lang);
  }, [lang]);

  const toggleLang = useCallback(() => {
    setLang(prev => prev === 'en' ? 'np' : 'en');
  }, []);

  const t = useCallback((key) => {
    const keys = key.split('.');
    let value = lang === 'np' ? npTranslations : enTranslations;
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }
    return typeof value === 'string' ? value : key;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    return { lang: 'en', toggleLang: () => {}, t: (key) => key };
  }
  return context;
}

const enTranslations = {
  nav: { home: 'Home', feed: 'Feed', submit: 'Submit Grievance', track: 'Track', grievances: 'Grievances', moderation: 'Moderation', spam_logs: 'Spam Logs' },
  submit: { 
    title: 'Submit a Grievance',
    subtitle: 'We are here to listen and help resolve your concerns.',
    steps: {
      issue_details: 'Issue Details',
      description: 'Description',
      review: 'Review'
    },
    institution: 'Institution',
    select_institution: 'Select an Institution',
    category: 'Category',
    select_category: 'Select a Category',
    semester: 'Semester',
    optional: 'Optional',
    subject: 'Subject',
    priority: { label: 'Priority' },
    title_placeholder: 'Enter a short title',
    description: 'Description',
    description_placeholder: 'Describe your grievance in detail...',
    min_chars: 'minimum characters',
    evidence: {
      label: 'Evidence (Optional)',
      photo: 'Photo',
      video: 'Video'
    },
    website: 'Related Website (Optional)',
    anonymous_note: 'Your identity will be kept completely confidential from the institution and other students.',
    anonymous: 'Submit Anonymously',
    submit_btn: 'Submit Grievance', 
    submitting: 'Submitting...' 
  },
  status: { title: 'Track Your Grievance', desc: 'Enter your reference code to see the current status.', code_label: 'Reference Code', code_placeholder: 'e.g. EDU-000001', lookup_btn: 'Look Up', searching: 'Searching...', details_title: 'Grievance Details', reference: 'Reference', institution: 'Institution', priority: 'Priority', status: 'Status', assigned_to: 'Assigned To' },
  priorities: { low: 'Low', medium: 'Medium', high: 'High', critical: 'Critical' },
  statuses: { received: 'Received', in_progress: 'In Progress', resolved: 'Resolved' },
  categories: { harassment: 'Harassment', discrimination: 'Discrimination', teacher_conduct: 'Teacher Conduct', exam_concern: 'Exam Concern', facilities: 'Facilities', admin_delay: 'Admin Delay', other: 'Other' },
  grievance: { reference_code: 'Reference Code', upvotes: 'upvotes', comments: 'comments', report_btn: 'Report', share_btn: 'Share', social_proof: '{names} + {count} others', all_anonymous: '{count} people' },
  admin: { title: 'Manage Grievances', assign: 'Assign', change_status: 'Change Status', override_priority: 'Override Priority', spam_score: 'Spam Score', moderation: 'Moderation Queue', hide: 'Hide', approve: 'Approve' },
};

const npTranslations = {
  nav: { home: 'गृहपृष्ठ', feed: 'फीड', submit: 'उजुरी दिनुहोस्', track: 'ट्र्याक', grievances: 'उजुरीहरू', moderation: 'मध्यस्थता', spam_logs: 'स्पैम लग' },
  submit: { 
    title: 'उजुरी दिनुहोस्',
    subtitle: 'हामी तपाईंका समस्या सुन्न र समाधान गर्न यहाँ छौं।',
    steps: {
      issue_details: 'उजुरी विवरण',
      description: 'विवरण',
      review: 'समीक्षा'
    },
    institution: 'संस्था',
    select_institution: 'संस्था चयन गर्नुहोस्',
    category: 'श्रेणी',
    select_category: 'श्रेणी चयन गर्नुहोस्',
    semester: 'सेमेस्टर',
    optional: 'वैकल्पिक',
    subject: 'विषय',
    priority: { label: 'प्राथमिकता' },
    title_placeholder: 'छोटो शीर्षक लेख्नुहोस्',
    description: 'विवरण',
    description_placeholder: 'विस्तृतमा वर्णन गर्नुहोस्...',
    min_chars: 'न्यूनतम अक्षरहरू',
    evidence: {
      label: 'प्रमाण (वैकल्पिक)',
      photo: 'फोटो',
      video: 'भिडियो'
    },
    website: 'सम्बन्धित वेबसाइट (वैकल्पिक)',
    anonymous_note: 'तपाईंको पहिचान संस्था र अन्य विद्यार्थीहरूबाट पूर्ण रूपमा गोप्य राखिनेछ।',
    anonymous: 'गुमनाम रूपमा पेश गर्नुहोस्',
    submit_btn: 'उजुरी पेश गर्नुहोस्', 
    submitting: 'पेश हुँदै...' 
  },
  status: { title: 'उजुरी ट्र्याक गर्नुहोस्', desc: 'हालको स्थिति हेर्न आफ्नो सन्दर्भ कोड प्रविष्ट गर्नुहोस्।', code_label: 'सन्दर्भ कोड', code_placeholder: 'जस्तै EDU-000001', lookup_btn: 'खोज्नुहोस्', searching: 'खोज्दै...', details_title: 'उजुरी विवरण', reference: 'सन्दर्भ', institution: 'संस्था', priority: 'प्राथमिकता', status: 'स्थिति', assigned_to: 'जिम्मेवार व्यक्ति' },
  priorities: { low: 'कम', medium: 'मध्यम', high: 'उच्च', critical: 'गम्भीर' },
  statuses: { received: 'प्राप्त', in_progress: 'प्रक्रियामा', resolved: 'समाधान' },
  categories: { harassment: 'उत्पीडन', discrimination: 'भेदभाव', teacher_conduct: 'शिक्षक व्यवहार', exam_concern: 'परीक्षा सम्बन्धी', facilities: 'सुविधाहरू', admin_delay: 'प्रशासनिक ढिलाइ', other: 'अन्य' },
  grievance: { reference_code: 'सन्दर्भ कोड', upvotes: 'प्रतिक्रिया', comments: 'टिप्पणी', report_btn: 'रिपोर्ट', share_btn: 'सेयर', social_proof: '{names} + {count} अन्य', all_anonymous: '{count} जना' },
  admin: { title: 'उजुरी व्यवस्थापन', assign: 'जिम्मेवारी', change_status: 'स्थिति परिवर्तन', override_priority: 'प्राथमिकता परिवर्तन', spam_score: 'स्पैम स्कोर', moderation: 'मध्यस्थता', hide: 'लुकाउनुहोस्', approve: 'स्वीकृत गर्नुहोस्' },
};