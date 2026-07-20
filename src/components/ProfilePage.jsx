import Image from "next/image";
import { getUser } from "@/lib/api/session";
import DashboardHeading from "./DashboardHeading";

const ProfilePage = async () => {
  const user = await getUser();

  const roleColor = {
    admin: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    vendor: "bg-pink-500/10 text-pink-400 border-pink-500/20",
    user: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  };

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "N/A";

  return (
    <div className="space-y-6 mt-6 max-w-4xl">
      <DashboardHeading title="Profile" description="My account details" />

      {/* Profile Card */}
      <div className="border border-white/5 rounded-2xl overflow-hidden bg-slate-900/40 backdrop-blur-xl">
        {/* Banner */}
        <div className="h-28 bg-linear-to-r from-orange-600 via-amber-500 to-yellow-400 relative">
          <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.05)_10px,rgba(255,255,255,0.05)_20px)]" />
        </div>

        {/* Avatar + Info */}
        <div className="px-6 pb-6 relative">
          <div className="relative inline-block -mt-9 mb-3">
            <Image
              src={
                user?.image ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "U")}&background=7c3aed&color=fff&bold=true&size=72`
              }
              alt="avatar"
              width={72}
              height={72}
              unoptimized
              className="rounded-full border-3 border-slate-900 object-cover"
            />
            <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-slate-900" />
          </div>

          <h2 className="text-xl font-bold text-white">{user?.name}</h2>
          <p className="text-sm text-slate-400 mt-0.5 mb-3">{user?.email}</p>
          <span
            className={`text-[11px] font-bold uppercase tracking-wider border rounded-full px-3 py-1 ${
              roleColor[user?.role] || roleColor.user
            }`}
          >
            {user?.role || "User"}
          </span>
        </div>
      </div>

      {/* Details Card */}
      <div className="border border-white/5 rounded-2xl bg-slate-900/40 backdrop-blur-xl p-6">
        <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-4">
          Account Details
        </p>

        <div className="divide-y divide-white/5">
          {[
            { label: "Full Name", value: user?.name },
            { label: "Email Address", value: user?.email },
            { label: "Role", value: user?.role || "User" },
            { label: "Member Since", value: memberSince },
          ].map(({ label, value }) => (
            <div key={label} className="py-4 first:pt-0 last:pb-0">
              <p className="text-xs text-slate-500 mb-1">{label}</p>
              <p className="text-sm font-medium text-white">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
