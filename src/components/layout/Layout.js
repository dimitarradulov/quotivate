import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const Layout = (props) => {
  return (
    <Box mt={{ xs: 5, md: 10 }}>
      <Container {...props}>{props.children}</Container>
    </Box>
  );
};

export default Layout;
