import Link from "next/link";

const navlinks = [
  { title: "About us", path: "/about" },
  { title: "Contact us", path: "/contact" },
];

const Header = () => {
  return (
    <header className="flex justify-between items-center px-10 py-3 fixed top-0 left-0 right-0 border-b border-b-black">
      {/* logo and navlinks */}
      <div className="flex items-center gap-10">
        {/* logo */}
        <div>
          <Link href="/">WeWork</Link>
        </div>
        {/* navlinks */}
        <nav>
          {navlinks.map((nav) => (
            <Link
              href={nav.path}
              key={nav.title}
              className="mr-5 hover:text-green-500"
            >
              {nav.title}
            </Link>
          ))}
        </nav>
      </div>

      {/* action links */}
      <div className="flex items-center gap-8">
        <Link href="/login">Log In</Link>
        <Link
          href="/signup"
          className="bg-green-700 px-5 py-2 rounded-md text-white hover:bg-green-600"
        >
          Sign Up
        </Link>
      </div>
    </header>
  );
};

export default Header;
