export const Header = () => {
  return (
    <>
      <header className="h-16 bg-indigo-900 text-white flex items-center px-4 justify-between shrink-0">
        <h1 className="text-2xl font-bold tracking-tight">
          ReportBuilder <span className="text-base-300">PHP</span>
        </h1>
        <button className="px-4 py-1.5 text-md font-semibold bg-indigo-600 rounded-md hover:scale-105 ease-out transition-all duration-200">
          Generar PHP
        </button>
      </header>
    </>
  );
};
