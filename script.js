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
            help: `
                <style>
                .help-table {
                    max-width: 800px;
                    border-spacing: 6px 10px;
                }
                .help-table td {
                    padding: 4px 8px;
                    vertical-align: top;
                }
                .help-table .desc {
                    color: #6ff77b;
                }
                .help-title {
                    color: #00ffff;
                    font-weight: bold;
                    margin-bottom: 10px;
                    padding-left: 18px
                }
                </style>

                <div class="help-title">Available Commands</div>
                <table class="help-table">
                    <tr>
                        <td>auto</td>
                        <td class="desc">Show all sections in order without typing</td>
                    </tr>
                    <tr>
                        <td>about</td>
                        <td class="desc">Who I am and what I do</td>
                    </tr>
                    <tr>
                        <td>skills</td>
                        <td class="desc">Languages, frameworks, tools I use</td>
                    </tr>
                    <tr>
                        <td>projects</td>
                        <td class="desc">View featured projects with live links</td>
                    </tr>
                    <tr>
                        <td>education</td>
                        <td class="desc">My academic background</td>
                    </tr>
                    <tr>
                        <td>contact</td>
                        <td class="desc">Reach out via email, GitHub, LinkedIn</td>
                    </tr>
                    <tr>
                        <td>type</td>
                        <td class="desc">Try a fun typing speed test</td>
                    </tr>
                    <tr>
                        <td>clear</td>
                        <td class="desc">Clears the terminal</td>
                    </tr>
                </table>
                `,


            about: `
                <div class="timeline">
                <div class="timeline-item">
                    <span style="color:#6ff77b;">I'm Param</span>, a passionate developer focused on building scalable and intuitive digital solutions.<br><br>
                    I specialize in full-stack web development and enjoy working on projects that combine creativity and performance.
                </div>
                </div>
                `,


            skills: `
                <div class="timeline">
                <div class="timeline-item"><b>Languages:</b> JavaScript, Python, Java, SQL</div>
                <div class="timeline-item"><b>Web:</b> HTML, CSS, Tailwind, React.js, Node.js, Express.js, EJS</div>
                <div class="timeline-item"><b>Database:</b> MongoDB, MySQL, Redis</div>
                <div class="timeline-item"><b>Tools:</b> Git, GitHub, VS Code</div>
                </div>
                `,

            projects: `
                <div class="timeline">
                <div class="timeline-item has-point">
                    <b>WiChat</b><br>
                        A real-time chat platform with live user presence, image sharing, and scroll-based chat history.<br>
                        Offers 30+ switchable UI themes and secure login using JWT and HTTP-only cookies.<br>
                        <a href="https://wichat-4qsa.onrender.com" target="_blank">🌐 Live</a> | 
                        <a href="https://github.com/ParamPS25/WiChat" target="_blank">🔗 GitHub</a>
                </div>

                <div class="timeline-item has-point">
                    <b>EzNotesAi</b><br>
                        Converts screenshots into summarized notes using Gemini 2.0 Flash with multi-image support.<br>
                        Includes PDF export, Google OAuth, and modern UI with dark/light theming.<br>
                        <a href="https://notez-ai.vercel.app" target="_blank">🌐 Live</a> | 
                        <a href="https://github.com/ParamPS25/NotezAi" target="_blank">🔗 GitHub</a>
                </div>

                <div class="timeline-item has-point">
                    <b>BookMyDoc</b><br>
                        Streamlines doctor appointment booking with dynamic QR verification and status tracking.<br>
                        Automates email reminders and feedback via Nodemailer, secured via JWT cookies.<br>
                        <a href="https://bookmydoc-five.vercel.app" target="_blank">🌐 Live</a> | 
                        <a href="https://github.com/ParamPS25/DoctorAppointmentSystem" target="_blank">🔗 GitHub</a>
                </div>
                </div>
                `,


            contact: `
                <div class="timeline">
                <div class="timeline-item">
                    <b>Email:</b> <a href="mailto:bhavsarparam1941@gmail.com">bhavsarparam1941@gmail.com</a>
                </div>
                <div class="timeline-item">
                    <b>GitHub:</b> <a href="https://github.com/ParamPS25" target="_blank">github.com/ParamPS25</a>
                </div>
                <div class="timeline-item">
                    <b>LinkedIn:</b> <a href="https://www.linkedin.com/in/param-bhavsar-16bb31272/" target="_blank">linkedin.com/in/param-bhavsar</a>
                </div>
                </div>
                `,

            education: `
                <div class="timeline">
                <div class="timeline-item has-point">
                    <b>B.E. in Computer Engineering</b><br>
                    LDRP-ITR, Gandhinagar<br>
                    2022 – 2026 | CGPA: 8.65 (up to 6th sem)
                </div>

                <div class="timeline-item has-point">
                    <b>Class 12th – Science (A Group)</b><br>
                    Infocity Junior Science College, Gandhinagar<br>
                    Completed in Apr 2022
                </div>
                </div>
                `,


            clear: () => {
                dynamicContent.innerHTML = '';
                clearSound.play();              // sound effect
                return '';                      // as returing nothing for commands[cmd]() call just clearing innercontent of div
            },

            cls : () => {
                dynamicContent.innerHTML = '';
                clearSound.play();              
                return '';       
            },

            auto: () => {
                const sequence = ['about', 'projects', 'skills', 'education', 'contact'];
                let index = 0;

                function runNextCommand() {
                    if (index >= sequence.length) return;

                    const cmd = sequence[index++];
                    const output = document.createElement('div');
                    output.className = 'output';
                    output.textContent = `$ ${cmd}`;
                    dynamicContent.appendChild(output);

                    const response = document.createElement('div');
                    response.className = 'output';
                    response.innerHTML = executeCommand(cmd);
                    dynamicContent.appendChild(response);

                    terminal.scrollTop = terminal.scrollHeight;

                    setTimeout(runNextCommand, 600); // delay between commands
                }

                runNextCommand();
                return `<span style="color:#6ff77b;">auto mode ...</span>`;
            },

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
            return `<span style="color:red">Command not found: ${cmd}. Type 'help' for available commands.</span>`;
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