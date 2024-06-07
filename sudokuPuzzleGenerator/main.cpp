#include <iostream>
#include <random>
#include <vector>
#include <cstdlib> // For system()
#include <thread>
#include <chrono>


using namespace std;



string sudokuBoard[9][9]; //declare sudoku board

vector<vector<int>> sudokuBoardAnswer(9,vector<int>(9,0)); //holds the answers for the game mode

unsigned cellsLeft = 81; // cells left to fill on sudoku board



//print the content of sudoku board
void printBoard()
{
    int verticalCounter = 0;
    int horizonalBorderCounter = 0;

    //initial spacing
    cout << "    ";

    //print column number
    for (int i=1; i<=9; i++)
        cout << i << "   ";
    cout << endl;

    //top border 
    cout << "  ╔═══════════════════════════════════╗\n";


    for (int row=0; row<9; row++)
    {
        //initial leading vertical bar for each row
        cout << row+1 <<  " ║ ";

        //print all the column of current row
        for (int col=0; col<9; col++)
        {
            cout << sudokuBoard[row][col];
            verticalCounter++;

            //print fancy vertical bar after 3 values
            if (verticalCounter == 3)
            {
                cout << " ║ ";
                verticalCounter = 0;
            }
            else // print not fancy vertical bar between values
                cout << " | ";
        }
        
        horizonalBorderCounter++; 
        
        //place fancy horizontal rows after every 3 rows
        if (horizonalBorderCounter == 3)
        {
            if (row != 8) //fancy intermediate horizontal border
                cout << "\n  ║═══════════║═══════════║═══════════║\n";
            else //last bottom border
                cout << "\n  ╚═══════════════════════════════════╝\n";

            horizonalBorderCounter = 0;
        }
        else //not fancy intermediate horizonal border 
            cout << "\n  ║---+---+---║---+---+---║---+---+---║\n";
    }
}

//generate a random number between the range of [1,9] (inclusive)
int getRandNum()
{
    //seed with a real random value
    random_device rd;

    //initialize a random number generator using the random device
    mt19937 gen(rd());

    //define the range [min, max]
    int min = 1;
    int max = 9;

    //create a distribution in the range [min, max]
    std::uniform_int_distribution<> distr(min, max);

    return distr(gen);
}

//indicate if value exists in current row
bool isInRow(int currRow, int currCol, int currVal)
{
    //check from beginning col to curr col
    for (int col=0; col < currCol; col++)
    {
        if (stoi(sudokuBoard[currRow][col]) == currVal)
            return true;
    }

    //check from curr column to the end column
    for (int col = currCol+1; col<9; col++)
    {
         if (stoi(sudokuBoard[currRow][col]) == currVal)
            return true;
    }

    return false;
}

//indicate if value exists in current column
bool isInColumn(int currRow, int currCol, int currVal)
{
    //check from top row to current row
    for (int row=0; row < currRow; row++)
    {
        if (stoi(sudokuBoard[row][currCol]) == currVal)
            return true;
    }

    //check from currRow to the end row
    for (int row = currRow+1; row<9; row++)
    {
         if (stoi(sudokuBoard[row][currCol]) == currVal)
            return true;
    }

    return false;
}

//helper function to the isInSquare that does the actual checking
bool checkSquareHelper(string whichRow, string whichCol, int currRow, int currCol, int valToInsert)
{
    int rowStart = -1;
    int colStart = -1;
    int rowStop = -1;
    int colStop = -1;

    //initialize the variables based on which sub-squares of the sudoku board to check
    if (whichRow == "top" && whichCol == "left")
    {
        rowStart = 0; rowStop = 2;
        colStart = 0; colStop = 2;
    }
    else if (whichRow == "top" && whichCol == "middle")
    {
        rowStart = 0; rowStop = 2;
        colStart = 3; colStop = 5;
    }
    else if (whichRow == "top" && whichCol == "right")
    {
        rowStart = 0; rowStop = 2;
        colStart = 6; colStop = 8;
    }
    else if (whichRow == "middle" && whichCol == "left")
    {
        rowStart = 3; rowStop = 5;
        colStart = 0; colStop = 2;
    }
    else if (whichRow == "middle" && whichCol == "middle")
    {
        rowStart = 3; rowStop = 5;
        colStart = 3; colStop = 5;
    }
    else if (whichRow == "middle" && whichCol == "right")
    {
        rowStart = 3; rowStop = 5;
        colStart = 6; colStop = 8;
    }
    else if (whichRow == "bottom" && whichCol == "left")
    {
        rowStart = 6; rowStop = 8;
        colStart = 0; colStop = 2;
    }
    else if (whichRow == "bottom" && whichCol == "middle")
    {
        rowStart = 6; rowStop = 8;
        colStart = 3; colStop = 5;
    }
    else if (whichRow == "bottom" && whichCol == "right")
    {
        rowStart = 6; rowStop = 8;
        colStart = 6; colStop = 8;
    }
    else //error handling
    {
        cout << "\nInvalid \"whichRow\" and \"whichCol\" combination!\n";
    }

    //check if value exist in specified sub-square
    for (int row=rowStart; row <= rowStop; row++)
    {
        for (int col=colStart; col <= colStop; col++)
        {
            //reached our value to check's cell
            if (row == currRow && col == currCol) 
                return false;

            // number already exists in this sub-square
            if (stoi(sudokuBoard[row][col]) == valToInsert && row != currRow && col != currCol) 
                return true;
        }
    }

    return false; // number does not exist in this square
}

//indicate if value exists in current position's sub-square
bool isInSquare(int currRow, int currCol, int valToInsert)
{
    bool result = false;

    //top row squares
    if (currRow <= 2 && currCol <=2)
        return (checkSquareHelper("top", "left", currRow, currCol, valToInsert));
    else if (currRow <=2 && currCol > 2 && currCol <= 5)
        return (checkSquareHelper("top", "middle", currRow, currCol, valToInsert));
    else if (currRow <=2 && currCol > 5 && currCol <= 8)
        return (checkSquareHelper("top", "right", currRow, currCol, valToInsert));

    //middle row squares
    else if (currRow > 2 && currRow<= 5 && currCol <=2)
        return (checkSquareHelper("middle", "left", currRow, currCol, valToInsert));
    else if (currRow > 2 && currRow<= 5  && currCol > 2 && currCol <= 5)
        return (checkSquareHelper("middle", "middle", currRow, currCol, valToInsert));
    else if (currRow > 2 && currRow<= 5 && currCol > 5 && currCol <= 8)
        return (checkSquareHelper("middle", "right", currRow, currCol, valToInsert));

    //bottom row squares
    else if (currRow > 5 && currRow<= 8 && currCol <=2)
        return (checkSquareHelper("bottom", "left", currRow, currCol, valToInsert));
    else if (currRow > 5 && currRow<= 8  && currCol > 2 && currCol <= 5)
        return (checkSquareHelper("bottom", "middle", currRow, currCol, valToInsert));
    else if (currRow > 5 && currRow<= 8 && currCol > 5 && currCol <= 8)
        return (checkSquareHelper("bottom", "right", currRow, currCol, valToInsert));

    //error handling
    else
        cout << "\nCheckSquare() error!\n";

    //should not reach here!!!
    return result;
}

//fill in the sudoku board recursively
bool generateNewBoard(int currRow, int currCol)
{
    //remember previous cell's location
    int prevRow = currRow;
    int prevCol = currCol;

    //base case: done...no cell to fill
    if (cellsLeft <=0 )
        return true;
    else // more cell to fill
    {
        //possible of numbers to fill in cell
        vector<int> possibleNum = {1,2,3,4,5,6,7,8,9};

        int randNum = -1; //the random number
        int indexPos = 0; //the position of random number in vector
        bool found = false; //have we used the number already?

        //while we still have possible numbers to fill in the cell
        while (possibleNum.size() > 0)
        {
            //get a random "unique" number
            while (!found)
            {
                randNum = getRandNum(); 

                //make sure value has not been selected before
                for (int val: possibleNum)
                {
                    indexPos++;
                    if (val == randNum)
                    {
                        found = true;
                        break;
                    }
                }
                //value not found, thus value ready used
                indexPos = 0;
            }

            //does this number fit the cell?
            if (!isInSquare(currRow,currCol,randNum) && !isInRow(currRow, currCol,randNum) && !isInColumn(currRow, currCol,randNum))
            {
                //it works
                sudokuBoard[currRow][currCol] = to_string(randNum);
        
                //move to the next cell
                if (currCol == 8)
                {
                    currRow++;
                    currCol = 0;
                }
                else
                {
                    currCol++;
                }

                cellsLeft--;

                //remove number from number pool since we are using it
                possibleNum.erase(possibleNum.begin()+indexPos);
            
                //number worked...try to do the next cell
                bool status = generateNewBoard(currRow, currCol);

            
                if (status)
                    return true;
                else //the call before could not place a number...must change current value to something else
                {
                    //undo the move
                    cellsLeft++;
                    sudokuBoard[currRow][currCol] = "0";

                    //put back number into list
                    possibleNum.push_back(randNum);

                    //go back to previous cell since we modify it before doing the recursive call
                    currRow = prevRow;
                    currCol = prevCol;
                }
            }
            //curr num does not work
            possibleNum.erase(possibleNum.begin()+indexPos);
        }

    }

    //all possible 9 numbers did not work
    return false; 
}

//indicate if each value in each cell does not violate the rules of Sudoku
void checkBoard()
{
    for (int row = 0; row <=8; row++)
        for (int col = 0; col <=8; col++)
        {
            int val = stoi (sudokuBoard[row][col]);
            if (isInSquare(row, col, val) || isInColumn(row, col, val) || isInRow(row, col, val))
            {
                cout << "\nInvalid board!\n";
                return;
            }
        }

    cout << "\nValid board!\n"; 
}

//generate (x) amounts of random pairs of row x col based on difficulty
void generateGameBoard(unsigned int emptyCells)
{
    int randRow = -1;
    int randCol = -1;

    while (emptyCells > 0 )
    {
        randRow = getRandNum()-1;
        randCol = getRandNum()-1;

        if (sudokuBoardAnswer[randRow][randCol] == 0) //0 means has not been visited
        {
            //remember the answer 
            sudokuBoardAnswer[randRow][randCol] = stoi (sudokuBoard[randRow][randCol]);
            sudokuBoard[randRow][randCol] = " "; //unmark game board
            emptyCells--;
        }
        
        //cell has been used...pick a different cell
    }
}

//display life bar (max of 5)
void printLifeBar(unsigned int livesLeft)
{
    cout << "LIFE BAR: ";

    for (int i = 0; i<livesLeft; i++)
        cout << "♥";
    for (int i = 0; i<5-livesLeft; i++)
        cout << "♡";

    cout << "\n\n";
}

//clear terminal screen
void clearScreen()
{
    system("clear");
}

//halt program for (x) seconds
void sleepFor (unsigned int seconds)
{
    this_thread::sleep_for(std::chrono::seconds(seconds));
}

//create a board to solve and prompt for user to fill it in
void gameMode()
{
    clearScreen();

    //select difficulty
    cout << "    SELECT A DIFFICULTY    \n";
    cout << "----------------------------\n";
    cout << " EASY.............[Press 1]\n"; //easy 30 empty spaces
    cout << " MEDIUM...........[Press 2]\n"; //medium 40 empty spaces
    cout << " HARD.............[Press 3]\n"; //hard 50 empty spaces
    cout << " EXTREME..........[Press 4]\n"; //extreme 60 empty spaces
    cout << "----------------------------\n\n";

    unsigned int userDifficulty = 0;
    cout << "Your selection >>> ";
    cin >> userDifficulty;
    
    unsigned int emptySpaces = 0;

    switch (userDifficulty)
    {
        case 1: 
            emptySpaces = 30;
            generateGameBoard(emptySpaces); break;
        case 2: 
            emptySpaces = 40;
            generateGameBoard(emptySpaces); break;
        case 3: 
            emptySpaces = 50;
            generateGameBoard(emptySpaces); break;
        case 4: 
            emptySpaces = 60;
            generateGameBoard(emptySpaces); break;
        default: //error handling
            cout << "Please select a valid option: 1, 2, 3, 4 \n";
            break;
    }

    unsigned int userLives = 5;
    unsigned int userRow = -1;
    unsigned int userCol = -1;
    unsigned int userVal = -1;

    clearScreen();

    cout << "\nSTART GAME!\n\n";

    printLifeBar(userLives);
    printBoard();

    //game loop

    //while lives is not zero and spaces left to fill is not zero
    while(userLives > 0 && emptySpaces > 0)
    {
        //prompt user to select cell
        cout << "\nEnter row: ";
        cin >> userRow;

        cout << "Enter column: ";
        cin >> userCol;

        //prompt user for value
        cout << "Enter value: ";
        cin >> userVal;
        
        // check their value
        if (sudokuBoardAnswer[userRow-1][userCol-1] == userVal) //user is correct
        {
            //fill in 
            sudokuBoard[userRow-1][userCol-1] = to_string(userVal);

            cout << "\nCorrect!\n";

            sleepFor(1);
            emptySpaces--;

            if (emptySpaces <= 0)
            {
                cout << "YOU WIN!\n";
                return;
            }
        }
        else //user is incorrect
        {
            cout << "\nIncorrect!\n";

            sleepFor(1); 

            //deduct a life
            userLives--;
            
            //game over message
            if (userLives <= 0){
                cout << "\nGAME OVER!\n";
                return;
            }
        }

        clearScreen();
        printLifeBar(userLives);
        printBoard();
    }
}


int main (int argc, char* argv[])
{
    // Initialize sudokuBoard with "0"
    for (int i = 0; i < 9; ++i) 
        for (int j = 0; j < 9; ++j) 
            sudokuBoard[i][j] = "0";
    

    generateNewBoard(0,0);

    gameMode();

    return 0;
}

/*
TO-DO
  - show all number still left
  - add a timer
*/
