# VietTutor Parent Role Implementation Plan

## Tech Stack
- **Frontend:** Next.js 14+ (App Router), TypeScript, shadcn/ui
- **State Management:** Zustand (lightweight, TypeScript-first, ideal for user sessions and filters)
- **Database:** Firebase (Firestore for data, Firebase Auth for authentication, Firebase Storage for files)
- **UI Framework:** Tailwind CSS with shadcn/ui components
- **Form Handling:** React Hook Form + Zod validation

---

## Phase 1: Foundation & MVP (Core Parent Features)

| Phase | Feature/Functionality | User Role | Key shadcn/ui Components | UI/UX Considerations | Backend/API Needs |
|:-----:|:---------------------|:---------:|:------------------------|:---------------------|:------------------|
| 1 | **Authentication System** | Parent | `Card`, `Form`, `Input`, `Button`, `Label`, `Alert` | - Clean sign-in/sign-up forms<br>- Password visibility toggle<br>- Error message display<br>- Loading states on buttons<br>- Success feedback | - Firebase Auth (email/password, Google OAuth)<br>- User profile creation in Firestore<br>- JWT token management<br>- Protected routes middleware |
| 1 | **Parent Dashboard Home** | Parent | `Card`, `Badge`, `Skeleton`, `Avatar`, `Separator` | - Welcome message with parent name<br>- Quick stats overview (children count, upcoming sessions)<br>- Recent activity feed<br>- Mobile-responsive grid layout | - Firestore query for parent's children<br>- Aggregate session data<br>- Real-time listeners for updates |
| 1 | **Child Profile Management (CRUD)** | Parent | `Dialog`, `Form`, `Input`, `Select`, `Button`, `Table`, `DropdownMenu`, `Avatar`, `Badge` | - Modal dialog for add/edit child<br>- Form validation (name, age, grade level)<br>- Table view with action menu (edit/delete)<br>- Confirmation dialog for deletion<br>- Empty state when no children | - Firestore collection: `children`<br>- CRUD endpoints via Next.js API routes<br>- Child document schema (name, age, grade, subjects, parentId) |
| 1 | **Find Tutor (Search & Filter) - P-1** | Parent | `Input` (search), `Select`, `Slider`, `Button`, `Card`, `Badge`, `Avatar`, `Checkbox`, `Sheet` | - Search bar with debounced input<br>- Filter sheet/sidebar (Subject, Max Rate, Location)<br>- Slider for hourly rate range<br>- Tutor cards with photo, name, subjects, rate<br>- Clear filters button<br>- Loading skeletons during search | - Firestore query with composite indexes<br>- Filter by: subject, hourlyRate, district<br>- Pagination/infinite scroll<br>- Tutor profile API endpoint |
| 1 | **View Detailed Tutor Profile - P-3** | Parent | `Card`, `Avatar`, `Badge`, `Tabs`, `Separator`, `Button`, `ScrollArea` | - Profile header (photo, name, rating, verification badge)<br>- Tabs: About, Qualifications, Reviews, Availability<br>- Verification status indicators (T-2)<br>- Call-to-action: "Contact Tutor" button<br>- Mobile-optimized layout | - Firestore doc: `tutors/{tutorId}`<br>- Fetch qualifications, experience (T-1)<br>- Fetch availability data (T-3)<br>- Fetch reviews/ratings |
| 1 | **Send Connection Inquiry - P-4** | Parent | `Dialog`, `Form`, `Textarea`, `Select`, `Button`, `Alert` | - Modal form from tutor profile<br>- Select child from dropdown<br>- Textarea for message/requirements<br>- Character limit indicator<br>- Success/error toast notifications | - Firestore collection: `inquiries`<br>- Create inquiry document (parentId, tutorId, childId, message, status, timestamp)<br>- Send notification to tutor (T-4) |

---

## Phase 2: Enhancement & Communication

| Phase | Feature/Functionality | User Role | Key shadcn/ui Components | UI/UX Considerations | Backend/API Needs |
|:-----:|:---------------------|:---------:|:------------------------|:---------------------|:------------------|
| 2 | **Inquiry Management - P-5** | Parent | `Table`, `Badge`, `Tabs`, `Card`, `DropdownMenu`, `Dialog`, `Avatar` | - Dashboard section: "My Inquiries"<br>- Tabs: Sent, Responded, Archived<br>- Status badges (Pending, Viewed, Responded)<br>- View inquiry details in dialog<br>- Action menu: View, Archive, Delete | - Firestore queries with filters (status)<br>- Real-time updates on inquiry status<br>- Mark as read/archived API<br>- Delete inquiry endpoint |
| 2 | **AI-Powered Tutor Matchmaker - P-2** | Parent | `Dialog`, `Form`, `RadioGroup`, `Textarea`, `Button`, `Card`, `Badge`, `Skeleton`, `Progress` | - "Find Perfect Match" button on dashboard<br>- Multi-step form (3-5 questions)<br>- Progress indicator<br>- Questions: child's struggle, personality, learning goal<br>- AI processing loading state<br>- Results: Top 5 tutor cards with match scores<br>- "View Full Profile" action | - Next.js API route with OpenAI/Gemini integration<br>- Prompt engineering for tutor matching<br>- Algorithm: analyze responses + filter Firestore tutors<br>- Return ranked tutor IDs with scores<br>- Store conversation history (optional) |
| 2 | **Session Booking System** | Parent | `Calendar`, `Dialog`, `Form`, `Select`, `Textarea`, `Button`, `RadioGroup`, `TimePicker`, `Alert` | - Calendar view showing tutor's availability<br>- Click date to open booking dialog<br>- Select: child, subject, session type (online/in-person)<br>- Time slot selection (based on tutor T-3)<br>- Session duration dropdown<br>- Notes textarea<br>- Booking confirmation with details | - Firestore: `sessions` collection<br>- Check tutor availability in real-time<br>- Create session document (parentId, tutorId, childId, dateTime, duration, status)<br>- Send notification to tutor<br>- Calendar event creation |
| 2 | **In-App Messaging** | Parent | `Card`, `Input`, `Button`, `Avatar`, `ScrollArea`, `Badge`, `Separator`, `Sheet` | - Chat interface (mobile: Sheet, desktop: sidebar)<br>- Conversation list with last message preview<br>- Unread count badges<br>- Message bubbles with timestamps<br>- Real-time message updates<br>- Send button with loading state<br>- File attachment support (optional) | - Firestore: `conversations` and `messages` subcollections<br>- Real-time listeners with onSnapshot<br>- Message document schema (senderId, receiverId, text, timestamp, read)<br>- Mark messages as read API<br>- Push notifications (FCM) |
| 2 | **Upcoming Sessions Dashboard** | Parent | `Card`, `Calendar`, `Badge`, `Button`, `Tabs`, `Avatar`, `DropdownMenu` | - Dashboard section: "Upcoming Sessions"<br>- Calendar view + list view toggle<br>- Session cards: tutor photo, child name, subject, date/time<br>- Status badges (Confirmed, Pending, Completed, Cancelled)<br>- Action menu: Reschedule, Cancel, Join (for online)<br>- Empty state with "Book Session" CTA | - Firestore query: sessions where status != 'completed'<br>- Filter by date range<br>- Update session status API<br>- Integration with video service (Zoom/Jitsi) |

---

## Phase 3: Scaling & Analytics

| Phase | Feature/Functionality | User Role | Key shadcn/ui Components | UI/UX Considerations | Backend/API Needs |
|:-----:|:---------------------|:---------:|:------------------------|:---------------------|:------------------|
| 3 | **Progress Tracking & Analytics** | Parent | `Card`, `Tabs`, `Select`, `Badge`, `Progress`, `Chart` (via Recharts), `Table`, `Separator` | - Dedicated "Progress" page<br>- Filter by child<br>- Tabs: Overview, Session History, Performance Metrics<br>- Charts: session hours over time, subject breakdown<br>- Progress bars for skill development<br>- Export report button (PDF) | - Firestore aggregation queries<br>- Compute metrics: total hours, sessions per subject, attendance rate<br>- Tutor feedback/ratings from sessions<br>- PDF generation API (jsPDF/Puppeteer) |
| 3 | **Session History & Reports** | Parent | `Table`, `Dialog`, `Badge`, `Tabs`, `Card`, `Input` (search), `Select` (filter), `Button` | - Searchable/filterable table<br>- Columns: Date, Tutor, Child, Subject, Duration, Status<br>- Click row to view detailed session report<br>- Dialog shows: tutor notes, materials shared, feedback<br>- Download session report<br>- Pagination controls | - Firestore: `sessions` with completed status<br>- Session report subdocuments (tutor-submitted)<br>- Search by tutor name, subject<br>- Filter by date range, child, status |
| 3 | **Payment & Billing Management** | Parent | `Card`, `Table`, `Dialog`, `Form`, `Input`, `Button`, `Badge`, `RadioGroup`, `Alert`, `Tabs` | - "Billing" page with tabs: Payment Methods, Transaction History<br>- Add/remove payment methods (cards)<br>- Transaction table: date, tutor, amount, status<br>- Download invoice button<br>- Auto-pay toggle<br>- Payment confirmation dialogs | - Firebase extension: Stripe integration<br>- Firestore: `payment_methods`, `transactions`<br>- Stripe API for card management<br>- Create Stripe PaymentIntent on booking<br>- Webhook for payment confirmation<br>- Invoice generation |
| 3 | **Notifications Center** | Parent | `Popover`, `Button`, `Badge`, `ScrollArea`, `Card`, `Separator`, `Tabs` | - Bell icon in header with unread count<br>- Popover showing recent notifications<br>- Tabs: All, Unread, Mentions<br>- Notification items: avatar, message, timestamp<br>- Mark as read on click<br>- "View All" link to full page | - Firestore: `notifications` collection<br>- Real-time listener for new notifications<br>- Types: new message, session reminder, inquiry response<br>- Mark as read API<br>- FCM push notifications |
| 3 | **Favorites/Saved Tutors** | Parent | `Card`, `Button`, `Badge`, `Avatar`, `Dialog`, `Toast` | - "Save" heart icon on tutor cards<br>- Dedicated "Favorites" page<br>- Grid of saved tutor cards<br>- Quick actions: View Profile, Message, Book<br>- Remove from favorites<br>- Empty state with search CTA | - Firestore: `parent` doc with `favoriteTutors` array<br>- Add/remove tutor ID from array<br>- Query tutor details by IDs |
| 3 | **Child-Specific Tutor Recommendations** | Parent | `Card`, `Badge`, `Avatar`, `Button`, `Separator`, `Tabs` | - Dashboard section per child<br>- "Recommended for [Child Name]"<br>- Algorithm considers: past sessions, subjects, performance<br>- Match score badges<br>- "Book Now" quick action | - Firestore query with ML-based ranking<br>- Analyze: child's session history, subjects, tutor ratings<br>- Return top 3-5 tutors<br>- Cache recommendations (refresh daily) |
| 3 | **Session Feedback & Rating** | Parent | `Dialog`, `Form`, `Textarea`, `RadioGroup` (stars), `Button`, `Alert` | - Post-session dialog (auto-triggered or manual)<br>- 5-star rating component<br>- Textarea for written feedback<br>- Optional: rate specific aspects (punctuality, teaching quality)<br>- Submit feedback<br>- Thank you message | - Firestore: update session doc with rating/feedback<br>- Update tutor's average rating<br>- Create review document in `reviews` collection<br>- Trigger tutor notification |
| 3 | **Settings & Preferences** | Parent | `Card`, `Form`, `Input`, `Switch`, `Select`, `Button`, `Tabs`, `Separator`, `Avatar` | - Tabs: Profile, Security, Notifications, Preferences<br>- Update name, email, phone, avatar<br>- Change password form<br>- Notification toggles (email, push, SMS)<br>- Timezone, language, currency selects<br>- Save button with loading state | - Firebase Auth: update profile, email, password<br>- Firestore: update parent doc (preferences)<br>- Image upload to Firebase Storage<br>- Validate email uniqueness |

---

## Implementation Roadmap

### **Phase 1 Duration:** 4-6 weeks (MVP Launch)
**Priority Features:**
- Authentication
- Child Management
- Tutor Search & Filter (P-1)
- View Tutor Profile (P-3)
- Send Inquiry (P-4)

**Deliverables:**
- Functional parent portal with core tutoring discovery
- Basic Firebase backend setup
- Responsive UI with shadcn/ui

---

### **Phase 2 Duration:** 4-5 weeks (Enhanced Experience)
**Priority Features:**
- Inquiry Management (P-5)
- AI Tutor Matchmaker (P-2) - Key differentiator
- Session Booking
- In-App Messaging
- Upcoming Sessions Dashboard

**Deliverables:**
- Complete booking workflow
- Real-time communication
- AI-powered matching system

---

### **Phase 3 Duration:** 5-7 weeks (Scale & Optimize)
**Priority Features:**
- Progress Tracking & Analytics
- Payment/Billing Integration
- Session History & Reports
- Notifications Center
- Advanced features (Favorites, Recommendations, Settings)

**Deliverables:**
- Full-featured parent platform
- Payment processing
- Comprehensive analytics
- Production-ready application

---

## State Management Architecture (Zustand)

### Recommended Stores:

```typescript
// stores/authStore.ts
interface AuthState {
  user: Parent | null;
  isAuthenticated: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

// stores/childrenStore.ts
interface ChildrenState {
  children: Child[];
  selectedChild: Child | null;
  loading: boolean;
  fetchChildren: () => Promise<void>;
  addChild: (child: Child) => Promise<void>;
  updateChild: (id: string, data: Partial<Child>) => Promise<void>;
  deleteChild: (id: string) => Promise<void>;
}

// stores/tutorSearchStore.ts
interface TutorSearchState {
  tutors: Tutor[];
  filters: SearchFilters;
  loading: boolean;
  searchTutors: (query: string) => Promise<void>;
  setFilters: (filters: Partial<SearchFilters>) => void;
  clearFilters: () => void;
}

// stores/sessionStore.ts
interface SessionState {
  upcomingSessions: Session[];
  sessionHistory: Session[];
  loading: boolean;
  fetchSessions: () => Promise<void>;
  bookSession: (data: BookingData) => Promise<void>;
  cancelSession: (id: string) => Promise<void>;
}
```

---

## Firebase Schema Design

### Collections Structure:

```
📁 users (parent docs)
  ├── parentId
      ├── email, name, phone, avatar, createdAt
      ├── preferences: { notifications, timezone, language }
      ├── favoriteTutors: [tutorId1, tutorId2]

📁 children
  ├── childId
      ├── parentId, name, age, grade, subjects[], avatar

📁 tutors
  ├── tutorId
      ├── email, name, bio, subjects[], hourlyRate, district
      ├── availability, qualifications, verificationStatus
      ├── rating, reviewCount

📁 inquiries
  ├── inquiryId
      ├── parentId, tutorId, childId, message, status
      ├── createdAt, respondedAt

📁 sessions
  ├── sessionId
      ├── parentId, tutorId, childId
      ├── dateTime, duration, subject, status
      ├── notes, feedback, rating

📁 conversations
  ├── conversationId (composite: parentId_tutorId)
      ├── participants[], lastMessage, lastMessageAt
      📁 messages (subcollection)
          ├── messageId
              ├── senderId, text, timestamp, read

📁 notifications
  ├── notificationId
      ├── userId, type, title, message, read, createdAt

📁 transactions
  ├── transactionId
      ├── parentId, sessionId, amount, status, stripePaymentId
```

---

## Key shadcn/ui Components Library

### Install Required Components:

```bash
npx shadcn-ui@latest add button card input label form select dialog table badge avatar dropdown-menu tabs separator skeleton alert toast calendar slider checkbox radio-group textarea switch progress scroll-area sheet popover
```

### Custom Components to Build:

1. **TutorCard** - Reusable card for tutor listings
2. **SessionCard** - Display session details
3. **ChildSelector** - Dropdown with child avatars
4. **RatingStars** - Interactive rating component
5. **FilterSheet** - Mobile-friendly filter sidebar
6. **MessageBubble** - Chat message component
7. **NotificationItem** - Notification list item
8. **StatCard** - Dashboard statistic display

---

## Next Steps for Development:

### Week 1-2: Setup & Auth
1. Initialize Next.js project with TypeScript
2. Install shadcn/ui and configure Tailwind
3. Set up Firebase project and SDK
4. Implement authentication flows
5. Create layout components (Header, Sidebar, Footer)

### Week 3-4: Child Management & Tutor Search
1. Build child CRUD functionality
2. Implement tutor search with filters
3. Create tutor profile page
4. Add inquiry system

### Week 5-6: Polish & Testing
1. Responsive design refinements
2. Error handling and loading states
3. Form validation
4. Unit and integration testing

---

## Success Metrics for MVP:

- [ ] Parent can sign up and authenticate
- [ ] Parent can add/manage children profiles
- [ ] Parent can search and filter tutors
- [ ] Parent can view detailed tutor profiles
- [ ] Parent can send connection inquiries
- [ ] All forms have proper validation
- [ ] UI is responsive on mobile/tablet/desktop
- [ ] Firebase security rules are implemented

---

## Notes & Best Practices:

1. **Security:**
   - Implement Firebase Security Rules for all collections
   - Validate all inputs on both client and server
   - Use environment variables for API keys

2. **Performance:**
   - Implement pagination for tutor search
   - Use Firestore indexes for complex queries
   - Lazy load images and components
   - Cache frequently accessed data

3. **UX:**
   - Add loading skeletons for all async operations
   - Provide clear error messages
   - Implement optimistic UI updates
   - Use toast notifications for feedback

4. **Accessibility:**
   - shadcn/ui components are accessible by default
   - Add ARIA labels where needed
   - Ensure keyboard navigation works
   - Test with screen readers

---

**Generated by:** Senior Fullstack Developer & UI/UX Specialist
**Date:** November 5, 2025
**Version:** 1.0
