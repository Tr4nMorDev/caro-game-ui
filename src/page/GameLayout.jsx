import Person from "../components/Person";
import Caro from "../components/Caro";

const GameLayout = () => {
  return (
    <div className="min-h-screen bg-[#070313] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(125deg,rgba(86,39,160,0.28),transparent_34%,rgba(24,70,140,0.24)_68%,rgba(151,57,168,0.18))]" />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.20),transparent_38%)]" />
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-5 sm:px-6 lg:px-8">
        <Person />
        <main className="flex flex-1 items-center justify-center py-6">
          <Caro />
        </main>
      </div>
    </div>
  );
};

export default GameLayout;
