import Subtitle from "./Subtitle"

function TitleCard({title, children, topMargin, TopMiddleButtons, TopSideButtons}){
  return(
      <div className={"card w-full p-6 bg-white shadow-sm " + (topMargin || "mt-6")}>

        {/* Title for Card */}
          {/* <Subtitle styleClass={TopSideButtons ? "inline-block" : ""}>
            {title}
            {
                TopMiddleButtons && <div className="inline-block align-center justify-start mt-2 md:mt-0 md:float-left">{TopMiddleButtons}</div>
            }
            {
                TopSideButtons && <div className="inline-block float-left mt-2 md:mt-0 md:float-right">{TopSideButtons}</div>
            }
          </Subtitle> */}

          <Subtitle styleClass={TopSideButtons ? "flex flex-col lg:flex-row justify-between items-center gap-4" : ""}>
            <div className="justify-center align-center">{title}</div> 

            {/* Top side button, show only if present */}
            {
                TopMiddleButtons && <div className="justify-start mt-2 md:mt-0">{TopMiddleButtons}</div>
            }

            {
                TopSideButtons && <div className="items-start lg:align-center float-left mt-2 md:mt-0">{TopSideButtons}</div>
            }
          </Subtitle>
          
          <div className="divider mt-2"></div>
      
          {/** Card Body */}
          <div className='h-full w-full pb-6 bg-white'>
              {children}
          </div>
      </div>
      
  )
}
  
  
  export default TitleCard