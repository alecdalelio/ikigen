import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-white text-black dark:bg-black dark:text-white">
      <main className="flex flex-col gap-8 row-start-2 items-center text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          Welcome to <span className="text-rose-600">IKIGEN</span>
        </h1>
        <p className="text-lg sm:text-xl max-w-xl">
          An AI-guided self-discovery experience to help you reflect deeply, find clarity, and uncover your <em>Ikigai</em>.
        </p>
        <Link
          href="/reflect"
          className="mt-4 rounded-full bg-black text-white dark:bg-white dark:text-black px-6 py-3 text-sm sm:text-base font-medium hover:bg-opacity-90 transition"
        >
          Begin your journey
        </Link>
      </main>

      <footer className="row-start-3 text-xs text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Alec D’Alelio — Built with Next.js & Tailwind
      </footer>
    </div>
  );
}
