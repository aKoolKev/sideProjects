#include <iostream>
#include <fstream>
#include <list>


using namespace std;

//create the files first
ofstream oFile("toDo_file"); //writes to file

ifstream iFile("toDo_file"); //reads from file


//struct that holds the parts of the date
struct Date
{
    int month, day, year;
};

//struct of task that makes up a list
struct Task
{
    string name;
    struct Date dueDate;
    bool status = 0;
    int importance; // [1,3] 1 = low, 2 = med, 3 = high
};

//global vars
list<Task> toDoList;

//list functions
void printToDoList()
{
    for(struct Task t1 : toDoList)
    {
        cout  << "[" << t1.name << " (" << t1.importance << ") ]\n"
              << t1.dueDate.month << "-"<< t1.dueDate.day << "-"<< t1.dueDate.year << "\n";
    }
}


void addTask()
{
    struct Task t1;

    cout << "Task Name: ";
    cin >> t1.name;

    cout << "Due Date\nMonth: ";
    cin >> t1.dueDate.month;

    cout << "Day:   ";
    cin >> t1.dueDate.day;

    cout << "Year:  ";
    cin >> t1.dueDate.year;

    cout << "Importance: ";
    cin >> t1.importance;

    toDoList.push_back(t1);
    cout << "Added Task\n\n";
}

void removeTask()
{
    
}


void saveFile()
{
    cout << "Saving...";

    for(struct Task t1 : toDoList)
    {
        oFile << t1.importance << " "
              << t1.dueDate.month << " "
              << t1.dueDate.day << " "
              << t1.dueDate.year << " "
              << t1.name << "\n";
    }

    cout << "Done\n\n";
}

//read file and fill in list
void loadFile()
{
    cout << "Loading file...";
    //format of file 
    //<importance> <month> <day> <year> <name> 
    while (!iFile)
    {
        struct Task t1;
        iFile >> t1.importance >> t1.dueDate.month >> t1.dueDate.day >> t1.dueDate.year;
        getline(iFile, t1.name);

        toDoList.push_back(t1);
    }

    cout << "DONE\n";
}


int main (int argc, char * argv[])
{
    loadFile();

    addTask();

    saveFile();
    
    printToDoList();
    
    return 0;
};
