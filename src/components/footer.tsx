export function Footer() {
  return (
    <footer className="border-t py-6 flex items-center justify-center bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
      <div className="container text-center text-sm text-gray-500 dark:text-gray-400">
        <p>
          © {new Date().getFullYear()} Kelompok 6. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
