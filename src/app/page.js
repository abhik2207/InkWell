import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-purple-700 to-blue-700">
      <div className="container mx-auto flex flex-col justify-center items-center">
        <h2 className="text-4xl text-white font-bold mb-12">Welcome to InkWell</h2>
        <Link href='/blogs'>
          <button className="border-none outline-none px-6 py-2 bg-black text-white rounded-lg shadow-2xl cursor-pointer text-xl font-semibold transition-all hover:scale-[1.05]">Explore blogs</button>
        </Link>
      </div>
    </div>
  );
}
