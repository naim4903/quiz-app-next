import Layout from "../../components/layout/layout"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import { Button, Card, CardContent, CardHeader, Grid } from "@mui/material"


const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [answear, setAnswear] = useState(0);
    const [questionNumber, setQuestionNumber] = useState(0);
    const [name, setName] = useState("");

    const router = useRouter();

    useEffect(() => {
        setName(router.query["name"]);
        getQuestions(parseInt(router.query["catgeory"]), router.query["type"]);
    }, [router]);

    const getQuestions = async (categoryId, difficulty) => {
        try {
            let resp = await axios.get(`https://opentdb.com/api.php?amount=10&category=${categoryId}&difficulty=${difficulty}&type=multiple`)
            if (resp.data.results.length > 0) {
                let tempData = [];

                resp.data.results.forEach((item) => {
                    tempData.push({
                        answear: [item.correct_answer, item.incorrect_answers[0], item.incorrect_answers[1], item.incorrect_answers[2]],
                        correctAnswear: item.correct_answer,
                        question: item.question,
                        category: item.category,
                    })
                    // tempAns.push({ currectAnswear: item.correct_answer });
                });

                tempData.map((item) => {
                    item.answear.sort(() => Math.random() - 0.5)
                });

                console.log("tempData", tempData)
                // setAnswear(tempAns);
                setQuestions(tempData);
            }
        } catch (error) {
            console.log(error);
        }
    };



    const onNextClick = () => {
        if (questionNumber >= 9) {
            setQuestionNumber(0);
        } else {
            setQuestionNumber(questionNumber + 1);
        }
    };

    const onBackClick = () => {
        if (questionNumber <= 0) {
            setQuestionNumber(9);
        } else {
            setQuestionNumber(questionNumber - 1);
        }
    };

    const checkAnsewar = (e, selcetedAnswear, correctAnswear) => {
        if (selcetedAnswear === correctAnswear) {
            e.currentTarget.classList.add("correct-answear");
            setAnswear(answear + 1);
        } else {
            e.currentTarget.classList.add("wrong-answear");
        }
    }

    return (
        <Layout name={name.toUpperCase()}>
            {questions.map((item, i) => (
                i === questionNumber ?
                    <Grid key={i}>
                        <Grid item xs={12} >
                            <Card style={{ textAlign: "center", padding: "2rem 3rem 1rem" }}>
                                <span>{item.category}</span>
                                <CardHeader title={i + 1 + ". " + item.question} subheader={`${answear}/10`} />
                                <CardContent>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={6}>
                                            <Button variant="outlined" color="info" fullWidth className="option" onClick={(e) => checkAnsewar(e, item.answear[0], item.correctAnswear)}>
                                                a. {item.answear[0]}
                                            </Button>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Button variant="outlined" color="info" fullWidth className="option" onClick={(e) => checkAnsewar(e, item.answear[1], item.correctAnswear)}>
                                                b. {item.answear[1]}
                                            </Button>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Button variant="outlined" color="info" fullWidth className="option" onClick={(e) => checkAnsewar(e, item.answear[2], item.correctAnswear)}>
                                                c. {item.answear[2]}
                                            </Button>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Button variant="outlined" color="info" fullWidth className="option" onClick={(e) => checkAnsewar(e, item.answear[3], item.correctAnswear)}>
                                                d. {item.answear[3]}
                                            </Button>
                                        </Grid>
                                        <Grid item xs={1} md={4}></Grid>
                                        <Grid item xs={5} md={2}>
                                            <Button
                                                variant="contained"
                                                size="small"
                                                color="warning"
                                                fullWidth
                                                onClick={onBackClick}
                                            >Back</Button>
                                        </Grid>
                                        <Grid item xs={5} md={2}>
                                            <Button
                                                variant="contained"
                                                size="small"
                                                color="warning"
                                                fullWidth
                                                onClick={onNextClick}
                                            >Next</Button>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                    :
                    null
            ))}
        </Layout>
    )
}

export default Quiz;