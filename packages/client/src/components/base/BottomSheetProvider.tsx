import BottomSheet from './BottomSheet';
import useBottomSheetStore from '~/stores/useBottomSheetStore';

const BottomSheetProvider = () => {
  const { visible, closeBottomSheet, items } = useBottomSheetStore();

  return (
    <BottomSheet visible={visible} onCancel={closeBottomSheet} items={items} />
  );
};

export default BottomSheetProvider;
