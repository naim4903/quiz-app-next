import { Button, Grid } from "@mui/material"
import { useState, useEffect } from "react"

const Question = ({ questions, correctAns, setScore, score, selected, setSelected }) => {
    // const [selected, setSelected] = useState(null);

    useEffect(() => {
        setSelected(null);
    }, [correctAns])

    const checkAnsewar = (ans) => {
        if (selected) {
            return
        } else {
            setSelected(ans);
            if (ans === correctAns) setScore(score + 1)
        }
    };

    const handleSelect = (ans) => {
        if (selected === ans && correctAns === selected) {
            return "correct-answear";
        } else if (selected === ans && correctAns !== selected) {
            return "wrong-answear";
        } else if (ans === correctAns) {
            return "correct-answear";
        } else if (ans !== correctAns) {
            return "wrong-answear";
        }
    }

    return (
        <>
            {
                questions && questions.map((item, i) => (
                    <Grid item xs={12} md={6} key={i}>
                        <Button
                            variant="outlined"
                            color="info"
                            fullWidth
                            disabled={selected}
                            className={`option ${selected && handleSelect(item)}`}
                            onClick={(e) => checkAnsewar(item)}
                        >
                            {item}
                        </Button>
                    </Grid>
                ))
            }
        </>
    )
}

export default Question