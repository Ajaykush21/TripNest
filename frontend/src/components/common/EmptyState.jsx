import { FaceFrownIcon } from '@heroicons/react/24/outline';

const EmptyState = ({ title = 'Nothing to show yet', description = 'Check back later or adjust your filters.', action }) => (
  <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
    <FaceFrownIcon className="h-10 w-10 text-slate-300" />
    <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
    <p className="max-w-md text-sm text-slate-500">{description}</p>
    {action}
  </div>
);

export default EmptyState;

