import { Button } from 'antd';
import { useState } from 'react';

const ClickToCopy = ({ textToCopy }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className='center-col p-4 m-auto bg-white shadow' style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
      <span className='lg:text-xs text-xs  font-bold'>{textToCopy}</span>
      <Button
        onClick={handleCopy}
        style={{
          marginLeft: '10px',
          padding: '5px 10px',
          backgroundColor: isCopied ? 'green' : 'blue',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
        }}
      >
        {isCopied ? 'Copied!' : 'Copy'}
      </Button>
    </div>
  );
};

export default ClickToCopy;
