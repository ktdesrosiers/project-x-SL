var player = GetPlayer();

const ass_content = {
   "st_q1": {
      "stem": "You are an editor working at the Dynamica Health Communications and have been given the opportunity to strategize a new publication about \"HY-P832,\" a drug aimed at treating chronic migraines. Your journey begins in the bustling office of Dynamica, where you're tasked with developing a comprehensive publication plan.\nIt's Monday morning, and you're in the conference room with your team. Your manager, Alex, outlines the importance of understanding the disease landscape. Alex asks, \"How do you plan to gather insights on chronic migraines?\"\nChoose a single response to Alex.",
      "dist_1": "Rely solely on existing internal reports and assumptions",
      "dist_2": "Use internet searches to gather basic information",
      "dist_3": "Review recent publications in medical journals",
      "dist_4": "Consult with industry experts and stakeholders",
      "dist_5": "Conduct a comprehensive literature review and interview leading key opinion leaders",
      "task_code": "st1"
   },
   "st_q2": {
      "stem": "Later, you're in the cafeteria grabbing lunch when your colleague Jamie joins you. Jamie is curious about what data you'll prioritize for the publication.\nJamie asks, \"What data are you thinking of highlighting?\"\nYou would be most likely to say you will...",
      "dist_1": "Focus solely on patient testimonials",
      "dist_2": "Emphasize safety data with minimal efficacy results",
      "dist_3": "Highlight efficacy results and include some patient testimonials",
      "dist_4": "Balance efficacy results and safety data with other endpoints",
      "dist_5": "Prioritize  results of the primary endpoint of the trial and key secondary endpoints, including safety data",
      "task_code": "st2"
   },
   "st_q3": {
      "stem": "In the afternoon, you're in a brainstorming session with your team to assess potential audience needs as you plan further. Your task is to gather insights from healthcare professionals, patients, and regulatory bodies.\nYour team asks, \"How would we collect this information?\"\nYou would be most likely to respond with...",
      "dist_1": "Assume all audiences have similar needs",
      "dist_2": "Use past strategies because the strategies do not change much each year",
      "dist_3": "Conduct informal interviews with key stakeholders",
      "dist_4": "Use targeted surveys to gather audience insights",
      "dist_5": "Conduct focus groups and comprehensive surveys with each audience",
      "task_code": "st3"
   },
   "st_q4": {
      "stem": "You step into your manager's office to discuss the scope of the publication. They need your final decision on the type of publication.\nAlex says, \"Which publication type are you leaning towards?\"\nYou would be most likely to....",
      "dist_1": "Choose a patient-focused brochure without strategic alignment",
      "dist_2": "Select a regulatory submission based on ease of completion",
      "dist_3": "Opt for a peer-reviewed journal article that aligns with commercial messaging",
      "dist_4": "Choose a peer-reviewed journal article that would report only a small amount of data to increase the number of future publications",
      "dist_5": "Select a peer-reviewed journal article that aligns with clinical needs and audience information gaps",
      "task_code": "st4"
   },
   "st_q5": {
      "stem": "It's time to manage the publication planning committee. You're in a meeting room with representatives from various departments.\nA committee member asks, \"How will you gather input from the publication planning committee to ensure smooth execution of the publication plan?\"\nYour approach to this question would most likely be to...",
      "dist_1": "Meet only when issues arise, limiting input to senior management",
      "dist_2": "Schedule infrequent meetings with the clinical team",
      "dist_3": "Hold regular meetings with the clinical team for updates on data release",
      "dist_4": "Hold regular meetings with the clinical team and occasionally involve cross-functional teams",
      "dist_5": "Schedule regular meetings and ensure diverse representation from cross-functional teams",
      "task_code": "st5"
   },
   "st_q6": {
      "stem": "Need scenario decision around applying to platforms, interpreted as actually filling in the info.",
      "dist_1": "emergent",
      "dist_2": "better than new",
      "dist_3": "medium",
      "dist_4": "almost expert",
      "dist_5": "expert",
      "task_code": "st6"
   },
   "st_q7": {
      "stem": "In a quiet corner of the office, you're discussing approaches to creating a publication with your mentor, Taylor.\nTaylor asks, \"So it is very important that we publish these data as quickly as possible for chronic migraine treatment because physicians need a better understanding of the long-term safety profile. What do you think is the best approach to develop the publication?\"\nYou would be most likely to select an approach that:",
      "dist_1": "Treats the PLS as an informal, post-hoc task to be delegated to an author after the primary manuscript is finalized, fulfilling the requirement with minimal upfront planning or resource allocation.",
      "dist_2": "Adds the PLS to the publication timeline as a sequential task to be completed only after the main manuscript is written, ensuring it is scheduled but not integrated into the primary development process.",
      "dist_3": "Revises the publication plan to formally account for the PLS as a separate deliverable with its own distinct timeline and budget, but which proceeds independently of the manuscript development workflow.",
      "dist_4": "Updates the publication plan to enable parallel development of the PLS and the manuscript to ensure message alignment and efficiency, while also researching target journal requirements for PLS submission and peer review.",
      "dist_5": "Fully integrates the PLS as a core strategic component of the publication plan by initiating a concurrent development process, engaging patient advocates in its co-creation, and prioritizing journals that will peer-review and index the PLS to maximize its credibility and reach.",
      "task_code": "st7"
   },
   "st_q8": {
      "stem": "As the day winds down, you're at your desk developing post-publication timelines.\nYour colleague, Sam, stops by, \"Not sure if you saw the company wide memo but they want us to make sure to include plain language summaries in all future primary and secondary publications. I guess your new project falls into this category. How are you going to plan for it?”\nHow are you most likely to approach the new requirement?",
      "dist_1": "Stick to the initial plan regardless of trends.",
      "dist_2": "Adjust plans occasionally based on a quick review of plain language summary methods.",
      "dist_3": "Draw on your existing knowledge to define a plan given you regularly review industry trends.",
      "dist_4": " Call a meeting of others with your role to identify company-wide approaches to plain language summaries.",
      "dist_5": "Happily implement the guidelines and standards you have developed as lead of a internal and external working group related to developing plain language summaries.",
      "task_code": "st8"
   }
};

function loadquest(){
// determine the number of questions so we can advance to results when all have been asked by setting a SL variable to hold the total num of questions.
var q_count = player.GetVar("skill_ass_q_count");
var cur_ass_code = player.GetVar("current_assessment");

   
const numQuestions = Object.keys(ass_content).length;
player.SetVar("skill_ass_q_total",numQuestions);


function filterQuestion(ass_content, questionKey) {
  if (ass_content.hasOwnProperty(questionKey)) {
    return {
      [questionKey]: ass_content[questionKey]
    };
  } else {
    return {};
  }
}

// this funciton accounts for poor text handling abilities in stoyrline and replacees newline with <br><br>

function replaceNewlines(text) {
  let textb =  text.replace(/\n/g, '<br><br>');
  console.log(textb);
  return textb
  
}

let curr_question = cur_ass_code+"_q"+q_count;

const fq = filterQuestion(ass_content, curr_question);
const dist_array = [{value: 1, text: fq[curr_question].dist_1},{value: 2, text: fq[curr_question].dist_2},{value: 3, text: fq[curr_question].dist_3},{value: 4, text: fq[curr_question].dist_4},{value: 5, text: fq[curr_question].dist_5}];


// optional function to shuffle the distractors. Makes debug or test mroe difficult.
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


const random_dist = shuffleArray(dist_array);

player.SetVar("ass_stem",replaceNewlines(ass_content[curr_question].stem));
player.SetVar("cur_ass_task",ass_content[curr_question].task_code)

random_dist.forEach((item, index) => {
let count = index + 1;
player.SetVar("ass_ch_"+count,item.text);
player.SetVar("ch"+count+"_val",item.value);
});

};
