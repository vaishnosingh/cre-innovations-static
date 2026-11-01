/**
 * Static job listings data — shared between Server and Client components.
 * Keep this a plain data module (no 'use client', no React imports).
 */

export interface StaticJob {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  experience: string;
  type: string;
  description: string;
}

export const STATIC_JOBS: StaticJob[] = [
  { id: "1",  slug: "senior-ios-engineer",      title: "Senior iOS Engineer",        department: "ios",      location: "Delhi, India", experience: "3-6 yrs", type: "Full-time", description: "Lead iOS development using Swift, SwiftUI, and CoreML. Build AI-powered apps used by millions." },
  { id: "2",  slug: "android-engineer",          title: "Android Engineer",           department: "android",  location: "Delhi, India", experience: "2-5 yrs", type: "Full-time", description: "Build native Android apps with Kotlin and Jetpack Compose. Firebase, ML Kit, and CameraX experience preferred." },
  { id: "3",  slug: "junior-android-developer",  title: "Junior Android Developer",   department: "android",  location: "Delhi, India", experience: "0-2 yrs", type: "Full-time", description: "Start your Android career with Java/Kotlin. Learn from senior engineers in a real product environment." },
  { id: "4",  slug: "ui-ux-designer",            title: "UI/UX Designer",             department: "design",   location: "Delhi, India", experience: "2-4 yrs", type: "Full-time", description: "Design pixel-perfect interfaces in Figma. Collaborate daily with iOS and Android engineers." },
  { id: "5",  slug: "motion-graphics-designer",  title: "Motion Graphics Designer",   department: "design",   location: "Delhi, India", experience: "1-3 yrs", type: "Full-time", description: "Create stunning motion graphics in After Effects and Lottie for global app campaigns." },
  { id: "6",  slug: "ml-engineer",               title: "ML Engineer",                department: "web-ai",   location: "Delhi, India", experience: "3-5 yrs", type: "Full-time", description: "Train and deploy PyTorch / TensorFlow models with FastAPI on AWS at production scale." },
  { id: "7",  slug: "backend-engineer-python",   title: "Backend Engineer (Python)",  department: "web-ai",   location: "Delhi, India", experience: "2-5 yrs", type: "Full-time", description: "Build high-performance Django/FastAPI backends with PostgreSQL on AWS infrastructure." },
  { id: "8",  slug: "react-nextjs-developer",    title: "React / Next.js Developer",  department: "web-ai",   location: "Delhi, India", experience: "2-4 yrs", type: "Full-time", description: "Build dynamic Next.js applications with TypeScript and REST APIs." },
  { id: "9",  slug: "game-developer",            title: "Game Developer",             department: "game-dev", location: "Delhi, India", experience: "2-4 yrs", type: "Full-time", description: "Build Unity C# games and iOS Metal titles. 3D modeling experience a plus." },
  { id: "10", slug: "graphic-designer",          title: "Graphic Designer",           department: "design",   location: "Delhi, India", experience: "1-3 yrs", type: "Full-time", description: "Create brand assets, marketing materials, and in-app illustrations." },
];

export const DEPT_COLORS: Record<string, string> = {
  android:    "#10b981",
  ios:        "#7c3aed",
  design:     "#f59e0b",
  "web-ai":   "#06b6d4",
  "game-dev": "#f43f5e",
};
