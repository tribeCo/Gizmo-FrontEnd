import ForgetPassword from '@/components/Login&SignUp/ForgetPassword';
import { Box } from '@mui/material';

function ForgetPass() {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        backgroundImage: {
          lg: `url("https://gizmoshop.liara.run/images/media/pictures/Forget_pass.png")`, // Apply background image for lg and up
          md: `url("https://gizmoshop.liara.run/images/media/pictures/Forget_pass.png")`, // Apply background image for md and up
          sm: 'none', // Remove background image for sm and below
          xs: 'none', // Remove background image for xs
        },
        backgroundSize: 'cover', // Cover the entire space, maintaining aspect ratio
        backgroundPosition: {
          lg: 'center', // Center the background image for lg and up
          md: 'right', // Align background image to the right for md and down
          sm: 'center', // Not applicable as image is removed but set for consistency
          xs: 'center', // Not applicable as image is removed but set for consistency
        },
        backgroundColor: {
          sm: '#8ECDDD', // Change the background color for sm and below
          xs: '#8ECDDD', // Change the background color for xs
        },
        backgroundRepeat: 'no-repeat', // Prevent the background image from repeating
      }}
    >
      <ForgetPassword />
    </Box>
  );
}

export default ForgetPass;
