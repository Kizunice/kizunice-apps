function Subtitle({styleClass, children}){
    return(
        <div className={`text-xl font-semibold text-secondary ${styleClass}`}>{children}</div>
    )
}

export default Subtitle