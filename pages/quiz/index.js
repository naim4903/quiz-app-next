import Layout from "../../components/layout/layout"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import { Button, Card, CardContent, CardHeader, Grid } from "@mui/material"
import Question from "../../components/question/question"


const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [data, setData] = useState([]);
    const [score, setScore] = useState(0);
    const [questionNumber, setQuestionNumber] = useState(0);
    const [name, setName] = useState("");
    const [complete, setComplete] = useState(false);
    const [submited, setSubmited] = useState(false);

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
                setData(resp.data.results);
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
            setComplete(true);
        } else {
            setSubmited(false);
            setQuestionNumber(questionNumber + 1);
        }
    };

    const onQuitClick = () => {
        router.replace("/");
    };

    const checkAnsewar = (e, selcetedAnswear, correctAnswear) => {
        if (selcetedAnswear === correctAnswear) {
            e.currentTarget.className += " correct-answear";
            setAnswear(answear + 1);
            setSubmited(true);
        } else {
            e.currentTarget.className += " wrong-answear";
            setSubmited(true);
        }
    };

    return (
        <Layout name={name}>
            {
                complete ?
                    <Card style={{ textAlign: "center", padding: "2rem 3rem 1rem" }}>
                        <CardContent>
                            <p style={{ fontSize: "1.2rem", textTransform: "capitalize" }}>Congratulations! {name}</p>
                            <p style={{ fontSize: "3rem" }}>Your Score {score}</p>
                            <Button variant="contained" color="success" size="large" onClick={() => router.replace("/")}>Go To Home</Button>
                        </CardContent>
                    </Card>
                    :
                    <Grid>
                        <Grid item xs={12} >
                            <Card style={{ textAlign: "center", padding: "2rem .6rem 1rem" }}>
                                <span>{data[questionNumber]?.category}</span>
                                {/* <CardHeader title={1 + ". " + data[questionNumber]?.question} subheader={`${answear}/10`} /> */}
                                <h4 style={{ padding: 4, margin: 0 }}>{1 + ". " + data[questionNumber]?.question}</h4>
                                <p style={{}}>{score}/10</p>
                                <CardContent>
                                    <Grid container spacing={2}>
                                        <Question
                                            questions={questions[questionNumber]?.answear}
                                            correctAns={data[questionNumber]?.correct_answer}
                                            setScore={setScore}
                                            score={score}
                                        />
                                        <Grid item xs={1} md={4}></Grid>
                                        <Grid item xs={5} md={2}>
                                            <Button
                                                variant="contained"
                                                size="small"
                                                color="error"
                                                fullWidth
                                                onClick={onQuitClick}
                                            >quit</Button>
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
            }
        </Layout>
    )
}

export default Quiz;