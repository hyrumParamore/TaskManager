const readline = require('readline')


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


// Creates a new task every time it is called and populates it with needed data.
class Task {
    constructor( title, task ) {
        this.title = title;
        this.task = task;
        this.currentDate = this.getCurrentDate();
        this.dueDate = this.calculateDueDate();

    }

    // Gets the current date and then returns it in a beautiful format. :)
    getCurrentDate() {
        // Add 2 weeks (14 days) to the base date.
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate());
      
        // Get the day and month components of the due date.
        const day = dueDate.getDate();
        const month = dueDate.getMonth() + 1; 
        const year = dueDate.getFullYear()

        // Return the formatted due date
        return `${day}/${month}/${year}`;
    }

    // Calculates the due date and returns it in a nice format.
    calculateDueDate() {
        // Add 2 weeks (14 days) to the base date
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 14);
      
        // Get the day and month components of the due date.
        const day = dueDate.getDate();
        const month = dueDate.getMonth() + 1; 
        const year = dueDate.getFullYear()

        // Return the formatted due date.
        return `${day}/${month}/${year}`;
      }
    
}


// Get the current day/time
console.log()
const d = new Task()
console.log(d)
console.log()
console.log(d.calculateDueDate())
console.log()

  
// This is the array that will hold all of the tasks that are created.
const tasks = []
  
// Display the menu
function mainController() {
// Display options
menuOptions();

  // Run logic to select an option
  rl.question('Select an option: ', (answer) => {
      if (answer === '1') {
          createNewTask();
      } else if (answer === '2') {
          console.log()
          // This displays the tasks.
          displayTasks();

      } else if (answer === '3') {
          console.log()
          // This displays the tasks.
          editTask();

      } else if (answer === '4') {
          // This closes the program
          console.log('\nSave Task Items\n');
          console.log(JSON.stringify(tasks, null, 2));

      } else if (answer === '5') {
        // This closes the program
        console.log('\nClosing interface.');
        rl.close();
      }
      else {
          console.log('Invalid option.');
          mainController(); // Restart the menu if an invalid option is selected

      }
  });
}



// Function that allows you to edit a specific task
function editTask() {
    if (tasks.length <= 0) {
      console.log("You don't currently have any tasks.\n");
      mainController();
    } else {
      tasks.forEach(function (item, i) {
        console.log(`${i + 1}. ${item.title}: ${item.task}\nSet: ${item.currentDate} - Due: ${item.dueDate}\n`);
      });
      rl.question('Choose a task to edit (enter the task number): ', (answer) => {
        const selectedTaskIndex = parseInt(answer) - 1; // Convert answer to integer and subtract 1 to get the selected task index
    
        if (selectedTaskIndex >= 0 && selectedTaskIndex < tasks.length) {
          const selectedTask = tasks[selectedTaskIndex];
          console.log("\nSelected Task Details:");
          console.log(`Task: ${selectedTask.title}`);
          console.log(`Description: ${selectedTask.task}`);
          console.log(`Set: ${selectedTask.currentDate}`);
          console.log(`Due: ${selectedTask.dueDate}`);
  
          rl.question('\nEnter a new task: ', (newTask) => {
            selectedTask.title = newTask;
            rl.question('Enter a new description: ', (newDescription) => {
              selectedTask.task = newDescription;
              console.log("Task updated successfully!\n");
              mainController();
            });
          });
        } else {
          console.log("Invalid task number. Please try again.");
          mainController();
        }
      });
    }
}
  
  






// Function that displays the tasks
function displayTasks() {
    if (tasks.length <= 0) {
        console.log("You don't currently have any tasks.\n")
        mainController();
    } else {
        console.log('Tasks:')
        tasks.forEach(function (item, i) {
            console.log(`${i + 1}. ${item.title}: ${item.task}\nSet: ${item.currentDate} - Due: ${item.dueDate}\n`)    
        });

        // console.log("\nthis is the start of the test:")
        // console.log(task[1])

        mainController()
    }
}

function menuOptions() {
    console.log('Please select an option below: ');
    console.log('1. Create new task');
    console.log('2. Display Tasks');
    console.log('3. Edit Tasks');
    console.log('4. Save Tasks');
    console.log('5. Exit');
}

function createNewTask() {

rl.question('Enter task title: ', (title) => {
    rl.question('Enter task description: ', (task) => {
    const newTask = new Task(title, task);
    tasks.push(newTask) // Adds the task to an array to hold them all.

    // Print out the newly added task.
    console.log('\nNew Task:');
    console.log(`Title: ${newTask.title}`);
    console.log(`Task: ${newTask.task}`);
    console.log();

    mainController(); // Go back to the main menu.
    });
});
}

// Start the program
mainController();