import Layout from "../../components/layout/layout"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import { Button, Card, CardContent } from "@mui/material"


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
        <Layout >
            {questions.map((item, i) => (
                i === questionNumber ?
                    <Card key={i}>
                        <CardContent>
                            {item.question}
                            <Button variant="contained" onClick={() => setQuestionNumber(questionNumber + 1)}>Next</Button>
                            <Button variant="contained" onClick={() => setQuestionNumber(questionNumber - 1)}>Back</Button>
                        </CardContent>
                    </Card>
                    :
                    null
            ))}
            {/* <Card>
                <CardContent>
                    Welcom {name}
                </CardContent>
            </Card> */}
        </Layout>
    )
}

export default Quiz;