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
} from "@mui/material";
import { Settings } from "@mui/icons-material";

function App() {
  const [showConfig, setShowConfig] = React.useState(false);
  const [apiKey, setApiKey] = React.useState("");

  const handleApiKeyChange = (event) => {
    setApiKey(event.target.value);
  };

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
          <CardHeader title="Settings" sx={{ textAlign: "center" }} />
          <CardContent>
            <Box sx={{ p: 2 }}>
              <TextField
                id="api-key-input"
                label="API Key"
                value={apiKey}
                onChange={handleApiKeyChange}
                fullWidth
              />
            </Box>
          </CardContent>
        </Card>
      )}

      {!showConfig && (
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
  );
}

export default App;
