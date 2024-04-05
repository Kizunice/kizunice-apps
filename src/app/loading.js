export default function Loading() {
  return (
    <div className="w-full h-full fixed top-0 left-0 bg-primary opacity-15 z-50">
      <div className="flex justify-center items-center mt-[50vh]">
        <div className="loading loading-spinner loading-lg text-secondary"></div>
      </div>
    </div>
  );
}

/* <span className="loading loading-dots loading-md"></span> */
