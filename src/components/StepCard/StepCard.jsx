const StepCard = ({step,idx}) => {
    const {icon,title,desc} = step || {}
    return (
        <div
            className="relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300 p-6 flex flex-col items-center">
            <div className="w-14 h-14 flex items-center justify-center text-3xl bg-green-100 text-green-600 rounded-full shadow-sm mb-4">{icon}</div>
            <span className="absolute -top-3 right-4 text-xs bg-green-600 text-white px-2 py-0.5 rounded-full font-medium shadow-sm">Step {idx + 1}</span>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
            {step && <div className="md:hidden w-8 h-0.5 bg-green-400 mt-4 mb-1 rounded-full" />}
        </div>
    )
}

export default StepCard