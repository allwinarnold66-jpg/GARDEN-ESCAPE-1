/**
 * QUESTION BANK — 200 total questions (50 per role).
 * 15 hand-written case-study / judgement questions per role
 * + 35 programmatically generated numerical-reasoning questions per role
 *   (numbers vary per question, answers are computed — not guessed —
 *    so correctness is always mathematically verifiable).
 *
 * The server NEVER sends `correctIndex` to clients. Only text+options go out.
 */

function buildOptions(correct, wrongs) {
  const seen = new Set([correct]);
  const finalWrongs = wrongs.map((w) => {
    let v = w;
    while (seen.has(v)) v = v + ' ';
    seen.add(v);
    return v;
  });
  const all = [correct, ...finalWrongs];
  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [all[i], all[j]] = [all[j], all[i]];
  }
  return { options: all, correctIndex: all.indexOf(correct) };
}

/* ---------------------------- HR (15 manual) ---------------------------- */
const HR_MANUAL = [
  { text: "A high-performing employee has started missing deadlines over the last two months. Her manager learns she is caring for a sick parent at home. As an HR professional, what is the MOST appropriate first step?", options: ["Immediately issue a formal warning", "Discuss flexible work arrangements and support resources with her", "Reduce her workload without discussion", "Reassign her to a different team"], correctIndex: 1 },
  { text: "During exit interviews, five of the last seven departing employees cited 'lack of career growth' as their primary reason for leaving. What should HR prioritize?", options: ["Increase the marketing budget", "Launch a structured internal career development and promotion framework", "Ignore it since turnover is inevitable", "Only raise salaries"], correctIndex: 1 },
  { text: "A manager wants to hire a personal friend who is less qualified than another applicant. What should HR recommend?", options: ["Approve the friend to keep the manager happy", "Follow the standard merit-based selection process and choose the better-qualified candidate", "Hire both candidates", "Let the manager decide without review"], correctIndex: 1 },
  { text: "An employee survey reveals that 70% of employees feel their workload is unmanageable, but productivity metrics remain high. What is the BEST interpretation?", options: ["There is no problem since output is high", "High output may be masking a burnout risk that could cause future attrition", "Employees are lying on the survey", "Workload should be increased further"], correctIndex: 1 },
  { text: "Two employees in the same role with similar experience have a 15% pay gap with no clear justification. What should HR do?", options: ["Ignore it since it isn't illegal", "Conduct a pay equity audit and correct unjustified disparities", "Lower the higher salary immediately", "Wait for a complaint before acting"], correctIndex: 1 },
  { text: "A new onboarding program reduced 90-day attrition from 18% to 6%. Which metric best demonstrates the program's ROI?", options: ["Number of onboarding slides created", "Reduced cost of re-hiring and retraining due to lower early attrition", "Number of HR staff involved", "Length of the onboarding manual"], correctIndex: 1 },
  { text: "An employee has filed a harassment complaint against their direct manager. What is the correct HR procedure?", options: ["Have the manager investigate it personally", "Conduct an independent, confidential investigation following company policy", "Dismiss the complaint without review", "Immediately terminate the manager without investigation"], correctIndex: 1 },
  { text: "A department has a 95% engagement score but a 30% annual turnover rate. What does this combination most likely indicate?", options: ["Engagement surveys are inaccurate measures", "External factors (e.g., higher pay elsewhere) may be driving turnover despite satisfaction", "Employees are lying on surveys", "Turnover is not a concern"], correctIndex: 1 },
  { text: "A company wants to reduce hiring bias. Which practice would be MOST effective?", options: ["Reviewing resumes with names and photos visible", "Using structured, standardized interview questions and blind resume screening", "Relying solely on gut feeling", "Hiring only internal referrals"], correctIndex: 1 },
  { text: "An employee has used only 2 of 12 sick days but has been absent without notice three times. What is the appropriate HR response?", options: ["Ignore it since sick days remain", "Address the unexcused absences directly through a documented conversation", "Terminate immediately", "Give a bonus"], correctIndex: 1 },
  { text: "A performance review system rates 95% of employees as 'exceeds expectations.' What problem does this most likely indicate?", options: ["The company has an exceptional workforce", "Rating inflation that reduces the system's usefulness for differentiation", "The system is perfectly accurate", "Everyone should get a raise"], correctIndex: 1 },
  { text: "An employee requests a religious accommodation to leave early on Fridays; the role has no strict time requirement. What should HR do?", options: ["Deny automatically", "Evaluate and reasonably accommodate the request if it doesn't cause undue hardship", "Ignore the request", "Terminate the employee"], correctIndex: 1 },
  { text: "A merger is combining two companies with different remote-work policies. What is the BEST first step for HR leadership?", options: ["Immediately enforce Company A's policy on everyone", "Assess both cultures and design a unified policy", "Let each team decide randomly", "Eliminate remote work entirely without analysis"], correctIndex: 1 },
  { text: "A manager wants to fast-track a promotion to stop an employee leaving for a competitor, but the employee hasn't met promotion criteria. What should HR advise?", options: ["Promote immediately regardless of criteria", "Explore interim solutions (retention bonus, growth plan) while maintaining fair promotion standards", "Let the employee leave", "Change promotion rules only for this case, secretly"], correctIndex: 1 },
  { text: "A company's employee Net Promoter Score (eNPS) dropped from +40 to -10 after a major reorganization. What should HR do first?", options: ["Ignore it since reorganizations are always disruptive", "Conduct focus groups/surveys to understand specific concerns driving the drop", "Reverse the reorganization immediately", "Dismiss employees who gave low scores"], correctIndex: 1 }
];

/* ------------------------- MARKETING (15 manual) ------------------------- */
const MKT_MANUAL = [
  { text: "Campaign A: 50,000 impressions at 2% engagement. Campaign B: 20,000 impressions at 6% engagement. Which had more total engagements, and what does this suggest about using impressions alone as a success metric?", options: ["Campaign A had more engagement; impressions are the best metric", "Campaign B had more total engagement; impressions alone can be misleading", "Both had equal engagement", "Engagement rate doesn't matter"], correctIndex: 1 },
  { text: "A brand's customer acquisition cost (CAC) is $50, and average customer lifetime value (LTV) is $45. What should the marketing team conclude?", options: ["The strategy is profitable and should scale immediately", "The strategy is currently losing money per customer and needs optimization before scaling", "CAC and LTV are unrelated", "Prices should be lowered immediately"], correctIndex: 1 },
  { text: "An email campaign has a 40% open rate but only a 0.5% click-through rate. What is the most likely issue?", options: ["The subject line is weak", "The email content/offer isn't compelling enough to drive action despite strong opens", "Too many emails were sent", "The email list is too small"], correctIndex: 1 },
  { text: "A company wants to enter a new market with 0% brand awareness. Which strategy is MOST appropriate first?", options: ["Launch aggressive discount pricing immediately", "Invest in brand awareness campaigns before heavy promotional pushes", "Skip marketing and rely on word of mouth", "Copy a competitor's ad verbatim"], correctIndex: 1 },
  { text: "A/B test: version A converts at 3.2%, version B at 3.4%, 10,000 visitors each. What should the team do?", options: ["Immediately declare B the winner and switch permanently", "Check statistical significance before concluding B is truly better", "Ignore the test entirely", "Average the two versions"], correctIndex: 1 },
  { text: "A product's NPS is +65, but sales have declined for two quarters. What is the most likely explanation?", options: ["NPS is irrelevant", "High satisfaction exists among current customers, but external factors (pricing, distribution, saturation) may be limiting sales", "The product should be discontinued", "NPS guarantees sales growth"], correctIndex: 1 },
  { text: "Broad campaign: 1,000,000 reach at 1% conversion. Niche campaign: 20,000 reach at 10% conversion. Which generates more total conversions?", options: ["Niche campaign, 2,000 conversions", "Broad campaign, 10,000 conversions", "Both equal", "Cannot be determined"], correctIndex: 1 },
  { text: "A startup with limited runway needs customers fast. Should it rely on SEO (slow, cheap long-term) or paid ads (fast, costlier) first?", options: ["SEO only", "Paid advertising for immediate results while building SEO long-term", "Neither", "Print advertising"], correctIndex: 1 },
  { text: "A survey shows 80% of customers discovered the brand via influencer marketing, yet only 5% of budget funds influencers. What should marketing reconsider?", options: ["Nothing needs to change", "Reallocating more budget toward the channel driving the most discovery", "Eliminating influencer marketing", "Increasing TV ad spend only"], correctIndex: 1 },
  { text: "A retailer's monthly churn is 5% (95% monthly retention). Approximately what percent of a cohort remains after 12 months?", options: ["~95%", "~75%", "~54%", "~25%"], correctIndex: 2 },
  { text: "A campaign promises 'limited time only' discounts but runs continuously for a year. What risk does this create?", options: ["No risk, it increases sales", "Erosion of customer trust and reduced urgency effectiveness in future campaigns", "Guaranteed increased brand loyalty", "Improved SEO rankings"], correctIndex: 1 },
  { text: "Which metric best measures how efficiently marketing spend converts into actual revenue?", options: ["Number of social media followers", "Return on Marketing Investment (ROMI)", "Number of ads published", "Website color scheme"], correctIndex: 1 },
  { text: "A B2B company's sales cycle is 6 months. Which measurement approach is most appropriate for judging campaign success?", options: ["Judge success within the first week", "Track marketing-qualified leads progressing through the full sales pipeline", "Judge based on impressions only", "Ignore conversions entirely"], correctIndex: 1 },
  { text: "Ad X: $2/click, 5% conversion to sale. Ad Y: $1/click, 2% conversion to sale. Which has a LOWER cost per sale?", options: ["Ad X ($40/sale)", "Ad Y ($50/sale)", "Both equal", "Cannot determine"], correctIndex: 0 },
  { text: "Research shows a growing customer segment values sustainability highly, but current packaging is entirely plastic. What should the marketing strategy consider?", options: ["Ignore the trend", "Explore sustainable packaging and messaging aligned with the segment's values", "Increase plastic use for cost savings", "Stop market research"], correctIndex: 1 }
];

/* --------------------------- FINANCE (15 manual) -------------------------- */
const FIN_MANUAL = [
  { text: "A company has current assets of $500,000 and current liabilities of $250,000. What is the current ratio, and what does it indicate?", options: ["0.5, indicating poor liquidity", "2.0, indicating it has twice the current assets needed to cover current liabilities", "2.0, indicating insolvency", "1.0, indicating balance"], correctIndex: 1 },
  { text: "A company's net income is $80,000 on revenue of $400,000. What is the net profit margin?", options: ["5%", "20%", "50%", "80%"], correctIndex: 1 },
  { text: "An investment of $10,000 grows to $12,100 in 2 years with annual compounding. What is the approximate annual interest rate?", options: ["5%", "10%", "21%", "15%"], correctIndex: 1 },
  { text: "A company has debt of $600,000 and equity of $400,000. What is its debt-to-equity ratio, and what does it suggest?", options: ["0.67, low leverage", "1.5, relatively high leverage / reliance on debt financing", "1.5, no debt", "1.0, balanced"], correctIndex: 1 },
  { text: "A project requires a $200,000 investment and returns $50,000/year for 5 years. What is the simple payback period?", options: ["2 years", "4 years", "5 years", "10 years"], correctIndex: 1 },
  { text: "Company A has a P/E of 10; Company B (same industry, similar growth) has a P/E of 30. What might this suggest?", options: ["Company B is definitely a better investment", "Company A may be undervalued relative to peers, or Company B overvalued — further analysis is needed", "P/E ratios are irrelevant", "Company A has higher earnings"], correctIndex: 1 },
  { text: "A firm's inventory turnover dropped from 8 to 3 in a year while sales stayed flat. What does this most likely indicate?", options: ["Inventory is selling faster", "Inventory is building up / moving more slowly, tying up cash", "The company is more efficient", "Nothing significant"], correctIndex: 1 },
  { text: "A bond has a face value of $1,000 and a 5% coupon rate, purchased at $950. What is the annual coupon payment?", options: ["$47.50", "$50", "$52.60", "$1,000"], correctIndex: 1 },
  { text: "A company's gross margin is 40% and operating expenses consume 25% of revenue. What is the operating margin?", options: ["15%", "25%", "40%", "65%"], correctIndex: 0 },
  { text: "Portfolio A: 8% expected return, high volatility. Portfolio B: 5% expected return, low volatility. For a risk-averse retiree needing stable income, which fits better?", options: ["Portfolio A", "Portfolio B", "Split 50/50 regardless of goals", "Neither"], correctIndex: 1 },
  { text: "A company reports positive net income but negative operating cash flow for three straight quarters. What should this raise concern about?", options: ["Nothing, profit is all that matters", "Possible earnings quality issues, slow receivables collection, or non-cash income affecting real liquidity", "The company is extremely healthy", "Taxes are too low"], correctIndex: 1 },
  { text: "A $50,000 loan has a 6% annual simple interest rate over 3 years. What is the total interest paid?", options: ["$3,000", "$9,000", "$6,000", "$15,000"], correctIndex: 1 },
  { text: "Which budgeting approach requires every expense to be justified from zero each period rather than based on the prior period's budget?", options: ["Incremental budgeting", "Zero-based budgeting", "Flexible budgeting", "Historical budgeting"], correctIndex: 1 },
  { text: "Break-even is 10,000 units at a $20 selling price and $12 variable cost per unit. What are the approximate fixed costs?", options: ["$80,000", "$120,000", "$200,000", "$8,000"], correctIndex: 0 },
  { text: "Project X has NPV $15,000; Project Y has NPV $22,000 (equal investment, no other constraints). Which should be selected per the NPV rule?", options: ["Project X", "Project Y", "Both equally", "Neither"], correctIndex: 1 }
];

/* -------------------------- OPERATIONS (15 manual) ------------------------- */
const OPS_MANUAL = [
  { text: "A factory can produce 1,200 units/day but demand is only 900 units/day. What operational issue does this create?", options: ["Insufficient capacity", "Excess capacity / underutilization leading to inefficiency", "No issue at all", "Demand should be ignored"], correctIndex: 1 },
  { text: "A warehouse uses FIFO for perishable goods. Why is this the appropriate method?", options: ["It maximizes storage space", "It ensures older stock is sold/used first, reducing spoilage and waste", "It's required by law in every country", "It minimizes labor costs"], correctIndex: 1 },
  { text: "A production line has 5 stations with cycle times 4, 6, 3, 8, and 5 minutes. What is the bottleneck, and the line's maximum output rate?", options: ["Station at 4 min; 1 unit/4min", "Station at 8 min; 1 unit/8min", "Average of all stations", "Station at 3 min"], correctIndex: 1 },
  { text: "Safety stock is 200 units, average daily demand is 50 units, lead time is 4 days. Is the safety stock sufficient to cover demand variability?", options: ["Yes, with a large extra buffer", "It exactly covers average lead-time demand but provides no extra buffer for variability", "It's irrelevant", "Safety stock should be zero"], correctIndex: 1 },
  { text: "Using EOQ logic, if ordering costs decrease significantly while holding costs stay the same, what should happen to the optimal order quantity?", options: ["It should increase", "It should decrease", "No change", "EOQ becomes irrelevant"], correctIndex: 1 },
  { text: "A process has a 2% defect rate on 10,000 units/day. How many defects occur daily, and why does reducing this matter operationally?", options: ["20 units; a minor issue", "200 units; a significant cost/quality impact worth addressing", "2,000 units; a data entry error", "0 units"], correctIndex: 1 },
  { text: "Comparing JIT inventory vs. large safety stocks for a product with highly volatile, unpredictable demand — which is generally riskier?", options: ["JIT is riskier due to potential stockouts from unpredictable demand", "Large safety stock is always riskier", "Both are equally risk-free", "Demand volatility doesn't matter for inventory strategy"], correctIndex: 0 },
  { text: "A logistics manager must route delivery trucks to minimize total distance across 5 delivery points. What type of problem is this?", options: ["Linear regression", "A vehicle-routing / traveling-salesman-type optimization problem", "A hiring problem", "A pricing problem"], correctIndex: 1 },
  { text: "A QC process samples 50 of 10,000 units and finds 3 defective. What is the estimated defect rate, and what is this inspection type called?", options: ["3%, full inspection", "6%, sampling inspection", "0.3%, full inspection", "60%, sampling inspection"], correctIndex: 1 },
  { text: "A supplier's lead time suddenly jumps from 5 to 15 days due to shipping delays. What should operations do FIRST?", options: ["Ignore it and hope for the best", "Recalculate safety stock and reorder points based on the new lead time", "Stop ordering entirely", "Switch all customers to backorder without analysis"], correctIndex: 1 },
  { text: "Machine A: 10 units in 2 hours. Machine B: 15 units in 3 hours. Which machine has a higher processing rate?", options: ["Machine A is faster", "Machine B is faster", "Both machines have an equal rate of 5 units/hour", "Cannot be determined"], correctIndex: 2 },
  { text: "A company wants to reduce production lead time. Which approach follows Lean manufacturing principles most closely?", options: ["Add more inventory buffers everywhere", "Identify and eliminate non-value-added waste in the process", "Increase batch sizes significantly", "Ignore process mapping"], correctIndex: 1 },
  { text: "Task 1 (3h) → Task 2 (5h, depends on T1). Task 3 (2h) can run parallel to T2. Task 4 (4h) depends on T2 and T3. What is the minimum total project duration (critical path)?", options: ["9 hours", "12 hours", "14 hours", "5 hours"], correctIndex: 1 },
  { text: "A warehouse operates at 95% capacity utilization consistently. What operational risk does this create?", options: ["No risk; it's ideal", "Little flexibility to absorb demand spikes or handle disruptions", "Guaranteed cost savings with no downside", "It means the warehouse is underused"], correctIndex: 1 },
  { text: "Using ABC inventory analysis (Pareto principle), which category typically requires the tightest control?", options: ["Category C (low value, high volume items)", "Category A (high-value items representing ~80% of value from ~20% of items)", "All categories equally", "None require control"], correctIndex: 1 }
];

/* ------------------- Generated numerical-reasoning sets ------------------- */

function genHR(n) {
  const qs = [];
  for (let i = 0; i < n; i++) {
    const total = 180 + i * 7;
    const left = 10 + ((i * 3) % 40);
    const rate = Math.round((left / total) * 100);
    const wrong1 = Math.round((left / (total - left)) * 100);
    const wrong2 = rate + 5 > 100 ? rate - 5 : rate + 5;
    const wrong3 = Math.max(0, rate - 8);
    const { options, correctIndex } = buildOptions(`${rate}%`, [`${wrong1}%`, `${wrong2}%`, `${wrong3}%`]);
    qs.push({
      text: `A company started the year with ${total} employees. During the year, ${left} employees voluntarily left. HR calculates attrition rate as (departures ÷ starting headcount) × 100. What is the attrition rate, rounded to the nearest whole percent?`,
      options, correctIndex
    });
  }
  return qs;
}

function genMarketing(n) {
  const qs = [];
  for (let i = 0; i < n; i++) {
    const impressions = 5000 + i * 230;
    const clicks = 50 + ((i * 13) % 400);
    const ctr = ((clicks / impressions) * 100).toFixed(2);
    const wrong1 = ((clicks / impressions) * 10).toFixed(2);
    const wrong2 = (((clicks + 50) / impressions) * 100).toFixed(2);
    const wrong3 = (impressions / clicks).toFixed(2);
    const { options, correctIndex } = buildOptions(`${ctr}%`, [`${wrong1}%`, `${wrong2}%`, `${wrong3}%`]);
    qs.push({
      text: `An online ad campaign recorded ${impressions.toLocaleString()} impressions and ${clicks} clicks. CTR = (clicks ÷ impressions) × 100. What is the CTR, rounded to two decimal places?`,
      options, correctIndex
    });
  }
  return qs;
}

function genFinance(n) {
  const qs = [];
  for (let i = 0; i < n; i++) {
    const ca = 100000 + i * 5300;
    const cl = 40000 + i * 1700;
    const ratio = (ca / cl).toFixed(2);
    const wrong1 = (cl / ca).toFixed(2);
    const wrong2 = ((ca - cl) / cl).toFixed(2);
    const wrong3 = (ca / (cl * 2)).toFixed(2);
    const { options, correctIndex } = buildOptions(ratio, [wrong1, wrong2, wrong3]);
    qs.push({
      text: `A company reports current assets of $${ca.toLocaleString()} and current liabilities of $${cl.toLocaleString()}. Current ratio = current assets ÷ current liabilities. What is the current ratio, rounded to two decimal places?`,
      options, correctIndex
    });
  }
  return qs;
}

function genOperations(n) {
  const qs = [];
  for (let i = 0; i < n; i++) {
    const unitsPerHour = 80 + i * 3;
    const hours = 8 + (i % 4);
    const defectPct = 2 + (i % 6);
    const total = unitsPerHour * hours;
    const good = Math.round(total * (1 - defectPct / 100));
    const wrong1 = total;
    const wrong2 = Math.round(total * (1 - (defectPct + 5) / 100));
    const wrong3 = Math.round(total * (defectPct / 100));
    const { options, correctIndex } = buildOptions(`${good} units`, [`${wrong1} units`, `${wrong2} units`, `${wrong3} units`]);
    qs.push({
      text: `A production line manufactures ${unitsPerHour} units/hour for ${hours} hours/day. Quality inspection finds a ${defectPct}% defect rate. How many good (non-defective) units are produced per day, rounded to the nearest whole unit?`,
      options, correctIndex
    });
  }
  return qs;
}

function withMeta(role, arr) {
  return arr.map((q, i) => ({ id: `${role}-${i}`, role, difficulty: 'medium', ...q }));
}

function getQuestionBank() {
  return {
    HR: withMeta('HR', [...HR_MANUAL, ...genHR(35)]),
    MARKETING: withMeta('MARKETING', [...MKT_MANUAL, ...genMarketing(35)]),
    FINANCE: withMeta('FINANCE', [...FIN_MANUAL, ...genFinance(35)]),
    OPERATIONS: withMeta('OPERATIONS', [...OPS_MANUAL, ...genOperations(35)])
  };
}

module.exports = { getQuestionBank };