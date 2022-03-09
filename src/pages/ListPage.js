import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import {
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Button,
  Input,
  useDisclosure,
  ButtonGroup,
  Center,
  Flex
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDrivers, fetchDriversWithPagination } from "../store/actions/driversAction";
import InputModal from "../components/InputModal";
import { useHistory } from "react-router-dom";

function ListPage() {
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");
  const [ids, setIds] = useState([""]);
  const [clickedId, setClickedId] = useState("");
  const [isFromUpdate, setIsFromUpdate] = useState(false);

  const initialRef = useRef();
  const dispatch = useDispatch();
  const { driversData, pagination } = useSelector((state) => state.drivers);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();
  useEffect(() => {
    const token = localStorage.getItem("token");
    token && dispatch(fetchDrivers(token));
  }, []);

  useEffect(() => {
    driversData &&
      setData(
        driversData.filter(
          (item) =>
            item.first_name.toLowerCase().includes(search.toLowerCase()) ||
            item.last_name.toLowerCase().includes(search.toLowerCase())
        )
      );
  }, [search]);

  return (
    <>
      <Header />
      <Flex direction={["column", "row"]} align={"center"} justify={"space-between"} mx={6}>
      <Input
        m={3}
        w={["25%", "50%", "75%", "100%"]}
        type={"text"}
        placeholder="Search"
        name="search"
        onChange={(event) => setSearch(event.target.value)}
      />
      <Button
        onClick={() => {
          localStorage.removeItem("token");
          history.push("/login");
        }}
      >
        Log Out
      </Button>
      </Flex>
      <Flex direction={"column"} justify={"center"} align={"center"} mx={10}>
        {driversData === [] ? (
          "Fetching Data"
        ) : (
          <Table
            boxShadow="2xl"
            rounded="md"
            size={"md"}
            bg="white"
            mb={6}
            variant="striped"
            colorScheme="gray"
          >
            <Thead>
              <Tr>
                <Th>Driver</Th>
                <Th>E-Mail</Th>
                <Th>Update Info</Th>
              </Tr>
            </Thead>
            <Tbody>
              {(data && pagination) &&
                data.slice(0, pagination.per_page).map((item) => (
                  <Tr key={item.id}>
                    <Td>{`${item.first_name} ${item.last_name}`}</Td>
                    <Td>{item.email}</Td>
                    <Td>
                      <Button
                        size={["xs"]}
                        colorScheme="teal"
                        isFromUpdate={true}
                        onClick={() => {
                          onOpen();
                          setIsFromUpdate(true);
                          setIds([...ids, item.id]);
                          setClickedId(item.id);
                        }}
                        variant="solid"
                      >
                        Update
                      </Button>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        )}
        <Button 
          mb={5}
          onClick={() => {
            onOpen();
            setIsFromUpdate(false);
          }}
        >
          Add New Driver
        </Button>

        {pagination && (
          <Center>
            <ButtonGroup spacing="6">
              <Button colorScheme="teal" onClick={dispatch(fetchDriversWithPagination(localStorage.getItem("token"), pagination.current_page - 1))} isActive={pagination.links[0].active}>
                {pagination.links[0].label}
              </Button>
              <Button colorScheme="teal" isActive={pagination.links[1].active}>
                {pagination.links[1].label}
              </Button>
              <Button colorScheme="teal" onClick={dispatch(fetchDriversWithPagination(localStorage.getItem("token"), pagination.current_page + 1))} isActive={pagination.links[2].active}>
                {pagination.links[2].label}
              </Button>
            </ButtonGroup>
          </Center>
        )}

        <InputModal
          onClose={onClose}
          isFromUpdate={isFromUpdate}
          isOpen={isOpen}
          initialRef={initialRef}
          id={ids.filter((item) => item === clickedId)}
        />
      </Flex>
    </>
  );
}

export default ListPage;
