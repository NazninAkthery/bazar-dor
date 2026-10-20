import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
export default async function Profile() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?protected=1");
  return <section className="profile-card card"><span className="avatar-circle">{session.user.name.charAt(0)}</span><h1>আমার প্রোফাইল</h1><dl><dt>নাম</dt><dd>{session.user.name}</dd><dt>ইমেইল</dt><dd>{session.user.email}</dd></dl><Link href="/profile/update" className="btn btn-primary">তথ্য আপডেট করুন</Link></section>;
}
