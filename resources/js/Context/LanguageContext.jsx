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
  submit: { title: 'Submit a Grievance', issue_details: 'Grievance Details', desc_label: 'Description', your_info: 'Your Information', org_label: 'Institution', category_label: 'Category', semester_label: 'Semester', subject_label: 'Subject', priority_label: 'Priority', title_label: 'Title', title_placeholder: 'Enter a short title', desc_placeholder: 'Describe your grievance in detail...', photo_label: 'Photo (optional)', video_label: 'Video (optional)', anonymous_label: 'Submit Anonymously', submit_btn: 'Submit Grievance', submitting: 'Submitting...' },
  status: { title: 'Track Your Grievance', desc: 'Enter your reference code to see the current status.', code_label: 'Reference Code', code_placeholder: 'e.g. EDU-000001', lookup_btn: 'Look Up', searching: 'Searching...', details_title: 'Grievance Details', reference: 'Reference', institution: 'Institution', priority: 'Priority', status: 'Status', assigned_to: 'Assigned To' },
  priorities: { low: 'Low', medium: 'Medium', high: 'High', critical: 'Critical' },
  statuses: { received: 'Received', in_progress: 'In Progress', resolved: 'Resolved' },
  categories: { harassment: 'Harassment', discrimination: 'Discrimination', teacher_conduct: 'Teacher Conduct', exam_concern: 'Exam Concern', facilities: 'Facilities', admin_delay: 'Admin Delay', other: 'Other' },
  grievance: { reference_code: 'Reference Code', upvotes: 'upvotes', comments: 'comments', report_btn: 'Report', share_btn: 'Share', social_proof: '{names} + {count} others', all_anonymous: '{count} people' },
  admin: { title: 'Manage Grievances', assign: 'Assign', change_status: 'Change Status', override_priority: 'Override Priority', spam_score: 'Spam Score', moderation: 'Moderation Queue', hide: 'Hide', approve: 'Approve' },
};

const npTranslations = {
  nav: { home: 'गृहपृष्ठ', feed: 'फीड', submit: 'उजुरी दिनुहोस्', track: 'ट्र्याक', grievances: 'उजुरीहरू', moderation: 'मध्यस्थता', spam_logs: 'स्पैम लग' },
  submit: { title: 'उजुरी दिनुहोस्', issue_details: 'उजुरी विवरण', desc_label: 'विवरण', your_info: 'तपाईंको जानकारी', org_label: 'संस्था', category_label: 'श्रेणी', semester_label: 'सेमेस्टर', subject_label: 'विषय', priority_label: 'प्राथमिकता', title_label: 'शीर्षक', title_placeholder: 'छोटो शीर्षक लेख्नुहोस्', desc_placeholder: 'विस्तृतमा वर्णन गर्नुहोस्...', photo_label: 'फोटो (वैकल्पिक)', video_label: 'भिडियो (वैकल्पिक)', anonymous_label: 'गुमनाम रूपमा पेश गर्नुहोस्', submit_btn: 'उजुरी पेश गर्नुहोस्', submitting: 'पेश हुँदै...' },
  status: { title: 'उजुरी ट्र्याक गर्नुहोस्', desc: 'हालको स्थिति हेर्न आफ्नो सन्दर्भ कोड प्रविष्ट गर्नुहोस्।', code_label: 'सन्दर्भ कोड', code_placeholder: 'जस्तै EDU-000001', lookup_btn: 'खोज्नुहोस्', searching: 'खोज्दै...', details_title: 'उजुरी विवरण', reference: 'सन्दर्भ', institution: 'संस्था', priority: 'प्राथमिकता', status: 'स्थिति', assigned_to: 'जिम्मेवार व्यक्ति' },
  priorities: { low: 'कम', medium: 'मध्यम', high: 'उच्च', critical: 'गम्भीर' },
  statuses: { received: 'प्राप्त', in_progress: 'प्रक्रियामा', resolved: 'समाधान' },
  categories: { harassment: 'उत्पीडन', discrimination: 'भेदभाव', teacher_conduct: 'शिक्षक व्यवहार', exam_concern: 'परीक्षा सम्बन्धी', facilities: 'सुविधाहरू', admin_delay: 'प्रशासनिक ढिलाइ', other: 'अन्य' },
  grievance: { reference_code: 'सन्दर्भ कोड', upvotes: 'प्रतिक्रिया', comments: 'टिप्पणी', report_btn: 'रिपोर्ट', share_btn: 'सेयर', social_proof: '{names} + {count} अन्य', all_anonymous: '{count} जना' },
  admin: { title: 'उजुरी व्यवस्थापन', assign: 'जिम्मेवारी', change_status: 'स्थिति परिवर्तन', override_priority: 'प्राथमिकता परिवर्तन', spam_score: 'स्पैम स्कोर', moderation: 'मध्यस्थता', hide: 'लुकाउनुहोस्', approve: 'स्वीकृत गर्नुहोस्' },
};