 import Subtitle from "../Typography/Subtitle"

  
//   function TitleCard({title, children, topMargin, TopSideButtons}){
//       return(
//           <div className={"card w-full p-6 bg-base-100 shadow-xl " + (topMargin || "mt-6")}>

//             {/* Title for Card */}
//               <Subtitle styleClass={TopSideButtons ? "inline-block" : ""}>
//                 {title}

//                 {/* Top side button, show only if present */}
//                 {
//                     TopSideButtons && <div className="inline-block float-right">{TopSideButtons}</div>
//                 }
//               </Subtitle>
              
//               <div className="divider mt-2"></div>
          
//               {/** Card Body */}
//               <div className='h-full w-full pb-4 bg-base-100'>
//                   {children}
//               </div>
//           </div>
          
//       )
//   }
  
  
//   export default TitleCard ;



function TitleCard({title, children, topMargin, TopSideButtons}) {
  return (
    <div className={"card w-full p-6 bg-base-100 shadow-xl " + (topMargin || "mt-6")}>
      {/* Title and TopSideButtons */}
      <div className="flex flex-col sm:flex-row items-center  justify-between sm:items-start">
        {/* Title for Card */}
        <Subtitle styleClass={TopSideButtons ? "inline-block" : ""}>
          {title}
        </Subtitle>

        {/* Top side button, show only if present */}
        {TopSideButtons && (
          <div className="mt-2 sm:mt-0 sm:inline-block sm:ml-4">
            {TopSideButtons}
          </div>
        )}
      </div>

      <div className="divider mt-2"></div>

      {/* Card Body */}
      <div className="h-full w-full pb-4 bg-base-100">
        {children}
      </div>
    </div>
  );
}

export default TitleCard;
