export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold">
          Welcome to <span className="text-orange-600">WeirdBites</span>
        </h1>
        <p className="mb-8 text-2xl text-gray-600">Unusual snacks from around the world</p>
        <div className="flex justify-center gap-4">
          <a
            href="/products"
            className="rounded-lg bg-orange-600 px-6 py-3 text-white transition hover:bg-orange-700"
          >
            Browse Products
          </a>
          <a
            href="/about"
            className="rounded-lg border-2 border-orange-600 px-6 py-3 text-orange-600 transition hover:bg-orange-50"
          >
            Learn More
          </a>
        </div>
      </div>
      <div className="mt-16 text-center text-sm text-gray-500">
        <p>✅ Next.js 15 + TypeScript + Tailwind CSS</p>
        <p>🚀 Slice 0 - IS-007 Preview Deployment Test</p>
      </div>
    </main>
  );
}
