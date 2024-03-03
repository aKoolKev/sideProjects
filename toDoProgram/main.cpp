#include <iostream>
#include "ToDoList.hpp"
#include "Task.hpp"

using namespace std;

//Global Vars
string listName;
ToDoList newList;
    bool createNewList = false;


Task createTask()
{
    string taskDescrip;
    int month, day, year, importance;
    bool status = false;

    // prompt for the task info
    cout << "Task: ";
    cin >> taskDescrip;

    cout << "Month: ";
    cin >> month;

    cout << "Day: ";
    cin >> day;

    cout << "Year: ";
    cin >> year;

    cout << "Importance: ";
    cin >> importance;

    //create task
    Task newTask (taskDescrip, month, day, year, importance, status);

    return newTask;
}

void action(int operationNum)
{
    switch (operationNum)
    {
        case 0: // create new to-do list
        {    
            createNewList = true;

            //prompt for and stores list name
            cout << "Enter list name: ";
            cin >> listName; 

            break;
        }
        case 3: // Add a task
            if (createNewList)
                newList.insert(createTask());
            else
                //add it to the existing list
            
    
    default:
        break;
    }
}

// display all operations 
void menu()
{
    //cout the toDoList
    cout << "To-Do!\n";
    cout << "------\n";
    
    cout << "Press (0): Create new to-do list \n";
    cout << "Press (1): Load existing to-do list \n";
    cout << "Press (2): Save current to-do list \n";
    
    cout << "Press (3): Print to-do list \n";
    cout << "Press (4): Delete to-do list \n";

    cout << "Press (5): Add a task \n";
    cout << "Press (6): Delete a task \n";
    cout << "Press (7): Edit a task \n";

    cout << "\n\n >>>> ";
    int userSelection = -1;
    cin >> userSelection;   

    action (userSelection);         
}


int main (int argc, char* argv[])
{

    menu();
    return 0;
}