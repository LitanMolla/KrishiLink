import { Link } from "react-router";

const NotFound = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="text-center">
        <h1 className="text-7xl font-extrabold text-green-600 tracking-wider animate-bounce">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mt-3">Page Not Found</h2>
        <p className="text-gray-600 mt-2 mb-6">The page you’re looking for doesn't exist or may have been moved.</p>
        <Link to="/" className="inline-block bg-green-600 hover:bg-green-700 transition text-white px-6 py-2 rounded-lg"
        >Back To Home</Link>
      </div>
    </section>
  );
};

export default NotFound
