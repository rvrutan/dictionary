export default function Footer() {
  return (
    <footer className=" py-4">
      <div className="container mx-auto text-center ">
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="https://github.com/Gurprasad34"
            className="text-black btn btn-link p-2 text-lg hover:text-neutral transition duration-200"
          >
            Gurprasad Singh
          </a>
          <a
            href="https://github.com/rvrutan"
            className="text-black btn btn-link p-2 text-lg hover:text-neutral transition duration-200"
          >
            Roni v. Rutan
          </a>
          <a
            href="https://github.com/Saosyn"
            className="text-black btn btn-link p-2 text-lg hover:text-neutral transition duration-200"
          >
            Tim Ehli
          </a>
        </div>
      </div>
    </footer>
  );
}