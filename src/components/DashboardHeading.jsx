const DashboardHeading = ({ title, description }) => {
  return (
    <div className="border-b border-white/5 pb-4">
      <h1 className="text-2xl font-bold text-white">{title}</h1>
      <p className="text-sm text-slate-400 mt-1">{description}</p>
    </div>
  );
};

export default DashboardHeading;
