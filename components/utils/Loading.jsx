import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function CircularIndeterminate() {
  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        right: "0",
        height: "100%",
        width: "100%",
        zIndex: "4",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "rgb(0, 0, 0 , 0.2)",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    </div>
  );
}
