import { APP_VERSION } from "../config/version";
import { ASSESSMENT_STORAGE_KEY } from "../constants/assessmentState";

const VERSION_ID = `${APP_VERSION.major}.${APP_VERSION.minor}`;

const isBrowser = typeof window !== "undefined";

export const loadAssessmentSnapshot = () => {
  if (!isBrowser) return null;
  try {
    const raw = window.localStorage.getItem(ASSESSMENT_STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw);
    if (parsed.version !== VERSION_ID) {
      window.localStorage.removeItem(ASSESSMENT_STORAGE_KEY);
      return null;
    }
    return parsed.payload ?? null;
  } catch (error) {
    console.warn("Unable to load assessment snapshot", error);
    return null;
  }
};

export const persistAssessmentSnapshot = (payload) => {
  if (!isBrowser) return;
  try {
    const envelope = {
      version: VERSION_ID,
      timestamp: Date.now(),
      payload,
    };
    window.localStorage.setItem(
      ASSESSMENT_STORAGE_KEY,
      JSON.stringify(envelope)
    );
  } catch (error) {
    console.warn("Unable to persist assessment snapshot", error);
  }
};

export const clearAssessmentSnapshot = () => {
  if (!isBrowser) return;
  try {
    window.localStorage.removeItem(ASSESSMENT_STORAGE_KEY);
  } catch (error) {
    console.warn("Unable to clear assessment snapshot", error);
  }
};
