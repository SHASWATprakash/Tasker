# Tasker

A cross-platform React Native application for managing todos with backend integration, authentication, and analytics visualization.

---

## Features

- **Authentication**
  - Login with username and password
  - Token-based authentication stored securely in AsyncStorage
  - Auth stack navigation implemented  

- **Todo Management**
  - Fetch todos from backend API
  - Display todos in a clean and organized dashboard

- **Analytics**
  - Visualize todo statistics using PieChart
  - Insights derived from backend analytics data

- **Persistent Storage**
  - User session and tokens saved with AsyncStorage

---

## Tech Stack

- **Frontend:** React Native, TypeScript
- **State Management:** React Hooks
- **API Communication:** Fetch / Axios
- **Navigation:** React Navigation (Auth & Main stack)
- **Storage:** AsyncStorage
- **Charts:** react-native-chart-kit (PieChart)

---

## Installation

1. Clone the repository:


git clone 
cd tasker

Install dependencies:

npm install
# or
yarn install
Run the app:
npx react-native run-android
# or
npx react-native run-ios