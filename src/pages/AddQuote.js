import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

import QuoteForm from '../components/QuoteForm';

const AddQuote = () => {
  return (
    <Container maxWidth="sm">
      <Paper elevation={4} sx={{ marginTop: { xs: 5, md: 10 }, padding: 2 }}>
        <QuoteForm />
      </Paper>
    </Container>
  );
};

export default AddQuote;
