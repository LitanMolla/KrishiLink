import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-10">
      <div className="container pt-10">
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="space-y-3">
            <Link to='/' className="text-2xl font-semibold inline-block">
              <span className="text-green-600">Krishi</span>Link
            </Link>
            <p className="text-sm text-gray-600">A trusted platform where farmers and buyers connect directly to trade fresh agricultural products.</p>
          </div>
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-gray-800">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/" className="hover:text-green-600">Home</Link></li>
              <li><Link to="/all-crops" className="hover:text-green-600">All Crops</Link></li>
              <li><Link to="/add-crops" className="hover:text-green-600">Add Crop</Link></li>
              <li><Link to="/profile" className="hover:text-green-600">Profile</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-semibold text-gray-800">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Email: support@krishilink.com</li>
              <li>Location: Dhaka, Bangladesh</li>
            </ul>
          </div>
        </div>
        <div className="text-center border-t border-gray-200 py-5 text-sm text-gray-500 mt-5">
          <p>© {new Date().getFullYear()} KrishiLink — All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
