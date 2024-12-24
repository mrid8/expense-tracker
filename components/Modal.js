export default function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          {children}
          <button
            onClick={onClose}
            className="mt-4 w-full py-2 px-4 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600"
          >
            Close
          </button>
        </div>
      </div>
    );
  }
  