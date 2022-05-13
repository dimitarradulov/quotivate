import { useHistory } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const Quote = (props) => {
  const history = useHistory();

  const detailsHandler = () => {
    history.push(`/quotes/${props.id}`);
  };

  return (
    <Paper
      elevation={2}
      sx={{
        display: { xs: 'block', md: 'flex' },
        justifyContent: 'space-between',
        paddingBlock: 2,
        paddingInline: {
          xs: 2,
          md: 4,
        },
        marginBlock: 3,
      }}
    >
      <Box
        sx={{
          marginBottom: { xs: 3, md: 0 },
          width: { xs: '100%', md: '70%' },
        }}
      >
        <Typography
          variant="h5"
          component="div"
          sx={{ fontWeight: 700 }}
          gutterBottom
          noWrap
        >
          {props.text}
        </Typography>
        <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
          {props.author}
        </Typography>
      </Box>
      <Box
        sx={{
          width: {
            xs: '100%',
            md: '20%',
          },
          display: { xs: 'block', md: 'flex' },
          alignItems: 'center',
        }}
      >
        <Button
          sx={{ width: '100%' }}
          variant="contained"
          size="large"
          onClick={detailsHandler}
        >
          View Details
        </Button>
      </Box>
    </Paper>
  );
};

export default Quote;
