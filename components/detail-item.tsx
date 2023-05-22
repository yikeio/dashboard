import React from 'react';

export default function DetailItem({
  label,
  children
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4">
      <label className="w-32 text-sm text-gray-400 text-right">{label}</label>
      <div className="text-gray-700">{children}</div>
    </div>
  );
}
