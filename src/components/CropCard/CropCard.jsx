import { Link } from "react-router";

const CropCard = ({ crop }) => {
  const { _id, name, type, pricePerUnit, unit, quantity, location, image, interests = [], } = crop || {};

  return (
    <div className="group rounded-lg overflow-hidden bg-white ring-1 ring-gray-200 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
      <div className="relative">
        <img src={image} alt={name} loading="lazy" className="w-full aspect-4/3 object-cover"
        />
        <span className="absolute top-3 left-3 px-3 py-1 text-xs font-medium rounded-full bg-white/90 text-gray-800 shadow">
          {type}
        </span>
        <span className="absolute top-3 right-3 px-3 py-1 text-xs font-medium rounded-full bg-black/50 text-white backdrop-blur">
          {location}
        </span>
      </div>
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <h4 className="text-lg font-semibold text-gray-900 truncate">{name}</h4>
          <span className="shrink-0 inline-flex items-center px-3 py-1 rounded-xl text-white text-xs font-semibold bg-linear-to-r from-green-300 capitalize from-primary to-green-600">
            ৳{pricePerUnit}/{unit}
          </span>
        </div>
        <Link to={`/corp-details/${_id}`} className="link rounded-md text-center">View Details</Link>
      </div>
    </div>
  );
};

export default CropCard;
