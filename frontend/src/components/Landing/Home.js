import React from "react"
import TextType from './TextType';
import Tablett from "./Tablett";
import HomeBtnn from "./HomeBtnn";
import Cardd from "./Cardd";
import AnimatedList from "./AnimatedList"
function Home() {
  const items = [
    'Send birthday wishes automatically on the right date',
    'Schedule weekly team updates every Monday morning',
    'Queue follow-up emails after client meetings',
    'Set reminders for subscription renewals or payments',
    'Automate job application emails with personalized timing',
    'Reflect on daily wins and challenges before bed',
    'Track emotional patterns over time through journaling',
    'Document personal growth and evolving goals',
    'Capture fleeting ideas or dreams each morning',
    'Write gratitude entries to boost positivity and mindfulness'
  ]; return(
    <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      padding: "20px"
    }}
  >

 <Tablett></Tablett>
<div>
<HomeBtnn ></HomeBtnn>
</div>

<div>
<TextType 
text = {[ "NOSTALGIA!", "EMAIL SCHEDULING", "YOUR DIARY" ]}
  typingSpeed={75}
  pauseDuration={1500}
  showCursor={true}
  cursorCharacter="|"
/>
</div>

<div>
  <Cardd></Cardd>
</div>

<div style={{color: "green" , fontSize: "19px" , marginLeft: "17px" , marginBottom: "16px " , marginTop: "14px ",textDecoration:"underline" , wordSpacing: "3px" , letterSpacing: "1px"}}>What's the Use Case ? </div>
 <div className="List-small">
<AnimatedList
  items={items}
  onItemSelect={(item, index) => console.log(item, index)}
  showGradients={true}
  enableArrowNavigation={true}
  displayScrollbar={true}
/>
</div>

</div>

 )
};

export default Home;