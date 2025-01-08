import Link from "next/link";

const RedirectPage = () => {
  return (
    <div className="bg-white w-full h-full lg:px-48 py-10 px-10 flex flex-col gap-5 justify-center items-center">
      <h1 className="text-center">
        THANK YOU FOR YOUR PAYMENT. ORGANIZER WILL CONFIRMED THE PAYMENT.
      </h1>
      <h1>
        Go back to <Link href={`/`}>home page</Link>
      </h1>
    </div>
  );
};

export default RedirectPage;
