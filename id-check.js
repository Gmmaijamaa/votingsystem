function submitID() {
  const voterId = document.getElementById("voterId").value.trim();
  const errorMsg = document.getElementById("errorMsg");

  if (voterId === "") {
    errorMsg.textContent = "Voter ID is required.";
    return;
  }

  localStorage.setItem("voterId", voterId);

  const votedUsers = JSON.parse(localStorage.getItem("votedUsers") || "[]");
  if (votedUsers.includes(voterId)) {
    errorMsg.textContent = "This ID has already voted!";
    return;
  }

  window.location.href = "vote.html";
}