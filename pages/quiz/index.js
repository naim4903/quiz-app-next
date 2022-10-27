import Layout from "../../components/layout/layout"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import { Button, Card, CardContent, CardHeader, Grid } from "@mui/material"


const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [questionNumber, setQuestionNumber] = useState(0);
    const [name, setName] = useState("");

    const router = useRouter();

    useEffect(() => {
        setName(router.query["name"]);
        getQuestions(parseInt(router.query["catgeory"]), router.query["type"]);
    }, []);

    const getQuestions = async (categoryId, difficulty) => {
        try {
            let resp = await axios.get(`https://opentdb.com/api.php?amount=10&category=${categoryId}&difficulty=${difficulty}&type=multiple`)
            if (resp.data.results.length > 0) {
                setQuestions(resp.data.results);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Layout name={name.toUpperCase()}>
            {questions.map((item, i) => (
                i === questionNumber ?
                    <Card key={i} style={{ width: "80%", textAlign: "center", padding: "1rem 3rem" }}>
                        <CardHeader title={i + 1 + ". " + item.question} />
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Button variant="outlined" color="info" fullWidth className="option">a. {item.correct_answer}</Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button variant="outlined" color="info" fullWidth className="option">b. {item.incorrect_answers[0]}</Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button variant="outlined" color="info" fullWidth className="option">c. {item.incorrect_answers[1]}</Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button variant="outlined" color="info" fullWidth className="option">d. {item.incorrect_answers[2]}</Button>
                                </Grid>
                                <Grid item xs={4}></Grid>
                                <Grid item xs={2}>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        color="warning"
                                        fullWidth
                                        onClick={() => setQuestionNumber(questionNumber - 1)}
                                    >Back</Button>
                                </Grid>
                                <Grid item xs={2}>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        color="warning"
                                        fullWidth
                                        onClick={() => setQuestionNumber(questionNumber + 1)}
                                    >Next</Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                    :
                    null
            ))}
        </Layout>
    )
}

export default Quiz;