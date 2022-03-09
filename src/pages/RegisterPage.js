import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  FormErrorMessage,
  Text
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import InputMask from "react-input-mask";
import Wrapper from "../components/Wrapper";
import Layout from "../components/Layout";
import api from "../utils/api";

function RegisterPage() {
  const [values, setValues] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  let history = useHistory();

  const onChangeHandler = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleRequest = (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      api
        .post("/api/shipper/register", {
          username: values.username,
          password: values.password,
          first_name: values.first_name,
          last_name: values.last_name,
          phone: values.phone,
          email: values.email,
        })
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          setIsLoading(false);
          history.push("/login");
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
      setIsLoading(false);
    } catch (error) {
      setError("Invalid username or password");
      setIsLoading(false);
      setValues({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
      });
    }
  };

  return (
    <>
      <Layout>
        <Wrapper>
          <Box textAlign="center">
            <Heading>Welcome!</Heading>
          </Box>
          {error && <Text color='red.700'>An error occured</Text>}
          <Box my={4} textAlign="left">
            <form enctype="multipart/form-data">
              <FormControl mr={2} mt={4} isRequired isInvalid={error}>
                <FormLabel>Username</FormLabel>
                <Input
                  isRequired
                  name="username"
                  onChange={onChangeHandler}
                  type={"text"}
                  value={values.username}
                  placeholder="Username"
                />
                {error && (
                  <FormErrorMessage></FormErrorMessage>
                )}
              </FormControl>
              <FormControl mr={2} mt={4} isRequired isInvalid={error}>
                <FormLabel>Password</FormLabel>
                <Input
                  isRequired
                  name="password"
                  type={"password"}
                  onChange={onChangeHandler}
                  value={values.password}
                  placeholder="Password"
                />
                {error && (
                  <FormErrorMessage></FormErrorMessage>
                )}
              </FormControl>
              <Box mt={4}>
                <Flex>
                  <FormControl mr={2} isRequired isInvalid={error}>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      isRequired
                      name="first_name"
                      type={"text"}
                      onChange={onChangeHandler}
                      value={values.first_name}
                      placeholder="First Name"
                    />
                    {error && (
                      <FormErrorMessage></FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl isRequired isInvalid={error}>
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      isRequired
                      name="last_name"
                      type={"text"}
                      onChange={onChangeHandler}
                      value={values.last_name}
                      placeholder="Last Name"
                    />
                    {error && (
                      <FormErrorMessage></FormErrorMessage>
                    )}
                  </FormControl>
                </Flex>
              </Box>
              <FormControl mt={4} isRequired isInvalid={error}>
                <FormLabel>Phone</FormLabel>
                <InputMask
                  mask="\9\09999999999"
                  value={values.phone}
                  onChange={onChangeHandler}
                  name="phone"
                >
                  {(inputProps) => (
                    <Input
                      isRequired
                      type={"tel"}
                      placeholder="Phone"
                      {...inputProps}
                    />
                  )}
                </InputMask>
                {error && (
                  <FormErrorMessage>Phone is required.</FormErrorMessage>
                )}
              </FormControl>
              <FormControl mt={4} isRequired isInvalid={error}>
                <FormLabel>E-Mail</FormLabel>
                <Input
                  onChange={onChangeHandler}
                  value={values.email}
                  isRequired
                  name="email"
                  type={"email"}
                  placeholder="E-Mail"
                />
                {error && (
                  <FormErrorMessage>E-Mail is required.</FormErrorMessage>
                )}
              </FormControl>
              <Button
                type="submit"
                mt={4}
                colorScheme="teal"
                variant="solid"
                onClick={handleRequest}
                isLoading={isLoading}
              >
                Register to Kamion!
              </Button>
            </form>
          </Box>
        </Wrapper>
      </Layout>
    </>
  );
}

export default RegisterPage;
