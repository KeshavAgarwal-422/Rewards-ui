import { useState, useEffect } from 'react';

const tableScrollHeight = (offset = 342, minHeight = 225) => {
  const getHeight = () => Math.max(window.innerHeight - offset, minHeight);

  const [tableScrollHeight, setTableScrollHeight] = useState(getHeight);

  useEffect(() => {
    const updateTableHeight = () => setTableScrollHeight(getHeight());

    window.addEventListener('resize', updateTableHeight);
    return () => window.removeEventListener('resize', updateTableHeight);
  }, []);

  return tableScrollHeight;
};

export default tableScrollHeight;
