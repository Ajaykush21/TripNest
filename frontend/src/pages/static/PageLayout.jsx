const PageLayout = ({ title, subtitle, children }) => (
  <div className="bg-surface py-16">
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <header className="mb-10 space-y-4 text-slate-900">
        <p className="text-xs uppercase tracking-[0.3em] text-brand">{subtitle}</p>
        <h1 className="font-display text-3xl font-semibold">{title}</h1>
        <div className="h-1 w-16 rounded-full bg-brand" />
      </header>
      <div className="prose prose-slate max-w-none text-slate-700 prose-headings:text-slate-900 prose-a:text-brand">
        {children}
      </div>
    </div>
  </div>
);

export default PageLayout;

