import { useState } from "react";

// Define the type for the hook's return value
type UseModalReturn = [boolean, () => void, () => void, () => void];

// Create the custom hook
function useModal(initialState: boolean = false): UseModalReturn {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(initialState);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const toggleModal = () => setIsModalOpen((prev) => !prev);

  return [isModalOpen, openModal, closeModal, toggleModal];
}

export default useModal;
