
let currentContentKey = null;
let currentIndex = 0;

function startTyping() {
    currentContentKey = document.getElementById("contentSelection").value;
    document.getElementById("typingArea").hidden = false;
    updateContentToCopy();
    // Focus on the userInput text area
    document.getElementById("userInput").focus();
}


function updateContentToCopy() {
    const contentArray = contents[currentContentKey].split('\n'); // Split by newline for lines
    const currentLine = contentArray[currentIndex] || ""; // Get the current line or an empty string if we're at the end
    document.getElementById("contentToCopy").innerText = currentLine.trim();
}


function highlightMismatch() {
    const userInput = document.getElementById("userInput").value;
    const correctText = document.getElementById("contentToCopy").innerText;
    let mismatchPosition = -1;

    // Identify the position where the mismatch starts
    for (let i = 0; i < userInput.length; i++) {
        if (userInput[i] !== correctText[i]) {
            mismatchPosition = i;
            break;
        }
    }

    if (mismatchPosition !== -1) {
        const beforeMismatch = correctText.substring(0, mismatchPosition);
        const mismatchedChar = correctText[mismatchPosition];
        const afterMismatch = correctText.substring(mismatchPosition + 1);

        // Highlight the mismatched portion
        document.getElementById("contentToCopy").innerHTML = 
            beforeMismatch + '<span class="highlightError">' + mismatchedChar + '</span>' + afterMismatch;
    }
}

function checkInput() {
    const userInput = document.getElementById("userInput").value;
    const currentLine = document.getElementById("contentToCopy").innerText;
    
    if (currentLine && currentLine === userInput.trim()) {
        // If the entire line matches
        document.getElementById("typedSoFar").innerHTML += userInput + '\n';
        currentIndex++; // Move to the next line
        updateContentToCopy();
        document.getElementById("userInput").value = ""; 
        updateProgressBar();
    } else {
        highlightMismatch();
    }
}



function highlightMismatch() {
    const userInput = document.getElementById("userInput").value;
    const correctText = document.getElementById("contentToCopy").innerText;
    let mismatchPosition = -1;

    // Identify the position where the mismatch starts
    for (let i = 0; i < userInput.length; i++) {
        if (userInput[i] !== correctText[i]) {
            mismatchPosition = i;
            break;
        }
    }

    if (mismatchPosition !== -1) {
        const beforeMismatch = correctText.substring(0, mismatchPosition);
        const mismatchedChar = correctText[mismatchPosition];
        const afterMismatch = correctText.substring(mismatchPosition + 1);

        // Highlight the mismatched portion
        document.getElementById("contentToCopy").innerHTML = 
            beforeMismatch + '<span class="highlightError">' + mismatchedChar + '</span>' + afterMismatch;
    }
}




function endOfContent() {
    document.getElementById("contentToCopy").innerText = "Great job! You've completed this content.";
    document.getElementById("userInput").disabled = true; // Disable further typing
}


function updateProgressBar() {
    // Use split by newline to count the number of lines
    const totalLines = contents[currentContentKey].split("\n").length;
    const progress = ((currentIndex + 1) / totalLines) * 100; // Add 1 to currentIndex to represent the current line being on
    document.getElementById("progressBar").style.width = `${progress}%`;
}



document.getElementById("userInput").addEventListener("keydown", function(e) {
    if (e.key === 'Enter') {
        e.preventDefault(); // Prevent the default "Enter" action in textarea (new line)
        moveToNextLine();
    }
});

function moveToNextLine() {
    const userInput = document.getElementById("userInput").value;
    const contentArray = contents[currentContentKey].split('\n'); // Split by newline for lines
    const currentLine = contentArray[currentIndex] || "";

    // Append the current line to typedSoFar
    if (currentLine.startsWith(userInput.trim())) {
        // If user input matches the beginning of the current line
        document.getElementById("typedSoFar").innerHTML += currentLine + '\n';
    } else {
        // If user input does not match, append it anyway as per requirements
        document.getElementById("typedSoFar").innerHTML += userInput + '\n';
    }

    currentIndex++; // Move to the next line

    // Check if we've reached the end of the content
    if (currentIndex < contentArray.length) {
        updateContentToCopy();
        document.getElementById("userInput").value = ""; // Clear the input area
        updateProgressBar();
    } else {
        endOfContent();
    }
}

let contents = {
    poem: 
`If you can keep your head when all about you   
    Are losing theirs and blaming it on you,   
If you can trust yourself when all men doubt you,
    But make allowance for their doubting too;   
If you can wait and not be tired by waiting,
    Or being lied about, don’t deal in lies,
Or being hated, don’t give way to hating,
    And yet don’t look too good, nor talk too wise:

If you can dream—and not make dreams your master;   
    If you can think—and not make thoughts your aim;   
If you can meet with Triumph and Disaster
    And treat those two impostors just the same;   
If you can bear to hear the truth you’ve spoken
    Twisted by knaves to make a trap for fools,
Or watch the things you gave your life to, broken,
    And stoop and build ’em up with worn-out tools:

If you can make one heap of all your winnings
    And risk it on one turn of pitch-and-toss,
And lose, and start again at your beginnings
    And never breathe a word about your loss;
If you can force your heart and nerve and sinew
    To serve your turn long after they are gone,   
And so hold on when there is nothing in you
    Except the Will which says to them: ‘Hold on!’

If you can talk with crowds and keep your virtue,   
    Or walk with Kings—nor lose the common touch,
If neither foes nor loving friends can hurt you,
    If all men count with you, but none too much;
If you can fill the unforgiving minute
    With sixty seconds’ worth of distance run,   
Yours is the Earth and everything that’s in it,   
    And—which is more—you’ll be a Man, my son!`,
    letter: `...content of Warren Buffett's letter...`,
    essay: `...content of "Self-Reliance" by Ralph Waldo Emerson...`,
    story: `...content of "The Gift of the Magi" by O. Henry...`
};


