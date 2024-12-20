import Image from "next/image";


const TopEvent = () => {
  return (
    <div className=" flex flex-col gap-7 w-full">

      <div className="text-2xl font-bold text-center md:text-left md:px-4 md:pb-4 lg:pb-6 text-white">

        Top Events!
      </div>
      <div className="flex flex-col lg:flex-row lg:justify-between gap-8 lg:gap-20 w-full  overflow-auto lg:px-0">
        <div className="flex gap-4 items-center justify-center lg:items-start">
          <h1 className="text-6xl md:text-8xl lg:text-7xl font-black text-white">
            1
          </h1>
          <Image
            height={30}
            width={70}
            alt="ok"
            src="https://images.unsplash.com/photo-1500964757637-c85e8a162699?q=80&w=3603&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="w-full h-24 md:h-32 lg:h-60 rounded-xl shadow-lg"
          />
        </div>
        <div className="flex gap-4 items-center justify-center lg:items-start">
          <h1 className="text-6xl md:text-8xl lg:text-7xl font-black text-white">
            2
          </h1>
          <Image
            height={30}
            width={70}
            alt="ok"
            src="https://images.unsplash.com/photo-1500964757637-c85e8a162699?q=80&w=3603&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="w-full h-24 md:h-32 lg:h-60 rounded-xl shadow-lg"
          />
        </div>
        <div className="flex gap-4 items-center justify-center lg:items-start">
          <h1 className="text-6xl md:text-8xl lg:text-7xl font-black text-white">
            3
          </h1>
          <Image
            height={30}
            width={70}
            alt="ok"
            src="https://images.unsplash.com/photo-1500964757637-c85e8a162699?q=80&w=3603&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="w-full h-24 md:h-32 lg:h-60 rounded-xl shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default TopEvent;
