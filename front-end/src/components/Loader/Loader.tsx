import { Box, Modal } from "@mui/material";

const Loader = () => {
  return (
    <Modal
      open={true}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disableAutoFocus
    >
      <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2  bg-transparent items-center justify-center   ">
        <div
          className="loader border-t-4 rounded-full border-black bg-gray-300 animate-spin
              aspect-square w-12 flex justify-center items-center text-yellow-700 "
        ></div>
      </Box>
    </Modal>
  );
};

export default Loader;