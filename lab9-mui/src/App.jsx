import React, { useState } from 'react';
import {
  AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItemButton,
  ListItemIcon, ListItemText, Collapse, Box, Grid, Card, CardContent,
  Stack, Paper, TextField, MenuItem, Slider, InputAdornment, CssBaseline,
  useMediaQuery, useTheme
} from '@mui/material';
import {
  Menu as MenuIcon, Dashboard, Settings, AccountCircle,
  People, ShowChart, AttachMoney, AddCircleOutline, ExpandLess, ExpandMore, Security
} from '@mui/icons-material';

export default function App() {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  

  const [drawerOpen, setDrawerOpen] = useState(!isMobile);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [category, setCategory] = useState('');

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

    
      
      
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Material UI Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
        }}
      >
        <Toolbar /> 
        <List>
          <ListItemButton>
            <ListItemIcon><Dashboard /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
          
          
          <ListItemButton onClick={() => setSettingsOpen(!settingsOpen)}>
            <ListItemIcon><Settings /></ListItemIcon>
            <ListItemText primary="Settings" />
            {settingsOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={settingsOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon><AccountCircle /></ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon><Security /></ListItemIcon>
                <ListItemText primary="Account" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </Drawer>

      
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar /> 

        
        <Typography variant="h4" gutterBottom>
          Overview
        </Typography>
        
       
        <Grid container spacing={3}>
          {[
            { title: 'Total Users', value: '1,254', icon: <People fontSize="large" color="primary"/> },
            { title: 'Active Sessions', value: '342', icon: <ShowChart fontSize="large" color="success"/> },
            { title: 'Revenue', value: '$12,400', icon: <AttachMoney fontSize="large" color="warning"/> },
            { title: 'New Signups', value: '48', icon: <AddCircleOutline fontSize="large" color="info"/> }
          ].map((metric, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card>
                <CardContent>
                  {/* Stack для вертикального выравнивания */}
                  <Stack direction="column" alignItems="center" spacing={1}>
                    {metric.icon}
                    <Typography variant="subtitle1" color="text.secondary">
                      {metric.title}
                    </Typography>
                    <Typography variant="h5" fontWeight="bold">
                      {metric.value}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        
        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" gutterBottom>
            Asset Registration
          </Typography>
          
          
          <Paper elevation={4} sx={{ p: 4, maxWidth: 600 }}>
            <Stack spacing={4}>
              
              
              <TextField
                label="Asset Name"
                variant="outlined"
                fullWidth
                placeholder="Enter asset name"
              />

              
              <TextField
                label="Estimated Value"
                variant="filled"
                fullWidth
                type="number"
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
              />

              
              <TextField
                select
                label="Category Assignment"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                variant="outlined"
                fullWidth
              >
                <MenuItem value="hardware">Hardware</MenuItem>
                <MenuItem value="software">Software</MenuItem>
                <MenuItem value="furniture">Office Furniture</MenuItem>
              </TextField>

              {/* Slider (1-10) с метками */}
              <Box>
                <Typography gutterBottom color="text.secondary">
                  Priority Level (1-10)
                </Typography>
                <Slider
                  defaultValue={5}
                  min={1}
                  max={10}
                  step={1}
                  marks={[
                    { value: 1, label: 'Low (1)' },
                    { value: 5, label: 'Med (5)' },
                    { value: 10, label: 'High (10)' }
                  ]}
                  valueLabelDisplay="auto"
                />
              </Box>

            </Stack>
          </Paper>
        </Box>

      </Box>
    </Box>
  );
}