export function Footer() {
  return (
    <footer className="border-t py-6 flex items-center justify-center">
      <div className="container text-center text-sm text-gray-500">
        <p>
          © {new Date().getFullYear()} CPU Scheduler Visualizer. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
