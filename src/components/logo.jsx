import Link from "next/link";
import { FaTicketAlt } from "react-icons/fa";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="bg-linear-to-tr from-orange-500 to-orange-500 p-2 rounded-lg text-white shadow-md shadow-orange-500/20">
        <FaTicketAlt className="text-xl" />
      </div>
      <span className="font-extrabold text-xl tracking-tight bg-linear-to-r from-white via-slate-200 to-orange-500 bg-clip-text text-transparent">
        TicketTrail
      </span>
    </Link>
  );
};

export default Logo;
