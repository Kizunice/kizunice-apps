function Stats({title, icon, value, description, color, size}){

    const getDescStyle = () => {
        if(description.includes("↗︎"))return "font-bold text-green-700 dark:text-green-300"
        else if(description.includes("↙"))return "font-bold text-rose-500 dark:text-red-400"
        else return ""
    }

    return(
        <div className={`stats w-full ${color} shadow-sm `} >
            <div className="stat gap-2">
                <div className="stat-figure text-secondary">{icon}</div>
                <div className="stat-title text-grey">{title}</div>
                <div className={`stat-value text-secondary font-[600] ${size}`}>{value}</div>
                {/* <div className={"stat-desc  " + getDescStyle()}>{description}</div> */}
            </div>
        </div>
    )
}

export default Stats