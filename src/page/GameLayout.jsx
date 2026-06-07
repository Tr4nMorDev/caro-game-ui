import Person from "../components/Person";
import Caro from "../components/Caro";

const GameLayout = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-5 sm:px-6 lg:px-8">
        <Person />
        <main className="flex flex-1 items-center justify-center py-6">
          <Caro />
        </main>
      </div>
    </div>
  );
};

export default GameLayout;
