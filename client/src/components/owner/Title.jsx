import React from "react";

const Title = ({ title, subtitle }) => {
  return (
    <div className="text-center max-w-2xl mx-auto mb-12">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
        {title}
      </h1>
      {subtitle && (
        <p className="text-gray-500 text-sm sm:text-base">{subtitle}</p>
      )}
      <div className="w-20 h-[2px] bg-yellow-400 mx-auto mt-4"></div>
    </div>
  );
};

export default Title;
