# CRM Mobile

Expo React Native CRM app with Firebase Authentication and Firestore-backed contact CRUD.

## Features

- Email/password sign in and account creation with Firebase Authentication.
- Firestore CRUD for contacts in the `contacts` collection.
- Contact fields: first name, last name, phone, email, company, school, project, notes, and employee owner.
- People, Company, and Schools tabs. The Schools tab maps contacts by school and then by assigned employee.
- `src/images/` is present so you can upload `background.jpg`, `call.png`, `email.png`, and `sms.png` later.

## Firebase setup

1. Create a Firebase project at <https://console.firebase.google.com/>.
2. In **Authentication**, enable **Email/Password** sign-in.
3. In **Firestore Database**, create a database.
4. In **Project settings → General → Your apps**, create a Web app and copy its config values.
5. Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

```env
EXPO_PUBLIC_FIREBASE_API_KEY=your-api-key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
EXPO_PUBLIC_FIREBASE_APP_ID=your-app-id
```

## Example Firestore security rules for signed-in users

Use these starter rules while developing if every signed-in user can read/write contacts:

```text
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /contacts/{contactId} {
      allow read, create, update, delete: if request.auth != null;
    }
  }
}
```

## Install and run

Install dependencies:

```bash
npm install
```

Start Expo:

```bash
npm start
```

Run Android emulator:

```bash
npm run android
```

Run Web:

```bash
npm run web
```

If Expo is not found, use:

```bash
npx expo start
npx expo start --android
npx expo start --web
```

## Required local images

Upload these files into `src/images/` before running screens that show contact cards/details:

- `src/images/background.jpg`
- `src/images/call.png`
- `src/images/email.png`
- `src/images/sms.png`
