import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import NavBar from "../NavBar/NavBar";
import ProductListPage from "../ProductListPage/ProductListPage";

export default function PositionedMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleCloseSettings = () => {
    setAnchorEl(null);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleNav = () => {
    console.log("nav");
  };

  return (
    <div>
      <NavBar/>
      <ProductListPage open={openModal} handleClose={handleCloseModal} handleOpenModal={handleOpenModal}/>
    </div>
  );
}
