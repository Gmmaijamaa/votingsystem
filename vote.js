const voteOptions = [
  { id: "optionA", name: "MAIJAMA'A", img: "maijamaa" },
  { id: "optionB", name: "TINUBU" },
  { id: "optionC", name: "PETER OBI" }
];

let votes = JSON.parse(localStorage.getItem("votes")) || voteOptions.reduce((acc, opt) => {
  acc[opt.id] = 0;
  return acc;
}, {});

const voterId = localStorage.getItem("voterId");
const votedUsers = JSON.parse(localStorage.getItem("votedUsers") || "[]");
const userVote = localStorage.getItem("userVote");
const votingDeadline = new Date().getTime() + 60 * 1000;

if (!voterId) {
  window.location.href = "index.html";
}

function renderOptions() {
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  voteOptions.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option.name;

    const voted = !!userVote;
    btn.disabled = voted || isVotingClosed();

    if (userVote === option.id) {
      btn.style.backgroundColor = "#1976d2";
    }

    btn.onclick = () => handleVote(option.id);
    optionsDiv.appendChild(btn);
  });

  renderResults();
  renderCountdown();
}

function renderResults() {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = voteOptions.map(opt =>
    `<p>${opt.name}: <strong>${votes[opt.id]}</strong> votes</p>`
  ).join("");
}

function handleVote(optionId) {
  if (userVote || isVotingClosed()) {
    document.getElementById("message").textContent = "You have already voted.";
    return;
  }

  votes[optionId]++;
  votedUsers.push(voterId);

  localStorage.setItem("votes", JSON.stringify(votes));
  localStorage.setItem("votedUsers", JSON.stringify(votedUsers));
  localStorage.setItem("userVote", optionId);

  document.getElementById("message").textContent = `Thank you for voting!`;
  renderOptions();
}

function resetVotes() {
  localStorage.removeItem("votes");
  localStorage.removeItem("userVote");
  localStorage.removeItem("voterId");
  localStorage.removeItem("votedUsers");
  location.href = "index.html";
}

function isVotingClosed() {
  return new Date().getTime() > votingDeadline;
}

function renderCountdown() {
  const timerEl = document.getElementById("countdown");
  const interval = setInterval(() => {
    const now = new Date().getTime();
    const distance = votingDeadline - now;

    if (distance <= 0) {
      clearInterval(interval);
      timerEl.textContent = "Voting has ended!";
      renderOptions();
    } else {
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      timerEl.textContent = `Voting ends in ${seconds}s`;
    }
  }, 1000);
}

renderOptions();