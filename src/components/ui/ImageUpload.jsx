'use client'
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { FaPlus,FaRegTrashCan  } from "react-icons/fa6";

const ImageUpload = ({ onUploadSuccess, url, saveImage, sizes, button }) => {
  return (
    <div className="flex flex-col mb-6 justify-center items-center">
      <div className="flex justify-center items-center">
          <div className={`relative ${sizes}`}>
            {/* <div className="absolute top-0 right-0 z-10">
              <btn type="button" onClick={() => onRemove(url)} size="sm" className="bg-red-1 text-white">
                <FaRegTrashCan className="h-4 w-4" />
              </btn>
            </div> */}
            <Image
              src={url ? url : "/avatar.png"}
              alt="Avatar"
              className="object-cover"
              sizes="100"
              fill
              priority
            />
          </div>
      </div>
      <div className={`${button} w-[200px] mx-auto `}>
        <CldUploadWidget
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          signatureEndpoint="/api/sign-cloudinary-params"
          onSuccess={(result) => {
            if (typeof result.info === "object" && "secure_url" in result.info) {
              onUploadSuccess(result.info.secure_url);
            }
          }}
          options={{
            singleUploadAutoClose: true,
          }}
        >
          {({ open }) => {
            return (
              <button
                type="button"
                onClick={() => open()}
                className="flex flex-row w-full justify-center items-center rounded-b-lg bg-primary px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <FaPlus className="h-4 w-4 mr-2" />
                Upload
              </button>
            );
          }}
        </CldUploadWidget>
      </div>
      
    </div>
    
  );
}

export default ImageUpload


// export default function ImageUpload ({
//   onChange,
//   onRemove,
//   value,
// })  {
//   const onUpload = (result) => {
//     onChange(result.info.secure_url);
//   };

//   return (
//     <div>
//       <div className="mb-4 flex flex-wrap items-center gap-4">
//         {value.map((url) => (
//           <div key={url} className="relative w-[200px] h-[200px]">
//             <div className="absolute top-0 right-0 z-10">
//               <btn type="button" onClick={() => onRemove(url)} size="sm" className="bg-red-1 text-white">
//                 <FaRegTrashCan className="h-4 w-4" />
//               </btn>
//             </div>
//             <Image
//               src={url}
//               alt="collection"
//               className="object-cover rounded-lg"
//               fill
//             />
//           </div>
//         ))}
//       </div>

//       <CldUploadWidget uploadPreset="myyu6boo" onUpload={onUpload}>
//         {({ open }) => {
//           return (
//             <btn type="button" onClick={() => open()} className="bg-grey-1 text-white">
//               <FaPlus className="h-4 w-4 mr-2" />
//               Upload Image
//             </btn>
//           );
//         }}
//       </CldUploadWidget>
//     </div>
//   );
// };
