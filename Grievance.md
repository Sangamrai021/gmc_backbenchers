# Grievance.md — Student Grievance System for EduVoice

> **Part of:** GMC Internal Hackathon 2026 | **Theme:** Empowering Education Through Technology
> **Source:** Adapted from Nagarik Sarokar (Complaint Management System) at `/home/nitesh/complain_tracking`
> **Tech Stack:** Laravel 12 + React 18 + Inertia.js + Tailwind CSS + Spatie Permission

---

## Session Recovery (AI Continuation)

If interrupted:
1. Read **AGENTS.md** → Read **TodayWork.md** → Read this file
2. Run `git status` && `git log --oneline -5` to see last changes
3. Find the last `[ ]` unchecked item in the relevant epic below
4. Continue from that step

---

## Epic 1: Foundation — Schema, Models, Services

### What
Database schema + Eloquent models + core services for the grievance system.

### Why
Without this layer, no feature can exist. Clean migrations + well-designed models = fast feature development. This epic reuses battle-tested patterns from Nagarik Sarokar.

### How

| Step | Task | Details | Status |
|------|------|---------|--------|
| 1.1 | Create `grievance_categories` migration | `id`, `institution_id` (FK), `name`, `is_active`, `sort_order`, timestamps | [ ] |
| 1.2 | Create `grievances` migration | `id`, `institution_id` (FK), `semester_id` (FK nullable), `subject_id` (FK nullable), `reference_code` (unique), `title` (string 255), `category_id` (FK), `description` (text), `priority` (enum), `user_priority` (enum), `admin_priority` (enum nullable), `priority_reviewed_at`, `priority_reviewed_by` (FK), `status` (enum), `assigned_to` (FK), `is_anonymous` (bool), `reporter_ip`, `reporter_ip_hash`, `anonymous_uuid`, `photo_path`, `video_path`, `spam_score` (float), `hidden_at`, `moderation_status` (enum), `duplicate_of_id` (FK self), `resolved_at`, `resolution_summary`, `resolved_by` (FK), `feedback_rating`, `feedback_comment`, `feedback_at`, softDeletes | [ ] |
| 1.3 | Create `grievance_upvotes` migration | `grievance_id`, `user_id`, `session_id`, `anonymous_uuid`, unique on (grievance_id, user_id) | [ ] |
| 1.4 | Create `grievance_comments` migration | `grievance_id`, `user_id`, `session_id`, `parent_id`, `body`, `is_public`, `is_approved`, `hidden_at`, softDeletes | [ ] |
| 1.5 | Create `grievance_events` migration | `grievance_id`, `type`, `description`, `is_public`, `metadata` (json) | [ ] |
| 1.6 | Create `spam_logs` migration | `event_type`, `loggable_type`, `loggable_id`, `uuid`, `ip_hash`, `spam_score`, `metadata` (json) | [ ] |
| 1.7 | Create `reference_code_sequences` migration | Auto-increment `id`, timestamps | [ ] |
| 1.8 | Create `grievance_media` migration | `grievance_id`, `path`, `type` (photo/video), `submitted_by_session` | [ ] |
| 1.9 | Create `Grievance` model | Full relations, scopes, methods | [ ] |
| 1.10 | Create `GrievanceUpvote` model | toggle(), hasUpvoted() static methods | [ ] |
| 1.11 | Create `GrievanceComment` model | authorName(), visible/approved scopes | [ ] |
| 1.12 | Create `GrievanceEvent` model | public() scope | [ ] |
| 1.13 | Create `GrievanceCategory` model | active(), sorted() scopes | [ ] |
| 1.14 | Create `SpamLog` model | MorphTo loggable | [ ] |
| 1.15 | Create `GrievanceMedia` model | BelongsTo grievance | [ ] |
| 1.16 | Port `AbuseDetectionService` | URL detection, ALL CAPS, repetitive text, phone scraping, emoji | [ ] |
| 1.17 | Port `DuplicateDetectionService` | Jaccard similarity, Nepali stop words | [ ] |
| 1.18 | Port `TrustService` | Redis-backed trust scoring, adjustScore(), getEffectivePriority() | [ ] |
| 1.19 | Port `IpAnonymizer` | SHA256 hash + salt | [ ] |
| 1.20 | Port `TurnstileService` | Adaptive CAPTCHA (Cloudflare Turnstile) | [ ] |
| 1.21 | Port `MergeService` | Auto-merge duplicates | [ ] |
| 1.22 | Port `BsDateService` | Bikram Sambat conversion | [ ] |
| 1.23 | Create `GrievanceService` | Full submission workflow orchestrator | [ ] |
| 1.24 | Update `RolesAndPermissionsSeeder` | Add grievance permissions to roles | [ ] |
| 1.25 | Register middleware in bootstrap/app.php | SetAnonymousUuid, AdaptiveCaptcha | [ ] |
| 1.26 | Register rate limiters in AppServiceProvider | issues:submit, feed:view, comments:store, etc. | [ ] |

---

## Epic 2: Controllers & Routes

### What
Request handling layer — controllers for all grievance operations and route definitions.

### Why
Controllers handle HTTP interface, routes define the API surface.

### How

| Step | Task | Details | Status |
|------|------|--------|--------|
| 2.1 | Create `GrievanceController` | create, store, showReference, trackStatus, submitFeedback | [ ] |
| 2.2 | Create `GrievanceFeedController` | index — paginated feed with social proof | [ ] |
| 2.3 | Create `UpvoteController` | toggle (with milestone escalation), upvoters | [ ] |
| 2.4 | Create `CommentController` | index, store, destroy | [ ] |
| 2.5 | Create `FlagController` | flagIssue, flagComment | [ ] |
| 2.6 | Create `Admin\GrievanceController` | index, show, updateStatus, updatePriority, assign | [ ] |
| 2.7 | Create `Admin\ModerationController` | index, pendingComments, approveComment, hideComment, spamLogs | [ ] |
| 2.8 | Create `StatsController` | overview, categoryBreakdown, issuesOverTime | [ ] |
| 2.9 | Define all routes in web.php | Public + Admin + API routes | [ ] |

---

## Epic 3: Frontend — React Pages & Components

### What
All user-facing React pages — submit form, public feed, reference detail, status check, admin management, moderation.

### Why
This is what the user sees and interacts with. The entire complaint lifecycle must be covered.

### How

| Step | Task | Details | Status |
|------|------|--------|--------|
| 3.1 | Port `LanguageContext` + `useLanguage` hook | en/np toggle with localStorage persistence | [ ] |
| 3.2 | Port `LanguageToggle` component | EN/ने button | [ ] |
| 3.3 | Create translation files | `lang/grievances/en.js`, `lang/grievances/np.js` | [ ] |
| 3.4 | Create `Pages/Grievances/Submit.jsx` | 3-step form: details → description → review | [ ] |
| 3.5 | Create `Pages/Grievances/Feed.jsx` | Public feed with filters | [ ] |
| 3.6 | Create `Pages/Grievances/Show.jsx` | Reference page with timeline | [ ] |
| 3.7 | Create `Pages/Grievances/Track.jsx` | Status check by reference code | [ ] |
| 3.8 | Create `Components/Grievances/ComplaintCard.jsx` | Card with social proof | [ ] |
| 3.9 | Create `Components/Grievances/UpvoteButton.jsx` | Toggle upvote | [ ] |
| 3.10 | Create `Components/Grievances/FeedFilters.jsx` | Filter bar | [ ] |
| 3.11 | Create `Components/UI/SearchSelect.jsx` | Searchable dropdown | [ ] |
| 3.12 | Create `Components/UI/VoiceInput.jsx` | Speech-to-text | [ ] |
| 3.13 | Create `Components/UI/TurnstileWidget.jsx` | CAPTCHA widget | [ ] |
| 3.14 | Create `Components/UI/Badge.jsx` | Priority/Status badges | [ ] |
| 3.15 | Create `Components/UI/ProgressSteps.jsx` | Timeline visualization | [ ] |
| 3.16 | Create `Components/Comments/CommentsModal.jsx` | Threaded comments | [ ] |
| 3.17 | Create `Components/Comments/UpvotersModal.jsx` | Upvoter list | [ ] |
| 3.18 | Create `Pages/Admin/Grievances/Index.jsx` | Admin table | [ ] |
| 3.19 | Create `Pages/Admin/Grievances/Show.jsx` | Admin detail with priority override | [ ] |
| 3.20 | Create `Pages/Admin/SpamLogs.jsx` | Spam log viewer | [ ] |
| 3.21 | Update `AuthenticatedLayout.jsx` | Add grievance nav links | [ ] |

---

## Epic 4: Integration with Existing EduVoice

### What
Wire the grievance system into EduVoice's existing auth, roles, navigation, dashboard, and notifications.

### Why
A siloed feature is useless. The grievance system must feel native to EduVoice.

### How

| Step | Task | Details | Status |
|------|------|---------|--------|
| 4.1 | Auth integration | Map Spatie roles to grievance permissions | [x] |
| 4.2 | Navigation integration | Add "Grievances" to sidebar | [x] |
| 4.3 | Dashboard stats | Add grievance cards to role dashboards | [x] |
| 4.4 | Notification integration | Add NotificationType::Grievance* | [x] |
| 4.5 | Broadcast events | GrievanceSubmitted, GrievanceStatusUpdated events | [x] |

---

## Business Model (For Judges)

### Problem
- Students in Nepali classrooms face harassment, discrimination, teacher negligence
- They are too afraid or shy to speak up (same problem as anonymous Q&A)
- No existing education platform offers a structured, safe reporting channel

### Solution
- Anonymous grievance system with reference code tracking
- Community upvoting ("Me Too") to surface systemic issues
- Bilingual (Nepali/English) — accessible to all
- Anti-spam protection ensures quality

### Business Model
- **Freemium**: Basic grievance system free for all institutions
- **Premium**: Advanced analytics, priority support, custom categories, SLA tracking
- **Institutional licensing**: Per-institution fee for dedicated instance

### Innovation Highlights
1. **Anonymous + trackable**: Unlike Google Classroom where complaints are public, students can report anonymously AND track resolution
2. **Community validation**: "Me Too" upvoting distinguishes systematic issues from isolated incidents
3. **Anti-spam by design**: Honeypot + rate limiting + CAPTCHA + trust scoring — stops abuse without friction
4. **Reference code tracking**: No login required to track — accessible from any device
5. **Nepali-first**: Bilingual interface, Bikram Sambat dates — built for Nepal

---

## Innovation & Problem-Solving Score (For Judging)

| Criteria | How We Score |
|----------|-------------|
| **Innovation** | No education platform in Nepal offers anonymous grievance + reference tracking + community upvoting. This is first-of-its-kind. |
| **Problem-Solving** | Directly addresses harassment, discrimination, teacher negligence — problems every Nepali student faces but few dare to report. |
| **Technical Excellence** | Reuses production-tested code from Nagarik Sarokar (55+ tests, 97 assertions). Anti-spam system is enterprise-grade. |
| **Business Viability** | Freemium model with institutional licensing. Addresses a real market need. |
| **Theme Alignment** | "Empowering Education Through Technology" — giving students a safe voice is the ultimate empowerment. |

---

## File Manifest

### Migrations (8)
```
database/migrations/YYYY_MM_DD_HHMMSS_create_grievance_categories_table.php
database/migrations/YYYY_MM_DD_HHMMSS_create_grievances_table.php
database/migrations/YYYY_MM_DD_HHMMSS_create_grievance_upvotes_table.php
database/migrations/YYYY_MM_DD_HHMMSS_create_grievance_comments_table.php
database/migrations/YYYY_MM_DD_HHMMSS_create_grievance_events_table.php
database/migrations/YYYY_MM_DD_HHMMSS_create_spam_logs_table.php
database/migrations/YYYY_MM_DD_HHMMSS_create_reference_code_sequences_table.php
database/migrations/YYYY_MM_DD_HHMMSS_create_grievance_media_table.php
```

### Models (8)
```
app/Models/Grievance.php
app/Models/GrievanceUpvote.php
app/Models/GrievanceComment.php
app/Models/GrievanceEvent.php
app/Models/GrievanceCategory.php
app/Models/SpamLog.php
app/Models/GrievanceMedia.php
```

### Services (7)
```
app/Services/GrievanceService.php
app/Services/AbuseDetectionService.php
app/Services/DuplicateDetectionService.php
app/Services/TrustService.php
app/Services/IpAnonymizer.php
app/Services/TurnstileService.php
app/Services/MergeService.php
app/Services/BsDateService.php
```

### Middleware (2)
```
app/Http/Middleware/SetAnonymousUuid.php
app/Http/Middleware/AdaptiveCaptcha.php
```

### Controllers (8)
```
app/Http/Controllers/GrievanceController.php
app/Http/Controllers/GrievanceFeedController.php
app/Http/Controllers/UpvoteController.php
app/Http/Controllers/CommentController.php
app/Http/Controllers/FlagController.php
app/Http/Controllers/Admin/GrievanceController.php
app/Http/Controllers/Admin/ModerationController.php
app/Http/Controllers/StatsController.php
```

### React Pages (7)
```
resources/js/Pages/Grievances/Submit.jsx
resources/js/Pages/Grievances/Feed.jsx
resources/js/Pages/Grievances/Show.jsx
resources/js/Pages/Grievances/Track.jsx
resources/js/Pages/Admin/Grievances/Index.jsx
resources/js/Pages/Admin/Grievances/Show.jsx
resources/js/Pages/Admin/SpamLogs.jsx
```

### React Components (14)
```
resources/js/Components/Grievances/ComplaintCard.jsx
resources/js/Components/Grievances/UpvoteButton.jsx
resources/js/Components/Grievances/FeedFilters.jsx
resources/js/Components/UI/SearchSelect.jsx
resources/js/Components/UI/VoiceInput.jsx
resources/js/Components/UI/TurnstileWidget.jsx
resources/js/Components/UI/Badge.jsx
resources/js/Components/UI/ProgressSteps.jsx
resources/js/Components/Comments/CommentsModal.jsx
resources/js/Components/Comments/UpvotersModal.jsx
resources/js/Components/Comments/CommentForm.jsx
resources/js/Components/Comments/CommentSection.jsx
resources/js/Context/LanguageContext.jsx
resources/js/Components/LanguageToggle.jsx
```