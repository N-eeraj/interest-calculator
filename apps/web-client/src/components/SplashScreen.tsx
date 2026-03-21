export default function SplashScreen() {
  return (
    <main className="grid place-content-center h-svh">
      <h2 className="space-x-1">
        <span className="mr-2 text-xl md:text-3xl text-primary dark:text-secondary dark:text-shadow-lg dark:text-shadow-secondary/50">
          Connecting to Server
        </span>
        {Array.from({ length: 3 }).map((_, i) => (
          <span
            key={i}
            className="inline-block size-1.5 md:size-1.75 bg-primary dark:bg-secondary rounded-full animate-pulse"
            style={{
              animationDelay: `${i * 300}ms`,
            }} />
        ))}
      </h2>
    </main>
  );
}
