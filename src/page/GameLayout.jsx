import { PersonStanding } from "lucide-react";
import Person from "../components/Person";
import Caro from "../components/Caro";

const GameLayout = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0f172a] text-white">
      {/* Icon ở trên cùng (nếu cần) */}
      <PersonStanding className="w-8 h-8 mb-4 text-blue-400" />

      {/* Thông tin người chơi */}
      <Person />

      {/* Giao diện tìm đối thủ */}
      <Caro />
    </div>
  );
};

export default GameLayout;
