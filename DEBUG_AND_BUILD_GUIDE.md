# TEXA App - Complete Debugging & Build Guide

## Root Cause Analysis: Why App Was Crashing

### Issue 1: Buffer is Undefined in React Native ❌ → ✅ FIXED
**Problem:** `lib/crypto.ts` used Node.js `Buffer.from()` which doesn't exist in React Native/Expo
```typescript
// ❌ BROKEN
export function uint8ArrayToBase64(arr: Uint8Array): string {
  return Buffer.from(arr).toString("base64"); // ReferenceError: Buffer is not defined
}
```

**Solution:** Replaced with `base64-js` package (React Native compatible)
```typescript
// ✅ FIXED
import * as base64 from "base64-js";

export function uint8ArrayToBase64(arr: Uint8Array): string {
  return base64.fromByteArray(arr);
}
```

**Packages Added:**
```bash
pnpm add base64-js react-native-get-random-values
```

---

### Issue 2: Missing Icon Mappings ❌ → ✅ FIXED
**Problem:** Tab bar used SF Symbols (`person.fill`, `magnifyingglass`, `plus.circle.fill`) not in `IconSymbol` MAPPING
- Android/web renders MaterialIcons with `MAPPING[name]`
- Undefined keys caused render errors or blank screens

**Solution:** Added complete mappings in `components/ui/icon-symbol.tsx`
```typescript
const MAPPING: IconMapping = {
  "house.fill": "home",
  "person.fill": "person",
  "magnifyingglass": "search",
  "plus.circle.fill": "add-circle",
  "play.rectangle.fill": "play-arrow",
  "paperplane.fill": "send",
  // ... more mappings
};

// Fallback for unmapped icons
if (!materialIconName) {
  console.warn(`IconSymbol: No mapping found for "${name}". Using "help" as fallback.`);
  return <MaterialIcons color={color} size={size} name="help" style={style} />;
}
```

---

### Issue 3: Duplicate Profile Screen ❌ → ✅ FIXED
**Problem:** `app/(tabs)/_layout.tsx` had duplicate `<Tabs.Screen name="profile" />` entries
- Caused router configuration conflict
- Prevented tab navigation from working

**Solution:** Removed duplicate, kept single profile screen
```typescript
// ✅ FIXED - 6 unique tabs
<Tabs.Screen name="index" />      {/* Home */}
<Tabs.Screen name="explore" />    {/* Explore */}
<Tabs.Screen name="create" />     {/* Create */}
<Tabs.Screen name="reels" />      {/* Reels */}
<Tabs.Screen name="messages" />   {/* Messages */}
<Tabs.Screen name="profile" />    {/* Profile */}
```

---

### Issue 4: Missing Messages Tab Screen ❌ → ✅ FIXED
**Problem:** Tab layout referenced `messages` screen but file didn't exist
- Caused router error on tab navigation

**Solution:** Created `app/(tabs)/messages.tsx` with conversation list UI

---

### Issue 5: Theme Config Module Resolution ❌ → ✅ FIXED
**Problem:** `lib/_core/theme.ts` tried to import from `theme.config.js` which had CommonJS export
- TypeScript couldn't resolve ES6 import from CommonJS module

**Solution:** Inlined theme colors directly in `lib/_core/theme.ts`
```typescript
// ✅ FIXED - No external import needed
const themeColors = {
  primary: { light: '#00D9FF', dark: '#00D9FF' },
  background: { light: '#ffffff', dark: '#0A0E27' },
  // ... rest of colors
} as const;
```

---

## Step-by-Step Build & Run Instructions

### Prerequisites
```bash
# Node.js 18+ required
node --version  # Should be v18+

# pnpm required
npm install -g pnpm
pnpm --version  # Should be 9.12.0+
```

### 1. Install Dependencies
```bash
cd /home/ubuntu/texa
pnpm install
```

### 2. Clear Metro Cache (Critical for RN)
```bash
# Clear Expo cache
npx expo start -c

# Or manually clear
rm -rf node_modules/.cache
rm -rf .expo
```

### 3. Run on Web (Fastest for Testing)
```bash
cd /home/ubuntu/texa
pnpm dev:metro
# Opens at http://localhost:8081
```

### 4. Build for Android (APK)
```bash
cd /home/ubuntu/texa

# Option A: Build locally (requires Android SDK)
eas build --platform android --local

# Option B: Build in cloud (requires EAS account)
eas build --platform android
```

### 5. Run on Physical Device (Expo Go)
```bash
# Start dev server
pnpm dev:metro

# Scan QR code with Expo Go app
# Or manually enter: exps://[your-ip]:8081
```

### 6. Run on iOS Simulator (macOS only)
```bash
pnpm ios
```

### 7. Run on Android Emulator
```bash
pnpm android
```

---

## Verification Checklist

### TypeScript Compilation
```bash
pnpm check
# Should output: (no errors)
```

### No Build Errors
```bash
pnpm lint
# Should pass all ESLint checks
```

### Test Crypto Module (Critical Fix)
```bash
# Create test file: tests/crypto.test.ts
import { generateKeyPair, encryptMessage, decryptMessage } from '@/lib/crypto';

const keyPair1 = generateKeyPair();
const keyPair2 = generateKeyPair();

const message = "Hello, encrypted world!";
const encrypted = encryptMessage(
  message,
  Buffer.from(keyPair2.publicKey).toString('base64'),
  Buffer.from(keyPair1.secretKey).toString('base64')
);

const decrypted = decryptMessage(
  encrypted,
  Buffer.from(keyPair2.secretKey).toString('base64')
);

console.assert(decrypted === message, "Encryption/decryption failed!");
console.log("✅ Crypto module working!");
```

### Run Tests
```bash
pnpm test
```

---

## Common Issues & Solutions

### Issue: "App keeps stopping" on Android
**Solution:**
1. Clear cache: `npx expo start -c`
2. Rebuild: `eas build --platform android --local`
3. Check logcat: `adb logcat | grep -i texa`

### Issue: "Something went wrong" in Expo Go
**Solution:**
1. Verify dev server is running: `pnpm dev:metro`
2. Check network connection (device on same WiFi)
3. Restart Expo Go app
4. Try QR code scan again

### Issue: Web preview not loading
**Solution:**
1. Restart dev server: `pnpm dev:metro`
2. Clear browser cache: Ctrl+Shift+Delete
3. Try incognito mode
4. Check console for errors: F12 → Console tab

### Issue: "Buffer is not defined" error
**Solution:** ✅ Already fixed in this version
- Verify `lib/crypto.ts` uses `base64-js` (not `Buffer`)
- Verify `react-native-get-random-values` is installed

### Issue: Icon rendering as blank/error
**Solution:** ✅ Already fixed in this version
- Verify icon name is in `components/ui/icon-symbol.tsx` MAPPING
- Check console for "IconSymbol: No mapping found" warning
- Add missing mapping to MAPPING object

---

## Project Structure (Key Files)

```
/home/ubuntu/texa/
├── app/
│   ├── _layout.tsx                    # Root navigation (auth flow)
│   ├── (tabs)/
│   │   ├── _layout.tsx               # Tab bar configuration
│   │   ├── index.tsx                 # Home feed
│   │   ├── explore.tsx               # Explore/search
│   │   ├── create.tsx                # Create post/reel
│   │   ├── reels.tsx                 # Reels feed
│   │   ├── messages.tsx              # Messages inbox ✅ FIXED
│   │   └── profile.tsx               # User profile
│   ├── auth/
│   │   ├── login.tsx
│   │   ├── signup.tsx
│   │   └── forgot-password.tsx
│   └── chat/[id].tsx                 # Chat screen
├── lib/
│   ├── crypto.ts                     # ✅ FIXED: E2E encryption (base64-js)
│   ├── messaging.ts                  # Socket.IO messaging service
│   ├── services/api.ts               # API client
│   ├── store/auth.ts                 # Auth state (Zustand)
│   └── _core/theme.ts                # ✅ FIXED: Theme colors (inlined)
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   ├── icon-symbol.tsx           # ✅ FIXED: Complete icon mappings
│   │   └── ...
│   └── screen-container.tsx
├── theme.config.js                   # Tailwind theme
├── theme.config.ts                   # TypeScript theme export
├── app.config.ts                     # Expo config
├── package.json                      # Dependencies
└── tsconfig.json                     # TypeScript config
```

---

## Deployment Checklist

- [ ] All TypeScript errors fixed: `pnpm check`
- [ ] All tests passing: `pnpm test`
- [ ] ESLint passing: `pnpm lint`
- [ ] Dev server compiles: `pnpm dev:metro`
- [ ] Web preview loads without errors
- [ ] Android APK builds: `eas build --platform android`
- [ ] App opens without crashing on Android
- [ ] All 6 tabs navigate correctly
- [ ] Messages screen loads with mock conversations
- [ ] Profile screen shows user data
- [ ] Encryption/decryption working (crypto test passes)

---

## Next Steps

1. **Wire Backend API** — Connect to Express server for real data
2. **Implement Socket.IO** — Real-time messaging with server
3. **Add Push Notifications** — Expo Notifications for offline alerts
4. **Implement Authentication** — JWT token flow with secure storage
5. **Add Media Upload** — Image/video upload to S3
6. **Deploy to Cloud** — EAS Build + Firebase/Heroku hosting

---

## Support

For issues:
1. Check this guide first
2. Review console logs: `adb logcat` (Android) or browser DevTools (web)
3. Clear cache and rebuild: `npx expo start -c`
4. Check GitHub issues: https://github.com/expo/expo/issues
