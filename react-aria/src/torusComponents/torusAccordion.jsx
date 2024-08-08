import React from 'react';

const Accordion = ({ children, selectedKeys, onSelectionChange }) => {
  return (
    <div className="w-full">
      {React.Children.map(children, child =>
        React.cloneElement(child, {
          isSelected: selectedKeys.includes(child.props.eventKey),
          onSelectionChange,
        })
      )}
    </div>
  );
};

const AccordionItem = ({ eventKey, title, children, isSelected, onSelectionChange }) => {
  const handleToggle = () => {
    onSelectionChange(eventKey);
  };

  return (
    <div className="mb-2">
      <button
        className="w-full text-left py-2 px-4 bg-blue-500 text-white cursor-pointer"
        onClick={handleToggle}
        aria-expanded={isSelected}
      >
        {title}
      </button>
      {isSelected && <div className="p-4 border border-t-0 border-blue-500">{children}</div>}
    </div>
  );
};

export { Accordion, AccordionItem };
