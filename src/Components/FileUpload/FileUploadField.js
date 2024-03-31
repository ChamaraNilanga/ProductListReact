import { ChangeEvent, useState } from "react";
import { Button, Box } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";

const columns = [
  {
    field: "id",
    headerName: "Id"
  },
  {
    field: "value",
    headerName: "Value"
  }
];

export default function FileUploadField(props) {
  const { onFileChange } = props;
  const [filename, setFilename] = useState("");

//   const handleFileUpload = (e) => {
//     if (!e.target.files) {
//       return;
//     }
//     const file = e.target.files[0];
//     const { name } = file;
//     setFilename(name);
//     onFileChange(e);
//     const reader = new FileReader();
//     reader.onload = (evt) => {
//       if (!evt?.target?.result) {
//         return;
//       }
//       const { result } = evt.target;
//     };
//     reader.readAsBinaryString(file);
//   };


  const handleFileUpload = (e) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = (evt) => {
      if (!evt?.target?.result) {
        return;
      }
      // Constructing file data object
      const fileObject = {
        fieldname: "image",
        originalname: file.name,
        encoding: "7bit",
        mimetype: file.type,
        size: file.size,
        filename: file.name,
        file:file
      };
      onFileChange(fileObject); // passing file data to parent component
    };
    reader.readAsDataURL(file); // Read file as data URL
  };

  return (
    <>
      <Button
        component="label"
        variant="outlined"
        startIcon={<UploadFileIcon />}
        sx={{ marginRight: "1rem" }}
      >
        Upload Image
        <input type="file" name="image" accept=".jpg,.png,.jpeg" hidden onChange={handleFileUpload} />
      </Button>
      <Box>{filename}</Box>
    </>
  );
}