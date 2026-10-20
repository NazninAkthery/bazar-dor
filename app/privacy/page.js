import Link from "next/link";

export const metadata = { title: "Privacy policy | Bazar Dor" };

export default function PrivacyPage() {
  return (
    <section className="profile-card privacy-policy card">
      <h1>Privacy policy</h1>
      <p className="muted">Bazar Dor · Updated 20 October 2026</p>
      <h2>Account information</h2>
      <p>
        Bazar Dor is an educational grocery-price website. Creating an account
        stores your name, email address, and session information. Email/password
        accounts store a password hash rather than your plain-text password.
        Google or GitHub sign-in also provides your basic profile information,
        including a profile picture when available, and provider account
        details.
      </p>
      <h2>How we use your information</h2>
      <p>
        We use this information to sign you in, show your profile, let you
        update your name, and provide access to protected product details. We do
        not request access to your Google Drive, Gmail messages, GitHub
        repositories, or other unrelated account data. We do not sell your
        account information or use it for advertising.
      </p>
      <h2>Storage and cookies</h2>
      <p>
        The website is hosted on Vercel and account records are stored in a Neon
        PostgreSQL database. BetterAuth uses session cookies to keep you signed
        in. Google and GitHub process sign-in requests under their own privacy
        policies when you choose those login methods.
      </p>
      <h2>Your choices</h2>
      <p>
        You can update your name on your profile page and sign out at any time.
        For privacy or account-data enquiries, see the project maintainer's
        <a href="https://github.com/NazninAkthery"> GitHub profile</a>.
      </p>
      <Link className="back-link" href="/">
        ← হোম পেজে ফিরে যান
      </Link>
    </section>
  );
}
