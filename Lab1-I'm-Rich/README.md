# Lab 1 - I Am Rich (React Native)

React Native/Expo adaptation of the beginner Flutter **I Am Rich** exercise.
It displays the text **I Am Rich** and a diamond illustration, and introduces
the core project files and visual resources.

## Run

1. Open a terminal in this folder.
2. Install packages with `npm install`.
3. Start the app with `npm start`.
4. Scan the Expo QR code with Expo Go, or choose Android, iOS, or web.

## Project structure

- `App.js`: the screen and its React Native widgets.
- `app.json`: Expo application configuration, comparable to app-level Flutter settings.
- `package.json`: package and script configuration, comparable in purpose to `pubspec.yaml`.
- `images/`: local visual assets for future exercises.

## Key React Native concepts

- `SafeAreaView` keeps the layout inside safe display areas.
- `View` is a general-purpose layout container.
- `Text` renders labels.
- `StyleSheet` collects styles in one place.
- `Diamond` is a reusable custom component built from native views.
