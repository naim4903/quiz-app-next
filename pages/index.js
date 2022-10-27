import { Button, Card, Grid, CardContent, Container, FormControl, InputLabel, Select, MenuItem, Input } from '@mui/material'
import Layout from '../components/layout/layout';
import Categories from '../data/category';
import { useRouter } from "next/router";
import { useState } from 'react';


export default function Home() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");

  const router = useRouter();

  const handleSubmit = () => {
    router.push(`/quiz/?name=${name}&catgeory=${category}&type=${type}`)
  };


  return (
    <Layout title={"Quiz App"}>
      <Container maxWidth="sm">
        <Card>
          <CardContent>
            <Grid container >
              <Grid item xs={12}>
                <FormControl fullWidth sx={{}} variant="standard" style={{ marginBottom: 10 }}>
                  <InputLabel htmlFor="outlined-adornment-amount">Name</InputLabel>
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
                  <InputLabel htmlFor="demo-simple-select-label">Category</InputLabel>
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
                  <InputLabel htmlFor="demo-simple-select-label1">Type</InputLabel>
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
