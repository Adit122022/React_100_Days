import { GithubOutlined } from "@ant-design/icons";
import { usePlanner } from "../../store/usePlanner";

const Footer = () => {
  const { tasks } = usePlanner();
  const totalTasks = tasks.length;

  // Count pending tasks
  const pendingTasks = tasks.filter((t) => t.status === "pending").length;

  return (
    <footer className="backdrop-blur-lg bg-white/80 border-t border-gray-200 fixed bottom-0 left-0 w-full h-[60px] shadow-[0_-2px_10px_rgba(0,0,0,0.08)] z-20">
      <div className="flex justify-between items-center px-5 md:px-10 h-full">
        {/* Total & Pending Tasks */}
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-4">
          <span className="text-sm md:text-lg font-medium text-gray-700">
            Total Tasks:{" "}
            <span className="px-3 py-1 bg-indigo-100 text-indigo-600 text-sm md:text-base font-semibold rounded-full shadow-sm">
              {totalTasks}
            </span>
          </span>

          <span className="hidden lg:block text-sm md:text-lg font-medium text-gray-700">
            Pending:{" "}
            <span className="px-3 py-1 bg-rose-100 text-rose-600 text-sm md:text-base font-semibold rounded-full shadow-sm">
              {pendingTasks}
            </span>
          </span>
        </div>

        {/* GitHub Link */}
        <a
          href="https://github.com/Adit122022"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-gray-600 font-medium hover:text-indigo-600 transition-colors duration-300"
        >
          Made with ❤️
          <GithubOutlined className="text-xl md:text-2xl" />
          <span className="hidden sm:inline">GitHub</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
