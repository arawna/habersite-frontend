import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserService from "../Service/UserService";
import UserTypesService from "../Service/UserTypesService";

export default function ChangeUserTypeModal({
  user,
  handleClose,
  setReloadValues,
}) {
  let [userTypes, setUserTypes] = useState([]);
  const { authItem } = useSelector(({ auth }) => auth);

  useEffect(() => {
    const userTypeService = new UserTypesService();
    userTypeService.getUserTypes().then((res) => {
      setUserTypes(res.data);
    });
  }, []);

  let [selectedType, setSelectedType] = useState(user.userType.id);
  const handleChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleSubmit = () => {
    const userService = new UserService();
    userService
      .changeUserType({
        token: authItem[0].token,
        typeId: selectedType,
        userId: user.id,
      })
      .then((res) => {
        if (res.data.success) {
          alert(res.data.message);
          setReloadValues(new Date().toISOString());
          handleClose();
        } else {
          alert(res.data.message);
        }
      });
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Kullanıcı Tipi</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedType}
          label="Kullanıcı Tipi"
          onChange={handleChange}
        >
          {userTypes.map((userType) => (
            <MenuItem key={userType.id} value={userType.id}>
              {userType.type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        style={{ marginTop: "10px", width: "100%" }}
        onClick={() => handleSubmit()}
      >
        Kaydet
      </Button>
    </div>
  );
}
