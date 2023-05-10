import React from "react";

import { Card, CardHeader, IconButton, Typography } from "@mui/material";
import { Settings } from "@mui/icons-material";

function App() {
  return (
    <>
      <Card>
        <CardHeader
          title={
            <Typography variant="h6">LinkedIn Profile Analyzer</Typography>
          }
          action={
            <IconButton aria-label="settings">
              <Settings />
            </IconButton>
          }
        />
      </Card>
    </>
  );
}

export default App;
