export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">
          Welcome to <span className="text-orange-600">WeirdBites</span>
        </h1>
        <p className="text-2xl text-gray-600 mb-8">
          Unusual snacks from around the world
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="/products"
            className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition"
          >
            Browse Products
          </a>
          <a
            href="/about"
            className="border-2 border-orange-600 text-orange-600 px-6 py-3 rounded-lg hover:bg-orange-50 transition"
          >
            Learn More
          </a>
        </div>
      </div>
      <div className="mt-16 text-center text-sm text-gray-500">
        <p>✅ Next.js 15 + TypeScript + Tailwind CSS</p>
        <p>🚀 Slice 0 - IS-001 Complete</p>
      </div>
    </main>
  );
}
