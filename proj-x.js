/* This code is intended to run from a Articulate Storyline SCORM conformant learning object. The ultimate SCORM protocol is not important however, using xAPI would be optimal and allow for more nuanced learning analytics. specifci xAPI calls are not on the RM for this inital release so tracking will be limited tot he clients (ISMPP) deplyment environment. This js file is loaded as an external script when the learning object initiates and can either be distributed with the SCORM or xAPI package (more restrictive environments) or remain hosted (less restrictive environments). Embedding this file into the deployable package limits versioning and updates. Assume this hosted file is the most current unless the dev environment is pointing to a local file. A versioning method has not been implemented for the Storyline Development environment given it's not a robust environment that would make sourvce and versioning meaningful. That being said source control will be come an issue if there are several distributables released for mroe restrictive environments. */

/* Storyline creates HTML5 content that uses a proprietary run time player. Keep this in mind when reviewing some of the odd methods in the code below. The player limits true DOM manipulation and handles data persistence across multiple user sessions as part of the SCORM / xAPI interface. Keeping storyline variables up to date rather than session or cookie based data has limitations but allows for simple variable reinstatement. THe core content data is placed at the top of this file. THis could be stored as JSON or retried via an API in the future, again the constraint is that the client has a less restrictive enviornment. More restrictive environments would obviously require appropriate data sharing agreements, whitelisting etc.. if the application were to ever utilize fully dynamic content generation. */
// debug value switches the reletaive path of the storyline lesson so that we can test versus when its in a scorm package.

var testlesson = "im1";
var test_return_lesson = "";
var player = GetPlayer();
// control debug mode by setting the default value of the debug var in SL.
const debug = player.GetVar("debug");

// not the best name for now but these are the vertical stops we use to order coach cards and are referred to in a function function below.
const yPositions = [114, 233, 352, 471, 590, 709, 828, 947];

const coachPhrases = {
  st: {
    name: "Maia",
    persona: "Strategic, supportive, a touch mysterious",
    messages: {
      CL: {
        priority: [
          "Let’s see how you approach \"{lesson}\"—sometimes the first step is the most revealing.",
          "\"{lesson}\" is a good place to start—let’s look at it together.",
          "Curiosity is your best asset. \"{lesson}\" will set the tone for your journey.",
          "Every strategist starts somewhere. \"{lesson}\" is your opening move."
        ],
        needsBoost: [
          "If \"{lesson}\" needs another look, I’m here to help you find a new angle.",
          "Let’s take another look at \"{lesson}\" when you’re ready. Strategy sometimes means revisiting old ground.",
          "A second glance at \"{lesson}\" could reveal something new. I’m here to guide you.",
          "Progress isn’t always linear—let’s revisit \"{lesson}\" together."
        ],
        challengeReady: [
          "You’re making progress. When you’re ready, we can explore a more strategic challenge together.",
          "Nice progress so far. Let me know if you’d like to move on to the next step.",
          "Ready for a challenge? I have something special lined up for you.",
          "Your preparation shows. Let’s see how you handle the next level."
        ]
      },
      CH: {
        neverAccessed: [
          "It’s just us here—time to focus on your strategic skills. This page is tailored to help you build a strong foundation, with lessons ordered to match your growth. As you work through them, I’ll be here to guide and adjust your path.",
          "Welcome to your strategy hub. Each lesson is chosen to help you see the bigger picture. I’ll be tracking your progress and offering insights as you go.",
          "We have the perfect opportunity to build your strategic mindset from the ground up. Let’s make each lesson count."
        ],
        oneAccessed: [
          "Good work. As you progress with the lessons, keep in mind that your progress ring may sometimes move backward. This is perfectly normal—learning isn’t a straight line. As you approach expert level in each lesson, your ring will close and reflect your growth.",
          "You’ve made a strong start. Remember, progress can ebb and flow—what matters is your commitment to growth.",
          "First steps are always the most important. Stay curious and keep moving forward."
        ],
        inProgress: [
          "Your strategic journey continues. The next lesson, \"{lesson}\", will help you see the bigger picture and anticipate challenges. Strategy is about asking the right questions—let’s keep sharpening that skill together.",
          "Focus on \"{lesson}\" next. Every lesson adds a new layer to your strategic thinking.",
          "Let’s tackle \"{lesson}\"—sometimes the best insights come from unexpected places.",
          "Keep your mind open as you approach \"{lesson}\". Strategy rewards those who look beyond the obvious."
        ],
        needsBoost: [
          "You’re progressing well, but \"{lesson}\" might benefit from another look. Sometimes, revisiting a topic reveals new insights. I’m here to help you connect the dots.",
          "A little more time with \"{lesson}\" could make all the difference. Let’s see what you discover.",
          "Don’t hesitate to revisit \"{lesson}\"—even experts review the basics.",
          "Mastery is built on repetition. Give \"{lesson}\" another go when you’re ready."
        ],
        challengeReady: [
          "Congratulations, you’ve reached the strategic challenge. This adaptive quiz draws from a wide range of scenarios, so each attempt will be unique. Use it to test your thinking, and remember: strategy is about learning from every outcome. Take the challenge regularly to keep your skills sharp.",
          "You’re ready for the next level. The challenge will stretch your abilities and offer new perspectives each time.",
          "The strategic challenge is designed to keep you on your toes. Try it often—each attempt brings new insights.",
          "Now’s your chance to put your strategy skills to the test. The challenge adapts, so every round is a fresh opportunity."
        ]
      }
    }
  },
  im: {
    name: "Pat",
    persona: "Straightforward, experienced, quietly encouraging",
    messages: {
      CL: {
        priority: [
          "\"{lesson}\" is next on the plan. Let’s take it step by step.",
          "Let’s get started with \"{lesson}\"—steady progress is what counts.",
          "Every good plan starts with a first action. \"{lesson}\" is yours.",
          "Ready to roll up your sleeves? \"{lesson}\" is waiting."
        ],
        needsBoost: [
          "If \"{lesson}\" feels tough, that’s normal. We’ll work through it, one piece at a time.",
          "Let’s give \"{lesson}\" another try when you’re set. Every bit of practice helps.",
          "No shame in a second attempt at \"{lesson}\"—that’s how we get better.",
          "Persistence pays off. Let’s revisit \"{lesson}\" together."
        ],
        challengeReady: [
          "Solid start. If you’re ready, let’s see how you handle the next task.",
          "Good work so far. We can move ahead whenever you feel prepared.",
          "You’ve built a strong foundation. Time to put it to the test.",
          "Ready for a challenge? Let’s see your skills in action."
        ]
      },
      CH: {
        neverAccessed: [
          "I’ve got you all to myself now. Let’s dive into developing your implementation skills. I’ve set this page up to provide lessons prioritized to your development needs. As you engage with the lessons, I’ll update your progress and keep you on track.",
          "Welcome! This is our space for building real-world project skills. Each lesson has a purpose—let’s get started at your own pace.",
          "I set this page up to match the way you learn best. As you engage, I’ll update your progress so you always know where you stand."
        ],
        oneAccessed: [
          "Good work making a start! As you move through more lessons, remember that your progress ring may move back or forth—this is normal. Stick with it, and progress will follow.",
          "Solid first steps. Some fluctuation in your ring is expected early on—learning isn’t linear, so keep at it.",
          "You’ve tackled your first lesson. Progress rings shift over time, and that’s perfectly fine. Let’s see what else you can do."
        ],
        inProgress: [
          "You’re making steady progress. Next up: \"{lesson}\". A strong plan is the backbone of every project—take your time and review when needed.",
          "\"{lesson}\" is now in focus. Remember, learning is as much about reflection as action. If you hit a snag, I’m just a click away.",
          "Keep an eye on \"{lesson}\"—focusing here will pay off across the rest of your work.",
          "Every lesson, like \"{lesson}\", is a building block. Let’s keep stacking them up."
        ],
        needsBoost: [
          "Take a moment with \"{lesson}\"—sometimes a little more practice gives that edge. No need to rush to the finish.",
          "\"{lesson}\" could use a bit more attention. Diligence here will make things easier down the road.",
          "Some lessons, like \"{lesson}\", are worth a second pass. Mastery comes from repetition.",
          "Let’s circle back to \"{lesson}\"—steady effort leads to real results."
        ],
        challengeReady: [
          "You’re ready for the implementation challenge! Every attempt brings fresh scenarios and questions. Try it several times to strengthen your skills.",
          "Excellent work—now’s the time to take on the challenge. Its adaptive questions make each round unique. Regular attempts build your mastery.",
          "You’ve made it! The challenge quiz is designed to keep surprising you, so give it a go whenever you want to test yourself.",
          "The challenge is your chance to put everything into practice. Each try is a new opportunity to improve."
        ]
      }
    }
  },
  et: {
    name: "Thomas",
    persona: "Calm, wise, quietly authoritative",
    messages: {
      CL: {
        priority: [
          "\"{lesson}\" is a good place to begin—let’s see how you reason through it.",
          "Let’s start with \"{lesson}\" and explore your approach.",
          "Every ethical journey starts with a single step. \"{lesson}\" is yours.",
          "Let’s see what you make of \"{lesson}\"—I’ll be here to guide you."
        ],
        needsBoost: [
          "If \"{lesson}\" needs another review, I’m here to help clarify any details.",
          "Let’s revisit \"{lesson}\" together if you think it would help sharpen your understanding.",
          "Sometimes a second look at \"{lesson}\" brings clarity. I’m happy to help.",
          "Ethics is about reflection. Let’s take another look at \"{lesson}\"."
        ],
        challengeReady: [
          "You’ve shown good judgment so far. Ready to test your skills further?",
          "Nice work so far. Let me know if you’d like to try the next challenge.",
          "You’re ready for the ethics challenge. Let’s see how you apply your knowledge.",
          "The next challenge awaits—let’s see your ethical reasoning in action."
        ]
      },
      CH: {
        neverAccessed: [
          "Welcome to your ethics journey. I’m here to help you navigate the complexities of ethical publishing. The lessons ahead are set up to build your understanding step by step, and I’ll be tracking your progress to offer guidance along the way.",
          "This is your space to explore the foundations of ethical practice. Each lesson is a step toward greater clarity and confidence.",
          "We’ll start from the beginning and build your ethical skills together. I’ll be here to support you at every turn."
        ],
        oneAccessed: [
          "Good work. As you progress with the lessons, keep in mind that your progress ring may sometimes move backward. This is perfectly normal—learning isn’t a straight line. As you approach expert level in each lesson, your ring will close and reflect your growth.",
          "You’ve made a promising start. Remember, ethical understanding deepens with each lesson—don’t worry if progress isn’t always forward.",
          "First lessons are just the beginning. Stay thoughtful and keep building your knowledge."
        ],
        inProgress: [
          "Ethics is a journey, not a destination. Your next focus, \"{lesson}\", will deepen your understanding of best practices. If something feels unclear, remember that asking questions is a sign of wisdom, not weakness.",
          "Let’s turn our attention to \"{lesson}\". Every lesson adds to your ability to make sound decisions.",
          "Focus on \"{lesson}\"—it’s an important part of your ethical toolkit.",
          "Each lesson, like \"{lesson}\", brings you closer to mastering the nuances of ethical publishing."
        ],
        needsBoost: [
          "Almost there! \"{lesson}\" is worth a second review to ensure you’re confident in your understanding. Ethics often requires a second look—let’s make sure you’re ready for any challenge.",
          "A bit more time with \"{lesson}\" will serve you well. Ethics rewards careful thought.",
          "Let’s revisit \"{lesson}\"—sometimes the best answers come after a pause.",
          "Don’t hesitate to review \"{lesson}\" again. True understanding comes with reflection."
        ],
        challengeReady: [
          "You’re prepared for the ethics challenge. The questions will change each time, giving you a chance to deepen your understanding with every attempt. Take the challenge regularly to keep your ethical skills sharp and ready for real-world situations.",
          "The ethics challenge is designed to stretch your thinking. Each attempt brings new scenarios—try it often to keep your skills sharp.",
          "Ready for the next step? The challenge adapts to your progress, so every round is a new opportunity.",
          "Now’s your chance to put your ethical reasoning to the test. The challenge will keep you learning with every try."
        ]
      }
    }
  }
};

const l_data =[
 {
   "code": "st1",
   "skill": "Market Research",
   "lesson": "Researching Disease and Therapeutic Landscapes",
   "objectID": "6ZCtsQibvDg"
 },
 {
   "code": "st2",
   "skill": "Data Analysis",
   "lesson": "Identifying Data for Publication",
   "objectID": "5YuEw96YjJL"
 },
 {
   "code": "st3",
   "skill": "Needs Assessment",
   "lesson": "Assessing Audience Information and Educational Needs",
   "objectID": "62KvqIVJbsP"
 },
 {
   "code": "st4",
   "skill": "Scoping",
   "lesson": "Defining Publication Plan Scope",
   "objectID": "5xigDPxXlmr"
 },
 {
   "code": "st5",
   "skill": "Committee Management",
   "lesson": "Managing Steering Committees",
   "objectID": "5cnEMoni6c9"
 },
 {
   "code": "st6",
   "skill": "Strategic Publishing",
   "lesson": "Applying to Scientific Communcations Platforms",
   "objectID": "5z97JS9ULpA"
 },
 {
   "code": "st7",
   "skill": "Tactical Planning",
   "lesson": "Developing Tactical Publication Plans",
    "objectID": "5vxstZX3Vcg"
 },
 {
   "code": "st8",
   "skill": "Strategic Adaptation",
   "lesson": "Monitoring Evolving Trends in Publication Planning",
   "objectID": "5YqH7FqNrnV"
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
   "lesson": "Maintaining Knowledge of Standards, Guidelines, and Position Statements",
   "objectID": "6jex6g1PTmX"
 },
 {
   "code": "et2",
   "skill": "Standards Application",
   "lesson": "Applying Standards of Ethical Conduct ",
    "objectID": "6iaVmSo8VbE"
 },
 {
   "code": "et3",
   "skill": "Disclosure Processing",
   "lesson": "Ensuring Proper Disclosures",
    "objectID": "6KBnjuS2HZy"
 },
 {
   "code": "et4",
   "skill": "Recognition",
   "lesson": "Acknowledging Contributors",
"objectID": "5ZRhA48No0K"
 },
 {
   "code": "et5",
   "skill": "Adaptive Ethics",
   "lesson": "Monitoring Ethical Trends",
    "objectID": "5VpotCFBsI8"
 }
];
const ass_content = {
  "st_q1": {
    "stem": "You are an editor working at Dynamica Health Communications and have been given the opportunity to strategize a new publication about \"HY-P832,\" a drug aimed at treating chronic migraines. Your journey begins in the bustling office of Dynamica, where you're tasked with developing a comprehensive publication plan.\nIt's Monday morning, and you're in the conference room with your team. Your manager, Alex, outlines the importance of understanding the disease landscape.\nAlex asks, \"How do you plan to gather insights on chronic migraines?\"\nChoose a single response to Alex.",
    "dist_1": "Use internet searches to gather basic information",
    "dist_2": "Review recent publications in medical journals",
    "dist_3": "Consult with industry experts and stakeholders",
    "dist_4": "Conduct a comprehensive literature review and interview leading key opinion leaders",
    "task_code": "st1"
  },
  "st_q2": {
    "stem": "Later, you're in the cafeteria grabbing lunch when your colleague Jamie joins you. Jamie is curious about what data you'll prioritize for the publication.\nJamie asks, \"What data are you thinking of highlighting?\"\nYou would be most likely to say you will...",
    "dist_1": "Emphasize safety data with minimal efficacy results",
    "dist_2": "Highlight efficacy results and include some patient testimonials",
    "dist_3": "Balance efficacy results and safety data with other endpoints",
    "dist_4": "Prioritize results of the primary endpoint of the trial and key secondary endpoints, including safety data",
    "task_code": "st2"
  },
  "st_q3": {
    "stem": "In the afternoon, you're in a brainstorming session with your team to assess potential audience needs as you plan further. Your task is to gather insights from healthcare professionals, patients, and regulatory bodies.\nYour team asks, \"How would we collect this information?\"\nYou would be most likely to respond with...",
    "dist_1": "Use past strategies because the strategies do not change much each year",
    "dist_2": "Conduct informal interviews with key stakeholders",
    "dist_3": "Use targeted surveys to gather audience insights",
    "dist_4": "Conduct focus groups and comprehensive surveys with each audience",
    "task_code": "st3"
  },
  "st_q4": {
    "stem": "You step into your manager's office to discuss the scope of the publication. They need your final decision on the type of publication.\nAlex says, \"Which publication are you leaning towards?\"\nYou would be most likely to....",
    "dist_1": "Select a regulatory submission based on ease of completion",
    "dist_2": "Opt for a peer-reviewed journal article that aligns with commercial messaging",
    "dist_3": "Choose a peer-reviewed journal article that would report only a small amount of data to increase the number of future publications",
    "dist_4": "Select a peer-reviewed journal article that aligns with clinical needs and audience information gaps",
    "task_code": "st4"
  },
  "st_q5": {
    "stem": "It's time to manage the publication planning committee. You're in a meeting room with representatives from various departments.\nA committee member asks, \"How will you gather input from the publication planning committee to ensure smooth execution of the publication plan?\"\nYour approach to this question would most likely be to...",
    "dist_1": "Schedule infrequent meetings with the clinical team",
    "dist_2": "Hold regular meetings with the clinical team for updates on data release",
    "dist_3": "Hold regular meetings with the clinical team and occasionally involve cross-functional teams",
    "dist_4": "Schedule regular meetings and ensure diverse representation from cross-functional teams",
    "task_code": "st5"
  },
  "st_q6": {
    "stem": "You are now ready to enter the details for the HY-P832 publication into your company’s scientific communications platform. This step is critical for ensuring the project is managed efficiently and in compliance with best practices. You must decide how thoroughly to complete the platform setup and documentation.\nAs you begin entering the publication project into the platform, which approach best describes how you would proceed?",
    "dist_1": "Enter only basic info and upload the draft. Use email for feedback. Need step-by-step guidance and frequent supervision.",
    "dist_2": "Complete all standard fields, upload drafts and documents, set up review workflow for key stakeholders. Work mostly independently, but need some guidance for compliance.",
    "dist_3": "Set up a detailed project record with taxonomy, version control, and structured review. Upload all required documents and adapt the process for project needs with little supervision.",
    "dist_4": "Use all platform features—cross-link projects, customize approvals, automate compliance checks. Advise others, champion best practices, and innovate for audit readiness.",
    "task_code": "st6"
  },
  "st_q7": {
    "stem": "In a quiet corner of the office, you're discussing publication strategy with your mentor, Taylor. The urgency to publish data on HY-P832 is high, as physicians need timely information on long-term safety.\nTaylor asks, \"Given the need for rapid and credible communication, what is the best approach to develop the publication and its plain language summary (PLS)?\"\nYou would be most likely to…",
    "dist_1": "Add the PLS as a scheduled step after the manuscript, but not integrated into the main workflow.",
    "dist_2": "Make the PLS a separate deliverable with its own timeline and budget, developed independently.",
    "dist_3": "Develop the PLS and manuscript in parallel for alignment and efficiency, and check journal requirements.",
    "dist_4": "Fully integrate the PLS: develop it concurrently, involve patient advocates, and target journals that peer-review and index PLSs",
    "task_code": "st7"
  },
  "st_q8": {
    "stem": "As the day winds down, you're at your desk developing post-publication timelines.\nYour colleague, Sam, stops by, \"Not sure if you saw the company wide memo but they want us to make sure to include plain language summaries in all future primary and secondary publications. I guess your new project falls into this category. How are you going to plan for it?”\nHow are you most likely to approach the new requirement?",
    "dist_1": "Adjust plans occasionally based on a quick review of plain language summary methods.",
    "dist_2": "Draw on your existing knowledge to define a plan given you regularly review industry trends.",
    "dist_3": "Call a meeting of others with your role to identify company-wide approaches to plain language summaries.",
    "dist_4": "Happily implement the guidelines and standards you have developed as lead of a internal and external working group related to developing plain language summaries.",
    "task_code": "st8"
  },
  "im_q1": {
    "stem": "You are a Publications Manager at Innovate Pharma, and the publication plan for HY-P832 is approved. Your next step is to begin implementing this plan, starting with identifying authors for a key peer-reviewed manuscript.\nYou need to identify a lead author for the primary publication reporting the Phase III clinical trial results of HY-P832.\nWhich of the following would be your first step in identifying a lead author?",
    "dist_1": "Immediately reach out to the most senior physician listed on the study protocol.",
    "dist_2": "Send an email to all investigators involved in the Phase III trial asking for volunteers.",
    "dist_3": "Review the publication plan to identify pre-defined criteria for authorship and discuss potential candidates with the medical affairs lead.",
    "dist_4": "Consult with your internal medical writing team to see if they can take on the lead authorship role.",
    "task_code": "im1"
  },
  "im_q2": {
    "stem": "The draft manuscript for the HY-P832 Phase III trial is nearing completion. You need to manage the review and approval process efficiently.\nWhat would you emphasize when initiating the review process with the authors and relevant stakeholders?",
    "dist_1": "The importance of a quick turnaround to meet the target submission date.",
    "dist_2": "Focusing solely on grammatical errors and formatting issues.",
    "dist_3": "The need for thorough and constructive feedback based on the agreed-upon publication objectives and data integrity.",
    "dist_4": "That only minor edits are expected at this stage to avoid delays.",
    "task_code": "im2"
  },
  "im_q3": {
    "stem": "You are juggling multiple publications within the HY-P832 plan. Keeping track of progress and deadlines is becoming challenging.\nWhat approach would you choose to manage the administrative aspects of your publication plan and ensure all deliverables are on track?",
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
  "et_q1": {
    "stem": "You are drafting a publication outlining a post-hoc analysis of the HY-P832 clinical trial data. A new guideline from a relevant professional society regarding post-hoc analyses has recently been released.\nWhat would you current approach be to reviewing the new guideline?",
    "dist_1": "Assume the existing publication plan is sufficient and proceed without reviewing the new guideline.",
    "dist_2": "Quickly skim the guideline to see if it mentions HY-P832 specifically.",
    "dist_3": "Thoroughly review the new guideline and assess its potential impact on the planned post-hoc publication, making necessary adjustments.",
    "dist_4": "Delegate the responsibility of reviewing the guideline to a junior team member.",
    "task_code": "et1"
  },
  "et_q2": {
    "stem": "During the author identification process for a HY-P832 publication, a senior investigator who made minimal contributions to the study insists on being listed as a co-author due to their seniority.\nHow would you elect to address this situation?",
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
    "stem": "Several individuals, including medical writers and statisticians, have made significant contributions to the development of a HY-P832 manuscript but do not meet the criteria for authorship.\nHow would you approach recognition in this situation?",
    "dist_1": "No acknowledgement is necessary as they are paid for their services.",
    "dist_2": "Include a general statement thanking \"all contributors.\"",
    "dist_3": "Include a specific acknowledgement section in the publication detailing the roles and contributions of each non-author contributor, with their permission.",
    "dist_4": "Only acknowledge individuals from within your own company.",
    "task_code": "et4"
  },
  "et_q5": {
    "stem": "You attend a conference and learn about increasing scrutiny from regulatory bodies regarding the transparency of industry-sponsored publications and the use of plain language summaries.\nHow would you incorporate this evolving trend into your ongoing and future publication plans for HY-P832?",
    "dist_1": "Wait for formal guidance from your company's legal department before making any changes.",
    "dist_2": "Continue with the current processes as they have been previously approved.",
    "dist_3": "Proactively research the new regulatory expectations and explore opportunities to enhance transparency and incorporate plain language summaries in relevant HY-P832 publications.",
    "dist_4": "Only consider these changes for publications related to new drugs, not existing ones like HY-P832.",
    "task_code": "et5"
  }
};


// this is called when we want to debug and set random values for the initial assessment to save time.

function debugSkippAss() {
  // Group lessons by domain prefix (e.g., 'im', 'st', 'et')
  const domainMap = {};

  l_data.forEach(item => {
    const code = item.code;
    // Extract domain prefix (first 2 letters), e.g., 'im'
    const domain = code.slice(0, 2);
    if (!domainMap[domain]) domainMap[domain] = [];
    // Random integer between 0 and 4
    const randomScore = Math.floor(Math.random() * 5);
    // Set Storyline variable, e.g., 'im1_sc'
    player.SetVar(code + "_sc", randomScore);
    domainMap[domain].push(randomScore);
  });

  // For each domain, compute and set the percent score
  Object.keys(domainMap).forEach(domain => {
    const scores = domainMap[domain];
    const total = scores.reduce((sum, val) => sum + val, 0);
    const max = scores.length * 4;
    let percent = 0;
    if (max > 0) {
      percent = (total / max) * 100;
    }
    // Format to two decimal points
    const percentStr = percent.toFixed(2);
    player.SetVar(domain + "_score_percent", percentStr);
  });
}


// this helper function accounts for poor text handling abilities in storyline and replacees newline with <br><br>
function replaceNewlines(text) {
  return text.replace(/\n/g, '<br><br>');
}

function loadquest() {
  var q_count = player.GetVar("skill_ass_q_count");
  var cur_ass_code = player.GetVar("current_assessment");
  const thisquiz = Object.keys(ass_content)
    .filter(key => key.startsWith(cur_ass_code + "_q"))
    .map(key => ass_content[key]);
  const numQuestions = thisquiz.length;
  player.SetVar("skill_ass_q_total", numQuestions);

  function filterQuestion(ass_content, questionKey) {
    if (ass_content.hasOwnProperty(questionKey)) {
      return { [questionKey]: ass_content[questionKey] };
    } else {
      return {};
    }
  }

  let curr_question = cur_ass_code + "_q" + q_count;
  const fq = filterQuestion(ass_content, curr_question);

  // Build distractors in order, with #5 always as "I would not know how to proceed."
  const dist_array = [
    { value: 1, text: fq[curr_question].dist_1 },
    { value: 2, text: fq[curr_question].dist_2 },
    { value: 3, text: fq[curr_question].dist_3 },
    { value: 4, text: fq[curr_question].dist_4 },
    { value: 0, text: "I would not know how to proceed." }
  ];

  player.SetVar("ass_stem", replaceNewlines(ass_content[curr_question].stem));
  player.SetVar("cur_ass_task", ass_content[curr_question].task_code);

  dist_array.forEach((item, index) => {
    let count = index + 1;
    player.SetVar("ass_ch_" + count, item.text);
    player.SetVar("ch" + count + "_val", item.value);
  });
}

/* Used when the learner makes a choice in the initial assessment. Assigns a value from 0 to 4
to the SL variable related to the initial user score for the task (e.g im1_sc) then addes the value related to the choice
to the numeric SL variable related to the initial score for the domain (e.g. st_score).
Finally the routine determines a percentage score of the domain based on the number of assessment questions for the domain and 
assignes it to the SL variable that holds the percent score for the domin (e.g. et_score_percent). */

function handlechoice(value) {
  var current_task = player.GetVar("cur_ass_task");
  var q_value = player.GetVar(value + "_val");
  var ass_code = player.GetVar("current_assessment");
  player.SetVar(current_task + "_sc", q_value);
  var curscore = player.GetVar(ass_code + "_score");
  curscore = q_value + curscore;
  var q_total = player.GetVar("skill_ass_q_total");
  player.SetVar(ass_code + "_score", curscore);

  function calculatePercentageScore(pointsEarned, numberOfQuestions) {
    const maxPoints = numberOfQuestions * 4; // Only 4 is max per question
    const percentage = (pointsEarned / maxPoints) * 100;
    return percentage.toFixed(2);
  }

  var newpercent = calculatePercentageScore(curscore, q_total);
  player.SetVar(ass_code + "_score_percent", newpercent);
}

// this lets us abstract the coaching messages and set up for randomization. A larger object of messages can be generated by AI as we build this out.
function getCoachMessage(domain, type, lesson) {
  const coach = coachPhrases[domain];
  const phrases = coach.messages[type];
  // Pick a random phrase for variety
  const phrase = phrases[Math.floor(Math.random() * phrases.length)];
  return phrase.replace("{lesson}", lesson);
}

// display the current top priority or alternate message where needed. The routine will grow but for now we are setting it up for the future.
function coach(domain, displayVar, template) {
  if (debug) {console.log("coach " + domain +" "+ displayVar +" "+ template)};
  const coachData = coachPhrases[domain];
  const messagesByTemplate = coachData.messages[template];

  // Generate fresh lesson state for this domain
  const domainLessons = l_data.filter(item => item.code.startsWith(domain));
  const lessons = domainLessons.map(item => ({
    ...item,
    cur_score: player.GetVar(item.code + "_cur_score"),
    status: player.GetVar(item.code + "_status"),
    lesson: item.lesson,
    skill: item.skill
  }));

  if (debug) {console.log("set lessons to " + JSON.stringify(lessons))};

  // Use the same sorting rules as orderDomainCards for consistency
  lessons.sort((a, b) => {
    const aComplete = ["Accessed", "Completed", "Not Started"].includes(a.status);
    const bComplete = ["Accessed", "Completed", "Not Started"].includes(b.status);
    if (!aComplete && bComplete) return -1;
    if (aComplete && !bComplete) return 1;
    if (!aComplete && !bComplete) {
      if (a.initial_score !== b.initial_score) return a.initial_score - b.initial_score;
      return a.skill.localeCompare(b.skill);
    }
    const aNeedsBoost = (a.cur_score < 4 && aComplete);
    const bNeedsBoost = (b.cur_score < 4 && bComplete);
    if (aNeedsBoost && !bNeedsBoost) return -1;
    if (!aNeedsBoost && bNeedsBoost) return 1;
    if (aNeedsBoost && bNeedsBoost) {
      if (a.cur_score !== b.cur_score) return a.cur_score - b.cur_score;
      return a.skill.localeCompare(b.skill);
    }
    return a.skill.localeCompare(b.skill);
  });

  // Find most relevant lesson for display
  const topLesson = lessons[0];
  const lessonPlaceholder = (template === "CH" && topLesson) ? topLesson.lesson : (topLesson ? topLesson.skill : "the next lesson");

  // Determine overall progress state for messaging selection
  const neverAccessed = lessons.some(s => s.status === "Not Started");
  const oneAccessed = lessons.filter(s => s.status === "Completed").length === 1;
  const allComplete = lessons.every(s => s.status === "Completed");
  const needsBoost = lessons.some(s => s.cur_score < 4 && s.status !== "Not Started" && s.status !== "Accessed");

   if (debug) {console.log("set state mess to " + neverAccessed + " " + oneAccessed + " " + allComplete + " " + needsBoost)};

  let msgList = [];
  if (template === "CH") {
    if (neverAccessed) msgList = messagesByTemplate.neverAccessed;
    else if (oneAccessed) msgList = messagesByTemplate.oneAccessed;
    else if (allComplete) msgList = messagesByTemplate.challengeReady;
    else if (needsBoost) msgList = messagesByTemplate.needsBoost;
    else msgList = messagesByTemplate.inProgress;
  } else if (template === "CL") {
    if (!allComplete && lessons.some(s => s.status !== "Expert")) {
      if (lessons.some(s => s.status !== "Completed"))
        msgList = messagesByTemplate.priority;
      else
        msgList = messagesByTemplate.needsBoost;
    } else if (allComplete) {
      msgList = messagesByTemplate.challengeReady;
    }
  }

   if (debug) {console.log("set message list to " + JSON.stringify(msgList))};

  const msg = msgList && msgList.length
    ? msgList[Math.floor(Math.random() * msgList.length)].replace("{lesson}", lessonPlaceholder)
    : "Keep going—I'm here to guide you as you progress!";
if (typeof msg !== "string") {
  console.log("Coach function: msg is not a string!", msg);
}
  player.SetVar(displayVar, msg);
}

// Lists current priority focus areas during onboarding only.
function displayresults() {
  if (debug) {console.log("dispalyresults")};
  player.SetVar("skill_ass_q_count", 1);
  var ass_code = player.GetVar("current_assessment");
  const scored_data = l_data.map(item => {
    var varName = ass_code + item.code.slice(2) + "_sc";
    var score = player.GetVar(varName);
    if (typeof score !== "number") score = 0;
    return { ...item, score: score };
  });

  // Filter: only skills in the current assessment and score = 0
  const domain_skills = scored_data.filter(item => item.code.startsWith(ass_code));
  const all_zeros = domain_skills.every(item => item.score === 0);

  let displayString = "";

  if (all_zeros) {
    // Case: all scores are zero
    displayString = "You've assessed yourself at a foundational level so we will prioritize all the skills equally.";
  } else {
    // Case: display top 1-3 low skills, if any
    const needs_development = domain_skills
      .filter(item => item.score >= 1 && item.score <= 3)
      .sort((a, b) => a.score - b.score);
    if (needs_development.length > 0) {
      displayString = "Top skill areas to build:\n" +
        needs_development
          .slice(0, 3)
          .map(item => `${item.skill}`)
          .join('\n');
    } else {
      displayString = "You've assessed yourself at an expert level so the skills will be prioritized equally. You should be able to quickly check your expertise.";
    }
  }

  player.SetVar("prior_skills", displayString);
}


// used to display coaches and their rings in appropriate left to right order based on user progress.
function displaycoaching_progress(template){
  if (debug) {console.log("dispaly_coachingprogress" + template)};
const ob_pos = [583,840,1100];
const ov_pos = [458,842,1225];
var positions = [];
var etGroup,etRing,stGroup,stRing,impGroup,impRing;

switch (template) {
  case "onboarding":
  positions = ob_pos;
  etGroup = player.object('6GOcybBIo54');
  etRing = player.object('6WAwXPWcgLu');
  impGroup = player.object('6kTK4LXHKfk');
  impRing = player.object('6WXLXeYOLbl');
  stGroup = player.object('5oZ8jY1scCS');
  stRing = player.object('6jMHI0jQuZK');
    break;
  case "overview":
  positions = ov_pos;
  etGroup = player.object('5hSdYw2TV9F');
  etRing = player.object('5knReKJyuLF');
  impGroup = player.object('601IiGhuWVK');
  impRing = player.object('5zKYuNJf4mO');
  stGroup = player.object('5V3OXYlO9IH');
  stRing = player.object('5iIP4KefbB6');
  break;
  case "st":
    stRing = player.object('6JXefp8mhF3');
    break;
    case "im":
    impRing = player.object('6TddDLVxVwS');
    break;
    case "et":
    etRing = player.object('621UcBuEavF');
    break;
  default:
    // Code to execute if no case matches the expression
}
 

var st_score_raw = player.GetVar("st_score_percent");
var im_score_raw = player.GetVar("im_score_percent");
var et_score_raw = player.GetVar("et_score_percent");

if (template == "overview" || template == "onboarding" ) {
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
  case "overview":
  case "onboarding": 
    etRing.state="e"+et_tenth;
    impRing.state="i"+im_tenth;
    stRing.state="s"+st_tenth;
    break;
}  

}

// The date picker is an external .js library. 

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
    if (debug) {console.log("orderDomainCards" + domain)};
  const proficiencyLabels = {
    0: "No Experience",
    1: "Awareness",
    2: "Emergent",
    3: "Proficient",
    4: "Expert"
  };

  // Retrieve all lessons for the selected domain
  const domainLessons = l_data.filter(item => item.code.startsWith(domain));

  const lessons = domainLessons.map(item => {
    const code = item.code;
    const sc = player.GetVar(code + "_sc");
    const cur_score = player.GetVar(code + "_cur_score");
    const lessonTitle = item.lesson;
    const skill = item.skill;

    player.SetVar(code + "_lesson", lessonTitle);
    player.SetVar(code + "_skill", skill);

    // Set initial competency display
    player.SetVar(code + "_initial_comp", proficiencyLabels[sc] || "No Experience");

    // Set current competency display and status
    let cur_comp, status;
    if (cur_score === 0) {
      cur_comp = "Building";
      status = "Not Started";
    } else if (cur_score === 100) {
      cur_comp = "Building";
      status = "Accessed";
    } else if (cur_score >= 1 && cur_score <= 4) {
      cur_comp = proficiencyLabels[cur_score];
      status = "Completed";
    } else {
      cur_comp = "Not Accessed";
      status = "Not Started";
    }
    player.SetVar(code + "_cur_comp", cur_comp);
    player.SetVar(code + "_status", status);

    return {
      ...item,
      sc,
      cur_score,
      status,
      initial_score: sc,
      current_score: cur_score,
      lesson: lessonTitle,
      skill
    };
  });

  // Sort lessons to determine display order/priorities
  lessons.sort((a, b) => {
    // 1. Put incomplete first (not a proficiency status)
    const aComplete = ["Accessed", "Completed", "Not Started"].includes(a.status);
    const bComplete = ["Accessed", "Completed", "Not Started"].includes(b.status);
    if (!aComplete && bComplete) return -1;
    if (aComplete && !bComplete) return 1;

    // 2. Among incomplete, by initial_score, then skill
    if (!aComplete && !bComplete) {
      if (a.initial_score !== b.initial_score) return a.initial_score - b.initial_score;
      return a.skill.localeCompare(b.skill);
    }
    // 3. Among complete, those needing a boost (score < 4), order by current_score then skill
    const aNeedsBoost = (a.current_score < 4);
    const bNeedsBoost = (b.current_score < 4);
    if (aNeedsBoost && !bNeedsBoost) return -1;
    if (!aNeedsBoost && bNeedsBoost) return 1;
    if (aNeedsBoost && bNeedsBoost) {
      if (a.current_score !== b.current_score) return a.current_score - b.current_score;
      return a.skill.localeCompare(b.skill);
    }
    // 4. Otherwise, alphabetical
    return a.skill.localeCompare(b.skill);
  });

  // Move cards to their new Y positions if needed (Storyline specific)
  lessons.forEach((lesson, idx) => {
    if (lesson.objectID && yPositions[idx] !== undefined) {
      player.object(lesson.objectID).y = yPositions[idx];
    }
  });
}


// need to revisit this for final deployment structure.

function launchlesson(lesson){
  // in debug mode we use the l1 lesson all the time. and set teh test_return_lesson to whatever the lesson was so we can then have a debug option in teh message handler.
  if (debug) {
    test_return_lesson = lesson;
    lesson = testlesson;
    }
  let lesson_url = lesson+'/index.html'
  if (debug) {
  lesson_url = 'https://ktdesrosiers.github.io/project-x-SL/sltest/'+lesson+'/index.html';
  } 
const quizWindow = window.open(lesson_url, '_blank');
}

function updateDomainScore(domain) {
  if (debug) {console.log("updatedomainscore" + domain)};
  // Define variable name endings
  const initialSuffix = '_sc';
  const currentSuffix = '_cur_score';

  // Find all lessons for the specified domain (e.g., "im")
  const lessons = l_data.filter(item => item.code.startsWith(domain));

  let domainScore = 0;

  lessons.forEach(item => {
    const code = item.code;
    // Try to get the current score first
    let curScore = player.GetVar(code + currentSuffix);
    // Use initial score if current not set or zero
    if (typeof curScore !== 'number' || curScore === 0) {
      curScore = player.GetVar(code + initialSuffix);
    }
    // Coerce non-numeric or blank to 0
    if (typeof curScore !== 'number' || isNaN(curScore)) curScore = 0;
    domainScore += curScore;
  });

  // Set the sum to e.g. im_score (for domain = "im")
  player.SetVar(domain + '_score', domainScore);

  // Calculate percent based on max possible (number of lessons x 4)
  const maxPossible = lessons.length * 4;
  const percent = maxPossible > 0 ? ((domainScore / maxPossible) * 100).toFixed(2) : 0;

  player.SetVar(domain + '_score_percent', percent);
}

function coerceScoreToRange(score) {
  if (score <= 25) {
    return 1;
  } else if (score <= 50) {
    return 2;
  } else if (score <= 75) {
    return 3;
  } else {
    // Covers 76–100 (and any value above 75)
    return 4;
  }
}

// Listen for messages from the Rise project. Rise send messages from an embedded Mightly block (interactive HTML) that incldues a quiz with post message to rise and then rise includes a parent level message handler to pass the data to the window opener.
window.addEventListener('message', function(event) {
// in debug mode we can test lessons that have been deplyed to a server to make things quick. In normal mode the exported Rise file (HTML5) needs to be in the scorms package director structure at the root level with teh folder name matching the lesosn code.
  if (debug) {
    if (event.origin !== 'https://ktdesrosiers.github.io') {
      console.log('bad origin');
      return
    };
  }
  else {
    if (event.origin !== window.location.origin) {
      console.log('bad origin');
      return
    };
  }
    
    // Process the quiz result
    if (event.data && event.data.type === 'quizResult') {

      const score = Number(event.data.score);
        if (debug) {alert('Quiz completed! Score: ' + event.data.score + '%');}
      var lesson_holder = "";

      const coercedScore = coerceScoreToRange(Number(event.data.score));
      // in debug mode we use the lesson cdoe that was passed to the lauch function as a retrun value so we can map scores to a bunch of lessons and test things.
      if (debug) { 
        lesson_holder = test_return_lesson;
      } else {lesson_holder = event.data.lesson;}
      player.SetVar(lesson_holder + "_cur_score", coercedScore);

            // Call the new update function here!
      const domain = lesson_holder.slice(0,2);
      updateDomainScore(domain);

      // Now update the display with latest calculations
      displaycoaching_progress(domain)
      orderDomainCards(lesson_holder.slice(0,2));
      coach(domain,domain+"_coach_message","CH");
    }
}, false);