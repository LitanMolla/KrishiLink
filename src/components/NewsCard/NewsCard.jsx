import { Link } from 'react-router'

const NewsCard = ({post}) => {
    const {date,tag,image,desc,title,_id} = post || {}
    return (
        <article className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="relative">
                <img src={image} alt={title} className="w-full h-48 object-cover group-hover:scale-105 duration-500"/>
                <span className="absolute top-3 left-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full">{tag}</span>
            </div>
            <div className="p-5">
                <span className="text-xs text-gray-500">{date}</span>
                <h3 className="text-lg font-semibold text-gray-800 mt-2 group-hover:text-green-600 line-clamp-1">{title}</h3>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed line-clamp-2">{desc}</p>
                <div className="mt-4 flex justify-between items-center">
                    <Link to={`/blog/${_id}`} className="text-sm font-medium text-green-600 hover:underline">Read More →</Link>
                </div>
            </div>
        </article>
    )
}

export default NewsCard