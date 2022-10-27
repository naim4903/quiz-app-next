import { Button, Card, Grid, CardContent, Container, FormControl, InputLabel, Select, MenuItem, Input, CardHeader, Typography } from '@mui/material'
import Layout from '../components/layout/layout';
import Categories from '../data/category';
import { useRouter } from "next/router";
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function Home() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");

  const router = useRouter();

  const handleSubmit = () => {
    if (!category || !type || !name) {
      toast.error("plz fill all the fields", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      router.push(`/quiz/?name=${name}&catgeory=${category}&type=${type}`);
    }
  };


  return (
    <Layout title={"Quiz App"}>
      <Container maxWidth="sm">
        <Card>
          <CardContent>
            <Grid container >
              <Grid item xs={12}>
                <FormControl fullWidth sx={{}} variant="standard" style={{ marginBottom: 10 }}>
                  <InputLabel htmlFor="outlined-adornment-amount">Enter Your Name</InputLabel>
                  <Input
                    id="outlined-adornment-amount"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    label="Amount"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="standard" style={{ marginBottom: 10 }}>
                  <InputLabel htmlFor="demo-simple-select-label">Select Category</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
                    label="Age"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {Categories.map((category, i) => (
                      <MenuItem value={category.value} key={i}>{category.category}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} >
                <FormControl fullWidth variant='standard' style={{ marginBottom: 20 }}>
                  <InputLabel htmlFor="demo-simple-select-label1">Select Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-label1"
                    id="demo-simple-select"
                    value={type}
                    label="Type"
                    onChange={(e) => setType(e.target.value)}
                  >
                    <MenuItem value={"easy"}>Easy</MenuItem>
                    <MenuItem value={"medium"}>Medium</MenuItem>
                    <MenuItem value={"hard"}>Hard</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button fullWidth variant='contained' onClick={handleSubmit}>Start Quiz</Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Layout>
  )
}
