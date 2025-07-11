/* This code is intended to run from a Articulate Storyline SCORM conformant learning object. The ultimate SCORM protocol is not important however, using xAPI would be optimal and allow for more nuanced learning analytics. specifci xAPI calls are not on the RM for this inital release so tracking will be limited tot he clients (ISMPP) deplyment environment. This js file is loaded as an external script when the learning object initiates and can either be distributed with the SCORM or xAPI package (more restrictive environments) or remain hosted (less restrictive environments). Embedding this file into the deployable package limits versioning and updates. Assume this hosted file is the most current unless the dev environment is pointing to a local file. A versioning method has not been implemented for the Storyline Development environment given it's not a robust environment that would make sourvce and versioning meaningful. That being said source control will be come an issue if there are several distributables released for mroe restrictive environments. */

/* Storyline creates HTML5 content that uses a proprietary run time player. Keep this in mind when reviewing some of the odd methods in the code below. The player limits true DOM manipulation and handles data persistence across multiple user sessions as part of the SCORM / xAPI interface. Keeping storyline variables up to date rather than session or cookie based data has limitations but allows for simple variable reinstatement. THe core content data is placed at the top of this file. THis could be stored as JSON or retried via an API in the future, again the constraint is that the client has a less restrictive enviornment. More restrictive environments would obviously require appropriate data sharing agreements, whitelisting etc.. if the application were to ever utilize fully dynamic content generation. */

var player = GetPlayer();

// not the best name for now but these are the vertical stops we use to order coach cards and are referred to in a function function below.
const yPositions = [114, 233, 352, 471, 590, 709, 828, 947];

const coachPhrases = {
  st: {
    name: "Maia",
    persona: "British, fast-talking, sometimes makes threats",
    messages: {
      priority: [
        "Oi! Drop everything and get on with \"{lesson}\"—or else I’ll have words with you.",
        "No dawdling! \"{lesson}\" is your next stop. Don’t make me come over there."
      ],
      needsBoost: [
        "You’re not done yet! Give \"{lesson}\" another go, or I’ll be forced to send a strongly worded email.",
        "Pick up the pace! \"{lesson}\" still needs your attention."
      ],
      challengeReady: [
        "Impressive! You’ve earned a shot at my challenge. Don’t mess it up now.",
        "All right, superstar—let’s see if you can handle the real test."
      ]
    }
  },
  im: {
    name: "Patrician",
    persona: "Older, mature, very kind, a bit of a softy",
    messages: {
      priority: [
        "Let’s gently focus on \"{lesson}\" together. I know you can do it.",
        "Take your time with \"{lesson}\"—I’m here to help every step of the way."
      ],
      needsBoost: [
        "Wonderful progress! A little more practice with \"{lesson}\" will make you shine.",
        "You’re doing so well. Let’s revisit \"{lesson}\" for even more confidence."
      ],
      challengeReady: [
        "I’m so proud of you! You’re ready for the challenge whenever you feel comfortable.",
        "You’ve come so far—let’s see what you can do on the challenge!"
      ]
    }
  },
  et: {
    name: "Thomas",
    persona: "Southern US, law professor, intimidating but wise",
    messages: {
      priority: [
        "Now listen here, partner. \"{lesson}\" is your next case—don’t make me call you to the stand.",
        "You best get to \"{lesson}\" before I start quoting statutes at you."
      ],
      needsBoost: [
        "You’re on the right track, but \"{lesson}\" still needs your attention. Don’t let it slip.",
        "I expect nothing less than excellence. Give \"{lesson}\" another look."
      ],
      challengeReady: [
        "Well, I’ll be. You’re ready for my challenge—let’s see if you can pass muster.",
        "You’ve shown wisdom and grit. Time for the final test, counselor."
      ]
    }
  }
};
const l_data =[
 {
   "code": "st1",
   "skill": "Market Research",
   "lesson": "Researching Disease and Therapeutic Landscapes"
 },
 {
   "code": "st2",
   "skill": "Data Analysis",
   "lesson": "Identifying Data for Publication"
 },
 {
   "code": "st3",
   "skill": "Needs Assessment",
   "lesson": "Assessing Audience Information and Educational Needs"
 },
 {
   "code": "st4",
   "skill": "Scoping",
   "lesson": "Defining Publication Plan Scope"
 },
 {
   "code": "st5",
   "skill": "Committee Management",
   "lesson": "Managing Steering Committees"
 },
 {
   "code": "st6",
   "skill": "Strategic Publishing",
   "lesson": "Applying to Scientific Communcations Platforms"
 },
 {
   "code": "st7",
   "skill": "Tactical Planning",
   "lesson": "Developing Tactical Publication Plans"
 },
 {
   "code": "st8",
   "skill": "Strategic Adaptation",
   "lesson": "Monitoring Evolving Trends in Publication Planning"
 },
 {
   "code": "im1",
   "skill": "Outreach",
   "lesson": "Engaging Authors and Contributors for Publication",
   "objectID": "6msSQzigFAI"
 },
 {
   "code": "im2",
   "skill": "Workflow Processing",
   "lesson": "Effective Writing, Review, and Approval Processes",
   "objectID": "67lzdajo3SJ"
 },
 {
   "code": "im3",
   "skill": "Publication Administration",
   "lesson": "Managing Administrative Aspects of Publication Plans",
   "objectID": "5ZYCqbWNfyh"
 },
 {
   "code": "im4",
   "skill": "Analytics",
   "lesson": "Tracking Metrics of Publications and Overall Plans",
   "objectID": "6DOi669q06K"
 },
 {
   "code": "im5",
   "skill": "Implementation Adaptation",
   "lesson": "Monitoring Evolving Trends in Implementation",
   "objectID": "6RcQeijJmmu"
 },
 {
   "code": "et1",
   "skill": "Compliance",
   "lesson": "Maintaining Knowledge of Standards, Guidelines, and Position Statements"
 },
 {
   "code": "et2",
   "skill": "Standards Application",
   "lesson": "Applying Standards of Ethical Conduct "
 },
 {
   "code": "et3",
   "skill": "Disclosure Processing",
   "lesson": "Ensuring Proper Disclosures"
 },
 {
   "code": "et4",
   "skill": "Recognition",
   "lesson": "Acknowledging Contributors"
 },
 {
   "code": "et5",
   "skill": "Adaptive Ethics",
   "lesson": "Monitoring Ethical Trends"
 }
];
const ass_content = {
  // Developing Publication Plans - Strategy
  "st_q1": {
    "stem": "You are an editor working at Dynamica Health Communications and have been given the opportunity to strategize a new publication about \"HY-P832,\" a drug aimed at treating chronic migraines. Your journey begins in the bustling office of Dynamica, where you're tasked with developing a comprehensive publication plan.\nIt's Monday morning, and you're in the conference room with your team. Your manager, Alex, outlines the importance of understanding the disease landscape.\nAlex asks, \"How do you plan to gather insights on chronic migraines?\"\nChoose a single response to Alex.",
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
    "dist_5": "Prioritize results of the primary endpoint of the trial and key secondary endpoints, including safety data",
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
    "stem": "You step into your manager's office to discuss the scope of the publication. They need your final decision on the type of publication.\nAlex says, \"Which publication are you leaning towards?\"\nYou would be most likely to....",
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
    "dist_1": "Novice",
    "dist_2": "Better than novice",
    "dist_3": "Medium level",
    "dist_4": "Better than medium",
    "dist_5": "Expert",
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
    "dist_4": "Call a meeting of others with your role to identify company-wide approaches to plain language summaries.",
    "dist_5": "Happily implement the guidelines and standards you have developed as lead of a internal and external working group related to developing plain language summaries.",
    "task_code": "st8"
  },
  "im_q1": {
    "stem": "You are a Publications Manager at Innovate Pharma, and the publication plan for HY-P832 is approved. Your next step is to begin implementing this plan, starting with identifying authors for a key peer-reviewed manuscript.\nAction: You need to identify a lead author for the primary publication reporting the Phase III clinical trial results of HY-P832.\nQuestion: Which of the following would be your most appropriate first step in identifying a lead author?\nChoose a single response:",
    "dist_1": "Immediately reach out to the most senior physician listed on the study protocol.",
    "dist_2": "Send an email to all investigators involved in the Phase III trial asking for volunteers.",
    "dist_3": "Review the publication plan to identify pre-defined criteria for authorship and discuss potential candidates with the medical affairs lead.",
    "dist_4": "Consult with your internal medical writing team to see if they can take on the lead authorship role.",
    "dist_5": "Content TBD - do we need 4 or 5?",
    "task_code": "im1"
  },
  "im_q2": {
    "stem": "The draft manuscript for the HY-P832 Phase III trial is nearing completion. You need to manage the review and approval process efficiently.\nQuestion: What is the most crucial aspect to emphasize when initiating the review process with the authors and relevant stakeholders?\nChoose a single response:",
    "dist_1": "The importance of a quick turnaround to meet the target submission date.",
    "dist_2": "Focusing solely on grammatical errors and formatting issues.",
    "dist_3": "The need for thorough and constructive feedback based on the agreed-upon publication objectives and data integrity.",
    "dist_4": "That only minor edits are expected at this stage to avoid delays.",
    "dist_5": "Content TBD - do we need 4 or 5?",
    "task_code": "im2"
  },
  "im_q3": {
    "stem": "You are juggling multiple publications within the HY-P832 plan. Keeping track of progress and deadlines is becoming challenging.\nWhich of the following would you choose to manage the administrative aspects of your publication plan and ensure all deliverables are on track?",
    "dist_1": "Rely on email reminders and personal notes.",
    "dist_2": "Schedule ad-hoc meetings to discuss progress on each publication.",
    "dist_3": "Implement a centralized tracking system with key milestones, responsibilities, and deadlines for each publication.",
    "dist_4": "Delegate all administrative tasks to an administrative assistant.",
    "dist_5": "Content TBD - do we need 4 or 5?",
    "task_code": "im3"
  },
  "im_q4": {
    "stem": "The first few publications from the HY-P832 plan have been published. Your manager, Sarah, wants to understand the impact of these publications.\nSarah asks, \"How are we tracking the success of these initial HY-P832 publications?\"\nYou would be most likely to respond that you are...",
    "dist_1": "Monitoring the number of downloads from the journal websites.",
    "dist_2": "Tracking the number of citations the publications receive.",
    "dist_3": "Primarily focused on whether the publications met the initial submission deadlines.",
    "dist_4": "Tracking a range of metrics, including journal impact factor, citation counts, website/social media engagement, and alignment with the overall communication objectives.",
    "dist_5": "Content TBD - do we need 4 or 5?",
    "task_code": "im4"
  },
  "im_q5": {
    "stem": "Months into the implementation of the HY-P832 publication plan, you notice a growing trend in the field towards publishing open-access articles.\nHow would you respond to this evolving trend in the context of your ongoing publication plan?",
    "dist_1": "Ignore the trend as the current plan is already established.",
    "dist_2": "Immediately switch all planned publications to open access, regardless of budget or journal suitability.",
    "dist_3": "Review the publication plan and budget to assess the feasibility and strategic implications of incorporating open-access options for upcoming publications.",
    "dist_4": "Discuss the trend with the legal department to understand any potential compliance issues.",
    "dist_5": "Content TBD - do we need 4 or 5?",
    "task_code": "im5"
  },
  "et_q1": {
    "stem": "You are drafting a publication outlining a post-hoc analysis of the HY-P832 clinical trial data. A new guideline from a relevant professional society regarding post-hoc analyses has recently been released.\nWhat is your responsibility regarding this new guideline?",
    "dist_1": "Assume the existing publication plan is sufficient and proceed without reviewing the new guideline.",
    "dist_2": "Quickly skim the guideline to see if it mentions HY-P832 specifically.",
    "dist_3": "Thoroughly review the new guideline and assess its potential impact on the planned post-hoc publication, making necessary adjustments.",
    "dist_4": "Delegate the responsibility of reviewing the guideline to a junior team member.",
    "dist_5": "Content TBD - do we need 4 or 5?",
    "task_code": "et1"
  },
  "et_q2": {
    "stem": "During the author identification process for a HY-P832 publication, a senior investigator who made minimal contributions to the study insists on being listed as a co-author due to their seniority.\nHow should you address this situation ethically?\nChoose a single response:",
    "dist_1": "Agree to include the investigator to maintain good relationships.",
    "dist_2": "Politely explain the authorship criteria (e.g., ICMJE recommendations) and engage in a transparent discussion about their contributions.",
    "dist_3": "Defer the decision to the lead author.",
    "dist_4": "Escalate the issue to your manager without attempting to resolve it directly.",
    "dist_5": "Content TBD - do we need 4 or 5?",
    "task_code": "et2"
  },
  "et_q3": {
    "stem": "You are collecting disclosure information from the authors of a HY-P832 review article. One of the authors discloses a significant financial interest in a competing product.\nHow would you handle this disclosure in the publication?",
    "dist_1": "Omit the disclosure to avoid potential bias concerns.",
    "dist_2": "Simply list the disclosure without providing any context.",
    "dist_3": "Ensure the disclosure is clearly stated in the publication, including the nature of the interest and its relevance to the topic, adhering to journal guidelines.",
    "dist_4": "Ask the author to withdraw from the publication.",
    "dist_5": "Content TBD - do we need 4 or 5?",
    "task_code": "et3"
  },
  "et_q4": {
    "stem": "Several individuals, including medical writers and statisticians, have made significant contributions to the development of a HY-P832 manuscript but do not meet the criteria for authorship.\nHow should these contributions be appropriately recognized?",
    "dist_1": "No acknowledgement is necessary as they are paid for their services.",
    "dist_2": "Include a general statement thanking \"all contributors.\"",
    "dist_3": "Include a specific acknowledgement section in the publication detailing the roles and contributions of each non-author contributor, with their permission.",
    "dist_4": "Only acknowledge individuals from within your own company.",
    "dist_5": "Content TBD - do we need 4 or 5?",
    "task_code": "et4"
  },
  "et_q5": {
    "stem": "You attend a conference and learn about increasing scrutiny from regulatory bodies regarding the transparency of industry-sponsored publications and the use of plain language summaries.\nHow should you incorporate this evolving trend into your ongoing and future publication plans for HY-P832?",
    "dist_1": "Wait for formal guidance from your company's legal department before making any changes.",
    "dist_2": "Continue with the current processes as they have been previously approved.",
    "dist_3": "Proactively research the new regulatory expectations and explore opportunities to enhance transparency and incorporate plain language summaries in relevant HY-P832 publications.",
    "dist_4": "Only consider these changes for publications related to new drugs, not existing ones like HY-P832.",
    "dist_5": "Content TBD - do we need 4 or 5?",
    "task_code": "et5"
  }
};

// this helper function accounts for poor text handling abilities in storyline and replacees newline with <br><br>
function replaceNewlines(text) {
  let textb =  text.replace(/\n/g, '<br><br>');
  //console.log(textb);
  return textb
}

// this loads a new assessment question and calls various helper functions.
function loadquest(){
// determine the number of questions so we can advance to results when all have been asked by setting a SL variable to hold the total num of questions.
var q_count = player.GetVar("skill_ass_q_count");
 console.log(q_count);
var cur_ass_code = player.GetVar("current_assessment");
const thisquiz = Object.keys(ass_content)
  .filter(key => key.startsWith(cur_ass_code+"_q"))
  .map(key => ass_content[key]);
const numQuestions = Object.keys(thisquiz).length;
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
 
let curr_question = cur_ass_code+"_q"+q_count;
const fq = filterQuestion(ass_content, curr_question);
const dist_array = [{value: 1, text: fq[curr_question].dist_1},{value: 2, text: fq[curr_question].dist_2},{value: 3, text: fq[curr_question].dist_3},{value: 4, text: fq[curr_question].dist_4},{value: 5, text: fq[curr_question].dist_5}];
// optional function to shuffle the distractors. Makes debug or test more difficult.
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

// handles assessment answer selection processing.
function handlechoice(value) {
var current_task = player.GetVar("cur_ass_task");
var q_value = player.GetVar(value+"_val");
var ass_code = player.GetVar("current_assessment");
player.SetVar(current_task+"_sc",q_value);
var curscore = player.GetVar(ass_code+"_score");
curscore = q_value + curscore;
var q_total = player.GetVar("skill_ass_q_total");
player.SetVar(ass_code+"_score",curscore);

function calculatePercentageScore(pointsEarned, numberOfQuestions) {
  const maxPoints = numberOfQuestions * 5;
  const percentage = (pointsEarned / maxPoints) * 100;
  return percentage.toFixed(2); // returns percentage with 2 decimal places
}

var newpercent = calculatePercentageScore(curscore, q_total);
   console.log(newpercent);
player.SetVar(ass_code+"_score_percent",newpercent);
}

// this lets us abstract the coaching messages and set up for randomization. A larger object of messages can be generated by AI as we build this out.
function getCoachMessage(domain, type, lesson) {
  const coach = coachPhrases[domain];
  const phrases = coach.messages[type];
  // Pick a random phrase for variety
  const phrase = phrases[Math.floor(Math.random() * phrases.length)];
  return phrase.replace("{lesson}", lesson);
}

// display the current top priority or alternate message where needed. The routine will grow but for now we are setting it up for the future. These strings should also be extracted from here but will leave that for the future.
function coach(dutyarea, displayVar) {
  var player = GetPlayer();

  // Filter l_data for the selected duty area
  const domainSkills = l_data.filter(item => item.code.startsWith(dutyarea));

  // Build an updated array with current Storyline values
  const updatedSkills = domainSkills.map(item => {
    const code = item.code;
    return {
      ...item,
      initial_score: player.GetVar(code + "_sc"),
      current_score: player.GetVar(code + "_cur_score"),
      status: player.GetVar(code + "_status")
    };
  });

  // 1. Incomplete lessons (Not started or In Progress)
  const incomplete = updatedSkills.filter(s => s.status !== "Complete");
  if (incomplete.length > 0) {
    incomplete.sort((a, b) =>
      a.initial_score - b.initial_score ||
      a.skill.localeCompare(b.skill)
    );
    const lesson = incomplete[0];
    let msg = getCoachMessage(dutyarea, "priority", lesson.lesson);
    player.SetVar(displayVar, msg);
    return;
  }

  // 2. All lessons complete, but some current scores < 4
  const needsBoost = updatedSkills.filter(s => s.current_score < 4);
  if (needsBoost.length > 0) {
    needsBoost.sort((a, b) =>
      a.current_score - b.current_score ||
      a.skill.localeCompare(b.skill)
    );
    const lesson = needsBoost[0];
    let msg = getCoachMessage(dutyarea, "needsBoost", lesson.lesson);
    player.SetVar(displayVar, msg);
    return;
  }

  // 3. All scores 4 or higher: ready for the challenge
  let finalMsg = getCoachMessage(dutyarea, "challengeReady", lesson.lesson);
  player.SetVar(displayVar, finalMsg);
}

// Lists current priority focus areas during onboarding only.
function displayresults(){
player.SetVar("skill_ass_q_count",1);
var ass_code = player.GetVar("current_assessment");
var prior_ar = [];
const scored_data = l_data.map(item => {
  var varName = ass_code + item.code.slice(2) + "_sc";
  var score = player.GetVar(varName);
  if (typeof score !== "number") score = 0;
  return { ...item, score: score };
});
const needs_development = scored_data
  .filter(item => item.score >= 1 && item.score <= 3 && item.code.startsWith(ass_code))
  .sort((a, b) => a.score - b.score);
let displayString;
if (needs_development.length > 0) {
  displayString = needs_development
    .map(item => `${item.skill}`)
    .join('\n');
} else {
  displayString = "You don't have any pressing development needs right now, but I'm sure you can fine tune some skills.";
}
player.SetVar("prior_skills", displayString);
}

// used to display coaches and their rings in appropriate left to right order based on user progress.
function displaycoaching_progress(template){
const ob_pos = [583,840,1100];
const ov_pos = [458,842,1225];
var positions = [];
var etGroup,etRing,stGroup,stRing,impGroup,impRing;
 
 if (template == "onboarding") {
  positions = ob_pos;
  etGroup = player.object('6GOcybBIo54');
  etRing = player.object('6WAwXPWcgLu');
  impGroup = player.object('6kTK4LXHKfk');
  impRing = player.object('6WXLXeYOLbl');
  stGroup = player.object('5oZ8jY1scCS');
  stRing = player.object('6jMHI0jQuZK');
 } else if (template == "overview") {
  positions = ov_pos;
  etGroup = player.object('5hSdYw2TV9F');
  etRing = player.object('5knReKJyuLF');
  impGroup = player.object('601IiGhuWVK');
  impRing = player.object('5zKYuNJf4mO');
  stGroup = player.object('5V3OXYlO9IH');
  stRing = player.object('5iIP4KefbB6');
 } else {
  etRing = player.object('5knReKJyuLF');
  impRing = player.object('6cEzVlubu9B');
  stRing = player.object('5iIP4KefbB6');
 }


var st_score_raw = player.GetVar("st_score_percent");
var im_score_raw = player.GetVar("im_score_percent");
var et_score_raw = player.GetVar("et_score_percent");

if (template === "overview" || template = "onbaording" ) {
const init_order = [[st_score_raw,stGroup],[im_score_raw,impGroup],[et_score_raw,etGroup]]
init_order.sort((a, b) => a[0] - b[0]);
const adjustedorder = init_order.map(pair => pair[1]);
positions.forEach((position,index)=>{
adjustedorder[index].x = position;
});
}


// we may extract this later but it basically rounds user progress percentile score to the nearest tenth. Ideally in a HTML/CSS envionment the rings would be svg and the fill could be animated and controlled differetnly so this is not a long term solution. Other data visualization libraries could be integrated as well to replace or improve the rings.
function rounder(number) {
  // Divide by 10 to get the "tens" unit
  let tensUnit = number / 10;
  // Round to the nearest whole number
  let roundedTensUnit = Math.round(tensUnit);
  // Multiply by 10 to get the final rounded value
  let roundedNumber = roundedTensUnit * 10;
  return roundedNumber;
}

let st_tenth = rounder(st_score_raw);
let im_tenth = rounder(im_score_raw);
let et_tenth = rounder(et_score_raw);


switch (template) {
  case "im":
    impRing.state="i"+im_tenth;
    break;
  case "st":
    stRing.state="s"+st_tenth;
    break;
  case "et":
    etRing.state="e"+et_tenth;
    break;
  default:
    etRing.state="e"+et_tenth;
    impRing.state="i"+im_tenth;
    stRing.state="s"+st_tenth;
}  

}

function activatedp() {
     const dateInput = document.querySelector('.acc-textinput');
    if (dateInput) {
        // Initialize Flatpickr on the input field
        flatpickr(dateInput, {
            onChange: (selectedDates, dateStr) => {
                dateInput.value = dateStr; // Set the selected date in the input field
                player.setVar('dateSelected', dateStr);
            },
            onClose: (selectedDates, dateStr) => {
                dateInput.disabled = true; 
                setTimeout(() => {
                    dateInput.disabled = false;
                }, 100);
            }
        });
    }
}

// this is the function that orders and updates the cards in each coaching area.

function orderDomainCards(domain) {
  const proficiencyLabels = {
    0: "No Experience",
    1: "Awareness",
    2: "Emergent",
    3: "Proficient",
    4: "Expert"
  };

  // Filter lessons for the selected domain
  const domainLessons = l_data.filter(item => item.code.startsWith(domain));

  // Build lesson data and update Storyline display variables
  const lessons = domainLessons.map(item => {
    const code = item.code;
    const sc = player.GetVar(code + "_sc");
    const cur_score = player.GetVar(code + "_cur_score");

    // Set lesson title and skill display
    player.SetVar(code + "_lesson", item.lesson);
    player.SetVar(code + "_skill", item.skill);

    // Set initial competency display
    player.SetVar(code + "_initial_comp", proficiencyLabels[sc] || "No Experience");

    // Set current competency display and status
    let cur_comp, status;
    if (cur_score === 0) {
      cur_comp = "Building";
      status = "Building";
    } else if (cur_score === 100) {
      cur_comp = "Building";
      status = "Accessed";
    } else if (cur_score >= 1 && cur_score <= 4) {
      cur_comp = proficiencyLabels[cur_score];
      status = proficiencyLabels[cur_score];
    } else {
      cur_comp = "Not Accessed";
      status = "Not Accessed";
    }
    player.SetVar(code + "_cur_comp", cur_comp);
    player.SetVar(code + "_status", status);

    return {
      ...item,
      sc,
      cur_score,
      status,
      initial_score: sc,
      current_score: cur_score
    };
  });

  // Prioritization logic as before
  lessons.sort((a, b) => {
    // 1. Incomplete first (not "Expert" or "Proficient" or "Emergent" or "Awareness")
    const aComplete = (a.status === "Expert" || a.status === "Proficient" || a.status === "Emergent" || a.status === "Awareness");
    const bComplete = (b.status === "Expert" || b.status === "Proficient" || b.status === "Emergent" || b.status === "Awareness");
    if (!aComplete && bComplete) return -1;
    if (aComplete && !bComplete) return 1;

    // 2. If both incomplete, order by initial_score, then skill
    if (!aComplete && !bComplete) {
      if (a.initial_score !== b.initial_score) return a.initial_score - b.initial_score;
      return a.skill.localeCompare(b.skill);
    }
    // 3. If both complete, order by current_score < 4
    const aNeedsBoost = a.current_score < 4;
    const bNeedsBoost = b.current_score < 4;
    if (aNeedsBoost && !bNeedsBoost) return -1;
    if (!aNeedsBoost && bNeedsBoost) return 1;
    if (aNeedsBoost && bNeedsBoost) {
      if (a.current_score !== b.current_score) return a.current_score - b.current_score;
      return a.skill.localeCompare(b.skill);
    }
    // 4. Otherwise, alphabetical
    return a.skill.localeCompare(b.skill);
  });

  // Move cards to their new Y positions
  const yPositions = [114, 233, 352, 471, 590, 709, 828, 947];
  lessons.forEach((lesson, idx) => {
    if (lesson.objectID && yPositions[idx] !== undefined) {
      player.object(lesson.objectID).y = yPositions[idx];
    }
  });
}
