import React from 'react';
import Link from 'next/link';

interface TOCItem {
  label: string;
  href: string;
  level?: number;
}

interface TableOfContentsProps {
  items: TOCItem[];
  className?: string;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ items, className = '' }) => {
  return (
    <div className={`bg-white border border-neutral-200 rounded-lg shadow-soft ${className}`}>
      <div className="p-6">
        <h2 className="text-xl font-bold text-neutral-900 mb-4">In This Review</h2>
        <nav>
          <ul className="space-y-2">
            {items.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  className="flex items-center text-sm text-primary-600 hover:text-primary-800 hover:bg-primary-50 px-3 py-2 rounded-md transition-colors duration-200"
                >
                  <span className="w-2 h-2 bg-primary-400 rounded-full mr-3 flex-shrink-0"></span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default TableOfContents; 