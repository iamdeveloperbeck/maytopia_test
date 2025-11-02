import { useEffect, useRef, useState } from "react";
import { ensureUser } from "../services/userService"; // sening ensureUser funktsiyang

const USER_KEY = "maytopi_user_id";
const CREATING_LOCK_KEY = "maytopi_user_creating";

export default function useCheckUser() {
  const [user, setUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  // ref to avoid concurrent calls within same component instance
  const inFlightRef = useRef(false);

  async function createUser() {
    // First, quick localStorage check with consistent key
    const stored = window.localStorage.getItem(USER_KEY);
    if (stored) {
      setUser(stored);
      return;
    }

    // If another tab/instance is already creating, wait a bit and re-check
    const creatingLock = window.localStorage.getItem(CREATING_LOCK_KEY);
    if (creatingLock) {
      // simple backoff: retry once after short delay
      try {
        setIsLoading(true);
        await new Promise((res) => setTimeout(res, 500)); // 0.5s
        const stored2 = window.localStorage.getItem(USER_KEY);
        if (stored2) {
          setUser(stored2);
          return;
        }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        // ignore
      } finally {
        setIsLoading(false);
      }
    }

    // Prevent multiple in-flight calls in same component instance
    if (inFlightRef.current) return;
    inFlightRef.current = true;

    try {
      setIsLoading(true);
      // set lock so parallel tabs/instances see that creation is in progress
      window.localStorage.setItem(CREATING_LOCK_KEY, "1");

      const u = await ensureUser(); // ensureUser() returns { id, phone, ... }
      if (u?.id) {
        // store using the SAME key we check above
        window.localStorage.setItem(USER_KEY, u.id);
        setUser(u.id);
      } else {
        throw new Error("ensureUser did not return id");
      }
    } catch (err) {
      console.error(err);
      setIsError(true);
    } finally {
      // remove lock and flags
      window.localStorage.removeItem(CREATING_LOCK_KEY);
      inFlightRef.current = false;
      setIsLoading(false);
    }
  }

  useEffect(() => {
    createUser();
  }, []);

  return {
    data: user,
    isLoading,
    isError,
  };
}
