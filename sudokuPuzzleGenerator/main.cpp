#include <iostream>
#include <random>
#include <vector>


using namespace std;

int sudokuBoard[9][9] = {{0}}; //initialize sudoku board with all 0
int cellsLeft = 81; // cells left to fill on sudoku board


//print the content of sudoku board
void printBoard()
{
    int verticalCounter = 0;
    int horizonalBorderCounter = 0;

    //top border 
    cout << "╔═══════════════════════════════════╗\n";


    for (int row=0; row<9; row++)
    {
        //initial leading vertical bar for each row
        cout << "║ ";

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
                cout << "\n║═══════════║═══════════║═══════════║\n";
            else //last bottom border
                cout << "\n╚═══════════════════════════════════╝\n";

            horizonalBorderCounter = 0;
        }
        else //not fancy intermediate horizonal border 
            cout << "\n║---+---+---║---+---+---║---+---+---║\n";
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
        if (sudokuBoard[currRow][col] == currVal)
            return true;
    }

    //check from curr column to the end column
    for (int col = currCol+1; col<9; col++)
    {
         if (sudokuBoard[currRow][col] == currVal)
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
        if (sudokuBoard[row][currCol] == currVal)
            return true;
    }

    //check from currRow to the end row
    for (int row = currRow+1; row<9; row++)
    {
         if (sudokuBoard[row][currCol] == currVal)
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
            if (sudokuBoard[row][col] == valToInsert && row != currRow && col != currCol) 
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
                // did not find it 
                indexPos = 0;
            }

            //try rand number
            if (!isInSquare(currRow,currCol,randNum) && !isInRow(currRow, currCol,randNum) && !isInColumn(currRow, currCol,randNum))
            {
                // it worked
                sudokuBoard[currRow][currCol] = randNum;
        

                //new position on board
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

                //cross it out from our list because we used it
                possibleNum.erase(possibleNum.begin()+indexPos);
            

                //number worked...try to do next cell
                bool status = generateNewBoard(currRow, currCol);

                if (status)
                    return true;
                else
                {
                    //undo move
                    cellsLeft++;
                    sudokuBoard[currRow][currCol] = 0;

                    //put back number into list
                    possibleNum.push_back(randNum);

                    currRow = prevRow;
                    currCol = prevCol;
                }
            }
            //curr num does not work
            possibleNum.erase(possibleNum.begin()+indexPos);
        
    //none of the 9 possible number worked, previous needs to change their number
    }

        }

        




        
       






    //     for (int possibleNumber = 1; possibleNumber <= 9; possibleNumber++)
    //     {
            
    //         if (!isInSquare(currRow,currCol,possibleNumber) && !isInRow(currRow, currCol,possibleNumber) && !isInColumn(currRow, currCol,possibleNumber))
    //         {
    //             // it worked
    //             sudokuBoard[currRow][currCol] = possibleNumber;
        

    //             //new position on board
    //             if (currCol == 8)
    //             {
    //                 currRow++;
    //                 currCol = 0;
    //             }
    //             else
    //             {
    //                 currCol++;
    //             }
            

    //             //debug
    //             // printBoard();

    //             cellsLeft--;

    //             //number worked...try to do next cell
    //             bool status = generateNewBoard(currRow, currCol);

    //             if (status)
    //                 return true;
    //             else
    //             {
    //                 //undo move
    //                 cellsLeft++;
    //                 sudokuBoard[currRow][currCol] = 0;
    //                 currRow = prevRow;
    //                 currCol = prevCol;
    //             }
    //         }
    //         //curr num does not work
    //     }
    // //none of the 9 possible number worked, previous needs to change their number
    // }
       
    // return false;

    return false;
}


void checkBoard()
{
    for (int row = 0; row <=8; row++)
        for (int col = 0; col <=8; col++)
        {
            int val = sudokuBoard[row][col];
            if (isInSquare(row, col, val) || isInColumn(row, col, val) || isInRow(row, col, val))
            {
                cout << "\nInvalid board!\n";
                return;
            }
        }

    cout << "\nValid board!\n"; 
}


int main (int argc, char* argv[])
{
    generateNewBoard(0,0);

    printBoard();

    checkBoard();

    return 0;
}
