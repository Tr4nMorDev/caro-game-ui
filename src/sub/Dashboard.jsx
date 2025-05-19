import { FaBell } from "react-icons/fa";
import "../App.css";

const routerName = "Router A"; // Tên router, bạn có thể bind dữ liệu động
const alertMessage = "No alerts"; // Thông báo bên phải header
const ipList = [
  "192.168.1.1",
  "192.168.1.2",
  "192.168.1.3",
  "10.0.0.1",
  "10.0.0.5",
]; // Ví dụ danh sách IP, bạn có thể lấy dữ liệu động
const winners = [
  {
    router: "Router A",
    ip: "192.168.1.1",
    winIp: "10.0.0.1",
    time: "2025-05-16 14:30",
  },
  {
    router: "Router B",
    ip: "192.168.1.2",
    winIp: "10.0.0.5",
    time: "2025-05-16 14:20",
  },
  {
    router: "Router C",
    ip: "192.168.1.3",
    winIp: "10.0.0.2",
    time: "2025-05-16 14:10",
  },
  // thêm dữ liệu ...
];

const Dashboard = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12 mx-[20px] md:mx-[50px] my-[30px] md:my-[50px]">
      {/* Box bên trái có bảng IP */}
      {/* Box bên trái có bảng IP */}
      <div
        className="w-full md:flex-1 md:max-w-[400px] border border-white rounded-2xl backdrop-blur-sm bg-transparent p-4 flex flex-col"
        style={{ height: "400px" }}
      >
        {/* Header */}
        <div className="flex-none mb-4">
          <div className="flex justify-between items-center">
            <div className="font-semibold text-lg">{routerName}</div>
            <div className="flex items-center gap-2 text-sm text-yellow-400">
              <FaBell />
              <span>{alertMessage}</span>
            </div>
          </div>
        </div>

        {/* Bảng danh sách IP */}
        <div className="flex-1 overflow-y-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/30">
                <th className="py-2 px-1">IP Address</th>
              </tr>
            </thead>
            <tbody>
              {ipList.map((ip, index) => (
                <tr
                  key={index}
                  className="border-b border-white/10 hover:bg-white/10"
                >
                  <td className="py-2 px-1">{ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Box chính giữa to gấp đôi */}
      <div className="w-full md:flex-[2] md:max-w-[600px] aspect-square border border-white rounded-2xl backdrop-blur-sm bg-transparent grid grid-cols-24 grid-rows-24">
        {Array.from({ length: 576 }).map((_, i) => (
          <div
            key={i}
            className="w-full h-full bg-black border border-white/20"
          />
        ))}
      </div>

      {/* Box bên phải */}
      <div
        className="w-full md:flex-1 md:max-w-[400px] border border-white rounded-2xl backdrop-blur-sm bg-transparent p-4 flex flex-col"
        style={{ height: "400px" }}
      >
        <h2 className="text-xl font-semibold mb-4 border-b border-white/30 pb-2">
          Bảng xếp hạng
        </h2>
        <div className="flex-1 overflow-y-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-white/30">
                <th className="py-2 px-1">Router</th>
                <th className="py-2 px-1">IP</th>
                <th className="py-2 px-1">Thắng IP</th>
                <th className="py-2 px-1">Vào lúc</th>
              </tr>
            </thead>
            <tbody>
              {winners.map((winner, index) => (
                <tr
                  key={index}
                  className="border-b border-white/10 hover:bg-white/10"
                >
                  <td className="py-2 px-1">{winner.router}</td>
                  <td className="py-2 px-1">{winner.ip}</td>
                  <td className="py-2 px-1">{winner.winIp}</td>
                  <td className="py-2 px-1">{winner.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
