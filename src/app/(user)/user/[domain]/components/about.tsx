import MDX from "@/components/markdown/mdx";
import type { User } from "@/types";

export default function About({ user }: { user: User }) {
  if (!user.about?.trim()?.length) {
    return null;
  }
  return (
    <dl className="section-container">
      <dt className="section-title">
        <h3>About</h3>
      </dt>
      <dd className="section-content">
        <MDX source={user.about} className="!text-gray-4 !leading-6 text-sm" />
      </dd>
    </dl>
  );
}
