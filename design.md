# TEXA Mobile App Design

## Brand Identity

**Name:** TEXA  
**Tagline:** "Create. Connect. Commerce."  
**Style:** Ultra-premium, dark-first, glossy, modern, animated, creator economy focused  
**Visual Mood:** Futuristic black, charcoal, neon blue, electric purple, gold highlights, glassmorphism, soft gradients, rounded cards, premium shadows

### Color Palette

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `primary` | #0a7ea4 | #00D9FF | Accent, CTAs, highlights |
| `background` | #ffffff | #0A0E27 | Screen background |
| `surface` | #f5f5f5 | #1A1F3A | Cards, elevated surfaces |
| `foreground` | #11181C | #F0F2F5 | Primary text |
| `muted` | #687076 | #8B92A0 | Secondary text |
| `border` | #E5E7EB | #2A3050 | Dividers, borders |
| `success` | #22C55E | #4ADE80 | Success states |
| `warning` | #F59E0B | #FBBF24 | Warning states |
| `error` | #EF4444 | #F87171 | Error states |
| `accent-purple` | #9333EA | #C084FC | Secondary accent |
| `accent-gold` | #D4AF37 | #FFD700 | Premium highlights |

### Typography

- **Display:** Bold, 28-32px (screen titles)
- **Heading:** Semibold, 18-20px (section headers)
- **Body:** Regular, 14-16px (content)
- **Caption:** Regular, 12-13px (metadata)
- **Mono:** 12-14px (timestamps, codes)

## Screen List

### Authentication & Onboarding (7 screens)
1. **Splash Screen** — Logo, loading animation
2. **Welcome Screen** — Language selection, "Get Started" CTA
3. **Login Screen** — Phone/email input, password, forgot password link
4. **OTP Verification** — 6-digit code input, resend timer
5. **Signup Screen** — Phone/email, password, terms checkbox
6. **Onboarding Flow** (multi-step)
   - Create username
   - Add profile photo
   - Choose interests (chips)
   - Follow suggested creators
   - Enable notifications
7. **Forgot Password** — Email/phone input, reset link

### Main Navigation (5 tabs)
1. **Home Feed**
2. **Search / Explore**
3. **Create** (floating action)
4. **Reels / Videos**
5. **Profile**

### Home & Feed (8 screens)
1. **Home Feed** — Infinite scroll, algorithmic + following feed tabs, story tray
2. **Story Viewer** — Full-screen story, progress bars, tap navigation, reactions
3. **Story Creator** — Image/video/text upload, stickers, music
4. **Post Detail** — Full post view, comments sheet, likes list
5. **Comments Sheet** — Threaded comments, reply input
6. **Likes List** — Users who liked the post
7. **Share Sheet** — Copy link, share to DM, external share
8. **Post Report Modal** — Report reason, description

### Explore & Search (6 screens)
1. **Explore Grid** — Masonry layout, trending content
2. **Search Screen** — Search bar, history, suggestions
3. **Search Results** — Users, posts, reels, hashtags, sounds
4. **Hashtag Page** — Hashtag info, posts, trending
5. **Category Filter** — Filter by content type, verified, date
6. **Trending Page** — Trending hashtags, creators, reels

### Post Creation (5 screens)
1. **Post Creator** — Media picker, carousel, text post, poll, link preview
2. **Media Editor** — Crop, rotate, filters, text overlay
3. **Caption Editor** — Caption input, hashtag suggestions, mention suggestions
4. **Audience Selector** — Public, followers, close friends, private
5. **Schedule Post** — Date/time picker, draft save

### Reels / Short Videos (6 screens)
1. **Reels Feed** — Fullscreen vertical video, swipe up/down
2. **Reel Detail** — Like, comment, share, follow, audio page
3. **Reel Upload** — Video trim, cover selector, speed, filters
4. **Audio Page** — Audio info, remix option, use sound
5. **Reel Comments** — Comments sheet, reply
6. **Reel Report** — Report reason

### Profile (12 screens)
1. **Profile Screen** — Avatar, bio, stats, tabs (posts, reels, tagged, saved)
2. **Edit Profile** — Name, bio, avatar, cover, pronouns, location
3. **Profile Settings** — Privacy, notifications, security, blocked users
4. **Followers List** — Followers with follow/unfollow
5. **Following List** — Following with unfollow
6. **Follow Requests** — Pending requests, accept/reject
7. **Blocked Users** — Blocked list, unblock option
8. **Saved Posts** — Saved posts grid
9. **Collections** — Collections of saved posts
10. **Creator Dashboard** — Analytics, insights, best posting time
11. **Security Settings** — 2FA, sessions, password, backup codes
12. **Account Settings** — Language, theme, data download, delete account

### Messaging (8 screens)
1. **DM Inbox** — Conversation list, search, muted/archived
2. **Chat Screen** — Message list, input, typing indicator, reactions
3. **New Chat** — User search, create conversation
4. **Group Chat Creation** — Add members, group name
5. **Conversation Settings** — Theme, mute, archive, block
6. **Chat Attachments** — Image, video, file, voice note
7. **Message Search** — Search in conversation
8. **Chat Folders** — Organize conversations

### Marketplace (8 screens)
1. **Store Profile** — Store info, products grid, reviews
2. **Product List** — Products with filters, search
3. **Product Detail** — Images, price, variants, reviews, wishlist, add to cart
4. **Cart** — Items, quantity, total, checkout
5. **Checkout** — Shipping, payment method, order summary
6. **My Orders** — Order list, status tracking
7. **Order Detail** — Items, timeline, tracking
8. **Seller Orders** — Seller's orders, status management

### Creator Tools (4 screens)
1. **Creator Dashboard** — Analytics overview, insights
2. **Analytics Detail** — Followers, engagement, reach, impressions
3. **Content Calendar** — Scheduled posts, drafts
4. **Verification Request** — Form, document upload, status

### Admin Panel (6 screens)
1. **Admin Dashboard** — Overview, stats, moderation queue
2. **User Management** — Search, ban, suspend, verify
3. **Content Moderation** — Posts, reels, stories, reports
4. **Report Management** — Pending reports, approve/reject
5. **Verification Management** — Pending requests, approve/reject
6. **Platform Analytics** — User growth, engagement, revenue

### Settings & Account (8 screens)
1. **Settings Home** — Account, privacy, notifications, security, about
2. **Privacy Settings** — Private account, block, restrict, message filter
3. **Notification Settings** — Push, in-app, categories, mute
4. **Security Settings** — 2FA, sessions, password, backup codes
5. **Device Sessions** — Active sessions, logout device
6. **2FA Setup** — QR code, backup codes
7. **Help & Support** — FAQ, contact, report bug
8. **About** — Terms, privacy policy, version

### Modals & Sheets
- Confirmation modals (delete, logout, block)
- Report modals (user, post, reel, story, comment)
- Permission request screens (camera, microphone, gallery, notifications, contacts)
- Error boundary screen
- Offline banner
- Loading skeletons

## Key User Flows

### User Registration & Onboarding
1. User taps "Get Started" → Welcome screen
2. Select language → Login/Signup screen
3. Enter phone/email → OTP verification
4. Create password → Signup complete
5. Create username → Profile photo → Interests → Follow creators → Enable notifications
6. Open Home feed

### Creating & Sharing a Post
1. Tap "+" (Create tab) → Post Creator
2. Select media (image/video/carousel) → Media Editor
3. Add caption, hashtags, mentions → Audience selector
4. Set to public/followers/close friends → Schedule or post now
5. Post appears in feed

### Discovering Content
1. Tap "Explore" tab → Explore grid
2. Tap search bar → Search results
3. Filter by category/verified/date → View results
4. Tap post → Post detail → Like/comment/share/save

### Messaging
1. Tap "DM" (from profile) → New Chat
2. Search user → Create conversation
3. Type message → Send
4. Receive real-time message via Socket.IO
5. See typing indicator, message status

### Shopping
1. Tap product in post/story → Product detail
2. Select variant → Add to cart
3. Tap cart → Checkout
4. Select shipping address → Payment method
5. Complete payment → Order confirmation

## Primary Content & Functionality

### Home Feed
- Infinite scroll with pagination
- Story tray at top (create, view stories)
- Post cards with media carousel, likes, comments, shares
- Double-tap to like
- Pull-to-refresh
- Algorithmic ranking (follow, interests, watch time, engagement)
- Suggested creators section

### Reels Feed
- Fullscreen vertical video
- Swipe up/down to navigate
- Like, comment, share, follow buttons
- Audio attribution, remix option
- Creator info overlay
- Watch time tracking

### Marketplace
- Product grid with images, price, rating
- Filters (category, price range, rating, seller)
- Product detail with reviews, variants
- Cart with quantity management
- Checkout with shipping and payment options
- Order tracking

### Messaging
- Real-time message delivery via Socket.IO
- Typing indicator
- Message reactions (emoji)
- Voice notes
- Image/video attachments
- Message editing and deletion
- Read receipts

### Creator Tools
- Dashboard with key metrics (followers, engagement, reach)
- Post analytics (likes, comments, shares, saves)
- Audience insights (demographics, top countries)
- Best posting time recommendations
- Content performance ranking

## Interaction Patterns

### Gestures
- **Swipe left/right:** Navigate between tabs
- **Swipe up/down:** Navigate reels, stories
- **Double tap:** Like post/reel
- **Long press:** Preview media, open context menu
- **Pull-to-refresh:** Refresh feed
- **Pinch zoom:** Zoom image

### Feedback
- **Press state:** Scale 0.97, opacity 0.9
- **Haptic feedback:** Light impact on button tap, medium on toggle
- **Loading state:** Skeleton loaders, spinner
- **Success state:** Green checkmark, toast notification
- **Error state:** Red banner, error message
- **Offline state:** Gray banner with retry button

### Animations
- **Fade in:** 250ms on screen load
- **Scale:** 80ms on press (0.97 scale)
- **Slide:** 200ms for bottom sheets
- **Rotate:** 300ms for loading spinner
- **Bounce:** 400ms for notification entrance

## Accessibility

- High contrast text (WCAG AA minimum)
- Touch targets 48x48pt minimum
- Alt text for images
- Screen reader support
- Keyboard navigation
- Haptic feedback for important actions
- Readable font sizes (minimum 14pt body)

## Performance Considerations

- Lazy load images and videos
- Pagination for feeds (20 items per page)
- Cursor-based pagination for infinite scroll
- Image thumbnails for grids
- Video preload control
- Skeleton loaders instead of blank screens
- Cache user profiles and feed data
- Compress uploads before sending

## Dark Mode

- Default to dark mode
- All colors use CSS variables
- Automatic switching based on system preference
- Manual toggle in settings
- Smooth transition between modes

## Responsive Design

- Portrait orientation (9:16)
- One-handed usage priority
- Bottom tab bar for main navigation
- Floating action button for create
- Bottom sheets for actions
- Full-screen modals for forms
