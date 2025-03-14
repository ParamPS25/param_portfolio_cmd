const terminal = document.getElementById('terminal');
        const dynamicContent = document.getElementById('dynamic-content');
        const userInput = document.getElementById('user-input');


        const keySound = new Audio('mech-keyboard.mp3'); // Load the sound file
        keySound.volume = 0.5; // Adjust volume

        const clearSound = new Audio('whoosh.mp3'); // Load clear command sound
        clearSound.volume = 0.7; 


        userInput.addEventListener('keydown', function(event) {
            if (event.key !== 'Enter') {  
                keySound.currentTime = 0; // Reset sound for quick typing
                keySound.play();
            }
        });

        const commands = {
            help: "Available commands: about, skills, projects, contact, clear , type",
            about: "I'm Param, a passionate developer with a love for creating innovative solutions.",
            skills: "Programming Languages: JavaScript, Python, Java, C/Cpp \nWeb Technologies: HTML, CSS, Node ,Express \nOther: Git, Docker",
            projects: "building...",
            contact: "Email: bhavsarparam1941@gmail.com <br> GitHub: <a href ='https://github.com/ParamBhavsar'>GitHub link</a> <br> LinkedIn: <a href= 'https://www.linkedin.com/in/param-bhavsar-16bb31272/'>LinkedIn link</a>",
            clear: () => {
                dynamicContent.innerHTML = '';
                clearSound.play();              // sound effect
                return '';                      // as returing nothing for commands[cmd]() call just clearing innercontent of div
            }
        };

        function executeCommand(cmd) {
            cmd = cmd.toLowerCase().trim();                 //converts the command to lowercase and removes any leading/trailing whitespace with cmd.toLowerCase().trim().
            if (cmd in commands) {
                if(typeof(commands[cmd])==='function'){
                    return commands[cmd]();
                }
                else{
                return commands[cmd];
                }
            }
            return `Command not found: ${cmd}. Type 'help' for available commands.`;
        }

        userInput.addEventListener('keyup', function(event) {           //The keyup event is fired when a key is released from keyboard so, checking for 'Enter'.
            if (event.key === 'Enter') {
                const cmd = this.value;                                 //This gets the current value of the input field
                
                const output = document.createElement('div');
                output.className = 'output';
                output.textContent = `$ ${cmd}`;
                dynamicContent.appendChild(output);

                const response = document.createElement('div');
                response.className = 'output';
                dynamicContent.appendChild(response);
                let text_cmd = executeCommand(cmd)
                response.innerHTML = text_cmd;
               // typeEffect(response,text_cmd);              // for typing Effect of response message
                
                this.value = '';
                terminal.scrollTop = terminal.scrollHeight;
            }
        });


        // type - test command 

        const sampleTexts = [
            "The quick brown fox jumps over the lazy dog.",
            "Coding is like humor. If you have to explain it, it’s bad.",
            "First, solve the problem. Then, write the code.",
            "Believe in yourself and all that you are",
            "Difficulties in life are intended to make us better not bitter",
            "What we achieve inwardly will change outer reality",
            "Success is getting what you want happiness is wanting what you get",
            "Quality means doing it right when no one is looking",
            "Opportunities do not happen you create them",
            "The harder you work for something the greater you will feel when you achieve it",
            "Do not wait for opportunity create it",
            "If you can dream it you can do it",
            "Happiness is not something ready made it comes from your own actions",
            "Live as if you were to die tomorrow learn as if you were to live forever",
            "If you want to achieve greatness stop asking for permission",
            "Everything you have ever wanted is on the other side of fear",
            "Doubt kills more dreams than failure ever will",
            "The secret of getting ahead is getting started",
            "Life is 10 percent what happens to us and 90 percent how we react to it",
            "Keep your face always toward the sunshine and shadows will fall behind you",
            "In the middle of every difficulty lies opportunity",
        ];
        
        let startTime, testText;
        
        // Start typing test
        commands.type = () => {
            testText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
            startTime = Date.now();
        
            return `Type this without errors:\n"${testText}"`;
        };
        
        // Listen for typing and detect when complete
        userInput.addEventListener("input", function () {
            if (!testText) return; // If no test is active, exit
        
            let typedText = this.value;
        
            // Check if user has typed at least as many characters as the test text
            if (typedText.length >= testText.length) {
                let endTime = Date.now();
                let timeTaken = (endTime - startTime) / 1000;
                let wordsPerMinute = Math.round((testText.split(" ").length / timeTaken) * 60);
        
                // Calculate accuracy
                let correctChars = 0;
                for (let i = 0; i < testText.length; i++) {
                    if (typedText[i] === testText[i]) correctChars++;
                }
                let accuracy = ((correctChars / testText.length) * 100).toFixed(2) + "%";
        
                let resultMessage = `✅ Test Completed!\nTime: ${timeTaken.toFixed(2)} seconds\nSpeed: ${wordsPerMinute} WPM\nAccuracy: ${accuracy}`;
        
                // Display result and reset input
                const response = document.createElement('div');
                response.className = 'output';
                response.innerText = resultMessage;
                dynamicContent.appendChild(response);
        
                this.value = ""; // Clear input
                testText = null; // Reset test
            }
        });
        
        
        // terminal history -> up/down

        let history = [];
        let historyIndex = -1;

        userInput.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                history.push(this.value);
                historyIndex = history.length;
            } else if (event.key === "ArrowUp") {
                if (historyIndex > 0) {
                    historyIndex--;
                    this.value = history[historyIndex];
                }
            } else if (event.key === "ArrowDown") {
                if (historyIndex < history.length - 1) {
                    historyIndex++;
                    this.value = history[historyIndex];
                } else {
                    this.value = "";
                }
            }
        });


        // function typeEffect(response_elem, text_cmd) {
        //     let index = 0;
        //     response_elem.innerHTML = '';
        //     function type() {
        //         if (index < text_cmd.length) {
        //             response_elem.innerHTML += text_cmd.charAt(index);
        //             index++;
        //             setTimeout(type, 20);                          // recursively call the type fn per 20ms
        //         }
        //     }
        //     type();
        // }