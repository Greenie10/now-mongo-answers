import React from "react";
// import {ListUniqueLocations} from '../Components/list-questions';
import {GetAllQuestions} from '../Components/list-questions';
// import {GetZones} from '../Components/list-questions';


const QuestionsPage = () => {
    return (
      <main>
        <h1>Questions</h1>
        {/* <GetAllQuestions date="20161016"/> */}
        <GetAllQuestions zone='8b'/>
        
      </main>
    );
  }

export default QuestionsPage;
