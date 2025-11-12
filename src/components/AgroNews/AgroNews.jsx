import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import NewsCard from "../NewsCard/NewsCard";




const AgroNews = () => {
    const axiosPublic = useAxiosPublic()
    const [newsData, setNewsData] = useState([])
    useEffect(()=>{
        axiosPublic.get('/news')
        .then(data=>setNewsData(data.data))
        .catch(error=>{
            // console.log(error.message)
        })
    },[])
  return (
    <section className="py-10 lg:py-20">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-green-600">
            Agro <span className="text-gray-800">News & Blogs</span>
          </h2>
          <p className="text-gray-600 mt-2">
            Stay updated with the latest agricultural insights, trends, and innovations.
          </p>
        </div>

        {/* News Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsData?.map((post) => (
            <NewsCard post={post} key={post._id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgroNews;
