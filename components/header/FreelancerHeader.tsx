import { Bell, HelpCircle } from "lucide-react";
import Link from "next/link";
import ProfileDropdown from "../dropdown/ProfileDropdown";
import { User, Settings, LogOut } from "lucide-react";

const navItems = [
  { name: "Find work", path: "/find-work" },
  { name: "Saved Jobs", path: "/saved-jobs" },
  { name: "Proposals", path: "/proposals" },
];

const FreelancerHeader = () => {
  //   handle logout
  const handleLogout = async () => {
    console.log("logout");
  };

  return (
    <header className="flex items-center justify-between px-8 py-4 border-b border-black/10 bg-white">
      {/* Logo + Nav */}
      <div className="flex items-center gap-8">
        {/* Logo */}
        <div className="text-lg font-semibold text-green-600">WeWork</div>

        {/* Navigation */}
        <nav className="flex gap-6">
          {navItems.map((nav) => (
            <Link
              key={nav.name}
              href={nav.path}
              className="text-sm text-gray-700 transition-colors hover:text-green-600"
            >
              {nav.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-6">
        {/* Help */}
        <button
          aria-label="Help"
          className="text-gray-700 hover:text-green-600 transition-colors"
        >
          <HelpCircle size={20} />
        </button>

        {/* Notifications */}
        <button
          aria-label="Notifications"
          className="text-gray-700 hover:text-green-600 transition-colors"
        >
          <Bell size={20} />
        </button>

        {/* Profile */}
        <ProfileDropdown
          name="Sandeep Singh"
          role="Freelancer"
          avatarText="SS"
          links={[
            { label: "Your Profile", icon: User, href: "/freelancer-profile" },
            { label: "Account Settings", icon: Settings, href: "/account-settings" },
            { label: "Logout", icon: LogOut, onClick: handleLogout },
          ]}
        />
      </div>
    </header>
  );
};

export default FreelancerHeader;
