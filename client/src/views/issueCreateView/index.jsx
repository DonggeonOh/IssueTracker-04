import React, { useState, useEffect, useRef, useReducer } from 'react';
import axios from 'axios'
import './style.scss';
import {BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Titles from '../../components/issueCreateView/title';
import Contents from '../../components/content';
import Cancels from '../../components/issueCreateView/cancel';
import SubmitButton from '../../components/issueCreateView/submitButton';
import Assignees from '../../components/sideAssignee';
import Labels from '../../components/sideLabel';
import Milestones from '../../components/sideMilestone';

export const MemberContext = React.createContext();
export const LabelContext = React.createContext();
export const MilestoneContext = React.createContext();

const memberReducer = (state, action) => {
  switch (action.type) {
    case "INIT": 
      return []
    case "UPDATE":
      return [...action.payload]
    default:
      throw new Error();
  }
}

const labelReducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      return []
    case "UPDATE":
      return [...action.payload]
    default:
      throw new Error();
  }
}

const milestoneReducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      return []
    case "UPDATE":
      return [...action.payload]
    default:
      throw new Error();
  }
}

const issueCreateView = () => {
  const [memberState, memberDispatch] = useReducer(memberReducer, []);
  const [labelState, labelDispatch] = useReducer(labelReducer, []);
  const [milestoneState, milestoneDispatch] = useReducer(milestoneReducer, []);
  const [Title, setTitle] = useState('');
  const [Content, setContent] = useState('');
  const [User, setUser] = useState([]);
  const [Label, setLabel] = useState([]);
  const [Milestone, setMilestone] = useState([]);
  const [Count, setCount] = useState(0);

  const onTitleHandler = (e) => {
    setTitle(e.currentTarget.value);
  };

  const onContentHandler = (e) => {
    setCount(e.currentTarget.value.length)
    setContent(e.currentTarget.value);
  };

  const onClickHandler = (e) => {
    e.preventDefault();
    console.log("answer",labelState, milestoneState, memberState, Title, Content);
    console.log("asdfasdf");
    const body={
      issue_title:Title,
      issue_content:Content,
      issue_authoer_no:0
    }
    // axios.post('http://localhost:5000/api/issue/create', body).then(response => {
    //   console.log(response);
    // })
  };
  useEffect(()=>{
    const users = [
      {
        user_no: 1,
        user_name: 'Zigje9',
      },
      {
        user_no: 2,
        user_name: 'jk',
      },
      {
        user_no: 3,
        user_name: 'crong',
      },
    ];
    setUser(users)
    const labels = [
      {
        label_no: 1,
        label_title: "dev",
        label_color: "#ffffff"
      },
      {
        label_no: 2,
        label_title: "client",
        label_color: "#111111"
      },
      {
        label_no: 3,
        label_title: "ios",
        label_color: "#123456"
      }
    ];
    setLabel(labels)
    const milestones = [
      {
        milestone_no: 1,
        milestone_title: "스프린트1"
      },
      {
        milestone_no: 2,
        milestone_title: "스프린트2"
      }
    ];
    setMilestone(milestones)
  }, []);

  

  return (
    <MemberContext.Provider value={{memberState, memberDispatch}}>
      <LabelContext.Provider value={{labelState, labelDispatch}}>
        <MilestoneContext.Provider value={{milestoneState, milestoneDispatch}}>
          <div className="create-view">
            <div className="input-column">
              <div className="create-form" >
                <Titles placeholder="Title" type="title" value={Title} onChange={onTitleHandler}/>
                <Contents placeholder="Leave a comment" type="content" value={Content} onChange={onContentHandler}/>
                <div>{Count}chracters</div>
                <div className="create-form-submit">
                  <Link to = 'issues-list'><Cancels />
                  </Link>
                  <SubmitButton onClick={onClickHandler}/>
                </div>
              </div>
            </div>
            <div className="register-column">
              <Assignees users={User} now={memberState}/>
              <hr className="thin-line" />
              <Labels labels={Label} now={labelState}/>
              <hr className="thin-line" />
              <Milestones milestones={Milestone} now={milestoneState}/>
              <hr className="thin-line" />
            </div>
          </div>
        </MilestoneContext.Provider>
      </LabelContext.Provider>    
    </MemberContext.Provider>
  );
};



export default issueCreateView;

