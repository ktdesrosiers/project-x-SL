/* This code is intended to run from a Articulate Storyline SCORM conformant learning object. The ultimate SCORM protocol is not important however, using xAPI would be optimal and allow for more nuanced learning analytics. specifci xAPI calls are not on the RM for this inital release so tracking will be limited tot he clients (ISMPP) deplyment environment. This js file is loaded as an external script when the learning object initiates and can either be distributed with the SCORM or xAPI package (more restrictive environments) or remain hosted (less restrictive environments). Embedding this file into the deployable package limits versioning and updates. Assume this hosted file is the most current unless the dev environment is pointing to a local file. A versioning method has not been implemented for the Storyline Development environment given it's not a robust environment that would make sourvce and versioning meaningful. That being said source control will be come an issue if there are several distributables released for mroe restrictive environments. */

/* Storyline creates HTML5 content that uses a proprietary run time player. Keep this in mind when reviewing some of the odd methods in the code below. The player limits true DOM manipulation and handles data persistence across multiple user sessions as part of the SCORM / xAPI interface. Keeping storyline variables up to date rather than session or cookie based data has limitations but allows for simple variable reinstatement. THe core content data is placed at the top of this file. THis could be stored as JSON or retried via an API in the future, again the constraint is that the client has a less restrictive enviornment. More restrictive environments would obviously require appropriate data sharing agreements, whitelisting etc.. if the application were to ever utilize fully dynamic content generation. */
// debug value switches the reletaive path of the storyline lesson so that we can test versus when its in a scorm package.

var testlesson = "im1";
var quizWindow = null;
var lastopened_lesson = null;
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
        ],
        // New states for challenge results on CL
        challengeZero: [
          "You attempted the challenge, but didn’t get anything right. Let's regroup and go again soon.",
          "We all start somewhere—even a strategist can miss every question the first time! Try the challenge again, and I’ll help you climb from here.",
          "No correct answers, but that means there’s nowhere to go but up. Let's analyze your answers and try again."
        ],
        challengeNeedsHighlight: [
          "Doing well, but a few lessons need your strategic attention. I’ve highlighted them for you—let’s work on those together.",
          "Some lessons stand out for a review. Focus there and you’ll see your strategy sharpen.",
          "You’re making good progress. The highlighted lessons are your best next steps."
        ],
        challengeLessThan100: [
          "Great progress—no major gaps. Keep putting theory into practice and you’ll master this soon.",
          "Solid showing! No key lessons flagged, but more practice will turn you into a top strategist.",
          "You’re on the right path—review, retry, and you’ll ace it."
        ],
        challengePerfect: [
          "Perfect score! You’re doing extremely well—let’s continue exploring together whenever you like.",
          "You’ve set the strategic standard! I’m excited to keep learning with you—challenge me to keep sharp.",
          "Excellent achievement—full marks! Now’s your chance to explore new skills."
        ]
      },
      CH: {
        neverAccessed: [
          "It’s just us here—time to focus on your strategic skills. This page is tailored to help you build a strong foundation, with lessons ordered to match your growth. As you work through them, I’ll be here to guide and adjust your path. I've provided your initial skill rating that I obtained from the onboarding assessment you went through. As you complete lessons I will be able to give you a more refined, current rating.",
          "Welcome to your strategy hub. Each lesson is chosen to help you see the bigger picture. I’ll be tracking your progress and offering insights as you go. I've provided your initial skill rating that I obtained from the onboarding assessment you went through. As you complete lessons I will be able to give you a more refined, current rating.",
          "We have the perfect opportunity to build your strategic mindset from the ground up. Let’s make each lesson count. I've provided your initial skill rating that I obtained from the onboarding assessment you went through. As you complete lessons I will be able to give you a more refined, current rating."
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
        ],
        // New states for challenge results on CH
        challengeZero: [
          "It was great that you took the challenge, but I have to tell you some bad news: none correct. Can you try again?",
          "First attempt didn’t land, but strategic minds always rise again. Ready for round two?",
          "No points this time—analyze, adapt, and let’s try the challenge again!"
        ],
        challengeNeedsHighlight: [
          "Nice attempt! I’ve highlighted lessons worth a deeper dive based on your results. Ready to tackle them and try again?",
          "Good work, strategist. Let’s review the highlighted lessons and build your mastery.",
          "Progress made, but a few lessons deserve another go. See your highlights and take the challenge again."
        ],
        challengeLessThan100: [
          "Great work! A few soft spots, but nothing major. Keep sharpening your skills and try again any time.",
          "You’re close—refine your approach and you’ll master this challenge soon.",
          "Impressive progress! Retake the challenge whenever you want to aim for perfection."
        ],
        challengePerfect: [
          "Perfect! You aced the strategic challenge. Shift your focus to new territory and keep growing.",
          "You’ve reached the summit! Take on new skills or mentor others while you maintain your edge.",
          "Excellent—flawless results! Let’s keep building your strategic power."
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
        ],
        challengeZero: [
          "You finished the challenge, but didn’t hit any answers. That's just a starting point—try one more time.",
          "No correct answers this time, but things will click with another attempt.",
          "Zero for now, but no worries. Let’s give it another go together."
        ],
        challengeNeedsHighlight: [
          "Not bad—some lessons flagged for another look. Practice will bring results!",
          "A few bumps in the road—focus on the highlighted lessons to improve.",
          "Some areas could use a second pass. Tackle the highlighted lessons, then retake the challenge!"
        ],
        challengeLessThan100: [
          "I like your progress—keep it up and retake the challenge to hone your approach!",
          "Good effort—no big gaps. Practice and persistence make perfect.",
          "Solid results. More attempts will build your confidence even further."
        ],
        challengePerfect: [
          "Impressive! You’ve set the standard. Keep exploring, I’ll be here every step.",
          "Perfect run! Take the momentum into other skills.",
          "Excellent—a flawless challenge. Help others, or stretch yourself with a new area."
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
        ],
        challengeZero: [
          "Tough break! No correct answers this time, but it’s just the start. Try again—I know you can do it.",
          "Zero this time, but persistence will win out. Give it another go, and let’s get those points up!",
          "No luck this round—take a breath and try the challenge again!"
        ],
        challengeNeedsHighlight: [
          "You did well—check out the lessons I’ve highlighted for a bit more work. Practice makes perfect!",
          "Good effort, but some lessons need another look. See the highlights and return to the challenge soon.",
          "I’ve flagged some lessons for you to focus on—let’s make the next attempt your best."
        ],
        challengeLessThan100: [
          "You’re on the right track—no lessons need extra attention, just a bit more polish next time.",
          "Just a small gap to close. Try again to reach the top!",
          "Very solid work! You’re closing in on perfection—keep it going."
        ],
        challengePerfect: [
          "Outstanding! 100% correct—you’re implementation royalty. Keep your momentum going in other areas.",
          "Perfect result! Take a moment to appreciate your hard work.",
          "Excellent—flawless execution. You can help others, or raise the bar higher for yourself!"
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
        ],
        challengeZero: [
          "Challenge was completed but zero correct. This is an invitation to try again. You can do it.",
          "Zero correct answers isn’t the end—just a step in the ethical journey. Try once more, and I’ll help you along.",
          "It happens—no correct responses. Take time to review and attempt the challenge again."
        ],
        challengeNeedsHighlight: [
          "Progress noted—let’s focus on highlighted lessons to strengthen your foundation.",
          "Highlighted lessons need additional focus—work there, and you’ll see improvement.",
          "You’re doing well, but some concepts need reinforcing. Check the highlights."
        ],
        challengeLessThan100: [
          "Solid progress overall—nothing flagged this time. Keep developing your expertise.",
          "You’re gaining ground—review, retry, and you’ll soon be at the top.",
          "Good progress—one or two points away from mastery!"
        ],
        challengePerfect: [
          "Excellent achievement—100% complete. Let’s push your ethical thinking even further as you see fit.",
          "You’ve done outstanding work—now keep asking tough questions!",
          "Perfect score—inspiring. Continue, and keep setting the bar high."
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
        ],
        challengeZero: [
          "Not every challenge goes well. Zero correct, but every attempt builds wisdom. Ready to try again with me?",
          "You gave it a try, but no correct answers yet. Persevere, and you'll soon see results.",
          "No points this round, but that’s where learning begins. Let’s try again and dig deeper."
        ],
        challengeNeedsHighlight: [
          "Some lessons are highlighted for further review—let’s focus there. You’re making progress, keep it up.",
          "A few areas need deeper exploration. Let’s commit time to the highlighted lessons.",
          "Consider the highlighted lessons for a stronger ethical core—another challenge run will show your growth."
        ],
        challengeLessThan100: [
          "Excellent showing. No lessons flagged for review—just a few details to polish. Come back and test your ethical mettle anytime.",
          "No major gaps—just a few things left to perfect. I’m always here to discuss and review.",
          "Great job overall—just a little more work to achieve a perfect result."
        ],
        challengePerfect: [
          "Flawless completion. Ethics are clearly your strong suit—keep challenging yourself as you progress in new ways.",
          "No mistakes—exemplary work! Seek new challenges to continue your growth.",
          "Couldn’t ask for better—your ethical guidance is top notch. Keep going strong."
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
   "objectID": "6ZCtsQibvDg",
   "hlObjectID": "62MFQaRQhV1"
 },
 {
   "code": "st2",
   "skill": "Data Analysis",
   "lesson": "Identifying Data for Publication",
   "objectID": "5YuEw96YjJL",
   "hlObjectID": "6TBUqyigcQn"
 },
 {
   "code": "st3",
   "skill": "Needs Assessment",
   "lesson": "Assessing Audience Information and Educational Needs",
   "objectID": "62KvqIVJbsP",
   "hlObjectID": "6XlnEoQox0w"
 },
 {
   "code": "st4",
   "skill": "Scoping",
   "lesson": "Defining Publication Plan Scope",
   "objectID": "5xigDPxXlmr",
   "hlObjectID": "6b8353XYWXB"
 },
 {
   "code": "st5",
   "skill": "Committee Management",
   "lesson": "Managing Steering Committees",
   "objectID": "5cnEMoni6c9",
   "hlObjectID": "5pytQt5NdDx"
 },
 {
   "code": "st6",
   "skill": "Strategic Publishing",
   "lesson": "Applying to Scientific Communcations Platforms",
   "objectID": "5z97JS9ULpA",
   "hlObjectID": "6oM4kNHvVUC"
 },
 {
   "code": "st7",
   "skill": "Tactical Planning",
   "lesson": "Developing Tactical Publication Plans",
    "objectID": "5vxstZX3Vcg",
   "hlObjectID": "6bHcIqexPqj"
 },
 {
   "code": "st8",
   "skill": "Strategic Adaptation",
   "lesson": "Monitoring Evolving Trends in Publication Planning",
   "objectID": "5YqH7FqNrnV",
   "hlObjectID": "6OM1QCPwFEq"
 },
 {
   "code": "im1",
   "skill": "Outreach",
   "lesson": "Engaging Authors and Contributors for Publication",
   "objectID": "6msSQzigFAI",
   "hlObjectID": "67UxtxkRAHx"
 },
 {
   "code": "im2",
   "skill": "Workflow Processing",
   "lesson": "Effective Writing, Review, and Approval Processes",
   "objectID": "67lzdajo3SJ",
   "hlObjectID": "5t6pgvRp08r"
 },
 {
   "code": "im3",
   "skill": "Publication Administration",
   "lesson": "Managing Administrative Aspects of Publication Plans",
   "objectID": "5ZYCqbWNfyh",
    "hlObjectID": "6ItlCHSfLcJ"
 },
 {
   "code": "im4",
   "skill": "Analytics",
   "lesson": "Tracking Metrics of Publications and Overall Plans",
   "objectID": "6DOi669q06K",
   "hlObjectID": "6hgTx1vy3kr"
 },
 {
   "code": "im5",
   "skill": "Implementation Adaptation",
   "lesson": "Monitoring Evolving Trends in Implementation",
   "objectID": "6RcQeijJmmu",
   "hlObjectID": "6jD9d0qTgK7"
 },
 {
   "code": "et1",
   "skill": "Compliance",
   "lesson": "Maintaining Knowledge of Standards, Guidelines, and Position Statements",
   "objectID": "6jex6g1PTmX",
   "hlObjectID": "6QlCWA6S2ue"
 },
 {
   "code": "et2",
   "skill": "Standards Application",
   "lesson": "Applying Standards of Ethical Conduct ",
    "objectID": "6iaVmSo8VbE",
   "hlObjectID": "5uOOKdCanL1"
 },
 {
   "code": "et3",
   "skill": "Disclosure Processing",
   "lesson": "Ensuring Proper Disclosures",
    "objectID": "6KBnjuS2HZy",
   "hlObjectID": "6DR9aOFiE7X"
 },
 {
   "code": "et4",
   "skill": "Recognition",
   "lesson": "Acknowledging Contributors",
"objectID": "5ZRhA48No0K",
   "hlObjectID": "6981QdvLoeo"
 },
 {
   "code": "et5",
   "skill": "Adaptive Ethics",
   "lesson": "Monitoring Ethical Trends",
    "objectID": "5VpotCFBsI8",
   "hlObjectID": "6ppaePGoRWd"
 }
];

// This object is set up to allow for a flexible number of questions per domain but is tied to the number of skills in a domain so it needs to match. If a skill is removed from the learning experience it will need to be removed from this assessment as well as the l_data above to make sure that domain totals, scoring, prioritization of lessons and coach prompts are aligned.
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

// this object is set up to allow for a flexible number of skills per domain but at least one question per skill. If a skill area is removed form the _data table the assocaited questiosn need to be removed here. THe challenge assessment randomizes and draws from a pool but uses at least 1 question for each skill.

const challenge_content = {
  st: {
    // Market Research (Maia - Strategy)
    "st1_1": {
      "stem": "Maia here! What's the *least* reliable market research technique? Be honest, we all have that one friend who guesses.",
      "dist_1": "Ask your neighbor’s cat.",
      "dist_2": "Review professional publications.",
      "dist_3": "Conduct structured interviews.",
      "dist_4": "Launch an internet search.",
      "dist_5": "Consult field experts.",
      "correct": [1]
    },
    "st1_2": {
      "stem": "What market research tactic would I, Maia, use only if I lost a bet?",
      "dist_1": "Stakeholder interviews.",
      "dist_2": "Ignore all data.",
      "dist_3": "Literature review.",
      "dist_4": "Focus groups.",
      "dist_5": "Send surveys.",
      "correct": [2]
    },
    "st1_3": {
      "stem": "Which research method belongs on a reality show instead of a boardroom?",
      "dist_1": "Poll people at a fashion show.",
      "dist_2": "Analyze competitor data.",
      "dist_3": "Ask your hairdresser for medical insights.",
      "dist_4": "Synthesize clinical trial results.",
      "dist_5": "Organize expert panels.",
      "correct": [1,3]
    },

    // Data Analysis (Maia - Strategy)
    "st2_1": {
      "stem": "When analyzing clinical data, what makes Maia roll her eyes the hardest?",
      "dist_1": "Base everything on a single YouTube comment.",
      "dist_2": "Analyze efficacy and safety endpoints.",
      "dist_3": "Include primary and secondary endpoints.",
      "dist_4": "Prioritize testimonials over data.",
      "dist_5": "Trust results from an online quiz.",
      "correct": [1,4,5]
    },
    "st2_2": {
      "stem": "Maia says, 'If your data analysis includes THIS, I’m calling the scriptwriters.' What is it?",
      "dist_1": "Ignore outliers because they're 'weird.'",
      "dist_2": "Ensure data accuracy.",
      "dist_3": "Consider relevance.",
      "dist_4": "Transparent reporting.",
      "dist_5": "Comprehensive review.",
      "correct": [1]
    },
    "st2_3": {
      "stem": "Maia challenges: Which combo helps ensure proper data analysis?",
      "dist_1": "Accuracy.",
      "dist_2": "Guesswork.",
      "dist_3": "Transparency.",
      "dist_4": "Cookie-cutter answers.",
      "dist_5": "Comprehensive review.",
      "correct": [1,3,5]
    },

    // Needs Assessment (Maia - Strategy)
    "st3_1": {
      "stem": "Best way to understand your audience’s needs, according to Maia (hint: not tarot cards)?",
      "dist_1": "Guess based on trending hashtags.",
      "dist_2": "Surveys and focus groups.",
      "dist_3": "Read tea leaves.",
      "dist_4": "Check patient feedback.",
      "dist_5": "Informal interviews.",
      "correct": [2,4,5]
    },
    "st3_2": {
      "stem": "Which approach would Maia never recommend for needs assessment?",
      "dist_1": "Ignore stakeholders.",
      "dist_2": "Conduct interviews.",
      "dist_3": "Distribute surveys.",
      "dist_4": "Host focus groups.",
      "dist_5": "Review publications.",
      "correct": [1]
    },
    "st3_3": {
      "stem": "A surefire way to misread an audience (Maia’s pet peeve):",
      "dist_1": "Use only last year’s tactics.",
      "dist_2": "Gather new input from the audience.",
      "dist_3": "Guess and go with gut feeling.",
      "dist_4": "Ignore feedback loops.",
      "dist_5": "Collect comprehensive needs data.",
      "correct": [1,3,4]
    },

    // Scoping (Maia - Strategy)
    "st4_1": {
      "stem": "Maia’s #1 rule for defining project scope?",
      "dist_1": "Align with audience needs.",
      "dist_2": "Choose the shortest path.",
      "dist_3": "Base it on lunar phases.",
      "dist_4": "Report only minimal data.",
      "dist_5": "Copy competitor scope.",
      "correct": [1]
    },
    "st4_2": {
      "stem": "Which scoping mistake lands you on Maia's 'Must Try Harder' list?",
      "dist_1": "Ignore guidelines as they’re 'optional.'",
      "dist_2": "Consider strategic objectives.",
      "dist_3": "Account for regulatory requirements.",
      "dist_4": "Address clinical relevance.",
      "dist_5": "Include audience needs.",
      "correct": [1]
    },
    "st4_3": {
      "stem": "Essentials Maia always includes in thorough scoping:",
      "dist_1": "Audience needs.",
      "dist_2": "Strategic objectives.",
      "dist_3": "Favorite snack food.",
      "dist_4": "Regulatory requirements.",
      "dist_5": "Random Twitter polls.",
      "correct": [1,2,4]
    }
  },

  im: {
    // Outreach (Pat - Implementation)
    "im1_1": {
      "stem": "Pat here! Which author outreach approach is least likely to succeed (even with jazz hands)?",
      "dist_1": "Personalized emails with context.",
      "dist_2": "Smoke signals.",
      "dist_3": "A well-timed phone call.",
      "dist_4": "Inviting to a brainstorm lunch.",
      "dist_5": "Post-it note on the breakroom fridge.",
      "correct": [2,5]
    },
    "im1_2": {
      "stem": "Pat asks: which silly method won’t help you recruit contributors?",
      "dist_1": "Milk-carton announcement.",
      "dist_2": "Tailored feedback for expertise.",
      "dist_3": "Busking outside conferences.",
      "dist_4": "Inviting to an elite workshop.",
      "dist_5": "Random assignment.",
      "correct": [1,3,5]
    },
    "im1_3": {
      "stem": "Pat wonders: If you accidentally assign authorship to your pet goldfish, what might go wrong?",
      "dist_1": "Your goldfish forgets to disclose conflicts.",
      "dist_2": "Authors claim the manuscript is 'too wet.'",
      "dist_3": "Someone never checks their inbox.",
      "dist_4": "No one volunteers.",
      "dist_5": "An author uses jazz puns in response.",
      "correct": [1,2,3]
    },

    // Workflow Processing (Pat - Implementation)
    "im2_1": {
      "stem": "Pat: What’s missing from a smooth workflow process?",
      "dist_1": "Clear steps for review.",
      "dist_2": "A time machine.",
      "dist_3": "Transparent feedback.",
      "dist_4": "Automated reminders.",
      "dist_5": "Strategy sessions.",
      "correct": [2]
    },
    "im2_2": {
      "stem": "Pat says, 'If you want chaos, include THIS in workflow!'",
      "dist_1": "Complete disregard for version control.",
      "dist_2": "Shared checklists.",
      "dist_3": "Clearly defined timelines.",
      "dist_4": "Surprise karaoke sessions.",
      "dist_5": "Forget to update the status board.",
      "correct": [1,4,5]
    },
    "im2_3": {
      "stem": "For efficient processing, Pat steers clear of:",
      "dist_1": "Randomly assigning deadlines.",
      "dist_2": "Tracking manuscript progress.",
      "dist_3": "Regular team huddles.",
      "dist_4": "Post-it notes only system.",
      "dist_5": "Cloud-based platforms.",
      "correct": [1,4]
    },

    // Publication Administration (Pat - Implementation)
    "im3_1": {
      "stem": "Pat: In admin work, what’s an unlikely best practice?",
      "dist_1": "Documenting every step.",
      "dist_2": "Trusting your memory alone.",
      "dist_3": "Setting calendar reminders.",
      "dist_4": "Daily inbox cleanups.",
      "dist_5": "Using a Journal as a pillow.",
      "correct": [2,5]
    },
    "im3_2": {
      "stem": "You want admin mayhem? Pat says do this:",
      "dist_1": "Lose track of submission deadlines.",
      "dist_2": "Misplace manuscript files regularly.",
      "dist_3": "Color-code all files by the mood of the day.",
      "dist_4": "Share a single USB stick for all backups.",
      "dist_5": "Reserve meeting rooms for imaginary friends.",
      "correct": [1,2,3,4,5]
    },
    "im3_3": {
      "stem": "Pat: What would get a laugh (and maybe a warning) in a real admin meeting?",
      "dist_1": "Submit all documents in Comic Sans.",
      "dist_2": "Name files things like 'final_final_FINAL.docx'.",
      "dist_3": "Keep everything organized from day one.",
      "dist_4": "Deliver coffee in a boardroom.",
      "dist_5": "Choreographing workflows as a dance.",
      "correct": [1,2,5]
    }
  },

  et: {
    // Compliance (Thomas - Ethics)
    "et1_1": {
      "stem": "Thomas here. What is *absolutely* not a compliance best practice?",
      "dist_1": "Delegate responsibility to your goldfish.",
      "dist_2": "Review current guidelines.",
      "dist_3": "Ignore updates until the audit.",
      "dist_4": "Craft policies with invisible ink.",
      "dist_5": "Ask the office turtle for legal advice.",
      "correct": [1,3,4,5]
    },
    "et1_2": {
      "stem": "Thomas: What tells you someone might not respect a compliance audit?",
      "dist_1": "Double-checking confidential files.",
      "dist_2": "Ad-libbing your disclosures.",
      "dist_3": "Completing the required compliance training.",
      "dist_4": "Only following the rules on Tuesdays.",
      "dist_5": "Shredding documents marked 'very confidential.'",
      "correct": [2,4,5]
    },
    "et1_3": {
      "stem": "Thomas: What *sacrilege* do people still commit in compliance?",
      "dist_1": "Leaving passwords on sticky notes.",
      "dist_2": "Encrypting even their pizza order.",
      "dist_3": "Using password123 for everything.",
      "dist_4": "Forgetting to log out before lunch.",
      "dist_5": "Respond to audits using limericks.",
      "correct": [1,3,4,5]
    },

    // Standards Application (Thomas - Ethics)
    "et2_1": {
      "stem": "Thomas asks: Which standard should NOT be applied in ethical publishing?",
      "dist_1": "Transfer ownership via rock-paper-scissors.",
      "dist_2": "Cite all sources correctly.",
      "dist_3": "Ensure disclosures are complete.",
      "dist_4": "Allow kangaroo court reviews.",
      "dist_5": "Uphold authorship criteria.",
      "correct": [1,4]
    },
    "et2_2": {
      "stem": "Thomas: Select the most dubious approach to standards:",
      "dist_1": "Ignore all conflicts of interest.",
      "dist_2": "Ask for legal advice from the office potted plant.",
      "dist_3": "Apply consistent citation formats.",
      "dist_4": "Welcome feedback from journal editors.",
      "dist_5": "Use invisible ink for conflict statements.",
      "correct": [1,2,5]
    },
    "et2_3": {
      "stem": "Spot Thomas’s favorite 'bad example' in ethical standards:",
      "dist_1": "Conduct a peer review in interpretive dance.",
      "dist_2": "Provide detailed, honest attributions.",
      "dist_3": "Keep standards documentation in a locked drawer labeled 'secret.'",
      "dist_4": "Ignore updates to policies.",
      "dist_5": "Hold training at karaoke night.",
      "correct": [1,3,4,5]
    },

    // Disclosure Processing (Thomas - Ethics)
    "et3_1": {
      "stem": "Thomas: What’s the *weirdest* way to disclose conflicts?",
      "dist_1": "Confess only during full moons.",
      "dist_2": "Provide complete written disclosures.",
      "dist_3": "Whisper conflicts to the office plant.",
      "dist_4": "List them in limerick form.",
      "dist_5": "Rely on psychic readings.",
      "correct": [1,3,4,5]
    },
    "et3_2": {
      "stem": "Select the appropriate disclosure action (and avoid comedy gold):",
      "dist_1": "Disclose all relevant relationships.",
      "dist_2": "Hide conflicts under 'miscellaneous.'",
      "dist_3": "Update disclosures every leap year.",
      "dist_4": "Double-check all declarations.",
      "dist_5": "Forget disclosures entirely.",
      "correct": [2,3,5]
    },
    "et3_3": {
      "stem": "Thomas: What’s a sign your disclosure process may need... improvement?",
      "dist_1": "Disclosures are written in emoji.",
      "dist_2": "They are reviewed annually.",
      "dist_3": "No one knows where to find the form.",
      "dist_4": "Policy says 'Do your best.'",
      "dist_5": "You outsource disclosures to the company dog.",
      "correct": [1,3,4,5]
    }
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

// Runs during the inital assessment to populate the questions and choices from the assessment content object. A seperate function (handlechoice) acts as a traditional onclick event handler for the same quiz (albeit in the SL world).

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

// we let people restart the skill assessment since they are short and storybased so we need to make srue to clean up interim progress. This could potentialky be used as part of a global reset.
function reset_skill_ass(){
 player.SetVar("skill_ass_q_total", 0);
 player.SetVar("skill_ass_q_count", 1);
player.SetVar("ass_stem", "");
player.SetVar("cur_ass_task", "");
var ass_code = player.GetVar("current_assessment");
player.SetVar(ass_code + "_score_percent", 0);
player.SetVar(ass_code + "_score", 0);
}



function loadchallquest() {
  var domain = player.GetVar("cur_coach");
  var asked = player.GetVar("chall_questions_asked");
  var askedArr = asked ? asked.split('|').filter(Boolean) : [];
  var allQuestions = Object.entries(challenge_content[domain]);
  var taskGroups = {};
  // Group questions by task code
  allQuestions.forEach(([key, q]) => {
    var match = key.match(/^[a-z]+\d+/);
    var task = match ? match[0] : null;
    if (task) {
      if (!taskGroups[task]) taskGroups[task] = [];
      taskGroups[task].push([key, q]);
    }
  });
  // Find candidate questions per skill (max 2)
  var candidates = [];
  Object.keys(taskGroups).forEach(task => {
    var askedHere = askedArr.filter(code => code.startsWith(task)).length;
    if (askedHere < 2) {
      taskGroups[task].forEach(([key, q]) => {
        if (!askedArr.includes(key)) candidates.push([key, q, task]);
      });
    }
  });
  if (candidates.length === 0) {
    // End of challenge, nothing to serve
    return;
  }
  // Pick a question at random
  var idx = Math.floor(Math.random() * candidates.length);
  var [qCode, qObj, taskCode] = candidates[idx];

  // Prepare choices and their correctness
  var choices = [qObj.dist_1, qObj.dist_2, qObj.dist_3, qObj.dist_4, qObj.dist_5];
  var corrects = qObj.correct.map(function(c) { return c - 1; }); // zero-based
  var indices = [0, 1, 2, 3, 4];
  // Shuffle indices
  for (let i = indices.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  // Prepare display choices and correctness
  var displayChoices = [];
  var choiceCorrectVals = [];
  for (let i = 0; i < 5; i++) {
    var origIdx = indices[i];
    var isCorrect = corrects.includes(origIdx);
    var txt = choices[origIdx];
    if (debug) {
      if (isCorrect) txt += " X";
    }
    displayChoices.push(txt);
    choiceCorrectVals.push(isCorrect);
  }
  // Compose stem with instruction, question code for debug
  var stemInstr = qObj.correct.length > 1 ? "<i>Select all that apply</i>" : "<i>Select one best answer</i>";
  var fullStem = qObj.stem + "\n" + stemInstr;
  if (debug) {
    fullStem += " [" + qCode + "]";
  }
  // Convert newlines for Storyline
  var stemForDisplay = replaceNewlines(fullStem);
  player.SetVar("chall_stem", stemForDisplay);
  for (let i = 0; i < 5; i++) {
    player.SetVar("chall_ch_" + (i + 1), displayChoices[i]);
    player.SetVar("chall_ch" + (i + 1) + "_val", choiceCorrectVals[i]);
  }
  player.SetVar("chall_current_qcode", qCode);
  // Update asked list and progress
  askedArr.push(qCode);
  player.SetVar("chall_questions_asked", askedArr.join('|'));
  player.SetVar("chall_q_count", askedArr.length);
  // Figure out total (cap at 2 per skill/task)
  var totalQ = 0;
  Object.keys(taskGroups).forEach(function(task) {
    totalQ += Math.min(2, taskGroups[task].length);
  });
  player.SetVar("chall_q_total", totalQ);
}


function submitchallanswer() {

  var domain = player.GetVar("cur_coach");
  var qCode = player.GetVar("chall_current_qcode");
  if (!qCode) return;
  var qObj = challenge_content[domain][qCode];

// Get user choices: assume boolean vars chall_ans_1 ... chall_ans_5 (set by Storyline on submit)
  var userSelections = [
    !!player.GetVar("chall_ans_1"),
    !!player.GetVar("chall_ans_2"),
    !!player.GetVar("chall_ans_3"),
    !!player.GetVar("chall_ans_4"),
    !!player.GetVar("chall_ans_5")
  ];
  // Map to correct answers: chall_ch1_val...chall_ch5_val are booleans for each
  var correctArr = [
    !!player.GetVar("chall_ch1_val"),
    !!player.GetVar("chall_ch2_val"),
    !!player.GetVar("chall_ch3_val"),
    !!player.GetVar("chall_ch4_val"),
    !!player.GetVar("chall_ch5_val")
  ];
  var isAllCorrect = true;
  for (var i = 0; i < 5; i++) {
    if (userSelections[i] !== correctArr[i]) isAllCorrect = false;
  }

  // For lesson highlight logic:
  var skillCode = qCode.match(/^[a-z]+\d+/)[0]; // e.g., 'st3'
  // Retrieve or initialize per-skill tracking
  var incorrectBySkill = player.GetVar(domain+"_chall_incorrect_by_skill"); // ideally, a JSON string or pipe-delimited
  var obj = incorrectBySkill ? JSON.parse(incorrectBySkill) : {};
  obj[skillCode] = (obj[skillCode] || 0) + (!isAllCorrect ? 1 : 0);
  if(debug) {console.log(JSON.stringify(obj))}
  player.SetVar(domain+"_chall_incorrect_by_skill", JSON.stringify(obj));

  // Only if both questions in skill are missed, update highlight string
  if (obj[skillCode] === 2) {
    let l_data_entry = l_data.find(el => el.code === skillCode);
    if (l_data_entry) {
      var currHighlight = player.GetVar(domain+"_chall_less_hls") || "";
      var highlightArr = currHighlight.split('|').filter(Boolean);
      if (!highlightArr.includes(l_data_entry.objectID)) {
        highlightArr.push(l_data_entry.hlObjectID); 
        player.SetVar(domain+"_chall_less_hls", highlightArr.join('|'));
      }
    }
  }

  var scoreVar = domain + "_challenge_score";
  var total = player.GetVar("chall_q_total") || 1;
  var prevScore = player.GetVar(scoreVar) || 0;
  // we use the number 999 to singify an attempt at the challegne has never been made for messaging purposes. Once the first questio is answered ina  domain we now start providing a score.
  if (prevScore == 999) {prevScore = 0}
  var points = (100 / total);
  if (isAllCorrect) {
    prevScore += points;
    player.SetVar(scoreVar, prevScore);
  }
}

function resetChallenge(type) {
  var domain = player.GetVar("cur_coach");
  // Core variables to wipe out
  player.SetVar("chall_questions_asked", "");
  player.SetVar("chall_q_count", 1);
  player.SetVar("chall_current_qcode", "");
  player.SetVar("chall_incorrect_qcodes", "");
  // Wipe per-choice variables
  for (var i = 1; i <= 5; i++) {
    player.SetVar("chall_ch_" + i, "");
    player.SetVar("chall_ch" + i + "_val", false);
    player.SetVar("chall_ans_" + i, false);
  }
  player.SetVar("chall_stem", "");

if (type === "retake") {
player.SetVar(domain+"_challenge_score", 0);
player.SetVar(domain+"_chall_less_hls", "");
}

}
// this lets us abstract the coaching messages and set up for randomization. A larger object of messages can be generated by AI as we build this out.
function getCoachMessage(domain, type, lesson) {
  const coach = coachPhrases[domain];
  const phrases = coach.messages[type];
  // Pick a random phrase for variety
  const phrase = phrases[Math.floor(Math.random() * phrases.length)];
  return phrase.replace("{lesson}", lesson);
}

/* display the current top priority or alternate message where needed. The routine will grow but for now we are setting it up for the future.
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
const neverAccessed = lessons.every(s => s.status === "Not Started");
const oneAccessed = lessons.filter(s => s.status === "Completed").length === 1;
const allComplete = lessons.every(s => s.status === "Completed");
const needsBoost = allComplete && lessons.some(s => s.cur_score < 3);
const inProgress = lessons.some(s => s.status === "Accessed" || s.status === "Not Started");
const challengeReady = lessons.every(s => s.status === "Completed" && s.cur_score > 2);

   if (debug) {console.log("set state mess to " + neverAccessed + " " + oneAccessed + " " + allComplete + " " + needsBoost)};

  let msgList = [];
  if (template === "CH"){
    if (neverAccessed) {
        msgList = messagesByTemplate.neverAccessed;
    } else if (oneAccessed) {
        msgList = messagesByTemplate.oneAccessed;
    } else if (needsBoost) {
        msgList = messagesByTemplate.needsBoost;
    } else if (challengeReady) {
        msgList = messagesByTemplate.challengeReady;
    } else if (inProgress) {
        msgList = messagesByTemplate.inProgress;
    } else {
        msgList = messagesByTemplate.inProgress; // fallback to inProgress
    }
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

*/

function coach(domain, displayVar, template) {
  if (debug) {console.log("coach " + domain + " " + displayVar + " " + template);}
  const coachData = coachPhrases[domain];
  const messagesByTemplate = coachData.messages[template];
  const player = GetPlayer();

  // Support domain-specific lesson highlights and scores
  const scoreVar = domain + "_challenge_score";
  const highlightVar = domain + "_chall_less_hls";
  const score = player.GetVar(scoreVar);
  const highlights = (player.GetVar(highlightVar) || "").split('|').filter(Boolean);

  // Lessons data
  const domainLessons = l_data.filter(item => item.code.startsWith(domain));
  const lessons = domainLessons.map(item => ({
    ...item,
    cur_score: player.GetVar(item.code + "_cur_score"),
    status: player.GetVar(item.code + "_status"),
    lesson: item.lesson,
    skill: item.skill
  }));

  if (debug) {console.log("set lessons to " + JSON.stringify(lessons));}

  // Sorting rules as before
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

  // Top lesson/skill for interpolation
  const topLesson = lessons[0];
  const lessonPlaceholder = (template === "CH" && topLesson) ? topLesson.lesson : (topLesson ? topLesson.skill : "the next lesson");

  // Determine overall progress state for messaging selection
  const neverAccessed = lessons.every(s => s.status === "Not Started");
  const oneAccessed = lessons.filter(s => s.status === "Completed").length === 1;
  const allComplete = lessons.every(s => s.status === "Completed");
  const needsBoost = allComplete && lessons.some(s => s.cur_score < 3);
  const inProgress = lessons.some(s => s.status === "Accessed" || s.status === "Not Started");
  const challengeReady = lessons.every(s => s.status === "Completed" && s.cur_score > 2);

  if (debug) {console.log("set state mess to " + neverAccessed + " " + oneAccessed + " " + allComplete + " " + needsBoost);}

  // NEW: Incorporate challenge-specific states if score is set
  let state;
  if (template === "CH" || template === "CL") {
    if (template === "CH" ? (score === 999 || typeof score === "undefined" || score === null) : false) {
      state = "neverAccessed";
    } else if (score === 0) {
      state = "challengeZero";
    } else if (score < 100 && highlights.length > 0) {
      state = "challengeNeedsHighlight";
    } else if (score < 100) {
      state = "challengeLessThan100";
    } else if (score === 100) {
      state = "challengePerfect";
    }
  }
  // Fallback to lesson progress logic for other templates or no challenge taken
  if (!state) {
    if (neverAccessed) {
      state = "neverAccessed";
    } else if (oneAccessed) {
      state = "oneAccessed";
    } else if (needsBoost) {
      state = "needsBoost";
    } else if (challengeReady) {
      state = "challengeReady";
      player.SetVar(domain+"_chall_enabled", true); // Set a flag for challenge readiness
    } else if (inProgress) {
      state = "inProgress";
    } else {
      state = "inProgress";
    }
  }

  // Lookup and randomly pick from message list for this state
  let msgList = messagesByTemplate[state] || messagesByTemplate.inProgress;
  if (debug) {console.log("set message list to " + JSON.stringify(msgList));}
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
var etGroup,etRing,etButt,stGroup,stRing,stButt,impGroup,impRing,impButt;


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
  impButt = player.object('5igE52k8POM');
  etButt = player.object('5d1FCOPZSI7');
  stButt = player.object('6pMcnfM2LuX');
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
const init_order = [[st_score_raw,stGroup,stButt],[im_score_raw,impGroup,impButt],[et_score_raw,etGroup,etButt]].filter(pair => pair[1] && pair[2]); // Remove undefineds in case objects do not exist
init_order.sort((a, b) => a[0] - b[0]);
const adjustedorder = init_order.map(pair => pair[1]);
const buttsequence = init_order.map(pair => pair[2]);
  positions.forEach((position, index) => {
    if (adjustedorder[index]) adjustedorder[index].x = position;
    if (template == "overview" && index == 0 && buttsequence[index]) {
      buttsequence[index].state = "Normal";
    }
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
    } else if (cur_score === 999) {
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
    const aNeedsBoost = (a.current_score < 3);
    const bNeedsBoost = (b.current_score < 3);
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

// highlight any lessons that need remediation after challegne.
var highlightString = player.GetVar(domain+"_chall_less_hls");
var highlights = highlightString ? highlightString.split('|').filter(Boolean) : [];
if (highlights.length > 0) {
  highlights.forEach(function(id) {
  player.object(id).state = "hl";
});
} 

}
// Checks the window, replaces and/or luanch ne lesson with wanrings if window arelady open or refocus. Checks highlights and removes if lesosn successufully opened.

function launchlesson(code) {
  const origCode = code;
  // Find the lesson data object and retrieve hlObjectID
  const lessonData = l_data.find(item => item.code === code);
  if (!lessonData) return;
  const hlObjectID = lessonData.hlObjectID;

  // Determine domain prefix ("st", "im", "et")
  const domain = code.slice(0, 2);
  const hlVarName = domain + '_chall_less_hls';
  let highlightString = player.GetVar(hlVarName) || '';
  let highlights = highlightString.split('|').filter(Boolean);

  // in debug mode we use the l1 lesson all the time. and set teh test_return_lesson to whatever the lesson was so we can then have a debug option in teh message handler.
  if (debug) {
    test_return_lesson = code;
    code = testlesson;
    }
  let lesson_url = debug
    ? 'https://ktdesrosiers.github.io/project-x-SL/sltest/' + code + '/index.html'
    : code + '/index.html';

  // Function to clear highlight if needed
  function processHighlight() {
    if (highlights.includes(hlObjectID)) {
      player.object(hlObjectID).state = "Normal"; 
      // Remove from highlights list and update Storyline variable
      highlights = highlights.filter(id => id !== hlObjectID);
      player.SetVar(hlVarName, highlights.join('|'));
    }
  }

  // Manage single lesson window logic
  if (quizWindow && !quizWindow.closed && lastopened_lesson) {
    if (code === lastopened_lesson) {
      const goBack = window.confirm("This lesson is already open. Do you want to return to the lesson?");
      if (goBack) {
        quizWindow.focus();
        processHighlight(); // Highlight only if actually focusing/opening
      }
      return;
    } else {
      const replace = window.confirm("An existing lesson is already open. Do you want to replace it with this new lesson? You may lose progress in the currently open lesson.");
      if (replace) {
        quizWindow.close();
        quizWindow = window.open(lesson_url, '_blank');
        lastopened_lesson = origCode;
        // we set the status to accessed by setting a score of 999 so we can track that the lesson was opened.
        player.SetVar(origCode + "_cur_score",999);
        processHighlight(); // Process highlight for the new lesson actually opened
      }
      return;
    }
  }
  // No open window, so directly open and handle highlight
  quizWindow = window.open(lesson_url, '_blank');
  lastopened_lesson = origCode;
  player.SetVar(origCode + "_cur_score",999);
  processHighlight();
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
    //    if (debug) {alert('Quiz completed! Score: ' + event.data.score + '%');}
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