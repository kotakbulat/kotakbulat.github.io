// Example in components/Navbar.tsx
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-transparent text-white p-4 fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-custom">Wijaya</Link>
        <div className="space-x-4 md:space-x-6">
          {/*<Link href="/" className="hover:text-blue-300 transition-colors">Home</Link>*/}
          <Link href="/portfolio" className="hover:text-blue-300 transition-colors">Portfolio</Link>
          <Link href="/experience" className="hover:text-blue-300 transition-colors">Experience</Link> {/* <-- New Link */}
          {/* Optional: Direct Contact Link */}
          {/* <a href="/#contact" className="hover:text-blue-300 transition-colors">Contact</a> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// Remember to add this Navbar to your Layout component if you use one.