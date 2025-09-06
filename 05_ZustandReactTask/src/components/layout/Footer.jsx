import { GithubOutlined } from "@ant-design/icons";

const Footer = ({ totalTasks }) => {
  return (
    <footer className="backdrop-blur-lg bg-white/80 border-t border-gray-200 fixed bottom-0 left-0 w-full h-[60px] shadow-[0_-2px_10px_rgba(0,0,0,0.08)]">
      <div className="flex w-full justify-between items-center px-5 md:px-10 h-full">
        {/* Total Tasks */}
        <h1 className="text-sm md:text-lg font-medium text-gray-700 flex items-center gap-2">
          Total Tasks:
          <span className="px-3 py-1 text-indigo-600 text-sm md:text-base font-semibold rounded-full shadow-sm">
            {totalTasks}
          </span>
        </h1>

        {/* GitHub Link */}
        <a
          href="https://github.com/Adit122022"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-gray-600 font-medium hover:text-indigo-600 transition-colors duration-300"
        >
          <GithubOutlined className="text-xl md:text-2xl" />
          <span className="hidden sm:inline">GitHub</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
