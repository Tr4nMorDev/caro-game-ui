import Person from "../components/Person";
import Caro from "../components/Caro";

const GameLayout = () => {
  return (
    <div className="playgame-page">
      <div className="playgame-cyber-shell relative z-10 mx-auto grid h-dvh min-h-0 w-full gap-4 px-4 py-4">
        <Person />
        <main className="min-h-0">
          <Caro />
        </main>
      </div>
    </div>
  );
};

export default GameLayout;
