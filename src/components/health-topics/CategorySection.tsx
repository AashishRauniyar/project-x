import React from "react";

interface CategoryItem {
  image: string;
  title: string;
  author: string;
  readTime: string;
}

interface CategorySectionProps {
  title: string;
  viewAllText: string;
  items: CategoryItem[];
  backgroundColor?: string;
}

const CategorySection: React.FC<CategorySectionProps> = ({
  title,
  viewAllText,
  items,
  backgroundColor = "bg-white",
}) => {
  return (
    <section className={`py-20 ${backgroundColor}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl font-bold text-gray-900">{title}</h2>
          <a
            href="#"
            className="text-red-600 font-bold text-lg hover:underline flex items-center gap-2 group"
          >
            {viewAllText}
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <article
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer border border-gray-100 hover:scale-105"
            >
              <div className="overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              <div className="p-6">
                <h3 className="font-bold text-lg mb-4 leading-tight text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  {item.title}
                </h3>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{item.author}</span>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{item.readTime}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
