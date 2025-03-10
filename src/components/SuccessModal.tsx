import React from 'react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div 
        className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl border border-blue-500/30 w-full max-w-md overflow-hidden shadow-2xl"
        style={{animation: "successPop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards"}}
      >
        <style jsx>{`
          @keyframes successPop {
            0% { opacity: 0; transform: scale(0.8); }
            40% { opacity: 1; transform: scale(1.05); }
            100% { opacity: 1; transform: scale(1); }
          }
          @keyframes checkmark {
            0% { stroke-dashoffset: 100; opacity: 0; }
            100% { stroke-dashoffset: 0; opacity: 1; }
          }
          @keyframes glow {
            0% { box-shadow: 0 0 0px rgba(59, 130, 246, 0.5); }
            50% { box-shadow: 0 0 15px rgba(59, 130, 246, 0.8); }
            100% { box-shadow: 0 0 0px rgba(59, 130, 246, 0.5); }
          }
          .checkmark {
            stroke-dasharray: 100;
            stroke-dashoffset: 100;
            animation: checkmark 1s ease-in-out forwards 0.3s;
          }
          .success-icon {
            animation: glow 2s infinite;
          }
        `}</style>
        
        <div className="flex justify-center py-8 bg-blue-600/20">
          <div className="success-icon bg-blue-500/20 p-4 rounded-full">
            <svg className="w-16 h-16 text-green-400" viewBox="0 0 52 52">
              <circle className="text-green-100 fill-none stroke-current stroke-2" cx="26" cy="26" r="23"/>
              <path 
                className="checkmark fill-none stroke-current stroke-2" 
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
              />
            </svg>
          </div>
        </div>
        
        <div className="p-6 text-center">
          <h3 className="text-xl font-bold mb-3 text-blue-300">{title}</h3>
          <p className="text-gray-300 mb-6">{message}</p>
          
          <button 
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 transition-colors px-6 py-3 rounded-md font-medium text-white w-full"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;