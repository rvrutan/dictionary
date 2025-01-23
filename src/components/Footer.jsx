export default function Footer() {
  return (
    <footer className="bg-stone-300 p-4">
      <div className="container mx-auto text-center text-stone-700">
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="https://github.com/Gurprasad34"
            className="p-4 font-bold text-lg underline hover:text-indigo-600 transition duration-200"
          >
            Gurprasad Singh
          </a>
          <a
            href="https://github.com/rvrutan"
            className="p-4 font-bold text-lg underline hover:text-indigo-600 transition duration-200"
          >
            Roni v. Rutan
          </a>
          <a
            href="https://github.com/Saosyn"
            className="p-4 font-bold text-lg underline hover:text-indigo-600 transition duration-200"
          >
            Tim Ehli
          </a>
        </div>
      </div>
    </footer>
  );
}