import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  FormErrorMessage,
  Text,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import saveUser from "../store/actions/userAction";
import Wrapper from "../components/Wrapper";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function LoginPage() {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const history = useHistory();
  const dispatch = useDispatch();
  const { userData, error, loading } = useSelector((state) => state.user);

  const onChangeHandler = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleRequest = (event) => {
    event.preventDefault();
    dispatch(saveUser(values));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    token && history.push("/list");
  }, [userData]);

  return (
    <Layout>
      <Wrapper>
        <Box textAlign="center">
          <Heading>Nice to see you again!</Heading>
        </Box>
        {error && <Text color='red.700'>An error occured</Text>}
        <Box my={4} textAlign="left">
          <form enctype="multipart/form-data">
            <FormControl mr={2} mt={4} isRequired isInvalid={error}>
              <FormLabel>Username</FormLabel>
              <Input
                isRequired
                type={"text"}
                placeholder="Username"
                name="username"
                onChange={onChangeHandler}
              />
              {(error) && (
                <FormErrorMessage></FormErrorMessage>
              )}
            </FormControl>
            <FormControl mr={2} mt={4} isRequired isInvalid={error}>
              <FormLabel>Password</FormLabel>
              <Input
                isRequired
                type={"password"}
                placeholder="Password"
                name="password"
                onChange={onChangeHandler}
              />
              {(error) && (
                <FormErrorMessage></FormErrorMessage>
              )}
            </FormControl>
            <Button
              type="submit"
              onClick={handleRequest}
              mt={4}
              colorScheme="teal"
              variant="solid"
              isLoading={loading}
            >
              Login
            </Button>
            <Link to={"/register"}>
              <Text color="teal" align={"center"} mt={4}>
                If you don't have an acount click to register
              </Text>
            </Link>
          </form>
        </Box>
      </Wrapper>
    </Layout>
  );
}

export default LoginPage;
