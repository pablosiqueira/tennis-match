import Form from "react-bootstrap/Form"
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import styles from './Board.module.css'

const NewMatch = (props) => {
    const [player1,setPlayer1] = useState('')
    const [player2,setPlayer2] = useState('')
    const [scoreTitle,setScoreTitle] = useState('')
    const [maxSets,setMaxSets] = useState('')
    const [sides,setSides] = useState('')
    const [serv,setServ] = useState('')

    //<MessageModal show={modalShow} onHide={() => setModalShow(false)} message={props.modalMessage}/>

    const player1Input = (event) =>{
            setPlayer1(event.target.value)
    }
    const player2Input = (event) =>{
        setPlayer2(event.target.value)
    }
    const scoreInput = (event) =>{
        setScoreTitle(event.target.value)
    }

    const maxSetsInput = (event) =>{
        setMaxSets(event.target.value)
    }
    const servInput = (event) =>{
        setServ(event.target.value)
    }
    const sidesInput = (event) =>{
        setSides(event.target.value)
    }

    const createMatch = (event) => {
        event.preventDefault()
        let playSide = {}
        const tieBreak = document.getElementById('tieBreak').checked
        const longSet = document.getElementById('longSet').checked
        if(sides === 'top'){
            playSide = {top: player1, bottom: player2}
        }else{
            playSide = {top: player2, bottom: player1}
        }
        const data = {
            player1,
            player2,
            scoreTitle,
            maxSets,
            playSide,
            serv: serv === 'player1' ? player1 : player2,
            servPlayer: serv,
            tieBreak,
            longSet
        }
        console.log(data)
        props.startMatch(data)
    }


    return(
        <>
        <div className={"text-center py-1 " + styles.newMatch}>
           <h1 className={styles.colorYellow + ' mt-3'}>New Match</h1>
           <Form className="d-block mx-auto px-3 my-3" onSubmit={createMatch}>
           <FloatingLabel className="mb-3" controlId="player1" label='Player 1 Name'>
                        <Form.Control type="text" placeholder="Enter player 1 name" value={player1} onChange={player1Input} required/>
            </FloatingLabel>
            
            <FloatingLabel className="mb-3" controlId="player2" label='Player 2 Name'>
                        <Form.Control type="text" placeholder="Enter player 2 name" value={player2} onChange={player2Input} required/>
            </FloatingLabel>

            <FloatingLabel className="mb-3" controlId="score" label='Score Board Title (optional)'>
                        <Form.Control type="text" placeholder="Enter player 2 name" value={scoreTitle} onChange={scoreInput}/>
            </FloatingLabel>

            <Form.Select className={'mb-3 text-capitalize ' + styles.inputs} onChange={maxSetsInput} value={maxSets} required>
              <option value=''>Max number of sets</option>
              <option value={1}>1</option>
              <option value={3}>3</option>
              <option value={5}>5</option>
              <option value={99}>Unlimited</option>
            </Form.Select>

            <Form.Select className={'mb-3 text-capitalize ' + styles.inputs} onChange={servInput} value={serv} required>
              <option value=''>First Service</option>
              <option value={'player1'}>{player1 ? player1 : 'player 1'}</option>
              <option value={'player2'}>{player2 ? player2 : 'player 2'}</option>
            </Form.Select>

            <Form.Select className={'mb-3 text-capitalize ' + styles.inputs} onChange={sidesInput} value={sides} required>
              <option value=''>First Sides</option>
              <option value={'top'}>Top - {player1} / Bottom - {player2}</option>
              <option value={'bottom'}>Bottom - {player1} / Top - {player2}</option>
            </Form.Select>

            <div className={styles.checkboxes + ' mb-2'}>  
            <Form.Check
            inline
            type='checkbox'
            label='Tie-breaks'
            id='tieBreak'
            checked
            />

            <Form.Check
            inline
            type='checkbox'
            label='Long Last Set'
            id='longSet'
            />
            </div>
            

            <Button type="submit"  size="lg" variant="warning" className={'mb-2 ' + styles.button23}>Start</Button>
           </Form> 
        </div>
        </>
    )
}

export default NewMatch