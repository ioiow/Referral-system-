// Инициализация Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCEiuwSztOHlrYlowK0pJJS2Qr70pfVTNs",
    authDomain: "referral-system-350c1.firebaseapp.com",
    databaseURL: "https://referral-system-350c1-default-rtdb.firebaseio.com",
    projectId: "referral-system-350c1",
    storageBucket: "referral-system-350c1.firebasestorage.app",
    messagingSenderId: "856238997623",
    appId: "1:856238997623:web:95770afa4a6c2a6d21c672",
    measurementId: "G-7TX2MGGSFF"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();