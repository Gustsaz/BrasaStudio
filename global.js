// global.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect,
  getRedirectResult, signOut, onAuthStateChanged,
  setPersistence, browserLocalPersistence,
  createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, updatePassword
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import {
  getFirestore, collection, doc, setDoc, getDocs, onSnapshot,
  query, where, orderBy, deleteDoc, serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// ==== Inicialização Firebase ====
const firebaseConfig = {
  apiKey: "AIzaSyA_uh9zefLH1yPuHqemHbM9-9R_F0rMF-s",
  authDomain: "brasastudio-bd.firebaseapp.com",
  projectId: "brasastudio-bd",
  storageBucket: "brasastudio-bd.firebasestorage.app",
  messagingSenderId: "622309371157",
  appId: "1:622309371157:web:449025a3906b2674208d1c",
  measurementId: "G-SY8N6JTN63"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

// ==== Login / Logout ====
setPersistence(auth, browserLocalPersistence).catch(console.error);
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

export async function login() {
  try {
    if (isMobile) await signInWithRedirect(auth, provider);
    else await signInWithPopup(auth, provider);
  } catch (err) {
    console.error("Erro no login:", err);
  }
}

export async function logout() {
  await signOut(auth);
}

// ==== Atualiza UI do usuário ====
export function atualizarPerfilUI(user) {
  const avatar = document.querySelector(".generic-avatar img");
  const email = document.getElementById("profileEmail");
  const name = document.getElementById("profileName");
  const avatarModal = document.getElementById("currentAvatarImg");
  const logoutBtn = document.getElementById("logoutBtn");

  if (!user) {
    if (avatar) avatar.src = "img/Generic_avatar.png";
    if (email) email.value = "";
    if (name) name.value = "";
    if (avatarModal) avatarModal.src = "img/Generic_avatar.png";
    if (logoutBtn) logoutBtn.style.display = "none";
    return;
  }

  if (avatar) avatar.src = user.photoURL || "img/Generic_avatar.png";
  if (email) email.value = user.email || "";
  if (name) name.value = user.displayName || "";
  if (avatarModal) avatarModal.src = user.photoURL || "img/Generic_avatar.png";
  if (logoutBtn) logoutBtn.style.display = "inline-flex";
}

// ==== Controle de modais ====
function setupModals() {
  const avatarBtn = document.querySelector(".generic-avatar");
  const notificationsBtn = document.getElementById("notificationsIcon");

  const profileOverlay = document.getElementById("profileOverlay");
  const notificationsOverlay = document.getElementById("notificationsOverlay");
  const authOverlay = document.getElementById("authOverlay");

  const closeProfile = document.getElementById("profileCloseBtn");
  const cancelProfile = document.getElementById("cancelProfileBtn");
  const closeNotifications = document.getElementById("notificationsCloseBtn");
  const closeAuth = document.getElementById("authCloseBtn");

  function openModal(modal) {
    if (!modal) return;
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.style.display = "none";
    document.body.style.overflow = "";
  }

  if (avatarBtn) {
    avatarBtn.addEventListener("click", () => {
      if (!auth.currentUser) openModal(authOverlay);
      else openModal(profileOverlay);
    });
  }

  if (notificationsBtn) notificationsBtn.addEventListener("click", () => openModal(notificationsOverlay));

  closeProfile?.addEventListener("click", () => closeModal(profileOverlay));
  cancelProfile?.addEventListener("click", () => closeModal(profileOverlay));
  closeNotifications?.addEventListener("click", () => closeModal(notificationsOverlay));
  closeAuth?.addEventListener("click", () => closeModal(authOverlay));

  [profileOverlay, notificationsOverlay, authOverlay].forEach(modal => {
    if (modal) {
      modal.addEventListener("click", e => {
        if (e.target === modal) closeModal(modal);
      });
    }
  });
}

// ==== Listener global de login ====
onAuthStateChanged(auth, (user) => {
  atualizarPerfilUI(user);
});

// ==== Inicializa após DOM pronto ====
document.addEventListener("DOMContentLoaded", () => {
  setupModals();
  const avatarContainer = document.querySelector(".generic-avatar");
  const logoutBtn = document.getElementById("logoutBtn");
  avatarContainer?.addEventListener("click", () => { if (!auth.currentUser) login(); });
  logoutBtn?.addEventListener("click", logout);
});
