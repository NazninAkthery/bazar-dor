import ProfileForm from "@/components/ProfileForm";
import { requireSession } from "@/lib/session";
export default async function UpdateProfile() {
  await requireSession("/profile/update");
  return <ProfileForm />;
}
