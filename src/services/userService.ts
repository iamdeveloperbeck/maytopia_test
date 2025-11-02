/* eslint-disable @typescript-eslint/no-explicit-any */
// src/services/userService.ts
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";

export type UserUpdatePayload = {
  phone?: string;
  displayName?: string;
  [k: string]: any; // allow extra fields if needed
};

/**
 * normalizePhone — oddiy telefon normallashtirish (+998... ga moslash uchun misol).
 * O'zingizga moslab o'zgartiring.
 */
function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D+/g, "");
  // example: if local numbers like 901234567 -> +998901234567
  if (digits.length === 9) return `+998${digits}`;
  if (digits.length === 12 && digits.startsWith("998")) return `+${digits}`;
  if (digits.length === 13 && digits.startsWith("+")) return digits;
  if (digits.length === 13 && digits.startsWith("+998")) return digits;
  // fallback: return as-is with plus if missing
  return digits.startsWith("+") ? digits : `+${digits}`;
}

export type UserDoc = {
  id: string;
  createdAt?: any;
  [k: string]: any;
};

export type CommentPayload = {
  userId: string;
  comment: string;
  phone: string;
  type: "stol" | "dastavka";
  stol?: number;
  skidkaPercent?: number; // optional (default 0)
};

/**
 * ensureUser:
 * - look for users where phone == normalizedPhone
 * - if found, return that user (id + data)
 * - otherwise create new user doc and return it
 */
export async function ensureUser(): Promise<UserDoc> {
  const usersRef = collection(db, "users");

  // create
  const docRef = await addDoc(usersRef, {
    phone: "",
    createdAt: serverTimestamp(),
  });
  return { id: docRef.id };
}

export async function updateUserClient(
  userId: string,
  payload: UserUpdatePayload
): Promise<void> {
  if (!userId) throw new Error("userId is required");

  // normalize phone if present
  if (payload.phone) {
    const normalized = normalizePhone(payload.phone);
    if (!normalized) throw new Error("Invalid phone");
    payload.phone = normalized;
  }

  // remove undefined fields
  const cleanPayload: Record<string, any> = {};
  Object.entries(payload).forEach(([k, v]) => {
    if (v !== undefined) cleanPayload[k] = v;
  });

  const userRef = doc(db, "users", userId);
  // Optional: you can read the doc first to confirm existence
  const snap = await getDoc(userRef);
  if (!snap.exists()) throw new Error("User not found");

  await updateDoc(userRef, cleanPayload);
}

export async function addComment(payload: CommentPayload): Promise<string> {
  const { userId, comment, type, stol, phone } = payload;

  if (!userId) throw new Error("userId is required");
  if (!comment) throw new Error("comment is required");

  const reviewsRef = collection(db, "reviews");
  const docRef = await addDoc(reviewsRef, {
    userId,
    comment,
    skidkaPercent: 2,
    type,
    stol: stol || "",
    phone,
    createdAt: serverTimestamp(),
  });

  return docRef.id; // return document ID
}
