import React from 'react'
import AddFormModal from '../AddFormModal/AddFormModal'
// import BasicTable from '../Table/TableComponent'
import { useState } from 'react';
import { PlusOne } from '@mui/icons-material';
import { Button } from '@mui/material';

const ProductListPage = (props) => {
  const {open, handleClose , handleOpenModal} = props;
  const [busList,setBusList] = useState([]);
  const [updateBusRow , setUpdateBusRow] = useState([]);
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",padding:"0px",alignItems: "center"}}>
        <h2>Product List</h2>
        <Button  variant="contained" onClick={handleOpenModal} endIcon={<PlusOne />}>
          Product
        </Button>
      </div>
      <AddFormModal open={open} handleClose={handleClose} busList={busList} setBusList={setBusList} updateBusRow={updateBusRow} setUpdateBusRow={setUpdateBusRow}/>
      {/* <BasicTable busList={busList} setBusList={setBusList} setUpdateBusRow={setUpdateBusRow} handleOpenModal={handleOpenModal}/> */}
    </div>
  )
}

export default ProductListPage;