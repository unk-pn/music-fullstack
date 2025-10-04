import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Drawer,
  AppBar,
  Toolbar,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import { TextSwipeGlow } from '../TextSwipeGlow/TextSwipeGlow';
import { styled } from '@mui/material/styles';

const menuItems = [
  { text: 'Home page', href: '/' },
  { text: 'Tracks', href: '/tracks' },
  { text: 'Information', href: '/info' },
];

const CustomAppBar = styled(AppBar)({
  backgroundColor: '#0d1b2a',
});

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <div style={{ position: 'absolute' }}>
      <CustomAppBar position="fixed">
        <Toolbar>
          <div color="inherit" onClick={() => setOpen(true)}>
            <TextSwipeGlow text={'Menu'} />
          </div>
        </Toolbar>
      </CustomAppBar>
      <Drawer variant="persistent" anchor="left" open={open}>
        <button onClick={() => setOpen(false)} style={{ padding: '3px 0' }}>
          <ChevronLeftIcon />
        </button>
        <List>
          {menuItems.map(({ text, href }, i) => (
            <ListItemButton key={href} onClick={() => router.push(href)}>
              <ListItemIcon>
                {i == 0 ? <HomeIcon /> : null}
                {i == 1 ? <LibraryMusicIcon /> : null}
                {i == 2 ? <InfoIcon /> : null}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </div>
  );
}