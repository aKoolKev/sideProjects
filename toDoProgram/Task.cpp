#include "Task.hpp"


using namespace std;

//print out task info
void
Task::printTask()
{
    cout << _description << endl  
         << " [" << _month << '-' << _day << '-' << _year << "] \n"
         << "Priority: " << _importance << endl
         << "Status: " << _status << endl << endl;
}