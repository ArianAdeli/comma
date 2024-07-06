import Analytics from "@/components/analytics";
import AnalyticsSkeleton from "@/components/analytics/skeleton";
import AppShell from "@/components/layout/app-shell";
import Upgrade from "@/components/shared/upgrade";
import { getUser } from "@/lib/fetchers/users";
import { getUserSubscriptionPlan } from "@/lib/subscription";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Analytics",
};

export default async function Overview() {
  const [user, plan] = await Promise.all([
    getUser(),
    getUserSubscriptionPlan(),
  ]);

  if (!user) {
    return notFound();
  }

  if (!plan.isPro) {
    return <Upgrade className="relative py-10" />;
  }
  return (
    <AppShell>
      <Suspense fallback={<AnalyticsSkeleton pages />}>
        <Analytics basePath="/api" title="Analytics" pages />
      </Suspense>
    </AppShell>
  );
}
