import Image from "next/image";
interface ITopEvent {
  imgbanner: string;
}

const TopEvent = () => {
  return (
    <div className="px-14 md:px-32 lg:px-48 flex flex-col gap-7 bg-blue-600 w-full py-10">
      <div className="text-3xl font-bold">Top Events!</div>
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 w-full  overflow-auto lg:px-10">
        <div className="flex gap-4 items-center justify-center lg:items-start">
          <h1 className="text-6xl md:text-8xl lg:text-7xl font-black">1</h1>
          <Image
            height={30}
            width={70}
            alt="ok"
            src="https://images.unsplash.com/photo-1500964757637-c85e8a162699?q=80&w=3603&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="w-full h-24 md:h-32 lg:h-48 rounded-xl shadow-lg"
          />
        </div>
        <div className="flex gap-4 items-center justify-center lg:items-start">
          <h1 className="text-6xl md:text-8xl lg:text-7xl font-black">2</h1>
          <Image
            height={30}
            width={70}
            alt="ok"
            src="https://images.unsplash.com/photo-1500964757637-c85e8a162699?q=80&w=3603&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="w-full h-24 md:h-32 lg:h-48 rounded-xl shadow-lg"
          />
        </div>
        <div className="flex gap-4 items-center justify-center lg:items-start">
          <h1 className="text-6xl md:text-8xl lg:text-7xl font-black">3</h1>
          <Image
            height={30}
            width={70}
            alt="ok"
            src="https://images.unsplash.com/photo-1500964757637-c85e8a162699?q=80&w=3603&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="w-full h-24 md:h-32 lg:h-48 rounded-xl shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default TopEvent;
