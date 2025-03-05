"use client";

import { useRouter } from "next/navigation";
import Navbar from "@/app/ui/navbar";
import Footer from "./ui/footer";
import { useAuth } from "@/app/lib/contexts/auth-context";
import {
  HeroSection,
  FeaturesSection,
  HowItWorks,
  Partners,
  SuccessStories,
  CtaSection,
} from "./ui/home";

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <HeroSection router={router} user={user} />
      <FeaturesSection />
      <HowItWorks router={router} />
      <Partners />
      <SuccessStories />
      <CtaSection router={router} />
      <Footer />
    </>
  );
}
