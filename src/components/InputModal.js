import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormLabel,
  Input,
  FormControl,
  Flex,
} from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";
import { addDriver, updateDriver } from "../store/actions/driversAction";
function InputModal({ onClose, isOpen, initialRef, isFromUpdate, id }) {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  // let data = useSelector((state) => );
  let data = useSelector(
    (state) =>
      state && state.drivers.driversData.filter((item) => item.id === id[0])
  );

  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    photo: "",
  });

  const onChangeHandler = (event) => {
    console.log(event.target.name)
    setValues({
      ...values,
      [event.target.name]:
        event.target.name !== "photo"
          ? event.target.value
          : event.target.files[0],
    });
    console.log(values)
  };

  const handleRequest = (event) => {
    event.preventDefault();
    console.log(values)
    token && dispatch(addDriver(token, values));
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    let newValues = {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
    };
    dispatch(updateDriver(newValues, id));
    onClose();
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen} initialFocusRef={initialRef}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Driver</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form enctype="multipart/form-data">
            <Flex>
              <FormControl mr={3}>
                <FormLabel>First name</FormLabel>
                <Input
                  ref={initialRef}
                  onChange={onChangeHandler}
                  placeholder="First name"
                  name="first_name"
                  value={isFromUpdate ? data[0].first_name : null}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Last name</FormLabel>
                <Input
                  placeholder="Last name"
                  name="last_name"
                  onChange={onChangeHandler}
                  value={isFromUpdate ? data[0].last_name : null}
                />
              </FormControl>
            </Flex>
            <FormControl mt={4}>
              <FormLabel>E-Mail</FormLabel>
              <Input
                isRequired
                onChange={onChangeHandler}
                name="email"
                type={"email"}
                placeholder="E-Mail"
                value={isFromUpdate ? data[0].email : null}
              />
            </FormControl>
            {!isFromUpdate && (
              <FormControl>
                <FormLabel>Photo</FormLabel>
                <Input type={"file"} name="photo" onChange={onChangeHandler} />
              </FormControl>
            )}
          </form>
        </ModalBody>
        <ModalFooter>
          <Button
            type="submit"
            onClick={isFromUpdate ? handleUpdate : handleRequest}
            mt={4}
            colorScheme="teal"
            variant="solid"
          >
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default InputModal;
