export default function ServerError() {
  return (
    <main className="grid place-content-center h-svh">
      <h2 className="space-x-1">
        <span className="mr-2 text-xl md:text-3xl text-destructive dark:text-shadow-md dark:text-shadow-destructive/50">
          Oops! We couldn't connect to the server.
        </span>
      </h2>
    </main>
  );
}
