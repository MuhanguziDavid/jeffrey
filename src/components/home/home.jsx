import React from 'react';
import { Container, ProgressBar, Row, Col, Image, Button } from 'react-bootstrap';
import Clock from 'react-live-clock';
import { zoomIn, bounceIn } from 'react-animations';
import Radium, {StyleRoot} from 'radium';
import jumbotronEmoji from '../../assets/jumbotronEmoji.jpeg';
import timer from '../../assets/timer.png';
import ubc from '../../assets/ubc.jpg';
import lock from '../../assets/lock.png';
import like from '../../assets/like.png';
import red_circle from '../../assets/red_circle.png';
import './home.scss';

const styles = {
  zoomIn: {
    animation: 'x 2s',
    animationName: Radium.keyframes(zoomIn, 'zoomIn')
  },
  bounceIn: {
    animation: 'x 3s',
    animationName: Radium.keyframes(bounceIn, 'bounceIn')
  }
}

const Home = props => {
  const { questions, count, handleQuestionIndex, questionIndex, history, intervalId, handleSocket } = props;
  // send socket message when a new question is loaded
  if (count === 1 && questions && questions[questionIndex]) {
    handleSocket(questions && questions[questionIndex].id);
  }
  // automatically load the next question after a few seconds
  if (count > 99 && count < 111 && questions && questions[questionIndex]) {
    setTimeout(function() {
      handleQuestionIndex();
    }, 7000)
  }
  // send socket message to end gamwe
  if (questions && !questions[questionIndex] && count === 1) {
    handleSocket('game ended');
  }
  return (
    <div className="home-container">
      {questions && questions[questionIndex] ? (
        <React.Fragment>
          <Row>
            <Col className="home-container__ubc">
              <Image className="home-container__ubc__image" src={ubc} alt="ubc" scale="0" />
            </Col>
            <Col>
              <Row>
                <Col className="home-container__clock">
                  <Clock
                    format={'h:mm a'}
                    style={{fontSize: '1.2em', fontWeight: '900'}}
                    ticking={true}
                  />
                </Col>
              </Row>
              <Row className="justify-content-md-center">
                <Col md="auto" className="home-container__red_circle">
                  <Image className="home-container__red_circle__image" src={red_circle} alt="" scale="0" />
                </Col>
                <Col md="auto" className="home-container__topic">
                  {questions ? (
                    questions[questionIndex].question.category
                  ) : (
                    null
                  )}
                </Col>
              </Row>
            </Col>
            <Col className="home-container__lock">
              <Image className="home-container__lock__image" src={lock} alt="ubc" scale="0" />
              <span className="home-container__lock__red_circle"><strong>3</strong></span>
            </Col>
          </Row>
          <Container className="fluid">
            <Row className="justify-content-md-center">
              <Col sm={2} className="home-container__emoji">
                <Image className="home-container__emoji__image" src={jumbotronEmoji} alt="Question" scale="0" />
              </Col>
              <Col sm={9} className="home-container__question">
                {count === 1 ? (
                  <h1 className="home-container__question__nothing" style={styles.zoomIn}><strong>Loading</strong></h1>
                ) : (
                  <StyleRoot>
                    <h1 style={styles.zoomIn}><strong>{questions[questionIndex].question.question_text}</strong></h1>
                  </StyleRoot>
                )}
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              {count > 99 ? (
                // Show answers
                // <React.Fragment>
                //   <StyleRoot>
                //     <div style={styles.bounceIn}>
                //       <Col md="auto" className="home-container__like">
                //         <Image className="home-container__like__image" src={like} alt="Answer" scale="0" />
                //       </Col>
                //       <Col md="auto" className="home-container__answer" style={styles.bounce}>
                //         <h3><strong>{questions[questionIndex].correct_choice.choice_text}</strong></h3>
                //       </Col>
                //     </div>
                //   </StyleRoot>
                // </React.Fragment>

                // Dont show answers
                <React.Fragment>
                  <StyleRoot>
                    <div style={styles.bounceIn}>
                      <Col md="auto" className="home-container__like">
                        <h3><strong>Time up!!!</strong></h3>
                      </Col>
                    </div>
                  </StyleRoot>
                </React.Fragment>
              ) : (
                <div className="home-container__nothing">
                  nothing
                </div>
              )}
            </Row>
          </Container>
          <div className="footer">
            <Row>
              <Col className="home-container__timer">
                {/* non clickable button */}
                <Image className="home-container__timer__image" src={timer} alt="timed game" scale="0"/>
                {/* clickable button */}
                {/* <Image className="home-container__timer__image" src={timer} alt="timed game" scale="0" onClick={handleQuestionIndex}/> */}
              </Col>
            </Row>
            <ProgressBar
              now={count}
              min={0}
              max={100}
            />
          </div>
        </React.Fragment>
      ) : (
        <div className="home-container__end">
          <StyleRoot>
            <h1 className="home-container__end__text" style={styles.zoomIn}>THE END</h1>
            {/* <Button className="btn btn-dark" onLoad={clearInterval(intervalId)} onClick={() => { clearInterval(intervalId); history.push('/');}}>Play Again</Button> */}
          </StyleRoot>
        </div>
      )}
    </div>
  );
}

export default Home;
