import Person from "../components/Person";
import Caro from "../components/Caro";

const GameLayout = () => {
  return (
    <div className="playgame-page">
      <div className="relative z-10 mx-auto flex h-dvh min-h-0 w-full max-w-6xl flex-col px-4 py-3 sm:px-5 lg:px-6">
        <Person />
        <main className="flex min-h-0 flex-1 items-center justify-center py-3">
          <Caro />
        </main>
      </div>
    </div>
  );
};

export default GameLayout;
