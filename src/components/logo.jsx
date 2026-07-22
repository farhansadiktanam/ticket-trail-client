import { Bus } from "lucide-react";
import Link from "next/link";
import { FaTicketAlt } from "react-icons/fa";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="bg-linear-to-tr from-orange-500 to-amber-500 p-2 rounded-lg text-white shadow-md shadow-orange-500/20 transition-transform duration-200 group-hover:scale-105">
        <Bus className="text-xl" />
      </div>
      <span className="font-extrabold text-xl tracking-tight bg-linear-to-r from-slate-900 via-slate-700 to-orange-500 dark:from-white dark:via-slate-200 dark:to-orange-500 bg-clip-text text-transparent transition-colors duration-200">
        TicketTrail
      </span>
    </Link>
  );
};

export default Logo;
