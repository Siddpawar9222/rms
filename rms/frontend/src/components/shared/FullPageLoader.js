import React from 'react';

const FullPageLoader = () => {
  return (
    <div class="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
    <div class="flex space-x-2 justify-center items-center">
      <span class="sr-only">Loading...</span>
      <div class="h-8 w-8 bg-black dark:bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div class="h-8 w-8 bg-black dark:bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div class="h-8 w-8 bg-black dark:bg-white rounded-full animate-bounce"></div>
    </div>
  </div>
  
  );
};

export default FullPageLoader;
