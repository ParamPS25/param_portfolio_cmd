const terminal = document.getElementById('terminal');
        const dynamicContent = document.getElementById('dynamic-content');
        const userInput = document.getElementById('user-input');

        const commands = {
            help: "Available commands: about, skills, projects, contact, clear",
            about: "I'm Param, a passionate developer with a love for creating innovative solutions.",
            skills: "Programming Languages: JavaScript, Python, Java, C/Cpp \nWeb Technologies: HTML, CSS, Node ,Express \nOther: Git, Docker",
            projects: "building...",
            contact: "Email: param@example.com\nGitHub:'https://github.com/ParamBhavsar' \nLinkedIn:' https://www.linkedin.com/in/param-bhavsar-16bb31272/ '",
            clear: () => {
                dynamicContent.innerHTML = '';
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
                const text_cmd = executeCommand(cmd)

                typeEffect(response,text_cmd);              // for typing Effect of response message
                
                this.value = '';
                terminal.scrollTop = terminal.scrollHeight;
            }
        });

        function typeEffect(response_elem, text_cmd) {
            let index = 0;
            response_elem.innerHTML = '';
            function type() {
                if (index < text_cmd.length) {
                    response_elem.innerHTML += text_cmd.charAt(index);
                    index++;
                    setTimeout(type, 20);                          // recursively call the type fn per 20ms
                }
            }
            type();
        }