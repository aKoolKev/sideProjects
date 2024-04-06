#include <iostream>
#include <fstream>
#include <list>
#include <functional>


using namespace std;



//struct that holds the parts of the date
struct Date
{
    int month, day, year;
};

//struct of task that makes up a list
struct Task
{
    string label;
    string name;
    struct Date dueDate;
    bool status = 0;
    int importance; // [1,3] 1 = low, 2 = med, 3 = high
};

//global vars
list<Task> toDoList;


void printUnderline(int amount)
{
    cout << endl;
    for(int i=0; i<amount+2; i++)
        cout << "-";
    cout << endl;
}


//list functions
void printToDoList()
{
    for(struct Task t1 : toDoList)
    {
        printUnderline(t1.label.length());
        cout  << "|" << t1.label << "|"; 
        printUnderline(t1.label.length());

        cout  << "‣" << t1.name << " (" << t1.importance << ") \n"
              << "<" << t1.dueDate.month << "-"<< t1.dueDate.day << "-"<< t1.dueDate.year << ">\n";
    }
    cout << endl;
}


void addTask()
{
    struct Task t1;

    cout << "Task Label: ";
    getline(cin, t1.label);

    cout << "Task Name:  ";
    getline(cin, t1.name);

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


void saveFile(fstream &fFile)
{
    cout << "Saving...";

    for(struct Task t1 : toDoList)
    {
        fFile << t1.label << "\n"
              << t1.name << "\n"
              << t1.importance << " "
              << t1.dueDate.month << " "
              << t1.dueDate.day << " "
              << t1.dueDate.year << " ";
    }
    fFile.close();
    cout << "Done\n\n";
}

//create new todo list
fstream createNewFile()
{
    cout << "New ToDo list name: ";
    string fileName;
    cin >> fileName;
    return fstream(fileName); //writes to file
}

//load existing todo lists
void loadFile(fstream &fFile)
{
    cout << "Loading file...";

    //format of file 
    //<importance> <month> <day> <year> <label> <name> 
    while (!fFile)
    {
        struct Task t1;
        getline(fFile, t1.label);
        getline(fFile, t1.name);
        fFile >> t1.importance >> t1.dueDate.month >> t1.dueDate.day >> t1.dueDate.year;

        toDoList.push_back(t1);
    }

    cout << "DONE\n";
}


int main (int argc, char * argv[])
{
    function<fstream()> func; //use when create a new todo list

    printToDoList();
    
    cout << "(1) Create new ToDo list\n";
    cout << "(2) Load existing ToDO list\n";
    cout << ">>>> ";
    int userSelection = -1;
    cin >> userSelection;



  
    if (userSelection == 1) 
        func = &createNewFile;
    fstream fFile = func();

    if (userSelection == 2)
        loadFile(fFile);

  
    addTask();
    addTask();

    saveFile(fFile);
    
    printToDoList();
    
    return 0;
};
