import axios from "axios";

export default axios.create({
  baseURL: "https://kamion-interview.herokuapp.com/api/shipper",
});
