import React from 'react';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ isOpen, onCancel, onConfirm }) => {
  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded-lg">
          <p className="text-lg font-semibold mb-4">Are you sure you want to update?</p>
          <div className="flex justify-end">
            <button className="px-4 py-2 bg-gray-200 rounded mr-4" onClick={onCancel}>
              Cancel
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={onConfirm}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ConfirmationDialog;
