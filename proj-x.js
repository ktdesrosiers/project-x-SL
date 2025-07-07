var player = GetPlayer();
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

  // Implementing a Publication Plan - Implementation
  "im_q1": {
    "stem": "You are a Publications Manager at Innovate Pharma, and the publication plan for HY-P832 is approved. Your next step is to begin implementing this plan, starting with identifying authors for a key peer-reviewed manuscript.\nAction: You need to identify a lead author for the primary publication reporting the Phase III clinical trial results of HY-P832.\nQuestion: Which of the following would be your most appropriate first step in identifying a lead author?\nChoose a single response:",
    "dist_1": "Immediately reach out to the most senior physician listed on the study protocol.",
    "dist_2": "Send an email to all investigators involved in the Phase III trial asking for volunteers.",
    "dist_3": "Review the publication plan to identify pre-defined criteria for authorship and discuss potential candidates with the medical affairs lead.",
    "dist_4": "Consult with your internal medical writing team to see if they can take on the lead authorship role.",
    "task_code": "im1"
  },
  "im_q2": {
    "stem": "The draft manuscript for the HY-P832 Phase III trial is nearing completion. You need to manage the review and approval process efficiently.\nQuestion: What is the most crucial aspect to emphasize when initiating the review process with the authors and relevant stakeholders?\nChoose a single response:",
    "dist_1": "The importance of a quick turnaround to meet the target submission date.",
    "dist_2": "Focusing solely on grammatical errors and formatting issues.",
    "dist_3": "The need for thorough and constructive feedback based on the agreed-upon publication objectives and data integrity.",
    "dist_4": "That only minor edits are expected at this stage to avoid delays.",
    "task_code": "im2"
  },
  "im_q3": {
    "stem": "You are juggling multiple publications within the HY-P832 plan. Keeping track of progress and deadlines is becoming challenging.\nWhich of the following would you choose to manage the administrative aspects of your publication plan and ensure all deliverables are on track?",
    "dist_1": "Rely on email reminders and personal notes.",
    "dist_2": "Schedule ad-hoc meetings to discuss progress on each publication.",
    "dist_3": "Implement a centralized tracking system with key milestones, responsibilities, and deadlines for each publication.",
    "dist_4": "Delegate all administrative tasks to an administrative assistant.",
    "task_code": "im3"
  },
  "im_q4": {
    "stem": "The first few publications from the HY-P832 plan have been published. Your manager, Sarah, wants to understand the impact of these publications.\nSarah asks, \"How are we tracking the success of these initial HY-P832 publications?\"\nYou would be most likely to respond that you are...",
    "dist_1": "Monitoring the number of downloads from the journal websites.",
    "dist_2": "Tracking the number of citations the publications receive.",
    "dist_3": "Primarily focused on whether the publications met the initial submission deadlines.",
    "dist_4": "Tracking a range of metrics, including journal impact factor, citation counts, website/social media engagement, and alignment with the overall communication objectives.",
    "task_code": "im4"
  },
  "im_q5": {
    "stem": "Months into the implementation of the HY-P832 publication plan, you notice a growing trend in the field towards publishing open-access articles.\nHow would you respond to this evolving trend in the context of your ongoing publication plan?",
    "dist_1": "Ignore the trend as the current plan is already established.",
    "dist_2": "Immediately switch all planned publications to open access, regardless of budget or journal suitability.",
    "dist_3": "Review the publication plan and budget to assess the feasibility and strategic implications of incorporating open-access options for upcoming publications.",
    "dist_4": "Discuss the trend with the legal department to understand any potential compliance issues.",
    "task_code": "im5"
  },

  // Foster Ethical and Compliant Behavior in Publication Plans - Ethics
  "et_q1": {
    "stem": "You are drafting a publication outlining a post-hoc analysis of the HY-P832 clinical trial data. A new guideline from a relevant professional society regarding post-hoc analyses has recently been released.\nWhat is your responsibility regarding this new guideline?",
    "dist_1": "Assume the existing publication plan is sufficient and proceed without reviewing the new guideline.",
    "dist_2": "Quickly skim the guideline to see if it mentions HY-P832 specifically.",
    "dist_3": "Thoroughly review the new guideline and assess its potential impact on the planned post-hoc publication, making necessary adjustments.",
    "dist_4": "Delegate the responsibility of reviewing the guideline to a junior team member.",
    "task_code": "et1"
  },
  "et_q2": {
    "stem": "During the author identification process for a HY-P832 publication, a senior investigator who made minimal contributions to the study insists on being listed as a co-author due to their seniority.\nHow should you address this situation ethically?\nChoose a single response:",
    "dist_1": "Agree to include the investigator to maintain good relationships.",
    "dist_2": "Politely explain the authorship criteria (e.g., ICMJE recommendations) and engage in a transparent discussion about their contributions.",
    "dist_3": "Defer the decision to the lead author.",
    "dist_4": "Escalate the issue to your manager without attempting to resolve it directly.",
    "task_code": "et2"
  },
  "et_q3": {
    "stem": "You are collecting disclosure information from the authors of a HY-P832 review article. One of the authors discloses a significant financial interest in a competing product.\nHow would you handle this disclosure in the publication?",
    "dist_1": "Omit the disclosure to avoid potential bias concerns.",
    "dist_2": "Simply list the disclosure without providing any context.",
    "dist_3": "Ensure the disclosure is clearly stated in the publication, including the nature of the interest and its relevance to the topic, adhering to journal guidelines.",
    "dist_4": "Ask the author to withdraw from the publication.",
    "task_code": "et3"
  },
  "et_q4": {
    "stem": "Several individuals, including medical writers and statisticians, have made significant contributions to the development of a HY-P832 manuscript but do not meet the criteria for authorship.\nHow should these contributions be appropriately recognized?",
    "dist_1": "No acknowledgement is necessary as they are paid for their services.",
    "dist_2": "Include a general statement thanking \"all contributors.\"",
    "dist_3": "Include a specific acknowledgement section in the publication detailing the roles and contributions of each non-author contributor, with their permission.",
    "dist_4": "Only acknowledge individuals from within your own company.",
    "task_code": "et4"
  },
  "et_q5": {
    "stem": "You attend a conference and learn about increasing scrutiny from regulatory bodies regarding the transparency of industry-sponsored publications and the use of plain language summaries.\nHow should you incorporate this evolving trend into your ongoing and future publication plans for HY-P832?",
    "dist_1": "Wait for formal guidance from your company's legal department before making any changes.",
    "dist_2": "Continue with the current processes as they have been previously approved.",
    "dist_3": "Proactively research the new regulatory expectations and explore opportunities to enhance transparency and incorporate plain language summaries in relevant HY-P832 publications.",
    "dist_4": "Only consider these changes for publications related to new drugs, not existing ones like HY-P832.",
    "task_code": "et5"
  }
};

// this helper function accounts for poor text handling abilities in stoyrline and replacees newline with <br><br>
function replaceNewlines(text) {
  let textb =  text.replace(/\n/g, '<br><br>');
  //console.log(textb);
  return textb
}

// this loads a new assessmetn question and calls various helper functions.
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
