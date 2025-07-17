import React from 'react';
import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="bg-neutral-50 border-b border-neutral-100 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ol className="flex items-center space-x-2 text-sm">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <span className="text-neutral-400 mx-2">
                  &gt;
                </span>
              )}
              {item.href ? (
                <Link
                  href={item.href}
                  className="text-primary-600 hover:text-primary-800 font-medium transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-neutral-600 font-medium">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb; 