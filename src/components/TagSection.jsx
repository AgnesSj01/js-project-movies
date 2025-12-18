import { Children, cloneElement } from "react";

const TagSection = ({ title, children, className = "" }) => {
  return (
    <div className={`mt-6 ${className}`}>
      <h2 className="text-xs uppercase tracking-wider text-white/80 mb-3 text-center lg:text-left">
        {title}
      </h2>

      <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
        {Children.map(children, (child) =>
          cloneElement(child, {
            className: `${child.props.className ?? ""} 
  inline-flex items-center gap-2
  bg-white/80 text-black 
  px-4 py-1.5 
  rounded-full 
  text-xs font-medium`,
          })
        )}
      </div>
    </div>
  );
};

export default TagSection;
