import styles from "./Board.module.css"
import Score from "./Score"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Actions from "./Actions";
import { useState, useRef } from "react";
import TimeTable from "./TimeTable";
import EndMatch from "./EndMatch";
import PreviousSets from "./PreviousSets";
import Image from "react-bootstrap/Image";

const Board = (props) =>{
  // let placesets = [{player1:6, player2:4},{player1:3, player2:3}, {player1:0, player2:0}, {player1:0, player2:0}]
    const player1 = props.data.player1
    const player2 = props.data.player2
    const maxSets = +props.data.maxSets
    //console.log('maxsets: ' + maxSets)
    const elapsedTimeRef = useRef()
    const [matchWinner,setMatchWinner] = useState('')

    const [tieBreak,setTieBreak] = useState(props.data.tieBreak)
    const longSet = props.data.longSet
    console.log('tiebreak - ' + tieBreak)

  //  const [sets,setSets] = useState([{player1:0,player2:0}])
    //const sets = [{player1:0,player2:0},{player1:0,player2:0}]

    const [points,setPoints] = useState({player1:0,player2:0})
    const [oldPoints,setOldPoints] = useState([{player1:0,player2:0}])
    const [games,setGames] = useState({player1:0,player2:0})
    const [totalSets,setTotalSets] = useState({player1:0,player2:0})
    const [sets,setSets] = useState([])

    const [stopTime,setStopTime] = useState(false)
    const [finalData,setFinalData] = useState({})

    const [netStatus,setNetStatus] = useState(0)
    const [onNet,setOnNet] = useState(0)

    const [serving,setServing] = useState(props.data.servPlayer)

    const [message,setMessage] = useState('Match started - Serving - ' + props.serv)

    const [gameCounter,setGameCounter] = useState(1)

    const updatePoints = (player) =>{
        const nowGame = gameCounter
        setMessage('Point - ' + props.data[player])
        setNetStatus(0)
        setOnNet(0)
        let endTieBreak = false
        
        let data = {...points}
        let winner = false
        let setWinner = false
        let updateSets = {}
        const otherPlayer = (player === 'player1') ? 'player2' : 'player1'

        console.log(tieBreak + ' p1 - ' + games.player1 + ' p2- ' + games.player2)

        if(tieBreak === true && games.player1 === 6 && games.player2 === 6){ //Tie break
          /*  let firstServ = ''
            if(data[player] === 0 && data[otherPlayer] === 0){
                firstServ = serving
            }*/
            console.log('tie break start')
            data[player] = data[player] + 1
            if(data[player] >= 7 && data[otherPlayer] < data[player] - 1){
                console.log(player + ' wins the tie-break')
                        setMessage('Tie break won - ' + props.data[player])
                        setGameCounter(nowGame + 1)
                        setServing(otherPlayer)
                        props.changeServSide(nowGame + 1,true)
                        winner = true
                        endTieBreak = true
            }else{
                props.changeServSide(data[player] + data[otherPlayer],true)
            }
        }else{ //Not tie break
            props.changeServSide()
            if(data[player] === 0 || data[player] === 15){
                data[player] = data[player] + 15
            }else if(data[player] === 30){
                data[player] = 40
            }else{
                if(data[player] === 40 && data[otherPlayer] !== 40){
                    data[player] = 45
                 //   console.log(player + ' wins')
                    setMessage('Game - ' + props.data[player])
                    setServing(otherPlayer)
                    setGameCounter(nowGame + 1)
                    props.changeServSide(nowGame + 1,true)
                    winner = true
                }else if(data[player] === 40 && data[otherPlayer] === 40){
                    data[player] = 'adv'
                    data[otherPlayer] = '-'
                    setMessage('Advantage - ' + props.data[player])
                }else{
                    switch(data[player]){
                        case '-': 
                            data[player] = 40
                            data[otherPlayer] = 40
                            setMessage('Deuce')
                            break
                        case 'adv':
                            data[player] = 45
                            data[otherPlayer] = 40
                            console.log(player + ' wins the game')
                            setMessage('Game - ' + props.data[player])
                            setGameCounter(nowGame + 1)
                            setServing(otherPlayer)
                            props.changeServSide(nowGame + 1,true)
                            winner = true 
                            break  
                        default:
                            break 
                    }
                }
            }
        }
        //console.log(data)
        if(winner){ //game winner
            setServing(otherPlayer)
            console.log('winner')
            setPoints({player1:0,player2:0})
            let oldGames = {...games}
            oldGames[player] = oldGames[player] + 1
            if((oldGames[player] > 5 && oldGames[otherPlayer] < oldGames[player] - 1) 
            || (endTieBreak === true )){ //Player won a set
                setMessage('Set - ' + props.data[player])
                setWinner = true
                let oldSet = {...totalSets}
                oldSet[player] = oldSet[player] + 1
                setTotalSets(oldSet)
                updateSets = {...oldSet}
                console.log('set')
                let oldSets = [...sets,oldGames]
                console.log(oldSets)
                setSets(oldSets)
                setGames({player1:0,player2:0})
                if(oldSets.length === maxSets - 1 && longSet === true){ //make the last set with no tie break
                    setTieBreak(false)
                }
            }else{
                //console.log(oldGames)
                setGames(oldGames)
            }
            
        }else{
            setPoints(data)
        }
        let old = [...oldPoints,data]
        console.log(old)
        setOldPoints(old)

        if(setWinner && maxSets < 6){
            console.log('max < 6')
            console.log(updateSets)
            switch(maxSets){
                case(1):
                console.log('case 1')
                    if(updateSets.player1 === 1){
                        setMatchWinner('player1')
                        setMessage('Match Winner - ' + props.data[player])
                        endMatch() 
                    }
                    if(updateSets.player2 === 1){
                        setMatchWinner('player2')
                        setMessage('Match Winner - ' + props.data[otherPlayer])
                        endMatch() 
                    }
                    break
                case(3):
                console.log('case 3')
                    if(updateSets.player1 === 2){
                        setMatchWinner('player1')
                        setMessage('Match Winner - ' + props.data[player])
                        endMatch()
                    }
                    if(updateSets.player2 === 2){
                        setMatchWinner('player2')
                        setMessage('Match Winner - ' + props.data[otherPlayer])
                        endMatch()
                    }
                    break
                case(5):
                console.log('case 5')
                    if(updateSets.player1 === 3){
                        setMatchWinner('player1')
                        setMessage('Match Winner - ' + props.data[player])
                        endMatch()
                    }
                    if(updateSets.player2 === 3){
                        setMatchWinner('player2')
                        setMessage('Match Winner - ' + props.data[otherPlayer])
                        endMatch()
                    }
                    break
                default:
                break
            }
        }

    }

    const undoPoints = () =>{
        if(points.player1 !== 0 || points.player2 !== 0){
            console.log(oldPoints[oldPoints.length - 2])
            setPoints(oldPoints[oldPoints.length - 2])
            const old = [...oldPoints].slice(0,oldPoints.length - 1)
            setOldPoints(old)
        }else{

        }
    }

    const handleNet = (command) =>{
        console.log(command)
        const otherPlayer = (serving === 'player1') ? 'player2' : 'player1'
        const net = onNet
        const ball = netStatus
        if(command === 'net'){
            if(onNet <= 1){
                setOnNet(net + 1)
            }else{
                if(onNet === 2 && netStatus < 2){
                    setNetStatus(ball + 1)
                }else{
                    updatePoints(otherPlayer) 
                }
            }
        }
        if(command === 'out'){
            if(ball === 0){
                setNetStatus(1)
            }else{
                updatePoints(otherPlayer) 
            }
        }
    }

    const endMatch = () =>{

        let winner
        if(totalSets.player1 > totalSets.player2){
            winner = 'player1'
        }else if(totalSets.player1 < totalSets.player2){
            winner = 'player2'
        }else{
            winner='draw'
        }
        const endData = {
            player1,
            player2,
            elapsedTime: elapsedTimeRef.current.innerHTML,
            winner 
        }
        console.log(endData)
        setFinalData(endData)
        setStopTime(true)
        //props.end('end',endData)
    }

    const resetMatch = () =>{
        setStopTime(true)
        props.end()
    }


    //const msg = 'Starting - Serving - ' + (props.data[props.data.serv])
    return(
        <>
        <Container className={styles.backGreen + " p-0"}>
                <TimeTable title={props.data.scoreTitle} elapsedRef={elapsedTimeRef} stopTime={stopTime}/>
                <Container>
                <Row className={"align-items-end justify-content-center " + styles.backGreen}>

                    <PreviousSets sets={sets}/>

                    <Col md={4} className="p-0">
                        <div className={styles.players + " mx-2"}>
                            <h4 className="p-2">{player1} {serving==='player1' && <Image src={'./tennis.png'} alt='tennis ball' style={{width:'15px'}}/>}</h4>
                            <h4 className="p-2 mt-2">{player2} {serving==='player2' && <Image src={'./tennis.png'} alt='tennis ball' style={{width:'15px'}}/>}</h4>
                        </div>
                    </Col>
                    
                    <Col md={4} className="p-0">
                        <Container>
                            <Row className="text-center justify-content-center">
                                <Score title="sets" p1={totalSets.player1} p2={totalSets.player2}/>
                                <Score title="games" p1={games.player1} p2={games.player2}/>
                                <Score title="points" p1={points.player1} p2={points.player2}/>
                            </Row>
                        </Container>
                    </Col>
                </Row>
                </Container>
                <div className={styles.line + ' mb-2'}></div>
                {stopTime && <EndMatch data={finalData} totalSets={totalSets} sets={sets} matchWinner={matchWinner} end={props.end}/>}
                {!stopTime && <Actions handleNet={handleNet} onNet={onNet} netStatus={netStatus} player1={player1} player2={player2} message={message}  updatePoints={updatePoints} undoPoints={undoPoints} end={endMatch} reset={resetMatch}/>}
                  

                </Container>

        </>
    )
}
export default Board