#include <iostream>
#include <fstream>
#include <list>
#include <functional>
#include <vector>


using namespace std;


//struct that holds the parts of the date
struct Date
{
    int month, day;
    string year;
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
vector<string> listDB;


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
    cout << "\nPrinting...Done\n";
}

void printTask(Task t1)
{
    cout << t1.label << endl;
    cout << t1.name << endl;
    cout << t1.dueDate.month << "-" << t1.dueDate.day << "-" << t1.dueDate.year << endl;
    cout << t1.importance << endl << endl;
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

// adds new list to our list database
void addListToDB (string newFileName)
{
    cout << "Adding to DB...";

    //write to DB
    ofstream writer ("listDB.txt", std::ios_base::app | std::ios_base::ate);
    writer << newFileName << endl;

    cout << "DONE!\n\n";
}

void printListDB()
{
    cout << "[All To-Do List]\n";
    ifstream reader("listDB.txt");

    int counter = 1;
    string readerVal;

    while (reader.peek() != EOF && !reader.eof()) // Check for end of file and ensure file is in a good state
    {
        cout << counter << ") "; 
        getline(reader,readerVal);
        cout << readerVal << endl;
        counter++;
    }
}

void saveFile(ofstream &oFile)
{
    cout << "Saving...";

    for(struct Task t1 : toDoList)
    {
        oFile << t1.label << "\n"
              << t1.name << "\n"
              << t1.importance << " "
              << t1.dueDate.month << " "
              << t1.dueDate.day << " "
              << t1.dueDate.year << " ";
    }
    oFile.close();
    cout << "Done\n\n";
}

//create new todo list
ofstream createNewFile()
{
    cout << "New ToDo list name: ";
    string fileName;
    cin >> fileName;
    fileName += ".txt";

    addListToDB(fileName); // store it in our database of ToDo list

    return ofstream(fileName); //writes to file
}

//load existing todo lists
void loadFile(ifstream &iFile)
{
    cout << "Loading file...";
    //format of file 
    //<importance> <month> <day> <year> <label> <name> 

    while (iFile.peek() != EOF && !iFile.eof()) // Check for end of file and ensure file is in a good state
    {
        struct Task t1;
        getline(iFile, t1.label);
        getline(iFile, t1.name);
        iFile >> t1.importance >> t1.dueDate.month >> t1.dueDate.day >> t1.dueDate.year;
        
        toDoList.push_back(t1);
    }

    cout <<"DONE\n";
}

// displays operation and have user selection one
int displayMenu()
{
    list<string> menuList;
    
    menuList.push_back("Quit");
    menuList.push_back("Create new To-Do list");
    menuList.push_back("Load existing To-DO list");
    menuList.push_back("Display all To-Do list");
    menuList.push_back("Create new To-Do list");

    int counter = 0;

    for(string val : menuList)
    {
        cout << counter << ") " << val << endl;
        counter++;
    }

    cout << "\n>>>> ";
    int selection = -1;
    cin >> selection;

    return selection;
}
int main (int argc, char * argv[])
{
    // used when create a new todo list
    function<ofstream()> func; 
    ofstream oFile; 

    bool loadAFile = false;

    int userSelection = displayMenu();

    switch (userSelection)
    {
        case 1: 
        {
            func = &createNewFile;
            oFile = func();
            break;
        }
        case 2:
        {
            cout << "Enter file name: ";
            string fileName;
            cin >> fileName;
            ifstream iFile(fileName);
            loadFile(iFile);
            loadAFile = true;
            break;
        }
        case 3: // display all ToDo List
        {
            printListDB();
            cout << "\nSelect one >>>>";
            break;
        }
        case 0: 
        {   
            cout << "Have a great day! :D\n";
            return 0; // terminate program
        }
    }




    /* 
        back end operations:
        - update last (remove task with status = 1)

        supported user operations:
        - a = add task
        - d = delete task
        - p = print list
        - q = quit program
        - s = sort
            - i = by importance
            - d = by due date
            - 

    */

    // addTask();
    // addTask();
    printToDoList();
    // saveFile(oFile);

    
    
    
    return 0;
};
