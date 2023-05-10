import React from "react";

import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
  ListItemAvatar,
  LinearProgress,
  CircularProgress,
  Button,
} from "@mui/material";
import { Settings } from "@mui/icons-material";
import { useChromeStorageVariable } from "./hooks/useChromeStorageVariable";

function App() {
  const [showConfig, setShowConfig] = React.useState(false);
  const [apiKey, setApiKey] = useChromeStorageVariable("apikey", "");
  const [loading, setLoading] = React.useState(true);

  const techList = [
    { name: "React", rating: 8 },
    { name: "Vue", rating: 7 },
    { name: "TypeScript", rating: 9 },
  ];

  const name = "John Doe";

  return (
    <>
      <Card>
        <CardHeader
          title={
            <Typography variant="h6">LinkedIn Profile Analyzer</Typography>
          }
          action={
            <IconButton
              aria-label="settings"
              onClick={() => setShowConfig((config) => !config)}
            >
              <Settings />
            </IconButton>
          }
        />
      </Card>

      {showConfig && (
        <Card>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                mt: 2,
              }}
            >
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Settings
              </Typography>
              <TextField
                label="API key"
                variant="outlined"
                size="small"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                sx={{ mb: 1 }}
              />
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button onClick={() => setShowConfig(false)} sx={{ mr: 1 }}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={() => setShowConfig(false)}
                >
                  Save
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      )}

      {!showConfig && (
        <>
          {loading && (
            <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
              <CircularProgress />
            </Box>
          )}

          {!loading && (
            <Card>
              <CardHeader
                avatar={
                  <Avatar aria-label="avatar">
                    <img src="https://via.placeholder.com/150" alt="avatar" />
                  </Avatar>
                }
                title="John Doe"
                subheader="Software Engineer"
              />
              <CardContent>
                {techList.map((tech) => (
                  <Box key={tech.name} sx={{ mb: 1 }}>
                    <Typography variant="subtitle1">{tech.name}</Typography>
                    <LinearProgress
                      variant="determinate"
                      value={tech.rating * 10}
                    />
                  </Box>
                ))}
              </CardContent>
            </Card>
          )}
        </>
      )}

      <Box sx={{ textAlign: "center", p: 2 }}>
        <Typography variant="subtitle2">
          This is for education purposes only. Powered by OpenAI
        </Typography>
      </Box>
    </>
  );
}

export default App;
