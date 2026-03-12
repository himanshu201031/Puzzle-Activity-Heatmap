export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold">Puzzle Activity Heatmap</h1>
      </div>
      
      <div className="relative flex place-items-center mb-12">
        <p className="text-xl">Coming Soon: Your daily puzzle solving progress visualized.</p>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        {/* Heatmap will go here */}
      </div>
    </main>
  );
}
