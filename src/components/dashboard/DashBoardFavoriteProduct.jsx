import React, { useState, useEffect } from 'react';
import { Box, Divider, Grid, Typography, Paper } from '@mui/material';
import ProductCard from '@/components/ProductCard';
import { products } from '@/utils/fakeProduct';

export default function DashBoardFavoriteProduct() {

  return (
    <Paper
      variant="outlined"
      sx={{
        height: 'fit-content',
        borderRadius: '15px',
        boxShadow: '0px 4px 5px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          padding: { xs: '15px', md: '50px' },
          maxWidth: '900px',
          maxHeight: '840px',
        }}
      >
        <Box
          sx={{
            width: { xs: '100%', md: '840px' },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            paddingBottom: '30px',
            padding: { xs: '20px', md: '0px' },
          }}
        >
          <Typography
            sx={{
              fontWeight: '700',
              fontSize: '20px',
              color: '#213346',
            }}
          >
            علاقه مندی ها
          </Typography>
          <Divider sx={{ width: '100%', paddingBottom: '20px' }} />
        </Box>
        <Box
          sx={{
            marginTop: '20px',
            borderRadius: '10px',
            width: '100%', // Use 100% width for the Box to take full width
            maxWidth: '840px', // Set a maximum width for larger screens
            // margin: 'auto', // Center the Box
            height: 'auto', // Adjust the height as needed
            overflowY: 'auto', // Enable vertical scrolling
            overflowX: 'hidden',
            '&::-webkit-scrollbar': {
              display: 'none', // Hide scrollbar for Webkit browsers (Chrome, Safari, etc.)
            },
            '-ms-overflow-style': 'none', // Hide scrollbar for IE and Edge
            'scrollbar-width': 'none', // Hide scrollbar for Firefox
          }}
        >
          <Grid
            container
            spacing={2}
            justifyContent="center" // Center Grid items horizontally
            sx={{
              // paddingRight: '30px',
              maxWidth: {md: '840px' }, // Set a maximum width for the Grid container
              margin: {sm: 'none', md: 'auto'}, // Center the Grid container
            }}
          >
            {products.map((product) => (
              <Grid item xs={8} sm={4.5} md={4} key={product.id} sx={{paddingLeft: '0px !Important'}}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Paper>
  );
}
